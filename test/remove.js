(function() {

  'use strict';

  describe('Next', function() {

    beforeEach(function() {
      var first = '<div id="first"><div class="test-class"></div></div>';
      document.body.innerHTML = first;
    });

    afterEach(function() {
      document.body.innerHTML = '';
    });

    describe('remove function', function() {

      it('should be a function', function() {
        expect(typeof $next.fn.remove).toBe('function');
      });

      it('should remove elements from dom', function() {

        expect(document.getElementById('first')).toBeDefined();
        $next('#first').remove();
        expect(document.getElementById('first')).toBe(null);

      });

      it('should return itself with removed nodes', function() {

        var $removed = $next('#first').remove();

        expect($removed.length).toBe(1);
        expect($removed[0].nodeName).toBe('DIV');

      });

    });
  });

})();
