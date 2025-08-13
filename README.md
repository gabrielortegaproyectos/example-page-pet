# 🐱 Pantufla - Sitio Web Profesional

Un sitio web profesional y moderno para Pantufla, modelo felina profesional disponible para comerciales y producciones en Europa.

## ✨ Características

### 🎨 Diseño y UI/UX
- **Diseño moderno y responsivo** con enfoque mobile-first
- **Interfaz elegante** siguiendo las últimas tendencias de diseño web 2025
- **Animaciones suaves** y micro-interacciones
- **Paleta de colores profesional** optimizada para la marca
- **Tipografía moderna** con Google Fonts (Inter + Playfair Display)

### 🚀 Funcionalidades
- **Hero section dinámico** con video de fondo
- **Portfolio interactivo** con filtros y lightbox
- **Blog personal** con sistema de posts
- **Formulario de contacto** con validación avanzada
- **Navegación suave** entre secciones
- **Modo oscuro** automático según preferencias del sistema
- **Soporte para PWA** (Progressive Web App)

### ♿ Accesibilidad
- **WCAG 2.1 AA compliant**
- **Navegación por teclado** completa
- **Soporte para lectores de pantalla**
- **Alto contraste** y modo de reducción de movimiento
- **Targets táctiles** de tamaño adecuado

### ⚡ Performance
- **Carga lazy** de imágenes
- **Optimización de recursos**
- **Service Worker** para cache
- **CSS y JS minificados**
- **Métricas Core Web Vitals** optimizadas

## 🛠️ Tecnologías Utilizadas

- **HTML5 semántico**
- **CSS3 moderno** (Grid, Flexbox, Custom Properties)
- **JavaScript ES6+** (Modules, Classes, Async/Await)
- **Intersection Observer API**
- **CSS Animations** y transiciones
- **Google Fonts**
- **Font Awesome Icons**

## 📁 Estructura del Proyecto

```
pagina-personal/
├── 📄 index.html              # Página principal
├── 📄 README.md               # Documentación
├── 📁 css/
│   ├── 🎨 reset.css           # Reset CSS normalizado
│   ├── 🎨 variables.css       # Variables CSS (colores, espaciado, etc.)
│   ├── 🎨 components.css      # Componentes reutilizables
│   ├── 🎨 main.css            # Estilos principales
│   └── 🎨 responsive.css      # Media queries y responsive design
├── 📁 js/
│   ├── ⚙️ utils.js            # Funciones de utilidad
│   ├── 🧭 navigation.js       # Sistema de navegación
│   ├── 🖼️ portfolio.js        # Funcionalidad del portfolio
│   ├── 📝 blog.js             # Sistema de blog
│   ├── 📧 contact.js          # Formulario de contacto
│   ├── ✨ animations.js       # Controlador de animaciones
│   └── 🚀 main.js             # Aplicación principal
├── 📁 images/                 # Imágenes del sitio
├── 📁 assets/                 # Recursos adicionales
├── 📁 .github/
│   └── 📄 copilot-instructions.md  # Instrucciones para Copilot
└── 📁 .vscode/
    └── ⚙️ tasks.json          # Tareas de VS Code
```

## 🚀 Instalación y Uso

### Requisitos
- Navegador web moderno
- Servidor web local (opcional para desarrollo)

### Instalación
1. **Clona o descarga** el repositorio
2. **Abre** `index.html` en tu navegador
3. **¡Listo!** El sitio está funcionando

### Para Desarrollo
```bash
# Usando Python (si tienes Python instalado)
python -m http.server 8000

# Usando Node.js (si tienes Node.js instalado)
npx serve .

# Usando PHP (si tienes PHP instalado)
php -S localhost:8000
```

Luego abre `http://localhost:8000` en tu navegador.

## 📱 Secciones del Sitio

### 🏠 Inicio (Hero)
- Introducción profesional de Pantufla
- Video de fondo con overlay elegante
- Botones de acción principales
- Indicador de scroll animado

### 👤 Sobre Mí
- Historia y experiencia profesional
- Estadísticas de carrera
- Habilidades y especialidades
- Certificaciones y credenciales

