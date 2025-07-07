// Book Slideshow functionality
function initializeBookSlideshows() {
    const slideshows = document.querySelectorAll('.book-slideshow');
    
    slideshows.forEach((slideshow, slideshowIndex) => {
        const slides = slideshow.querySelectorAll('.book-slide');
        if (slides.length <= 1) return;
        
        let currentSlide = 0;
        let intervalId = null;
        
        // Function to show a specific slide
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
            currentSlide = index;
        }
        
        // Function to show next slide
        function nextSlide() {
            const nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        }
        
        // Function to start slideshow
        function startSlideshow() {
            if (intervalId) clearInterval(intervalId);
            intervalId = setInterval(nextSlide, 4000);
        }
        
        // Function to pause slideshow
        function pauseSlideshow() {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        }
        
        // Ensure first slide is visible
        showSlide(0);
        
        // Start the slideshow
        startSlideshow();
        
        // Add hover events
        slideshow.addEventListener('mouseenter', pauseSlideshow);
        slideshow.addEventListener('mouseleave', startSlideshow);
    });
}

// Initialize slideshows when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing book slideshows...');
    initializeBookSlideshows();
    console.log('Book slideshows initialized successfully');
});