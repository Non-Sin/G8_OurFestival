<?php
include 'db_connect.php'; // เรียกใช้ไฟล์เชื่อมต่อ

if (isset($_POST['firstname'])) {
    $firstname = $_POST['firstname'];
    $surname = $_POST['surname'];
    $tel = $_POST['telnum'];
    $email = $_POST['email'];
    $age = $_POST['age'];
    $gender = $_POST['gender'];

    // Prepared Statement เพื่อความปลอดภัย
    $stmt = $conn->prepare("INSERT INTO participants (firstname, surname, tel, email, age, gender) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssis", $firstname, $surname, $tel, $email, $age, $gender);

    if ($stmt->execute()) {
        // แก้ path ให้กลับไปหน้าแรก หรือหน้าที่ต้องการแสดงผล
        echo "<script>
                alert('ลงทะเบียนสำเร็จ!'); 
                window.location.href='../../index.html'; 
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