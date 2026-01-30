// ===== DOM Elements =====
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const contactForm = document.getElementById('contactForm');
const demoModal = document.getElementById('demoModal');
const closeModalBtn = document.getElementById('closeModal');
const demoLinks = document.querySelectorAll('.demo-link');

// Portfolio elements
const scrollLeftBtn = document.querySelector('.scroll-left');
const scrollRightBtn = document.querySelector('.scroll-right');
const scrollerTrack = document.querySelector('.scroller-track');
const viewMoreBtn = document.getElementById('viewMoreBtn');
const portfolioModal = document.getElementById('portfolioModal');
const closePortfolioBtn = document.getElementById('closePortfolio');

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

// ===== Portfolio Scroller Functionality =====
let scrollPosition = 0;
let currentSlide = 1;
let totalSlides = 6;
let isLooping = true;

function initScroller() {
    const scrollerContainer = document.querySelector('.latest-work-scroller');
    const leftBtn = document.querySelector('.scroll-left');
    const rightBtn = document.querySelector('.scroll-right');
    const track = document.querySelector('.scroller-track');
    const currentSlideEl = document.getElementById('currentSlide');
    const totalSlidesEl = document.getElementById('totalSlides');
    
    if (!scrollerContainer || !leftBtn || !rightBtn || !track) {
        console.log('Scroller elements not found');
        return;
    }
    
    // Set total slides
    const cards = track.querySelectorAll('.work-card');
    totalSlides = cards.length;
    if (totalSlidesEl) totalSlidesEl.textContent = totalSlides;
    
    // Center content initially to avoid blank space
    const container = scrollerContainer.querySelector('.scroller-container');
    if (container && track) {
        const containerWidth = container.offsetWidth;
        const trackWidth = track.scrollWidth;
        if (trackWidth < containerWidth) {
            scrollPosition = (containerWidth - trackWidth) / 2;
            track.style.transform = `translateX(-${scrollPosition}px)`;
        }
    }
    
    console.log('Scroller initialized with', totalSlides, 'slides');
    
    function updateCounter() {
        const cardWidth = cards[0].offsetWidth;
        const gap = 25;
        const scrollAmount = cardWidth + gap;
        
        // Calculate which slide is currently in view (center)
        const centeredSlide = Math.round(scrollPosition / scrollAmount) + 1;
        
        // Handle looping
        if (centeredSlide > totalSlides) {
            currentSlide = 1;
        } else if (centeredSlide < 1) {
            currentSlide = totalSlides;
        } else {
            currentSlide = centeredSlide;
        }
        
        if (currentSlideEl) {
            currentSlideEl.textContent = currentSlide;
        }
    }
    
    leftBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const container = scrollerContainer.querySelector('.scroller-container');
        const card = track.querySelector('.work-card');
        if (!card) return;
        
        const cardWidth = card.offsetWidth;
        const gap = 25;
        const scrollAmount = cardWidth + gap;
        
        // Calculate actual max scroll - track width minus container width
        const containerWidth = container.offsetWidth;
        const actualMaxScroll = Math.max(0, track.scrollWidth - containerWidth);
        
        scrollPosition = scrollPosition - scrollAmount;
        
        // Loop back to end if at start
        if (scrollPosition < 0 && isLooping) {
            scrollPosition = actualMaxScroll;
        } else if (scrollPosition < 0) {
            scrollPosition = 0;
        }
        
        track.style.transform = `translateX(-${scrollPosition}px)`;
        updateCounter();
        console.log('Scroll left:', scrollPosition);
    });

    rightBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const container = scrollerContainer.querySelector('.scroller-container');
        const card = track.querySelector('.work-card');
        if (!card) return;
        
        const cardWidth = card.offsetWidth;
        const gap = 25;
        const scrollAmount = cardWidth + gap;
        
        // Calculate how many cards are visible
        const containerWidth = container.offsetWidth;
        const visibleCards = Math.max(1, Math.floor(containerWidth / scrollAmount));
        
        // Calculate actual max scroll - ensure last card is fully visible
        // Max scroll should position the last card at the right edge of the visible area
        const actualMaxScroll = (totalSlides - visibleCards) * scrollAmount;
        
        console.log('Container width:', containerWidth, 'Visible cards:', visibleCards, 'Max scroll:', actualMaxScroll);
        
        scrollPosition = scrollPosition + scrollAmount;
        
        // Loop to start ONLY if past end (not at end)
        if (scrollPosition > actualMaxScroll && isLooping) {
            scrollPosition = 0;
        } else if (scrollPosition > actualMaxScroll) {
            scrollPosition = actualMaxScroll;
        }
        
        track.style.transform = `translateX(-${scrollPosition}px)`;
        updateCounter();
        console.log('Scroll right:', scrollPosition, 'maxScroll:', actualMaxScroll, 'visibleCards:', visibleCards);
    });
}

// Initialize scroller after DOM is loaded
document.addEventListener('DOMContentLoaded', initScroller);

// ===== Portfolio Modal Functionality =====
function showPortfolioModal() {
    if (portfolioModal) {
        portfolioModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function hidePortfolioModal() {
    if (portfolioModal) {
        portfolioModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// View More button
if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', showPortfolioModal);
}

// Close portfolio modal
if (closePortfolioBtn) {
    closePortfolioBtn.addEventListener('click', hidePortfolioModal);
}

// Close modal when clicking outside
if (portfolioModal) {
    portfolioModal.addEventListener('click', (e) => {
        if (e.target === portfolioModal) {
            hidePortfolioModal();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && portfolioModal && portfolioModal.classList.contains('active')) {
        hidePortfolioModal();
    }
});

// Work card click to open modal
const workCards = document.querySelectorAll('.work-card');
workCards.forEach(card => {
    card.addEventListener('click', showPortfolioModal);
});

// ===== Preloader (Optional Enhancement) =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
