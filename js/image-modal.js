// Функция для модальных окон изображений
function initImageModalsForInd() {
    // Находим все изображения в индивидуальном разделе
    const images = document.querySelectorAll('.hobby-image, .profile-photo');
    
    images.forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Создаем модальное окно
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            
            const overlay = document.createElement('div');
            overlay.className = 'modal-overlay';
            
            const content = document.createElement('div');
            content.className = 'modal-content';
            
            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            modalImg.alt = this.alt || 'Изображение';
            
            const closeBtn = document.createElement('button');
            closeBtn.className = 'modal-close';
            closeBtn.innerHTML = '&times;';
            
            // Собираем структуру
            content.appendChild(modalImg);
            content.appendChild(closeBtn);
            modal.appendChild(overlay);
            modal.appendChild(content);
            document.body.appendChild(modal);
            
            // Блокируем прокрутку фона
            document.body.style.overflow = 'hidden';
            
            // Функции закрытия
            function closeModal() {
                document.body.removeChild(modal);
                document.body.style.overflow = '';
            }
            
            overlay.addEventListener('click', closeModal);
            closeBtn.addEventListener('click', closeModal);
            
            // Закрытие по ESC
            function handleEsc(e) {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', handleEsc);
                }
            }
            
            document.addEventListener('keydown', handleEsc);
            
            // Закрытие при изменении ориентации на мобильных
            window.addEventListener('orientationchange', closeModal);
        });
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initImageModalsForInd();
    
    // Также можно добавить лёгкую анимацию при наведении
    const images = document.querySelectorAll('.hobby-image');
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(-2deg) scale(1.02)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(-2deg) scale(1)';
        });
    });
});