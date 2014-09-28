(function() {

  'use strict';

  describe('$next Events', function() {

    describe('.once()', function() {

      var el;
      var $el;

      beforeEach(function() {
        el = document.createElement('div');
        $el = $next(el);
        spyOn(el, 'addEventListener');
        spyOn(el, 'removeEventListener');
      });

      afterEach(function() {
        el = null;
        $el = null;
      });

      it('should be a function', function() {
        expect(typeof $next.fn.once).toBe('function');
      });

      it('should remove event listener after it has been triggered', function() {
        function callback(e) {}
        $el.once('click', callback);
        expect(el.addEventListener).toHaveBeenCalled();
        expect(el.addEventListener.calls.length).toBe(1);
        el.addEventListener.calls[0].args[1]({});
        el.addEventListener.calls[0].args[1]({});
        expect(el.removeEventListener).toHaveBeenCalled();
        expect(el.removeEventListener.calls.length).toBe(1);
      });

      it('should trigger once for each event', function() {
        function callback(e) {}
        $el.once('click keypress', callback);
        expect(el.addEventListener).toHaveBeenCalled();
        expect(el.addEventListener.calls.length).toBe(2);
        expect(el.addEventListener.calls[0].args[0]).toBe('click');
        expect(el.addEventListener.calls[1].args[0]).toBe('keypress');
        el.addEventListener.calls[0].args[1]({});
        el.addEventListener.calls[0].args[1]({});
        expect(el.removeEventListener).toHaveBeenCalled();
        expect(el.removeEventListener.calls.length).toBe(2);
        expect(el.removeEventListener.calls[0].args[0]).toBe('click');
        expect(el.removeEventListener.calls[1].args[0]).toBe('keypress');
      });

    });
  });

})();
