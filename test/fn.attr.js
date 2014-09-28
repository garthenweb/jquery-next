(function() {

  'use strict';

  describe('Next', function() {

    describe('attr function', function() {

      var $el;

      beforeEach(function() {
        $el = $next(document.createElement('div'));
      });

      afterEach(function() {
        $el = null;
      });

      it('should be a function', function() {
        expect(typeof $next.fn.attr).toBe('function');
      });

      it('should set a attribute to a div', function() {
        $el.attr('data-test', 'test');
        expect($el[0].getAttribute('data-test')).toBe('test');
      });

      it('should get the value of a attribute from a div', function() {
        $el[0].setAttribute('data-test', 'test');
        expect($el.attr('data-test')).toBe('test');
      });

      it('should add the attribute name as value when used with true ', function() {
        $el.attr('contenteditable', true);
        expect($el[0].getAttribute('contenteditable')).toBe('contenteditable');
      });

      it('should remove attribute when used with false', function() {
        $el[0].setAttribute('contenteditable', 'contenteditable');
        $el.attr('contenteditable', false);
        expect($el[0].getAttribute('contenteditable')).toBe(null);
      });

      it('should remove attribute when used with false', function() {
        $el[0].setAttribute('contenteditable', 'contenteditable');
        $el.attr('contenteditable', false);
        expect($el[0].getAttribute('contenteditable')).toBe(null);
      });

      it('should return undefined when used without elements', function() {
        var $empty = $next(null);
        expect($empty.attr('data')).toBeUndefined();
      });

    });
  });

})();
