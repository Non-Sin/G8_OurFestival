<?php
// get_user.php
header('Content-Type: application/json; charset=utf-8');

try {
    $db = new SQLite3('carnival.db');
    
    $db->exec("CREATE TABLE IF NOT EXISTS participants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname TEXT,
        surname TEXT,
        tel TEXT,
        email TEXT,
        age INTEGER,
        gender TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    $count = $db->querySingle("SELECT COUNT(*) FROM participants");
    if ($count == 0) {
        $db->exec("INSERT INTO participants (firstname, surname, tel, email, age, gender) 
                   VALUES ('Tester', 'System', '000-000-0000', 'test@sqlite.com', 99, 'male')");
    }

    // 3. ดึงข้อมูล
    $results = $db->query("SELECT * FROM participants ORDER BY id DESC");
    
    $data = [];
    while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
        $data[] = $row;
    }
    
    echo json_encode($data);
    $db->close();

} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>