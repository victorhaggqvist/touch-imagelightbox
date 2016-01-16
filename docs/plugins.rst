Plugins
=======

The plugins currently available in the standard distribution of Image LightBox are the following.

ActivityIndicator
    Displays an indicator when images are loading.

Overlay
    Overlays the page with a semitransparent layer when images are displayed.

CloseButton
    Displays a button in the top right corner that one should press to exit the lightbox

Captions
    Assuming a gallery of images with markup such as bellow, the `alt`  attribute of the `img` tag will be used for caption of the image.

     .. code-block:: html

        <a href="https://example.com/image.jpg"  data-imagelightbox="0">
            <img src="https://example.com/image.jpg" alt="My Caption">
        </a>

Navigation
    Displays navigation dots that can be used to jump between images.
