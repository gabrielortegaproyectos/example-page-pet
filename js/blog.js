// Blog functionality

class Blog {
    constructor() {
        this.blogContainer = document.querySelector('.blog-grid');
        this.posts = [];
        
        this.init();
    }
    
    init() {
        this.generateBlogPosts();
        this.bindEvents();
        this.setupIntersectionObserver();
    }
    
    generateBlogPosts() {
        // Sample blog data - in a real application, this would come from a CMS or API
        this.posts = [
            {
                id: 1,
                title: 'Mi Primera Sesión Profesional',
                excerpt: 'Recuerdo perfectamente ese primer día frente a las cámaras profesionales. Los nervios, la emoción y cómo descubrí mi verdadera pasión por el modelaje felino...',
                content: `
                    <p>Era una mañana soleada de primavera cuando llegué al estudio por primera vez. El equipo de producción había preparado todo meticulosamente: luces profesionales, fondos de diferentes texturas y colores, y por supuesto, mis juguetes favoritos para ayudarme a relajarme.</p>
                    
                    <p>Al principio, admito que estaba un poco nerviosa. Las luces eran más brillantes de lo que estaba acostumbrada, y había muchas personas moviéndose por el set. Pero el fotógrafo, Miguel, tenía una paciencia increíble y una forma muy especial de comunicarse conmigo.</p>
                    
                    <p>La clave del éxito en esa primera sesión fue la preparación. Días antes, mi equipo había visitado el estudio conmigo solo para que me familiarizara con el espacio. Esto hizo toda la diferencia cuando llegó el momento de la sesión real.</p>
                    
                    <p>Lo que más me sorprendió fue lo natural que se sintió estar frente a la cámara. Era como si hubiera nacido para esto. Cada clic del obturador me daba más confianza, y pronto estaba posando como una verdadera profesional.</p>
                    
                    <p>Esa sesión marcó el inicio de mi carrera profesional en el modelaje felino, y hasta el día de hoy, sigo sintiendo la misma emoción cada vez que entro a un nuevo set.</p>
                `,
                category: 'Experiencias',
                date: '2025-06-15',
                readTime: '3',
                image: './images/blog/primera-sesion.jpg',
                tags: ['modelaje', 'experiencia', 'carrera'],
                featured: true
            },
            {
                id: 2,
                title: 'Consejos para Poses Perfectas',
                excerpt: 'Los secretos detrás de mis poses más icónicas y cómo cualquier gato puede brillar frente a la cámara con la preparación adecuada.',
                content: `
                    <p>Después de años en el negocio, he aprendido que una buena pose no es casualidad. Requiere práctica, paciencia y sobre todo, conocer tus mejores ángulos.</p>
                    
                    <h3>1. Conoce tu luz</h3>
                    <p>La iluminación lo es todo. Aprende a identificar qué tipo de luz favorece más tu pelaje y tus características faciales. La luz natural de la mañana suele ser la más favorecedora.</p>
                    
                    <h3>2. Practica frente al espejo</h3>
                    <p>Sí, suena extraño, pero funciona. Dedica tiempo a observarte desde diferentes ángulos y encuentra las posiciones que más te favorecen.</p>
                    
                    <h3>3. La importancia de la relajación</h3>
                    <p>Una pose tensa nunca se ve natural. Aprende técnicas de relajación y encuentra tu zona de confort antes de cada sesión.</p>
                    
                    <h3>4. Trabaja tus expresiones</h3>
                    <p>Los ojos son el alma de cualquier fotografía. Practica diferentes expresiones: misteriosa, juguetona, elegante, curiosa.</p>
                    
                    <p>Recuerda, la práctica hace al maestro. Cada sesión es una oportunidad de aprender y mejorar.</p>
                `,
                category: 'Consejos',
                date: '2025-06-10',
                readTime: '5',
                image: './images/blog/consejos-poses.jpg',
                tags: ['consejos', 'poses', 'técnica']
            },
            {
                id: 3,
                title: 'Detrás de Cámaras: La Realidad del Set',
                excerpt: 'Un vistazo exclusivo a lo que realmente sucede durante una sesión de fotos profesional, desde la preparación hasta la edición final.',
                content: `
                    <p>Muchos piensan que el modelaje felino es solo llegar y posar, pero la realidad es mucho más compleja y fascinante.</p>
                    
                    <h3>La preparación es clave</h3>
                    <p>Antes de cada sesión, hay todo un proceso de preparación. Desde el cuidado del pelaje hasta la planificación de las poses, cada detalle cuenta.</p>
                    
                    <h3>El día de la sesión</h3>
                    <p>Un día típico en el set comienza temprano. Llego al estudio, conozco al equipo, me familiarizo con el espacio y los accesorios que vamos a usar.</p>
                    
                    <h3>La magia del trabajo en equipo</h3>
                    <p>Una buena sesión es resultado del trabajo de todo un equipo: fotógrafo, estilista, asistentes, y por supuesto, mi handler que siempre está ahí para asegurar mi bienestar.</p>
                    
                    <h3>Los momentos entre tomas</h3>
                    <p>Entre toma y toma, hay tiempo para descansar, hidratarse y jugar un poco. Esto ayuda a mantener la energía alta durante toda la sesión.</p>
                    
                    <p>Al final del día, ver el resultado final de todo ese trabajo en equipo es increíblemente gratificante.</p>
                `,
                category: 'Behind the Scenes',
                date: '2025-06-05',
                readTime: '4',
                image: './images/blog/detras-camaras.jpg',
                tags: ['behind the scenes', 'trabajo', 'equipo']
            },
            {
                id: 4,
                title: 'Mi Rutina de Cuidado Personal',
                excerpt: 'Los secretos de mi rutina de belleza y cuidado personal que me mantienen siempre lista para la cámara.',
                content: `
                    <p>Como modelo profesional, mantener una apariencia impecable es parte fundamental de mi trabajo. Aquí comparto mi rutina diaria de cuidado personal.</p>
                    
                    <h3>Cuidado del pelaje</h3>
                    <p>Mi pelaje es mi carta de presentación. Lo cepillo diariamente con un cepillo de cerdas naturales y uso productos específicos para mantenerlo suave y brillante.</p>
                    
                    <h3>Alimentación balanceada</h3>
                    <p>Una dieta equilibrada se refleja en mi pelaje y energía. Como alimentos premium ricos en omega-3 y vitaminas esenciales.</p>
                    
                    <h3>Ejercicio regular</h3>
                    <p>Mantengo mi figura con ejercicio diario. Mis sesiones de juego no solo son divertidas, sino que me ayudan a mantenerme en forma.</p>
                    
                    <h3>Descanso adecuado</h3>
                    <p>El sueño reparador es esencial. Duermo entre 12-16 horas al día para mantener mi energía y aspecto radiante.</p>
                    
                    <h3>Cuidado de la salud</h3>
                    <p>Visitas regulares al veterinario, vacunas al día y chequeos de rutina son parte de mi compromiso con mi salud.</p>
                `,
                category: 'Lifestyle',
                date: '2025-05-30',
                readTime: '6',
                image: './images/blog/rutina-cuidado.jpg',
                tags: ['cuidado', 'belleza', 'salud']
            }
        ];
    }
    
