(function() {

  'use strict';

  describe('Dimensions', function() {

    describe('outerWidth function', function() {

      var $el;

      beforeEach(function() {
        $el = $next(document.createElement('div'));
        $el[0].style.width = '36px';
        $el[0].style.paddingLeft = '2px';
        $el[0].style.border = '1px solid black';
        $el[0].style.marginLeft = '2px';
        document.body.appendChild($el[0]);
      });

      afterEach(function() {
        $el = null;
      });

      it('should be a function', function() {
        expect(typeof $next.fn.outerWidth).toBe('function');
      });

      it('should return the outer width of the first element', function() {
        var width = $el.outerWidth();
        expect(width).toBe(40);
      });

      it('should return the outer width including margin of the first element', function() {
        var width = $el.outerWidth(true);
        expect(width).toBe(42);
      });

    });
  });

})();
