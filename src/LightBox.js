/**
 * Created by Victor Häggqvist on 1/12/16.
 */

import {CSSUtil} from './CSSUtil'
import {animate} from './animate'
import {LightDirection} from './LightDirection'
var log = require('loglevel');

log.setDefaultLevel(log.levels.DEBUG);

export class LightBox {

    constructor(targetSelector, options = {}) {
        log.info('LightBox');
        this.targets = document.querySelectorAll(targetSelector);
        log.debug(this.targets);

        log.debug('HAS_TOUCH '+LightBox.HAS_TOUCH);
        const defaultOptions = {
            allowedTypes:   'png|jpg|jpeg|gif',
            selectorId:     'imagelightbox',
            animationSpeed: 350,
            preloadNext:    true,
            enableKeyboard: true,
            quitOnEnd:      false,
            quitOnImgClick: false,
            quitOnDocClick: true,
        };

        this.options = Object.assign(options, defaultOptions);
        log.info(this.options);

        this.target = null;
        this.image = null;
        this.imageWidth = 0;
        this.imageHeight = 0;
        this.swipeDiff = 0;
        this.inProgress = false;

        this.swipeStart = 0;
        this.swipeEnd = 0;
        this.imagePosLeft = 0;


        this.onStartListeners = [];
        this.onEndListeners = [];
        this.onLoadStartListeners = [];
        this.onLoadEndListeners = [];

        this.bindEvents();
    }

    bindEvents() {
        Array.prototype.forEach.call(this.targets, ele => {
            ele.addEventListener('click', this.onImageClick.bind(this));
        });
        window.addEventListener('resize', this.windowResizeListener.bind(this));

        if (this.options.quitOnDocClick) {
            document.body.addEventListener(LightBox.HAS_TOUCH ? 'touchend' : 'click', this.documentClick.bind(this));
        }

        if (this.options.enableKeyboard) {
            document.body.addEventListener('keyup', this.handleKeyboard.bind(this));
        }

        //document.querySelector('#'+this.options.selectorId).addEventListener('click', this.floatingImageClick.bind(this));
    }

    handleKeyboard(e) {
        if (this.image === null) return true;

        e.preventDefault();

        if (e.keyCode === 27) this.quitLightbox();

        if (e.keyCode === 37 || e.keyCode === 39) {
            let gotoIndex = Array.prototype.indexOf.call(this.targets, this.target) - (e.keyCode === 37 ? 1 : -1);

            if (gotoIndex > this.targets.length-1) {
                this.target = this.targets[0];
            } else if (gotoIndex < 0) {
                this.target = this.targets[this.targets.length -1];
            } else {
                this.target = this.targets[gotoIndex];
            }

            this.loadImage(e.keyCode === 37 ? LightDirection.LEFT : LightDirection.RIGHT);
        }
    }


    documentClick() {
        log.debug('document click');

        if (this.image !== null && this.target.href === this.image.src) {
            log.info('quitting');
            this.quitLightbox();
        }
    }

    quitLightbox() {
        log.debug('quitLightbox');
        if (this.image === null) return false;

        CSSUtil.setTransitionProperty(this.image, 'opacity '+this.options.animationSpeed/1000+'s linear');
        setTimeout(() => {
            // without timeout it's to fast to make it fade and just jumps to 1 instant
            this.image.style.opacity = 0;
        }, 5);


        setTimeout(() => {
            this.removeImage();
            this.inProgress = false;

            this.onEndListeners.forEach(l => l());

        }, this.options.animationSpeed);
    }

    onImageClick(event) {
        console.log(event);
        let element = event.srcElement.parentElement;
        //console.log(this.isTargetValid(element));
        if (!this.isTargetValid(element)) return true;

        event.preventDefault();

        if (this.inProgress) return;

        this.inProgress = false;

        this.onStartListeners.forEach(l => l());

        this.target = element;

        this.loadImage();
    }

    isTargetValid(element) {
        let validTypes = new RegExp("(\.("+this.options.allowedTypes+")$)");

        return element.tagName.toLowerCase() === 'a' && validTypes.test(element.href);
    }

