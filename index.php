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
  <a href="https://github.com/victorhaggqvist/touch-imagelightbox"><img id="fork-ribbon" style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"></a>
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
        <iframe id="fork-button" src="http://ghbtns.com/github-btn.html?user=victorhaggqvist&repo=touch-imagelightbox&type=fork"  allowtransparency="true" frameborder="0" scrolling="0" width="53" height="20"></iframe>
        <p>View source of demos on <a href="https://github.com/victorhaggqvist/touch-imagelightbox/tree/gh-pages">Github</a>.</p>
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
