// js/image-modal.js
class ImageModal {
    constructor() {
        this.modal = null;
        this.init();
    }

    init() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-image')) {
                this.openModal(e.target.src, e.target.alt);
            }
        });
    }

    openModal(src, alt) {
        this.modal = document.createElement('div');
        this.modal.className = 'image-modal';
        this.modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <img src="${src}" alt="${alt}">
                <button class="modal-close">&times;</button>
            </div>
        `;

        document.body.appendChild(this.modal);
        this.addEventListeners();
    }

    addEventListeners() {
        this.modal.querySelector('.modal-overlay').addEventListener('click', () => this.closeModal());
        this.modal.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    }

    closeModal() {
        if (this.modal) {
            document.body.removeChild(this.modal);
            this.modal = null;
        }
    }
}

// Автоматическая инициализация
new ImageModal();