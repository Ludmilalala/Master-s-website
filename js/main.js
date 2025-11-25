// main.js
document.addEventListener('DOMContentLoaded', function() {
    try {
    // Инициализация частиц
    if (typeof initParticlesWithRetry === 'function') {
        initParticlesWithRetry();
    }
    
    console.log('Website loaded successfully!');
} catch (error) {
    console.error('Error during initialization:', error);
}
    
    // Добавьте здесь другой JavaScript код для вашего сайта
    console.log('Website loaded successfully!');
    
    // Пример: плавная прокрутка для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Пример: анимация при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами с классом .animate-on-scroll
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});

// Функция для мобильного меню (если нужно)
function initMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');
    
    if (menuButton && menu) {
        menuButton.addEventListener('click', () => {
            menu.classList.toggle('active');
            menuButton.classList.toggle('active');
        });
    }
}

// Функция для темной/светлой темы
function initThemeSwitcher() {
    const themeSwitch = document.getElementById('theme-switch');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (themeSwitch) {
        // Проверяем сохраненную тему или системные настройки
        const savedTheme = localStorage.getItem('theme');
        const currentTheme = savedTheme || (prefersDarkScheme.matches ? 'dark' : 'light');
        
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeSwitch.checked = true;
        }
        
        themeSwitch.addEventListener('change', () => {
            if (themeSwitch.checked) {
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

// Инициализация при полной загрузке страницы
window.addEventListener('load', function() {
    initMobileMenu();
    initThemeSwitcher();
});