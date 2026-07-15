document.addEventListener('DOMContentLoaded', () => {
    // ─── Mobile Navigation Toggle ──────────────────────────────
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // ─── Active Nav Link on Scroll ─────────────────────────────
    const sections = document.querySelectorAll('section[id], header[id]');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => navObserver.observe(section));

    // ─── Scroll-Triggered Fade-In ──────────────────────────────
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // ─── Navbar Background on Scroll ───────────────────────────
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.borderBottomColor = 'rgba(148, 163, 184, 0.12)';
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
        } else {
            navbar.style.borderBottomColor = 'rgba(148, 163, 184, 0.08)';
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.85)';
        }
    });
});
