document.addEventListener('DOMContentLoaded', function() {
    const modal = document.querySelector('.citation-modal');
    const btn = document.querySelector('.citation-btn');
    const span = document.querySelector('.citation-close');
    const copyBtn = document.querySelector('.citation-copy-btn');
    const citationText = document.querySelector('.citation-text').textContent;

    if (btn) {
        btn.onclick = function() {
            modal.style.display = 'flex';
        }
    }

    if (span) {
        span.onclick = function() {
            modal.style.display = 'none';
        }
    }

    window.onclick = function(event) {
        if (event.target.classList.contains('citation-modal')) {
            event.target.style.display = 'none';
        }
    }

    if (copyBtn) {
        copyBtn.onclick = function() {
            navigator.clipboard.writeText(citationText).then(function() {
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Скопировано!';
                copyBtn.style.background = '#4CAF50';
                
                setTimeout(function() {
                    copyBtn.innerHTML = originalText;
                    copyBtn.style.background = '';
                }, 2000);
            });
        }
    }
});