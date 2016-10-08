<?php 
    class ArticleRepository {

        function __construct() {
            require_once('../models/article.php');
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
    }
?>