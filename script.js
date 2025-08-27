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

    // Device detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    // --- Modal Functions ---
    function openModal(imageSrc) {
        modal.style.display = 'flex';
        
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
        
        if (isMobile) {
            // Mobile: Show timeline with multiple images
            showTimeline(currentIndex);
        } else {
            // Desktop: Show single image with arrows
            showSingleImage(imageSrc);
        }
        
        document.body.style.overflow = 'hidden';
        
        // Preload neighboring images for smooth navigation
        preloadNeighboringImages();
    }
    
    function showTimeline(startIndex) {
        const timelineContainer = document.getElementById('modal-timeline');
        const modalImage = document.getElementById('modalImage');
        
        // Hide single image view
        modalImage.classList.add('timeline-mode');
        
        // Show timeline
        timelineContainer.classList.add('active');
        
        // Build timeline with all images
        buildTimeline(startIndex);
        
        // Scroll to starting image
        setTimeout(() => {
            const startItem = timelineContainer.querySelector(`[data-index="${startIndex}"]`);
            if (startItem) {
                startItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    }
    
    function showSingleImage(imageSrc) {
        const timelineContainer = document.getElementById('modal-timeline');
        const modalImage = document.getElementById('modalImage');
        
        // Hide timeline
        timelineContainer.classList.remove('active');
        
        // Show single image
        modalImage.classList.remove('timeline-mode');
        modalImage.src = imageSrc;
        
        // Show navigation arrows on desktop
        const leftArrow = document.getElementById('nav-left');
        const rightArrow = document.getElementById('nav-right');
        
        if (leftArrow && rightArrow) {
            leftArrow.style.display = 'block';
            rightArrow.style.display = 'block';
        }
        
        // Show/hide navigation arrows based on position
        updateNavigationArrows();
    }
    
    function buildTimeline(startIndex) {
        const timelineContainer = document.getElementById('modal-timeline');
        timelineContainer.innerHTML = '';
        
        modal.navigationImages.forEach((image, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            timelineItem.dataset.index = index;
            
            const img = document.createElement('img');
            img.src = BASE_FULL + image.filename;
            img.alt = `Photo ${index + 1}`;
            img.loading = 'lazy';
            
            // Add zoom functionality for mobile timeline
            img.addEventListener('click', (event) => {
                if (isMobile) {
                    handleTimelineImageZoom(img, event);
                }
            });
            
            timelineItem.appendChild(img);
            timelineContainer.appendChild(timelineItem);
        });
        
        // Add scroll listener to auto-unzoom images when scrolled away from
        if (isMobile) {
            timelineContainer.addEventListener('scroll', handleTimelineScroll);
        }
    }
    
    function handleTimelineScroll() {
        const timelineContainer = document.getElementById('modal-timeline');
        const zoomedImages = timelineContainer.querySelectorAll('img.zoomed');
        
        zoomedImages.forEach(img => {
            const rect = img.getBoundingClientRect();
            const containerRect = timelineContainer.getBoundingClientRect();
            
            // Calculate how much of the image is visible
            const imageHeight = rect.height;
            const visibleHeight = Math.min(rect.bottom, containerRect.bottom) - Math.max(rect.top, containerRect.top);
            const visibilityPercentage = visibleHeight / imageHeight;
            
            // If image is less than 40% visible (60% scrolled away), unzoom it
            if (visibilityPercentage < 0.4) {
                img.classList.remove('zoomed');
                img.style.cursor = 'zoom-in';
                // Remove drag functionality and reset position
                removeImageDrag(img);
            }
        });
    }
    
    function handleTimelineImageZoom(img, event) {
        if (img.classList.contains('zoomed')) {
            // Zoom out
            img.classList.remove('zoomed');
            img.style.cursor = 'zoom-in';
            // Remove drag functionality and reset transform
            removeImageDrag(img);
            img.style.transform = '';
        } else {
            // Zoom in
            img.classList.add('zoomed');
            img.style.cursor = 'zoom-out';
            
            // Calculate click position relative to the image for zoom origin
            const rect = img.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;
            
            img.style.transformOrigin = `${x * 100}% ${y * 100}%`;
            
            // Add drag functionality
            addImageDrag(img);
        }
    }
    
    function addImageDrag(img) {
        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let currentTranslateX = 0;
        let currentTranslateY = 0;
        
        const handleTouchStart = (e) => {
            isDragging = true;
            startX = e.touches[0].clientX - currentTranslateX;
            startY = e.touches[0].clientY - currentTranslateY;
        };
        
        const handleTouchMove = (e) => {
            if (!isDragging) return;
            
            e.preventDefault();
            
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            
            currentTranslateX = currentX - startX;
            currentTranslateY = currentY - startY;
            
            // Apply the translation
            img.style.transform = `scale(3) translate(${currentTranslateX}px, ${currentTranslateY}px)`;
        };
        
        const handleTouchEnd = () => {
            isDragging = false;
        };
        
        // Store the handlers for cleanup
        img.dragHandlers = { handleTouchStart, handleTouchMove, handleTouchEnd };
        
        // Add touch event listeners
        img.addEventListener('touchstart', handleTouchStart, { passive: false });
        img.addEventListener('touchmove', handleTouchMove, { passive: false });
        img.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
    
    function removeImageDrag(img) {
        if (img.dragHandlers) {
            img.removeEventListener('touchstart', img.dragHandlers.handleTouchStart);
            img.removeEventListener('touchmove', img.dragHandlers.handleTouchMove);
            img.removeEventListener('touchend', img.dragHandlers.handleTouchEnd);
            img.dragHandlers = null;
        }
        
        // Reset any translation - only keep the scale(3) for zoomed state
        if (img.classList.contains('zoomed')) {
            img.style.transform = 'scale(3)';
        } else {
            img.style.transform = '';
        }
    }
    
    function preloadNeighboringImages() {
        if (!modal.navigationImages || modal.currentIndex === undefined) return;
        
        const imagesToPreload = [];
        
        // Preload more images ahead and behind for smooth scrolling
        const preloadRange = 3; // Load 3 images in each direction
        
        for (let i = 1; i <= preloadRange; i++) {
            // Preload previous images
            if (modal.currentIndex - i >= 0) {
                const prevImage = modal.navigationImages[modal.currentIndex - i];
                imagesToPreload.push(BASE_FULL + prevImage.filename);
            }
            
            // Preload next images
            if (modal.currentIndex + i < modal.navigationImages.length) {
                const nextImage = modal.navigationImages[modal.currentIndex + i];
                imagesToPreload.push(BASE_FULL + nextImage.filename);
            }
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
        // Only show arrows on desktop (single image mode)
        if (!isMobile) {
            const leftArrow = document.getElementById('nav-left');
            const rightArrow = document.getElementById('nav-right');
            
            if (leftArrow && rightArrow) {
                // Always show arrows on desktop, then hide based on position
                leftArrow.style.display = 'block';
                rightArrow.style.display = 'block';
                
                // Hide left arrow if at first image
                if (modal.currentIndex <= 0) {
                    leftArrow.style.display = 'none';
                }
                
                // Hide right arrow if at last image
                if (modal.currentIndex >= modal.navigationImages.length - 1) {
                    rightArrow.style.display = 'none';
                }
            }
        }
    }
    
    function navigateImage(direction) {
        if (!modal.navigationImages || modal.currentIndex === undefined || isMobile) return;
        
        let newIndex;
        if (direction === 'left') {
            newIndex = modal.currentIndex - 1;
        } else {
            newIndex = modal.currentIndex + 1;
        }
        
        // Check bounds
        if (newIndex >= 0 && newIndex < modal.navigationImages.length) {
            modal.currentIndex = newIndex;
            const newImage = modal.navigationImages[newIndex];
            modalImage.src = BASE_FULL + newImage.filename;
            
            updateNavigationArrows();
            preloadNeighboringImages();
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
        
        // Reset zoom state potentially needed if closed while zoomed
        isZoomed = false; 
        modalImage.style.transform = 'scale(1)';
        modalImage.style.transformOrigin = 'center center';
        modalImage.style.cursor = 'zoom-in';
        
        // Reset timeline mode
        const timelineContainer = document.getElementById('modal-timeline');
        const modalImage = document.getElementById('modalImage');
        
        timelineContainer.classList.remove('active');
        modalImage.classList.remove('timeline-mode');
        
        // Remove scroll listener and unzoom all timeline images
        if (isMobile) {
            timelineContainer.removeEventListener('scroll', handleTimelineScroll);
            const zoomedImages = timelineContainer.querySelectorAll('img.zoomed');
            zoomedImages.forEach(img => {
                img.classList.remove('zoomed');
                img.style.cursor = 'zoom-in';
                // Remove drag functionality and reset position
                removeImageDrag(img);
            });
        }
        
        // Clean up preloaded images
        cleanupPreloadedImages();
    }

    // --- Event Listeners --- 

    // Zoom functionality on modal image click (desktop only)
    modalImage.addEventListener('click', (event) => {
        if (!isMobile) { // Only allow zoom on desktop
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
        leftArrow.addEventListener('click', () => navigateImage('left')); // No animation
    }
    
    if (rightArrow) {
        rightArrow.addEventListener('click', () => navigateImage('right')); // No animation
    }
    
    // Enhanced keyboard navigation for modal
    document.addEventListener('keydown', (event) => {
        if (modal.style.display === 'flex') {
            if (event.key === 'ArrowLeft') {
                navigateImage('left'); // No animation
            } else if (event.key === 'ArrowRight') {
                navigateImage('right'); // No animation
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