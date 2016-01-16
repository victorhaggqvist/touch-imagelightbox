/**
 * @author Victor Häggqvist
 * @since 1/15/16
 */

export default class Navigation {

    register(lightbox) {
        this.lightbox = lightbox;
        lightbox.addOnStartListener(this.showNavigation.bind(this));
        lightbox.addOnEndListener(this.hideNavigation.bind(this));
        lightbox.addOnLoadEndListener(this.updateNavigation.bind(this));
    }


    showNavigation() {
        this.sink = document.createElement('div');
        this.sink.id = 'imagelightbox-nav-sink';
        this.nav = document.createElement('div');
        this.nav.id = 'imagelightbox-nav';
        this.sink.appendChild(this.nav);

        Array.prototype.forEach.call(this.lightbox.targets, _ => {
            this.nav.appendChild(document.createElement('a'));
        });

        document.body.appendChild(this.sink);

        let navItems = this.nav.querySelectorAll('a');
        Array.prototype.forEach.call(navItems, (item, i) => {
            ['click', 'touchend'].forEach(name => {
                item.addEventListener(name, this.navClick.bind(this, i));
            })
        });

        // make the nav actually centered, flex center dont make it
        let rect = this.nav.getBoundingClientRect();
        let diff = rect.width/2;
        this.nav.style.marginLeft = '-'+diff+'px';
    }

    updateNavigation() {
        Array.prototype.forEach.call(this.nav.childNodes, n => {
           n.classList.remove('active');
        });

        let current = Array.prototype.indexOf.call(this.lightbox.targets, this.lightbox.target);
        this.nav.childNodes[current].classList.add('active');
    }

    hideNavigation() {
        try {
            document.body.removeChild(this.sink);
        } catch (e) {}
    };

    navClick(index, e) {
        e.stopPropagation();
        e.cancelBubble = true;
        this.lightbox.switchToIndex(index);
    }

}
