// Инициализация при загрузке документа
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт загружен!');
    
    // Инициализация модальных окон для изображений
    initImageModals();
    
    // Инициализация плавной прокрутки
    initSmoothScrolling();
    
    // Инициализация подсветки текущего раздела
    initCurrentSectionHighlight();
});

// Модальные окна для изображений
function initImageModals() {
    const images = document.querySelectorAll('img[data-modal]');
    
    images.forEach(img => {
        img.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                cursor: pointer;
            `;
            
            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            modalImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 10px;
                box-shadow: 0 0 30px rgba(0,0,0,0.5);
            `;
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            modal.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
        });
    });
}

// Плавная прокрутка
function initSmoothScrolling() {
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
}

// Подсветка текущего раздела
function initCurrentSectionHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.menu-button');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('current');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('current');
                    }
                });
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => observer.observe(section));
}

// Функция для копирования email
function copyEmail() {
    const email = 'elli200314@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        alert('Email скопирован в буфер обмена: ' + email);
    }).catch(err => {
        console.error('Ошибка копирования: ', err);
    });
}

// Анимация видеокнопки 
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация GSAP анимаций
    if (typeof TweenMax !== 'undefined') {
        TweenMax.set(".play-circle-01", {
            rotation: 90,
            transformOrigin: "center"
        });

        TweenMax.set(".play-circle-02", {
            rotation: -90,
            transformOrigin: "center"
        });

        TweenMax.set(".play-perspective", {
            xPercent: 6.5,
            scale: .175,
            transformOrigin: "center",
            perspective: 1
        });

        TweenMax.set(".play-video", {
            visibility: "hidden",
            opacity: 0,
        });

        TweenMax.set(".play-triangle", {
            transformOrigin: "left center",
            transformStyle: "preserve-3d",
            rotationY: 10,
            scaleX: 2
        });

        const rotateTL = new TimelineMax({ paused: true })
            .to(".play-circle-01", .7, {
                opacity: .1,
                rotation: '+=360',
                strokeDasharray: "456 456",
                ease: Power1.easeInOut
            }, 0)
            .to(".play-circle-02", .7, {
                opacity: .1,
                rotation: '-=360',
                strokeDasharray: "411 411",
                ease: Power1.easeInOut
            }, 0);

        const openTL = new TimelineMax({ paused: true })
            .to(".play-backdrop", 1, {
                opacity: .95,
                visibility: "visible",
                ease: Power2.easeInOut
            }, 0)
            .to(".play-close", 1, {
                opacity: 1,
                ease: Power2.easeInOut
            }, 0)
            .to(".play-perspective", 1, {
                xPercent: 0,
                scale: 1,
                ease: Power2.easeInOut
            }, 0)
            .to(".play-triangle", 1, {
                scaleX: 1,
                ease: ExpoScaleEase.config(2, 1, Power2.easeInOut)
            }, 0)
            .to(".play-triangle", 1, {
                rotationY: 0,
                ease: ExpoScaleEase.config(10, .01, Power2.easeInOut)
            }, 0)
            .to(".play-video", 1, {
                visibility: "visible",
                opacity: 1
            }, .5);

        const button = document.querySelector(".play-button");
        const backdrop = document.querySelector(".play-backdrop");
        const close = document.querySelector(".play-close");
        const video = document.querySelector(".play-video video");

        if (button) {
            button.addEventListener("mouseover", () => rotateTL.play());
            button.addEventListener("mouseleave", () => rotateTL.reverse());
            button.addEventListener("click", () => {
                openTL.play();
                if (video) video.play();
            });
        }

        if (backdrop) {
            backdrop.addEventListener("click", () => {
                openTL.reverse();
                if (video) video.pause();
            });
        }

        if (close) {
            close.addEventListener("click", e => {
                e.stopPropagation();
                openTL.reverse();
                if (video) video.pause();
            });
        }

        // Закрытие по ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                openTL.reverse();
                if (video) video.pause();
            }
        });
    }
});

