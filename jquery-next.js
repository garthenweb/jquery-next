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
    return typeof value === 'boolean';
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
    return Array.isArray(arr);
  }

  function _isUndefined(obj) {
    return typeof obj === 'undefined';
  }

  function _isFunction(fn) {
    return typeof fn === 'function';
  }

  function _isJQueryNext(obj) {
    return obj instanceof $;
  }

  function camelcasify(str) {
    return str.replace(/-([a-z])/g, function(_, letter) {
      return letter.toUpperCase();
    });
  }

  function dashify(str) {
    return str.replace(/([A-Z])/g, function(_, letter) {
      return '-' + letter.toLowerCase();
    });
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

      } else if(_isJQueryNext(selector)) {

        return selector;

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

    // TODO: extract common functionality for width/height,
    // outerWidth/outerHeight at a later stage when we start modularizing
    // the core functionality.
    // https://github.com/garthenweb/jquery-next/pull/7#issuecomment-56168735
    // TODO: jQuery checks whether the element has box-sizing: border-box
    // and subtracts padding and border if neccessary.
    width: function width(value) {
      if (!_isUndefined(value)) {
        return this.forEach(function(el) {
          el.style.width = _isString(value) ? value : value + 'px';
        }, this);
      }
      return this.elements[0].clientWidth;
    },

    height: function height(value) {
      if (!_isUndefined(value)) {
        return this.forEach(function(el) {
          el.style.height = _isString(value) ? value : value + 'px';
        }, this);
      }
      return this.elements[0].clientHeight;
    },

    outerWidth: function outerWidth(includeMargin) {
      var margin = 0;
      if (!_isUndefined(includeMargin)) {
        var styles = window.getComputedStyle(this.elements[0]);
        var marginLeft = styles['margin-left'];
        var marginRight = styles['margin-right'];
        margin = parseInt(marginLeft, 10) + parseInt(marginRight, 10);
      }
      return this.elements[0].offsetWidth + margin;
    },

    outerHeight: function outerHeight(includeMargin) {
      var margin = 0;
      if (!_isUndefined(includeMargin)) {
        var styles = window.getComputedStyle(this.elements[0]);
        var marginTop = styles['margin-top'];
        var marginBottom = styles['margin-bottom'];
        margin = parseInt(marginTop, 10) + parseInt(marginBottom, 10);
      }
      return this.elements[0].offsetHeight + margin;
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

    },

    text: function text(textStr) {
      if (_isUndefined(textStr)) {
        return this.elements.reduce(function(returnStr, el) {
          return returnStr + el.textContent;
        }, '');
      } else {
        return this.forEach(function(el) {
          el.textContent = textStr;
        });
      }
    },

    is: function is(test) {
      return this.elements.some(function(el, i) {
        if (_isString(test)) {
          return el.matches(test);
        } else if (_isNode(test)) {
          return test === el;
        } else if (_isNodeList(test)) {
          return test.indexOf(el) !== -1;
        } else if (_isJQueryNext(test)) {
          return test.elements.indexOf(el) !== -1;
        } else if (_isFunction(test)) {
          return test.call(this, i, el);
        }
      });
    },

    css: function css(property, value) {
      var propertyName;
      if (_isString(property)) {
        propertyName = camelcasify(property);
        if (_isUndefined(value)) {
          var styles = window.getComputedStyle(this.elements[0]);
          return styles[propertyName];
        } else {
          return this.forEach(function(el) {
            el.style[propertyName] = value;
          });
        }
      } else if (typeof property === 'object') {
        Object.keys(property).forEach(function(prop, i, properties) {
          this.forEach(function(el) {
            el.style[camelcasify(prop)] = property[prop];
          });
        }, this);
        return this;
      }
    },

    before: function before(element) {
      var $element = this.constructor(element);
      this.forEach(function(target) {
        $element.forEach(function(el) {
          target.parentNode.insertBefore(el.cloneNode(true), target);
        });
      });
    },

    after: function after(element) {
      var $element = this.constructor(element);
      this.forEach(function(target) {
        var reference = target.nextElementSibling;
        $element.forEach(function(el) {
          target.parentNode.insertBefore(el.cloneNode(true), reference);
        });
      });
    },

    clone: function clone() {
      return new this.init(this.elements.map(function(el) {
        return el.cloneNode(true);
      }));
    }

  };

  // insert fn as prototype for chaining
  $.fn.init.prototype = $.fn;


  // insert into window object
  window.$next = $;

})(window);
