<?php 
    $login = $_POST['login'];
    $password = $_POST['password'];

    require_once('../repositories/userRepository.php');

    $repo = new UserRepository();

    $res = $repo.loginUser($login, $password);

    if (!$res) {
        return header("Location: http://test.ru/account/badlogin.html");
    } 
?>