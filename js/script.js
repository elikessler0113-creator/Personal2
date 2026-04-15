document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const langToggle = document.getElementById('lang-toggle');
    const body = document.body;

    // 1. Check LocalStorage for saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // 2. Theme Toggle Event
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }

    // 3. Spanish Translation logic
    // Efficiency Tip: Use a data-attribute system (data-en and data-es)
    langToggle.addEventListener('click', () => {
        const isSpanish = body.classList.toggle('lang-es');
        localStorage.setItem('language', isSpanish ? 'es' : 'en');
        applyLanguage(isSpanish ? 'es' : 'en');
    });

    // Check for saved language on load
    const savedLang = localStorage.getItem('language');
    if (savedLang === 'es') {
        body.classList.add('lang-es');
        applyLanguage('es');
    }
});

function updateLangButton(lang) {
    const langLabel = document.getElementById('lang-label');
    if (langLabel) {
        // This pulls the correct text from the data attributes we just added
        const newText = langLabel.getAttribute(`data-${lang}`);
        langLabel.textContent = newText;
    }
});
