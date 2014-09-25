(function() {

  'use strict';

  describe('Attributes', function() {

    describe('addClass function', function() {

      var $el;

      beforeEach(function() {
        $el = $next(document.createElement('div'));
      });

      afterEach(function() {
        $el = null;
      });

      it('should be a function', function() {
        expect(typeof $next.fn.addClass).toBe('function');
      });

      it('should add a class to an element', function() {
        $el.addClass('test');
        expect($el[0].className).toBe('test');
      });

    });

    describe('removeClass function', function() {

      var $el;

      beforeEach(function() {
        var el = document.createElement('div');
        el.className = 'test';
        $el = $next(el);
      });

      afterEach(function() {
        $el = null;
      });

      it('should be a function', function() {
        expect(typeof $next.fn.removeClass).toBe('function');
      });

      it('should remove a class from an element', function() {
        $el.removeClass('test');
        expect($el[0].className).toBe('');
      });

    });

    describe('hasClass function', function() {

      var $el;

      beforeEach(function() {
        var el = document.createElement('div');
        el.className = 'test';
        $el = $next(el);
      });

      afterEach(function() {
        $el = null;
      });

      it('should be a function', function() {
        expect(typeof $next.fn.hasClass).toBe('function');
      });

      it('should return true if class is present in element.className', function() {
        expect($el.hasClass('test')).toBe(true);
        expect($el.hasClass('foo')).toBe(false);
      });

    });

    describe('toggleClass function', function() {

      var $el;

      beforeEach(function() {
        $el = $next(document.createElement('div'));
      });

      afterEach(function() {
        $el = null;
      });

      it('should be a function', function() {
        expect(typeof $next.fn.toggleClass).toBe('function');
      });

      it('should toggle the specified class on an element', function() {
        expect($el[0].className).toBe('');
        $el.toggleClass('test');
        expect($el[0].className).toBe('test');
      });

    });
  });

})();
