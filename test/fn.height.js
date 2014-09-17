(function() {

  'use strict';

  describe('Dimensions', function() {

    describe('height function', function() {

      var $el;

      beforeEach(function() {
        $el = $next(document.createElement('div'));
        $el[0].style.height = '36px';
        $el[0].style.paddingTop = '2px';
        $el[0].style.borderTopWidth = '2px';
        $el[0].style.marginTop = '2px';
        document.body.appendChild($el[0]);
      });

      afterEach(function() {
        $el = null;
      });

      it('should be a function', function() {
        expect(typeof $next.fn.height).toBe('function');
      });

      it('should return the height of the first element', function() {
        var height = $el.height();
        expect(height).toBe(38);
      });

      it('should set the height (as a string) of all elements', function() {
        $el.height('42%');
        expect($el[0].style.height).toBe('42%');
      });

      it('should set the height (as a number) of all elements', function() {
        $el.height(23);
        expect($el[0].style.height).toBe('23px');
      });

    });
  });

})();
