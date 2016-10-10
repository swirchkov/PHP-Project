<?php 
    // for ajax calls
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    require_once('../models/user.php');
    require_once('../imageWorker.php');
    require_once('../models/article.php');

    $title = $_POST['title'];
    $text = $_POST['text'];
    $authorId = $_POST['authorId'];
    $tags = $_POST['tags'];
    
    $id = $_POST['id'];
    
    $relPath = null;
    if (isset($_FILES['imageFile'])) {
        $image = $_FILES['imageFile'];
        $imWorker = new ImageWorker();

        $relPath = $imWorker->imageRelativeToFullPath('files\\article\\', $image['name']);

        if (!move_uploaded_file($image['tmp_name'], constant('ROOTPATH').'\\'.$relPath)) {
            echo json_encode(null);
        }
    }

    $path = null;
    if ($relPath != null) {
        // transfrom from windows path to url path
        $path = '/'.str_replace('\\', '/', $relPath);
    }
    else {
        $path = null;
    }
    $article = new Article($title, $tags, $text, $path, $authorId, "", $id);

    require_once('../repositories/articleRepository.php');

    $repo = new ArticleRepository();

    $result = $repo->updateArticle($article);

    if ($result == false) {
        if ($relPath != null) {
            unlink(constant('ROOTPATH').'\\'.$relPath);
        }
        echo json_encode(null);
    }
    else {
        echo json_encode(array("Title" => $result->getTitle(), "Text" => $result->getText(), "Id" => $result->getId(),
                "Tags" => $result->getTags(), "ImageUrl" => $path));
    }
?>