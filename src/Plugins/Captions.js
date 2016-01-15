/**
 * @author Victor Häggqvist
 * @since 2016-01-16
 */

export class Captions {

    constructor() {
        this.element = document.createElement('div');
        this.element.id = 'imagelightbox-caption';
        //this.element.innerHTML = 'Close';
    }

    register(lightbox) {
        this.lightbox = lightbox;
        lightbox.addOnLoadStartListener(this.hideCaption.bind(this));
        lightbox.addOnLoadEndListener(this.showCaption.bind(this));
        lightbox.addOnEndListener(this.hideCaption.bind(this));
    }

    showCaption() {
        let img = this.lightbox.target.querySelector('img');

        if (img === null) return;

        let caption = img.getAttribute('alt');
        if (caption !== null && caption.length > 0) {
            this.element.innerHTML = img.alt;
            document.body.appendChild(this.element);
        }
    }

    hideCaption() {
        try {
            document.body.removeChild(this.element);
        } catch (e) {}
    }

}
