document.addEventListener('DOMContentLoaded', () => {
    const imageGrid = document.getElementById('image-grid');
    const filterButtons = document.querySelectorAll('nav button');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    const closeButton = document.querySelector('.close');
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
        { filename: 'export-220.jpg', categories: ['all'] }
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
        console.log('displayImages called with:', filter, orderType);
        imageGrid.innerHTML = ''; // Clear existing grid
        const filteredImages = images.filter(img => 
            filter === 'all' || img.categories.includes(filter)
        );
        console.log('Filtered images count:', filteredImages.length);

        // Sort the filtered images
        const sortedImages = sortImages(filteredImages, orderType);
        console.log('Sorted images count:', sortedImages.length);

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
        console.log('Finished adding images to grid');
    }

    // --- Modal Functions ---
    function openModal(imageSrc) {
        modal.style.display = 'flex';
        modalImage.src = imageSrc;
        document.body.style.overflow = 'hidden';
        
        // Store current filter and sort state for navigation
        modal.currentFilter = currentFilter;
        modal.currentOrder = isReversed ? 'alphabetical' : 'default';
        
        // Get the current filtered and sorted images for navigation
        const currentImages = images.filter(img => 
            modal.currentFilter === 'all' || img.categories.includes(modal.currentFilter)
        );
        const sortedImages = sortImages(currentImages, modal.currentOrder);
        
        // Find current image index
        const currentIndex = sortedImages.findIndex(img => 
            BASE_FULL + img.filename === imageSrc
        );
        
        // Store navigation data
        modal.navigationImages = sortedImages;
        modal.currentIndex = currentIndex;
        
        // Show/hide navigation arrows based on position
        updateNavigationArrows();
        
        // Add touch event listeners for swipe gestures
        addSwipeListeners();
        
        // Preload neighboring images for smooth navigation
        preloadNeighboringImages();
    }
    
    function preloadNeighboringImages() {
        if (!modal.navigationImages || modal.currentIndex === undefined) return;
        
        const imagesToPreload = [];
        
        // Preload previous image
        if (modal.currentIndex > 0) {
            const prevImage = modal.navigationImages[modal.currentIndex - 1];
            imagesToPreload.push(BASE_FULL + prevImage.filename);
        }
        
        // Preload next image
        if (modal.currentIndex < modal.navigationImages.length - 1) {
            const nextImage = modal.navigationImages[modal.currentIndex + 1];
            imagesToPreload.push(BASE_FULL + nextImage.filename);
        }
        
        // Create hidden image elements to preload
        imagesToPreload.forEach(src => {
            const img = new Image();
            img.src = src;
            // Store in modal for cleanup
            if (!modal.preloadedImages) modal.preloadedImages = [];
            modal.preloadedImages.push(img);
        });
    }
    
    function cleanupPreloadedImages() {
        if (modal.preloadedImages) {
            modal.preloadedImages = [];
        }
    }
    
    function updateNavigationArrows() {
        const leftArrow = document.getElementById('nav-left');
        const rightArrow = document.getElementById('nav-right');
        
        if (modal.currentIndex > 0) {
            leftArrow.style.display = 'block';
        } else {
            leftArrow.style.display = 'none';
        }
        
        if (modal.currentIndex < modal.navigationImages.length - 1) {
            rightArrow.style.display = 'block';
        } else {
            rightArrow.style.display = 'none';
        }
    }
    
    function navigateImage(direction, useAnimation = false) {
        if (!modal.navigationImages || modal.currentIndex === undefined) return;
        
        // Prevent rapid navigation while loading
        if (modal.isNavigating) return;
        modal.isNavigating = true;
        
        let newIndex;
        if (direction === 'left') {
            newIndex = modal.currentIndex - 1;
        } else {
            newIndex = modal.currentIndex + 1;
        }
        
        // Check bounds
        if (newIndex >= 0 && newIndex < modal.navigationImages.length) {
            // Add animation class based on direction (only for swipe gestures)
            if (useAnimation) {
                if (direction === 'left') {
                    modalImage.classList.add('slide-right'); // Going to previous (right swipe)
                } else {
                    modalImage.classList.add('slide-left'); // Going to next (left swipe)
                }
            }
            
            // Update image source
            modal.currentIndex = newIndex;
            const newImage = modal.navigationImages[newIndex];
            modalImage.src = BASE_FULL + newImage.filename;
            
            if (useAnimation) {
                // Wait for image to load before completing animation
                modalImage.onload = () => {
                    // Remove animation classes after animation completes
                    setTimeout(() => {
                        modalImage.classList.remove('slide-left', 'slide-right');
                        modal.isNavigating = false; // Allow navigation again
                    }, 300); // Match the CSS animation duration
                    
                    updateNavigationArrows();
                    
                    // Preload new neighboring images for the new position
                    preloadNeighboringImages();
                };
                
                // Fallback in case onload doesn't fire
                setTimeout(() => {
                    if (modal.isNavigating) {
                        modal.isNavigating = false;
                    }
                }, 1000);
            } else {
                // No animation - immediate navigation
                modalImage.onload = () => {
                    modal.isNavigating = false;
                    updateNavigationArrows();
                    preloadNeighboringImages();
                };
                
                // Fallback for immediate navigation
                setTimeout(() => {
                    if (modal.isNavigating) {
                        modal.isNavigating = false;
                    }
                }, 500);
            }
        } else {
            modal.isNavigating = false;
        }
    }
    
    function addSwipeListeners() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        const handleTouchStart = (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        };
        
        const handleTouchEnd = (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            // Calculate swipe distance and direction
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            // Minimum swipe distance to trigger navigation
            const minSwipeDistance = 50;
            
            // Check if it's a horizontal swipe (more horizontal than vertical)
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0) {
                    // Swipe right - go to previous image
                    navigateImage('left', true); // Use animation
                } else {
                    // Swipe left - go to next image
                    navigateImage('right', true); // Use animation
                }
            }
        };
        
        // Add touch event listeners to the modal
        modal.addEventListener('touchstart', handleTouchStart, { passive: true });
        modal.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        // Store listeners for cleanup
        modal.swipeListeners = { handleTouchStart, handleTouchEnd };
    }
    
    function removeSwipeListeners() {
        if (modal.swipeListeners) {
            modal.removeEventListener('touchstart', modal.swipeListeners.handleTouchStart);
            modal.removeEventListener('touchend', modal.swipeListeners.handleTouchEnd);
            modal.swipeListeners = null;
        }
    }

    // Function to close the modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Reset navigation state
        modal.navigationImages = null;
        modal.currentIndex = undefined;
        modal.currentFilter = undefined;
        modal.currentOrder = undefined;
        modal.isNavigating = false;
        
        // Reset zoom state potentially needed if closed while zoomed
        isZoomed = false; 
        modalImage.style.transform = 'scale(1)';
        modalImage.style.transformOrigin = 'center center';
        modalImage.style.cursor = 'zoom-in';
        
        // Remove swipe listeners
        removeSwipeListeners();
        cleanupPreloadedImages(); // Clean up preloaded images on close
    }

    // --- Event Listeners --- 

    // Zoom functionality on modal image click
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
    
    // Navigation arrows
    const leftArrow = document.getElementById('nav-left');
    const rightArrow = document.getElementById('nav-right');
    
    if (leftArrow) {
        leftArrow.addEventListener('click', () => navigateImage('left', false)); // No animation
    }
    
    if (rightArrow) {
        rightArrow.addEventListener('click', () => navigateImage('right', false)); // No animation
    }
    
    // Enhanced keyboard navigation for modal
    document.addEventListener('keydown', (event) => {
        if (modal.style.display === 'flex') {
            if (event.key === 'ArrowLeft') {
                navigateImage('left', true); // Use animation
            } else if (event.key === 'ArrowRight') {
                navigateImage('right', true); // Use animation
            } else if (event.key === 'Escape') {
                closeModal();
            }
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
    console.log('About to call displayImages with:', 'landscape', 'alphabetical');
    console.log('imageGrid element:', imageGrid);
    console.log('images array length:', images.length);
    displayImages('landscape', 'alphabetical'); // New initial call, matches the default active button and reverse alphabetical order
    
    // Set initial button text to show down arrow (Z-A)
    if (sortToggle) {
        sortToggle.textContent = '↓';
        sortToggle.classList.add('active');
    }

}); 