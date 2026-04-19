document.addEventListener('DOMContentLoaded', () => {
    // --- 1. THEME & LANGUAGE ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeLabel = document.getElementById('theme-label');
    const langToggle = document.getElementById('lang-toggle');
    const langLabel = document.getElementById('lang-label');

    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const savedLang = localStorage.getItem('language') || 'en';
    applyLanguage(savedLang);
    updateButtonTexts(savedTheme, savedLang);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            const currentLang = localStorage.getItem('language') || 'en';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateButtonTexts(newTheme, currentLang);
        });
    }

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const currentLang = localStorage.getItem('language') || 'en';
            const newLang = currentLang === 'en' ? 'es' : 'en';
            const currentTheme = document.documentElement.getAttribute('data-theme');

            localStorage.setItem('language', newLang);
            applyLanguage(newLang);
            updateButtonTexts(currentTheme, newLang);
        });
    }

    function applyLanguage(lang) {
        const elements = document.querySelectorAll('[data-en]');
        elements.forEach(el => {
            const translation = el.getAttribute(`data-${lang}`);
            if (translation) {
                el.textContent = translation;
            }
        });
        document.documentElement.lang = lang;
    }

    function updateButtonTexts(theme, lang) {
        if (langLabel) {
            langLabel.textContent = langLabel.getAttribute(`data-${lang}`);
        }
        if (themeLabel) {
            if (theme === 'light') {
                themeLabel.textContent = (lang === 'en') ? 'Dark Mode' : 'Modo Oscuro';
            } else {
                themeLabel.textContent = (lang === 'en') ? 'Light Mode' : 'Modo Claro';
            }
        }
    }

    // --- 2. MOBILE MENU ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const menuIcon = document.getElementById('menu-icon');

    if (menuToggle && mobileOverlay) {
        menuToggle.addEventListener('click', () => {
            mobileOverlay.classList.toggle('active');
            if (mobileOverlay.classList.contains('active')) {
                menuIcon.textContent = '✕';
                document.body.style.overflow = 'hidden'; 
            } else {
                menuIcon.textContent = '☰';
                document.body.style.overflow = 'auto'; 
            }
        });
    }

    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileOverlay.classList.remove('active');
            if (menuIcon) menuIcon.textContent = '☰';
            document.body.style.overflow = 'auto';
        });
    });

    // --- 3. PROGRESS BAR ANIMATION ---
    const progressBars = document.querySelectorAll('.progress-fill');
    if (progressBars.length > 0) {
        const observerOptions = { threshold: 0.5 };
        const barObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const targetWidth = bar.getAttribute('data-percent');
                    bar.style.width = targetWidth;
                    barObserver.unobserve(bar);
                }
            });
        }, observerOptions);

        progressBars.forEach(bar => barObserver.observe(bar));
    }

    // --- 4. BADGE SLIDER LOGIC ---
    const badges = document.querySelectorAll('.badge-item');
    const prevBtn = document.getElementById('prevBadge');
    const nextBtn = document.getElementById('nextBadge');

    // ONLY run this logic if the elements actually exist on the current page
    if (badges.length > 0 && prevBtn && nextBtn) {
        let currentBadgeIdx = 0;

        function updateSlider() {
            badges.forEach((badge, i) => {
                badge.classList.remove('active', 'prev', 'next', 'hidden');
                if (i === currentBadgeIdx) {
                    badge.classList.add('active');
                } else if (i === (currentBadgeIdx - 1 + badges.length) % badges.length) {
                    badge.classList.add('prev');
                } else if (i === (currentBadgeIdx + 1) % badges.length) {
                    badge.classList.add('next');
                } else {
                    badge.classList.add('hidden');
                }
            });
        }

        updateSlider();

        prevBtn.addEventListener('click', () => {
            currentBadgeIdx = (currentBadgeIdx - 1 + badges.length) % badges.length;
            updateSlider();
        });

        nextBtn.addEventListener('click', () => {
            currentBadgeIdx = (currentBadgeIdx + 1) % badges.length;
            updateSlider();
        });
    }

    // --- 5. SCROLL REVEAL ---
    const revealElements = document.querySelectorAll('section, .music-item, .tech-item');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach((el) => {
            el.classList.add('reveal');
            revealObserver.observe(el);
        });
    }
});
