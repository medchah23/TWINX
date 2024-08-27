<?php
header('Content-Type: application/json');

$host = 'localhost';
$dbUsername = 'root';
$dbPassword = '';
$dbName = 'twinx';

$conn = mysqli_connect($host, $dbUsername, $dbPassword, $dbName);

if (!$conn) {
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// First query: Get total sales and total orders
$req = "SELECT SUM(total_amount) as total_sales, COUNT(id) as total_orders FROM orders WHERE status='delivered'";
$result = mysqli_query($conn, $req);

if ($result && $row = mysqli_fetch_assoc($result)) {
    $response = [
        'total_sales' => number_format($row['total_sales'], 2),  // Formatting to 2 decimal places
        'total_orders' => $row['total_orders']
    ];

    // Second query: Get the count of active users
    $req1 = "SELECT COUNT(id) as user_active FROM users";
    $result1 = mysqli_query($conn, $req1);

    if ($result1 && $row1 = mysqli_fetch_assoc($result1)) {
        $response['user_active'] = $row1['user_active'];
    }
    $req2=" SELECT "
    echo json_encode($response);
} else {
    echo json_encode(['error' => 'Data retrieval failed']);
}

mysqli_close($conn);
?>
