// prettier-ignore
/* eslint-disable */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.F = {})));
}(this, (function (exports) { 'use strict';

var version = "3.0.1";

var $GET = {};

var api = {
	protocol: "http",
	host: '192.168.2.68',
	tileServer: window.location.hostname,
	path: "",
	port: 1808
}

function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function QueryParse() {
	var _l = 0;
	if (location.href.split('?')[1] !== undefined) {
		location.href.split('?')[1].replace('#', '').split("&").forEach(function(value){
			_l++;
			var item = value.split("=");
			$GET[item[0]] = item[1];
		});
	}

	$GET.length = _l;
}

function errorPage() {
	// window.location.href = "./error.html";
}

function ready(func) {
	QueryParse();

	if (!inIframe())
		errorPage();

	if ($GET['token'] === undefined)
		errorPage();

	localStorage.setItem('token', $GET['token']);
	
	document.addEventListener('DOMContentLoaded', e => {
		func(e)
	});
}

function extend(dest) {
	var i, j, len, src;

	for (j = 1, len = arguments.length; j < len; j++) {
		src = arguments[j];
		for (i in src) {
			dest[i] = src[i];
		}
	}
	return dest;
}

var create = Object.create || (function () {
	function D() {}
	return function (proto) {
		D.prototype = proto;
		return new D();
	};
})();

function trim(str) {
	return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

function splitWords(str) {
	return trim(str).split(/\s+/);
}

function setOptions(obj, options) {
	if (!obj.hasOwnProperty('options')) {
		obj.options = obj.options ? create(obj.options) : {};
    }
    
	for (var i in options) {
		obj.options[i] = options[i];
    }

    return obj.options;
}

function template(str, data) {
	return str.replace(templateRe, function (str, key) {
		var value = data[key];

		if (value === undefined) {
			throw new Error('No value provided for variable ' + str);

		} else if (typeof value === 'function') {
			value = value(data);
		}
		return value;
	});
}

var isArray = Array.isArray || function (obj) {
	return (Object.prototype.toString.call(obj) === '[object Array]');
};

var isObject = function(obj) {
	return (Object.prototype.toString.call(obj) === '[object Object]');
}

var forEach = function(collection, callback, scope) {
	if (collection === undefined || collection === null) return undefined;

	if (isObject(collection)) {
		for (var prop in collection) {
			if (Object.prototype.hasOwnProperty.call(collection, prop)) {
				callback.call(scope, prop, collection[prop]);
			}
		}
	} else {
		for (var i = 0, len = collection.length; i < len; i++) {
			callback.call(scope, i, collection[i]);
		}
	}
}

function indexOf(array, el) {
	if (array === undefined)
		return undefined

	if (isObject(array)) {
		var i = 0;
		for (var key in array) {
			if (key === el) return i;
			i++;
		}
	} else {
		for (var i = 0; i < array.length; i++) {
			if (isObject(array[i])) {
				if (array[i].name === el) 
					return i;
			}

			if (array[i] === el) { return i; }
		}
	}
	return -1;
}

function json2css(obj) {
	var style = '';
	for (var key in obj) {
		if (typeof obj[key] === 'number')
			obj[key] = `${obj[key]}px`;

		if (style !== '') style += ' ';

		style += `${key}: ${obj[key]};`;
	}

	return style;
}

function toText(value) {
	return value.replace(/(<([^>]+)>)/ig, '');
}

function hex2rgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : 'rgb(0, 0, 0)';
}

// @function remove(el: HTMLElement)
// Removes `el` from its parent element
function remove(el) {
	var parent = el.parentNode;
	if (parent) {
		parent.removeChild(el);
	}
}

// @function empty(el: HTMLElement)
// Removes all of `el`'s children elements from `el`
function empty(el) {
	while (el.firstChild) {
		el.removeChild(el.firstChild);
	}
}

// @property lastId: Number
// Last unique ID used by [`stamp()`](#util-stamp)
var lastId = 0;

// @function stamp(obj: Object): Number
// Returns the unique ID of an object, assigning it one if it doesn't have it.
function stamp(obj) {
	/*eslint-disable */
	obj._fizmasoft_id = obj._fizmasoft_id || ++lastId;
	return obj._fizmasoft_id;
	/* eslint-enable */
}


// prettier-ignore
/* eslint-disable */
function falseFn() { return false; }
// @property passiveEvents: Boolean
// `true` for browsers that support passive events.
var passiveEvents = (function () {
	var supportsPassiveOption = false;
	try {
		var opts = Object.defineProperty({}, 'passive', {
			get: function () {
				supportsPassiveOption = true;
			}
		});
		window.addEventListener('testPassiveEventSupport', falseFn, opts);
		window.removeEventListener('testPassiveEventSupport', falseFn, opts);
	} catch (e) {
		// Errors can safely be ignored since this is only a browser support test.
	}
	return supportsPassiveOption;
});

var Util = (Object)({
	isArray: isArray,
	isObject: isObject,
	each: forEach,
	indexOf: indexOf,
	json2css: json2css,
	stamp: stamp,
	hex2rgb: hex2rgb,
	toText: toText,
	errorPage: errorPage,
	$GET: $GET
});

var FS = typeof fMedia === 'object';

var Browser = (Object.freeze || Object)({
	FS: FS
});

// @class Class
// @aka L.Class

// @section
// @uninheritable

// Thanks to John Resig and Dean Edwards for inspiration!


function Class() {}

Class.extend = function (props) {

    // @function extend(props: Object): Function
	// [Extends the current class](#class-inheritance) given the properties to be included.
	// Returns a Javascript function that is a class constructor (to be called with `new`).
	var NewClass = function () {

		// call the constructor
		if (this.initialize) {
			this.initialize.apply(this, arguments);
		}

		// call all constructor hooks
		this.callInitHooks();
    };
    
    var parentProto = NewClass.__super__ = this.prototype;

	var proto = create(parentProto);
	proto.constructor = NewClass;

	NewClass.prototype = proto;

	// inherit parent's statics
	for (var i in this) {
		if (this.hasOwnProperty(i) && i !== 'prototype' && i !== '__super__') {
			NewClass[i] = this[i];
		}
    }
    
    // merge options
	if (proto.options) {
		props.options = extend(create(proto.options), props.options);
    }
    
	// mix given properties into the prototype
	extend(proto, props);

	proto._initHooks = [];

	// add method for calling all hooks
	proto.callInitHooks = function () {

		if (this._initHooksCalled) { return; }

		if (parentProto.callInitHooks) {
			parentProto.callInitHooks.call(this);
		}

		this._initHooksCalled = true;

		for (var i = 0, len = proto._initHooks.length; i < len; i++) {
			proto._initHooks[i].call(this);
		}
	};

	return NewClass;
}


// @function include(properties: Object): this
// [Includes a mixin](#class-includes) into the current class.
Class.include = function (props) {
	extend(this.prototype, props);
	return this;
};

// @function mergeOptions(options: Object): this
// [Merges `options`](#class-options) into the defaults of the class.
Class.mergeOptions = function (options) {
	extend(this.prototype.options, options);
	return this;
};

// @function addInitHook(fn: Function): this
// Adds a [constructor hook](#class-constructor-hooks) to the class.
Class.addInitHook = function (fn) { // (Function) || (String, args...)
	var args = Array.prototype.slice.call(arguments, 1);

	var init = typeof fn === 'function' ? fn : function () {
		this[fn].apply(this, args);
	};

	this.prototype._initHooks = this.prototype._initHooks || [];
	this.prototype._initHooks.push(init);
	return this;
};

// @function on(el: HTMLElement, types: String, fn: Function, context?: Object): this
// Adds a listener function (`fn`) to a particular DOM event type of the
// element `el`. You can optionally specify the context of the listener
// (object the `this` keyword will point to). You can also pass several
// space-separated types (e.g. `'click dblclick'`).

// @alternative
// @function on(el: HTMLElement, eventMap: Object, context?: Object): this
// Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
function on(obj, types, fn, context) {

	if (typeof types === 'object') {
		for (var type in types) {
			addOne(obj, type, types[type], fn);
		}
	} else {
		types = splitWords(types);
		
		for (var i = 0, len = types.length; i < len; i++) {
			addOne(obj, types[i], fn, context);
		}
	}

	return this;
}

var eventsKey = '_fizmasoft_events';

// @function off(el: HTMLElement, types: String, fn: Function, context?: Object): this
// Removes a previously added listener function.
// Note that if you passed a custom context to on, you must pass the same
// context to `off` in order to remove the listener.

// @alternative
// @function off(el: HTMLElement, eventMap: Object, context?: Object): this
// Removes a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
function off(obj, types, fn, context) {

	if (typeof types === 'object') {
		for (var type in types) {
			removeOne(obj, type, types[type], fn);
		}
	} else if (types) {
		types = splitWords(types);

		for (var i = 0, len = types.length; i < len; i++) {
			removeOne(obj, types[i], fn, context);
		}
	} else {
		for (var j in obj[eventsKey]) {
			removeOne(obj, j, obj[eventsKey][j]);
		}
		delete obj[eventsKey];
	}

	return this;
}

function addOne(obj, type, fn, context) {
	var id = type + stamp(fn) + (context ? '_' + stamp(context) : '');

	if (obj[eventsKey] && obj[eventsKey][id]) { return this; }

	var handler = function (e) {
		return fn.call(context || obj, e || window.event);
	};

	var originalHandler = handler;

	if ('addEventListener' in obj) {

		if (type === 'mousewheel') {
			obj.addEventListener('onwheel' in obj ? 'wheel' : 'mousewheel', handler, passiveEvents ? {passive: false} : false);

		} else if ((type === 'mouseenter') || (type === 'mouseleave')) {
			handler = function (e) {
				e = e || window.event;
				if (isExternalTarget(obj, e)) {
					originalHandler(e);
				}
			};
			obj.addEventListener(type === 'mouseenter' ? 'mouseover' : 'mouseout', handler, false);

		} else {
			obj.addEventListener(type, handler, false);
		}

	} else if ('attachEvent' in obj) {
		obj.attachEvent('on' + type, handler);
	}

	obj[eventsKey] = obj[eventsKey] || {};
	obj[eventsKey][id] = handler;
}

function removeOne(obj, type, fn, context) {
	var id = type + stamp(fn) + (context ? '_' + stamp(context) : ''),
	    handler = obj[eventsKey] && obj[eventsKey][id];

	if (!handler) { return this; }

	if ('removeEventListener' in obj) {

		if (type === 'mousewheel') {
			obj.removeEventListener('onwheel' in obj ? 'wheel' : 'mousewheel', handler, passiveEvents ? {passive: false} : false);

		} else {
			obj.removeEventListener(
				type === 'mouseenter' ? 'mouseover' :
				type === 'mouseleave' ? 'mouseout' : type, handler, false);
		}

	} else if ('detachEvent' in obj) {
		obj.detachEvent('on' + type, handler);
	}

	obj[eventsKey][id] = null;
}

// @function preventDefault(ev: DOMEvent): this
// Prevents the default action of the DOM Event `ev` from happening (such as
// following a link in the href of the a element, or doing a POST request
// with page reload when a `<form>` is submitted).
// Use it inside listener functions.
function preventDefault(e) {
	if (e.preventDefault) {
		e.preventDefault();
	} else {
		e.returnValue = false;
	}
	return this;
}


var DomEvent = (Object)({
    on: on,
    off: off,
    preventDefault: preventDefault,
    addListener: on,
	removeListener: off
});

var DomUtil = (Object)({
    get: function(id) {
        return typeof id === 'string' ? document.getElementById(id) : id;
    },
	
	find: function(parentId, childId) {
		var _parent = this.get(parentId);
		return _parent.querySelector(`[id="${childId}"]`);
	},
	
    create: function(tagName, className, container) {
		var el = document.createElement(tagName);
		
		if (className !== undefined)
			el.className = className;
    
        if (container) {
            container.appendChild(el);
        }
        return el;
    },
    
    remove: function(el) {
        var parent = el.parentNode;
        if (parent) {
            parent.removeChild(el);
        }
    },
    
    empty: function(el) {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    },
    
    hasClass: function(el, name) {
        if (el.classList !== undefined) {
            return el.classList.contains(name);
        }
        var className = getClass(el);
        return className.length > 0 && new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
    },
    
    addClass: function(el, name) {
        if (el.classList !== undefined) {
            var classes = splitWords(name);
            for (var i = 0, len = classes.length; i < len; i++) {
                el.classList.add(classes[i]);
            }
        } else if (!hasClass(el, name)) {
            var className = getClass(el);
            setClass(el, (className ? className + ' ' : '') + name);
        }
    },
    
    removeClass: function(el, name) {
        if (el.classList !== undefined) {
            el.classList.remove(name);
        } else {
            setClass(el, trim((' ' + getClass(el) + ' ').replace(' ' + name + ' ', ' ')));
        }
    },
    
    setClass: function(el, name) {
        if (el.className.baseVal === undefined) {
            el.className = name;
        } else {
            // in case of SVG element
            el.className.baseVal = name;
        }
    },

    getClass: function(el) {
        if (el.correspondingElement) {
            el = el.correspondingElement;
        }
        return el.className.baseVal === undefined ? el.className : el.className.baseVal;
    }
});

var Control = Class.extend({
	options: {

	},

	initialize: function (options) {
		setOptions(this, options);
	},

	getContainer: function () {
		return this._container;
	},

	addTo: function (parent) {
		this._parent = parent;

        var container = this._container = this.onAdd();
        
        if (typeof container === 'object') {
            this._parent.appendChild(container);
        } else if (typeof container === 'string') {
            this._parent.innerHTML = container;
        }

		return this;
	},

	remove: function() {
		if (!this._parent) {
			return this;
		}

        parent.removeChild(this._container);

		if (this.onRemove) {
			this.onRemove(this._map);
		}

        this._parent = null;

		return this;
	}
});

var control = function (options) {
	return new Control(options);
};

exports.Util = Util;
exports.DomEvent = DomEvent;
exports.DomUtil = DomUtil;
exports.Control = Control;
exports.control = control;
exports.version = version;
exports.api = api;
exports.Class = Class;
exports.setOptions = setOptions;
exports.ready = ready;
exports.Browser = Browser;

window.F = exports;
})));