    loadImage(direction = false) {
        log.info('loadImage');
        if (this.inProgress) return false;
        log.debug('not progress');

        if (this.image !== null) {
            log.debug('has current image');
            if (direction !== false
                && (this.targets.length < 2
                    || (this.options.quitOnEnd === true
                        && (
                            (direction === LightDirection.RIGHT && Array.prototype.indexOf(this.targets, this.target) === 0)
                            || (direction === LightDirection.LEFT && Array.prototype.indexOf(this.targets, this.target) === targets.length - 1)
                            )
                    )
                )
            ) {
                //quitLightbox();
                return false;
            }

            log.debug('unload');

            CSSUtil.setTransitionProperty(this.image, 'opacity '+this.options.animationSpeed/1000+'s linear');
            let transitionArgs = (100 * direction) - this.swipeDiff + 'px';
            this.image.style.transform = 'translateX('+transitionArgs+')';

            setTimeout(() => {
                // without timeout it's to fast to make it fade and just jumps to 1 instant
                this.image.style.opacity = 0;
            }, 5);

            setTimeout(() => {
                log.debug('remove from dom');
                this.removeImage();
            }, this.options.animationSpeed);

            this.swipeDiff = 0;
        }

        this.inProgress = true;
        this.onLoadStartListeners.forEach(l => l());

        setTimeout(() => {
            log.debug('loadImage in');
            let image = new Image();
            this.image = image;
            image.onload = () => {
                image.id = this.options.selectorId;
                log.debug('img loaded');
                document.body.appendChild(image);
                this.setImage();

                image.style.opacity = 0;

                let interpretedSpeed = this.options.animationSpeed/1000;
                log.debug(interpretedSpeed);
                CSSUtil.setTransitionProperty(image, 'opacity '+interpretedSpeed+'s ease');
                image.style.transform = 'translateX(0px)';

                setTimeout(() => {
                    // without timeout it's to fast to make it fade and just jumps to 1 instant
                    image.style.opacity = 1;
                }, 10);

                setTimeout(() => {
                    this.inProgress = false;
                    this.onLoadEndListeners.forEach(l => l());
                }, this.options.animationSpeed);

                if (this.options.preloadNext) {
                    let index = Array.prototype.indexOf.call(this.targets, this.target)
                    let next = this.targets[index + 1];

                    if (next !== null) {
                        log.debug('preloading next');
                        let nextImg = new Image();
                        nextImg.src = next.href;
                    } else {
                        log.debug('no preloading');
                    }
                }
            };
            image.src = this.target.href;

            this.swipeStart = 0;
            this.swipeEnd = 0;
            //this.imagePosLeft = 0;

            if (LightBox.HAS_POINTERS) {
                image.addEventListener('pointerup', this.imageClickEvent.bind(this));
                image.addEventListener('MSPointerUp', this.imageClickEvent.bind(this));
            } else {
                image.addEventListener('click', this.imageClickEvent.bind(this));
            }

            ['touchstart', 'pointerdown', 'MSPointerDown'].forEach(name => {
                image.addEventListener(name, this.imageTouchStart.bind(this));
            });

            ['touchmove', 'pointermove', 'MSPointerMove'].forEach(name => {
                image.addEventListener(name, this.imageTouchMove.bind(this));
            });

            ['touchend', 'touchcancel', 'pointerup', 'MSPointerUp'].forEach(name => {
                image.addEventListener(name, this.imageTouchEnd.bind(this));
            });

        }, this.options.animationSpeed + 100)
    }

    removeImage() {
        document.body.removeChild(this.image);
        this.image = null;
    }

    imageClickEvent(e) {
        e.preventDefault();
        log.debug('click');

        if (this.options.quitOnImgClick) {
            L.i('implement this');
            //quitLightbox();
            return false;
        }

        if (this.wasTouched(e))
            return true;

        var posX = e.pageX - e.target.offsetLeft;
        log.debug(posX);

        let gotoIndex = Array.prototype.indexOf.call(this.targets, this.target) - (this.imageWidth / 2 > posX ? 1 : -1);

        if (gotoIndex > this.targets.length-1) {
            this.target = this.targets[0];
        } else if (gotoIndex < 0) {
            this.target = this.targets[this.targets.length -1];
        } else {
            this.target = this.targets[gotoIndex];
        }

        this.loadImage(this.imageWidth / 2 > posX ? LightDirection.LEFT : LightDirection.RIGHT);
    }

