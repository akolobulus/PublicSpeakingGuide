// Reviews functionality
const API_BASE_URL = 'http://localhost:3001/api';

// Initialize reviews page
document.addEventListener('DOMContentLoaded', function() {
    initializeReviewsPage();
});

function initializeReviewsPage() {
    loadReviews();
    setupReviewForm();
    setupStarRating();
}

// Load and display reviews
async function loadReviews() {
    try {
        const response = await fetch(`${API_BASE_URL}/reviews`);
        const reviews = await response.json();
        
        displayReviews(reviews);
    } catch (error) {
        console.error('Error loading reviews:', error);
        displayErrorMessage('Failed to load reviews. Please try again later.');
    }
}

// Display reviews in the grid
function displayReviews(reviews) {
    const reviewsGrid = document.getElementById('reviewsGrid');
    
    if (reviews.length === 0) {
        reviewsGrid.innerHTML = `
            <div class="no-reviews">
                <i class="fas fa-star"></i>
                <h3>No Reviews Yet</h3>
                <p>Be the first to share your experience with this book!</p>
            </div>
        `;
        return;
    }
    
    reviewsGrid.innerHTML = reviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <div class="reviewer-info">
                    <h4>${escapeHtml(review.name)}</h4>
                    <div class="review-rating">
                        ${generateStarRating(review.rating)}
                    </div>
                </div>
                <div class="review-date">
                    ${formatDate(review.created_at)}
                </div>
            </div>
            <div class="review-content">
                <h5>${escapeHtml(review.title)}</h5>
                <p>${escapeHtml(review.content)}</p>
            </div>
        </div>
    `).join('');
}

// Setup review form submission
function setupReviewForm() {
    const reviewForm = document.getElementById('reviewForm');
    if (!reviewForm) return;
    
    reviewForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(reviewForm);
        const reviewData = {
            name: formData.get('name'),
            email: formData.get('email'),
            rating: formData.get('rating'),
            title: formData.get('title'),
            content: formData.get('content')
        };
        
        // Validate form
        if (!validateReviewForm(reviewData)) {
            return;
        }
        
        await submitReview(reviewData);
    });
}

// Validate review form
function validateReviewForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.rating) {
        errors.push('Please select a rating');
    }
    
    if (!data.title || data.title.trim().length < 5) {
        errors.push('Review title must be at least 5 characters long');
    }
    
    if (!data.content || data.content.trim().length < 10) {
        errors.push('Review content must be at least 10 characters long');
    }
    
    if (errors.length > 0) {
        showFormErrors(errors);
        return false;
    }
    
    return true;
}

// Submit review
async function submitReview(reviewData) {
    const submitButton = document.querySelector('.submit-review-btn');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitButton.disabled = true;
    
    try {
        const response = await fetch(`${API_BASE_URL}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showSuccessMessage('Thank you for your review! It will be displayed after approval.');
            document.getElementById('reviewForm').reset();
            resetStarRating();
        } else {
            showErrorMessage(result.error || 'Failed to submit review');
        }
    } catch (error) {
        console.error('Error submitting review:', error);
        showErrorMessage('Network error. Please check your connection and try again.');
    } finally {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }
}

// Setup star rating interaction
function setupStarRating() {
    const starRating = document.querySelector('.star-rating');
    if (!starRating) return;
    
    const stars = starRating.querySelectorAll('label');
    const inputs = starRating.querySelectorAll('input[type="radio"]');
    
    stars.forEach((star, index) => {
        star.addEventListener('mouseenter', function() {
            highlightStars(index + 1);
        });
        
        star.addEventListener('click', function() {
            const value = this.getAttribute('for').replace('star', '');
            selectStars(parseInt(value));
        });
    });
    
    starRating.addEventListener('mouseleave', function() {
        const checkedInput = starRating.querySelector('input[type="radio"]:checked');
        if (checkedInput) {
            const value = parseInt(checkedInput.value);
            highlightStars(value);
        } else {
            highlightStars(0);
        }
    });
}

function highlightStars(rating) {
    const stars = document.querySelectorAll('.star-rating label');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function selectStars(rating) {
    const input = document.getElementById(`star${rating}`);
    if (input) {
        input.checked = true;
    }
    highlightStars(rating);
}

function resetStarRating() {
    const inputs = document.querySelectorAll('.star-rating input[type="radio"]');
    inputs.forEach(input => input.checked = false);
    highlightStars(0);
}

// Generate star rating display
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

// Utility functions
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

function showSuccessMessage(message) {
    const notification = createNotification(message, 'success');
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

function showErrorMessage(message) {
    const notification = createNotification(message, 'error');
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

function showFormErrors(errors) {
    const errorMessage = errors.join('<br>');
    showErrorMessage(errorMessage);
}

function createNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    return notification;
}

function displayErrorMessage(message) {
    const reviewsGrid = document.getElementById('reviewsGrid');
    reviewsGrid.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Error Loading Reviews</h3>
            <p>${message}</p>
            <button onclick="loadReviews()" class="retry-btn">
                <i class="fas fa-redo"></i>
                Try Again
            </button>
        </div>
    `;
}