    bindEvents() {
        // Handle read more clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('blog-read-more')) {
                e.preventDefault();
                const blogCard = e.target.closest('.blog-card');
                const postId = blogCard.dataset.postId;
                this.openBlogPost(postId);
            }
        });
        
        // Handle blog navigation
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-action="view-all-posts"]')) {
                e.preventDefault();
                this.showAllPosts();
            }
        });
    }
    
    setupIntersectionObserver() {
        // Animate blog cards when they come into view
        const observer = utils.createIntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        });
        
        // Observe existing blog cards
        document.querySelectorAll('.blog-card').forEach(card => {
            observer.observe(card);
        });
    }
    
    openBlogPost(postId) {
        const post = this.posts.find(p => p.id == postId);
        if (!post) return;
        
        // Create modal if it doesn't exist
        if (!this.blogModal) {
            this.createBlogModal();
        }
        
        this.populateBlogModal(post);
        this.showBlogModal();
    }
    
    createBlogModal() {
        this.blogModal = document.createElement('div');
        this.blogModal.className = 'blog-modal';
        this.blogModal.innerHTML = `
            <div class="blog-modal-backdrop"></div>
            <div class="blog-modal-content">
                <div class="blog-modal-header">
                    <button class="blog-modal-close">&times;</button>
                </div>
                <article class="blog-modal-article">
                    <div class="blog-modal-image">
                        <img src="" alt="">
                    </div>
                    <div class="blog-modal-body">
                        <div class="blog-meta">
                            <span class="blog-category"></span>
                            <span class="blog-date"></span>
                            <span class="blog-read-time"></span>
                        </div>
                        <h1 class="blog-title"></h1>
                        <div class="blog-content"></div>
                        <div class="blog-tags"></div>
                        <div class="blog-actions">
                            <button class="btn btn-primary" data-action="contact">Contactar para Colaboración</button>
                            <button class="btn btn-secondary blog-modal-close-btn">Cerrar</button>
                        </div>
                    </div>
                </article>
            </div>
        `;
        
        document.body.appendChild(this.blogModal);
        
        // Bind close events
        this.blogModal.querySelector('.blog-modal-close').addEventListener('click', () => this.closeBlogModal());
        this.blogModal.querySelector('.blog-modal-close-btn').addEventListener('click', () => this.closeBlogModal());
        this.blogModal.querySelector('.blog-modal-backdrop').addEventListener('click', () => this.closeBlogModal());
        
        // Bind action events
        this.blogModal.querySelector('[data-action="contact"]').addEventListener('click', () => {
            this.closeBlogModal();
            utils.smoothScrollTo('#contacto', 80);
        });
        
        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isBlogModalOpen) {
                this.closeBlogModal();
            }
        });
    }
    
    populateBlogModal(post) {
        const modal = this.blogModal;
        
        // Create placeholder image
        const placeholderSvg = this.createBlogImagePlaceholder(800, 400, post.title);
        
        modal.querySelector('.blog-modal-image img').src = placeholderSvg;
        modal.querySelector('.blog-modal-image img').alt = post.title;
        modal.querySelector('.blog-category').textContent = post.category;
        modal.querySelector('.blog-date').textContent = utils.dateUtils.formatDate(post.date);
        modal.querySelector('.blog-read-time').textContent = `${post.readTime} min lectura`;
        modal.querySelector('.blog-title').textContent = post.title;
        modal.querySelector('.blog-content').innerHTML = post.content;
        
        // Populate tags
        const tagsContainer = modal.querySelector('.blog-tags');
        tagsContainer.innerHTML = post.tags.map(tag => 
            `<span class="blog-tag">${tag}</span>`
        ).join('');
    }
    
    createBlogImagePlaceholder(width, height, title) {
        return `data:image/svg+xml,${encodeURIComponent(`
            <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="blogGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#blogGrad)"/>
                <circle cx="30%" cy="25%" r="40" fill="white" opacity="0.1"/>
                <circle cx="70%" cy="75%" r="60" fill="white" opacity="0.1"/>
                <text x="50%" y="45%" font-family="Arial, sans-serif" font-size="24" font-weight="bold"
                      fill="white" text-anchor="middle" dy=".3em">
                    ${title.split(' ').slice(0, 3).join(' ')}
                </text>
                <text x="50%" y="65%" font-family="Arial, sans-serif" font-size="16"
                      fill="white" text-anchor="middle" dy=".3em" opacity="0.8">
                    Blog Personal de Pantufla
                </text>
            </svg>
        `)}`;
    }
    
    showBlogModal() {
        this.blogModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.isBlogModalOpen = true;
        
        // Focus management for accessibility
        this.blogModal.focus();
    }
    
    closeBlogModal() {
        if (!this.blogModal) return;
        
        this.blogModal.classList.remove('active');
        document.body.style.overflow = '';
        this.isBlogModalOpen = false;
    }
    
    showAllPosts() {
        // This would typically navigate to a dedicated blog page
        // For now, we'll show a simple modal with all posts
        this.createAllPostsModal();
    }
    
    createAllPostsModal() {
        const modal = document.createElement('div');
        modal.className = 'all-posts-modal';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Todos los Posts del Blog</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="posts-grid">
                    ${this.posts.map(post => `
                        <div class="post-card" data-post-id="${post.id}">
                            <div class="post-image">
                                <img src="${this.createBlogImagePlaceholder(300, 200, post.title)}" alt="${post.title}">
                            </div>
                            <div class="post-content">
                                <div class="post-meta">
                                    <span>${post.category}</span>
                                    <span>${utils.dateUtils.formatDate(post.date)}</span>
                                </div>
                                <h3>${post.title}</h3>
                                <p>${post.excerpt.substring(0, 100)}...</p>
                                <button class="btn btn-outline blog-read-more">Leer Más</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Show modal
        setTimeout(() => modal.classList.add('active'), 10);
        
        // Bind events
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });
        
        modal.querySelector('.modal-backdrop').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });
        
        // Handle post clicks
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('blog-read-more')) {
                e.preventDefault();
                const postCard = e.target.closest('.post-card');
                const postId = postCard.dataset.postId;
                modal.remove();
                this.openBlogPost(postId);
            }
        });
    }
    
    // Method to dynamically update existing blog cards with post IDs
    updateExistingBlogCards() {
        const blogCards = document.querySelectorAll('.blog-card');
        blogCards.forEach((card, index) => {
            if (this.posts[index]) {
                card.dataset.postId = this.posts[index].id;
            }
        });
    }
}

// Add CSS for blog functionality
const blogStyle = document.createElement('style');
blogStyle.textContent = `
    .blog-card {
        transition: all 0.5s ease;
        opacity: 0;
        transform: translateY(30px);
    }
    
    .blog-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .blog-modal {
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
    
    .blog-modal.active {
        opacity: 1;
        visibility: visible;
    }
    
    .blog-modal-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(5px);
    }
    
    .blog-modal-content {
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
        background: white;
        border-radius: 12px;
        overflow: hidden;
        transform: scale(0.9);
        transition: transform 0.3s ease;
        overflow-y: auto;
    }
    
    .blog-modal.active .blog-modal-content {
        transform: scale(1);
    }
    
    .blog-modal-header {
        position: sticky;
        top: 0;
        background: white;
        padding: 15px;
        text-align: right;
        border-bottom: 1px solid #eee;
        z-index: 10;
    }
    
    .blog-modal-close {
        width: 40px;
        height: 40px;
        background: rgba(0, 0, 0, 0.1);
        color: #666;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .blog-modal-close:hover {
        background: rgba(0, 0, 0, 0.2);
        color: #333;
    }
    
    .blog-modal-image img {
        width: 100%;
        height: 300px;
        object-fit: cover;
    }
    
    .blog-modal-body {
        padding: 30px;
    }
    
    .blog-meta {
        display: flex;
        gap: 15px;
        margin-bottom: 20px;
        font-size: 14px;
        color: #666;
        flex-wrap: wrap;
    }
    
    .blog-category {
        background: #f97316;
        color: white;
        padding: 4px 12px;
        border-radius: 20px;
        font-weight: 500;
    }
    
    .blog-title {
        font-size: 32px;
        font-weight: 700;
        margin-top: 0;
        margin-bottom: 25px;
        color: #1a1a1a;
        line-height: 1.2;
    }
    
    .blog-content {
        font-size: 16px;
        line-height: 1.8;
        color: #333;
        margin-bottom: 30px;
    }
    
    .blog-content h3 {
        font-size: 20px;
        font-weight: 600;
        margin: 25px 0 15px 0;
        color: #1a1a1a;
    }
    
    .blog-content p {
        margin-bottom: 15px;
    }
    
    .blog-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 30px;
    }
    
    .blog-tag {
        background: #f3f4f6;
        color: #374151;
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 500;
    }
    
    .blog-actions {
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
    }
    
    .all-posts-modal {
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
    
    .all-posts-modal.active {
        opacity: 1;
        visibility: visible;
    }
    
    .all-posts-modal .modal-content {
        position: relative;
        max-width: 95vw;
        max-height: 90vh;
        background: white;
        border-radius: 12px;
        overflow: hidden;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }
    
    .all-posts-modal.active .modal-content {
        transform: scale(1);
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 30px;
        border-bottom: 1px solid #eee;
    }
    
    .posts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
        padding: 30px;
        max-height: 70vh;
        overflow-y: auto;
    }
    
    .post-card {
        background: #f9fafb;
        border-radius: 8px;
        overflow: hidden;
        transition: all 0.3s ease;
    }
    
    .post-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
    
    .post-card .post-image img {
        width: 100%;
        height: 150px;
        object-fit: cover;
    }
    
    .post-card .post-content {
        padding: 20px;
    }
    
    .post-card .post-meta {
        display: flex;
        gap: 10px;
        margin-bottom: 10px;
        font-size: 12px;
        color: #666;
    }
    
    .post-card h3 {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 10px;
        color: #1a1a1a;
    }
    
    .post-card p {
        font-size: 14px;
        color: #666;
        margin-bottom: 15px;
        line-height: 1.5;
    }
    
    @media (max-width: 767px) {
        .blog-modal-content {
            margin: 10px;
            max-height: calc(100vh - 20px);
        }
        
        .blog-modal-body {
            padding: 20px;
        }
        
        .blog-title {
            font-size: 24px;
        }
        
        .posts-grid {
            grid-template-columns: 1fr;
            padding: 20px;
        }
    }
`;
document.head.appendChild(blogStyle);

// Initialize blog when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.blog = new Blog();
    
    // Update existing blog cards with post IDs
    setTimeout(() => {
        window.blog.updateExistingBlogCards();
    }, 100);
});
