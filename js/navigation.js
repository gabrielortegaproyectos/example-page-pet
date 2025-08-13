// Navigation functionality

class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        
        this.isMenuOpen = false;
        this.lastScrollTop = 0;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.handleScroll();
        this.updateActiveLink();
    }
    
    bindEvents() {
        // Toggle mobile menu
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        // Close menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleLinkClick(e);
                this.closeMobileMenu();
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !this.navbar.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
        
        // Handle scroll
        window.addEventListener('scroll', utils.throttle(() => {
            this.handleScroll();
            this.updateActiveLink();
        }, 16));
        
        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', utils.debounce(() => {
            if (window.innerWidth > 1023 && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        }, 300));
    }
    
    toggleMobileMenu() {
        if (this.isMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }
    
    openMobileMenu() {
        this.navMenu.classList.add('active');
        this.navToggle.classList.add('active');
        this.isMenuOpen = true;
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        this.navMenu.setAttribute('aria-expanded', 'true');
        
        // Animate menu items
        this.animateMenuItems(true);
    }
    
    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
        this.isMenuOpen = false;
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Focus management for accessibility
        this.navMenu.setAttribute('aria-expanded', 'false');
        
        // Animate menu items
        this.animateMenuItems(false);
    }
    
    animateMenuItems(show) {
        const items = this.navMenu.querySelectorAll('.nav-link');
        
        items.forEach((item, index) => {
            if (show) {
                setTimeout(() => {
                    item.style.animation = 'slideInRight 0.3s ease forwards';
                }, index * 100);
            } else {
                item.style.animation = '';
            }
        });
    }
    
    handleLinkClick(e) {
        e.preventDefault();
        
        const href = e.target.getAttribute('href');
        if (!href.startsWith('#')) return;
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const navbarHeight = this.navbar.offsetHeight;
            utils.smoothScrollTo(targetElement, navbarHeight);
            
            // Update URL without triggering scroll
            history.pushState(null, null, href);
        }
    }
    
    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class
        if (scrollTop > 100) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (optional feature)
        if (this.shouldHideNavbar()) {
            if (scrollTop > this.lastScrollTop && scrollTop > 200) {
                // Scrolling down
                this.navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                this.navbar.style.transform = 'translateY(0)';
            }
        }
        
        this.lastScrollTop = scrollTop;
    }
    
    shouldHideNavbar() {
        // Only hide navbar on mobile/tablet
        return window.innerWidth <= 1023 && !this.isMenuOpen;
    }
    
    updateActiveLink() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const navbarHeight = this.navbar.offsetHeight;
        
        let currentSection = '';
        
        this.sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top + scrollTop - navbarHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Special case for top of page
        if (scrollTop < 100) {
            currentSection = 'inicio';
        }
        
        // Update active link
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Public method to programmatically navigate
    navigateTo(sectionId) {
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
            const navbarHeight = this.navbar.offsetHeight;
            utils.smoothScrollTo(targetElement, navbarHeight);
            
            // Update URL
            history.pushState(null, null, `#${sectionId}`);
            
            // Close mobile menu if open
            this.closeMobileMenu();
        }
    }
    
    // Handle initial page load with hash
    handleInitialHash() {
        const hash = window.location.hash;
        if (hash) {
            // Small delay to ensure page is fully loaded
            setTimeout(() => {
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    const navbarHeight = this.navbar.offsetHeight;
                    utils.smoothScrollTo(targetElement, navbarHeight);
                }
            }, 100);
        }
    }
}

// Add CSS animations for menu items
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .nav-menu.active .nav-link {
        opacity: 0;
    }
    
    .navbar {
        transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
    }
    
    @media (max-width: 1023px) {
        .nav-menu {
            transform: translateX(-100%);
            transition: transform 0.3s ease;
        }
        
        .nav-menu.active {
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.navigation = new Navigation();
    
    // Handle initial hash after a short delay
    setTimeout(() => {
        window.navigation.handleInitialHash();
    }, 100);
});

// Handle back/forward browser navigation
window.addEventListener('popstate', () => {
    if (window.navigation) {
        window.navigation.handleInitialHash();
    }
});
