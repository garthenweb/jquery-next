(function() {

  'use strict';

  describe('Next', function() {

    afterEach(function() {
      document.body.innerHTML = '';
    });

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

      it('should set default context for strings based selectors if not defined', function() {
        expect($next('div').context).toBe(document);
      });

      it('should set default context for single nodes', function() {
        expect($next(document.getElementsByTagName('html')[0]).context).toBe(document);
      });

      it('should find elements by tag name', function() {
        var div = document.createElement('div');
        document.body.appendChild(div);
        expect($next('div').length).toBe(1);
        expect($next('div')[0]).toBe(div);
      });

      it('should accept comma seperated selectors', function() {
        var html = '<div></div><span></span>';
        document.body.innerHTML = html;
        var $matches = $next('div, span');
        expect($matches.length).toBe(2);
        expect($matches[0].tagName).toBe('DIV');
        expect($matches[1].tagName).toBe('SPAN');
      });

      it('should not have duplicated entries', function() {

        var html = '<div class="test"></div>';
        document.body.innerHTML = html;

        var $matches = $next('div, .test');
        expect($matches.length).toBe(1);

      });

      it('should not have duplicated entries when iterating over multiple context', function() {

        var html = '<div class="test"></div>';
        document.body.innerHTML = html;

        var $matches = $next('div, .test', [document.body, document]);
        expect($matches.length).toBe(1);

      });

      it('should accept document node as first parameter', function() {

        expect($next(document)[0]).toBe(document);

      });

      it('should accept window node as first parameter', function() {

        expect($next(window)[0]).toBe(window);

      });

    });
  });

})();
