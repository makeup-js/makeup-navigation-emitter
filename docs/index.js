var NavigationModelEmitter = require('../index.js');

var emitters = [];
var appender = document.getElementById('appender');
var widgetEls = document.querySelectorAll('.widget');
var consoleEls = document.querySelectorAll('.console');
var wrapCheckbox = document.getElementById('wrap');

appender.addEventListener('click', function() {
    Array.prototype.slice.call(widgetEls).forEach(function(el, index) {
        var listItem = document.createElement('li');
        listItem.innerText = 'Item ' + parseInt(emitters[index].model.items.length, 10);
        el.children[0].appendChild(listItem);
    });
});

Array.prototype.slice.call(widgetEls).forEach(function(el, index) {
    emitters.push(NavigationModelEmitter.createLinear(el, 'li'));
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
