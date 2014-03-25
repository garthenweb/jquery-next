(function() {

  'use strict';

  describe('Next', function() {

    beforeEach(function() {
      var first = '<div id="first"><div class="test-class"></div></div>';
      var second = '<div id="second"><div class="test-class"><div class="test-class"></div><span class="test-class-2"></span></div></div>';
      document.body.innerHTML = first + second;
    });

    afterEach(function() {
      document.body.innerHTML = '';
    });

    describe('parent function', function() {

      it('should be a function', function() {
        expect(typeof $next.fn.parent).toBe('function');
      });

      it('should return a $next instance', function() {

        expect($next('div').parent() instanceof $next).toBeTruthy();

      });

      it('should find the parents node of an element', function() {

        var $parents = $next('#first').parent();
        expect($parents[0]).toBe(document.body);
        expect($parents.length).toBe(1);

      });

      it('should find parents of each node in list', function() {

        var $parents = $next('.test-class').parent();
        expect($parents.length).toBe(3);

      });

    });
  });

})();
