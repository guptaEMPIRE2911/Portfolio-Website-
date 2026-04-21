document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Typed.js Initialization
    const typed = new Typed('.typed-text', {
        strings: ['Developer', 'CS Student', 'Traveller'],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 1500,
        loop: true
    });

    // 2. Sticky Navbar on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Mobile Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle hamburger icon between bars and times (close)
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });

    // 4. Intersection Observer for Fade-In Animations
    const faders = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // 5. Animated Counters
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false; // Ensure it only runs once

    const counterObserver = new IntersectionObserver((entries, observer) => {
        const [entry] = entries;
        if (!entry.isIntersecting) return;

        if (!hasCounted) {
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    
                    // Lower increment makes it slower and smoother
                    const inc = target / 50; 

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 40);
                    } else {
                        counter.innerText = target + (target === 15 ? '+' : ''); // Add '+' to projects for flair
                    }
                };
                updateCount();
            });
            hasCounted = true;
        }
        observer.unobserve(entry.target);
    }, { threshold: 0.5 });

    // Target the stats container to trigger the count
    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
        counterObserver.observe(statsContainer);
    }
});