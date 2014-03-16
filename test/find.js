(function() {

  'use strict';

  describe('Next', function() {

    var div;
    beforeEach(function() {
      document.body.innerHTML = '<div id="first"><div class="test-class"></div></div>';
    });

    afterEach(function() {
      document.body.innerHTML = '';
    });

    it('should have a find methode', function() {
      expect(typeof $next.fn.find).toBe('function');
    });

    it('should return a new instance when calling find', function() {
      var $div = $next('#first');
      var $inner = $div.find('div');
      expect($div).not.toBe($inner);
    });

    it('should find a element by tag name', function() {
      var $div = $next('#first');
      var $inner = $div.find('div');
      expect($inner[0]).toBeDefined();
      expect($inner.length).toBe(1);
    });
  });

})();
