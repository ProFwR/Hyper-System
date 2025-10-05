// رابط التحميل الحقيقي للتطبيق
const WINDOWS_DOWNLOAD_URL = "https://github.com/ProFwR/POS-SYSTEM/releases/download/v1.0.0/POS.System.Setup.1.0.0.rar";

// دالة التحميل
function initDownload() {
    const downloadBtn = document.getElementById('windowsDownload');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            downloadForWindows();
        });
    }
}

// دالة تحميل Windows
function downloadForWindows() {
    // إنشاء رابط تحميل خفي
    const link = document.createElement('a');
    link.href = WINDOWS_DOWNLOAD_URL;
    link.download = 'POS_System_Setup.rar'; // غيرت إلى .rar لأن ملفك rar
    link.style.display = 'none';
    document.body.appendChild(link);
    
    // تشغيل التحميل
    link.click();
    
    // تنظيف
    document.body.removeChild(link);
    
    // إظهار رسالة نجاح
    showDownloadSuccess();
}

// دالة إظهار رسالة النجاح
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
        animation: fadeInOut 3s ease-in-out;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        document.body.removeChild(toast);
    }, 3000);
}

// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    let slideInterval;
    
    // Initialize slider
    function initSlider() {
        updateSlider();
        
        // Auto slide every 5 seconds
        slideInterval = setInterval(() => {
            nextSlide();
        }, 5000);
    }
    
    // Go to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
        resetInterval();
    }
    
    // Update slider position and active dot
    function updateSlider() {
        if (sliderContainer) {
            sliderContainer.style.transform = `translateX(${currentSlide * 100}%)`;
            
            // Update active dot
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }
    
    // Reset the auto slide interval
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            nextSlide();
        }, 5000);
    }
    
    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Mobile menu functionality
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (mobileMenu) mobileMenu.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.feature-card, .section-title');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize animations
    function initAnimations() {
        // Set initial state for animated elements
        const animatedElements = document.querySelectorAll('.feature-card, .section-title');
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Trigger initial animation check
        animateOnScroll();
        
        // Add scroll event listener
        window.addEventListener('scroll', animateOnScroll);
    }
    
    // Initialize everything - دالة init واحدة فقط
    function init() {
        if (slides.length > 0) {
            initSlider();
        }
        initAnimations();
        initDownload(); // أضف هذا السطر هنا
        
        // Add loading animation
        window.addEventListener('load', function() {
            document.body.classList.add('loaded');
            
            // Animate hero elements with delay
            const heroText = document.querySelector('.hero-text');
            const heroImage = document.querySelector('.hero-image');
            
            if (heroText) {
                heroText.style.animation = 'fadeInUp 1s ease forwards';
            }
            
            if (heroImage) {
                heroImage.style.animation = 'float 3s ease-in-out infinite';
            }
        });
    }
    
    // Start the initialization
    init();
});