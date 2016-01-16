var LightBox = LightBox || {}; LightBox["ActivityIndicator"] =
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
	 *
	 * @author Victor Häggqvist
	 * @since 2016-01-14
	 */

	var ActivityIndicator = function () {
	    function ActivityIndicator() {
	        _classCallCheck(this, ActivityIndicator);

	        this.element = document.createElement('div');
	        this.element.id = 'imagelightbox-loading';
	        this.element.appendChild(document.createElement('div'));
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
	            document.body.appendChild(this.element);
	        }
	    }, {
	        key: 'activityIndicatorOff',
	        value: function activityIndicatorOff() {
	            try {
	                document.body.removeChild(this.element);
	            } catch (e) {}
	        }
	    }]);

	    return ActivityIndicator;
	}();

	exports.default = ActivityIndicator;
	module.exports = exports['default'];

/***/ }
/******/ ]);