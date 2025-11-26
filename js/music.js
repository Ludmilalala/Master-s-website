class MusicNoteTracker {
    constructor() {
        this.notes = [];
        this.canvas = null;
        this.ctx = null;
        
        this.init();
    }
    
    init() {
        // Создаем канвас
        const canvas = document.getElementById('music-canvas');
        const section = document.getElementById('music-section');
        
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
        
        console.log('🎵 Music note tracker initialized!');
    }
    
    handleMouseMove(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        if (x >= 0 && x <= this.canvas.width && y >= 0 && y <= this.canvas.height) {
        this.createNote(x, y);
    }
    }
    
    handleTouchMove(event) {
        event.preventDefault();
        if (event.touches.length > 0) {
            const rect = this.canvas.getBoundingClientRect();
            const x = event.touches[0].clientX - rect.left;
            const y = event.touches[0].clientY - rect.top;
            if (x >= 0 && x <= this.canvas.width && y >= 0 && y <= this.canvas.height) {
            this.createNote(x, y);
        };
        }
    }
    
    createNote(x, y) {
        // Создаем новую ноту только если мышь переместилась достаточно
        if (this.notes.length === 0 || 
            Math.abs(x - this.notes[this.notes.length - 1].x) > 25 ||
            Math.abs(y - this.notes[this.notes.length - 1].y) > 25) {
            
            this.notes.push(new MusicNote(x, y, this.ctx));
            
            // Ограничиваем количество нот
            if (this.notes.length > 20) {
                this.notes.shift();
            }
        }
    }
    
    animate() {
        // Очищаем канвас
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Обновляем и рисуем ноты
        for (let i = this.notes.length - 1; i >= 0; i--) {
            const note = this.notes[i];
            note.update();
            note.display();
            
            if (note.alpha <= 0) {
                this.notes.splice(i, 1);
            }
        }
        
        // Следующий кадр
        requestAnimationFrame(this.animate.bind(this));
    }
}

class MusicNote {
    constructor(x, y, ctx) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.alpha = 180; // Уменьшил прозрачность (было 255)
        this.size = 8; // Уменьшил размер (было 12)
        this.rotation = Math.random() * 360;
        this.type = Math.random() > 0.5 ? 'full' : 'simple';
        this.oscillation = Math.random() * Math.PI * 2;
        this.speed = 0.8 + Math.random() * 0.4; // Скорость исчезновения
    }
    
    update() {
        this.alpha -= this.speed; // Медленнее исчезают
        this.oscillation += 0.08;
        this.y += Math.sin(this.oscillation) * 0.3; // Более плавное движение
    }
    
    display() {
        if (this.alpha <= 0) return;
        
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate((this.rotation * Math.PI) / 180);
        
        // Рисуем ноту
        if (this.type === 'full') {
            this.drawFullNote();
        } else {
            this.drawSimpleNote();
        }
        
        this.ctx.restore();
    }
    
    drawFullNote() {
        const ctx = this.ctx;
        const size = this.size;
        const alpha = this.alpha / 255 * 0.6; // Еще больше прозрачности
        
        ctx.fillStyle = `rgba(102, 126, 234, ${alpha})`;
        ctx.strokeStyle = `rgba(102, 126, 234, ${alpha})`;
        ctx.lineWidth = 1.5; // Тонче линии
        
        // Головка ноты (круг)
        ctx.beginPath();
        ctx.ellipse(0, 0, size * 0.5, size * 0.35, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        // Стебель
        ctx.beginPath();
        ctx.moveTo(size * 0.5, 0);
        ctx.lineTo(size * 0.5, -size * 1.8);
        ctx.stroke();
        
        // Флажок
        ctx.beginPath();
        ctx.moveTo(size * 0.5, -size * 1.8);
        ctx.quadraticCurveTo(
            size * 0.9, -size * 1.6,
            size * 0.5, -size * 1.3
        );
        ctx.stroke();
    }
    
    drawSimpleNote() {
        const ctx = this.ctx;
        const size = this.size;
        const alpha = this.alpha / 255 * 0.6; // Еще больше прозрачности
        
        ctx.fillStyle = `rgba(90, 103, 216, ${alpha})`;
        ctx.strokeStyle = `rgba(90, 103, 216, ${alpha})`;
        ctx.lineWidth = 1.5; // Тонче линии
        
        // Головка ноты (овал)
        ctx.beginPath();
        ctx.ellipse(0, 0, size * 0.6, size * 0.4, Math.PI / 4, 0, 2 * Math.PI);
        ctx.fill();
        
        // Стебель
        ctx.beginPath();
        ctx.moveTo(size * 0.4, size * 0.4);
        ctx.lineTo(size * 0.4, -size * 1.3);
        ctx.stroke();
        
        // Перечеркивающая линия (для восьмой ноты)
        ctx.beginPath();
        ctx.moveTo(size * 0.15, -size * 0.6);
        ctx.lineTo(size * 0.65, -size * 0.2);
        ctx.stroke();
    }
}

// Запускаем когда страница загружена
document.addEventListener('DOMContentLoaded', function() {
    new MusicNoteTracker();
});