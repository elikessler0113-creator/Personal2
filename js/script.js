// This function runs every time the page loads
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SELECT ELEMENTS
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const langToggle = document.getElementById('lang-toggle');
    const langLabel = document.getElementById('lang-label');
    const body = document.body;

    // 2. INITIAL STATE (Theme)
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (themeIcon) {
        themeIcon.textContent = savedTheme === 'light' ? '🌙' : '☀️';
    }

    // 3. INITIAL STATE (Language)
    const savedLang = localStorage.getItem('language') || 'en';
    applyLanguage(savedLang);
    updateLangButton(savedLang);

    // 4. THEME TOGGLE EVENT
    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault(); // Prevents jumpy behavior
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            if (themeIcon) {
                themeIcon.textContent = newTheme === 'light' ? '🌙' : '☀️';
            }
        });
    }

    // 5. LANGUAGE TOGGLE EVENT
    if (langToggle) {
        langToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const currentLang = localStorage.getItem('language') || 'en';
            const newLang = currentLang === 'en' ? 'es' : 'en';
            
            localStorage.setItem('language', newLang);
            applyLanguage(newLang);
            updateLangButton(newLang);
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

    function updateLangButton(lang) {
        if (langLabel) {
            const newText = langLabel.getAttribute(`data-${lang}`);
            langLabel.textContent = newText;
        }
    }
});
