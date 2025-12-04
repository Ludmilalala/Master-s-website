class PawTracker {
    constructor() {
        this.paws = [];
        this.prevPawLeft = false;
        this.mouse = { prev: { x: 0, y: 0 }, dist: 0 };
        this.canvas = null;
        this.ctx = null;
        
        this.init();
    }
    
    init() {
        // Создаем канвас
        const canvas = document.getElementById('paw-canvas');
        const section = document.getElementById('cat-section');
        
        // Устанавливаем размеры канваса
        canvas.width = section.offsetWidth;
        canvas.height = section.offsetHeight;
        
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // Обработчики событий
        section.addEventListener('mousemove', this.handleMouseMove.bind(this));
        section.addEventListener('touchmove', this.handleTouchMove.bind(this));
        
        // Запускаем анимацию
        this.animate();
        
        console.log('🐾 Paw tracker initialized!');
    }
    
    handleMouseMove(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        this.pawDraw(x, y);
    }
    
    handleTouchMove(event) {
        event.preventDefault();
        if (event.touches.length > 0) {
            const rect = this.canvas.getBoundingClientRect();
            const x = event.touches[0].clientX - rect.left;
            const y = event.touches[0].clientY - rect.top;
            this.pawDraw(x, y);
        }
    }
    
    pawDraw(x, y) {
        const dx = Math.abs(x - this.mouse.prev.x);
        const dy = Math.abs(y - this.mouse.prev.y);
        
        if (this.mouse.dist > 25) {
            this.prevPawLeft = !this.prevPawLeft;
            const angle = Math.atan2(
                y - this.mouse.prev.y,
                x - this.mouse.prev.x
            );
            
            this.paws.push(new Paw(
                x, y, 
                (angle * 180) / Math.PI, 
                this.prevPawLeft,
                this.ctx
            ));
            
            this.mouse.dist = 0;
            this.mouse.prev = { x, y };
        } else {
            this.mouse.dist += dx + dy;
        }
    }
    
    animate() {
        // Очищаем канвас
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Обновляем и рисуем лапки
        for (let i = this.paws.length - 1; i >= 0; i--) {
            const paw = this.paws[i];
            paw.update();
            paw.display();
            
            if (paw.alpha <= 0) {
                this.paws.splice(i, 1);
            }
        }
        
        // Следующий кадр
        requestAnimationFrame(this.animate.bind(this));
    }
}

class Paw {
    constructor(x, y, angle, left, ctx) {
        this.x = x;
        this.y = y;
        this.angle = angle + 90;
        this.left = left;
        this.ctx = ctx;
        this.alpha = 255;
        this.size = 7;
    }
    
    update() {
        this.alpha -= 2;
    }
    
    display() {
        if (this.alpha <= 0) return;
        
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate((this.angle * Math.PI) / 180);
        
        const offset = this.left ? this.size : -this.size;
        this.ctx.translate(offset * 1.5, 0);
        
        // Рисуем лапку
        this.drawPaw();
        
        this.ctx.restore();
    }
    
    drawPaw() {
        const ctx = this.ctx;
        const size = this.size;
        const center = size / 2;
        
        ctx.fillStyle = `rgba(250, 148, 149, ${this.alpha / 255})`;
        
        // Основная подушечка
        ctx.beginPath();
        ctx.ellipse(center, center, size * 0.45, size * 0.35, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        // Левая подушечка
        ctx.beginPath();
        ctx.ellipse(0, 0, size * 0.25, size * 0.25, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        // Верхняя подушечка
        ctx.beginPath();
        ctx.ellipse(center, -size * 0.2, size * 0.25, size * 0.25, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        // Правая подушечка
        ctx.beginPath();
        ctx.ellipse(size, 0, size * 0.25, size * 0.25, 0, 0, 2 * Math.PI);
        ctx.fill();
    }
}

// Запускаем когда страница загружена
document.addEventListener('DOMContentLoaded', function() {
    new PawTracker();
});

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