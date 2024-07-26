<?php

header('Content-Type: application/json');

// Database connection
$connection = mysqli_connect("localhost", "root", "", "twinx");

if (!$connection) {
    echo json_encode(['status' => 'error', 'message' => 'Failed to connect to the database']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['email'], $input['securityQuestion'], $input['securityAnswer'])) {
    echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
    exit();
}

$email = $input['email'];
$securityQuestion = $input['securityQuestion'];
$securityAnswer = $input['securityAnswer'];

// Prepared statement for user email verification
$query = "SELECT * FROM users WHERE email = ?";
$stmt = mysqli_prepare($connection, $query);
mysqli_stmt_bind_param($stmt, "s", $email);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if (mysqli_num_rows($result) == 0) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid email']);
} else {
    // Prepared statement for security question and answer verification
    $query1 = "SELECT * FROM users WHERE security_question = ? AND security_answer = ? AND email = ?";
    $stmt1 = mysqli_prepare($connection, $query1);
    mysqli_stmt_bind_param($stmt1, "sss", $securityQuestion, $securityAnswer, $email);
    mysqli_stmt_execute($stmt1);
    $result1 = mysqli_stmt_get_result($stmt1);

    if (mysqli_num_rows($result1) == 0) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid security question or answer']);
    }else if(mysqli_num_rows($result1) == 1){
        echo json_encode(['status' => 'success', 'message' => 'Security question correct']);}}
mysqli_stmt_close($stmt);
mysqli_stmt_close($stmt1);
mysqli_close($connection);
?>
