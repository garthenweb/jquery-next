(function() {

  'use strict';

  describe('DOM manipulation', function() {

    describe('before function', function() {

      var $el;

      beforeEach(function() {
        $el = $next('<div><span></span></div><div><span></span></div>');
      });

      afterEach(function() {
        $el = null;
      });

      it('should be a function', function() {
        expect(typeof $next.fn.before).toBe('function');
      });

      it('should insert content before each element', function() {
        $el.before('<b></b>');
        expect($el[0].previousElementSibling.tagName).toBe('B');
      });

      it('should insert contents before each element', function() {
        $el.before('<b></b><i></i>');
        expect($el[0].previousElementSibling.tagName).toBe('I');
        expect($el[0].previousElementSibling.previousElementSibling.tagName).toBe('B');
      });

      it('should insert element before each element', function() {
        $el.before(document.createElement('b'));
        expect($el[0].previousElementSibling.tagName).toBe('B');
      });

      it('should insert jQuery elements before each element', function() {
        $el.before($next('<b></b>'));
        expect($el[0].previousElementSibling.tagName).toBe('B');
      });

    });
  });

})();
