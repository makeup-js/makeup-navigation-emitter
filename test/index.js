describe('makeup-navigation-emitter', function() {
    var NavigationEmitter = require('../index.js');
    var dom = '<ul class="widget">'
                + '<li>Button 1</li>'
                + '<li>Button 2</li>'
                + '<li>Button 3</li>'
            + '</ul>';

    describe('when module is imported', function() {
        it('module should not be undefined', function() {
            expect(NavigationEmitter).not.toEqual(undefined);
        });
    });

    describe('when emitter is created with default options in default state', function() {
        var testEl;
        var onNavigationModelChange;
        var testEmitter;

        beforeEach(function() {
            document.body.innerHTML = dom;

            testEl = document.querySelector('.widget');
            testEmitter = NavigationEmitter.createLinear(testEl, 'li'); // eslint-disable-line

            onNavigationModelChange = jasmine.createSpy('onNavigationModelChange');
            testEl.addEventListener('navigationModelChange', onNavigationModelChange);
        });

        it('should trigger 0 navigationModelChange event on arrow left', function() {
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowLeftKeyDown'));
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(0);
        });

        it('should trigger 0 navigationModelChange event on arrow up', function() {
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowUpKeyDown'));
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(0);
        });

        it('should trigger 1 navigationModelChange event on arrow right', function() {
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowRightKeyDown'));
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
            // remove the listeners
            testEmitter.destroy();
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowRightKeyDown'));
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
        });

        it('should trigger 1 navigationModelChange event on arrow down', function() {
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowDownKeyDown'));
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
            // remove the listeners
            testEmitter.destroy();
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowDownKeyDown'));
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
        });
    });

    describe('when emitter is created with default options in default state with autoWrap', function() {
        var testEl;
        var onNavigationModelChange;
        var testEmitter;

        beforeEach(function() {
            document.body.innerHTML = dom;

            testEl = document.querySelector('.widget');
            testEmitter = NavigationEmitter.createLinear(testEl, 'li', { wrap: true }); // eslint-disable-line

            onNavigationModelChange = jasmine.createSpy('onNavigationModelChange');
            testEl.addEventListener('navigationModelChange', onNavigationModelChange);
        });

        it('should trigger 1 navigationModelChange event on arrow left', function() {
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowLeftKeyDown'));
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
            // remove the listeners
            testEmitter.destroy();
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowLeftKeyDown'));
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
        });

        it('should trigger 1 navigationModelChange event on arrow up', function() {
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowUpKeyDown'));
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
            // remove the listeners
            testEmitter.destroy();
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowUpKeyDown'));
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
        });

        it('should trigger 1 navigationModelChange event on arrow right', function() {
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowRightKeyDown'));
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
            // remove the listeners
            testEmitter.destroy();
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowRightKeyDown'));
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
        });

        it('should trigger 1 navigationModelChange event on arrow down', function() {
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowDownKeyDown'));
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
            // remove the listeners
            testEmitter.destroy();
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowDownKeyDown'));
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
        });
    });
});
