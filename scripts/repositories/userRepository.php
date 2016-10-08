<?php 

    class UserRepository {
        
        function __construct() {
            require_once('../models/user.php');
        }

        public function loginUser($login, $password) {

            include('../config.php');
            
            $link = mysqli_connect($host, $dbUser, $dbPassword, $database) 
                or die("Ошибка " . mysqli_error($link));

            $user = $this->getUserByLogin($link, $login);

            mysqli_close($link);

            if ($user->getPassword() == $password) {
                return $user;
            }

            return null;
        }

        public function registerUser($login, $email, $pass, $image) {
            include('../config.php');
            $dbLink = mysqli_connect($host, $dbUser, $dbPassword, $database) or die('cannot connect to mysql');

            $login = htmlentities(mysqli_real_escape_string($dbLink, $login));
            $email = htmlentities(mysqli_real_escape_string($dbLink, $email));
            $pass = htmlentities(mysqli_real_escape_string($dbLink, $pass));

            if (!$this->isFreeLogin($dbLink, $login)) {
                return false;
            }

            $query = 'INSERT INTO users ( Login, Password, Email, Image) 
                                    VALUES ("'.$login.'", "'.$pass.'", "'.$email.'", "'.$image.'" )';
            
            $result = mysqli_query($dbLink, $query) or die("Ошибка " . mysqli_error($dbLink));

            // if success result is registred user else false
            if ($result) {
                $result = $this->getUserByLogin($dbLink, $login);
            }

            mysqli_free_result($result);
            mysqli_close($dbLink);

            return $result;
        }

        private function isFreeLogin($dbLink, $login) {
            $query = "SELECT * FROM users WHERE Login ='".$login."';";

            $result = mysqli_query($dbLink, $query) or die("Ошибка " . mysqli_error($dbLink));

            if ( $result == false) { return false; }

            $row = mysqli_fetch_row($result);

            return $row == false;
        }

        private function getUserByLogin($dbLink, $login) {
            $query = "SELECT Id, Login, Password, Email, Image FROM users WHERE Login ='".$login."';";

            $result = mysqli_query($dbLink, $query) or die("Ошибка " . mysqli_error($dbLink));

            if ( $result == false) { return false; }

            $row = mysqli_fetch_row($result);

            if( $row == false) { return false; }

            $id = $row[0];
            $login = $row[1];
            $pass = $row[2];
            $email = $row[3];
            $image = $row[4];

            mysqli_free_result($result);

            return new User($login, $pass, $email, $id, $image);
        } 

    }
?>