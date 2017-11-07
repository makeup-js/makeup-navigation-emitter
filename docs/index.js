var NavigationEmitter = require('../index.js');

function nodeListToArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
}

var emitters = [];
var appender = document.getElementById('appender');
var widgetEls = nodeListToArray(document.querySelectorAll('.widget'));
var consoleEls = document.querySelectorAll('.console');
var wrapCheckbox = document.getElementById('wrap');

appender.addEventListener('click', function() {
    widgetEls.forEach(function(el) {
        var listItem = document.createElement('li');
        listItem.innerText = 'Item ' + parseInt(el.querySelectorAll('li').length, 10);
        el.children[0].appendChild(listItem);
    });
});

widgetEls.forEach(function(el, index) {
    emitters.push(NavigationEmitter.createLinear(el, 'li'));
    el.addEventListener('navigationModelChange', function(e) {
        consoleEls[index].value = e.detail.toIndex;
    });
});

wrapCheckbox.addEventListener('change', function(e) {
    emitters[0].model.wrap = e.target.checked;
    emitters[1].model.wrap = e.target.checked;
});

// emitters[0].model.index = 0;
// emitters[1].model.index = 0;
