
// Design Showcase Variables
let currentSlide = 0;
const totalSlides = 13;
let isTransitioning = false;

// Design Showcase Functions
function updateDesignCounter() {
    document.getElementById('currentDesign').textContent = currentSlide + 1;
    document.getElementById('totalDesigns').textContent = totalSlides;
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function showDesign(slideIndex) {
    if (isTransitioning) return;
    isTransitioning = true;

    const slides = document.querySelectorAll('.design-slide');

    // Remove all active classes
    slides.forEach(slide => {
        slide.classList.remove('active', 'prev', 'next');
    });

    // Set the active slide
    slides[slideIndex].classList.add('active');

    // Update counter and indicators
    updateDesignCounter();
    updateIndicators();

    setTimeout(() => {
        isTransitioning = false;
    }, 400);
}

function nextDesign() {
    if (isTransitioning) return;
    currentSlide = (currentSlide + 1) % totalSlides;
    showDesign(currentSlide);
}

function previousDesign() {
    if (isTransitioning) return;
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showDesign(currentSlide);
}

function goToDesign(slideIndex) {
    if (isTransitioning || slideIndex === currentSlide) return;
    currentSlide = slideIndex;
    showDesign(currentSlide);
}

// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) navLinks.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Sending...';
        btn.disabled = true;

        const formData = new FormData(contactForm);

        fetch(contactForm.action, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert('Something went wrong. Please try again later.');
            })
            .finally(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            });
    });
}

// Enhanced scroll reveal animation with staggered effect
window.addEventListener('scroll', revealOnScroll);

function revealOnScroll() {
    const skillCards = document.querySelectorAll('.skill-card');
    const projectCards = document.querySelectorAll('.project-card');
    const certificateCards = document.querySelectorAll('.certificate-card');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const aboutContent = document.querySelector('.about-content');
    const contactElements = document.querySelectorAll('.contact-info, .contact-form');
    const windowHeight = window.innerHeight;

    // Function to handle reveal with delay
    const revealWithDelay = (elements, baseDelay = 0) => {
        elements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                setTimeout(() => {
                    element.classList.add('revealed');
                }, baseDelay + (index * 100));
            }
        });
    };

    // Reveal different sections with appropriate delays
    if (aboutContent && aboutContent.getBoundingClientRect().top < windowHeight - 100) {
        aboutContent.classList.add('revealed');
    }

    revealWithDelay(timelineItems);
    revealWithDelay(skillCards, 100);
    revealWithDelay(certificateCards, 150);
    revealWithDelay(projectCards, 200);
    revealWithDelay(contactElements, 250);
}

// Keyboard navigation for design showcase
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        previousDesign();
    } else if (e.key === 'ArrowRight') {
        nextDesign();
    }
});

// Touch/swipe support for design showcase
let startX = 0;
let endX = 0;
const designViewport = document.getElementById('designViewport');

if (designViewport) {
    designViewport.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    designViewport.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = startX - endX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            nextDesign(); // Swipe left - next design
        } else {
            previousDesign(); // Swipe right - previous design
        }
    }
}

// Pause auto-play on hover
const designViewer = document.querySelector('.design-viewer');
let autoPlayInterval;
const autoPlayDelay = 5000;

