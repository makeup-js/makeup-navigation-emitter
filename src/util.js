let watchSubtree;

if (typeof window !== 'undefined') {
    const raf = window.requestAnimationFrame || setTimeout;
    if (window.MutationObserver) {
        const opts = { childList: true, subtree: true };
        watchSubtree = (el, cb) => {
            const observer = new MutationObserver(cb);
            observer.observe(el, opts);
        };
    } else {
        watchSubtree = (el, cb) => {
            el.addEventListener('DOMSubtreeModified', function handler() {
                el.removeEventListener('DOMSubtreeModified', handler);
                raf(() => {
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
    nodeListToArray,
    watchSubtree
};
