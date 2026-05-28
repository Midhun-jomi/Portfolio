/*
 * ==========================================
 * Midhun Jomi C - Portfolio Redesign Scripts
 * Interactive Experience Engine
 * ==========================================
 */

// Top-level global coordinates accessible by all sub-systems (Preloader Sparks, Cosmic Nebula Background, Custom Cursor)
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

document.addEventListener('DOMContentLoaded', () => {

    // ------------------------------------------
    // 0. Futuristic Sci-Fi HUD Preloader V3.0 Logic (3D Astrolabe & Magnetic Sparks Masterpiece)
    // ------------------------------------------
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('preloaderProgressBar');
    const percentLabel = document.getElementById('preloaderPercent');
    const terminal = document.getElementById('preloaderTerminal');
    const hudContent = document.getElementById('preloaderHUD');
    const shockwave = document.getElementById('preloaderShockwave');
    const svgBar = document.getElementById('preloaderSVGBar');
    const sparksCanvas = document.getElementById('preloaderSparksCanvas');
    const logoContainer = document.getElementById('preloaderLogoContainer');

    if (preloader && progressBar && percentLabel && terminal) {
        // Lock body scrolling immediately on initial load
        document.body.style.overflow = 'hidden';

        // 3D Parallax Gyroscope variables
        let targetTiltX = 0;
        let targetTiltY = 0;
        let currentTiltX = 0;
        let currentTiltY = 0;

        // Track mouse movements relative to viewport center to calculate 3D gyroscopic tilt
        preloader.addEventListener('mousemove', (e) => {
            const rect = preloader.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;

            // Compute rotations up to a sleek 20 degrees maximum angle
            targetTiltX = (deltaY / centerY) * -20; // Inverted Y-axis tilt for organic physical reaction
            targetTiltY = (deltaX / centerX) * 20;  // Standard X-axis tilt matching mouse direction
        });

        preloader.addEventListener('mouseleave', () => {
            targetTiltX = 0;
            targetTiltY = 0;
        });

        // 1. Interactive Cyber Sparks Canvas loop
        let sparksActive = true;
        if (sparksCanvas) {
            const sCtx = sparksCanvas.getContext('2d');
            let sparks = [];

            sparksCanvas.width = window.innerWidth;
            sparksCanvas.height = window.innerHeight;

            window.addEventListener('resize', () => {
                sparksCanvas.width = window.innerWidth;
                sparksCanvas.height = window.innerHeight;
            });

            class Spark {
                constructor(x, y, color) {
                    this.x = x;
                    this.y = y;
                    this.size = Math.random() * 2.2 + 1;
                    const angle = Math.random() * Math.PI * 2;
                    const speed = Math.random() * 4.5 + 2.5;
                    this.vx = Math.cos(angle) * speed;
                    this.vy = Math.sin(angle) * speed;
                    this.color = color;
                    this.alpha = 1;
                    this.decay = Math.random() * 0.018 + 0.012; // Slightly longer lifespan for spectacular trails
                    this.gravity = 0.06; // Reduced slightly to favor magnetic cursor swirl paths
                }

                update() {
                    // Calculate distance to current mouse coordinates
                    const dx = mouseX - this.x;
                    const dy = mouseY - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    // Proportional gravitational attraction towards cursor coordinates
                    if (dist < 400 && dist > 5) {
                        const pullForce = ((400 - dist) / 400) * 0.38;
                        this.vx += (dx / dist) * pullForce;
                        this.vy += (dy / dist) * pullForce;

                        // Perpendicular orbital vector force for interactive spark vortex swirls
                        const swirlX = -dy / dist;
                        const swirlY = dx / dist;
                        const swirlForce = ((400 - dist) / 400) * 0.18;
                        this.vx += swirlX * swirlForce;
                        this.vy += swirlY * swirlForce;
                    }

                    this.vy += this.gravity;
                    this.vx *= 0.95; // Custom drag coefficient for swirling trails
                    this.vy *= 0.95;
                    this.x += this.vx;
                    this.y += this.vy;
                    this.alpha -= this.decay;
                }

                draw() {
                    sCtx.save();
                    sCtx.globalAlpha = this.alpha;
                    sCtx.beginPath();
                    sCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    sCtx.fillStyle = this.color;
                    sCtx.shadowBlur = 8;
                    sCtx.shadowColor = this.color;
                    sCtx.fill();
                    sCtx.restore();
                }
            }

            function spawnSparks(x, y, count) {
                const colors = ['#14B8A6', '#8B5CF6', '#D946EF'];
                for (let i = 0; i < count; i++) {
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    sparks.push(new Spark(x, y, color));
                }
            }

            // Click spark burst
            preloader.addEventListener('click', (e) => {
                spawnSparks(e.clientX, e.clientY, 20);
            });

            // Hover spark trail
            preloader.addEventListener('mousemove', (e) => {
                if (Math.random() < 0.18) {
                    spawnSparks(e.clientX, e.clientY, 2);
                }
            });

            function animateSparks() {
                if (!sparksActive) return;
                sCtx.clearRect(0, 0, sparksCanvas.width, sparksCanvas.height);

                // Smoothly interpolate gyroscopic 3D tilt coordinates
                if (logoContainer) {
                    currentTiltX += (targetTiltX - currentTiltX) * 0.1;
                    currentTiltY += (targetTiltY - currentTiltY) * 0.1;
                    logoContainer.style.transform = `rotateX(${currentTiltX}deg) rotateY(${currentTiltY}deg)`;
                }

                for (let i = sparks.length - 1; i >= 0; i--) {
                    sparks[i].update();
                    if (sparks[i].alpha <= 0) {
                        sparks.splice(i, 1);
                    } else {
                        sparks[i].draw();
                    }
                }
                requestAnimationFrame(animateSparks);
            }
            animateSparks();
        }

        // Enriched array of diagnostic terminal logs representing high-end boot sequence steps
        const bootLogs = [
            { pct: 4, msg: '> INITIATING NEURAL FIELD MATRIX...', type: 'success' },
            { pct: 12, msg: '> CONNECTING VECTOR ENGINE PROCESSORS...', type: 'success' },
            { pct: 20, msg: '[ WARN ] VECTOR COUPLING DRIFT DETECTED (+0.042mrad)', type: 'warn' },
            { pct: 28, msg: '[  OK  ] AUTOMATIC REALIGN COMPLETED SECURELY', type: 'success' },
            { pct: 35, msg: '> SYNCHRONIZING CORE SUB-LEVEL THREADS...', type: 'success' },
            { pct: 42, msg: '[ WARN ] MEMORY BUFFER OVERFLOW IN HEX D30F', type: 'warn' },
            { pct: 50, msg: '[  OK  ] FLUSHING CACHE & DYNAMICALLY ALLOCATING HEAP', type: 'success' },
            { pct: 58, msg: '> LOCKING 3D MOUSE PARALLAX COORDINATES...', type: 'success' },
            { pct: 66, msg: '> CACHING GLASS CARD PIXEL-PERFECT VIEWPORTS', type: 'success' },
            { pct: 74, msg: '[ WARN ] ASYNC RENDER LATENCY SPIKE (34ms)', type: 'warn' },
            { pct: 82, msg: '[  OK  ] DECODING ASYNC IMAGE PACKETS IN BACKGROUND', type: 'success' },
            { pct: 90, msg: '> SPINNING UP HOLOGRAPHIC COMPASS HUDS...', type: 'success' },
            { pct: 96, msg: '> SHIELDING PORTAL INTERFERENCE SHOCKWAVES...', type: 'success' },
            { pct: 100, msg: '> SYSTEMS ONLINE. PORTAL READY.', type: 'success' }
        ];

        let logIndex = 0;
        let count = 0;
        let isLoaded = false;
        
        // Track resource load to speed up or resolve preloader securely
        window.addEventListener('load', () => {
            isLoaded = true;
        });

        const speed = 15; // Extremely smooth progressive boot intervals
        
        const loadingInterval = setInterval(() => {
            if (count < 100) {
                // If loaded, count slightly faster, but preserve full boot logger sequence
                let increment = Math.floor(Math.random() * 3) + 1;
                if (isLoaded) {
                    increment = Math.floor(Math.random() * 4) + 2;
                }
                count += increment;
                if (count > 100) count = 100;
            }

            // Fill standard progress bar
            progressBar.style.width = `${count}%`;

            // Fill concentric SVG bar (circumference = 465)
            if (svgBar) {
                const offset = 465 - (count / 100) * 465;
                svgBar.style.strokeDashoffset = offset;
            }

            // Typographic glitch percent count
            if (Math.random() < 0.08 && count < 100) {
                const glitchedChars = ['#', '@', '%', '&', '*', 'X', '$', '?'];
                const randChar = glitchedChars[Math.floor(Math.random() * glitchedChars.length)];
                percentLabel.textContent = count + randChar;
                setTimeout(() => {
                    percentLabel.textContent = count + '%';
                }, 60);
            } else {
                percentLabel.textContent = count + '%';
            }

            // Print diagnostic log line as specific thresholds are crossed
            if (logIndex < bootLogs.length && count >= bootLogs[logIndex].pct) {
                const line = document.createElement('div');
                line.className = `terminal-line ${bootLogs[logIndex].type}`;
                line.textContent = bootLogs[logIndex].msg;
                terminal.appendChild(line);
                
                // Automatically scroll terminal to bottom
                terminal.scrollTop = terminal.scrollHeight;
                logIndex++;
            }

            if (count === 100) {
                clearInterval(loadingInterval);
                
                // 1. Hud Portal Implodes (collapse) & shockwave fires
                setTimeout(() => {
                    if (hudContent) {
                        hudContent.classList.add('implode');
                    }
                    if (shockwave) {
                        shockwave.classList.add('blast');
                    }

                    // 2. Preloader Curtain slides up & locks reveals
                    setTimeout(() => {
                        preloader.classList.add('fade-out-curtain');
                        document.body.style.overflow = ''; // Unlock viewport scrolling
                        sparksActive = false; // Stop sparks canvas loop
                        
                        // 3. Staggered reveal cascades load in hero view
                        setTimeout(() => {
                            const heroRevealItems = document.querySelectorAll('.hero-section .reveal-item');
                            heroRevealItems.forEach((el, index) => {
                                setTimeout(() => {
                                    el.classList.add('revealed');
                                }, index * 120);
                            });
                        }, 400);
                    }, 600); // Wait for the shockwave ripple wave to sweep across screen first!
                }, 800);
            }
        }, speed);
    }

    // ------------------------------------------
    // 1. Initial State & Asset Preps
    // ------------------------------------------
    // Set Year in footer
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // Set scroll reveal class elements
    const revealElements = document.querySelectorAll(
        '.reveal-item, .bento-card, .timeline-card, .skill-card, .certificate-card, .project-card, .contact-info-card, .contact-form-card'
    );
    revealElements.forEach(el => {
        el.classList.add('reveal-item');
    });

    // Initialize VanillaTilt glare effects
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(
            '.bento-card:not(.card-profile), .timeline-card, .skill-card, .certificate-card, .project-card, .contact-info-card, .contact-form-card'
        ), {
            max: 8,
            speed: 500,
            glare: true,
            "max-glare": 0.12,
            scale: 1.02,
            perspective: 1000
        });
    }

    // ------------------------------------------
    // 2. Fluid Magnetic Custom Cursor
    // ------------------------------------------
    const cursorDot = document.getElementById('customCursorDot');
    const cursorGlow = document.getElementById('customCursorGlow');
    
    let dotX = mouseX;
    let dotY = mouseY;
    let glowX = mouseX;
    let glowY = mouseY;

    // Cache ambient background glow orbs once (avoids heavy querySelector queries on every frame)
    const orbPrimary = document.querySelector('.orb-primary');
    const orbSecondary = document.querySelector('.orb-secondary');
    const orbTertiary = document.querySelector('.orb-tertiary');

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Easing loop (requestAnimationFrame) for smooth inertia/physics
    function animateCursor() {
        // Dot follows fast
        dotX += (mouseX - dotX) * 0.3;
        dotY += (mouseY - dotY) * 0.3;
        if (cursorDot) {
            cursorDot.style.left = `${dotX}px`;
            cursorDot.style.top = `${dotY}px`;
        }

        // Glow follows with elegant delay (lerp)
        glowX += (mouseX - glowX) * 0.12;
        glowY += (mouseY - glowY) * 0.12;
        if (cursorGlow) {
            cursorGlow.style.left = `${glowX}px`;
            cursorGlow.style.top = `${glowY}px`;
        }

        // Gently drift ambient background glow orbs based on mouse coordinates (3D parallax)
        if (orbPrimary) {
            const ox = (mouseX - window.innerWidth / 2) * 0.035;
            const oy = (mouseY - window.innerHeight / 2) * 0.035;
            orbPrimary.style.transform = `translate(${ox}px, ${oy}px)`;
        }
        if (orbSecondary) {
            const ox = (mouseX - window.innerWidth / 2) * -0.025;
            const oy = (mouseY - window.innerHeight / 2) * -0.025;
            orbSecondary.style.transform = `translate(${ox}px, ${oy}px)`;
        }
        if (orbTertiary) {
            const ox = (mouseX - window.innerWidth / 2) * 0.015;
            const oy = (mouseY - window.innerHeight / 2) * -0.015;
            orbTertiary.style.transform = `translate(${ox}px, ${oy}px)`;
        }

        requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);

    // Expand cursor hover states over interactive components
    const clickables = document.querySelectorAll(
        'a, button, input, textarea, .hamburger, .indicator, .design-nav, .certificate-image'
    );
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });

    // ------------------------------------------
    // 3. Card Mouse-Tracking Radial Glow
    // ------------------------------------------
    const cards = document.querySelectorAll(
        '.bento-card, .timeline-card, .skill-card, .certificate-card, .project-card, .contact-info-card, .contact-form-card'
    );

    cards.forEach(card => {
        let rect = null;

        card.addEventListener('mouseenter', () => {
            rect = card.getBoundingClientRect();
        });

        card.addEventListener('mousemove', (e) => {
            if (!rect) {
                rect = card.getBoundingClientRect();
            }
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });

        card.addEventListener('mouseleave', () => {
            rect = null; // Clear to prevent positioning bugs if screen layout changes
        });
    });

    // ------------------------------------------
    // 4. Interactive Magnetic Button CTA
    // ------------------------------------------
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            // Distance from center of button
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Translate button slightly in cursor direction
            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // ------------------------------------------
    // 5. Sticky Navigation Shrinker & Active Section Tracker
    // ------------------------------------------
    const header = document.querySelector('header');
    
    // Scrolled header background blur threshold
    window.addEventListener('scroll', () => {
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 40);
        }
    });

    // IntersectionObserver for tracking active sections in menu links
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    const sectionObserverOptions = {
        root: null,
        rootMargin: '-30% 0px -40% 0px', // Trigger near screen middle
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${activeId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, sectionObserverOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Mobile hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close when clicking item links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // ------------------------------------------
    // 6. Smooth Staggered Reveals & Progress Meters
    // ------------------------------------------
    const scrollRevealOptions = {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    };

    const scrollRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If preloader overlay is still active, block scroll reveals in the hero area (preloader handles them staggeredly)
                const preloaderActive = document.getElementById('preloader') && !document.getElementById('preloader').classList.contains('fade-out-curtain');
                if (preloaderActive && entry.target.closest('.hero-section')) {
                    return;
                }
                
                entry.target.classList.add('revealed');

                // If skill card, trigger progress bar width transition
                if (entry.target.classList.contains('skill-card')) {
                    const progressBar = entry.target.querySelector('.progress-bar');
                    const level = entry.target.getAttribute('data-level');
                    if (progressBar && level) {
                        setTimeout(() => {
                            progressBar.style.width = `${level}%`;
                        }, 150);
                    }
                }
            }
        });
    }, scrollRevealOptions);

    document.querySelectorAll('.reveal-item').forEach(el => {
        scrollRevealObserver.observe(el);
    });

    // ------------------------------------------
    // 7. Lightbox Modal Certificate Actions
    // ------------------------------------------
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    const closeModal = document.querySelector('.close-modal');

    function openModal(imgSrc, imgAlt) {
        if (modal && modalImg && captionText) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                modal.classList.add('show');
            }, 20);
            modalImg.src = imgSrc;
            captionText.textContent = imgAlt;
        }
    }

    function closeModalAndReset() {
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        }
    }

    // Triggers
    document.querySelectorAll('.certificate-image, .design-slide .design-image').forEach(el => {
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            const img = el.querySelector('img');
            if (img) {
                openModal(img.src, img.alt || 'Visual Artifact Preview');
            }
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', closeModalAndReset);
    }
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-wrapper')) {
                closeModalAndReset();
            }
        });
    }

    // Keyboard ESC mapping
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModalAndReset();
        }
    });

    // ------------------------------------------
    // 8. Contact Form Submissions
    // ------------------------------------------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending Message...</span> <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData
            })
                .then(response => {
                    alert('Thank you for reaching out! Your message was sent successfully.');
                    contactForm.reset();
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    alert('Something went wrong during delivery. Please try again later.');
                })
                .finally(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.disabled = false;
                });
        });
    }

    // ------------------------------------------
    // 8.5. Bento Cards Auto-Scrolling (GPU-Accelerated CSS Engine)
    // ------------------------------------------
    function initBentoAutoScroll() {
        const scrollBodies = document.querySelectorAll('.bento-scroll-body');
        
        function calculateScrollDistances() {
            scrollBodies.forEach(body => {
                const content = body.querySelector('.scroll-content');
                if (!content) return;
                
                // Clear previous variables/classes to capture pure DOM heights
                content.classList.remove('auto-scroll-active');
                body.style.removeProperty('--scroll-dist');
                
                // Height of the visible scrolling container in the middle of the card
                const availableHeight = body.clientHeight;
                
                // Total height of the scrollable content
                const scrollHeight = content.scrollHeight;
                
                const scrollDistance = scrollHeight - availableHeight;
                
                if (scrollDistance > 8) { // Only animate if content overflows significantly
                    body.style.setProperty('--scroll-dist', `${scrollDistance}px`);
                    
                    // Stagger activation for a fluid, organic entrance
                    setTimeout(() => {
                        content.classList.add('auto-scroll-active');
                    }, Math.random() * 800 + 400);
                }
            });
        }

        // Run once DOM is fully drawn and loaded
        setTimeout(calculateScrollDistances, 1000);
        
        // Dynamic recalculation on window resize for liquid layouts
        window.addEventListener('resize', () => {
            clearTimeout(window.bentoResizeTimeout);
            window.bentoResizeTimeout = setTimeout(calculateScrollDistances, 250);
        });
    }
    
    initBentoAutoScroll();
});

