(function() {

  'use strict';

  describe('DOM manipulation', function() {

    describe('clone function', function() {

      var $el;

      beforeEach(function() {
        var element = document.createElement('div');
        element.id = 'testnode';
        element.innerHTML = '<div>level2<div>level3</div></div>';
        $el = $next(element);
      });

      afterEach(function() {
        $el = null;
      });

      it('should be a function', function() {
        expect(typeof $next.fn.clone).toBe('function');
      });

      it('should perform a deep copy', function() {
        var $cloned = $el.clone();
        expect($cloned).not.toBe($el);
        expect($cloned[0].id).toBe($el[0].id);
        expect($cloned.innerHTML).toBe($el.innerHTML);
      });

      it('should perform a deep copy of all matched elements', function() {
        var $elset = $el.find('div');
        var $cloned = $elset.clone();
        expect($cloned).not.toBe($elset);
        expect($cloned.innerHTML).toBe($elset.innerHTML);
        expect($cloned.length).toBe($elset.length);
      });

    });
  });

})();
