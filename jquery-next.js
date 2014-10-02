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
    var str = Object.prototype.toString.call(obj);
    return str === '[object global]' ||
           str === '[object DOMWindow]' ||
           str === '[object Window]';
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

  function _camelcasify(str) {
    return str.replace(/-([a-z])/g, function(_, letter) {
      return letter.toUpperCase();
    });
  }

  var _eventMappings = new WeakMap();

  var $ = function jQueryNext(selector, context) {
    return new $.fn.init(selector, context);
  };

  $.fn = $.prototype = {

    constructor: $,

    init: function init(selector, context) {

      var elements,
          index;

      if (!selector) {

        this.elements = [];
        this.length = this.elements.length;

        return this;

      } else if (_isString(selector)) {

        var isHTMLString = selector.charAt(0) === '<' &&
                           selector.charAt( selector.length - 1 ) === '>' &&
                           selector.length >= 3;

        if (isHTMLString) {

          // selector is html string
          // create elements
          elements = _toHTML(selector);

        } else {

          this.selector = selector;

          // set document as default context
          if (!context) {
            context = document;
          }

          if (_isNode(context)) {

            elements = context.querySelectorAll(selector);

          } else if (_isNodeList(context) || _isArray(context)) {

            elements = [];
            _toArray(context).forEach(function(node) {
              if (_isNode(node)) {
                // find all nodes by querySelectorAll
                // and push each into the elements array
                _toArray(node.querySelectorAll(selector)).forEach(function(el) {
                  elements.push(el);
                });
              }
            });

          } else {

            throw new TypeError('Context should be a node or a list of nodes');

          }

        }

      } else if (_isNode(selector) || _isGlobal(selector)) {

        // set document as default context
        if (!context) {
          context = document;
        }

        elements = [selector];

      } else if (_isNodeList(selector) || _isArray(selector)) {

        elements = selector;

      } else if (_isJQueryNext(selector)) {

        return selector;

      } else {

        throw new TypeError('Selector should be a string, node or a list of nodes');

      }

      if (context) {
        this.context = context;
      }

      index = 0;
      // get elements without text nodes and append to object
      // also convert elements into an array and save as elements on this
      this.elements = _toArray(elements).filter(function(el, key, elements) {

        var firstOfType      = elements.indexOf(el) === key;
        var isAcceptedObject = (
          _isElementNode(el) ||
          _isDocumentNode(el) ||
          _isGlobal(el)
        );
        // filter duplicated elements and not accepted objects
        if (!firstOfType || !isAcceptedObject) {
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

      return this.constructor(group);
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

      if (value === false) {
        // remove attribute if value is false
        return this.removeAttr(attribute);
      } else if (value === true) {
        // set value to attribute name if value is true
        value = attribute;
      }

      if (!value) {
        // return attribute value of first element
        if (this.elements[0]) {
          return this.elements[0].getAttribute(attribute);
        }
        return;
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

      if (!value) {
        // return attribute value of first element
        if (this.elements[0]) {
          return this.elements[0].dataset[key];
        }
        return;
      }

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

      if (_isUndefined(value)) {
        if (this.elements[0]) {
          return this.elements[0].clientWidth;
        }
        return;
      }

      return this.forEach(function(el) {
        el.style.width = _isString(value) ? value : value + 'px';
      }, this);

    },

    height: function height(value) {

      if (_isUndefined(value)) {
        if (this.elements[0]) {
          return this.elements[0].clientHeight;
        }
        return;
      }

      return this.forEach(function(el) {
        el.style.height = _isString(value) ? value : value + 'px';
      }, this);

    },

    outerWidth: function outerWidth(includeMargin) {

      var margin = 0;
      if (!this.elements[0]) {
        return;
      }

      if (!_isUndefined(includeMargin)) {
        var styles      = window.getComputedStyle(this.elements[0]);
        var marginLeft  = styles.getPropertyValue('margin-left');
        var marginRight = styles.getPropertyValue('margin-right');

        margin += parseInt(marginLeft, 10)
        margin += parseInt(marginRight, 10);
      }

      return this.elements[0].offsetWidth + margin;
    },

    outerHeight: function outerHeight(includeMargin) {

      var margin = 0;
      if (!this.elements[0]) {
        return;
      }

      if (!_isUndefined(includeMargin)) {
        var styles       = window.getComputedStyle(this.elements[0]);
        var marginTop    = styles.getPropertyValue('margin-top');
        var marginBottom = styles.getPropertyValue('margin-bottom');

        margin += parseInt(marginTop, 10);
        margin += parseInt(marginBottom, 10);
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
        if (parent) {
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

      if (_isUndefined(htmlString)) {
        if (this.elements[0]) {
          return this.elements[0].innerHTML;
        }
        return;
      }

      if (_isString(htmlString)) {
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
      }

      return this.forEach(function(el) {
        el.textContent = textStr;
      });

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

        throw new TypeError('Type of `test` is not supported');

      });

    },

    css: function css(property, value) {
      var propertyName;

      if (_isString(property)) {
        propertyName = _camelcasify(property);

        if (_isUndefined(value)) {
          // return style from first element
          var styles = window.getComputedStyle(this.elements[0]);
          return styles.getPropertyValue(propertyName);
        }

        return this.forEach(function(el) {
          el.style[propertyName] = value;
        });

      } else if (typeof property === 'object') {
        Object.keys(property).forEach(function(prop) {
          this.forEach(function(el) {
            var name = _camelcasify(prop);
            el.style[name] = property[prop];
          });
        }, this);
        return this;
      }

    },

    clone: function clone() {

      return this.constructor(this.elements.map(function(el) {
        return el.cloneNode(true);
      }));

    },

    before: function before(element) {

      var $element = this.constructor(element);

      return this.forEach(function(target) {
        var parent = target.parentNode;

        $element.forEach(function(el) {
          parent.insertBefore(el.cloneNode(true), target);
        });

      });

    },

    append: function append(element) {

      var $element = this.constructor(element);

      return this.forEach(function(target) {
        $element.forEach(function(el) {
          target.appendChild(el.cloneNode(true));
        });
      });

    },

    after: function after(element) {

      var $element = this.constructor(element);

      return this.forEach(function(target) {
        var reference = target.nextElementSibling;
        var parent    = target.parentNode;

        $element.forEach(function(el) {
          parent.insertBefore(el.cloneNode(true), reference);
        });

      });

    },

    prepend: function prepend(element) {

      var $element = this.constructor(element);

      return this.forEach(function(target) {
        var reference = target.firstElementChild;

        $element.forEach(function(el) {
          target.insertBefore(el.cloneNode(true), reference);
        });

      });
    },

    on: function on(events, selector, data, handler) {
      // events can a a space separated list of events (including namespaces)
      // or an object, whose keys are the event names (including namespaces)
      // and the properties are handler functions.
      var _events = [];
      if (_isString(events)) {
        _events = events.split(' ');
      } else if (typeof events === 'object') {
        _events = Object.keys(events);
      }
      // the following lines are used to shuffle the arguments around
      // because some of them are optional
      if (_isFunction(data)) {
        handler = data;
        data = undefined;
      } else if (_isFunction(selector)) {
        handler = selector;
        selector = undefined;
      }
      if (typeof selector === 'object') {
        data = selector;
        selector = undefined;
      }

      // register each event on each element in the matched set.
      return this.forEach(function(el) {
        // _events is an array of event names and namespaces, separated by a dot
        _events.forEach(function(event) {
          var _event = event.split('.');
          var _handler = typeof events === 'object' ? events[event] : handler;
          var boundfn = null;

          // boundfn is the actual function that get's passed
          // to el.addEventListener.
          if (selector) {
            boundfn = function(e) {
              if (!e.target.matches(selector)) { return; }
              e.data = data;
              _handler.call(el, e);
            };
          } else {
            boundfn = function(e) {
              e.data = data;
              _handler.call(el, e);
            };
          }

          if (!_eventMappings.has(el)) { _eventMappings.set(el, []); }

          // mappings are used for deregistering events.
          // each element has it's own mapping, which is an array of events.
          // _event[0] contains the event name
          // _event[1] contains the namespace
          // handler is the function, which the user provided to $next.on()
          // boundfn is the function which is actually being used in
          // el.addEventListener
          _eventMappings.get(el).push({
            type: _event[0],
            namespace: _event[1],
            selector: selector,
            handler: _handler,
            boundfn: boundfn
          });

          el.addEventListener(_event[0], boundfn, false);
        }, this);
      }, this);
    },

    off: function off(events, selector, handler) {
      // make sure _events is an array of eventnames and namespaces
      var _events = [];
      if (_isString(events)) {
        _events = events.split(' ');
      } else if (typeof events === 'object') {
        _events = Object.keys(events);
      }

      // shuffle optional arguments
      if (_isFunction(selector)) {
        handler = selector;
        selector = undefined;
      }

      function testSelector(map) {
        var isEqual     = selector === map.selector;
        var isWildCard  = selector === '**';
        var isUndefined = _isUndefined(selector);

        return isEqual || isWildCard || isUndefined;
      }

      function testHandler(map) {
        var isEqual     = handler === map.handler;
        var isUndefined = _isUndefined(handler);

        return isEqual || isUndefined;
      }

      function testIdentifier(map) {
        var namespaceIdentifier = map.namespace ? '.' + map.namespace : '';
        var fullIdentifier      = map.type + namespaceIdentifier;
        var namespaceMatch      = _events.indexOf(namespaceIdentifier) !== -1;
        var fullMatch           = _events.indexOf(fullIdentifier) !== -1;

        return namespaceMatch || fullMatch || _events.length === 0;
      }

      this.elements.filter(function hasListeners(el) {
        // we only care about elements which have events associated with them
        return _eventMappings.has(el);
      }).forEach(function removeListener(el) {
        // get all event mappings from weakmap
        var mappings = _eventMappings.get(el);

        // use a for-loop to be able to modify mappings array inside the loop
        for (var i = 0; i < mappings.length; i++) {
          var map = mappings[i];
          // remove all event handlers which handlers/selectors/names matches
          // the given arguments / are wildcard / are not provided as arguments
          if (testSelector(map) && testHandler(map) && testIdentifier(map)) {
            // remove listener from DOM
            el.removeEventListener(map.type, map.boundfn, false);
            // remove listener from event map
            mappings.splice(i--, 1);
          }
        }

        if (mappings.length === 0) { _eventMappings.delete(el); }
      });

      return this;
    },

    once: function once(events, selector, data, handler) {
      var self = this;

      // optional arguments...
      if (_isFunction(data)) {
        handler = data;
        data = undefined;
      } else if (_isFunction(selector)) {
        handler = selector;
        selector = undefined;
      }

      // use self because the event handler is called in the context of
      // the element.
      return this.on(events, selector, data, function _handler(e) {
        self.off(events, selector, data, _handler);
        handler.call(this, e);
      });
    },

    one: function one(events, selector, data, handler) {
      console.warn('Please use $next.once() instead of $next.one().');
      return this.once(events, selector, data, handler);
    }

  };

  // insert fn as prototype for chaining
  $.fn.init.prototype = $.fn;


  // insert into window object
  window.$next = $;

})(window);
