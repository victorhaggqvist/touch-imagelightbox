var LightBox = LightBox || {}; LightBox["Captions"] =
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
	 * @since 2016-01-16
	 */

	var Captions = function () {
	    function Captions() {
	        _classCallCheck(this, Captions);

	        this.element = document.createElement('div');
	        this.element.id = 'imagelightbox-caption';
	    }

	    _createClass(Captions, [{
	        key: 'register',
	        value: function register(lightbox) {
	            this.lightbox = lightbox;
	            lightbox.addOnLoadStartListener(this.hideCaption.bind(this));
	            lightbox.addOnLoadEndListener(this.showCaption.bind(this));
	            lightbox.addOnEndListener(this.hideCaption.bind(this));
	        }
	    }, {
	        key: 'showCaption',
	        value: function showCaption() {
	            var img = this.lightbox.target.querySelector('img');

	            if (img === null) return;

	            var caption = img.getAttribute('alt');
	            if (caption !== null && caption.length > 0) {
	                this.element.innerHTML = img.alt;
	                document.body.appendChild(this.element);
	            }
	        }
	    }, {
	        key: 'hideCaption',
	        value: function hideCaption() {
	            try {
	                document.body.removeChild(this.element);
	            } catch (e) {}
	        }
	    }]);

	    return Captions;
	}();

	exports.default = Captions;
	module.exports = exports['default'];

/***/ }
/******/ ]);