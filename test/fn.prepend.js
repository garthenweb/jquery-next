(function() {

  'use strict';

  describe('DOM manipulation', function() {

    describe('prepend function', function() {

      var $el;

      beforeEach(function() {
        $el = $next('<div><span></span></div><div><span></span></div>');
      });

      afterEach(function() {
        $el = null;
      });

      it('should be a function', function() {
        expect(typeof $next.fn.prepend).toBe('function');
      });

      it('should insert content as first-child to each element', function() {
        $el.prepend('<b></b>');
        expect($el[0].firstChild.tagName).toBe('B');
      });

      it('should insert contents as first-child to each element', function() {
        $el.prepend('<b></b><i></i>');
        expect($el[0].firstChild.tagName).toBe('B');
        expect($el[0].firstChild.nextElementSibling.tagName).toBe('I');
      });

      it('should insert element as first-child to each element', function() {
        $el.prepend(document.createElement('b'));
        expect($el[0].firstChild.tagName).toBe('B');
      });

      it('should insert jQuery elements as first-child to each element', function() {
        $el.prepend($next('<b></b>'));
        expect($el[0].firstChild.tagName).toBe('B');
      });

    });
  });

})();
