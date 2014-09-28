(function() {

  'use strict';

  describe('Attributes', function() {

    describe('data function', function() {

      var $el;

      beforeEach(function() {
        $el = $next(document.createElement('div'));
      });

      afterEach(function() {
        $el = null;
      });

      it('should be a function', function() {
        expect(typeof $next.fn.data).toBe('function');
      });

      it('should set a data attribute', function() {
        $el.data('fooBarBaz', 'test');
        expect($el[0].getAttribute('data-foo-bar-baz')).toBe('test');
      });

      it('should get the value of a data attribute', function() {
        $el[0].setAttribute('data-foo-bar-baz', 'test');
        expect($el.data('fooBarBaz')).toBe('test');
      });

    });
  });

})();
