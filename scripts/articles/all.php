<?php 
    
    function transformToJsonConvert($arr) {
        $res = array();

        for($i = 0; $i<count($arr); $i++ ) {
            $article = $arr[$i];
            array_push($res, array('Title' => $article->getTitle(), 'Text' => $article->getText(), 'Tags' => $article->getTags(),
                            "AuthorId" => $article->getAuthorId(), 'Image' => $article->getImage(), 'Id' => $article->getId(),
                            "AuthorName" => $article->getAuthorName()));

        }
        return $res;
    }

    // for ajax calls
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    require_once('../repositories/articleRepository.php');
    require_once('../models/article.php');

    $repo = new ArticleRepository();
    $articles = $repo->getAllArticles();

    echo json_encode(transformToJsonConvert($articles));
?>