describe("makeup-navigation-emitter", function() {
    var NavigationEmitter = require('../index.js');
    var dom = '<ul class="widget">'
                + '<li>Button 1</li>'
                + '<li>Button 2</li>'
                + '<li>Button 3</li>'
            + '</ul>';

    var testEl;
    var testEmitter;

    beforeAll(function() {
        document.body.innerHTML = dom;

        testEl = document.querySelector('.widget');
        testEmitter; // eslint-disable-line
    });

    describe('when module is imported', function() {
        it("module should not be undefined", function() {
            expect(NavigationEmitter).not.toEqual(undefined);
        });
    });

    describe('when emitter is created with default options', function() {
        var onNavigationModelChange;
        beforeAll(function() {
            onNavigationModelChange = jasmine.createSpy('onNavigationModelChange');
            testEmitter = NavigationEmitter.createLinear(testEl, 'li');
        });

        it("should trigger navigationModelChange event on arrow left", function() {
            // setup
            testEl.addEventListener('navigationModelChange', onNavigationModelChange);
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowLeftKeyDown'));
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(0);
        });

        it("should trigger navigationModelChange event on arrow up", function() {
            // setup
            testEl.addEventListener('navigationModelChange', onNavigationModelChange);
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowUpKeyDown'));
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(0);
        });

        it("should trigger navigationModelChange event on arrow right", function(done) {
            // assert
            testEl.addEventListener('navigationModelChange', done);
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowRightKeyDown'));
        });

        it("should trigger navigationModelChange event on arrow down", function(done) {
            // assert
            testEl.addEventListener('navigationModelChange', done);
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowDownKeyDown'));
        });
    });

    describe('when emitter is created with wrap set to true', function() {
        beforeAll(function() {
            testEmitter = NavigationEmitter.createLinear(testEl, 'li', { wrap: true });
        });

        it("should trigger navigationModelChange event on arrow left", function(done) {
            // assert
            testEl.addEventListener('navigationModelChange', done);
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowLeftKeyDown'));
        });

        it("should trigger navigationModelChange event on arrow up", function(done) {
            // assert
            testEl.addEventListener('navigationModelChange', done);
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowUpKeyDown'));
        });

        it("should trigger navigationModelChange event on arrow right", function(done) {
            // assert
            testEl.addEventListener('navigationModelChange', done);
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowRightKeyDown'));
        });

        it("should trigger navigationModelChange event on arrow down", function(done) {
            // assert
            testEl.addEventListener('navigationModelChange', done);
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowDownKeyDown'));
        });
    });
});
