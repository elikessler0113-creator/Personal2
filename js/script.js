document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECT ELEMENTS
    const themeToggle = document.getElementById('theme-toggle');
    const themeLabel = document.getElementById('theme-label');
    const langToggle = document.getElementById('lang-toggle');
    const langLabel = document.getElementById('lang-label');

    // 2. INITIAL STATE (Theme)
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // 3. INITIAL STATE (Language)
    const savedLang = localStorage.getItem('language') || 'en';
    applyLanguage(savedLang);

    // 4. INITIAL BUTTON TEXTS
    updateButtonTexts(savedTheme, savedLang);

    // 5. THEME TOGGLE EVENT
    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            const currentLang = localStorage.getItem('language') || 'en';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateButtonTexts(newTheme, currentLang);
        });
    }

    // 6. LANGUAGE TOGGLE EVENT
    if (langToggle) {
        langToggle.addEventListener('click', (e) => {
            const currentLang = localStorage.getItem('language') || 'en';
            const newLang = currentLang === 'en' ? 'es' : 'en';
            const currentTheme = document.documentElement.getAttribute('data-theme');

            localStorage.setItem('language', newLang);
            applyLanguage(newLang);
            updateButtonTexts(currentTheme, newLang);
        });
    }

    // --- HELPER FUNCTIONS ---

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
        // Update Language Button
        if (langLabel) {
            langLabel.textContent = langLabel.getAttribute(`data-${lang}`);
        }

        // Update Theme Button
        if (themeLabel) {
            if (theme === 'light') {
                themeLabel.textContent = (lang === 'en') ? 'Dark Mode' : 'Modo Oscuro';
            } else {
                themeLabel.textContent = (lang === 'en') ? 'Light Mode' : 'Modo Claro';
            }
        }
    }
});
// --- Inside your DOMContentLoaded listener ---
const menuToggle = document.getElementById('menu-toggle');
const mobileOverlay = document.getElementById('mobile-overlay');
const menuIcon = document.getElementById('menu-icon');

if (menuToggle && mobileOverlay) {
    menuToggle.addEventListener('click', () => {
        mobileOverlay.classList.toggle('active');
        
        // Swap icon between Hamburger and X
        if (mobileOverlay.classList.contains('active')) {
            menuIcon.textContent = '✕';
            document.body.style.overflow = 'hidden'; // Stop background scrolling
        } else {
            menuIcon.textContent = '☰';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });
}

// Close menu if a link is clicked
const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileOverlay.classList.remove('active');
        menuIcon.textContent = '☰';
        document.body.style.overflow = 'auto';
    });
});
