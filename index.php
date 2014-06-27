<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,minimum-scale=1,maximum-scale=1">
    <meta name="msapplication-tap-highlight" content="no">

    <title>Image Lightbox Demo</title>

    <link rel="stylesheet" href="demo.css">
    <link rel="stylesheet" href="touch-imagelightbox.min.css">

  </head>

  <body>
<?php
require_once 'images.php';

$json = json_decode($images);

$headings = array(
  'With activity indication',
  'With overlay <span>&amp; activity indication</span>',
  'With "close" button <span>&amp; activity indication</span>',
  'With caption <span>&amp; activity indication</span>',
  'With navigation <span>&amp; activity indication</span>',
  'Combination');


 ?>
    <div id="container">
      <header>
        <h1>Image Lightbox<span>Responsive &amp; Touch-Friendly</span></h1>
      </header>

      <?php
        $round = 0;
        for ($i=0; $i < count($json); $i++) {
          if ($i%3==0) {
            $round = $i/3;
            echo '<h2>'.$headings[$round].'</h2>';
            echo '<ul>';
          }
          echo '<li><a href="./images/web/'.$json[$i]->src.'" data-imagelightbox="'.$round.'"><img src="./images/thumb/'.$json[$i]->src.'" alt="'.$json[$i]->name.'"></a></li>';
          if ($i%3==2) {
            echo '</ul>';
          }
        }
       ?>

      <footer>
        <p>All photos are licensed <a href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a>. For full credits please referer to <a href="./images.md">images.md</a></p>
      </footer>
    </div>


    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="./touch-imagelightbox.min.js"></script>
    <script src="./demo.js"></script>
  </body>
</html>
