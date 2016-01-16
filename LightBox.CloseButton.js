var LightBox = LightBox || {}; LightBox["CloseButton"] =
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
	 * @since 2016-01-14
	 */

	var CloseButton = function () {
	    function CloseButton() {
	        var closeOnDocumentClick = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	        _classCallCheck(this, CloseButton);

	        this.closeOnDocumentClick = closeOnDocumentClick;
	        this.element = document.createElement('a');
	        this.element.id = 'imagelightbox-close';
	        this.element.innerHTML = 'Close';
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

	            this.lightbox.options.quitOnDocClick = this.closeOnDocumentClick;
	            ['click', 'touchend'].forEach(function (name) {
	                _this.element.addEventListener(name, _this.exitLightbox.bind(_this));
	            });

	            document.body.appendChild(this.element);
	        }
	    }, {
	        key: 'hideButton',
	        value: function hideButton() {
	            document.body.removeChild(this.element);
	        }
	    }, {
	        key: 'exitLightbox',
	        value: function exitLightbox() {
	            this.lightbox.quitLightbox();
	        }
	    }]);

	    return CloseButton;
	}();

	exports.default = CloseButton;
	module.exports = exports['default'];

/***/ }
/******/ ]);