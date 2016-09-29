<?php
    class User {
        private $id, $login, $email, $password;

        public function __construct($login, $password, $email = '', $id = 0) {
            $this->login = $login;
            $this->password = $password;

            if ($email != '') 
                $this->email = $email;

            if ($id != 0) 
                $this->id = $id;
        }

        public function getId() { return id; }

        public function getLogin() { return $login; }

        public function setLogin($value) {
            $login = $value;
        }

        public function getEmail() { return $email; }

        public function setEmail($value) {
            $email = $value;
        }

        public function getPassword() { return $password; }

        public function setPassword($value) { $password = $value; }
    }

?>