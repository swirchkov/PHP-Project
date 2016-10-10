<?php 
    // for ajax calls
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    require_once("../repositories/articleRepository.php");

    $id = $_POST['Id'];

    $repo = new ArticleRepository();

    if ($repo->deleteArticle($id)) {
        echo json_encode(array("Result" => "Article deleted successfully"));
    }
    else {
        echo json_encode(array("Result" => "Unfortunaly, we can't delete article. Please try later."));
    }
?>