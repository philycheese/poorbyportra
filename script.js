document.addEventListener('DOMContentLoaded', () => {
    const imageGrid = document.getElementById('image-grid');
    if (!imageGrid) return; // not on the gallery page

    const images = window.PORTRA_IMAGES || [];

    // ─── Elements ────────────────────────────────────────────────────
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortToggle = document.getElementById('sort-toggle');
    const sortArrow = document.getElementById('sort-arrow');
    const preloadToggle = document.getElementById('preload-toggle');
    const preloadState = document.getElementById('preload-state');
    const emptyState = document.getElementById('empty-state');

    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-nav-prev');
    const modalNext = document.querySelector('.modal-nav-next');
    const spinner = document.getElementById('spinner');

    // ─── Cloudinary URLs ─────────────────────────────────────────────
    // BASE_THUMB: 800px-wide for the grid (small + fast)
    // BASE_HIGH:  2400px-wide, auto format/quality — sharp on retina + 4K
    //             without paying the cost of the full source (often 3–7 MB)
    const BASE_THUMB = 'https://res.cloudinary.com/dyy8mqxwi/image/upload/w_800,q_auto,f_auto/';
    const BASE_HIGH = 'https://res.cloudinary.com/dyy8mqxwi/image/upload/w_2400,q_auto,f_auto/';

    // ─── State ───────────────────────────────────────────────────────
    let currentFilter = 'all';
    let isReversed = true; // default Z→A like the original
    let currentList = []; // cached current sorted list
    let modalIndex = -1;
    let isZoomed = false;
    let lastTouchX = 0;
    let lastTouchY = 0;

    // ─── Prefetch state ──────────────────────────────────────────────
    const PREFETCH_CACHE_CAP = 60;       // max distinct URLs we've kicked off
    const NEAR_DEPTH = 4;                // ±4 on open / casual nav
    const RUN_DEPTH = 8;                 // forward depth once a direction is "confident"
    const CONFIDENT_AFTER = 2;           // 2 same-direction moves in a row
    const prefetched = new Set();        // filenames we've already triggered
    const navHistory = [];               // recent directions, e.g. ['next', 'next']
    let preloadEnabled = localStorage.getItem('portra:preload') !== 'off'; // default on

    // ─── Debug HUD state (only active when enabled) ─────────────────
    // We prefetch via <img>/Image() so the cache key matches what the modal
    // <img> requests (same Accept header → Vary:Accept resolves to one entry).
    // Image() doesn't expose Content-Length, so we sample a handful of files
    // with HEAD-style fetches up front and use the running average as the
    // per-entry estimate in the cache-size readout.
    let avgBytes = 1_200_000;            // initial guess (~w_2400 JPEG/WebP)
    const sampledSizes = [];             // running samples to refine avgBytes
    const debugStats = {
        hits: 0,          // modal images that were already prefetched
        misses: 0,        // modal images that hadn't been prefetched
        evicted: 0,       // entries dropped due to cache cap
        lastAction: '—'   // human-readable status of last open/nav
    };

    function sampleAverageSize(filename) {
        if (sampledSizes.length >= 5) return; // don't keep sampling forever
        fetch(BASE_HIGH + filename, { method: 'HEAD', credentials: 'omit' })
            .then(r => {
                const len = parseInt(r.headers.get('content-length') || '0', 10);
                if (len > 0) {
                    sampledSizes.push(len);
                    avgBytes = sampledSizes.reduce((a, b) => a + b, 0) / sampledSizes.length;
                    renderDebug();
                }
            })
            .catch(() => {});
    }

    // ─── Image data ──────────────────────────────────────────────────

    // ─── Helpers ─────────────────────────────────────────────────────
    function captionFor(filename) {
        return filename.replace(/\.[^.]+$/, '');
    }

    function getSorted(list) {
        const sorted = [...list];
        if (isReversed) {
            sorted.sort((a, b) => b.filename.localeCompare(a.filename));
        }
        return sorted;
    }

    function applyFilters() {
        return images.filter(img =>
            currentFilter === 'all' || img.categories.includes(currentFilter)
        );
    }

    // ─── Render ──────────────────────────────────────────────────────
    function render() {
        currentList = getSorted(applyFilters());
        imageGrid.innerHTML = '';
        emptyState.hidden = currentList.length !== 0;

        const frag = document.createDocumentFragment();
        currentList.forEach((imgData, index) => {
            const item = document.createElement('div');
            item.className = 'grid-item';
            item.dataset.index = String(index);

            const wrap = document.createElement('div');
            wrap.className = 'grid-item-image';

            const img = document.createElement('img');
            img.src = BASE_THUMB + imgData.filename;
            img.alt = captionFor(imgData.filename);
            img.loading = 'lazy';
            img.decoding = 'async';
            img.addEventListener('load', () => img.classList.add('loaded'), { once: true });

            wrap.appendChild(img);
            item.appendChild(wrap);
            item.addEventListener('click', () => openModal(index));
            // Warm the cache before the click lands: when the user hovers or
            // taps a tile, kick off high-priority fetches for that image and
            // its immediate neighbors. By the time the modal opens, the main
            // image and its ±1 are usually already in flight or cached.
            const warm = () => warmupAroundIndex(index);
            item.addEventListener('mouseenter', warm);
            item.addEventListener('touchstart', warm, { passive: true });
            frag.appendChild(item);
        });

        imageGrid.appendChild(frag);
    }

    // ─── Prefetch ────────────────────────────────────────────────────
    function prefetch(filename, priority = 'auto') {
        if (!preloadEnabled) return;
        if (!filename || prefetched.has(filename)) return;
        if (prefetched.size >= PREFETCH_CACHE_CAP) {
            const oldest = prefetched.values().next().value;
            prefetched.delete(oldest);
            debugStats.evicted++;
        }
        prefetched.add(filename);

        // Use Image() so the browser request shares the cache key (Accept,
        // User-Agent, Save-Data) of the modal's <img>. fetch() in CORS mode
        // sends Accept: */* which Cloudinary's Vary:Accept treats as a
        // different entry — defeats the whole purpose.
        const img = new Image();
        if (priority !== 'auto' && 'fetchPriority' in img) {
            img.fetchPriority = priority;
        }
        img.src = BASE_HIGH + filename;

        // Opportunistically refine the byte-size estimate via cheap HEAD pings
        // on the first few prefetches. The HUD shows estimated cache usage.
        if (sampledSizes.length < 5) sampleAverageSize(filename);
    }

    function prefetchAround(index, back, forward) {
        if (currentList.length === 0) return;
        for (let i = 1; i <= back; i++) {
            const idx = (index - i + currentList.length) % currentList.length;
            // immediate neighbor (±1) gets high priority so it beats deeper prefetches
            prefetch(currentList[idx]?.filename, i === 1 ? 'high' : 'low');
        }
        for (let i = 1; i <= forward; i++) {
            const idx = (index + i) % currentList.length;
            prefetch(currentList[idx]?.filename, i === 1 ? 'high' : 'low');
        }
    }

    // Pre-click warmup: triggered on hover / touchstart over a grid tile.
    // Fetches the target image + its immediate neighbors at high priority so
    // the modal opens to a cached image and "next" is already in flight.
    function warmupAroundIndex(index) {
        if (currentList.length === 0) return;
        prefetch(currentList[index]?.filename, 'high');
        const next = (index + 1) % currentList.length;
        const prev = (index - 1 + currentList.length) % currentList.length;
        prefetch(currentList[next]?.filename, 'high');
        prefetch(currentList[prev]?.filename, 'high');
    }

    function syncHashToCurrent() {
        const data = currentList[modalIndex];
        if (!data) return;
        const newHash = '#' + encodeURIComponent(data.filename);
        if (location.hash !== newHash) {
            history.replaceState(null, '', location.pathname + newHash);
        }
    }

    // ─── Modal ───────────────────────────────────────────────────────
    function openModal(index) {
        modalIndex = index;
        navHistory.length = 0; // reset direction confidence on fresh open
        showModalImage();
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        syncHashToCurrent();
        prefetchAround(modalIndex, NEAR_DEPTH, NEAR_DEPTH);
    }

    function showModalImage() {
        const data = currentList[modalIndex];
        if (!data) return;
        if (prefetched.has(data.filename)) debugStats.hits++;
        else debugStats.misses++;
        renderDebug();
        isZoomed = false;
        modalImage.style.transform = 'scale(1)';
        modalImage.style.transformOrigin = 'center center';
        modalImage.style.cursor = 'zoom-in';

        spinner.hidden = false;
        modalImage.style.opacity = '0';

        const fullSrc = BASE_HIGH + data.filename;
        modalImage.src = fullSrc;
        modalImage.alt = captionFor(data.filename);
        modalCaption.textContent = `${captionFor(data.filename)}  ·  ${modalIndex + 1} / ${currentList.length}`;

        modalImage.onload = () => {
            spinner.hidden = true;
            modalImage.style.opacity = '1';
        };
        modalImage.onerror = () => {
            spinner.hidden = true;
            modalImage.style.opacity = '1';
        };
    }

    function closeModal() {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        isZoomed = false;
        modalImage.style.transform = 'scale(1)';
        modalImage.style.transformOrigin = 'center center';
        if (location.hash) {
            history.replaceState(null, '', location.pathname);
        }
    }

    function navigate(dir) {
        if (currentList.length === 0) return;
        if (dir === 'next') {
            modalIndex = (modalIndex + 1) % currentList.length;
        } else {
            modalIndex = (modalIndex - 1 + currentList.length) % currentList.length;
        }
        showModalImage();
        syncHashToCurrent();

        navHistory.push(dir);
        if (navHistory.length > CONFIDENT_AFTER) navHistory.shift();
        const confident = navHistory.length >= CONFIDENT_AFTER
            && navHistory.every(d => d === dir);
        if (confident) {
            const fwd = dir === 'next' ? RUN_DEPTH : NEAR_DEPTH;
            const back = dir === 'prev' ? RUN_DEPTH : NEAR_DEPTH;
            prefetchAround(modalIndex, back, fwd);
            debugStats.lastAction = `${dir} (confident, ±${back}/${fwd})`;
        } else {
            prefetchAround(modalIndex, NEAR_DEPTH, NEAR_DEPTH);
            debugStats.lastAction = `${dir} (casual, ±${NEAR_DEPTH})`;
        }
        renderDebug();
    }

    // ─── Event listeners ─────────────────────────────────────────────
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            render();
        });
    });

    if (sortToggle) {
        sortToggle.addEventListener('click', () => {
            isReversed = !isReversed;
            sortArrow.textContent = isReversed ? '↓' : '↑';
            render();
        });
    }

    function applyPreloadState() {
        if (!preloadToggle) return;
        preloadToggle.classList.toggle('active', preloadEnabled);
        preloadToggle.setAttribute('aria-pressed', preloadEnabled ? 'true' : 'false');
        if (preloadState) preloadState.innerHTML = '&nbsp;' + (preloadEnabled ? 'on' : 'off');
    }
    if (preloadToggle) {
        applyPreloadState();
        preloadToggle.addEventListener('click', () => {
            preloadEnabled = !preloadEnabled;
            localStorage.setItem('portra:preload', preloadEnabled ? 'on' : 'off');
            applyPreloadState();
            if (preloadEnabled) {
                // Catch up on the current modal context if the user just turned it on
                if (modal.classList.contains('show') && modalIndex >= 0) {
                    prefetchAround(modalIndex, NEAR_DEPTH, NEAR_DEPTH);
                }
            }
        });
    }

    modalClose.addEventListener('click', closeModal);
    modalPrev.addEventListener('click', (e) => { e.stopPropagation(); navigate('prev'); });
    modalNext.addEventListener('click', (e) => { e.stopPropagation(); navigate('next'); });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-stage')) {
            closeModal();
        }
    });

    // ─── Modal zoom ──────────────────────────────────────────────────
    modalImage.addEventListener('click', (event) => {
        event.stopPropagation();
        if (isZoomed) {
            modalImage.style.transform = 'scale(1)';
            modalImage.style.transformOrigin = 'center center';
            modalImage.style.cursor = 'zoom-in';
            isZoomed = false;
        } else {
            const rect = modalImage.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;
            modalImage.style.transformOrigin = `${x * 100}% ${y * 100}%`;
            modalImage.style.transform = 'scale(2)';
            modalImage.style.cursor = 'zoom-out';
            isZoomed = true;
        }
    });

    modalImage.addEventListener('touchstart', (event) => {
        if (isZoomed && event.touches.length === 1) {
            lastTouchX = event.touches[0].clientX;
            lastTouchY = event.touches[0].clientY;
        }
    }, { passive: true });

    modalImage.addEventListener('touchmove', (event) => {
        if (isZoomed && event.touches.length === 1) {
            event.preventDefault();
            const t = event.touches[0];
            const deltaX = (t.clientX - lastTouchX) * 0.6;
            const deltaY = (t.clientY - lastTouchY) * 0.6;
            const m = modalImage.style.transform.match(/translate\(([^)]+)\)/);
            const cur = m ? m[1].split(',').map(parseFloat) : [0, 0];
            const nx = cur[0] + deltaX;
            const ny = cur[1] + deltaY;
            const rect = modalImage.getBoundingClientRect();
            const maxX = (rect.width * (2 - 1)) / 4;
            const maxY = (rect.height * (2 - 1)) / 4;
            const bx = Math.max(-maxX, Math.min(maxX, nx));
            const by = Math.max(-maxY, Math.min(maxY, ny));
            modalImage.style.transform = `scale(2) translate(${bx}px, ${by}px)`;
            lastTouchX = t.clientX;
            lastTouchY = t.clientY;
        }
    }, { passive: false });

    // ─── Keyboard ─────────────────────────────────────────────────────
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('show')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') navigate('next');
        if (e.key === 'ArrowLeft') navigate('prev');
    });

    // ─── Block default page zoom gestures ────────────────────────────
    document.addEventListener('gesturestart', (e) => e.preventDefault());

    // ─── Swipe to navigate (when not zoomed) ─────────────────────────
    let swipeStartX = 0;
    let swipeStartY = 0;
    let swipeStartTime = 0;
    modal.addEventListener('touchstart', (e) => {
        if (isZoomed || e.touches.length > 1) return;
        swipeStartX = e.touches[0].clientX;
        swipeStartY = e.touches[0].clientY;
        swipeStartTime = Date.now();
    }, { passive: true });

    modal.addEventListener('touchend', (e) => {
        if (isZoomed) return;
        const dx = e.changedTouches[0].clientX - swipeStartX;
        const dy = e.changedTouches[0].clientY - swipeStartY;
        const dt = Date.now() - swipeStartTime;
        if (dt < 600 && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
            navigate(dx < 0 ? 'next' : 'prev');
        }
    }, { passive: true });

    // ─── Debug HUD ───────────────────────────────────────────────────
    let debugEl = null;
    function isDebugOn() {
        return debugEl !== null;
    }
    function installDebug() {
        if (debugEl) return;
        debugEl = document.createElement('div');
        debugEl.id = 'prefetch-debug';
        debugEl.style.cssText = [
            'position:fixed','bottom:12px','right:12px','z-index:9999',
            'font:11px/1.45 ui-monospace,SFMono-Regular,Menlo,monospace',
            'background:rgba(0,0,0,0.82)','color:#fff','padding:10px 12px',
            'border-radius:6px','pointer-events:none','white-space:pre',
            'max-width:280px'
        ].join(';');
        document.body.appendChild(debugEl);
        renderDebug();
    }
    function uninstallDebug() {
        if (!debugEl) return;
        debugEl.remove();
        debugEl = null;
    }
    function formatBytes(n) {
        if (n >= 1024 * 1024) return (n / (1024 * 1024)).toFixed(1) + ' MB';
        if (n >= 1024) return (n / 1024).toFixed(0) + ' KB';
        return n + ' B';
    }

    function renderDebug() {
        if (!debugEl) return;
        const total = debugStats.hits + debugStats.misses;
        const hitRate = total ? Math.round((debugStats.hits / total) * 100) : 0;
        const last = navHistory.length ? navHistory.join('→') : '—';
        const confident = navHistory.length >= CONFIDENT_AFTER
            && navHistory.every(d => d === navHistory[0]);
        const recent = Array.from(prefetched).slice(-6).map(s => s.replace(/\.[^.]+$/, ''));
        const estBytes = Math.round(prefetched.size * avgBytes);
        const sampledNote = sampledSizes.length
            ? `~${formatBytes(Math.round(avgBytes))}/img (${sampledSizes.length} sample${sampledSizes.length > 1 ? 's' : ''})`
            : `~${formatBytes(Math.round(avgBytes))}/img (estimate)`;
        debugEl.textContent = [
            `prefetch  ${prefetched.size}/${PREFETCH_CACHE_CAP}  evicted ${debugStats.evicted}`,
            `cache     ~${formatBytes(estBytes)}  (${sampledNote})`,
            `hit rate  ${debugStats.hits}/${total}  (${hitRate}%)`,
            `direction ${last}${confident ? '  ✓confident' : ''}`,
            `last      ${debugStats.lastAction}`,
            `preload   ${preloadEnabled ? 'on' : 'off'}`,
            `recent    ${recent.join(', ')}`
        ].join('\n');
    }
    function maybeEnableDebug() {
        const params = new URLSearchParams(location.search);
        if (params.has('debug') && params.get('debug') !== '0') installDebug();
    }
    document.addEventListener('keydown', (e) => {
        // Shift+? (i.e. '?') toggles HUD
        if (e.key === '?') {
            if (isDebugOn()) uninstallDebug(); else installDebug();
        }
    });
    maybeEnableDebug();

    // ─── Initial render ──────────────────────────────────────────────
    render();
    openModalFromHash();

    function openModalFromHash() {
        if (!location.hash) return;
        const target = decodeURIComponent(location.hash.slice(1));
        const idx = currentList.findIndex(img => img.filename === target);
        if (idx !== -1) openModal(idx);
    }
});
