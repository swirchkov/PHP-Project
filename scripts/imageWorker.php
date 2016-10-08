<?php 
    class ImageWorker {

    private function generateRandomString($length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    // finds free name in image avatars catalog and returns realtive path with this free name.
    private function getFileNameForFile($dir, $originName, $extension) {
        require_once('config.php');
        while(file_exists(constant('ROOTPATH').'\\'.$dir.$originName.'.'.$extension)) {
            $originName = $this->generateRandomString();
        }    

        return $dir.$originName.'.'.$extension;
    }
    
    // wrapper for getFileNameForFile, which calculates initial data
    public function imageRelativeToFullPath($dir, $imageName) {
        $parts = explode('.', $imageName);
        $originName = implode('.', array_slice($parts, 0, count($parts) - 1));
        $extension = $parts[count($parts) - 1];
    
        return $this->getFileNameForFile($dir, $originName, $extension);
    }
    }        
?>