// ===== VARIABLES GLOBALES =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// ===== NAVEGACIÓN MÓVIL =====
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Prevenir scroll del body cuando el menú está abierto
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Event listener para el botón de menú móvil
if (navToggle) {
    navToggle.addEventListener('click', toggleMobileMenu);
}

// Cerrar menú móvil al hacer click en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Cerrar menú móvil al hacer click fuera de él
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== NAVBAR SCROLL EFFECT =====
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 4px 24px rgba(33, 50, 52, 0.12)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 2px 20px rgba(33, 50, 52, 0.08)';
    }
}

// ===== NAVEGACIÓN SUAVE =====
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Compensar altura del navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Event listeners para navegación suave
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        if (target.startsWith('#')) {
            smoothScroll(target);
        }
    });
});

// ===== ACTIVE LINK HIGHLIGHTING =====
function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            // Remover clase active de todos los enlaces
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            // Agregar clase active al enlace correspondiente
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// ===== ANIMACIONES ON SCROLL =====
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .tech-feature, .value-item, .municipality-card, .contact-item, .stat-card');
    
    elements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < window.innerHeight - elementVisible) {
            setTimeout(() => {
                element.style.animation = `fadeInUp 0.6s ease-out forwards`;
                element.style.opacity = '1';
            }, index * 100); // Stagger animation
        }
    });
}

// ===== CONTADOR ANIMADO PARA ESTADÍSTICAS =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .stat-value');
    
    counters.forEach(counter => {
        const text = counter.textContent;
        const hasNumber = /\d/.test(text);
        
        if (hasNumber) {
            const finalText = text;
            const numbers = text.match(/\d+/g);
            
            if (numbers && numbers.length > 0) {
                const targetNumber = parseInt(numbers[0]);
                const increment = Math.ceil(targetNumber / 50);
                let current = 0;
                
                const updateCounter = () => {
                    if (current < targetNumber) {
                        current += increment;
                        if (current > targetNumber) current = targetNumber;
                        counter.textContent = finalText.replace(/\d+/, current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = finalText;
                    }
                };
                
                // Iniciar animación cuando el elemento sea visible
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            updateCounter();
                            observer.unobserve(entry.target);
                        }
                    });
                });
                
                observer.observe(counter);
            }
        }
    });
}

