// Book content and reading functionality with copy protection
// Contains the book chapters and reading interface controls

// Book content data
const bookContent = {
    title: "Simplest Guide to Public Speaking",
    author: "Favour Ebi Dakoru",
    totalChapters: 12,
    chapters: [
        {
            id: 1,
            title: "Understanding Public Speaking",
            content: `
                <h2>Chapter 1: Understanding Public Speaking</h2>
                
                <h3>What is Public Speaking?</h3>
                <p>Public speaking is the art of delivering a message to a live audience in a structured and deliberate manner. It's a skill that has shaped history, influenced millions, and remains one of the most powerful tools for personal and professional success.</p>
                
                <p>At its core, public speaking is about communication—not just speaking, but connecting with your audience on a meaningful level. It's about sharing ideas, inspiring action, and creating understanding between you and your listeners.</p>
                
                <h3>Why Public Speaking Matters</h3>
                <p>In today's interconnected world, the ability to speak confidently in public is more valuable than ever. Whether you're presenting to colleagues, addressing a community group, or speaking at a conference, your ability to communicate effectively can open doors and create opportunities.</p>
                
                <p>Research shows that strong communication skills are among the most sought-after qualities in employees and leaders. Companies value individuals who can articulate ideas clearly, persuade others, and represent their organization with confidence.</p>
                
                <h3>Common Misconceptions</h3>
                <p>Many people believe that public speaking is a talent you're born with—that some people are naturally gifted speakers while others are doomed to struggle. This couldn't be further from the truth.</p>
                
                <p>Public speaking is a skill that can be learned, practiced, and mastered by anyone willing to put in the effort. Even the most accomplished speakers started as nervous beginners who had to work at developing their abilities.</p>
                
                <h3>The Journey Ahead</h3>
                <p>Throughout this book, we'll explore practical techniques, proven strategies, and actionable steps you can take to become a confident and effective public speaker. You'll learn how to overcome fear, structure your message, engage your audience, and deliver presentations that leave a lasting impact.</p>
                
                <p>Remember, every expert was once a beginner. Your journey to becoming a skilled public speaker starts with understanding that it's possible, practical, and within your reach.</p>
            `
        },
        {
            id: 2,
            title: "Overcoming Fear and Anxiety",
            content: `
                <h2>Chapter 2: Overcoming Fear and Anxiety</h2>
                
                <h3>Understanding Speaker Anxiety</h3>
                <p>Fear of public speaking, known as glossophobia, affects up to 75% of the population. If you feel nervous before speaking in public, you're not alone—you're part of the majority. Understanding this fear is the first step to conquering it.</p>
                
                <p>Speaker anxiety manifests in various ways: sweaty palms, racing heart, trembling voice, or feeling like your mind has gone blank. These physical symptoms are your body's natural response to what it perceives as a threat.</p>
                
                <h3>The Root of Fear</h3>
                <p>Most speaking fears stem from a few common sources:</p>
                <ul>
                    <li>Fear of judgment or criticism</li>
                    <li>Fear of making mistakes or forgetting what to say</li>
                    <li>Fear of being the center of attention</li>
                    <li>Fear of not meeting expectations</li>
                    <li>Past negative experiences with public speaking</li>
                </ul>
                
                <h3>Reframing Your Mindset</h3>
                <p>The key to overcoming fear is to change how you think about public speaking. Instead of seeing it as a performance where you might fail, view it as a conversation where you're sharing something valuable with people who want to hear from you.</p>
                
                <p>Remember: Your audience wants you to succeed. They're not there hoping you'll fail—they're there because they're interested in what you have to say. This shift in perspective can dramatically reduce your anxiety.</p>
                
                <h3>Practical Techniques for Managing Anxiety</h3>
                <p>Here are proven methods to help you manage speaking anxiety:</p>
                
                <p><strong>Deep Breathing:</strong> Practice slow, deep breaths to calm your nervous system. Try the 4-7-8 technique: inhale for 4 counts, hold for 7, exhale for 8.</p>
                
                <p><strong>Progressive Muscle Relaxation:</strong> Tense and release muscle groups throughout your body to release physical tension.</p>
                
                <p><strong>Visualization:</strong> Imagine yourself giving a successful presentation. See yourself speaking confidently and receiving positive feedback.</p>
                
                <p><strong>Positive Self-Talk:</strong> Replace negative thoughts with positive affirmations. Instead of "I'm going to mess up," try "I'm prepared and I have something valuable to share."</p>
                
                <h3>Building Confidence Through Preparation</h3>
                <p>Confidence comes from preparation. The more thoroughly you prepare, the more confident you'll feel. This includes knowing your material inside and out, practicing your delivery, and having backup plans for potential challenges.</p>
                
                <p>Remember, even experienced speakers feel nervous sometimes. The difference is that they've learned to channel that nervous energy into enthusiasm and passion for their message.</p>
            `
        },
        {
            id: 3,
            title: "Building Confidence (Preview Only)",
            content: `
                <h2>Chapter 3: Building Confidence</h2>
                
                <h3>Preview Chapter</h3>
                <p>This chapter covers essential techniques for building unshakeable confidence as a public speaker. You'll learn:</p>
                
                <ul>
                    <li>How to develop a confident mindset</li>
                    <li>Physical techniques to project confidence</li>
                    <li>Practice methods that build real confidence</li>
                    <li>How to handle unexpected situations with grace</li>
                    <li>Building long-term speaking confidence</li>
                </ul>
                
                <p><strong>To read the complete chapter and access all 12 chapters, please <a href="buy.html">purchase the full book</a>.</strong></p>
                
                <div style="text-align: center; margin: 2rem 0; padding: 2rem; background: #f8f9fa; border-radius: 8px;">
                    <h3>Get the Complete Book</h3>
                    <p>Unlock all 12 chapters plus bonus materials including:</p>
                    <ul style="text-align: left; max-width: 400px; margin: 0 auto;">
                        <li>✓ Complete chapter content</li>
                        <li>✓ Practical exercises and worksheets</li>
                        <li>✓ Speech templates and examples</li>
                        <li>✓ Lifetime access to updates</li>
                    </ul>
                    <a href="buy.html" style="display: inline-block; margin-top: 1rem; padding: 0.75rem 2rem; background: #D7263D; color: white; text-decoration: none; border-radius: 8px;">Buy Now</a>
                </div>
            `
        }
    ]
};

