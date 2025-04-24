// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Toggle mobile menu when hamburger is clicked
    document.querySelector('.hamburger-menu').addEventListener('click', function() {
        this.classList.toggle('opened');
        document.querySelector('.nav-menu').classList.toggle('active');
    });
    
    // Load photos from the photos directory
    loadPhotosFromDirectory();
});

/**
 * Dynamically loads photos from the photos directory and adds them to the gallery
 */
async function loadPhotosFromDirectory() {
    const galleryGrid = document.querySelector('.gallery .grid');
    if (!galleryGrid) return;
    
    // Show loading indicator
    galleryGrid.innerHTML = '<div class="loading">Loading photos...</div>';
    
    try {
        // For GitHub Pages, we need a more sophisticated approach since direct directory listing isn't supported
        // We'll use a simple approach that should work for most GitHub Pages setups
        
        // Create an array of common image extensions to check
        const extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        
        // First, try the simple approach - look for images in the /photos directory
        // This will work if the browser can access directory listing or if you have a known set of images
        
        // Try to fetch each image in the photos directory directly
        // We'll start with the one we know exists (1.png) and try common pattern like numbers or indexes
        const probableImages = []; // Start with known images
        
        // Add potential numbered images (2.jpg, 3.jpg, etc.)
        for (let i = 1; i <= 20; i++) {
            extensions.forEach(ext => {
                if (i === 1 && ext === '.png') return; // Skip 1.png as we already have it
                probableImages.push(`${i}${ext}`);
            });
        }
        
        // Try to fetch each potential image - this creates an array of fetch promises
        const photoPromises = probableImages.map(filename => {
            return fetch(`/photos/${filename}`)
                .then(response => {
                    if (response.ok) {
                        return {
                            url: `/photos/${filename}`,
                            filename: filename
                        };
                    }
                    return null;
                })
                .catch(() => null);
        });
        
        // Wait for all fetch operations to complete
        const results = await Promise.all(photoPromises);
        
        // Filter out null results and extract valid photo URLs
        const validPhotos = results.filter(result => result !== null);
        
        // Clear the loading indicator
        galleryGrid.innerHTML = '';
        
        // Add each valid image to the gallery
        if (validPhotos.length > 0) {
            validPhotos.forEach(photo => {
                const imageElement = document.createElement('a');
                imageElement.href = photo.url;
                imageElement.target = "_blank";
                
                const img = document.createElement('img');
                img.src = photo.url;
                img.alt = photo.filename.split('.')[0]; // Use filename without extension as alt text
                img.loading = "lazy"; // Add lazy loading for better performance
                
                imageElement.appendChild(img);
                galleryGrid.appendChild(imageElement);
            });
        } else {
            galleryGrid.innerHTML = '<p class="no-photos">No photos found in the directory.</p>';
        }
        
    } catch (error) {
        console.error('Error loading photos:', error);
        galleryGrid.innerHTML = '<p class="error">Error loading photos. Please try again later.</p>';
    }
} 