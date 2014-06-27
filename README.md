Touch Imagelightbox
==============
Imagelightbox was originly created by [Osvaldas Valutis](http://osvaldas.info/image-lightbox-responsive-touch-friendly), though it was only accesible through his site. I put it here to make it more maintainable.

View a demo here: https://victorhaggqvist.github.io/touch-imagelightbox/

#How to get it
Via bower.io `bower install touch-imagelightbox`

Or with git `git clone https://github.com/victorhaggqvist/touch-imagelightbox.git`

Or download the [zip](https://github.com/victorhaggqvist/touch-imagelightbox/archive/master.zip).

#Requirements
jQuery

NOTE: The bower install will not get jQuery for you, if you want to get jQuery from bower too use `bower install jquery`

#Usage
Credits again to http://osvaldas.info/image-lightbox-responsive-touch-friendly
```html
<script src="jquery.js"></script>
<script src="imagelightbox.js"></script>
<script>
$( function(){
  $('a').imageLightbox(); // for a single image
  // OR
  $('a[lightbox="foo"]').imageLightbox(); // for a multiple, something likte this
});
</script>
```

Checkout the demos at https://victorhaggqvist.github.io/touch-imagelightbox/.

The js used in the demos are here, https://github.com/victorhaggqvist/touch-imagelightbox/blob/gh-pages/demo.js 

###Options and defaults
```js
$(selector).imageLightbox({
    selector:       'id="imagelightbox"',   // string;
    allowedTypes:   'png|jpg|jpeg|gif',     // string;
    animationSpeed: 250,                    // integer;
    preloadNext:    true,                   // bool;            silently preload the next image
    enableKeyboard: true,                   // bool;            enable keyboard shortcuts (arrows Left/Right and Esc)
    quitOnEnd:      false,                  // bool;            quit after viewing the last image
    quitOnImgClick: false,                  // bool;            quit when the viewed image is clicked
    quitOnDocClick: true,                   // bool;            quit when anything but the viewed image is clicked
    onStart:        false,                  // function/bool;   calls function when the lightbox starts
    onEnd:          false,                  // function/bool;   calls function when the lightbox quits
    onLoadStart:    false,                  // function/bool;   calls function when the image load begins
    onLoadEnd:      false                   // function/bool;   calls function when the image finishes loading
});
```

###Other methodes
```js
var $instance = $(selector).imageLightbox();
 
// switches to the other image; accepts integer argument (an index of the desired image)
$instance.switchImageLightbox( index );
 
// quits the lightbox
$instance.quitImageLightbox();
```

#How to build
Image Lightbox is buildt using the Grunt toolchain. The CSS is build using SASS and Compass, which means you need Ruby, the SASS and Compass gems to make it. 

Note: Remenber that you ATM need a alpha build of Compass to make it work with Grunt (`gem install compass --pre`).

If you have Node just do a `npm install` then `grunt` and you will have a new build in the `dist/` directory.

#License
MIT
