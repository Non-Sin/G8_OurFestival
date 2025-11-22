<?php
// get_user.php
header('Content-Type: application/json');

// การเชื่อมต่อฐานข้อมูล
// หมายเหตุ: สำหรับเครื่อง localhost ทั่วไป user='root', password=''
$conn = new mysqli("localhost", "root", "", "carnival_db");
$conn->set_charset("utf8");

if ($conn->connect_error) {
    // ส่ง JSON error กลับไปเพื่อให้ JS รับรู้
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// ดึงข้อมูล
$sql = "SELECT * FROM participants ORDER BY id DESC";
$result = $conn->query($sql);

$data = array();
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data); // ส่งค่ากลับเป็น JSON
$conn->close();
?>