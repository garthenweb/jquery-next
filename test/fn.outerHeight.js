(function() {

  'use strict';

  describe('Dimensions', function() {

    describe('outerHeight function', function() {

      var $el;

      beforeEach(function() {
        $el = $next(document.createElement('div'));
        $el[0].style.height = '36px';
        $el[0].style.paddingTop = '2px';
        $el[0].style.border = '1px solid black';
        $el[0].style.marginTop = '2px';
        document.body.appendChild($el[0]);
      });

      afterEach(function() {
        $el = null;
      });

      it('should be a function', function() {
        expect(typeof $next.fn.outerHeight).toBe('function');
      });

      it('should return the outer height of the first element', function() {
        var height = $el.outerHeight();
        expect(height).toBe(40);
      });

      it('should return the outer height including margin of the first element', function() {
        var height = $el.outerHeight(true);
        expect(height).toBe(42);
      });

      it('should return undefined when used without elements', function() {
        var $empty = $next(null);
        expect($empty.outerHeight()).toBeUndefined();
      });

    });
  });

})();
