(function() {

  'use strict';

  describe('Is', function() {

    describe('is function', function() {

      var el_div;
      var el_span;
      var $el_div;
      var $el_span;

      beforeEach(function() {
        el_span = document.createElement('span');
        el_div = document.createElement('div');
        $el_div = $next(el_div);
        $el_span = $next(el_span);
        // HACK: the browser used for tests might not already have this implemented..
        Element.prototype.matches =
          Element.prototype.matchesSelector ||
          Element.prototype.webkitMatchesSelector ||
          Element.prototype.mozMatchesSelector ||
          Element.prototype.msMatchesSelector ||
          Element.prototype.oMatchesSelector ||
          function (selector) {
            var node = this,
                nodes = (node.parentNode || node.document).querySelectorAll(selector),
                i = -1;
            while (nodes[++i] && nodes[i] != node);
            return !!nodes[i];
          }
      });

      afterEach(function() {
        el_div = el_span = $el_div = $el_span = null;
        delete HTMLElement.prototype.matches;
      });

      it('should be a function', function() {
        expect(typeof $next.fn.is).toBe('function');
      });

      it('should match the element with a selector', function() {
        var result = $el_div.is('div');
        expect(result).toBe(true);
      });

      it('should not match the element with a different selector', function() {
        var result = $el_div.is('span');
        expect(result).toBe(false);
      });

      it('should match a HTMLElement', function() {
        var result = $el_div.is(el_div);
        expect(result).toBe(true);
      });

      it('should not match if given a different HTMLElement', function() {
        var result = $el_div.is(el_span);
        expect(result).toBe(false);
      });

      it('should match a jQueryNext instance', function() {
        var result = $el_div.is($el_div);
        expect(result).toBe(true);
      });

      it('should not match a different jQueryNext instance', function() {
        var result = $el_div.is($el_span);
        expect(result).toBe(false);
      });

      it('should match with a function', function() {
        var result = $el_div.is(function(i, el_div) { return el_div.tagName === 'DIV'; });
        expect(result).toBe(true);
      });

      it('should not match when the function returns false', function() {
        var result = $el_div.is(function(i, el_div) { return false; });
        expect(result).toBe(false);
      });

    });
  });

})();
