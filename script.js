document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        // Animate hamburger to X
        const spans = mobileBtn.querySelectorAll('span');
        if (mobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const spans = mobileBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Smooth Scrolling for Anchor Links (polishing standard behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const fadeElements = document.querySelectorAll('.service-card, .contact-info, .contact-form');
    fadeElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(el);
    });

    // Parallax effect for Banner if possible
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const banner = document.querySelector('.cinematic-banner');
        if (banner) {
            banner.style.backgroundPositionY = -(scrolled * 0.1) + 'px';
        }
    });

    // Snowfall Effect
    function createSnowflake() {
        const snowContainer = document.getElementById('snow-container');
        if (!snowContainer) return;

        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');

        // Random properties
        const startLeft = Math.random() * 100;
        const size = Math.random() * 3 + 2; // 2px to 5px
        const duration = Math.random() * 5 + 5; // 5s to 10s
        const opacity = Math.random() * 0.5 + 0.3;

        // Random sway amount
        const sway = (Math.random() - 0.5) * 50; // -25px to +25px

        snowflake.style.left = `${startLeft}vw`;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.animationDuration = `${duration}s`;
        snowflake.style.opacity = `${opacity}`;

        // Set custom property for end sway position if we were using it in CSS variable, 
        // but for simplicity in this keyframe we might just let them drift right a bit or standard.
        // To make it better, we could set a random translateX end point if we used CSS vars. 
        // For now, simpler CSS @keyframes is used.

        snowContainer.appendChild(snowflake);

        // Remove after animation
        setTimeout(() => {
            snowflake.remove();
        }, duration * 1000);
    }

    // Start snowfall
    setInterval(createSnowflake, 100);
});
