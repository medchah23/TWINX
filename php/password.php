<?php
header('Content-Type: application/json');

// Database connection details
$host = 'localhost';  // Change this if your MySQL server is on a different host
$dbUsername = 'root'; // Your MySQL username
$dbPassword = '';     // Your MySQL password
$dbName = 'twinx';    // Your MySQL database name

// Create a connection
$conn = mysqli_connect($host, $dbUsername, $dbPassword, $dbName);

// Check connection
if (!$conn) {
    die(json_encode(array('status' => 'error', 'message' => 'Database connection failed: ' . mysqli_connect_error())));
}

// Retrieve the JSON payload from the request body
$input = json_decode(file_get_contents('php://input'), true);

$response = array('status' => 'error', 'message' => 'Invalid request');

// Ensure email and security question are set
if (isset($input['email'], $input['securityQuestion'], $input['securityAnswer'])) {
    // Sanitize the inputs
    $email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);
    $securityQuestion = htmlspecialchars(trim($input['securityQuestion']));
    $securityAnswer = htmlspecialchars(trim($input['securityAnswer']));

    // Prepare the SQL query
    $query = "SELECT email FROM users WHERE email = ? AND security_question = ? AND security_answer = ?";
    $stmt = mysqli_prepare($conn, $query);

    if ($stmt) {
        // Bind parameters to the query
        mysqli_stmt_bind_param($stmt, "sss", $email, $securityQuestion, $securityAnswer);

        // Execute the query
        mysqli_stmt_execute($stmt);

        // Store the result
        mysqli_stmt_store_result($stmt);

        // Check if any rows are returned
        if (mysqli_stmt_num_rows($stmt) > 0) {
            $response['status'] = 'success';
            $response['message'] = 'Email sent successfully';

        } else {
            $response['status'] = 'error';
            $response['message'] = 'Invalid security answer';
        }

        // Close the statement
        mysqli_stmt_close($stmt);
    } else {
        $response['message'] = 'Query preparation failed';
    }
}

// Close the database connection
mysqli_close($conn);

// Send the JSON response
echo json_encode($response);
?>
