<?php
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

$email = $input['loginEmail'];
$password = $input['loginPassword'];

// Sanitize email to prevent SQL injection
// Connect to MySQL
$mysqli = mysqli_connect("localhost", "root", "", "twinx");

// Check connection
if (!$mysqli) {
  echo  mysqli_connect_error();
  exit();
}

// Escape the email to prevent SQL injection
$email = mysqli_real_escape_string($mysqli, $email);

// Perform the query
$query = "SELECT * FROM users WHERE email = '$email'";
$result = mysqli_query($mysqli, $query);

if ($result) {
  if (mysqli_num_rows($result) > 0) {
    $user = mysqli_fetch_assoc($result);
    if (password_verify($password, $user['password'])) {
      echo json_encode(['status' => 'success', 'message' => 'Login successful!']);
    } else {
      echo json_encode(['status' => 'error', 'message' => 'Invalid email or password.']);
    }
  } else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid email or password.']);
  }
} else {
  echo json_encode(['status' => 'error', 'message' => 'Query failed: ' . mysqli_error($mysqli)]);
}

// Close the connection
mysqli_close($mysqli);
?>
