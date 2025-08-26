document.addEventListener('DOMContentLoaded', () => {
    const imageGrid = document.getElementById('image-grid');
    const filterButtons = document.querySelectorAll('nav button');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const closeButton = document.querySelector('.close-button');
    const siteTitle = document.querySelector('.site-title');
    const introToggle = document.getElementById('intro-toggle'); // Get the toggle element
    const introTextBox = document.getElementById('intro-text-box'); // Get the text box element

    const BASE_FULL = 'https://res.cloudinary.com/dyy8mqxwi/image/upload/v1753994362/';
    const BASE_THUMB = 'https://res.cloudinary.com/dyy8mqxwi/image/upload/w_1000,q_auto,f_auto/v1753994362/';

    let isZoomed = false;
    let originalTitle = 'POORBYPORTRA';

   
    const images = [
        { filename: 'export-001.jpg', categories: ['travel'] },
        { filename: 'export-002.jpg', categories: ['landscape'] },
        { filename: 'export-003.jpg', categories: ['landscape'] },
        { filename: 'export-004.jpg', categories: ['landscape'] },
        { filename: 'export-005.jpg', categories: ['landscape'] },
        { filename: 'export-006.jpg', categories: ['travel'] },
        { filename: 'export-007.jpg', categories: ['landscape', 'travel'] },
        { filename: 'export-008.jpg', categories: ['travel'] },
        { filename: 'export-009.jpg', categories: ['travel'] },
        { filename: 'export-010.jpg', categories: ['landscape'] },
        { filename: 'export-011.jpg', categories: ['street'] },
        { filename: 'export-012.jpg', categories: ['street'] },
        { filename: 'export-013.jpg', categories: ['street'] },
        { filename: 'export-014.jpg', categories: ['street'] },
        { filename: 'export-015.jpg', categories: ['street'] },
        { filename: 'export-016.jpg', categories: ['street'] },
        { filename: 'export-017.jpg', categories: ['landscape'] },
        { filename: 'export-018.jpg', categories: ['landscape'] },
        { filename: 'export-019.jpg', categories: ['landscape'] },
        { filename: 'export-020.jpg', categories: ['landscape'] },
        { filename: 'export-021.jpg', categories: ['travel', 'street'] },
        { filename: 'export-022.jpg', categories: ['travel'] },
        { filename: 'export-023.jpg', categories: ['travel'] },
        { filename: 'export-024.jpg', categories: ['travel'] },
        { filename: 'export-025.jpg', categories: ['travel'] },
        { filename: 'export-026.jpg', categories: ['street'] },
        { filename: 'export-027.jpg', categories: ['travel'] },
        { filename: 'export-028.jpg', categories: ['travel'] },
        { filename: 'export-029.jpg', categories: ['landscape'] },
        { filename: 'export-030.jpg', categories: ['travel'] },
        { filename: 'export-031.jpg', categories: ['travel'] },
        { filename: 'export-032.jpg', categories: ['travel'] },
        { filename: 'export-033.jpg', categories: ['travel'] },
        { filename: 'export-034.jpg', categories: ['street', 'travel'] },
        { filename: 'export-035.jpg', categories: ['travel'] },
        { filename: 'export-036.jpg', categories: ['landscape'] },
        { filename: 'export-037.jpg', categories: ['travel', 'street'] },
        { filename: 'export-038.jpg', categories: ['travel'] },
        { filename: 'export-039.jpg', categories: ['travel'] },
        { filename: 'export-040.jpg', categories: ['landscape'] },
        { filename: 'export-041.jpg', categories: ['travel'] },
        { filename: 'export-042.jpg', categories: ['landscape'] },
        { filename: 'export-043.jpg', categories: ['landscape'] },
        { filename: 'export-044.jpg', categories: ['landscape'] },
        { filename: 'export-045.jpg', categories: ['travel'] },
        { filename: 'export-046.jpg', categories: ['travel'] },
        { filename: 'export-047.jpg', categories: ['travel'] },
        { filename: 'export-048.jpg', categories: ['street', 'travel'] },
        { filename: 'export-049.jpg', categories: ['travel', 'street'] },
        { filename: 'export-050.jpg', categories: ['landscape'] },
        { filename: 'export-051.jpg', categories: ['landscape'] },
        { filename: 'export-052.jpg', categories: ['travel'] },
        { filename: 'export-053.jpg', categories: ['landscape'] },
        { filename: 'export-054.jpg', categories: ['travel'] },
        { filename: 'export-055.jpg', categories: ['street', 'travel'] },
        { filename: 'export-056.jpg', categories: ['street'] },
        { filename: 'export-057.jpg', categories: ['travel'] },
        { filename: 'export-058.jpg', categories: ['street'] },
        { filename: 'export-059.jpg', categories: ['travel'] },
        { filename: 'export-060.jpg', categories: ['travel'] },
        { filename: 'export-061.jpg', categories: ['travel'] },
        { filename: 'export-062.jpg', categories: ['travel'] },
        { filename: 'export-063.jpg', categories: ['travel'] },
        { filename: 'export-064.jpg', categories: ['landscape'] },
        { filename: 'export-065.jpg', categories: ['travel'] },
        { filename: 'export-066.jpg', categories: ['street', 'travel'] },
        { filename: 'export-067.jpg', categories: ['travel'] },
        { filename: 'export-068.jpg', categories: ['travel'] },
        { filename: 'export-069.jpg', categories: ['travel'] },
        { filename: 'export-070.jpg', categories: ['travel'] },
        { filename: 'export-071.jpg', categories: ['travel'] },
        { filename: 'export-072.jpg', categories: ['street'] },
        { filename: 'export-073.jpg', categories: ['street', 'travel'] },
        { filename: 'export-074.jpg', categories: ['street', 'travel'] },
        { filename: 'export-075.jpg', categories: ['travel'] },
        { filename: 'export-076.jpg', categories: ['travel'] },
        { filename: 'export-077.jpg', categories: ['travel'] },
        { filename: 'export-079.jpg', categories: ['landscape', 'travel'] },
        { filename: 'export-080.jpg', categories: ['landscape', 'travel'] },
        { filename: 'export-081.jpg', categories: ['travel'] },
        { filename: 'export-082.jpg', categories: ['travel'] },
        { filename: 'export-083.jpg', categories: ['travel'] },
        { filename: 'export-084.jpg', categories: ['landscape', 'travel'] },
        { filename: 'export-085.jpg', categories: ['travel'] },
        { filename: 'export-086.jpg', categories: ['street', 'travel'] },
        { filename: 'export-087.jpg', categories: ['travel'] },
        { filename: 'export-088.jpg', categories: ['street', 'travel'] },
        { filename: 'export-089.jpg', categories: ['street', 'travel'] },
        { filename: 'export-090.jpg', categories: ['travel'] },
        { filename: 'export-091.jpg', categories: ['landscape', 'travel'] },
        { filename: 'export-092.jpg', categories: ['travel'] },
        { filename: 'export-093.jpg', categories: ['travel'] },
        { filename: 'export-094.jpg', categories: ['landscape', 'travel'] },
        { filename: 'export-095.jpg', categories: ['landscape', 'travel'] },
        { filename: 'export-096.jpg', categories: ['landscape', 'travel'] },
        { filename: 'export-097.jpg', categories: ['travel'] },
        { filename: 'export-098.jpg', categories: ['travel'] },
        { filename: 'export-099.jpg', categories: ['landscape', 'travel'] },
        { filename: 'export-100.jpg', categories: ['travel'] },
        { filename: 'export-101.jpg', categories: ['landscape', 'travel'] },
        { filename: 'export-102.jpg', categories: ['travel'] },
        { filename: 'export-103.jpg', categories: ['landscape', 'travel'] },
        { filename: 'export-104.jpg', categories: ['travel'] },
        { filename: 'export-105.jpg', categories: ['landscape', 'travel'] },
        { filename: 'export-106.jpg', categories: ['landscape', 'travel'] },
        { filename: 'export-107.jpg', categories: ['travel'] },
        { filename: 'export-108.jpg', categories: ['travel'] },
        { filename: 'export-109.jpg', categories: ['travel'] },
        { filename: 'export-110.jpg', categories: ['street', 'travel'] },
        { filename: 'export-111.jpg', categories: ['street', 'travel'] },
        { filename: 'export-112.jpg', categories: ['travel'] },
        { filename: 'export-113.jpg', categories: ['landscape', 'travel'] },
        { filename: 'export-114.jpg', categories: ['landscape', 'travel'] },
        { filename: 'export-115.jpg', categories: ['travel'] },
        { filename: 'export-116.jpg', categories: ['travel'] },
        { filename: 'export-117.jpg', categories: ['street', 'travel'] },
        { filename: 'export-118.jpg', categories: ['street', 'travel'] },
        { filename: 'export-119.jpg', categories: ['street', 'travel'] },
        { filename: 'export-120.jpg', categories: ['street', 'travel'] },
        { filename: 'export-121.jpg', categories: ['street', 'travel'] },
        { filename: 'export-122.jpg', categories: ['street', 'travel'] },
        { filename: 'export-123.jpg', categories: ['street', 'travel'] },
        { filename: 'export-124.jpg', categories: ['street', 'travel'] }, 
        { filename: 'export-125.jpg', categories: ['travel'] },
        { filename: 'export-126.jpg', categories: ['travel'] },
        { filename: 'export-127.jpg', categories: ['travel'] },
        { filename: 'export-128.jpg', categories: ['street', 'travel'] },
        { filename: 'export-129.jpg', categories: ['street', 'travel'] },
        { filename: 'export-130.jpg', categories: ['street', 'travel'] }, 
        { filename: 'export-131.jpg', categories: ['street', 'travel'] },
        { filename: 'export-132.jpg', categories: ['street', 'travel'] },
        { filename: 'export-133.jpg', categories: ['street', 'travel'] },
        { filename: 'export-134.jpg', categories: ['street', 'travel'] },
        { filename: 'export-135.jpg', categories: ['travel'] },
        { filename: 'export-136.jpg', categories: ['travel'] }, 
        { filename: 'export-137.jpg', categories: ['travel'] },
        { filename: 'export-138.jpg', categories: ['travel'] },
        { filename: 'export-139.jpg', categories: ['travel'] },
        { filename: 'export-140.jpg', categories: ['travel'] },
        { filename: 'export-141.jpg', categories: ['travel'] },
        { filename: 'export-142.jpg', categories: ['travel'] },
        { filename: 'export-143.jpg', categories: ['travel'] },
        { filename: 'export-144.jpg', categories: ['travel'] },
        { filename: 'export-145.jpg', categories: ['travel'] },
        { filename: 'export-146.jpg', categories: ['travel'] },
        { filename: 'export-147.jpg', categories: ['landscape', 'travel'] },
        { filename: 'export-148.jpg', categories: ['landscape', 'travel'] },    
        { filename: 'export-149.jpg', categories: ['travel'] },
        { filename: 'export-150.jpg', categories: ['travel'] },
        { filename: 'export-151.jpg', categories: ['travel'] },
        { filename: 'export-152.jpg', categories: ['travel'] },
        { filename: 'export-153.jpg', categories: [ 'travel'] },
        { filename: 'export-154.jpg', categories: ['travel'] }, 
        { filename: 'export-155.jpg', categories: ['travel'] },
        { filename: 'export-156.jpg', categories: [ 'travel'] },
        { filename: 'export-157.jpg', categories: [ 'travel'] },
        { filename: 'export-158.jpg', categories: ['travel'] },
        { filename: 'export-159.jpg', categories: ['travel'] },
        { filename: 'export-160.jpg', categories: ['travel'] }, 
        { filename: 'export-161.jpg', categories: ['travel'] },
        { filename: 'export-162.jpg', categories: ['landscape', 'travel'] },
        { filename: 'export-163.jpg', categories: ['travel'] },
        { filename: 'export-164.jpg', categories: ['street', 'travel'] },
        { filename: 'export-165.jpg', categories: ['travel'] },
        { filename: 'export-166.jpg', categories: ['travel'] }, 
        { filename: 'export-167.jpg', categories: ['travel'] },
        { filename: 'export-168.jpg', categories: ['travel'] },
        { filename: 'export-169.jpg', categories: ['travel'] },
        { filename: 'export-170.jpg', categories: ['travel'] },
        { filename: 'export-171.jpg', categories: ['travel'] },
        { filename: 'export-172.jpg', categories: ['travel'] }, 
        { filename: 'export-173.jpg', categories: ['travel'] },
        { filename: 'export-174.jpg', categories: ['travel'] },
        { filename: 'export-175.jpg', categories: ['travel'] },
        { filename: 'export-176.jpg', categories: ['travel'] },
        { filename: 'export-177.jpg', categories: ['travel'] },
        { filename: 'export-178.jpg', categories: ['travel'] }, 
        { filename: 'export-179.jpg', categories: ['travel'] },
        { filename: 'export-180.jpg', categories: ['travel'] },
        { filename: 'export-181.jpg', categories: ['travel'] },
        { filename: 'export-182.jpg', categories: ['travel'] },
        { filename: 'export-183.jpg', categories: ['travel'] },
        { filename: 'export-184.jpg', categories: ['travel'] }, 
        { filename: 'export-185.jpg', categories: ['landscape', 'travel'] },
        { filename: 'export-186.jpg', categories: ['travel'] },
        { filename: 'export-187.jpg', categories: ['landscape', 'travel'] },
        { filename: 'export-188.jpg', categories: ['landscape', 'travel'] },
        { filename: 'export-189.jpg', categories: ['landscape', 'travel'] },
        { filename: 'export-190.jpg', categories: ['travel'] },    
        { filename: 'export-191.jpg', categories: ['travel'] },
        { filename: 'export-192.jpg', categories: ['travel'] },
        { filename: 'export-193.jpg', categories: ['landscape', 'travel'] },
        { filename: 'export-194.jpg', categories: ['travel'] },
        { filename: 'export-195.jpg', categories: ['street', 'travel'] },
        { filename: 'export-196.jpg', categories: ['street', 'travel'] },
        { filename: 'export-197.jpg', categories: ['street', 'travel'] },
        { filename: 'export-198.jpg', categories: ['street', 'travel'] },
        { filename: 'export-199.jpg', categories: ['street', 'travel'] },
        { filename: 'export-200.jpg', categories: ['street', 'travel'] },
        { filename: 'export-201.jpg', categories: ['street', 'travel'] },
        { filename: 'export-202.jpg', categories: ['landscape'] },
        { filename: 'export-203.jpg', categories: ['landscape'] },
        { filename: 'export-204.jpg', categories: ['travel'] },
        { filename: 'export-205.jpg', categories: ['travel'] },
        { filename: 'export-206.jpg', categories: ['travel'] },
        { filename: 'export-207.jpg', categories: ['travel'] },
        { filename: 'export-208.jpg', categories: ['travel'] },
        { filename: 'export-209.jpg', categories: ['travel'] },
        { filename: 'export-210.jpg', categories: ['travel'] },
        { filename: 'export-211.jpg', categories: ['travel'] },
        { filename: 'export-212.jpg', categories: ['travel'] },
        { filename: 'export-213.jpg', categories: ['travel'] },
        { filename: 'export-214.jpg', categories: ['travel'] },
    ];

    // --- Functions ---

    // Function to display images in the grid (Now using thumbnails)
    function displayImages(filter = 'all') {
        imageGrid.innerHTML = ''; // Clear existing grid
        const filteredImages = images.filter(img =>
            filter === 'all' || img.categories.includes(filter)
        );

        filteredImages.forEach(imgData => {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
        
            const imgElement = document.createElement('img');
            imgElement.src = BASE_THUMB + imgData.filename;
            imgElement.dataset.fullSrc = BASE_FULL + imgData.filename;
            const altText = imgData.categories.length > 0
                ? `Photo - ${imgData.categories.join(', ')}`
                : 'Photo';
            imgElement.alt = altText;
            imgElement.loading = 'lazy';
        
            imgElement.addEventListener('click', () => openModal(BASE_FULL + imgData.filename));
        
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
            // applyFilter(filterValue); // OLD METHOD
            displayImages(filterValue); // REVERTED to this
        });
    });

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
    displayImages('landscape'); // New initial call, matches the default active button

}); 