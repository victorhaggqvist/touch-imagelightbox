Core API
========

A `LightBox.Core` object have the following public API that can be considered stable. I you are creating a plugin you might want to check :doc:`hacking`.


**quitLightbox()**
Exit and remove the lightbox


**switchToIndex(** index **)**
Switch to image *index* in targets array

index
    **int**


**addOnStartListener(** listener **)**
Add a OnStartListener

listener
    **function**


**addOnEndListener(** listener **)**
Add a OnEndListener

listener
    **function**


**addOnLoadStartListener(** listener **)**
Add a OnLoadStartListener

listener
    **function**


**addOnLoadEndListener(** listener **)**
Add a OnLoadEndListener

listener
    **function**


**registerPlugin(** plugin **)**
Register a plugin

plugin
    **Object**
