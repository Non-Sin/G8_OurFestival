<?php
// submit.php
date_default_timezone_set('Asia/Bangkok');

// รับค่าและ sanitize
$stars_raw = filter_input(INPUT_POST, 'stars', FILTER_SANITIZE_NUMBER_INT);
$message_raw = filter_input(INPUT_POST, 'message', FILTER_UNSAFE_RAW);

$stars = intval($stars_raw);
if ($stars < 1) $stars = 1;
if ($stars > 5) $stars = 5;

$message = trim($message_raw);
if ($message === '') {
    $message = '(ไม่มีข้อความ)';
}

// ปรับข้อมูลที่จะบันทึก
$entry = [
    'stars' => $stars,
    'message' => htmlspecialchars($message, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'),
    'time' => date('Y-m-d H:i:s')
];

$jsonFile = __DIR__ . '/feedback.json';

// โหลดข้อมูลเก่า
$old = [];
if (file_exists($jsonFile)) {
    $contents = file_get_contents($jsonFile);
    $decoded = json_decode($contents, true);
    if (is_array($decoded)) $old = $decoded;
}

// append และบันทึก
$old[] = $entry;
file_put_contents($jsonFile, json_encode($old, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);
?>
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title class="text-center mb-3">ส่งสำเร็จแล้ว</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- CSS หลัก -->
    <link rel="stylesheet" href="../../11-resources/02-cs/02-02-booth-directory-css/booth-directory-css.css">
    <link rel="stylesheet" href="../03-00-feedback-page/02-local-css/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Share+Tech&display=swap" rel="stylesheet">

    <style>
        .result-card {
            max-width: 420px;
            width: 90%;
            margin: 8vh auto;
            padding: 28px;
            border-radius: 14px;
            background: #fff;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            text-align: center;
        }

        /* ปรับ footer ให้ responsive */
        @media (max-width: 768px) {
            .box-item {
                flex-direction: column;
                text-align: center;
            }
            .menu-footer ul {
                padding-left: 0;
            }
        }
    </style>
</head>
<body>

<header class="header">
    <span class="header-name">G8_Ourfestival</span>

    <!-- Desktop Menu -->
    <nav class="nav-container">
        <ul>
            <li><a href="../../index.html">HOME</a></li>
            <li><a href="../01-00-booth-directory/booth-directory.html">BOOTHDIRECTORY</a></li>
            <li><a href="../02-00-register-page/register-page.html">REGISTER</a></li>
            <li><a href="../03-00-feedback-page/feedback-page.html">FEEDBACK</a></li>
            <li><a href="#contact">CONTACT</a></li>
        </ul>
    </nav>

    <!-- Mobile Menu -->
    <div class="mobile-menu-container">
        <button class="mobile-menu-btn">
            Menu <span class="arrow">▼</span>
        </button>

        <ul class="mobile-menu">
            <li><a href="../../index.html">HOME</a></li>
            <li><a href="../01-00-booth-directory/booth-directory.html">BOOTHDIRECTORY</a></li>
            <li><a href="../02-00-register-page/register-page.html">REGISTER</a></li>
            <li><a href="../03-00-feedback-page/feedback-page.html">FEEDBACK</a></li>
            <li><a href="#contact">CONTACT</a></li>
        </ul>
    </div>
</header>

<div class="result-card">
    <h3 class="text-success">ส่งสำเร็จแล้ว 🎉</h3>
    <p class="mb-3">ขอบคุณสำหรับความคิดเห็นของคุณ</p>

    <div class="d-flex justify-content-center gap-2 flex-wrap">
        <a href="view.html" class="btn btn-primary">ดูความคิดเห็นทั้งหมด</a>
        <a href="feedback-page.html" class="btn btn-outline-secondary">ส่งเพิ่มเติม</a>
    </div>
</div>

<footer class="footer-bottom" id="contact">
    <div class="box-cont">
        <div class="box-item">
            <div>
                <h1>CARNIVAL</h1><br>
                <p class="footer-cont">
                    เว็บไซต์นี้ถูกสร้างขึ้นภายใต้แนวคิด “Carnival of Joy”
                    เพื่อถ่ายทอดความรื่นเริงและพลังแห่งความสุข...
                </p>
                <br><hr style="border: none; height: 2px; background-color: white;">
            </div>

            <div class="menu-footer">
                <ul>
                    <li><a href="../../index.html">HOME</a></li>
                    <li><a href="../01-00-booth-directory/booth-directory.html">BOOTHDIRECTORY</a></li>
                    <li><a href="../02-00-register-page/register-page.html">REGISTER</a></li>
                    <li><a href="../03-00-feedback-page/feedback-page.html">FEEDBACK</a></li>
                    <li><a href="#contact">CONTACT</a></li>
                </ul>
            </div>

            <div>
                <span>Copyright © 2025 G8_OurFestival. All rights reserved</span>
            </div>
        </div>
    </div>
</footer>

<script src="../../11-resources/03-js/03-02-booth-directory-js/booth-directory.js"></script>

</body>
</html>