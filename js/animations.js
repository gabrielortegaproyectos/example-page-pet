
// Animation Controller Module

class AnimationController {
    constructor() {
        this.observer = null;
        this.animationQueue = [];
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.initObserver();
        } else {
            // Fallback for older browsers
            this.runAllAnimations();
        }
        
        this.initHeroAnimations();
        this.initScrollIndicator();
    }

    initObserver() {
        this.observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 0.1
        });

        document.querySelectorAll('[data-animation]').forEach(el => {
            this.observer.observe(el);
        });
    }

    triggerAnimation(element) {
        const animationType = element.dataset.animation;
        element.classList.add('animate', `animate--${animationType}`);
    }
    
    initHeroAnimations() {
        const heroElements = [
            document.querySelector('.hero-title'),
            document.querySelector('.hero-subtitle'),
            document.querySelector('.hero-description'),
            document.querySelector('.hero-buttons'),
            document.querySelector('.hero-image')
        ];

        heroElements.forEach((el, index) => {
            if (el) {
                el.style.setProperty('--animation-delay', `${index * 150}ms`);
                el.classList.add('animate', 'animate--fadeInUp');
            }
        });
    }
    
    initScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            setTimeout(() => {
                scrollIndicator.classList.add('visible');
            }, 2000);
        }
    }

    runAllAnimations() {
        document.querySelectorAll('[data-animation]').forEach(el => {
            this.triggerAnimation(el);
        });
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

// Initialize the animation controller
window.animationController = new AnimationController();
