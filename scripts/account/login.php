<?php 
    // for ajax calls
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    // parsing post body ofd request
    $entityBody = file_get_contents('php://input');
    $receivedObj = json_decode($entityBody);

    $login = $receivedObj->login;
    $password = $receivedObj->password;

    require_once('../repositories/userRepository.php');

    $repo = new UserRepository();

    $res = $repo->loginUser($login, $password);

    if (!$res) {
        echo json_encode(null);
    } 
    else {
        echo json_encode(array('login' => $res->getLogin(), 'password' => $res->getPassword(), 'email' => $res->getEmail()));
    }
?>