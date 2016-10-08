<?php 
    class Article {
        private $id, $title, $tags, $text, $image, $authorId;

        public function __construct($title = null, $tags = null, $text = null, $image = null, $authorId = 0, $id = 0) {
            $this->id = $id;
            $this->title = $title;
            $this->tags = $tags;
            $this->text = $text;
            $this->image = $image;
            $this->authorId = $authorId;
        }

        public function getId() { return $this->id; }

        public function getTitle() { return $this->title; }
        public function setTitle($value) { $this->title = $value; }

        public function getTags() { return $this->tags; }
        public function setTags($value) { $this->tags = $value; }

        public function getText() { return $this->text; }
        public function setText($value) { $this->text = $value; }

        public function getImage() { return $this->image; }
        public function setImage($value) { $this->image = $value; }

        public function getAuthorId() { return $this->authorId; }
        public function setAuthorId($value) { $this->authorId = $value; }
          
    }
?>