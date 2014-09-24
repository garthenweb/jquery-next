(function() {

  'use strict';

  describe('DOM manipulation', function() {

    describe('append function', function() {

      var $el;

      beforeEach(function() {
        $el = $next('<div><span></span></div><div><span></span></div>');
      });

      afterEach(function() {
        $el = null;
      });

      it('should be a function', function() {
        expect(typeof $next.fn.append).toBe('function');
      });

      it('should insert content as last-child to each element', function() {
        $el.append('<b></b>');
        expect($el[0].lastChild.tagName).toBe('B');
      });

      it('should insert contents as last-child to each element', function() {
        $el.append('<b></b><i></i>');
        expect($el[0].lastChild.previousElementSibling.tagName).toBe('B');
        expect($el[0].lastChild.tagName).toBe('I');
      });

      it('should insert element as last-child to each element', function() {
        $el.append(document.createElement('b'));
        expect($el[0].lastChild.tagName).toBe('B');
      });

      it('should insert jQuery elements as last-child to each element', function() {
        $el.append($next('<b></b>'));
        expect($el[0].lastChild.tagName).toBe('B');
      });

    });
  });

})();
