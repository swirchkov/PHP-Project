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

        public function getId() { return $this->id; }

        public function getLogin() { return $this->login; }
        public function setLogin($value) { $this->login = $value; }

        public function getEmail() { return $this->email; }
        public function setEmail($value) { $this->email = $value; }

        public function getPassword() { return $this->password; }
        public function setPassword($value) { $this->password = $value; }
    }

?>