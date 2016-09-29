<?php 
    $login = $_POST['login'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    require_once('../repositories/userRepository.php');
    $repo = new UserRepository();

    $result = $repo->registerUser($login, $email, $password);

    include('../config.php');
    
    if ($result) {
        return header('Location: '.$hostAddress.'/mainpage/index.html');
    }
    else {        
        return header('Location: '.$hostAddress.'/account/register_error.html');
    }
?>