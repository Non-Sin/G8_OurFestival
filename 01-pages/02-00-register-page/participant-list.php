<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Participant List - CARNIVAL</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://kit.fontawesome.com/f5aa32d4bf.js" crossorigin="anonymous"></script>

    <link rel="stylesheet" href="02-local-css/regis-style.css"> 

    <style>
        /* CSS เพิ่มเติมเฉพาะหน้านี้ เพื่อให้ตารางสวยงาม */
        body {
            background-color: #0f172a; /* สีพื้นหลังเดียวกับหน้า Register */
        }
        .table-box {
            width: 100%;
            max-width: 1100px;
            background: #ffffff;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            margin: 50px auto; /* จัดกึ่งกลาง */
        }
        .header-title {
            color: #e60000;
            text-align: center;
            font-weight: bold;
            margin-bottom: 30px;
        }
        .table thead {
            background-color: #e60000;
            color: white;
        }
        .badge-gender {
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 14px;
        }
        .male { background-color: #3b82f6; color: white; }   /* สีน้ำเงิน */
        .female { background-color: #ec4899; color: white; } /* สีชมพู */
        .other { background-color: #a855f7; color: white; }  /* สีม่วง */
    </style>
</head>
<body>


    <div class="container">
        <div class="table-box">
            <h2 class="header-title">รายชื่อผู้เข้าร่วมงาน (Participants)</h2>
            
            <div class="table-responsive">
                <table class="table table-hover table-bordered text-center">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ชื่อ-นามสกุล</th>
                            <th>เบอร์โทร</th>
                            <th>อีเมล</th>
                            <th>อายุ</th>
                            <th>เพศ</th>
                            <th>เวลาที่ลงทะเบียน</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        // เชื่อมต่อ Database อีกครั้งในหน้านี้
                        $conn = new mysqli("localhost", "root", "", "carnival_db");
                        $conn->set_charset("utf8");

                        // ดึงข้อมูล เรียงจากใหม่ไปเก่า (DESC)
                        $sql = "SELECT * FROM participants ORDER BY id DESC";
                        $result = $conn->query($sql);

                        if ($result->num_rows > 0) {
                            $i = 1;
                            while($row = $result->fetch_assoc()) {
                                // เช็คเพศเพื่อเลือกสี Badge
                                $genderClass = "other";
                                if($row['gender'] == 'male') $genderClass = "male";
                                if($row['gender'] == 'female') $genderClass = "female";

                                echo "<tr>";
                                echo "<td>" . $i++ . "</td>";
                                echo "<td class='text-start'>" . $row['firstname'] . " " . $row['surname'] . "</td>";
                                echo "<td>" . $row['tel'] . "</td>";
                                echo "<td class='text-start'>" . $row['email'] . "</td>";
                                echo "<td>" . $row['age'] . "</td>";
                                echo "<td><span class='badge badge-gender $genderClass'>" . ucfirst($row['gender']) . "</span></td>";
                                echo "<td>" . $row['created_at'] . "</td>";
                                echo "</tr>";
                            }
                        } else {
                            echo "<tr><td colspan='7' class='text-muted p-4'>ยังไม่มีข้อมูลผู้ลงทะเบียน</td></tr>";
                        }
                        $conn->close();
                        ?>
                    </tbody>
                </table>
            </div>

            <div class="mt-4 text-center">
                <a href="register-page-customer.html" class="btn btn-outline-danger rounded-pill px-4">
                    <i class="fa-solid fa-arrow-left"></i> กลับหน้าลงทะเบียน
                </a>
            </div>

        </div>
    </div>

</body>
</html>