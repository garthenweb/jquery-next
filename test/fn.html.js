(function() {

  'use strict';

  describe('Next', function() {

    describe('html function', function() {

      it('should be a function', function() {
        expect(typeof $next.fn.html).toBe('function');
      });

      describe('when called without parameters', function() {

        it('should return the html from the first element', function() {
          var el = document.createElement('div');
          var htmlStr = '<div> mY Test</div>    :)';
          el.innerHTML = htmlStr;
          expect($next(el).html()).toBe(htmlStr);
        });

        it('should return undefined when used without elements', function() {
          var $empty = $next(null);
          expect($empty.html()).toBeUndefined();
        });

      });

      describe('when called with string as parameter', function() {
        it('should set the html of a node', function() {
          var el = document.createElement('div');
          var htmlStr = '<div> mY Test</div>    :)';
          $next(el).html(htmlStr);
          expect(el.innerHTML).toBe(htmlStr);
        });
      });

      describe('when called with nodes as parameter', function() {

        it('should replace old children with new node', function() {
          var el = document.createElement('div');
          var child = document.createElement('div');
          var child2 = document.createElement('div');
          el.appendChild(child);
          el.appendChild(child2);

          var newChild = document.createElement('span');
          $next(el).html(newChild);
          expect(el.childNodes.length).toBe(1);
          expect(el.childNodes[0]).toBe(newChild);
        });

      });

    });
  });

})();
