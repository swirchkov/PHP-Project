<?php 

    class UserRepository {
        
        function __construct() {
            require_once('../models/user.php');
        }

        public function loginUser($login, $password) {
            require_once('../config.php');

            $link = mysqli_connect($host, $user, $password, $database) 
                or die("Ошибка " . mysqli_error($link));

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

    }
?>