// รอให้หน้าเว็บโหลดเสร็จก่อน
document.addEventListener('DOMContentLoaded', () => {

    // เลือกปุ่มแท็บทั้งหมด และการ์ดเมนูทั้งหมด
    const tabLinks = document.querySelectorAll('.tab-link');
    const boothCards = document.querySelectorAll('.booth-card');

    // เพิ่ม Event Listener ให้ทุกปุ่ม
    tabLinks.forEach(tab => {
        tab.addEventListener('click', () => {
            tabLinks.forEach(link => link.classList.remove('active'));
            
            tab.classList.add('active');
            
            const filter = tab.dataset.tab;

            boothCards.forEach(card => {
                // ดึงค่า data-category 
                const category = card.dataset.category;
                // ตรวจสอบเงื่อนไข
                if (filter === 'all' || filter === category) {
                     
                    card.classList.remove('hide');
                } else {
                     
                    card.classList.add('hide');
                }
            });
        });
    });

});

document.addEventListener("DOMContentLoaded", function() {
    // หา input ทั้งหมดที่ type number
    const qtyInputs = document.querySelectorAll('input[type="number"]');

    qtyInputs.forEach(input => {
        input.value = 0; // เริ่มต้น 0

        const parent = input.parentElement;

        const btnIncrease = parent.querySelector('button#increase');
        const btnDecrease = parent.querySelector('button#decrease');

        if (!btnIncrease || !btnDecrease) return;

        btnIncrease.addEventListener("click", () => {
            input.value = parseInt(input.value) + 1;
        });

        btnDecrease.addEventListener("click", () => {
            if (parseInt(input.value) > 0) {
                input.value = parseInt(input.value) - 1;
            }
        });
    });
});

const toggle = document.querySelector("header .menu-toggle");
const menu = document.querySelector("header .nav-menu");

toggle.addEventListener("click", () => menu.classList.toggle("active"));
