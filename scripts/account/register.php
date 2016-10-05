<?php 
    // random string, that can be used as file name for loaded image
    function generateRandomString($length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    // finds free name in image avatars catalog and returns realtive path with this free name.
    function getFileNameForFile($dir, $originName, $extension) {
        while(file_exists(constant('ROOTPATH').'\\'.$dir.$originName.'.'.$extension)) {
            $originName = generateRandomString();
        }    

        return $dir.$originName.'.'.$extension;
    }
    
    // wrapper for getFileNameForFile, which calculates initial data
    function getImageRelativePath($imageName) {
        $dir = 'files\\avatars\\';
        $parts = explode('.', $imageName);
        $originName = implode('.', array_slice($parts, 0, count($parts) - 1));
        $extension = $parts[count($parts) - 1];
    
        return getFileNameForFile($dir, $originName, $extension);
    }

    // for ajax calls
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include('../config.php');

    $login = $_POST['login'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $image = $_FILES['file'];

    $relPath = getImageRelativePath($image['name']);

    if (!move_uploaded_file($image['tmp_name'],constant('ROOTPATH').'\\'.$relPath)) {
        echo json_encode(null);
    }
    else {

        require_once('../repositories/userRepository.php');
        $repo = new UserRepository();

        // transfrom from windows path to url path
        $path = '/'.str_replace('\\', '/', $relPath);
        $result = $repo->registerUser($login, $email, $password, $path );
    
        if ($result) {
            echo json_encode(array("login" => $login, "email" => $email, "password" => $password, "imageSrc" => $path));
        }
        else { 
            // delete from server already loaded file because user registration failed
            unlink(constant('ROOTPATH').'\\'.$relPath);       
            echo json_encode(null);
        }
    }
?>