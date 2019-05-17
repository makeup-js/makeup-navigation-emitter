$_mod.installed("makeup-navigation-emitter$0.2.0", "custom-event-polyfill", "1.0.7");
$_mod.installed("makeup-navigation-emitter$0.2.0", "nodelist-foreach-polyfill", "1.2.0");
$_mod.main("/nodelist-foreach-polyfill$1.2.0", "");
$_mod.def("/nodelist-foreach-polyfill$1.2.0/index", function(require, exports, module, __filename, __dirname) { if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

});
$_mod.installed("makeup-navigation-emitter$0.2.0", "makeup-key-emitter", "0.1.0");
$_mod.installed("makeup-key-emitter$0.1.0", "custom-event-polyfill", "1.0.7");
$_mod.installed("makeup-navigation-emitter$0.2.0", "makeup-exit-emitter", "0.1.1");
$_mod.installed("makeup-exit-emitter$0.1.1", "custom-event-polyfill", "1.0.7");
$_mod.def("/makeup-navigation-emitter$0.2.0/index", function(require, exports, module, __filename, __dirname) { 'use strict'; // requires following polyfills or transforms for IE11
// Object.assign
// NodeList.forEach
// CustomEvent

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KeyEmitter = require('/makeup-key-emitter$0.1.0/index'/*'makeup-key-emitter'*/);

var ExitEmitter = require('/makeup-exit-emitter$0.1.1/index'/*'makeup-exit-emitter'*/);

var dataSetKey = 'data-makeup-index';
var defaultOptions = {
  autoInit: 0,
  autoReset: null,
  wrap: false
};

function setData(els) {
  els.forEach(function (el, index) {
    el.setAttribute(dataSetKey, index);
  });
}

function onKeyPrev() {
  if (!this.atStart()) {
    this.index--;
  } else if (this.options.wrap) {
    this.index = this.items.length - 1;
  }
}

function onKeyNext() {
  if (!this.atEnd()) {
    this.index++;
  } else if (this.options.wrap) {
    this.index = 0;
  }
}

function onClick(e) {
  var element = e.target;
  var indexData = element.dataset.makeupIndex; // traverse widget ancestors until interactive element is found

  while (element !== this._el && !indexData) {
    element = element.parentNode;
    indexData = element.dataset.makeupIndex;
  }

  if (indexData !== undefined) {
    this.index = indexData;
  }
}

function onKeyHome() {
  this.index = 0;
}

function onKeyEnd() {
  this.index = this.items.length;
}

function onFocusExit() {
  if (this.options.autoReset !== null) {
    this._index = this.options.autoReset; // do not use index setter, it will trigger change event

    this._el.dispatchEvent(new CustomEvent('navigationModelReset', {
      detail: {
        toIndex: this.options.autoReset
      },
      bubbles: false
    }));
  }
}

function onMutation() {
  this.items = this._el.querySelectorAll(this._itemSelector);
  setData(this.items);

  this._el.dispatchEvent(new CustomEvent('navigationModelMutation'));
}

var NavigationModel = function NavigationModel(el, itemSelector, selectedOptions) {
  _classCallCheck(this, NavigationModel);

  this.options = _extends({}, defaultOptions, selectedOptions);
  this._el = el;
  this._itemSelector = itemSelector;
  this.items = el.querySelectorAll(itemSelector);
};

var LinearNavigationModel =
/*#__PURE__*/
function (_NavigationModel) {
  _inherits(LinearNavigationModel, _NavigationModel);

  function LinearNavigationModel(el, itemSelector, selectedOptions) {
    var _this;

    _classCallCheck(this, LinearNavigationModel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LinearNavigationModel).call(this, el, itemSelector, selectedOptions));

    if (_this.options.autoInit !== null) {
      _this._index = _this.options.autoInit;

      _this._el.dispatchEvent(new CustomEvent('navigationModelInit', {
        detail: {
          toIndex: _this.options.autoInit
        },
        bubbles: false
      }));
    }

    return _this;
  }

  _createClass(LinearNavigationModel, [{
    key: "atEnd",
    value: function atEnd() {
      return this.index === this.items.length - 1;
    }
  }, {
    key: "atStart",
    value: function atStart() {
      return this.index <= 0;
    }
  }, {
    key: "index",
    get: function get() {
      return this._index;
    },
    set: function set(newIndex) {
      if (newIndex > -1 && newIndex < this.items.length && newIndex !== this.index) {
        this._el.dispatchEvent(new CustomEvent('navigationModelChange', {
          detail: {
            fromIndex: this.index,
            toIndex: newIndex
          },
          bubbles: false
        }));

        this._index = newIndex;
      }
    }
  }]);

  return LinearNavigationModel;
}(NavigationModel); // 2D Grid Model will go here

/*
class GridModel extends NavigationModel {
    constructor(el, rowSelector, colSelector) {
        super();
        this._coords = null;
    }
}
*/


var NavigationEmitter =
/*#__PURE__*/
function () {
  function NavigationEmitter(el, model) {
    _classCallCheck(this, NavigationEmitter);

    this.model = model;
    this.el = el;
    this._keyPrevListener = onKeyPrev.bind(model);
    this._keyNextListener = onKeyNext.bind(model);
    this._keyHomeListener = onKeyHome.bind(model);
    this._keyEndListener = onKeyEnd.bind(model);
    this._clickListener = onClick.bind(model);
    this._focusExitListener = onFocusExit.bind(model);
    this._observer = new MutationObserver(onMutation.bind(model));
    setData(model.items);
    KeyEmitter.addKeyDown(this.el);
    ExitEmitter.addFocusExit(this.el);
    this.el.addEventListener('arrowLeftKeyDown', this._keyPrevListener);
    this.el.addEventListener('arrowRightKeyDown', this._keyNextListener);
    this.el.addEventListener('arrowUpKeyDown', this._keyPrevListener);
    this.el.addEventListener('arrowDownKeyDown', this._keyNextListener);
    this.el.addEventListener('homeKeyDown', this._keyHomeListener);
    this.el.addEventListener('endKeyDown', this._keyEndListener);
    this.el.addEventListener('click', this._clickListener);
    this.el.addEventListener('focusExit', this._focusExitListener);

    this._observer.observe(this.el, {
      childList: true,
      subtree: true
    });
  }

  _createClass(NavigationEmitter, [{
    key: "destroy",
    value: function destroy() {
      KeyEmitter.removeKeyDown(this.el);
      ExitEmitter.removeFocusExit(this.el);
      this.el.removeEventListener('arrowLeftKeyDown', this._keyPrevListener);
      this.el.removeEventListener('arrowRightKeyDown', this._keyNextListener);
      this.el.removeEventListener('arrowUpKeyDown', this._keyPrevListener);
      this.el.removeEventListener('arrowDownKeyDown', this._keyNextListener);
      this.el.removeEventListener('homeKeyDown', this._keyHomeListener);
      this.el.removeEventListener('endKeyDown', this._keyEndListener);
      this.el.removeEventListener('click', this._clickListener);
      this.el.removeEventListener('focusExit', this._focusExitListener);

      this._observer.disconnect();
    }
  }], [{
    key: "createLinear",
    value: function createLinear(el, itemSelector, selectedOptions) {
      var model = new LinearNavigationModel(el, itemSelector, selectedOptions);
      return new NavigationEmitter(el, model);
    }
    /*
    static createGrid(el, rowSelector, colSelector, selectedOptions) {
        return null;
    }
    */

  }]);

  return NavigationEmitter;
}();

module.exports = NavigationEmitter;

});