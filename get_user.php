<?php
// get_user.php (ฉบับแก้ไขสำหรับ MySQL)
header('Content-Type: application/json; charset=utf-8');

// เชื่อมต่อ Database (Copy ส่วนนี้ไปหรือ include ไฟล์ db_connect.php ก็ได้)
$servername = "localhost";
$username = "carnival_admin"; // ต้องตรงกับที่สร้างใน MySQL
$password = "6809617209";  // ต้องตรงกับที่สร้างใน MySQL
$dbname = "carnival_db";

$conn = new mysqli($servername, $username, $password, $dbname);
$conn->set_charset("utf8");

if ($conn->connect_error) {
    // ส่ง Error กลับเป็น JSON ให้ JS รู้เรื่อง
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

try {
    // คำสั่ง SQL สำหรับ MySQL
    $sql = "SELECT * FROM participants ORDER BY id DESC";
    $result = $conn->query($sql);
    
    $data = [];
    if ($result && $result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }
    
    echo json_encode($data);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}

$conn->close();
?>