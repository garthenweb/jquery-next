(function() {

  'use strict';

  describe('Next', function() {

    describe('removeAttr function', function() {

      it('should be a function', function() {
        expect(typeof $next.fn.removeAttr).toBe('function');
      });

      it('should remove attributes from element', function() {

        var el = document.createElement('div');
        el.setAttribute('class', 'test');
        var $el = $next(el);

        expect(el.getAttribute('class')).toBe('test');
        $el.removeAttr('class');
        expect(el.getAttribute('class')).toBe(null);

      });

      it('should remove attribute from element list', function() {
        var els = [];
        for(var i = 0; i < 5; i++) {
          var el = document.createElement('article');
          el.setAttribute('data-test', 'test123');
          els.push(el);
        }
        var $els = $next(els);

        $els.forEach(function(el) {
          expect(el.getAttribute('data-test')).toBe('test123');
        });

        $els.removeAttr('data-test');

        $els.forEach(function(el) {
          expect(el.getAttribute('data-test')).toBe(null);
        });

      });

      it('should remove space seperated attributes from element', function() {

        var el = document.createElement('div');
        el.setAttribute('data-test', 'test');
        el.setAttribute('data-test2', 'test2');
        var $el = $next(el);

        $el.removeAttr('data-test data-test2');
        expect(el.getAttribute('data-test')).toBe(null);
        expect(el.getAttribute('data-test2')).toBe(null);

      });

    });
  });

})();
