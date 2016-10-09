<?php 
    class ArticleRepository {

        function __construct() {
            require_once('../models/article.php');
        }

        private function getArticle($link, $title, $authorId) {
            $query = sprintf("SELECT Id, Title, Tags, Image, TextField, AuthorId FROM Articles 
                            WHERE Title = '%s' AND AuthorId = %d;", $title, $authorId);
            
            $result = mysqli_query($link, $query)  or die("Ошибка " . mysqli_error($link));
            if (!$result) { return false; }

            $row = mysqli_fetch_row($result);
            if (!$row) { return false; }

            $article = new Article($row[1], $row[2], $row[4], $row[3], $row[5], $row[0]);

            mysqli_free_result($result);

            return $article;
        }

        public function createArticle($article) {
            include('../config.php');

            $link = mysqli_connect($host, $dbUser, $dbPassword, $database) 
                or die("Ошибка " . mysqli_error($link));

            $article->setTitle(htmlentities(mysqli_real_escape_string($link, $article->getTitle())));
            $article->setTags(htmlentities(mysqli_real_escape_string($link, $article->getTags())));
            $article->setText(htmlentities(mysqli_real_escape_string($link, $article->getText())));
            

            $query = sprintf('INSERT INTO Articles (Title, Tags, Image, TextField, AuthorId) 
                                VALUES ("%s", "%s", "%s", "%s", "%d");', $article->getTitle(), $article->getTags(),
                                $article->getImage(), $article->getText(), $article->getAuthorId());
            
            $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));

            if (!$result) { return false; }

            $article = $this->getArticle($link, $article->getTitle(), $article->getAuthorId());

            mysqli_close($link);

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
    }
?>