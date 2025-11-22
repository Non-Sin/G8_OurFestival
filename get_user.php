<?php
// get_users.php
header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "", "carnival_db");
$conn->set_charset("utf8");

if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed"]);
    exit();
}

// ดึงข้อมูล
$sql = "SELECT * FROM participants ORDER BY id DESC";
$result = $conn->query($sql);

$data = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data); // ส่งค่ากลับเป็น JSON
$conn->close();
?>