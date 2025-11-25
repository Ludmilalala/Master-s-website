// particles-config.js
const particlesConfig = {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#ffffff"
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 0.5,
            random: true,
        },
        size: {
            value: 3,
            random: true,
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
};

// Функция для инициализации частиц
function initParticles() {
    if (window.tsParticles && document.getElementById('tsparticles')) {
        window.tsParticles.load('tsparticles', particlesConfig);
    }
}

// Альтернативная функция для случаев, когда tsparticles загружается асинхронно
function initParticlesWithRetry(maxRetries = 10, interval = 100) {
    let retries = 0;
    
    const tryInit = () => {
        if (window.tsParticles) {
            initParticles();
        } else if (retries < maxRetries) {
            retries++;
            setTimeout(tryInit, interval);
        } else {
            console.warn('Particles library not loaded after maximum retries');
        }
    };
    
    tryInit();
}

// Экспорт для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { particlesConfig, initParticles, initParticlesWithRetry };
}