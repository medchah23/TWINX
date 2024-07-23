<?php
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

$firstName = $input['firstName'];
$secondName = $input['secondName'];
$cin = $input['cin'];
$phoneNumber = $input['phoneNumber'];
$street = $input['street'];
$city = $input['city'];
$zipCode = $input['zipCode'];
$email = $input['email'];
$password = $input['password'];
$securityQuestion = $input['securityQuestion'];
$securityAnswer = $input['securityAnswer'];

$mysqli = new mysqli("localhost", "root", "", "twinx");

if ($mysqli->connect_error) {
  echo json_encode(['status' => 'error', 'message' => 'Failed to connect to MySQL: ' . $mysqli->connect_error]);
  exit();
}

$stmt = $mysqli->prepare("SELECT * FROM users WHERE email = ? OR cin = ?");
$stmt->bind_param('ss', $email, $cin);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
  echo json_encode(['status' => 'error', 'message' => 'User with this email or CIN already exists.']);
  exit();
}

$stmt = $mysqli->prepare("INSERT INTO users (first_name, last_name, cin, phone_number, email, password, street, city, postal_code, security_question, security_answer) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$passwordHash = password_hash($password, PASSWORD_DEFAULT);
$stmt->bind_param('sssssssssss', $firstName, $secondName, $cin, $phoneNumber, $email, $passwordHash, $street, $city, $zipCode, $securityQuestion, $securityAnswer);

if ($stmt->execute()) {
  echo json_encode(['status' => 'success', 'message' => 'Registration successful!']);
} else {
echo json_encode(['status' => 'error', 'message' => 'Registration failed.']);
}
$stmt->close();
$mysqli->close();
?>
