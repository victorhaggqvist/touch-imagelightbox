Image LightBox
==============
A lightbox without bells and whistles.

View a demo here: https://victorhaggqvist.github.io/touch-imagelightbox/

View full docs: https://touch-imagelightbox.readthedocs.org

Version 0.2.0
-------------
The original Imagelightbox and up to version 0.1.5 of `touch-imagelightbox` was a jQuery plugin.

Version 0.2.0 is a major rewrite of the original Imagelightbox to change it's architecture and remove the jQuery dependency.


How to get it
-------------
Via bower

.. code-block:: bash

   bower install touch-imagelightbox

Or with git

.. code-block:: bash

   git clone https://github.com/victorhaggqvist/touch-imagelightbox.git

Requirements
------------
As of version 0.2.0 there are no additional requirements.

For versions <= 0.1.5 jQuery is required.

NOTE: The bower install will not get jQuery for you, if you want to get jQuery from bower too use :code:`bower install jquery`

Usage
-----
To only utilize the LightBox Core, with no plugins. At this point both Core and Plugins CSS is bundled.

.. code-block:: html

   <link rel="stylesheet" href="touch-imagelightbox.css">
   <script src="LightBox.Core.js"></script>
   <script>
      new LightBox.Core('a[lightbox="foo"]');
   </script>

Plugins can be loaded all at once with :code:`LightBox.Plugins.js` or individually :code:`LightBox.[plugin].js`

.. code-block:: html

   <link rel="stylesheet" href="touch-imagelightbox.css">
   <script src="LightBox.Core.js"></script>
   <script src="LightBox.Plugins.js"></script>
   <script>
      var box = new LightBox.Core('a[lightbox="bar"]');
      box.registerPlugin(new LightBox.ActivityIndicator());
      box.registerPlugin(new LightBox.Overlay());
   </script>

Checkout the demos at https://victorhaggqvist.github.io/touch-imagelightbox/.

For more about plugins see :doc:`plugins`.

Options
-------
LightBox can be customised using options. To set custom options pass a options object as a second parameter.

.. code-block:: js

   var options = {
      preloadNext: false
   };
   new LightBox.Core('a[lightbox="foo"]', options);

Available options and defaults

+----------------------+------------------------+-------------------+---------------------------------------+
| Option               | Default                | type              | Description                           |
+======================+========================+===================+=======================================+
| selectorId           | imagelightbox          | string            | The id the lightbox image will get    |
+----------------------+------------------------+-------------------+---------------------------------------+
| allowedTypes         | png\|jpg\|jpeg\|gif    | string            | Image types allowed                   |
+----------------------+------------------------+-------------------+---------------------------------------+
| animationSpeed       | 250                    | integer           | How fast images would fade away       |
+----------------------+------------------------+-------------------+---------------------------------------+
| preloadNext          | true                   | bool              | Silently preload the next image       |
+----------------------+------------------------+-------------------+---------------------------------------+
| enableKeyboard       | true                   | bool              | Enable keyboard shortcuts (arrows     |
|                      |                        |                   | Left/Right and Esc)                   |
+----------------------+------------------------+-------------------+---------------------------------------+
| quitOnEnd            | false                  | bool              | Quit after viewing the last image     |
+----------------------+------------------------+-------------------+---------------------------------------+
| quitOnImgClick       | false                  | bool              | Quit when the viewed image is clicked |
+----------------------+------------------------+-------------------+---------------------------------------+
| quitOnDocClick       | true                   | bool              | Quit when anything but the viewed     |
|                      |                        |                   | image is clicked                      |
+----------------------+------------------------+-------------------+---------------------------------------+



Building
--------

.. code-block:: bash

   git clone https://github.com/victorhaggqvist/touch-imagelightbox.git
   cd touch-imagelightbox
   npm install
   gulp build


Credits
-------
Imagelightbox was originally created by `Osvaldas Valutis`_.

.. _Osvaldas Valutis: http://osvaldas.info/image-lightbox-responsive-touch-friendly

License
-------
MIT
