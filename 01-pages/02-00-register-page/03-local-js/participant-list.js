// ไฟล์: 03-local-js/participant-list.js

let allData = [];       // ตัวแปรเก็บข้อมูลทั้งหมด
let currentPage = 1;    // หน้าปัจจุบัน
const rowsPerPage = 10; // จำนวนแถวต่อหน้า

document.addEventListener("DOMContentLoaded", () => {
    // ตรวจสอบ URL ให้ถูกต้องตามโฟลเดอร์โปรเจกต์ของคุณ
    fetch('/G8_OurFestival/get_users.php') 
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            allData = data; // เก็บข้อมูลทั้งหมดลงตัวแปร
            renderTable(currentPage); // เรียกฟังก์ชันแสดงผลหน้าแรก
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('table-body').innerHTML = 
                `<tr><td colspan="7" class="text-danger text-center p-3">โหลดข้อมูลไม่สำเร็จ: ${error.message}</td></tr>`;
        });
});

// ฟังก์ชันสำหรับวาดตารางตามหน้า
function renderTable(page) {
    const tbody = document.getElementById('table-body');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const pageInfo = document.getElementById('page-info');

    tbody.innerHTML = ''; // ล้างข้อมูลเก่า

    if (allData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted p-3">ไม่พบข้อมูล</td></tr>`;
        pageInfo.innerText = "หน้าที่ 0 / 0";
        return;
    }

    // คำนวณจุดเริ่มต้นและจุดสิ้นสุดของข้อมูลในหน้านั้น
    // เช่น หน้า 1: start=0, end=10
    // เช่น หน้า 2: start=10, end=20
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedItems = allData.slice(start, end); // ตัดข้อมูลมาเฉพาะส่วนที่ต้องการ

    // วนลูปแสดงผล (ใช้ index เริ่มต้นตาม start เพื่อให้เลขลำดับถูกต้อง)
    let i = start + 1; 
    paginatedItems.forEach(user => {
        
        // จัดการสี Badge
        let badgeClass = 'bg-secondary';
        let genderLabel = user.gender;
        if (user.gender === 'male') { badgeClass = 'bg-primary'; genderLabel = 'ชาย'; }
        else if (user.gender === 'female') { badgeClass = 'bg-danger'; genderLabel = 'หญิง'; }
        else { badgeClass = 'bg-warning text-dark'; genderLabel = 'ไม่ระบุ'; }

        const row = `
            <tr>
                <td>${i++}</td>
                <td class="text-start">${user.firstname} ${user.surname}</td>
                <td>${user.tel}</td>
                <td class="text-start">${user.email}</td>
                <td>${user.age}</td>
                <td><span class="badge ${badgeClass}">${genderLabel}</span></td>
                <td>${user.created_at}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });

    // จัดการปุ่มกด
    const totalPages = Math.ceil(allData.length / rowsPerPage);
    pageInfo.innerText = `หน้าที่ ${currentPage} / ${totalPages} (ทั้งหมด ${allData.length} คน)`;

    // ปิดปุ่มถ้าอยู่หน้าแรกหรือหน้าสุดท้าย
    if (page === 1) {
        btnPrev.parentElement.classList.add('disabled');
        btnPrev.disabled = true;
    } else {
        btnPrev.parentElement.classList.remove('disabled');
        btnPrev.disabled = false;
    }

    if (page === totalPages) {
        btnNext.parentElement.classList.add('disabled');
        btnNext.disabled = true;
    } else {
        btnNext.parentElement.classList.remove('disabled');
        btnNext.disabled = false;
    }
}

// ฟังก์ชันกดปุ่มก่อนหน้า
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable(currentPage);
    }
}

// ฟังก์ชันกดปุ่มถัดไป
function nextPage() {
    const totalPages = Math.ceil(allData.length / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderTable(currentPage);
    }
}