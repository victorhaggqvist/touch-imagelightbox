/**
 * Created by Victor Häggqvist on 1/12/16.
 */

import {CSSUtil} from './CSSUtil'
import {Log as L} from './Log/Log'
import {animate} from './animate'
import {FetchImage} from './FetchImage'


export class LightBox {

    constructor(targetSelector, options = {}) {
        this.targets = document.querySelectorAll(targetSelector);

        const defaultOptions = {
            allowedTypes:   'png|jpg|jpeg|gif',
            animationSpeed: 250,
            preloadNext:    true,
            enableKeyboard: true,
            quitOnEnd:      false,
            quitOnImgClick: false,
            quitOnDocClick: true,
            onStart:        false,
            onEnd:          false,
            onLoadStart:    false,
            onLoadEnd:      false
        };

        this.options = Object.assign(options, defaultOptions);
        console.log(this.options);

        this.target = null;
        this.image = document.createElement('img');
        this.imageWidth = 0;
        this.imageHeight = 0;
        this.swipeDiff = 0;
        this.inProgress = false;

        this.bindEvents();
    }

    bindEvents() {
        console.log(this.targets);

        Array.prototype.forEach.call(this.targets, ele => {
            ele.onclick = this.onImageClick.bind(this)
        });
        window.addEventListener('resize', this.windowResizeListener.bind(this));
    }

    onImageClick(event) {
        console.log(event);
        let element = event.srcElement.parentElement;
        //console.log(this.isTargetValid(element));
        if (!this.isTargetValid(element)) return true;

        event.preventDefault();

        if (this.inProgress) return;

        this.inProgress = false;

        if (this.options.onStart !== false ) this.options.onStart();

        this.target = element;

        this.loadImage();
    }

    isTargetValid(element) {
        let validTypes = new RegExp("(\.("+this.options.allowedTypes+")$)");

        return element.tagName.toLowerCase() === 'a' && validTypes.test(element.href);
    }

    loadImage(direction = false) {
        L.l('loadImage');
        L.l(this.inProgress);
        if (this.inProgress) return false;
        L.l('not progress');


        this.inProgress = true;
        if (this.options.onLoadStart !== false) this.options.onLoadStart();

        setTimeout(() => {
            L.d('loadImage in');
            let image = new Image();
            this.image = image;
            image.onload = () => {
                image.id='imagelightbox';
                L.l('img loaded');
                //L.l(image);
                document.body.appendChild(image);
                //L.d('setImage');
                this.setImage();

                image.style.opacity = 0;

                CSSUtil.setTransitionProperty(image, 'opacity .3s linear');
                image.style.transform = 'translateX(0px)';

                setTimeout(() => {
                    // without timeout it's to fast to make it fade and just jumps to 1 instant
                    image.style.opacity = 1;
                }, 5);

                if (this.options.preloadNext) {
                    console.log(this.options.preloadNext);
                    let next = null;
                    Array.prototype.forEach.call(this.targets, (t, index) => {
                        if (t == this.target && index+1 !== this.targets.length) {
                            next = this.targets[index+1];
                        }
                    });

                    if (next !== null) {
                        L.d('preloading next');
                        let nextImg = new Image();
                        nextImg.src = next.href;
                    } else {
                        L.d('no preloading');
                    }
                }
            };
            image.src = this.target.href;
        }, this.options.animationSpeed + 100)
    }

    //static animate(elem,style,unit,from,to,time) {
    //    if( !elem) return;
    //    var start = new Date().getTime(),
    //        timer = setInterval(function() {
    //            var step = Math.min(1,(new Date().getTime()-start)/time);
    //            elem.style[style] = (from+step*(to-from))+unit;
    //            if( step == 1) clearInterval(timer);
    //        },25);
    //    elem.style[style] = from+unit;
    //}

    //animate(id, direction, value, end, speed) {
    //    var div = document.getElementById(id);
    //    interval = setInterval(function() {
    //        if (+(div.style) === end) {
    //            clearInterval(interval);
    //            return false;
    //        }
    //        div.style[direction] += value; // or -= as per your needs
    //    }, speed);
    //}

    setImage() {
        //L.l(this.image);
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

    windowResizeListener() {
        console.log('resized')
    }
}
