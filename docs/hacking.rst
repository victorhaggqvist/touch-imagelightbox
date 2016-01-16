Hacking
=======
A plugin are expected to implement a function :code:`register(lightbox)` which will be called when passed the plugin to `LightBox.Core::registerPlugin`. See the full API at :doc:`api`.

A basic plugin could look like this.

.. code-block:: js
    :caption: LightBox.Contrib.MyExitPlugin.js

    class MyExitPlugin {

        register(lightbox) {
            lightbox.addOnEndListener(this.exited.bind(this));
        }

        exited() {
            console.log('lightbox exited');
        }

    }
