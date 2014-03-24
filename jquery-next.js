(function(window, undefined) {

  'use strict';

  var document = window.document;

  var _toArray = function(list) {
    return Array.prototype.slice.call(list, 0);
  };

  var _toHTML = function(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString;
    return div.childNodes;
  };

  var _isNode = function(node) {
    return node instanceof window.Node;
  };

  var _isNodeList = function(list) {
    return list instanceof window.NodeList;
  };

  var _isString = function(str) {
    return typeof str === 'string';
  };

  var _isElementNode = function(node) {
    return node.nodeType === 1;
  };

  var _isDocumentNode = function(node) {
    return node.nodeType === 9;
  };

  var _isGlobal = function(obj) {
    var str = Object.prototype.toString.call(obj)
    return str === '[object global]'
        || str === '[object DOMWindow]'
        || str === '[object Window]';
  };

  var _isArray = function(arr) {
    return Object.prototype.toString.call(arr)  === '[object Array]';
  };

  var _isUndefined = function(obj) {
    return typeof obj === 'undefined';
  };

  var $ = function jQueryNext(selector, context) {
    return new $.fn.init(selector, context);
  };

  $.fn = $.prototype = {

    constructor: $,

    init: function(selector, context) {

      var elements,
          index;

      if(!selector) {

        this.elements = [];
        this.length = this.elements.length;

        return this;

      } else if(_isString(selector)) {

        if(selector.charAt(0) === '<' && selector.charAt( selector.length - 1 ) === '>' && selector.length >= 3) {

          // selector is html string
          // create elements
          elements = _toHTML(selector);

        } else {

          this.selector = selector;

          // set document as default context
          if(!context) {
            context = document;
          }

          if(_isNode(context)) {

            elements = context.querySelectorAll(selector);

          } else if(_isNodeList(context) || _isArray(context)) {

            elements = [];
            _toArray(context).forEach(function(node) {
              if(_isNode(node)) {
                // find all nodes by querySelectorAll
                // and push each into the elements array
                _toArray(node.querySelectorAll(selector)).forEach(function(el) {
                  elements.push(el);
                });
              }
            });

          } else {

            throw 'Context should be a node or a list of nodes';

          }

        }

      } else if(_isNode(selector) || _isGlobal(selector)) {

        // set document as default context
        if(!context) {
          context = document;
        }

        elements = [selector];

      } else if(_isNodeList(selector) || _isArray(selector)) {

        elements = selector;

      } else {

        throw 'Selector should be a string, node or a list of nodes';

      }

      if(context) {
        this.context = context;
      }

      index = 0;
      // get elements without text nodes and append to object
      // also convert elements into an array and save as elements on this
      this.elements = _toArray(elements).filter(function(el, key, elements) {

        // filter duplicated elements
        var firstOfType = elements.indexOf(el) === key;
        if(firstOfType && (_isElementNode(el) || _isDocumentNode(el) || _isGlobal(el))) {
          this[index++] = el;
          return true;
        }

        return false;

      }, this);

      this.length = this.elements.length;

      return this;

    },

    get: function(num) {

      return _isUndefined(num) ? this.elements : this.elements[num];

    },

    forEach: function(callback, ctx) {

      this.elements.forEach(callback, ctx);

      return this;

    },

    each: function(callback) {

      return this.forEach(function(value, index) {
        callback.apply(value, [index, value]);
      });

    },

    addClass: function(className) {

      this.forEach(function(el) {
        el.classList.add(className);
      });

      return this;

    },

    removeClass: function(className) {

      this.forEach(function(el) {
        el.classList.remove(className);
      });

      return this;

    },

    hasClass: function(className) {

      return this.elements.some(function(el) {
        return el.classList.contains(className);
      });

    },

    toggleClass: function(className) {

      this.forEach(function(el) {
        el.classList.toggle(className);
      });

      return this;

    },

    attr: function(attr, value) {

      if(!value) {
        return this.elements[0].getAttribute(attr);
      }

      this.forEach(function(el) {
        el.setAttribute(attr, value);
      });

      return this;

    },

    data: function(key, value) {

      if (!value) { return this.elements[0].dataset[key]; }

      this.forEach(function (el) {
        el.dataset[key] = value;
      });

      return this;

    },

    val: function(value) {

      return this.attr('value', value);

    },

    find: function(selector) {

      return this.constructor(selector, this.elements);

    },

    parent: function() {

      var parents = this.elements.map(function(el) {
        return el.parentNode;
      });
      return new this.constructor(parents);

    },

    remove: function() {

      this.forEach(function(el) {
        var parent = el.parentNode;
        if(parent) {
          parent.removeChild(el);
        }
      });

      return this;
    }

  };

  // insert fn as prototype for chaining
  $.fn.init.prototype = $.fn;


  // insert into window object
  window.$next = $;

})(window);
