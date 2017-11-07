'use strict';

// requires Object.assign polyfill or transform for IE
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KeyEmitter = require('makeup-key-emitter');
var ExitEmitter = require('makeup-exit-emitter');
var dataSetKey = 'data-makeup-index';

var defaultOptions = {
    wrap: false
};

function setData(els) {
    Array.prototype.slice.call(els).forEach(function (el, index) {
        el.setAttribute(dataSetKey, index);
    });
}

function onKeyPrev() {
    if (!this.atStart()) {
        this.index--;
    } else if (this._options.wrap) {
        this.index = this.items.length - 1;
    }
}

function onKeyNext() {
    if (!this.atEnd()) {
        this.index++;
    } else if (this._options.wrap) {
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

function onFocusExit(e) {
    console.log(e);
}

function onMutation(m) {
    console.log(m);
    this._itemEls = this._widgetEl.querySelectorAll(this._itemSelector);
    setData(this._itemEls);
}

var NavigationModel = function () {
    function NavigationModel() {
        _classCallCheck(this, NavigationModel);
    }

    _createClass(NavigationModel, [{
        key: 'items',
        get: function get() {
            return this._itemEls;
        }
    }, {
        key: 'options',
        set: function set(newOptions) {
            this._options = newOptions;
        }
    }, {
        key: 'wrap',
        set: function set(newWrap) {
            this._options.wrap = newWrap;
        }
    }]);

    return NavigationModel;
}();

var LinearNavigationModel = function (_NavigationModel) {
    _inherits(LinearNavigationModel, _NavigationModel);

    function LinearNavigationModel(widgetEl, itemSelector, selectedOptions) {
        _classCallCheck(this, LinearNavigationModel);

        var _this = _possibleConstructorReturn(this, (LinearNavigationModel.__proto__ || Object.getPrototypeOf(LinearNavigationModel)).call(this));

        _this._options = _extends({}, defaultOptions, selectedOptions);

        _this._index = null;

        _this._widgetEl = widgetEl;
        _this._itemSelector = itemSelector;
        _this._itemEls = widgetEl.querySelectorAll(itemSelector);
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
            return this.index === 0;
        }
    }, {
        key: 'index',
        get: function get() {
            return this._index;
        },
        set: function set(newIndex) {
            if (newIndex !== this.index) {
                this._widgetEl.dispatchEvent(new CustomEvent('navigationModelChange', {
                    detail: {
                        toIndex: newIndex,
                        fromIndex: this.index
                    },
                    bubbles: false // mirror the native mouseleave event
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
    constructor(widgetEl, rowSelector, colSelector) {
        super();
        this._coords = null;
    }
}
*/

var NavigationEmitter = function () {
    function NavigationEmitter(el, model) {
        _classCallCheck(this, NavigationEmitter);

        this._model = model;

        this.keyPrevListener = onKeyPrev.bind(model);
        this.keyNextListener = onKeyNext.bind(model);
        this.keyHomeListener = onKeyHome.bind(model);
        this.keyEndListener = onKeyEnd.bind(model);
        this.clickListener = onClick.bind(model);
        this.focusExitListener = onFocusExit.bind(model);
        this.observer = new MutationObserver(onMutation.bind(model));

        setData(model.items);

        KeyEmitter.addKeyDown(el);
        ExitEmitter.addFocusExit(el);

        el.addEventListener('arrowLeftKeyDown', this.keyPrevListener);
        el.addEventListener('arrowRightKeyDown', this.keyNextListener);
        el.addEventListener('arrowUpKeyDown', this.keyPrevListener);
        el.addEventListener('arrowDownKeyDown', this.keyNextListener);
        el.addEventListener('homeKeyDown', this.keyHomeListener);
        el.addEventListener('endKeyDown', this.keyEndListener);
        el.addEventListener('click', this.clickListener);
        el.addEventListener('focusExit', this.focusExitListener);

        this.observer.observe(el, { childList: true, subtree: true });
    }

    _createClass(NavigationEmitter, [{
        key: 'model',
        get: function get() {
            return this._model;
        }
    }], [{
        key: 'createLinear',
        value: function createLinear(el, itemSelector, selectedOptions) {
            var model = new LinearNavigationModel(el, itemSelector, selectedOptions);

            return new NavigationEmitter(el, model);
        }
    }, {
        key: 'createGrid',
        value: function createGrid(el, rowSelector, colSelector, selectedOptions) {
            // eslint-disable-line
            return null;
        }
    }]);

    return NavigationEmitter;
}();

module.exports = NavigationEmitter;