### 🎯 Portfolio
- Galería filtrable de trabajos
- Categorías: Comerciales, Moda, Lifestyle, Retratos
- Lightbox con detalles de proyectos
- Sistema de carga por páginas

### 📖 Blog Personal
- Posts sobre experiencias y consejos
- Sistema de categorías y tags
- Modal con contenido completo
- Tiempo de lectura estimado

### 📞 Contacto
- Formulario profesional con validación
- Información de contacto completa
- Enlaces a redes sociales
- Mapa de disponibilidad geográfica

## 🎨 Personalización

### Colores
Modifica las variables en `css/variables.css`:
```css
:root {
    --primary-500: #f97316;    /* Color principal */
    --accent-primary: #f97316; /* Color de acento */
    --text-primary: #111827;   /* Color de texto */
    /* ... más variables */
}
```

### Contenido
- **Imágenes**: Reemplaza las imágenes en la carpeta `images/`
- **Textos**: Modifica el contenido en `index.html`
- **Portfolio**: Actualiza los datos en `js/portfolio.js`
- **Blog**: Modifica los posts en `js/blog.js`

### Fuentes
Cambia las fuentes en `css/variables.css`:
```css
:root {
    --font-primary: 'Inter', system-ui, sans-serif;
    --font-display: 'Playfair Display', Georgia, serif;
}
```

## 📊 Analytics y Seguimiento

El sitio incluye soporte para Google Analytics 4:
1. Reemplaza `GA_MEASUREMENT_ID` en `js/main.js`
2. Incluye el script de Google Analytics en `index.html`

Eventos trackeados:
- ⏱️ Tiempo en página
- 📊 Profundidad de scroll
- 🎯 Interacciones con portfolio
- 📝 Lecturas de blog
- 📧 Envíos de formulario

## ♿ Características de Accesibilidad

- **Navegación por teclado** completa
- **Lectores de pantalla** compatibles
- **Alto contraste** disponible
- **Reducción de movimiento** respetada
- **Focus management** en modales
- **ARIA labels** apropiados
- **Textos alternativos** en imágenes

## 📱 Responsive Design

Breakpoints optimizados:
- 📱 **Mobile**: < 640px
- 📱 **Mobile L**: 640px - 768px
- 📟 **Tablet**: 768px - 1024px
- 💻 **Desktop**: 1024px - 1280px
- 🖥️ **Large**: 1280px - 1536px
- 🖥️ **XL**: > 1536px

## 🔧 Configuración Avanzada

### Service Worker
Para habilitar funcionalidades PWA, configura `sw.js`:
```javascript
// Cache recursos importantes
const CACHE_NAME = 'pantufla-v1';
const urlsToCache = [
    '/',
    '/css/main.css',
    '/js/main.js',
    '/images/Img_2.jpeg'
];
```

### Optimización de Imágenes
- Usa **WebP** para mejor compresión
- Implementa **responsive images** con `srcset`
- **Lazy loading** automático implementado

## 🤝 Contribución

Para contribuir al proyecto:
1. Fork el repositorio
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📞 Soporte

Para consultas sobre el código o implementación:
- 📧 Email: developer@pantufla-model.com
- 🐛 Issues: Abre un issue en GitHub

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🙏 Créditos

- **Diseño**: Inspirado en las mejores prácticas de diseño web 2025
- **Iconos**: Font Awesome
- **Fuentes**: Google Fonts (Inter, Playfair Display)
- **Imágenes**: Placeholders generados dinámicamente

---

### 🎯 Próximas Funcionalidades

- [ ] 🛒 Tienda online de merchandise
- [ ] 📅 Sistema de reservas de sesiones
- [ ] 🎥 Galería de videos
- [ ] 🌐 Multiidioma (ES/EN/FR)
- [ ] 📱 App móvil nativa
- [ ] 🤖 Chatbot integrado
- [ ] 📈 Dashboard de administración

---

**Desarrollado con ❤️ para Pantufla, la modelo felina más profesional de Europa**
