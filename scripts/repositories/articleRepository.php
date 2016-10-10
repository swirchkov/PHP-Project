<?php 
    class ArticleRepository {

        function __construct() {
            require_once('../models/article.php');
        }

        private function getArticle($conn, $title, $authorId) {
            $query = sprintf("SELECT Articles.Id as Id, Title, Tags, Articles.Image as Image, TextField, AuthorId, 
                Users.Login as Login FROM Articles, Users WHERE Title = '%s' AND AuthorId = %d 
                AND Articles.AuthorId = Users.Id", $title, $authorId);
            
            $result = $conn->query($query);

            if ($conn->error) {
                die ('Error while selecting article : '.$conn->error);
            }

            $article = null;
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();

                $article = new Article($row["Title"], $row['Tags'], $row['TextField'], $row['Image'], $row['AuthorId'],
                                $row['Login'], $row['Id']);
            }

            return $article;
        }

        private function getArticleById($conn, $id) {
            $query = sprintf('SELECT Articles.Id as Id, Title, TextField, Tags, Articles.Image as Image, AuthorId, Login  
                        FROM Articles, Users WHERE Articles.Id = %d;', $id);

            $result = $conn->query($query);

            if ($result == false) {
                echo "Error: ".$conn->error;
                return null;
            }

            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();

                return new Article($row['Title'], $row['Tags'], $row['TextField'], $row['Image'], $row['AuthorId'],
                                $row['Login'], $row['Id']);
            }
            else {
                echo 'no rows selected';
                return null;
            }
        }

        public function createArticle($article) {
            include('../config.php');

            $conn = new mysqli($host, $dbUser, $dbPassword, $database);

            if ($conn->connect_error) {
                die('Error : '.$conn->connect_error);
            }

            $article->setTitle(htmlentities(mysqli_real_escape_string($conn, $article->getTitle())));
            $article->setTags(htmlentities(mysqli_real_escape_string($conn, $article->getTags())));
            $article->setText(htmlentities(mysqli_real_escape_string($conn, $article->getText())));
            

            $query = sprintf('INSERT INTO Articles (Title, Tags, Image, TextField, AuthorId) 
                                VALUES ("%s", "%s", "%s", "%s", "%d");', $article->getTitle(), $article->getTags(),
                                $article->getImage(), $article->getText(), $article->getAuthorId());
            
            $result = $conn->query($query);

            if ($conn->error) {
                die ("Error in request processing".$conn->error);
            }

            $article = $this->getArticle($conn, $article->getTitle(), $article->getAuthorId());

            $conn->close();

            return $article;
        }

        public function getAllArticles() {
            require_once('../config.php');

            $conn = new mysqli($host, $dbUser, $dbPassword, $database);

            if ($conn->connect_error) {
                die("Error ".$conn->connect_error);
            }

            $query = "SELECT Articles.Id as Id, Title, Tags, TextField, Articles.Image as Image, AuthorId, 
            Users.Login as AuthorName FROM Articles, Users WHERE Articles.AuthorId = Users.Id";

            $result = $conn->query($query);

            if($result->num_rows > 0) {
                $resArr = array();
                // forming output data
                while($row = $result->fetch_assoc()) {
                    $article = new Article($row['Title'], $row['Tags'], $row['TextField'], $row['Image'], $row['AuthorId'], 
                                $row['AuthorName'], $row['Id']);
                    array_push($resArr, $article);
                }
                return $resArr;
            }
            else {
                return array();
            } 
        }

        public function updateArticle($article) {
            include('../config.php');

            $conn = new mysqli($host, $dbUser, $dbPassword, $database);

            if ($conn->connect_error) {
                die("Error ".$conn->connect_error);
            }

            $article->setTitle(htmlentities(mysqli_real_escape_string($conn, $article->getTitle())));
            $article->setTags(htmlentities(mysqli_real_escape_string($conn, $article->getTags())));
            $article->setText(htmlentities(mysqli_real_escape_string($conn, $article->getText())));

            if ($article->getImage() != null) {
                $query = sprintf("UPDATE Articles SET Title='%s', TextField = '%s', Image='%s', Tags='%s', AuthorId='%s' 
                                WHERE Articles.Id = %d;", $article->getTitle(), $article->getText(), $article->getImage(),
                                 $article->getTags(), $article->getAuthorId(), $article->getId());
            }
            else {
                $query = sprintf("UPDATE Articles SET Title='%s', TextField = '%s', Tags='%s', AuthorId='%s' 
                                WHERE Articles.Id = %d;", $article->getTitle(), $article->getText(), $article->getTags(), 
                                $article->getAuthorId(), $article->getId());
            }

            if( $conn->query($query) == true ) {
                $article = $this->getArticleById($conn, $article->getId());
                
                $conn->close();
                
                return $article;
            }
            else {
                echo "Error updating article : " .$conn->error;
                $conn->close();
                return false;
            }
        }

        public function deleteArticle($id) {
            include('../config.php');

            $conn = new mysqli($host, $dbUser, $dbPassword, $database);

            if ($conn->connect_error) {
                die ("Error : ".$conn->connect_error);
            }

            $sql = sprintf('DELETE FROM Articles WHERE Articles.Id = %d;', $id);

            $result = $conn->query($sql) or die("Error :".$conn->error);

            $conn->close();

            return $result;
        }
    }
?>