// ------------------------------------------
// 9. Premium Interactive Design Slide Showcase
// ------------------------------------------
let currentSlide = 0;
const totalSlides = 13;
let isTransitioning = false;

function updateDesignCounter() {
    const currentDesign = document.getElementById('currentDesign');
    const totalDesigns = document.getElementById('totalDesigns');
    if (currentDesign && totalDesigns) {
        currentDesign.textContent = currentSlide + 1;
        totalDesigns.textContent = totalSlides;
    }
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
    if (slides.length === 0) return;

    // Remove active class from all
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Set new active
    slides[slideIndex].classList.add('active');

    // Update markers
    updateDesignCounter();
    updateIndicators();

    setTimeout(() => {
        isTransitioning = false;
    }, 600);
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

// Keyboards and Swipe controls for slides
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        previousDesign();
    } else if (e.key === 'ArrowRight') {
        nextDesign();
    }
});

// Touch controls for slides
let startTouchX = 0;
let endTouchX = 0;
const designViewport = document.getElementById('designViewport');

if (designViewport) {
    designViewport.addEventListener('touchstart', (e) => {
        startTouchX = e.touches[0].clientX;
    }, { passive: true });

    designViewport.addEventListener('touchend', (e) => {
        endTouchX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const threshold = 40;
    const diff = startTouchX - endTouchX;
    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            nextDesign(); // Swipe left -> Next
        } else {
            previousDesign(); // Swipe right -> Prev
        }
    }
}

