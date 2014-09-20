(function() {

  'use strict';

  describe('DOM manipulation', function() {

    describe('text function', function() {

      var $selection;

      beforeEach(function() {
        var element = document.createElement('div');
        element.innerHTML = '<p>first p</p><p>second p</p>';
        $selection = $next(element).find('p');
      });

      afterEach(function() {
        $selection = null;
      });

      it('should be a function', function() {
        expect(typeof $next.fn.text).toBe('function');
      });

      it('should return the textContent', function() {
        expect($selection.text()).toBe('first psecond p');
      });

      it('should set the textContent', function() {
        $selection.text('test content');
        expect($selection.text()).toBe('test contenttest content');
      });

    });
  });

})();
