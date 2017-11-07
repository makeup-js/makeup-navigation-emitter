'use strict';

// requires Object.assign polyfill or transform for IE
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill

const KeyEmitter = require('makeup-key-emitter');
const ExitEmitter = require('makeup-exit-emitter');
const dataSetKey = 'data-makeup-index';

const defaultOptions = {
    wrap: false
};

function setData(els) {
    Array.prototype.slice.call(els).forEach(function(el, index) {
        el.setAttribute(dataSetKey, index);
    });
}

function onKeyPrev() {
    if (!this.atStart()) {
        this.index--;
    } else if (this._options.wrap) {
        this.index = (this.items.length - 1);
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
    const indexData = e.target.dataset.makeupIndex;
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

class NavigationModel {
    get items() {
        return this._itemEls;
    }

    set options(newOptions) {
        this._options = newOptions;
    }

    set wrap(newWrap) {
        this._options.wrap = newWrap;
    }
}

class LinearNavigationModel extends NavigationModel {
    constructor(widgetEl, itemSelector, selectedOptions) {
        super();
        this._options = Object.assign({}, defaultOptions, selectedOptions);

        this._index = null;

        this._widgetEl = widgetEl;
        this._itemSelector = itemSelector;
        this._itemEls = widgetEl.querySelectorAll(itemSelector);
    }

    get index() {
        return this._index;
    }

    set index(newIndex) {
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

    atEnd() {
        return this.index === this.items.length - 1;
    }

    atStart() {
        return this.index === 0;
    }
}

// 2D Grid Model will go here

/*
class GridModel extends NavigationModel {
    constructor(widgetEl, rowSelector, colSelector) {
        super();
        this._coords = null;
    }
}
*/

class NavigationEmitter {
    constructor(el, model) {
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

    get model() {
        return this._model;
    }

    static createLinear(el, itemSelector, selectedOptions) {
        const model = new LinearNavigationModel(el, itemSelector, selectedOptions);

        return new NavigationEmitter(el, model);
    }

    static createGrid(el, rowSelector, colSelector, selectedOptions) { // eslint-disable-line
        return null;
    }
}

module.exports = NavigationEmitter;