// ===== LAZY LOADING DE IMÁGENES =====
function lazyLoadImages() {
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
        // Fallback para navegadores sin soporte
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// ===== EFECTOS DE HOVER MEJORADOS =====
function addEnhancedHoverEffects() {
    const cards = document.querySelectorAll('.service-card, .municipality-card, .contact-item, .value-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
            card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Efectos especiales para tech features
    const techFeatures = document.querySelectorAll('.tech-feature');
    techFeatures.forEach(feature => {
        feature.addEventListener('mouseenter', () => {
            feature.style.transform = 'translateX(12px)';
        });
        
        feature.addEventListener('mouseleave', () => {
            feature.style.transform = 'translateX(0)';
        });
    });
}

// ===== BOTÓN SCROLL TO TOP =====
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Volver arriba');
    
    document.body.appendChild(scrollBtn);
    
    // Mostrar/ocultar botón según scroll
    function toggleScrollButton() {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    }
    
    // Scroll to top al hacer click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', toggleScrollButton);
    return scrollBtn;
}

// ===== PARALLAX SUAVE PARA HERO =====
function parallaxEffect() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${rate}px)`;
    }
}

// ===== PRELOADER MEJORADO =====
function showPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <img src="assets/images/logo-oficial.png" alt="BARU COURIER" class="preloader-logo">
            <div class="preloader-spinner"></div>
            <p class="preloader-text">Cargando...</p>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #213234 0%, #2a4144 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        .preloader-content {
            text-align: center;
            color: white;
        }
        .preloader-logo {
            width: 120px;
            height: auto;
            margin-bottom: 30px;
            animation: pulse 2s infinite;
        }
        .preloader-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(255, 255, 255, 0.1);
            border-top: 4px solid #f15f04;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        .preloader-text {
            font-family: 'Inter', sans-serif;
            font-size: 1.1rem;
            font-weight: 500;
            color: #dceaeb;
            margin: 0;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.05); }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(preloader);
    
    // Ocultar preloader cuando la página esté cargada
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.remove();
                }
                if (style.parentNode) {
                    style.remove();
                }
            }, 500);
        }, 1200);
    });
}

// ===== ANALYTICS Y TRACKING =====
function trackUserInteraction(action, element, details = '') {
    // Aquí se puede integrar Google Analytics, Facebook Pixel, etc.
    console.log(`📊 User interaction: ${action} on ${element}`, details);
    
    // Ejemplo de integración con Google Analytics (gtag)
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: 'engagement',
            event_label: element,
            value: details
        });
    }
}

// Event listeners para tracking
document.addEventListener('click', (e) => {
    if (e.target.matches('.hero-btn, .contact-btn')) {
        trackUserInteraction('click', 'CTA button', e.target.textContent.trim());
    }
    if (e.target.matches('.nav-link')) {
        trackUserInteraction('click', 'navigation link', e.target.textContent.trim());
    }
    if (e.target.closest('.service-card')) {
        const serviceTitle = e.target.closest('.service-card').querySelector('.service-title')?.textContent;
        trackUserInteraction('click', 'service card', serviceTitle);
    }
});

// ===== OPTIMIZACIÓN DE PERFORMANCE =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== DETECCIÓN DE DISPOSITIVO =====
function detectDevice() {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    const isDesktop = window.innerWidth > 1024;
    
    document.body.classList.toggle('is-mobile', isMobile);
    document.body.classList.toggle('is-tablet', isTablet);
    document.body.classList.toggle('is-desktop', isDesktop);
    
    return { isMobile, isTablet, isDesktop };
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar preloader
    showPreloader();
    
    // Detectar dispositivo
    detectDevice();
    
    // Inicializar funciones
    addEnhancedHoverEffects();
    createScrollToTopButton();
    lazyLoadImages();
    animateCounters();
    
    // Agregar estilos CSS adicionales para animaciones
    const additionalStyles = document.createElement('style');
    additionalStyles.textContent = `
        .nav-link.active {
            color: var(--accent-orange);
        }
        .nav-link.active::after {
            width: 100%;
        }
        .lazy {
            opacity: 0;
            transition: opacity 0.3s;
        }
        .service-card,
        .tech-feature,
        .value-item,
        .municipality-card,
        .contact-item {
            opacity: 0;
            transform: translateY(20px);
        }
        .is-mobile .hero-stats {
            flex-direction: column;
            gap: 1rem;
        }
        .is-mobile .stat-item {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
        }
        @media (prefers-reduced-motion: reduce) {
            .scroll-to-top,
            .service-card,
            .tech-feature,
            .value-item {
                transition: none !important;
                animation: none !important;
            }
        }
    `;
    document.head.appendChild(additionalStyles);
    
    // Inicializar elementos visibles
    setTimeout(() => {
        animateOnScroll();
    }, 100);
});

// Event listeners optimizados
window.addEventListener('scroll', throttle(() => {
    handleNavbarScroll();
    updateActiveLink();
    animateOnScroll();
}, 16)); // ~60fps

window.addEventListener('scroll', debounce(() => {
    if (window.innerWidth > 768) {
        parallaxEffect();
    }
}, 10));

// Manejar resize de ventana
window.addEventListener('resize', debounce(() => {
    detectDevice();
    
    // Cerrar menú móvil si se redimensiona a desktop
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
}, 250));

// ===== ACCESIBILIDAD MEJORADA =====
// Navegación por teclado
document.addEventListener('keydown', (e) => {
    // Escape para cerrar menú móvil
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Enter o Space para activar botones
    if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.matches('.hero-btn, .contact-btn, .scroll-to-top')) {
            e.preventDefault();
            e.target.click();
        }
    }
    
    // Navegación con Tab
    if (e.key === 'Tab') {
        // Agregar clase para mostrar focus outline
        document.body.classList.add('keyboard-navigation');
    }
});

// Remover clase de navegación por teclado al usar mouse
document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Focus trap para menú móvil
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Aplicar focus trap al menú móvil
if (navMenu) {
    trapFocus(navMenu);
}

// ===== UTILIDADES GLOBALES =====
// Función para obtener parámetros de URL
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

// Función para detectar si el usuario prefiere modo oscuro
function prefersDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Función para detectar si el usuario prefiere movimiento reducido
function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ===== MANEJO DE ERRORES =====
window.addEventListener('error', (e) => {
    console.error('Error en la página:', e.error);
    trackUserInteraction('error', 'javascript_error', e.error.message);
});

// ===== EXPORTAR FUNCIONES PARA USO GLOBAL =====
window.BaruCourierApp = {
    smoothScroll,
    toggleMobileMenu,
    trackUserInteraction,
    detectDevice,
    prefersDarkMode,
    prefersReducedMotion,
    getURLParameter
};

// ===== MENSAJE DE CARGA EXITOSA =====
console.log('🚚 BARU COURIER website loaded successfully!');
console.log('📱 Responsive design active');
console.log('🎨 Professional theme applied');
console.log('⚡ Performance optimized');

// Tracking de carga de página
trackUserInteraction('page_load', 'website', window.location.pathname);

