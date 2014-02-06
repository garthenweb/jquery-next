(function(window, undefined) {

	'use strict';

	var document = window.document;

	var toArray = function(list) {
		return Array.prototype.slice.call(list, 0);
	};

	var toHTML = function(htmlString) {

		var div = document.createElement('div');
		div.innerHTML = htmlString;
		return div.childNodes;

	};

	var $ = function jQueryNext(selector, context) {

		return new $.fn.init(selector, context);

	};

	$.fn = $.prototype = {

		constructor: $,

		init: function(selector, context) {

			var elements,
				dummy,
				index;

			if(!selector) {

				return this;

			} else if(typeof(selector) === 'string') {

				if(selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3) {

					// selector is html string
					// create elements
					elements = toHTML(selector);

				} else {

					this.selector = selector;

					if(!context) {

						context = document;
						elements = context.querySelectorAll(selector);

					} else if(context instanceof window.Node) {

						elements = context.querySelectorAll(selector);

					} else if(context instanceof window.NodeList) {

						elements = [];
						toArray(context).forEach(function(node) {
							if(node instanceof window.Node) {
								elements.push(node.querySelectorAll(selector));
							}
						});

					} else {

						throw 'Context should be instance of Element or a NodeList';

					}

				}

			} else if(selector instanceof Node) {

				elements = [selector];

			} else if(selector instanceof NodeList) {

				elements = selector;

			} else {

				throw 'Selector should be a String, Node or NodeList';

			}

			if(context) {
				this.context = context;
			}

			index = 0;
			// get elements without text nodes and append to object
			this.elements = toArray(elements).filter(function(el) {

				if(el.nodeType === 1) {
					this[index++] = el;
					return true;
				}

				return false;

			}, this);

			this.length = this.elements.length;

			return this;

		},

		get: function(num) {

			return typeof(num) === 'undefined' ? this.elements : this.elements[num];

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

		}

	};

	// insert fn as prototype for chaining
	$.fn.init.prototype = $.fn;


	// insert into window object
	window.$next = $;

})(window);