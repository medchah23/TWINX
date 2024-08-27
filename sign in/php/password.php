    .<?php
header('Content-Type: application/json');
require __DIR__ . '/vendor/autoload.php';
$host = 'localhost';
$dbUsername = 'root';
$dbPassword = '';
$dbName = 'twinx';

$conn = mysqli_connect($host, $dbUsername, $dbPassword, $dbName);

if (!$conn) {
    error_log("Database connection failed: " . mysqli_connect_error(), 3, 'error_log.txt');
    die(json_encode(array('status' => 'error', 'message' => 'Database connection failed: ' . mysqli_connect_error())));
}

$input = json_decode(file_get_contents('php://input'), true);

$response = array('status' => 'error', 'message' => 'Invalid request');

if (isset($input['email'], $input['securityQuestion'], $input['securityAnswer'])) {
    $email = $input['email'];
    $securityQuestion = $input['securityQuestion'];
    $securityAnswer = $input['securityAnswer'];

    $query = "SELECT email, first_name FROM users WHERE email = '$email' AND security_question = '$securityQuestion' AND security_answer = '$securityAnswer'";
    $result = mysqli_query($conn, $query);

    if ($result) {
        if (mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            $firstName = $row['first_name'];

            $otp = mt_rand(100000, 999999);

            $otpHash = password_hash($otp, PASSWORD_DEFAULT);
            $otpExpiration = date('Y-m-d H:i:s', strtotime('+15 minutes'));
            $updateQuery = "UPDATE users SET reset_token_hash = '$otpHash', reset_token_expire_at = '$otpExpiration' WHERE email = '$email'";
            $updateResult = mysqli_query($conn, $updateQuery);

            if ($updateResult) {

            }
            } else {
                $error_message = 'Failed to update OTP in the database.';
                error_log($error_message . "\n", 3, 'error_log.txt');
                $response['status'] = 'error';
                $response['message'] = $error_message;
            }
        } else {
            $error_message = 'Invalid security answer or email not found.';
            error_log($error_message . "\n", 3, 'error_log.txt');
            $response['status'] = 'error';
            $response['message'] = $error_message;
        }
    } else {
        $error_message = 'Query execution failed: ' . mysqli_error($conn);
        error_log($error_message . "\n", 3, 'error_log.txt');
        $response['status'] = 'error';
        $response['message'] = $error_message;
    }


mysqli_close($conn);
echo json_encode($response);
?>
