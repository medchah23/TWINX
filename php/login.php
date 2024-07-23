<?php
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

$email = $input['loginEmail'];  // Corrected the key name
$password = $input['loginPassword'];  // Corrected the key name

$mysqli = new mysqli("localhost", "root", "", "twinx");

if ($mysqli->connect_error) {
  echo json_encode(['status' => 'error', 'message' => 'Failed to connect to MySQL: ' . $mysqli->connect_error]);
  exit();
}

$stmt = $mysqli->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
  $user = $result->fetch_assoc();
  if (password_verify($password, $user['password'])) {
    echo json_encode(['status' => 'success', 'message' => 'Login successful!']);
  } else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid email or password.']);
  }
} else {
  echo json_encode(['status' => 'error', 'message' => 'Invalid email or password.']);
}

$stmt->close();
$mysqli->close();
?>
