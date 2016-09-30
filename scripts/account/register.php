<?php 
    // for ajax calls
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    // parsing post body ofd request
    $entityBody = file_get_contents('php://input');
    $receivedObj = json_decode($entityBody);

    $login = $receivedObj->login;
    $email = $receivedObj->email;
    $password = $receivedObj->password;

    require_once('../repositories/userRepository.php');
    $repo = new UserRepository();

    $result = $repo->registerUser($login, $email, $password);

    include('../config.php');
    
    if ($result) {
        echo json_encode(array("login" => $login, "email" => $email, "password" => $password));
    }
    else {        
        echo json_encode(null);
    }
?>