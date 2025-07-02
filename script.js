// ================================
// MOBILE MENU TOGGLE
// ================================
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (burger) {
        burger.addEventListener('click', function() {
            burger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (burger && navMenu) {
                burger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (burger && navMenu && !burger.contains(e.target) && !navMenu.contains(e.target)) {
            burger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// ================================
// SMOOTH SCROLLING FOR NAVIGATION
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================================
// NAVBAR BACKGROUND ON SCROLL
// ================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(250, 246, 241, 0.98)';
            navbar.style.boxShadow = '0 4px 30px rgba(94, 75, 139, 0.15)';
        } else {
            navbar.style.backgroundColor = 'rgba(250, 246, 241, 0.95)';
            navbar.style.boxShadow = '0 2px 25px rgba(94, 75, 139, 0.1)';
        }
    }
});

// ================================
// CONTACT FORM HANDLING
// ================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        // Simple validation
        if (!data.name || !data.email || !data.message) {
            showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Veuillez entrer une adresse email valide.', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = this.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        // Simulate network delay
        setTimeout(() => {
            showNotification('Merci pour votre message ! Je vous répondrai dans les plus brefs délais pour organiser notre première séance de yoga Hatha.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }, 2000);
    });
}

// ================================
// NOTIFICATION SYSTEM
// ================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        max-width: 400px;
        padding: 20px;
        background: ${type === 'success' ? '#6ACFC7' : type === 'error' ? '#ff6b6b' : '#5E4B8B'};
        color: white;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(450px);
        transition: transform 0.3s ease;
        font-family: 'Raleway', sans-serif;
    `;

    // Add to DOM
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(450px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// ================================
// FADE IN ANIMATION ON SCROLL
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe sections for fade-in animation
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Observe service cards for staggered animation
document.querySelectorAll('.service-card').forEach((card, index) => {
    setTimeout(() => {
        observer.observe(card);
    }, index * 100);
});

// Observe testimonial cards
document.querySelectorAll('.testimonial-card').forEach((card, index) => {
    setTimeout(() => {
        observer.observe(card);
    }, index * 150);
});

// Observe gallery items
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    setTimeout(() => {
        observer.observe(item);
    }, index * 50);
});

// ================================
// ACTIVE NAVIGATION LINK
// ================================
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ================================
// HERO IMAGE INTERACTION
// ================================
const heroImage = document.querySelector('.hero-image-placeholder');
if (heroImage) {
    heroImage.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'transform 0.3s ease';
    });

    heroImage.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });

    heroImage.addEventListener('click', function() {
        // Scroll to about section
        document.querySelector('#about').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// ================================
// SERVICE CARDS ENHANCED INTERACTION
// ================================
document.querySelectorAll('.service-card').forEach(card => {
    const icon = card.querySelector('.service-icon');
    
    card.addEventListener('mouseenter', function() {
        if (icon) {
            icon.style.transform = 'rotate(10deg) scale(1.1)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });

    card.addEventListener('mouseleave', function() {
        if (icon) {
            icon.style.transform = 'rotate(0deg) scale(1)';
        }
    });

    // Add accessibility
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `En savoir plus sur ${card.querySelector('h3').textContent}`);
});

// ================================
// TESTIMONIAL CARDS ENHANCED INTERACTION
// ================================
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderLeft = '4px solid #5E4B8B';
        this.style.transition = 'all 0.3s ease';
    });

    card.addEventListener('mouseleave', function() {
        this.style.borderLeft = '4px solid #6ACFC7';
    });

    // Add accessibility
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', 'Témoignage client');
});

// ================================
// GALLERY INTERACTION
// ================================
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
        this.style.transition = 'transform 0.3s ease';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });

    item.addEventListener('click', function() {
        // Add click effect
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        showNotification(`Image ${index + 1} - Emplacement pour vos photos de yoga Hatha`, 'info');
    });

    // Add accessibility
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `Image ${index + 1} de la galerie`);
});

// ================================
// PLANNING TABLE INTERACTION
// ================================
document.querySelectorAll('.planning-table tbody tr').forEach(row => {
    row.addEventListener('click', function() {
        // Remove active class from all rows
        document.querySelectorAll('.planning-table tbody tr').forEach(r => {
            r.classList.remove('active-row');
            r.style.backgroundColor = '';
        });
        
        // Add active class to clicked row
        this.classList.add('active-row');
        this.style.backgroundColor = 'rgba(106, 207, 199, 0.1)';
        this.style.transition = 'background-color 0.3s ease';
        
        // Show course info
        const courseType = this.cells[2].textContent;
        const time = this.cells[1].textContent;
        const day = this.cells[0].textContent;
        showNotification(`${courseType} - ${day} ${time}. Contactez-moi pour réserver votre place !`, 'info');
    });

    // Add hover effect
    row.addEventListener('mouseenter', function() {
        if (!this.classList.contains('active-row')) {
            this.style.backgroundColor = 'rgba(106, 207, 199, 0.03)';
        }
    });

    row.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active-row')) {
            this.style.backgroundColor = '';
        }
    });

    // Add accessibility
    row.setAttribute('tabindex', '0');
    row.setAttribute('role', 'button');
    row.setAttribute('aria-label', `Séance de ${row.cells[2].textContent} le ${row.cells[0].textContent} à ${row.cells[1].textContent}`);
});

// ================================
// FORM FIELD ENHANCEMENTS
// ================================
document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(field => {
    field.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
        this.parentElement.style.transition = 'transform 0.2s ease';
        
        // Add focused class for styling
        this.parentElement.classList.add('focused');
    });

    field.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
        this.parentElement.classList.remove('focused');
    });

    // Real-time validation feedback
    field.addEventListener('input', function() {
        if (this.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.style.borderColor = '#ff6b6b';
            } else {
                this.style.borderColor = '#6ACFC7';
            }
        }
    });
});

// ================================
// KEYBOARD NAVIGATION ENHANCEMENT
// ================================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const focused = document.activeElement;
        
        if (focused.classList.contains('service-card') || 
            focused.classList.contains('testimonial-card') ||
            focused.classList.contains('gallery-item') ||
            focused.tagName === 'TR') {
            e.preventDefault();
            focused.click();
        }
    }
});

// ================================
// LANGUAGE BADGE INTERACTION
// ================================
const languageBadge = document.querySelector('.language-badge');
if (languageBadge) {
    languageBadge.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });

    languageBadge.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// ================================
// LOADING PERFORMANCE OPTIMIZATION
// ================================
// Lazy load placeholder images when they become real images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    // Observe future images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ================================
// SMOOTH PAGE LOAD ANIMATION
// ================================
window.addEventListener('load', function() {
    // Add loaded class to body for any CSS animations
    document.body.classList.add('loaded');
    
    // Animate hero section on load
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 0.8s ease-out';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 200);
    }
});

// ================================
// SCROLL TO TOP FUNCTIONALITY
// ================================
function createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #5E4B8B, #6ACFC7);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 20px;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(94, 75, 139, 0.3);
    `;

    document.body.appendChild(scrollBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.transform = 'translateY(0)';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.transform = 'translateY(100px)';
        }
    });

    // Scroll to top functionality
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) translateY(0)';
    });

    scrollBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
}

// Initialize scroll to top button
createScrollToTop();

// ================================
// CONSOLE WELCOME MESSAGE
// ================================
console.log(`
🧘‍♀️ Yoga Hatha Traditionnel - Site web initialisé avec succès !

✨ Fonctionnalités actives :
- Navigation responsive avec menu burger
- Animations au scroll
- Formulaire de contact interactif
- Galerie interactive
- Planning cliquable
- Design zen et épuré

🎨 Charte graphique respectée :
- Violet: #5E4B8B
- Blanc cassé: #FAF6F1  
- Vert d'eau: #6ACFC7
- Accent doux: #A0D5D1

📱 Responsive design optimisé pour tous les appareils.
`);

// ================================
// ERROR HANDLING
// ================================
window.addEventListener('error', function(e) {
    console.warn('Erreur détectée:', e.message);
    // Ne pas afficher d'erreurs à l'utilisateur pour maintenir l'expérience zen
});

// Prevent default drag behavior on placeholder images
document.querySelectorAll('.image-placeholder, .hero-image-placeholder, .about-image').forEach(placeholder => {
    placeholder.addEventListener('dragstart', function(e) {
        e.preventDefault();
    });
});