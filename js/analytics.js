// Google Analytics 4 Integration
(function() {
    // Google Analytics Measurement ID
    const GA_MEASUREMENT_ID = 'G-PDQ0MF98L3';
    
    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);
    
    // Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
    
    // Make gtag available globally
    window.gtag = gtag;
    
    // Track page views for single page applications
    function trackPageView(url) {
        if (typeof gtag !== 'undefined') {
            gtag('config', GA_MEASUREMENT_ID, {
                page_path: url
            });
        }
    }
    
    // Track custom events
    function trackEvent(action, category, label, value) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label,
                value: value,
            });
        }
    }
    
    // Track button clicks and form submissions
    document.addEventListener('DOMContentLoaded', function() {
        // Track buy button clicks
        const buyButtons = document.querySelectorAll('a[href*="buy"], button[onclick*="buy"]');
        buyButtons.forEach(button => {
            button.addEventListener('click', function() {
                trackEvent('click', 'Purchase', 'Buy Button', 1);
            });
        });
        
        // Track read online clicks
        const readButtons = document.querySelectorAll('a[href*="read-online"]');
        readButtons.forEach(button => {
            button.addEventListener('click', function() {
                trackEvent('click', 'Engagement', 'Read Online', 1);
            });
        });
        
        // Track community link clicks
        const communityButtons = document.querySelectorAll('a[href*="t.me/fedpublicspeaking"]');
        communityButtons.forEach(button => {
            button.addEventListener('click', function() {
                trackEvent('click', 'Community', 'Join Telegram', 1);
            });
        });
        
        // Track form submissions
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function() {
                const formName = this.id || this.className || 'unknown';
                trackEvent('submit', 'Form', formName, 1);
            });
        });
        
        // Track book author booking
        const bookingButtons = document.querySelectorAll('.book-author-btn, button[onclick*="booking"]');
        bookingButtons.forEach(button => {
            button.addEventListener('click', function() {
                trackEvent('click', 'Booking', 'Book Author', 1);
            });
        });
        
        // Track external link clicks
        const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
        externalLinks.forEach(link => {
            link.addEventListener('click', function() {
                trackEvent('click', 'External Link', this.href, 1);
            });
        });
    });
    
    console.log('Google Analytics initialized with ID:', GA_MEASUREMENT_ID);
})();