// Reviews functionality - Static testimonials only
document.addEventListener('DOMContentLoaded', function() {
    initializeReviewsPage();
});

function initializeReviewsPage() {
    // Remove any review form functionality
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.style.display = 'none';
    }
    
    // Remove any review submission sections
    const reviewSubmissionSection = document.getElementById('reviewSubmissionSection');
    if (reviewSubmissionSection) {
        reviewSubmissionSection.style.display = 'none';
    }
    
    // Show a message about static testimonials
    const testimonialMessage = document.getElementById('testimonialMessage');
    if (testimonialMessage) {
        testimonialMessage.innerHTML = `
            <div class="testimonial-info">
                <i class="fas fa-info-circle"></i>
                <p>These testimonials are from verified readers who have experienced the book's impact. 
                For questions or feedback, please use our <a href="contact.html">contact form</a>.</p>
            </div>
        `;
    }
}

// Utility functions for testimonials display
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    
    let starsHtml = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fas fa-star filled"></i>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="far fa-star"></i>';
    }
    
    return starsHtml;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}