// Reading interface functionality
let currentChapter = 1;
let fontSize = 18;
let isDarkMode = false;

document.addEventListener('DOMContentLoaded', function() {
    // Copy protection
    implementCopyProtection();
    
    // Initialize reading interface
    if (document.getElementById('book-content')) {
        initializeReadingInterface();
    }
});

// Copy protection implementation
function implementCopyProtection() {
    // Disable right-click context menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showCopyProtectionMessage();
        return false;
    });
    
    // Disable common copy shortcuts
    document.addEventListener('keydown', function(e) {
        // Disable Ctrl+C, Ctrl+A, Ctrl+S, Ctrl+P, F12, etc.
        if (e.ctrlKey && (e.key === 'c' || e.key === 'a' || e.key === 's' || e.key === 'p')) {
            e.preventDefault();
            showCopyProtectionMessage();
            return false;
        }
        
        // Disable F12 (Developer Tools)
        if (e.key === 'F12') {
            e.preventDefault();
            showCopyProtectionMessage();
            return false;
        }
        
        // Disable Ctrl+Shift+I (Developer Tools)
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            showCopyProtectionMessage();
            return false;
        }
        
        // Disable Ctrl+U (View Source)
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            showCopyProtectionMessage();
            return false;
        }
    });
    
    // Disable text selection
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Disable drag and drop
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Disable print screen (limited effectiveness)
    document.addEventListener('keyup', function(e) {
        if (e.key === 'PrintScreen') {
            showCopyProtectionMessage();
        }
    });
    
    // Add CSS to prevent text selection
    const style = document.createElement('style');
    style.textContent = `
        .book-content {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            -webkit-touch-callout: none;
            -webkit-tap-highlight-color: transparent;
        }
        
        .book-content::selection {
            background: transparent;
        }
        
        .book-content::-moz-selection {
            background: transparent;
        }
    `;
    document.head.appendChild(style);
}

function showCopyProtectionMessage() {
    if (window.showNotification) {
        window.showNotification('Content is protected. Please purchase the book to access all features.', 'error');
    } else {
        alert('This content is protected. Please purchase the book to access all features.');
    }
}

// Initialize reading interface
function initializeReadingInterface() {
    loadChapter(currentChapter);
    updateChapterInfo();
    updateProgressBar();
    
    // Set initial font size
    const content = document.getElementById('book-content');
    if (content) {
        content.style.fontSize = fontSize + 'px';
    }
}

