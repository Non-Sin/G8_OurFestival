document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector("header .menu-toggle");
    const menu = document.querySelector("header .nav-menu");

    toggle.addEventListener("click", () => menu.classList.toggle("active"));

    const container = document.getElementById('feedbackList');

    function fetchAndRender() {
        fetch('feedback.json', { cache: 'no-store' })
            .then(resp => {
                if (!resp.ok) throw new Error('ไม่สามารถโหลดข้อมูลได้');
                return resp.json();
            })
            .then(data => {
                container.innerHTML = '';

                if (!Array.isArray(data) || data.length === 0) {
                    container.innerHTML = '<div class="text-center mt-4">"ยังไม่มีความคิดเห็น"</div>';
                    return;
                }

                data.slice().reverse().forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'card shadow-sm';
                    card.style.maxWidth = '720px';
                    card.style.width = '100%';

                    card.innerHTML = `
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>${'⭐'.repeat(item.stars)}</div>
                                <small class="text-muted">${item.time}</small>
                            </div>
                            <p class="mt-3 mb-1">${item.message}</p>
                        </div>
                    `;
                    container.appendChild(card);
                });
            })
            .catch(err => console.error(err));
    }

    fetchAndRender();
});
