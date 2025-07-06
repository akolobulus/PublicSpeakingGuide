// Booking modal functionality with form validation
// Handles the "Book the Author" modal form

document.addEventListener('DOMContentLoaded', function() {
    initializeBookingModal();
});

function initializeBookingModal() {
    const modal = document.getElementById('bookingModal');
    const form = document.getElementById('bookingForm');
    
    if (form) {
        form.addEventListener('submit', handleBookingSubmission);
        
        // Add real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeBookingModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            closeBookingModal();
        }
    });
}

// Open booking modal
function openBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        const firstInput = modal.querySelector('input, select, textarea');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
        
        // Add animation
        modal.querySelector('.modal-content').style.animation = 'slideIn 0.3s ease';
    }
}

// Close booking modal
function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Clear form
        const form = document.getElementById('bookingForm');
        if (form) {
            form.reset();
            clearAllErrors();
        }
    }
}

// Handle form submission
function handleBookingSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Validate form
    if (!validateBookingForm(form)) {
        return;
    }
    
    // Show loading state
    setButtonLoading(submitBtn, true);
    
    // Simulate API call
    setTimeout(() => {
        // Create booking data object
        const bookingData = {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            purpose: formData.get('purpose'),
            bookingDate: formData.get('bookingDate'),
            notes: formData.get('notes'),
            timestamp: new Date().toISOString()
        };
        
        // In a real implementation, this would send to a server
        console.log('Booking submitted:', bookingData);
        
        // Show success message
        showBookingSuccess(bookingData);
        
        // Reset form and close modal
        form.reset();
        setButtonLoading(submitBtn, false);
        
        setTimeout(() => {
            closeBookingModal();
        }, 2000);
        
    }, 1500);
}

