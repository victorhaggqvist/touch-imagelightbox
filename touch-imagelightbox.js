var LightBox =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(8);
	__webpack_require__(9);
	module.exports = __webpack_require__(10);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Victor Häggqvist on 1/12/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.LightBox = undefined;

	var _CSSUtil = __webpack_require__(2);

	var _animate = __webpack_require__(3);

	var _LightDirection = __webpack_require__(4);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var log = __webpack_require__(5);

	log.setDefaultLevel(log.levels.DEBUG);

	var LightBox = exports.LightBox = function () {
	    function LightBox(targetSelector) {
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        _classCallCheck(this, LightBox);

	        log.info('LightBox');
	        this.targets = document.querySelectorAll(targetSelector);
	        log.debug(this.targets);

	        log.debug('HAS_TOUCH ' + LightBox.HAS_TOUCH);
	        var defaultOptions = {
	            allowedTypes: 'png|jpg|jpeg|gif',
	            selectorId: 'imagelightbox',
	            animationSpeed: 350,
	            preloadNext: true,
	            enableKeyboard: true,
	            quitOnEnd: false,
	            quitOnImgClick: false,
	            quitOnDocClick: true,
	            //onStart:        false,
	            //onEnd:          false,
	            //onLoadStart:    false,
	            //onLoadEnd:      false,
	            requestFullscreenOnMobile: true
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

	    _createClass(LightBox, [{
	        key: 'bindEvents',
	        value: function bindEvents() {
	            var _this = this;

	            Array.prototype.forEach.call(this.targets, function (ele) {
	                ele.addEventListener('click', _this.onImageClick.bind(_this));
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
	    }, {
	        key: 'handleKeyboard',
	        value: function handleKeyboard(e) {
	            if (this.image === null) return true;

	            e.preventDefault();

	            if (e.keyCode === 27) this.quitLightbox();

	            if (e.keyCode === 37 || e.keyCode === 39) {
	                var gotoIndex = Array.prototype.indexOf.call(this.targets, this.target) - (e.keyCode === 37 ? 1 : -1);

	                if (gotoIndex > this.targets.length - 1) {
	                    this.target = this.targets[0];
	                } else if (gotoIndex < 0) {
	                    this.target = this.targets[this.targets.length - 1];
	                } else {
	                    this.target = this.targets[gotoIndex];
	                }

	                this.loadImage(e.keyCode === 37 ? _LightDirection.LightDirection.LEFT : _LightDirection.LightDirection.RIGHT);
	            }
	        }
	    }, {
	        key: 'documentClick',
	        value: function documentClick() {
	            log.debug('document click');

	            if (this.image !== null && this.target.href === this.image.src) {
	                log.info('quitting');
	                this.quitLightbox();
	            }
	        }
	    }, {
	        key: 'quitLightbox',
	        value: function quitLightbox() {
	            var _this2 = this;

	            log.debug('quitLightbox');
	            if (this.image === null) return false;

	            _CSSUtil.CSSUtil.setTransitionProperty(this.image, 'opacity ' + this.options.animationSpeed / 1000 + 's linear');
	            setTimeout(function () {
	                // without timeout it's to fast to make it fade and just jumps to 1 instant
	                _this2.image.style.opacity = 0;
	            }, 5);

	            setTimeout(function () {
	                _this2.removeImage();
	                _this2.inProgress = false;
	                if (_this2.options.onEnd !== false) _this2.options.onEnd();
	            }, this.options.animationSpeed);
	        }
	    }, {
	        key: 'onImageClick',
	        value: function onImageClick(event) {
	            console.log(event);
	            var element = event.srcElement.parentElement;
	            //console.log(this.isTargetValid(nav));
	            if (!this.isTargetValid(element)) return true;

	            event.preventDefault();

	            //if (LightBox.HAS_TOUCH) {
	            //    log.debug('requesting fullscreen');
	            //    document.body.webkitRequestFullscreen()
	            //}

	            if (this.inProgress) return;

	            this.inProgress = false;

	            this.onStartListener.forEach(function (l) {
	                return l();
	            });

	            this.target = element;

	            this.loadImage();
	        }
	    }, {
	        key: 'isTargetValid',
	        value: function isTargetValid(element) {
	            var validTypes = new RegExp("(\.(" + this.options.allowedTypes + ")$)");

	            return element.tagName.toLowerCase() === 'a' && validTypes.test(element.href);
	        }
	    }, {
	        key: 'loadImage',
	        value: function loadImage() {
	            var _this3 = this;

	            var direction = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	            log.info('loadImage');
	            if (this.inProgress) return false;
	            log.debug('not progress');

	            if (this.image !== null) {
	                log.debug('has current image');
	                if (direction !== false && (this.targets.length < 2 || this.options.quitOnEnd === true && (direction === _LightDirection.LightDirection.RIGHT && Array.prototype.indexOf(this.targets, this.target) === 0 || direction === _LightDirection.LightDirection.LEFT && Array.prototype.indexOf(this.targets, this.target) === targets.length - 1))) {
	                    //quitLightbox();
	                    return false;
	                }

	                log.debug('unload');

	                _CSSUtil.CSSUtil.setTransitionProperty(this.image, 'opacity ' + this.options.animationSpeed / 1000 + 's linear');
	                var transitionArgs = 100 * direction - this.swipeDiff + 'px';
	                this.image.style.transform = 'translateX(' + transitionArgs + ')';

	                setTimeout(function () {
	                    // without timeout it's to fast to make it fade and just jumps to 1 instant
	                    _this3.image.style.opacity = 0;
	                }, 5);

	                setTimeout(function () {
	                    log.debug('remove from dom');
	                    _this3.removeImage();
	                }, this.options.animationSpeed);

	                this.swipeDiff = 0;
	            }

	            this.inProgress = true;
	            this.onLoadStartListeners.forEach(function (l) {
	                return l();
	            });

	            setTimeout(function () {
	                log.debug('loadImage in');
	                var image = new Image();
	                _this3.image = image;
	                image.onload = function () {
	                    image.id = _this3.options.selectorId;
	                    log.debug('img loaded');
	                    document.body.appendChild(image);
	                    _this3.setImage();

	                    image.style.opacity = 0;

	                    var interpretedSpeed = _this3.options.animationSpeed / 1000;
	                    log.debug(interpretedSpeed);
	                    _CSSUtil.CSSUtil.setTransitionProperty(image, 'opacity ' + interpretedSpeed + 's ease');
	                    image.style.transform = 'translateX(0px)';

	                    setTimeout(function () {
	                        // without timeout it's to fast to make it fade and just jumps to 1 instant
	                        image.style.opacity = 1;
	                    }, 10);

	                    setTimeout(function () {
	                        _this3.inProgress = false;
	                        _this3.onLoadEndListeners.forEach(function (l) {
	                            return l();
	                        });
	                    }, _this3.options.animationSpeed);

	                    if (_this3.options.preloadNext) {
	                        var index = Array.prototype.indexOf.call(_this3.targets, _this3.target);
	                        var next = _this3.targets[index + 1];

	                        if (next !== null) {
	                            log.debug('preloading next');
	                            var nextImg = new Image();
	                            nextImg.src = next.href;
	                        } else {
	                            log.debug('no preloading');
	                        }
	                    }
	                };
	                image.src = _this3.target.href;

	                _this3.swipeStart = 0;
	                _this3.swipeEnd = 0;
	                //this.imagePosLeft = 0;

	                if (LightBox.HAS_POINTERS) {
	                    image.addEventListener('pointerup', _this3.imageClickEvent.bind(_this3));
	                    image.addEventListener('MSPointerUp', _this3.imageClickEvent.bind(_this3));
	                } else {
	                    image.addEventListener('click', _this3.imageClickEvent.bind(_this3));
	                }

	                ['touchstart', 'pointerdown', 'MSPointerDown'].forEach(function (name) {
	                    image.addEventListener(name, _this3.imageTouchStart.bind(_this3));
	                });

	                ['touchmove', 'pointermove', 'MSPointerMove'].forEach(function (name) {
	                    image.addEventListener(name, _this3.imageTouchMove.bind(_this3));
	                });

	                ['touchend', 'touchcancel', 'pointerup', 'MSPointerUp'].forEach(function (name) {
	                    image.addEventListener(name, _this3.imageTouchEnd.bind(_this3));
	                });
	            }, this.options.animationSpeed + 100);
	        }
	    }, {
	        key: 'removeImage',
	        value: function removeImage() {
	            document.body.removeChild(this.image);
	            this.image = null;
	        }
	    }, {
	        key: 'imageClickEvent',
	        value: function imageClickEvent(e) {
	            e.preventDefault();
	            log.debug('click');

	            if (this.options.quitOnImgClick) {
	                L.i('implement this');
	                //quitLightbox();
	                return false;
	            }

	            if (this.wasTouched(e)) return true;

	            var posX = e.pageX - e.target.offsetLeft;
	            log.debug(posX);

	            var gotoIndex = Array.prototype.indexOf.call(this.targets, this.target) - (this.imageWidth / 2 > posX ? 1 : -1);

	            if (gotoIndex > this.targets.length - 1) {
	                this.target = this.targets[0];
	            } else if (gotoIndex < 0) {
	                this.target = this.targets[this.targets.length - 1];
	            } else {
	                this.target = this.targets[gotoIndex];
	            }

	            this.loadImage(this.imageWidth / 2 > posX ? _LightDirection.LightDirection.LEFT : _LightDirection.LightDirection.RIGHT);
	        }
	    }, {
	        key: 'imageTouchStart',
	        value: function imageTouchStart(e) {
	            if (!this.wasTouched(e) || this.options.quitOnImgClick) return true;

	            this.swipeStart = e.pageX || e.touches[0].pageX;
	        }
	    }, {
	        key: 'imageTouchMove',
	        value: function imageTouchMove(e) {
	            if (!this.wasTouched(e) || this.options.quitOnImgClick) return true;

	            e.preventDefault();
	            this.swipeEnd = e.pageX || e.touches[0].pageX;
	            this.swipeDiff = this.swipeStart - this.swipeEnd;

	            this.image.style.transform = 'translateX(' + -this.swipeDiff + 'px)';
	            //CSSUtil.setTransitionProperty(this.image, 'transform 0s linear');
	        }
	    }, {
	        key: 'imageTouchEnd',
	        value: function imageTouchEnd(e) {
	            if (!this.wasTouched(e) || this.options.quitOnImgClick) return true;

	            log.debug(this.swipeDiff);
	            if (Math.abs(this.swipeDiff) > 50) {
	                var gotoIndex = Array.prototype.indexOf.call(this.targets, this.target) - (this.swipeDiff < 0 ? 1 : -1);

	                if (gotoIndex > this.targets.length - 1) {
	                    this.target = this.targets[0];
	                } else if (gotoIndex < 0) {
	                    this.target = this.targets[this.targets.length - 1];
	                } else {
	                    this.target = this.targets[gotoIndex];
	                }

	                var direction = this.swipeDiff > 0 ? _LightDirection.LightDirection.RIGHT : _LightDirection.LightDirection.LEFT;
	                this.loadImage(direction);
	            } else {
	                this.image.style.transform = 'translateX(0px)';
	                //CSSUtil.setTransitionProperty(this.image, 'transform '+ options.animationSpeed / 1000 +'s linear');
	            }
	        }
	    }, {
	        key: 'setImage',
	        value: function setImage() {
	            var _this4 = this;

	            if (!this.image) return false;

	            var screenWidth = window.innerWidth * 0.8;
	            var screenHeight = window.innerHeight * 0.9;

	            var tmpImage = new Image();
	            tmpImage.src = this.image.src;
	            tmpImage.onload = function () {
	                _this4.imageWidth = tmpImage.width;
	                _this4.imageHeight = tmpImage.height;

	                if (_this4.imageWidth > screenWidth || _this4.imageHeight > screenHeight) {
	                    var ratio = _this4.imageWidth / _this4.imageHeight > screenWidth / screenHeight ? _this4.imageWidth / screenWidth : _this4.imageHeight / screenHeight;
	                    _this4.imageWidth /= ratio;
	                    _this4.imageHeight /= ratio;
	                }

	                _this4.image.style.width = _this4.imageWidth + 'px';
	                _this4.image.style.height = _this4.imageHeight + 'px';
	                _this4.image.style.top = (window.innerHeight - _this4.imageHeight) / 2 + 'px';
	                _this4.image.style.left = (window.innerWidth - _this4.imageWidth) / 2 + 'px';
	            };
	        }
	    }, {
	        key: 'wasTouched',
	        value: function wasTouched(event) {
	            if (LightBox.HAS_TOUCH) return true;

	            if (!LightBox.HAS_POINTERS || typeof event === 'undefined' || typeof event.pointerType === 'undefined') return false;

	            if (typeof event.MSPOINTER_TYPE_MOUSE !== 'undefined') {
	                if (event.MSPOINTER_TYPE_MOUSE !== event.pointerType) return true;
	            } else {
	                if (event.pointerType !== 'mouse') return true;
	            }

	            return false;
	        }
	    }, {
	        key: 'windowResizeListener',
	        value: function windowResizeListener() {
	            log.debug('resized');
	            this.setImage();
	        }
	    }, {
	        key: 'addOnStartListener',
	        value: function addOnStartListener(listener) {
	            this.onStartListeners.push(listener);
	        }
	    }, {
	        key: 'addOnEndListener',
	        value: function addOnEndListener(listener) {
	            this.onEndListeners.push(listener);
	        }
	    }, {
	        key: 'addOnLoadStartListener',
	        value: function addOnLoadStartListener(listener) {
	            this.onLoadStartListeners.push(listener);
	        }
	    }, {
	        key: 'addOnLoadEndListener',
	        value: function addOnLoadEndListener(listener) {
	            this.onLoadEndListeners.push(listener);
	        }
	    }, {
	        key: 'registerPlugin',
	        value: function registerPlugin(plugin) {
	            plugin.register(this);
	        }
	    }]);

	    return LightBox;
	}();

	LightBox.HAS_TOUCH = 'ontouchstart' in window;
	LightBox.HAS_POINTERS = window.navigator.pointerEnabled || window.navigator.msPointerEnabled;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by Victor Häggqvist on 1/12/16.
	 */

	var CSSUtil = exports.CSSUtil = function () {
	    function CSSUtil() {
	        _classCallCheck(this, CSSUtil);
	    }

	    _createClass(CSSUtil, null, [{
	        key: 'setTransitionProperty',

	        /**
	         * transion need to be set on property
	         *
	         * using key-value dont work
	         *
	         * @param ele DOMElement
	         * @param value
	         */
	        value: function setTransitionProperty(ele, value) {
	            var style = ele.style;
	            if (style.transition === '') {
	                style.transition = value;
	                return;
	            }
	            if (style.WebkitTransition === '') {
	                style.WebkitTransition = value;
	                return;
	            }
	            if (style.MozTransition === '') {
	                style.MozTransition = value;
	                return;
	            }
	            if (style.OTransition === '') {
	                style.OTransition = value;
	            }
	        }
	    }, {
	        key: 'cssTransitionSupport',
	        value: function cssTransitionSupport() {
	            var d = document.body || document.documentElement,
	                s = d.style;
	            if (s.WebkitTransition === '') return '-webkit-';
	            if (s.MozTransition === '') return '-moz-';
	            if (s.OTransition === '') return '-o-';
	            if (s.transition === '') return '';
	            return false;
	        }
	    }, {
	        key: 'cssTransitionTranslateX',
	        value: function cssTransitionTranslateX(element, positionX, speed) {
	            var options = {};
	            var prefix = CSSUtil.cssTransitionSupport();
	            element.style[prefix + 'transform'] = 'translateX(' + positionX + ')';
	            element.style[prefix + 'transition'] = prefix + 'transform ' + speed + 's linear';
	            //nav.style = Object.assign(options, nav.style);
	        }
	    }]);

	    return CSSUtil;
	}();

	CSSUtil.isCssTransitionSupport = CSSUtil.cssTransitionSupport() !== false;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var animate = exports.animate = function () {

	    "use strict";

	    var defaults = {
	        delay: 0,
	        duration: 400,
	        easing: "ease"
	    };

	    // array utils ===================================================================================

	    var head = function head(arr) {
	        return arr[0];
	    };

	    var tail = function tail(arr) {
	        return arr.slice(1);
	    };

	    var contains = function () {
	        return Array.prototype.includes ? function (arr, value) {
	            return arr.includes(value);
	        } : function (arr, value) {
	            return arr.some(function (el) {
	                return el === value;
	            });
	        };
	    }();

	    var toArray = function toArray(obj) {
	        if (obj.nodeType) {
	            return [obj];
	        }
	        if (Array.isArray(obj)) {
	            return obj;
	        }
	        return [].concat(_toConsumableArray(obj));
	    };

	    // params utils ==================================================================================

	    var requireParams = function requireParams(func) {
	        return function (params) {
	            if ((typeof params === "undefined" ? "undefined" : _typeof(params)) != "object") return;
	            func(params);
	        };
	    };

	    var getParamsEl = function getParamsEl(el) {
	        return toArray(typeof el == "string" ? selectElements(el) : el);
	    };

	    // misc utils ====================================================================================

	    var selectElements = function selectElements(selector) {
	        var context = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];

	        if (/^[\#.]?[\w-]+$/.test(selector)) {
	            if (head(selector) == ".") {
	                return context.getElementsByClassName(tail(selector));
	            }
	            if (head(selector) == "#") {
	                return context.getElementById(tail(selector));
	            }
	            return context.getElementsByTagName(selector);
	        }
	        return context.querySelectorAll(selector);
	    };

	    var hasUnit = function hasUnit(value) {
	        return (/\D$/.test(value)
	        );
	    };

	    // transition ====================================================================================

	    var setTransition = function () {
	        var addUnit = function addUnit(value) {
	            if (hasUnit(value)) {
	                return value;
	            }
	            return value + "ms";
	        };
	        return function (el, params) {
	            var transition = {
	                "property": "opacity," + transformProperty(),
	                "duration": addUnit(params.duration || defaults.duration),
	                "timing-function": params.easing || defaults.easing,
	                "delay": addUnit(params.delay || defaults.delay)
	            };
	            Object.keys(transition).forEach(function (prop) {
	                el.style["transition-" + prop] = transition[prop];
	            });
	        };
	    }();

	    var clearTransition = function clearTransition(params) {
	        var clearListener = function clearListener(event) {
	            event.target.removeEventListener("transitionend", clearListener);
	            if (!params.complete) return;
	            params.complete.call(event.target);
	        };
	        return clearListener;
	    };

	    // opacity =======================================================================================

	    var setOpacity = function setOpacity(el, params) {
	        if (params.opacity == undefined) return;
	        el.style.opacity = params.opacity;
	    };

	    // transform =====================================================================================

	    var transformProperty = function () {
	        var transform;
	        return function () {
	            if (!transform) {
	                transform = "transform" in document.body.style ? "transform" : "-webkit-transform";
	            }
	            return transform;
	        };
	    }();

	    var isTransform = function () {
	        var ignore = ["complete", "el", "opacity"].concat(Object.keys(defaults));
	        return function (key) {
	            return !contains(ignore, key);
	        };
	    }();

	    var getTransformFunctions = function getTransformFunctions(params) {
	        return Object.keys(params).filter(function (key) {
	            return isTransform(key);
	        });
	    };

	    var setTransform = function () {
	        var addUnit = function addUnit(transformFunction, value) {
	            if (hasUnit(value) || /scale/.test(transformFunction)) {
	                return value;
	            }
	            if (/rotate|skew/.test(transformFunction)) {
	                return value + "deg";
	            }
	            return value + "px";
	        };
	        return function (el, params) {
	            var transforms = getTransformFunctions(params);
	            if (!transforms.length) return;
	            el.style[transformProperty()] = transforms.map(function (func) {
	                return func + "(" + addUnit(func, params[func]) + ")";
	            }).join(" ");
	        };
	    }();

	    // init ==========================================================================================

	    var setStyle = function setStyle(params) {
	        return function (el) {
	            // wait for the next frame
	            requestAnimationFrame(function () {
	                [setTransition, setOpacity, setTransform].forEach(function (func) {
	                    func(el, params);
	                });
	            });
	            el.addEventListener("transitionend", clearTransition(params));
	        };
	    };

	    return requireParams(function (params) {
	        getParamsEl(params.el).forEach(setStyle(params));
	    });
	}();

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by Victor Häggqvist on 1/14/16.
	 */

	var LightDirection = exports.LightDirection = function LightDirection() {
	  _classCallCheck(this, LightDirection);
	};

	LightDirection.LEFT = 1;
	LightDirection.RIGHT = -1;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/*
	* loglevel - https://github.com/pimterry/loglevel
	*
	* Copyright (c) 2013 Tim Perry
	* Licensed under the MIT license.
	*/
	(function (root, definition) {
	    "use strict";

	    if (( false ? 'undefined' : _typeof(module)) === 'object' && module.exports && "function" === 'function') {
	        module.exports = definition();
	    } else if ("function" === 'function' && _typeof(__webpack_require__(7)) === 'object') {
	        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	        root.log = definition();
	    }
	})(undefined, function () {
	    "use strict";

	    var noop = function noop() {};
	    var undefinedType = "undefined";

	    function realMethod(methodName) {
	        if ((typeof console === 'undefined' ? 'undefined' : _typeof(console)) === undefinedType) {
	            return false; // We can't build a real method without a console to log to
	        } else if (console[methodName] !== undefined) {
	                return bindMethod(console, methodName);
	            } else if (console.log !== undefined) {
	                return bindMethod(console, 'log');
	            } else {
	                return noop;
	            }
	    }

	    function bindMethod(obj, methodName) {
	        var method = obj[methodName];
	        if (typeof method.bind === 'function') {
	            return method.bind(obj);
	        } else {
	            try {
	                return Function.prototype.bind.call(method, obj);
	            } catch (e) {
	                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
	                return function () {
	                    return Function.prototype.apply.apply(method, [obj, arguments]);
	                };
	            }
	        }
	    }

	    // these private functions always need `this` to be set properly

	    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
	        return function () {
	            if ((typeof console === 'undefined' ? 'undefined' : _typeof(console)) !== undefinedType) {
	                replaceLoggingMethods.call(this, level, loggerName);
	                this[methodName].apply(this, arguments);
	            }
	        };
	    }

	    function replaceLoggingMethods(level, loggerName) {
	        /*jshint validthis:true */
	        for (var i = 0; i < logMethods.length; i++) {
	            var methodName = logMethods[i];
	            this[methodName] = i < level ? noop : this.methodFactory(methodName, level, loggerName);
	        }
	    }

	    function defaultMethodFactory(methodName, level, loggerName) {
	        /*jshint validthis:true */
	        return realMethod(methodName) || enableLoggingWhenConsoleArrives.apply(this, arguments);
	    }

	    var logMethods = ["trace", "debug", "info", "warn", "error"];

	    function Logger(name, defaultLevel, factory) {
	        var self = this;
	        var currentLevel;
	        var storageKey = "loglevel";
	        if (name) {
	            storageKey += ":" + name;
	        }

	        function persistLevelIfPossible(levelNum) {
	            var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

	            // Use localStorage if available
	            try {
	                window.localStorage[storageKey] = levelName;
	                return;
	            } catch (ignore) {}

	            // Use session cookie as fallback
	            try {
	                window.document.cookie = encodeURIComponent(storageKey) + "=" + levelName + ";";
	            } catch (ignore) {}
	        }

	        function getPersistedLevel() {
	            var storedLevel;

	            try {
	                storedLevel = window.localStorage[storageKey];
	            } catch (ignore) {}

	            if ((typeof storedLevel === 'undefined' ? 'undefined' : _typeof(storedLevel)) === undefinedType) {
	                try {
	                    var cookie = window.document.cookie;
	                    var location = cookie.indexOf(encodeURIComponent(storageKey) + "=");
	                    if (location) {
	                        storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
	                    }
	                } catch (ignore) {}
	            }

	            // If the stored level is not valid, treat it as if nothing was stored.
	            if (self.levels[storedLevel] === undefined) {
	                storedLevel = undefined;
	            }

	            return storedLevel;
	        }

	        /*
	         *
	         * Public API
	         *
	         */

	        self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
	            "ERROR": 4, "SILENT": 5 };

	        self.methodFactory = factory || defaultMethodFactory;

	        self.getLevel = function () {
	            return currentLevel;
	        };

	        self.setLevel = function (level, persist) {
	            if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
	                level = self.levels[level.toUpperCase()];
	            }
	            if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
	                currentLevel = level;
	                if (persist !== false) {
	                    // defaults to true
	                    persistLevelIfPossible(level);
	                }
	                replaceLoggingMethods.call(self, level, name);
	                if ((typeof console === 'undefined' ? 'undefined' : _typeof(console)) === undefinedType && level < self.levels.SILENT) {
	                    return "No console available for logging";
	                }
	            } else {
	                throw "log.setLevel() called with invalid level: " + level;
	            }
	        };

	        self.setDefaultLevel = function (level) {
	            if (!getPersistedLevel()) {
	                self.setLevel(level, false);
	            }
	        };

	        self.enableAll = function (persist) {
	            self.setLevel(self.levels.TRACE, persist);
	        };

	        self.disableAll = function (persist) {
	            self.setLevel(self.levels.SILENT, persist);
	        };

	        // Initialize with the right level
	        var initialLevel = getPersistedLevel();
	        if (initialLevel == null) {
	            initialLevel = defaultLevel == null ? "WARN" : defaultLevel;
	        }
	        self.setLevel(initialLevel, false);
	    }

	    /*
	     *
	     * Package-level API
	     *
	     */

	    var defaultLogger = new Logger();

	    var _loggersByName = {};
	    defaultLogger.getLogger = function getLogger(name) {
	        if (typeof name !== "string" || name === "") {
	            throw new TypeError("You must supply a name when creating a logger.");
	        }

	        var logger = _loggersByName[name];
	        if (!logger) {
	            logger = _loggersByName[name] = new Logger(name, defaultLogger.getLevel(), defaultLogger.methodFactory);
	        }
	        return logger;
	    };

	    // Grab the current global log variable in case of overwrite
	    var _log = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== undefinedType ? window.log : undefined;
	    defaultLogger.noConflict = function () {
	        if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== undefinedType && window.log === defaultLogger) {
	            window.log = _log;
	        }

	        return defaultLogger;
	    };

	    return defaultLogger;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by Victor Häggqvist on 1/14/16.
	 */

	var ActivityIndicator = exports.ActivityIndicator = function () {
	    function ActivityIndicator() {
	        _classCallCheck(this, ActivityIndicator);

	        this.nav = document.createElement('div');
	        this.nav.id = 'imagelightbox-loading';
	        this.nav.appendChild(document.createElement('div'));
	    }

	    /**
	     *
	     * @param {LightBox} lightbox
	     */

	    _createClass(ActivityIndicator, [{
	        key: 'register',
	        value: function register(lightbox) {
	            lightbox.addOnLoadStartListener(this.activityIndicatorOn.bind(this));
	            lightbox.addOnLoadEndListener(this.activityIndicatorOff.bind(this));
	            lightbox.addOnEndListener(this.activityIndicatorOff.bind(this));
	        }
	    }, {
	        key: 'activityIndicatorOn',
	        value: function activityIndicatorOn() {
	            document.body.appendChild(this.nav);
	            //$('<div id="imagelightbox-loading"><div></div></div>' ).appendTo('body');
	        }
	    }, {
	        key: 'activityIndicatorOff',
	        value: function activityIndicatorOff() {
	            document.body.removeChild(this.nav);
	            //$('#imagelightbox-loading').remove();
	        }
	    }]);

	    return ActivityIndicator;
	}();

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by Victor Häggqvist on 1/14/16.
	 */

	var CloseButton = exports.CloseButton = function () {
	    function CloseButton() {
	        _classCallCheck(this, CloseButton);

	        this.nav = document.createElement('a');
	        this.nav.id = 'imagelightbox-close';
	        this.nav.innerHTML = 'Close';
	    }

	    _createClass(CloseButton, [{
	        key: 'register',
	        value: function register(lightbox) {
	            this.lightbox = lightbox;
	            lightbox.addOnStartListener(this.showButton.bind(this));
	            lightbox.addOnEndListener(this.hideButton.bind(this));
	        }
	    }, {
	        key: 'showButton',
	        value: function showButton() {
	            var _this = this;

	            ['click', 'touchend'].forEach(function (name) {
	                _this.nav.addEventListener(name, _this.exitLightbox.bind(_this));
	            });

	            document.body.appendChild(this.nav);

	            //$('<a href="#" id="imagelightbox-close">Close</a>').appendTo('body')
	            //    .on('click touchend', function(){ $(this).remove(); instance.quitImageLightbox(); return false; });
	        }
	    }, {
	        key: 'hideButton',
	        value: function hideButton() {
	            document.body.removeChild(this.nav);
	        }
	    }, {
	        key: 'exitLightbox',
	        value: function exitLightbox() {
	            this.lightbox.quitImageLightbox();
	        }
	    }]);

	    return CloseButton;
	}();

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by Victor Häggqvist on 1/14/16.
	 */

	var Overlay = exports.Overlay = function () {
	    function Overlay() {
	        _classCallCheck(this, Overlay);

	        this.nav = document.createElement('div');
	        this.nav.id = 'imagelightbox-overlay';
	    }

	    _createClass(Overlay, [{
	        key: 'register',
	        value: function register(lightbox) {
	            lightbox.addOnStartListener(this.overlayOn.bind(this));
	            lightbox.addOnEndListener(this.overlayOff.bind(this));
	        }
	    }, {
	        key: 'overlayOn',
	        value: function overlayOn() {
	            document.body.appendChild(this.nav);
	        }
	    }, {
	        key: 'overlayOff',
	        value: function overlayOff() {
	            document.body.removeChild(this.nav);
	        }
	    }]);

	    return Overlay;
	}();

/***/ }
/******/ ]);
