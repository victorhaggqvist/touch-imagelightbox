/**
 * @author Victor Häggqvist
 * @since 2016-01-14
 */


export default class CloseButton {

    constructor(closeOnDocumentClick=false) {
        this.closeOnDocumentClick = closeOnDocumentClick;
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
        this.lightbox.options.quitOnDocClick = this.closeOnDocumentClick;
        ['click', 'touchend'].forEach(name => {
            this.element.addEventListener(name, this.exitLightbox.bind(this));
        });

        document.body.appendChild(this.element);
    }

    hideButton() {
        document.body.removeChild(this.element);
    }

    exitLightbox() {
        this.lightbox.quitLightbox();
    }

}