    imageTouchStart(e) {
        if (!this.wasTouched(e) || this.options.quitOnImgClick)
            return true;

        this.swipeStart = e.pageX || e.touches[0].pageX;
    }

    imageTouchMove(e) {
        if (!this.wasTouched(e) || this.options.quitOnImgClick)
            return true;

        e.preventDefault();
        this.swipeEnd = e.pageX || e.touches[0].pageX;
        this.swipeDiff = this.swipeStart - this.swipeEnd;

        this.image.style.transform = 'translateX('+ (-this.swipeDiff) + 'px)';
        //CSSUtil.setTransitionProperty(this.image, 'transform 0s linear');
    }

    imageTouchEnd(e) {
        if (!this.wasTouched(e) || this.options.quitOnImgClick)
            return true;

        log.debug(this.swipeDiff);
        if (Math.abs(this.swipeDiff) > 50) {
            let gotoIndex = Array.prototype.indexOf.call(this.targets, this.target) - ( this.swipeDiff < 0 ? 1 : -1 );

            if (gotoIndex > this.targets.length-1) {
                this.target = this.targets[0];
            } else if (gotoIndex < 0) {
                this.target = this.targets[this.targets.length -1];
            } else {
                this.target = this.targets[gotoIndex];
            }

            let direction = this.swipeDiff > 0 ? LightDirection.RIGHT : LightDirection.LEFT;
            this.loadImage(direction);
        } else {
            this.image.style.transform = 'translateX(0px)';
            //CSSUtil.setTransitionProperty(this.image, 'transform '+ options.animationSpeed / 1000 +'s linear');
        }
    }

    setImage() {
        if (!this.image) return false;

        let screenWidth = window.innerWidth * 0.8;
        let screenHeight = window.innerHeight * 0.9;

        let tmpImage = new Image();
        tmpImage.src  = this.image.src;
        tmpImage.onload = () => {
            this.imageWidth   = tmpImage.width;
            this.imageHeight  = tmpImage.height;

            if (this.imageWidth > screenWidth || this.imageHeight > screenHeight) {
                let ratio  = this.imageWidth / this.imageHeight > screenWidth / screenHeight ? this.imageWidth / screenWidth : this.imageHeight / screenHeight;
                this.imageWidth  /= ratio;
                this.imageHeight /= ratio;
            }

            this.image.style.width = this.imageWidth + 'px';
            this.image.style.height = this.imageHeight + 'px';
            this.image.style.top =  (window.innerHeight - this.imageHeight) / 2 + 'px';
            this.image.style.left = (window.innerWidth - this.imageWidth) / 2 + 'px';
        };
    }

    wasTouched(event) {
        if (LightBox.HAS_TOUCH) return true;

        if (!LightBox.HAS_POINTERS || typeof event === 'undefined' || typeof event.pointerType === 'undefined')
            return false;

        if (typeof event.MSPOINTER_TYPE_MOUSE !== 'undefined') {
            if (event.MSPOINTER_TYPE_MOUSE !== event.pointerType)
                return true;
        } else {
            if (event.pointerType !== 'mouse')
                return true;
        }

        return false;
    };

    windowResizeListener() {
        log.debug('resized');
        this.setImage();
    }

    addOnStartListener(listener) {
        this.onStartListeners.push(listener);
    }

    addOnEndListener(listener) {
        this.onEndListeners.push(listener);
    }

    addOnLoadStartListener(listener) {
        this.onLoadStartListeners.push(listener);
    }

    addOnLoadEndListener(listener) {
        this.onLoadEndListeners.push(listener);
    }

    registerPlugin(plugin) {
        plugin.register(this);
    }
}

LightBox.HAS_TOUCH = ('ontouchstart' in window);
LightBox.HAS_POINTERS = window.navigator.pointerEnabled || window.navigator.msPointerEnabled;
