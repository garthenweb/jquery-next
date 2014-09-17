(function() {

  'use strict';

  describe('Dimensions', function() {

    describe('width function', function() {

      var $el;

      beforeEach(function() {
        $el = $next(document.createElement('div'));
        $el[0].style.width = '36px';
        $el[0].style.paddingLeft = '2px';
        $el[0].style.borderLeftWidth = '2px';
        $el[0].style.marginLeft = '2px';
        document.body.appendChild($el[0]);
      });

      afterEach(function() {
        $el = null;
      });

      it('should be a function', function() {
        expect(typeof $next.fn.width).toBe('function');
      });

      it('should return the width of the first element', function() {
        var width = $el.width();
        expect(width).toBe(38);
      });

      it('should set the width (as a string) of all elements', function() {
        $el.width('42%');
        expect($el[0].style.width).toBe('42%');
      });

      it('should set the width (as a number) of all elements', function() {
        $el.width(23);
        expect($el[0].style.width).toBe('23px');
      });

    });
  });

})();
