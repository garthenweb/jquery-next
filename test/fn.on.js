(function() {

  'use strict';

  describe('$next Events', function() {

    describe('.on() should register event listeners', function() {

      var el;
      var $el;

      beforeEach(function() {
        el = document.createElement('div');
        $el = $next(el);
        spyOn(el, 'addEventListener');
      });

      afterEach(function() {
        el = null;
        $el = null;
      });

      it('should be a function', function() {
        expect(typeof $next.fn.on).toBe('function');
      });

      it('should register a simple event listener', function() {
        function callback(e) {}
        $el.on('click', callback);
        expect(el.addEventListener).toHaveBeenCalled();
        expect(el.addEventListener.calls.length).toBe(1);
        expect(el.addEventListener.calls[0].args[0]).toBe('click');
        expect(typeof el.addEventListener.calls[0].args[1]).toBe('function');
        expect(el.addEventListener.calls[0].args[2]).toBe(false);
      });

      it('should register listeners with namespaces', function() {
        function callback(e) {}
        $el.on('click.foo', callback);
        expect(el.addEventListener).toHaveBeenCalled();
        expect(el.addEventListener.calls.length).toBe(1);
        expect(el.addEventListener.calls[0].args[0]).toBe('click');
        expect(typeof el.addEventListener.calls[0].args[1]).toBe('function');
        expect(el.addEventListener.calls[0].args[2]).toBe(false);
      });

      it('should register multiple listeners with namespaces', function() {
        function callback(e) {}
        $el.on('click.foo, keypress.bar', callback);
        expect(el.addEventListener).toHaveBeenCalled();
        expect(el.addEventListener.calls.length).toBe(2);
        expect(el.addEventListener.calls[0].args[0]).toBe('click');
        expect(typeof el.addEventListener.calls[0].args[1]).toBe('function');
        expect(el.addEventListener.calls[1].args[0]).toBe('keypress');
        expect(typeof el.addEventListener.calls[1].args[1]).toBe('function');
        expect(el.addEventListener.calls[0].args[2]).toBe(false);
      });

      it('should register a delegated event listener', function() {
        function callback(e) {}
        $el.on('click', '.foo', callback);
        expect(el.addEventListener).toHaveBeenCalled();
        expect(el.addEventListener.calls.length).toBe(1);
        expect(el.addEventListener.calls[0].args[0]).toBe('click');
        expect(typeof el.addEventListener.calls[0].args[1]).toBe('function');
        expect(el.addEventListener.calls[0].args[2]).toBe(false);
      });

      it('should register a delegated event listener with data', function() {
        function callback(e) {}
        $el.on('click', '.foo', { name: 'bar' }, callback);
        expect(el.addEventListener).toHaveBeenCalled();
        expect(el.addEventListener.calls.length).toBe(1);
        expect(el.addEventListener.calls[0].args[0]).toBe('click');
        expect(typeof el.addEventListener.calls[0].args[1]).toBe('function');
        expect(el.addEventListener.calls[0].args[2]).toBe(false);
      });

      it('should register multiple event listeners', function() {
        function onclick(e) {}
        function onkeypress(e) {}
        $el.on({
          'click': onclick,
          'keypress': onkeypress
        });
        expect(el.addEventListener).toHaveBeenCalled();
        expect(el.addEventListener.calls.length).toBe(2);
        expect(el.addEventListener.calls[0].args[0]).toBe('click');
        expect(el.addEventListener.calls[1].args[0]).toBe('keypress');
        expect(typeof el.addEventListener.calls[0].args[1]).toBe('function');
        expect(typeof el.addEventListener.calls[1].args[1]).toBe('function');
        expect(el.addEventListener.calls[0].args[2]).toBe(false);
        expect(el.addEventListener.calls[1].args[2]).toBe(false);
      });

      it('should call the handler with element as context', function() {
        function callback(e) {
          expect(this).toBe(el);
        }
        $el.on('click', callback);
        el.addEventListener.calls[0].args[1]({});
      });

      it('should set the provided data on event object', function() {
        function callback(e) {
          expect(e.data).toEqual({ name: 'foo' });
        }
        $el.on('click', { name: 'foo' }, callback);
        el.addEventListener.calls[0].args[1]({});
      });

      it('should match currentTarget against provided selector', function() {
        var callback = jasmine.createSpy('callback');
        var matches = jasmine.createSpy('matches').andReturn(true);
        $el.on('click', '.foo', callback);
        el.addEventListener.calls[0].args[1]({
          currentTarget: { matches: matches }
        });
        expect(matches).toHaveBeenCalled();
        expect(matches).toHaveBeenCalledWith('.foo');
        expect(callback).toHaveBeenCalled();
      });

      it('should not call callback if currentTarget does not match', function() {
        var callback = jasmine.createSpy('callback');
        var matches = jasmine.createSpy('matches').andReturn(false);
        $el.on('click', '.foo', callback);
        el.addEventListener.calls[0].args[1]({
          currentTarget: { matches: matches }
        });
        expect(matches).toHaveBeenCalled();
        expect(matches).toHaveBeenCalledWith('.foo');
        expect(callback).not.toHaveBeenCalled();
      });

    });
  });

})();
