<?php
header('Content-Type: application/json; charset=utf-8');
include 'db_connect.php'; // ใช้ไฟล์เชื่อมต่อเดียวกัน

try {
    // ดึงข้อมูลจาก MySQL
    $sql = "SELECT * FROM participants ORDER BY id DESC";
    $result = $conn->query($sql);
    
    $data = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }
    
    echo json_encode($data);

} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}

$conn->close();
?>