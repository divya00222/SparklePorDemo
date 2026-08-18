document.addEventListener('DOMContentLoaded', () => {
    // Lucide Icon replacement
    const initIcons = () => {
        if (window.lucide) {
            window.lucide.createIcons();
        } else {
            console.error('Lucide library not loaded');
        }
    };
    initIcons();

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    const toggleMenu = () => {
        mobileMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    };

    mobileToggle.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('[data-reveal]');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 100) {
                el.classList.add('revealed');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Form Validation & Submission Demo
    const quoteForm = document.getElementById('quoteForm');
    const successMessage = document.getElementById('successMessage');

    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic Validation
            let isValid = true;
            const inputs = quoteForm.querySelectorAll('input[required], select[required], textarea[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                } else {
                    input.style.borderColor = '#e2e8f0';
                }
            });

            if (isValid) {
                // Show success message
                successMessage.style.display = 'block';
                quoteForm.reset();
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }
        });
    }

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Smooth Scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Image Skeleton Loading
    const initImageSkeletons = () => {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Skip icons, small images, or images that shouldn't have skeletons
            if (img.width < 50 && img.height < 50 && img.complete) return;
            if (img.closest('.logo') || img.closest('.footer-logo')) return;
            
            let skeleton = img.closest('.image-skeleton');
            
            // If the image is not already wrapped in a skeleton, wrap it
            if (!skeleton) {
                skeleton = document.createElement('div');
                skeleton.className = 'image-skeleton';
                img.parentNode.insertBefore(skeleton, img);
                skeleton.appendChild(img);
            }

            const handleLoad = () => {
                skeleton.classList.remove('image-loading');
                skeleton.classList.add('image-loaded');
            };

            const handleError = () => {
                skeleton.classList.remove('image-loading');
                skeleton.classList.add('image-error');
            };

            // Set initial state
            skeleton.classList.add('image-loading');

            if (img.complete) {
                handleLoad();
            } else {
                img.addEventListener('load', handleLoad);
                img.addEventListener('error', handleError);
            }
        });
    };
    initImageSkeletons();
});
