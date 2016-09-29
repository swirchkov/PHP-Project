<?php 
    $login = $_POST['login'];
    $password = $_POST['password'];

    require_once('../repositories/userRepository.php');

    $repo = new UserRepository();

    $res = $repo->loginUser($login, $password);
    require_once('../config.php');
    if (!$res) {
        return header("Location: ".$hostAddress."/account/badlogin.html");
    } 
?>