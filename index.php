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
        <p>Photos credit to Osvaldas Valutis, www.osvaldas.info</p>
      </footer>
    </div>


    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="./touch-imagelightbox.js"></script>
    <script>

      $( function()
      {
        var activityIndicatorOn = function()
          {
            $( '<div id="imagelightbox-loading"><div></div></div>' ).appendTo( 'body' );
          },
          activityIndicatorOff = function()
          {
            $( '#imagelightbox-loading' ).remove();
          },

          overlayOn = function()
          {
            $( '<div id="imagelightbox-overlay"></div>' ).appendTo( 'body' );
          },
          overlayOff = function()
          {
            $( '#imagelightbox-overlay' ).remove();
          },

          closeButtonOn = function( instance )
          {
            $( '<a href="#" id="imagelightbox-close">Close</a>' ).appendTo( 'body' ).on( 'click touchend', function(){ $( this ).remove(); instance.quitImageLightbox(); return false; });
          },
          closeButtonOff = function()
          {
            $( '#imagelightbox-close' ).remove();
          },

          captionOn = function()
          {
            var description = $( 'a[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"] img' ).attr( 'alt' );
            if( description.length > 0 )
              $( '<div id="imagelightbox-caption">' + description + '</div>' ).appendTo( 'body' );
          },
          captionOff = function()
          {
            $( '#imagelightbox-caption' ).remove();
          },

          navigationOn = function( instance, selector )
          {
            var images = $( selector );
            if( images.length )
            {
              var nav = $( '<div id="imagelightbox-nav"></div>' );
              for( var i = 0; i < images.length; i++ )
                nav.append( '<a href="#"></a>' );

              nav.appendTo( 'body' );
              nav.on( 'click touchend', function(){ return false; });

              var navItems = nav.find( 'a' );
              navItems.on( 'click touchend', function()
              {
                var $this = $( this );
                if( images.eq( $this.index() ).attr( 'href' ) != $( '#imagelightbox' ).attr( 'src' ) )
                  instance.switchImageLightbox( $this.index() );

                navItems.removeClass( 'active' );
                navItems.eq( $this.index() ).addClass( 'active' );

                return false;
              })
              .on( 'touchend', function(){ return false; });
            }
          },
          navigationUpdate = function( selector )
          {
            var items = $( '#imagelightbox-nav a' );
            items.removeClass( 'active' );
            items.eq( $( selector ).filter( '[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"]' ).index( selector ) ).addClass( 'active' );
          },
          navigationOff = function()
          {
            $( '#imagelightbox-nav' ).remove();
          };

        //  WITH ACTIVITY INDICATION
        $( 'a[data-imagelightbox="0"]' ).imageLightbox(
        {
          onLoadStart:  function() { activityIndicatorOn(); },
          onLoadEnd:    function() { activityIndicatorOff(); },
          onEnd:      function() { activityIndicatorOff(); }
        });

        //  WITH OVERLAY & ACTIVITY INDICATION
        $( 'a[data-imagelightbox="1"]' ).imageLightbox(
        {
          onStart:   function() { overlayOn(); },
          onEnd:     function() { overlayOff(); activityIndicatorOff(); },
          onLoadStart: function() { activityIndicatorOn(); },
          onLoadEnd:   function() { activityIndicatorOff(); }
        });

        //  WITH "CLOSE" BUTTON & ACTIVITY INDICATION
        var instanceC = $( 'a[data-imagelightbox="2"]' ).imageLightbox(
        {
          quitOnDocClick: false,
          onStart:    function() { closeButtonOn( instanceC ); },
          onEnd:      function() { closeButtonOff(); activityIndicatorOff(); },
          onLoadStart:  function() { activityIndicatorOn(); },
          onLoadEnd:    function() { activityIndicatorOff(); }
        });

        //  WITH CAPTION & ACTIVITY INDICATION
        $( 'a[data-imagelightbox="3"]' ).imageLightbox(
        {
          onLoadStart: function() { captionOff(); activityIndicatorOn(); },
          onLoadEnd:   function() { captionOn(); activityIndicatorOff(); },
          onEnd:     function() { captionOff(); activityIndicatorOff(); }
        });

        //  WITH DIRECTION REFERENCE
        var selectorE = 'a[data-imagelightbox="4"]';
        var instanceE = $( selectorE ).imageLightbox(
        {
          onStart:   function() { navigationOn( instanceE, selectorE ); },
          onEnd:     function() { navigationOff(); activityIndicatorOff(); },
          onLoadStart: function() { activityIndicatorOn(); },
          onLoadEnd:   function() { navigationUpdate( selectorE ); activityIndicatorOff(); }
        });

        //  ALL COMBINED
        var instanceF = $( 'a[data-imagelightbox="5"]' ).imageLightbox(
        {
          onStart:    function() { overlayOn(); closeButtonOn( instanceF ); },
          onEnd:      function() { overlayOff(); captionOff(); closeButtonOff(); activityIndicatorOff(); },
          onLoadStart:  function() { captionOff(); activityIndicatorOn(); },
          onLoadEnd:    function() { captionOn(); activityIndicatorOff(); }
        });

      });
    </script>
  </body>
</html>
