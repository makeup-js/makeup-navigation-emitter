var NavigationEmitter = require('../index.js');

function nodeListToArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
}

var emitters = [];
var appender = document.getElementById('appender');
var widgetEls = nodeListToArray(document.querySelectorAll('.widget'));
var consoleEls = document.querySelectorAll('.console');
var wrapCheckbox = document.getElementById('wrap');

var options = [
    { },
    { autoInit: -1, autoReset: -1 },
    { autoInit: -1, autoReset: -1 }
];

appender.addEventListener('click', function() {
    widgetEls.forEach(function(el) {
        var listEl = el.querySelector('ul');
        var listItem = document.createElement('li');
        listItem.innerText = 'Item ' + parseInt(listEl.querySelectorAll('li').length, 10);
        listEl.appendChild(listItem);
    });
});

widgetEls.forEach(function(el, index) {
    el.addEventListener('navigationModelChange', function(e) {
        consoleEls[index].value = e.detail.toIndex;
    });
    emitters.push(NavigationEmitter.createLinear(el, 'li', options[index]));
    consoleEls[index].value = emitters[index].model.index;
});

wrapCheckbox.addEventListener('change', function(e) {
    emitters.forEach(function(emitter) {
        emitter.model.options.wrap = e.target.checked;
    });
});

// emitters[0].model.index = 1;
// emitters[1].model.index = 1;
