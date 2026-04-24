// Mobile Menu Toggle logic
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.querySelector('.nav-links');
const menuIcon = menuBtn.querySelector('i');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
        
        // Animate Icon change
        if (navLinks.classList.contains('active')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.classList.remove('active');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    });
});


// Typewriter Effect Logic
const typewriterText = document.getElementById('typewriter-text');
const words = ["Modern Living.", "Smart Spaces.", "Timeless Elegance.", "Vibrant Aesthetics."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    if (!typewriterText) return;
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typewriterText.innerText = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterText.innerText = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
    if(typewriterText) {
        setTimeout(type, 1000);
    }
});


// Scroll Typewriter Effect for About Section
const scrollTypewriter = document.getElementById('scroll-typewriter');
if (scrollTypewriter) {
    const textToType = scrollTypewriter.getAttribute('data-text');
    let hasTyped = false;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const typingObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasTyped) {
                hasTyped = true;
                let i = 0;
                scrollTypewriter.innerHTML = "<span class='about-cursor'>|</span>";
                
                const typeInterval = setInterval(() => {
                    if (i < textToType.length) {
                        scrollTypewriter.innerHTML = textToType.substring(0, i + 1) + "<span class='about-cursor'>|</span>";
                        i++;
                    } else {
                        clearInterval(typeInterval);
                    }
                }, 50);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    typingObserver.observe(scrollTypewriter);
}


// Global Scroll Progress Bar Logic
window.onscroll = function() {
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    }
};

// Achievements Thread Counter Animation
const stats = document.querySelectorAll('.thread-number');
const statsSection = document.querySelector('.thread-section');

const startCounters = () => {
    stats.forEach(stat => {
        const updateCount = () => {
            const target = +stat.getAttribute('data-target');
            const currentText = stat.innerText.replace('+', '');
            const count = +currentText;
            const speed = 100; 
            const inc = target / speed;

            if (count < target) {
                stat.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 30);
            } else {
                stat.innerText = target;
            }
        };
        updateCount();
    });
};

const observerOptions = {
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Scroll Reveal Observer
const revealObserverOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, revealObserverOptions);

document.querySelectorAll('.reveal-up').forEach(el => {
    revealObserver.observe(el);
});

if (statsSection) {
    observer.observe(statsSection);
}

// Contemporary Luxe Testimonial Slider Logic
const track = document.getElementById('testimonial-track');
const dots = document.querySelectorAll('.luxe-dot');
const progressBars = document.querySelectorAll('.progress-bar');
let luxeIndex = 0;
const slideIntervalTime = 6000;
let slideTimer;

function updateSlider() {
    if (!track) return;
    track.style.transform = `translateX(-${luxeIndex * 100}%)`;
    
    // Update Dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === luxeIndex);
    });

    // Reset and Start Progress Bar for the active slide
    progressBars.forEach(bar => {
        bar.style.transition = 'none';
        bar.style.width = '0%';
    });

    // Force reflow
    void progressBars[luxeIndex].offsetWidth;

    // Animate active bar
    progressBars[luxeIndex].style.transition = `width ${slideIntervalTime}ms linear`;
    progressBars[luxeIndex].style.width = '100%';
}

function nextLuxeSlide() {
    luxeIndex = (luxeIndex + 1) % dots.length;
    updateSlider();
}

function jumpToSlide(index) {
    clearInterval(slideTimer);
    luxeIndex = index;
    updateSlider();
    slideTimer = setInterval(nextLuxeSlide, slideIntervalTime);
}

if (track) {
    updateSlider();
    slideTimer = setInterval(nextLuxeSlide, slideIntervalTime);
}


// 3D Circular Carousel Logic (The "Golden Moving" Portfolio)
const carouselStage = document.querySelector('.carousel-stage');
const carouselWrapper = document.querySelector('.portfolio-carousel-wrapper');

if (carouselStage && carouselWrapper) {
    let rotationAngle = 0;
    let isRotating = true;

    function rotateCarousel() {
        if (isRotating) {
            rotationAngle -= 0.2;
            carouselStage.style.transform = `rotateY(${rotationAngle}deg)`;
        }
        requestAnimationFrame(rotateCarousel);
    }

    rotateCarousel();

    carouselWrapper.addEventListener('mouseenter', () => {
        isRotating = false;
    });

    carouselWrapper.addEventListener('mouseleave', () => {
        isRotating = true;
    });
}

// Architectural Lens Lightbox Logic
const lightbox = document.getElementById('luxe-lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxClose = document.getElementById('lightbox-close');
const projectCards = document.querySelectorAll('.project-card');

if (lightbox) {
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('img');
            const title = card.querySelector('.project-title');
            
            if (img && title) {
                lightboxImg.src = img.src;
                lightboxTitle.innerText = title.innerText;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}
