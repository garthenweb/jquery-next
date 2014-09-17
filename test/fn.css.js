(function() {

  'use strict';

  describe('CSS', function() {

    describe('css function', function() {

      var $el;

      beforeEach(function() {
        document.body.appendChild(document.createElement('div'));
        $el = $next('div');
      });

      afterEach(function() {
        $el[0].parentNode.removeChild($el[0]);
        $el = null;
      });

      it('should be a function', function() {
        expect(typeof $next.fn.css).toBe('function');
      });

      it('should return the computed style', function() {
        var actual = $el.css('display');
        expect(actual).toBe('block');
      });

      it('should set a single property', function() {
        $el.css('display', 'none');
        expect($el[0].style.display).toBe('none');
      });

      it('should remove a single property', function() {
        $el.css('display', 'none');
        $el.css('display', '');
        expect($el[0].style.display).toBe('');
      });

      it('should set multiple properties from an object', function() {
        $el.css({
          'display': 'none',
          'color': 'green'
        });
        expect($el[0].style.display).toBe('none');
        expect($el[0].style.color).toBe('green');
      });

      it('should set properties written with dashes or camelcase', function() {
        $el.css('border-top-color', 'green');
        expect($el[0].style.borderTopColor).toBe('green');

        $el.css('borderTopColor', 'red');
        expect($el[0].style.borderTopColor).toBe('red');

        $el.css({ 'border-top-color': 'green' });
        expect($el[0].style.borderTopColor).toBe('green');

        $el.css({ borderTopColor: 'red' });
        expect($el[0].style.borderTopColor).toBe('red');
      });

    });
  });

})();
