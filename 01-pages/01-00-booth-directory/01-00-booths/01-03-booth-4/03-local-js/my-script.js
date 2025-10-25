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