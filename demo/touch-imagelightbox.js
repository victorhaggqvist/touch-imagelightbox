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

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Victor Häggqvist on 1/12/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.LightBox = undefined;

	var _CSSUtil = __webpack_require__(1);

	var _Log = __webpack_require__(2);

	var _animate = __webpack_require__(4);

	var _FetchImage = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LightBox = exports.LightBox = function () {
	    function LightBox(targetSelector) {
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        _classCallCheck(this, LightBox);

	        this.targets = document.querySelectorAll(targetSelector);

	        var defaultOptions = {
	            allowedTypes: 'png|jpg|jpeg|gif',
	            animationSpeed: 250,
	            preloadNext: true,
	            enableKeyboard: true,
	            quitOnEnd: false,
	            quitOnImgClick: false,
	            quitOnDocClick: true,
	            onStart: false,
	            onEnd: false,
	            onLoadStart: false,
	            onLoadEnd: false
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

	    _createClass(LightBox, [{
	        key: 'bindEvents',
	        value: function bindEvents() {
	            var _this = this;

	            console.log(this.targets);

	            Array.prototype.forEach.call(this.targets, function (ele) {
	                ele.onclick = _this.onImageClick.bind(_this);
	            });
	            window.addEventListener('resize', this.windowResizeListener.bind(this));
	        }
	    }, {
	        key: 'onImageClick',
	        value: function onImageClick(event) {
	            console.log(event);
	            var element = event.srcElement.parentElement;
	            //console.log(this.isTargetValid(element));
	            if (!this.isTargetValid(element)) return true;

	            event.preventDefault();

	            if (this.inProgress) return;

	            this.inProgress = false;

	            if (this.options.onStart !== false) this.options.onStart();

	            this.target = element;

	            this.loadImage();
	        }
	    }, {
	        key: 'isTargetValid',
	        value: function isTargetValid(element) {
	            var validTypes = new RegExp("(\.(" + this.options.allowedTypes + ")$)");

	            //console.log(element.tagName.toLowerCase());
	            return element.tagName.toLowerCase() === 'a' && validTypes.test(element.href);

	            //return $( element ).prop( 'tagName' ).toLowerCase() === 'a' && options.regexValidObject.test($(element).attr('href') );
	        }
	    }, {
	        key: 'loadImage',
	        value: function loadImage() {
	            var _this2 = this;

	            var direction = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	            _Log.Log.l('loadImage');
	            _Log.Log.l(this.inProgress);
	            if (this.inProgress) return false;
	            _Log.Log.l('not progress');
	            // if image.length
	            //if ()

	            this.inProgress = true;
	            if (this.options.onLoadStart !== false) this.options.onLoadStart();

	            setTimeout(function () {
	                _Log.Log.l('loadImage in');
	                (0, _FetchImage.FetchImage)(_this2.target.href).then(function (image) {
	                    _this2.image = image;
	                    image.id = 'imagelightbox';
	                    console.log(image);

	                    //let image = new Image();
	                    //image.src = this.target.href;

	                    _Log.Log.l(image);
	                    document.body.appendChild(image);
	                    //image.appendTo('body');
	                    _Log.Log.d('setImage');
	                    _this2.setImage();

	                    var params = { opacity: 1 };
	                    image.style.opacity = 0;

	                    var prefix = _CSSUtil.CSSUtil.cssTransitionSupport();
	                    _CSSUtil.CSSUtil.setTransitionProperty(image.style, 'opacity .3s linear');
	                    //image.style[prefix + 'transform'] = 'opacity 25s linear';
	                    //image.style.transition = 'opacity .3s linear';
	                    image.style.transform = 'translateX(0px)';

	                    setTimeout(function () {
	                        // without timeout it's to fast to make it fade and just jumps to 1 instant
	                        image.style.opacity = 1;
	                    }, 5);

	                    if (_this2.options.preloadNext) {
	                        console.log(_this2.options.preloadNext);
	                        Array.prototype.forEach.call(_this2.targets, function (t) {
	                            if (t == _this2.target) {
	                                console.log(t);
	                                console.log('match');
	                            }
	                        });
	                        //
	                        ////this.targets.
	                        //let nextTarget = targets.eq(targets.index(target) + 1);
	                        //if (!nextTarget.length) nextTarget = targets.eq(0);
	                        //$('<img />').attr('src', nextTarget.attr('href')).load();
	                    }

	                    _this2.image = image;
	                });
	            }, this.options.animationSpeed + 100);
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

	    }, {
	        key: 'setImage',
	        value: function setImage() {
	            var _this3 = this;

	            _Log.Log.l(this.image);
	            if (!this.image) return false;

	            var screenWidth = window.innerWidth * 0.8;
	            var screenHeight = window.innerHeight * 0.9;

	            var tmpImage = new Image();
	            tmpImage.src = this.image.src;
	            tmpImage.onload = function () {
	                _this3.imageWidth = tmpImage.width;
	                _this3.imageHeight = tmpImage.height;

	                if (_this3.imageWidth > screenWidth || _this3.imageHeight > screenHeight) {
	                    var ratio = _this3.imageWidth / _this3.imageHeight > screenWidth / screenHeight ? _this3.imageWidth / screenWidth : _this3.imageHeight / screenHeight;
	                    _this3.imageWidth /= ratio;
	                    _this3.imageHeight /= ratio;
	                }

	                _this3.image.style.width = _this3.imageWidth + 'px';
	                _this3.image.style.height = _this3.imageHeight + 'px';
	                _this3.image.style.top = (window.innerHeight - _this3.imageHeight) / 2 + 'px';
	                _this3.image.style.left = (window.innerWidth - _this3.imageWidth) / 2 + 'px';
	            };
	        }
	    }, {
	        key: 'windowResizeListener',
	        value: function windowResizeListener() {
	            console.log('resized');
	        }
	    }]);

	    return LightBox;
	}();

/***/ },
/* 1 */
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
	         * @param ele
	         * @param value
	         */
	        value: function setTransitionProperty(ele, value) {
	            if (ele.transition === '') {
	                ele.transition = value;
	                return;
	            }
	            if (ele.WebkitTransition === '') {
	                ele.WebkitTransition = value;
	                return;
	            }
	            if (ele.MozTransition === '') {
	                ele.MozTransition = value;
	                return;
	            }
	            if (ele.OTransition === '') {
	                ele.OTransition = value;
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
	            //element.style = Object.assign(options, element.style);
	        }
	    }]);

	    return CSSUtil;
	}();

	CSSUtil.isCssTransitionSupport = CSSUtil.cssTransitionSupport() !== false;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Victor Häggqvist on 1/12/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Log = undefined;

	var _LogLevel = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Log = exports.Log = function () {
	    function Log() {
	        _classCallCheck(this, Log);
	    }

	    _createClass(Log, null, [{
	        key: 'init',

	        //var instance = null;
	        value: function init() {
	            Log.level = _LogLevel.LogLevel.DEBUG;
	        }
	    }, {
	        key: 'silence',
	        value: function silence() {
	            Log.level = _LogLevel.LogLevel.SILENT;
	        }
	    }, {
	        key: 'l',
	        value: function l(msg) {
	            Log.log(msg, 'log');
	        }
	    }, {
	        key: 'w',
	        value: function w(msg) {
	            Log.log(msg, 'warn');
	        }
	    }, {
	        key: 'd',
	        value: function d(msg) {
	            Log.log(msg, 'debug');
	            //console.debug(Log.explode(msg));
	        }
	    }, {
	        key: 'log',
	        value: function log(args) {
	            var type = arguments.length <= 1 || arguments[1] === undefined ? 'log' : arguments[1];

	            var baked = Log.explode(args);

	            if (Log.level === _LogLevel.LogLevel.SILENT) return;

	            switch (type) {
	                case 'info':
	                    return console.info(baked);
	                case 'log':
	                    return console.log(baked);
	                case 'warn':
	                    return console.warn(baked);
	                case 'debug':
	                    return console.debug(baked);
	            }
	        }
	    }, {
	        key: 'explode',
	        value: function explode(args) {
	            if (!Array.isArray(args)) {
	                return args;
	            }

	            return args;
	        }
	    }]);

	    return Log;
	}();

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by Victor Häggqvist on 1/12/16.
	 */

	var LogLevel = exports.LogLevel = function LogLevel() {
	  _classCallCheck(this, LogLevel);
	};

	LogLevel.SILENT = 0;
	LogLevel.INFO = 1;
	LogLevel.VERBOSE = 1;
	LogLevel.DEBUG = 1;

/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by Victor Häggqvist on 1/12/16.
	 */

	var FetchImage = exports.FetchImage = function FetchImage(url) {
	    return new Promise(function (resolve, reject) {
	        fetch(url).then(function (res) {
	            var img = new Image();
	            img.src = url;
	            //console.log(img);
	            resolve(img);
	        });
	    });
	};

/***/ }
/******/ ]);