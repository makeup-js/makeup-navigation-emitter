'use strict';

// requires Object.assign polyfill or transform for IE
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill

const Util = require('./util.js');
const KeyEmitter = require('makeup-key-emitter');
const ExitEmitter = require('makeup-exit-emitter');
const dataSetKey = 'data-makeup-index';

const defaultOptions = {
    autoInit: 0,
    autoReset: null,
    wrap: false
};

function setData(els) {
    els.forEach(function(el, index) {
        el.setAttribute(dataSetKey, index);
    });
}

function onKeyPrev() {
    if (!this.atStart()) {
        this.index--;
    } else if (this.options.wrap) {
        this.index = (this.items.length - 1);
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
    let element = e.target;
    let indexData = element.dataset.makeupIndex;

    // traverse widget ancestors until interactive element is found
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
    this.items = Util.nodeListToArray(this._el.querySelectorAll(this._itemSelector));
    setData(this.items);

    this._el.dispatchEvent(new CustomEvent('navigationModelMutation'));
}

class NavigationModel {
    constructor(el, itemSelector, selectedOptions) {
        this.options = Object.assign({}, defaultOptions, selectedOptions);
        this._el = el;
        this._itemSelector = itemSelector;
        this.items = Util.nodeListToArray(el.querySelectorAll(itemSelector));
    }
}

class LinearNavigationModel extends NavigationModel {
    constructor(el, itemSelector, selectedOptions) {
        super(el, itemSelector, selectedOptions);

        if (this.options.autoInit !== null) {
            this._index = this.options.autoInit;
            this._el.dispatchEvent(new CustomEvent('navigationModelInit', {
                detail: {
                    toIndex: this.options.autoInit
                },
                bubbles: false
            }));
        }
    }

    get index() {
        return this._index;
    }

    set index(newIndex) {
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

    atEnd() {
        return this.index === this.items.length - 1;
    }

    atStart() {
        return this.index <= 0;
    }
}

// 2D Grid Model will go here

/*
class GridModel extends NavigationModel {
    constructor(el, rowSelector, colSelector) {
        super();
        this._coords = null;
    }
}
*/

class NavigationEmitter {
    constructor(el, model) {
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

    static createLinear(el, itemSelector, selectedOptions) {
        const model = new LinearNavigationModel(el, itemSelector, selectedOptions);

        return new NavigationEmitter(el, model);
    }

    /*
    static createGrid(el, rowSelector, colSelector, selectedOptions) {
        return null;
    }
    */
}

module.exports = NavigationEmitter;