// Load chapter content
function loadChapter(chapterNumber) {
    const bookContentDiv = document.getElementById('book-content');
    const chapter = bookContent.chapters.find(ch => ch.id === chapterNumber);
    
    if (chapter && bookContentDiv) {
        bookContentDiv.innerHTML = chapter.content;
        
        // Add fade-in animation
        bookContentDiv.style.opacity = '0';
        setTimeout(() => {
            bookContentDiv.style.opacity = '1';
        }, 100);
        
        // Update navigation buttons
        updateNavigationButtons();
        updateChapterInfo();
        updateProgressBar();
        
        // Scroll to top of content
        bookContentDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Navigation functions
function nextChapter() {
    if (currentChapter < bookContent.totalChapters) {
        if (currentChapter < bookContent.chapters.length) {
            currentChapter++;
            loadChapter(currentChapter);
        } else {
            // Show purchase message for locked chapters
            showPurchaseMessage();
        }
    }
}

function previousChapter() {
    if (currentChapter > 1) {
        currentChapter--;
        loadChapter(currentChapter);
    }
}

function updateNavigationButtons() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) {
        prevBtn.disabled = currentChapter === 1;
    }
    
    if (nextBtn) {
        if (currentChapter >= bookContent.chapters.length) {
            nextBtn.textContent = 'Buy Full Book';
            nextBtn.onclick = () => window.location.href = 'buy.html';
        } else {
            nextBtn.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
            nextBtn.onclick = nextChapter;
        }
    }
}

function updateChapterInfo() {
    const chapterInfo = document.getElementById('chapter-info');
    if (chapterInfo) {
        chapterInfo.textContent = `Chapter ${currentChapter} of ${bookContent.totalChapters}`;
    }
}

function updateProgressBar() {
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        const progress = (currentChapter / bookContent.totalChapters) * 100;
        progressFill.style.width = progress + '%';
    }
}

// Font size controls
function increaseFontSize() {
    if (fontSize < 24) {
        fontSize += 2;
        updateFontSize();
    }
}

function decreaseFontSize() {
    if (fontSize > 14) {
        fontSize -= 2;
        updateFontSize();
    }
}

function updateFontSize() {
    const content = document.getElementById('book-content');
    if (content) {
        content.style.fontSize = fontSize + 'px';
    }
    
    // Save preference
    localStorage.setItem('bookFontSize', fontSize);
}

// Dark mode toggle
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    const body = document.body;
    
    if (isDarkMode) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
    
    // Save preference
    localStorage.setItem('bookDarkMode', isDarkMode);
}

// Load saved preferences
function loadPreferences() {
    const savedFontSize = localStorage.getItem('bookFontSize');
    const savedDarkMode = localStorage.getItem('bookDarkMode');
    
    if (savedFontSize) {
        fontSize = parseInt(savedFontSize);
        updateFontSize();
    }
    
    if (savedDarkMode === 'true') {
        isDarkMode = true;
        toggleDarkMode();
    }
}

// Show purchase message
function showPurchaseMessage() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Unlock Full Content</h2>
                <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
            </div>
            <div class="modal-body">
                <div style="text-align: center; padding: 2rem;">
                    <i class="fas fa-lock" style="font-size: 3rem; color: #D7263D; margin-bottom: 1rem;"></i>
                    <h3>Get the Complete Book</h3>
                    <p>You've reached the end of the free preview. To continue reading and access all 12 chapters, please purchase the full book.</p>
                    
                    <div style="margin: 2rem 0;">
                        <h4>What you'll get:</h4>
                        <ul style="text-align: left; max-width: 300px; margin: 0 auto;">
                            <li>✓ All 12 complete chapters</li>
                            <li>✓ Bonus worksheets and templates</li>
                            <li>✓ Practical exercises</li>
                            <li>✓ Lifetime access</li>
                        </ul>
                    </div>
                    
                    <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
                        <a href="buy.html" class="btn btn-primary">
                            <i class="fas fa-shopping-cart"></i> Buy Now
                        </a>
                        <button onclick="this.closest('.modal').remove()" class="btn btn-outline">
                            Continue Preview
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Initialize preferences when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadPreferences();
});

// Export functions for global access
window.nextChapter = nextChapter;
window.previousChapter = previousChapter;
window.increaseFontSize = increaseFontSize;
window.decreaseFontSize = decreaseFontSize;
window.toggleDarkMode = toggleDarkMode;
