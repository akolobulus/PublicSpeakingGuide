# Simplest Guide to Public Speaking - Book Website

## Overview

This is a static website for promoting "Simplest Guide to Public Speaking" by Favour Ebi Dakoru. The site serves as a comprehensive book landing page with multiple sections including book information, author details, online reading capability, purchase options, testimonials, and contact information.

## System Architecture

### Frontend Architecture
- **Technology**: Pure HTML5, CSS3, and vanilla JavaScript (No npm dependencies)
- **Styling Framework**: Custom CSS with CSS Grid and Flexbox
- **Typography**: Google Fonts (Poppins family)
- **Icons**: Font Awesome 6.4.0
- **Responsive Design**: Mobile-first approach with hamburger navigation
- **Hosting**: Static files served via Python HTTP server

### Key Components

#### 1. **Multi-page Static Site Structure**
- Home page (`index.html`) - Hero section and main landing
- About Book (`about-book.html`) - Book details and overview
- About Author (`about-author.html`) - Author profile and bio
- Read Online (`read-online.html`) - Interactive reading interface
- Buy Now (`buy.html`) - Purchase options and links
- Testimonials (`testimonials.html`) - Customer reviews and social proof
- Contact (`contact.html`) - Contact form and information

#### 2. **Interactive Reading Experience**
- **Copy Protection**: Text selection disabled on reading pages
- **Reading Controls**: Font size adjustment and dark mode toggle
- **Chapter Navigation**: Structured book content with navigation
- **Content Management**: JavaScript-based content delivery system

#### 3. **Booking System**
- **Modal Interface**: Author booking form with validation
- **Form Validation**: Real-time client-side validation
- **User Experience**: Smooth modal interactions with keyboard support

#### 4. **Responsive Navigation**
- **Mobile Menu**: Hamburger menu for mobile devices
- **Smooth Scrolling**: Enhanced navigation experience
- **Active States**: Visual feedback for current page

## Data Flow

### Static Content Flow
1. **Page Load**: HTML structure loads with CSS styling
2. **JavaScript Enhancement**: Interactive features initialize
3. **Dynamic Content**: Book content loads via JavaScript modules
4. **User Interactions**: Form submissions and navigation handled client-side

### Reading Interface Flow
1. **Chapter Selection**: User navigates through book chapters
2. **Content Display**: JavaScript renders chapter content dynamically
3. **Reading Controls**: Font size and theme adjustments persist
4. **Copy Protection**: Text selection and right-click disabled

## External Dependencies

### CDN Resources
- **Google Fonts**: Poppins font family (weights 300-800)
- **Font Awesome**: Icon library (v6.4.0)
- **Placeholder Images**: Via.placeholder.com for temporary images

### Third-party Integrations
- **Payment Processing**: Flutterwave integration for secure payments (digital: ₦5,000, print: ₦8,000)
- **Social Media**: Integration points for testimonials and sharing
- **Analytics**: Ready for Google Analytics integration

## Deployment Strategy

### Static Hosting
- **Platform**: Suitable for any static hosting service (Netlify, Vercel, GitHub Pages)
- **Assets**: All assets are self-contained or CDN-linked
- **Performance**: Optimized for fast loading with minimal dependencies

### Configuration
- **No Backend Required**: Pure frontend implementation
- **Environment**: Production-ready static files
- **Scaling**: CDN-friendly architecture

## User Preferences

```
Preferred communication style: Simple, everyday language.
```

## Changelog

```
Changelog:
- July 06, 2025. Initial setup with complete book website
- July 07, 2025. Integrated Flutterwave payment system replacing Paystack
- July 07, 2025. Removed PostgreSQL database and user review functionality - now using static testimonials only
- July 07, 2025. Updated logo to "MR FED" across all pages and added author's professional photo with circular styling
- July 07, 2025. Removed all npm dependencies and node_modules - now runs purely on HTML, CSS, and JavaScript with Python HTTP server
```

## Technical Notes

### CSS Architecture
- **CSS Custom Properties**: Consistent color scheme and spacing
- **Responsive Design**: Mobile-first breakpoints
- **Component-based Styling**: Modular CSS structure

### JavaScript Modules
- **main.js**: Core functionality and navigation
- **book-content.js**: Reading interface and content management
- **booking-modal.js**: Form handling and validation

### Performance Considerations
- **Lazy Loading**: Ready for image optimization
- **Minification**: CSS and JS ready for production minification
- **Caching**: Static assets suitable for aggressive caching

### Security Features
- **Copy Protection**: Disabled text selection and right-click on reading pages
- **Form Validation**: Client-side validation with server-side validation readiness
- **XSS Prevention**: Sanitized content rendering

This architecture provides a solid foundation for a book promotion website with interactive features, while maintaining simplicity and performance. The modular structure allows for easy maintenance and future enhancements.