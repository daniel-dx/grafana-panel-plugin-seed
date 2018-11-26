define(["app/plugins/sdk","lodash"], function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelCtrl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sdk = __webpack_require__(1);

var _lodash = __webpack_require__(2);

var _lodash2 = _interopRequireDefault(_lodash);

__webpack_require__(3);

__webpack_require__(4);

__webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // will be resolved to app/plugins/sdk

// Remove next imports if you don't need separate styles for light and dark themes


// Remove up to here

var panelDefaults = {
  panelConfig: {
    headerBgColor: '',
    headerColor: '',
    headerAlign: 'center',
    borderRadius: '',
    contentBgColor: ''
  }
};

var Ctrl = function (_MetricsPanelCtrl) {
  _inherits(Ctrl, _MetricsPanelCtrl);

  function Ctrl($scope, $injector) {
    _classCallCheck(this, Ctrl);

    var _this = _possibleConstructorReturn(this, (Ctrl.__proto__ || Object.getPrototypeOf(Ctrl)).call(this, $scope, $injector));

    _lodash2.default.defaultsDeep(_this.panel, panelDefaults);

    _this.debounceRenderGraph = _lodash2.default.debounce(_this.renderGraph, 250);
    _this.debounceRenderPanel = _lodash2.default.debounce(_this.renderPanel, 250);

    _this.events.on('render', _this.onRender.bind(_this));
    _this.events.on('data-received', _this.onDataReceived.bind(_this));
    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));

    return _this;
  }

  _createClass(Ctrl, [{
    key: 'link',
    value: function link(scope, element) {

      this.panelContainerElm = element[0].querySelector('.panel-container');
      this.panelTitleElm = element[0].querySelector('.panel-header');
      this.panelContentElm = element[0].querySelector('.panel-content');
      this.panelGraphElm = element[0].querySelector('.daniel-panel');

      this.initStyles();

      // Some large scripts are loaded by dynamic loading
      this.importLargeModules();
    }
  }, {
    key: 'initStyles',
    value: function initStyles() {
      window.System.import(this.panelPath + 'css/panel.base.css!');
      // Remove next lines if you don't need separate styles for light and dark themes
      if (grafanaBootData.user.lightTheme) {
        window.System.import(this.panelPath + 'css/panel.light.css!');
      } else {
        window.System.import(this.panelPath + 'css/panel.dark.css!');
      }
      // Remove up to here
    }
  }, {
    key: 'importLargeModules',
    value: function importLargeModules() {}
  }, {
    key: 'onInitEditMode',
    value: function onInitEditMode() {
      this.addEditorTab('Options', this.panelPath + 'partials/editor.html', 2);
    }
  }, {
    key: 'onRender',
    value: function onRender() {
      if (this.panelData) this.debounceRenderGraph(this.panelData);
      this.debounceRenderPanel();
    }
  }, {
    key: 'onDataReceived',
    value: function onDataReceived(data) {
      this.panelData = this.handelPanelData(data);
      this.render();
    }

    /**
     * Render panel
     */

  }, {
    key: 'renderPanel',
    value: function renderPanel() {
      if (this.panel.panelConfig.contentBgColor) this.panelContentElm.style.backgroundColor = this.panel.panelConfig.contentBgColor;
      if (this.panel.panelConfig.headerBgColor) this.panelTitleElm.style.backgroundColor = this.panel.panelConfig.headerBgColor;
      if (this.panel.panelConfig.headerColor) {
        this.panelTitleElm.style.color = this.panel.panelConfig.headerColor;
        this.panelTitleElm.style.color = this.panel.panelConfig.headerColor;
      }
      if (this.panel.panelConfig.borderRadius) this.panelContainerElm.style.borderRadius = this.panel.panelConfig.borderRadius;
      this.panelTitleElm.querySelector('.panel-title').style.justifyContent = this.panel.panelConfig.headerAlign;

      this.panelTitleElm.querySelector('.panel-title').style.padding = '4px 8px'; // 用于让标题居左时有padding
      this.panelContainerElm.style.overflow = 'hidden'; // 用于让borderRadius显示效果生效
    }

    /**
     * The actual method of rendering the chart
     * @param {*} panelData
     */

  }, {
    key: 'renderGraph',
    value: function renderGraph(panelData) {
      this.panelGraphElm.innerHTML = '';

      // Use this.panelGraphElm to render graphics
    }

    /**
     * Processed into the required data format
     * @param {*} panelData
     */

  }, {
    key: 'handelPanelData',
    value: function handelPanelData(data) {
      var result = data;
      return result;
    }
  }, {
    key: 'panelPath',
    get: function get() {
      if (this._panelPath === undefined) {
        this._panelPath = '/public/plugins/' + this.pluginId + '/';
      }
      return this._panelPath;
    }
  }]);

  return Ctrl;
}(_sdk.MetricsPanelCtrl);

Ctrl.templateUrl = 'partials/module.html';

exports.PanelCtrl = Ctrl;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ])});;
//# sourceMappingURL=module.js.map