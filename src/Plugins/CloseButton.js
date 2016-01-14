/**
 * @author Victor Häggqvist
 * @since 2016-01-14
 */


export class CloseButton {

    constructor() {
        this.element = document.createElement('a');
        this.element.id = 'imagelightbox-close';
        this.element.innerHTML = 'Close';
    }

    register(lightbox) {
        this.lightbox = lightbox;
        lightbox.addOnStartListener(this.showButton.bind(this));
        lightbox.addOnEndListener(this.hideButton.bind(this));
    }

    showButton() {
        ['click', 'touchend'].forEach(name => {
            this.element.addEventListener(name, this.exitLightbox.bind(this));
        });

        document.body.appendChild(this.element);

        //$('<a href="#" id="imagelightbox-close">Close</a>').appendTo('body')
        //    .on('click touchend', function(){ $(this).remove(); instance.quitImageLightbox(); return false; });
    }

    hideButton() {
        document.body.removeChild(this.element);
    }

    exitLightbox() {
        this.lightbox.quitImageLightbox();
    }

}
