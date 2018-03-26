'use strict';

var watchSubtree = void 0;

if (typeof window !== 'undefined') {
    var raf = window.requestAnimationFrame || setTimeout;
    if (window.MutationObserver) {
        var opts = { childList: true, subtree: true };
        watchSubtree = function watchSubtree(el, cb) {
            var observer = new MutationObserver(cb);
            observer.observe(el, opts);
        };
    } else {
        watchSubtree = function watchSubtree(el, cb) {
            el.addEventListener('DOMSubtreeModified', function handler() {
                el.removeEventListener('DOMSubtreeModified', handler);
                raf(function () {
                    cb();
                    el.addEventListener('DOMSubtreeModified', handler);
                });
            });
        };
    }
}

function nodeListToArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
}

module.exports = {
    nodeListToArray: nodeListToArray,
    watchSubtree: watchSubtree
};