function startAutoPlay() {
    autoPlayInterval = setInterval(nextDesign, autoPlayDelay);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

if (designViewer) {
    designViewer.addEventListener('mouseenter', stopAutoPlay);
    designViewer.addEventListener('mouseleave', startAutoPlay);
}

// DOM Content Loaded - Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS classes for animation
    const elements = document.querySelectorAll('.skill-card, .project-card, .certificate-card, .timeline-item, .about-content, .contact-info, .contact-form');
    elements.forEach(element => {
        element.classList.add('reveal-element');
    });

    // Initialize design showcase
    updateDesignCounter();
    updateIndicators();

    // Start auto-play (optional)
    // startAutoPlay();

    // Add particle background effect to hero section
    const hero = document.getElementById('hero');
    if (hero) {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles-container';
        hero.appendChild(particleContainer);

        // Create particles (CSS based)
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background-color: rgba(93, 93, 255, 0.5);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float linear infinite ${3 + Math.random() * 7}s;
                animation-delay: ${Math.random() * 5}s;
            `;
            particleContainer.appendChild(particle);
        }
    }

    // Add typing effect to hero heading
    const heroHeading = document.querySelector('#hero h1');
    if (heroHeading) {
        const text = heroHeading.textContent;
        heroHeading.textContent = '';
        heroHeading.style.cssText += `
            border-right: 3px solid #00f0ff;
            white-space: nowrap;
            overflow: hidden;
            animation: cursor-blink 1s step-end infinite;
        `;

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroHeading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };

        setTimeout(typeWriter, 500);
    }

    // Trigger initial check
    revealOnScroll();

    // Add dynamic styles for animations
    const style = document.createElement('style');
    style.textContent = `
        .particles-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 1;
            pointer-events: none;
        }
        
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0) scale(1);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) translateX(100px) scale(0);
                opacity: 0;
            }
        }
        
        @keyframes cursor-blink {
            from, to { border-color: transparent }
            50% { border-color: #00f0ff; }
        }
        
        /* Additional hover effects */
        .timeline-item:hover .timeline-dot {
            transform: translate(-50%, -50%) scale(1.3);
            box-shadow: 0 0 25px rgba(0, 240, 255, 0.9);
        }
        
        .certificate-card:hover .certificate-badge {
            background: linear-gradient(45deg, rgba(0, 240, 255, 0.3), rgba(93, 93, 255, 0.3));
            border-color: rgba(0, 240, 255, 0.5);
            box-shadow: 0 0 15px rgba(0, 240, 255, 0.3);
        }
        
        .view-all-btn:active {
            transform: translateY(-1px);
            box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);
        }
        
        @media (max-width: 768px) {
            .timeline-content {
                margin-left: 20px;
            }
            
            .timeline-item .timeline-content::before {
                content: '';
                position: absolute;
                left: -30px;
                top: 50%;
                transform: translateY(-50%);
                width: 0;
                height: 0;
                border-right: 10px solid rgba(20, 20, 40, 0.8);
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent;
            }
        }
    `;
    document.head.appendChild(style);

    // View All Certificates button action
    document.querySelector('.view-all-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        alert('This would open a dedicated certificates page or modal with all your certificates.');
    });

    // Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    setTimeout(() => {
        document.querySelectorAll('.reveal-element').forEach(el => {
            observer.observe(el);
        });
    }, 100);

    // Start particles
    initParticles();

    // Initialize Tilt
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".skill-card, .project-card, .certificate-card, .timeline-content"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
            scale: 1.05
        });
    }

    // Modal Functionality
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    const closeModal = document.querySelector('.close-modal');

    function openModal(imgSrc, imgAlt) {
        if (modal) {
            modal.style.display = "block";
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            modalImg.src = imgSrc;
            captionText.innerHTML = imgAlt;
            document.body.style.overflow = 'hidden';
        }
    }

    document.querySelectorAll('.certificate-image, .design-slide .design-image').forEach(wrapper => {
        wrapper.addEventListener('click', function (e) {
            e.stopPropagation();
            const img = this.querySelector('img');
            if (img) openModal(img.src, img.alt);
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            closeModalAndReset();
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModalAndReset();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && modal && modal.style.display === "block") {
            closeModalAndReset();
        }
    });

    function closeModalAndReset() {
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = "none";
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }
});

// Particle Background Animation
const canvas = document.getElementById('particles-canvas');
let ctx;
let particlesArray;

if (canvas) {
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });
}

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#00f0ff';
        ctx.fill();
    }
    update() {
        if (!canvas) return;
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function initParticles() {
    if (!canvas) return;
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        let color = '#00C4CC';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
    animateParticles();
}

function connect() {
    if (!canvas || !particlesArray) return;
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                if (opacityValue > 0) {
                    ctx.strokeStyle = 'rgba(0, 240, 255,' + opacityValue + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }
}

function animateParticles() {
    if (!canvas) return;
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}
