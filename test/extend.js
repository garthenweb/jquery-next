(function() {

  'use strict';

  describe('Static method', function() {

    describe('extend function', function() {

      var source = {
        a: 1,
        b: 'a',
        c: true,
        d: false,
        e: null,
        f: undefined,
        g: ['a', 'b'],
        h: function h() {},
        i: {
          a: 1,
          b: 'a',
          c: true,
          d: false,
          e: null,
          f: undefined,
          g: ['a', 'b'],
          h: function h() {}
        }
      };

      it('should be a function', function() {
        expect(typeof $next.extend).toBe('function');
      });

      it('should perform a shallow copy', function() {
        var target = $next.extend({}, source);
        expect(target).not.toBe(source);
        expect(target).toEqual(source);
        expect(target.i).toBe(source.i);
      });

      it('should perform a deep copy', function() {
        var target = $next.extend(true, {}, source);
        expect(target).not.toBe(source);
        expect(target).toEqual(source);
        expect(target.i).not.toBe(source.i);
        expect(target.i).toEqual(source.i);
      });

    });
  });

})();
