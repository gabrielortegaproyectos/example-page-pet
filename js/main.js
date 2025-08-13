// Main application controller

class PantuflaWebsite {
    constructor() {
        this.isLoaded = false;
        this.modules = {};
        
        this.init();
    }
    
    init() {
        this.setupErrorHandling();
        this.setupPerformanceOptimizations();
        this.setupAccessibility();
        this.setupAnalytics();
        this.bindGlobalEvents();
        this.initModules();
    }
    
    setupErrorHandling() {
        // Global error handler
        window.addEventListener('error', (e) => {
            utils.errorHandler.log(e.error, 'global error');
        });
        
        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', (e) => {
            utils.errorHandler.log(e.reason, 'unhandled promise rejection');
        });
    }
    
    setupPerformanceOptimizations() {
        // Lazy load images
        utils.performance.lazyLoadImages();
        
        // Preload critical resources
        const criticalResources = [
            './images/Img_2.jpeg',
            './images/pantufla-logo.png'
        ];
        
        criticalResources.forEach(resource => {
            utils.performance.preloadResource(resource);
        });
        
        // Service Worker registration (for future PWA capabilities)
        if ('serviceWorker' in navigator && (window.location.protocol === 'http:' || window.location.protocol === 'https:')) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }
    
    setupAccessibility() {
        // Skip to content link
        this.createSkipLink();
        
        // Focus management for modal elements
        this.setupFocusManagement();
        
        // Keyboard navigation improvements
        this.setupKeyboardNavigation();
        
        // Screen reader announcements
        this.setupScreenReaderSupport();
    }
    
    createSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Saltar al contenido principal';
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const mainContent = document.getElementById('main-content') || document.querySelector('main');
            if (mainContent) {
                mainContent.focus();
                mainContent.scrollIntoView();
            }
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add CSS for skip link
        const style = document.createElement('style');
        style.textContent = `
            .skip-link {
                position: absolute;
                top: -40px;
                left: 6px;
                background: #000;
                color: #fff;
                padding: 8px;
                text-decoration: none;
                border-radius: 4px;
                z-index: 10000;
                transition: top 0.3s;
            }
            
            .skip-link:focus {
                top: 6px;
            }
        `;
        document.head.appendChild(style);
    }
    
    setupFocusManagement() {
        // Store the last focused element before opening modals
        this.lastFocusedElement = null;
        
        document.addEventListener('focusin', (e) => {
            if (!e.target.closest('.modal, .lightbox')) {
                this.lastFocusedElement = e.target;
            }
        });
    }
    
    setupKeyboardNavigation() {
        // Enhanced keyboard navigation for custom components
        document.addEventListener('keydown', (e) => {
            // Close modals with Escape key
            if (e.key === 'Escape') {
                this.handleEscapeKey();
            }
            
            // Navigation with arrow keys in galleries
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                this.handleArrowNavigation(e);
            }
        });
    }
    
    handleEscapeKey() {
        // Close any open modals or overlays
        const openModals = document.querySelectorAll('.modal.active, .lightbox.active, .blog-modal.active');
        openModals.forEach(modal => {
            const closeBtn = modal.querySelector('.close, .modal-close, .lightbox-close, .blog-modal-close');
            if (closeBtn) {
                closeBtn.click();
            }
        });
        
        // Close mobile menu
        if (window.navigation && window.navigation.isMenuOpen) {
            window.navigation.closeMobileMenu();
        }
    }
    
    handleArrowNavigation(e) {
        // Handle portfolio navigation
        const activePortfolioItem = document.querySelector('.portfolio-item:focus');
        if (activePortfolioItem) {
            e.preventDefault();
            const items = Array.from(document.querySelectorAll('.portfolio-item'));
            const currentIndex = items.indexOf(activePortfolioItem);
            
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                items[currentIndex - 1].focus();
            } else if (e.key === 'ArrowRight' && currentIndex < items.length - 1) {
                items[currentIndex + 1].focus();
            }
        }
    }
    
    setupScreenReaderSupport() {
        // Create live region for dynamic content announcements
        const liveRegion = document.createElement('div');
        liveRegion.id = 'live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'visually-hidden';
        document.body.appendChild(liveRegion);
        
        // Method to announce messages to screen readers
        this.announce = (message) => {
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        };
    }
    
    setupAnalytics() {
        // Google Analytics 4 (replace with your measurement ID)
        if (typeof gtag !== 'undefined') {
            // Track page view
            gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: document.title,
                page_location: window.location.href
            });
            
            // Track scroll depth
            this.setupScrollTracking();
            
            // Track engagement events
            this.setupEngagementTracking();
        }
    }
    
    setupScrollTracking() {
        let scrollDepths = [25, 50, 75, 90];
        let trackedDepths = new Set();
        
        window.addEventListener('scroll', utils.throttle(() => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );
            
            scrollDepths.forEach(depth => {
                if (scrollPercent >= depth && !trackedDepths.has(depth)) {
                    trackedDepths.add(depth);
                    
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'scroll', {
                            event_category: 'engagement',
                            event_label: `${depth}%`,
                            value: depth
                        });
                    }
                }
            });
        }, 250));
    }
    
    setupEngagementTracking() {
        // Track time on page
        let startTime = Date.now();
        
        // Track when user leaves page
        window.addEventListener('beforeunload', () => {
            const timeOnPage = Math.round((Date.now() - startTime) / 1000);
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'timing_complete', {
                    name: 'time_on_page',
                    value: timeOnPage
                });
            }
        });
        
        // Track portfolio interactions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.portfolio-item')) {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'portfolio_view', {
                        event_category: 'engagement',
                        event_label: 'portfolio_item_click'
                    });
                }
            }
            
            if (e.target.closest('.blog-read-more')) {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'blog_read', {
                        event_category: 'engagement',
                        event_label: 'blog_post_open'
                    });
                }
            }
        });
    }
    
    bindGlobalEvents() {
        // Handle window resize
        window.addEventListener('resize', utils.debounce(() => {
            this.handleResize();
        }, 300));
        
        // Handle orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleResize();
            }, 500);
        });
        
        // Handle online/offline status
        window.addEventListener('online', () => {
            this.handleConnectionChange(true);
        });
        
        window.addEventListener('offline', () => {
            this.handleConnectionChange(false);
        });
        
        // Handle visibility change (tab switching)
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });
    }
    
    handleResize() {
        // Recalculate layouts if needed
        if (window.portfolio && typeof window.portfolio.updateLoadMoreButton === 'function') {
            window.portfolio.updateLoadMoreButton();
        }
        
        // Update viewport height for mobile browsers
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        this.announce('Diseño adaptado al nuevo tamaño de pantalla');
    }
    
    handleConnectionChange(isOnline) {
        const message = isOnline ? 
            'Conexión restaurada' : 
            'Sin conexión a internet';
            
        this.announce(message);
        
        // Show/hide offline indicator
        this.toggleOfflineIndicator(!isOnline);
    }
    
    toggleOfflineIndicator(show) {
        let indicator = document.getElementById('offline-indicator');
        
        if (show && !indicator) {
            indicator = document.createElement('div');
            indicator.id = 'offline-indicator';
            indicator.className = 'offline-indicator';
            indicator.innerHTML = `
                <i class="fas fa-wifi-slash"></i>
                <span>Sin conexión</span>
            `;
            document.body.appendChild(indicator);
            
            // Add CSS
            const style = document.createElement('style');
            style.textContent = `
                .offline-indicator {
                    position: fixed;
                    top: 80px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #ef4444;
                    color: white;
                    padding: 8px 16px;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 14px;
                    z-index: 10000;
                    animation: slideInDown 0.3s ease;
                }
            `;
            document.head.appendChild(style);
        } else if (!show && indicator) {
            indicator.style.animation = 'slideOutUp 0.3s ease';
            setTimeout(() => indicator.remove(), 300);
        }
    }
    
    handleVisibilityChange() {
        if (document.hidden) {
            // Page is hidden - pause animations, videos, etc.
            this.pauseMedia();
        } else {
            // Page is visible - resume activities
            this.resumeMedia();
        }
    }
    
    pauseMedia() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            if (!video.paused) {
                video.pause();
                video.dataset.wasPlaying = 'true';
            }
        });
    }
    
    resumeMedia() {
        const videos = document.querySelectorAll('video[data-was-playing="true"]');
        videos.forEach(video => {
            video.play();
            video.removeAttribute('data-was-playing');
        });
    }
    
    initModules() {
        // Initialize all modules when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.loadModules();
            });
        } else {
            this.loadModules();
        }
    }
    
    loadModules() {
        // Store references to modules
        this.modules = {
            navigation: window.navigation,
            portfolio: window.portfolio,
            blog: window.blog,
            contactForm: window.contactForm,
            animationController: window.animationController
        };
        
        // Mark as loaded
        this.isLoaded = true;
        
        // Hide loading screen
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }

        // Dispatch custom event
        const loadedEvent = new CustomEvent('pantuflaWebsiteLoaded', {
            detail: { modules: this.modules }
        });
        document.dispatchEvent(loadedEvent);
        
        console.log('Pantufla Website loaded successfully! 🐱');
    }
    
    // Public API methods
    scrollToSection(sectionId) {
        if (this.modules.navigation) {
            this.modules.navigation.navigateTo(sectionId);
        }
    }
    
    openPortfolioItem(itemId) {
        if (this.modules.portfolio) {
            this.modules.portfolio.openLightbox(itemId);
        }
    }
    
    openBlogPost(postId) {
        if (this.modules.blog) {
            this.modules.blog.openBlogPost(postId);
        }
    }
    
    // Method to get module instances
    getModule(moduleName) {
        return this.modules[moduleName];
    }
    
    // Cleanup method
    destroy() {
        if (this.modules.animationController) {
            this.modules.animationController.destroy();
        }
        
        // Remove event listeners
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('orientationchange', this.handleResize);
        window.removeEventListener('online', this.handleConnectionChange);
        window.removeEventListener('offline', this.handleConnectionChange);
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    }
}

// Initialize the main application
window.pantuflaWebsite = new PantuflaWebsite();

// Make it available globally for debugging
window.Pantufla = {
    website: window.pantuflaWebsite,
    utils: window.utils,
    version: '1.0.0',
    
    // Helper methods
    scrollTo: (sectionId) => window.pantuflaWebsite.scrollToSection(sectionId),
    openPortfolio: (itemId) => window.pantuflaWebsite.openPortfolioItem(itemId),
    openBlog: (postId) => window.pantuflaWebsite.openBlogPost(postId),
    
    // Debug methods
    getModules: () => window.pantuflaWebsite.modules,
    getModule: (name) => window.pantuflaWebsite.getModule(name)
};

// Console welcome message
console.log(`
🐱 Pantufla's Professional Website
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Version: ${window.Pantufla.version}
Loaded: ${new Date().toLocaleString()}

Available global commands:
• Pantufla.scrollTo('section-id')
• Pantufla.openPortfolio(itemId)
• Pantufla.openBlog(postId)
• Pantufla.getModules()

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
