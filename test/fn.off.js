(function() {

  'use strict';

  describe('$next Events', function() {

    describe('.off()', function() {

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
        expect(typeof $next.fn.off).toBe('function');
      });

      it('should remove a simple event listener', function() {
        function callback(e) {}
        $el.on('click', callback);
        $el.off('click', callback);
        expect(el.removeEventListener).toHaveBeenCalled();
        expect(el.removeEventListener.calls.length).toBe(1);
        expect(el.removeEventListener.calls[0].args[0]).toBe('click');
        expect(typeof el.removeEventListener.calls[0].args[1]).toBe('function');
        expect(el.removeEventListener.calls[0].args[2]).toBe(false);
        expect(el.addEventListener.calls[0].args[1])
          .toBe(el.removeEventListener.calls[0].args[1]);
      });

      it('should remove a delegated event listener', function() {
        function callback(e) {}
        $el.on('click', '.foo', callback);
        $el.off('click', '.foo', callback);
        expect(el.removeEventListener).toHaveBeenCalled();
        expect(el.removeEventListener.calls.length).toBe(1);
        expect(el.removeEventListener.calls[0].args[0]).toBe('click');
        expect(typeof el.removeEventListener.calls[0].args[1]).toBe('function');
        expect(el.removeEventListener.calls[0].args[2]).toBe(false);
        expect(el.addEventListener.calls[0].args[1])
          .toBe(el.removeEventListener.calls[0].args[1]);
      });

      it('should remove all delegated event listener', function() {
        function callback(e) {}
        $el.on('click', '.foo', callback);
        $el.on('click', '.bar', callback);
        $el.off('click', '**', callback);
        expect(el.removeEventListener).toHaveBeenCalled();
        expect(el.removeEventListener.calls.length).toBe(2);
        expect(el.removeEventListener.calls[0].args[0]).toBe('click');
        expect(typeof el.removeEventListener.calls[0].args[1]).toBe('function');
        expect(el.removeEventListener.calls[0].args[2]).toBe(false);
        expect(el.addEventListener.calls[0].args[1])
          .toBe(el.removeEventListener.calls[0].args[1]);
          expect(el.addEventListener.calls[1].args[1])
          .toBe(el.removeEventListener.calls[1].args[1]);
      });

      it('should remove event listeners via namespace', function() {
        function callback(e) {}
        $el.on('click.bar', callback);
        $el.off('.bar', callback);
        expect(el.removeEventListener).toHaveBeenCalled();
        expect(el.removeEventListener.calls.length).toBe(1);
        expect(el.removeEventListener.calls[0].args[0]).toBe('click');
        expect(typeof el.removeEventListener.calls[0].args[1]).toBe('function');
        expect(el.removeEventListener.calls[0].args[2]).toBe(false);
        expect(el.addEventListener.calls[0].args[1])
          .toBe(el.removeEventListener.calls[0].args[1]);
      });

      it('should remove all event listeners', function() {
        function callback(e) {}
        $el.on('click', callback);
        $el.on('click', '.foo', callback);
        $el.on('click.bar', callback);
        $el.off();
        expect(el.removeEventListener).toHaveBeenCalled();
        expect(el.removeEventListener.calls.length).toBe(3);
        expect(el.removeEventListener.calls[0].args[0]).toBe('click');
        expect(typeof el.removeEventListener.calls[0].args[1]).toBe('function');
        expect(el.removeEventListener.calls[0].args[2]).toBe(false);
        expect(el.addEventListener.calls[0].args[1])
          .toBe(el.removeEventListener.calls[0].args[1]);
        expect(el.addEventListener.calls[1].args[1])
          .toBe(el.removeEventListener.calls[1].args[1]);
        expect(el.addEventListener.calls[2].args[1])
          .toBe(el.removeEventListener.calls[2].args[1]);
      });

      it('should not remove other listeners when removing simple listener', function() {
        function callback(e) {}
        function callback2(e) {}
        $el.on('click', callback);
        $el.on('click', callback2);
        $el.off('click', callback);
        expect(el.removeEventListener.calls.length).toBe(1);
        expect(el.addEventListener.calls[0].args[1])
          .toBe(el.removeEventListener.calls[0].args[1]);
      });

      it('should not remove other listeners when removing delegated listener', function() {
        function callback(e) {}
        function callback2(e) {}
        $el.on('click', '.foo', callback);
        $el.on('click', '.foo', callback2);
        $el.off('click', callback);
        expect(el.removeEventListener.calls.length).toBe(1);
        expect(el.addEventListener.calls[0].args[1])
          .toBe(el.removeEventListener.calls[0].args[1]);
      });

      it('should not remove other listeners when removing listeners via namespace', function() {
        function callback(e) {}
        function callback2(e) {}
        $el.on('click', callback);
        $el.on('click.foo', callback2);
        $el.off('click.foo');
        expect(el.removeEventListener.calls.length).toBe(1);
        expect(el.addEventListener.calls[1].args[1])
          .toBe(el.removeEventListener.calls[0].args[1]);
      });

      it('should not remove other listeners when removing listeners via type', function() {
        function callback(e) {}
        function callback2(e) {}
        $el.on('click', callback);
        $el.on('keypress', callback2);
        $el.off('click');
        expect(el.removeEventListener.calls.length).toBe(1);
        expect(el.addEventListener.calls[0].args[1])
          .toBe(el.removeEventListener.calls[0].args[1]);
      });

    });
  });

})();
