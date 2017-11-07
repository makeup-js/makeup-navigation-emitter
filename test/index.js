describe("makeup-navigation-emitter", function() {
    var NavigationEmitter = require('../index.js');
    var dom = '<ul class="widget">'
                + '<li>Button 1</li>'
                + '<li>Button 2</li>'
                + '<li>Button 3</li>'
            + '</ul>';

    document.body.innerHTML = dom;

    var testEl = document.querySelector('.widget');
    var testEmitter; // eslint-disable-line

    describe('when module is imported', function() {
        it("module should not be undefined", function() {
            expect(NavigationEmitter).not.toEqual(undefined);
        });
    });

    describe('when emitter is created', function() {
        beforeAll(function() {
            testEmitter = NavigationEmitter.createLinear(testEl, 'li');
        });

        it("should trigger navigationModelChange event on arrow left", function(done) {
            // assert
            testEl.addEventListener('navigationModelChange', done);
            // execute
            testEl.dispatchEvent(new Event('arrowLeftKeyDown'));
        });

        it("should trigger navigationModelChange event on arrow up", function(done) {
            // assert
            testEl.addEventListener('navigationModelChange', done);
            // execute
            testEl.dispatchEvent(new Event('arrowUpKeyDown'));
        });

        it("should trigger navigationModelChange event on arrow right", function(done) {
            // assert
            testEl.addEventListener('navigationModelChange', done);
            // execute
            testEl.dispatchEvent(new Event('arrowRightKeyDown'));
        });

        it("should trigger navigationModelChange event on arrow down", function(done) {
            // assert
            testEl.addEventListener('navigationModelChange', done);
            // execute
            testEl.dispatchEvent(new Event('arrowDownKeyDown'));
        });
    });
});
