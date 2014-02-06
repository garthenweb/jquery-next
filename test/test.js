(function() {

  'use strict';

  describe('Next', function() {

    it('should be defined', function() {
      expect($next).toBeDefined();
    });

    describe('selector engine', function() {

      describe('when called without params', function() {

        var $empty = $next();

        it('should have a length property', function() {
          expect($empty.length).toBeDefined();
        });

        it('should not contain elements', function() {
          expect($empty.length).toBe(0);
          expect($empty.elements).toEqual([]);
        });

      });

      describe('should create', function() {

        it('a div from html string', function() {
          var $div = $next('<div></div>');
          expect($div.length).toBe(1);
          expect($div.elements[0].tagName).toEqual('DIV');
        });

        it('a div even if it is not closed', function() {
          var $div = $next('<div>');
          expect($div.length).toBe(1);
          expect($div.elements[0].tagName).toEqual('DIV');
        });

        it('a complex dom structure', function() {
          var htmlStr = '<nav class="test-list"> <a href="#HTML">HTML</a>  <ul><li>1</li><li>2</li></ul><a href="#js">js</a></nav>';
          var $list = $next(htmlStr);
          expect($list[0].outerHTML).toBe(htmlStr);
        });

      });

      it('should set default context do document', function() {
        expect($next('div').context).toBe(document);
      });

      it('should find elements by tagName', function() {
        var div = document.createElement('div');
        document.body.appendChild(div);
        expect($next('div').length).toBe(1);
        expect($next('div')[0]).toBe(div);
      });

    });
  });

})();
