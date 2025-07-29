document.addEventListener('DOMContentLoaded', () => {
    const imageGrid = document.getElementById('image-grid');
    const filterButtons = document.querySelectorAll('nav button');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const closeButton = document.querySelector('.close-button');
    const siteTitle = document.querySelector('.site-title');
    const introToggle = document.getElementById('intro-toggle'); // Get the toggle element
    const introTextBox = document.getElementById('intro-text-box'); // Get the text box element
    

    let isZoomed = false;
    let originalTitle = 'POORBYPORTRA';

   
    const images = [
        { srcThumb: 'images/export-thumb-001.jpg', srcFull: 'images/export-001.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-002.jpg', srcFull: 'images/export-002.jpg', categories: ['landscape'] },
        { srcThumb: 'images/export-thumb-003.jpg', srcFull: 'images/export-003.jpg', categories: ['landscape'] },
        { srcThumb: 'images/export-thumb-004.jpg', srcFull: 'images/export-004.jpg', categories: ['landscape'] },
        { srcThumb: 'images/export-thumb-005.jpg', srcFull: 'images/export-005.jpg', categories: ['landscape'] },
        { srcThumb: 'images/export-thumb-006.jpg', srcFull: 'images/export-006.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-007.jpg', srcFull: 'images/export-007.jpg', categories: ['landscape', 'travel'] },
        { srcThumb: 'images/export-thumb-008.jpg', srcFull: 'images/export-008.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-009.jpg', srcFull: 'images/export-009.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-010.jpg', srcFull: 'images/export-010.jpg', categories: ['landscape'] },
        { srcThumb: 'images/export-thumb-011.jpg', srcFull: 'images/export-011.jpg', categories: ['street'] },
        { srcThumb: 'images/export-thumb-012.jpg', srcFull: 'images/export-012.jpg', categories: ['street'] },
        { srcThumb: 'images/export-thumb-013.jpg', srcFull: 'images/export-013.jpg', categories: ['street'] },
        { srcThumb: 'images/export-thumb-014.jpg', srcFull: 'images/export-014.jpg', categories: ['street'] },
        { srcThumb: 'images/export-thumb-015.jpg', srcFull: 'images/export-015.jpg', categories: ['street'] },
        { srcThumb: 'images/export-thumb-016.jpg', srcFull: 'images/export-016.jpg', categories: ['street'] },
        { srcThumb: 'images/export-thumb-017.jpg', srcFull: 'images/export-017.jpg', categories: ['landscape'] },
        { srcThumb: 'images/export-thumb-018.jpg', srcFull: 'images/export-018.jpg', categories: ['landscape'] },
        { srcThumb: 'images/export-thumb-019.jpg', srcFull: 'images/export-019.jpg', categories: ['landscape'] },
        { srcThumb: 'images/export-thumb-020.jpg', srcFull: 'images/export-020.jpg', categories: ['landscape'] },
        { srcThumb: 'images/export-thumb-021.jpg', srcFull: 'images/export-021.jpg', categories: ['travel', 'street'] },
        { srcThumb: 'images/export-thumb-022.jpg', srcFull: 'images/export-022.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-023.jpg', srcFull: 'images/export-023.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-024.jpg', srcFull: 'images/export-024.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-025.jpg', srcFull: 'images/export-025.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-026.jpg', srcFull: 'images/export-026.jpg', categories: ['street'] },
        { srcThumb: 'images/export-thumb-027.jpg', srcFull: 'images/export-027.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-028.jpg', srcFull: 'images/export-028.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-029.jpg', srcFull: 'images/export-029.jpg', categories: ['landscape'] },
        { srcThumb: 'images/export-thumb-030.jpg', srcFull: 'images/export-030.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-031.jpg', srcFull: 'images/export-031.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-032.jpg', srcFull: 'images/export-032.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-033.jpg', srcFull: 'images/export-033.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-034.jpg', srcFull: 'images/export-034.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-035.jpg', srcFull: 'images/export-035.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-036.jpg', srcFull: 'images/export-036.jpg', categories: ['landscape'] },
        { srcThumb: 'images/export-thumb-037.jpg', srcFull: 'images/export-037.jpg', categories: ['travel', 'street'] },
        { srcThumb: 'images/export-thumb-038.jpg', srcFull: 'images/export-038.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-039.jpg', srcFull: 'images/export-039.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-040.jpg', srcFull: 'images/export-040.jpg', categories: ['landscape'] },
        { srcThumb: 'images/export-thumb-041.jpg', srcFull: 'images/export-041.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-042.jpg', srcFull: 'images/export-042.jpg', categories: ['landscape'] },
        { srcThumb: 'images/export-thumb-043.jpg', srcFull: 'images/export-043.jpg', categories: ['landscape'] },
        { srcThumb: 'images/export-thumb-044.jpg', srcFull: 'images/export-044.jpg', categories: ['landscape'] },
        { srcThumb: 'images/export-thumb-045.jpg', srcFull: 'images/export-045.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-046.jpg', srcFull: 'images/export-046.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-047.jpg', srcFull: 'images/export-047.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-048.jpg', srcFull: 'images/export-048.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-049.jpg', srcFull: 'images/export-049.jpg', categories: ['travel', 'street'] },
        { srcThumb: 'images/export-thumb-050.jpg', srcFull: 'images/export-050.jpg', categories: ['landscape'] },
        { srcThumb: 'images/export-thumb-051.jpg', srcFull: 'images/export-051.jpg', categories: ['landscape'] },
        { srcThumb: 'images/export-thumb-052.jpg', srcFull: 'images/export-052.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-053.jpg', srcFull: 'images/export-053.jpg', categories: ['landscape'] },
        { srcThumb: 'images/export-thumb-054.jpg', srcFull: 'images/export-054.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-055.jpg', srcFull: 'images/export-055.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-056.jpg', srcFull: 'images/export-056.jpg', categories: ['street'] },
        { srcThumb: 'images/export-thumb-057.jpg', srcFull: 'images/export-057.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-058.jpg', srcFull: 'images/export-058.jpg', categories: ['street'] },
        { srcThumb: 'images/export-thumb-059.jpg', srcFull: 'images/export-059.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-060.jpg', srcFull: 'images/export-060.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-061.jpg', srcFull: 'images/export-061.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-062.jpg', srcFull: 'images/export-062.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-063.jpg', srcFull: 'images/export-063.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-064.jpg', srcFull: 'images/export-064.jpg', categories: ['landscape'] },
        { srcThumb: 'images/export-thumb-065.jpg', srcFull: 'images/export-065.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-066.jpg', srcFull: 'images/export-066.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-067.jpg', srcFull: 'images/export-067.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-068.jpg', srcFull: 'images/export-068.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-069.jpg', srcFull: 'images/export-069.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-070.jpg', srcFull: 'images/export-070.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-071.jpg', srcFull: 'images/export-071.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-072.jpg', srcFull: 'images/export-072.jpg', categories: ['street'] },
        { srcThumb: 'images/export-thumb-073.jpg', srcFull: 'images/export-073.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-074.jpg', srcFull: 'images/export-074.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-075.jpg', srcFull: 'images/export-075.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-076.jpg', srcFull: 'images/export-076.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-077.jpg', srcFull: 'images/export-077.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-079.jpg', srcFull: 'images/export-079.jpg', categories: ['landscape', 'travel'] },
        { srcThumb: 'images/export-thumb-080.jpg', srcFull: 'images/export-080.jpg', categories: ['landscape', 'travel'] },
        { srcThumb: 'images/export-thumb-081.jpg', srcFull: 'images/export-081.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-082.jpg', srcFull: 'images/export-082.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-083.jpg', srcFull: 'images/export-083.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-084.jpg', srcFull: 'images/export-084.jpg', categories: ['landscape', 'travel'] },
        { srcThumb: 'images/export-thumb-085.jpg', srcFull: 'images/export-085.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-086.jpg', srcFull: 'images/export-086.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-087.jpg', srcFull: 'images/export-087.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-088.jpg', srcFull: 'images/export-088.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-089.jpg', srcFull: 'images/export-089.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-090.jpg', srcFull: 'images/export-090.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-091.jpg', srcFull: 'images/export-091.jpg', categories: ['landscape', 'travel'] },
        { srcThumb: 'images/export-thumb-092.jpg', srcFull: 'images/export-092.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-093.jpg', srcFull: 'images/export-093.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-094.jpg', srcFull: 'images/export-094.jpg', categories: ['landscape', 'travel'] },
        { srcThumb: 'images/export-thumb-095.jpg', srcFull: 'images/export-095.jpg', categories: ['landscape', 'travel'] },
        { srcThumb: 'images/export-thumb-096.jpg', srcFull: 'images/export-096.jpg', categories: ['landscape', 'travel'] },
        { srcThumb: 'images/export-thumb-097.jpg', srcFull: 'images/export-097.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-098.jpg', srcFull: 'images/export-098.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-099.jpg', srcFull: 'images/export-099.jpg', categories: ['landscape', 'travel'] },
        { srcThumb: 'images/export-thumb-100.jpg', srcFull: 'images/export-100.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-101.jpg', srcFull: 'images/export-101.jpg', categories: ['landscape', 'travel'] },
        { srcThumb: 'images/export-thumb-102.jpg', srcFull: 'images/export-102.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-103.jpg', srcFull: 'images/export-103.jpg', categories: ['landscape', 'travel'] },
        { srcThumb: 'images/export-thumb-104.jpg', srcFull: 'images/export-104.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-105.jpg', srcFull: 'images/export-105.jpg', categories: ['landscape', 'travel'] },
        { srcThumb: 'images/export-thumb-106.jpg', srcFull: 'images/export-106.jpg', categories: ['landscape', 'travel'] },
        { srcThumb: 'images/export-thumb-107.jpg', srcFull: 'images/export-107.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-108.jpg', srcFull: 'images/export-108.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-109.jpg', srcFull: 'images/export-109.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-110.jpg', srcFull: 'images/export-110.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-111.jpg', srcFull: 'images/export-111.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-112.jpg', srcFull: 'images/export-112.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-113.jpg', srcFull: 'images/export-113.jpg', categories: ['landscape', 'travel'] },
        { srcThumb: 'images/export-thumb-114.jpg', srcFull: 'images/export-114.jpg', categories: ['landscape', 'travel'] },
        { srcThumb: 'images/export-thumb-115.jpg', srcFull: 'images/export-115.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-116.jpg', srcFull: 'images/export-116.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-117.jpg', srcFull: 'images/export-117.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-118.jpg', srcFull: 'images/export-118.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-119.jpg', srcFull: 'images/export-119.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-120.jpg', srcFull: 'images/export-120.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-121.jpg', srcFull: 'images/export-121.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-122.jpg', srcFull: 'images/export-122.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-123.jpg', srcFull: 'images/export-123.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-124.jpg', srcFull: 'images/export-124.jpg', categories: ['street', 'travel'] }, 
        { srcThumb: 'images/export-thumb-125.jpg', srcFull: 'images/export-125.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-126.jpg', srcFull: 'images/export-126.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-127.jpg', srcFull: 'images/export-127.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-128.jpg', srcFull: 'images/export-128.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-129.jpg', srcFull: 'images/export-129.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-130.jpg', srcFull: 'images/export-130.jpg', categories: ['street', 'travel'] }, 
        { srcThumb: 'images/export-thumb-131.jpg', srcFull: 'images/export-131.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-132.jpg', srcFull: 'images/export-132.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-133.jpg', srcFull: 'images/export-133.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-134.jpg', srcFull: 'images/export-134.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-135.jpg', srcFull: 'images/export-135.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-136.jpg', srcFull: 'images/export-136.jpg', categories: ['travel'] }, 
        { srcThumb: 'images/export-thumb-137.jpg', srcFull: 'images/export-137.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-138.jpg', srcFull: 'images/export-138.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-139.jpg', srcFull: 'images/export-139.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-140.jpg', srcFull: 'images/export-140.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-141.jpg', srcFull: 'images/export-141.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-142.jpg', srcFull: 'images/export-142.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-143.jpg', srcFull: 'images/export-143.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-144.jpg', srcFull: 'images/export-144.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-145.jpg', srcFull: 'images/export-145.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-146.jpg', srcFull: 'images/export-146.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-147.jpg', srcFull: 'images/export-147.jpg', categories: ['landscape', 'travel'] },
        { srcThumb: 'images/export-thumb-148.jpg', srcFull: 'images/export-148.jpg', categories: ['landscape', 'travel'] },    
        { srcThumb: 'images/export-thumb-149.jpg', srcFull: 'images/export-149.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-150.jpg', srcFull: 'images/export-150.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-151.jpg', srcFull: 'images/export-151.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-152.jpg', srcFull: 'images/export-152.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-153.jpg', srcFull: 'images/export-153.jpg', categories: [ 'travel'] },
        { srcThumb: 'images/export-thumb-154.jpg', srcFull: 'images/export-154.jpg', categories: ['travel'] }, 
        { srcThumb: 'images/export-thumb-155.jpg', srcFull: 'images/export-155.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-156.jpg', srcFull: 'images/export-156.jpg', categories: [ 'travel'] },
        { srcThumb: 'images/export-thumb-157.jpg', srcFull: 'images/export-157.jpg', categories: [ 'travel'] },
        { srcThumb: 'images/export-thumb-158.jpg', srcFull: 'images/export-158.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-159.jpg', srcFull: 'images/export-159.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-160.jpg', srcFull: 'images/export-160.jpg', categories: ['travel'] }, 
        { srcThumb: 'images/export-thumb-161.jpg', srcFull: 'images/export-161.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-162.jpg', srcFull: 'images/export-162.jpg', categories: ['landscape', 'travel'] },
        { srcThumb: 'images/export-thumb-163.jpg', srcFull: 'images/export-163.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-164.jpg', srcFull: 'images/export-164.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-165.jpg', srcFull: 'images/export-165.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-166.jpg', srcFull: 'images/export-166.jpg', categories: ['travel'] }, 
        { srcThumb: 'images/export-thumb-167.jpg', srcFull: 'images/export-167.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-168.jpg', srcFull: 'images/export-168.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-169.jpg', srcFull: 'images/export-169.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-170.jpg', srcFull: 'images/export-170.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-171.jpg', srcFull: 'images/export-171.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-172.jpg', srcFull: 'images/export-172.jpg', categories: ['travel'] }, 
        { srcThumb: 'images/export-thumb-173.jpg', srcFull: 'images/export-173.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-174.jpg', srcFull: 'images/export-174.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-175.jpg', srcFull: 'images/export-175.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-176.jpg', srcFull: 'images/export-176.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-177.jpg', srcFull: 'images/export-177.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-178.jpg', srcFull: 'images/export-178.jpg', categories: ['travel'] }, 
        { srcThumb: 'images/export-thumb-179.jpg', srcFull: 'images/export-179.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-180.jpg', srcFull: 'images/export-180.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-181.jpg', srcFull: 'images/export-181.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-182.jpg', srcFull: 'images/export-182.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-183.jpg', srcFull: 'images/export-183.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-184.jpg', srcFull: 'images/export-184.jpg', categories: ['travel'] }, 
        { srcThumb: 'images/export-thumb-185.jpg', srcFull: 'images/export-185.jpg', categories: ['landscape', 'travel'] },
        { srcThumb: 'images/export-thumb-186.jpg', srcFull: 'images/export-186.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-187.jpg', srcFull: 'images/export-187.jpg', categories: ['landscape', 'travel'] },
        { srcThumb: 'images/export-thumb-188.jpg', srcFull: 'images/export-188.jpg', categories: ['landscape', 'travel'] },
        { srcThumb: 'images/export-thumb-189.jpg', srcFull: 'images/export-189.jpg', categories: ['landscape', 'travel'] },
        { srcThumb: 'images/export-thumb-190.jpg', srcFull: 'images/export-190.jpg', categories: ['travel'] },    
        { srcThumb: 'images/export-thumb-191.jpg', srcFull: 'images/export-191.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-192.jpg', srcFull: 'images/export-192.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-193.jpg', srcFull: 'images/export-193.jpg', categories: ['landscape', 'travel'] },
        { srcThumb: 'images/export-thumb-194.jpg', srcFull: 'images/export-194.jpg', categories: ['travel'] },
        { srcThumb: 'images/export-thumb-195.jpg', srcFull: 'images/export-195.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-196.jpg', srcFull: 'images/export-196.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-197.jpg', srcFull: 'images/export-197.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-198.jpg', srcFull: 'images/export-198.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-199.jpg', srcFull: 'images/export-199.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-200.jpg', srcFull: 'images/export-200.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-201.jpg', srcFull: 'images/export-201.jpg', categories: ['street', 'travel'] },
        { srcThumb: 'images/export-thumb-202.jpg', srcFull: 'images/export-202.jpg', categories: ['landscape'] },

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
            imgElement.src = imgData.srcThumb; // Use thumbnail source
            imgElement.dataset.fullSrc = imgData.srcFull; // Store full source in data attribute
            const altText = imgData.categories.length > 0
                ? `Photo - ${imgData.categories.join(', ')}`
                : 'Photo';
            imgElement.alt = altText;
            imgElement.loading = 'lazy';

            imgElement.addEventListener('click', () => openModal(imgData.srcFull)); // Pass full source to modal

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