'use strict';

// requires Object.assign polyfill or transform for IE
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = require('./util.js');
var KeyEmitter = require('makeup-key-emitter');
var ExitEmitter = require('makeup-exit-emitter');
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
    var indexData = e.target.dataset.makeupIndex;
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
        this.index = this.options.autoReset;
    }
}

function onMutation() {
    this.items = Util.nodeListToArray(this._el.querySelectorAll(this._itemSelector));
    setData(this.items);

    this._el.dispatchEvent(new CustomEvent('navigationModelMutation'));
}

var NavigationModel = function NavigationModel(el, itemSelector, selectedOptions) {
    _classCallCheck(this, NavigationModel);

    this.options = _extends({}, defaultOptions, selectedOptions);
    this._el = el;
    this._itemSelector = itemSelector;
    this.items = Util.nodeListToArray(el.querySelectorAll(itemSelector));
};

var LinearNavigationModel = function (_NavigationModel) {
    _inherits(LinearNavigationModel, _NavigationModel);

    function LinearNavigationModel(el, itemSelector, selectedOptions) {
        _classCallCheck(this, LinearNavigationModel);

        var _this = _possibleConstructorReturn(this, (LinearNavigationModel.__proto__ || Object.getPrototypeOf(LinearNavigationModel)).call(this, el, itemSelector, selectedOptions));

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
        key: 'atEnd',
        value: function atEnd() {
            return this.index === this.items.length - 1;
        }
    }, {
        key: 'atStart',
        value: function atStart() {
            return this.index <= 0;
        }
    }, {
        key: 'index',
        get: function get() {
            return this._index;
        },
        set: function set(newIndex) {
            if (newIndex !== this.index) {
                this._el.dispatchEvent(new CustomEvent('navigationModelChange', {
                    detail: {
                        toIndex: newIndex,
                        fromIndex: this.index
                    },
                    bubbles: false
                }));
                this._index = newIndex;
            }
        }
    }]);

    return LinearNavigationModel;
}(NavigationModel);

// 2D Grid Model will go here

/*
class GridModel extends NavigationModel {
    constructor(el, rowSelector, colSelector) {
        super();
        this._coords = null;
    }
}
*/

var NavigationEmitter = function () {
    function NavigationEmitter(el, model) {
        _classCallCheck(this, NavigationEmitter);

        this.model = model;

        this._keyPrevListener = onKeyPrev.bind(model);
        this._keyNextListener = onKeyNext.bind(model);
        this._keyHomeListener = onKeyHome.bind(model);
        this._keyEndListener = onKeyEnd.bind(model);
        this._clickListener = onClick.bind(model);
        this._focusExitListener = onFocusExit.bind(model);
        this._observer = new MutationObserver(onMutation.bind(model));

        setData(model.items);

        KeyEmitter.addKeyDown(el);
        ExitEmitter.addFocusExit(el);

        el.addEventListener('arrowLeftKeyDown', this._keyPrevListener);
        el.addEventListener('arrowRightKeyDown', this._keyNextListener);
        el.addEventListener('arrowUpKeyDown', this._keyPrevListener);
        el.addEventListener('arrowDownKeyDown', this._keyNextListener);
        el.addEventListener('homeKeyDown', this._keyHomeListener);
        el.addEventListener('endKeyDown', this._keyEndListener);
        el.addEventListener('click', this._clickListener);
        el.addEventListener('focusExit', this._focusExitListener);

        this._observer.observe(el, { childList: true, subtree: true });
    }

    _createClass(NavigationEmitter, null, [{
        key: 'createLinear',
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
