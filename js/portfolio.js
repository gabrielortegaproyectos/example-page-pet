// Portfolio functionality

class Portfolio {
    constructor() {
        this.portfolioGrid = document.getElementById('portfolio-grid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.loadMoreBtn = document.getElementById('load-more');
        
        this.currentFilter = 'all';
        this.itemsPerPage = 8;
        this.currentPage = 1;
        this.allItems = [];
        this.filteredItems = [];
        
        this.init();
    }
    
    init() {
        this.generatePortfolioItems();
        this.bindEvents();
        this.renderItems();
    }
    
    generatePortfolioItems() {
        // Sample portfolio data - in a real application, this would come from an API or CMS
        this.allItems = [
            {
                id: 1,
                title: 'Imagen 1',
                description: 'Descripción de la imagen 1',
                category: 'general',
                image: './images/Img_1.jpeg',
                date: '2025-08-01'
            },
            {
                id: 2,
                title: 'Imagen 2',
                description: 'Descripción de la imagen 2',
                category: 'general',
                image: './images/Img_2.jpeg',
                date: '2025-08-02'
            },
            {
                id: 3,
                title: 'Imagen 3',
                description: 'Descripción de la imagen 3',
                category: 'general',
                image: './images/Img_3.jpeg',
                date: '2025-08-03'
            },
            {
                id: 4,
                title: 'Imagen 4',
                description: 'Descripción de la imagen 4',
                category: 'general',
                image: './images/Img_4.jpeg',
                date: '2025-08-04'
            },
            {
                id: 5,
                title: 'Imagen 5',
                description: 'Descripción de la imagen 5',
                category: 'general',
                image: './images/Img_5.jpeg',
                date: '2025-08-05'
            }
        ];
        
        this.applyFilter(this.currentFilter);
    }
    
    bindEvents() {
        // Filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleFilterClick(e);
            });
        });
        
        // Load more button
        if (this.loadMoreBtn) {
            this.loadMoreBtn.addEventListener('click', () => {
                this.loadMoreItems();
            });
        }
        
        // Handle portfolio item clicks
        this.portfolioGrid.addEventListener('click', (e) => {
            const portfolioItem = e.target.closest('.portfolio-item');
            if (portfolioItem) {
                this.openLightbox(portfolioItem.dataset.itemId);
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isLightboxOpen) {
                this.closeLightbox();
            }
        });
    }
    
    handleFilterClick(e) {
        const filterValue = e.target.dataset.filter;
        
        // Update active button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Apply filter
        this.currentFilter = filterValue;
        this.currentPage = 1;
        this.applyFilter(filterValue);
        this.renderItems();
    }
    
    applyFilter(filterValue) {
        if (filterValue === 'all') {
            this.filteredItems = [...this.allItems];
        } else {
            this.filteredItems = this.allItems.filter(item => item.category === filterValue);
        }
    }
    
    renderItems() {
        const startIndex = 0;
        const endIndex = this.currentPage * this.itemsPerPage;
        const itemsToShow = this.filteredItems.slice(startIndex, endIndex);
        
        // Clear existing items with animation
        this.animateItemsOut(() => {
            this.portfolioGrid.innerHTML = '';
            
            // Add new items
            itemsToShow.forEach((item, index) => {
                const portfolioItem = this.createPortfolioItem(item);
                this.portfolioGrid.appendChild(portfolioItem);
                
                // Animate in with delay
                setTimeout(() => {
                    portfolioItem.classList.add('animate-in');
                }, index * 100);
            });
            
            // Update load more button
            this.updateLoadMoreButton();
        });
    }
    
    createPortfolioItem(item) {
        const div = document.createElement('div');
        div.className = 'portfolio-item';
        div.dataset.itemId = item.id;
        div.dataset.category = item.category;
        
        // Create placeholder image with proper aspect ratio
        const placeholderSvg = this.createImagePlaceholder(400, 350, item.title);
        
        div.innerHTML = `
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="portfolio-overlay">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="portfolio-actions">
                    <button class="btn btn-primary">Ver Detalles</button>
                </div>
            </div>
            <div class="portfolio-category">${this.getCategoryName(item.category)}</div>
        `;
        
        return div;
    }
    
    createImagePlaceholder(width, height, text) {
        // Create a beautiful gradient placeholder
        const gradients = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
            'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
        ];
        
        const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
        
        return `data:image/svg+xml,${encodeURIComponent(`
            <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#f97316;stop-opacity:0.8" />
                        <stop offset="100%" style="stop-color:#fbbf24;stop-opacity:0.8" />
                    </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#grad)"/>
                <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" 
                      fill="white" text-anchor="middle" dy=".3em" opacity="0.9">
                    ${text.substring(0, 20)}...
                </text>
                <circle cx="50%" cy="30%" r="20" fill="white" opacity="0.3"/>
                <path d="M ${width/2-10} ${height*0.3-5} L ${width/2} ${height*0.3-15} L ${width/2+10} ${height*0.3-5} Z" 
                      fill="white" opacity="0.5"/>
            </svg>
        `)}`;
    }
    
    getCategoryName(category) {
        const categoryNames = {
            'commercial': 'Comercial',
            'fashion': 'Moda',
            'lifestyle': 'Lifestyle',
            'portrait': 'Retrato'
        };
        return categoryNames[category] || category;
    }
    
    animateItemsOut(callback) {
        const currentItems = this.portfolioGrid.querySelectorAll('.portfolio-item');
        
        if (currentItems.length === 0) {
            callback();
            return;
        }
        
        currentItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate-out');
            }, index * 50);
        });
        
        setTimeout(callback, currentItems.length * 50 + 300);
    }
    
    loadMoreItems() {
        this.currentPage++;
        
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = this.currentPage * this.itemsPerPage;
        const newItems = this.filteredItems.slice(startIndex, endIndex);
        
        newItems.forEach((item, index) => {
            const portfolioItem = this.createPortfolioItem(item);
            portfolioItem.style.opacity = '0';
            portfolioItem.style.transform = 'translateY(20px)';
            this.portfolioGrid.appendChild(portfolioItem);
            
            // Animate in
            setTimeout(() => {
                portfolioItem.style.transition = 'all 0.5s ease';
                portfolioItem.style.opacity = '1';
                portfolioItem.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        this.updateLoadMoreButton();
    }
    
    updateLoadMoreButton() {
        if (!this.loadMoreBtn) return;
        
        const totalShown = this.currentPage * this.itemsPerPage;
        const hasMore = totalShown < this.filteredItems.length;
        
        if (hasMore) {
            this.loadMoreBtn.style.display = 'inline-flex';
            this.loadMoreBtn.textContent = `Cargar Más (${this.filteredItems.length - totalShown} restantes)`;
        } else {
            this.loadMoreBtn.style.display = 'none';
        }
    }
    
    openLightbox(itemId) {
        const item = this.allItems.find(item => item.id == itemId);
        if (!item) return;
        
        // Create lightbox if it doesn't exist
        if (!this.lightbox) {
            this.createLightbox();
        }
        
        // Populate lightbox content
        this.populateLightbox(item);
        
        // Show lightbox
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.isLightboxOpen = true;
        
        // Focus management for accessibility
        this.lightbox.focus();
    }
    
    createLightbox() {
        this.lightbox = document.createElement('div');
        this.lightbox.className = 'portfolio-lightbox';
        this.lightbox.setAttribute('tabindex', '-1');
        this.lightbox.innerHTML = `
            <div class="lightbox-backdrop"></div>
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <div class="lightbox-image">
                    <img src="" alt="">
                </div>
                <div class="lightbox-info">
                    <h2 class="lightbox-title"></h2>
                    <p class="lightbox-description"></p>
                    <div class="lightbox-meta">
                        <span class="lightbox-category"></span>
                        <span class="lightbox-date"></span>
                    </div>
                    <div class="lightbox-actions">
                        <button class="btn btn-primary">Solicitar Información</button>
                        <button class="btn btn-secondary lightbox-close-btn">Cerrar</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.lightbox);
        
        // Bind close events
        this.lightbox.querySelector('.lightbox-close').addEventListener('click', () => this.closeLightbox());
        this.lightbox.querySelector('.lightbox-close-btn').addEventListener('click', () => this.closeLightbox());
        this.lightbox.querySelector('.lightbox-backdrop').addEventListener('click', () => this.closeLightbox());
    }
    
    populateLightbox(item) {
        const img = this.lightbox.querySelector('.lightbox-image img');
        const title = this.lightbox.querySelector('.lightbox-title');
        const description = this.lightbox.querySelector('.lightbox-description');
        const category = this.lightbox.querySelector('.lightbox-category');
        const date = this.lightbox.querySelector('.lightbox-date');
        
        img.src = this.createImagePlaceholder(800, 600, item.title);
        img.alt = item.title;
        title.textContent = item.title;
        description.textContent = item.description;
        category.textContent = this.getCategoryName(item.category);
        date.textContent = utils.dateUtils.formatDate(item.date);
    }
    
    closeLightbox() {
        if (!this.lightbox) return;
        
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
        this.isLightboxOpen = false;
    }
}

// Add CSS for portfolio animations and lightbox
const portfolioStyle = document.createElement('style');
portfolioStyle.textContent = `
    .portfolio-item {
        opacity: 1;
        transform: translateY(0);
        transition: all 0.5s ease;
    }
    
    .portfolio-item.animate-out {
        opacity: 0;
        transform: translateY(-20px);
    }
    
    .portfolio-item.animate-in {
        animation: portfolioItemIn 0.6s ease forwards;
    }
    
    @keyframes portfolioItemIn {
        from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    .portfolio-lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .portfolio-lightbox.active {
        opacity: 1;
        visibility: visible;
    }
    
    .lightbox-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(5px);
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
        background: white;
        border-radius: 12px;
        overflow: hidden;
        display: grid;
        grid-template-columns: 1fr;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }
    
    .portfolio-lightbox.active .lightbox-content {
        transform: scale(1);
    }
    
    @media (min-width: 768px) {
        .lightbox-content {
            grid-template-columns: 1fr 1fr;
            max-width: 1000px;
            max-height: 600px;
        }
    }
    
    .lightbox-close {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 40px;
        height: 40px;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }
    
    .lightbox-close:hover {
        background: rgba(0, 0, 0, 0.8);
        transform: scale(1.1);
    }
    
    .lightbox-image {
        position: relative;
        overflow: hidden;
    }
    
    .lightbox-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .lightbox-info {
        padding: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    .lightbox-title {
        font-size: 28px;
        font-weight: 600;
        margin-bottom: 15px;
        color: #1a1a1a;
    }
    
    .lightbox-description {
        font-size: 16px;
        line-height: 1.6;
        color: #666;
        margin-bottom: 20px;
    }
    
    .lightbox-meta {
        display: flex;
        gap: 20px;
        margin-bottom: 30px;
        font-size: 14px;
        color: #888;
    }
    
    .lightbox-category {
        background: #f97316;
        color: white;
        padding: 4px 12px;
        border-radius: 20px;
        font-weight: 500;
    }
    
    .lightbox-actions {
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
    }
    
    @media (max-width: 767px) {
        .lightbox-content {
            margin: 20px;
            max-height: calc(100vh - 40px);
        }
        
        .lightbox-info {
            padding: 20px;
        }
        
        .lightbox-title {
            font-size: 24px;
        }
    }
`;
document.head.appendChild(portfolioStyle);

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolio = new Portfolio();
});
