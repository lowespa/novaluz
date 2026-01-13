// Nova Luz - Script principal
document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuIcon = mobileMenuBtn.querySelector('i');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        if (mobileMenu.classList.contains('active')) {
            mobileMenuIcon.classList.remove('fa-bars');
            mobileMenuIcon.classList.add('fa-times');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenuIcon.classList.remove('fa-times');
            mobileMenuIcon.classList.add('fa-bars');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Cerrar menú al hacer clic en un enlace
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuIcon.classList.remove('fa-times');
            mobileMenuIcon.classList.add('fa-bars');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Carrusel de testimonios
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(n) {
        // Ocultar todas las diapositivas
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remover activo de todos los puntos
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Mostrar la diapositiva actual
        slides[n].classList.add('active');
        dots[n].classList.add('active');
        currentSlide = n;
    }
    
    // Event listeners para los puntos
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            startSlideInterval();
        });
    });
    
    // Cambio automático de diapositivas
    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= slides.length) {
            next = 0;
        }
        showSlide(next);
    }
    
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Iniciar el carrusel
    startSlideInterval();
    
    // Pausar el carrusel al pasar el mouse
    const testimonialSlider = document.querySelector('.testimonial-slider');
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
        startSlideInterval();
    });
    
    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validación básica
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            alert('Por favor, completa todos los campos requeridos.');
            return;
        }
        
        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, introduce un correo electrónico válido.');
            return;
        }
        
        // Simulación de envío
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Simular tiempo de envío
        setTimeout(() => {
            alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo en un plazo de 24-48 horas.');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Aquí normalmente se enviaría el formulario a un servidor
            // Ejemplo con Fetch API:
            /*
            const formData = new FormData(contactForm);
            
            fetch('tu-servidor-de-backend', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                alert('¡Mensaje enviado con éxito!');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            })
            .catch(error => {
                alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
            */
        }, 1500);
    });
    
    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Cambiar clase activa en navegación al desplazarse
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-menu a');
        
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Llamar al cargar la página
    
    // Efecto de aparición al hacer scroll
    function checkScroll() {
        const elements = document.querySelectorAll('.service-card, .modality-card, .about-content, .contact-form, .contact-info');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.85) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializar estilos para animación
    document.querySelectorAll('.service-card, .modality-card, .about-content, .contact-form, .contact-info').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Verificar al cargar la página
    
    // Botones flotantes - tracking de eventos
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            const platform = this.classList.contains('whatsapp-float') ? 'WhatsApp' : 
                           this.classList.contains('instagram-float') ? 'Instagram' : 'Email';
            
            console.log(`${platform} button clicked`);
            // Ejemplo para Google Analytics:
            // gtag('event', 'click', {
            //     'event_category': 'Contacto',
            //     'event_label': platform,
            //     'value': 1
            // });
        });
    });
    
    // Actualizar año en el copyright automáticamente
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
    
    // Ocultar iconos flotantes al hacer scroll hacia abajo, mostrar al subir
    let lastScrollTop = 0;
    const floatingIconsContainer = document.querySelector('.floating-icons');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 300) {
            // Scroll hacia abajo
            floatingIconsContainer.style.opacity = '0.7';
            floatingIconsContainer.style.transform = 'translateY(20px)';
        } else {
            // Scroll hacia arriba
            floatingIconsContainer.style.opacity = '1';
            floatingIconsContainer.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Mostrar/ocultar iconos flotantes en función del tamaño de pantalla
    function handleFloatingIconsVisibility() {
        if (window.innerWidth < 768) {
            // En móviles, reducir tamaño y espaciado
            floatingIconsContainer.style.gap = '10px';
            document.querySelectorAll('.floating-icon').forEach(icon => {
                icon.style.width = '45px';
                icon.style.height = '45px';
                icon.style.fontSize = '1.2rem';
            });
        } else {
            // En desktop, tamaño normal
            floatingIconsContainer.style.gap = '15px';
            document.querySelectorAll('.floating-icon').forEach(icon => {
                icon.style.width = '60px';
                icon.style.height = '60px';
                icon.style.fontSize = '1.5rem';
            });
        }
    }
    
    // Ejecutar al cargar y al redimensionar
    window.addEventListener('load', handleFloatingIconsVisibility);
    window.addEventListener('resize', handleFloatingIconsVisibility);
});