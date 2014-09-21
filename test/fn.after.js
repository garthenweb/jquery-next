(function() {

  'use strict';

  describe('DOM manipulation', function() {

    describe('after function', function() {

      var $el;

      beforeEach(function() {
        $el = $next('<div><span></span></div><div><span></span></div>');
      });

      afterEach(function() {
        $el = null;
      });

      it('should be a function', function() {
        expect(typeof $next.fn.after).toBe('function');
      });

      it('should insert content after each element', function() {
        $el.after('<b></b>');
        expect($el[0].nextElementSibling.tagName).toBe('B');
      });

      it('should insert contents after each element', function() {
        $el.after('<b></b><i></i>');
        expect($el[0].nextElementSibling.tagName).toBe('B');
        expect($el[0].nextElementSibling.nextElementSibling.tagName).toBe('I');
      });

      it('should insert element after each element', function() {
        $el.after(document.createElement('b'));
        expect($el[0].nextElementSibling.tagName).toBe('B');
      });

      it('should insert jQuery elements after each element', function() {
        $el.after($next('<b></b>'));
        expect($el[0].nextElementSibling.tagName).toBe('B');
      });

    });
  });

})();
