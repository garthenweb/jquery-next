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

    describe('find function', function() {

      it('should be a function', function() {
        expect(typeof $next.fn.find).toBe('function');
      });

      it('should return a new instance', function() {
        var $div = $next('#first');
        var $inner = $div.find('div');
        expect($div).not.toBe($inner);
      });

      it('should find one element by tag name', function() {
        var $div = $next('#first');
        var $inner = $div.find('div');
        expect($inner[0]).toBeDefined();
        expect($inner[0].tagName).toBe('DIV');
        expect($inner.length).toBe(1);
      });

      it('should find two nested elements by tag name', function() {
        var $div = $next('#second');
        var $inner = $div.find('div');
        expect($inner[0]).toBeDefined();
        expect($inner[0].tagName).toBe('DIV');
        expect($inner[1]).toBeDefined();
        expect($inner[1].tagName).toBe('DIV');
        expect($inner.length).toBe(2);
      });

      it('should find two nested elements by class name', function() {
        var $div = $next('#second');
        var $inner = $div.find('.test-class');
        expect($inner[0]).toBeDefined();
        expect($inner[0].classList.contains('test-class')).toBeTruthy();
        expect($inner[1]).toBeDefined();
        expect($inner[1].classList.contains('test-class')).toBeTruthy();
        expect($inner.length).toBe(2);
      });
    });
  });

})();
