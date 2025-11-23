<?php
$servername = "localhost";
$username = "carnival_admin"; // user ที่สร้างใหม่
$password = "your_password";  // password ที่ตั้งไว้
$dbname = "carnival_db";

// สร้างการเชื่อมต่อ
$conn = new mysqli($servername, $username, $password, $dbname);
$conn->set_charset("utf8"); // รองรับภาษาไทย

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>