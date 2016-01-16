var LightBox = LightBox || {}; LightBox["Navigation"] =
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
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @author Victor Häggqvist
	 * @since 1/15/16
	 */

	var Navigation = function () {
	    function Navigation() {
	        _classCallCheck(this, Navigation);
	    }

	    _createClass(Navigation, [{
	        key: 'register',
	        value: function register(lightbox) {
	            this.lightbox = lightbox;
	            lightbox.addOnStartListener(this.showNavigation.bind(this));
	            lightbox.addOnEndListener(this.hideNavigation.bind(this));
	            lightbox.addOnLoadEndListener(this.updateNavigation.bind(this));
	        }
	    }, {
	        key: 'showNavigation',
	        value: function showNavigation() {
	            var _this = this;

	            this.sink = document.createElement('div');
	            this.sink.id = 'imagelightbox-nav-sink';
	            this.nav = document.createElement('div');
	            this.nav.id = 'imagelightbox-nav';
	            this.sink.appendChild(this.nav);

	            Array.prototype.forEach.call(this.lightbox.targets, function (_) {
	                _this.nav.appendChild(document.createElement('a'));
	            });

	            document.body.appendChild(this.sink);

	            var navItems = this.nav.querySelectorAll('a');
	            Array.prototype.forEach.call(navItems, function (item, i) {
	                ['click', 'touchend'].forEach(function (name) {
	                    item.addEventListener(name, _this.navClick.bind(_this, i));
	                });
	            });

	            // make the nav actually centered, flex center dont make it
	            var rect = this.nav.getBoundingClientRect();
	            var diff = rect.width / 2;
	            this.nav.style.marginLeft = '-' + diff + 'px';
	        }
	    }, {
	        key: 'updateNavigation',
	        value: function updateNavigation() {
	            Array.prototype.forEach.call(this.nav.childNodes, function (n) {
	                n.classList.remove('active');
	            });

	            var current = Array.prototype.indexOf.call(this.lightbox.targets, this.lightbox.target);
	            this.nav.childNodes[current].classList.add('active');
	        }
	    }, {
	        key: 'hideNavigation',
	        value: function hideNavigation() {
	            try {
	                document.body.removeChild(this.sink);
	            } catch (e) {}
	        }
	    }, {
	        key: 'navClick',
	        value: function navClick(index, e) {
	            e.stopPropagation();
	            e.cancelBubble = true;
	            this.lightbox.switchToIndex(index);
	        }
	    }]);

	    return Navigation;
	}();

	exports.default = Navigation;
	module.exports = exports['default'];

/***/ }
/******/ ]);