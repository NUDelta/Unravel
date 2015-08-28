jQuery.extend({
  // Unique for each copy of jQuery on the page
  expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

  // Assume jQuery is ready without the ready module
  isReady: true,

  error: function(msg) {
    throw new Error(msg);
  },

  noop: function() {},

  isFunction: function(obj) {
    return jQuery.type(obj) === "function";
  },

  isArray: Array.isArray,

  isWindow: function(obj) {
    return obj != null && obj === obj.window;
  },

  isNumeric: function(obj) {
    // parseFloat NaNs numeric-cast false positives (null|true|false|"")
    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
    // subtraction forces infinities to NaN
    // adding 1 corrects loss of precision from parseFloat (#15100)
    return !jQuery.isArray(obj) && (obj - parseFloat(obj) + 1) >= 0;
  },

  isPlainObject: function(obj) {
    // Not plain objects:
    // - Any object or value whose internal [[Class]] property is not "[object Object]"
    // - DOM nodes
    // - window
    if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
      return false;
    }

    if (obj.constructor &&
      !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
      return false;
    }

    // If the function hasn't returned already, we're confident that
    // |obj| is a plain object, created by {} or constructed with new Object
    return true;
  },

  isEmptyObject: function(obj) {
    var name;
    for (name in obj) {
      return false;
    }
    return true;
  },

  type: function(obj) {
    if (obj == null) {
      return obj + "";
    }
    // Support: Android<4.0, iOS<6 (functionish RegExp)
    return typeof obj === "object" || typeof obj === "function" ?
      class2type[toString.call(obj)] || "object" :
      typeof obj;
  },

  // Evaluates a script in a global context
  globalEval: function(code) {
    var script,
      indirect = eval;

    code = jQuery.trim(code);

    if (code) {
      // If the code includes a valid, prologue position
      // strict mode pragma, execute code by injecting a
      // script tag into the document.
      if (code.indexOf("use strict") === 1) {
        script = document.createElement("script");
        script.text = code;
        document.head.appendChild(script).parentNode.removeChild(script);
      } else {
        // Otherwise, avoid the DOM node creation, insertion
        // and removal by using an indirect global eval
        indirect(code);
      }
    }
  },

  // Convert dashed to camelCase; used by the css and data modules
  // Support: IE9-11+
  // Microsoft forgot to hump their vendor prefix (#9572)
  camelCase: function(string) {
    return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
  },

  nodeName: function(elem, name) {
    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
  },

  // args is for internal usage only
  each: function(obj, callback, args) {
    var value,
      i = 0,
      length = obj.length,
      isArray = isArraylike(obj);

    if (args) {
      if (isArray) {
        for (; i < length; i++) {
          value = callback.apply(obj[i], args);

          if (value === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          value = callback.apply(obj[i], args);

          if (value === false) {
            break;
          }
        }
      }

      // A special, fast, case for the most common use of each
    } else {
      if (isArray) {
        for (; i < length; i++) {
          value = callback.call(obj[i], i, obj[i]);

          if (value === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          value = callback.call(obj[i], i, obj[i]);

          if (value === false) {
            break;
          }
        }
      }
    }

    return obj;
  },

  // Support: Android<4.1
  trim: function(text) {
    return text == null ?
      "" :
      (text + "").replace(rtrim, "");
  },

  // results is for internal usage only
  makeArray: function(arr, results) {
    var ret = results || [];

    if (arr != null) {
      if (isArraylike(Object(arr))) {
        jQuery.merge(ret,
          typeof arr === "string" ? [arr] : arr
        );
      } else {
        push.call(ret, arr);
      }
    }

    return ret;
  },

  inArray: function(elem, arr, i) {
    return arr == null ? -1 : indexOf.call(arr, elem, i);
  },

  merge: function(first, second) {
    var len = +second.length,
      j = 0,
      i = first.length;

    for (; j < len; j++) {
      first[i++] = second[j];
    }

    first.length = i;

    return first;
  },

  grep: function(elems, callback, invert) {
    var callbackInverse,
      matches = [],
      i = 0,
      length = elems.length,
      callbackExpect = !invert;

    // Go through the array, only saving the items
    // that pass the validator function
    for (; i < length; i++) {
      callbackInverse = !callback(elems[i], i);
      if (callbackInverse !== callbackExpect) {
        matches.push(elems[i]);
      }
    }

    return matches;
  },

  // arg is for internal usage only
  map: function(elems, callback, arg) {
    var value,
      i = 0,
      length = elems.length,
      isArray = isArraylike(elems),
      ret = [];

    // Go through the array, translating each of the items to their new values
    if (isArray) {
      for (; i < length; i++) {
        value = callback(elems[i], i, arg);

        if (value != null) {
          ret.push(value);
        }
      }

      // Go through every key on the object,
    } else {
      for (i in elems) {
        value = callback(elems[i], i, arg);

        if (value != null) {
          ret.push(value);
        }
      }
    }

    // Flatten any nested arrays
    return concat.apply([], ret);
  },

  // A global GUID counter for objects
  guid: 1,

  // Bind a function to a context, optionally partially applying any
  // arguments.
  proxy: function(fn, context) {
    var tmp, args, proxy;

    if (typeof context === "string") {
      tmp = fn[context];
      context = fn;
      fn = tmp;
    }

    // Quick check to determine if target is callable, in the spec
    // this throws a TypeError, but we will just return undefined.
    if (!jQuery.isFunction(fn)) {
      return undefined;
    }

    // Simulated bind
    args = slice.call(arguments, 2);
    proxy = function() {
      return fn.apply(context || this, args.concat(slice.call(arguments)));
    };

    // Set the guid of unique handler to the same of original handler, so it can be removed
    proxy.guid = fn.guid = fn.guid || jQuery.guid++;

    return proxy;
  },

  now: Date.now,

  // jQuery.support is not used in Core but other projects attach their
  // properties to it so it needs to exist.
  support: support
})
