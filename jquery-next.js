(function(window, undefined) {

  'use strict';

  var document = window.document;

  function _toArray(list) {
    return Array.prototype.slice.call(list, 0);
  }

  function _toHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString;
    return div.childNodes;
  }

  function _isBoolean(value) {
    return value === true || value === false;
  }

  function _isNode(node) {
    return node instanceof window.Node;
  }

  function _isNodeList(list) {
    return list instanceof window.NodeList;
  }

  function _isString(str) {
    return typeof str === 'string';
  }

  function _isElementNode(node) {
    return node.nodeType === 1;
  }

  function _isDocumentNode(node) {
    return node.nodeType === 9;
  }

  function _isGlobal(obj) {
    var str = Object.prototype.toString.call(obj)
    return str === '[object global]'
        || str === '[object DOMWindow]'
        || str === '[object Window]';
  }

  function _isArray(arr) {
    return Object.prototype.toString.call(arr)  === '[object Array]';
  }

  function _isUndefined(obj) {
    return typeof obj === 'undefined';
  }

  var $ = function jQueryNext(selector, context) {
    return new $.fn.init(selector, context);
  };

  $.fn = $.prototype = {

    constructor: $,

    init: function init(selector, context) {

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
        if(!firstOfType || !(_isElementNode(el) || _isDocumentNode(el) || _isGlobal(el))) {
          return false;
        }

        this[index++] = el;
        return true;

      }, this);

      this.length = this.elements.length;

      return this;

    },

    get: function get(num) {

      return _isUndefined(num) ? this.elements : this.elements[num];

    },

    _getRefGroup: function _getRefGroup(param) {
      var group = this.elements.map(function(el) {
        return el[param];
      });
      return new this.constructor(group);
    },

    _getRefGroupFollowing: function _getRefGroupFollowing(param) {
      var elList = [];
      this.forEach(function(el) {
        var following = el;
        while(following[param]) {
          following = following[param];
          elList.push(following);
        }
      }, this);

      return this.constructor(elList);
    },

    forEach: function forEach(callback, ctx) {

      this.elements.forEach(callback, ctx);

      return this;

    },

    each: function each(callback) {

      return this.forEach(function(value, index) {
        callback.apply(value, [index, value]);
      });

    },

    addClass: function addClass(className) {

      this.forEach(function(el) {
        el.classList.add(className);
      });

      return this;

    },

    removeClass: function removeClass(className) {

      this.forEach(function(el) {
        el.classList.remove(className);
      });

      return this;

    },

    hasClass: function hasClass(className) {

      return this.elements.some(function(el) {
        return el.classList.contains(className);
      });

    },

    toggleClass: function toggleClass(className) {

      this.forEach(function(el) {
        el.classList.toggle(className);
      });

      return this;

    },

    attr: function attr(attribute, value) {

      if(value === false) {
        // remove attribute if value is false
        return this.removeAttr(attribute);
      } else if(value === true) {
        // set value to attribute name if value is true
        value = attribute;
      }

      if(!value) {
        // return attribute value of first element
        return this.elements[0].getAttribute(attribute);
      }

      this.forEach(function(el) {
        el.setAttribute(attribute, value);
      });

      return this;

    },

    /**
     * removes attributes from element
     * @param  {String} attrs space seperated list of attribute names
     * @return {$}            return self
     */
    removeAttr: function removeAttr(attributes) {

      // allow to insert space seperated attribute names
      attributes = attributes.split(' ');

      this.forEach(function(el) {
        attributes.forEach(function(attr) {
          el.removeAttribute(attr);
        });
      });

      return this;

    },

    data: function data(key, value) {

      if (!value) { return this.elements[0].dataset[key]; }

      this.forEach(function(el) {
        el.dataset[key] = value;
      });

      return this;

    },

    val: function val(value) {

      return this.attr('value', value);

    },

    find: function find(selector) {

      return this.constructor(selector, this.elements);

    },

    parent: function parent() {

      return this._getRefGroup('parentNode');

    },

    parents: function parents() {

      return this._getRefGroupFollowing('parentNode');

    },

    next: function next() {

      return this._getRefGroup('nextElementSibling');

    },

    nextAll: function nextAll() {

      return this._getRefGroupFollowing('nextElementSibling');

    },

    prev: function prev() {

      return this._getRefGroup('previousElementSibling');

    },

    prevAll: function prevAll() {

      return this._getRefGroupFollowing('previousElementSibling');

    },

    siblings: function siblings() {
      return this.constructor([
        this.prevAll(),
        this.nextAll()
      ]);
    },

    remove: function remove() {

      this.forEach(function(el) {
        var parent = el.parentNode;
        if(parent) {
          parent.removeChild(el);
        }
      });

      return this;
    },

    /**
     * removes all child nodes from elements
     * @return {$} self
     */
    empty: function empty() {

      this.forEach(function(el) {
        el.innerHTML = '';
      });

      return this;

    },

    html: function html(htmlString) {

      if(_isUndefined(htmlString)) {
        return this.elements[0].innerHTML;
      }

      if(_isString(htmlString)) {
        this.forEach(function(el) {
          el.innerHTML = htmlString;
        });
        return this;
      }

      // should be any element or node list
      // first clear all elements
      this.empty();
      this.forEach(function(el) {
        // @todo check for node lists and arrays
        // @todo clone html element when index > 1
        el.appendChild(htmlString);
      });

      return this;

    }

  };

  // insert fn as prototype for chaining
  $.fn.init.prototype = $.fn;


  // insert into window object
  window.$next = $;

})(window);
