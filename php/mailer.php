<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load PHPMailer's autoloader
require __DIR__ . "/vendor/autoload.php";

// Create a new instance of PHPMailer
$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();                                       // Set mailer to use SMTP
    $mail->SMTPAuth = true;                                 // Enable SMTP authentication
    $mail->Host = 'smtp.gmail.com';                         // Specify main and backup SMTP servers
    $mail->Port = 587;                                      // TCP port to connect to
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;     // Enable TLS encryption, `PHPMailer::ENCRYPTION_SMTPS` is also available

    // Authentication
    $mail->Username = "medchah606@gmail.com";               // SMTP username (your Gmail address)
    $mail->Password = "MariemHama";                         // SMTP password (your Gmail password or App Password if 2FA is enabled)

    // Recipients
    $mail->setFrom('medchah606@gmail.com', 'Your Name');    // Set the sender's email address and name
    $mail->addAddress('recipient@example.com', 'Recipient Name'); // Add a recipient's email address and name

    // Content
    $mail->isHTML(true);                                    // Set email format to HTML
    $mail->Subject = 'Test Email';                          // Set the subject of the email
    $mail->Body = '<h1>This is a test email</h1><p>Hello, this is a test email sent using PHPMailer!</p>'; // HTML content
    $mail->AltBody = 'Hello, this is a test email sent using PHPMailer!'; // Plain text version of the email content

    // Send the email
    $mail->send();
    echo 'Message has been sent successfully';

} catch (Exception $e) {
    // Handle exceptions
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

?>
