// Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoadingScreen();
    initNavigation();
    initScreenshots();
    initAnimations();
    initScrollEffects();
    initDownload();
    initPerformance();
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    if (!loadingScreen) return;
    
    // Show loading screen for minimum 1.5 seconds
    const startTime = Date.now();
    const minLoadingTime = 1500;
    
    window.addEventListener('load', () => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minLoadingTime - elapsed);
        
        setTimeout(() => {
            loadingScreen.classList.add('loaded');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, remaining);
    });
}

// Navigation
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navbar || !hamburger || !navMenu) return;

    // Scroll effect
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide navbar on scroll down
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Screenshots Gallery
function initScreenshots() {
    const navItems = document.querySelectorAll('.screenshots-nav .nav-item');
    const screenshots = document.querySelectorAll('.screenshot-image');

    if (navItems.length === 0 || screenshots.length === 0) return;

    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            screenshots.forEach(screen => screen.classList.remove('active'));

            // Add active class to clicked item
            item.classList.add('active');
            if (screenshots[index]) {
                screenshots[index].classList.add('active');
            }
        });
    });

    // Auto-rotate screenshots on desktop
    if (window.innerWidth > 768) {
        let currentSlide = 0;
        setInterval(() => {
            currentSlide = (currentSlide + 1) % navItems.length;
            navItems.forEach(nav => nav.classList.remove('active'));
            screenshots.forEach(screen => screen.classList.remove('active'));
            
            navItems[currentSlide].classList.add('active');
            screenshots[currentSlide].classList.add('active');
        }, 5000);
    }
}

// Animations
function initAnimations() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            disable: function() {
                return window.innerWidth < 768;
            }
        });
    }

    // Floating cards animation
    const cards = document.querySelectorAll('.floating-cards .card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.5}s`;
    });

    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.visibility = 'hidden';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.visibility = 'visible';
            }
        });
    }

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'loading-bar';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Download functionality
function initDownload() {
    const downloadButtons = document.querySelectorAll('#windowsDownload, .btn-primary[href="#download"]');
    const WINDOWS_DOWNLOAD_URL = "https://github.com/ProFwR/POS-SYSTEM/releases/download/v1.0.0/POS.System.Setup.1.0.0.rar";

    if (downloadButtons.length === 0) return;

    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            downloadForWindows();
        });
    });

    function downloadForWindows() {
        try {
            // Create temporary link for download
            const link = document.createElement('a');
            link.href = WINDOWS_DOWNLOAD_URL;
            link.download = 'POS_System_Setup.rar';
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            showDownloadSuccess();
        } catch (error) {
            console.error('Download error:', error);
            showDownloadError();
        }
    }

    function showDownloadSuccess() {
        const toast = document.createElement('div');
        toast.textContent = '✅ جاري تحميل التطبيق للويندوز...';
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--primary);
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            z-index: 10000;
            font-family: 'Tajawal', sans-serif;
            font-weight: 600;
            box-shadow: var(--shadow-lg);
            animation: fadeInOut 3s ease-in-out;
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            if (toast.parentNode) {
                document.body.removeChild(toast);
            }
        }, 3000);
    }

    function showDownloadError() {
        const toast = document.createElement('div');
        toast.textContent = '❌ حدث خطأ في التحميل، يرجى المحاولة مرة أخرى';
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--danger);
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            z-index: 10000;
            font-family: 'Tajawal', sans-serif;
            font-weight: 600;
            box-shadow: var(--shadow-lg);
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            if (toast.parentNode) {
                document.body.removeChild(toast);
            }
        }, 3000);
    }
}

// Performance optimization
function initPerformance() {
    // Lazy loading for future images
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }

    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Scroll handling code
        }, 10);
    });

    // Optimize animations for mobile
    if (window.innerWidth < 768) {
        document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
    }
}

// Handle resize events
function handleResize() {
    // Reinitialize components on resize
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (window.innerWidth > 768 && navMenu && hamburger) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize resize handler
window.addEventListener('resize', handleResize);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Enhanced error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

// Initialize Three.js scene after page load
window.addEventListener('load', () => {
    // Three.js will be initialized in its own file
});