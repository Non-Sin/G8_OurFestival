<?php
// register_save.php

// 1. ตั้งค่าการเชื่อมต่อ Database (สำหรับ XAMPP)
$servername = "localhost";
$username = "root";
$password = "";     // XAMPP ปกติไม่มีรหัสผ่าน
$dbname = "carnival_db";

// สร้างการเชื่อมต่อ
$conn = new mysqli($servername, $username, $password, $dbname);

// เช็คว่าเชื่อมต่อได้ไหม
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 2. ตั้งค่าให้รองรับภาษาไทย
$conn->set_charset("utf8");

// 3. ตรวจสอบว่ามีการกด Submit มาจริงหรือไม่ (ป้องกัน Error ตัวแดง)
if (isset($_POST['firstname'])) {
    
    // รับค่าจากฟอร์ม (ตรงกับ name="..." ใน HTML)
    $firstname = $_POST['firstname'];
    $surname = $_POST['surname'];
    $tel = $_POST['telnum'];  // ใน HTML ชื่อ telnum
    $email = $_POST['email'];
    $age = $_POST['age'];
    $gender = $_POST['gender'];

    // 4. เตรียมคำสั่ง SQL (ใช้ Prepared Statement ป้องกัน SQL Injection)
    $stmt = $conn->prepare("INSERT INTO participants (firstname, surname, tel, email, age, gender) VALUES (?, ?, ?, ?, ?, ?)");
    
    // กำหนดประเภทตัวแปร: s=string, i=integer
    // เรียงลำดับ: firstname(s), surname(s), tel(s), email(s), age(i), gender(s)
    $stmt->bind_param("ssssis", $firstname, $surname, $tel, $email, $age, $gender);

    // 5. สั่งรันคำสั่ง SQL
    if ($stmt->execute()) {
        // ถ้าสำเร็จ ให้เด้งไปหน้ารายชื่อ
        echo "<script>
                alert('ลงทะเบียนสำเร็จ!'); 
                window.location.href='participant-list.php';
              </script>";
    } else {
        echo "เกิดข้อผิดพลาด: " . $stmt->error;
    }

    $stmt->close();
} else {
    // ถ้าเข้ามาโดยไม่ได้กด Submit
    echo "<center><h3>คุณเข้ามาผิดทาง กรุณากรอกข้อมูลจากหน้าลงทะเบียน</h3>";
    echo "<a href='register-page-customer.html'>กลับไปหน้าลงทะเบียน</a></center>";
}

$conn->close();
?>