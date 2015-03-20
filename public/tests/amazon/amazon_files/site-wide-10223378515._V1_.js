/* begin merged-core-js-1.6.4/core.js */
/* begin jQuery-1.6.4/jquery.js */
(function() {
    var initJQuery = function() {
        /*!
         * jQuery JavaScript Library v1.6.4
         * http://jquery.com/
         *
         * Copyright 2011, John Resig
         * Dual licensed under the MIT or GPL Version 2 licenses.
         * http://jquery.org/license
         *
         * Includes Sizzle.js
         * http://sizzlejs.com/
         * Copyright 2011, The Dojo Foundation
         * Released under the MIT, BSD, and GPL Licenses.
         *
         * Amazon elects to use jQuery and Sizzle under the MIT license.
         *
         * Date: Mon Sep 12 18:54:48 2011 -0400
         */
        (function(window, undefined) {
            var document = window.document,
                navigator = window.navigator,
                location = window.location;
            var jQuery = (function() {
                var jQuery = function(selector, context) {
                        return new jQuery.fn.init(selector, context, rootjQuery);
                    },
                    _jQuery = window.jQuery,
                    _$ = window.$,
                    rootjQuery, quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
                    rnotwhite = /\S/,
                    trimLeft = /^\s+/,
                    trimRight = /\s+$/,
                    rdigit = /\d/,
                    rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
                    rvalidchars = /^[\],:{}\s]*$/,
                    rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                    rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                    rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
                    rwebkit = /(webkit)[ \/]([\w.]+)/,
                    ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                    rmsie = /(msie) ([\w.]+)/,
                    rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,
                    rdashAlpha = /-([a-z]|[0-9])/ig,
                    rmsPrefix = /^-ms-/,
                    fcamelCase = function(all, letter) {
                        return (letter + "")
                            .toUpperCase();
                    },
                    userAgent = navigator.userAgent,
                    browserMatch, readyList, DOMContentLoaded, toString = Object.prototype.toString,
                    hasOwn = Object.prototype.hasOwnProperty,
                    push = Array.prototype.push,
                    slice = Array.prototype.slice,
                    trim = String.prototype.trim,
                    indexOf = Array.prototype.indexOf,
                    class2type = {};
                jQuery.fn = jQuery.prototype = {
                    constructor: jQuery,
                    init: function(selector, context, rootjQuery) {
                        var match, elem, ret, doc;
                        if (!selector) {
                            return this;
                        }
                        if (selector.nodeType) {
                            this.context = this[0] = selector;
                            this.length = 1;
                            return this;
                        }
                        if (selector === "body" && !context && document.body) {
                            this.context = document;
                            this[0] = document.body;
                            this.selector = selector;
                            this.length = 1;
                            return this;
                        }
                        if (typeof selector === "string") {
                            if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
                                match = [null, selector, null];
                            } else {
                                match = quickExpr.exec(selector);
                            }
                            if (match && (match[1] || !context)) {
                                if (match[1]) {
                                    context = context instanceof jQuery ? context[0] : context;
                                    doc = (context ? context.ownerDocument || context : document);
                                    ret = rsingleTag.exec(selector);
                                    if (ret) {
                                        if (jQuery.isPlainObject(context)) {
                                            selector = [document.createElement(ret[1])];
                                            jQuery.fn.attr.call(selector, context, true);
                                        } else {
                                            selector = [doc.createElement(ret[1])];
                                        }
                                    } else {
                                        ret = jQuery.buildFragment([match[1]], [doc]);
                                        selector = (ret.cacheable ? jQuery.clone(ret.fragment) : ret.fragment)
                                            .childNodes;
                                    }
                                    return jQuery.merge(this, selector);
                                } else {
                                    elem = document.getElementById(match[2]);
                                    if (elem && elem.parentNode) {
                                        if (elem.id !== match[2]) {
                                            return rootjQuery.find(selector);
                                        }
                                        this.length = 1;
                                        this[0] = elem;
                                    }
                                    this.context = document;
                                    this.selector = selector;
                                    return this;
                                }
                            } else {
                                if (!context || context.jquery) {
                                    return (context || rootjQuery)
                                        .find(selector);
                                } else {
                                    return this.constructor(context)
                                        .find(selector);
                                }
                            }
                        } else {
                            if (jQuery.isFunction(selector)) {
                                return rootjQuery.ready(selector);
                            }
                        }
                        if (selector.selector !== undefined) {
                            this.selector = selector.selector;
                            this.context = selector.context;
                        }
                        return jQuery.makeArray(selector, this);
                    },
                    selector: "",
                    jquery: "1.6.4",
                    length: 0,
                    size: function() {
                        return this.length;
                    },
                    toArray: function() {
                        return slice.call(this, 0);
                    },
                    get: function(num) {
                        return num == null ? this.toArray() : (num < 0 ? this[this.length + num] : this[num]);
                    },
                    pushStack: function(elems, name, selector) {
                        var ret = this.constructor();
                        if (jQuery.isArray(elems)) {
                            push.apply(ret, elems);
                        } else {
                            jQuery.merge(ret, elems);
                        }
                        ret.prevObject = this;
                        ret.context = this.context;
                        if (name === "find") {
                            ret.selector = this.selector + (this.selector ? " " : "") + selector;
                        } else {
                            if (name) {
                                ret.selector = this.selector + "." + name + "(" + selector + ")";
                            }
                        }
                        return ret;
                    },
                    each: function(callback, args) {
                        return jQuery.each(this, callback, args);
                    },
                    ready: function(fn) {
                        jQuery.bindReady();
                        readyList.done(fn);
                        return this;
                    },
                    eq: function(i) {
                        return i === -1 ? this.slice(i) : this.slice(i, +i + 1);
                    },
                    first: function() {
                        return this.eq(0);
                    },
                    last: function() {
                        return this.eq(-1);
                    },
                    slice: function() {
                        return this.pushStack(slice.apply(this, arguments), "slice", slice.call(arguments)
                            .join(","));
                    },
                    map: function(callback) {
                        return this.pushStack(jQuery.map(this, function(elem, i) {
                            return callback.call(elem, i, elem);
                        }));
                    },
                    end: function() {
                        return this.prevObject || this.constructor(null);
                    },
                    push: push,
                    sort: [].sort,
                    splice: [].splice
                };
                jQuery.fn.init.prototype = jQuery.fn;
                jQuery.extend = jQuery.fn.extend = function() {
                    var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
                        i = 1,
                        length = arguments.length,
                        deep = false;
                    if (typeof target === "boolean") {
                        deep = target;
                        target = arguments[1] || {};
                        i = 2;
                    }
                    if (typeof target !== "object" && !jQuery.isFunction(target)) {
                        target = {};
                    }
                    if (length === i) {
                        target = this;
                        --i;
                    }
                    for (; i < length; i++) {
                        if ((options = arguments[i]) != null) {
                            for (name in options) {
                                src = target[name];
                                copy = options[name];
                                if (target === copy) {
                                    continue;
                                }
                                if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                                    if (copyIsArray) {
                                        copyIsArray = false;
                                        clone = src && jQuery.isArray(src) ? src : [];
                                    } else {
                                        clone = src && jQuery.isPlainObject(src) ? src : {};
                                    }
                                    target[name] = jQuery.extend(deep, clone, copy);
                                } else {
                                    if (copy !== undefined) {
                                        target[name] = copy;
                                    }
                                }
                            }
                        }
                    }
                    return target;
                };
                jQuery.extend({
                    noConflict: function(deep) {
                        if (window.$ === jQuery) {
                            window.$ = _$;
                        }
                        if (deep && window.jQuery === jQuery) {
                            window.jQuery = _jQuery;
                        }
                        return jQuery;
                    },
                    isReady: false,
                    readyWait: 1,
                    holdReady: function(hold) {
                        if (hold) {
                            jQuery.readyWait++;
                        } else {
                            jQuery.ready(true);
                        }
                    },
                    ready: function(wait) {
                        if ((wait === true && !--jQuery.readyWait) || (wait !== true && !jQuery.isReady)) {
                            if (!document.body) {
                                return setTimeout(jQuery.ready, 1);
                            }
                            jQuery.isReady = true;
                            if (wait !== true && --jQuery.readyWait > 0) {
                                return;
                            }
                            readyList.resolveWith(document, [jQuery]);
                            if (jQuery.fn.trigger) {
                                jQuery(document)
                                    .trigger("ready")
                                    .unbind("ready");
                            }
                        }
                    },
                    bindReady: function() {
                        if (readyList) {
                            return;
                        }
                        readyList = jQuery._Deferred();
                        if (document.readyState === "complete") {
                            return setTimeout(jQuery.ready, 1);
                        }
                        if (document.addEventListener) {
                            document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
                            window.addEventListener("load", jQuery.ready, false);
                        } else {
                            if (document.attachEvent) {
                                document.attachEvent("onreadystatechange", DOMContentLoaded);
                                window.attachEvent("onload", jQuery.ready);
                                var toplevel = false;
                                try {
                                    toplevel = window.frameElement == null;
                                } catch (e) {}
                                if (document.documentElement.doScroll && toplevel) {
                                    doScrollCheck();
                                }
                            }
                        }
                    },
                    isFunction: function(obj) {
                        return jQuery.type(obj) === "function";
                    },
                    isArray: Array.isArray || function(obj) {
                        return jQuery.type(obj) === "array";
                    },
                    isWindow: function(obj) {
                        return obj && typeof obj === "object" && "setInterval" in obj;
                    },
                    isNaN: function(obj) {
                        return obj == null || !rdigit.test(obj) || isNaN(obj);
                    },
                    type: function(obj) {
                        return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
                    },
                    isPlainObject: function(obj) {
                        if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                            return false;
                        }
                        try {
                            if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                                return false;
                            }
                        } catch (e) {
                            return false;
                        }
                        var key;
                        for (key in obj) {}
                        return key === undefined || hasOwn.call(obj, key);
                    },
                    isEmptyObject: function(obj) {
                        for (var name in obj) {
                            return false;
                        }
                        return true;
                    },
                    error: function(msg) {
                        throw msg;
                    },
                    parseJSON: function(data) {
                        if (typeof data !== "string" || !data) {
                            return null;
                        }
                        data = jQuery.trim(data);
                        if (window.JSON && window.JSON.parse) {
                            return window.JSON.parse(data);
                        }
                        if (rvalidchars.test(data.replace(rvalidescape, "@")
                                .replace(rvalidtokens, "]")
                                .replace(rvalidbraces, ""))) {
                            return (new Function("return " + data))();
                        }
                        jQuery.error("Invalid JSON: " + data);
                    },
                    parseXML: function(data) {
                        var xml, tmp;
                        try {
                            if (window.DOMParser) {
                                tmp = new DOMParser();
                                xml = tmp.parseFromString(data, "text/xml");
                            } else {
                                xml = new ActiveXObject("Microsoft.XMLDOM");
                                xml.async = "false";
                                xml.loadXML(data);
                            }
                        } catch (e) {
                            xml = undefined;
                        }
                        if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror")
                            .length) {
                            jQuery.error("Invalid XML: " + data);
                        }
                        return xml;
                    },
                    noop: function() {},
                    globalEval: function(data) {
                        if (data && rnotwhite.test(data)) {
                            (window.execScript || function(data) {
                                window["eval"].call(window, data);
                            })(data);
                        }
                    },
                    camelCase: function(string) {
                        return string.replace(rmsPrefix, "ms-")
                            .replace(rdashAlpha, fcamelCase);
                    },
                    nodeName: function(elem, name) {
                        return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
                    },
                    each: function(object, callback, args) {
                        var name, i = 0,
                            length = object.length,
                            isObj = length === undefined || jQuery.isFunction(object);
                        if (args) {
                            if (isObj) {
                                for (name in object) {
                                    if (callback.apply(object[name], args) === false) {
                                        break;
                                    }
                                }
                            } else {
                                for (; i < length;) {
                                    if (callback.apply(object[i++], args) === false) {
                                        break;
                                    }
                                }
                            }
                        } else {
                            if (isObj) {
                                for (name in object) {
                                    if (callback.call(object[name], name, object[name]) === false) {
                                        break;
                                    }
                                }
                            } else {
                                for (; i < length;) {
                                    if (callback.call(object[i], i, object[i++]) === false) {
                                        break;
                                    }
                                }
                            }
                        }
                        return object;
                    },
                    trim: trim ? function(text) {
                        return text == null ? "" : trim.call(text);
                    } : function(text) {
                        return text == null ? "" : text.toString()
                            .replace(trimLeft, "")
                            .replace(trimRight, "");
                    },
                    makeArray: function(array, results) {
                        var ret = results || [];
                        if (array != null) {
                            var type = jQuery.type(array);
                            if (array.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow(array)) {
                                push.call(ret, array);
                            } else {
                                jQuery.merge(ret, array);
                            }
                        }
                        return ret;
                    },
                    inArray: function(elem, array) {
                        if (!array) {
                            return -1;
                        }
                        if (indexOf) {
                            return indexOf.call(array, elem);
                        }
                        for (var i = 0, length = array.length; i < length; i++) {
                            if (array[i] === elem) {
                                return i;
                            }
                        }
                        return -1;
                    },
                    merge: function(first, second) {
                        var i = first.length,
                            j = 0;
                        if (typeof second.length === "number") {
                            for (var l = second.length; j < l; j++) {
                                first[i++] = second[j];
                            }
                        } else {
                            while (second[j] !== undefined) {
                                first[i++] = second[j++];
                            }
                        }
                        first.length = i;
                        return first;
                    },
                    grep: function(elems, callback, inv) {
                        var ret = [],
                            retVal;
                        inv = !!inv;
                        for (var i = 0, length = elems.length; i < length; i++) {
                            retVal = !!callback(elems[i], i);
                            if (inv !== retVal) {
                                ret.push(elems[i]);
                            }
                        }
                        return ret;
                    },
                    map: function(elems, callback, arg) {
                        var value, key, ret = [],
                            i = 0,
                            length = elems.length,
                            isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ((length > 0 && elems[0] && elems[length - 1]) || length === 0 || jQuery.isArray(elems));
                        if (isArray) {
                            for (; i < length; i++) {
                                value = callback(elems[i], i, arg);
                                if (value != null) {
                                    ret[ret.length] = value;
                                }
                            }
                        } else {
                            for (key in elems) {
                                value = callback(elems[key], key, arg);
                                if (value != null) {
                                    ret[ret.length] = value;
                                }
                            }
                        }
                        return ret.concat.apply([], ret);
                    },
                    guid: 1,
                    proxy: function(fn, context) {
                        if (typeof context === "string") {
                            var tmp = fn[context];
                            context = fn;
                            fn = tmp;
                        }
                        if (!jQuery.isFunction(fn)) {
                            return undefined;
                        }
                        var args = slice.call(arguments, 2),
                            proxy = function() {
                                return fn.apply(context, args.concat(slice.call(arguments)));
                            };
                        proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;
                        return proxy;
                    },
                    access: function(elems, key, value, exec, fn, pass) {
                        var length = elems.length;
                        if (typeof key === "object") {
                            for (var k in key) {
                                jQuery.access(elems, k, key[k], exec, fn, value);
                            }
                            return elems;
                        }
                        if (value !== undefined) {
                            exec = !pass && exec && jQuery.isFunction(value);
                            for (var i = 0; i < length; i++) {
                                fn(elems[i], key, exec ? value.call(elems[i], i, fn(elems[i], key)) : value, pass);
                            }
                            return elems;
                        }
                        return length ? fn(elems[0], key) : undefined;
                    },
                    now: function() {
                        return (new Date())
                            .getTime();
                    },
                    uaMatch: function(ua) {
                        ua = ua.toLowerCase();
                        var match = rwebkit.exec(ua) || ropera.exec(ua) || rmsie.exec(ua) || ua.indexOf("compatible") < 0 && rmozilla.exec(ua) || [];
                        return {
                            browser: match[1] || "",
                            version: match[2] || "0"
                        };
                    },
                    sub: function() {
                        function jQuerySub(selector, context) {
                            return new jQuerySub.fn.init(selector, context);
                        }
                        jQuery.extend(true, jQuerySub, this);
                        jQuerySub.superclass = this;
                        jQuerySub.fn = jQuerySub.prototype = this();
                        jQuerySub.fn.constructor = jQuerySub;
                        jQuerySub.sub = this.sub;
                        jQuerySub.fn.init = function init(selector, context) {
                            if (context && context instanceof jQuery && !(context instanceof jQuerySub)) {
                                context = jQuerySub(context);
                            }
                            return jQuery.fn.init.call(this, selector, context, rootjQuerySub);
                        };
                        jQuerySub.fn.init.prototype = jQuerySub.fn;
                        var rootjQuerySub = jQuerySub(document);
                        return jQuerySub;
                    },
                    browser: {}
                });
                jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
                    class2type["[object " + name + "]"] = name.toLowerCase();
                });
                browserMatch = jQuery.uaMatch(userAgent);
                if (browserMatch.browser) {
                    jQuery.browser[browserMatch.browser] = true;
                    jQuery.browser.version = browserMatch.version;
                }
                if (jQuery.browser.webkit) {
                    jQuery.browser.safari = true;
                }
                if (rnotwhite.test("\xA0")) {
                    trimLeft = /^[\s\xA0]+/;
                    trimRight = /[\s\xA0]+$/;
                }
                rootjQuery = jQuery(document);
                if (document.addEventListener) {
                    DOMContentLoaded = function() {
                        document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
                        jQuery.ready();
                    };
                } else {
                    if (document.attachEvent) {
                        DOMContentLoaded = function() {
                            if (document.readyState === "complete") {
                                document.detachEvent("onreadystatechange", DOMContentLoaded);
                                jQuery.ready();
                            }
                        };
                    }
                }

                function doScrollCheck() {
                    if (jQuery.isReady) {
                        return;
                    }
                    try {
                        document.documentElement.doScroll("left");
                    } catch (e) {
                        setTimeout(doScrollCheck, 1);
                        return;
                    }
                    jQuery.ready();
                }
                return jQuery;
            })();
            var promiseMethods = "done fail isResolved isRejected promise then always pipe".split(" "),
                sliceDeferred = [].slice;
            jQuery.extend({
                _Deferred: function() {
                    var callbacks = [],
                        fired, firing, cancelled, deferred = {
                            done: function() {
                                if (!cancelled) {
                                    var args = arguments,
                                        i, length, elem, type, _fired;
                                    if (fired) {
                                        _fired = fired;
                                        fired = 0;
                                    }
                                    for (i = 0, length = args.length; i < length; i++) {
                                        elem = args[i];
                                        type = jQuery.type(elem);
                                        if (type === "array") {
                                            deferred.done.apply(deferred, elem);
                                        } else {
                                            if (type === "function") {
                                                callbacks.push(elem);
                                            }
                                        }
                                    }
                                    if (_fired) {
                                        deferred.resolveWith(_fired[0], _fired[1]);
                                    }
                                }
                                return this;
                            },
                            resolveWith: function(context, args) {
                                if (!cancelled && !fired && !firing) {
                                    args = args || [];
                                    firing = 1;
                                    try {
                                        while (callbacks[0]) {
                                            callbacks.shift()
                                                .apply(context, args);
                                        }
                                    } finally {
                                        fired = [context, args];
                                        firing = 0;
                                    }
                                }
                                return this;
                            },
                            resolve: function() {
                                deferred.resolveWith(this, arguments);
                                return this;
                            },
                            isResolved: function() {
                                return !!(firing || fired);
                            },
                            cancel: function() {
                                cancelled = 1;
                                callbacks = [];
                                return this;
                            }
                        };
                    return deferred;
                },
                Deferred: function(func) {
                    var deferred = jQuery._Deferred(),
                        failDeferred = jQuery._Deferred(),
                        promise;
                    jQuery.extend(deferred, {
                        then: function(doneCallbacks, failCallbacks) {
                            deferred.done(doneCallbacks)
                                .fail(failCallbacks);
                            return this;
                        },
                        always: function() {
                            return deferred.done.apply(deferred, arguments)
                                .fail.apply(this, arguments);
                        },
                        fail: failDeferred.done,
                        rejectWith: failDeferred.resolveWith,
                        reject: failDeferred.resolve,
                        isRejected: failDeferred.isResolved,
                        pipe: function(fnDone, fnFail) {
                            return jQuery.Deferred(function(newDefer) {
                                    jQuery.each({
                                        done: [fnDone, "resolve"],
                                        fail: [fnFail, "reject"]
                                    }, function(handler, data) {
                                        var fn = data[0],
                                            action = data[1],
                                            returned;
                                        if (jQuery.isFunction(fn)) {
                                            deferred[handler](function() {
                                                returned = fn.apply(this, arguments);
                                                if (returned && jQuery.isFunction(returned.promise)) {
                                                    returned.promise()
                                                        .then(newDefer.resolve, newDefer.reject);
                                                } else {
                                                    newDefer[action + "With"](this === deferred ? newDefer : this, [returned]);
                                                }
                                            });
                                        } else {
                                            deferred[handler](newDefer[action]);
                                        }
                                    });
                                })
                                .promise();
                        },
                        promise: function(obj) {
                            if (obj == null) {
                                if (promise) {
                                    return promise;
                                }
                                promise = obj = {};
                            }
                            var i = promiseMethods.length;
                            while (i--) {
                                obj[promiseMethods[i]] = deferred[promiseMethods[i]];
                            }
                            return obj;
                        }
                    });
                    deferred.done(failDeferred.cancel)
                        .fail(deferred.cancel);
                    delete deferred.cancel;
                    if (func) {
                        func.call(deferred, deferred);
                    }
                    return deferred;
                },
                when: function(firstParam) {
                    var args = arguments,
                        i = 0,
                        length = args.length,
                        count = length,
                        deferred = length <= 1 && firstParam && jQuery.isFunction(firstParam.promise) ? firstParam : jQuery.Deferred();

                    function resolveFunc(i) {
                        return function(value) {
                            args[i] = arguments.length > 1 ? sliceDeferred.call(arguments, 0) : value;
                            if (!(--count)) {
                                deferred.resolveWith(deferred, sliceDeferred.call(args, 0));
                            }
                        };
                    }
                    if (length > 1) {
                        for (; i < length; i++) {
                            if (args[i] && jQuery.isFunction(args[i].promise)) {
                                args[i].promise()
                                    .then(resolveFunc(i), deferred.reject);
                            } else {
                                --count;
                            }
                        }
                        if (!count) {
                            deferred.resolveWith(deferred, args);
                        }
                    } else {
                        if (deferred !== firstParam) {
                            deferred.resolveWith(deferred, length ? [firstParam] : []);
                        }
                    }
                    return deferred.promise();
                }
            });
            jQuery.support = (function() {
                var div = document.createElement("div"),
                    documentElement = document.documentElement,
                    all, a, select, opt, input, marginDiv, support, fragment, body, testElementParent, testElement, testElementStyle, tds, events, eventName, i, isSupported;
                div.setAttribute("className", "t");
                div.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
                all = div.getElementsByTagName("*");
                a = div.getElementsByTagName("a")[0];
                if (!all || !all.length || !a) {
                    return {};
                }
                select = document.createElement("select");
                opt = select.appendChild(document.createElement("option"));
                input = div.getElementsByTagName("input")[0];
                support = {
                    leadingWhitespace: (div.firstChild.nodeType === 3),
                    tbody: !div.getElementsByTagName("tbody")
                        .length,
                    htmlSerialize: !!div.getElementsByTagName("link")
                        .length,
                    style: /top/.test(a.getAttribute("style")),
                    hrefNormalized: (a.getAttribute("href") === "/a"),
                    opacity: /^0.55$/.test(a.style.opacity),
                    cssFloat: !!a.style.cssFloat,
                    checkOn: (input.value === "on"),
                    optSelected: opt.selected,
                    getSetAttribute: div.className !== "t",
                    submitBubbles: true,
                    changeBubbles: true,
                    focusinBubbles: false,
                    deleteExpando: true,
                    noCloneEvent: true,
                    inlineBlockNeedsLayout: false,
                    shrinkWrapBlocks: false,
                    reliableMarginRight: true
                };
                input.checked = true;
                support.noCloneChecked = input.cloneNode(true)
                    .checked;
                select.disabled = true;
                support.optDisabled = !opt.disabled;
                try {
                    delete div.test;
                } catch (e) {
                    support.deleteExpando = false;
                }
                if (!div.addEventListener && div.attachEvent && div.fireEvent) {
                    div.attachEvent("onclick", function() {
                        support.noCloneEvent = false;
                    });
                    div.cloneNode(true)
                        .fireEvent("onclick");
                }
                input = document.createElement("input");
                input.value = "t";
                input.setAttribute("type", "radio");
                support.radioValue = input.value === "t";
                input.setAttribute("checked", "checked");
                div.appendChild(input);
                fragment = document.createDocumentFragment();
                fragment.appendChild(div.firstChild);
                support.checkClone = fragment.cloneNode(true)
                    .cloneNode(true)
                    .lastChild.checked;
                div.innerHTML = "";
                div.style.width = div.style.paddingLeft = "1px";
                body = document.getElementsByTagName("body")[0];
                testElement = document.createElement(body ? "div" : "body");
                testElementStyle = {
                    visibility: "hidden",
                    width: 0,
                    height: 0,
                    border: 0,
                    margin: 0,
                    background: "none"
                };
                if (body) {
                    jQuery.extend(testElementStyle, {
                        position: "absolute",
                        left: "-1000px",
                        top: "-1000px"
                    });
                }
                for (i in testElementStyle) {
                    testElement.style[i] = testElementStyle[i];
                }
                testElement.appendChild(div);
                testElementParent = body || documentElement;
                testElementParent.insertBefore(testElement, testElementParent.firstChild);
                support.appendChecked = input.checked;
                support.boxModel = div.offsetWidth === 2;
                if ("zoom" in div.style) {
                    div.style.display = "inline";
                    div.style.zoom = 1;
                    support.inlineBlockNeedsLayout = (div.offsetWidth === 2);
                    div.style.display = "";
                    div.innerHTML = "<div style='width:4px;'></div>";
                    support.shrinkWrapBlocks = (div.offsetWidth !== 2);
                }
                div.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";
                tds = div.getElementsByTagName("td");
                isSupported = (tds[0].offsetHeight === 0);
                tds[0].style.display = "";
                tds[1].style.display = "none";
                support.reliableHiddenOffsets = isSupported && (tds[0].offsetHeight === 0);
                div.innerHTML = "";
                if (document.defaultView && document.defaultView.getComputedStyle) {
                    marginDiv = document.createElement("div");
                    marginDiv.style.width = "0";
                    marginDiv.style.marginRight = "0";
                    div.appendChild(marginDiv);
                    support.reliableMarginRight = (parseInt((document.defaultView.getComputedStyle(marginDiv, null) || {
                            marginRight: 0
                        })
                        .marginRight, 10) || 0) === 0;
                }
                testElement.innerHTML = "";
                testElementParent.removeChild(testElement);
                if (div.attachEvent) {
                    for (i in {
                            submit: 1,
                            change: 1,
                            focusin: 1
                        }) {
                        eventName = "on" + i;
                        isSupported = (eventName in div);
                        if (!isSupported) {
                            div.setAttribute(eventName, "return;");
                            isSupported = (typeof div[eventName] === "function");
                        }
                        support[i + "Bubbles"] = isSupported;
                    }
                }
                testElement = fragment = select = opt = body = marginDiv = div = input = null;
                return support;
            })();
            jQuery.boxModel = jQuery.support.boxModel;
            var rbrace = /^(?:\{.*\}|\[.*\])$/,
                rmultiDash = /([A-Z])/g;
            jQuery.extend({
                cache: {},
                uuid: 0,
                expando: "jQuery" + (jQuery.fn.jquery + Math.random())
                    .replace(/\D/g, ""),
                noData: {
                    "embed": true,
                    "object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
                    "applet": true
                },
                hasData: function(elem) {
                    elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
                    return !!elem && !isEmptyDataObject(elem);
                },
                data: function(elem, name, data, pvt) {
                    if (!jQuery.acceptData(elem)) {
                        return;
                    }
                    var thisCache, ret, internalKey = jQuery.expando,
                        getByName = typeof name === "string",
                        isNode = elem.nodeType,
                        cache = isNode ? jQuery.cache : elem,
                        id = isNode ? elem[jQuery.expando] : elem[jQuery.expando] && jQuery.expando;
                    if ((!id || (pvt && id && (cache[id] && !cache[id][internalKey]))) && getByName && data === undefined) {
                        return;
                    }
                    if (!id) {
                        if (isNode) {
                            elem[jQuery.expando] = id = ++jQuery.uuid;
                        } else {
                            id = jQuery.expando;
                        }
                    }
                    if (!cache[id]) {
                        cache[id] = {};
                        if (!isNode) {
                            cache[id].toJSON = jQuery.noop;
                        }
                    }
                    if (typeof name === "object" || typeof name === "function") {
                        if (pvt) {
                            cache[id][internalKey] = jQuery.extend(cache[id][internalKey], name);
                        } else {
                            cache[id] = jQuery.extend(cache[id], name);
                        }
                    }
                    thisCache = cache[id];
                    if (pvt) {
                        if (!thisCache[internalKey]) {
                            thisCache[internalKey] = {};
                        }
                        thisCache = thisCache[internalKey];
                    }
                    if (data !== undefined) {
                        thisCache[jQuery.camelCase(name)] = data;
                    }
                    if (name === "events" && !thisCache[name]) {
                        return thisCache[internalKey] && thisCache[internalKey].events;
                    }
                    if (getByName) {
                        ret = thisCache[name];
                        if (ret == null) {
                            ret = thisCache[jQuery.camelCase(name)];
                        }
                    } else {
                        ret = thisCache;
                    }
                    return ret;
                },
                removeData: function(elem, name, pvt) {
                    if (!jQuery.acceptData(elem)) {
                        return;
                    }
                    var thisCache, internalKey = jQuery.expando,
                        isNode = elem.nodeType,
                        cache = isNode ? jQuery.cache : elem,
                        id = isNode ? elem[jQuery.expando] : jQuery.expando;
                    if (!cache[id]) {
                        return;
                    }
                    if (name) {
                        thisCache = pvt ? cache[id][internalKey] : cache[id];
                        if (thisCache) {
                            if (!thisCache[name]) {
                                name = jQuery.camelCase(name);
                            }
                            delete thisCache[name];
                            if (!isEmptyDataObject(thisCache)) {
                                return;
                            }
                        }
                    }
                    if (pvt) {
                        delete cache[id][internalKey];
                        if (!isEmptyDataObject(cache[id])) {
                            return;
                        }
                    }
                    var internalCache = cache[id][internalKey];
                    if (jQuery.support.deleteExpando || !cache.setInterval) {
                        delete cache[id];
                    } else {
                        cache[id] = null;
                    }
                    if (internalCache) {
                        cache[id] = {};
                        if (!isNode) {
                            cache[id].toJSON = jQuery.noop;
                        }
                        cache[id][internalKey] = internalCache;
                    } else {
                        if (isNode) {
                            if (jQuery.support.deleteExpando) {
                                delete elem[jQuery.expando];
                            } else {
                                if (elem.removeAttribute) {
                                    elem.removeAttribute(jQuery.expando);
                                } else {
                                    elem[jQuery.expando] = null;
                                }
                            }
                        }
                    }
                },
                _data: function(elem, name, data) {
                    return jQuery.data(elem, name, data, true);
                },
                acceptData: function(elem) {
                    if (elem.nodeName) {
                        var match = jQuery.noData[elem.nodeName.toLowerCase()];
                        if (match) {
                            return !(match === true || elem.getAttribute("classid") !== match);
                        }
                    }
                    return true;
                }
            });
            jQuery.fn.extend({
                data: function(key, value) {
                    var data = null;
                    if (typeof key === "undefined") {
                        if (this.length) {
                            data = jQuery.data(this[0]);
                            if (this[0].nodeType === 1) {
                                var attr = this[0].attributes,
                                    name;
                                for (var i = 0, l = attr.length; i < l; i++) {
                                    name = attr[i].name;
                                    if (name.indexOf("data-") === 0) {
                                        name = jQuery.camelCase(name.substring(5));
                                        dataAttr(this[0], name, data[name]);
                                    }
                                }
                            }
                        }
                        return data;
                    } else {
                        if (typeof key === "object") {
                            return this.each(function() {
                                jQuery.data(this, key);
                            });
                        }
                    }
                    var parts = key.split(".");
                    parts[1] = parts[1] ? "." + parts[1] : "";
                    if (value === undefined) {
                        data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);
                        if (data === undefined && this.length) {
                            data = jQuery.data(this[0], key);
                            data = dataAttr(this[0], key, data);
                        }
                        return data === undefined && parts[1] ? this.data(parts[0]) : data;
                    } else {
                        return this.each(function() {
                            var $this = jQuery(this),
                                args = [parts[0], value];
                            $this.triggerHandler("setData" + parts[1] + "!", args);
                            jQuery.data(this, key, value);
                            $this.triggerHandler("changeData" + parts[1] + "!", args);
                        });
                    }
                },
                removeData: function(key) {
                    return this.each(function() {
                        jQuery.removeData(this, key);
                    });
                }
            });

            function dataAttr(elem, key, data) {
                if (data === undefined && elem.nodeType === 1) {
                    var name = "data-" + key.replace(rmultiDash, "-$1")
                        .toLowerCase();
                    data = elem.getAttribute(name);
                    if (typeof data === "string") {
                        try {
                            data = data === "true" ? true : data === "false" ? false : data === "null" ? null : !jQuery.isNaN(data) ? parseFloat(data) : rbrace.test(data) ? jQuery.parseJSON(data) : data;
                        } catch (e) {}
                        jQuery.data(elem, key, data);
                    } else {
                        data = undefined;
                    }
                }
                return data;
            }

            function isEmptyDataObject(obj) {
                for (var name in obj) {
                    if (name !== "toJSON") {
                        return false;
                    }
                }
                return true;
            }

            function handleQueueMarkDefer(elem, type, src) {
                var deferDataKey = type + "defer",
                    queueDataKey = type + "queue",
                    markDataKey = type + "mark",
                    defer = jQuery.data(elem, deferDataKey, undefined, true);
                if (defer && (src === "queue" || !jQuery.data(elem, queueDataKey, undefined, true)) && (src === "mark" || !jQuery.data(elem, markDataKey, undefined, true))) {
                    setTimeout(function() {
                        if (!jQuery.data(elem, queueDataKey, undefined, true) && !jQuery.data(elem, markDataKey, undefined, true)) {
                            jQuery.removeData(elem, deferDataKey, true);
                            defer.resolve();
                        }
                    }, 0);
                }
            }
            jQuery.extend({
                _mark: function(elem, type) {
                    if (elem) {
                        type = (type || "fx") + "mark";
                        jQuery.data(elem, type, (jQuery.data(elem, type, undefined, true) || 0) + 1, true);
                    }
                },
                _unmark: function(force, elem, type) {
                    if (force !== true) {
                        type = elem;
                        elem = force;
                        force = false;
                    }
                    if (elem) {
                        type = type || "fx";
                        var key = type + "mark",
                            count = force ? 0 : ((jQuery.data(elem, key, undefined, true) || 1) - 1);
                        if (count) {
                            jQuery.data(elem, key, count, true);
                        } else {
                            jQuery.removeData(elem, key, true);
                            handleQueueMarkDefer(elem, type, "mark");
                        }
                    }
                },
                queue: function(elem, type, data) {
                    if (elem) {
                        type = (type || "fx") + "queue";
                        var q = jQuery.data(elem, type, undefined, true);
                        if (data) {
                            if (!q || jQuery.isArray(data)) {
                                q = jQuery.data(elem, type, jQuery.makeArray(data), true);
                            } else {
                                q.push(data);
                            }
                        }
                        return q || [];
                    }
                },
                dequeue: function(elem, type) {
                    type = type || "fx";
                    var queue = jQuery.queue(elem, type),
                        fn = queue.shift(),
                        defer;
                    if (fn === "inprogress") {
                        fn = queue.shift();
                    }
                    if (fn) {
                        if (type === "fx") {
                            queue.unshift("inprogress");
                        }
                        fn.call(elem, function() {
                            jQuery.dequeue(elem, type);
                        });
                    }
                    if (!queue.length) {
                        jQuery.removeData(elem, type + "queue", true);
                        handleQueueMarkDefer(elem, type, "queue");
                    }
                }
            });
            jQuery.fn.extend({
                queue: function(type, data) {
                    if (typeof type !== "string") {
                        data = type;
                        type = "fx";
                    }
                    if (data === undefined) {
                        return jQuery.queue(this[0], type);
                    }
                    return this.each(function() {
                        var queue = jQuery.queue(this, type, data);
                        if (type === "fx" && queue[0] !== "inprogress") {
                            jQuery.dequeue(this, type);
                        }
                    });
                },
                dequeue: function(type) {
                    return this.each(function() {
                        jQuery.dequeue(this, type);
                    });
                },
                delay: function(time, type) {
                    time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
                    type = type || "fx";
                    return this.queue(type, function() {
                        var elem = this;
                        setTimeout(function() {
                            jQuery.dequeue(elem, type);
                        }, time);
                    });
                },
                clearQueue: function(type) {
                    return this.queue(type || "fx", []);
                },
                promise: function(type, object) {
                    if (typeof type !== "string") {
                        object = type;
                        type = undefined;
                    }
                    type = type || "fx";
                    var defer = jQuery.Deferred(),
                        elements = this,
                        i = elements.length,
                        count = 1,
                        deferDataKey = type + "defer",
                        queueDataKey = type + "queue",
                        markDataKey = type + "mark",
                        tmp;

                    function resolve() {
                        if (!(--count)) {
                            defer.resolveWith(elements, [elements]);
                        }
                    }
                    while (i--) {
                        if ((tmp = jQuery.data(elements[i], deferDataKey, undefined, true) || (jQuery.data(elements[i], queueDataKey, undefined, true) || jQuery.data(elements[i], markDataKey, undefined, true)) && jQuery.data(elements[i], deferDataKey, jQuery._Deferred(), true))) {
                            count++;
                            tmp.done(resolve);
                        }
                    }
                    resolve();
                    return defer.promise();
                }
            });
            var rclass = /[\n\t\r]/g,
                rspace = /\s+/,
                rreturn = /\r/g,
                rtype = /^(?:button|input)$/i,
                rfocusable = /^(?:button|input|object|select|textarea)$/i,
                rclickable = /^a(?:rea)?$/i,
                rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
                nodeHook, boolHook;
            jQuery.fn.extend({
                attr: function(name, value) {
                    return jQuery.access(this, name, value, true, jQuery.attr);
                },
                removeAttr: function(name) {
                    return this.each(function() {
                        jQuery.removeAttr(this, name);
                    });
                },
                prop: function(name, value) {
                    return jQuery.access(this, name, value, true, jQuery.prop);
                },
                removeProp: function(name) {
                    name = jQuery.propFix[name] || name;
                    return this.each(function() {
                        try {
                            this[name] = undefined;
                            delete this[name];
                        } catch (e) {}
                    });
                },
                addClass: function(value) {
                    var classNames, i, l, elem, setClass, c, cl;
                    if (jQuery.isFunction(value)) {
                        return this.each(function(j) {
                            jQuery(this)
                                .addClass(value.call(this, j, this.className));
                        });
                    }
                    if (value && typeof value === "string") {
                        classNames = value.split(rspace);
                        for (i = 0, l = this.length; i < l; i++) {
                            elem = this[i];
                            if (elem.nodeType === 1) {
                                if (!elem.className && classNames.length === 1) {
                                    elem.className = value;
                                } else {
                                    setClass = " " + elem.className + " ";
                                    for (c = 0, cl = classNames.length; c < cl; c++) {
                                        if (!~setClass.indexOf(" " + classNames[c] + " ")) {
                                            setClass += classNames[c] + " ";
                                        }
                                    }
                                    elem.className = jQuery.trim(setClass);
                                }
                            }
                        }
                    }
                    return this;
                },
                removeClass: function(value) {
                    var classNames, i, l, elem, className, c, cl;
                    if (jQuery.isFunction(value)) {
                        return this.each(function(j) {
                            jQuery(this)
                                .removeClass(value.call(this, j, this.className));
                        });
                    }
                    if ((value && typeof value === "string") || value === undefined) {
                        classNames = (value || "")
                            .split(rspace);
                        for (i = 0, l = this.length; i < l; i++) {
                            elem = this[i];
                            if (elem.nodeType === 1 && elem.className) {
                                if (value) {
                                    className = (" " + elem.className + " ")
                                        .replace(rclass, " ");
                                    for (c = 0, cl = classNames.length; c < cl; c++) {
                                        className = className.replace(" " + classNames[c] + " ", " ");
                                    }
                                    elem.className = jQuery.trim(className);
                                } else {
                                    elem.className = "";
                                }
                            }
                        }
                    }
                    return this;
                },
                toggleClass: function(value, stateVal) {
                    var type = typeof value,
                        isBool = typeof stateVal === "boolean";
                    if (jQuery.isFunction(value)) {
                        return this.each(function(i) {
                            jQuery(this)
                                .toggleClass(value.call(this, i, this.className, stateVal), stateVal);
                        });
                    }
                    return this.each(function() {
                        if (type === "string") {
                            var className, i = 0,
                                self = jQuery(this),
                                state = stateVal,
                                classNames = value.split(rspace);
                            while ((className = classNames[i++])) {
                                state = isBool ? state : !self.hasClass(className);
                                self[state ? "addClass" : "removeClass"](className);
                            }
                        } else {
                            if (type === "undefined" || type === "boolean") {
                                if (this.className) {
                                    jQuery._data(this, "__className__", this.className);
                                }
                                this.className = this.className || value === false ? "" : jQuery._data(this, "__className__") || "";
                            }
                        }
                    });
                },
                hasClass: function(selector) {
                    var className = " " + selector + " ";
                    for (var i = 0, l = this.length; i < l; i++) {
                        if (this[i].nodeType === 1 && (" " + this[i].className + " ")
                            .replace(rclass, " ")
                            .indexOf(className) > -1) {
                            return true;
                        }
                    }
                    return false;
                },
                val: function(value) {
                    var hooks, ret, elem = this[0];
                    if (!arguments.length) {
                        if (elem) {
                            hooks = jQuery.valHooks[elem.nodeName.toLowerCase()] || jQuery.valHooks[elem.type];
                            if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
                                return ret;
                            }
                            ret = elem.value;
                            return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret;
                        }
                        return undefined;
                    }
                    var isFunction = jQuery.isFunction(value);
                    return this.each(function(i) {
                        var self = jQuery(this),
                            val;
                        if (this.nodeType !== 1) {
                            return;
                        }
                        if (isFunction) {
                            val = value.call(this, i, self.val());
                        } else {
                            val = value;
                        }
                        if (val == null) {
                            val = "";
                        } else {
                            if (typeof val === "number") {
                                val += "";
                            } else {
                                if (jQuery.isArray(val)) {
                                    val = jQuery.map(val, function(value) {
                                        return value == null ? "" : value + "";
                                    });
                                }
                            }
                        }
                        hooks = jQuery.valHooks[this.nodeName.toLowerCase()] || jQuery.valHooks[this.type];
                        if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
                            this.value = val;
                        }
                    });
                }
            });
            jQuery.extend({
                valHooks: {
                    option: {
                        get: function(elem) {
                            var val = elem.attributes.value;
                            return !val || val.specified ? elem.value : elem.text;
                        }
                    },
                    select: {
                        get: function(elem) {
                            var value, index = elem.selectedIndex,
                                values = [],
                                options = elem.options,
                                one = elem.type === "select-one";
                            if (index < 0) {
                                return null;
                            }
                            for (var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++) {
                                var option = options[i];
                                if (option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                                    value = jQuery(option)
                                        .val();
                                    if (one) {
                                        return value;
                                    }
                                    values.push(value);
                                }
                            }
                            if (one && !values.length && options.length) {
                                return jQuery(options[index])
                                    .val();
                            }
                            return values;
                        },
                        set: function(elem, value) {
                            var values = jQuery.makeArray(value);
                            jQuery(elem)
                                .find("option")
                                .each(function() {
                                    this.selected = jQuery.inArray(jQuery(this)
                                        .val(), values) >= 0;
                                });
                            if (!values.length) {
                                elem.selectedIndex = -1;
                            }
                            return values;
                        }
                    }
                },
                attrFn: {
                    val: true,
                    css: true,
                    html: true,
                    text: true,
                    data: true,
                    width: true,
                    height: true,
                    offset: true
                },
                attrFix: {
                    tabindex: "tabIndex"
                },
                attr: function(elem, name, value, pass) {
                    var nType = elem.nodeType;
                    if (!elem || nType === 3 || nType === 8 || nType === 2) {
                        return undefined;
                    }
                    if (pass && name in jQuery.attrFn) {
                        return jQuery(elem)[name](value);
                    }
                    if (!("getAttribute" in elem)) {
                        return jQuery.prop(elem, name, value);
                    }
                    var ret, hooks, notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
                    if (notxml) {
                        name = jQuery.attrFix[name] || name;
                        hooks = jQuery.attrHooks[name];
                        if (!hooks) {
                            if (rboolean.test(name)) {
                                hooks = boolHook;
                            } else {
                                if (nodeHook) {
                                    hooks = nodeHook;
                                }
                            }
                        }
                    }
                    if (value !== undefined) {
                        if (value === null) {
                            jQuery.removeAttr(elem, name);
                            return undefined;
                        } else {
                            if (hooks && "set" in hooks && notxml && (ret = hooks.set(elem, value, name)) !== undefined) {
                                return ret;
                            } else {
                                elem.setAttribute(name, "" + value);
                                return value;
                            }
                        }
                    } else {
                        if (hooks && "get" in hooks && notxml && (ret = hooks.get(elem, name)) !== null) {
                            return ret;
                        } else {
                            ret = elem.getAttribute(name);
                            return ret === null ? undefined : ret;
                        }
                    }
                },
                removeAttr: function(elem, name) {
                    var propName;
                    if (elem.nodeType === 1) {
                        name = jQuery.attrFix[name] || name;
                        jQuery.attr(elem, name, "");
                        elem.removeAttribute(name);
                        if (rboolean.test(name) && (propName = jQuery.propFix[name] || name) in elem) {
                            elem[propName] = false;
                        }
                    }
                },
                attrHooks: {
                    type: {
                        set: function(elem, value) {
                            if (rtype.test(elem.nodeName) && elem.parentNode) {
                                jQuery.error("type property can't be changed");
                            } else {
                                if (!jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
                                    var val = elem.value;
                                    elem.setAttribute("type", value);
                                    if (val) {
                                        elem.value = val;
                                    }
                                    return value;
                                }
                            }
                        }
                    },
                    value: {
                        get: function(elem, name) {
                            if (nodeHook && jQuery.nodeName(elem, "button")) {
                                return nodeHook.get(elem, name);
                            }
                            return name in elem ? elem.value : null;
                        },
                        set: function(elem, value, name) {
                            if (nodeHook && jQuery.nodeName(elem, "button")) {
                                return nodeHook.set(elem, value, name);
                            }
                            elem.value = value;
                        }
                    }
                },
                propFix: {
                    tabindex: "tabIndex",
                    readonly: "readOnly",
                    "for": "htmlFor",
                    "class": "className",
                    maxlength: "maxLength",
                    cellspacing: "cellSpacing",
                    cellpadding: "cellPadding",
                    rowspan: "rowSpan",
                    colspan: "colSpan",
                    usemap: "useMap",
                    frameborder: "frameBorder",
                    contenteditable: "contentEditable"
                },
                prop: function(elem, name, value) {
                    var nType = elem.nodeType;
                    if (!elem || nType === 3 || nType === 8 || nType === 2) {
                        return undefined;
                    }
                    var ret, hooks, notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
                    if (notxml) {
                        name = jQuery.propFix[name] || name;
                        hooks = jQuery.propHooks[name];
                    }
                    if (value !== undefined) {
                        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                            return ret;
                        } else {
                            return (elem[name] = value);
                        }
                    } else {
                        if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                            return ret;
                        } else {
                            return elem[name];
                        }
                    }
                },
                propHooks: {
                    tabIndex: {
                        get: function(elem) {
                            var attributeNode = elem.getAttributeNode("tabindex");
                            return attributeNode && attributeNode.specified ? parseInt(attributeNode.value, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : undefined;
                        }
                    }
                }
            });
            jQuery.attrHooks.tabIndex = jQuery.propHooks.tabIndex;
            boolHook = {
                get: function(elem, name) {
                    var attrNode;
                    return jQuery.prop(elem, name) === true || (attrNode = elem.getAttributeNode(name)) && attrNode.nodeValue !== false ? name.toLowerCase() : undefined;
                },
                set: function(elem, value, name) {
                    var propName;
                    if (value === false) {
                        jQuery.removeAttr(elem, name);
                    } else {
                        propName = jQuery.propFix[name] || name;
                        if (propName in elem) {
                            elem[propName] = true;
                        }
                        elem.setAttribute(name, name.toLowerCase());
                    }
                    return name;
                }
            };
            if (!jQuery.support.getSetAttribute) {
                nodeHook = jQuery.valHooks.button = {
                    get: function(elem, name) {
                        var ret;
                        ret = elem.getAttributeNode(name);
                        return ret && ret.nodeValue !== "" ? ret.nodeValue : undefined;
                    },
                    set: function(elem, value, name) {
                        var ret = elem.getAttributeNode(name);
                        if (!ret) {
                            ret = document.createAttribute(name);
                            elem.setAttributeNode(ret);
                        }
                        return (ret.nodeValue = value + "");
                    }
                };
                jQuery.each(["width", "height"], function(i, name) {
                    jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
                        set: function(elem, value) {
                            if (value === "") {
                                elem.setAttribute(name, "auto");
                                return value;
                            }
                        }
                    });
                });
            }
            if (!jQuery.support.hrefNormalized) {
                jQuery.each(["href", "src", "width", "height"], function(i, name) {
                    jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
                        get: function(elem) {
                            var ret = elem.getAttribute(name, 2);
                            return ret === null ? undefined : ret;
                        }
                    });
                });
            }
            if (!jQuery.support.style) {
                jQuery.attrHooks.style = {
                    get: function(elem) {
                        return elem.style.cssText.toLowerCase() || undefined;
                    },
                    set: function(elem, value) {
                        return (elem.style.cssText = "" + value);
                    }
                };
            }
            if (!jQuery.support.optSelected) {
                jQuery.propHooks.selected = jQuery.extend(jQuery.propHooks.selected, {
                    get: function(elem) {
                        var parent = elem.parentNode;
                        if (parent) {
                            parent.selectedIndex;
                            if (parent.parentNode) {
                                parent.parentNode.selectedIndex;
                            }
                        }
                        return null;
                    }
                });
            }
            if (!jQuery.support.checkOn) {
                jQuery.each(["radio", "checkbox"], function() {
                    jQuery.valHooks[this] = {
                        get: function(elem) {
                            return elem.getAttribute("value") === null ? "on" : elem.value;
                        }
                    };
                });
            }
            jQuery.each(["radio", "checkbox"], function() {
                jQuery.valHooks[this] = jQuery.extend(jQuery.valHooks[this], {
                    set: function(elem, value) {
                        if (jQuery.isArray(value)) {
                            return (elem.checked = jQuery.inArray(jQuery(elem)
                                .val(), value) >= 0);
                        }
                    }
                });
            });
            var rnamespaces = /\.(.*)$/,
                rformElems = /^(?:textarea|input|select)$/i,
                rperiod = /\./g,
                rspaces = / /g,
                rescape = /[^\w\s.|`]/g,
                fcleanup = function(nm) {
                    return nm.replace(rescape, "\\$&");
                };
            jQuery.event = {
                add: function(elem, types, handler, data) {
                    if (elem.nodeType === 3 || elem.nodeType === 8) {
                        return;
                    }
                    if (handler === false) {
                        handler = returnFalse;
                    } else {
                        if (!handler) {
                            return;
                        }
                    }
                    var handleObjIn, handleObj;
                    if (handler.handler) {
                        handleObjIn = handler;
                        handler = handleObjIn.handler;
                    }
                    if (!handler.guid) {
                        handler.guid = jQuery.guid++;
                    }
                    var elemData = jQuery._data(elem);
                    if (!elemData) {
                        return;
                    }
                    var events = elemData.events,
                        eventHandle = elemData.handle;
                    if (!events) {
                        elemData.events = events = {};
                    }
                    if (!eventHandle) {
                        elemData.handle = eventHandle = function(e) {
                            return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.handle.apply(eventHandle.elem, arguments) : undefined;
                        };
                    }
                    eventHandle.elem = elem;
                    types = types.split(" ");
                    var type, i = 0,
                        namespaces;
                    while ((type = types[i++])) {
                        handleObj = handleObjIn ? jQuery.extend({}, handleObjIn) : {
                            handler: handler,
                            data: data
                        };
                        if (type.indexOf(".") > -1) {
                            namespaces = type.split(".");
                            type = namespaces.shift();
                            handleObj.namespace = namespaces.slice(0)
                                .sort()
                                .join(".");
                        } else {
                            namespaces = [];
                            handleObj.namespace = "";
                        }
                        handleObj.type = type;
                        if (!handleObj.guid) {
                            handleObj.guid = handler.guid;
                        }
                        var handlers = events[type],
                            special = jQuery.event.special[type] || {};
                        if (!handlers) {
                            handlers = events[type] = [];
                            if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                                if (elem.addEventListener) {
                                    elem.addEventListener(type, eventHandle, false);
                                } else {
                                    if (elem.attachEvent) {
                                        elem.attachEvent("on" + type, eventHandle);
                                    }
                                }
                            }
                        }
                        if (special.add) {
                            special.add.call(elem, handleObj);
                            if (!handleObj.handler.guid) {
                                handleObj.handler.guid = handler.guid;
                            }
                        }
                        handlers.push(handleObj);
                        jQuery.event.global[type] = true;
                    }
                    elem = null;
                },
                global: {},
                remove: function(elem, types, handler, pos) {
                    if (elem.nodeType === 3 || elem.nodeType === 8) {
                        return;
                    }
                    if (handler === false) {
                        handler = returnFalse;
                    }
                    var ret, type, fn, j, i = 0,
                        all, namespaces, namespace, special, eventType, handleObj, origType, elemData = jQuery.hasData(elem) && jQuery._data(elem),
                        events = elemData && elemData.events;
                    if (!elemData || !events) {
                        return;
                    }
                    if (types && types.type) {
                        handler = types.handler;
                        types = types.type;
                    }
                    if (!types || typeof types === "string" && types.charAt(0) === ".") {
                        types = types || "";
                        for (type in events) {
                            jQuery.event.remove(elem, type + types);
                        }
                        return;
                    }
                    types = types.split(" ");
                    while ((type = types[i++])) {
                        origType = type;
                        handleObj = null;
                        all = type.indexOf(".") < 0;
                        namespaces = [];
                        if (!all) {
                            namespaces = type.split(".");
                            type = namespaces.shift();
                            namespace = new RegExp("(^|\\.)" + jQuery.map(namespaces.slice(0)
                                    .sort(), fcleanup)
                                .join("\\.(?:.*\\.)?") + "(\\.|$)");
                        }
                        eventType = events[type];
                        if (!eventType) {
                            continue;
                        }
                        if (!handler) {
                            for (j = 0; j < eventType.length; j++) {
                                handleObj = eventType[j];
                                if (all || namespace.test(handleObj.namespace)) {
                                    jQuery.event.remove(elem, origType, handleObj.handler, j);
                                    eventType.splice(j--, 1);
                                }
                            }
                            continue;
                        }
                        special = jQuery.event.special[type] || {};
                        for (j = pos || 0; j < eventType.length; j++) {
                            handleObj = eventType[j];
                            if (handler.guid === handleObj.guid) {
                                if (all || namespace.test(handleObj.namespace)) {
                                    if (pos == null) {
                                        eventType.splice(j--, 1);
                                    }
                                    if (special.remove) {
                                        special.remove.call(elem, handleObj);
                                    }
                                }
                                if (pos != null) {
                                    break;
                                }
                            }
                        }
                        if (eventType.length === 0 || pos != null && eventType.length === 1) {
                            if (!special.teardown || special.teardown.call(elem, namespaces) === false) {
                                jQuery.removeEvent(elem, type, elemData.handle);
                            }
                            ret = null;
                            delete events[type];
                        }
                    }
                    if (jQuery.isEmptyObject(events)) {
                        var handle = elemData.handle;
                        if (handle) {
                            handle.elem = null;
                        }
                        delete elemData.events;
                        delete elemData.handle;
                        if (jQuery.isEmptyObject(elemData)) {
                            jQuery.removeData(elem, undefined, true);
                        }
                    }
                },
                customEvent: {
                    "getData": true,
                    "setData": true,
                    "changeData": true
                },
                trigger: function(event, data, elem, onlyHandlers) {
                    var type = event.type || event,
                        namespaces = [],
                        exclusive;
                    if (type.indexOf("!") >= 0) {
                        type = type.slice(0, -1);
                        exclusive = true;
                    }
                    if (type.indexOf(".") >= 0) {
                        namespaces = type.split(".");
                        type = namespaces.shift();
                        namespaces.sort();
                    }
                    if ((!elem || jQuery.event.customEvent[type]) && !jQuery.event.global[type]) {
                        return;
                    }
                    event = typeof event === "object" ? event[jQuery.expando] ? event : new jQuery.Event(type, event) : new jQuery.Event(type);
                    event.type = type;
                    event.exclusive = exclusive;
                    event.namespace = namespaces.join(".");
                    event.namespace_re = new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.)?") + "(\\.|$)");
                    if (onlyHandlers || !elem) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    if (!elem) {
                        jQuery.each(jQuery.cache, function() {
                            var internalKey = jQuery.expando,
                                internalCache = this[internalKey];
                            if (internalCache && internalCache.events && internalCache.events[type]) {
                                jQuery.event.trigger(event, data, internalCache.handle.elem);
                            }
                        });
                        return;
                    }
                    if (elem.nodeType === 3 || elem.nodeType === 8) {
                        return;
                    }
                    event.result = undefined;
                    event.target = elem;
                    data = data != null ? jQuery.makeArray(data) : [];
                    data.unshift(event);
                    var cur = elem,
                        ontype = type.indexOf(":") < 0 ? "on" + type : "";
                    do {
                        var handle = jQuery._data(cur, "handle");
                        event.currentTarget = cur;
                        if (handle) {
                            handle.apply(cur, data);
                        }
                        if (ontype && jQuery.acceptData(cur) && cur[ontype] && cur[ontype].apply(cur, data) === false) {
                            event.result = false;
                            event.preventDefault();
                        }
                        cur = cur.parentNode || cur.ownerDocument || cur === event.target.ownerDocument && window;
                    } while (cur && !event.isPropagationStopped());
                    if (!event.isDefaultPrevented()) {
                        var old, special = jQuery.event.special[type] || {};
                        if ((!special._default || special._default.call(elem.ownerDocument, event) === false) && !(type === "click" && jQuery.nodeName(elem, "a")) && jQuery.acceptData(elem)) {
                            try {
                                if (ontype && elem[type]) {
                                    old = elem[ontype];
                                    if (old) {
                                        elem[ontype] = null;
                                    }
                                    jQuery.event.triggered = type;
                                    elem[type]();
                                }
                            } catch (ieError) {}
                            if (old) {
                                elem[ontype] = old;
                            }
                            jQuery.event.triggered = undefined;
                        }
                    }
                    return event.result;
                },
                handle: function(event) {
                    event = jQuery.event.fix(event || window.event);
                    var handlers = ((jQuery._data(this, "events") || {})[event.type] || [])
                        .slice(0),
                        run_all = !event.exclusive && !event.namespace,
                        args = Array.prototype.slice.call(arguments, 0);
                    args[0] = event;
                    event.currentTarget = this;
                    for (var j = 0, l = handlers.length; j < l; j++) {
                        var handleObj = handlers[j];
                        if (run_all || event.namespace_re.test(handleObj.namespace)) {
                            event.handler = handleObj.handler;
                            event.data = handleObj.data;
                            event.handleObj = handleObj;
                            var ret = handleObj.handler.apply(this, args);
                            if (ret !== undefined) {
                                event.result = ret;
                                if (ret === false) {
                                    event.preventDefault();
                                    event.stopPropagation();
                                }
                            }
                            if (event.isImmediatePropagationStopped()) {
                                break;
                            }
                        }
                    }
                    return event.result;
                },
                props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
                fix: function(event) {
                    if (event[jQuery.expando]) {
                        return event;
                    }
                    var originalEvent = event;
                    event = jQuery.Event(originalEvent);
                    for (var i = this.props.length, prop; i;) {
                        prop = this.props[--i];
                        event[prop] = originalEvent[prop];
                    }
                    if (!event.target) {
                        event.target = event.srcElement || document;
                    }
                    if (event.target.nodeType === 3) {
                        event.target = event.target.parentNode;
                    }
                    if (!event.relatedTarget && event.fromElement) {
                        event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;
                    }
                    if (event.pageX == null && event.clientX != null) {
                        var eventDocument = event.target.ownerDocument || document,
                            doc = eventDocument.documentElement,
                            body = eventDocument.body;
                        event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                        event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
                    }
                    if (event.which == null && (event.charCode != null || event.keyCode != null)) {
                        event.which = event.charCode != null ? event.charCode : event.keyCode;
                    }
                    if (!event.metaKey && event.ctrlKey) {
                        event.metaKey = event.ctrlKey;
                    }
                    if (!event.which && event.button !== undefined) {
                        event.which = (event.button & 1 ? 1 : (event.button & 2 ? 3 : (event.button & 4 ? 2 : 0)));
                    }
                    return event;
                },
                guid: 100000000,
                proxy: jQuery.proxy,
                special: {
                    ready: {
                        setup: jQuery.bindReady,
                        teardown: jQuery.noop
                    },
                    live: {
                        add: function(handleObj) {
                            jQuery.event.add(this, liveConvert(handleObj.origType, handleObj.selector), jQuery.extend({}, handleObj, {
                                handler: liveHandler,
                                guid: handleObj.handler.guid
                            }));
                        },
                        remove: function(handleObj) {
                            jQuery.event.remove(this, liveConvert(handleObj.origType, handleObj.selector), handleObj);
                        }
                    },
                    beforeunload: {
                        amazonOriginal: null,
                        setup: function(data, namespaces, eventHandle) {
                            if (jQuery.isWindow(this)) {
                                var f = function() {};
                                if (typeof this.onbeforeunload === "function") {
                                    f = jQuery.event.special.beforeunload.amazonOriginal = this.onbeforeunload;
                                }
                                this.onbeforeunload = function() {
                                    var args = Array.prototype.slice.call(arguments);
                                    f.apply(this, args);
                                    eventHandle.apply(this, args);
                                };
                            }
                        },
                        teardown: function(namespaces, eventHandle) {
                            this.onbeforeunload = jQuery.event.special.beforeunload.amazonOriginal;
                        }
                    }
                }
            };
            jQuery.removeEvent = document.removeEventListener ? function(elem, type, handle) {
                if (elem.removeEventListener) {
                    elem.removeEventListener(type, handle, false);
                }
            } : function(elem, type, handle) {
                if (elem.detachEvent) {
                    elem.detachEvent("on" + type, handle);
                }
            };
            jQuery.Event = function(src, props) {
                if (!this.preventDefault) {
                    return new jQuery.Event(src, props);
                }
                if (src && src.type) {
                    this.originalEvent = src;
                    this.type = src.type;
                    this.isDefaultPrevented = (src.defaultPrevented || src.returnValue === false || src.getPreventDefault && src.getPreventDefault()) ? returnTrue : returnFalse;
                } else {
                    this.type = src;
                }
                if (props) {
                    jQuery.extend(this, props);
                }
                this.timeStamp = jQuery.now();
                this[jQuery.expando] = true;
            };

            function returnFalse() {
                return false;
            }

            function returnTrue() {
                return true;
            }
            jQuery.Event.prototype = {
                preventDefault: function() {
                    this.isDefaultPrevented = returnTrue;
                    var e = this.originalEvent;
                    if (!e) {
                        return;
                    }
                    if (e.preventDefault) {
                        e.preventDefault();
                    } else {
                        e.returnValue = false;
                    }
                },
                stopPropagation: function() {
                    this.isPropagationStopped = returnTrue;
                    var e = this.originalEvent;
                    if (!e) {
                        return;
                    }
                    if (e.stopPropagation) {
                        e.stopPropagation();
                    }
                    e.cancelBubble = true;
                },
                stopImmediatePropagation: function() {
                    this.isImmediatePropagationStopped = returnTrue;
                    this.stopPropagation();
                },
                isDefaultPrevented: returnFalse,
                isPropagationStopped: returnFalse,
                isImmediatePropagationStopped: returnFalse
            };
            var withinElement = function(event) {
                    var related = event.relatedTarget,
                        inside = false,
                        eventType = event.type;
                    event.type = event.data;
                    if (related !== this) {
                        if (related) {
                            inside = jQuery.contains(this, related);
                        }
                        if (!inside) {
                            jQuery.event.handle.apply(this, arguments);
                            event.type = eventType;
                        }
                    }
                },
                delegate = function(event) {
                    event.type = event.data;
                    jQuery.event.handle.apply(this, arguments);
                };
            jQuery.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout"
            }, function(orig, fix) {
                jQuery.event.special[orig] = {
                    setup: function(data) {
                        jQuery.event.add(this, fix, data && data.selector ? delegate : withinElement, orig);
                    },
                    teardown: function(data) {
                        jQuery.event.remove(this, fix, data && data.selector ? delegate : withinElement);
                    }
                };
            });
            if (!jQuery.support.submitBubbles) {
                jQuery.event.special.submit = {
                    setup: function(data, namespaces) {
                        if (!jQuery.nodeName(this, "form")) {
                            jQuery.event.add(this, "click.specialSubmit", function(e) {
                                var elem = e.target,
                                    type = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.type : "";
                                if ((type === "submit" || type === "image") && jQuery(elem)
                                    .closest("form")
                                    .length) {
                                    trigger("submit", this, arguments);
                                }
                            });
                            jQuery.event.add(this, "keypress.specialSubmit", function(e) {
                                var elem = e.target,
                                    type = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.type : "";
                                if ((type === "text" || type === "password") && jQuery(elem)
                                    .closest("form")
                                    .length && e.keyCode === 13) {
                                    trigger("submit", this, arguments);
                                }
                            });
                        } else {
                            return false;
                        }
                    },
                    teardown: function(namespaces) {
                        jQuery.event.remove(this, ".specialSubmit");
                    }
                };
            }
            if (!jQuery.support.changeBubbles) {
                var changeFilters, getVal = function(elem) {
                        var type = jQuery.nodeName(elem, "input") ? elem.type : "",
                            val = elem.value;
                        if (type === "radio" || type === "checkbox") {
                            val = elem.checked;
                        } else {
                            if (type === "select-multiple") {
                                val = elem.selectedIndex > -1 ? jQuery.map(elem.options, function(elem) {
                                        return elem.selected;
                                    })
                                    .join("-") : "";
                            } else {
                                if (jQuery.nodeName(elem, "select")) {
                                    val = elem.selectedIndex;
                                }
                            }
                        }
                        return val;
                    },
                    testChange = function testChange(e) {
                        var elem = e.target,
                            data, val;
                        if (!rformElems.test(elem.nodeName) || elem.readOnly) {
                            return;
                        }
                        data = jQuery._data(elem, "_change_data");
                        val = getVal(elem);
                        if (e.type !== "focusout" || elem.type !== "radio") {
                            jQuery._data(elem, "_change_data", val);
                        }
                        if (data === undefined || val === data) {
                            return;
                        }
                        if (data != null || val) {
                            e.type = "change";
                            e.liveFired = undefined;
                            jQuery.event.trigger(e, arguments[1], elem);
                        }
                    };
                jQuery.event.special.change = {
                    filters: {
                        focusout: testChange,
                        beforedeactivate: testChange,
                        click: function(e) {
                            var elem = e.target,
                                type = jQuery.nodeName(elem, "input") ? elem.type : "";
                            if (type === "radio" || type === "checkbox" || jQuery.nodeName(elem, "select")) {
                                testChange.call(this, e);
                            }
                        },
                        keydown: function(e) {
                            var elem = e.target,
                                type = jQuery.nodeName(elem, "input") ? elem.type : "";
                            if ((e.keyCode === 13 && !jQuery.nodeName(elem, "textarea")) || (e.keyCode === 32 && (type === "checkbox" || type === "radio")) || type === "select-multiple") {
                                testChange.call(this, e);
                            }
                        },
                        beforeactivate: function(e) {
                            var elem = e.target;
                            jQuery._data(elem, "_change_data", getVal(elem));
                        }
                    },
                    setup: function(data, namespaces) {
                        if (this.type === "file") {
                            return false;
                        }
                        for (var type in changeFilters) {
                            jQuery.event.add(this, type + ".specialChange", changeFilters[type]);
                        }
                        return rformElems.test(this.nodeName);
                    },
                    teardown: function(namespaces) {
                        jQuery.event.remove(this, ".specialChange");
                        return rformElems.test(this.nodeName);
                    }
                };
                changeFilters = jQuery.event.special.change.filters;
                changeFilters.focus = changeFilters.beforeactivate;
            }

            function trigger(type, elem, args) {
                var event = jQuery.extend({}, args[0]);
                event.type = type;
                event.originalEvent = {};
                event.liveFired = undefined;
                jQuery.event.handle.call(elem, event);
                if (event.isDefaultPrevented()) {
                    args[0].preventDefault();
                }
            }
            if (!jQuery.support.focusinBubbles) {
                jQuery.each({
                    focus: "focusin",
                    blur: "focusout"
                }, function(orig, fix) {
                    var attaches = 0;
                    jQuery.event.special[fix] = {
                        setup: function() {
                            if (attaches++ === 0) {
                                document.addEventListener(orig, handler, true);
                            }
                        },
                        teardown: function() {
                            if (--attaches === 0) {
                                document.removeEventListener(orig, handler, true);
                            }
                        }
                    };

                    function handler(donor) {
                        var e = jQuery.event.fix(donor);
                        e.type = fix;
                        e.originalEvent = {};
                        jQuery.event.trigger(e, null, e.target);
                        if (e.isDefaultPrevented()) {
                            donor.preventDefault();
                        }
                    }
                });
            }
            jQuery.each(["bind", "one"], function(i, name) {
                jQuery.fn[name] = function(type, data, fn) {
                    var handler;
                    if (typeof type === "object") {
                        for (var key in type) {
                            this[name](key, data, type[key], fn);
                        }
                        return this;
                    }
                    if (arguments.length === 2 || data === false) {
                        fn = data;
                        data = undefined;
                    }
                    if (name === "one") {
                        handler = function(event) {
                            jQuery(this)
                                .unbind(event, handler);
                            return fn.apply(this, arguments);
                        };
                        handler.guid = fn.guid || jQuery.guid++;
                    } else {
                        handler = fn;
                    }
                    if (type === "unload" && name !== "one") {
                        this.one(type, data, fn);
                    } else {
                        for (var i = 0, l = this.length; i < l; i++) {
                            jQuery.event.add(this[i], type, handler, data);
                        }
                    }
                    return this;
                };
            });
            jQuery.fn.extend({
                unbind: function(type, fn) {
                    if (typeof type === "object" && !type.preventDefault) {
                        for (var key in type) {
                            this.unbind(key, type[key]);
                        }
                    } else {
                        for (var i = 0, l = this.length; i < l; i++) {
                            jQuery.event.remove(this[i], type, fn);
                        }
                    }
                    return this;
                },
                delegate: function(selector, types, data, fn) {
                    return this.live(types, data, fn, selector);
                },
                undelegate: function(selector, types, fn) {
                    if (arguments.length === 0) {
                        return this.unbind("live");
                    } else {
                        return this.die(types, null, fn, selector);
                    }
                },
                trigger: function(type, data) {
                    return this.each(function() {
                        jQuery.event.trigger(type, data, this);
                    });
                },
                triggerHandler: function(type, data) {
                    if (this[0]) {
                        return jQuery.event.trigger(type, data, this[0], true);
                    }
                },
                toggle: function(fn) {
                    var args = arguments,
                        guid = fn.guid || jQuery.guid++,
                        i = 0,
                        toggler = function(event) {
                            var lastToggle = (jQuery.data(this, "lastToggle" + fn.guid) || 0) % i;
                            jQuery.data(this, "lastToggle" + fn.guid, lastToggle + 1);
                            event.preventDefault();
                            return args[lastToggle].apply(this, arguments) || false;
                        };
                    toggler.guid = guid;
                    while (i < args.length) {
                        args[i++].guid = guid;
                    }
                    return this.click(toggler);
                },
                hover: function(fnOver, fnOut) {
                    return this.mouseenter(fnOver)
                        .mouseleave(fnOut || fnOver);
                }
            });
            var liveMap = {
                focus: "focusin",
                blur: "focusout",
                mouseenter: "mouseover",
                mouseleave: "mouseout"
            };
            jQuery.each(["live", "die"], function(i, name) {
                jQuery.fn[name] = function(types, data, fn, origSelector) {
                    var type, i = 0,
                        match, namespaces, preType, selector = origSelector || this.selector,
                        context = origSelector ? this : jQuery(this.context);
                    if (typeof types === "object" && !types.preventDefault) {
                        for (var key in types) {
                            context[name](key, data, types[key], selector);
                        }
                        return this;
                    }
                    if (name === "die" && !types && origSelector && origSelector.charAt(0) === ".") {
                        context.unbind(origSelector);
                        return this;
                    }
                    if (data === false || jQuery.isFunction(data)) {
                        fn = data || returnFalse;
                        data = undefined;
                    }
                    types = (types || "")
                        .split(" ");
                    while ((type = types[i++]) != null) {
                        match = rnamespaces.exec(type);
                        namespaces = "";
                        if (match) {
                            namespaces = match[0];
                            type = type.replace(rnamespaces, "");
                        }
                        if (type === "hover") {
                            types.push("mouseenter" + namespaces, "mouseleave" + namespaces);
                            continue;
                        }
                        preType = type;
                        if (liveMap[type]) {
                            types.push(liveMap[type] + namespaces);
                            type = type + namespaces;
                        } else {
                            type = (liveMap[type] || type) + namespaces;
                        }
                        if (name === "live") {
                            for (var j = 0, l = context.length; j < l; j++) {
                                jQuery.event.add(context[j], "live." + liveConvert(type, selector), {
                                    data: data,
                                    selector: selector,
                                    handler: fn,
                                    origType: type,
                                    origHandler: fn,
                                    preType: preType
                                });
                            }
                        } else {
                            context.unbind("live." + liveConvert(type, selector), fn);
                        }
                    }
                    return this;
                };
            });

            function liveHandler(event) {
                var stop, maxLevel, related, match, handleObj, elem, j, i, l, data, close, namespace, ret, elems = [],
                    selectors = [],
                    events = jQuery._data(this, "events");
                if (event.liveFired === this || !events || !events.live || event.target.disabled || event.button && event.type === "click") {
                    return;
                }
                if (event.namespace) {
                    namespace = new RegExp("(^|\\.)" + event.namespace.split(".")
                        .join("\\.(?:.*\\.)?") + "(\\.|$)");
                }
                event.liveFired = this;
                var live = events.live.slice(0);
                for (j = 0; j < live.length; j++) {
                    handleObj = live[j];
                    if (handleObj.origType.replace(rnamespaces, "") === event.type) {
                        selectors.push(handleObj.selector);
                    } else {
                        live.splice(j--, 1);
                    }
                }
                match = jQuery(event.target)
                    .closest(selectors, event.currentTarget);
                for (i = 0, l = match.length; i < l; i++) {
                    close = match[i];
                    for (j = 0; j < live.length; j++) {
                        handleObj = live[j];
                        if (close.selector === handleObj.selector && (!namespace || namespace.test(handleObj.namespace)) && !close.elem.disabled) {
                            elem = close.elem;
                            related = null;
                            if (handleObj.preType === "mouseenter" || handleObj.preType === "mouseleave") {
                                event.type = handleObj.preType;
                                related = jQuery(event.relatedTarget)
                                    .closest(handleObj.selector)[0];
                                if (related && jQuery.contains(elem, related)) {
                                    related = elem;
                                }
                            }
                            if (!related || related !== elem) {
                                elems.push({
                                    elem: elem,
                                    handleObj: handleObj,
                                    level: close.level
                                });
                            }
                        }
                    }
                }
                for (i = 0, l = elems.length; i < l; i++) {
                    match = elems[i];
                    if (maxLevel && match.level > maxLevel) {
                        break;
                    }
                    event.currentTarget = match.elem;
                    event.data = match.handleObj.data;
                    event.handleObj = match.handleObj;
                    ret = match.handleObj.origHandler.apply(match.elem, arguments);
                    if (ret === false || event.isPropagationStopped()) {
                        maxLevel = match.level;
                        if (ret === false) {
                            stop = false;
                        }
                        if (event.isImmediatePropagationStopped()) {
                            break;
                        }
                    }
                }
                return stop;
            }

            function liveConvert(type, selector) {
                return (type && type !== "*" ? type + "." : "") + selector.replace(rperiod, "`")
                    .replace(rspaces, "&");
            }
            jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error")
                .split(" "),
                function(i, name) {
                    jQuery.fn[name] = function(data, fn) {
                        if (fn == null) {
                            fn = data;
                            data = null;
                        }
                        return arguments.length > 0 ? this.bind(name, data, fn) : this.trigger(name);
                    };
                    if (jQuery.attrFn) {
                        jQuery.attrFn[name] = true;
                    }
                });
            /*!
             * Sizzle CSS Selector Engine
             *  Copyright 2011, The Dojo Foundation
             *  Released under the MIT, BSD, and GPL Licenses.
             *  More information: http://sizzlejs.com/
             */
            (function() {
                var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
                    done = 0,
                    toString = Object.prototype.toString,
                    hasDuplicate = false,
                    baseHasDuplicate = true,
                    rBackslash = /\\/g,
                    rNonWord = /\W/;
                [0, 0].sort(function() {
                    baseHasDuplicate = false;
                    return 0;
                });
                var Sizzle = function(selector, context, results, seed) {
                    results = results || [];
                    context = context || document;
                    var origContext = context;
                    if (context.nodeType !== 1 && context.nodeType !== 9) {
                        return [];
                    }
                    if (!selector || typeof selector !== "string") {
                        return results;
                    }
                    var m, set, checkSet, extra, ret, cur, pop, i, prune = true,
                        contextXML = Sizzle.isXML(context),
                        parts = [],
                        soFar = selector;
                    do {
                        chunker.exec("");
                        m = chunker.exec(soFar);
                        if (m) {
                            soFar = m[3];
                            parts.push(m[1]);
                            if (m[2]) {
                                extra = m[3];
                                break;
                            }
                        }
                    } while (m);
                    if (parts.length > 1 && origPOS.exec(selector)) {
                        if (parts.length === 2 && Expr.relative[parts[0]]) {
                            set = posProcess(parts[0] + parts[1], context);
                        } else {
                            set = Expr.relative[parts[0]] ? [context] : Sizzle(parts.shift(), context);
                            while (parts.length) {
                                selector = parts.shift();
                                if (Expr.relative[selector]) {
                                    selector += parts.shift();
                                }
                                set = posProcess(selector, set);
                            }
                        }
                    } else {
                        if (!seed && parts.length > 1 && context.nodeType === 9 && !contextXML && Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1])) {
                            ret = Sizzle.find(parts.shift(), context, contextXML);
                            context = ret.expr ? Sizzle.filter(ret.expr, ret.set)[0] : ret.set[0];
                        }
                        if (context) {
                            ret = seed ? {
                                expr: parts.pop(),
                                set: makeArray(seed)
                            } : Sizzle.find(parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML);
                            set = ret.expr ? Sizzle.filter(ret.expr, ret.set) : ret.set;
                            if (parts.length > 0) {
                                checkSet = makeArray(set);
                            } else {
                                prune = false;
                            }
                            while (parts.length) {
                                cur = parts.pop();
                                pop = cur;
                                if (!Expr.relative[cur]) {
                                    cur = "";
                                } else {
                                    pop = parts.pop();
                                }
                                if (pop == null) {
                                    pop = context;
                                }
                                Expr.relative[cur](checkSet, pop, contextXML);
                            }
                        } else {
                            checkSet = parts = [];
                        }
                    }
                    if (!checkSet) {
                        checkSet = set;
                    }
                    if (!checkSet) {
                        Sizzle.error(cur || selector);
                    }
                    if (toString.call(checkSet) === "[object Array]") {
                        if (!prune) {
                            results.push.apply(results, checkSet);
                        } else {
                            if (context && context.nodeType === 1) {
                                for (i = 0; checkSet[i] != null; i++) {
                                    if (checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i]))) {
                                        results.push(set[i]);
                                    }
                                }
                            } else {
                                for (i = 0; checkSet[i] != null; i++) {
                                    if (checkSet[i] && checkSet[i].nodeType === 1) {
                                        results.push(set[i]);
                                    }
                                }
                            }
                        }
                    } else {
                        makeArray(checkSet, results);
                    }
                    if (extra) {
                        Sizzle(extra, origContext, results, seed);
                        Sizzle.uniqueSort(results);
                    }
                    return results;
                };
                Sizzle.uniqueSort = function(results) {
                    if (sortOrder) {
                        hasDuplicate = baseHasDuplicate;
                        results.sort(sortOrder);
                        if (hasDuplicate) {
                            for (var i = 1; i < results.length; i++) {
                                if (results[i] === results[i - 1]) {
                                    results.splice(i--, 1);
                                }
                            }
                        }
                    }
                    return results;
                };
                Sizzle.matches = function(expr, set) {
                    return Sizzle(expr, null, null, set);
                };
                Sizzle.matchesSelector = function(node, expr) {
                    return Sizzle(expr, null, null, [node])
                        .length > 0;
                };
                Sizzle.find = function(expr, context, isXML) {
                    var set;
                    if (!expr) {
                        return [];
                    }
                    for (var i = 0, l = Expr.order.length; i < l; i++) {
                        var match, type = Expr.order[i];
                        if ((match = Expr.leftMatch[type].exec(expr))) {
                            var left = match[1];
                            match.splice(1, 1);
                            if (left.substr(left.length - 1) !== "\\") {
                                match[1] = (match[1] || "")
                                    .replace(rBackslash, "");
                                set = Expr.find[type](match, context, isXML);
                                if (set != null) {
                                    expr = expr.replace(Expr.match[type], "");
                                    break;
                                }
                            }
                        }
                    }
                    if (!set) {
                        set = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName("*") : [];
                    }
                    return {
                        set: set,
                        expr: expr
                    };
                };
                Sizzle.filter = function(expr, set, inplace, not) {
                    var match, anyFound, old = expr,
                        result = [],
                        curLoop = set,
                        isXMLFilter = set && set[0] && Sizzle.isXML(set[0]);
                    while (expr && set.length) {
                        for (var type in Expr.filter) {
                            if ((match = Expr.leftMatch[type].exec(expr)) != null && match[2]) {
                                var found, item, filter = Expr.filter[type],
                                    left = match[1];
                                anyFound = false;
                                match.splice(1, 1);
                                if (left.substr(left.length - 1) === "\\") {
                                    continue;
                                }
                                if (curLoop === result) {
                                    result = [];
                                }
                                if (Expr.preFilter[type]) {
                                    match = Expr.preFilter[type](match, curLoop, inplace, result, not, isXMLFilter);
                                    if (!match) {
                                        anyFound = found = true;
                                    } else {
                                        if (match === true) {
                                            continue;
                                        }
                                    }
                                }
                                if (match) {
                                    for (var i = 0;
                                        (item = curLoop[i]) != null; i++) {
                                        if (item) {
                                            found = filter(item, match, i, curLoop);
                                            var pass = not ^ !!found;
                                            if (inplace && found != null) {
                                                if (pass) {
                                                    anyFound = true;
                                                } else {
                                                    curLoop[i] = false;
                                                }
                                            } else {
                                                if (pass) {
                                                    result.push(item);
                                                    anyFound = true;
                                                }
                                            }
                                        }
                                    }
                                }
                                if (found !== undefined) {
                                    if (!inplace) {
                                        curLoop = result;
                                    }
                                    expr = expr.replace(Expr.match[type], "");
                                    if (!anyFound) {
                                        return [];
                                    }
                                    break;
                                }
                            }
                        }
                        if (expr === old) {
                            if (anyFound == null) {
                                Sizzle.error(expr);
                            } else {
                                break;
                            }
                        }
                        old = expr;
                    }
                    return curLoop;
                };
                Sizzle.error = function(msg) {
                    throw "Syntax error, unrecognized expression: " + msg;
                };
                var Expr = Sizzle.selectors = {
                    order: ["ID", "NAME", "TAG"],
                    match: {
                        ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                        CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                        NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                        ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                        TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                        CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                        POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                        PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
                    },
                    leftMatch: {},
                    attrMap: {
                        "class": "className",
                        "for": "htmlFor"
                    },
                    attrHandle: {
                        href: function(elem) {
                            return elem.getAttribute("href");
                        },
                        type: function(elem) {
                            return elem.getAttribute("type");
                        }
                    },
                    relative: {
                        "+": function(checkSet, part) {
                            var isPartStr = typeof part === "string",
                                isTag = isPartStr && !rNonWord.test(part),
                                isPartStrNotTag = isPartStr && !isTag;
                            if (isTag) {
                                part = part.toLowerCase();
                            }
                            for (var i = 0, l = checkSet.length, elem; i < l; i++) {
                                if ((elem = checkSet[i])) {
                                    while ((elem = elem.previousSibling) && elem.nodeType !== 1) {}
                                    checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ? elem || false : elem === part;
                                }
                            }
                            if (isPartStrNotTag) {
                                Sizzle.filter(part, checkSet, true);
                            }
                        },
                        ">": function(checkSet, part) {
                            var elem, isPartStr = typeof part === "string",
                                i = 0,
                                l = checkSet.length;
                            if (isPartStr && !rNonWord.test(part)) {
                                part = part.toLowerCase();
                                for (; i < l; i++) {
                                    elem = checkSet[i];
                                    if (elem) {
                                        var parent = elem.parentNode;
                                        checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
                                    }
                                }
                            } else {
                                for (; i < l; i++) {
                                    elem = checkSet[i];
                                    if (elem) {
                                        checkSet[i] = isPartStr ? elem.parentNode : elem.parentNode === part;
                                    }
                                }
                                if (isPartStr) {
                                    Sizzle.filter(part, checkSet, true);
                                }
                            }
                        },
                        "": function(checkSet, part, isXML) {
                            var nodeCheck, doneName = done++,
                                checkFn = dirCheck;
                            if (typeof part === "string" && !rNonWord.test(part)) {
                                part = part.toLowerCase();
                                nodeCheck = part;
                                checkFn = dirNodeCheck;
                            }
                            checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML);
                        },
                        "~": function(checkSet, part, isXML) {
                            var nodeCheck, doneName = done++,
                                checkFn = dirCheck;
                            if (typeof part === "string" && !rNonWord.test(part)) {
                                part = part.toLowerCase();
                                nodeCheck = part;
                                checkFn = dirNodeCheck;
                            }
                            checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML);
                        }
                    },
                    find: {
                        ID: function(match, context, isXML) {
                            if (typeof context.getElementById !== "undefined" && !isXML) {
                                var m = context.getElementById(match[1]);
                                return m && m.parentNode ? [m] : [];
                            }
                        },
                        NAME: function(match, context) {
                            if (typeof context.getElementsByName !== "undefined") {
                                var ret = [],
                                    results = context.getElementsByName(match[1]);
                                for (var i = 0, l = results.length; i < l; i++) {
                                    if (results[i].getAttribute("name") === match[1]) {
                                        ret.push(results[i]);
                                    }
                                }
                                return ret.length === 0 ? null : ret;
                            }
                        },
                        TAG: function(match, context) {
                            if (typeof context.getElementsByTagName !== "undefined") {
                                return context.getElementsByTagName(match[1]);
                            }
                        }
                    },
                    preFilter: {
                        CLASS: function(match, curLoop, inplace, result, not, isXML) {
                            match = " " + match[1].replace(rBackslash, "") + " ";
                            if (isXML) {
                                return match;
                            }
                            for (var i = 0, elem;
                                (elem = curLoop[i]) != null; i++) {
                                if (elem) {
                                    if (not ^ (elem.className && (" " + elem.className + " ")
                                            .replace(/[\t\n\r]/g, " ")
                                            .indexOf(match) >= 0)) {
                                        if (!inplace) {
                                            result.push(elem);
                                        }
                                    } else {
                                        if (inplace) {
                                            curLoop[i] = false;
                                        }
                                    }
                                }
                            }
                            return false;
                        },
                        ID: function(match) {
                            return match[1].replace(rBackslash, "");
                        },
                        TAG: function(match, curLoop) {
                            return match[1].replace(rBackslash, "")
                                .toLowerCase();
                        },
                        CHILD: function(match) {
                            if (match[1] === "nth") {
                                if (!match[2]) {
                                    Sizzle.error(match[0]);
                                }
                                match[2] = match[2].replace(/^\+|\s*/g, "");
                                var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" || !/\D/.test(match[2]) && "0n+" + match[2] || match[2]);
                                match[2] = (test[1] + (test[2] || 1)) - 0;
                                match[3] = test[3] - 0;
                            } else {
                                if (match[2]) {
                                    Sizzle.error(match[0]);
                                }
                            }
                            match[0] = done++;
                            return match;
                        },
                        ATTR: function(match, curLoop, inplace, result, not, isXML) {
                            var name = match[1] = match[1].replace(rBackslash, "");
                            if (!isXML && Expr.attrMap[name]) {
                                match[1] = Expr.attrMap[name];
                            }
                            match[4] = (match[4] || match[5] || "")
                                .replace(rBackslash, "");
                            if (match[2] === "~=") {
                                match[4] = " " + match[4] + " ";
                            }
                            return match;
                        },
                        PSEUDO: function(match, curLoop, inplace, result, not) {
                            if (match[1] === "not") {
                                if ((chunker.exec(match[3]) || "")
                                    .length > 1 || /^\w/.test(match[3])) {
                                    match[3] = Sizzle(match[3], null, null, curLoop);
                                } else {
                                    var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
                                    if (!inplace) {
                                        result.push.apply(result, ret);
                                    }
                                    return false;
                                }
                            } else {
                                if (Expr.match.POS.test(match[0]) || Expr.match.CHILD.test(match[0])) {
                                    return true;
                                }
                            }
                            return match;
                        },
                        POS: function(match) {
                            match.unshift(true);
                            return match;
                        }
                    },
                    filters: {
                        enabled: function(elem) {
                            return elem.disabled === false && elem.type !== "hidden";
                        },
                        disabled: function(elem) {
                            return elem.disabled === true;
                        },
                        checked: function(elem) {
                            return elem.checked === true;
                        },
                        selected: function(elem) {
                            if (elem.parentNode) {
                                elem.parentNode.selectedIndex;
                            }
                            return elem.selected === true;
                        },
                        parent: function(elem) {
                            return !!elem.firstChild;
                        },
                        empty: function(elem) {
                            return !elem.firstChild;
                        },
                        has: function(elem, i, match) {
                            return !!Sizzle(match[3], elem)
                                .length;
                        },
                        header: function(elem) {
                            return (/h\d/i)
                                .test(elem.nodeName);
                        },
                        text: function(elem) {
                            var attr = elem.getAttribute("type"),
                                type = elem.type;
                            return elem.nodeName.toLowerCase() === "input" && "text" === type && (attr === type || attr === null);
                        },
                        radio: function(elem) {
                            return elem.nodeName.toLowerCase() === "input" && "radio" === elem.type;
                        },
                        checkbox: function(elem) {
                            return elem.nodeName.toLowerCase() === "input" && "checkbox" === elem.type;
                        },
                        file: function(elem) {
                            return elem.nodeName.toLowerCase() === "input" && "file" === elem.type;
                        },
                        password: function(elem) {
                            return elem.nodeName.toLowerCase() === "input" && "password" === elem.type;
                        },
                        submit: function(elem) {
                            var name = elem.nodeName.toLowerCase();
                            return (name === "input" || name === "button") && "submit" === elem.type;
                        },
                        image: function(elem) {
                            return elem.nodeName.toLowerCase() === "input" && "image" === elem.type;
                        },
                        reset: function(elem) {
                            var name = elem.nodeName.toLowerCase();
                            return (name === "input" || name === "button") && "reset" === elem.type;
                        },
                        button: function(elem) {
                            var name = elem.nodeName.toLowerCase();
                            return name === "input" && "button" === elem.type || name === "button";
                        },
                        input: function(elem) {
                            return (/input|select|textarea|button/i)
                                .test(elem.nodeName);
                        },
                        focus: function(elem) {
                            return elem === elem.ownerDocument.activeElement;
                        }
                    },
                    setFilters: {
                        first: function(elem, i) {
                            return i === 0;
                        },
                        last: function(elem, i, match, array) {
                            return i === array.length - 1;
                        },
                        even: function(elem, i) {
                            return i % 2 === 0;
                        },
                        odd: function(elem, i) {
                            return i % 2 === 1;
                        },
                        lt: function(elem, i, match) {
                            return i < match[3] - 0;
                        },
                        gt: function(elem, i, match) {
                            return i > match[3] - 0;
                        },
                        nth: function(elem, i, match) {
                            return match[3] - 0 === i;
                        },
                        eq: function(elem, i, match) {
                            return match[3] - 0 === i;
                        }
                    },
                    filter: {
                        PSEUDO: function(elem, match, i, array) {
                            var name = match[1],
                                filter = Expr.filters[name];
                            if (filter) {
                                return filter(elem, i, match, array);
                            } else {
                                if (name === "contains") {
                                    return (elem.textContent || elem.innerText || Sizzle.getText([elem]) || "")
                                        .indexOf(match[3]) >= 0;
                                } else {
                                    if (name === "not") {
                                        var not = match[3];
                                        for (var j = 0, l = not.length; j < l; j++) {
                                            if (not[j] === elem) {
                                                return false;
                                            }
                                        }
                                        return true;
                                    } else {
                                        Sizzle.error(name);
                                    }
                                }
                            }
                        },
                        CHILD: function(elem, match) {
                            var type = match[1],
                                node = elem;
                            switch (type) {
                                case "only":
                                case "first":
                                    while ((node = node.previousSibling)) {
                                        if (node.nodeType === 1) {
                                            return false;
                                        }
                                    }
                                    if (type === "first") {
                                        return true;
                                    }
                                    node = elem;
                                case "last":
                                    while ((node = node.nextSibling)) {
                                        if (node.nodeType === 1) {
                                            return false;
                                        }
                                    }
                                    return true;
                                case "nth":
                                    var first = match[2],
                                        last = match[3];
                                    if (first === 1 && last === 0) {
                                        return true;
                                    }
                                    var doneName = match[0],
                                        parent = elem.parentNode;
                                    if (parent && (parent.sizcache !== doneName || !elem.nodeIndex)) {
                                        var count = 0;
                                        for (node = parent.firstChild; node; node = node.nextSibling) {
                                            if (node.nodeType === 1) {
                                                node.nodeIndex = ++count;
                                            }
                                        }
                                        parent.sizcache = doneName;
                                    }
                                    var diff = elem.nodeIndex - last;
                                    if (first === 0) {
                                        return diff === 0;
                                    } else {
                                        return (diff % first === 0 && diff / first >= 0);
                                    }
                            }
                        },
                        ID: function(elem, match) {
                            return elem.nodeType === 1 && elem.getAttribute("id") === match;
                        },
                        TAG: function(elem, match) {
                            return (match === "*" && elem.nodeType === 1) || elem.nodeName.toLowerCase() === match;
                        },
                        CLASS: function(elem, match) {
                            return (" " + (elem.className || elem.getAttribute("class")) + " ")
                                .indexOf(match) > -1;
                        },
                        ATTR: function(elem, match) {
                            var name = match[1],
                                result = Expr.attrHandle[name] ? Expr.attrHandle[name](elem) : elem[name] != null ? elem[name] : elem.getAttribute(name),
                                value = result + "",
                                type = match[2],
                                check = match[4];
                            return result == null ? type === "!=" : type === "=" ? value === check : type === "*=" ? value.indexOf(check) >= 0 : type === "~=" ? (" " + value + " ")
                                .indexOf(check) >= 0 : !check ? value && result !== false : type === "!=" ? value !== check : type === "^=" ? value.indexOf(check) === 0 : type === "$=" ? value.substr(value.length - check.length) === check : type === "|=" ? value === check || value.substr(0, check.length + 1) === check + "-" : false;
                        },
                        POS: function(elem, match, i, array) {
                            var name = match[2],
                                filter = Expr.setFilters[name];
                            if (filter) {
                                return filter(elem, i, match, array);
                            }
                        }
                    }
                };
                var origPOS = Expr.match.POS,
                    fescape = function(all, num) {
                        return "\\" + (num - 0 + 1);
                    };
                for (var type in Expr.match) {
                    Expr.match[type] = new RegExp(Expr.match[type].source + (/(?![^\[]*\])(?![^\(]*\))/.source));
                    Expr.leftMatch[type] = new RegExp(/(^(?:.|\r|\n)*?)/.source + Expr.match[type].source.replace(/\\(\d+)/g, fescape));
                }
                var makeArray = function(array, results) {
                    array = Array.prototype.slice.call(array, 0);
                    if (results) {
                        results.push.apply(results, array);
                        return results;
                    }
                    return array;
                };
                try {
                    Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType;
                } catch (e) {
                    makeArray = function(array, results) {
                        var i = 0,
                            ret = results || [];
                        if (toString.call(array) === "[object Array]") {
                            Array.prototype.push.apply(ret, array);
                        } else {
                            if (typeof array.length === "number") {
                                for (var l = array.length; i < l; i++) {
                                    ret.push(array[i]);
                                }
                            } else {
                                for (; array[i]; i++) {
                                    ret.push(array[i]);
                                }
                            }
                        }
                        return ret;
                    };
                }
                var sortOrder, siblingCheck;
                if (document.documentElement.compareDocumentPosition) {
                    sortOrder = function(a, b) {
                        if (a === b) {
                            hasDuplicate = true;
                            return 0;
                        }
                        if (!a.compareDocumentPosition || !b.compareDocumentPosition) {
                            return a.compareDocumentPosition ? -1 : 1;
                        }
                        return a.compareDocumentPosition(b) & 4 ? -1 : 1;
                    };
                } else {
                    sortOrder = function(a, b) {
                        if (a === b) {
                            hasDuplicate = true;
                            return 0;
                        } else {
                            if (a.sourceIndex && b.sourceIndex) {
                                return a.sourceIndex - b.sourceIndex;
                            }
                        }
                        var al, bl, ap = [],
                            bp = [],
                            aup = a.parentNode,
                            bup = b.parentNode,
                            cur = aup;
                        if (aup === bup) {
                            return siblingCheck(a, b);
                        } else {
                            if (!aup) {
                                return -1;
                            } else {
                                if (!bup) {
                                    return 1;
                                }
                            }
                        }
                        while (cur) {
                            ap.unshift(cur);
                            cur = cur.parentNode;
                        }
                        cur = bup;
                        while (cur) {
                            bp.unshift(cur);
                            cur = cur.parentNode;
                        }
                        al = ap.length;
                        bl = bp.length;
                        for (var i = 0; i < al && i < bl; i++) {
                            if (ap[i] !== bp[i]) {
                                return siblingCheck(ap[i], bp[i]);
                            }
                        }
                        return i === al ? siblingCheck(a, bp[i], -1) : siblingCheck(ap[i], b, 1);
                    };
                    siblingCheck = function(a, b, ret) {
                        if (a === b) {
                            return ret;
                        }
                        var cur = a.nextSibling;
                        while (cur) {
                            if (cur === b) {
                                return -1;
                            }
                            cur = cur.nextSibling;
                        }
                        return 1;
                    };
                }
                Sizzle.getText = function(elems) {
                    var ret = "",
                        elem;
                    for (var i = 0; elems[i]; i++) {
                        elem = elems[i];
                        if (elem.nodeType === 3 || elem.nodeType === 4) {
                            ret += elem.nodeValue;
                        } else {
                            if (elem.nodeType !== 8) {
                                ret += Sizzle.getText(elem.childNodes);
                            }
                        }
                    }
                    return ret;
                };
                (function() {
                    var form = document.createElement("div"),
                        id = "script" + (new Date())
                        .getTime(),
                        root = document.documentElement;
                    form.innerHTML = "<a name='" + id + "'/>";
                    root.insertBefore(form, root.firstChild);
                    if (document.getElementById(id)) {
                        Expr.find.ID = function(match, context, isXML) {
                            if (typeof context.getElementById !== "undefined" && !isXML) {
                                var m = context.getElementById(match[1]);
                                return m ? m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id")
                                    .nodeValue === match[1] ? [m] : undefined : [];
                            }
                        };
                        Expr.filter.ID = function(elem, match) {
                            var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                            return elem.nodeType === 1 && node && node.nodeValue === match;
                        };
                    }
                    root.removeChild(form);
                    root = form = null;
                })();
                (function() {
                    var div = document.createElement("div");
                    div.appendChild(document.createComment(""));
                    if (div.getElementsByTagName("*")
                        .length > 0) {
                        Expr.find.TAG = function(match, context) {
                            var results = context.getElementsByTagName(match[1]);
                            if (match[1] === "*") {
                                var tmp = [];
                                for (var i = 0; results[i]; i++) {
                                    if (results[i].nodeType === 1) {
                                        tmp.push(results[i]);
                                    }
                                }
                                results = tmp;
                            }
                            return results;
                        };
                    }
                    div.innerHTML = "<a href='#'></a>";
                    if (div.firstChild && typeof div.firstChild.getAttribute !== "undefined" && div.firstChild.getAttribute("href") !== "#") {
                        Expr.attrHandle.href = function(elem) {
                            return elem.getAttribute("href", 2);
                        };
                    }
                    div = null;
                })();
                if (document.querySelectorAll) {
                    (function() {
                        var oldSizzle = Sizzle,
                            div = document.createElement("div"),
                            id = "__sizzle__";
                        div.innerHTML = "<p class='TEST'></p>";
                        if (div.querySelectorAll && div.querySelectorAll(".TEST")
                            .length === 0) {
                            return;
                        }
                        Sizzle = function(query, context, extra, seed) {
                            context = context || document;
                            if (!seed && !Sizzle.isXML(context)) {
                                var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(query);
                                if (match && (context.nodeType === 1 || context.nodeType === 9)) {
                                    if (match[1]) {
                                        return makeArray(context.getElementsByTagName(query), extra);
                                    } else {
                                        if (match[2] && Expr.find.CLASS && context.getElementsByClassName) {
                                            return makeArray(context.getElementsByClassName(match[2]), extra);
                                        }
                                    }
                                }
                                if (context.nodeType === 9) {
                                    if (query === "body" && context.body) {
                                        return makeArray([context.body], extra);
                                    } else {
                                        if (match && match[3]) {
                                            var elem = context.getElementById(match[3]);
                                            if (elem && elem.parentNode) {
                                                if (elem.id === match[3]) {
                                                    return makeArray([elem], extra);
                                                }
                                            } else {
                                                return makeArray([], extra);
                                            }
                                        }
                                    }
                                    try {
                                        return makeArray(context.querySelectorAll(query), extra);
                                    } catch (qsaError) {}
                                } else {
                                    if (context.nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                                        var oldContext = context,
                                            old = context.getAttribute("id"),
                                            nid = old || id,
                                            hasParent = context.parentNode,
                                            relativeHierarchySelector = /^\s*[+~]/.test(query);
                                        if (!old) {
                                            context.setAttribute("id", nid);
                                        } else {
                                            nid = nid.replace(/'/g, "\\$&");
                                        }
                                        if (relativeHierarchySelector && hasParent) {
                                            context = context.parentNode;
                                        }
                                        try {
                                            if (!relativeHierarchySelector || hasParent) {
                                                return makeArray(context.querySelectorAll("[id='" + nid + "'] " + query), extra);
                                            }
                                        } catch (pseudoError) {} finally {
                                            if (!old) {
                                                oldContext.removeAttribute("id");
                                            }
                                        }
                                    }
                                }
                            }
                            return oldSizzle(query, context, extra, seed);
                        };
                        for (var prop in oldSizzle) {
                            Sizzle[prop] = oldSizzle[prop];
                        }
                        div = null;
                    })();
                }(function() {
                    var html = document.documentElement,
                        matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector;
                    if (matches) {
                        var disconnectedMatch = !matches.call(document.createElement("div"), "div"),
                            pseudoWorks = false;
                        try {
                            matches.call(document.documentElement, "[test!='']:sizzle");
                        } catch (pseudoError) {
                            pseudoWorks = true;
                        }
                        Sizzle.matchesSelector = function(node, expr) {
                            expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                            if (!Sizzle.isXML(node)) {
                                try {
                                    if (pseudoWorks || !Expr.match.PSEUDO.test(expr) && !/!=/.test(expr)) {
                                        var ret = matches.call(node, expr);
                                        if (ret || !disconnectedMatch || node.document && node.document.nodeType !== 11) {
                                            return ret;
                                        }
                                    }
                                } catch (e) {}
                            }
                            return Sizzle(expr, null, null, [node])
                                .length > 0;
                        };
                    }
                })();
                (function() {
                    var div = document.createElement("div");
                    div.innerHTML = "<div class='test e'></div><div class='test'></div>";
                    if (!div.getElementsByClassName || div.getElementsByClassName("e")
                        .length === 0) {
                        return;
                    }
                    div.lastChild.className = "e";
                    if (div.getElementsByClassName("e")
                        .length === 1) {
                        return;
                    }
                    Expr.order.splice(1, 0, "CLASS");
                    Expr.find.CLASS = function(match, context, isXML) {
                        if (typeof context.getElementsByClassName !== "undefined" && !isXML) {
                            return context.getElementsByClassName(match[1]);
                        }
                    };
                    div = null;
                })();

                function dirNodeCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
                    for (var i = 0, l = checkSet.length; i < l; i++) {
                        var elem = checkSet[i];
                        if (elem) {
                            var match = false;
                            elem = elem[dir];
                            while (elem) {
                                if (elem.sizcache === doneName) {
                                    match = checkSet[elem.sizset];
                                    break;
                                }
                                if (elem.nodeType === 1 && !isXML) {
                                    elem.sizcache = doneName;
                                    elem.sizset = i;
                                }
                                if (elem.nodeName.toLowerCase() === cur) {
                                    match = elem;
                                    break;
                                }
                                elem = elem[dir];
                            }
                            checkSet[i] = match;
                        }
                    }
                }

                function dirCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
                    for (var i = 0, l = checkSet.length; i < l; i++) {
                        var elem = checkSet[i];
                        if (elem) {
                            var match = false;
                            elem = elem[dir];
                            while (elem) {
                                if (elem.sizcache === doneName) {
                                    match = checkSet[elem.sizset];
                                    break;
                                }
                                if (elem.nodeType === 1) {
                                    if (!isXML) {
                                        elem.sizcache = doneName;
                                        elem.sizset = i;
                                    }
                                    if (typeof cur !== "string") {
                                        if (elem === cur) {
                                            match = true;
                                            break;
                                        }
                                    } else {
                                        if (Sizzle.filter(cur, [elem])
                                            .length > 0) {
                                            match = elem;
                                            break;
                                        }
                                    }
                                }
                                elem = elem[dir];
                            }
                            checkSet[i] = match;
                        }
                    }
                }
                if (document.documentElement.contains) {
                    Sizzle.contains = function(a, b) {
                        return a !== b && (a.contains ? a.contains(b) : true);
                    };
                } else {
                    if (document.documentElement.compareDocumentPosition) {
                        Sizzle.contains = function(a, b) {
                            return !!(a.compareDocumentPosition(b) & 16);
                        };
                    } else {
                        Sizzle.contains = function() {
                            return false;
                        };
                    }
                }
                Sizzle.isXML = function(elem) {
                    var documentElement = (elem ? elem.ownerDocument || elem : 0)
                        .documentElement;
                    return documentElement ? documentElement.nodeName !== "HTML" : false;
                };
                var posProcess = function(selector, context) {
                    var match, tmpSet = [],
                        later = "",
                        root = context.nodeType ? [context] : context;
                    while ((match = Expr.match.PSEUDO.exec(selector))) {
                        later += match[0];
                        selector = selector.replace(Expr.match.PSEUDO, "");
                    }
                    selector = Expr.relative[selector] ? selector + "*" : selector;
                    for (var i = 0, l = root.length; i < l; i++) {
                        Sizzle(selector, root[i], tmpSet);
                    }
                    return Sizzle.filter(later, tmpSet);
                };
                jQuery.find = Sizzle;
                jQuery.expr = Sizzle.selectors;
                jQuery.expr[":"] = jQuery.expr.filters;
                jQuery.unique = Sizzle.uniqueSort;
                jQuery.text = Sizzle.getText;
                jQuery.isXMLDoc = Sizzle.isXML;
                jQuery.contains = Sizzle.contains;
            })();
            var runtil = /Until$/,
                rparentsprev = /^(?:parents|prevUntil|prevAll)/,
                rmultiselector = /,/,
                isSimple = /^.[^:#\[\.,]*$/,
                slice = Array.prototype.slice,
                POS = jQuery.expr.match.POS,
                guaranteedUnique = {
                    children: true,
                    contents: true,
                    next: true,
                    prev: true
                };
            jQuery.fn.extend({
                find: function(selector) {
                    var self = this,
                        i, l;
                    if (typeof selector !== "string") {
                        return jQuery(selector)
                            .filter(function() {
                                for (i = 0, l = self.length; i < l; i++) {
                                    if (jQuery.contains(self[i], this)) {
                                        return true;
                                    }
                                }
                            });
                    }
                    var ret = this.pushStack("", "find", selector),
                        length, n, r;
                    for (i = 0, l = this.length; i < l; i++) {
                        length = ret.length;
                        jQuery.find(selector, this[i], ret);
                        if (i > 0) {
                            for (n = length; n < ret.length; n++) {
                                for (r = 0; r < length; r++) {
                                    if (ret[r] === ret[n]) {
                                        ret.splice(n--, 1);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    return ret;
                },
                has: function(target) {
                    var targets = jQuery(target);
                    return this.filter(function() {
                        for (var i = 0, l = targets.length; i < l; i++) {
                            if (jQuery.contains(this, targets[i])) {
                                return true;
                            }
                        }
                    });
                },
                not: function(selector) {
                    return this.pushStack(winnow(this, selector, false), "not", selector);
                },
                filter: function(selector) {
                    return this.pushStack(winnow(this, selector, true), "filter", selector);
                },
                is: function(selector) {
                    return !!selector && (typeof selector === "string" ? jQuery.filter(selector, this)
                        .length > 0 : this.filter(selector)
                        .length > 0);
                },
                closest: function(selectors, context) {
                    var ret = [],
                        i, l, cur = this[0];
                    if (jQuery.isArray(selectors)) {
                        var match, selector, matches = {},
                            level = 1;
                        if (cur && selectors.length) {
                            for (i = 0, l = selectors.length; i < l; i++) {
                                selector = selectors[i];
                                if (!matches[selector]) {
                                    matches[selector] = POS.test(selector) ? jQuery(selector, context || this.context) : selector;
                                }
                            }
                            while (cur && cur.ownerDocument && cur !== context) {
                                for (selector in matches) {
                                    match = matches[selector];
                                    if (match.jquery ? match.index(cur) > -1 : jQuery(cur)
                                        .is(match)) {
                                        ret.push({
                                            selector: selector,
                                            elem: cur,
                                            level: level
                                        });
                                    }
                                }
                                cur = cur.parentNode;
                                level++;
                            }
                        }
                        return ret;
                    }
                    var pos = POS.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
                    for (i = 0, l = this.length; i < l; i++) {
                        cur = this[i];
                        while (cur) {
                            if (pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors)) {
                                ret.push(cur);
                                break;
                            } else {
                                cur = cur.parentNode;
                                if (!cur || !cur.ownerDocument || cur === context || cur.nodeType === 11) {
                                    break;
                                }
                            }
                        }
                    }
                    ret = ret.length > 1 ? jQuery.unique(ret) : ret;
                    return this.pushStack(ret, "closest", selectors);
                },
                index: function(elem) {
                    if (!elem) {
                        return (this[0] && this[0].parentNode) ? this.prevAll()
                            .length : -1;
                    }
                    if (typeof elem === "string") {
                        return jQuery.inArray(this[0], jQuery(elem));
                    }
                    return jQuery.inArray(elem.jquery ? elem[0] : elem, this);
                },
                add: function(selector, context) {
                    var set = typeof selector === "string" ? jQuery(selector, context) : jQuery.makeArray(selector && selector.nodeType ? [selector] : selector),
                        all = jQuery.merge(this.get(), set);
                    return this.pushStack(isDisconnected(set[0]) || isDisconnected(all[0]) ? all : jQuery.unique(all));
                },
                andSelf: function() {
                    return this.add(this.prevObject);
                }
            });

            function isDisconnected(node) {
                return !node || !node.parentNode || node.parentNode.nodeType === 11;
            }
            jQuery.each({
                parent: function(elem) {
                    var parent = elem.parentNode;
                    return parent && parent.nodeType !== 11 ? parent : null;
                },
                parents: function(elem) {
                    return jQuery.dir(elem, "parentNode");
                },
                parentsUntil: function(elem, i, until) {
                    return jQuery.dir(elem, "parentNode", until);
                },
                next: function(elem) {
                    return jQuery.nth(elem, 2, "nextSibling");
                },
                prev: function(elem) {
                    return jQuery.nth(elem, 2, "previousSibling");
                },
                nextAll: function(elem) {
                    return jQuery.dir(elem, "nextSibling");
                },
                prevAll: function(elem) {
                    return jQuery.dir(elem, "previousSibling");
                },
                nextUntil: function(elem, i, until) {
                    return jQuery.dir(elem, "nextSibling", until);
                },
                prevUntil: function(elem, i, until) {
                    return jQuery.dir(elem, "previousSibling", until);
                },
                siblings: function(elem) {
                    return jQuery.sibling(elem.parentNode.firstChild, elem);
                },
                children: function(elem) {
                    return jQuery.sibling(elem.firstChild);
                },
                contents: function(elem) {
                    return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.makeArray(elem.childNodes);
                }
            }, function(name, fn) {
                jQuery.fn[name] = function(until, selector) {
                    var ret = jQuery.map(this, fn, until),
                        args = slice.call(arguments);
                    if (!runtil.test(name)) {
                        selector = until;
                    }
                    if (selector && typeof selector === "string") {
                        ret = jQuery.filter(selector, ret);
                    }
                    ret = this.length > 1 && !guaranteedUnique[name] ? jQuery.unique(ret) : ret;
                    if ((this.length > 1 || rmultiselector.test(selector)) && rparentsprev.test(name)) {
                        ret = ret.reverse();
                    }
                    return this.pushStack(ret, name, args.join(","));
                };
            });
            jQuery.extend({
                filter: function(expr, elems, not) {
                    if (not) {
                        expr = ":not(" + expr + ")";
                    }
                    return elems.length === 1 ? jQuery.find.matchesSelector(elems[0], expr) ? [elems[0]] : [] : jQuery.find.matches(expr, elems);
                },
                dir: function(elem, dir, until) {
                    var matched = [],
                        cur = elem[dir];
                    while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur)
                            .is(until))) {
                        if (cur.nodeType === 1) {
                            matched.push(cur);
                        }
                        cur = cur[dir];
                    }
                    return matched;
                },
                nth: function(cur, result, dir, elem) {
                    result = result || 1;
                    var num = 0;
                    for (; cur; cur = cur[dir]) {
                        if (cur.nodeType === 1 && ++num === result) {
                            break;
                        }
                    }
                    return cur;
                },
                sibling: function(n, elem) {
                    var r = [];
                    for (; n; n = n.nextSibling) {
                        if (n.nodeType === 1 && n !== elem) {
                            r.push(n);
                        }
                    }
                    return r;
                }
            });

            function winnow(elements, qualifier, keep) {
                qualifier = qualifier || 0;
                if (jQuery.isFunction(qualifier)) {
                    return jQuery.grep(elements, function(elem, i) {
                        var retVal = !!qualifier.call(elem, i, elem);
                        return retVal === keep;
                    });
                } else {
                    if (qualifier.nodeType) {
                        return jQuery.grep(elements, function(elem, i) {
                            return (elem === qualifier) === keep;
                        });
                    } else {
                        if (typeof qualifier === "string") {
                            var filtered = jQuery.grep(elements, function(elem) {
                                return elem.nodeType === 1;
                            });
                            if (isSimple.test(qualifier)) {
                                return jQuery.filter(qualifier, filtered, !keep);
                            } else {
                                qualifier = jQuery.filter(qualifier, filtered);
                            }
                        }
                    }
                }
                return jQuery.grep(elements, function(elem, i) {
                    return (jQuery.inArray(elem, qualifier) >= 0) === keep;
                });
            }
            var rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g,
                rleadingWhitespace = /^\s+/,
                rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
                rtagName = /<([\w:]+)/,
                rtbody = /<tbody/i,
                rhtml = /<|&#?\w+;/,
                rnocache = /<(?:script|object|embed|option|style)/i,
                rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
                rscriptType = /\/(java|ecma)script/i,
                rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
                wrapMap = {
                    option: [1, "<select multiple='multiple'>", "</select>"],
                    legend: [1, "<fieldset>", "</fieldset>"],
                    thead: [1, "<table>", "</table>"],
                    tr: [2, "<table><tbody>", "</tbody></table>"],
                    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                    col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                    area: [1, "<map>", "</map>"],
                    _default: [0, "", ""]
                };
            wrapMap.optgroup = wrapMap.option;
            wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
            wrapMap.th = wrapMap.td;
            if (!jQuery.support.htmlSerialize) {
                wrapMap._default = [1, "div<div>", "</div>"];
            }
            jQuery.fn.extend({
                text: function(text) {
                    if (jQuery.isFunction(text)) {
                        return this.each(function(i) {
                            var self = jQuery(this);
                            self.text(text.call(this, i, self.text()));
                        });
                    }
                    if (typeof text !== "object" && text !== undefined) {
                        return this.empty()
                            .append((this[0] && this[0].ownerDocument || document)
                                .createTextNode(text));
                    }
                    return jQuery.text(this);
                },
                wrapAll: function(html) {
                    if (jQuery.isFunction(html)) {
                        return this.each(function(i) {
                            jQuery(this)
                                .wrapAll(html.call(this, i));
                        });
                    }
                    if (this[0]) {
                        var wrap = jQuery(html, this[0].ownerDocument)
                            .eq(0)
                            .clone(true);
                        if (this[0].parentNode) {
                            wrap.insertBefore(this[0]);
                        }
                        wrap.map(function() {
                                var elem = this;
                                while (elem.firstChild && elem.firstChild.nodeType === 1) {
                                    elem = elem.firstChild;
                                }
                                return elem;
                            })
                            .append(this);
                    }
                    return this;
                },
                wrapInner: function(html) {
                    if (jQuery.isFunction(html)) {
                        return this.each(function(i) {
                            jQuery(this)
                                .wrapInner(html.call(this, i));
                        });
                    }
                    return this.each(function() {
                        var self = jQuery(this),
                            contents = self.contents();
                        if (contents.length) {
                            contents.wrapAll(html);
                        } else {
                            self.append(html);
                        }
                    });
                },
                wrap: function(html) {
                    return this.each(function() {
                        jQuery(this)
                            .wrapAll(html);
                    });
                },
                unwrap: function() {
                    return this.parent()
                        .each(function() {
                            if (!jQuery.nodeName(this, "body")) {
                                jQuery(this)
                                    .replaceWith(this.childNodes);
                            }
                        })
                        .end();
                },
                append: function() {
                    return this.domManip(arguments, true, function(elem) {
                        if (this.nodeType === 1) {
                            this.appendChild(elem);
                        }
                    });
                },
                prepend: function() {
                    return this.domManip(arguments, true, function(elem) {
                        if (this.nodeType === 1) {
                            this.insertBefore(elem, this.firstChild);
                        }
                    });
                },
                before: function() {
                    if (this[0] && this[0].parentNode) {
                        return this.domManip(arguments, false, function(elem) {
                            this.parentNode.insertBefore(elem, this);
                        });
                    } else {
                        if (arguments.length) {
                            var set = jQuery(arguments[0]);
                            set.push.apply(set, this.toArray());
                            return this.pushStack(set, "before", arguments);
                        }
                    }
                },
                after: function() {
                    if (this[0] && this[0].parentNode) {
                        return this.domManip(arguments, false, function(elem) {
                            this.parentNode.insertBefore(elem, this.nextSibling);
                        });
                    } else {
                        if (arguments.length) {
                            var set = this.pushStack(this, "after", arguments);
                            set.push.apply(set, jQuery(arguments[0])
                                .toArray());
                            return set;
                        }
                    }
                },
                remove: function(selector, keepData) {
                    for (var i = 0, elem;
                        (elem = this[i]) != null; i++) {
                        if (!selector || jQuery.filter(selector, [elem])
                            .length) {
                            if (!keepData && elem.nodeType === 1) {
                                jQuery.cleanData(elem.getElementsByTagName("*"));
                                jQuery.cleanData([elem]);
                            }
                            if (elem.parentNode) {
                                elem.parentNode.removeChild(elem);
                            }
                        }
                    }
                    return this;
                },
                empty: function() {
                    for (var i = 0, elem;
                        (elem = this[i]) != null; i++) {
                        if (elem.nodeType === 1) {
                            jQuery.cleanData(elem.getElementsByTagName("*"));
                        }
                        while (elem.firstChild) {
                            elem.removeChild(elem.firstChild);
                        }
                    }
                    return this;
                },
                clone: function(dataAndEvents, deepDataAndEvents) {
                    dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
                    deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
                    return this.map(function() {
                        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
                    });
                },
                html: function(value) {
                    if (value === undefined) {
                        return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(rinlinejQuery, "") : null;
                    } else {
                        if (typeof value === "string" && !rnocache.test(value) && (jQuery.support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                            value = value.replace(rxhtmlTag, "<$1></$2>");
                            try {
                                for (var i = 0, l = this.length; i < l; i++) {
                                    if (this[i].nodeType === 1) {
                                        jQuery.cleanData(this[i].getElementsByTagName("*"));
                                        this[i].innerHTML = value;
                                    }
                                }
                            } catch (e) {
                                this.empty()
                                    .append(value);
                            }
                        } else {
                            if (jQuery.isFunction(value)) {
                                this.each(function(i) {
                                    var self = jQuery(this);
                                    self.html(value.call(this, i, self.html()));
                                });
                            } else {
                                this.empty()
                                    .append(value);
                            }
                        }
                    }
                    return this;
                },
                replaceWith: function(value) {
                    if (this[0] && this[0].parentNode) {
                        if (jQuery.isFunction(value)) {
                            return this.each(function(i) {
                                var self = jQuery(this),
                                    old = self.html();
                                self.replaceWith(value.call(this, i, old));
                            });
                        }
                        if (typeof value !== "string") {
                            value = jQuery(value)
                                .detach();
                        }
                        return this.each(function() {
                            var next = this.nextSibling,
                                parent = this.parentNode;
                            jQuery(this)
                                .remove();
                            if (next) {
                                jQuery(next)
                                    .before(value);
                            } else {
                                jQuery(parent)
                                    .append(value);
                            }
                        });
                    } else {
                        return this.length ? this.pushStack(jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value) : this;
                    }
                },
                detach: function(selector) {
                    return this.remove(selector, true);
                },
                domManip: function(args, table, callback) {
                    var results, first, fragment, parent, value = args[0],
                        scripts = [];
                    if (!jQuery.support.checkClone && arguments.length === 3 && typeof value === "string" && rchecked.test(value)) {
                        return this.each(function() {
                            jQuery(this)
                                .domManip(args, table, callback, true);
                        });
                    }
                    if (jQuery.isFunction(value)) {
                        return this.each(function(i) {
                            var self = jQuery(this);
                            args[0] = value.call(this, i, table ? self.html() : undefined);
                            self.domManip(args, table, callback);
                        });
                    }
                    if (this[0]) {
                        parent = value && value.parentNode;
                        if (jQuery.support.parentNode && parent && parent.nodeType === 11 && parent.childNodes.length === this.length) {
                            results = {
                                fragment: parent
                            };
                        } else {
                            results = jQuery.buildFragment(args, this, scripts);
                        }
                        fragment = results.fragment;
                        if (fragment.childNodes.length === 1) {
                            first = fragment = fragment.firstChild;
                        } else {
                            first = fragment.firstChild;
                        }
                        if (first) {
                            table = table && jQuery.nodeName(first, "tr");
                            for (var i = 0, l = this.length, lastIndex = l - 1; i < l; i++) {
                                callback.call(table ? root(this[i], first) : this[i], results.cacheable || (l > 1 && i < lastIndex) ? jQuery.clone(fragment, true, true) : fragment);
                            }
                        }
                        if (scripts.length) {
                            jQuery.each(scripts, evalScript);
                        }
                    }
                    return this;
                }
            });

            function root(elem, cur) {
                return jQuery.nodeName(elem, "table") ? (elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody"))) : elem;
            }

            function cloneCopyEvent(src, dest) {
                if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
                    return;
                }
                var internalKey = jQuery.expando,
                    oldData = jQuery.data(src),
                    curData = jQuery.data(dest, oldData);
                if ((oldData = oldData[internalKey])) {
                    var events = oldData.events;
                    curData = curData[internalKey] = jQuery.extend({}, oldData);
                    if (events) {
                        delete curData.handle;
                        curData.events = {};
                        for (var type in events) {
                            for (var i = 0, l = events[type].length; i < l; i++) {
                                jQuery.event.add(dest, type + (events[type][i].namespace ? "." : "") + events[type][i].namespace, events[type][i], events[type][i].data);
                            }
                        }
                    }
                }
            }

            function cloneFixAttributes(src, dest) {
                var nodeName;
                if (dest.nodeType !== 1) {
                    return;
                }
                if (dest.clearAttributes) {
                    dest.clearAttributes();
                }
                if (dest.mergeAttributes) {
                    dest.mergeAttributes(src);
                }
                nodeName = dest.nodeName.toLowerCase();
                if (nodeName === "object") {
                    dest.outerHTML = src.outerHTML;
                } else {
                    if (nodeName === "input" && (src.type === "checkbox" || src.type === "radio")) {
                        if (src.checked) {
                            dest.defaultChecked = dest.checked = src.checked;
                        }
                        if (dest.value !== src.value) {
                            dest.value = src.value;
                        }
                    } else {
                        if (nodeName === "option") {
                            dest.selected = src.defaultSelected;
                        } else {
                            if (nodeName === "input" || nodeName === "textarea") {
                                dest.defaultValue = src.defaultValue;
                            }
                        }
                    }
                }
                dest.removeAttribute(jQuery.expando);
            }
            jQuery.buildFragment = function(args, nodes, scripts) {
                var fragment, cacheable, cacheresults, doc;
                if (nodes && nodes[0]) {
                    doc = nodes[0].ownerDocument || nodes[0];
                }
                if (!doc.createDocumentFragment) {
                    doc = document;
                }
                if (args.length === 1 && typeof args[0] === "string" && args[0].length < 512 && doc === document && args[0].charAt(0) === "<" && !rnocache.test(args[0]) && (jQuery.support.checkClone || !rchecked.test(args[0]))) {
                    cacheable = true;
                    cacheresults = jQuery.fragments[args[0]];
                    if (cacheresults && cacheresults !== 1) {
                        fragment = cacheresults;
                    }
                }
                if (!fragment) {
                    fragment = doc.createDocumentFragment();
                    jQuery.clean(args, doc, fragment, scripts);
                }
                if (cacheable) {
                    jQuery.fragments[args[0]] = cacheresults ? fragment : 1;
                }
                return {
                    fragment: fragment,
                    cacheable: cacheable
                };
            };
            jQuery.fragments = {};
            jQuery.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function(name, original) {
                jQuery.fn[name] = function(selector) {
                    var ret = [],
                        insert = jQuery(selector),
                        parent = this.length === 1 && this[0].parentNode;
                    if (parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1) {
                        insert[original](this[0]);
                        return this;
                    } else {
                        for (var i = 0, l = insert.length; i < l; i++) {
                            var elems = (i > 0 ? this.clone(true) : this)
                                .get();
                            jQuery(insert[i])[original](elems);
                            ret = ret.concat(elems);
                        }
                        return this.pushStack(ret, name, insert.selector);
                    }
                };
            });

            function getAll(elem) {
                if ("getElementsByTagName" in elem) {
                    return elem.getElementsByTagName("*");
                } else {
                    if ("querySelectorAll" in elem) {
                        return elem.querySelectorAll("*");
                    } else {
                        return [];
                    }
                }
            }

            function fixDefaultChecked(elem) {
                if (elem.type === "checkbox" || elem.type === "radio") {
                    elem.defaultChecked = elem.checked;
                }
            }

            function findInputs(elem) {
                if (jQuery.nodeName(elem, "input")) {
                    fixDefaultChecked(elem);
                } else {
                    if ("getElementsByTagName" in elem) {
                        jQuery.grep(elem.getElementsByTagName("input"), fixDefaultChecked);
                    }
                }
            }
            jQuery.extend({
                clone: function(elem, dataAndEvents, deepDataAndEvents) {
                    var clone = elem.cloneNode(true),
                        srcElements, destElements, i;
                    if ((!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
                        cloneFixAttributes(elem, clone);
                        srcElements = getAll(elem);
                        destElements = getAll(clone);
                        for (i = 0; srcElements[i];
                            ++i) {
                            if (destElements[i]) {
                                cloneFixAttributes(srcElements[i], destElements[i]);
                            }
                        }
                    }
                    if (dataAndEvents) {
                        cloneCopyEvent(elem, clone);
                        if (deepDataAndEvents) {
                            srcElements = getAll(elem);
                            destElements = getAll(clone);
                            for (i = 0; srcElements[i];
                                ++i) {
                                cloneCopyEvent(srcElements[i], destElements[i]);
                            }
                        }
                    }
                    srcElements = destElements = null;
                    return clone;
                },
                clean: function(elems, context, fragment, scripts) {
                    var checkScriptType;
                    context = context || document;
                    if (typeof context.createElement === "undefined") {
                        context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
                    }
                    var ret = [],
                        j;
                    for (var i = 0, elem;
                        (elem = elems[i]) != null; i++) {
                        if (typeof elem === "number") {
                            elem += "";
                        }
                        if (!elem) {
                            continue;
                        }
                        if (typeof elem === "string") {
                            if (!rhtml.test(elem)) {
                                elem = context.createTextNode(elem);
                            } else {
                                elem = elem.replace(rxhtmlTag, "<$1></$2>");
                                var tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase(),
                                    wrap = wrapMap[tag] || wrapMap._default,
                                    depth = wrap[0],
                                    div = context.createElement("div");
                                div.innerHTML = wrap[1] + elem + wrap[2];
                                while (depth--) {
                                    div = div.lastChild;
                                }
                                if (!jQuery.support.tbody) {
                                    var hasBody = rtbody.test(elem),
                                        tbody = tag === "table" && !hasBody ? div.firstChild && div.firstChild.childNodes : wrap[1] === "<table>" && !hasBody ? div.childNodes : [];
                                    for (j = tbody.length - 1; j >= 0;
                                        --j) {
                                        if (jQuery.nodeName(tbody[j], "tbody") && !tbody[j].childNodes.length) {
                                            tbody[j].parentNode.removeChild(tbody[j]);
                                        }
                                    }
                                }
                                if (!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem)) {
                                    div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]), div.firstChild);
                                }
                                elem = div.childNodes;
                            }
                        }
                        var len;
                        if (!jQuery.support.appendChecked) {
                            if (elem[0] && typeof(len = elem.length) === "number") {
                                for (j = 0; j < len; j++) {
                                    findInputs(elem[j]);
                                }
                            } else {
                                findInputs(elem);
                            }
                        }
                        if (elem.nodeType) {
                            ret.push(elem);
                        } else {
                            ret = jQuery.merge(ret, elem);
                        }
                    }
                    if (fragment) {
                        checkScriptType = function(elem) {
                            return !elem.type || rscriptType.test(elem.type);
                        };
                        for (i = 0; ret[i]; i++) {
                            if (scripts && jQuery.nodeName(ret[i], "script") && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript")) {
                                scripts.push(ret[i].parentNode ? ret[i].parentNode.removeChild(ret[i]) : ret[i]);
                            } else {
                                if (ret[i].nodeType === 1) {
                                    var jsTags = jQuery.grep(ret[i].getElementsByTagName("script"), checkScriptType);
                                    ret.splice.apply(ret, [i + 1, 0].concat(jsTags));
                                }
                                fragment.appendChild(ret[i]);
                            }
                        }
                    }
                    return ret;
                },
                cleanData: function(elems) {
                    var data, id, cache = jQuery.cache,
                        internalKey = jQuery.expando,
                        special = jQuery.event.special,
                        deleteExpando = jQuery.support.deleteExpando;
                    for (var i = 0, elem;
                        (elem = elems[i]) != null; i++) {
                        if (elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()]) {
                            continue;
                        }
                        id = elem[jQuery.expando];
                        if (id) {
                            data = cache[id] && cache[id][internalKey];
                            if (data && data.events) {
                                for (var type in data.events) {
                                    if (special[type]) {
                                        jQuery.event.remove(elem, type);
                                    } else {
                                        jQuery.removeEvent(elem, type, data.handle);
                                    }
                                }
                                if (data.handle) {
                                    data.handle.elem = null;
                                }
                            }
                            if (deleteExpando) {
                                delete elem[jQuery.expando];
                            } else {
                                if (elem.removeAttribute) {
                                    elem.removeAttribute(jQuery.expando);
                                }
                            }
                            delete cache[id];
                        }
                    }
                }
            });

            function evalScript(i, elem) {
                if (elem.src) {
                    jQuery.ajax({
                        url: elem.src,
                        async: false,
                        dataType: "script"
                    });
                } else {
                    jQuery.globalEval((elem.text || elem.textContent || elem.innerHTML || "")
                        .replace(rcleanScript, ""));
                }
                if (elem.parentNode) {
                    elem.parentNode.removeChild(elem);
                }
            }
            var ralpha = /alpha\([^)]*\)/i,
                ropacity = /opacity=([^)]*)/,
                rupper = /([A-Z]|^ms)/g,
                rnumpx = /^-?\d+(?:px)?$/i,
                rnum = /^-?\d/,
                rrelNum = /^([\-+])=([\-+.\de]+)/,
                cssShow = {
                    position: "absolute",
                    visibility: "hidden",
                    display: "block"
                },
                cssWidth = ["Left", "Right"],
                cssHeight = ["Top", "Bottom"],
                curCSS, getComputedStyle, currentStyle;
            jQuery.fn.css = function(name, value) {
                if (arguments.length === 2 && value === undefined) {
                    return this;
                }
                return jQuery.access(this, name, value, true, function(elem, name, value) {
                    return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
                });
            };
            jQuery.extend({
                cssHooks: {
                    opacity: {
                        get: function(elem, computed) {
                            if (computed) {
                                var ret = curCSS(elem, "opacity", "opacity");
                                return ret === "" ? "1" : ret;
                            } else {
                                return elem.style.opacity;
                            }
                        }
                    }
                },
                cssNumber: {
                    "fillOpacity": true,
                    "fontWeight": true,
                    "lineHeight": true,
                    "opacity": true,
                    "orphans": true,
                    "widows": true,
                    "zIndex": true,
                    "zoom": true
                },
                cssProps: {
                    "float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
                },
                style: function(elem, name, value, extra) {
                    if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                        return;
                    }
                    var ret, type, origName = jQuery.camelCase(name),
                        style = elem.style,
                        hooks = jQuery.cssHooks[origName];
                    name = jQuery.cssProps[origName] || origName;
                    if (value !== undefined) {
                        type = typeof value;
                        if (type === "string" && (ret = rrelNum.exec(value))) {
                            value = (+(ret[1] + 1) * +ret[2]) + parseFloat(jQuery.css(elem, name));
                            type = "number";
                        }
                        if (value == null || type === "number" && isNaN(value)) {
                            return;
                        }
                        if (type === "number" && !jQuery.cssNumber[origName]) {
                            value += "px";
                        }
                        if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value)) !== undefined) {
                            try {
                                style[name] = value;
                            } catch (e) {}
                        }
                    } else {
                        if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
                            return ret;
                        }
                        return style[name];
                    }
                },
                css: function(elem, name, extra) {
                    var ret, hooks;
                    name = jQuery.camelCase(name);
                    hooks = jQuery.cssHooks[name];
                    name = jQuery.cssProps[name] || name;
                    if (name === "cssFloat") {
                        name = "float";
                    }
                    if (hooks && "get" in hooks && (ret = hooks.get(elem, true, extra)) !== undefined) {
                        return ret;
                    } else {
                        if (curCSS) {
                            return curCSS(elem, name);
                        }
                    }
                },
                swap: function(elem, options, callback) {
                    var old = {};
                    for (var name in options) {
                        old[name] = elem.style[name];
                        elem.style[name] = options[name];
                    }
                    callback.call(elem);
                    for (name in options) {
                        elem.style[name] = old[name];
                    }
                }
            });
            jQuery.curCSS = jQuery.css;
            jQuery.each(["height", "width"], function(i, name) {
                jQuery.cssHooks[name] = {
                    get: function(elem, computed, extra) {
                        var val;
                        if (computed) {
                            if (elem.offsetWidth !== 0) {
                                return getWH(elem, name, extra);
                            } else {
                                jQuery.swap(elem, cssShow, function() {
                                    val = getWH(elem, name, extra);
                                });
                            }
                            return val;
                        }
                    },
                    set: function(elem, value) {
                        if (rnumpx.test(value)) {
                            value = parseFloat(value);
                            if (value >= 0) {
                                return value + "px";
                            }
                        } else {
                            return value;
                        }
                    }
                };
            });
            if (!jQuery.support.opacity) {
                jQuery.cssHooks.opacity = {
                    get: function(elem, computed) {
                        return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? (parseFloat(RegExp.$1) / 100) + "" : computed ? "1" : "";
                    },
                    set: function(elem, value) {
                        var style = elem.style,
                            currentStyle = elem.currentStyle,
                            opacity = jQuery.isNaN(value) ? "" : "alpha(opacity=" + value * 100 + ")",
                            filter = currentStyle && currentStyle.filter || style.filter || "";
                        style.zoom = 1;
                        if (value >= 1 && jQuery.trim(filter.replace(ralpha, "")) === "") {
                            style.removeAttribute("filter");
                            if (currentStyle && !currentStyle.filter) {
                                return;
                            }
                        }
                        style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity;
                    }
                };
            }
            jQuery(function() {
                if (!jQuery.support.reliableMarginRight) {
                    jQuery.cssHooks.marginRight = {
                        get: function(elem, computed) {
                            var ret;
                            jQuery.swap(elem, {
                                "display": "inline-block"
                            }, function() {
                                if (computed) {
                                    ret = curCSS(elem, "margin-right", "marginRight");
                                } else {
                                    ret = elem.style.marginRight;
                                }
                            });
                            return ret;
                        }
                    };
                }
            });
            if (document.defaultView && document.defaultView.getComputedStyle) {
                getComputedStyle = function(elem, name) {
                    var ret, defaultView, computedStyle;
                    name = name.replace(rupper, "-$1")
                        .toLowerCase();
                    if (!(defaultView = elem.ownerDocument.defaultView)) {
                        return undefined;
                    }
                    if ((computedStyle = defaultView.getComputedStyle(elem, null))) {
                        ret = computedStyle.getPropertyValue(name);
                        if (ret === "" && !jQuery.contains(elem.ownerDocument.documentElement, elem)) {
                            ret = jQuery.style(elem, name);
                        }
                    }
                    return ret;
                };
            }
            if (document.documentElement.currentStyle) {
                currentStyle = function(elem, name) {
                    var left, ret = elem.currentStyle && elem.currentStyle[name],
                        rsLeft = elem.runtimeStyle && elem.runtimeStyle[name],
                        style = elem.style;
                    if (!rnumpx.test(ret) && rnum.test(ret)) {
                        left = style.left;
                        if (rsLeft) {
                            elem.runtimeStyle.left = elem.currentStyle.left;
                        }
                        style.left = name === "fontSize" ? "1em" : (ret || 0);
                        ret = style.pixelLeft + "px";
                        style.left = left;
                        if (rsLeft) {
                            elem.runtimeStyle.left = rsLeft;
                        }
                    }
                    return ret === "" ? "auto" : ret;
                };
            }
            curCSS = getComputedStyle || currentStyle;

            function getWH(elem, name, extra) {
                var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
                    which = name === "width" ? cssWidth : cssHeight;
                if (val > 0) {
                    if (extra !== "border") {
                        jQuery.each(which, function() {
                            if (!extra) {
                                val -= parseFloat(jQuery.css(elem, "padding" + this)) || 0;
                            }
                            if (extra === "margin") {
                                val += parseFloat(jQuery.css(elem, extra + this)) || 0;
                            } else {
                                val -= parseFloat(jQuery.css(elem, "border" + this + "Width")) || 0;
                            }
                        });
                    }
                    return val + "px";
                }
                val = curCSS(elem, name, name);
                if (val < 0 || val == null) {
                    val = elem.style[name] || 0;
                }
                val = parseFloat(val) || 0;
                if (extra) {
                    jQuery.each(which, function() {
                        val += parseFloat(jQuery.css(elem, "padding" + this)) || 0;
                        if (extra !== "padding") {
                            val += parseFloat(jQuery.css(elem, "border" + this + "Width")) || 0;
                        }
                        if (extra === "margin") {
                            val += parseFloat(jQuery.css(elem, extra + this)) || 0;
                        }
                    });
                }
                return val + "px";
            }
            if (jQuery.expr && jQuery.expr.filters) {
                jQuery.expr.filters.hidden = function(elem) {
                    var width = elem.offsetWidth,
                        height = elem.offsetHeight;
                    return (width === 0 && height === 0) || (!jQuery.support.reliableHiddenOffsets && (elem.style.display || jQuery.css(elem, "display")) === "none");
                };
                jQuery.expr.filters.visible = function(elem) {
                    return !jQuery.expr.filters.hidden(elem);
                };
            }
            var r20 = /%20/g,
                rbracket = /\[\]$/,
                rCRLF = /\r?\n/g,
                rhash = /#.*$/,
                rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
                rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
                rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
                rnoContent = /^(?:GET|HEAD)$/,
                rprotocol = /^\/\//,
                rquery = /\?/,
                rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
                rselectTextarea = /^(?:select|textarea)/i,
                rspacesAjax = /\s+/,
                rts = /([?&])_=[^&]*/,
                rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
                _load = jQuery.fn.load,
                prefilters = {},
                transports = {},
                ajaxLocation, ajaxLocParts, allTypes = ["*/"] + ["*"];
            try {
                ajaxLocation = location.href;
            } catch (e) {
                ajaxLocation = document.createElement("a");
                ajaxLocation.href = "";
                ajaxLocation = ajaxLocation.href;
            }
            ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

            function addToPrefiltersOrTransports(structure) {
                return function(dataTypeExpression, func) {
                    if (typeof dataTypeExpression !== "string") {
                        func = dataTypeExpression;
                        dataTypeExpression = "*";
                    }
                    if (jQuery.isFunction(func)) {
                        var dataTypes = dataTypeExpression.toLowerCase()
                            .split(rspacesAjax),
                            i = 0,
                            length = dataTypes.length,
                            dataType, list, placeBefore;
                        for (; i < length; i++) {
                            dataType = dataTypes[i];
                            placeBefore = /^\+/.test(dataType);
                            if (placeBefore) {
                                dataType = dataType.substr(1) || "*";
                            }
                            list = structure[dataType] = structure[dataType] || [];
                            list[placeBefore ? "unshift" : "push"](func);
                        }
                    }
                };
            }

            function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, dataType, inspected) {
                dataType = dataType || options.dataTypes[0];
                inspected = inspected || {};
                inspected[dataType] = true;
                var list = structure[dataType],
                    i = 0,
                    length = list ? list.length : 0,
                    executeOnly = (structure === prefilters),
                    selection;
                for (; i < length && (executeOnly || !selection); i++) {
                    selection = list[i](options, originalOptions, jqXHR);
                    if (typeof selection === "string") {
                        if (!executeOnly || inspected[selection]) {
                            selection = undefined;
                        } else {
                            options.dataTypes.unshift(selection);
                            selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, selection, inspected);
                        }
                    }
                }
                if ((executeOnly || !selection) && !inspected["*"]) {
                    selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, "*", inspected);
                }
                return selection;
            }

            function ajaxExtend(target, src) {
                var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
                for (key in src) {
                    if (src[key] !== undefined) {
                        (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
                    }
                }
                if (deep) {
                    jQuery.extend(true, target, deep);
                }
            }
            jQuery.fn.extend({
                load: function(url, params, callback) {
                    if (typeof url !== "string" && _load) {
                        return _load.apply(this, arguments);
                    } else {
                        if (!this.length) {
                            return this;
                        }
                    }
                    var off = url.indexOf(" ");
                    if (off >= 0) {
                        var selector = url.slice(off, url.length);
                        url = url.slice(0, off);
                    }
                    var type = "GET";
                    if (params) {
                        if (jQuery.isFunction(params)) {
                            callback = params;
                            params = undefined;
                        } else {
                            if (typeof params === "object") {
                                params = jQuery.param(params, jQuery.ajaxSettings.traditional);
                                type = "POST";
                            }
                        }
                    }
                    var self = this;
                    jQuery.ajax({
                        url: url,
                        type: type,
                        dataType: "html",
                        data: params,
                        complete: function(jqXHR, status, responseText) {
                            responseText = jqXHR.responseText;
                            if (jqXHR.isResolved()) {
                                jqXHR.done(function(r) {
                                    responseText = r;
                                });
                                self.html(selector ? jQuery("<div>")
                                    .append(responseText.replace(rscript, ""))
                                    .find(selector) : responseText);
                            }
                            if (callback) {
                                self.each(callback, [responseText, status, jqXHR]);
                            }
                        }
                    });
                    return this;
                },
                serialize: function() {
                    return jQuery.param(this.serializeArray());
                },
                serializeArray: function() {
                    return this.map(function() {
                            return this.elements ? jQuery.makeArray(this.elements) : this;
                        })
                        .filter(function() {
                            return this.name && !this.disabled && (this.checked || rselectTextarea.test(this.nodeName) || rinput.test(this.type));
                        })
                        .map(function(i, elem) {
                            var val = jQuery(this)
                                .val();
                            return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val, i) {
                                return {
                                    name: elem.name,
                                    value: val.replace(rCRLF, "\r\n")
                                };
                            }) : {
                                name: elem.name,
                                value: val.replace(rCRLF, "\r\n")
                            };
                        })
                        .get();
                }
            });
            jQuery.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(i, o) {
                jQuery.fn[o] = function(f) {
                    return this.bind(o, f);
                };
            });
            jQuery.each(["get", "post"], function(i, method) {
                jQuery[method] = function(url, data, callback, type) {
                    if (jQuery.isFunction(data)) {
                        type = type || callback;
                        callback = data;
                        data = undefined;
                    }
                    return jQuery.ajax({
                        type: method,
                        url: url,
                        data: data,
                        success: callback,
                        dataType: type
                    });
                };
            });
            jQuery.extend({
                getScript: function(url, callback) {
                    return jQuery.get(url, undefined, callback, "script");
                },
                getJSON: function(url, data, callback) {
                    return jQuery.get(url, data, callback, "json");
                },
                ajaxSetup: function(target, settings) {
                    if (settings) {
                        ajaxExtend(target, jQuery.ajaxSettings);
                    } else {
                        settings = target;
                        target = jQuery.ajaxSettings;
                    }
                    ajaxExtend(target, settings);
                    return target;
                },
                ajaxSettings: {
                    url: ajaxLocation,
                    isLocal: rlocalProtocol.test(ajaxLocParts[1]),
                    global: true,
                    type: "GET",
                    contentType: "application/x-www-form-urlencoded",
                    processData: true,
                    async: true,
                    accepts: {
                        xml: "application/xml, text/xml",
                        html: "text/html",
                        text: "text/plain",
                        json: "application/json, text/javascript",
                        "*": allTypes
                    },
                    contents: {
                        xml: /xml/,
                        html: /html/,
                        json: /json/
                    },
                    responseFields: {
                        xml: "responseXML",
                        text: "responseText"
                    },
                    converters: {
                        "* text": window.String,
                        "text html": true,
                        "text json": jQuery.parseJSON,
                        "text xml": jQuery.parseXML
                    },
                    flatOptions: {
                        context: true,
                        url: true
                    }
                },
                ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
                ajaxTransport: addToPrefiltersOrTransports(transports),
                ajax: function(url, options) {
                    if (typeof url === "object") {
                        options = url;
                        url = undefined;
                    }
                    options = options || {};
                    var s = jQuery.ajaxSetup({}, options),
                        callbackContext = s.context || s,
                        globalEventContext = callbackContext !== s && (callbackContext.nodeType || callbackContext instanceof jQuery) ? jQuery(callbackContext) : jQuery.event,
                        deferred = jQuery.Deferred(),
                        completeDeferred = jQuery._Deferred(),
                        statusCode = s.statusCode || {},
                        ifModifiedKey, requestHeaders = {},
                        requestHeadersNames = {},
                        responseHeadersString, responseHeaders, transport, timeoutTimer, parts, state = 0,
                        fireGlobals, i, jqXHR = {
                            readyState: 0,
                            setRequestHeader: function(name, value) {
                                if (!state) {
                                    var lname = name.toLowerCase();
                                    name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                                    requestHeaders[name] = value;
                                }
                                return this;
                            },
                            getAllResponseHeaders: function() {
                                return state === 2 ? responseHeadersString : null;
                            },
                            getResponseHeader: function(key) {
                                var match;
                                if (state === 2) {
                                    if (!responseHeaders) {
                                        responseHeaders = {};
                                        while ((match = rheaders.exec(responseHeadersString))) {
                                            responseHeaders[match[1].toLowerCase()] = match[2];
                                        }
                                    }
                                    match = responseHeaders[key.toLowerCase()];
                                }
                                return match === undefined ? null : match;
                            },
                            overrideMimeType: function(type) {
                                if (!state) {
                                    s.mimeType = type;
                                }
                                return this;
                            },
                            abort: function(statusText) {
                                statusText = statusText || "abort";
                                if (transport) {
                                    transport.abort(statusText);
                                }
                                done(0, statusText);
                                return this;
                            }
                        };

                    function done(status, nativeStatusText, responses, headers) {
                        if (state === 2) {
                            return;
                        }
                        state = 2;
                        if (timeoutTimer) {
                            clearTimeout(timeoutTimer);
                        }
                        transport = undefined;
                        responseHeadersString = headers || "";
                        jqXHR.readyState = status > 0 ? 4 : 0;
                        var isSuccess, success, error, statusText = nativeStatusText,
                            response = responses ? ajaxHandleResponses(s, jqXHR, responses) : undefined,
                            lastModified, etag;
                        if (status >= 200 && status < 300 || status === 304) {
                            if (s.ifModified) {
                                if ((lastModified = jqXHR.getResponseHeader("Last-Modified"))) {
                                    jQuery.lastModified[ifModifiedKey] = lastModified;
                                }
                                if ((etag = jqXHR.getResponseHeader("Etag"))) {
                                    jQuery.etag[ifModifiedKey] = etag;
                                }
                            }
                            if (status === 304) {
                                statusText = "notmodified";
                                isSuccess = true;
                            } else {
                                try {
                                    success = ajaxConvert(s, response);
                                    statusText = "success";
                                    isSuccess = true;
                                } catch (e) {
                                    statusText = "parsererror";
                                    error = e;
                                }
                            }
                        } else {
                            error = statusText;
                            if (!statusText || status) {
                                statusText = "error";
                                if (status < 0) {
                                    status = 0;
                                }
                            }
                        }
                        jqXHR.status = status;
                        jqXHR.statusText = "" + (nativeStatusText || statusText);
                        if (isSuccess) {
                            deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
                        } else {
                            deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
                        }
                        jqXHR.statusCode(statusCode);
                        statusCode = undefined;
                        if (fireGlobals) {
                            globalEventContext.trigger("ajax" + (isSuccess ? "Success" : "Error"), [jqXHR, s, isSuccess ? success : error]);
                        }
                        completeDeferred.resolveWith(callbackContext, [jqXHR, statusText]);
                        if (fireGlobals) {
                            globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                            if (!(--jQuery.active)) {
                                jQuery.event.trigger("ajaxStop");
                            }
                        }
                    }
                    deferred.promise(jqXHR);
                    jqXHR.success = jqXHR.done;
                    jqXHR.error = jqXHR.fail;
                    jqXHR.complete = completeDeferred.done;
                    jqXHR.statusCode = function(map) {
                        if (map) {
                            var tmp;
                            if (state < 2) {
                                for (tmp in map) {
                                    statusCode[tmp] = [statusCode[tmp], map[tmp]];
                                }
                            } else {
                                tmp = map[jqXHR.status];
                                jqXHR.then(tmp, tmp);
                            }
                        }
                        return this;
                    };
                    s.url = ((url || s.url) + "")
                        .replace(rhash, "")
                        .replace(rprotocol, ajaxLocParts[1] + "//");
                    s.dataTypes = jQuery.trim(s.dataType || "*")
                        .toLowerCase()
                        .split(rspacesAjax);
                    if (s.crossDomain == null) {
                        parts = rurl.exec(s.url.toLowerCase());
                        s.crossDomain = !!(parts && (parts[1] != ajaxLocParts[1] || parts[2] != ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? 80 : 443)) != (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? 80 : 443))));
                    }
                    if (s.data && s.processData && typeof s.data !== "string") {
                        s.data = jQuery.param(s.data, s.traditional);
                    }
                    inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
                    if (state === 2) {
                        return false;
                    }
                    fireGlobals = s.global;
                    s.type = s.type.toUpperCase();
                    s.hasContent = !rnoContent.test(s.type);
                    if (fireGlobals && jQuery.active++ === 0) {
                        jQuery.event.trigger("ajaxStart");
                    }
                    if (!s.hasContent) {
                        if (s.data) {
                            s.url += (rquery.test(s.url) ? "&" : "?") + s.data;
                            delete s.data;
                        }
                        ifModifiedKey = s.url;
                        if (s.cache === false) {
                            var ts = jQuery.now(),
                                ret = s.url.replace(rts, "$1_=" + ts);
                            s.url = ret + ((ret === s.url) ? (rquery.test(s.url) ? "&" : "?") + "_=" + ts : "");
                        }
                    }
                    if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                        jqXHR.setRequestHeader("Content-Type", s.contentType);
                    }
                    if (s.ifModified) {
                        ifModifiedKey = ifModifiedKey || s.url;
                        if (jQuery.lastModified[ifModifiedKey]) {
                            jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[ifModifiedKey]);
                        }
                        if (jQuery.etag[ifModifiedKey]) {
                            jqXHR.setRequestHeader("If-None-Match", jQuery.etag[ifModifiedKey]);
                        }
                    }
                    jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
                    for (i in s.headers) {
                        jqXHR.setRequestHeader(i, s.headers[i]);
                    }
                    if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
                        jqXHR.abort();
                        return false;
                    }
                    for (i in {
                            success: 1,
                            error: 1,
                            complete: 1
                        }) {
                        jqXHR[i](s[i]);
                    }
                    transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
                    if (!transport) {
                        done(-1, "No Transport");
                    } else {
                        jqXHR.readyState = 1;
                        if (fireGlobals) {
                            globalEventContext.trigger("ajaxSend", [jqXHR, s]);
                        }
                        if (s.async && s.timeout > 0) {
                            timeoutTimer = setTimeout(function() {
                                jqXHR.abort("timeout");
                            }, s.timeout);
                        }
                        try {
                            state = 1;
                            transport.send(requestHeaders, done);
                        } catch (e) {
                            if (state < 2) {
                                done(-1, e);
                            } else {
                                jQuery.error(e);
                            }
                        }
                    }
                    return jqXHR;
                },
                param: function(a, traditional) {
                    var s = [],
                        add = function(key, value) {
                            value = jQuery.isFunction(value) ? value() : value;
                            s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
                        };
                    if (traditional === undefined) {
                        traditional = jQuery.ajaxSettings.traditional;
                    }
                    if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
                        jQuery.each(a, function() {
                            add(this.name, this.value);
                        });
                    } else {
                        for (var prefix in a) {
                            buildParams(prefix, a[prefix], traditional, add);
                        }
                    }
                    return s.join("&")
                        .replace(r20, "+");
                }
            });

            function buildParams(prefix, obj, traditional, add) {
                if (jQuery.isArray(obj)) {
                    jQuery.each(obj, function(i, v) {
                        if (traditional || rbracket.test(prefix)) {
                            add(prefix, v);
                        } else {
                            buildParams(prefix + "[" + (typeof v === "object" || jQuery.isArray(v) ? i : "") + "]", v, traditional, add);
                        }
                    });
                } else {
                    if (!traditional && obj != null && typeof obj === "object") {
                        for (var name in obj) {
                            buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
                        }
                    } else {
                        add(prefix, obj);
                    }
                }
            }
            jQuery.extend({
                active: 0,
                lastModified: {},
                etag: {}
            });

            function ajaxHandleResponses(s, jqXHR, responses) {
                var contents = s.contents,
                    dataTypes = s.dataTypes,
                    responseFields = s.responseFields,
                    ct, type, finalDataType, firstDataType;
                for (type in responseFields) {
                    if (type in responses) {
                        jqXHR[responseFields[type]] = responses[type];
                    }
                }
                while (dataTypes[0] === "*") {
                    dataTypes.shift();
                    if (ct === undefined) {
                        ct = s.mimeType || jqXHR.getResponseHeader("content-type");
                    }
                }
                if (ct) {
                    for (type in contents) {
                        if (contents[type] && contents[type].test(ct)) {
                            dataTypes.unshift(type);
                            break;
                        }
                    }
                }
                if (dataTypes[0] in responses) {
                    finalDataType = dataTypes[0];
                } else {
                    for (type in responses) {
                        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                            finalDataType = type;
                            break;
                        }
                        if (!firstDataType) {
                            firstDataType = type;
                        }
                    }
                    finalDataType = finalDataType || firstDataType;
                }
                if (finalDataType) {
                    if (finalDataType !== dataTypes[0]) {
                        dataTypes.unshift(finalDataType);
                    }
                    return responses[finalDataType];
                }
            }

            function ajaxConvert(s, response) {
                if (s.dataFilter) {
                    response = s.dataFilter(response, s.dataType);
                }
                var dataTypes = s.dataTypes,
                    converters = {},
                    i, key, length = dataTypes.length,
                    tmp, current = dataTypes[0],
                    prev, conversion, conv, conv1, conv2;
                for (i = 1; i < length; i++) {
                    if (i === 1) {
                        for (key in s.converters) {
                            if (typeof key === "string") {
                                converters[key.toLowerCase()] = s.converters[key];
                            }
                        }
                    }
                    prev = current;
                    current = dataTypes[i];
                    if (current === "*") {
                        current = prev;
                    } else {
                        if (prev !== "*" && prev !== current) {
                            conversion = prev + " " + current;
                            conv = converters[conversion] || converters["* " + current];
                            if (!conv) {
                                conv2 = undefined;
                                for (conv1 in converters) {
                                    tmp = conv1.split(" ");
                                    if (tmp[0] === prev || tmp[0] === "*") {
                                        conv2 = converters[tmp[1] + " " + current];
                                        if (conv2) {
                                            conv1 = converters[conv1];
                                            if (conv1 === true) {
                                                conv = conv2;
                                            } else {
                                                if (conv2 === true) {
                                                    conv = conv1;
                                                }
                                            }
                                            break;
                                        }
                                    }
                                }
                            }
                            if (!(conv || conv2)) {
                                jQuery.error("No conversion from " + conversion.replace(" ", " to "));
                            }
                            if (conv !== true) {
                                response = conv ? conv(response) : conv2(conv1(response));
                            }
                        }
                    }
                }
                return response;
            }
            var jsc = jQuery.now(),
                jsre = /(\=)\?(&|$)|\?\?/i;
            jQuery.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function() {
                    return jQuery.expando + "_" + (jsc++);
                }
            });
            jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
                var inspectData = s.contentType === "application/x-www-form-urlencoded" && (typeof s.data === "string");
                if (s.dataTypes[0] === "jsonp" || s.jsonp !== false && (jsre.test(s.url) || inspectData && jsre.test(s.data))) {
                    var responseContainer, jsonpCallback = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback,
                        previous = window[jsonpCallback],
                        url = s.url,
                        data = s.data,
                        replace = "$1" + jsonpCallback + "$2";
                    if (s.jsonp !== false) {
                        url = url.replace(jsre, replace);
                        if (s.url === url) {
                            if (inspectData) {
                                data = data.replace(jsre, replace);
                            }
                            if (s.data === data) {
                                url += (/\?/.test(url) ? "&" : "?") + s.jsonp + "=" + jsonpCallback;
                            }
                        }
                    }
                    s.url = url;
                    s.data = data;
                    window[jsonpCallback] = function(response) {
                        responseContainer = [response];
                    };
                    jqXHR.always(function() {
                        window[jsonpCallback] = previous;
                        if (responseContainer && jQuery.isFunction(previous)) {
                            window[jsonpCallback](responseContainer[0]);
                        }
                    });
                    s.converters["script json"] = function() {
                        if (!responseContainer) {
                            jQuery.error(jsonpCallback + " was not called");
                        }
                        return responseContainer[0];
                    };
                    s.dataTypes[0] = "json";
                    return "script";
                }
            });
            jQuery.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /javascript|ecmascript/
                },
                converters: {
                    "text script": function(text) {
                        jQuery.globalEval(text);
                        return text;
                    }
                }
            });
            jQuery.ajaxPrefilter("script", function(s) {
                if (s.cache === undefined) {
                    s.cache = false;
                }
                if (s.crossDomain) {
                    s.type = "GET";
                    s.global = false;
                }
            });
            jQuery.ajaxTransport("script", function(s) {
                if (s.crossDomain) {
                    var script, head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
                    return {
                        send: function(_, callback) {
                            script = document.createElement("script");
                            script.async = "async";
                            if (s.scriptCharset) {
                                script.charset = s.scriptCharset;
                            }
                            script.src = s.url;
                            script.onload = script.onreadystatechange = function(_, isAbort) {
                                if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
                                    script.onload = script.onreadystatechange = null;
                                    if (head && script.parentNode) {
                                        head.removeChild(script);
                                    }
                                    script = undefined;
                                    if (!isAbort) {
                                        callback(200, "success");
                                    }
                                }
                            };
                            head.insertBefore(script, head.firstChild);
                        },
                        abort: function() {
                            if (script) {
                                script.onload(0, 1);
                            }
                        }
                    };
                }
            });
            var xhrOnUnloadAbort = window.ActiveXObject ? function() {
                    for (var key in xhrCallbacks) {
                        xhrCallbacks[key](0, 1);
                    }
                } : false,
                xhrId = 0,
                xhrCallbacks;

            function createStandardXHR() {
                try {
                    return new window.XMLHttpRequest();
                } catch (e) {}
            }

            function createActiveXHR() {
                try {
                    return new window.ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
            }
            jQuery.ajaxSettings.xhr = window.ActiveXObject ? function() {
                return !this.isLocal && createStandardXHR() || createActiveXHR();
            } : createStandardXHR;
            (function(xhr) {
                jQuery.extend(jQuery.support, {
                    ajax: !!xhr,
                    cors: !!xhr && ("withCredentials" in xhr)
                });
            })(jQuery.ajaxSettings.xhr());
            if (jQuery.support.ajax) {
                jQuery.ajaxTransport(function(s) {
                    if (!s.crossDomain || jQuery.support.cors) {
                        var callback;
                        return {
                            send: function(headers, complete) {
                                var xhr = s.xhr(),
                                    handle, i;
                                if (s.username) {
                                    xhr.open(s.type, s.url, s.async, s.username, s.password);
                                } else {
                                    xhr.open(s.type, s.url, s.async);
                                }
                                if (s.xhrFields) {
                                    for (i in s.xhrFields) {
                                        xhr[i] = s.xhrFields[i];
                                    }
                                }
                                if (s.mimeType && xhr.overrideMimeType) {
                                    xhr.overrideMimeType(s.mimeType);
                                }
                                if (!s.crossDomain && !headers["X-Requested-With"]) {
                                    headers["X-Requested-With"] = "XMLHttpRequest";
                                }
                                try {
                                    for (i in headers) {
                                        xhr.setRequestHeader(i, headers[i]);
                                    }
                                } catch (_) {}
                                xhr.send((s.hasContent && s.data) || null);
                                callback = function(_, isAbort) {
                                    var status, statusText, responseHeaders, responses, xml;
                                    try {
                                        if (callback && (isAbort || xhr.readyState === 4)) {
                                            callback = undefined;
                                            if (handle) {
                                                xhr.onreadystatechange = jQuery.noop;
                                                if (xhrOnUnloadAbort) {
                                                    delete xhrCallbacks[handle];
                                                }
                                            }
                                            if (isAbort) {
                                                if (xhr.readyState !== 4) {
                                                    xhr.abort();
                                                }
                                            } else {
                                                status = xhr.status;
                                                responseHeaders = xhr.getAllResponseHeaders();
                                                responses = {};
                                                xml = xhr.responseXML;
                                                if (xml && xml.documentElement) {
                                                    responses.xml = xml;
                                                }
                                                responses.text = xhr.responseText;
                                                try {
                                                    statusText = xhr.statusText;
                                                } catch (e) {
                                                    statusText = "";
                                                }
                                                if (!status && s.isLocal && !s.crossDomain) {
                                                    status = responses.text ? 200 : 404;
                                                } else {
                                                    if (status === 1223) {
                                                        status = 204;
                                                    }
                                                }
                                            }
                                        }
                                    } catch (firefoxAccessException) {
                                        if (!isAbort) {
                                            complete(-1, firefoxAccessException);
                                        }
                                    }
                                    if (responses) {
                                        complete(status, statusText, responses, responseHeaders);
                                    }
                                };
                                if (!s.async || xhr.readyState === 4) {
                                    callback();
                                } else {
                                    handle = ++xhrId;
                                    if (xhrOnUnloadAbort) {
                                        if (!xhrCallbacks) {
                                            xhrCallbacks = {};
                                            jQuery(window)
                                                .unload(xhrOnUnloadAbort);
                                        }
                                        xhrCallbacks[handle] = callback;
                                    }
                                    xhr.onreadystatechange = callback;
                                }
                            },
                            abort: function() {
                                if (callback) {
                                    callback(0, 1);
                                }
                            }
                        };
                    }
                });
            }
            var elemdisplay = {},
                iframe, iframeDoc, rfxtypes = /^(?:toggle|show|hide)$/,
                rfxnum = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
                timerId, fxAttrs = [
                    ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
                    ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
                    ["opacity"]
                ],
                fxNow;
            jQuery.fn.extend({
                show: function(speed, easing, callback) {
                    var elem, display;
                    if (speed || speed === 0) {
                        return this.animate(genFx("show", 3), speed, easing, callback);
                    } else {
                        for (var i = 0, j = this.length; i < j; i++) {
                            elem = this[i];
                            if (elem.style) {
                                display = elem.style.display;
                                if (!jQuery._data(elem, "olddisplay") && display === "none") {
                                    display = elem.style.display = "";
                                }
                                if (display === "" && jQuery.css(elem, "display") === "none") {
                                    jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName));
                                }
                            }
                        }
                        for (i = 0; i < j; i++) {
                            elem = this[i];
                            if (elem.style) {
                                display = elem.style.display;
                                if (display === "" || display === "none") {
                                    elem.style.display = jQuery._data(elem, "olddisplay") || "";
                                }
                            }
                        }
                        return this;
                    }
                },
                hide: function(speed, easing, callback) {
                    if (speed || speed === 0) {
                        return this.animate(genFx("hide", 3), speed, easing, callback);
                    } else {
                        for (var i = 0, j = this.length; i < j; i++) {
                            if (this[i].style) {
                                var display = jQuery.css(this[i], "display");
                                if (display !== "none" && !jQuery._data(this[i], "olddisplay")) {
                                    jQuery._data(this[i], "olddisplay", display);
                                }
                            }
                        }
                        for (i = 0; i < j; i++) {
                            if (this[i].style) {
                                this[i].style.display = "none";
                            }
                        }
                        return this;
                    }
                },
                _toggle: jQuery.fn.toggle,
                toggle: function(fn, fn2, callback) {
                    var bool = typeof fn === "boolean";
                    if (jQuery.isFunction(fn) && jQuery.isFunction(fn2)) {
                        this._toggle.apply(this, arguments);
                    } else {
                        if (fn == null || bool) {
                            this.each(function() {
                                var state = bool ? fn : jQuery(this)
                                    .is(":hidden");
                                jQuery(this)[state ? "show" : "hide"]();
                            });
                        } else {
                            this.animate(genFx("toggle", 3), fn, fn2, callback);
                        }
                    }
                    return this;
                },
                fadeTo: function(speed, to, easing, callback) {
                    return this.filter(":hidden")
                        .css("opacity", 0)
                        .show()
                        .end()
                        .animate({
                            opacity: to
                        }, speed, easing, callback);
                },
                animate: function(prop, speed, easing, callback) {
                    var optall = jQuery.speed(speed, easing, callback);
                    if (jQuery.isEmptyObject(prop)) {
                        return this.each(optall.complete, [false]);
                    }
                    prop = jQuery.extend({}, prop);
                    return this[optall.queue === false ? "each" : "queue"](function() {
                        if (optall.queue === false) {
                            jQuery._mark(this);
                        }
                        var opt = jQuery.extend({}, optall),
                            isElement = this.nodeType === 1,
                            hidden = isElement && jQuery(this)
                            .is(":hidden"),
                            name, val, p, display, e, parts, start, end, unit;
                        opt.animatedProperties = {};
                        for (p in prop) {
                            name = jQuery.camelCase(p);
                            if (p !== name) {
                                prop[name] = prop[p];
                                delete prop[p];
                            }
                            val = prop[name];
                            if (jQuery.isArray(val)) {
                                opt.animatedProperties[name] = val[1];
                                val = prop[name] = val[0];
                            } else {
                                opt.animatedProperties[name] = opt.specialEasing && opt.specialEasing[name] || opt.easing || "swing";
                            }
                            if (val === "hide" && hidden || val === "show" && !hidden) {
                                return opt.complete.call(this);
                            }
                            if (isElement && (name === "height" || name === "width")) {
                                opt.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY];
                                if (jQuery.css(this, "display") === "inline" && jQuery.css(this, "float") === "none") {
                                    if (!jQuery.support.inlineBlockNeedsLayout) {
                                        this.style.display = "inline-block";
                                    } else {
                                        display = defaultDisplay(this.nodeName);
                                        if (display === "inline") {
                                            this.style.display = "inline-block";
                                        } else {
                                            this.style.display = "inline";
                                            this.style.zoom = 1;
                                        }
                                    }
                                }
                            }
                        }
                        if (opt.overflow != null) {
                            this.style.overflow = "hidden";
                        }
                        for (p in prop) {
                            e = new jQuery.fx(this, opt, p);
                            val = prop[p];
                            if (rfxtypes.test(val)) {
                                e[val === "toggle" ? hidden ? "show" : "hide" : val]();
                            } else {
                                parts = rfxnum.exec(val);
                                start = e.cur();
                                if (parts) {
                                    end = parseFloat(parts[2]);
                                    unit = parts[3] || (jQuery.cssNumber[p] ? "" : "px");
                                    if (unit !== "px") {
                                        jQuery.style(this, p, (end || 1) + unit);
                                        start = ((end || 1) / e.cur()) * start;
                                        jQuery.style(this, p, start + unit);
                                    }
                                    if (parts[1]) {
                                        end = ((parts[1] === "-=" ? -1 : 1) * end) + start;
                                    }
                                    e.custom(start, end, unit);
                                } else {
                                    e.custom(start, val, "");
                                }
                            }
                        }
                        return true;
                    });
                },
                stop: function(clearQueue, gotoEnd) {
                    if (clearQueue) {
                        this.queue([]);
                    }
                    this.each(function() {
                        var timers = jQuery.timers,
                            i = timers.length;
                        if (!gotoEnd) {
                            jQuery._unmark(true, this);
                        }
                        while (i--) {
                            if (timers[i].elem === this) {
                                if (gotoEnd) {
                                    timers[i](true);
                                }
                                timers.splice(i, 1);
                            }
                        }
                    });
                    if (!gotoEnd) {
                        this.dequeue();
                    }
                    return this;
                }
            });

            function createFxNow() {
                setTimeout(clearFxNow, 0);
                return (fxNow = jQuery.now());
            }

            function clearFxNow() {
                fxNow = undefined;
            }

            function genFx(type, num) {
                var obj = {};
                jQuery.each(fxAttrs.concat.apply([], fxAttrs.slice(0, num)), function() {
                    obj[this] = type;
                });
                return obj;
            }
            jQuery.each({
                slideDown: genFx("show", 1),
                slideUp: genFx("hide", 1),
                slideToggle: genFx("toggle", 1),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(name, props) {
                jQuery.fn[name] = function(speed, easing, callback) {
                    return this.animate(props, speed, easing, callback);
                };
            });
            jQuery.extend({
                speed: function(speed, easing, fn) {
                    var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
                        complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
                        duration: speed,
                        easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
                    };
                    opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
                    opt.old = opt.complete;
                    opt.complete = function(noUnmark) {
                        if (jQuery.isFunction(opt.old)) {
                            opt.old.call(this);
                        }
                        if (opt.queue !== false) {
                            jQuery.dequeue(this);
                        } else {
                            if (noUnmark !== false) {
                                jQuery._unmark(this);
                            }
                        }
                    };
                    return opt;
                },
                easing: {
                    linear: function(p, n, firstNum, diff) {
                        return firstNum + diff * p;
                    },
                    swing: function(p, n, firstNum, diff) {
                        return ((-Math.cos(p * Math.PI) / 2) + 0.5) * diff + firstNum;
                    }
                },
                timers: [],
                fx: function(elem, options, prop) {
                    this.options = options;
                    this.elem = elem;
                    this.prop = prop;
                    options.orig = options.orig || {};
                }
            });
            jQuery.fx.prototype = {
                update: function() {
                    if (this.options.step) {
                        this.options.step.call(this.elem, this.now, this);
                    }(jQuery.fx.step[this.prop] || jQuery.fx.step._default)(this);
                },
                cur: function() {
                    if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
                        return this.elem[this.prop];
                    }
                    var parsed, r = jQuery.css(this.elem, this.prop);
                    return isNaN(parsed = parseFloat(r)) ? !r || r === "auto" ? 0 : r : parsed;
                },
                custom: function(from, to, unit) {
                    var self = this,
                        fx = jQuery.fx;
                    this.startTime = fxNow || createFxNow();
                    this.start = from;
                    this.end = to;
                    this.unit = unit || this.unit || (jQuery.cssNumber[this.prop] ? "" : "px");
                    this.now = this.start;
                    this.pos = this.state = 0;

                    function t(gotoEnd) {
                        return self.step(gotoEnd);
                    }
                    t.elem = this.elem;
                    if (t() && jQuery.timers.push(t) && !timerId) {
                        timerId = setInterval(fx.tick, fx.interval);
                    }
                },
                show: function() {
                    this.options.orig[this.prop] = jQuery.style(this.elem, this.prop);
                    this.options.show = true;
                    this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());
                    jQuery(this.elem)
                        .show();
                },
                hide: function() {
                    this.options.orig[this.prop] = jQuery.style(this.elem, this.prop);
                    this.options.hide = true;
                    this.custom(this.cur(), 0);
                },
                step: function(gotoEnd) {
                    var t = fxNow || createFxNow(),
                        done = true,
                        elem = this.elem,
                        options = this.options,
                        i, n;
                    if (gotoEnd || t >= options.duration + this.startTime) {
                        this.now = this.end;
                        this.pos = this.state = 1;
                        this.update();
                        options.animatedProperties[this.prop] = true;
                        for (i in options.animatedProperties) {
                            if (options.animatedProperties[i] !== true) {
                                done = false;
                            }
                        }
                        if (done) {
                            if (options.overflow != null && !jQuery.support.shrinkWrapBlocks) {
                                jQuery.each(["", "X", "Y"], function(index, value) {
                                    elem.style["overflow" + value] = options.overflow[index];
                                });
                            }
                            if (options.hide) {
                                jQuery(elem)
                                    .hide();
                            }
                            if (options.hide || options.show) {
                                for (var p in options.animatedProperties) {
                                    jQuery.style(elem, p, options.orig[p]);
                                }
                            }
                            options.complete.call(elem);
                        }
                        return false;
                    } else {
                        if (options.duration == Infinity) {
                            this.now = t;
                        } else {
                            n = t - this.startTime;
                            this.state = n / options.duration;
                            this.pos = jQuery.easing[options.animatedProperties[this.prop]](this.state, n, 0, 1, options.duration);
                            this.now = this.start + ((this.end - this.start) * this.pos);
                        }
                        this.update();
                    }
                    return true;
                }
            };
            jQuery.extend(jQuery.fx, {
                tick: function() {
                    for (var timers = jQuery.timers, i = 0; i < timers.length;
                        ++i) {
                        if (!timers[i]()) {
                            timers.splice(i--, 1);
                        }
                    }
                    if (!timers.length) {
                        jQuery.fx.stop();
                    }
                },
                interval: 13,
                stop: function() {
                    clearInterval(timerId);
                    timerId = null;
                },
                speeds: {
                    slow: 600,
                    fast: 200,
                    _default: 400
                },
                step: {
                    opacity: function(fx) {
                        jQuery.style(fx.elem, "opacity", fx.now);
                    },
                    _default: function(fx) {
                        if (fx.elem.style && fx.elem.style[fx.prop] != null) {
                            fx.elem.style[fx.prop] = (fx.prop === "width" || fx.prop === "height" ? Math.max(0, fx.now) : fx.now) + fx.unit;
                        } else {
                            fx.elem[fx.prop] = fx.now;
                        }
                    }
                }
            });
            if (jQuery.expr && jQuery.expr.filters) {
                jQuery.expr.filters.animated = function(elem) {
                    return jQuery.grep(jQuery.timers, function(fn) {
                            return elem === fn.elem;
                        })
                        .length;
                };
            }

            function defaultDisplay(nodeName) {
                if (!elemdisplay[nodeName]) {
                    var body = document.body,
                        elem = jQuery("<" + nodeName + ">")
                        .appendTo(body),
                        display = elem.css("display");
                    elem.remove();
                    if (display === "none" || display === "") {
                        if (!iframe) {
                            iframe = document.createElement("iframe");
                            iframe.frameBorder = iframe.width = iframe.height = 0;
                        }
                        body.appendChild(iframe);
                        if (!iframeDoc || !iframe.createElement) {
                            iframeDoc = (iframe.contentWindow || iframe.contentDocument)
                                .document;
                            iframeDoc.write((document.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>");
                            iframeDoc.close();
                        }
                        elem = iframeDoc.createElement(nodeName);
                        iframeDoc.body.appendChild(elem);
                        display = jQuery.css(elem, "display");
                        body.removeChild(iframe);
                    }
                    elemdisplay[nodeName] = display;
                }
                return elemdisplay[nodeName];
            }
            var rtable = /^t(?:able|d|h)$/i,
                rroot = /^(?:body|html)$/i;
            if ("getBoundingClientRect" in document.documentElement) {
                jQuery.fn.offset = function(options) {
                    var elem = this[0],
                        box;
                    if (options) {
                        return this.each(function(i) {
                            jQuery.offset.setOffset(this, options, i);
                        });
                    }
                    if (!elem || !elem.ownerDocument) {
                        return null;
                    }
                    if (elem === elem.ownerDocument.body) {
                        return jQuery.offset.bodyOffset(elem);
                    }
                    try {
                        box = elem.getBoundingClientRect();
                    } catch (e) {}
                    var doc = elem.ownerDocument,
                        docElem = doc.documentElement;
                    if (!box || !jQuery.contains(docElem, elem)) {
                        return box ? {
                            top: box.top,
                            left: box.left
                        } : {
                            top: 0,
                            left: 0
                        };
                    }
                    var body = doc.body,
                        win = getWindow(doc),
                        ieTouch = navigator.msMaxTouchPoints > 0,
                        clientTop = docElem.clientTop || body.clientTop || 0,
                        clientLeft = docElem.clientLeft || body.clientLeft || 0,
                        scrollTop = !ieTouch && win.pageYOffset || jQuery.support.boxModel && docElem.scrollTop || body.scrollTop,
                        scrollLeft = !ieTouch && win.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft,
                        top = box.top + scrollTop - clientTop,
                        left = box.left + scrollLeft - clientLeft;
                    return {
                        top: top,
                        left: left
                    };
                };
            } else {
                jQuery.fn.offset = function(options) {
                    var elem = this[0];
                    if (options) {
                        return this.each(function(i) {
                            jQuery.offset.setOffset(this, options, i);
                        });
                    }
                    if (!elem || !elem.ownerDocument) {
                        return null;
                    }
                    if (elem === elem.ownerDocument.body) {
                        return jQuery.offset.bodyOffset(elem);
                    }
                    jQuery.offset.initialize();
                    var computedStyle, offsetParent = elem.offsetParent,
                        prevOffsetParent = elem,
                        doc = elem.ownerDocument,
                        docElem = doc.documentElement,
                        body = doc.body,
                        defaultView = doc.defaultView,
                        prevComputedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle,
                        top = elem.offsetTop,
                        left = elem.offsetLeft;
                    while ((elem = elem.parentNode) && elem !== body && elem !== docElem) {
                        if (jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed") {
                            break;
                        }
                        computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
                        top -= elem.scrollTop;
                        left -= elem.scrollLeft;
                        if (elem === offsetParent) {
                            top += elem.offsetTop;
                            left += elem.offsetLeft;
                            if (jQuery.offset.doesNotAddBorder && !(jQuery.offset.doesAddBorderForTableAndCells && rtable.test(elem.nodeName))) {
                                top += parseFloat(computedStyle.borderTopWidth) || 0;
                                left += parseFloat(computedStyle.borderLeftWidth) || 0;
                            }
                            prevOffsetParent = offsetParent;
                            offsetParent = elem.offsetParent;
                        }
                        if (jQuery.offset.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible") {
                            top += parseFloat(computedStyle.borderTopWidth) || 0;
                            left += parseFloat(computedStyle.borderLeftWidth) || 0;
                        }
                        prevComputedStyle = computedStyle;
                    }
                    if (prevComputedStyle.position === "relative" || prevComputedStyle.position === "static") {
                        top += body.offsetTop;
                        left += body.offsetLeft;
                    }
                    if (jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed") {
                        top += Math.max(docElem.scrollTop, body.scrollTop);
                        left += Math.max(docElem.scrollLeft, body.scrollLeft);
                    }
                    return {
                        top: top,
                        left: left
                    };
                };
            }
            jQuery.offset = {
                initialize: function() {
                    var body = document.body,
                        container = document.createElement("div"),
                        innerDiv, checkDiv, table, td, bodyMarginTop = parseFloat(jQuery.css(body, "marginTop")) || 0,
                        html = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
                    jQuery.extend(container.style, {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        margin: 0,
                        border: 0,
                        width: "1px",
                        height: "1px",
                        visibility: "hidden"
                    });
                    container.innerHTML = html;
                    body.insertBefore(container, body.firstChild);
                    innerDiv = container.firstChild;
                    checkDiv = innerDiv.firstChild;
                    td = innerDiv.nextSibling.firstChild.firstChild;
                    this.doesNotAddBorder = (checkDiv.offsetTop !== 5);
                    this.doesAddBorderForTableAndCells = (td.offsetTop === 5);
                    checkDiv.style.position = "fixed";
                    checkDiv.style.top = "20px";
                    this.supportsFixedPosition = (checkDiv.offsetTop === 20 || checkDiv.offsetTop === 15);
                    checkDiv.style.position = checkDiv.style.top = "";
                    innerDiv.style.overflow = "hidden";
                    innerDiv.style.position = "relative";
                    this.subtractsBorderForOverflowNotVisible = (checkDiv.offsetTop === -5);
                    this.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== bodyMarginTop);
                    body.removeChild(container);
                    jQuery.offset.initialize = jQuery.noop;
                },
                bodyOffset: function(body) {
                    var top = body.offsetTop,
                        left = body.offsetLeft;
                    jQuery.offset.initialize();
                    if (jQuery.offset.doesNotIncludeMarginInBodyOffset) {
                        top += parseFloat(jQuery.css(body, "marginTop")) || 0;
                        left += parseFloat(jQuery.css(body, "marginLeft")) || 0;
                    }
                    return {
                        top: top,
                        left: left
                    };
                },
                setOffset: function(elem, options, i) {
                    var position = jQuery.css(elem, "position");
                    if (position === "static") {
                        elem.style.position = "relative";
                    }
                    var curElem = jQuery(elem),
                        curOffset = curElem.offset(),
                        curCSSTop = jQuery.css(elem, "top"),
                        curCSSLeft = jQuery.css(elem, "left"),
                        calculatePosition = (position === "absolute" || position === "fixed") && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
                        props = {},
                        curPosition = {},
                        curTop, curLeft;
                    if (calculatePosition) {
                        curPosition = curElem.position();
                        curTop = curPosition.top;
                        curLeft = curPosition.left;
                    } else {
                        curTop = parseFloat(curCSSTop) || 0;
                        curLeft = parseFloat(curCSSLeft) || 0;
                    }
                    if (jQuery.isFunction(options)) {
                        options = options.call(elem, i, curOffset);
                    }
                    if (options.top != null) {
                        props.top = (options.top - curOffset.top) + curTop;
                    }
                    if (options.left != null) {
                        props.left = (options.left - curOffset.left) + curLeft;
                    }
                    if ("using" in options) {
                        options.using.call(elem, props);
                    } else {
                        curElem.css(props);
                    }
                }
            };
            jQuery.fn.extend({
                position: function() {
                    if (!this[0]) {
                        return null;
                    }
                    var elem = this[0],
                        offsetParent = this.offsetParent(),
                        offset = this.offset(),
                        parentOffset = rroot.test(offsetParent[0].nodeName) ? {
                            top: 0,
                            left: 0
                        } : offsetParent.offset();
                    offset.top -= parseFloat(jQuery.css(elem, "marginTop")) || 0;
                    offset.left -= parseFloat(jQuery.css(elem, "marginLeft")) || 0;
                    parentOffset.top += parseFloat(jQuery.css(offsetParent[0], "borderTopWidth")) || 0;
                    parentOffset.left += parseFloat(jQuery.css(offsetParent[0], "borderLeftWidth")) || 0;
                    return {
                        top: offset.top - parentOffset.top,
                        left: offset.left - parentOffset.left
                    };
                },
                offsetParent: function() {
                    return this.map(function() {
                        var offsetParent = this.offsetParent || document.body;
                        while (offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static")) {
                            offsetParent = offsetParent.offsetParent;
                        }
                        return offsetParent;
                    });
                }
            });
            jQuery.each(["Left", "Top"], function(i, name) {
                var method = "scroll" + name;
                jQuery.fn[method] = function(val) {
                    var elem, win;
                    if (val === undefined) {
                        elem = this[0];
                        if (!elem) {
                            return null;
                        }
                        win = getWindow(elem);
                        return win ? ("pageXOffset" in win) ? win[i ? "pageYOffset" : "pageXOffset"] : jQuery.support.boxModel && win.document.documentElement[method] || win.document.body[method] : elem[method];
                    }
                    return this.each(function() {
                        win = getWindow(this);
                        if (win) {
                            win.scrollTo(!i ? val : jQuery(win)
                                .scrollLeft(), i ? val : jQuery(win)
                                .scrollTop());
                        } else {
                            this[method] = val;
                        }
                    });
                };
            });

            function getWindow(elem) {
                return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
            }
            jQuery.each(["Height", "Width"], function(i, name) {
                var type = name.toLowerCase();
                jQuery.fn["inner" + name] = function() {
                    var elem = this[0];
                    return elem && elem.style ? parseFloat(jQuery.css(elem, type, "padding")) : null;
                };
                jQuery.fn["outer" + name] = function(margin) {
                    var elem = this[0];
                    return elem && elem.style ? parseFloat(jQuery.css(elem, type, margin ? "margin" : "border")) : null;
                };
                jQuery.fn[type] = function(size) {
                    var elem = this[0];
                    if (!elem) {
                        return size == null ? null : this;
                    }
                    if (jQuery.isFunction(size)) {
                        return this.each(function(i) {
                            var self = jQuery(this);
                            self[type](size.call(this, i, self[type]()));
                        });
                    }
                    if (jQuery.isWindow(elem)) {
                        var docElemProp = elem.document.documentElement["client" + name],
                            body = elem.document.body;
                        return elem.document.compatMode === "CSS1Compat" && docElemProp || body && body["client" + name] || docElemProp;
                    } else {
                        if (elem.nodeType === 9) {
                            return Math.max(elem.documentElement["client" + name], elem.body["scroll" + name], elem.documentElement["scroll" + name], elem.body["offset" + name], elem.documentElement["offset" + name]);
                        } else {
                            if (size === undefined) {
                                var orig = jQuery.css(elem, type),
                                    ret = parseFloat(orig);
                                return jQuery.isNaN(ret) ? orig : ret;
                            } else {
                                return this.css(type, typeof size === "string" ? size : size + "px");
                            }
                        }
                    }
                };
            });
            window.jQuery = window.$ = jQuery;
        })(window);
    };
    if (window.amznJQ) {
        amznJQ.initJQuery = initJQuery;
    } else {
        initJQuery();
    }
})();
(function() {
    var patchJQuery = function(jQuery) {
        var $ = jQuery;
        if (!jQuery) {
            return;
        }
        jQuery.fn.offsetNoIPadFix = jQuery.fn.offset;
        jQuery.fn.offsetIPadFix = jQuery.fn.offset;
        if (/webkit.*mobile/i.test(navigator.userAgent) && parseFloat($.browser.version) < 532.9 && "getBoundingClientRect" in document.documentElement) {
            jQuery.fn.offsetIPadFix = function() {
                var result = this.offsetNoIPadFix();
                result.top -= window.scrollY;
                result.left -= window.scrollX;
                return result;
            };
            if (typeof window.jQueryPatchIPadOffset != "undefined" && window.jQueryPatchIPadOffset) {
                jQuery.fn.offset = jQuery.fn.offsetIPadFix;
            }
        }
    };
    if (window.amznJQ && amznJQ.initJQuery) {
        var initJQuery = amznJQ.initJQuery;
        amznJQ.initJQuery = function() {
            initJQuery();
            patchJQuery(window.jQuery);
        };
    } else {
        patchJQuery(window.jQuery);
    }
})();
(function() {
    var setupJQuery = function(jQuery) {
        if (jQuery) {
            jQuery.ajaxSettings.traditional = true;
        }
    };
    if (window.amznJQ && amznJQ.initJQuery) {
        var initJQuery = amznJQ.initJQuery;
        amznJQ.initJQuery = function() {
            initJQuery();
            setupJQuery(window.jQuery);
        };
    } else {
        setupJQuery(window.jQuery);
    }
})();

/* end jQuery-1.6.4/jquery.js */

/* begin amazonJQ/amznJQ.js */
(function() {
    var timesliceJS, initJQuery;
    if (window.amznJQ) {
        timesliceJS = amznJQ._timesliceJS;
        initJQuery = amznJQ.initJQuery;
        delete amznJQ._timesliceJS;
        delete amznJQ.initJQuery;
    }
    var isRunning = false,
        cbsWaiting = [];
    var doDeferred = function() {;
        isRunning = true;
        var stopTime = (new Date())
            .getTime() + 40;
        var callingCB;
        try {
            while (cbsWaiting.length && (new Date())
                .getTime() <= stopTime) {
                var cb = cbsWaiting.shift();
                callingCB = true;
                cb();
                callingCB = false;
            }
        } finally {
            if (callingCB) {;
            }
            if (cbsWaiting.length) {;
                setTimeout(doDeferred, 0);
            } else {;
                isRunning = false;
            }
        }
    };
    var callInTimeslice = function(cbOrArray) {
        if (typeof cbOrArray === "function") {
            cbsWaiting.push(cbOrArray);
        } else {
            cbsWaiting = cbsWaiting.concat(cbOrArray);
        }
        if (!isRunning) {
            isRunning = true;
            setTimeout(doDeferred, 0);
        }
    };
    var initAmznJQ = function() {
        var $ = window.jQuery,
            jQuery = $;
        if (!jQuery) {
            return;
        }
        var bootstrapAmznJQ = window.amznJQ;
        if (!window.goN2Debug) {
            window.goN2Debug = new function() {
                this.info = function() {};
                return this;
            };
        }
        window.amznJQ = new function() {;
            var me = this;
            me.jQuery = jQuery;
            jQuery.noConflict(true);
            if (window.jQuery) {;
            } else {
                window.jQuery = jQuery;
            }
            var _logicalToPhysical = {
                JQuery: {
                    functionality: "JQuery",
                    urls: null
                },
                popover: {
                    functionality: "popover",
                    urls: null
                }
            };
            var _func_loaded = {};
            var _url_loaded = {};
            var _loading = {};

            function _loadFunctionality(functionality) {
                var urls = _logicalToPhysical[functionality].urls;
                if (urls) {;
                    $.each(urls, function() {
                        if (!_url_loaded[this]) {
                            _loadURL(this, functionality);
                        }
                    });
                } else {;
                }
            }

            function _loadURL(url, functionality) {;
                $.ajax({
                    type: "GET",
                    url: url,
                    success: _onUrlLoadedFcn(url, functionality),
                    dataType: "script",
                    cache: true
                });
            }

            function _onUrlLoadedFcn(url, functionality) {
                return function() {;
                    _url_loaded[url] = true;
                    var all_loaded = true;
                    $.each(_logicalToPhysical[functionality].urls, function() {
                        all_loaded = all_loaded && !!_url_loaded[this];
                    });
                    if (all_loaded) {}
                };
            }
            me.addLogical = function(functionality, urls) {
                var ul = urls ? urls.length : "no";;
                _logicalToPhysical[functionality] = {
                    functionality: functionality,
                    urls: urls
                };
                if (!urls) {
                    me.declareAvailable(functionality);
                    return;
                }
                if (_loading[functionality]) {
                    _loadFunctionality(functionality);
                }
            };
            me.declareAvailable = function(functionality) {;
                if (typeof _logicalToPhysical[functionality] == "undefined") {
                    _logicalToPhysical[functionality] = {
                        functionality: functionality,
                        urls: null
                    };
                }
                _func_loaded[functionality] = true;
                triggerEventCallbacks(functionality + ".loaded");
            };
            me.addStyle = function(css_url) {
                var dcss = document.styleSheets[0];
                if (dcss && dcss.addImport) {
                    while (dcss.imports.length >= 31) {
                        dcss = dcss.imports[0];
                    }
                    dcss.addImport(css_url);
                } else {
                    $("style[type='text/css']:first")
                        .append('@import url("' + css_url + '");');
                }
            };
            me.addStyles = function(args) {
                var urls = args.urls || [];
                var styles = args.styles || [];
                var dcss = document.styleSheets;
                if (dcss && !dcss.length && document.createStyleSheet) {
                    document.createStyleSheet();
                }
                dcss = dcss[0];
                if (dcss && dcss.addImport) {
                    $.each(urls, function() {
                        while (dcss.imports.length >= 31) {
                            dcss = dcss.imports[0];
                        }
                        dcss.addImport(this);
                    });
                } else {
                    $.each(urls, function() {
                        var attrs = {
                            type: "text/css",
                            rel: "stylesheet",
                            href: this
                        };
                        $("head")
                            .append($("<link/>")
                                .attr(attrs));
                    });
                }
                var css = "";
                $.each(styles, function() {
                    css += this;
                });
                if (css) {
                    if (document.createStyleSheet) {
                        try {
                            var sheet = document.createStyleSheet();
                            sheet.cssText = css;
                        } catch (e) {}
                    } else {
                        $("head")
                            .append($("<style/>")
                                .attr({
                                    type: "text/css"
                                })
                                .append(css));
                    }
                }
            };
            var eventCBQueue = {};
            var enqueueEventCallback = function(eventName, cb) {
                if (!timesliceJS) {
                    $(document)
                        .one(eventName, cb);
                    return;
                }
                var queue = eventCBQueue[eventName] || [];
                queue.push(function() {
                    cb(jQuery.event.fix({
                        type: eventName
                    }));
                });
                eventCBQueue[eventName] = queue;
            };
            var triggerEventCallbacks = function(eventName) {
                if (!timesliceJS) {
                    $(document)
                        .trigger(eventName);
                    return;
                }
                var queue = eventCBQueue[eventName];
                if (queue) {
                    callInTimeslice(queue);
                    delete eventCBQueue[eventName];
                }
            };
            var doEventCallbackNow = function(eventName, cb) {
                if (!timesliceJS) {
                    $(document)
                        .one(eventName, cb);
                    $(document)
                        .trigger(eventName);
                } else {
                    if (eventCBQueue[eventName]) {
                        enqueueEventCallback(eventName, cb);
                        triggerEventCallbacks(eventName);
                    } else {
                        callInTimeslice(function() {
                            cb(jQuery.event.fix({
                                type: eventName
                            }));
                        });
                    }
                }
            };
            me.available = function(functionality, eventCallbackFunction) {
                if (_func_loaded[functionality]) {;
                    doEventCallbackNow(functionality + ".loaded", eventCallbackFunction);
                } else {
                    if (_loading[functionality]) {;
                        enqueueEventCallback(functionality + ".loaded", eventCallbackFunction);
                    } else {
                        if (_logicalToPhysical[functionality]) {;
                            _loading[functionality] = true;
                            enqueueEventCallback(functionality + ".loaded", eventCallbackFunction);
                            _loadFunctionality(functionality);
                        } else {;
                            _loading[functionality] = true;
                            enqueueEventCallback(functionality + ".loaded", eventCallbackFunction);
                        }
                    }
                }
            };
            me.onReady = function(functionality, eventCallbackFunction) {
                var ajq = this;
                $(function() {
                    ajq.available(functionality, eventCallbackFunction);
                });
            };
            var _stage_completed = {};
            var _fail_safe_stages = ["amznJQ.theFold", "amznJQ.criticalFeature"];
            me.onCompletion = function(stage, callbackFn) {
                if (_stage_completed[stage]) {;
                    doEventCallbackNow(stage, callbackFn);
                } else {;
                    enqueueEventCallback(stage, callbackFn);
                }
            };
            me.completedStage = function(stage) {
                if (!_stage_completed[stage]) {;
                    _stage_completed[stage] = true;
                    triggerEventCallbacks(stage);
                }
            };
            me.windowOnLoad = function() {;
                $.each(_fail_safe_stages, function() {
                    if (!_stage_completed[this]) {;
                        _stage_completed[this] = true;
                        triggerEventCallbacks(this);
                    }
                });
            };
            (function() {
                var ST = setTimeout,
                    doc = document,
                    docElem = doc.documentElement,
                    styleObj = docElem.style,
                    nav = navigator,
                    ua = nav.userAgent,
                    plUrls = [],
                    lowPriUrls = [],
                    hiPriUrls = [],
                    isLowPriEligibleYet = false,
                    isGecko = "MozAppearance" in styleObj,
                    isWebkit = !isGecko && ("webkitAppearance" in styleObj),
                    isSafari = isWebkit && nav.vendor.indexOf("Apple") === 0,
                    isIE = !isGecko && !isWebkit && ((nav.appName.indexOf("Microsoft") === 0 || ua.indexOf("Trident/") > -1)),
                    isSupportedBrowser = (isWebkit || isGecko || isIE),
                    tridentVer = !isIE ? -1 : (/Trident\/([\d]+)/)
                    .exec(ua) != null ? parseFloat(RegExp.$1) : null,
                    ieVer = !isIE ? -1 : !tridentVer ? 6 : tridentVer + 4,
                    allowedLoaders = typeof window.plCount != "undefined" ? window.plCount() : (isIE && ieVer < 8) ? 2 : 5,
                    currentLoaders = 0,
                    type_Link = "LINK",
                    type_Img = "IMG",
                    type_Obj = "OBJECT",
                    type_Script = "SCRIPT",
                    handledImageExtensions = ["gif", "jpeg", "jpg", "png"];;

                function setLoadState() {
                    if (hiPriUrls.length > 0) {
                        plUrls = hiPriUrls;
                    } else {
                        plUrls = lowPriUrls;
                        if (plUrls.length === 0 || !isLowPriEligibleYet) {
                            return false;
                        }
                    }
                    if (currentLoaders >= allowedLoaders) {
                        return false;
                    }
                    currentLoaders++;
                    return true;
                }

                function loaderDone(loader, timer) {
                    var destroyLoader = function() {
                        if (loader) {
                            var p = loader.parentElement;
                            if (p) {
                                p.removeChild(loader);
                            }
                            loader = null;
                        }
                    };
                    if (timer) {
                        clearTimeout(timer);
                    }
                    currentLoaders = currentLoaders < 1 ? 0 : currentLoaders - 1;
                    if (isGecko) {
                        setTimeout(destroyLoader, 5);
                    } else {
                        destroyLoader();
                    }
                    if (isIE) {
                        ST(load, 0);
                    } else {
                        load();
                    }
                }

                function getExtension(url) {
                    var extension, posDot, end = url.indexOf("?");
                    end = end > 0 ? end : url.length;
                    posDot = url.lastIndexOf(".", end);
                    if (posDot) {
                        extension = url.substring(posDot + 1, end)
                            .toLowerCase();
                    }
                    return (extension == "gz") ? getExtension(url.substring(0, posDot)) : extension;
                }

                function checkIfImage(extension) {
                    var i = handledImageExtensions.length;
                    while (i--) {
                        if (handledImageExtensions[i] === extension) {
                            return true;
                        }
                    }
                    return false;
                }

                function determineType(isImageUrl) {
                    var useType;
                    if (isGecko) {
                        useType = type_Obj;
                    } else {
                        if (isIE) {
                            useType = type_Img;
                            if (!isImageUrl) {
                                if (ieVer >= 10) {
                                    useType = type_Link;
                                } else {
                                    if (ieVer == 9) {
                                        useType = type_Script;
                                    }
                                }
                            }
                        } else {
                            if (isSafari) {
                                useType = isImageUrl ? type_Img : null;
                            } else {
                                useType = type_Img;
                            }
                        }
                    }
                    return useType;
                }

                function attachHandlers(loader, useType, isImageUrl, url) {
                    var timer;
                    if (isGecko || (isWebkit && !isImageUrl)) {
                        timer = ST(function() {;
                            loaderDone(loader, timer);
                        }, 2500 + Math.random() * 100);
                    }
                    loader.onerror = function() {;
                        loaderDone(loader, timer);
                    };
                    loader.onload = function() {;
                        loaderDone(loader, timer);
                    };
                }

                function load() {
                    if (!setLoadState()) {
                        return;
                    }
                    var url = plUrls.pop(),
                        extension = getExtension(url),
                        isImageUrl = checkIfImage(extension),
                        useType = determineType(isImageUrl, extension),
                        loader, hL = plUrls === hiPriUrls ? "H" : "L";;
                    if (!useType) {;
                        loaderDone();
                        return;
                    }
                    loader = (useType == type_Img) ? new Image : doc.createElement(useType);
                    loader.style.display = "none";
                    if (useType == type_Img) {
                        attachHandlers(loader, useType, isImageUrl, url);
                        loader.src = url;
                    } else {
                        if (useType == type_Obj) {
                            loader.data = url;
                            attachHandlers(loader, useType, isImageUrl, url);
                        } else {
                            if (useType == type_Script) {
                                loader.type = "text/cache";
                                attachHandlers(loader, useType, isImageUrl, url);
                                loader.src = url;
                            } else {
                                if (useType == type_Link) {
                                    loader.rel = "stylesheet";
                                    loader.media = "speech";
                                    attachHandlers(loader, useType, isImageUrl, url);
                                    loader.href = url;
                                }
                            }
                        }
                    }
                    if (!(isIE && useType == type_Img)) {
                        try {
                            docElem.appendChild(loader);
                        } catch (e) {;
                            loaderDone();
                            return;
                        }
                    }
                    if (currentLoaders < allowedLoaders) {
                        load();
                    }
                }

                function processUrlList(urlList, target) {
                    if (!isSupportedBrowser) {;
                        return;
                    }
                    if (typeof urlList === "string") {
                        urlList = [urlList];
                    } else {
                        if (typeof urlList !== "object" || urlList === null) {
                            return;
                        }
                    }
                    var i, u;
                    for (i = 0; i < urlList.length; i++) {
                        u = urlList[i];
                        if (u && typeof u !== "string") {
                            processUrlList(u, target);
                        } else {
                            if (u && !(u[0] == " ")) {
                                target.splice(Math.round(Math.random() * target.length), 0, u);
                            }
                        }
                    }
                }
                me._getPLStat = function() {
                    return {
                        H: hiPriUrls.length,
                        L: lowPriUrls.length,
                        P: plUrls.length,
                        CL: currentLoaders,
                        AL: allowedLoaders
                    };
                };
                me.addPL = function(urlList) {
                    processUrlList(urlList, lowPriUrls);
                    load();
                };
                me.PLNow = function(urlList) {
                    processUrlList(urlList, hiPriUrls);
                    load();
                };

                function triggerPagePreloads() {
                    isLowPriEligibleYet = true;
                    load();
                }
                if (bootstrapAmznJQ && bootstrapAmznJQ.PLTriggerName) {
                    amznJQ.available(bootstrapAmznJQ.PLTriggerName, triggerPagePreloads);
                } else {
                    $(window)
                        .load(function() {
                            ST(triggerPagePreloads, 1000);
                        });
                }
            }());
            me.strings = {};
            me.chars = {};
            if (bootstrapAmznJQ) {
                $.extend(this.strings, bootstrapAmznJQ.strings);
                $.extend(this.chars, bootstrapAmznJQ.chars);
            }
        }();
        $(window)
            .load(function() {
                amznJQ.windowOnLoad();
            });
        if (window.ue && bootstrapAmznJQ && window.ues && window.uex) {
            ues("wb", "jQueryActive", 1);
            uex("ld", "jQueryActive");
        }
        amznJQ.declareAvailable("JQuery");
        amznJQ.declareAvailable("jQuery");
        if (bootstrapAmznJQ) {;
            $.each(bootstrapAmznJQ._l, function() {
                amznJQ.addLogical(this[0], this[1]);
            });
            $.each(bootstrapAmznJQ._s, function() {
                amznJQ.addStyle(this[0]);
            });
            $.each(bootstrapAmznJQ._d, function() {
                amznJQ.declareAvailable(this[0], this[1]);
            });
            $.each(bootstrapAmznJQ._a, function() {
                amznJQ.available(this[0], this[1]);
            });
            $.each(bootstrapAmznJQ._t || [], function() {
                callInTimeslice(this[0]);
            });
            $.each(bootstrapAmznJQ._o, function() {
                amznJQ.onReady(this[0], this[1]);
            });
            $.each(bootstrapAmznJQ._c, function() {
                amznJQ.onCompletion(this[0], this[1]);
            });
            $.each(bootstrapAmznJQ._cs, function() {
                amznJQ.completedStage(this[0], this[1]);
            });
            amznJQ.addPL(bootstrapAmznJQ._pl);
        }
    };
    if (!initJQuery) {
        initAmznJQ();
    } else {
        if (!timesliceJS) {
            initJQuery();
            initAmznJQ();
        } else {
            callInTimeslice(initJQuery);
            callInTimeslice(initAmznJQ);
        }
    }
})();

/* end amazonJQ/amznJQ.js */

/* begin popover/amzPopover.js */
(function() {
    var allowHybridInit = false;
    if (window.amznJQ) {
        window.amznJQ.available("jQuery", function() {
            var doDeclare = initAmazonPopover(window.amznJQ.jQuery || window.jQuery);
            if (doDeclare || allowHybridInit) {
                window.amznJQ.declareAvailable("popover");
                allowHybridInit = true;
            }
        });
    }
    if (typeof window.P === "object" && typeof window.P.when === "function") {
        window.P.when("jQuery")
            .execute(function($) {
                var doRegister = initAmazonPopover($);
                if (doRegister || allowHybridInit) {
                    window.P.register("legacy-popover", function() {
                        return null;
                    });
                    allowHybridInit = true;
                }
            });
    }

    function initAmazonPopover($) {
        if (!$ || $.AmazonPopover) {
            return false;
        }
        var rootElement = function() {
            var container = $("#ap_container");
            return container.length && container || $("body");
        };
        var viewport = {
            width: function() {
                return Math.min($(window)
                    .width(), $(document)
                    .width());
            },
            height: function() {
                return $(window)
                    .height();
            }
        };
        var mouseTracker = function() {
            var regions = [],
                n = 3,
                cursor = [{
                    x: 0,
                    y: 0
                }],
                c = 0,
                scroll = [0, 0],
                listening = false;
            var callbackArgs = function() {
                var pCursors = [];
                for (var i = 1; i < n; i++) {
                    pCursors.push(cursor[(c - i + n) % n]);
                }
                return $.extend(true, {}, {
                    cursor: cursor[c],
                    priorCursors: pCursors
                });
            };
            var check = function(immediately) {
                for (var i = 0; i < regions.length; i++) {
                    var r = regions[i];
                    var inside = $.grep(r.rects, function(n) {
                            return cursor[c].x >= n[0] && cursor[c].y >= n[1] && cursor[c].x < n[0] + n[2] && cursor[c].y < n[1] + n[3];
                        })
                        .length > 0;
                    if (r.inside !== null && inside && !r.inside && r.mouseEnter) {
                        r.inside = r.mouseEnter(callbackArgs());
                    } else {
                        if (r.inside !== null && !inside && r.inside && r.mouseLeave) {
                            r.inside = !r.mouseLeave(immediately, callbackArgs());
                        }
                    }
                }
            };
            var startListening = function() {
                scroll = [$(window)
                    .scrollLeft(), $(window)
                    .scrollTop()
                ];
                $(document)
                    .mousemove(function(e) {
                        if (typeof e.pageY !== "undefined") {
                            c = (c + 1) % n;
                            cursor[c] = {
                                x: e.pageX,
                                y: e.pageY
                            };
                        }
                        check();
                    });
                if (!isMobileAgent(true)) {
                    $(document)
                        .scroll(function(e) {
                            cursor[c].x += ($(window)
                                .scrollLeft() - scroll[0]);
                            cursor[c].y += ($(window)
                                .scrollTop() - scroll[1]);
                            scroll = [$(window)
                                .scrollLeft(), $(window)
                                .scrollTop()
                            ];
                            check();
                        });
                }
                listening = true;
            };
            return {
                add: function(rectsArray, options) {
                    if (!listening) {
                        startListening();
                    }
                    var r = $.extend({
                        rects: rectsArray
                    }, options);
                    regions.push(r);
                    return r;
                },
                remove: function(region) {
                    for (var i = 0; i < regions.length; i++) {
                        if (regions[i] === region) {
                            regions.splice(i, 1);
                            return;
                        }
                    }
                },
                checkNow: function() {
                    check(true);
                },
                getCallbackArgs: function() {
                    return callbackArgs();
                }
            };
        }();
        var iframePool = function() {
            var ie6 = $.browser.msie && parseInt($.browser.version, 10) <= 6;
            var src = ie6 ? window.AmazonPopoverImages.pixel : "javascript:void(false)";
            var HTML = '<iframe frameborder="0" tabindex="-1" src="' + src + '" style="display:none;position:absolute;z-index:0;filter:Alpha(Opacity=\'0\');opacity:0;" />';
            var pool = [];
            var addToLib = function(n) {
                for (var i = 0; i < n; i++) {
                    pool.push($(HTML)
                        .prependTo(rootElement()));
                }
            };
            $(document)
                .ready(function() {
                    addToLib(3);
                });
            return {
                checkout: function(jqObj) {
                    if (!pool.length) {
                        addToLib(1);
                    }
                    return pool.pop()
                        .css({
                            display: "block",
                            top: jqObj.offset()
                                .top,
                            left: jqObj.offset()
                                .left,
                            width: jqObj.outerWidth(),
                            height: jqObj.outerHeight(),
                            zIndex: Number(jqObj.css("z-index")) - 1
                        });
                },
                checkin: function(iframe) {
                    pool.push(iframe.css("display", "none"));
                }
            };
        }();
        var elementHidingManager = function() {
            var hiddenElements = [];
            var win = /Win/.test(navigator.platform);
            var mac = /Mac/.test(navigator.platform);
            var linux = /Linux/.test(navigator.platform);
            var version = parseInt($.browser.version, 10);
            var canOverlayWmodeWindow = false;
            var intersectingPopovers = function(obj) {
                var bounds = [obj.offset()
                    .left, obj.offset()
                    .top, obj.outerWidth(), obj.outerHeight()
                ];
                var intersecting = [];
                for (var i = 0; i < popovers.length; i++) {
                    var disparate = false;
                    if (!popovers[i].settings.modal) {
                        var r = popovers[i].bounds;
                        disparate = bounds[0] > r[0] + r[2] || r[0] > bounds[0] + bounds[2] || bounds[1] > r[1] + r[3] || r[1] > bounds[1] + bounds[3];
                    }
                    if (!disparate) {
                        intersecting.push(popovers[i]);
                    }
                }
                return intersecting;
            };
            var shouldBeVisible = function(obj) {
                if (obj.hasClass("ap_never_hide")) {
                    return true;
                }
                if (intersectingPopovers(obj)
                    .length) {
                    if (obj.is("object,embed")) {
                        var wmode = obj.attr("wmode") || obj.children("object,embed")
                            .attr("wmode") || obj.parent("object,embed")
                            .attr("wmode") || "window";
                        if (wmode.toLowerCase() == "window" && !canOverlayWmodeWindow) {
                            return false;
                        }
                    }
                    if (obj.is("iframe")) {
                        if ($.browser.safari) {
                            return false;
                        }
                    }
                }
                return true;
            };
            var setVisibility = function(elementQuery, shouldBecomeVisible) {
                if (elementQuery.is("iframe[id^=DA],iframe[id^=cachebust]")) {
                    elementQuery.css({
                        display: shouldBecomeVisible ? "block" : "none"
                    });
                } else {
                    elementQuery.css({
                        visibility: shouldBecomeVisible ? "visible" : "hidden"
                    });
                }
            };
            return {
                update: function() {
                    var HIDDEN = 0;
                    var VISIBLE = 1;
                    var stillHidden = [];
                    for (var i = 0; i < hiddenElements.length; i++) {
                        var hiddenElement = hiddenElements[i];
                        if (!shouldBeVisible(hiddenElement)) {
                            stillHidden.push(hiddenElement);
                        } else {
                            setVisibility(hiddenElement, VISIBLE);
                        }
                    }
                    hiddenElements = stillHidden;
                    $("object:visible,embed:visible,iframe:visible")
                        .each(function() {
                            var obj = $(this);
                            if (!shouldBeVisible(obj)) {
                                hiddenElements.push(obj);
                                setVisibility(obj, HIDDEN);
                            }
                        });
                }
            };
        }();
        var applyBacking = function(popover, options) {
            var region = null;
            var iframe = null;
            options = options || {};
            var destroy = function() {
                if (region) {
                    mouseTracker.remove(region);
                    region = null;
                }
                if (iframe) {
                    iframePool.checkin(iframe);
                    iframe = null;
                }
                elementHidingManager.update();
            };
            var refreshBounds = function() {
                var newBounds = [popover.offset()
                    .left, popover.offset()
                    .top, popover.outerWidth(), popover.outerHeight()
                ];
                if (region) {
                    region.rects[0] = newBounds;
                }
                if (iframe) {
                    iframe.css({
                        left: newBounds[0],
                        top: newBounds[1],
                        width: newBounds[2],
                        height: newBounds[3]
                    });
                }
                elementHidingManager.update();
            };
            var reposition = function(x, y) {
                if (iframe) {
                    iframe.css({
                        left: x,
                        top: y
                    });
                }
                if (region) {
                    region.rects[0][0] = x;
                    region.rects[0][1] = y;
                }
            };
            if (options.useIFrame !== false) {
                iframe = iframePool.checkout(popover);
            }
            var bounds = [
                [popover.offset()
                    .left, popover.offset()
                    .top, popover.outerWidth(), popover.outerHeight()
                ]
            ];
            if (options.additionalCursorRects) {
                for (var i = 0; i < options.additionalCursorRects.length; i++) {
                    bounds.push(options.additionalCursorRects[i]);
                }
            }
            region = mouseTracker.add(bounds, options);
            elementHidingManager.update();
            popover.backing = {
                destroy: destroy,
                refreshBounds: refreshBounds,
                reposition: reposition,
                iframe: iframe
            };
        };
        var defaultSettings = {
            width: 500,
            followScroll: false,
            locationMargin: 4,
            alignMargin: 0,
            windowMargin: 4,
            locationFitInWindow: true,
            focusOnShow: true,
            modal: false,
            draggable: false,
            zIndex: 200,
            showOnHover: false,
            hoverShowDelay: 400,
            hoverHideDelay: 200,
            skin: "default",
            useIFrame: true,
            clone: false,
            ajaxSlideDuration: 400,
            ajaxErrorContent: null,
            paddingLeft: 17,
            paddingRight: 17,
            paddingBottom: 8
        };
        var overlay = null;
        var popovers = [];
        var et = {
            MOUSE_ENTER: 1,
            MOUSE_LEAVE: 2,
            CLICK_TRIGGER: 4,
            CLICK_OUTSIDE: 8,
            fromStrings: function(s) {
                var flags = 0;
                var self = this;
                if (s) {
                    $.each($.makeArray(s), function() {
                        flags = flags | self[this];
                    });
                }
                return flags;
            }
        };
        var ajaxCache = {};
        var preparedPopover = null;
        var openGroupPopover = {};
        var skins = {
            "default": '<div class="ap_popover ap_popover_sprited" surround="6,16,18,16" tabindex="0">                     <div class="ap_header">                         <div class="ap_left"/>                         <div class="ap_middle"/>                         <div class="ap_right"/>                     </div>                     <div class="ap_body">                         <div class="ap_left"/>                         <div class="ap_content"><img src="' + window.AmazonPopoverImages.snake + '"/></div>                         <div class="ap_right"/>                     </div>                     <div class="ap_footer">                         <div class="ap_left"/>                         <div class="ap_middle"/>                         <div class="ap_right"/>                     </div>                     <div class="ap_titlebar">                         <div class="ap_title"/>                     </div>                     <div class="ap_close"><a href="#"><span class="ap_closetext"/><span class="ap_closebutton"><span></span></span></a></div>                 </div>',
            "default_non_sprited": '<div class="ap_popover ap_popover_unsprited" surround="6,16,18,16" tabindex="0">                     <div class="ap_header">                         <div class="ap_left"/>                         <div class="ap_middle"/>                         <div class="ap_right"/>                     </div>                     <div class="ap_body">                         <div class="ap_left"/>                         <div class="ap_content"><img src="' + window.AmazonPopoverImages.snake + '"/></div>                         <div class="ap_right"/>                     </div>                     <div class="ap_footer">                         <div class="ap_left"/>                         <div class="ap_middle"/>                         <div class="ap_right"/>                     </div>                     <div class="ap_titlebar">                         <div class="ap_title"/>                     </div>                     <div class="ap_close"><a href="#"><span class="ap_closetext"/><img border="0" src="' + window.AmazonPopoverImages.btnClose + '"/></a></div>                 </div>',
            "classic": '<div class="ap_classic">                     <div class="ap_titlebar">                         <div class="ap_close">                             <img width="46" height="16" border="0" alt="close" onmouseup=\'this.src="' + window.AmazonPopoverImages.closeTan + "\";' onmouseout='this.src=\"" + window.AmazonPopoverImages.closeTan + "\";' onmousedown='this.src=\"" + window.AmazonPopoverImages.closeTanDown + '";\' src="' + window.AmazonPopoverImages.closeTan + '" />                         </div>                         <span class="ap_title"></span>                     </div>                     <div class="ap_content"><img src="' + window.AmazonPopoverImages.loadingBar + '"/></div>                 </div>'
        };
        var boundingRectangle = function(set) {
            var b = {
                left: Infinity,
                top: Infinity,
                right: -Infinity,
                bottom: -Infinity
            };
            set.each(function() {
                try {
                    var t = $(this);
                    var o = t.offset();
                    var w = t.outerWidth();
                    var h = t.outerHeight();
                    if (t.is("area")) {
                        var ab = boundsOfAreaElement(t);
                        o = {
                            left: ab[0],
                            top: ab[1]
                        };
                        w = ab[2] - ab[0];
                        h = ab[3] - ab[1];
                    }
                    if (o.left < b.left) {
                        b.left = o.left;
                    }
                    if (o.top < b.top) {
                        b.top = o.top;
                    }
                    if (o.left + w > b.right) {
                        b.right = o.left + w;
                    }
                    if (o.top + h > b.bottom) {
                        b.bottom = o.top + h;
                    }
                } catch (e) {}
            });
            return b;
        };
        var bringToFront = function(popover) {
            if (popovers.length <= 1) {
                return;
            }
            var maxZ = Math.max.apply(Math, $.map(popovers, function(p) {
                return Number(p.css("z-index"));
            }));
            if (Number(popover.css("z-index")) == maxZ) {
                return;
            }
            popover.css("z-index", maxZ + 2);
            popover.backing && popover.backing.iframe.css("z-index", maxZ + 1);
        };
        $.fn.removeAmazonPopoverTrigger = function() {
            this.unbind("click.amzPopover");
            this.unbind("mouseover.amzPopover");
            this.unbind("mouseout.amzPopover");
            return this;
        };
        $.fn.amazonPopoverTrigger = function(customSettings) {
            var settings = $.extend({}, defaultSettings, customSettings);
            var triggers = this;
            var popover = null;
            if (!settings.showOnHover && settings.skin == "default") {
                this.bind("mouseover.amzPopover", preparePopover);
            }
            var hoverSet;
            if (typeof settings.showOnHover == "string") {
                hoverSet = triggers.filter(settings.showOnHover);
            } else {
                hoverSet = settings.showOnHover ? triggers : $([]);
            }
            var timerID = null;
            hoverSet.bind("mouseover.amzPopover", function(e) {
                if (!popover && !timerID) {
                    timerID = setTimeout(function() {
                        if (!popover) {
                            var parent = triggers.parent(),
                                length = parent.length,
                                tagName = length ? parent.attr("tagName") || parent.get(0)
                                .tagName : undefined;
                            if (length && tagName) {
                                if (!settings.triggeringEnabled || settings.triggeringEnabled.call(triggers)) {
                                    popover = displayPopover(settings, triggers, function() {
                                        popover = null;
                                    });
                                }
                            }
                        }
                        timerID = null;
                    }, settings.hoverShowDelay);
                }
                return false;
            });
            hoverSet.bind("mouseout.amzPopover", function(e) {
                if (!popover && timerID) {
                    clearTimeout(timerID);
                    timerID = null;
                }
            });
            triggers.bind("click.amzPopover", function(e) {
                var followLink = settings.followLink === true || typeof settings.followLink == "function" && settings.followLink.call(triggers, popover, settings);
                if (followLink) {
                    return true;
                }
                if (popover) {
                    popover.triggerClicked();
                } else {
                    if (!settings.triggeringEnabled || settings.triggeringEnabled.call(triggers)) {
                        popover = displayPopover(settings, triggers, function() {
                            popover = null;
                        });
                    }
                }
                return false;
            });
            this.amznPopoverHide = function() {
                popover && popover.close();
            };
            this.amznPopoverVisible = function() {
                return !!popover;
            };
            return this;
        };
        var updateBacking = function(group) {
            if (group && openGroupPopover[group]) {
                var popover = openGroupPopover[group];
                if (popover.backing) {
                    popover.backing.refreshBounds();
                }
            }
        };
        var displayPopover = function(settings, triggers, destroyFunction) {
            addAliases(settings);
            var parent = null;
            if (triggers) {
                var parents = triggers.eq(0)
                    .parents()
                    .get();
                for (var t = 0; t < parents.length && !parent; t++) {
                    for (var i = 0; i < popovers.length && !parent; i++) {
                        if (popovers[i].get(0) == parents[t]) {
                            parent = popovers[i];
                        }
                    }
                }
            }
            var children = [];
            children.remove = function(p) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] === p) {
                        this.splice(i, 1);
                        return;
                    }
                }
            };
            var interactedWith = false;
            $.each(defaultSettings, function(k, v) {
                if (typeof settings[k] == "undefined") {
                    settings[k] = v;
                }
            });
            if (!settings.location) {
                settings.location = settings.modal || !triggers ? "centered" : "auto";
            }
            if (settings.showCloseButton === null) {
                settings.showCloseButton = !settings.showOnHover;
            }
            $.each(popovers, function() {
                settings.zIndex = Math.max(settings.zIndex, Number(this.css("z-index")) + 2);
            });
            var closeEvent = (settings.showOnHover ? et.MOUSE_LEAVE : et.CLICK_TRIGGER) | (settings.modal ? et.CLICK_OUTSIDE : 0);
            closeEvent = (closeEvent | et.fromStrings(settings.closeEventInclude)) & ~et.fromStrings(settings.closeEventExclude);
            var clickAwayHandler;
            var reposition = function() {
                position(popover, settings, triggers);
            };
            var close = function() {
                if (settings.group) {
                    openGroupPopover[settings.group] = null;
                }
                if (original && original.parents("body")
                    .length) {
                    if (ballMarker && ballMarker.parents("body")
                        .length) {
                        original.hide()
                            .insertAfter(ballMarker);
                        ballMarker.remove();
                        ballMarker = null;
                    } else {
                        original.hide()
                            .appendTo(rootElement());
                    }
                }
                if (original != popover) {
                    popover.remove();
                }
                if (parent) {
                    parent.children.remove(popover);
                }
                for (var i = 0; i < popovers.length; i++) {
                    if (popovers[i] === popover) {
                        popovers.splice(i, 1);
                        break;
                    }
                }
                if (popover.backing) {
                    popover.backing.destroy();
                    popover.backing = null;
                }
                mouseTracker.checkNow();
                if (destroyFunction) {
                    destroyFunction();
                }
                if (settings.onHide) {
                    settings.onHide.call(triggers, popover, settings);
                }
                if (settings.modal && overlay) {
                    if (overlay.fitToScreen) {
                        $(window)
                            .unbind("resize", overlay.fitToScreen);
                    }
                    overlay.remove();
                    overlay = null;
                }
                $(document)
                    .unbind("scroll.AmazonPopover");
                $(document)
                    .unbind("click", clickAwayHandler);
                for (var i = 0; i < children.length; i++) {
                    children[i].close();
                }
                children = [];
                return false;
            };
            var fill = function(content, autoshow) {
                var container = popover.find(".ap_sub_content");
                if (container.length === 0) {
                    container = popover.find(".ap_content");
                }
                if (typeof content == "string") {
                    container.html(content);
                } else {
                    container.empty()
                        .append(content);
                }
                if (typeof settings.autoshow == "boolean" ? settings.autoshow : autoshow) {
                    if ($.browser.msie) {
                        container.children()
                            .show()
                            .hide();
                    }
                    container.children(":not(style)")
                        .show();
                }
                container.find(".ap_custom_close")
                    .click(close);
                if (settings.onFilled) {
                    settings.onFilled.call(triggers, popover, settings);
                }
                return container;
            };
            if (settings.modal && !overlay) {
                overlay = showOverlay(close, settings.zIndex);
            }
            var popover = null;
            var original = null;
            var ballMarker = null;
            if (settings.skin == "default") {
                preparePopover();
                popover = preparedPopover;
                preparedPopover = null;
            } else {
                var skin = $.isFunction(settings.skin) ? settings.skin() : settings.skin;
                skin = skin || "<div><div class='ap_content' /></div>";
                var skinIsHtml = /^[^<]*(<(.|\s)+>)[^>]*$/.test(skin);
                var skinHtml = (skinIsHtml ? skin : skins[skin]);
                popover = $(skinHtml);
            }
            if ($.browser.msie && parseInt($.browser.version, 10) == 6) {
                fixPngs(popover);
            }
            if (settings.skin == "default") {
                popover.find(".ap_content")
                    .css({
                        paddingLeft: settings.paddingLeft,
                        paddingRight: settings.paddingRight,
                        paddingBottom: settings.paddingBottom
                    });
            }
            if (settings.localContent) {
                if (settings.clone) {
                    fill($(settings.localContent)
                        .clone(true), true);
                } else {
                    original = $(settings.localContent);
                    ballMarker = $("<span style='display:none' />")
                        .insertBefore(original);
                    fill(original, true);
                }
            } else {
                if (settings.literalContent) {
                    fill(settings.literalContent);
                }
            }
            if (settings.destination) {
                var destinationUrl = (typeof settings.destination == "function") ? settings.destination() : settings.destination;
                if (settings.cacheable !== false && ajaxCache[destinationUrl]) {
                    fill(ajaxCache[destinationUrl]);
                } else {
                    $.ajax({
                        url: destinationUrl,
                        timeout: settings.ajaxTimeout,
                        success: function(data) {
                            if (settings.onAjaxSuccess) {
                                settings.onAjaxSuccess.apply(settings, arguments);
                            }
                            var contentCacheable = data.match(/^(\s|<!--[\s\S]*?-->)*<\w+[^>]*\s+cacheable="(.*?)"/i) || data.match(/^(\s|<!--[\s\S]*?-->)*<\w+[^>]*\s+cacheable='(.*?)'/i);
                            if (settings.cacheable !== false && (!contentCacheable || contentCacheable[2] !== "0")) {
                                ajaxCache[destinationUrl] = data;
                            }
                            var title = data.match(/^(\s|<!--[\s\S]*?-->)*<\w+[^>]*\s+popoverTitle="(.*?)"/i) || data.match(/^(\s|<!--[\s\S]*?-->)*<\w+[^>]*\s+popoverTitle='(.*?)'/i);
                            if (title) {
                                settings.title = title[2];
                                popover.find(".ap_title")
                                    .html(settings.title);
                            }
                            if (settings.ajaxSlideDuration > 0 && !($.browser.msie && document.compatMode == "BackCompat")) {
                                popover.find(".ap_content")
                                    .hide();
                                fill(data);
                                if (!settings.width) {
                                    position(popover, settings, triggers);
                                }
                                if (settings.onAjaxShow) {
                                    settings.onAjaxShow.call(triggers, popover, settings);
                                }
                                popover.find(".ap_content")
                                    .slideDown(settings.ajaxSlideDuration, function() {
                                        position(popover, settings, triggers);
                                    });
                            } else {
                                fill(data);
                                if (settings.onAjaxShow) {
                                    settings.onAjaxShow.call(triggers, popover, settings);
                                }
                                position(popover, settings, triggers);
                            }
                        },
                        error: function() {
                            var data = null;
                            if (typeof settings.ajaxErrorContent == "function") {
                                data = settings.ajaxErrorContent.apply(settings, arguments);
                            } else {
                                data = settings.ajaxErrorContent;
                            }
                            if (data !== null) {
                                var container = fill(data);
                                var title = container.children("[popoverTitle]")
                                    .attr("popoverTitle");
                                if (title) {
                                    popover.find(".ap_title")
                                        .html(title);
                                }
                                position(popover, settings, triggers);
                            }
                        }
                    });
                }
            }
            if (!settings.localContent && !settings.literalContent && !settings.destination) {
                throw ("AmazonPopover wasn't provided a source of content.");
            }
            if (parent) {
                parent.children.push(popover);
            }
            settings.surround = $.map((popover.attr("surround") || "0,0,0,0")
                .split(","),
                function(n) {
                    return Number(n);
                });
            popover.css({
                zIndex: settings.zIndex,
                position: "absolute",
                left: -2000,
                top: -2000
            });
            popover.click(function(e) {
                if (!e.metaKey) {
                    e.stopPropagation();
                }
                interactedWith = true;
            });
            clickAwayHandler = function(e) {
                var leftButton = e.button === 0 || e.which == 1;
                if (leftButton && !e.metaKey) {
                    close();
                }
            };
            if (closeEvent & et.CLICK_OUTSIDE) {
                $(document)
                    .click(clickAwayHandler);
            }
            popover.mousedown(function(e) {
                if (!children.length) {
                    bringToFront(popover);
                }
            });
            var width = settings.width && (typeof settings.width == "function" ? settings.width() : settings.width);
            if (!width) {
                width = getDynamicWidth(popover, settings) || popover.outerWidth();
            }
            if (width) {
                popover.css("width", width);
            }
            if (settings.followScroll) {
                $(document)
                    .bind("scroll.AmazonPopover", function(e) {
                        settings.followScroll(e);
                    });
            }
            if (settings.title !== null && settings.title !== undefined) {
                var titleBar = popover.find(".ap_titlebar");
                if (settings.skin == "default") {
                    titleBar.css({
                        width: (width - 36)
                    });
                    titleBar.find(".ap_title")
                        .css("width", width - 70);
                    popover.find(".ap_content")
                        .css({
                            paddingTop: 18
                        });
                }
                popover.find(".ap_title")
                    .html(settings.title);
                if (settings.draggable && !settings.modal) {
                    enableDragAndDrop(titleBar, popover);
                }
                titleBar.show();
                if (settings.skin == "default" && settings.wrapTitlebar) {
                    titleBar.addClass("multiline");
                    popover.find(".ap_content")
                        .css({
                            paddingTop: titleBar.outerHeight() - 9
                        });
                }
            } else {
                popover.find(".ap_titlebar")
                    .hide();
            }
            if (settings.showCloseButton !== false) {
                popover.find(".ap_close")
                    .show()
                    .click(close)
                    .mousedown(function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    })
                    .css("cursor", "default");
                if (!settings.title) {
                    popover.find(".ap_content")
                        .css({
                            paddingTop: 10
                        });
                }
                popover.keydown(function(e) {
                    if (e.keyCode == 27) {
                        close();
                    }
                });
            } else {
                popover.find(".ap_close")
                    .css("display", "none");
            }
            if (settings.closeText) {
                popover.find(".ap_closetext")
                    .text(settings.closeText)
                    .show();
            } else {
                popover.find(".ap_closebutton span")
                    .text("Close");
            }
            popover.appendTo(rootElement());
            position(popover, settings, triggers);
            $(document.activeElement)
                .filter("input[type=text], select")
                .blur();
            popover.close = close;
            if (settings.group) {
                if (openGroupPopover[settings.group]) {
                    openGroupPopover[settings.group].close();
                }
                openGroupPopover[settings.group] = popover;
            }
            popover.show();
            if (settings.focusOnShow) {
                popover.get(0)
                    .hideFocus = true;
                popover.focus();
            }
            if (overlay && overlay.snapToLeft) {
                overlay.snapToLeft();
            }
            if (settings.onShow) {
                settings.onShow.call(triggers, popover, settings);
            }
            popover.bounds = [popover.offset()
                .left, popover.offset()
                .top, popover.outerWidth(), popover.outerHeight()
            ];
            popovers.push(popover);
            popover.reposition = reposition;
            popover.close = close;
            popover.settings = settings;
            popover.triggerClicked = function() {
                if (closeEvent & et.CLICK_TRIGGER) {
                    close();
                }
            };
            popover.children = children;
            if (closeEvent & et.MOUSE_LEAVE) {
                var timerID = null;
                var triggerRects = [];
                $.each(triggers, function() {
                    var n = $(this);
                    if (n.is("area")) {
                        var b = boundsOfAreaElement(n);
                        triggerRects.push([b[0], b[1], b[2] - b[0], b[3] - b[1]]);
                    } else {
                        triggerRects.push([n.offset()
                            .left, n.offset()
                            .top, n.outerWidth(), n.outerHeight()
                        ]);
                    }
                });
                if (settings.additionalCursorRects) {
                    $(settings.additionalCursorRects)
                        .each(function() {
                            var n = $(this);
                            triggerRects.push([n.offset()
                                .left, n.offset()
                                .top, n.outerWidth(), n.outerHeight()
                            ]);
                        });
                }
                applyBacking(popover, {
                    solidRectangle: settings.solidRectangle,
                    useIFrame: settings.useIFrame,
                    mouseEnter: function() {
                        if (timerID) {
                            clearTimeout(timerID);
                            timerID = null;
                        }
                        return true;
                    },
                    mouseLeave: function(immediately) {
                        if (settings.semiStatic && interactedWith) {
                            return !children.length;
                        }
                        if (timerID) {
                            clearTimeout(timerID);
                            timerID = null;
                        }
                        if (children.length === 0) {
                            if (immediately) {
                                close();
                            } else {
                                timerID = setTimeout(function() {
                                    close();
                                    timerID = null;
                                }, settings.hoverHideDelay);
                            }
                            return true;
                        }
                        return false;
                    },
                    additionalCursorRects: triggerRects,
                    inside: true
                });
            } else {
                applyBacking(popover, {
                    solidRectangle: settings.solidRectangle,
                    useIFrame: settings.useIFrame
                });
            }
            $(function() {
                for (var i = 0; i < popovers.length; i++) {
                    if (popovers[i].settings.modal) {
                        popovers[i].backing.refreshBounds();
                    }
                }
            });
            return popover;
        };
        var isMobileAgent = function(inclusive) {
            var reAry = ["iPhone", "iPad"];
            if (inclusive) {
                reAry.push("Silk/", "Kindle Fire", "Android", "\\bTouch\\b");
            }
            var reStr = "(" + reAry.join("|") + ")";
            return navigator.userAgent.match(new RegExp(reStr, "i"));
        };
        var getPageWidth = function() {
            return $.browser.msie ? $(window)
                .width() : "100%";
        };
        var getPageHeight = function() {
            return $.browser.msie || isMobileAgent() ? $(document)
                .height() : "100%";
        };
        var showOverlay = function(closeFunction, z) {
            var overlay = $('<div id="ap_overlay"/>');
            if ($.browser.msie) {
                overlay.fitToScreen = function(e) {
                    var windowHeight = $(document)
                        .height();
                    var windowWidth = $(window)
                        .width();
                    var children = overlay.children();
                    overlay.css({
                        width: windowWidth,
                        height: windowHeight,
                        backgroundColor: "transparent",
                        zIndex: z
                    });
                    var appendElements = [];
                    for (var i = 0; i < children.size() || (windowHeight - (i * 2000) > 0); i++) {
                        var paneHeight = Math.min(windowHeight - (i * 2000), 2000);
                        if (paneHeight > 0) {
                            if (i < children.size()) {
                                children.eq(i)
                                    .css({
                                        width: windowWidth,
                                        height: paneHeight
                                    });
                            } else {
                                var slice = $("<div/>")
                                    .css({
                                        opacity: 0.4,
                                        zIndex: z,
                                        width: windowWidth,
                                        height: paneHeight,
                                        top: (i * 2000)
                                    });
                                appendElements.push(slice[0]);
                            }
                        } else {
                            children.eq(i)
                                .remove();
                        }
                    }
                    if (appendElements.length) {
                        overlay.append(appendElements);
                    }
                };
                overlay.snapToLeft = function() {
                    overlay.css("left", $(document)
                        .scrollLeft());
                };
                $(window)
                    .bind("resize load", overlay.fitToScreen);
                $(window)
                    .scroll(overlay.snapToLeft);
                overlay.snapToLeft();
                overlay.fitToScreen();
            } else {
                overlay.css({
                    width: getPageWidth(),
                    height: getPageHeight(),
                    position: ($.browser.mozilla || $.browser.safari) ? "fixed" : "",
                    opacity: 0.4,
                    zIndex: z
                });
            }
            return overlay.appendTo(rootElement());
        };
        var HEADER_HEIGHT = 45;
        var FOOTER_HEIGHT = 35;
        var VERT_ARROW_OFFSET = 327;
        var LEFT_ARROW_OFFSET = 0;
        var RIGHT_ARROW_OFFSET = -51;
        var attachedPositioning = function(popover, targetY, location, position, offset) {
            if (popover.hasClass("ap_popover_sprited")) {
                var dist = targetY - location.top - offset[1];
                if (dist < HEADER_HEIGHT) {
                    dist = HEADER_HEIGHT;
                } else {
                    if (dist > popover.outerHeight() - FOOTER_HEIGHT) {
                        dist = popover.outerHeight() - FOOTER_HEIGHT;
                    }
                }
                var attachingSide = position == "left" ? "right" : "left";
                var elm = popover.find(".ap_body .ap_" + attachingSide);
                if (elm.length > 0) {
                    elm.removeClass("ap_" + attachingSide)
                        .addClass("ap_" + attachingSide + "-arrow");
                } else {
                    elm = popover.find(".ap_body .ap_" + attachingSide + "-arrow");
                }
                var xOffset = attachingSide == "left" ? LEFT_ARROW_OFFSET : RIGHT_ARROW_OFFSET;
                elm.css("backgroundPosition", xOffset + "px " + (dist - VERT_ARROW_OFFSET) + "px");
            }
        };
        var position = function(popover, settings, triggers) {
            if (!settings.width) {
                popover.css("width", getDynamicWidth(popover, settings));
            }
            var offset = settings.locationOffset || [0, 0];
            var location;
            if (typeof settings.location == "function") {
                location = settings.location.call(triggers, popover, settings);
            } else {
                var names = $.map($.makeArray(settings.location), function(n) {
                    return n == "auto" ? ["bottom", "left", "right", "top"] : n;
                });
                var set = settings.locationElement && $(settings.locationElement) || triggers;
                var b = set && boundingRectangle(set);
                location = locationFunction[names[0]](b, popover, settings);
                var index = 0;
                for (var i = 1; i < names.length && !location.fits; i++) {
                    var next = locationFunction[names[i]](b, popover, settings);
                    if (next.fits) {
                        location = next;
                        index = i;
                    }
                }
                if (settings.attached && (names[index] == "left" || names[index] == "right")) {
                    attachedPositioning(popover, (b.top + b.bottom) / 2, location, names[index], offset);
                }
            }
            popover.css({
                left: location.left + offset[0],
                top: location.top + offset[1],
                margin: location.margin,
                right: location.right
            });
            if (popover.backing) {
                popover.backing.refreshBounds();
            }
        };
        var horizPosition = function(b, popover, settings) {
            var align = $.makeArray(settings.align || "left");
            var x = {
                min: $(document)
                    .scrollLeft() + settings.windowMargin - settings.surround[3],
                max: viewport.width() + $(document)
                    .scrollLeft() - settings.windowMargin - popover.outerWidth(),
                left: b.left - settings.surround[3] - settings.alignMargin,
                right: b.right - popover.outerWidth() + settings.surround[1] + settings.alignMargin,
                center: (b.left + b.right - popover.outerWidth()) / 2
            };
            var align = $.grep($.makeArray(settings.align), function(n) {
                return x[n];
            });
            if (align.length === 0) {
                align.push("left");
            }
            for (var i = 0; i < align.length; i++) {
                if (x[align[i]] >= x.min && x[align[i]] <= x.max) {
                    return x[align[i]];
                }
            }
            if (settings.forceAlignment) {
                return x[align[0]];
            }
            if (x.min > x.max) {
                return x.min;
            }
            return x[align[0]] < x.min ? x.min : x.max;
        };
        var vertPosition = function(b, popover, settings) {
            var min = $(document)
                .scrollTop() + settings.windowMargin;
            var max = viewport.height() + $(document)
                .scrollTop() - settings.windowMargin;
            if (settings.attached) {
                var midpoint = (b.top + b.bottom) / 2;
                if (midpoint - HEADER_HEIGHT < min) {
                    min = min + HEADER_HEIGHT < b.bottom ? min : b.bottom - HEADER_HEIGHT;
                }
                if (midpoint + FOOTER_HEIGHT > max) {
                    max = max - FOOTER_HEIGHT > b.top ? max : b.top + FOOTER_HEIGHT;
                }
            } else {
                min = Math.min(b.top - settings.alignMargin, min);
                max = Math.max(b.bottom + settings.alignMargin, max);
            }
            var y = {
                min: min - settings.surround[0],
                max: max - popover.outerHeight() + settings.surround[2],
                top: b.top - settings.surround[0] - settings.alignMargin,
                bottom: b.bottom - popover.outerHeight() + settings.alignMargin + settings.surround[2],
                middle: (b.top + b.bottom - popover.outerHeight()) / 2
            };
            var align = $.grep($.makeArray(settings.align), function(n) {
                return y[n];
            });
            if (align.length === 0) {
                align.push("top");
            }
            for (var i = 0; i < align.length; i++) {
                if (y[align[i]] >= y.min && y[align[i]] <= y.max) {
                    return y[align[i]];
                }
            }
            if (settings.forceAlignment) {
                return y[align[0]];
            }
            if (y.min > y.max) {
                return y.min;
            }
            return y[align[0]] < y.min ? y.min : y.max;
        };
        var locationFunction = {
            centered: function(b, popover, settings) {
                var y = $(window)
                    .scrollTop() + 100;
                return {
                    left: -(popover.outerWidth() / 2),
                    right: 0,
                    top: y,
                    margin: "0% 50%",
                    fits: true
                };
            },
            top: function(b, popover, settings) {
                var room = b.top - $(document)
                    .scrollTop() - settings.locationMargin * 2;
                var triggerInView = (b.left >= $(document)
                    .scrollLeft()) && (b.right < viewport.width() + $(document)
                    .scrollLeft());
                return {
                    left: horizPosition(b, popover, settings),
                    top: b.top - popover.outerHeight() - settings.locationMargin + settings.surround[2],
                    fits: triggerInView && room >= popover.outerHeight() - settings.surround[0] - settings.surround[2]
                };
            },
            left: function(b, popover, settings) {
                var room = b.left - $(document)
                    .scrollLeft() - settings.locationMargin * 2;
                return {
                    left: b.left - popover.outerWidth() - settings.locationMargin + settings.surround[1],
                    top: vertPosition(b, popover, settings),
                    fits: room >= popover.outerWidth() - settings.surround[1] - settings.surround[3]
                };
            },
            bottom: function(b, popover, settings) {
                var room = (viewport.height() + $(document)
                    .scrollTop()) - b.bottom - settings.locationMargin * 2;
                var triggerInView = (b.left >= $(document)
                    .scrollLeft()) && (b.right < viewport.width() + $(document)
                    .scrollLeft());
                return {
                    left: horizPosition(b, popover, settings),
                    top: b.bottom + settings.locationMargin - settings.surround[0],
                    fits: triggerInView && room >= popover.outerHeight() - settings.surround[0] - settings.surround[2]
                };
            },
            right: function(b, popover, settings) {
                var room = (viewport.width() + $(document)
                    .scrollLeft()) - b.right - settings.locationMargin * 2;
                return {
                    left: b.right + settings.locationMargin - settings.surround[3],
                    top: vertPosition(b, popover, settings),
                    fits: room >= popover.outerWidth() - settings.surround[1] - settings.surround[3]
                };
            },
            over: function(b, popover, settings) {
                var alignTo = popover.find(settings.align || ".ap_content *")
                    .offset();
                var corner = popover.offset();
                var padding = {
                    left: alignTo.left - corner.left,
                    top: alignTo.top - corner.top
                };
                var left = b.left - padding.left;
                var top = b.top - padding.top;
                var adjustedLeft = Math.min(left, viewport.width() + $(document)
                    .scrollLeft() - popover.outerWidth() - settings.windowMargin);
                adjustedLeft = Math.max(adjustedLeft, $(document)
                    .scrollLeft() - settings.surround[3] + settings.windowMargin);
                var adjustedTop = Math.min(top, viewport.height() + $(document)
                    .scrollTop() - popover.outerHeight() + settings.surround[2] - settings.windowMargin);
                adjustedTop = Math.max(adjustedTop, $(document)
                    .scrollTop() - settings.surround[0] + settings.windowMargin);
                return {
                    left: settings.forceAlignment ? left : adjustedLeft,
                    top: settings.forceAlignment ? top : adjustedTop,
                    fits: left == adjustedLeft && top == adjustedTop
                };
            }
        };
        var addAliases = function(settings) {
            settings.align = settings.align || settings.locationAlign;
            settings.literalContent = settings.literalContent || settings.loadingContent;
        };
        var preparePopover = function() {
            if (!preparedPopover) {
                var ie6 = $.browser.msie && parseInt($.browser.version, 10) <= 6;
                preparedPopover = $(skins[ie6 ? "default_non_sprited" : "default"])
                    .css({
                        left: -2000,
                        top: -2000
                    })
                    .appendTo(rootElement());
            }
        };
        var fixPngs = function(obj) {
            obj.find("*")
                .each(function() {
                    var match = ($(this)
                            .css("background-image") || "")
                        .match(/url\("(.*\.png)"\)/);
                    if (match) {
                        var png = match[1];
                        $(this)
                            .css("background-image", "none");
                        $(this)
                            .get(0)
                            .runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + png + "',sizingMethod='scale')";
                    }
                });
        };
        var getDynamicWidth = function(popover, settings) {
            var container = popover.find(".ap_content");
            if (settings.skin == "default" && container.length > 0) {
                var tempNode = $('<div class="ap_temp">' + container.html() + "</div>");
                tempNode.css({
                    display: "inline",
                    position: "absolute",
                    top: -9999,
                    left: -9999
                });
                rootElement()
                    .append(tempNode);
                var marginLeft = parseInt(container.parent()
                    .css("margin-left"), 10) || 0;
                var marginRight = parseInt(container.parent()
                    .css("margin-right"), 10) || 0;
                var width = tempNode.width() + marginLeft + marginRight + settings.paddingLeft + settings.paddingRight + 2;
                if (width % 2 !== 0) {
                    width++;
                }
                tempNode.remove();
                return Math.min(width, viewport.width());
            }
            return null;
        };
        var enableDragAndDrop = function(titlebar, popover) {
            titlebar.css("cursor", "move");
            disableSelect(titlebar.get(0));
            titlebar.mousedown(function(e) {
                e.preventDefault();
                disableSelect(document.body);
                var offset = [e.pageX - popover.offset()
                    .left, e.pageY - popover.offset()
                    .top
                ];
                var mousemove = function(e) {
                    e.preventDefault();
                    popover.css({
                        left: e.pageX - offset[0],
                        top: e.pageY - offset[1],
                        margin: 0
                    });
                    if (popover.backing) {
                        popover.backing.reposition(e.pageX - offset[0], e.pageY - offset[1]);
                    }
                };
                var mouseup = function(e) {
                    popover.focus();
                    enableSelect(document.body);
                    $(document)
                        .unbind("mousemove", mousemove);
                    $(document)
                        .unbind("mouseup", mouseup);
                };
                $(document)
                    .mousemove(mousemove)
                    .mouseup(mouseup);
            });
        };
        var disableSelect = function(e) {
            if (e) {
                e.onselectstart = function(e) {
                    return false;
                };
                e.style.MozUserSelect = "none";
            }
        };
        var enableSelect = function(e) {
            if (e) {
                e.onselectstart = function(e) {
                    return true;
                };
                e.style.MozUserSelect = "";
            }
        };
        var boundsOfAreaElement = function(area) {
            area = $(area);
            var coords = $.map(area.attr("coords")
                .split(","),
                function(n) {
                    return Number(n);
                });
            if (area.attr("shape")
                .match(/circle/i)) {
                coords = [coords[0] - coords[2], coords[1] - coords[2], coords[0] + coords[2], coords[1] + coords[2]];
            }
            var x = [],
                y = [];
            for (var i = 0; i < coords.length; i++) {
                (i % 2 === 0 ? x : y)
                .push(coords[i]);
            }
            var min = [Math.min.apply(Math, x), Math.min.apply(Math, y)];
            var max = [Math.max.apply(Math, x), Math.max.apply(Math, y)];
            var mapName = area.parents("map")
                .attr("name");
            var mapImg = $("img[usemap=#" + mapName + "]");
            var map = mapImg.offset();
            map.left += parseInt(mapImg.css("border-left-width"), 10);
            map.top += parseInt(mapImg.css("border-top-width"), 10);
            return [map.left + min[0], map.top + min[1], map.left + max[0], map.top + max[1]];
        };
        $.AmazonPopover = {
            displayPopover: displayPopover,
            mouseTracker: mouseTracker,
            updateBacking: updateBacking,
            support: {
                skinCallback: true,
                controlCallbacks: true
            }
        };
        return true;
    }
})();

/* end popover/amzPopover.js */

/* end merged-core-js-1.6.4/core.js */

/* begin nav-shim/nav-shim.js */
(function(window) {
    document.createElement("header");

    function argArray(args) {
        return [].slice.call(args);
    }

    function serialize(method, args) {
        return {
            m: method,
            a: argArray(args)
        };
    }
    var ndm = function(sourceName) {
        var shim = {};
        shim._sourceName = sourceName;
        shim._replay = [];
        shim.getNow = function(name, otherwise) {
            return otherwise;
        };

        function attach(obj, prepend, method) {
            obj[method] = function() {
                shim._replay.push(prepend.concat(serialize(method, arguments)));
            };
        }
        shim.when = function() {
            var depends = [serialize("when", arguments)];
            var whenIface = {};
            attach(whenIface, depends, "run");
            attach(whenIface, depends, "declare");
            attach(whenIface, depends, "publish");
            attach(whenIface, depends, "build");
            return whenIface;
        };
        attach(shim, [], "declare");
        attach(shim, [], "build");
        attach(shim, [], "publish");
        attach(shim, [], "importEvent");
        ndm._shims.push(shim);
        return shim;
    };
    ndm._shims = [];
    if (!window.$Nav) {
        window.$Nav = ndm("rcx-nav");
    }
    if (!window.$Nav.make) {
        window.$Nav.make = ndm;
    }
}(window));

/* end nav-shim/nav-shim.js */

/* begin search-js-autocomplete/autocomplete.js */
if (!window.$SearchJS && window.$Nav) {
    window.$SearchJS = $Nav.make("sx");
}
if (window.$SearchJS) {
    $SearchJS.when("jQuery")
        .run("autocomplete-lib", function($) {
            (function(window, undefined) {
                var merchRE = /^me=/,
                    refre = /(ref=[-\w]+)/,
                    ltrimre = /^\s+/,
                    spaceNormRe = /\s+/g,
                    ddre = /_dd_/,
                    ddaliasre = /(dd_[a-z]{3,4})(_|$)[\w]*/,
                    deptre = /\{department\}/g,
                    slashre = /\+/g,
                    aliasre = /search-alias\s*=\s*([\w-]+)/,
                    nodere = /node\s*=\s*([\d]+)/,
                    bbnre = /bbn\s*=\s*([\d]+)/,
                    merchantre = /^me=([0-9A-Z]*)/,
                    noissre = /ref=nb_sb_noss/,
                    dcs = "#ddCrtSel",
                    sdpc = "searchDropdown_pop_conn",
                    tostr = Object.prototype.toString,
                    ddBox, metrics = {
                        isEnabled: typeof uet == "function" && typeof uex == "function",
                        init: "iss-init-pc",
                        completionsRequest0: "iss-c0-pc",
                        completionsRequestSample: "iss-cs-pc",
                        sample: 2,
                        noFocusTag: "iss-on-time",
                        focusTag: "iss-late"
                    };
                $.isArray = $.isArray || function(o) {
                    return tostr.call(o) === "[object Array]";
                };
                var SS = function(sb, opt, displayHtml, handlers) {
                    var node = $(displayHtml),
                        parent = opt.pe || sb.parent(),
                        flyout = null,
                        domReady = false,
                        openOnReady = false,
                        noOp = function() {},
                        defaults = {
                            afterCreate: noOp,
                            beforeShow: noOp,
                            afterShow: noOp,
                            beforeHide: noOp,
                            beforeHtmlChange: noOp,
                            afterHtmlChange: noOp,
                            onWindowResize: noOp
                        },
                        events = $.extend({}, defaults, handlers);
                    var navFlyoutAPIExists = function() {
                        return $("#nav-bar-left")
                            .length === 1;
                    };
                    var setHtml = function(h) {
                        events.beforeHtmlChange.call(node, h);
                        node.html(h);
                        events.afterHtmlChange.call(node, h);
                    };
                    var hide = function() {
                        events.beforeHide.call(node, flyout);
                        if (flyout) {
                            flyout.hide();
                        }
                        node.hide();
                        setHtml("");
                    };
                    var show = function() {
                        events.beforeShow.call(node, flyout);
                        node.show();
                        if (flyout) {
                            flyout.show();
                        }
                        events.afterShow.call(node, flyout);
                    };
                    var setReady = function() {
                        domReady = true;
                        if (openOnReady) {
                            show();
                        }
                        events.afterCreate.call(node, flyout);
                    };
                    $Nav.when("nav.inline")
                        .run("SearchSuggestSetup", function() {
                            if (navFlyoutAPIExists() && !$.isArray(opt.src)) {
                                $Nav.when("nav.createFlyout")
                                    .run("SearchSuggestFlyout", function(createFlyout) {
                                        flyout = createFlyout({
                                            name: "Search Suggest",
                                            content: node,
                                            className: "srch_sggst_flyout",
                                            align: {
                                                base: parent,
                                                from: "bottom left",
                                                to: "top left"
                                            },
                                            onAlign: function() {
                                                var width = parent.width();
                                                node.css({
                                                    width: width
                                                });
                                            }
                                        });
                                        setReady();
                                    });
                            } else {
                                setupStatic();
                            }
                        });
                    this.getNode = function() {
                        return node;
                    };
                    this.html = function(h) {
                        setHtml(h);
                        return this;
                    };
                    this.setupStatic = function() {
                        node.appendTo(parent);
                        $(window)
                            .resize(function(e) {
                                events.onWindowResize.call(node, e);
                            });
                        setReady();
                    };
                    this.visible = function() {
                        if (domReady) {
                            if (flyout) {
                                return flyout.isVisible();
                            } else {
                                return node.css("display") != "none";
                            }
                        }
                        return false;
                    };
                    this.hide = function() {
                        if (domReady) {
                            hide();
                        } else {
                            openOnReady = false;
                        }
                        return this;
                    };
                    this.show = function() {
                        if (domReady) {
                            show();
                        } else {
                            openOnReady = true;
                        }
                        return this;
                    };
                };
                var IH = function(updateFunc) {
                    var curIme, ku, kd, validKey, srotationFlag = 0,
                        skeyupFlag = 0,
                        updateKwChange = updateFunc;

                    function clearCurIme(clearRotationFlag) {
                        if (clearRotationFlag && srotationFlag == 1) {
                            srotationFlag = 0;
                        } else {
                            kd = ku = undefined, curIme = "";
                        }
                        if (clearRotationFlag) {
                            validKey = false;
                        }
                    }

                    function keydown(keyCode) {
                        validKey = false;
                        if (srotationFlag != skeyupFlag) {
                            srotationFlag = skeyupFlag = 0;
                        }
                        return keyCode ? kd = keyCode : kd;
                    }

                    function update(sbCurText) {
                        if (updateKwChange) {
                            updateKwChange(sbCurText && sbCurText.length > 0 ? sbCurText + curIme : curIme);
                        }
                    }

                    function keyup(keyCode, sbCurText) {
                        if (keyCode != undefined) {
                            ku = keyCode;
                            if (curIme && curIme.length > 0 && (ku == 8 || ku == 46)) {
                                curIme = curIme.substring(0, curIme.length - 1);
                                if (skeyupFlag == 1) {
                                    skeyupFlag = 0;
                                }
                                validKey = true;
                                update(sbCurText);
                            } else {
                                if (ku >= 65 && ku <= 90) {
                                    var kchar = String.fromCharCode(ku);
                                    curIme += kchar;
                                    validKey = true;
                                    if (skeyupFlag == 1) {
                                        skeyupFlag = 0;
                                    } else {
                                        update(sbCurText);
                                    }
                                }
                            }
                        }
                        return ku;
                    }

                    function shouldHandle() {
                        return kd == 229 || kd == 197;
                    }

                    function isValidKey() {
                        return validKey;
                    }

                    function setFlag() {
                        srotationFlag = 1;
                        skeyupFlag = 1;
                    }
                    this.keydown = keydown;
                    this.keyup = keyup;
                    this.isImeInput = shouldHandle;
                    this.reset = clearCurIme;
                    this.isValidKey = isValidKey;
                    this.setFlag = setFlag;
                };
                var SB = function(sb, h) {
                    var curText, curSel, latestUserInput, imeUsed = false,
                        ih = h.opt.imeEnh && new IH(function(val) {
                            updateKwChange(val);
                        }),
                        wAddIMEReftag = false;
                    init();

                    function init() {
                        if (metrics.isEnabled) {
                            ue.tag(sb.get(0) === document.activeElement ? metrics.focusTag : metrics.noFocusTag);
                        }
                        sb.keydown(keyDown)
                            .keyup(keyUp)
                            .keypress(keyPress)
                            .select(select)
                            .blur(blurHandler)
                            .focus(focusHandler)
                            .click(clickHandler);
                        sb.bind("compositionstart", imeCompositionStart)
                            .bind("compositionend", imeCompositionEnd);
                        latestUserInput = curText = kw();
                    }

                    function kw(k) {
                        if (k !== undefined) {
                            curText = curSel = k;
                            sb.val(k);
                        }
                        return sb.val()
                            .replace(ltrimre, "")
                            .replace(spaceNormRe, " ");
                    }

                    function input(k) {
                        if (k !== undefined) {
                            latestUserInput = k;
                        }
                        return latestUserInput;
                    }

                    function keyDown(e) {
                        var key = e.keyCode,
                            d = key == 38 ? -1 : key == 40 ? 1 : 0;
                        if (ih) {
                            ih.keydown(key);
                        }
                        imeUsed = (key == 229 || key == 197) ? true : ((key >= 48 && key <= 57) || (key >= 65 && key <= 90)) ? false : imeUsed;
                        if (d) {
                            h.adjust(d);
                            if (kw() != "") {
                                e.preventDefault();
                            }
                        }
                        if (h.opt.doCTWKeydown) {
                            h.opt.doCTWKeydown(e);
                        }
                    }

                    function keyUp(e) {
                        var key = e.keyCode;
                        switch (key) {
                            case 13:
                                h.hide();
                                break;
                            case 27:
                                return h.dismiss();
                            case 37:
                            case 38:
                            case 39:
                            case 40:
                                break;
                            default:
                                if (ih && ih.isImeInput()) {
                                    ih.keyup(key, curText);
                                } else {
                                    update(true);
                                }
                                break;
                        }
                    }

                    function keyPress(e) {
                        var key = e.keyCode;
                        switch (key) {
                            case 13:
                                return h.submitEnabled();
                            default:
                                h.keyPress();
                                break;
                        }
                    }

                    function select(e) {
                        if (ih) {
                            ih.setFlag();
                        }
                    }

                    function imeCompositionStart(e) {
                        wAddIMEReftag = true;
                    }

                    function imeCompositionEnd(e) {
                        setTimeout(function() {
                            return (function() {
                                wAddIMEReftag = false;
                            });
                        }(), 200);
                    }

                    function updateKwChange(val) {
                        input(val);
                        h.change(val);
                    }

                    function update(dontCheckCurSel) {
                        var val = kw();
                        if (val != curText && (dontCheckCurSel || val != curSel)) {
                            curText = val;
                            if (ih) {
                                ih.reset(true);
                            }
                            updateKwChange(val);
                        }
                    }

                    function focusHandler(e) {
                        if (ih) {
                            ih.reset();
                        }
                    }

                    function blurHandler(e) {
                        h.dismiss();
                        if (ih) {
                            ih.reset();
                        }
                    }

                    function clickHandler(e) {
                        h.click(kw());
                        if (ih) {
                            ih.reset();
                        }
                    }

                    function isImeEnhUsed() {
                        return imeUsed && h.opt.imeEnh && ih.isValidKey();
                    }
                    this.keyword = function(k) {
                        return kw(k);
                    };
                    this.userInput = function(k) {
                        return input(k);
                    };
                    this.size = function() {
                        if (h.newDesign) {
                            return {
                                width: $("#nav-iss-attach")
                                    .outerWidth(),
                                height: $("#nav-iss-attach")
                                    .outerHeight()
                            };
                        } else {
                            return {
                                width: sb.outerWidth(),
                                height: sb.outerHeight()
                            };
                        }
                    };
                    this.pos = function() {
                        if (h.newDesign) {
                            return $("#nav-iss-attach")
                                .position();
                        } else {
                            return sb.position();
                        }
                    };
                    this.offset = function() {
                        return sb.offset();
                    };
                    this.parent = function() {
                        return sb.parent();
                    };
                    this.hasFocus = function() {
                        return sb.get(0) === document.activeElement;
                    };
                    this.cursorPos = function() {
                        var input = sb.get(0);
                        if ("selectionStart" in input) {
                            return input.selectionStart;
                        } else {
                            if (document.selection) {
                                input.focus();
                                var sel = document.selection.createRange();
                                var selLen = document.selection.createRange()
                                    .text.length;
                                sel.moveStart("character", -input.value.length);
                                return sel.text.length - selLen;
                            }
                        }
                        return -1;
                    };
                    this.update = update;
                    this.isImeEnhUsed = isImeEnhUsed;
                    this.blur = function() {
                        sb.blur();
                    };
                    this.focus = function() {
                        var val = sb.val();
                        sb.focus()
                            .val("")
                            .val(val);
                    };
                    this.keydown = function(h) {
                        sb.keydown(h);
                    };
                    this.click = function(h) {
                        sb.click(h);
                    };
                    this.onFocus = function(h) {
                        sb.focus(h);
                    };
                    this.onBlur = function(h) {
                        sb.blur(h);
                    };
                    this.isImeUsed = function() {
                        return imeUsed;
                    };
                    this.shouldAddIMEReftag = function() {
                        return (h.opt.ime && wAddIMEReftag) || isImeEnhUsed();
                    };
                };
                var AC = function(opts) {
                    var opt = {},
                        names, values, crtSel = -1,
                        crtXcatSel = -1,
                        suggestionList = [],
                        curSize = 0,
                        hideDelayTimerId = null,
                        timer = null,
                        maxCategorySuggestions = 4,
                        imeSpacing = 0,
                        suggestRequest = null,
                        first = -1,
                        defaultDropDownVal, insertedDropDownVal, delayedDOMUpdate = false,
                        staticContent, searchBox, keystroke, sugHandler, searchSuggest, activityAllowed = true,
                        promoList = [],
                        suggType = "sugg",
                        newDesign = $("#navbar")
                        .hasClass("nav-beacon"),
                        defaults = {
                            sb: "#twotabsearchtextbox",
                            form: "#navbar form[name='site-search']",
                            dd: "#searchDropdownBox",
                            cid: "amazon-search-ui",
                            action: "",
                            sugPrefix: "issDiv",
                            sugText: "Search suggestions",
                            xcat: 0,
                            fb: 0,
                            imeSpacing: 0,
                            maxSuggestions: 10
                        },
                        redirectFirstSuggestion = false,
                        X_CAT_SUGGESTION_NO_IMPROVEMENT = 0,
                        X_CAT_SUGGESTION_IMPROVEMENT_WITHOUT_KEYWORD = 1,
                        X_CAT_SUGGESTION_IMPROVEMENT_WITH_KEYWORD = 2,
                        lastXCatSuggestionPosition = -1,
                        hasFallbackSuggestion = false,
                        isDeepNode = false,
                        MARKETPLACE_CN = 3240,
                        lastKeyPressTime, timeToFirstSuggestion = 0,
                        searchAliasFrom, defaultTimeout = 100,
                        reqCounter = 0,
                        imeEnhUsed = false,
                        departmentResultStyle = 0,
                        overrideDepartmentWeblab = false,
                        deptDataArr = undefined;
                    opts && init(opts);

                    function init(opts) {
                        $.extend(opt, defaults, opts);
                        newDesign = opt.isNavInline && newDesign;
                        deptDataArr = DepartmentModule.createDataArray($, opt);
                        var src = opt.src,
                            resizeToken = null;
                        staticContent = $.isArray(src);
                        lookup(opt, "sb");
                        if (!opt.sb) {
                            return;
                        }
                        searchBox = new SB(opt.sb, {
                            adjust: move,
                            hide: hideSuggestions,
                            dismiss: dismissSuggestions,
                            change: (staticContent ? update : delayUpdate),
                            submitEnabled: submitEnabled,
                            keyPress: keyPress,
                            click: clickHandler,
                            newDesign: newDesign,
                            opt: opt
                        });
                        lookup(opt, "pe");
                        searchSuggest = new SS(searchBox, opt, '<div id="srch_sggst" style="display:none"/>', {
                            afterCreate: resizeHandler,
                            onWindowResize: resizeHandler,
                            beforeShow: resizeHandler
                        });
                        lookup(opt, "form");
                        lookup(opt, "valInput");
                        lookup(opt, "dd");
                        lookup(opt, "submit");
                        ddBox = opt.dd;
                        opt.protocol = opt.protocol || window.document.location.protocol || "http:";
                        if (ddBox) {
                            defaultDropDownVal = ddBox.val();
                        }
                        if (staticContent) {
                            names = src[0];
                            values = src[1];
                            opt.sb.removeAttr("style");
                            searchSuggest.setupStatic();
                        } else {}
                        if (opt.submit) {
                            disable("disabled");
                            opt.submitImgDef = opt.submit.attr("src");
                            opt.submitToggle = opt.submitImgDef && opt.submitImg;
                        }
                        if (opt.ime) {
                            window.setInterval(function() {
                                searchBox.update();
                            }, 20);
                        }
                        $SearchJS.importEvent("navbarPromos");
                        $SearchJS.when("navbarPromos")
                            .run("autocomplete-navbarPromos", function() {
                                promoList = window.navbar.issPromotions(3);
                            });
                    }

                    function initStatic(sb, form, valInput, submit, submitImg, names, values, noMatch, ime, multiword, dummy0) {
                        init({
                            form: form,
                            ime: ime,
                            multiword: multiword,
                            noMatch: noMatch,
                            sb: sb,
                            src: [names, values],
                            submit: submit,
                            submitImg: submitImg,
                            valInput: valInput
                        });
                    }

                    function initDynamic(sb, form, dd, service, mkt, aliases, handler, deptText, sugText, sc, dummy0) {
                        init({
                            aliases: aliases,
                            dd: dd,
                            deptText: deptText,
                            form: form,
                            handler: handler,
                            ime: (mkt == 6 || mkt == 3240),
                            mkt: mkt,
                            sb: sb,
                            sc: sc,
                            src: service,
                            sugText: sugText
                        });
                    }

                    function lookup(h, k, n) {
                        if (n = h[k]) {
                            n = $(n);
                            if (n && n.length) {
                                h[k] = n;
                                return n;
                            }
                        }
                        delete h[k];
                    }

                    function disable(d) {
                        if (opt.submit.prop) {
                            opt.submit.prop("disabled", d);
                        } else {
                            opt.submit.attr("disabled", d);
                        }
                    }

                    function move(n) {
                        if (curSize <= 0) {
                            return;
                        }
                        try {
                            unhighlightCurrentSuggestion();
                            if (n > 0 && crtSel >= curSize - 1) {
                                crtSel = -1;
                            } else {
                                if (n < 0 && crtSel < 0) {
                                    crtSel = curSize - 1;
                                } else {
                                    crtSel += n;
                                }
                            }
                            highlightCurrentSuggestion(true);
                        } catch (e) {}
                    }

                    function wrap(x, min, max) {
                        return x > max ? min : (x < min ? max : x);
                    }

                    function clickHandler(kw) {
                        if (!kw.length) {
                            displayPromotions();
                        } else {
                            if (opt.triggerISSOnClick && !searchSuggest.visible() && $("#navFooter") && $("#navFooter")
                                .is(":visible")) {
                                searchJSONSuggest();
                            }
                        }
                    }

                    function hideSuggestions() {
                        !opt.ime && hideSuggestionsDiv();
                    }

                    function dismissSuggestions() {
                        if (searchSuggest.visible()) {
                            hideDelayTimerId = setTimeout(function() {
                                return (function() {
                                    hideDelayTimerId = null;
                                    hideSuggestionsDiv();
                                });
                            }(), 300);
                            crtSel = -1;
                            if (suggType == "sugg") {
                                updateCrtSuggestion();
                            }
                            return false;
                        }
                        return true;
                    }

                    function update(kw) {
                        suggestionList = [];
                        if (!kw.length) {
                            displayPromotions();
                        } else {
                            first = -1;
                            if (opt.multiword) {
                                findSeq();
                            } else {
                                findBin();
                            }
                            curSize = suggestionList.length;
                            displaySuggestions(kw);
                            checkForExactMatch();
                            checkForManualOverride();
                        }
                        timer = null;
                        crtSel = -1;
                        crtXcatSel = -1;
                    }

                    function delayUpdate(kw) {
                        var then = now(),
                            newImeEnhUsed = searchBox.isImeEnhUsed();
                        if (timer) {
                            clearTimeout(timer);
                            timer = null;
                        }
                        var timeout = defaultTimeout,
                            noneKeyword = !kw || !kw.length;
                        if (noneKeyword && searchBox.isImeUsed()) {
                            timeout = 200;
                        }
                        timer = setTimeout(function() {
                            return (function() {
                                if (noneKeyword) {
                                    displayPromotions();
                                } else {
                                    opt.imeEnh ? searchJSONSuggest(kw, newImeEnhUsed) : searchJSONSuggest();
                                }
                                timer = null;
                                crtSel = -1;
                                crtXcatSel = -1;
                            });
                        }(), timeout);
                    }

                    function submitEnabled() {
                        if (suggType == "promo" && crtSel > -1) {
                            document.location.href = promoList[crtSel].href;
                            return false;
                        }
                        var s = opt.submit;
                        if (s) {
                            return s.prop ? !s.prop("disabled") : !s.attr("disabled");
                        }
                    }

                    function keyPress(key) {
                        keystroke && keystroke(key);
                    }

                    function bindSubmit(handler) {
                        opt.form.submit(handler);
                    }

                    function bindKeypress(handler) {
                        keystroke = handler;
                    }

                    function bindSuggest(handler) {
                        sugHandler = handler;
                    }

                    function normalize(s) {
                        if (opt.normalize) {
                            return opt.normalize(s);
                        } else {
                            return s.toLowerCase();
                        }
                    }

                    function findBin() {
                        var low = 0,
                            high = names.length - 1,
                            mid = -1,
                            dataPrefix = "",
                            crtPrefix = normalize(keyword()),
                            len = crtPrefix.length;
                        while (low <= high) {
                            mid = Math.floor((low + high) / 2);
                            dataPrefix = normalize(names[mid])
                                .substr(0, len);
                            if (dataPrefix < crtPrefix) {
                                low = mid + 1;
                            } else {
                                high = mid - 1;
                                if (dataPrefix == crtPrefix) {
                                    first = mid;
                                }
                            }
                        }
                        if (first != -1) {
                            var i = first,
                                n;
                            do {
                                suggestionList.push({
                                    keyword: names[i],
                                    i: i
                                });
                                ++i;
                            } while (suggestionList.length < opt.maxSuggestions && (n = names[i]) && !normalize(n)
                                .indexOf(crtPrefix));
                        }
                    }

                    function findSeq() {
                        var crtPrefix = normalize(keyword()),
                            rexp = new RegExp("(^|(?:\\s))" + crtPrefix, "i"),
                            i = 0,
                            len = names.length,
                            n;
                        for (; i < len && suggestionList.length < opt.maxSuggestions; i++) {
                            n = names[i];
                            if (normalize(n)
                                .match(rexp)) {
                                suggestionList.push({
                                    keyword: n,
                                    i: i
                                });
                                if (first == -1) {
                                    first = i;
                                }
                            }
                        }
                    }

                    function checkForExactMatch() {
                        var state = "disabled";
                        if (curSize) {
                            var sg = normalize(suggestionList[0].keyword),
                                kw = normalize(keyword());
                            if (sg.length == kw.length && !getPrefixPos(sg, kw)) {
                                updateForm(first);
                                state = "";
                            }
                        }
                        disable(state);
                    }

                    function checkForManualOverride() {
                        if (opt.manualOverride && !curSize) {
                            var kw = keyword();
                            var url = opt.manualOverride(kw);
                            if (url && url.length) {
                                updateWholeForm(url);
                                disable("");
                            }
                        }
                    }

                    function displayPromotions() {
                        if (!newDesign || !promoList || promoList.length == 0) {
                            hideSuggestionsDiv();
                            hideNoMatches();
                            return;
                        }
                        curSize = promoList.length;
                        suggType = "promo";
                        searchSuggest.html("");
                        hideNoMatches();
                        searchSuggest.show();
                        h = '<ul class="promo_list">';
                        for (i = 0; i < curSize; i++) {
                            p = promoList[i];
                            h += '<li id="' + opt.sugPrefix + i + '" onclick="document.location.href=\'' + p.href + "'\">";
                            h += '<div class="promo_image" style="background-image: url(\'' + p.image + "');\"></div>";
                            h += '<div class="promo_cat">' + p.category + "</div>";
                            h += '<div class="promo_title">' + p.title + "</div>";
                            h += "</li>";
                        }
                        h += "</ul>";
                        searchSuggest.html(h);
                        window.navbar.logImpression("iss");
                        for (i = 0; i < curSize;
                            ++i) {
                            $("#" + opt.sugPrefix + i)
                                .mouseover(suggestOver)
                                .mouseout(suggestOut);
                        }
                    }

                    function escapeRegExp(string) {
                        return string.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
                    }

                    function matchDepartments(searchTerm) {
                        if ((!opt.isDigitalFeaturesEnabled && !overrideDepartmentWeblab) || searchTerm.length != $(defaults.sb)
                            .val()
                            .length) {
                            return;
                        }
                        var $departments = $("#searchDropdownBox option"),
                            deptIssMatchArr = new Array();
                        var regex = new RegExp("\\b" + escapeRegExp(searchTerm) + "(.*)", "i");
                        if (searchTerm.length >= DepartmentModule.getMinNumOfChars()) {
                            $.each(deptDataArr, function(index, obj) {
                                if (deptIssMatchArr.length === DepartmentModule.getMaxNumOfResults()) {
                                    return false;
                                }
                                if (regex.test(obj.triggerWords) || regex.test(obj.name)) {
                                    DepartmentModule.logImpression(obj.alias);
                                    obj.position = deptIssMatchArr.length === 0 ? 0 : deptIssMatchArr.length + 1;
                                    deptIssMatchArr.push(obj);
                                    curSize++;
                                    if (lastXCatSuggestionPosition > 0) {
                                        lastXCatSuggestionPosition++;
                                    }
                                }
                            });
                            $.each(deptIssMatchArr, function(index) {
                                suggestionList.splice(index, 0, deptIssMatchArr[index]);
                            });
                        }
                    }

                    function generateIssResultHtml(resultObject, crtPrefix, sPrefix, index) {
                        var html = "",
                            resultHtml = "",
                            isDepartmentIssResult = resultObject.type === DepartmentModule.getType();
                        if (isDepartmentIssResult) {
                            resultHtml = getFormattedDepartmentResultHtml(resultObject, crtPrefix);
                        } else {
                            if (resultObject.alias) {
                                resultHtml = getFormattedCategoryLine(resultObject, crtPrefix);
                            } else {
                                resultHtml = getFormattedSuggestionLine(resultObject, crtPrefix);
                            }
                        }
                        var isLastXCatSuggestionPositionOk = index == (lastXCatSuggestionPosition + 1) && lastXCatSuggestionPosition > 0;
                        if (!isDepartmentIssResult && enableSeparateCategorySuggestion() && isLastXCatSuggestionPositionOk) {
                            html += '<div class="sx_line_holder" />';
                        }
                        var className = "suggest_link";
                        if (index == 0 && imeSpacing) {
                            className += " imeSpacing";
                        }
                        var suggestionDivId = sPrefix + index;
                        html += '<div id="' + suggestionDivId + '" class="' + className + '">' + resultHtml + "</div>";
                        return html;
                    }

                    function buildDropdownHtml(crtPrefix, sPrefix) {
                        var dropdownHtml = "";
                        if (curSize > 0) {
                            hideNoMatches();
                            searchSuggest.show();
                            if (!staticContent && !newDesign) {
                                dropdownHtml += '<div id="sugdivhdr"> ' + opt.sugText + "</div>";
                            }
                        } else {
                            showNoMatches();
                        }
                        for (i = 0; i < curSize; i++) {
                            var suggestion = suggestionList[i];
                            if (i > 0 && suggestionList[i - 1].type !== suggestion.type) {
                                dropdownHtml += '<div class="sx_line_holder" />';
                            }
                            dropdownHtml += generateIssResultHtml(suggestion, crtPrefix, sPrefix, i);
                        }
                        if (curSize > 0 && !newDesign) {
                            dropdownHtml += '<div id="sugdivhdr2" align="right">&nbsp;</div>';
                        }
                        return dropdownHtml;
                    }

                    function displaySuggestions(crtPrefix) {
                        var lineText, sPrefix = opt.sugPrefix,
                            prefix = "#" + sPrefix,
                            h = "",
                            imeSpacing = opt.imeSpacing && searchBox.isImeUsed(),
                            currAlias = searchAlias() || (opt.deepNodeISS && opt.deepNodeISS.searchAliasAccessor()),
                            suggType = "sugg",
                            i;
                        searchSuggest.html("");
                        matchDepartments(crtPrefix);
                        var dropdownHtml = buildDropdownHtml(crtPrefix, sPrefix);
                        dropdownHtml && searchSuggest.html(dropdownHtml);
                        if (timeToFirstSuggestion == 0 && suggestionList.length > 0) {
                            recordTimeToFirstSuggestion();
                        }
                        if (ddBox) {
                            defaultDropDownVal = ddBox.val();
                        }
                        searchAliasFrom = extractSearchAlias(defaultDropDownVal);
                        for (i = 0; i < curSize;
                            ++i) {
                            $(prefix + i)
                                .mouseover(suggestOver)
                                .mouseout(suggestOut)
                                .click(setSearchByIndex);
                        }
                        if (opt.doCTWDisplay) {
                            opt.doCTWDisplay();
                        }
                        removeAliasAndCategoryInforForMainSuggestion(suggestionList[0]);
                    }

                    function recordTimeToFirstSuggestion() {
                        var timeNow = now();
                        timeToFirstSuggestion = (timeNow - lastKeyPressTime) + defaultTimeout;
                    }

                    function showNoMatches() {
                        if (opt.noMatch) {
                            var nmDiv = $("#" + opt.noMatch);
                            searchSuggest.html("");
                            searchSuggest.getNode()
                                .append(nmDiv.clone()
                                    .attr("class", "suggest_link suggest_nm")
                                    .css({
                                        "display": "block"
                                    }));
                            searchSuggest.show();
                            opt.submitToggle && opt.submit.attr("src", opt.submitImg);
                        } else {
                            hideSuggestionsDiv();
                        }
                    }

                    function hideNoMatches() {
                        if (opt.noMatch) {
                            $("#" + opt.noMatch)
                                .hide();
                            opt.submitToggle && opt.submit.attr("src", opt.submitImgDef);
                        }
                    }

                    function setSearchByIndex() {
                        var divId = this.id;
                        crtSel = parseInt(divId.substr(6), 10);
                        var imeReftagPrefix = searchBox.shouldAddIMEReftag() ? "ime_" : undefined;
                        updateCrtSuggestion(imeReftagPrefix);
                        searchSuggest.hide();
                        if (!delayedDOMUpdate) {
                            opt.form.submit();
                        } else {
                            window.setTimeout(function() {
                                opt.form.submit();
                            }, 10);
                        }
                    }

                    function updateCrtSuggestion(reftagPrefix) {
                        var alias, categoryName, sg;
                        if (crtSel >= 0) {
                            if (redirectFirstSuggestion && crtSel == 0) {
                                sg = suggestionList[1];
                            } else {
                                sg = suggestionList[crtSel];
                            }
                            keyword(sg.keyword);
                            alias = sg.alias;
                            categoryName = sg.categoryName;
                        }
                        if (staticContent) {
                            if (crtSel >= 0) {
                                updateForm(sg.i);
                                disable("");
                            } else {
                                checkForExactMatch();
                                checkForManualOverride();
                            }
                        } else {
                            updateCategoryDropDown(alias, categoryName);
                            setDynamicSearch(sg, reftagPrefix);
                        }
                    }
                    opt.form && opt.form.submit(function() {
                        var currentKeyword = normalize(keyword()),
                            refTag = "ref=nb_sb_noss",
                            i = 0;
                        if (crtSel > -1) {
                            return;
                        }
                        var sgList = suggestionList;
                        if (sgList.length > 0) {
                            refTag = "ref=nb_sb_noss_2";
                            while (i < sgList.length) {
                                if (normalize(sgList[i].keyword) == currentKeyword) {
                                    refTag = "ref=nb_sb_noss_1";
                                    break;
                                }
                                i++;
                            }
                        }
                        opt.form.attr("action", opt.form.attr("action")
                            .replace(refre, refTag));
                    });

                    function setDynamicSearch(sg, reftagPrefix) {
                        var prefixElems = $("#issprefix"),
                            departmentType = DepartmentModule.getType();
                        if (sg) {
                            var issMode, issModePrefix = "ss_",
                                kw = searchBox.userInput();
                            if (reftagPrefix) {
                                issModePrefix += reftagPrefix;
                            }
                            if (isFallbackSuggestion(sg)) {
                                issMode = issModePrefix + "fb";
                            } else {
                                if (sg.alias) {
                                    issMode = issModePrefix + "c";
                                } else {
                                    if (opt.sc && isSpellCorrection(sg)) {
                                        issMode = issModePrefix + "sc";
                                    } else {
                                        if (sg.type === departmentType) {
                                            issMode = issModePrefix + departmentType;
                                        } else {
                                            issMode = issModePrefix + "i";
                                        }
                                    }
                                }
                            }
                            setSearchFormReftag(opt.form, null, issMode, sg, kw.length);
                            kw = kw + "," + searchAliasFrom + "," + timeToFirstSuggestion;
                            if (prefixElems.length) {
                                prefixElems.attr("value", kw);
                            } else {
                                input(opt.form, "issprefix", "sprefix", kw);
                            }
                        } else {
                            prefixElems.remove();
                        }
                    }

                    function resizeHandler(flyout) {
                        if (flyout) {
                            return;
                        }
                        var p = searchBox.pos(),
                            d = searchBox.size();
                        this.css({
                            width: d.width,
                            top: p.top + d.height,
                            left: p.left
                        });
                    }

                    function suggestOver(event) {
                        this.style.cursor = newDesign == true ? "pointer" : "default";
                        unhighlightCurrentSuggestion();
                        crtSel = parseInt(this.id.substr(opt.sugPrefix.length), 10);
                        highlightCurrentSuggestion(false);
                    }

                    function suggestOut(el, event) {
                        unhighlightSuggestion($(this));
                        crtSel = -1;
                    }

                    function highlightSuggestion(suggestion) {
                        suggestion.addClass("suggest_link_over");
                    }

                    function unhighlightSuggestion(suggestion) {
                        suggestion.removeClass("suggest_link_over");
                    }

                    function highlightCurrentSuggestion(updateSearchBox) {
                        if (suggType == "sugg") {
                            updateSearchBox && updateCrtSuggestion();
                        }
                        highlightSuggestion($("#" + opt.sugPrefix + crtSel));
                    }

                    function unhighlightCurrentSuggestion() {
                        unhighlightSuggestion($("#" + opt.sugPrefix + crtSel));
                    }

                    function updateCategoryDropDown(alias, categoryName) {
                        var dd = ddBox,
                            toRemove, val;
                        if (!dd) {
                            return;
                        }
                        val = alias ? ("search-alias=" + alias) : defaultDropDownVal;
                        toRemove = (val == insertedDropDownVal || defaultDropDownVal == insertedDropDownVal) ? null : insertedDropDownVal;
                        if (alias) {
                            var sel = findOption(dd, val);
                            insertedDropDownVal = null;
                            if (!sel.length) {
                                dd.append(option(val, categoryName));
                                insertedDropDownVal = val;
                            }
                        }
                        try {
                            delayedDOMUpdate = false;
                            $(dcs)
                                .length && changeDropdownSelection(val, categoryName, true);
                            dd.val(val);
                        } catch (e) {
                            delayedDOMUpdate = true;
                        }
                        toRemove && findOption(dd, toRemove)
                            .remove();
                    }

                    function getPrefixPos(str, substr) {
                        if (opt.multiword) {
                            return getPrefixPosMultiWord(str, substr);
                        }
                        return normalize(str)
                            .indexOf(normalize(substr));
                    }

                    function getPrefixPosMultiWord(str, substr) {
                        var p = normalize(str)
                            .search(new RegExp("(^|(?:\\s))" + normalize(substr), "i"));
                        return p <= 0 ? p : p + 1;
                    }

                    function getFormattedSuggestionLine(curSuggestionLine, crtPrefix, customKeywordKey) {
                        var kw = customKeywordKey ? curSuggestionLine[customKeywordKey] : curSuggestionLine.keyword;
                        var start = getPrefixPos(kw, crtPrefix),
                            len;
                        if (start !== -1) {
                            len = crtPrefix.length;
                            kw = [kw.substr(0, start), "<b>", kw.substr(start, len), "</b>", kw.substr(start + len)].join("");
                        }
                        return kw;
                    }

                    function getFormattedCategoryLine(categoryLine, crtPrefix) {
                        var formattedCategoryLine, formattedCategoryName, deptText;
                        if (!opt.deptText) {
                            return categoryLine.categoryName;
                        } else {
                            if (enableCatSuggestionImprovementWithoutKeyword()) {
                                formattedCategoryLine = '<span class="suggest_category_without_keyword">';
                                formattedCategoryName = '<span class="sx_category_name_highlight">' + categoryLine.categoryName + "</span>";
                            } else {
                                if (enableCatSuggestionImprovementWithKeyword()) {
                                    formattedCategoryLine = getFormattedSuggestionLine(categoryLine, crtPrefix) + " <span>";
                                    formattedCategoryName = '<span class="sx_category_name_highlight">' + categoryLine.categoryName + "</span>";
                                } else {
                                    formattedCategoryLine = getFormattedSuggestionLine(categoryLine, crtPrefix) + ' <span class="suggest_category">';
                                    formattedCategoryName = categoryLine.categoryName;
                                }
                            }
                            return formattedCategoryLine + opt.deptText.replace(deptre, formattedCategoryName) + "</span>";
                        }
                    }

                    function getFormattedDepartmentResultHtml(departmentObj, searchTerm) {
                        var html = "",
                            openSpanTag = '<span class="sx_category_name_highlight">',
                            closeSpanTag = "</span>",
                            departmentWithBoldSearchTerm = getFormattedSuggestionLine(departmentObj, searchTerm, "name"),
                            shouldAppendStore = departmentObj.alias !== "gift-cards" && departmentObj.alias !== "digital-text",
                            departmentString = departmentWithBoldSearchTerm + (shouldAppendStore ? " Store" : "");
                        switch (departmentResultStyle) {
                            case 0:
                                html = openSpanTag + "Shop the " + departmentString + closeSpanTag;
                                break;
                            case 1:
                                html = "Shop the " + openSpanTag + departmentString + closeSpanTag;
                                break;
                            case 2:
                                html = "go to " + openSpanTag + departmentWithBoldSearchTerm + closeSpanTag;
                                break;
                            default:
                                html = openSpanTag + departmentWithBoldSearchTerm + closeSpanTag;
                                break;
                        }
                        return html;
                    }

                    function hideSuggestionsDiv() {
                        if (suggType == "sugg" && suggestRequest) {
                            suggestRequest.cleanup();
                            suggestRequest = null;
                        }
                        curSize = 0;
                        searchSuggest.hide();
                        crtSel = -1;
                        crtXcatSel = -1;
                    }

                    function updateWholeForm(v) {
                        var fp = getFormParams(v);
                        cleanForm();
                        populateForm(fp);
                    }

                    function updateForm(index) {
                        var v = values[index];
                        if (opt.valInput && opt.valInput.length) {
                            opt.valInput.attr("value", v);
                        } else {
                            updateWholeForm(v || location.href);
                        }
                    }

                    function getFormParams(url) {
                        var splitUrl = url.split("?"),
                            query = splitUrl.length > 1 ? splitUrl[1] : undefined,
                            params = query ? query.split("&") : [],
                            i = params.length,
                            pair;
                        while (i-- > 0) {
                            pair = params[i].split("=");
                            params[i] = {
                                name: pair[0],
                                value: pair[1].replace(slashre, " ")
                            };
                        }
                        return {
                            uri: splitUrl[0],
                            formParams: params
                        };
                    }

                    function cleanForm() {
                        opt.form.find(".frmDynamic")
                            .remove();
                    }

                    function populateForm(formData) {
                        opt.form.attr("action", formData.uri);
                        for (var i = 0; i < formData.formParams.length; i++) {
                            var param = formData.formParams[i];
                            input(opt.form, "frmDynamic", param.name, unescape(decodeURIComponent(param.value)), 1);
                        }
                    }

                    function keyword(k) {
                        return searchBox.keyword(k);
                    }

                    function searchAlias(alias) {
                        if (alias) {
                            changeDropdownSelection(alias);
                        } else {
                            return extractSearchAlias(ddBox.attr("value"));
                        }
                    }

                    function extractSearchAlias(alias) {
                        var aliasName = alias.match(aliasre);
                        return aliasName ? aliasName[1] : null;
                    }

                    function searchNode() {
                        var nodeName = ddBox.attr("value")
                            .match(nodere);
                        return nodeName ? nodeName[1] : null;
                    }

                    function bbnNode() {
                        var nodeName = ddBox.attr("value")
                            .match(bbnre);
                        return nodeName ? nodeName[1] : null;
                    }

                    function merchant() {
                        var merchant = ddBox.attr("value")
                            .match(merchantre);
                        return merchant ? merchant[1] : null;
                    }

                    function suggestions() {
                        return suggestionList;
                    }

                    function supportedSearchAlias(alias) {
                        var a = opt.aliases;
                        return a && ((a === "*") || (arrayIndexOf(a, alias) >= 0));
                    }

                    function isSpellCorrection(sg) {
                        return sg && sg.sc ? true : false;
                    }

                    function isFallbackSuggestion(sg) {
                        return (sg && sg.source && sg.source[0] == "fb");
                    }

                    function combineSuggestions(crtSuggestions, extraData) {
                        var xcatSuggestions, n = crtSuggestions.length,
                            combinedList = [],
                            i = 0,
                            sg, deepNodeAlias = (!searchAlias() && opt.deepNodeISS && opt.deepNodeISS.searchAliasAccessor()),
                            deepNodeCatName = deepNodeAlias && (getDDCatName(deepNodeAlias) || (opt.deepNodeISS && opt.deepNodeISS.searchAliasDisplayNameAccessor()));
                        lastXCatSuggestionPosition = 0;
                        redirectFirstSuggestion = false;
                        hasFallbackSuggestion = false;
                        isDeepNode = deepNodeAlias && deepNodeCatName;
                        while (combinedList.length < opt.maxSuggestions && i < n) {
                            sg = {
                                keyword: crtSuggestions[i],
                                sc: isSpellCorrection(extraData[i]),
                                sgIndex: i
                            };
                            if (isDeepNode) {
                                sg.alias = deepNodeAlias;
                                sg.categoryName = deepNodeCatName;
                            }
                            combinedList.push(sg);
                            xcatSuggestions = (extraData && extraData.length ? extraData[i].nodes : []) || [];
                            if (xcatSuggestions.length) {
                                buildCategorySuggestion(combinedList, xcatSuggestions, extraData, crtSuggestions, i);
                            }
                            if (i == 0 && lastXCatSuggestionPosition > 0 && enableCatSuggestionImprovementWithoutKeyword() && !redirectFirstSuggestion) {
                                combinedList.push(combinedList[0]);
                                opt.maxSuggestions += 1;
                            }++i;
                        }
                        curSize = combinedList.length;
                        return combinedList;
                    }

                    function buildCategorySuggestion(combinedList, xcatSuggestions, extraData, crtSuggestions, crtIndex) {
                        var size = crtSuggestions.length,
                            cs, s, si = 0,
                            j = 0,
                            catIndex = 0,
                            crtSuggestion = crtSuggestions[crtIndex];
                        xcatSuggestions = (extraData && extraData.length ? extraData[crtIndex].nodes : []) || [];
                        s = extraData[crtIndex].source;
                        if (s && s.length) {
                            for (si = 0; si < s.length; si++) {
                                if (s[si] === "fb") {
                                    if (size == 1 && enableCatSuggestionImprovementWithoutKeyword()) {
                                        redirectFirstSuggestion = true;
                                    } else {
                                        combinedList.pop();
                                    }
                                    hasFallbackSuggestion = true;
                                    break;
                                }
                            }
                        }
                        if (enableCatSuggestionImprovementWithKeyword() && !hasFallbackSuggestion) {
                            buildCustomCategorySuggestion(combinedList, extraData, crtSuggestion, crtIndex);
                            catIndex = combinedList.length;
                        }
                        m = xcatSuggestions.length;
                        while (j < m && j < maxCategorySuggestions && combinedList.length < opt.maxSuggestions) {
                            cs = xcatSuggestions[j];
                            addCategorySuggestion(combinedList, extraData, crtSuggestion, cs.alias, cs.name, crtIndex, catIndex);
                            ++j;
                            ++catIndex;
                        }
                        lastXCatSuggestionPosition = combinedList.length - 1;
                    }

                    function buildCustomCategorySuggestion(combinedList, extraData, crtSuggestion, crtIndex) {
                        var currAlias = searchAlias(),
                            currCatName = getDDCatName(currAlias),
                            apsAlias = "aps";
                        if (combinedList[0].alias || combinedList[0].categoryName) {
                            combinedList[0].sn = true;
                        } else {
                            addAliasAndCategoryInforForMainSuggestion(combinedList[0], currAlias, currCatName);
                        }
                        if (currAlias != apsAlias) {
                            addCategorySuggestion(combinedList, extraData, crtSuggestion, apsAlias, getDDCatName(apsAlias), crtIndex, 1);
                            opt.maxSuggestions += 1;
                        }
                    }

                    function addAliasAndCategoryInforForMainSuggestion(mainSuggestion, currAlias, currCatName) {
                        mainSuggestion.alias = currAlias;
                        mainSuggestion.categoryName = currCatName;
                    }

                    function removeAliasAndCategoryInforForMainSuggestion(mainSuggestion) {
                        if (!(enableCatSuggestionImprovementWithKeyword() && !hasFallbackSuggestion && mainSuggestion)) {
                            return;
                        }
                        var isDepartmentIssFeature = false;
                        if ((opt.isDigitalFeaturesEnabled || overrideDepartmentWeblab) && mainSuggestion.hasOwnProperty("type")) {
                            isDepartmentIssFeature = mainSuggestion.type === DepartmentModule.getType();
                        }
                        if (!isDepartmentIssFeature && !mainSuggestion.sn) {
                            mainSuggestion.alias = undefined;
                            mainSuggestion.categoryName = undefined;
                        }
                    }

                    function addCategorySuggestion(combinedList, extraData, crtSuggestion, catAlias, catName, crtIndex, catIndex) {
                        var sg = {
                            keyword: crtSuggestion,
                            sc: isSpellCorrection(extraData[crtIndex]),
                            source: extraData[crtIndex].source,
                            alias: catAlias,
                            categoryName: catName,
                            sgIndex: crtIndex,
                            xcatIndex: catIndex
                        };
                        combinedList.push(sg);
                    }

                    function enableSeparateCategorySuggestion() {
                        return opt.xcatSuggestionImprovementFlag != X_CAT_SUGGESTION_NO_IMPROVEMENT && lastXCatSuggestionPosition > 0 && !isDeepNode;
                    }

                    function enableCatSuggestionImprovementWithKeyword() {
                        return opt.xcatSuggestionImprovementFlag == X_CAT_SUGGESTION_IMPROVEMENT_WITH_KEYWORD && !isDeepNode;
                    }

                    function enableCatSuggestionImprovementWithoutKeyword() {
                        return opt.xcatSuggestionImprovementFlag == X_CAT_SUGGESTION_IMPROVEMENT_WITHOUT_KEYWORD && !isDeepNode;
                    }

                    function getDDCatName(alias) {
                        if (!alias) {
                            return $(ddBox.children()[0])
                                .text();
                        }
                        var catName = $(findOption(ddBox, "search-alias=" + alias));
                        if (catName && catName.length) {
                            return $.trim(catName.text());
                        } else {
                            return undefined;
                        }
                    }

                    function build2PaneSuggestions(crtSuggestions, extraData) {
                        var xcatSuggestions, xcat = [],
                            m, n = crtSuggestions.length,
                            combinedList = [],
                            i = 0,
                            j = 0,
                            sg, cs, s, si = 0,
                            currAlias = searchAlias(),
                            currCatName = getDDCatName(currAlias),
                            deepNodeAlias = (!currAlias && opt.deepNodeISS && opt.deepNodeISS.searchAliasAccessor()),
                            deepNodeCatName = getDDCatName(deepNodeAlias);
                        while (combinedList.length < opt.maxSuggestions && i < n) {
                            xcatSuggestions = (extraData && extraData.length ? extraData[i].nodes : []) || [];
                            xcat = [];
                            sg = {
                                keyword: crtSuggestions[i],
                                sc: isSpellCorrection(extraData[i]),
                                source: extraData[i].source || "c",
                                conf: extraData[i].conf,
                                sgIndex: i,
                                xcatIndex: 0
                            };
                            if (deepNodeAlias) {
                                sg.alias = deepNodeAlias;
                                sg.categoryName = deepNodeCatName;
                            } else {
                                if (currAlias) {
                                    sg.alias = currAlias;
                                    sg.categoryName = currCatName;
                                } else {
                                    sg.categoryName = deepNodeCatName;
                                }
                            }
                            xcat.push(sg);
                            m = xcatSuggestions.length;
                            if (m) {
                                j = 0;
                                while (j < m && j < opt.maxSuggestions) {
                                    cs = xcatSuggestions[j];
                                    sg = {
                                        keyword: crtSuggestions[i],
                                        sc: isSpellCorrection(extraData[i]),
                                        source: extraData[i].source || "c",
                                        alias: cs.alias,
                                        categoryName: cs.name,
                                        conf: extraData[i].conf,
                                        sgIndex: i,
                                        xcatIndex: j + 1
                                    };
                                    xcat.push(sg);
                                    ++j;
                                }
                            }
                            sg = {
                                keyword: crtSuggestions[i],
                                sc: isSpellCorrection(extraData[i]),
                                conf: extraData[i].conf,
                                sgIndex: i,
                                xcat: xcat
                            };
                            if (deepNodeAlias) {
                                sg.alias = deepNodeAlias;
                            }
                            combinedList.push(sg);
                            ++i;
                        }
                        curSize = combinedList.length;
                        return combinedList;
                    }

                    function searchJSONSuggest(newKw, newImeEnhUsed) {
                        lastKeyPressTime = now();
                        suggestRequest && suggestRequest.cleanup();
                        if (!activityAllowed) {
                            return;
                        }
                        if (!searchBox.hasFocus()) {
                            return;
                        }
                        var alias = searchAlias() || (opt.deepNodeISS ? opt.deepNodeISS.searchAliasAccessor() : null),
                            kw = newKw || keyword(),
                            suggestUrl = [],
                            a = function() {
                                $.each(arguments, function(i, t) {
                                    suggestUrl.push(t);
                                });
                            },
                            m = reqCounter === 0 ? metrics.completionsRequest0 : (reqCounter === metrics.sample ? metrics.completionsRequestSample : null),
                            cursorPos, qs;
                        if (!supportedSearchAlias(alias)) {
                            hideSuggestionsDiv();
                            return;
                        }
                        if (opt.qs) {
                            cursorPos = searchBox.cursorPos();
                            if (cursorPos > -1 && cursorPos < kw.length) {
                                qs = kw.substring(cursorPos);
                                kw = kw.substring(0, cursorPos);
                            }
                        }
                        a(opt.protocol, "//", opt.src, "?", "method=completion", "&q=", encodeURIComponent(kw), "&search-alias=", alias, "&client=", opt.cid, "&mkt=", opt.mkt, "&fb=", opt.fb, "&xcat=", opt.xcat, "&x=updateISSCompletion");
                        if (qs) {
                            a("&qs=" + encodeURIComponent(qs));
                        }
                        if (opt.np) {
                            a("&np=" + opt.np);
                        }
                        if (opt.sc) {
                            a("&sc=1");
                        }
                        if (suggestRequest) {
                            suggestRequest.cleanup();
                        }
                        suggestRequest = new A9JSONClient(kw, reqCounter++, newImeEnhUsed);
                        suggestRequest.callSuggestionsService(suggestUrl.join(""));
                    }

                    function updateCompletion() {
                        if (!suggestRequest) {
                            return;
                        }
                        if (!activityAllowed || !completion.length) {
                            return;
                        }
                        completion[0] = completion[0] || "";
                        suggestRequest.keywords = suggestRequest.keywords || "";
                        if (completion[0].toLowerCase() !== suggestRequest.keywords.toLowerCase()) {
                            return;
                        }
                        imeEnhUsed = suggestRequest.imeEnhUsed;
                        var c = suggestRequest.counter,
                            m = c === 0 ? metrics.completionsRequest0 : (c === metrics.sample ? metrics.completionsRequestSample : null);
                        suggestRequest.cleanup();
                        suggestRequest = null;
                        if (!searchBox.hasFocus()) {
                            return;
                        }
                        suggestionList = combineSuggestions(completion[1], (completion.length > 2) ? completion[2] : []);
                        displaySuggestions(completion[0]);
                        sugHandler && sugHandler(completion[0], postProcessSuggestions(suggestionList));
                    }

                    function postProcessSuggestions(suggestionList) {
                        var newSuggestionList = suggestionList.slice();
                        if (hasFallbackSuggestion && enableCatSuggestionImprovementWithoutKeyword()) {
                            newSuggestionList.splice(0, 1);
                        }
                        return newSuggestionList;
                    }

                    function stop() {
                        activityAllowed = false;
                        requestedKeyword = "";
                        if (suggestRequest) {
                            suggestRequest.cleanup();
                            suggestRequest = null;
                        }
                    }

                    function start() {
                        activityAllowed = true;
                    }

                    function encoding() {
                        var encInput = opt.form.find("input[name^='__mk_']");
                        if (encInput.length) {
                            return [encInput.attr("name"), encInput.val()];
                        }
                    }

                    function blur() {
                        searchBox.blur();
                    }

                    function focus() {
                        searchBox.focus();
                    }

                    function offset() {
                        return searchBox.pos();
                    }

                    function keydown(h) {
                        searchBox.keydown(h);
                    }

                    function isImeEnhUsed() {
                        return imeEnhUsed;
                    }

                    function triggerImeEnh() {
                        return searchBox.isImeUsed() && opt.ime && $.browser.msie;
                    }

                    function haveCategorySuggestions() {
                        return lastXCatSuggestionPosition > 0 || hasFallbackSuggestion;
                    }
                    return {
                        suggest: bindSuggest,
                        keypress: bindKeypress,
                        submit: bindSubmit,
                        blur: blur,
                        keyword: keyword,
                        merchant: merchant,
                        searchAlias: searchAlias,
                        searchNode: searchNode,
                        bbn: bbnNode,
                        stop: stop,
                        start: start,
                        encoding: encoding,
                        focus: focus,
                        offset: offset,
                        keydown: keydown,
                        isImeEnhUsed: isImeEnhUsed,
                        triggerImeEnh: triggerImeEnh,
                        haveCategorySuggestions: haveCategorySuggestions,
                        isDigitalFeaturesEnabled: function() {
                            return opt.isDigitalFeaturesEnabled === 1;
                        },
                        setDepartmentResultStyle: function(flag) {
                            departmentResultStyle = flag;
                        },
                        enableDepartment: function() {
                            overrideDepartmentWeblab = true;
                        },
                        onFocus: searchBox ? searchBox.onFocus : function() {},
                        onBlur: searchBox ? searchBox.onBlur : function() {},
                        cursorPos: searchBox ? searchBox.cursorPos : function() {
                            return -1;
                        },
                        initStaticSuggestions: initStatic,
                        initDynamicSuggestions: initDynamic,
                        updateAutoCompletion: updateCompletion,
                        init: init
                    };
                };

                function now() {
                    return (new Date)
                        .getTime();
                }

                function nop() {}

                function suppress() {
                    return false;
                }

                function bzero(len, val) {
                    var a = [];
                    while (len--) {
                        a.push(val);
                    }
                    return a;
                }

                function arrayIndexOf(a, v) {
                    for (var i = 0, len = a.length; i < len; i++) {
                        if (a[i] == v) {
                            return i;
                        }
                    }
                    return -1;
                }

                function input(f, i, n, v, c) {
                    f.append($('<input type="hidden"/>')
                        .attr(c ? "class" : "id", i)
                        .attr("name", n)
                        .attr("value", v));
                }

                function option(v, t) {
                    return $("<option/>")
                        .attr("value", v)
                        .text(t);
                }

                function keyClose(w) {
                    return w == 13 || w == 32;
                }

                function findOption(d, v) {
                    var option = d.find('option[value$="' + v + '"]');
                    if (option.length > 1) {
                        option = option[0];
                    }
                    return option;
                }

                function tabIndex(e, i) {
                    return e.attr("tabIndex", i)
                        .attr("tabindex", i);
                }

                function getShortenedIDForOption(o) {
                    var eq;
                    if (!o || !o.length || (eq = o.indexOf("=")) == -1) {
                        return "";
                    }
                    var alias = o.substr(eq + 1),
                        dash = alias.indexOf("-") + 1,
                        shortID = alias.substr(0, 3);
                    return dash ? shortID : (shortID + alias.charAt(dash));
                }

                function changeDropdownSelection(optionValue, selectedDisplayName, highlightOnly, option) {
                    var dd = ddBox;
                    if (optionValue == "search-alias=aps" && !selectedDisplayName) {
                        selectedDisplayName = findOption(dd, optionValue)
                            .text();
                    }
                    $("#" + sdpc)
                        .css("visibility", "hidden");
                    $(dcs)
                        .text(selectedDisplayName);
                    dd.val(optionValue);
                    if (!highlightOnly) {
                        opt.sb.focus();
                        setSearchFormReftag(opt.form, optionValue);
                    }
                }

                function buildSearchFormReftag(issTag, issMode, sg, numUserChars, optionValue) {
                    var reftag, isDepartmentIssResult = sg.type === DepartmentModule.getType();
                    if (!isDepartmentIssResult && !issTag) {
                        reftag = "dd_" + getShortenedIDForOption(optionValue);
                    } else {
                        var alias = isDepartmentIssResult ? sg.alias : sg.sgIndex;
                        reftag = issMode + "_" + alias;
                        if (isDepartmentIssResult) {
                            reftag += "_" + DepartmentModule.buildDepartmentReftagSuffix(sg);
                        }
                        reftag += "_" + numUserChars;
                    }
                    return reftag;
                }

                function setSearchFormReftag(formElement, optionValue, issMode, sg, numUserChars) {
                    var isstag = (issMode != null && sg);
                    if (isstag || optionValue != null) {
                        var formAction = formElement.attr("action"),
                            tag = buildSearchFormReftag(isstag, issMode, sg, numUserChars, optionValue);
                        if (!refre.test(formAction)) {
                            if (formAction.charAt(formAction.length - 1) != "/") {
                                formAction += "/";
                            }
                            formAction += tag;
                        } else {
                            if (isstag && ddaliasre.test(formAction)) {
                                formAction = formAction.replace(ddaliasre, "$1_" + tag);
                            } else {
                                formAction = formAction.replace(refre, "ref=nb_sb_" + tag);
                            }
                        }
                        formElement.attr("action", formAction);
                    }
                }

                function A9JSONClient(kw, counter, imeEnhUsed) {
                    var fullUrl, noCacheIE, headLoc, scriptId, scriptObj, scriptCounter = counter || 0;

                    function callService(url) {
                        fullUrl = url;
                        noCacheIE = "&noCacheIE=" + now();
                        headLoc = document.getElementsByTagName("head")
                            .item(0);
                        scriptId = "JscriptId" + scriptCounter;
                        buildScriptTag();
                        addScriptTag();
                    }

                    function buildScriptTag() {
                        scriptObj = document.createElement("script");
                        scriptObj.setAttribute("type", "text/javascript");
                        scriptObj.setAttribute("charset", "utf-8");
                        scriptObj.setAttribute("src", fullUrl + noCacheIE);
                        scriptObj.setAttribute("id", scriptId);
                    }

                    function removeScriptTag() {
                        try {
                            headLoc.removeChild(scriptObj);
                        } catch (e) {}
                    }

                    function addScriptTag() {
                        headLoc.appendChild(scriptObj);
                    }
                    return {
                        callSuggestionsService: callService,
                        cleanup: removeScriptTag,
                        keywords: kw,
                        counter: scriptCounter,
                        imeEnhUsed: imeEnhUsed
                    };
                }
                window.AutoComplete = AC;
                if (metrics.isEnabled) {
                    uet("cf", metrics.init, {
                        wb: 1
                    });
                }
            })(window);
            $SearchJS.publish("search-js-autocomplete-lib");
        });
    var DepartmentModule = (function() {
        var module = {};
        var typeKeyword = "department",
            issUniqueKey = "deptiss",
            minNumOfChars = 3,
            maxNumOfResults = 3,
            departmentDataArr = [
                ["instant-video", "Amazon Instant Video", ["Amazon", "Instant", "Video", "movies", "rentals"]],
                ["prime-instant-video", "Prime Instant Video", ["prime", "movies", "instant", "video", "free", "streaming", "netflix"]],
                ["appliances", "Appliances", ["Appliances"]],
                ["mobile-apps", "Apps for Android", ["Apps", "Android", "mobile"]],
                ["arts-crafts", "Arts, Crafts & Sewing", ["arts", "crafts", "sewing"]],
                ["automotive", "Automotive", ["automotive", "cars"]],
                ["baby-products", "Baby Products", ["baby", "products"]],
                ["beauty", "Beauty", ["beauty", "makeup", "hair"]],
                ["stripbooks", "Books", ["books", "textbooks", "rentals"]],
                ["mobile", "Cell Phones & Accessories", ["cell", "phones", "mobile", "cases", "iphone", "galaxy", "nexus"]],
                ["collectibles", "Collectibles & Fine Art", ["collectibles", "fine", "art", "coins", "memorabilia", "paintings", "wall art"]],
                ["computers", "Computers", ["computers", "pc", "laptop", "desktop"]],
                ["electronics", "Electronics", ["electronics"]],
                ["financial", "Credit Cards", ["credit", "cards"]],
                ["gift-cards", "Gift Cards Store", ["gift", "cards"]],
                ["grocery", "Grocery & Gourmet Food", ["grocery", "gourmet", "food"]],
                ["hpc", "Health & Personal Care", ["health", "personal", "care"]],
                ["garden", "Home & Kitchen", ["home", "kitchen", "furniture", "art"]],
                ["industrial", "Industrial & Scientific", ["Industrial", "Scientific"]],
                ["digital-text", "Kindle Store", ["kindle", "store", "ebooks", "books"]],
                ["magazines", "Magazine Subscriptions", ["magazines", "subscriptions"]],
                ["movies-tv", "Movies & TV", ["movies", "tv", "dvds", "vhs", "video", "blu ray", "bluray", "blu-ray"]],
                ["digital-music", "MP3 Music", ["mp3", "music"]],
                ["popular", "Music", ["music", "cds", "autorip", "vinyl"]],
                ["mi", "Musical Instruments", ["musical", "instruments", "guitars", "dj"]],
                ["office-products", "Office Products", ["office", "products", "school", "toner"]],
                ["lawngarden", "Patio, Lawn & Garden", ["patio", "lawn", "garden"]],
                ["pets", "Pet Supplies", ["pet", "supplies", "dogs", "cats", "birds", "fish"]],
                ["software", "Software", ["software"]],
                ["sporting", "Sporting & Outdoors", ["sporting", "outdoors", "sports"]],
                ["tools", "Tools & Home Improvement", ["tools", "home", "improvement"]],
                ["toys-and-games", "Toys & Games", ["toys", "games"]],
                ["videogames", "Video Games", ["video", "games", "xbox", "ps3", "ps4", "wii", "playstation"]],
                ["wine", "Wine", ["wine"]],
                ["pantry", "Prime Pantry", ["prime", "pantry"]]
            ],
            wayfindingAliases = [
                ["fashion", "Clothing, Shoes & Jewelry", ["clothing", "clothes", "luggage", "hats", "shirts", "jacket", "wallets", "sunglasses", "jewelry", "shoes", "handbags", "sandals", "boots", "watches"]],
                ["fashion-mens", "Men's Clothing, Shoes & Jewelry", ["mens", "clothing", "clothes", "shoes", "jewelry", "mens clothing", "mens shoes", "mens jewelry", "mens watches"]],
                ["fashion-womens", "Women's Clothing, Shoes & Jewelry", ["womens", "clothing", "clothes", "shoes", "jewelry", "womens clothing", "womens shoes", "womens jewelry", "womens watches"]],
                ["fashion-baby", "Baby Clothing, Shoes & Jewelry", ["baby", "clothing", "clothes", "shoes", "jewelry", "baby clothing", "baby shoes", "baby jewelry"]],
                ["fashion-boys", "Boys Clothing, Shoes & Jewelry", ["boys", "clothing", "clothes", "shoes", "jewelry", "boys clothing", "boys shoes", "boys jewelry"]],
                ["fashion-girls", "Girls' Clothing, Shoes & Jewelry", ["girls", "clothing", "clothes", "shoes", "jewelry", "girls clothing", "girls shoes", "girls jewelry"]]
            ],
            nonWayfindingAliases = [
                ["jewelry", "Jewelry", ["jewelry"]],
                ["shoes", "Shoes", ["shoes", "handbags", "sandals", "boots"]],
                ["apparel", "Clothing & Accessories", ["clothing", "clothes", "hats", "shirts", "jacket", "wallets", "sunglasses"]]
            ];
        module.createDataArray = function($, opt) {
            var dataArr = new Array();
            var aliasesToConcat = undefined;
            if (typeof opt !== "undefined" && opt.hasOwnProperty("isWayfindingEnabled") && opt.isWayfindingEnabled === 1) {
                aliasesToConcat = wayfindingAliases;
            } else {
                aliasesToConcat = nonWayfindingAliases;
            }
            departmentDataArr = departmentDataArr.concat(aliasesToConcat);
            $.each(departmentDataArr, function(index) {
                var departmentArr = departmentDataArr[index];
                var issCompatabilityObj = {
                    id: departmentArr[0],
                    alias: departmentArr[0],
                    keyword: "",
                    categoryName: "",
                    type: typeKeyword,
                    name: departmentArr[1],
                    triggerWords: departmentArr[2],
                    sn: false
                };
                dataArr.push(issCompatabilityObj);
            });
            return dataArr;
        };
        module.getType = function() {
            return typeKeyword;
        };
        module.getMinNumOfChars = function() {
            return minNumOfChars;
        };
        module.getMaxNumOfResults = function() {
            return maxNumOfResults;
        };
        module.logImpression = function(searchAlias) {
            if (ue && ue.count) {
                var countKey = issUniqueKey + searchAlias.replace("-", "");
                ue.count(countKey, ue.count(countKey) + 1);
            }
        };
        module.buildDepartmentReftagSuffix = function(resultObj, position) {
            var reftag = issUniqueKey;
            reftag += resultObj.hasOwnProperty("position") ? "_" + resultObj.position : "";
            return reftag;
        };
        return module;
    }());
}
/* end search-js-autocomplete/autocomplete.js */