<?php
header('Content-Type: application/json');

$host = 'localhost';
$dbUsername = 'root';
$dbPassword = '';
$dbName = 'twinx';

// Create a connection
$conn = new mysqli($host, $dbUsername, $dbPassword, $dbName);

// Check connection
if ($conn->connect_error) {
    echo json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

$response = [];

// Function to fetch data
function fetchData($conn, $query) {
    $result = $conn->query($query);
    if ($result) {
        return $result->fetch_all(MYSQLI_ASSOC);
    } else {
        return [];
    }
}

try {
    // Total sales, orders, pending issues
    $query = "
        SELECT 
            SUM(total_amount) AS total_sales,
            COUNT(*) AS total_orders,
            SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) AS pending_issues
        FROM orders
    ";
    $result = $conn->query($query);
    if ($result) {
        $row = $result->fetch_assoc();
        $response['total_sales'] = number_format($row['total_sales'], 2);
        $response['total_orders'] = $row['total_orders'];
        $response['pending_issues'] = $row['pending_issues'];
    } else {
        $response['total_sales'] = '0.00';
        $response['total_orders'] = 0;
        $response['pending_issues'] = 0;
    }

    // Active users
    $result = $conn->query("SELECT COUNT(user_id) AS user_active FROM users");
    if ($result) {
        $row = $result->fetch_assoc();
        $response['user_active'] = $row['user_active'];
    } else {
        $response['user_active'] = 0;
    }

    // Sales and user growth over time
    $response['sales_over_time'] = fetchData($conn, "
        SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, SUM(total_amount) AS total_sales 
        FROM orders WHERE status = 'Delivered' 
        GROUP BY month ORDER BY month
    ");
    $response['user_growth'] = fetchData($conn, "
        SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, COUNT(user_id) AS total_user 
        FROM users GROUP BY month ORDER BY month
    ");

    // Order statuses over time
    $statuses = ['Delivered', 'Shipped', 'Pending', 'Cancelled'];
    foreach ($statuses as $status) {
        $response["Order_Status_$status"] = fetchData($conn, "
            SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, COUNT(order_id) AS total 
            FROM orders WHERE status = '$status' 
            GROUP BY month ORDER BY month
        ");
    }

    // Output response as JSON
    echo json_encode($response);
} catch (Exception $e) {
    echo json_encode(['error' => 'Query failed: ' . $e->getMessage()]);
}

// Close the connection
$conn->close();
?>
