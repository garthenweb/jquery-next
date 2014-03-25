(function() {

  'use strict';

  describe('Next', function() {

    describe('empty function', function() {

      it('should be a function', function() {
        expect(typeof $next.fn.empty).toBe('function');
      });

      it('should remove all nodes from an element', function() {
        var el = document.createElement('div');
        el.innerHTML = '<div></div>   New Textnode <span>I am a text</span> :)';
        var $el = $next(el);
        $el.empty();
        expect($el[0]).toBeDefined();
        expect($el[0].innerHTML).toBeDefined('');
        expect($el[0].childNodes.length).toBeDefined(0);
      });

    });
  });

})();