// Validate booking form
function validateBookingForm(form) {
    const requiredFields = [
        { name: 'fullName', label: 'Full Name', type: 'text' },
        { name: 'email', label: 'Email Address', type: 'email' },
        { name: 'phone', label: 'Phone Number', type: 'tel' },
        { name: 'purpose', label: 'Purpose of Booking', type: 'select' },
        { name: 'bookingDate', label: 'Booking Date', type: 'date' }
    ];
    
    let isValid = true;
    
    requiredFields.forEach(field => {
        const input = form.querySelector(`[name="${field.name}"]`);
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const fieldLabel = field.closest('.form-group').querySelector('label').textContent.replace(' *', '');
    
    clearFieldError(field);
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, `${fieldLabel} is required`);
        return false;
    }
    
    // Skip further validation if field is empty and not required
    if (!value) {
        return true;
    }
    
    // Specific field validations
    switch (fieldName) {
        case 'fullName':
            if (value.length < 2) {
                showFieldError(field, 'Please enter your full name');
                return false;
            }
            if (!/^[a-zA-Z\s'-]+$/.test(value)) {
                showFieldError(field, 'Please enter a valid name');
                return false;
            }
            break;
            
        case 'email':
            if (!isValidEmail(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
            break;
            
        case 'phone':
            if (!isValidPhone(value)) {
                showFieldError(field, 'Please enter a valid phone number');
                return false;
            }
            break;
            
        case 'bookingDate':
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                showFieldError(field, 'Please select a future date');
                return false;
            }
            
            // Check if date is too far in the future (1 year)
            const oneYearFromNow = new Date();
            oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
            
            if (selectedDate > oneYearFromNow) {
                showFieldError(field, 'Please select a date within the next year');
                return false;
            }
            break;
    }
    
    return true;
}

// Show field error
function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #D7263D;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: flex;
        align-items: center;
        gap: 0.25rem;
    `;
    
    // Add error icon
    const errorIcon = document.createElement('i');
    errorIcon.className = 'fas fa-exclamation-circle';
    errorDiv.insertBefore(errorIcon, errorDiv.firstChild);
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#D7263D';
    field.classList.add('error');
}

// Clear field error
function clearFieldError(field) {
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
    field.style.borderColor = '';
    field.classList.remove('error');
}

// Clear all errors
function clearAllErrors() {
    const errors = document.querySelectorAll('.field-error');
    errors.forEach(error => error.remove());
    
    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach(field => {
        field.style.borderColor = '';
        field.classList.remove('error');
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function isValidPhone(phone) {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Check if it's a valid length (10-15 digits)
    if (cleaned.length < 10 || cleaned.length > 15) {
        return false;
    }
    
    // Check if it starts with a valid country code or area code
    return /^(\+?1-?)?(\d{3,4}[-.]?)?\d{3}[-.]?\d{4}$/.test(phone) || 
           /^(\+?234|0)?[789]\d{9}$/.test(cleaned); // Nigerian numbers
}

// Button loading state
function setButtonLoading(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.dataset.originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    } else {
        button.disabled = false;
        button.innerHTML = button.dataset.originalText || 'Submit Booking Request';
    }
}

// Show booking success message
function showBookingSuccess(bookingData) {
    const modal = document.getElementById('bookingModal');
    const modalBody = modal.querySelector('.modal-body');
    
    // Create success content
    const successContent = document.createElement('div');
    successContent.className = 'booking-success';
    successContent.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div style="margin-bottom: 1.5rem;">
                <i class="fas fa-check-circle" style="font-size: 4rem; color: #10B981;"></i>
            </div>
            <h3 style="color: #10B981; margin-bottom: 1rem;">Booking Request Submitted!</h3>
            <p style="margin-bottom: 1.5rem;">Thank you, ${bookingData.fullName}! Your booking request has been submitted successfully.</p>
            
            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; text-align: left;">
                <h4 style="margin-bottom: 1rem; color: #001F54;">Booking Details:</h4>
                <div style="display: grid; gap: 0.5rem; font-size: 0.9rem;">
                    <div><strong>Name:</strong> ${bookingData.fullName}</div>
                    <div><strong>Email:</strong> ${bookingData.email}</div>
                    <div><strong>Phone:</strong> ${bookingData.phone}</div>
                    <div><strong>Purpose:</strong> ${formatPurpose(bookingData.purpose)}</div>
                    <div><strong>Preferred Date:</strong> ${formatDate(bookingData.bookingDate)}</div>
                    ${bookingData.notes ? `<div><strong>Notes:</strong> ${bookingData.notes}</div>` : ''}
                </div>
            </div>
            
            <div style="background: #e3f2fd; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
                <h4 style="color: #1976d2; margin-bottom: 0.5rem;">What's Next?</h4>
                <ul style="text-align: left; margin: 0; padding-left: 1.5rem; color: #424242;">
                    <li>We'll review your request within 24 hours</li>
                    <li>You'll receive a confirmation email shortly</li>
                    <li>Our team will contact you to discuss details</li>
                    <li>We'll work together to finalize your booking</li>
                </ul>
            </div>
            
            <p style="font-size: 0.9rem; color: #666; margin-bottom: 1.5rem;">
                <i class="fas fa-info-circle"></i> 
                A confirmation email has been sent to ${bookingData.email}
            </p>
        </div>
    `;
    
    // Replace modal content
    modalBody.innerHTML = '';
    modalBody.appendChild(successContent);
    
    // Update modal header
    const modalHeader = modal.querySelector('.modal-header h2');
    if (modalHeader) {
        modalHeader.textContent = 'Booking Confirmed';
    }
}

// Format purpose for display
function formatPurpose(purpose) {
    const purposes = {
        'keynote': 'Keynote Speech',
        'training': 'Training Session',
        'workshop': 'Workshop',
        'church': 'Church Event',
        'school': 'School Event',
        'other': 'Other'
    };
    return purposes[purpose] || purpose;
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Export functions for global access
window.openBookingModal = openBookingModal;
window.closeBookingModal = closeBookingModal;

// Add custom styles for the booking modal
const bookingStyles = document.createElement('style');
bookingStyles.textContent = `
    .booking-success {
        animation: fadeIn 0.5s ease;
    }
    
    .field-error {
        animation: shake 0.5s ease;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        animation: shake 0.5s ease;
    }
    
    .modal-content {
        animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
        from { transform: translateY(-50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;
document.head.appendChild(bookingStyles);
