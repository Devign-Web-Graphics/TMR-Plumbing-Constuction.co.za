// ===== DOM Elements =====
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const contactForm = document.getElementById('contactForm');
const demoModal = document.getElementById('demoModal');
const closeModalBtn = document.getElementById('closeModal');
const demoLinks = document.querySelectorAll('.demo-link');

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile Navigation Toggle =====
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===== Smooth Scroll for Navigation Links =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Scroll Animations =====
const animateElements = document.querySelectorAll('.animate-fade-up, .animate-fade-left, .animate-fade-right');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const delay = element.dataset.delay || 0;
            
            setTimeout(() => {
                element.classList.add('animated');
            }, delay);
            
            animationObserver.unobserve(element);
        }
    });
}, observerOptions);

animateElements.forEach(element => {
    animationObserver.observe(element);
});

// ===== Contact Form Handling (Demo Only) =====
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show demo modal instead of submitting
    showDemoModal();
    
    // Reset form
    contactForm.reset();
});

// ===== Demo Modal Functionality =====
function showDemoModal() {
    demoModal.classList.add('active');
}

function hideDemoModal() {
    demoModal.classList.remove('active');
}

// Demo links click handler
demoLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        showDemoModal();
    });
});

// Close modal button
closeModalBtn.addEventListener('click', hideDemoModal);

// Close modal when clicking outside
demoModal.addEventListener('click', (e) => {
    if (e.target === demoModal) {
        hideDemoModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && demoModal.classList.contains('active')) {
        hideDemoModal();
    }
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
});

// ===== Parallax Effect for Hero =====
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// ===== Counter Animation for Stats =====
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 30);
};

// ===== Initialize Animations on Page Load =====
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial animations for hero section
    const heroElements = document.querySelectorAll('.hero .animate-fade-up, .hero .animate-fade-left');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animated');
        }, index * 200);
    });
});

// ===== Preloader (Optional Enhancement) =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
