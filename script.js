document.addEventListener('DOMContentLoaded', () => {
    const imageGrid = document.getElementById('image-grid');
    const filterButtons = document.querySelectorAll('nav button');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const closeButton = document.querySelector('.close-button');
    const siteTitle = document.querySelector('.site-title');
    const introToggle = document.getElementById('intro-toggle'); // Get the toggle element
    const introTextBox = document.getElementById('intro-text-box'); // Get the text box element
    const sortToggle = document.getElementById('sort-toggle'); // Get the sort toggle button

    const BASE_FULL = 'https://res.cloudinary.com/dyy8mqxwi/image/upload/v1753994362/';
    const BASE_THUMB = 'https://res.cloudinary.com/dyy8mqxwi/image/upload/w_1000,q_auto,f_auto/v1753994362/';

    let isZoomed = false; // Add state variable for zoom
    let originalTitle = 'POORBYPORTRA';
    let isReversed = true; // Track if sorting is reversed - default to true for Z-A
    let currentFilter = 'landscape'; // Track current filter


    const images = [
        { filename: 'export-001.jpg', categories: ['all'] },
        { filename: 'export-002.jpg', categories: ['landscape'] },
        { filename: 'export-003.jpg', categories: ['landscape'] },
        { filename: 'export-004.jpg', categories: ['landscape'] },
        { filename: 'export-005.jpg', categories: ['landscape'] },
        { filename: 'export-006.jpg', categories: ['all'] },
        { filename: 'export-007.jpg', categories: ['landscape'] },
        { filename: 'export-008.jpg', categories: ['all'] },
        { filename: 'export-009.jpg', categories: ['all'] },
        { filename: 'export-010.jpg', categories: ['landscape'] },
        { filename: 'export-011.jpg', categories: ['all'] },
        { filename: 'export-012.jpg', categories: ['all'] },
        { filename: 'export-013.jpg', categories: ['all'] },
        { filename: 'export-014.jpg', categories: ['all'] },
        { filename: 'export-015.jpg', categories: ['all'] },
        { filename: 'export-016.jpg', categories: ['all'] },
        { filename: 'export-017.jpg', categories: ['landscape'] },
        { filename: 'export-018.jpg', categories: ['landscape'] },
        { filename: 'export-019.jpg', categories: ['landscape'] },
        { filename: 'export-020.jpg', categories: ['landscape'] },
        { filename: 'export-021.jpg', categories: ['all'] },
        { filename: 'export-022.jpg', categories: ['all'] },
        { filename: 'export-023.jpg', categories: ['all'] },
        { filename: 'export-024.jpg', categories: ['all'] },
        { filename: 'export-025.jpg', categories: ['all'] },
        { filename: 'export-026.jpg', categories: ['all'] },
        { filename: 'export-027.jpg', categories: ['all'] },
        { filename: 'export-028.jpg', categories: ['all'] },
        { filename: 'export-029.jpg', categories: ['landscape'] },
        { filename: 'export-030.jpg', categories: ['all'] },
        { filename: 'export-031.jpg', categories: ['all'] },
        { filename: 'export-032.jpg', categories: ['all'] },
        { filename: 'export-033.jpg', categories: ['all'] },
        { filename: 'export-034.jpg', categories: ['all'] },
        { filename: 'export-035.jpg', categories: ['all'] },
        { filename: 'export-036.jpg', categories: ['landscape'] },
        { filename: 'export-037.jpg', categories: ['all'] },
        { filename: 'export-038.jpg', categories: ['all'] },
        { filename: 'export-039.jpg', categories: ['all'] },
        { filename: 'export-040.jpg', categories: ['landscape'] },
        { filename: 'export-041.jpg', categories: ['all'] },
        { filename: 'export-042.jpg', categories: ['landscape'] },
        { filename: 'export-043.jpg', categories: ['landscape'] },
        { filename: 'export-044.jpg', categories: ['landscape'] },
        { filename: 'export-045.jpg', categories: ['all'] },
        { filename: 'export-046.jpg', categories: ['all'] },
        { filename: 'export-047.jpg', categories: ['all'] },
        { filename: 'export-048.jpg', categories: ['all'] },
        { filename: 'export-049.jpg', categories: ['all'] },
        { filename: 'export-050.jpg', categories: ['landscape'] },
        { filename: 'export-051.jpg', categories: ['landscape'] },
        { filename: 'export-052.jpg', categories: ['landscape'] },
        { filename: 'export-053.jpg', categories: ['landscape'] },
        { filename: 'export-054.jpg', categories: ['all'] },
        { filename: 'export-055.jpg', categories: ['all'] },
        { filename: 'export-056.jpg', categories: ['all'] },
        { filename: 'export-057.jpg', categories: ['all'] },
        { filename: 'export-058.jpg', categories: ['all'] },
        { filename: 'export-059.jpg', categories: ['all'] },
        { filename: 'export-060.jpg', categories: ['all'] },
        { filename: 'export-061.jpg', categories: ['all'] },
        { filename: 'export-062.jpg', categories: ['all'] },
        { filename: 'export-063.jpg', categories: ['all'] },
        { filename: 'export-064.jpg', categories: ['landscape'] },
        { filename: 'export-065.jpg', categories: ['landscape'] },
        { filename: 'export-066.jpg', categories: ['all'] },
        { filename: 'export-067.jpg', categories: ['all'] },
        { filename: 'export-068.jpg', categories: ['all'] },
        { filename: 'export-069.jpg', categories: ['landscape'] },
        { filename: 'export-070.jpg', categories: ['landscape'] },
        { filename: 'export-071.jpg', categories: ['landscape'] },
        { filename: 'export-072.jpg', categories: ['all'] },
        { filename: 'export-073.jpg', categories: ['all'] },
        { filename: 'export-074.jpg', categories: ['all'] },
        { filename: 'export-075.jpg', categories: ['all'] },
        { filename: 'export-076.jpg', categories: ['all'] },
        { filename: 'export-077.jpg', categories: ['all'] },
        { filename: 'export-079.jpg', categories: ['landscape'] },
        { filename: 'export-080.jpg', categories: ['landscape'] },
        { filename: 'export-081.jpg', categories: ['all'] },
        { filename: 'export-082.jpg', categories: ['all'] },
        { filename: 'export-083.jpg', categories: ['all'] },
        { filename: 'export-084.jpg', categories: ['landscape'] },
        { filename: 'export-085.jpg', categories: ['all'] },
        { filename: 'export-086.jpg', categories: ['all'] },
        { filename: 'export-087.jpg', categories: ['all'] },
        { filename: 'export-088.jpg', categories: ['all'] },
        { filename: 'export-089.jpg', categories: ['all'] },
        { filename: 'export-090.jpg', categories: ['all'] },
        { filename: 'export-091.jpg', categories: ['landscape'] },
        { filename: 'export-092.jpg', categories: ['all'] },
        { filename: 'export-093.jpg', categories: ['all'] },
        { filename: 'export-094.jpg', categories: ['landscape'] },
        { filename: 'export-095.jpg', categories: ['landscape'] },
        { filename: 'export-096.jpg', categories: ['landscape'] },
        { filename: 'export-097.jpg', categories: ['all'] },
        { filename: 'export-098.jpg', categories: ['all'] },
        { filename: 'export-099.jpg', categories: ['landscape'] },
        { filename: 'export-100.jpg', categories: ['all'] },
        { filename: 'export-101.jpg', categories: ['landscape'] },
        { filename: 'export-102.jpg', categories: ['all'] },
        { filename: 'export-103.jpg', categories: ['landscape'] },
        { filename: 'export-104.jpg', categories: ['all'] },
        { filename: 'export-105.jpg', categories: ['landscape'] },
        { filename: 'export-106.jpg', categories: ['landscape'] },
        { filename: 'export-107.jpg', categories: ['all'] },
        { filename: 'export-108.jpg', categories: ['all'] },
        { filename: 'export-109.jpg', categories: ['all'] },
        { filename: 'export-110.jpg', categories: ['all'] },
        { filename: 'export-111.jpg', categories: ['all'] },
        { filename: 'export-112.jpg', categories: ['all'] },
        { filename: 'export-113.jpg', categories: ['landscape'] },
        { filename: 'export-114.jpg', categories: ['landscape'] },
        { filename: 'export-115.jpg', categories: ['all'] },
        { filename: 'export-116.jpg', categories: ['all'] },
        { filename: 'export-117.jpg', categories: ['all'] },
        { filename: 'export-118.jpg', categories: ['all'] },
        { filename: 'export-119.jpg', categories: ['all'] },
        { filename: 'export-120.jpg', categories: ['all'] },
        { filename: 'export-121.jpg', categories: ['all'] },
        { filename: 'export-122.jpg', categories: ['all'] },
        { filename: 'export-123.jpg', categories: ['all'] },
        { filename: 'export-124.jpg', categories: ['all'] }, 
        { filename: 'export-125.jpg', categories: ['all'] },
        { filename: 'export-126.jpg', categories: ['all'] },
        { filename: 'export-127.jpg', categories: ['all'] },
        { filename: 'export-128.jpg', categories: ['all'] },
        { filename: 'export-129.jpg', categories: ['all'] },
        { filename: 'export-130.jpg', categories: ['all'] }, 
        { filename: 'export-131.jpg', categories: ['all'] },
        { filename: 'export-132.jpg', categories: ['all'] },
        { filename: 'export-133.jpg', categories: ['all'] },
        { filename: 'export-134.jpg', categories: ['all'] },
        { filename: 'export-135.jpg', categories: ['all'] },
        { filename: 'export-136.jpg', categories: ['all'] }, 
        { filename: 'export-137.jpg', categories: ['all'] },
        { filename: 'export-138.jpg', categories: ['all'] },
        { filename: 'export-139.jpg', categories: ['all'] },
        { filename: 'export-140.jpg', categories: ['all'] },
        { filename: 'export-141.jpg', categories: ['all'] },
        { filename: 'export-142.jpg', categories: ['all'] },
        { filename: 'export-143.jpg', categories: ['all'] },
        { filename: 'export-144.jpg', categories: ['all'] },
        { filename: 'export-145.jpg', categories: ['all'] },
        { filename: 'export-146.jpg', categories: ['all'] },
        { filename: 'export-147.jpg', categories: ['landscape'] },
        { filename: 'export-148.jpg', categories: ['landscape'] },    
        { filename: 'export-149.jpg', categories: ['all'] },
        { filename: 'export-150.jpg', categories: ['all'] },
        { filename: 'export-151.jpg', categories: ['all'] },
        { filename: 'export-152.jpg', categories: ['all'] },
        { filename: 'export-153.jpg', categories: ['all'] },
        { filename: 'export-154.jpg', categories: ['all'] }, 
        { filename: 'export-155.jpg', categories: ['all'] },
        { filename: 'export-156.jpg', categories: ['all'] },
        { filename: 'export-157.jpg', categories: ['all'] },
        { filename: 'export-158.jpg', categories: ['all'] },
        { filename: 'export-159.jpg', categories: ['all'] },
        { filename: 'export-160.jpg', categories: ['all'] }, 
        { filename: 'export-161.jpg', categories: ['all'] },
        { filename: 'export-162.jpg', categories: ['landscape'] },
        { filename: 'export-163.jpg', categories: ['all'] },
        { filename: 'export-164.jpg', categories: ['all'] },
        { filename: 'export-165.jpg', categories: ['all'] },
        { filename: 'export-166.jpg', categories: ['all'] }, 
        { filename: 'export-167.jpg', categories: ['all'] },
        { filename: 'export-168.jpg', categories: ['all'] },
        { filename: 'export-169.jpg', categories: ['all'] },
        { filename: 'export-170.jpg', categories: ['all'] },
        { filename: 'export-171.jpg', categories: ['all'] },
        { filename: 'export-172.jpg', categories: ['all'] }, 
        { filename: 'export-173.jpg', categories: ['all'] },
        { filename: 'export-174.jpg', categories: ['all'] },
        { filename: 'export-175.jpg', categories: ['all'] },
        { filename: 'export-176.jpg', categories: ['all'] },
        { filename: 'export-177.jpg', categories: ['all'] },
        { filename: 'export-178.jpg', categories: ['all'] }, 
        { filename: 'export-179.jpg', categories: ['all'] },
        { filename: 'export-180.jpg', categories: ['all'] },
        { filename: 'export-181.jpg', categories: ['all'] },
        { filename: 'export-182.jpg', categories: ['all'] },
        { filename: 'export-183.jpg', categories: ['all'] },
        { filename: 'export-184.jpg', categories: ['all'] }, 
        { filename: 'export-185.jpg', categories: ['landscape'] },
        { filename: 'export-186.jpg', categories: ['all'] },
        { filename: 'export-187.jpg', categories: ['landscape'] },
        { filename: 'export-188.jpg', categories: ['landscape'] },
        { filename: 'export-189.jpg', categories: ['landscape'] },
        { filename: 'export-190.jpg', categories: ['all'] },    
        { filename: 'export-191.jpg', categories: ['all'] },
        { filename: 'export-192.jpg', categories: ['all'] },
        { filename: 'export-193.jpg', categories: ['landscape'] },
        { filename: 'export-194.jpg', categories: ['all'] },
        { filename: 'export-195.jpg', categories: ['all'] },
        { filename: 'export-196.jpg', categories: ['all'] },
        { filename: 'export-197.jpg', categories: ['all'] },
        { filename: 'export-198.jpg', categories: ['all'] },
        { filename: 'export-199.jpg', categories: ['all'] },
        { filename: 'export-200.jpg', categories: ['all'] },
        { filename: 'export-201.jpg', categories: ['all'] },
        { filename: 'export-202.jpg', categories: ['landscape'] },
        { filename: 'export-203.jpg', categories: ['landscape'] },
        { filename: 'export-204.jpg', categories: ['all'] },
        { filename: 'export-205.jpg', categories: ['all'] },
        { filename: 'export-206.jpg', categories: ['all'] },
        { filename: 'export-207.jpg', categories: ['all'] },
        { filename: 'export-208.jpg', categories: ['all'] },
        { filename: 'export-209.jpg', categories: ['all'] },
        { filename: 'export-210.jpg', categories: ['all'] },
        { filename: 'export-211.jpg', categories: ['all'] },
        { filename: 'export-212.jpg', categories: ['all'] },
        { filename: 'export-213.jpg', categories: ['all'] },
        { filename: 'export-214.jpg', categories: ['all'] },
        { filename: 'export-215.jpg', categories: ['all'] },
        { filename: 'export-216.jpg', categories: ['all'] },
        { filename: 'export-217.jpg', categories: ['all'] },
        { filename: 'export-218.jpg', categories: ['all'] },
        { filename: 'export-219.jpg', categories: ['all'] },
        { filename: 'export-220.jpg', categories: ['all'] },
        { filename: 'export-221.jpg', categories: ['all'] },
        { filename: 'export-222.jpg', categories: ['all'] },
        { filename: 'export-223.jpg', categories: ['all'] },
        { filename: 'export-224.jpg', categories: ['all'] },
        { filename: 'export-225.jpg', categories: ['landscape'] },
        { filename: 'export-226.jpg', categories: ['landscape'] },
        { filename: 'export-227.jpg', categories: ['all'] },
        { filename: 'export-228.jpg', categories: ['all'] },
        { filename: 'export-229.jpg', categories: ['landscape'] },
        { filename: 'export-230.jpg', categories: ['all'] },
        { filename: 'export-231.jpg', categories: ['all'] },
        { filename: 'export-232.jpg', categories: ['all'] },
        { filename: 'export-233.jpg', categories: ['all'] },
        { filename: 'export-234.jpg', categories: ['all'] },    
        { filename: 'export-235.jpg', categories: ['all'] },
        { filename: 'export-236.jpg', categories: ['all'] },
        { filename: 'export-237.jpg', categories: ['all'] },
        { filename: 'export-238.jpg', categories: ['all'] },
        { filename: 'export-239.jpg', categories: ['all'] }
    ];

    // --- Functions --- 

    // Function to sort images based on current order
    function sortImages(imagesToSort, orderType) {
        const sortedImages = [...imagesToSort]; // Create a copy to avoid mutating original
        
        switch (orderType) {
            case 'alphabetical':
                return sortedImages.sort((a, b) => b.filename.localeCompare(a.filename)); // Reverse alphabetical (Z-A)
            case 'random':
                // Fisher-Yates shuffle algorithm
                for (let i = sortedImages.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [sortedImages[i], sortedImages[j]] = [sortedImages[j], sortedImages[i]];
                }
                return sortedImages;
            case 'default':
            default:
                return sortedImages; // Return in original order
        }
    }

    // Function to display images in the grid (Now using simplified structure)
    function displayImages(filter = 'all', orderType = 'default') {
        imageGrid.innerHTML = ''; // Clear existing grid
        const filteredImages = images.filter(img => 
            filter === 'all' || img.categories.includes(filter)
        );

        // Sort the filtered images
        const sortedImages = sortImages(filteredImages, orderType);

        sortedImages.forEach(imgData => {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');

            const imgElement = document.createElement('img');
            imgElement.src = BASE_THUMB + imgData.filename; // Use Cloudinary thumbnail URL
            imgElement.dataset.fullSrc = BASE_FULL + imgData.filename; // Store full resolution URL
            const altText = imgData.categories.length > 0 
                ? `Photo - ${imgData.categories.join(', ')}` 
                : 'Photo';
            imgElement.alt = altText;
            imgElement.loading = 'lazy'; 
            
            imgElement.addEventListener('click', () => openModal(BASE_FULL + imgData.filename)); // Use full resolution URL for modal

            gridItem.appendChild(imgElement);
            imageGrid.appendChild(gridItem);
        });
    }

    // Function to open the modal (Accepts full image source)
    function openModal(srcFull) {
        isZoomed = false; // Reset zoom state on open
        modalImage.style.transform = 'scale(1)'; // Reset transform
        modalImage.style.transformOrigin = 'center center'; // Reset origin
        modalImage.style.cursor = 'zoom-in'; // Reset cursor
        modalImage.src = srcFull; // Use the full image source passed in
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Function to close the modal
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
        // Reset zoom state potentially needed if closed while zoomed
        isZoomed = false; 
        modalImage.style.transform = 'scale(1)';
        modalImage.style.transformOrigin = 'center center';
        modalImage.style.cursor = 'zoom-in';
    }

    // --- Event Listeners --- 

    // --- Custom Zoom Mechanism ---
    modalImage.addEventListener('touchmove', (event) => {
        if (isZoomed) {
            event.preventDefault(); // Prevent default pinch-to-zoom
        }
    }, { passive: false });

    modalImage.addEventListener('click', (event) => {
        if (isZoomed) {
            // Zoom Out
            modalImage.style.transform = 'scale(1)';
            modalImage.style.transformOrigin = 'center center';
            modalImage.style.cursor = 'zoom-in';
            isZoomed = false;
        } else {
            // Zoom In
            const rect = modalImage.getBoundingClientRect();
            // Calculate click position relative to the image (0 to 1)
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;

            modalImage.style.transformOrigin = `${x * 100}% ${y * 100}%`;
            modalImage.style.transform = 'scale(2)'; // Zoom factor (e.g., 2x)
            modalImage.style.cursor = 'zoom-out';
            isZoomed = true;
        }
    });

    // Filter button clicks
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filterValue = button.getAttribute('data-filter');
            currentFilter = filterValue; // Update current filter
            displayImages(filterValue, isReversed ? 'alphabetical' : 'default'); // Pass current filter and current sort state
        });
    });

    // Sort toggle click
    if (sortToggle) {
        sortToggle.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent any default button behavior
            isReversed = !isReversed; // Toggle reverse state
            sortToggle.textContent = isReversed ? '↓' : '↑'; // Show appropriate arrow
            sortToggle.classList.toggle('active', isReversed); // Highlight when reversed
            displayImages(currentFilter, isReversed ? 'alphabetical' : 'default'); // Pass current filter and new order
        });
    }

    // Close modal listeners
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        // Close if clicked outside the image content
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // --- Intro Text Toggle --- 
    if (introToggle && introTextBox) { // Check if elements exist
        introToggle.addEventListener('click', () => {
            introTextBox.classList.toggle('show');
        });
    }

    // --- Site Title Hover Effect --- 
    if (siteTitle) { // Check if element exists
        originalTitle = siteTitle.textContent; // Store the actual initial text
        siteTitle.addEventListener('mouseenter', () => {
            siteTitle.textContent = 'Just for fun :)';
        });
        siteTitle.addEventListener('mouseleave', () => {
            siteTitle.textContent = originalTitle;
        });
    }

    // --- Initial Load --- 
    // loadAllImages(); // OLD METHOD
    // applyFilter(); // OLD METHOD
    // displayImages(); // Old initial call (defaulted to 'all')
    displayImages('landscape', 'alphabetical'); // New initial call, matches the default active button and reverse alphabetical order
    
    // Set initial button text to show down arrow (Z-A)
    if (sortToggle) {
        sortToggle.textContent = '↓';
        sortToggle.classList.add('active');
    }

    // --- Touch Event Listeners for Mobile ---
    let touchStartY = 0;
    let touchStartX = 0;
    let touchStartTime = 0;
    let isPinching = false;

    modalImage.addEventListener('touchstart', (event) => {
        if (isPinching || isZoomed) return; // Disable swipe if pinching or zoomed
        if (event.touches.length > 1) {
            isPinching = true;
            return;
        }
        isPinching = false;
        touchStartY = event.touches[0].clientY;
        touchStartX = event.touches[0].clientX;
        touchStartTime = new Date().getTime();
    });

    modal.addEventListener('touchend', (event) => {
        if (isPinching || isZoomed) return; // Disable swipe if pinching or zoomed

        const touchEndY = event.changedTouches[0].clientY;
        const touchEndX = event.changedTouches[0].clientX;
        const touchEndTime = new Date().getTime();
        const timeDiff = touchEndTime - touchStartTime;

        // Calculate distances
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;

        // Minimum time threshold for swipe
        if (timeDiff < 100) return;

        // Swipe up or down to close
        if (Math.abs(deltaY) > 80 && (Math.abs(angle) > 45 && Math.abs(angle) < 135)) { // Increased sensitivity
            closeModal();
        }

        // Swipe left-to-right → go left
        if (deltaX > 80 && (Math.abs(angle) < 45 || Math.abs(angle) > 135)) { // Increased sensitivity
            navigateImages('left');
        }

        // Swipe right-to-left → go right
        if (deltaX < -80 && (Math.abs(angle) < 45 || Math.abs(angle) > 135)) { // Increased sensitivity
            navigateImages('right');
        }
    });

    let lastTouchX = 0;
    let lastTouchY = 0;

    modalImage.addEventListener('touchstart', (event) => {
        if (isZoomed && event.touches.length === 1) {
            lastTouchX = event.touches[0].clientX;
            lastTouchY = event.touches[0].clientY;
        }
    });

    modalImage.addEventListener('touchmove', (event) => {
        if (isZoomed && event.touches.length === 1) {
            event.preventDefault(); // Prevent default behavior
            const touchX = event.touches[0].clientX;
            const touchY = event.touches[0].clientY;

            const deltaX = (touchX - lastTouchX) * 0.6; // Slightly increased sensitivity
            const deltaY = (touchY - lastTouchY) * 0.6; // Slightly increased sensitivity

            const currentTransform = modalImage.style.transform.match(/translate\(([^)]+)\)/);
            const currentTranslate = currentTransform ? currentTransform[1].split(',').map(parseFloat) : [0, 0];

            const newTranslateX = currentTranslate[0] + deltaX;
            const newTranslateY = currentTranslate[1] + deltaY;

            // Calculate tighter boundaries
            const rect = modalImage.getBoundingClientRect();
            const maxTranslateX = (rect.width * (2 - 1)) / 4; // Quarter of the zoomed width
            const maxTranslateY = (rect.height * (2 - 1)) / 4; // Quarter of the zoomed height

            // Apply tighter boundaries
            const boundedTranslateX = Math.max(-maxTranslateX, Math.min(maxTranslateX, newTranslateX));
            const boundedTranslateY = Math.max(-maxTranslateY, Math.min(maxTranslateY, newTranslateY));

            modalImage.style.transform = `scale(2) translate(${boundedTranslateX}px, ${boundedTranslateY}px)`;

            lastTouchX = touchX;
            lastTouchY = touchY;
        }
    }, { passive: false });

    // Function to navigate images
    function navigateImages(direction) {
        const currentSrc = modalImage.src.split('/').pop();
        const filteredImages = images.filter(img => currentFilter === 'all' || img.categories.includes(currentFilter));
        const sortedImages = sortImages(filteredImages, isReversed ? 'alphabetical' : 'default');
        const currentIndex = sortedImages.findIndex(img => img.filename === currentSrc);
        let newIndex;

        if (direction === 'right') {
            newIndex = (currentIndex + 1) % sortedImages.length;
        } else {
            newIndex = (currentIndex - 1 + sortedImages.length) % sortedImages.length;
        }

        const newImage = sortedImages[newIndex];
        openModal(BASE_FULL + newImage.filename);
    }

}); 