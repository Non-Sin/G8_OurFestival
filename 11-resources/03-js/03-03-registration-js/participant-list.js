// ไฟล์: participant-list.js

let allData = [];       // เก็บข้อมูลทั้งหมด
let currentPage = 1;    // หน้าปัจจุบัน
const rowsPerPage = 10; // จำนวนแถวต่อหน้า

document.addEventListener("DOMContentLoaded", () => {
    // 1. ผูก Event Listener ให้ปุ่ม (แทนการใช้ onclick ใน HTML)
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    if (btnPrev) btnPrev.addEventListener('click', prevPage);
    if (btnNext) btnNext.addEventListener('click', nextPage);

    // 2. ดึงข้อมูลจาก PHP
    // เช็ค path ให้ดี: ถ้าไฟล์ php อยู่ folder เดียวกับ index.html ให้ใช้แค่ชื่อไฟล์
    fetch('get_user.php') 
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            allData = data; 
            renderTable(currentPage); 
        })
        .catch(error => {
            console.error('Error:', error);
            const tbody = document.getElementById('table-body');
            if(tbody) {
                tbody.innerHTML = `<tr><td colspan="7" style="color:red; text-align:center; padding:20px;">โหลดข้อมูลไม่สำเร็จ: ${error.message}</td></tr>`;
            }
        });
});

function renderTable(page) {
    const tbody = document.getElementById('table-body');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const pageInfo = document.getElementById('page-info');

    if (!tbody || !btnPrev || !btnNext || !pageInfo) return;

    tbody.innerHTML = ''; 

    if (allData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:20px; color:#999;">ไม่พบข้อมูลผู้ลงทะเบียน</td></tr>`;
        pageInfo.innerText = "0 / 0";
        btnPrev.disabled = true;
        btnNext.disabled = true;
        return;
    }

    // คำนวณ Pagination
    const totalPages = Math.ceil(allData.length / rowsPerPage);
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedItems = allData.slice(start, end);

    // แสดงผล
    let i = start + 1; 
    paginatedItems.forEach(user => {
        // เช็คเพศเพื่อเลือกสี Badge
        let badgeClass = 'bg-secondary';
        let genderLabel = user.gender;

        if (user.gender === 'male' || user.gender === 'ชาย') { 
            badgeClass = 'bg-primary'; 
            genderLabel = 'ชาย'; 
        } else if (user.gender === 'female' || user.gender === 'หญิง') { 
            badgeClass = 'bg-danger'; 
            genderLabel = 'หญิง'; 
        } else {
            genderLabel = user.gender || 'ไม่ระบุ';
        }

        const row = `
            <tr>
                <td>${i++}</td>
                <td style="text-align:left;">${user.firstname} ${user.surname}</td>
                <td>${user.tel}</td>
                <td style="text-align:left;">${user.email}</td>
                <td>${user.age}</td>
                <td><span class="badge ${badgeClass}">${genderLabel}</span></td>
                <td>${user.created_at}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });

    // อัปเดตข้อความเลขหน้า
    pageInfo.innerText = `หน้าที่ ${currentPage} / ${totalPages} (รวม ${allData.length} คน)`;

    // ควบคุมปุ่ม
    btnPrev.disabled = (page === 1);
    btnNext.disabled = (page === totalPages);
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable(currentPage);
    }
}

function nextPage() {
    const totalPages = Math.ceil(allData.length / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderTable(currentPage);
    }
}