// ------------------------------------------
// 10. Interactive Cosmic Nebula Background Mechanics
// ------------------------------------------
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let animationFrameId = null;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Prismatic Color Palette matching the Luxury brand theme
    const palette = [
        { r: 139, g: 92, b: 246, hex: '#8B5CF6' }, // Prismatic Violet
        { r: 20, g: 184, b: 166, hex: '#14B8A6' }, // Holographic Teal
        { r: 217, g: 70, b: 239, hex: '#D946EF' }  // Cyber Magenta
    ];

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    class Particle {
        constructor(x, y, size) {
            this.x = x;
            this.y = y;
            this.size = size;
            
            // Flow field drift waves
            this.angle = Math.random() * Math.PI * 2;
            this.angleSpeed = Math.random() * 0.015 - 0.0075;
            
            // Inertial velocities
            this.vx = (Math.random() * 0.2) - 0.1;
            this.vy = (Math.random() * 0.2) - 0.1;
            
            // Pulsing node configurations
            this.pulsePhase = Math.random() * Math.PI * 2;
            this.pulseSpeed = 0.005 + Math.random() * 0.01;
            
            // Assigned core brand color
            this.colorConfig = palette[Math.floor(Math.random() * palette.length)];
        }

        draw() {
            this.pulsePhase += this.pulseSpeed;
            const pulseSize = this.size + Math.sin(this.pulsePhase) * 1.2;
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, Math.max(0.5, pulseSize), 0, Math.PI * 2, false);
            
            // High-end radial glow rendering for cosmic star atmosphere
            const glow = ctx.createRadialGradient(
                this.x, this.y, Math.max(0.1, pulseSize * 0.1),
                this.x, this.y, Math.max(1, pulseSize * 2.8)
            );
            glow.addColorStop(0, `rgba(${this.colorConfig.r}, ${this.colorConfig.g}, ${this.colorConfig.b}, 0.75)`);
            glow.addColorStop(0.25, `rgba(${this.colorConfig.r}, ${this.colorConfig.g}, ${this.colorConfig.b}, 0.3)`);
            glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            ctx.fillStyle = glow;
            ctx.fill();
        }

        update() {
            // 1. Fluid flow drift current logic
            this.angle += this.angleSpeed;
            const flowX = Math.sin(this.angle) * 0.035;
            const flowY = Math.cos(this.angle) * 0.035;
            
            this.vx += flowX;
            this.vy += flowY;

            // 2. Gravitational cursor attraction & orbital swirl simulation
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 280) {
                const pull = (280 - distance) / 280 * 0.07;
                
                // Perpendicular vector for premium swirl inertia!
                const swirlX = -dy / distance;
                const swirlY = dx / distance;
                
                this.vx += (dx / distance) * pull * 0.35 + swirlX * pull * 0.65;
                this.vy += (dy / distance) * pull * 0.35 + swirlY * pull * 0.65;
            }

            // 3. Absolute speed limits to keep transition movements fluid and sleek
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            const speedLimit = 0.75;
            if (speed > speedLimit) {
                this.vx = (this.vx / speed) * speedLimit;
                this.vy = (this.vy / speed) * speedLimit;
            }

            this.x += this.vx;
            this.y += this.vy;

            // 4. Wrap elements inside canvas borders seamlessly
            if (this.x < 0) this.x = canvas.width;
            else if (this.x > canvas.width) this.x = 0;
            
            if (this.y < 0) this.y = canvas.height;
            else if (this.y > canvas.height) this.y = 0;

            this.draw();
        }
    }

    function initParticles() {
        particlesArray = [];
        const area = canvas.width * canvas.height;
        const numberOfParticles = Math.min(50, Math.floor(area / 24000));
        
        for (let i = 0; i < numberOfParticles; i++) {
            const size = Math.random() * 3 + 2.5; // Slightly larger stars for luxury glow look
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;

            particlesArray.push(new Particle(x, y, size));
        }
    }

    function connectParticles() {
        const maxDist = 120;
        const maxDistSq = maxDist * maxDist;
        const len = particlesArray.length;
        
        for (let a = 0; a < len; a++) {
            const pA = particlesArray[a];
            for (let b = a + 1; b < len; b++) {
                const pB = particlesArray[b];
                const dx = pA.x - pB.x;
                const dy = pA.y - pB.y;
                const distSq = (dx * dx) + (dy * dy);
                
                if (distSq < maxDistSq) {
                    const dist = Math.sqrt(distSq);
                    const opacity = (1 - (dist / maxDist)) * 0.24;
                    
                    // Create gorgeous color-shifting gradients connecting neighboring star systems
                    const grad = ctx.createLinearGradient(pA.x, pA.y, pB.x, pB.y);
                    grad.addColorStop(0, `rgba(${pA.colorConfig.r}, ${pA.colorConfig.g}, ${pA.colorConfig.b}, ${opacity})`);
                    grad.addColorStop(1, `rgba(${pB.colorConfig.r}, ${pB.colorConfig.g}, ${pB.colorConfig.b}, ${opacity})`);
                    
                    ctx.strokeStyle = grad;
                    ctx.lineWidth = 1.2;
                    ctx.beginPath();
                    ctx.moveTo(pA.x, pA.y);
                    ctx.lineTo(pB.x, pB.y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(p => p.update());
        connectParticles();
        animationFrameId = requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
}
