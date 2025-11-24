<?php

header('Content-Type: application/json; charset=utf-8');

// เชื่อมต่อ Database 
$servername = "localhost";
$username = "carnival_admin"; 
$password = "6809617209";  
$dbname = "carnival_db";

$conn = new mysqli($servername, $username, $password, $dbname);
$conn->set_charset("utf8");

if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

try {
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