// main.js

document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.star');
    const starsValue = document.getElementById('starsValue');
    const starError = document.getElementById('starError');
    const form = document.getElementById('feedbackForm');

    function setStars(val) {
        stars.forEach(s => {
            const v = parseInt(s.getAttribute('data-value'), 10);
            if (v <= val) s.classList.add('gold');
            else s.classList.remove('gold');
            s.setAttribute('aria-checked', v === val ? 'true' : 'false');
        });
        starsValue.value = val;
        if (val) starError.style.display = 'none';
    }

    stars.forEach(star => {
        star.addEventListener('click', () => {
            const val = parseInt(star.getAttribute('data-value'), 10);
            setStars(val);
        });

        // keyboard accessibility: space or enter to select
        star.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const val = parseInt(star.getAttribute('data-value'), 10);
                setStars(val);
            }
            // arrow keys to navigate
            if (e.key === 'ArrowLeft') {
                const prev = Math.max(1, Math.min(5, parseInt(star.getAttribute('data-value'),10) - 1));
                setStars(prev);
                document.querySelector(`.star[data-value="${prev}"]`).focus();
            }
            if (e.key === 'ArrowRight') {
                const next = Math.min(5, parseInt(star.getAttribute('data-value'),10) + 1);
                setStars(next);
                document.querySelector(`.star[data-value="${next}"]`).focus();
            }
        });

        // hover preview (visual only)
        star.addEventListener('mouseover', () => {
            const v = parseInt(star.getAttribute('data-value'), 10);
            stars.forEach(s => {
                const vv = parseInt(s.getAttribute('data-value'), 10);
                if (vv <= v) s.classList.add('gold');
                else s.classList.remove('gold');
            });
        });
    });

    // when mouse leaves the star container, restore to selected value
    const starContainer = document.getElementById('starContainer');
    starContainer.addEventListener('mouseleave', () => {
        const val = parseInt(starsValue.value, 10) || 0;
        setStars(val);
    });

    // simple form validation before submit
    form.addEventListener('submit', (e) => {
        let valid = true;
        if (!starsValue.value) {
            starError.style.display = 'block';
            valid = false;
        }
        const message = document.getElementById('message');
        if (!message.value.trim()) {
            message.classList.add('is-invalid');
            valid = false;
        } else {
            message.classList.remove('is-invalid');
        }

        if (!valid) {
            e.preventDefault();
            e.stopPropagation();
        }
    });
});
