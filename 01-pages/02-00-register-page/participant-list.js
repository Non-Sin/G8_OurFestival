// ไฟล์: participant-list.js

let allData = [];       // ตัวแปรเก็บข้อมูลทั้งหมด
let currentPage = 1;    // หน้าปัจจุบัน
const rowsPerPage = 10; // จำนวนแถวต่อหน้า

document.addEventListener("DOMContentLoaded", () => {
    // หมายเหตุ: ถ้าไฟล์ js อยู่ในโฟลเดอร์ย่อย (เช่น 03-local-js/) 
    // แต่ php อยู่ข้างนอก อาจต้องแก้เป็น fetch('../get_user.php')
    fetch('get_user.php') 
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
            const tbody = document.getElementById('table-body');
            if(tbody) {
                tbody.innerHTML = `<tr><td colspan="7" class="text-danger text-center p-3">โหลดข้อมูลไม่สำเร็จ: ${error.message}</td></tr>`;
            }
        });
});

// ฟังก์ชันสำหรับวาดตารางตามหน้า
function renderTable(page) {
    const tbody = document.getElementById('table-body');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const pageInfo = document.getElementById('page-info');

    // ป้องกัน Error กรณีหา Element ไม่เจอ
    if (!tbody || !btnPrev || !btnNext || !pageInfo) {
        console.error("หา Element ใน HTML ไม่เจอ กรุณาตรวจสอบ ID");
        return;
    }

    tbody.innerHTML = ''; // ล้างข้อมูลเก่า

    if (allData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted p-3">ไม่พบข้อมูล</td></tr>`;
        pageInfo.innerText = "หน้าที่ 0 / 0";
        btnPrev.parentElement.classList.add('disabled');
        btnNext.parentElement.classList.add('disabled');
        return;
    }

    // คำนวณ Pagination
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedItems = allData.slice(start, end);

    // แสดงผลข้อมูล
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

    // จัดการปุ่มกดและเลขหน้า
    const totalPages = Math.ceil(allData.length / rowsPerPage);
    pageInfo.innerText = `หน้าที่ ${currentPage} / ${totalPages} (ทั้งหมด ${allData.length} คน)`;

    // ควบคุมปุ่ม Previous
    if (page === 1) {
        btnPrev.parentElement.classList.add('disabled');
        btnPrev.disabled = true;
    } else {
        btnPrev.parentElement.classList.remove('disabled');
        btnPrev.disabled = false;
    }

    // ควบคุมปุ่ม Next
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