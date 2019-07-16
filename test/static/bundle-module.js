$_mod.installed("makeup-navigation-emitter$0.2.3", "custom-event-polyfill", "1.0.7");
$_mod.installed("makeup-navigation-emitter$0.2.3", "nodelist-foreach-polyfill", "1.2.0");
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
$_mod.installed("makeup-navigation-emitter$0.2.3", "makeup-key-emitter", "0.1.0");
$_mod.installed("makeup-key-emitter$0.1.0", "custom-event-polyfill", "1.0.7");
$_mod.installed("makeup-navigation-emitter$0.2.3", "makeup-exit-emitter", "0.2.0");
$_mod.installed("makeup-exit-emitter$0.2.0", "custom-event-polyfill", "1.0.7");
$_mod.main("/nanoid$2.0.3", "");
$_mod.remap("/nanoid$2.0.3/index", "/nanoid$2.0.3/index.browser");
$_mod.builtin("process", "/process$0.11.10/browser");
$_mod.def("/process$0.11.10/browser", function(require, exports, module, __filename, __dirname) { // shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

});
$_mod.def("/nanoid$2.0.3/index.browser", function(require, exports, module, __filename, __dirname) { var process=require("process"); if (process.env.NODE_ENV !== 'production') {
  if (typeof self === 'undefined' || (!self.crypto && !self.msCrypto)) {
    throw new Error(
      'Your browser does not have secure random generator. ' +
      'If you don’t need unpredictable IDs, you can use nanoid/non-secure.'
    )
  }
}

var crypto = self.crypto || self.msCrypto

/*
 * This alphabet uses a-z A-Z 0-9 _- symbols.
 * Symbols order was changed for better gzip compression.
 */
var url = 'Uint8ArdomValuesObj012345679BCDEFGHIJKLMNPQRSTWXYZ_cfghkpqvwxyz-'

module.exports = function (size) {
  size = size || 21
  var id = ''
  var bytes = crypto.getRandomValues(new Uint8Array(size))
  while (0 < size--) {
    id += url[bytes[size] & 63]
  }
  return id
}

});
$_mod.def("/makeup-navigation-emitter$0.2.3/index", function(require, exports, module, __filename, __dirname) { 'use strict'; // requires following polyfills or transforms for IE11
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

var ExitEmitter = require('/makeup-exit-emitter$0.2.0/index'/*'makeup-exit-emitter'*/);

var dataSetKey = 'data-makeup-index';
var defaultOptions = {
  axis: 'both',
  autoInit: 0,
  autoReset: null,
  wrap: false
};

var itemFilter = function itemFilter(el) {
  return !el.hidden;
};

function clearData(els) {
  els.forEach(function (el) {
    return el.removeAttribute(dataSetKey);
  });
}

function setData(els) {
  els.forEach(function (el, index) {
    return el.setAttribute(dataSetKey, index);
  });
}

function onKeyPrev() {
  if (!this.atStart()) {
    this.index--;
  } else if (this.options.wrap) {
    this.index = this.filteredItems.length - 1;
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
  this.index = this.filteredItems.length;
}

function onFocusExit() {
  if (this.options.autoReset !== null) {
    this.reset();
  }
}

function onMutation() {
  // clear data-makeup-index on ALL items
  clearData(this.items); // set data-makeup-index only on filtered items (e.g. non-hidden ones)

  setData(this.filteredItems);

  this._el.dispatchEvent(new CustomEvent('navigationModelMutation'));
}

var NavigationModel = function NavigationModel(el, itemSelector, selectedOptions) {
  _classCallCheck(this, NavigationModel);

  this.options = _extends({}, defaultOptions, selectedOptions);
  this._el = el;
  this._itemSelector = itemSelector;
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
          items: _this.filteredItems,
          toIndex: _this.options.autoInit
        },
        bubbles: false
      }));
    }

    return _this;
  }

  _createClass(LinearNavigationModel, [{
    key: "reset",
    value: function reset() {
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
  }, {
    key: "atEnd",
    value: function atEnd() {
      return this.index === this.filteredItems.length - 1;
    }
  }, {
    key: "atStart",
    value: function atStart() {
      return this.index <= 0;
    }
  }, {
    key: "items",
    get: function get() {
      return this._el.querySelectorAll(this._itemSelector);
    }
  }, {
    key: "filteredItems",
    get: function get() {
      return Array.prototype.slice.call(this.items).filter(itemFilter);
    }
  }, {
    key: "index",
    get: function get() {
      return this._index;
    },
    set: function set(newIndex) {
      if (newIndex > -1 && newIndex < this.filteredItems.length && newIndex !== this.index) {
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
    setData(model.filteredItems);
    KeyEmitter.addKeyDown(this.el);
    ExitEmitter.addFocusExit(this.el);
    var axis = model.options.axis;

    if (axis === 'both' || axis === 'x') {
      this.el.addEventListener('arrowLeftKeyDown', this._keyPrevListener);
      this.el.addEventListener('arrowRightKeyDown', this._keyNextListener);
    }

    if (axis === 'both' || axis === 'y') {
      this.el.addEventListener('arrowUpKeyDown', this._keyPrevListener);
      this.el.addEventListener('arrowDownKeyDown', this._keyNextListener);
    }

    this.el.addEventListener('homeKeyDown', this._keyHomeListener);
    this.el.addEventListener('endKeyDown', this._keyEndListener);
    this.el.addEventListener('click', this._clickListener);
    this.el.addEventListener('focusExit', this._focusExitListener);

    this._observer.observe(this.el, {
      childList: true,
      subtree: true,
      attributeFilter: ['hidden'],
      attributes: true
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