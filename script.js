document.addEventListener('DOMContentLoaded', () => {
    const imageGrid = document.getElementById('image-grid');
    if (!imageGrid) return; // not on the gallery page

    const images = window.PORTRA_IMAGES || [];

    // ─── Elements ────────────────────────────────────────────────────
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortToggle = document.getElementById('sort-toggle');
    const sortArrow = document.getElementById('sort-arrow');
    const emptyState = document.getElementById('empty-state');

    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-nav-prev');
    const modalNext = document.querySelector('.modal-nav-next');
    const spinner = document.getElementById('spinner');

    // ─── Cloudinary URLs ─────────────────────────────────────────────
    const BASE_THUMB = 'https://res.cloudinary.com/dyy8mqxwi/image/upload/w_800,q_auto,f_auto/v1753994362/';
    const BASE_HIGH = 'https://res.cloudinary.com/dyy8mqxwi/image/upload/w_1600,q_auto,f_auto/v1753994362/';

    // ─── State ───────────────────────────────────────────────────────
    let currentFilter = 'all';
    let isReversed = true; // default Z→A like the original
    let currentList = []; // cached current sorted list
    let modalIndex = -1;
    let isZoomed = false;
    let lastTouchX = 0;
    let lastTouchY = 0;

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
            frag.appendChild(item);
        });

        imageGrid.appendChild(frag);
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
        showModalImage();
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        syncHashToCurrent();
    }

    function showModalImage() {
        const data = currentList[modalIndex];
        if (!data) return;
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
