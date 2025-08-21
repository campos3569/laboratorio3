function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const toggle = document.querySelector('.mobile-menu-toggle');
   
    mobileMenu.classList.toggle('active');
    toggle.classList.toggle('active');
}


function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const toggle = document.querySelector('.mobile-menu-toggle');
   
    mobileMenu.classList.remove('active');
    toggle.classList.remove('active');
}


document.addEventListener('click', function(event) {
    const navbar = document.querySelector('.navbar');
    const mobileMenu = document.getElementById('mobileMenu');
   
    if (!navbar.contains(event.target) && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});


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


let ticking = false;


window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const navbar = document.querySelector('.navbar');
           
            if (hero && window.innerWidth > 768) {
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
           
            if (scrolled > 100) {
                navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            } else {
                navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            }
           
            ticking = false;
        });
        ticking = true;
    }
});


const isMobile = window.innerWidth <= 768;


if (!isMobile) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);


document.querySelectorAll('.car-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});


function handleSubmit(event) {
    event.preventDefault();
   
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
   
    alert(`¡Gracias ${data.nombre}! Hemos recibido tu consulta sobre el ${data.modelo}. Nos pondremos en contacto contigo pronto.`);
   
    event.target.reset();
}


if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}


const criticalImages = [];
if (criticalImages.length > 0) {
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}


if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
   
    lazyImages.forEach(img => imageObserver.observe(img));
}