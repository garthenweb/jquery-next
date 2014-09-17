(function() {

  'use strict';

  describe('Is', function() {

    describe('is function', function() {

      var el;
      var $el;

      beforeEach(function() {
        el = document.createElement('div');
        $el = $next(el);
        // HACK: phantomjs still uses an older webkit implementation..
        HTMLElement.prototype.matches = HTMLElement.prototype.webkitMatchesSelector;
      });

      afterEach(function() {
        $el = null;
        delete HTMLElement.prototype.matches;
      });

      it('should be a function', function() {
        expect(typeof $next.fn.is).toBe('function');
      });

      it('should match the element with a selector', function() {
        var result = $el.is('div');
        expect(result).toBe(true);
      });

      it('should match a HTMLElement', function() {
        var result = $el.is(el);
        expect(result).toBe(true);
      });

      it('should match a jQueryNext instance', function() {
        var result = $el.is($el);
        expect(result).toBe(true);
      });

      it('should match with a function', function() {
        var result = $el.is(function(i, el) { return el.tagName === 'DIV'; });
        expect(result).toBe(true);
      });

    });
  });

})();
