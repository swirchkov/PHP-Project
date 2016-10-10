<?php 

    class UserRepository {
        
        function __construct() {
            require_once('../models/user.php');
        }

        public function loginUser($login, $password) {

            include('../config.php');
            
            $conn = new mysqli($host, $dbUser, $dbPassword, $database);

            if ($conn->connect_error) {
                echo "Error in login : ".$conn->connect_error;
            }


            $user = $this->getUserByLogin($conn, $login);

            $conn->close();

            if ($user->getPassword() == $password) {
                return $user;
            }

            return null;
        }

        public function registerUser($login, $email, $pass, $image) {
            include('../config.php');
            $conn = new mysqli($host, $dbUser, $dbPassword, $database);

            if ($conn->connect_error) {
                echo "Error in register : ".$conn->connect_error;
            }

            $login = htmlentities(mysqli_real_escape_string($conn, $login));
            $email = htmlentities(mysqli_real_escape_string($conn, $email));
            $pass = htmlentities(mysqli_real_escape_string($conn, $pass));

            if (!$this->isFreeLogin($conn, $login)) {
                return false;
            }

            $query = 'INSERT INTO users ( Login, Password, Email, Image) 
                                    VALUES ("'.$login.'", "'.$pass.'", "'.$email.'", "'.$image.'" )';
            
            $result = $conn->query($query);

            // if success result is registred user else false
            if ($result) {
                $result = $this->getUserByLogin($conn, $login);
            }

            $conn->close();

            return $result;
        }

        private function isFreeLogin($conn, $login) {
            $query = "SELECT * FROM users WHERE Login ='".$login."';";

            $result = $conn->query($query);
            if ($result) {
                return $result->num_rows == 0;
            }

            return false;
        }

        private function getUserByLogin($conn, $login) {
            $query = "SELECT Id, Login, Password, Email, Image FROM users WHERE Login ='".$login."';";

            $result = $conn->query($query);

            if (!$result ) {
                echo 'Error : '.$conn->error;
                return null;
            }

            if ($result->num_rows == 0) {
                echo 'no rows selected';
                return null;
            }

            $row = $result->fetch_assoc();
            $user = new User($row['Login'], $row['Password'], $row['Email'], $row['Id'], $row['Image']);

            return $user;
        } 

    }
?>