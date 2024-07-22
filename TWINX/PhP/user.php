<?php
$connection = mysqli_connect("localhost", "root", "", "twinx");

if (mysqli_connect_errno()) {
  die("Failed to connect to MySQL: " . mysqli_connect_error());
} else {
  $first_name = $_POST['firstName'];
  $second_name = $_POST['secondName'];
  $cin = $_POST['cin'];
  $phone = $_POST['phoneNumber'];
  $street = $_POST['street'];
  $city = $_POST['city'];
  $zip_code = $_POST['zipCode'];
  $email = $_POST['email'];
  $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
  $security_question = $_POST['securityQuestion'];
  $security_answer = $_POST['securityAnswer'];

  // Check if the user already exists
  $stmt = $connection->prepare("SELECT * FROM users WHERE email = ? OR cin = ?");
  $stmt->bind_param("ss", $email, $cin);
  $stmt->execute();
  $result = $stmt->get_result();

  if ($result->num_rows > 0) {
    echo "<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <meta http-equiv='X-UA-Compatible' content='IE=edge'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title>Form Error</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background-color: #f5f5f5;
    }
    .form-container {
      background-color: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      width: 300px;
      text-align: center;
    }
    .form-header {
      font-size: 24px;
      margin-bottom: 20px;
    }
    .submit-btn {
      background-color: #4CAF50;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      width: 100%;
    }
    .submit-btn:hover {
      background-color: #45a049;
    }
  </style>
</head>
<body>
<div class='form-container'>
  <div class='form-header'>
    Error: User Already Exists
  </div>
  <div>
    The email or CIN number is already registered.
  </div>
</div>
</body>
</html>";
  } else {
    $stmt = $connection->prepare("INSERT INTO users (first_name, last_name, email, password, phone_number, street, city, postal_code, country, security_question, security_answer, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");
    $stmt->bind_param("sssssssssss", $first_name, $second_name, $email, $password, $phone, $street, $city, $zip_code, "TUNISIA", $security_question, $security_answer);
    if ($stmt->execute()) {
      echo "hello .$first_name $second_name . Welcom to TWINX world ❤️";
    } else {
      echo "Error: " . $stmt->error;
    }
  }

  $stmt->close();
  mysqli_close($connection);
}
?>
