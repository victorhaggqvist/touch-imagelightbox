/**
 * @author Victor Häggqvist
 * @since 2016-01-14
 */

export default class Overlay {

    constructor() {
        this.element = document.createElement('div');
        this.element.id = 'imagelightbox-overlay';
    }

    register(lightbox) {
        lightbox.addOnStartListener(this.overlayOn.bind(this));
        lightbox.addOnEndListener(this.overlayOff.bind(this));
    }

    overlayOn() {
        document.body.appendChild(this.element);
    }

    overlayOff() {
        document.body.removeChild(this.element);
    }

}


