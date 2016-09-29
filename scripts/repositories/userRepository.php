<?php 

    class UserRepository {
        
        function __construct() {
            require_once('../models/user.php');
            require_once('../config.php');
        }

        public function loginUser($login, $password) {
            
            $link = mysqli_connect($host, $dbUser, $dbPassword, $database) 
                or die("Ошибка " . mysqli_error($link));

            $password = password_hash($password, PASSWORD_BCRYPT);
            
            $result = mysqli_query("Select * FROM Users Where Login =". $login .' AND Password='.$password, $link);

            $row = mysqli_fetch_row($result); 

            if (!$row) {
                return false;
            }

            $id = $row[0];
            $login = $row[1];
            $password = $row[2];
            $email = $row[3];

            mysqli_free_result($result);
            mysqli_close($link);

            return new User($login, $password, $email, $id);
        }

        public function registerUser($login, $email, $pass) {
            include('../config.php');
            $dbLink = mysqli_connect($host, $dbUser, $dbPassword, $database) or die('cannot connect to mysql');

            $login = htmlentities(mysqli_real_escape_string($dbLink, $login));
            $email = htmlentities(mysqli_real_escape_string($dbLink, $email));

            $password = crypt($pass);

            $query = 'INSERT INTO users ( Login, Password, Email) 
                                    VALUES ("'.$login.'", "'.$password.'", "'.$email.'" )';
            
            $result = mysqli_query($dbLink, $query) or die("Ошибка " . mysqli_error($dbLink));

            mysqli_close($dbLink);

            return $result;
        }

    }
?>