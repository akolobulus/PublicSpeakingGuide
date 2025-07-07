// Book Slideshow functionality
class BookSlideshow {
    constructor(containerId) {
        this.container = document.querySelector(containerId);
        if (!this.container) return;
        
        this.slides = this.container.querySelectorAll('.book-slide');
        this.currentSlide = 0;
        this.intervalId = null;
        
        this.init();
    }
    
    init() {
        if (this.slides.length <= 1) return;
        
        // Start the slideshow
        this.startSlideshow();
        
        // Pause on hover
        this.container.addEventListener('mouseenter', () => this.pauseSlideshow());
        this.container.addEventListener('mouseleave', () => this.startSlideshow());
    }
    
    showSlide(index) {
        // Remove active class from all slides
        this.slides.forEach(slide => slide.classList.remove('active'));
        
        // Add active class to current slide
        this.slides[index].classList.add('active');
        
        this.currentSlide = index;
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(nextIndex);
    }
    
    startSlideshow() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        
        this.intervalId = setInterval(() => {
            this.nextSlide();
        }, 4000); // Change slide every 4 seconds
    }
    
    pauseSlideshow() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}

// Initialize slideshows when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all book slideshows on the page
    const slideshows = document.querySelectorAll('.book-slideshow');
    slideshows.forEach((slideshow, index) => {
        // Create unique identifier for each slideshow
        slideshow.setAttribute('data-slideshow-id', `slideshow-${index}`);
        new BookSlideshow(`[data-slideshow-id="slideshow-${index}"]`);
    });
});