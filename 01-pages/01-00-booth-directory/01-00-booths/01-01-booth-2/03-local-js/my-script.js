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


  // ให้รูปเป็นปุ่มคลิก
  document.querySelectorAll('.booth-card .booth-shelf img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      const card  = img.closest('.booth-card');
      const title = card.querySelector('.booth-title')?.textContent.trim() || '';
      const desc  = card.querySelector('.booth-desc')?.textContent.trim()  || '';
      const src   = img.getAttribute('src') || '';

      const q = new URLSearchParams({
        title, desc, img: src
      }).toString();

      location.href = `product.html?${q}`;
    });
  });



    const navToggle = document.querySelector('.nav-toggle');
    const navContainer = document.querySelector('.nav-container');

    navToggle.addEventListener('click', () => {
        navContainer.classList.toggle('open');
    });




