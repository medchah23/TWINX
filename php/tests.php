<?php
require 'vendor/autoload.php'; // Ensure this path is correct
require_once 'vendor/pear/http_request2/HTTP/Request2.php';

$request = new HTTP_Request2();
$request->setUrl('https://1vkk9d.api.infobip.com/email/3/send');
$request->setMethod(HTTP_Request2::METHOD_POST);
$request->setConfig(array(
    'follow_redirects' => TRUE
));
$request->setHeader(array(
    'Authorization' => 'App 98c35ca28c7c80f7006877a4d367a534-3cc2f7f6-6a17-4e1f-96e1-0f601a0b271e',
    'Content-Type' => 'multipart/form-data',
    'Accept' => 'application/json'
));
$request->addPostParameter(array(
    'from' => 'testing <chahbani.mohammed@esprit.tn>',
    'subject' => 'Free trial',
    'to' => '{"to":"noreplytwinx@gmail.com","placeholders":{"firstName":"TWINX"}}',
    'text' => 'Hi {{firstName}}, this is a test message from Infobip. Have a nice day!'
));
try {
    $response = $request->send();
    if ($response->getStatus() == 200) {
        echo $response->getBody();
    }
    else {
        echo 'Unexpected HTTP status: ' . $response->getStatus() . ' ' .
            $response->getReasonPhrase();
    }
}
catch(HTTP_Request2_Exception $e) {
    echo 'Error: ' . $e->getMessage();
}