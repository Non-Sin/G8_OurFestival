<?php
// register_save.php

// 1. แก้ไขการเชื่อมต่อ Database ให้ตรงกับ EC2
$servername = "localhost";
$username = "carnival_admin";  // แก้เป็น user ที่สร้างบน EC2
$password = "6809617209";   // แก้เป็นรหัสผ่านที่ตั้งบน EC2
$dbname = "carnival_db";

// สร้างการเชื่อมต่อ
$conn = new mysqli($servername, $username, $password, $dbname);

// เช็คว่าเชื่อมต่อได้ไหม
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$conn->set_charset("utf8");

if (isset($_POST['firstname'])) {
    
    $firstname = $_POST['firstname'];
    $surname = $_POST['surname'];
    $tel = $_POST['telnum'];
    $email = $_POST['email'];
    $age = $_POST['age'];
    $gender = $_POST['gender'];

    $stmt = $conn->prepare("INSERT INTO participants (firstname, surname, tel, email, age, gender) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssis", $firstname, $surname, $tel, $email, $age, $gender);

    if ($stmt->execute()) {
        // 2. แก้ไขจุด Redirect: เปลี่ยนจาก participant-list.php เป็น index.html (หรือหน้าที่ต้องการ)
        echo "<script>
                alert('ลงทะเบียนสำเร็จ!'); 
                window.location.href='participant-list.html'; 
              </script>";
    } else {
        echo "เกิดข้อผิดพลาด: " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "<center><h3>กรุณากรอกข้อมูลจากหน้าลงทะเบียน</h3></center>";
}

$conn->close();
?>