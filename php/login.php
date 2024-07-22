<?php
header('Content-Type: application/json');

$input = $_POST;
$mysqli = new mysqli("localhost", "root", "", "twinx");

if ($mysqli->connect_error) {
  echo json_encode(['status' => 'error', 'message' => 'Failed to connect to MySQL: ' . $mysqli->connect_error]);
  exit();
}

$email = $input["loginEmail"];
$password = $input["loginPassword"];

$stmt = $mysqli->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
  echo json_encode(['status' => 'error', 'message' => 'User with this email does not exist.']);
  exit();
}

$user = $result->fetch_assoc();

if (password_verify($password, $user['password'])) {
  echo json_encode(['status' => 'success', 'message' => 'Login successful!']);
} else {
  echo json_encode(['status' => 'error', 'message' => 'Invalid password.']);
}

$stmt->close();
$mysqli->close();
?>
