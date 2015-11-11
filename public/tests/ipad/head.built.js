/* ---- BUILT FILE. DO NOT MODIFY THIS DIRECTLY. ---- */
/*
 * classList.js: Cross-browser full element.classList implementation.
 * 2012-11-15
 *
 * By Eli Grey, http://eligrey.com
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/

if (typeof document !== "undefined" && !("classList" in document.createElement("a"))) {

    (function(view) {

        "use strict";

        if (!('HTMLElement' in view) && !('Element' in view)) return;

        var
            classListProp = "classList",
            protoProp = "prototype",
            elemCtrProto = (view.HTMLElement || view.Element)[protoProp],
            objCtr = Object,
            strTrim = String[protoProp].trim || function() {
                return this.replace(/^\s+|\s+$/g, "");
            },
            arrIndexOf = Array[protoProp].indexOf || function(item) {
                var
                    i = 0,
                    len = this.length;
                for (; i < len; i++) {
                    if (i in this && this[i] === item) {
                        return i;
                    }
                }
                return -1;
            }
            // Vendors: please allow content code to instantiate DOMExceptions
            ,
            DOMEx = function(type, message) {
                this.name = type;
                this.code = DOMException[type];
                this.message = message;
            },
            checkTokenAndGetIndex = function(classList, token) {
                if (token === "") {
                    throw new DOMEx(
                        "SYNTAX_ERR", "An invalid or illegal string was specified"
                    );
                }
                if (/\s/.test(token)) {
                    throw new DOMEx(
                        "INVALID_CHARACTER_ERR", "String contains an invalid character"
                    );
                }
                return arrIndexOf.call(classList, token);
            },
            ClassList = function(elem) {
                var
                    trimmedClasses = strTrim.call(elem.className),
                    classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
                    i = 0,
                    len = classes.length;
                for (; i < len; i++) {
                    this.push(classes[i]);
                }
                this._updateClassName = function() {
                    elem.className = this.toString();
                };
            },
            classListProto = ClassList[protoProp] = [],
            classListGetter = function() {
                return new ClassList(this);
            };
        // Most DOMException implementations don't allow calling DOMException's toString()
        // on non-DOMExceptions. Error's toString() is sufficient here.
        DOMEx[protoProp] = Error[protoProp];
        classListProto.item = function(i) {
            return this[i] || null;
        };
        classListProto.contains = function(token) {
            token += "";
            return checkTokenAndGetIndex(this, token) !== -1;
        };
        classListProto.add = function() {
            var
                tokens = arguments,
                i = 0,
                l = tokens.length,
                token, updated = false;
            do {
                token = tokens[i] + "";
                if (checkTokenAndGetIndex(this, token) === -1) {
                    this.push(token);
                    updated = true;
                }
            }
            while (++i < l);

            if (updated) {
                this._updateClassName();
            }
        };
        classListProto.remove = function() {
            var
                tokens = arguments,
                i = 0,
                l = tokens.length,
                token, updated = false;
            do {
                token = tokens[i] + "";
                var index = checkTokenAndGetIndex(this, token);
                if (index !== -1) {
                    this.splice(index, 1);
                    updated = true;
                }
            }
            while (++i < l);

            if (updated) {
                this._updateClassName();
            }
        };
        classListProto.toggle = function(token, forse) {
            token += "";

            var
                result = this.contains(token),
                method = result ?
                forse !== true && "remove" :
                forse !== false && "add";

            if (method) {
                this[method](token);
            }

            return !result;
        };
        classListProto.toString = function() {
            return this.join(" ");
        };

        if (objCtr.defineProperty) {
            var classListPropDesc = {
                get: classListGetter,
                enumerable: true,
                configurable: true
            };
            try {
                objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
            } catch (ex) { // IE 8 doesn't support enumerable:true
                if (ex.number === -0x7FF5EC54) {
                    classListPropDesc.enumerable = false;
                    objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                }
            }
        } else if (objCtr[protoProp].__defineGetter__) {
            elemCtrProto.__defineGetter__(classListProp, classListGetter);
        }

    }(self));

}
/**
 * The DOM CustomEvent are events initialized by an application for any purpose.
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
 *
 * This is not compatible with IE < 9.
 *
 * @return {Function} CustomEvent constructor
 */

if (document.createEvent) {
    try {
        new window.CustomEvent('click');
    } catch (err) {
        window.CustomEvent = (function() {
            function CustomEvent(event, params) {
                params = params || {
                    bubbles: false,
                    cancelable: false,
                    detail: undefined
                };
                var evt = document.createEvent('CustomEvent');
                evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                return evt;
            }
            CustomEvent.prototype = window.Event.prototype;
            return CustomEvent;
        }());
    }
}

/**
	Extend native objects to provide ECMAScript 5.1 functionality if it doesn't exist.
*/



if (!Function.prototype.bind) {
    /**
    	Creates a new function that, when called, itself calls this function in the context of the provided
    	this value, with a given sequence of arguments preceding any provided when the new function was called.
    	Arguments may be passed to bind as separate arguments following `thisObj`.
    	@param {Object} thisObj The object that will provide the context of `this` for the called function.
    */
    Function.prototype.bind = function(originalContext) {
        if (typeof this !== 'function') {
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }
        var applicableArgs = Array.prototype.slice.call(arguments, 1);
        var functionToBind = this;
        var fnOriginalPrototype = function() {};
        var fnBound = function() {
            return functionToBind.apply(
                (this instanceof fnOriginalPrototype && originalContext) ? this : originalContext,
                applicableArgs.concat(Array.prototype.slice.call(arguments))
            );
        }
        fnOriginalPrototype.prototype = this.prototype;
        fnBound.prototype = new fnOriginalPrototype();
        return fnBound;
    };
}



if (!Array.isArray) {
    /**
    	Returns true if an object is an array, false if it is not.
    	@param {Object} object Object to test against.
    	@name Array.isArray
    */
    Array.isArray = function isArray(object) {
        return (object && typeof object === 'object' && 'splice' in object && 'join' in object);
    };
}



if (!Array.prototype.every) {
    /**
    	Behaving in a similar yet opposite fashion to Array.prototype.some, Array.prototype.every tests whether
    	all elements in the array pass the test implemented by the provided function. A return of false by the
    	callback will immediately return false for the whole method.
    	@param {Function} callback Function to test against. The callback should return a boolean value. Please
    	note that 'falsy' values, e.g. no return, will evaluate to false.
    	@param {Object} thisObj Object to use as `this` when executing the callback.
    	@returns {Boolean} Returns true if all objects pass the test implemented by the provided function.
    	@reference https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/every
    */
    Array.prototype.every = function every(callback, thisObj) {
        var arrayObject = Object(this);
        // Mimic ES5 spec call for interanl method ToUint32()
        var len = arrayObject.length >>> 0;
        var i;

        // Callback must be a callable function
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        for (i = 0; i < len; i += 1) {
            if (i in arrayObject && !callback.call(thisObj, arrayObject[i], i, arrayObject)) {
                return false;
            }
        }
        return true;
    };
}



if (!Array.prototype.filter) {
    /**
    	Tests all elements in an array and returns a new array filled with elements that pass the test.
    	@param {Function} callback Function to test against. The callback must return a boolean value.
    	@param {Object} thisObj Object to use as `this` when executing the callback.
    	@returns {Array} Returns a new array populated with values from the original array that passed the test implemented by the provided function.
    	@reference https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/filter
    */
    Array.prototype.filter = function filter(callback, thisObj) {
        var arrayObject = Object(this);
        // Mimic ES5 spec call for interanl method ToUint32()
        var len = arrayObject.length >>> 0;
        var i;
        var results = [];

        // Callback must be a callable function
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        for (i = 0; i < len; i += 1) {
            if (i in arrayObject && callback.call(thisObj, arrayObject[i], i, arrayObject)) {
                results.push(arrayObject[i]);
            }
        }

        return results;
    };
}



if (!Array.prototype.forEach) {
    /**
    	Executes a provided function once per array element.
    	@param callback {Function} Object to test against.
    	@param thisObj {Object} What the callback method is bound to.
    */
    Array.prototype.forEach = function forEach(callback, thisObj) {
        var arrayObject = Object(this);
        // Mimic ES5 spec call for interanl method ToUint32()
        var i;
        var currentValue;

        if (typeof callback !== 'function') {
            throw new TypeError('No function object passed to forEach.');
        }

        for (i = 0; i < this.length; i += 1) {
            currentValue = arrayObject[i];
            callback.call(thisObj, currentValue, i, arrayObject);
        }
    };
}



if (!Array.prototype.indexOf) {
    /**
    	Returns the first (least) index of an element within the array equal to the specified value, or -1 if none is found.
    	@param searchElement {Object} Element to locate in the array.
    	@param fromIndex {Number} Optional; the index at which to begin the search. Defaults to 0, i.e. the whole array will be searched. If the index is greater than or equal to the length of the array, -1 is returned, i.e. the array will not be searched. If negative, it is taken as the offset from the end of the array. Note that even when the index is negative, the array is still searched from front to back. If the calculated index is less than 0, the whole array will be searched.
    */
    Array.prototype.indexOf = function indexOf(searchElement, fromIndex) {
        var startIndex = fromIndex || 0;
        var currentIndex = 0;

        if (startIndex < 0) {
            startIndex = this.length + fromIndex - 1;
            if (startIndex < 0) {
                throw 'Wrapped past beginning of array while looking up a negative start index.';
            }
        }

        for (currentIndex = 0; currentIndex < this.length; currentIndex++) {
            if (this[currentIndex] === searchElement) {
                return currentIndex;
            }
        }

        return (-1);
    };
}



if (!Array.prototype.lastIndexOf) {
    /**
    	<p>Returns thelast index at which a given element can be found in the array, or -1 if it is not present.
    	The array is searched backwards, starting at fromIndex.</p>
    	<p><em>It should be noted that the Prototype library also implementes a version of this polyfill that doesn't behave
    	according exactly to the ECMA-262 5.1 spec. Where this version will default the `fromIndex` paramater to the
    	array's length if `fromIndex > array.length`, the Prototype version will not and as a result will return a different value.
    	Care should be taken when using this library in conjunction with Prototype as Prototype's version will override
    	this version in non-supporting browsers if it is included in the application ahead of ac_base.js.</em></p>

    	@param {Object} value The element to locate in the array.
    	@param {Number} fromIndex Optional; The index at which to start searching backwards. Defaults to the array's length.
    		If negative, it is taken as the offset from the end of the array. If the index is 0, -1 is returned; the array
    		will not be searched.
    	@returns {Number} Returns the last index at which the element can be found. Else, returns -1.
    */
    Array.prototype.lastIndexOf = function lastIndexOf(value, fromIndex) {
        var arrayObj = Object(this);
        // Mimic ES5 spec call for interanl method ToUint32()
        var len = arrayObj.length >>> 0;
        var i;
        fromIndex = parseInt(fromIndex, 10);

        // Return -1 if the array has no length
        if (len <= 0) {
            return -1;
        }

        // Is fromIndex provided? Set i accordingly if it is
        i = (typeof fromIndex === 'number') ? Math.min(len - 1, fromIndex) : len - 1;

        // Handle negative indices
        i = i >= 0 ? i : len - Math.abs(i);

        // Search backwards through array
        for (; i >= 0; i -= 1) {
            if (i in arrayObj && value === arrayObj[i]) {
                return i;
            }
        }

        return -1;

    };
}



if (!Array.prototype.map) {
    /**
    	<p>Calls a provided callback function once for each element in an array, in order, and constructs a new array from the results</p>
    	<p>Usage:<p>
    	<pre>
    	var mapArray = ['foo', 'bar', 'baz'];
    	var mapFunction = function (value) {
    		return value + '_cat';
    	}
    	console.log(mapArray.map(mapFunction));
    	</pre>
    	@param {Function} callback The function to execute on each element in the array
    	@param {Object} thisObj Optional; The object to use as `this` when executing the callback
    	@returns {Object} A new array containing the results from the callback function.
    		Array elements will be in the same order as the original array.
    */
    Array.prototype.map = function map(callback, thisObj) {
        var arrayObj = Object(this);
        // Mimic ES5 spec call for interanl method ToUint32()
        var len = arrayObj.length >>> 0;
        var i;
        var result = new Array(len);

        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        for (i = 0; i < len; i += 1) {
            if (i in arrayObj) {
                result[i] = callback.call(thisObj, arrayObj[i], i, arrayObj);
            }
        }

        return result;
    };
}



if (!Array.prototype.reduce) {
    /**
    	<p>Applies an accumulation function to every value in an array from left to right and returns a single value.</p>
    	<p>Usage:</p>
    	<pre>
    	var reduceArray = [1, 2, 3, 4, 5];
    	var reduceFunction = function (previousValue, currentValue, index, array) {
    		return previousValue + currentValue;
    	};
    	console.log(reduceArray.reduce(reduceFunction));
    	</pre>
    	@param {Function} callback The function to execute on each value in the array.
    		<p><code>callback</code> takes four arguments:</p>
    		<dl>
    			<dt><strong>previousValue</strong></dt>
    			<dd>The value previously returned by the last invocation of the callback, or <code>initialValue</code>, if supplied.</dd>
    			<dt><strong>currentValue</strong></dt>
    			<dd>The current array value being processed.</dd>
    			<dt><strong>index</strong></dt>
    			<dd>The index of the current array value being processed in the array.</dd>
    			<dt><strong>array</strong></dt>
    			<dd>The array <code>reduce</code> was called upon.</dd>
    		</dl>
    	@param {Mixed} initialValue Optional; If provided, then the first time the callback is called <code>initialValue</code> will be used
    		as the value for <code>previousValue</code> and <code>currentValue</code> will be equal to the first value in the array. If not
    		provided then <code>previousValue</code> will be equal to the first value in the array and <code>currentValue</code> will be
    		equal to the second.
    	@returns {Mixed} Reduce returns a single value that is the result of the accumulation function applied to each array element.
    */
    Array.prototype.reduce = function reduce(callback, initialValue) {
        var arrayObj = Object(this);
        // Mimic ES5 spec call for interanl method ToUint32()
        var len = arrayObj.length >>> 0;
        var i = 0;
        var result;

        // Callback must be a callable function
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        if (typeof initialValue === 'undefined') {
            if (!len) {
                // No value to return if we have an empty array and no initialValue
                throw new TypeError('Reduce of empty array with no initial value');
            }
            result = arrayObj[0];
            // Start at second element when initialValue is not provided
            i = 1;
        } else {
            result = initialValue;
        }

        while (i < len) {
            if (i in arrayObj) {
                result = callback.call(undefined, result, arrayObj[i], i, arrayObj);
                i += 1;
            }
        }

        return result;
    };
}

if (!Array.prototype.reduceRight) {
    /**
    	<p>Applies an accumulation function to every element in an array from right to left and returns a single value.</p>
    	<p>Usage:</p>
    	<pre>
    	var reduceRightArray = ['foo', 'bar', 'baz'];
    	var reduceRightFn = function (previousValue, currentValue, index, array) {
    		return previousValue + '_' + currentValue;
    	}
    	console.log(reduceRightArray.reduceRight(reduceRightFn));
    	</pre>
    	@param {Function} callback The function to execute on each value in the array.
    		<p><code>callback</code> takes four arguments:</p>
    		<dl>
    			<dt><strong>previousValue</strong></dt>
    			<dd>The value previously returned by the last invocation of the callback, or <code>initialValue</code>, if supplied.</dd>
    			<dt><strong>currentValue</strong></dt>
    			<dd>The current element being processed in the array.</dd>
    			<dt><strong>index</strong></dt>
    			<dd>The index of the current element being processed in the array.</dd>
    			<dt><strong>array</strong></dt>
    			<dd>The array <code>reduce</code> was called upon.</dd>
    		</dl>
    	@param {Mixed} initialValue Optional; If provided, then the first time the callback is called <code>initialValue</code> will be used
    		as the value for <code>previousValue</code> and <code>currentValue</code> will be equal to the last value in the array. If not
    		provided then <code>previousValue</code> will be equal to the last value in the array and <code>currentValue</code> will be
    		equal to the second to last value.
    	@returns {Mixed} Reduce returns a single value that is the result of the accumulation function applied to each array element.
    */
    Array.prototype.reduceRight = function reduceRight(callback, initialValue) {
        var arrayObj = Object(this);
        // Mimic ES5 spec call for interanl method ToUint32()
        var len = arrayObj.length >>> 0;
        var i = len - 1;
        var result;

        // Callback must be a callable function
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        if (initialValue === undefined) {
            if (!len) {
                // No value to return if we have an empty array and no initialValue
                throw new TypeError('Reduce of empty array with no initial value');
            }
            result = arrayObj[len - 1];
            // Start at second to last element when initialValue is not provided
            i = len - 2;
        } else {
            result = initialValue;
        }

        while (i >= 0) {
            if (i in arrayObj) {
                result = callback.call(undefined, result, arrayObj[i], i, arrayObj);
                i -= 1;
            }
        }

        return result;
    };
}



if (!Array.prototype.some) {
    /**
    	Essentially the opposite of Array.prototype.every, Array.prototype.some calls a provided callback function once
    	for each element in an array, until the callback function returns true.
    	@param {Function} callback The fucntion to execute on each element in the array. The return value must evaluate to
    	a boolean true in order for the entire method to return true.
    	@param {Object} thisObj Optional; The object to use as `this` when executing the callback
    	@returns {Boolean} true if the callback returns a true value, otherwise false.
    */
    Array.prototype.some = function some(callback, thisObj) {
        var arrayObj = Object(this);
        // Mimic ES5 spec call for interanl method ToUint32()
        var len = arrayObj.length >>> 0;
        var i;

        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        for (i = 0; i < len; i += 1) {
            if (i in arrayObj && callback.call(thisObj, arrayObj[i], i, arrayObj) === true) {
                return true;
            }
        }

        return false;
    };
}



if (!Date.now) {
    /**
    	Returns the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC
    	@returns {Integer} The number of milliseconds elapsed since January 1, 1970 00:00:00 UTC
    */
    Date.now = function now() {
        return new Date()
            .getTime();
    };
}



if (!Date.prototype.toISOString) {
    /**
    	<p>Returns a string from a Date object formatted per the ISO 8601 Extended Format.</p>
    	<p><em>Please note that the Prototype library also polyfills this method. However their polyfill
    	does not entirely adhere to the ES5 spec. The Prototype version fails to include the milliseconds
    	and does not provide support for the extended year format. Be aware that if the Prototype library
    	is included ahead of ac_base.js in your application, Prototype's version will take precedence
    	on non-supporting browsers.</em></p>
    	@returns {String} Returns a date string formatted per the ISO 8601 Extended format.
    */
    Date.prototype.toISOString = function toISOString() {
        if (!isFinite(this)) {
            throw new RangeError('Date.prototype.toISOString called on non-finite value.');
        }

        var parts = {
            'year': this.getUTCFullYear(),
            'month': this.getUTCMonth() + 1,
            'day': this.getUTCDate(),
            'hours': this.getUTCHours(),
            'minutes': this.getUTCMinutes(),
            'seconds': this.getUTCSeconds(),
            'mseconds': (this.getUTCMilliseconds() / 1000)
                .toFixed(3)
                .substr(2, 3)
        };
        var prop;
        var prefix;

        // Pad single digits with a leading 0
        for (prop in parts) {
            if (parts.hasOwnProperty(prop) && prop !== 'year' && prop !== 'mseconds') {
                parts[prop] = String(parts[prop])
                    .length === 1 ? '0' + String(parts[prop]) : String(parts[prop]);
            }
        }

        // Support for extended years per 15.9.1.15.1 (http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf)
        if (parts.year < 0 || parts.year > 9999) {
            prefix = parts.year < 0 ? '-' : '+';
            parts.year = prefix + String(Math.abs(parts.year / 1000000))
                .substr(2, 6);
        }

        return parts.year + '-' + parts.month + '-' + parts.day + 'T' + parts.hours + ':' + parts.minutes + ':' + parts.seconds + '.' + parts.mseconds + 'Z';
    };

}


if (!Date.prototype.toJSON) {
    /**
    	<p>Provides a String representation of a Date object for use by JSON.stringify</p>
    	<p><strong>Note 1:</strong> The toJSON method is intentionally generic; it does not require that its `this` value be a Date object.
    	Therefore, it can be transferred to other kinds of objects for use as a method. However, it does require that
    	any such object have a <code>toISOString</code> method. Full info can be found in the ES5 spec (15.9.5.44):
    	http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf</p>
    	<p><strong>Note 2:</strong> The Prototype library also polyfills this method. However their polyfill
    	does not adhere to the ES5 spec. The Prototype version fails to include the ignored <code>key</code> argument,
    	and only returns a call to <code>Date.toISOString()</code>. This is quite different from the behavior defined in the ES5 spec.
    	Be aware that if the Prototype library is included ahead of ac_base.js in your application, Prototype's version
    	will take precedence on non-supporting browsers.</p>
    	@param {Mixed} key The key argument is ignored, however an object is free to use the <code>key</code>
    		argument to filter its stringification.
    	@returns {String} Returns a date string formatted per the ISO 8601 Extended format for use with JSON.stringify
    */
    Date.prototype.toJSON = function(key) {
        var obj = Object(this);
        var prim;

        // These primitive related functions simulate the required call to the internal ToPrimitive() construct per the ES5 spec.
        var isPrimitive = function(input) {
            var type = typeof input;

            var types = [null, 'undefined', 'boolean', 'string', 'number'].some(function(value) {
                return value === type;
            });

            if (types) {
                return true;
            }

            return false;
        };

        var toPrimitive = function(input) {
            var value;

            if (isPrimitive(input)) {
                return input;
            }

            value = (typeof input.valueOf === 'function') ? input.valueOf() : (typeof input.toString === 'function') ? input.toString() : null;

            if (value && isPrimitive(value)) {
                return value;
            }

            throw new TypeError(input + ' cannot be converted to a primitive');
        };

        prim = toPrimitive(obj);

        if (typeof prim === 'number' && !isFinite(prim)) {
            return null;
        }

        if (typeof obj.toISOString !== 'function') {
            throw new TypeError('toISOString is not callable');
        }

        return obj.toISOString.call(obj);
    };
}




if (!String.prototype.trim) {
    /**
    	Removes whitespace from both ends of the string.
    */
    String.prototype.trim = function trim() {
        return this.replace(/^\s+|\s+$/g, '');
    };
}



if (!Object.keys) {
    /**
    	Returns an array of strings representing all the enumerable property names of the object.
    	@param {Object} Object who's keys to return.
    */
    Object.keys = function keys(obj) {
        var keysArray = [];
        var currentKey;

        if ((!obj) || (typeof obj.hasOwnProperty !== 'function')) {
            throw 'Object.keys called on non-object.';
        }

        for (currentKey in obj) {
            if (obj.hasOwnProperty(currentKey)) {
                keysArray.push(currentKey);
            }
        }

        return keysArray;
    };
}

//= require ../src/extensions/ecma_script_5_shim.js

// == JSON ==
// Fallback (for IE) to have JSON.stringify and JSON.parse methods
//
// From: https://github.com/douglascrockford/JSON-js/blob/master/json2.js
//
/*********************** JSON ***********************/
if (typeof JSON == "undefined" || !('stringify' in JSON && 'parse' in JSON)) {
    if (!this.JSON) {
        this.JSON = {};
    }(function() {
        function f(n) {
                return n < 10 ? "0" + n : n;
            }
            // Date.toJSON used to be polyfilled here. A version that adheres more closely to ES5 spec
            // has been since added to ecma_script_5_shim.js rendering this version obsolete.
        if (typeof String.prototype.toJSON !== "function") {
            String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key) {
                return this.valueOf();
            };
        }
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap, indent, meta = {
                "\b": "\\b",
                "\t": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            },
            rep;

        function quote(string) {
            escapable.lastIndex = 0;
            return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
                var c = meta[a];
                return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0)
                        .toString(16))
                    .slice(-4);
            }) + '"' : '"' + string + '"';
        }

        function str(key, holder) {
            var i, k, v, length, mind = gap,
                partial, value = holder[key];
            if (value && typeof value === "object" && typeof value.toJSON === "function") {
                value = value.toJSON(key);
            }
            if (typeof rep === "function") {
                value = rep.call(holder, key, value);
            }
            switch (typeof value) {
                case "string":
                    return quote(value);
                case "number":
                    return isFinite(value) ? String(value) : "null";
                case "boolean":
                case "null":
                    return String(value);
                case "object":
                    if (!value) {
                        return "null";
                    }
                    gap += indent;
                    partial = [];
                    if (Object.prototype.toString.apply(value) === "[object Array]") {
                        length = value.length;
                        for (i = 0; i < length; i += 1) {
                            partial[i] = str(i, value) || "null";
                        }
                        v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                        gap = mind;
                        return v;
                    }
                    if (rep && typeof rep === "object") {
                        length = rep.length;
                        for (i = 0; i < length; i += 1) {
                            k = rep[i];
                            if (typeof k === "string") {
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ": " : ":") + v);
                                }
                            }
                        }
                    } else {
                        for (k in value) {
                            if (Object.hasOwnProperty.call(value, k)) {
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ": " : ":") + v);
                                }
                            }
                        }
                    }
                    v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
                    gap = mind;
                    return v;
            }
        }
        if (typeof JSON.stringify !== "function") {
            JSON.stringify = function(value, replacer, space) {
                var i;
                gap = "";
                indent = "";
                if (typeof space === "number") {
                    for (i = 0; i < space; i += 1) {
                        indent += " ";
                    }
                } else {
                    if (typeof space === "string") {
                        indent = space;
                    }
                }
                rep = replacer;
                if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                    throw new Error("JSON.stringify");
                }
                return str("", {
                    "": value
                });
            };
        }
        if (typeof JSON.parse !== "function") {
            JSON.parse = function(text, reviver) {
                var j;

                function walk(holder, key) {
                    var k, v, value = holder[key];
                    if (value && typeof value === "object") {
                        for (k in value) {
                            if (Object.hasOwnProperty.call(value, k)) {
                                v = walk(value, k);
                                if (v !== undefined) {
                                    value[k] = v;
                                } else {
                                    delete value[k];
                                }
                            }
                        }
                    }
                    return reviver.call(holder, key, value);
                }
                text = String(text);
                cx.lastIndex = 0;
                if (cx.test(text)) {
                    text = text.replace(cx, function(a) {
                        return "\\u" + ("0000" + a.charCodeAt(0)
                                .toString(16))
                            .slice(-4);
                    });
                }
                if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]")
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                    j = eval("(" + text + ")");
                    return typeof reviver === "function" ? walk({
                        "": j
                    }, "") : j;
                }
                throw new SyntaxError("JSON.parse");
            }
        }
    }());
} /*********************** JSON ***********************/
/**
	matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license
*/
window.matchMedia = window.matchMedia || (function(doc, undefined) {

    var bool, docElem = doc.documentElement,
        refNode = docElem.firstElementChild || docElem.firstChild,

        // fakeBody required for <FF4 when executed in <head>
        fakeBody = doc.createElement('body'),
        div = doc.createElement('div');

    div.id = 'mq-test-1';
    div.style.cssText = "position:absolute;top:-100em";
    fakeBody.style.background = "none";
    fakeBody.appendChild(div);

    return function(q) {

        div.innerHTML = '&shy;<style media="' + q + '"> #mq-test-1 { width:42px; }</style>';

        docElem.insertBefore(fakeBody, refNode);
        bool = div.offsetWidth === 42;
        docElem.removeChild(fakeBody);

        return {
            matches: bool,
            media: q
        };
    };

}(document));

/**
	http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	requestAnimationFrame polyfill by Erik Möller
	fixes from Paul Irish and Tino Zijdel
	Modified to implement Date.now()
*/
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
        var currTime = Date.now();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };

    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}());

window.XMLHttpRequest = window.XMLHttpRequest || function() {
    var request;
    try {
        request = new ActiveXObject("Msxml2.XMLHTTP");
        // Couldn’t get newer MS-proprietary ActiveX object
    } catch (exception) {
        try {
            request = new ActiveXObject("Microsoft.XMLHTTP");
            // Total XMLHTTP fail
            /*jshint -W002 */
        } catch (exception) {
            request = false;
        }
    }
    return request;
};

! function() {
    var a, b, c, d;
    ! function() {
        var e = {},
            f = {};
        a = function(a, b, c) {
            e[a] = {
                deps: b,
                callback: c
            }
        }, d = c = b = function(a) {
            function c(b) {
                if ("." !== b.charAt(0)) return b;
                for (var c = b.split("/"), d = a.split("/")
                        .slice(0, -1), e = 0, f = c.length; f > e; e++) {
                    var g = c[e];
                    if (".." === g) d.pop();
                    else {
                        if ("." === g) continue;
                        d.push(g)
                    }
                }
                return d.join("/")
            }
            if (d._eak_seen = e, f[a]) return f[a];
            if (f[a] = {}, !e[a]) throw new Error("Could not find module " + a);
            for (var g, h = e[a], i = h.deps, j = h.callback, k = [], l = 0, m = i.length; m > l; l++) "exports" === i[l] ? k.push(g = {}) : k.push(b(c(i[l])));
            var n = j.apply(this, k);
            return f[a] = g || n
        }
    }(), a("promise/all", ["./utils", "exports"], function(a, b) {
            "use strict";

            function c(a) {
                var b = this;
                if (!d(a)) throw new TypeError("You must pass an array to all.");
                return new b(function(b, c) {
                    function d(a) {
                        return function(b) {
                            f(a, b)
                        }
                    }

                    function f(a, c) {
                        h[a] = c, 0 === --i && b(h)
                    }
                    var g, h = [],
                        i = a.length;
                    0 === i && b([]);
                    for (var j = 0; j < a.length; j++) g = a[j], g && e(g.then) ? g.then(d(j), c) : f(j, g)
                })
            }
            var d = a.isArray,
                e = a.isFunction;
            b.all = c
        }), a("promise/asap", ["exports"], function(a) {
            "use strict";

            function b() {
                return function() {
                    process.nextTick(e)
                }
            }

            function c() {
                var a = 0,
                    b = new i(e),
                    c = document.createTextNode("");
                return b.observe(c, {
                        characterData: !0
                    }),
                    function() {
                        c.data = a = ++a % 2
                    }
            }

            function d() {
                return function() {
                    j.setTimeout(e, 1)
                }
            }

            function e() {
                for (var a = 0; a < k.length; a++) {
                    var b = k[a],
                        c = b[0],
                        d = b[1];
                    c(d)
                }
                k = []
            }

            function f(a, b) {
                var c = k.push([a, b]);
                1 === c && g()
            }
            var g, h = "undefined" != typeof window ? window : {},
                i = h.MutationObserver || h.WebKitMutationObserver,
                j = "undefined" != typeof global ? global : void 0 === this ? window : this,
                k = [];
            g = "undefined" != typeof process && "[object process]" === {}.toString.call(process) ? b() : i ? c() : d(), a.asap = f
        }), a("promise/config", ["exports"], function(a) {
            "use strict";

            function b(a, b) {
                return 2 !== arguments.length ? c[a] : (c[a] = b, void 0)
            }
            var c = {
                instrument: !1
            };
            a.config = c, a.configure = b
        }), a("promise/polyfill", ["./promise", "./utils", "exports"], function(a, b, c) {
            "use strict";

            function d() {
                var a;
                a = "undefined" != typeof global ? global : "undefined" != typeof window && window.document ? window : self;
                var b = "Promise" in a && "resolve" in a.Promise && "reject" in a.Promise && "all" in a.Promise && "race" in a.Promise && function() {
                    var b;
                    return new a.Promise(function(a) {
                        b = a
                    }), f(b)
                }();
                b || (a.Promise = e)
            }
            var e = a.Promise,
                f = b.isFunction;
            c.polyfill = d
        }), a("promise/promise", ["./config", "./utils", "./all", "./race", "./resolve", "./reject", "./asap", "exports"], function(a, b, c, d, e, f, g, h) {
            "use strict";

            function i(a) {
                if (!v(a)) throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
                if (!(this instanceof i)) throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
                this._subscribers = [], j(a, this)
            }

            function j(a, b) {
                function c(a) {
                    o(b, a)
                }

                function d(a) {
                    q(b, a)
                }
                try {
                    a(c, d)
                } catch (e) {
                    d(e)
                }
            }

            function k(a, b, c, d) {
                var e, f, g, h, i = v(c);
                if (i) try {
                    e = c(d), g = !0
                } catch (j) {
                    h = !0, f = j
                } else e = d, g = !0;
                n(b, e) || (i && g ? o(b, e) : h ? q(b, f) : a === D ? o(b, e) : a === E && q(b, e))
            }

            function l(a, b, c, d) {
                var e = a._subscribers,
                    f = e.length;
                e[f] = b, e[f + D] = c, e[f + E] = d
            }

            function m(a, b) {
                for (var c, d, e = a._subscribers, f = a._detail, g = 0; g < e.length; g += 3) c = e[g], d = e[g + b], k(b, c, d, f);
                a._subscribers = null
            }

            function n(a, b) {
                var c, d = null;
                try {
                    if (a === b) throw new TypeError("A promises callback cannot return that same promise.");
                    if (u(b) && (d = b.then, v(d))) return d.call(b, function(d) {
                        return c ? !0 : (c = !0, b !== d ? o(a, d) : p(a, d), void 0)
                    }, function(b) {
                        return c ? !0 : (c = !0, q(a, b), void 0)
                    }), !0
                } catch (e) {
                    return c ? !0 : (q(a, e), !0)
                }
                return !1
            }

            function o(a, b) {
                a === b ? p(a, b) : n(a, b) || p(a, b)
            }

            function p(a, b) {
                a._state === B && (a._state = C, a._detail = b, t.async(r, a))
            }

            function q(a, b) {
                a._state === B && (a._state = C, a._detail = b, t.async(s, a))
            }

            function r(a) {
                m(a, a._state = D)
            }

            function s(a) {
                m(a, a._state = E)
            }
            var t = a.config,
                u = (a.configure, b.objectOrFunction),
                v = b.isFunction,
                w = (b.now, c.all),
                x = d.race,
                y = e.resolve,
                z = f.reject,
                A = g.asap;
            t.async = A;
            var B = void 0,
                C = 0,
                D = 1,
                E = 2;
            i.prototype = {
                constructor: i,
                _state: void 0,
                _detail: void 0,
                _subscribers: void 0,
                then: function(a, b) {
                    var c = this,
                        d = new this.constructor(function() {});
                    if (this._state) {
                        var e = arguments;
                        t.async(function() {
                            k(c._state, d, e[c._state - 1], c._detail)
                        })
                    } else l(this, d, a, b);
                    return d
                },
                "catch": function(a) {
                    return this.then(null, a)
                }
            }, i.all = w, i.race = x, i.resolve = y, i.reject = z, h.Promise = i
        }), a("promise/race", ["./utils", "exports"], function(a, b) {
            "use strict";

            function c(a) {
                var b = this;
                if (!d(a)) throw new TypeError("You must pass an array to race.");
                return new b(function(b, c) {
                    for (var d, e = 0; e < a.length; e++) d = a[e], d && "function" == typeof d.then ? d.then(b, c) : b(d)
                })
            }
            var d = a.isArray;
            b.race = c
        }), a("promise/reject", ["exports"], function(a) {
            "use strict";

            function b(a) {
                var b = this;
                return new b(function(b, c) {
                    c(a)
                })
            }
            a.reject = b
        }), a("promise/resolve", ["exports"], function(a) {
            "use strict";

            function b(a) {
                if (a && "object" == typeof a && a.constructor === this) return a;
                var b = this;
                return new b(function(b) {
                    b(a)
                })
            }
            a.resolve = b
        }), a("promise/utils", ["exports"], function(a) {
            "use strict";

            function b(a) {
                return c(a) || "object" == typeof a && null !== a
            }

            function c(a) {
                return "function" == typeof a
            }

            function d(a) {
                return "[object Array]" === Object.prototype.toString.call(a)
            }
            var e = Date.now || function() {
                return (new Date)
                    .getTime()
            };
            a.objectOrFunction = b, a.isFunction = c, a.isArray = d, a.now = e
        }), b("promise/polyfill")
        .polyfill()
}(); /** AC.require - version 1.4.0 **/
/*global console,DEBUG,VERSION*/
// Amaretto : Lightweight alternative to almond.js
! function(global) {
    "use strict";
    /**
     * @inner
     */
    function getDependencies(dependencies, baseName) {
            var exports, module, deps = dependencies.map(function(dep) {
                return "exports" === dep ? exports = {} : "module" === dep ? module = {
                    exports: {}
                } : "require" === dep ? function(name) {
                    return require(normalizeName(name, baseName));
                } : (dep = normalizeName(dep, baseName), require(dep));
            });
            return {
                deps: deps,
                exports: exports,
                module: module
            };
        }
        /**
         * @inner
         */
    function normalizeName(name, baseName) {
            var i, baseParts = baseName && baseName.split("/");
            if (name && "." === name.charAt(0))
                if (baseName) {
                    for (baseParts.pop(), name = name.split("/"), name = baseParts.concat(name), i = 0; i < name.length; i += 1)
                        if ("." === name[i]) name.splice(i, 1),
                            i -= 1;
                        else if (".." === name[i]) {
                        if (1 === i && (".." === name[2] || ".." === name[0])) break;
                        i > 0 && (name.splice(i - 1, 2), i -= 2);
                    }
                    name = name.join("/");
                } else 0 === name.indexOf("./") && (name = name.substring(2));
            return name;
        }
        /**
         * @namespace CommonJS Modules/AsynchronousDefinition<br/>
         * @function
         * @name require
         * @param nameOrDependencies {String|Array} Name of module to load or array of dependencies.
         * @param callback {Function} (optional) Function to call with resolved dependencies.
         * @return {Object} The required module.
         * @description Require a single named module or multiple modules via a callback function.
         * @example // Require a single module:
         * var myModule = require('myModule');
         * @example // Require multiple modules:
         * require(['aModule', 'bModule'], function (a, b) { 
         *   ...
         * });
         */
    function require(nameOrDependencies, callback) {
            var module;
            // If 1st argument is a module name.
            // If 1st argument is a module name.
            return "string" == typeof nameOrDependencies ? (nameOrDependencies = normalizeName(nameOrDependencies),
                    module = moduleRegistry[nameOrDependencies], module || "function" != typeof otherRequire || (module = otherRequire(nameOrDependencies)),
                    module) : // If 1st argument is an array of dependencies.
                "function" == typeof callback && Array.isArray(nameOrDependencies) ? callback.apply(global, getDependencies(nameOrDependencies)
                    .deps) : void 0;
        }
        /**
         * @namespace CommonJS Modules/AsynchronousDefinition<br/>
         * @function
         * @name define
         * @param name {String} module name.
         * @param dependencies {Array} (optional) dependencies.
         * @param module {Object|Function} module object or function.
         * @description Defines a named module.
         * @example // Define a module with dependencies:
         * define('myModule', ['aDependency', 'bDependency'], function (a, b) {
         *   ...
         *   return myModule;
         * });
         * @example // Define a module without dependencies:
         * define('myModule', function () {
         *   ...
         *   return myModule;
         * });
         * @example // Define an object:
         * define('myModule', { ... });
         */
    function define(name, dependencies, module) {
        if (!moduleRegistry[name])
            if ( // If no module is given we assume that the 2nd argument is the module payload.
                module || (module = dependencies), "function" == typeof module && Array.isArray(dependencies)) {
                // Defining a module with dependencies. Resolve, execute and register return value.
                // Eg. define('myModule', ['aDependency', bDependency], function (a, b) { });
                var deps = getDependencies(dependencies, name);
                moduleRegistry[name] = module.apply(module, deps.deps), moduleRegistry[name] || !deps.exports && !deps.module || (moduleRegistry[name] = "object" == typeof deps.exports && Object.keys(deps.exports)
                    .length ? deps.exports : deps.module.exports);
            } else // Defining a module without dependencies. Execute (if a function) and register return value.
            // Eg. define('myModule', function () { });
            //   or
            // Eg. define('myModule', { });
                moduleRegistry[name] = "function" == typeof module ? module() : module;
    }
    var moduleRegistry, otherRequire;
    /**
     * @name require.version
     * @type String
     * @static
     * @description Product version number (as per interactive source project specification).
     */
    require.version = "1.4.0",
        /**
         * @name require.config
         * @type Object
         * @static
         * @description Compatibility with RequireJS.
         */
        require.config = function() {},
        /**
         * @name define.amd
         * @type Object
         * @static
         * @description See specification <a href="http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition">http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition</a>
         */
        define.amd = {},
        /**
         * @name require._init
         * @description Flushes the moduleRegistry and registers require. Used for testing purposes.
         * @function
         * @inner
         */
        require._init = function() {
            moduleRegistry = {};
        },
        /**
         * @name define.getRegisteredModules
         * @function
         * @description gets a list of registered module names (Non-standard).
         * @return {Array} module names.
         */
        define.getRegisteredModules = function() {
            return Object.getOwnPropertyNames(moduleRegistry)
                .sort();
        },
        /**
         * @name define.getRegisteredNamespaces
         * @function
         * @description gets a map of registered module names grouped by namespace (Non-standard).
         * @return {Object} module namespaces.
         * @since 1.4.0
         */
        define.getRegisteredNamespaces = function() {
            var modules = define.getRegisteredModules(),
                namespaces = {};
            return modules.forEach(function(moduleName) {
                var namespace = moduleName.split("/")[0];
                namespaces[namespace] || (namespaces[namespace] = []), namespaces[namespace].push(moduleName);
            }), namespaces;
        }, require._init(), "function" == typeof global.define && global.define.amd || (otherRequire = global.require,
            global.require = require, global.define = define);
}(this);
require = (function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                throw new Error("Cannot find module '" + o + "'")
            }
            var f = n[o] = {
                exports: {}
            };
            t[o][0].call(f.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, f, f.exports, e, t, n, r)
        }
        return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s
})({
    1: [function(require, module, exports) {
        /**
         * More or less follows this specification: 
         * http://wiki.commonjs.org/wiki/Promises/A
         * Other references: 
         * http://en.wikipedia.org/wiki/Futuresandpromises
         * http://livedocs.dojotoolkit.org/dojo/Deferred
         * http://www.sitepen.com/blog/2010/05/03/robust-promises-with-dojo-deferred-1-5/
         * http://api.jquery.com/category/deferred-object/
         *
         * Understanding Deferreds
         * ====================================
         * var asyncTask = function() { 
         *      var def = new Deferred(); 
         *
         *      setTimeout(function() { 
         *          def.resolve(1); 
         *      }, 1000); 
         *      
         *      return def.promise(); 
         *  }
         *  
         *  var haveAllData = Deferred.when(1, asyncTask());
         *  
         *  haveAllDataPromise.then(function(data) { 
         *      var result = data[0] + data[1];
         *      console.log(result); // logs 2
         *      return result; 
         *  }).then(function(data) {
         *      console.log(data * 2); // logs 4
         *  })
         *   
         */
        (function(root, factory) {
            if (typeof exports === "object" && exports) {
                module.exports = factory; // CommonJS
            } else if (typeof define === "function" && define.amd) {
                define(factory); // AMD
            } else {
                root.Deferred = factory; // <script>
            }
        }(this, (function() {
            'use strict';

            var exports = {};

            var statuses, each, CallbackContainer, funcOrEmpty, Deferred, Promise, promiseProto, passThrough;

            statuses = {
                0: 'pending',
                1: 'resolved',
                2: 'rejected'
            };

            // Used to loop through the pending promises for a given deferred.
            // promises must be fulfilled in order
            each = function(type, data) {
                var i, pending, length, callbackObj, callbackResult;

                if (this._status !== 0) {
                    if (console && console.warn) {
                        console.warn('Trying to fulfill more than once.');
                    }
                    return false;
                }

                // store the data for promises after fulfillment  
                this.data = data;

                // reference to array of pending promises
                pending = this.pending;
                length = pending.length;

                for (i = 0; i < length; i++) {
                    callbackObj = pending[i];

                    // If callback of type (resolve, reject, progress) exists, invoke it.
                    if (callbackObj[type]) {
                        callbackResult = callbackObj[type](data);
                    }

                    // Pipe whatever is returned from the callback to the 
                    // callback's deferred. This enables chaining. 
                    if (typeof callbackResult === 'object' && callbackResult.hasOwnProperty('then') && callbackResult.hasOwnProperty('status')) {
                        callbackResult.then(function(data) {
                            callbackObj.deferred.resolve(data);
                        }, function(data) {
                            callbackObj.deferred.reject(data);
                        }, function(data) {
                            callbackObj.deferred.progress(data);
                        });
                    } else {
                        callbackObj.deferred[type](callbackResult || undefined);
                    }

                }

                // if we are not updating progress, remove all the pending promises
                // as they have been now fulfilled or rejected and they cannot be fullfilled/rejected
                // more than once.
                if (type !== 'progress') {
                    pending = [];
                }

                return true;
            };


            /**
             * Creates a Promise object
             * @name Promise
             */
            Promise = function(then, status) {
                this.then = then;
                this.status = status;
            };

            promiseProto = Promise.prototype;

            /* 
             * Shorthands for success, fail, and progress.
             * passThrough is used to pipe data through for chaining
             */
            passThrough = function(value) {
                return value;
            };

            promiseProto.success = function(callback, context) {
                return this.then(callback.bind(context), passThrough, passThrough);
            };

            promiseProto.fail = function(callback, context) {
                return this.then(passThrough, callback.bind(context), passThrough);
            };

            promiseProto.progress = function(callback, context) {
                return this.then(passThrough, passThrough, callback.bind(context));
            };

            funcOrEmpty = function(func) {
                if (typeof func !== 'function') {
                    return function() {};
                }
                return func;
            };

            CallbackContainer = function(success, error, progress) {
                this.resolve = funcOrEmpty(success);
                this.reject = funcOrEmpty(error);
                this.progress = funcOrEmpty(progress);
                this.deferred = new Deferred();
            };

            /**
             * Creates a Deferred object
             * @class Asynch operation? Make a promise that you'll get that data in the future.
             * @name Deferred
             */
            Deferred = function() {
                // promises that are waiting to be fulfilled
                this.pending = [];

                this._status = 0; // initially pending

                // consumer access to then (does this need anything else?)
                this._promise = new Promise(this.then.bind(this), this.status.bind(this));
            };

            Deferred.prototype = /** @lends Deferred.prototype */ {
                /**
                 * Gets the status of the deferred. 
                 * Possible statuses: pending, resolved, rejected, canceled
                 */
                status: function() {
                    return statuses[this._status];
                },
                /**
                 * Returns the promise object associated with a given deferrred instance. A promise can 
                 * observe the deferred, but cannot resolve it.  
                 */
                promise: function() {
                    return this._promise;
                },
                /**
                 * Alerts anyone that is listening for updates on a promise.
                 * @param [update] Update data to send to listeners
                 */
                progress: function(update) {
                    each.call(this, 'progress', update);
                    return this._promise;
                },
                /**
                 * Called when the deferred task is complete and successful. 
                 * @param [value] Data resulting from the deferred task
                 */
                resolve: function(value) {
                    each.call(this, 'resolve', value);
                    if (this._status === 0) {
                        this._status = 1;
                    }
                    return this._promise;
                },
                /**
                 * Called when the deferred task errors out.
                 * @param [error] Error message to pass to listeners
                 */
                reject: function(error) {
                    each.call(this, 'reject', error);
                    if (this._status === 0) {
                        this._status = 2;
                    }
                    return this._promise;
                },
                /**
                 * Used to set callbacks on the deferred. This method is exposed to other code
                 * through the promises object. 
                 * @param {Function} [success] Invoked when a deferred is resolved
                 * @param {Function} [error] Invoked when a deferred is rejected
                 * @param {Function} [progress] May be invoked when progress is made on a deferred task
                 */
                then: function(success, error, progress) {
                    var result, callbackObject;

                    callbackObject = new CallbackContainer(success, error, progress);

                    if (this._status === 0) {
                        this.pending.push(callbackObject);
                    } else if (this._status === 1 && typeof success === 'function') {
                        result = success(this.data);
                        if (typeof result === 'object' && result.hasOwnProperty('then') && result.hasOwnProperty('status')) {
                            result.then(function(data) {
                                callbackObject.deferred.resolve(data);
                            }, function(data) {
                                callbackObject.deferred.reject(data);
                            }, function(data) {
                                callbackObject.deferred.progress(data);
                            });
                        } else {
                            callbackObject.deferred.resolve(result);
                        }
                    } else if (this._status === 2 && typeof error === 'function') {
                        result = error(this.data);
                        callbackObject.deferred.reject(result);
                    }

                    return callbackObject.deferred.promise();

                }
            };

            /**
             * Execute code when all deferred tasks have completed. 
             * Accepts regular variables and promises. Returns a new promise.
             * @name when
             * @function
             *
             * @example
             * var promise = Deferred.when(1, asynchRequest());
             * promise.then(function(a, b) {
             *  console.log(a + b); // 1 + data returned from server
             * }
             */
            var when = function() {
                var values, deferred, pending, success, fail;

                values = [].slice.call(arguments);
                deferred = new Deferred();
                pending = 0;

                success = function(value) {
                    pending--;

                    var i = values.indexOf(this);
                    values[i] = value;

                    if (pending === 0) {
                        deferred.resolve(values);
                    }
                };

                fail = function(error) {
                    deferred.reject(error);
                };

                values.forEach(function(value) {
                    if (value.then) {
                        pending++;
                    }
                });

                values.forEach(function(value) {
                    if (value.then) {
                        value.then(success.bind(value), fail);
                    }
                });

                return deferred.promise();
            };

            Deferred.when = when;

            exports.Deferred = Deferred;

            return exports;

        }())));

    }, {}],
    2: [function(require, module, exports) {

        "use strict";
        /**
         * @name defer.Deferred
         * @class Deferred object.
         * <pre>Deferred = require('defer/Deferred');</pre>
         * <p>API based off a subset of <a href="https://github.com/cujojs/when">when.js</a>.
         * <p>This is the interface we provide, however implementation is provided by a 3rd party library such as jett, when or jQuery.<br/>
         * @see <a href="https://github.com/cujojs/when">when.js</a>
         * @see <a href="http://api.jquery.com/category/deferred-object">jQuery Deferred Object</a>
         * @description Deferred constructor. (see example usage below)
         * @example var deferred = new Deferred();
         *
         * // Some async operation
         * setTimeout(function () {
         *     deferred.resolve();
         * },2000);
         *
         * // Pass the promise on
         * return deferred.promise();
         */

        function Deferred() {}

        Deferred.prototype = {
            /**
             *  @name defer.Deferred#resolve
             *  @description Signals resolution of the deferred (as per when.js spec)
             *  @return {defer.Promise}
             *  @function
             */
            'resolve': function resolve() {
                this._defer.resolve.apply(this._defer, Array.prototype.slice.call(arguments));
                return this.promise();
            },
            /**
             *  @name defer.Deferred#reject
             *  @description Signals rejection of the deferred (as per when.js spec)
             *  @return {defer.Promise}
             *  @function
             */
            'reject': function reject() {
                this._defer.reject.apply(this._defer, Array.prototype.slice.call(arguments));
                return this.promise();
            },
            /**
             *  @name defer.Deferred#progress
             *  @description Signals progression of the deferred (as per when.js spec)
             *  @deprecated as of 1.2.0, since it is not part of the A+ spec. Recommend using ac-event-emitter for progress signaling.
             *  @return {defer.Promise}
             *  @function
             */
            'progress': function progress() {
                var message = 'ac-defer.progress is deprecated since it is not part of the A+ spec. Recommend using ac-event-emitter for progress signaling';
                console.warn(message);
                this._defer.progress.apply(this._defer, Array.prototype.slice.call(arguments));
                return this.promise();
            },
            /**
             *  @name defer.Deferred#then
             *  @description Attach callbacks to the deferred
             *  @param {Function} success
             *  @param {Function} failure
             *  @param {Function} progress
             *  @return {defer.Promise}
             *  @function
             */
            'then': function then() {
                this._defer.then.apply(this._defer, Array.prototype.slice.call(arguments));
                return this.promise();
            },
            /**
             *  @name defer.Deferred#promise
             *  @description gets the deferred promise (as per jQuery spec)
             *  @return {defer.Promise}
             *  @function
             */
            'promise': function promise() {
                return this._defer.promise.apply(this._defer, Array.prototype.slice.call(arguments));
            }

            /**
             * @name defer.Deferred.join
             * @static
             * @description Return a {@link defer.Promise} that will resolve only once all the inputs have resolved. The resolution value of the returned promise will be an array containing the resolution values of each of the inputs.
             * @example var joinedPromise = Deferred.join(promiseOrValue1, promiseOrValue2, ...);
             *
             * @example // largerPromise will resolve to the greater of two eventual values
             * var largerPromise = defer.join(promise1, promise2).then(function (values) {
             *     return values[0] > values[1] ? values[0] : values[1];
             * });
             * @function
             * @param {defer.Promise} promiseOrValue1
             * @param {defer.Promise} promiseOrValue2 ...
             * @return {defer.Promise}
             * @see defer.Deferred#all
             */
            /**
             * @name defer.Deferred.all
             * @static
             * @description Return a {@link defer.Promise} that will resolve only once all the items in array have resolved. The resolution value of the returned promise will be an array containing the resolution values of each of the items in array.
             * @example var promise = Deferred.all(arrayOfPromisesOrValues);
             * @function
             * @param {Array} arrayOfPromisesOrValues Array of {@link defer.Promise} or values
             * @return {defer.Promise}
             * @see defer.Deferred#join
             */

        };

        module.exports = Deferred;

    }, {}],
    "ac-deferred": [function(require, module, exports) {
        module.exports = require('gpsNR2');
    }, {}],
    "gpsNR2": [function(require, module, exports) {
        'use strict';
        /**
         * @name interface.smartsign
         * @inner
         * @namespace Provides {@link defer} object using Smartsign's implementation.
         * <br/>
         * @description Provides {@link defer} object using Smartsign's implementation.
         */
        var proto = new(require('./ac-deferred/Deferred'))(),
            SmartsignDeferred = require('smartsign-deferred')
            .Deferred;

        function Deferred() {
            this._defer = new SmartsignDeferred();
        }

        Deferred.prototype = proto;

        module.exports.join = function join() {
            return SmartsignDeferred.when.apply(null, [].slice.call(arguments));
        };

        module.exports.all = function all(arrayOfPromises) {
            return SmartsignDeferred.when.apply(null, arrayOfPromises);
        };

        module.exports.Deferred = Deferred;
    }, {
        "./ac-deferred/Deferred": 2,
        "smartsign-deferred": 1
    }],
    "nhHP3s": [function(require, module, exports) {
        /** 
         * @module ac-event-emitter
         * @author Ronald "Doctor" Jett <rjett@apple.com>
         * @copyright 2014 Apple Inc. All rights reserved.
         */
        module.exports.EventEmitter = require('./ac-event-emitter/EventEmitter');
    }, {
        "./ac-event-emitter/EventEmitter": 7
    }],
    "ac-event-emitter": [function(require, module, exports) {
        module.exports = require('nhHP3s');
    }, {}],
    7: [function(require, module, exports) {
        /** 
         * @module ac-event-emitter/EventEmitter
         * @classdesc An object that provides an event system
         */
        'use strict';

        var propagationName = 'EventEmitter:propagation';

        /**
         * @constructor
         */
        var EventEmitter = function(context) {
            // we should only create a context property if
            // the user is using EventEmitter through composition
            // and not using it as a part of their prototype chain
            if (context) {
                this.context = context;
            }
        };

        // shorthand to the prototype 
        var proto = EventEmitter.prototype;

        // test to see if the instant has an object
        // that as been allocated to store events
        var getEvents = function() {
            if (!this.hasOwnProperty('_events') && typeof this._events !== 'object') {
                this._events = {};
            }
            return this._events;
        };

        // @arguments arguments Could be:
        //  event Single string event, space seperated string, or map of events/callbacks
        //  callback Callback function for space seperated or single events
        //  context Context to apply to callbacks when invoked
        // @argument register The function that will get called for each event/callback/context
        var parseEvents = function(args, register) {
            var event = args[0];
            var callback = args[1];
            var context = args[2];

            // event should be a string or an plain object (not an array or null)
            if ((typeof event !== 'string' && typeof event !== 'object') || event === null || Array.isArray(event)) {
                throw new TypeError('Expecting event name to be a string or object.');
            }

            // ensure that calls to on/once with a string for event names
            // also come with a callback function
            if ((typeof event === 'string') && !callback) {
                throw new Error('Expecting a callback function to be provided.');
            }

            // callback should be a function
            if (callback && (typeof callback !== 'function')) {
                // unless we have a map of events/callbacks, then it could actually
                // be a context object
                if (typeof event === 'object' && typeof callback === 'object') {
                    context = callback;
                } else {
                    throw new TypeError('Expecting callback to be a function.');
                }
            }

            // we have a map of events/callbacks
            if (typeof event === 'object') {
                for (var evt in event) {
                    register.call(this, evt, event[evt], context);
                }
            }

            // we have a string of events
            if (typeof event === 'string') {
                event = event.split(' ');
                event.forEach(function(evt) {
                    register.call(this, evt, callback, context);
                }, this);
            }
        };

        // Finds the array of callback objects for 
        // a given event name, then executes the provided
        // callback for each one of them. Passing the callback
        // object and the index.
        var each = function(event, callback) {
            var eventsArray;
            var i;
            var length;

            eventsArray = getEvents.call(this)[event];

            if (!eventsArray || eventsArray.length === 0) {
                return;
            }

            // copy it in case anything we call tries to modify it
            eventsArray = eventsArray.slice();

            for (i = 0, length = eventsArray.length; i < length; i++) {
                if (callback(eventsArray[i], i)) {
                    break;
                }
            }
        };

        // Remove a callback for a given event
        var removeSpecificCallback = function(events, event, callback) {
            // looking for a specific callback
            var i = -1;
            each.call(this, event, function(callbackObject, index) {
                if (callbackObject.callback === callback) {
                    i = index;
                    return true;
                }
            });

            if (i === -1) {
                return;
            }

            events[event].splice(i, 1);
        };


        /**
         * A method for adding a callback for a given event
         * @method
         * @param {string} event Event name
         * @param {function} callback A function to invoke when an event is triggered
         * @param {object} [context] A context to bind to the callback
         */
        proto.on = function() {
            var events = getEvents.call(this);

            parseEvents.call(this, arguments, function(event, callback, context) {
                events[event] = events[event] || (events[event] = []);
                events[event].push({
                    callback: callback,
                    context: context
                });
            });

            return this;
        };

        /**
         * A method for adding a callback for an event that will only execute once
         * and then be removed.
         * @method
         * @param {string} event Event name
         * @param {function} callback A function to invoke when an event is triggered
         * @param {object} [context] A context to bind to the callback
         */
        proto.once = function() {
            parseEvents.call(this, arguments, function(event, callback, context) {
                var wrapper = function(data) {
                    callback.call(context || this, data);
                    this.off(event, wrapper);
                };
                this.on(event, wrapper, this);
            });

            return this;
        };

        /**
         * A method for removing a callback for a given event
         * If no arguments are specified, all handlers are removed.
         * @method
         * @param {string} [event] Event name
         * @param {function} [callback] A function to remove
         */
        proto.off = function(event, callback) {
            var events = getEvents.call(this);

            // if no arguments are specified
            // we will drop all callbacks
            if (arguments.length === 0) {
                this._events = {};
            }
            // event names should be a string
            else if (!event || (typeof event !== 'string' && typeof event !== 'object') || Array.isArray(event)) {
                throw new TypeError('Expecting event name to be a string or object.');
            }

            if (typeof event === 'object') {
                for (var e in event) {
                    removeSpecificCallback.call(this, events, e, event[e]);
                }
            }

            // one or more events passed as string
            if (typeof event === 'string') {
                var split = event.split(' ');

                // only one event passed
                if (split.length === 1) {
                    // if a callback was specified remove that callback
                    if (callback) {
                        removeSpecificCallback.call(this, events, event, callback);
                    }
                    // otherwise, remove all the callbacks for that event
                    else {
                        events[event] = [];
                    }
                }
                // space seperated events passed
                else {
                    split.forEach(function(event) {
                        events[event] = [];
                    });
                }
            }

            return this;
        };

        /**
         * A method for firing/triggering an event
         * @method
         * @param {string} event Event name
         * @param {object} [data] Data to pass to the listening callbacks
         * @param {boolean} [doNotPropagate] Flag to silence propagation
         */
        proto.trigger = function(event, data, doNotPropagate) {
            // you need at least an event
            if (!event) {
                throw new Error('trigger method requires an event name');
            }

            // event names should be a string
            if (typeof event !== 'string') {
                throw new TypeError('Expecting event names to be a string.');
            }

            // doNotPropagate flag should be a boolean
            if (doNotPropagate && typeof doNotPropagate !== 'boolean') {
                throw new TypeError('Expecting doNotPropagate to be a boolean.');
            }

            // split events incase we are trigger multiples with a space delimiter
            event = event.split(' ');

            // loop through the events
            event.forEach(function(evt) {

                // call all the callbacks for the given event
                each.call(this, evt, function(callbackObject) {
                    callbackObject.callback.call(callbackObject.context || this.context || this, data);
                }.bind(this));

                // propagate event if anyone else is listening, unless told not to
                if (!doNotPropagate) {
                    each.call(this, propagationName, function(propagation) {
                        var eventName = evt;

                        if (propagation.prefix) {
                            eventName = propagation.prefix + eventName;
                        }

                        propagation.emitter.trigger(eventName, data);
                    });
                }

            }, this);

            return this;
        };

        /**
         * A method for propagating events to another EventEmitter
         * @method
         * @param {object} eventEmitter An event emitting object to propagate events to
         * @param {string} [prefix] A prefix to be appended to the name of a propagating event
         */
        proto.propagateTo = function(eventEmitter, prefix) {
            var events = getEvents.call(this);

            if (!events[propagationName]) {
                this._events[propagationName] = [];
            }

            events[propagationName].push({
                emitter: eventEmitter,
                prefix: prefix
            });
        };

        /**
         * A method for removing propagation
         * @method
         * @param {object} [eventEmitter] The event emitter to stop propagating to
         */
        proto.stopPropagatingTo = function(eventEmitter) {
            var events = getEvents.call(this);

            // If an argument was not specified,
            // all propagations will be removed.
            if (!eventEmitter) {
                events[propagationName] = [];
                return;
            }

            // If an event emitter was passed in,
            // just removed propagation to that object
            var propagationTargets = events[propagationName];
            var length = propagationTargets.length;
            var i;

            for (i = 0; i < length; i++) {
                if (propagationTargets[i].emitter === eventEmitter) {
                    propagationTargets.splice(i, 1);
                    break;
                }
            }
        };

        /**
         * A method for checking whether or not there are callbacks for a given event
         * @method
         * @param {string} evt An event name to check
         * @param {function} [callback] A callback to check for 
         * @parma {object} [context] A particular context
         */
        proto.has = function(evt, callback, context) {
            var events = getEvents.call(this);
            var eventsArray = events[evt];

            // return an array of all events if no arguments specified
            if (arguments.length === 0) {
                return Object.keys(events);
            }

            // If we are not looking for a particular callback,
            // check the length of the events array
            if (!callback) {
                return (eventsArray && eventsArray.length > 0) ? true : false;
            }

            // If we are looking for a particular callback/context, loop through 
            // the array of callbacks for the given event name
            for (var i = 0, length = eventsArray.length; i < length; i++) {
                var callbackContainer = eventsArray[i];

                // looking for both a callback and a context
                if (context && callback && callbackContainer.context === context && callbackContainer.callback === callback) {
                    return true;
                }
                // just looking for a callback
                else if (callback && !context && callbackContainer.callback === callback) {
                    return true;
                }
            }

            return false;
        };

        module.exports = EventEmitter;

    }, {}],
    8: [function(require, module, exports) {
        /**
         * Object#toString() ref for stringify().
         */

        var toString = Object.prototype.toString;

        /**
         * Object#hasOwnProperty ref
         */

        var hasOwnProperty = Object.prototype.hasOwnProperty;

        /**
         * Array#indexOf shim.
         */

        var indexOf = typeof Array.prototype.indexOf === 'function' ? function(arr, el) {
            return arr.indexOf(el);
        } : function(arr, el) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === el) return i;
            }
            return -1;
        };

        /**
         * Array.isArray shim.
         */

        var isArray = Array.isArray || function(arr) {
            return toString.call(arr) == '[object Array]';
        };

        /**
         * Object.keys shim.
         */

        var objectKeys = Object.keys || function(obj) {
            var ret = [];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    ret.push(key);
                }
            }
            return ret;
        };

        /**
         * Array#forEach shim.
         */

        var forEach = typeof Array.prototype.forEach === 'function' ? function(arr, fn) {
            return arr.forEach(fn);
        } : function(arr, fn) {
            for (var i = 0; i < arr.length; i++) fn(arr[i]);
        };

        /**
         * Array#reduce shim.
         */

        var reduce = function(arr, fn, initial) {
            if (typeof arr.reduce === 'function') return arr.reduce(fn, initial);
            var res = initial;
            for (var i = 0; i < arr.length; i++) res = fn(res, arr[i]);
            return res;
        };

        /**
         * Cache non-integer test regexp.
         */

        var isint = /^[0-9]+$/;

        function promote(parent, key) {
            if (parent[key].length == 0) return parent[key] = {}
            var t = {};
            for (var i in parent[key]) {
                if (hasOwnProperty.call(parent[key], i)) {
                    t[i] = parent[key][i];
                }
            }
            parent[key] = t;
            return t;
        }

        function parse(parts, parent, key, val) {
            var part = parts.shift();

            // illegal
            if (hasOwnProperty.call(Object.prototype, key)) return;

            // end
            if (!part) {
                if (isArray(parent[key])) {
                    parent[key].push(val);
                } else if ('object' == typeof parent[key]) {
                    parent[key] = val;
                } else if ('undefined' == typeof parent[key]) {
                    parent[key] = val;
                } else {
                    parent[key] = [parent[key], val];
                }
                // array
            } else {
                var obj = parent[key] = parent[key] || [];
                if (']' == part) {
                    if (isArray(obj)) {
                        if ('' != val) obj.push(val);
                    } else if ('object' == typeof obj) {
                        obj[objectKeys(obj)
                            .length] = val;
                    } else {
                        obj = parent[key] = [parent[key], val];
                    }
                    // prop
                } else if (~indexOf(part, ']')) {
                    part = part.substr(0, part.length - 1);
                    if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
                    parse(parts, obj, part, val);
                    // key
                } else {
                    if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
                    parse(parts, obj, part, val);
                }
            }
        }

        /**
         * Merge parent key/val pair.
         */

        function merge(parent, key, val) {
            if (~indexOf(key, ']')) {
                var parts = key.split('['),
                    len = parts.length,
                    last = len - 1;
                parse(parts, parent, 'base', val);
                // optimize
            } else {
                if (!isint.test(key) && isArray(parent.base)) {
                    var t = {};
                    for (var k in parent.base) t[k] = parent.base[k];
                    parent.base = t;
                }
                set(parent.base, key, val);
            }

            return parent;
        }

        /**
         * Compact sparse arrays.
         */

        function compact(obj) {
            if ('object' != typeof obj) return obj;

            if (isArray(obj)) {
                var ret = [];

                for (var i in obj) {
                    if (hasOwnProperty.call(obj, i)) {
                        ret.push(obj[i]);
                    }
                }

                return ret;
            }

            for (var key in obj) {
                obj[key] = compact(obj[key]);
            }

            return obj;
        }

        /**
         * Parse the given obj.
         */

        function parseObject(obj) {
            var ret = {
                base: {}
            };

            forEach(objectKeys(obj), function(name) {
                merge(ret, name, obj[name]);
            });

            return compact(ret.base);
        }

        /**
         * Parse the given str.
         */

        function parseString(str) {
            var ret = reduce(String(str)
                    .split('&'),
                    function(ret, pair) {
                        var eql = indexOf(pair, '='),
                            brace = lastBraceInKey(pair),
                            key = pair.substr(0, brace || eql),
                            val = pair.substr(brace || eql, pair.length),
                            val = val.substr(indexOf(val, '=') + 1, val.length);

                        // ?foo
                        if ('' == key) key = pair, val = '';
                        if ('' == key) return ret;

                        return merge(ret, decode(key), decode(val));
                    }, {
                        base: {}
                    })
                .base;

            return compact(ret);
        }

        /**
         * Parse the given query `str` or `obj`, returning an object.
         *
         * @param {String} str | {Object} obj
         * @return {Object}
         * @api public
         */

        exports.parse = function(str) {
            if (null == str || '' == str) return {};
            return 'object' == typeof str ? parseObject(str) : parseString(str);
        };

        /**
         * Turn the given `obj` into a query string
         *
         * @param {Object} obj
         * @return {String}
         * @api public
         */

        var stringify = exports.stringify = function(obj, prefix) {
            if (isArray(obj)) {
                return stringifyArray(obj, prefix);
            } else if ('[object Object]' == toString.call(obj)) {
                return stringifyObject(obj, prefix);
            } else if ('string' == typeof obj) {
                return stringifyString(obj, prefix);
            } else {
                return prefix + '=' + encodeURIComponent(String(obj));
            }
        };

        /**
         * Stringify the given `str`.
         *
         * @param {String} str
         * @param {String} prefix
         * @return {String}
         * @api private
         */

        function stringifyString(str, prefix) {
            if (!prefix) throw new TypeError('stringify expects an object');
            return prefix + '=' + encodeURIComponent(str);
        }

        /**
         * Stringify the given `arr`.
         *
         * @param {Array} arr
         * @param {String} prefix
         * @return {String}
         * @api private
         */

        function stringifyArray(arr, prefix) {
            var ret = [];
            if (!prefix) throw new TypeError('stringify expects an object');
            for (var i = 0; i < arr.length; i++) {
                ret.push(stringify(arr[i], prefix + '[' + i + ']'));
            }
            return ret.join('&');
        }

        /**
         * Stringify the given `obj`.
         *
         * @param {Object} obj
         * @param {String} prefix
         * @return {String}
         * @api private
         */

        function stringifyObject(obj, prefix) {
            var ret = [],
                keys = objectKeys(obj),
                key;

            for (var i = 0, len = keys.length; i < len; ++i) {
                key = keys[i];
                if ('' == key) continue;
                if (null == obj[key]) {
                    ret.push(encodeURIComponent(key) + '=');
                } else {
                    ret.push(stringify(obj[key], prefix ? prefix + '[' + encodeURIComponent(key) + ']' : encodeURIComponent(key)));
                }
            }

            return ret.join('&');
        }

        /**
         * Set `obj`'s `key` to `val` respecting
         * the weird and wonderful syntax of a qs,
         * where "foo=bar&foo=baz" becomes an array.
         *
         * @param {Object} obj
         * @param {String} key
         * @param {String} val
         * @api private
         */

        function set(obj, key, val) {
            var v = obj[key];
            if (hasOwnProperty.call(Object.prototype, key)) return;
            if (undefined === v) {
                obj[key] = val;
            } else if (isArray(v)) {
                v.push(val);
            } else {
                obj[key] = [v, val];
            }
        }

        /**
         * Locate last brace in `str` within the key.
         *
         * @param {String} str
         * @return {Number}
         * @api private
         */

        function lastBraceInKey(str) {
            var len = str.length,
                brace, c;
            for (var i = 0; i < len; ++i) {
                c = str[i];
                if (']' == c) brace = false;
                if ('[' == c) brace = true;
                if ('=' == c && !brace) return i;
            }
        }

        /**
         * Decode `str`.
         *
         * @param {String} str
         * @return {String}
         * @api private
         */

        function decode(str) {
            try {
                return decodeURIComponent(str.replace(/\+/g, ' '));
            } catch (err) {
                return str;
            }
        }

    }, {}],
    "QQX0yI": [function(require, module, exports) {
        /**
         * @module ac-base
         */
        'use strict';

        var globals = require('./ac-base/globals');
        var AC = globals.window.AC = globals.window.AC || {};
        var ac_Environment = require('./ac-base/Environment');
        var ac_onDOMReady = require('./ac-base/Element/onDOMReady');

        // IE
        if (ac_Environment.Browser.IE) {
            // Run the HTML5 shim for IE < 9
            if (ac_Environment.Browser.IE.documentMode < 9) {
                require('./ac-base/shims/html5.js')();
            }
            // Click-booster for IE < 8, requires DOMReady for execution
            if (ac_Environment.Browser.IE.documentMode < 8) {
                ac_onDOMReady(require('./ac-base/shims/ie/nonClickableImageBooster'));
            }
        }

        // AC.require compatibility
        if (typeof define !== 'undefined') {
            AC.define = define;
            AC.require = require;
        }

        AC.adler32 = require('./ac-base/adler32');
        AC.Ajax = require('./ac-base/Ajax');
        AC.Array = require('./ac-base/Array');
        AC.bindEventListeners = require('./ac-base/bindEventListeners');
        AC.Canvas = require('./ac-base/Canvas');
        AC.Class = require('./ac-base/Class');
        AC.Date = require('./ac-base/Date');
        AC.DeferredQueue = require('./ac-base/DeferredQueue');
        AC.EasingFunctions = require('./ac-base/EasingFunctions');
        AC.Element = require('./ac-base/Element');
        AC.Environment = ac_Environment;
        AC.Event = require('./ac-base/Event');
        AC.Function = require('./ac-base/Function');
        AC.History = require('./ac-base/History');
        AC.log = require('./ac-base/log');
        AC.namespace = require('./ac-base/namespace');
        AC.NotificationCenter = require('./ac-base/NotificationCenter');
        AC.Object = require('./ac-base/Object');
        AC.onDOMReady = ac_onDOMReady;
        AC.onWindowLoad = require('./ac-base/Element/onWindowLoad');
        AC.queryParameters = require('./ac-base/queryParameters');
        AC.RegExp = require('./ac-base/RegExp');
        AC.Registry = require('./ac-base/Registry');
        AC.String = require('./ac-base/String');
        AC.Synthesize = require('./ac-base/Synthesize');
        AC.uid = require('./ac-base/uid');
        AC.Viewport = require('./ac-base/Viewport');

        AC.windowHasLoaded = false;
        AC.Element.addEventListener(globals.window, 'load', function() {
            AC.windowHasLoaded = true;
        });

        module.exports = AC;

    }, {
        "./ac-base/Ajax": 11,
        "./ac-base/Array": 15,
        "./ac-base/Canvas": 16,
        "./ac-base/Class": 17,
        "./ac-base/Date": 18,
        "./ac-base/DeferredQueue": 19,
        "./ac-base/EasingFunctions": 20,
        "./ac-base/Element": 21,
        "./ac-base/Element/onDOMReady": 24,
        "./ac-base/Element/onWindowLoad": 25,
        "./ac-base/Environment": 27,
        "./ac-base/Event": 33,
        "./ac-base/Function": 34,
        "./ac-base/History": 35,
        "./ac-base/NotificationCenter": 36,
        "./ac-base/Object": 37,
        "./ac-base/RegExp": 38,
        "./ac-base/Registry": 39,
        "./ac-base/String": 41,
        "./ac-base/Synthesize": 42,
        "./ac-base/Viewport": 43,
        "./ac-base/adler32": 44,
        "./ac-base/bindEventListeners": 45,
        "./ac-base/globals": 46,
        "./ac-base/log": 47,
        "./ac-base/namespace": 48,
        "./ac-base/queryParameters": 49,
        "./ac-base/shims/html5.js": 50,
        "./ac-base/shims/ie/nonClickableImageBooster": 54,
        "./ac-base/uid": 55
    }],
    "ac-base": [function(require, module, exports) {
        module.exports = require('QQX0yI');
    }, {}],
    11: [function(require, module, exports) {
        'use strict';

        /**
         * Contains classes and functions for making asynchronous HTTP requests.
         * @name module:ac-base.Ajax
         * @kind namespace
         */
        var ac_Ajax = {};

        require('./Ajax/ajax-tracker')(ac_Ajax);
        require('./Ajax/ajax-response')(ac_Ajax);
        require('./Ajax/ajax-request')(ac_Ajax);

        /**
         * Get the browser’s transport
         * @return {Object} XMLHttpRequest
         * @name module:ac-base.Ajax.getTransport
         * @kind function
         */
        ac_Ajax.getTransport = function() {

            return new XMLHttpRequest();

        };

        /**
         * Checks a URL’s status using an HTTP head so the file doesn’t load.
         * @param  {String}   url      URL to test whether or not it exists
         * @param  {Function} callback Method that is ran when the request is completed. Passed a boolean whether or not a file exists at the <code>url</code>
         * @name module:ac-base.Ajax.checkURL
         * @kind function
         */
        ac_Ajax.checkURL = function(url, callback) {

            var error = ac_Ajax.__validateArguments(url, callback);

            if (error) {
                throw error;
            }

            var transport = ac_Ajax.getTransport();

            this.__handleReadyStateChange(transport, callback);
            transport.open('HEAD', url, true);
            transport.send(null);

        };

        /**
         * Adds on onreadystatechange event listener to a transport
         * and handles the event with the provided callback
         * @param  {Object}   transport An instance of XMLHttpRequest
         * @param  {Function} callback  The callback to handle the readystate change equal to 4
         * @private
         * @name module:ac-base.Ajax.__handleReadyStateChange
         * @kind function
         */
        ac_Ajax.__handleReadyStateChange = function(transport, callback) {

            transport.onreadystatechange = function() {
                if (this.readyState === 4) {
                    if (typeof callback === 'function') {
                        // True if the file exists, false otherwise
                        callback(this.status === 200);
                    }
                }
            };

        };

        /**
         * Returns an error message if any arguments are undefined
         * @param  {String}   url      A url
         * @param  {Function} callback A function
         * @return {String}            An error message
         * @private
         * @name module:ac-base.Ajax.__validateArguments
         * @kind function
         */
        ac_Ajax.__validateArguments = function(url, callback) {

            var errors;

            if (!url) {
                errors = 'Must provide a url';
            }

            if (!callback) {
                errors = 'Must provide a callback';
            }

            if (!url && !callback) {
                errors = 'Must provide a url and callback';
            }

            return errors;

        };

        module.exports = ac_Ajax;

    }, {
        "./Ajax/ajax-request": 12,
        "./Ajax/ajax-response": 13,
        "./Ajax/ajax-tracker": 14
    }],
    12: [function(require, module, exports) {
        'use strict';

        var ac_Class = require('../Class');
        var ac_Object = require('../Object');

        module.exports = function(ac_Ajax) {

            /**
             * @param url {String} URL to open.
             * @param options Dictionary of callbacks for onSuccess, onFailure, onError, and/or onComplete.
             * @name module:ac-base.Ajax.AjaxRequest
             * @kind class
             * @classdesc Request class; create one of these to build an AJAX request.
             */
            var AjaxRequest = ac_Class();

            AjaxRequest.prototype = /** @lends module:ac-base.Ajax.AjaxRequest# */ {

                __defaultOptions: {
                    method: 'get'
                },

                /** @ignore */
                initialize: function(url, options) {

                    this._transport = ac_Ajax.getTransport();
                    this._mimeTypeOverride = null;
                    this._options = null;

                    ac_Object.synthesize(this);

                    this.setOptions(ac_Object.extend(ac_Object.clone(this.__defaultOptions), options || {}));

                    ac_Ajax.AjaxTracker.sharedInstance()
                        .addResponder(this);

                    this.__configureTransport(url);
                },

                /** @ignore */
                __configureTransport: function(url) {

                    this.transport()
                        .onreadystatechange = this.__handleTransportStateChange.bind(this);
                    this.transport()
                        .open(this.options()
                            .method, url, true);
                    this.transport()
                        .setRequestHeader('Content-Type', this.options()
                            .contentType);
                    this.transport()
                        .send(null);

                },

                /** @ignore */
                __handleTransportStateChange: function() {
                    if (this.transport()
                        .readyState === 4) {
                        var ajaxResponse = new ac_Ajax.AjaxResponse(this);
                    }
                },

                /**
                 * @param {String} overrideMimeTypeValue
                 * @returns {void}
                 */
                overrideMimeType: function(overrideMimeTypeValue) {
                    this._mimeTypeOverride = overrideMimeTypeValue;
                    if (this.transport()
                        .overrideMimeType) {
                        this.transport()
                            .overrideMimeType(overrideMimeTypeValue);
                    }
                },

                /** @ignore */
                _overrideMimeType: null

            };

            ac_Ajax.AjaxRequest = AjaxRequest;
        };

    }, {
        "../Class": 17,
        "../Object": 37
    }],
    13: [function(require, module, exports) {
        'use strict';

        var ac_Class = require('../Class');

        module.exports = function(ac_Ajax) {

            /**
             * Triggers callbacks if transport.readyState === 4 and onComplete
             * callback if isLoaded has already returned true.
             * {module:ac-base.Ajax.AjaxRequest} request Request object.
             * @param  request  An ac_Ajax.AjaxRequest instance
             * @name module:ac-base.Ajax.AjaxResponse
             * @kind class
             * @classdesc One of these is initialized when we get a response from an AJAX call.
             */
            var AjaxResponse = ac_Class();

            AjaxResponse.prototype = /** @lends module:ac-base.Ajax.AjaxResponse# */ {

                _request: null,
                _transport: null,

                /** @ignore */
                initialize: function(request) {

                    this._transport = request.transport();
                    this._request = request;

                    var isComplete = false;
                    var isLoaded = this._transport.readyState === 4;

                    if (isLoaded) {
                        this.__triggerCallbacks();
                        isComplete = true;
                    }

                    if (isComplete) {

                        if (this._request.options()
                            .onComplete) {
                            this._request.options()
                                .onComplete(this);
                        }

                        ac_Ajax.AjaxTracker.sharedInstance()
                            .removeResponder(request);
                    }
                },

                // Calls all configured callbacks for matching transportStatus
                /** @ignore */
                __triggerCallbacks: function() {

                    var transportStatus = this._transport.status;
                    var isSuccessful = transportStatus >= 200 && transportStatus < 300;
                    var isFailure = transportStatus >= 400 && transportStatus < 500;
                    var isError = transportStatus >= 500 && transportStatus < 600 || transportStatus === 0;

                    if (isSuccessful && this._request.options()
                        .onSuccess) {
                        this._request.options()
                            .onSuccess(this);
                    }

                    if (isFailure && this._request.options()
                        .onFailure) {
                        this._request.options()
                            .onFailure(this);
                    }

                    if (isError && this._request.options()
                        .onError) {
                        this._request.options()
                            .onError(this);
                    }

                },

                /**
                 * @returns {String} The response body as a string.
                 */
                responseText: function() {
                    return this._transport.responseText;
                },

                /**
                 * @returns {XMLDocument} The response body as an XML Document Object Model (DOM) object.
                 */
                responseXML: function() {
                    return this._transport.responseXML;
                },

                /**
                 * @returns {*} The response body as parsed JSON.
                 */
                responseJSON: function() {
                    return JSON.parse(this._transport.responseText);
                }

            };

            ac_Ajax.AjaxResponse = AjaxResponse;
        };

    }, {
        "../Class": 17
    }],
    14: [function(require, module, exports) {
        'use strict';

        var ac_Class = require('../Class');

        module.exports = function(ac_Ajax) {

            /**
             * @name module:ac-base.Ajax.AjaxTracker
             * @classdesc Description TODO
             * @kind class
             */
            var AjaxTracker = ac_Class();

            AjaxTracker.prototype = /** @lends module:ac-base.Ajax.AjaxTracker# */ {

                // Used by module:ac-ajax to maintain reference to open AJAX calls.
                /** @ignore */
                __responders: [],

                /** @ignore */
                initialize: function() {},

                /**
                 * Add a responder to the tracker.
                 * @param responder The responder to add.
                 * @returns {Array} Newly populated array of responders.
                 */
                addResponder: function(responder) {
                    this.__responders.push(responder);
                    return this.__responders;
                },

                /**
                 * Remove a given responder object from this tracker, de-referencing it.
                 * @param responder {module:ac-ajax.AjaxRequest} The responder to remove.
                 * @returns {Boolean} Success or failure.
                 */
                removeResponder: function(responder) {

                    var originalLength = this.__responders.length;

                    this.__responders = this.__responders.filter(function(value) {
                        return value !== responder;
                    });

                    var newLength = this.__responders.length;

                    if (originalLength > newLength) {
                        return true;
                    }

                    return false;

                }
            };

            ac_Ajax.AjaxTracker = AjaxTracker;
        };

    }, {
        "../Class": 17
    }],
    15: [function(require, module, exports) {
        'use strict';

        var ac_Environment_Browser = require('./Environment/Browser');

        /**
         * @name module:ac-base.Array
         * @kind namespace
         */
        var ac_Array = {};

        /**
         * @param {Object} arrayLike Take an Array-like object and convert it to an actual Array (for instance a NodeList)
         * @name module:ac-base.Array.toArray
         * @kind function
         */
        ac_Array.toArray = function(arrayLike) {
            return Array.prototype.slice.call(arrayLike);
        };

        /**
         * @param {Array} array Take a multi-dimensional array and flatten it into a single level.
         * @name module:ac-base.Array.flatten
         * @kind function
         */
        ac_Array.flatten = function(array) {
            var flattenedArray = [];
            var callback = function(item) {
                if (Array.isArray(item)) {
                    item.forEach(callback);
                } else {
                    flattenedArray.push(item);
                }
            };

            array.forEach(callback);
            return flattenedArray;
        };

        /**
         * @param {Array} arr Source array
         * @param {*} value Entry in array to remove
         * @returns {Array} A new array that is the source array without the first instance of the value provided.
         * @name module:ac-base.Array.without
         * @kind function
         */
        ac_Array.without = function(arr, value) {
            var newArr;
            var index = arr.indexOf(value);
            var length = arr.length;

            if (index >= 0) {
                // If it’s the last item
                if (index === (length - 1)) {
                    newArr = arr.slice(0, (length - 1));

                    // If it’s the first item
                } else if (index === 0) {
                    newArr = arr.slice(1);

                    // If it’s in the middle
                } else {
                    newArr = arr.slice(0, index);
                    newArr = newArr.concat(arr.slice(index + 1));
                }
            } else {
                return arr;
            }

            return newArr;
        };

        if (ac_Environment_Browser.name === "IE") {
            require('./shims/ie/Array')(ac_Array, ac_Environment_Browser);
        }

        module.exports = ac_Array;

    }, {
        "./Environment/Browser": 28,
        "./shims/ie/Array": 51
    }],
    16: [function(require, module, exports) {
        'use strict';

        var ac_Element = require('./Element');

        /**
         * @name module:ac-base.Canvas
         * @kind namespace
         */
        var ac_Canvas = {};

        /**
         * Asynchronous because image source must be loaded before we can retrieve the data.
         * @param {String} src Image location
         * @param {Function} callback The function to be ran when the imageData is retrieved.
         * @name module:ac-base.Canvas.imageDataFromNode
         */
        ac_Canvas.imageDataFromFile = function(src, callback) {
            // Callback is required
            if (typeof callback !== 'function') {
                throw new TypeError('Need callback method to call when imageData is retrieved.');
            }

            // If it’s a string, just make sure it isn’t empty
            if (typeof src !== 'string' || src === '') {
                throw new TypeError('Src for imageData must be an Image Node with a src attribute or a string.');
            }

            var img = new Image();

            /** @inner */
            img.onload = function() {
                callback(ac_Canvas.imageDataFromNode(img));
            };

            img.src = src;
        };

        /**
         * @param {Image} img <code>IMG</code> tag that has already finished loading.
         * @name module:ac-base.Canvas.imageDataFromNode
         */
        ac_Canvas.imageDataFromNode = function(img) {
            if (!ac_Element.isElement(img) || img.getAttribute('src') === 'null' || img.width === 0) {
                throw new TypeError('Source node must be an IMG tag and must have already loaded.');
            }

            var imageData;
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;

            context.drawImage(img, 0, 0);
            imageData = context.getImageData(0, 0, img.width, img.height);

            return imageData;
        };

        module.exports = ac_Canvas;

    }, {
        "./Element": 21
    }],
    17: [function(require, module, exports) {
        'use strict';

        var ac_Object = require('./Object');
        var ac_Array = require('./Array');
        var ac_Function = require('./Function');
        var ac_onDOMReady = require('./Element/onDOMReady');

        /**
         * Class methods namespace.
         * Create a new class; similar to Class.create() in Prototype.
         *
         * First argument can be a superclass to extend or a prototype object.
         * If first argument is a superclass, then second argument can be a prototype object.
         *
         * @param {module:ac-base~ACGeneratedClass} [superclass] Provide an existing class that this class.
         * @param {Object} [prototypeObj] Prototype object to use for constructor.
         * @returns {Function}
         * @name module:ac-base.Class
         * @kind function
         * @deprecated
         */
        function ac_Class() {
            var args = ac_Array.toArray(arguments);
            var superclass = (typeof args[0] === 'function') ? args.shift() : null;
            var prototypeObj = args.shift() || {};
            var Superclass;

            /**
             * @inner
             * @memberof module:ac-base
             * @constructor
             * @classdesc Class which is generated by {@link module:ac-base.Class}.
             */
            var ACGeneratedClass = function() {
                var result;
                var timeoutCallback;

                // Run initialize method in constructor function
                result = ((typeof this.initialize === 'function' && ACGeneratedClass.__shouldInitialize !== false) ? this.initialize.apply(this, arguments) : false);

                // If that method returns {@link module:ac-base.Class.Invalidate}, remove this instance from memory
                if (result === ac_Class.Invalidate) {
                    timeoutCallback = function() {
                        try {
                            // If this is the shared instance for the Class that we intend to invalidate
                            if (this && this._parentClass && this._parentClass._sharedInstance === this) {
                                this._parentClass._sharedInstance = null;
                            }
                        } catch (e) {
                            throw e;
                        }
                    };
                    // Let the current thread run until it catches its breath.
                    window.setTimeout(timeoutCallback.bind(this), 200);
                }
            };

            // Save reference to superclass
            ACGeneratedClass.__superclass = superclass;

            // Extend with provided properties
            if (superclass) {
                // Setup Superclass placeholder
                if (superclass.__superclass) {
                    Superclass = ac_Class(superclass.__superclass, superclass.prototype);
                } else {
                    Superclass = ac_Class(superclass.prototype);
                }
                Superclass.__shouldInitialize = false;

                // Prototype chain to Superclass
                ACGeneratedClass.prototype = new Superclass();

                // Extend prototype on constructor with provided properties
                ac_Object.extend(ACGeneratedClass.prototype, prototypeObj);

                // Set up $super for methods that take it
                ac_Class.__wrapSuperMethods(ACGeneratedClass);
            } else {
                ACGeneratedClass.prototype = prototypeObj;
            }

            /**
             * Run this method to access the shared instance of this class, auto-generating it as necessary.
             * @returns {Object} Singleton instance of the generated class
             */
            ACGeneratedClass.sharedInstance = function() {
                if (!ACGeneratedClass._sharedInstance) {
                    ACGeneratedClass._sharedInstance = new ACGeneratedClass();
                    ACGeneratedClass._sharedInstance._parentClass = ACGeneratedClass;
                }
                return ACGeneratedClass._sharedInstance;
            };

            // fill in missing accessors
            ac_Object.synthesize(ACGeneratedClass.prototype);

            // Look for autocreate flag
            ACGeneratedClass.autocreate = prototypeObj.__instantiateOnDOMReady || false;
            delete prototypeObj.__instantiateOnDOMReady;

            // Create a shared instance of this class on DOM ready.
            if (ACGeneratedClass.autocreate) {
                ac_onDOMReady(function() {
                    // <code>autocreate</code> property can change between execution and DOMReady, so read it again.
                    if (ACGeneratedClass.autocreate) {
                        ACGeneratedClass.sharedInstance();
                    }
                });
            }

            return ACGeneratedClass;
        }

        // Wrap the method from the prototype with a method that has a reference
        // to the $super, which is the same method name on the parent’s prototype.
        /** @ignore */
        ac_Class.__wrapSuperMethods = function(ACGeneratedClass) {
            var proto = ACGeneratedClass.prototype;
            var superProto = ACGeneratedClass.__superclass.prototype;
            var property;

            // Loop through proto
            for (property in proto) {
                if (proto.hasOwnProperty(property)) {
                    if (typeof proto[property] === 'function') {

                        // Get the parameter keys for this method. If the first is $super, let’s wrap it up!
                        var nestedMethod = proto[property];
                        var paramNames = ac_Function.getParamNames(nestedMethod);

                        // If the first arg is called '$super'
                        if (paramNames[0] === '$super') {
                            // Overwrite the method on the prototype
                            /*jshint -W083*/
                            proto[property] = (function(property, nestedMethod) {
                                var $super = superProto[property];

                                // Create closure that holds onto the value of $super
                                return function superMethodWrapper() {
                                    var args = ac_Array.toArray(arguments);
                                    return nestedMethod.apply(this, [$super.bind(this)].concat(args));
                                };

                                // These variables will be overwritten in the scope of the for loop.
                                // Pass them to the anonymous function to preserve their value at this time
                            }(property, nestedMethod));
                        }
                    }
                }
            }

            return this;
        };

        /**
         * This method is a no-op and returns false; return this in your class'
         * initialize() method to clean up a shared instance while it's being generated.
         * @name module:ac-base.Class.Invalidate
         * @kind function
         * @deprecated
         */
        ac_Class.Invalidate = function() {
            return false;
        };

        module.exports = ac_Class;

    }, {
        "./Array": 15,
        "./Element/onDOMReady": 24,
        "./Function": 34,
        "./Object": 37
    }],
    18: [function(require, module, exports) {
        'use strict';

        /**
         * @name module:ac-base.Date
         * @kind namespace
         */
        var ac_Date = {};

        /**
         * Test an Object to see if it is an instance of the Date constructor or not.
         * @param {Object} date The Object to test
         * @return {Boolean} If the Object is a Date or now
         * @name module:ac-base.Date.isDate
         * @kind function
         */
        ac_Date.isDate = function(date) {
            return !!(date && typeof date.getTime === 'function');
        };

        module.exports = ac_Date;

    }, {}],
    19: [function(require, module, exports) {
        'use strict';

        var ac_Array = require('./Array');
        var ac_Class = require('./Class');
        var ac_Object = require('./Object');

        var defaultOptions = {
            autoplay: false,
            asynchronous: false
        };

        /**
         * @param {Object} [options] Options to initialize the instance with
         * @param {Boolean} [options.autoplay=false] Whether or not to play when the first action is added, if not already playing.
         * @param {Boolean} [options.asynchronous=false] If true, wait for didFinish method to be called before continuing to run next method.
         * @name module:ac-base.DeferredQueue
         * @kind class
         * @classdesc Store functions in queue to be ran later, in sequence.
         */
        var ac_DeferredQueue = ac_Class( /** @lends module:ac-base.DeferredQueue# */ {

            /** @ingore */
            initialize: function(options) {
                // Setup options
                if (typeof options !== 'object') {
                    options = {};
                }
                this._options = ac_Object.extend(ac_Object.clone(defaultOptions), options);
                this._isPlaying = false;
                this._isRunningAction = false;
                this._queue = [];

                // Make sure didFinish is always bound correctly
                this.didFinish = this.__didFinish.bind(this);

                // Synthesize Member Data
                this.synthesize();
            },

            /**
             * Add an action to the end of the queue
             * @param {Function} func
             * @param {Integer} [delay=0]
             */
            add: function(func, delay) {
                var options = {};
                var action;

                if (delay > 0) {
                    options.delay = delay;
                }

                // Create an Action to run
                action = new ac_DeferredQueue.Action(func, options);

                // Add to end of the queue
                this.queue()
                    .push(action);

                // Autoplay if applicable
                if (!this.isPlaying() && this._options.autoplay === true) {
                    this.start();
                }
            },

            /**
             * Remove an action from the queue
             * @param {module:ac-base.DeferredQueue.Action} action
             */
            remove: function(action) {
                this.setQueue(ac_Array.without(this.queue(), action));
            },

            /**
             * Run the queue, in order of what was added first.
             * @returns {void}
             */
            start: function() {
                if (this.isPlaying()) {
                    return false;
                }

                this.setIsPlaying(true);
                this.__runNextAction();
            },

            /**
             * Stop running through the queue. Still finishes any actions that were already running.
             * returns {void}
             */
            stop: function() {
                if (!this.isPlaying()) {
                    return false;
                }

                this.setIsPlaying(false);
            },

            /**
             * Clear out the queue, stop replacement
             * @returns {void}
             */
            clear: function() {
                this.setQueue([]);
                this.stop();
            },

            // If this is an asynchronous queue, wait for the previous action to finish before we run the next one.
            /** @ignore */
            __didFinish: function() {
                this.setIsRunningAction(false);
                this.__runNextAction();
            },

            /** @ignore */
            __runNextAction: function() {
                // Must be running to run next
                if (!this.isPlaying()) {
                    return false;
                }

                // Make sure that our queue has stuff in it and we’re not waiting for a didFinish
                if (this.queue()
                    .length && !this.isRunningAction()) {

                    // Get the next action at the front of the queue
                    var action = this.queue()
                        .shift();

                    // Run the action
                    action.run();

                    // Don’t allow us to run two at the same time
                    if (this._options.asynchronous === true) {
                        this.setIsRunningAction(true);

                        // Don’t run next action yet! Wait for didFinish to be called
                        return;
                    }

                    this.__runNextAction();
                }
            }
        });

        var actionDefaultOptions = {
            delay: 0
        };

        /**
         * @param {Function} [func]
         * @param {Object} [options] Options to initialize the instance with
         * @param {Integer} [options.delay=0] The delay, in seconds, to wait between running actions.
         * @name module:ac-base.DeferredQueue.Action
         * @kind class
         * @classdesc An instance of an action that is intended to be ran
         */
        ac_DeferredQueue.Action = ac_Class( /** @lends module:ac-base.DeferredQueue.Action# */ {

            /** @ignore */
            initialize: function(func, options) {
                if (typeof func !== 'function') {
                    throw new TypeError('Deferred Queue func must be a function.');
                }

                // Setup options
                if (typeof options !== 'object') {
                    options = {};
                }
                this._options = ac_Object.extend(ac_Object.clone(actionDefaultOptions), options);
                this.__func = func;

                // Synthesize Member Data
                this.synthesize();
            },

            /**
             * Run this func
             * @returns {void}
             */
            run: function() {
                var func = this.__func;

                // Run with optional delay
                if (typeof this._options.delay === 'number' && this._options.delay > 0) {
                    window.setTimeout(function() {
                        func();
                    }, this._options.delay * 1000);
                } else {
                    func();
                }
            }
        });

        module.exports = ac_DeferredQueue;

    }, {
        "./Array": 15,
        "./Class": 17,
        "./Object": 37
    }],
    20: [function(require, module, exports) {
        /*jshint -W116*/
        'use strict';

        /**
         * Transform a given value to an eased value based on a formula.
         * [Visualization of the easing curves](../../example/easing_functions_visualized.html)
         *
         * @function
         * @name module:ac-base.EasingFunctions~EasingFunction
         * @param {Number} time Current position in time. Can be frames/seconds/milliseconds. ('t' in original Penner functions)
         * @param {Number} begin Start value. ('b' in original Penner functions)
         * @param {Number} change Change in value. ('c' in original Penner functions)
         * @param {Number} duration Duration. Can be frames/seconds/milliseconds. ('d' in original Penner functions)
         * @param {Number} [shootover] Functions with 'Back' in their names take an additional optional parameter 'shootover', which controls the amount of overshoot. A higher value means greater overshoot. 'shootover' has a default value of 1.70158, which produces an overshoot of 10 percent. shootover==0 produces cubic easing with no overshoot. ('s' in original Penner functions)
         */

        /**
         * @namespace
         * @name module:ac-base.EasingFunctions
         */
        var ac_EasingFunctions = /** @lends module:ac-base.EasingFunctions. */ {
            linear: function(time, begin, change, duration) {
                return change * time / duration + begin;
            },

            easeInQuad: function(time, begin, change, duration) {
                return change * (time /= duration) * time + begin;
            },

            easeOutQuad: function(time, begin, change, duration) {
                return -change * (time /= duration) * (time - 2) + begin;
            },

            easeInOutQuad: function(time, begin, change, duration) {
                if ((time /= duration / 2) < 1) return change / 2 * time * time + begin;
                return -change / 2 * ((--time) * (time - 2) - 1) + begin;
            },

            easeInCubic: function(time, begin, change, duration) {
                return change * (time /= duration) * time * time + begin;
            },

            easeOutCubic: function(time, begin, change, duration) {
                return change * ((time = time / duration - 1) * time * time + 1) + begin;
            },

            easeInOutCubic: function(time, begin, change, duration) {
                if ((time /= duration / 2) < 1) return change / 2 * time * time * time + begin;
                return change / 2 * ((time -= 2) * time * time + 2) + begin;
            },

            easeInQuart: function(time, begin, change, duration) {
                return change * (time /= duration) * time * time * time + begin;
            },

            easeOutQuart: function(time, begin, change, duration) {
                return -change * ((time = time / duration - 1) * time * time * time - 1) + begin;
            },

            easeInOutQuart: function(time, begin, change, duration) {
                if ((time /= duration / 2) < 1) return change / 2 * time * time * time * time + begin;
                return -change / 2 * ((time -= 2) * time * time * time - 2) + begin;
            },

            easeInQuint: function(time, begin, change, duration) {
                return change * (time /= duration) * time * time * time * time + begin;
            },

            easeOutQuint: function(time, begin, change, duration) {
                return change * ((time = time / duration - 1) * time * time * time * time + 1) + begin;
            },

            easeInOutQuint: function(time, begin, change, duration) {
                if ((time /= duration / 2) < 1) return change / 2 * time * time * time * time * time + begin;
                return change / 2 * ((time -= 2) * time * time * time * time + 2) + begin;
            },

            easeInSine: function(time, begin, change, duration) {
                return -change * Math.cos(time / duration * (Math.PI / 2)) + change + begin;
            },

            easeOutSine: function(time, begin, change, duration) {
                return change * Math.sin(time / duration * (Math.PI / 2)) + begin;
            },

            easeInOutSine: function(time, begin, change, duration) {
                return -change / 2 * (Math.cos(Math.PI * time / duration) - 1) + begin;
            },

            easeInExpo: function(time, begin, change, duration) {
                return (time == 0) ? begin : change * Math.pow(2, 10 * (time / duration - 1)) + begin;
            },

            easeOutExpo: function(time, begin, change, duration) {
                return (time == duration) ? begin + change : change * (-Math.pow(2, -10 * time / duration) + 1) + begin;
            },

            easeInOutExpo: function(time, begin, change, duration) {
                if (time == 0) return begin;
                if (time == duration) return begin + change;
                if ((time /= duration / 2) < 1) return change / 2 * Math.pow(2, 10 * (time - 1)) + begin;
                return change / 2 * (-Math.pow(2, -10 * --time) + 2) + begin;
            },

            easeInCirc: function(time, begin, change, duration) {
                return -change * (Math.sqrt(1 - (time /= duration) * time) - 1) + begin;
            },

            easeOutCirc: function(time, begin, change, duration) {
                return change * Math.sqrt(1 - (time = time / duration - 1) * time) + begin;
            },

            easeInOutCirc: function(time, begin, change, duration) {
                if ((time /= duration / 2) < 1) return -change / 2 * (Math.sqrt(1 - time * time) - 1) + begin;
                return change / 2 * (Math.sqrt(1 - (time -= 2) * time) + 1) + begin;
            },

            easeInElastic: function(time, begin, change, duration) {
                var shootover = 1.70158;
                var period = 0;
                var amplitude = change;
                if (time == 0) return begin;
                if ((time /= duration) == 1) return begin + change;
                if (!period) period = duration * 0.3;
                if (amplitude < Math.abs(change)) {
                    amplitude = change;
                    shootover = period / 4;
                } else shootover = period / (2 * Math.PI) * Math.asin(change / amplitude);
                return -(amplitude * Math.pow(2, 10 * (time -= 1)) * Math.sin((time * duration - shootover) * (2 * Math.PI) / period)) + begin;
            },

            easeOutElastic: function(time, begin, change, duration) {
                var shootover = 1.70158;
                var period = 0;
                var amplitude = change;
                if (time == 0) return begin;
                if ((time /= duration) == 1) return begin + change;
                if (!period) period = duration * 0.3;
                if (amplitude < Math.abs(change)) {
                    amplitude = change;
                    shootover = period / 4;
                } else shootover = period / (2 * Math.PI) * Math.asin(change / amplitude);
                return amplitude * Math.pow(2, -10 * time) * Math.sin((time * duration - shootover) * (2 * Math.PI) / period) + change + begin;
            },

            easeInOutElastic: function(time, begin, change, duration) {
                var shootover = 1.70158;
                var period = 0;
                var amplitude = change;
                if (time == 0) return begin;
                if ((time /= duration / 2) == 2) return begin + change;
                if (!period) period = duration * (0.3 * 1.5);
                if (amplitude < Math.abs(change)) {
                    amplitude = change;
                    shootover = period / 4;
                } else shootover = period / (2 * Math.PI) * Math.asin(change / amplitude);
                if (time < 1) return -0.5 * (amplitude * Math.pow(2, 10 * (time -= 1)) * Math.sin((time * duration - shootover) * (2 * Math.PI) / period)) + begin;
                return amplitude * Math.pow(2, -10 * (time -= 1)) * Math.sin((time * duration - shootover) * (2 * Math.PI) / period) * 0.5 + change + begin;
            },

            easeInBack: function(time, begin, change, duration, shootover) {
                if (shootover == undefined) shootover = 1.70158;
                return change * (time /= duration) * time * ((shootover + 1) * time - shootover) + begin;
            },

            easeOutBack: function(time, begin, change, duration, shootover) {
                if (shootover == undefined) shootover = 1.70158;
                return change * ((time = time / duration - 1) * time * ((shootover + 1) * time + shootover) + 1) + begin;
            },

            easeInOutBack: function(time, begin, change, duration, shootover) {
                if (shootover == undefined) shootover = 1.70158;
                if ((time /= duration / 2) < 1) return change / 2 * (time * time * (((shootover *= (1.525)) + 1) * time - shootover)) + begin;
                return change / 2 * ((time -= 2) * time * (((shootover *= (1.525)) + 1) * time + shootover) + 2) + begin;
            },

            easeInBounce: function(time, begin, change, duration) {
                return change - ac_EasingFunctions.easeOutBounce(duration - time, 0, change, duration) + begin;
            },

            easeOutBounce: function(time, begin, change, duration) {
                if ((time /= duration) < (1 / 2.75)) {
                    return change * (7.5625 * time * time) + begin;
                } else if (time < (2 / 2.75)) {
                    return change * (7.5625 * (time -= (1.5 / 2.75)) * time + 0.75) + begin;
                } else if (time < (2.5 / 2.75)) {
                    return change * (7.5625 * (time -= (2.25 / 2.75)) * time + 0.9375) + begin;
                } else {
                    return change * (7.5625 * (time -= (2.625 / 2.75)) * time + 0.984375) + begin;
                }
            },

            easeInOutBounce: function(time, begin, change, duration) {
                if (time < duration / 2) return ac_EasingFunctions.easeInBounce(time * 2, 0, change, duration) * 0.5 + begin;
                return ac_EasingFunctions.easeOutBounce(time * 2 - duration, 0, change, duration) * 0.5 + change * 0.5 + begin;
            }
        };

        /**
         * Applies an easing curve to a linear cent value (eg 0.5 means 50% complete), and returns the eased cent value.
         * @param {Number} a float, generally between 0 and 1.
         * @param {String|Function} easing function name (member of module:ac-base.EasingFunctions) or a custom easing function that adhere's to the conventions set in our Penner functions (time, begin, change, duration).
         * @returns {Number} a float.
         */
        ac_EasingFunctions.ease = function(centValue, easeType) {
            /*jshint -W065*/
            // first lets check for css-transition-function names - and map to nearest functions
            if (easeType === 'ease') {
                easeType = 'easeInOutSine';

            } else if (easeType === 'ease-in') {
                easeType = 'easeInCubic';

            } else if (easeType === 'ease-out') {
                easeType = 'easeOutCubic';

            } else if (easeType === 'ease-in-out') {
                easeType = 'easeInOutCubic';

            } else if (easeType === 'linear') {
                easeType = 'linear';

            } else if (easeType === 'step-start') {
                return (centValue === 0) ? 0 : 1;

            } else if (easeType === 'step-end') {
                return (centValue === 1) ? 1 : 0;

            } else if (typeof easeType === 'string' && /^steps\(\d+\,\s*(start|end)\)$/.test(easeType)) {
                // "steps" timing functions get handled differently.
                var steps = parseInt(easeType.match(/\d+/)[0]);
                var direction = easeType.match(/(start|end)/)[0];
                var incrementLength = (1 / steps);
                return Math[(direction === 'start') ? 'floor' : 'ceil']((centValue / incrementLength)) * incrementLength;
            }
            if (typeof easeType === 'string') {
                // check for a matching penner function
                if (typeof ac_EasingFunctions[easeType] === 'function' && easeType !== 'ease') {
                    easeType = ac_EasingFunctions[easeType];
                } else {
                    throw new TypeError('"' + easeType + '" is not a valid easing type');
                }
            }
            // return value as passed through appropriate penner function
            return easeType(centValue, 0, 1, 1);
        };

        module.exports = ac_EasingFunctions;

    }, {}],
    21: [function(require, module, exports) {

        var ac_Viewport = require('./Viewport');
        var ac_log = require('./log');
        var events = require('./Element/events');
        var vendorTransformHelper = require('./Element/vendorTransformHelper');
        var ac_Environment_Browser = require('./Environment/Browser');

        /**
         * Utility methods dealing with Elements
         * @name module:ac-base.Element
         * @kind namespace
         */
        var ac_Element = {
            addEventListener: events.addEventListener,
            removeEventListener: events.removeEventListener,
            addVendorPrefixEventListener: events.addVendorPrefixEventListener,
            removeVendorPrefixEventListener: events.removeVendorPrefixEventListener,
            /**
             * @deprecated Use module:ac-base.Element.addVendorPrefixEventListener instead.
             * @name module:ac-base.Element.addVendorEventListener
             * @kind function
             */
            addVendorEventListener: function(element, type, listener, useCapture) {
                ac_log('ac-base.Element.addVendorEventListener is deprecated. Please use ac-base.Element.addVendorPrefixEventListener.');
                return this.addVendorPrefixEventListener(element, type, listener, useCapture);
            },
            /**
             * @deprecated Use module:ac-base.Element.removeVendorPrefixEventListener instead.
             * @name module:ac-base.Element.addVendorEventListener
             * @kind function
             */
            removeVendorEventListener: function(element, type, listener, useCapture) {
                ac_log('ac-base.Element.removeVendorEventListener is deprecated. Please use ac-base.Element.removeVendorPrefixEventListener.');
                return this.removeVendorPrefixEventListener(element, type, listener, useCapture);
            }
        };

        // Initialize ac_Element.__EventDelegate
        require('./Element/EventDelegate')(ac_Element);

        /**
         * @param {Element | String} element
         * @returns The Node with the ID <code>element</code> or return the Node directly, else return null
         * @name module:ac-base.Element.getElementById
         * @kind function
         */
        ac_Element.getElementById = function(element) {
            if (typeof element === 'string') {
                element = document.getElementById(element);
            }
            if (ac_Element.isElement(element)) {
                return element;
            } else {
                return null;
            }
        };

        /**
         * @param {String} selector CSS String to select elements by.
         * @param {Element} context Optional; Scope the search to a specific Element Node. document.body is the default.
         * @returns {Array} Array of Elements as Nodes (Not a Node List)
         * @name module:ac-base.Element.selectAll
         * @kind function
         */
        ac_Element.selectAll = function(selector, context) {
            if (typeof context === 'undefined') {
                context = document;
            } else if (!ac_Element.isElement(context) && context.nodeType !== 9 && context.nodeType !== 11) {
                throw new TypeError('ac-base.Element.selectAll: Invalid context nodeType');
            }
            if (typeof selector !== 'string') {
                throw new TypeError('ac-base.Element.selectAll: Selector must be a string');
            }
            // selectAll is shimmed using ac_Array.toArray, so this is fine
            return Array.prototype.slice.call(context.querySelectorAll(selector));
        };

        /**
         * @param {String} selector CSS String to select elements by.
         * @param {Element} context Optional; Scope the search to a specific Element Node. document.body is the default.
         * @returns {Element} First element that matches selector in DOM
         * @name module:ac-base.Element.select
         * @kind function
         */
        ac_Element.select = function(selector, context) {
            if (typeof context === 'undefined') {
                context = document;
            } else if (!ac_Element.isElement(context) && context.nodeType !== 9 && context.nodeType !== 11) {
                throw new TypeError('ac-base.Element.select: Invalid context nodeType');
            }
            if (typeof selector !== 'string') {
                throw new TypeError('ac-base.Element.select: Selector must be a string');
            }
            return context.querySelector(selector);
        };

        /**
         * No polyfill, sizzle is used in IE shim, which would be
         * the only unsupported place for this in the matrix.
         * @ignore
         */
        var matches = window.Element ? (function(proto) {
            return proto.matches ||
                proto.matchesSelector ||
                proto.webkitMatchesSelector ||
                proto.mozMatchesSelector ||
                proto.msMatchesSelector ||
                proto.oMatchesSelector;
        }(Element.prototype)) : null;

        /**
         * <p>Check to see if an element matches a CSS selector</p>
         * <p>Usage:</p>
         * <pre>
         * module:ac-base.Element.matchesSelector(document.getElementById("foo"), "#foo") -> true
         * module:ac-base.Element.matchesSelector(document.body, "body #foo") -> false
         * </pre>
         * @param {Element} element DOM element you want to check against a selector
         * @param {String} selector CSS Selector you want to check against
         * @returns {Boolean} True if the element is matched by the selector. False otherwise.
         * @name module:ac-base.Element.select
         * @kind function
         */
        ac_Element.matchesSelector = function(element, selector) {
            // matches will throw a TypeError for non-elements
            return ac_Element.isElement(element) ? matches.call(element, selector) : false;
        };

        /**
         * @deprecated Use module:ac-base.Element.filterBySelector instead.
         * @name module:ac-base.Element.matches
         * @kind function
         */
        ac_Element.matches = function(element, selector) {
            ac_log('ac-base.Element.matches is deprecated. Use ac-base.Element.filterBySelector instead.');
            return ac_Element.filterBySelector(selector, element);
        };

        /**
         * <p>Filter an array of elements with a CSS selector</p>
         * <p>Usage:</p>
         * <pre>
         * module:ac-base.Element.filterBySelector(module:ac-base.Element.selectAll(".foo"), ".foo")
         * module:ac-base.Element.filterBySelector(module:ac-base.Element.selectAll("body"), "body #foo") -> false
         * </pre>
         * @param {Array} elements The array of DOM elements you want to filter
         * @param {String} selector The CSS Selector to use for the filter
         * @returns {Array} An array containing all matched elements. This array can be empty.
         * @name module:ac-base.Element.filterBySelector
         * @kind function
         */
        ac_Element.filterBySelector = function(elements, selector) {
            var arr = [];
            // @todo Cannot use Array.prototype.filter until removing "the other" script
            for (var i = 0, l = elements.length; i < l; i++) {
                // matches will throw a TypeError for non-elements
                if (ac_Element.isElement(elements[i]) && matches.call(elements[i], selector)) {
                    arr[arr.length] = elements[i];
                }
            }
            return arr;
        };

        /**
         * @deprecated Use ac-base.Element.setStyle instead.
         * @name module:ac-base.Element.setOpacity
         * @kind function
         */
        ac_Element.setOpacity = function(element, value) {
            ac_log('ac-base.Element.setOpacity is deprecated. Use ac-base.Element.setStyle instead.');
            return ac_Element.setStyle(element, {
                opacity: value
            });
        };

        /**
         * <p>Set one or more CSS styles on a DOM element.</p>
         * <p>Usage:</p>
         * <pre>
         * // element and style paramaters as strings
         * module:ac-base.Element.setStyle('nav', 'float:left; background:#ccc;');
         * // element paramater as DOM element, style paramater as an object
         * var element = document.getElementById('nav');
         * module:ac-base.Element.setStyle(element, {
         *     float: "left",
         *     background: "#ccc"
         * });
         * </pre>
         * @param {String | Element} element The DOM element to set the style/s on. May either be a valid DOM element
         * or the id as a string of the element you want to target.
         * @param {String | Object} style One or more styles as CSS string or an object with property/value pairs.
         * @returns element as Node
         * @name module:ac-base.Element.setStyle
         * @kind function
         */
        ac_Element.setStyle = function(element, styles) {
            if ((typeof styles !== 'string' && typeof styles !== 'object') || Array.isArray(styles)) {
                throw new TypeError('styles argument must be either an object or a string');
            }

            element = ac_Element.getElementById(element);
            var stylesObj;
            var camelCaseProp;
            var prop;

            stylesObj = ac_Element.setStyle.__explodeStyleStringToObject(styles);

            // iterate over stylesObj and set styles
            for (prop in stylesObj) {
                if (stylesObj.hasOwnProperty(prop)) {
                    camelCaseProp = prop.replace(/-(\w)/g, ac_Element.setStyle.__camelCaseReplace);
                    ac_Element.setStyle.__setStyle(element, camelCaseProp, stylesObj, stylesObj[prop]);
                }
            }

            return element;
        };

        ac_Element.setStyle.__explodeStyleStringToObject = function(styles) {
            var stylesObj = (typeof styles === 'object') ? styles : {};
            var splitStyles;
            var colon;
            var len;
            var i;

            if (typeof styles === 'string') {
                splitStyles = styles.split(';');
                len = splitStyles.length;
                for (i = 0; i < len; i += 1) {
                    colon = splitStyles[i].indexOf(':');
                    if (colon > 0) {
                        stylesObj[splitStyles[i].substr(0, colon)
                                .trim()] = splitStyles[i].substr(colon + 1)
                            .trim();
                    }
                }
            }

            return stylesObj;
        };

        ac_Element.setStyle.__setStyle = function(element, camelCaseProp, stylesObj, stylesValue) {
            if (typeof element.style[camelCaseProp] !== 'undefined') {
                element.style[camelCaseProp] = stylesValue;
            }
        };

        // replace function to handle camelCasing for module:ac-base.Element.setStyle and getStyle.
        // Accounts for Mozilla expecting 'Moz'.
        /** @ignore */
        ac_Element.setStyle.__camelCaseReplace = function(match, group, offset, string) {
            return (offset === 0) && (string.substr(1, 3) !== 'moz') ? group : group.toUpperCase();
        };

        /**
         * @param {Element} element
         * @param {String} style
         * @returns {String} The value for the style property on this Element
         * @name module:ac-base.Element.getStyle
         * @kind function
         */
        ac_Element.getStyle = function(element, style, css) {
            var value;

            style = style.replace(/-(\w)/g, ac_Element.setStyle.__camelCaseReplace);

            element = ac_Element.getElementById(element);
            style = (style === 'float') ? 'cssFloat' : style;

            css = css || window.getComputedStyle(element, null);
            value = css ? css[style] : null;

            if (style === 'opacity') {
                return value ? parseFloat(value) : 1.0;
            }

            return value === 'auto' ? null : value;
        };

        /**
         * <p>Returns an object with top and left offset values for an element relative
         * to the absolute top and left locations of html document.</p>
         * @param {Element} element
         * @returns {Object} An object with numeric values for top and left properties.
         * @name module:ac-base.Element.cumulativeOffset
         * @kind function
         */
        ac_Element.cumulativeOffset = function(element) {
            var box = ac_Element.getBoundingBox(element);
            var scrollOffsets = ac_Viewport.scrollOffsets();
            var offset = [box.top + scrollOffsets.y, box.left + scrollOffsets.x];
            offset.top = offset[0];
            offset.left = offset[1];
            return offset;
        };

        /**
         * @param {Element} element
         * <p>Returns the bounding box values for an element including width and height.
         * Borders and padding are included. Values are affected by box-sizing.</p>
         * @param {Element} The element you want to query
         * @returns {Object} An object with top, right, bottom, left, width and height values as numbers
         * @name module:ac-base.Element.getBoundingBox
         * @kind function
         */
        ac_Element.getBoundingBox = function(element) {
            element = ac_Element.getElementById(element);
            var rect = element.getBoundingClientRect();
            var w = rect.width || rect.right - rect.left;
            var h = rect.height || rect.bottom - rect.top;

            return {
                top: rect.top,
                right: rect.right,
                bottom: rect.bottom,
                left: rect.left,
                width: w,
                height: h
            };
        };

        /**
         * <p>Returns the width and height of an element's content box. Padding and
         * borders are not included. Accounts for box-sizing:border-box;.</p>
         * @param {Element} The element you want to query
         * @returns {Object} An object with width and height values as numbers
         * @name module:ac-base.Element.getInnerDimensions
         * @kind function
         */
        ac_Element.getInnerDimensions = function(element) {
            var dims = ac_Element.getBoundingBox(element);
            var w = dims.width;
            var h = dims.height;
            var style;
            var styleValue;
            var css = window.getComputedStyle ? window.getComputedStyle(element, null) : null;

            ['padding', 'border'].forEach(function(prop) {
                ['Top', 'Right', 'Bottom', 'Left'].forEach(function(side) {
                    style = prop === 'border' ? prop + side + 'Width' : prop + side;
                    styleValue = parseFloat(ac_Element.getStyle(element, style, css));
                    styleValue = isNaN(styleValue) ? 0 : styleValue;
                    if (side === 'Right' || side === 'Left') {
                        w -= styleValue;
                    }
                    if (side === 'Top' || side === 'Bottom') {
                        h -= styleValue;
                    }
                });
            });

            return {
                width: w,
                height: h
            };
        };

        /**
         * <p>Returns the width and height of an element including borders and margins.
         * Accounts for box-sizing:border-box;.</p>
         * @param {Element} The element you want to query
         * @returns {Object} An object with width and height values as numbers
         * @name module:ac-base.Element.getOuterDimensions
         * @kind function
         */
        ac_Element.getOuterDimensions = function(element) {
            var dims = ac_Element.getBoundingBox(element);
            var w = dims.width;
            var h = dims.height;
            var marginStyle;
            var css = window.getComputedStyle ? window.getComputedStyle(element, null) : null;

            ['margin'].forEach(function(prop) {
                ['Top', 'Right', 'Bottom', 'Left'].forEach(function(side) {
                    marginStyle = parseFloat(ac_Element.getStyle(element, prop + side, css));
                    marginStyle = isNaN(marginStyle) ? 0 : marginStyle;
                    if (side === 'Right' || side === 'Left') {
                        w += marginStyle;
                    }
                    if (side === 'Top' || side === 'Bottom') {
                        h += marginStyle;
                    }
                });
            });

            return {
                width: w,
                height: h
            };
        };

        /**
         * Return <code>true</code> or <code>false</code> depending on whether the className provided exists on the element.
         * @param {Element} element
         * @param {String} cls className to test against
         * @name module:ac-base.Element.hasClassName
         * @kind function
         */
        ac_Element.hasClassName = function(element, cls) {
            var matchedElement = ac_Element.getElementById(element);

            if (matchedElement && matchedElement.className !== '') {
                return new RegExp('(\\s|^)' + cls + '(\\s|$)')
                    .test(matchedElement.className);
            } else {
                return false;
            }
        };

        /**
         * Adds a className to an Element.
         * @param {Element} element
         * @param {String} cls className to add
         * @name module:ac-base.Element.addClassName
         * @kind function
         */
        ac_Element.addClassName = function(element, cls) {
            var matchedElement = ac_Element.getElementById(element);

            // use classList when available as it is more performant and does not trigger a repaint
            if (matchedElement.classList) {
                matchedElement.classList.add(cls);

                // check hasClassName first to avoid unnecessary repaints resulting from modifying the className property
            } else if (!ac_Element.hasClassName(matchedElement, cls)) {
                matchedElement.className += " " + cls;
            }
        };

        /**
         * Removes a className from an Element.
         * @param {Element} element
         * @param {String} cls className to remove
         * @name module:ac-base.Element.removeClassName
         * @kind function
         */
        ac_Element.removeClassName = function(element, cls) {
            var matchedElement = ac_Element.getElementById(element);

            if (ac_Element.hasClassName(matchedElement, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                matchedElement.className = matchedElement.className.replace(reg, '$1')
                    .trim();
            }
        };

        /**
         * Toggles a className on an element. If the className is not present, it is added.
         * If it is present, it is removed.
         * @param {Element} element
         * @param {String} cls className to toggle
         * @name module:ac-base.Element.toggleClassName
         * @kind function
         */
        ac_Element.toggleClassName = function(element, cls) {
            var matchedElement = ac_Element.getElementById(element);

            if (matchedElement.classList) {
                matchedElement.classList.toggle(cls);
            } else {
                if (ac_Element.hasClassName(matchedElement, cls)) {
                    ac_Element.removeClassName(matchedElement, cls);
                } else {
                    ac_Element.addClassName(matchedElement, cls);
                }
            }
        };

        /**
         * Test whether or not an Object is an Element.
         * @param {Object} object
         * @name module:ac-base.Element.isElement
         * @kind function
         */
        ac_Element.isElement = function(object) {
            return !!(object && object.nodeType === 1);
        };

        /**
         * Sets all the vendor specific style {{{property}}} to {{{value}}} on {{{element}}}.
         * @param {Element} element : the element for which to set the style upon
         * @param {String} property : the css property, e.g. borderRadius, webkitBorderRadius, border-radius, etc...
         * @param {String|Number} value : the value for which to set the element's css property
         * @name module:ac-base.Element.setVendorPrefixStyle
         * @kind function
         */
        ac_Element.setVendorPrefixStyle = function(element, property, value) {
            if (typeof property !== 'string') {
                throw new TypeError('ac-base.Element.setVendorPrefixStyle: property must be a string');
            }
            if (typeof value !== 'string' && typeof value !== 'number') {
                throw new TypeError('ac-base.Element.setVendorPrefixStyle: value must be a string or a number');
            }

            // Coerce value to string
            value += '';

            element = ac_Element.getElementById(element);
            // Empty value accounts for non-vendor-prefixed properties
            var prefixes = ['', 'webkit', 'Moz', 'ms', 'O'];
            var prefixedCamelProp;
            var prefixedValue;

            // Strip prefix from property if it has one
            property = property.replace(/-(webkit|moz|ms|o)-/i, '');
            // Strip js camelcase vendor prefix if it has one and lowercase first letter. e.g. webkitTransform
            property = property.replace(/^(webkit|Moz|ms|O)/, '');
            property = property.charAt(0)
                .toLowerCase() + property.slice(1);

            // camelCase property
            property = property.replace(/-(\w)/, function(match, group) {
                return group.toUpperCase();
            });

            // Insert token for vendor prefix replacement in values
            value = value.replace(/-(webkit|moz|ms|o)-/, '-vendor-');

            // Iterate through prefixes array testing for existence of property. Update if present.
            prefixes.forEach(function(prefix) {
                // Apply prefixes
                prefixedCamelProp = (prefix === '') ? property : prefix + property.charAt(0)
                    .toUpperCase() + property.slice(1);
                prefixedValue = (prefix === '') ? value.replace('-vendor-', '') : value.replace('-vendor-', '-' + prefix.charAt(0)
                    .toLowerCase() + prefix.slice(1) + '-');

                if (prefixedCamelProp in element.style) {
                    ac_Element.setStyle(element, prefixedCamelProp + ':' + prefixedValue);
                }
            });

        };

        /**
         * Returns the style value for a specific property as a string and, if necessary, prefixed
         * with the correct vendor prefix for the executing browser.
         * @param {Element | String} element The DOM element from which to return the style. Can either
         * be a valid DOM element or the element's ID as a string.
         * @param {String} property The CSS property to fetch the style for. Will accept either a CSS
         * property or a javascript Element.style property name. Vendor prefixes are optional. Any
         * acceptable property as a string will return the same results. e.g. -webkit-box-shadow,
         * -moz-box-shadow, boxShadow, and msBoxShadow will all yield the same return value.
         * @returns The specified property's style as a string
         * @name module:ac-base.Element.getVendorPrefixStyle
         * @kind function
         */
        ac_Element.getVendorPrefixStyle = function(element, property) {
            if (typeof property !== 'string') {
                throw new TypeError('ac-base.Element.getVendorPrefixStyle: property must be a string');
            }

            element = ac_Element.getElementById(element);
            var prefixes = ['', 'webkit', 'Moz', 'ms', 'O'];
            var style;

            // Strip css vendor prefix from property if it has one. e.g. -webkit-transform
            property = property.replace(/-(webkit|moz|ms|o)-/i, '');
            // Strip js camelcase vendor prefix if it has one and lowercase first letter. e.g. webkitTransform
            property = property.replace(/^(webkit|Moz|ms|O)/, '')
                .charAt(0)
                .toLowerCase() + property.slice(1);

            // camelCase property
            property = property.replace(/-(\w)/, function(match, group) {
                return group.toUpperCase();
            });

            // Iterate through prefixes array, testing for existence of property. module:ac-base.Element.getStyle runs on the first match.
            prefixes.some(function(prefix, index) {
                // Apply prefixes
                var prefixedCamelProp = (prefix === '') ? property : prefix + property.charAt(0)
                    .toUpperCase() + property.slice(1);

                if (prefixedCamelProp in element.style) {
                    style = ac_Element.getStyle(element, prefixedCamelProp);
                    return true;
                }
            });

            return style;
        };

        /**
         * Inserts nodes - Handles four insertion cases: before, after, first and last (default)
         * @param {Element} element The element to be inserted. Must be one of three nodeTypes - element, textNode, documentFragment
         * @param {Element} target The node to be used as the target in relation to placement of element.
         * @param {String} placement Optional; Where to insert the element in relation to the target.
         * <p><strong>Accepted values:</strong></p>
         * <dl>
         *     <dt>‘first’:</dt><dd>Inserts ‘element’ as the first child of ‘target’.</dd>
         *     <dt>‘before’:</dt><dd>Inserts ‘element’ immediately before ‘target’.</dd>
         *     <dt>‘after’:</dt><dd>Inserts ‘element’ immediately after ‘target’.</dd>
         *     <dt>Default behavior:</dt><dd>Appends ‘element’ as the last child of ‘target’.</dd>
         * </dl>
         * @name module:ac-base.Element.insert
         * @kind function
         */
        ac_Element.insert = function(element, target, placement) {
            // Restrict node types passed: 1 = element, 3 = text node, 11 = document fragment
            if (!element || !(element.nodeType === 1 || element.nodeType === 3 || element.nodeType === 11)) {
                throw new TypeError('ac-base.Element.insert: element must be a valid node of type element, text, or document fragment');
            }
            if (!target || !(target.nodeType === 1 || target.nodeType === 11)) {
                throw new TypeError('ac-base.Element.insert: target must be a valid node of type element or document fragment');
            }

            // Placement is optional; defaults to ‘last’
            switch (placement) {
                case 'before':
                    if (target.nodeType === 11) {
                        throw new TypeError('ac-base.Element.insert: target cannot be nodeType of documentFragment when using placement ‘before’');
                    }
                    target.parentNode.insertBefore(element, target);
                    break;
                case 'after':
                    if (target.nodeType === 11) {
                        throw new TypeError('ac-base.Element.insert: target cannot be nodeType of documentFragment when using placement ‘after’');
                    }
                    target.parentNode.insertBefore(element, target.nextSibling);
                    break;
                case 'first':
                    target.insertBefore(element, target.firstChild);
                    break;
                default: //'last'
                    target.appendChild(element);
            }
        };

        /**
         * Insert a node into a parent's children at a given index.
         * @param  {Element} element The element to be inserted.
         * @param  {Element} target The parent element in which the first element will be inserted to.
         * @param  {Number} index Zero-based index at which to insert the first element into the target.
         * @name module:ac-base.Element.insertAt
         * @kind function
         */
        ac_Element.insertAt = function(element, target, index) {
            var children;
            var len;
            var i;

            element = ac_Element.getElementById(element);
            target = ac_Element.getElementById(target);

            if (!ac_Element.isElement(element) || !ac_Element.isElement(target)) {
                throw new TypeError('ac-base.Element.insertAt: element must be a valid DOM element');
            }

            children = ac_Element.children(target);

            // allow negative indices
            if (index < 0 && children.length) {
                index += children.length;
            }

            // take into account the case where we're inserting an element that's
            // already a child of the container
            if (target.contains(element) && index > children.indexOf(element)) {
                index++;
            }

            if (children && index <= children.length - 1) {
                for (i = 0, len = children.length; i < len; i++) {
                    if (i === index) {
                        target.insertBefore(element, children[i]);
                        break;
                    }
                }
            } else {
                // for incices larger than the largest index, append to end
                target.appendChild(element);
            }
        };

        /**
         * Returns an array of DOM elements (nodeType:3) that are direct children of element
         * @todo Cannot use Array.prototype.filter until removing "the other" script
         * @param   {Element} element Where to retrieve child elements from.
         * @returns {Element|null} an array of DOM elements, or null if none
         * @name module:ac-base.Element.children
         * @kind function
         */
        ac_Element.children = function(element) {
            var _children, child;

            element = ac_Element.getElementById(element);

            if (!ac_Element.isElement(element)) {
                throw new TypeError('ac-base.Element.children: element must be a valid DOM element');
            }

            if (element.children) {
                _children = [];
                for (var i = 0, l = element.children.length; i < l; i++) {
                    child = element.children[i];
                    if (child && child.nodeType === 1) {
                        _children.push(child);
                    }
                }
            }

            return _children.length ? _children : null;
        };

        /**
         * Removes nodes. Will optionally retain a reference to the removed node.
         * @param {Element} element The element to be removed.
         * @param {Boolean} retainReference If true a reference to the removed element will be returned.
         * @name module:ac-base.Element.remove
         * @kind function
         */
        ac_Element.remove = function(element, retainReference) {
            if (!ac_Element.isElement(element)) {
                throw new TypeError('ac-base.Element.remove: element must be a valid DOM element');
            }
            if (retainReference === true) {
                var removedNode = element.parentNode.removeChild(element);
                return removedNode;
            } else {
                element.parentNode.removeChild(element);
            }
        };

        /**
         * Determines the offset of the top/left of the element from the top/left of the viewport.
         * @param {Element} element
         * @returns {Object} x, y coordinates (px) of the top/left corner of the element relative to the top/left corner of the viewport.
         * @name module:ac-base.Element.viewportOffset
         * @kind function
         */
        ac_Element.viewportOffset = function(element) {
            var offset = ac_Element.getBoundingBox(element);
            return {
                x: offset.left,
                y: offset.top
            };
        };

        /**
         * Determines the amount of the height of the element that is in view.
         * @param {Element} element
         * @returns {Integer} Number of pixels of the element that are currently within the viewport.
         * @name module:ac-base.Element.pixelsInViewport
         * @kind function
         */
        ac_Element.pixelsInViewport = function(element, elementMetrics) {
            // Amount of the element that is visible inside of the viewport (px)
            var pixelsInView;

            if (!ac_Element.isElement(element)) {
                throw new TypeError('ac-base.Element.pixelsInViewport : element must be a valid DOM element');
            }

            // Get element and viewport metrics
            var viewportMetrics = ac_Viewport.dimensions();
            elementMetrics = elementMetrics || ac_Element.getBoundingBox(element);

            // Determine the offset from the top of the element relative to the top edge
            // of the viewport (px)
            var elementViewportOffsetY = elementMetrics.top;

            // If element is fully in view or cropped by bottom edge of viewport
            if (elementViewportOffsetY >= 0) {
                pixelsInView = viewportMetrics.height - elementViewportOffsetY;

                // If the bottom edge of element is in view and the top edge, then it
                // is fully in view
                if (pixelsInView > elementMetrics.height) {
                    pixelsInView = elementMetrics.height;
                }

                // If element is cropped by top edge of viewport or is scrolled out of
                // view above top edge of viewport
            } else {
                pixelsInView = elementMetrics.height + elementViewportOffsetY;
            }

            // If the element is completely out of view past the bottom edge of
            // the viewport, then 0 px of it is in view
            if (pixelsInView < 0) {
                pixelsInView = 0;
            }

            if (pixelsInView > viewportMetrics.height) {
                pixelsInView = viewportMetrics.height;
            }

            return pixelsInView;
        };

        /**
         * Determines the percentage of the height of the element that is in view.
         * @param {Element} element
         * @returns {Float} 0-1, Percentage of the element within the viewport.
         * @name module:ac-base.Element.percentInViewport
         * @kind function
         */
        ac_Element.percentInViewport = function(element) {
            var elementMetrics = ac_Element.getBoundingBox(element);
            var pixelsInView = ac_Element.pixelsInViewport(element, elementMetrics);
            return pixelsInView / elementMetrics.height;
        };

        /**
         * @param {Element} element
         * @param {Float} percentageThreshold Optional. Default : 0, Range: [0, 1]
         * @returns {Boolean} Whether or not that element is visible on the page (within the viewport) past a certain threshold percentage.
         * @name module:ac-base.Element.isInViewport
         * @kind function
         */
        ac_Element.isInViewport = function(element, percentageThreshold) {

            // Ensure that percentageThreshold is defined and within bounds.
            if (typeof percentageThreshold !== "number" || 1 < percentageThreshold || percentageThreshold < 0) {
                percentageThreshold = 0;
            }

            var percentInViewport = ac_Element.percentInViewport(element);
            return (percentInViewport > percentageThreshold || percentInViewport === 1);
        };

        var eachAncestor = function(element, handler) {
            element = ac_Element.getElementById(element);
            var ancestor = element.parentNode;

            while (ancestor && ac_Element.isElement(ancestor)) {
                if (typeof handler === 'function') {

                    // If the handler returns false
                    // break out of the loop
                    if (handler(ancestor) === false) {
                        break;
                    }

                }

                // if we aren’t at document.body yet
                // keep moving up
                if (ancestor !== document.body) {
                    ancestor = ancestor.parentNode;

                } else {
                    // stop on document.body
                    ancestor = null;
                }
            }
        };

        /**
         * Returns an array of ancestors for an element.
         * @param {Element} element The element to return an ancestor of
         * @param {Boolean} cssSelector If specified, will filter ancestors based on selector
         * @returns {Array} array of elements
         * @name module:ac-base.Element.ancestors
         * @kind function
         */
        ac_Element.ancestors = function(element, cssSelector) {
            var elements = [];

            // iterate over ancestors and add to elements array
            eachAncestor(element, function(ancestor) {
                // add to elements array if cssSelector is not defined or if cssSelector matches the element
                if (cssSelector === undefined || ac_Element.matchesSelector(ancestor, cssSelector)) {
                    elements.push(ancestor);
                }
            });

            return elements;
        };

        /**
         * Returns first matching ancestor for an element.
         * If no <code>cssSelector</code> is specified, returns <code>parentNode</code>, as if <code>cssSelector</code> were ‘*’.
         * @param {Element} element The element to return ancestors
         * @param {Boolean} cssSelector If specified, will return first ancestor that matches selector
         * @returns First matched element or null if no match
         * @name module:ac-base.Element.ancestor
         * @kind function
         */
        ac_Element.ancestor = function(element, cssSelector) {
            element = ac_Element.getElementById(element);
            var firstMatch = null;

            if (element !== null && cssSelector === undefined) {
                return element.parentNode;
            }

            // iterate over all ancestors and return the first match
            eachAncestor(element, function(ancestor) {
                if (ac_Element.matchesSelector(ancestor, cssSelector)) {
                    firstMatch = ancestor;
                    return false;
                }
            });

            return firstMatch;
        };

        /**
         * Sets all the appropriate vendor prefixed transform properties to {{{transformFunctions}}} on {{{element}}}.
         * If the 3D version of the transform is available it will set that in favor of the 2D transform.
         * @param {Element} element : the element for which to set the style upon
         * @param {String|Object} transformFunctions : the value for which to set the element's transform property. As a string
         * it takes the form of <code>[transformFunction]([parameters])</code>. As an object, pass the
         * <code>[transformFunctions]</code> as the key and the <code>[parameters]</code> as string to the key's value.
         * @name module:ac-base.Element.setVendorPrefixTransform
         * @kind function
         */
        ac_Element.setVendorPrefixTransform = function(element, transformFunctions) {
            if ((typeof transformFunctions !== 'string' && typeof transformFunctions !== 'object') || Array.isArray(transformFunctions) || transformFunctions === null) {
                throw new TypeError('ac-base.Element.setVendorPrefixTransform: transformFunctions argument must be either an object or a string');
            }

            ac_Element.setVendorPrefixStyle(element, 'transform', vendorTransformHelper.convert2dFunctions(transformFunctions));
        };

        if (ac_Environment_Browser.name === "IE") {
            require('./shims/ie/Element')(ac_Element, ac_Environment_Browser);
        }

        module.exports = ac_Element;

    }, {
        "./Element/EventDelegate": 22,
        "./Element/events": 23,
        "./Element/vendorTransformHelper": 26,
        "./Environment/Browser": 28,
        "./Viewport": 43,
        "./log": 47,
        "./shims/ie/Element": 52
    }],
    22: [function(require, module, exports) {
        'use strict';

        module.exports = function(ac_Element) {
            /**
             * EventDelegate handles intercepting the event bubble and firing
             * a handler when the event target matches its css selector
             * @param {Element} element
             * @param {Object} options
             * @name module:ac-base.Element~EventDelegate
             * @kind class
             */
            function EventDelegate(element, options) {
                this.element = element;
                this.options = options || {};
            }

            EventDelegate.prototype = /** @lends module:ac-base.Element~EventDelegate# */ {
                /**
                 * Finds if a passed element matches the object's css selector, or if it is a descendant
                 * of an element that matches the selector
                 * @param {Element} element that will be matched against a css selector or whose ancestors will be checked
                 * @ignore
                 */
                __findMatchingTarget: function(eventTarget) {
                    var delegateTarget = null;

                    if (ac_Element.matchesSelector(eventTarget, this.options.selector)) {
                        delegateTarget = eventTarget;

                    } else {
                        delegateTarget = ac_Element.ancestor(eventTarget, this.options.selector);

                    }
                    return delegateTarget;
                },
                /**
                 * Generates a method that will actually be attached as a dom event listener
                 * @ignore
                 */
                __generateDelegateMethod: function() {
                    var self = this;
                    var handler = self.options.handler;

                    return function(evt) {
                        var eventTarget = evt.target || evt.srcElement;
                        var delegateTarget = self.__findMatchingTarget(eventTarget);
                        var delegateEvent;

                        if (delegateTarget !== null) {
                            delegateEvent = new EventDelegate.Event(evt);
                            delegateEvent.setTarget(delegateTarget);

                            handler(delegateEvent);
                        }
                    };
                },
                /**
                 * Attaches the result of __generateDelegateMethod as an event listener
                 * @name EventDelegate.prototype.attachEventListener
                 * @returns {Function} Generated method that is attached as a DOM listener
                 */
                attachEventListener: function() {
                    this.__delegateMethod = this.__generateDelegateMethod();
                    ac_Element.addEventListener(this.element, this.options.eventType, this.__delegateMethod);
                    return this.__delegateMethod;
                },
                /**
                 * Removes event listener
                 */
                unbind: function() {
                    ac_Element.removeEventListener(this.element, this.options.eventType, this.__delegateMethod);
                    this.__delegateMethod = undefined;
                }
            };

            /**
             * Holds all instances of EventDelegate
             * @type {Array.<module:ac-base.Element~EventDelegate>}
             * @memberof module:ac-base.Element~EventDelegate
             */
            EventDelegate.instances = [];

            /**
             * Iterates through all instances in EventDelegate.instances and fires passed function for each instance
             * @param {Function} filterMethod Function used to filter results
             * @name module:ac-base.Element~EventDelegate.filterInstances
             * @returns {Array.<module:ac-base.Element~EventDelegate>} Array of event delegates where filter method returned true
             */
            EventDelegate.filterInstances = function(filterMethod) {
                var matches = [];

                EventDelegate.instances.forEach(function(eventDelegate) {
                    if (filterMethod(eventDelegate) === true) {
                        matches.push(eventDelegate);
                    }
                });

                return matches;
            };

            /**
             * Event type that gets passed to delegate handlers
             * @constructor
             * @param {evt} Native DOM Event
             * @name module:ac-base.Element~EventDelegate~Event
             */
            EventDelegate.Event = function(evt) {
                this.originalEvent = evt;
            };

            /**
             * Sets the target element for the instance
             * @param {Element} DOM Element
             * @name module:ac-base.Element~EventDelegate~Event#setTarget
             */
            EventDelegate.Event.prototype.setTarget = function(target) {
                this.target = target;
                this.currentTarget = target;
            };

            /**
             * Creates an event delegate and attaches it to an element
             * @param {Element} DOM Element
             * @param {String} Type of event to listen for (eg, 'click', 'keyup', etc)
             * @param {String} CSS Selector to filter targets against
             * @param {Function} Function to be fired for the event
             * @name module:ac-base.Element.addEventDelegate
             * @name module:ac-base.Element.addEventDelegate
             * @kind function
             */
            ac_Element.addEventDelegate = function(element, eventType, selector, handler) {
                var eventDelegate = new ac_Element.__EventDelegate(element, {
                    eventType: eventType,
                    selector: selector,
                    handler: handler
                });

                EventDelegate.instances.push(eventDelegate);

                return eventDelegate.attachEventListener();
            };

            /**
             * Removes an event delegate from an element
             * @param {Element} DOM Element
             * @param {String} Type of event to listen for (eg, 'click', 'keyup', etc)
             * @param {String} CSS Selector to filter targets against
             * @param {Function} Function to be fired for the event
             * @name module:ac-base.Element.removeEventDelegate
             * @kind function
             */
            ac_Element.removeEventDelegate = function(element, eventType, selector, handler) {
                var eventDelegates = ac_Element.__EventDelegate.filterInstances(function(eventDelegate) {
                    var options = eventDelegate.options;

                    return eventDelegate.element === element && options.selector === selector && options.eventType === eventType && options.handler === handler;
                });

                eventDelegates.forEach(function(eventDelegate) {
                    eventDelegate.unbind();
                });
            };

            ac_Element.__EventDelegate = EventDelegate;
        };

    }, {}],
    23: [function(require, module, exports) {
        'use strict';

        var events = {};

        /**
         * Cross-browser event handling
         * @param {Element} target Element to listen for event on
         * @param {string} type
         * @param {function} listener
         * @param {boolean} [useCapture=false]
         * @returns target
         * @name module:ac-base.Element.addEventListener
         * @kind function
         */
        events.addEventListener = function(target, type, listener, useCapture) {
            if (target.addEventListener) {
                target.addEventListener(type, listener, useCapture);
            } else if (target.attachEvent) {
                target.attachEvent('on' + type, listener);
            } else {
                target['on' + type] = listener;
            }
            return target;
        };

        /**
         * Cross-browser event dispatch
         * @param  {Element} target Element that will dispatch the event
         * @param  {String} type   The name of the event to fire
         * @return {Element}       target
         * @name module:ac-base.Element.dispatchEvent
         * @kind function
         */
        events.dispatchEvent = function(target, type) {
            if (document.createEvent) {
                target.dispatchEvent(new CustomEvent(type));
            } else {
                target.fireEvent('on' + type, document.createEventObject());
            }
            return target;
        };

        /**
         * Cross-browser event removing
         * @param {Element} target Element to listen for event on
         * @param {string} type
         * @param {function} listener
         * @param {boolean} [useCapture=false]
         * @returns target
         * @name module:ac-base.Element.removeEventListener
         * @kind function
         */
        events.removeEventListener = function(target, type, listener, useCapture) {
            if (target.removeEventListener) {
                target.removeEventListener(type, listener, useCapture);
            } else {
                target.detachEvent('on' + type, listener);
            }
            return target;
        };

        /**
         * Sets all the vendor event listeners of type on element.
         * @param {Element} element : the element for which to set the listener upon
         * @param {String} type : a string representing the event type to listen for, e.g. animationEnd, webkitAnimationEnd, etc... IMPORTANT: This value is expected to be a string in camelCase.
         * @param {Function} listener : the object that receives a notification when an event of the specified type occurs.
         * @param {Boolean} useCapture : If true, useCapture indicates that the user wishes to initiate capture.
         * @returns target
         * @name module:ac-base.Element.addVendorPrefixEventListener
         * @kind function
         */
        events.addVendorPrefixEventListener = function(element, type, listener, useCapture) {
            if (type.match(/^webkit/i)) {
                type = type.replace(/^webkit/i, '');
            } else if (type.match(/^moz/i)) {
                type = type.replace(/^moz/i, '');
            } else if (type.match(/^ms/i)) {
                type = type.replace(/^ms/i, '');
            } else if (type.match(/^o/i)) {
                type = type.replace(/^o/i, '');
            } else {
                type = type.charAt(0)
                    .toUpperCase() + type.slice(1);
            }

            // To avoid adding the same event twice, we need to sniff the user agent.
            // Once we've confirmed a browser supports the generic event name, we'll
            // change this if to be < that build.
            if (/WebKit/i.test(window.navigator.userAgent)) {
                return events.addEventListener(element, 'webkit' + type, listener, useCapture);
            } else if (/Opera/i.test(window.navigator.userAgent)) {
                return events.addEventListener(element, 'O' + type, listener, useCapture);
            } else if (/Gecko/i.test(window.navigator.userAgent) || /Trident/i.test(window.navigator.userAgent)) {
                return events.addEventListener(element, type.toLowerCase(), listener, useCapture);
            } else {
                type = type.charAt(0)
                    .toLowerCase() + type.slice(1);
                return events.addEventListener(element, type, listener, useCapture);
            }
        };

        /**
         * Removes all the vendor event listeners of type on an element.
         * @param {Element} element : the element for which to remove the listener from
         * @param {String} type : a string representing the event type to listen for, e.g. animationEnd, webkitAnimationEnd, etc... IMPORTANT: This value is expected to be a string in camelCase.
         * @param {Function} listener : the object that receives a notification when an event of the specified type occurs.
         * @param {Boolean} useCapture : If true, useCapture indicates that the user wishes to initiate capture.
         * @name module:ac-base.Element.removeVendorPrefixEventListener
         * @kind function
         */
        events.removeVendorPrefixEventListener = function(element, type, listener, useCapture) {
            if (type.match(/^webkit/i)) {
                type = type.replace(/^webkit/i, '');
            } else if (type.match(/^moz/i)) {
                type = type.replace(/^moz/i, '');
            } else if (type.match(/^ms/i)) {
                type = type.replace(/^ms/i, '');
            } else if (type.match(/^o/i)) {
                type = type.replace(/^o/i, '');
            } else {
                type = type.charAt(0)
                    .toUpperCase() + type.slice(1);
            }

            events.removeEventListener(element, 'webkit' + type, listener, useCapture);
            events.removeEventListener(element, 'O' + type, listener, useCapture);
            events.removeEventListener(element, type.toLowerCase(), listener, useCapture);

            type = type.charAt(0)
                .toLowerCase() + type.slice(1);
            return events.removeEventListener(element, type, listener, useCapture);
        };

        module.exports = events;

    }, {}],
    24: [function(require, module, exports) {
        /**
         * Originally based on contentloaded.js, this has been refactored to use
         * AC helpers and logic similar to module:ac-base.onWindowLoad.
         *
         * @name module:ac-base.onDOMReady
         * @param {Function} callback Function reference
         * @returns void
         */
        /*
         * Original Script: contentloaded.js
         * Author: Diego Perini (diego.perini at gmail.com)
         * Summary: cross-browser wrapper for DOMContentLoaded
         * Updated: 20101020
         * License: MIT
         * Version: 1.2
         *
         * URL:
         * http://javascript.nwbox.com/ContentLoaded/
         * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
         */
        'use strict';

        /** @ignore */
        var globals = require('../globals');
        /** @ignore */
        var events = require('./events');
        /** @ignore */
        var pollId;
        /** @ignore */
        var queue;

        /**
         * A method to run once the dom is ready
         * @ignore
         */
        function onReady(event) {
            var doc = globals.document;
            var win = globals.window;

            if (event.type === 'readystatechange' && doc.readyState !== 'complete') {
                return;
            }

            // Run the queued actions!
            var i = queue.length;
            while (i--) {
                queue.shift()
                    .call(win, event.type || event);
            }
            // Stop caring. It’s not going to happen again!
            events.removeEventListener(doc, 'DOMContentLoaded', onReady, false);
            events.removeEventListener(doc, 'readystatechange', onReady, false);
            events.removeEventListener(win, 'load', onReady, false);
            clearTimeout(pollId);
        }

        /** @ignore */
        function poll() {
            try {
                globals.document.documentElement.doScroll('left');
            } catch (e) {
                pollId = setTimeout(poll, 50);
                return;
            }
            onReady('poll');
        }

        module.exports = function ac_onDOMReady(callback) {
            var doc = globals.document;
            var win = globals.window;

            // If the window has loaded, let’s just run the action immediately
            if (doc.readyState === 'complete') {
                callback.call(win, 'lazy');

                // Otherwise, queue ‘er up!
            } else {
                if (!queue || !queue.length) {
                    queue = [];
                    events.addEventListener(doc, 'DOMContentLoaded', onReady, false);
                    events.addEventListener(doc, 'readystatechange', onReady, false);
                    events.addEventListener(win, 'load', onReady, false);
                    if (doc.createEventObject && doc.documentElement.doScroll) {
                        try {
                            if (!win.frameElement) {
                                poll();
                            }
                        } catch (e) {}
                    }
                }
                queue.push(callback);
            }
        };

    }, {
        "../globals": 46,
        "./events": 23
    }],
    25: [function(require, module, exports) {
        /**
         * Similarly to module:ac-base.onDOMReady, will fire function passed
         * as argument when window is loaded. If window has already loaded
         *
         * @name module:ac-base.onWindowLoad
         * @see https://developer.mozilla.org/en-US/docs/Web/API/document.readyState
         * @returns void
         */
        'use strict';

        /** @ignore */
        var globals = require('../globals');
        /** @ignore */
        var events = require('./events');
        /** @ignore */
        var queue;

        /**
         * A method to run once the window has loaded, if it hasn’t already
         * @ignore
         */
        function onLoad() {
            // Run the queued actions!
            var i = queue.length;
            while (i--) {
                queue.shift()();
            }
            // Stop caring. It’s not going to happen again!
            events.removeEventListener(globals.window, 'load', onLoad);
        }

        module.exports = function ac_onWindowLoad(callback) {
            // If the window has loaded, let’s just run the action immediately
            if (globals.document.readyState === 'complete') {
                callback();

                // Otherwise, queue ‘er up!
            } else {
                if (!queue) {
                    queue = [];
                    events.addEventListener(globals.window, 'load', onLoad);
                }
                queue.push(callback);
            }
        };

    }, {
        "../globals": 46,
        "./events": 23
    }],
    26: [function(require, module, exports) {
        'use strict';

        /*
         * A static helper object that handles the work for module:ac-base.Element.setVendorPrefixTransform.
         * Functionality is abstracted out into this helper object in order to break it up into manageable chunks
         * and also to enable testing of the code that would otherwise be unreachable by the test suites.
         */
        /** @ignore */
        var vendorTransformHelper = {

            __objectifiedFunctions: {},

            /*
		The paramMaps are used as templates for mapping 2D transform function parameters into
		their equivalent 3D function counterparts. 'p1', 'p2', etc. are replacement tokens that
		correspond to the 2D function parameters. p1 is the first 2D parameter, p2 is the second and so on.
	*/
            __paramMaps: {
                translate: 'p1, p2, 0',
                translateX: 'p1, 0, 0',
                translateY: '0, p1, 0',
                scale: 'p1, p2, 1',
                scaleX: 'p1, 1, 1',
                scaleY: '1, p1, 1',
                rotate: '0, 0, 1, p1',
                matrix: 'p1, p2, 0, 0, p3, p4, 0, 0, 0, 0, 1, 0, p5, p6, 0, 1'
            },

            /*
		@param {String|Object} functions2d A space separated string of transform functions, or an object
		with function names as the keys and a string of comma separataed parameters as the values.
		@returns {String} A space separated list of transform functions with any eligible 2D functions
		mapped to their 3D counterparts.
	*/
            convert2dFunctions: function(functions2d) {
                var values;

                this.__init(functions2d);
                // loop through functions & replace 2d function with 3d function where available
                for (var func in this.__objectifiedFunctions) {
                    if (this.__objectifiedFunctions.hasOwnProperty(func)) {
                        values = this.__objectifiedFunctions[func].replace(' ', '')
                            .split(',');
                        if (func in this.__paramMaps) {
                            for (var map in this.__paramMaps) {
                                if (func === map) {
                                    this.valuesToSet.push(this.__stripFunctionAxis(func) + '3d(' + this.__map2DTransformParams(values, this.__paramMaps[func]) + ')');
                                }
                            }
                        } else {
                            this.valuesToSet.push(func + '(' + this.__objectifiedFunctions[func] + ')');
                        }
                    }
                }
                return this.valuesToSet.join(' ');
            },

            /*
		Handles some light house cleaning - resetting properties.
		Expects to receive the functions2d parameter from convert2dFunctions and fills the
		_objectifiedFunctions property with key/value pairs from this string or object.
		@param {String|Object} functions2d A space separated string of transform functions, or an object
		with function names as the keys and a string of comma separataed parameters as the values.
		@returns {undefined}
	*/
            __init: function(functions2d) {
                this.valuesToSet = [];
                this.__objectifiedFunctions = (typeof functions2d === 'object') ? functions2d : {};
                if (typeof functions2d === 'string') {
                    this.__objectifiedFunctions = this.__objectifyFunctionString(functions2d);
                }
            },

            /*
		@param {Array} params2d Array containing all the parameters from a transform function as
		individual members.
		@param {String} template3d One of the parameter maps from the __paramMaps object.
		@returns {String} The template3d parameter with the 2D function values mapped into it.
	*/
            __map2DTransformParams: function(params2d, template3d) {
                params2d.forEach(function(val, i) {
                    template3d = template3d.replace('p' + (i + 1), val);
                });
                return template3d;
            },

            /*
		Splits a space separated string of transform functions into an array with each
		function as a member.
		@param {String} functionString A space separated string of transform functions
		@returns {Array} An array with each function from the string as a member
	*/
            __splitFunctionStringToArray: function(functionString) {
                return functionString.match(/[\w]+\(.+?\)/g);
            },

            /*
		Takes a single transform function as a string and splits its name and parameters into an array.
		@param {String} functionString
		@returns {Array} The resulting array from a match() method. The entire functionString
		will be the first member with the function name and the parameters populating the
		second and third members respectively.
	*/
            __splitFunctionNameAndParams: function(functionString) {
                return functionString.match(/(.*)\((.*)\)/);
            },

            /*
		Strips the X or Y axis off the end of a transform function.
		@param {String} func A transform function name that specifies an X or Y axis at the end
		@returns {String} The function with the axis removed
	*/
            __stripFunctionAxis: function(func) {
                return func.match(/([a-z]+)(|X|Y)$/)[1];
            },

            /*
		Splits a string of transform functions into an object consisting of the function
		names as the keys and the parameters as their respective values.
		@param {String} functionString A space separated string of transform functions
		@returns {Object} An object filled with keys as function names and values as their
		respective parameters
	*/
            __objectifyFunctionString: function(functionString) {
                var self = this;
                var splitMember;
                this.__splitFunctionStringToArray(functionString)
                    .forEach(function(member) {
                        splitMember = self.__splitFunctionNameAndParams(member);
                        self.__objectifiedFunctions[splitMember[1]] = splitMember[2];
                    });
                return this.__objectifiedFunctions;
            }
        };

        module.exports = vendorTransformHelper;

    }, {}],
    27: [function(require, module, exports) {
        'use strict';

        /**
         * @name module:ac-base.Environment
         * @kind namespace
         */
        var ac_Environment = {
            Browser: require('./Environment/Browser'),
            Feature: require('./Environment/Feature')
        };

        module.exports = ac_Environment;

    }, {
        "./Environment/Browser": 28,
        "./Environment/Feature": 31
    }],
    28: [function(require, module, exports) {
        'use strict';

        var BrowserData = require('./Browser/BrowserData');

        /**
        	@namespace
        	@name module:ac-base.Environment.Browser

        	@description
        	Reports information about the user's browser and device based on the userAgent string and feature detection.

        	<br /><br />

        	<h2>Immutable Properties</h2>
        	<ul>
        		<li>
        			<h3><em class="light fixedFont">{String}</em> name</h3>
        			<p>The name of the browser</p>
        		</li>
        		<li>
        			<h3><em class="light fixedFont">{Float}</em> version</h3>
        			<p>The version of the browser</p>
        		</li>
        		<li>
        			<h3><em class="light fixedFont">{String}</em> os</h3>
        			<p>The Operating System (No version)</p>
        		</li>
        		<li>
        			<h3><em class="light fixedFont">{String}</em> osVersion</h3>
        			<p>The Operating System Version</p>
        		</li>
        		<li>
        			<h3><em class="light fixedFont">{String}</em> lowerCaseUserAgent</h3>
        			<p>The userAgent string converted to lower case.</p>
        		</li>
        	</ul>

        	@reference http://www.quirksmode.org/js/detect.html
        */

        var ac_Environment_Browser = BrowserData.create();

        /**
         * Returns true/false whether the browser is WebKit based
         * @param  {String}  userAgentString
         * @return {Boolean}
         */
        ac_Environment_Browser.isWebKit = function(userAgentString) {
            var userAgent = userAgentString || window.navigator.userAgent;
            return userAgent ? !!userAgent.match(/applewebkit/i) : false;
        };

        /**
         * @type {String}
         */
        ac_Environment_Browser.lowerCaseUserAgent = navigator.userAgent.toLowerCase();

        if (ac_Environment_Browser.name === "IE") {
            require('../shims/ie/Environment/Browser')(ac_Environment_Browser);
        }


        module.exports = ac_Environment_Browser;

    }, {
        "../shims/ie/Environment/Browser": 53,
        "./Browser/BrowserData": 29
    }],
    29: [function(require, module, exports) {
        'use strict';

        var _data = require('./data');
        var ac_RegExp = require('../../RegExp');

        function BrowserData() {}

        BrowserData.prototype = {
            /**
             * Parses string (such as userAgent) and returns the browser version
             * @param  {String} stringToSearch
             * @return {Number}
             * @ignore
             */
            __getBrowserVersion: function(stringToSearch, identity) {

                if (!stringToSearch || !identity) {
                    return;
                }

                // Filters data.browser for the member with a identity equal to identity
                var filteredData = _data.browser.filter(function(item) {
                    return item.identity === identity;
                })[0];

                var versionSearchString = filteredData.versionSearch || identity;
                var index = stringToSearch.indexOf(versionSearchString);

                if (index > -1) {
                    return parseFloat(stringToSearch.substring(index + versionSearchString.length + 1));
                }
            },

            /**
             * Alias for __getIdentityStringFromArray
             * @param  {Array} browserData | Expects data.browser
             * @return {String}
             * @ignore
             */
            __getName: function(dataBrowser) {
                return this.__getIdentityStringFromArray(dataBrowser);
            },

            /**
             * Expects single member of data.browser or data.os
             * and returns a string to be used in os or name.
             * @param  {Object} item
             * @return {String}
             * @ignore
             */
            __getIdentity: function(item) {
                if (item.string) {
                    return this.__matchSubString(item);
                } else if (item.prop) {
                    return item.identity;
                }
            },

            /**
             * Iterates through data.browser or data.os returning the correct
             * browser or os identity
             * @param  {Array} dataArray
             * @return {String}
             * @ignore
             */
            __getIdentityStringFromArray: function(dataArray) {
                for (var i = 0, l = dataArray.length, identity; i < l; i++) {
                    identity = this.__getIdentity(dataArray[i]);
                    if (identity) {
                        return identity;
                    }
                }
            },

            /**
             * Alias for __getIdentityStringFromArray
             * @param  {Array} OSData | Expects data.os
             * @return {String}
             * @ignore
             */
            __getOS: function(dataOS) {
                return this.__getIdentityStringFromArray(dataOS);
            },

            /**
             * Parses string (such as userAgent) and returns the operating system version
             * @param {String} stringToSearch
             * @param {String} osIdentity
             * @return {String|Number} int if not a decimal delimited version
             * @ignore
             */
            __getOSVersion: function(stringToSearch, osIdentity) {

                if (!stringToSearch || !osIdentity) {
                    return;
                }

                // Filters data.os returning the member with an identity equal to osIdentity
                var filteredData = _data.os.filter(function(item) {
                    return item.identity === osIdentity;
                })[0];

                var versionSearchString = filteredData.versionSearch || osIdentity;
                var regex = new RegExp(versionSearchString + ' ([\\d_\\.]+)', 'i');
                var version = stringToSearch.match(regex);

                if (version !== null) {
                    return version[1].replace(/_/g, '.');
                }
            },

            /**
             * Regular expression and indexOf against item.string using item.subString as the pattern
             * @param  {Object} item
             * @return {String}
             * @ignore
             */
            __matchSubString: function(item) {
                var subString = item.subString;
                var matches;
                if (subString) {
                    matches = ac_RegExp.isRegExp(subString) && !!item.string.match(subString);
                    if (matches || item.string.indexOf(subString) > -1) {
                        return item.identity;
                    }
                }
            }
        };

        BrowserData.create = function() {
            var instance = new BrowserData();
            var out = {};
            out.name = instance.__getName(_data.browser);
            out.version = instance.__getBrowserVersion(_data.versionString, out.name);
            out.os = instance.__getOS(_data.os);
            out.osVersion = instance.__getOSVersion(_data.versionString, out.os);
            return out;
        };

        module.exports = BrowserData;

    }, {
        "../../RegExp": 38,
        "./data": 30
    }],
    30: [function(require, module, exports) {
        'use strict';

        module.exports = {
            // Used to test getName
            browser: [{
                    string: window.navigator.userAgent,
                    subString: "Chrome",
                    identity: "Chrome"
                }, {
                    string: window.navigator.userAgent,
                    subString: /silk/i,
                    identity: "Silk"
                }, {
                    string: window.navigator.userAgent,
                    subString: "OmniWeb",
                    versionSearch: "OmniWeb/",
                    identity: "OmniWeb"
                }, {
                    string: window.navigator.userAgent,
                    subString: /mobile\/[^\s]*\ssafari\//i,
                    identity: "Safari Mobile",
                    versionSearch: "Version"
                }, {
                    string: window.navigator.vendor,
                    subString: "Apple",
                    identity: "Safari",
                    versionSearch: "Version"
                }, {
                    prop: window.opera,
                    identity: "Opera",
                    versionSearch: "Version"
                }, {
                    string: window.navigator.vendor,
                    subString: "iCab",
                    identity: "iCab"
                }, {
                    string: window.navigator.vendor,
                    subString: "KDE",
                    identity: "Konqueror"
                }, {
                    string: window.navigator.userAgent,
                    subString: "Firefox",
                    identity: "Firefox"
                }, {
                    string: window.navigator.vendor,
                    subString: "Camino",
                    identity: "Camino"
                }, { // for newer Netscapes (6+)
                    string: window.navigator.userAgent,
                    subString: "Netscape",
                    identity: "Netscape"
                },
                // IE < 11
                {
                    string: window.navigator.userAgent,
                    subString: "MSIE",
                    identity: "IE",
                    versionSearch: "MSIE"
                },
                // IE >= 11
                {
                    string: window.navigator.userAgent,
                    subString: "Trident",
                    identity: "IE",
                    versionSearch: "rv"
                }, {
                    string: window.navigator.userAgent,
                    subString: "Gecko",
                    identity: "Mozilla",
                    versionSearch: "rv"
                }, { // for older Netscapes (4-)
                    string: window.navigator.userAgent,
                    subString: "Mozilla",
                    identity: "Netscape",
                    versionSearch: "Mozilla"
                }
            ],
            // Used to test getOS
            os: [{
                string: window.navigator.platform,
                subString: "Win",
                identity: "Windows",
                versionSearch: "Windows NT"
            }, {
                string: window.navigator.platform,
                subString: "Mac",
                identity: "OS X"
            }, {
                string: window.navigator.userAgent,
                subString: "iPhone",
                identity: "iOS",
                versionSearch: "iPhone OS"
            }, {
                string: window.navigator.userAgent,
                subString: "iPad",
                identity: "iOS",
                versionSearch: "CPU OS"
            }, {
                string: window.navigator.userAgent,
                subString: /android/i,
                identity: "Android"
            }, {
                string: window.navigator.platform,
                subString: "Linux",
                identity: "Linux"
            }],
            // Used to test version and osVersion
            versionString: window.navigator.userAgent || window.navigator.appVersion || undefined
        };

    }, {}],
    31: [function(require, module, exports) {
        'use strict';

        var ac_log = require('../log');

        /**
        	@namespace
        	@name module:ac-base.Environment.Feature
        */
        var ac_Environment_Feature = {
            localStorageAvailable: require('./Feature/localStorageAvailable')
        };
        var hasOwnProp = Object.prototype.hasOwnProperty;

        (function() {
            var style = null;
            var prefixes = null;
            var preFixes = null;
            var css = null;

            /**
             * @deprecated Please use module:ac-base.Environment.Feature.cssPropertyAvailable instead.
             */
            ac_Environment_Feature.isCSSAvailable = function(property) {
                ac_log('ac-base.Environment.Feature.isCSSAvailable is deprecated. Please use ac-base.Environment.Feature.cssPropertyAvailable instead.');
                return this.cssPropertyAvailable(property);
            };

            /**
		Sets all the vendor specific style property to value on element.
		@param {String} property The CSS property to test, can be of the form: webkitBorderRadius, mozBorderRadius, etc.; borderRadius -webkit-border-radius, -moz-border-radius, etc.; border-radius

		@returns true if the current browser supports the given CSS property, otherwise, returns false.
	*/
            ac_Environment_Feature.cssPropertyAvailable = function(property) {
                if (style === null) {
                    style = document.createElement('browserdetect')
                        .style;
                }
                if (prefixes === null) {
                    prefixes = ['-webkit-', '-moz-', '-o-', '-ms-', '-khtml-', ''];
                }
                if (preFixes === null) {
                    preFixes = ['Webkit', 'Moz', 'O', 'ms', 'Khtml', ''];
                }
                if (css === null) {
                    css = {};
                }

                property = property.replace(/([A-Z]+)([A-Z][a-z])/g, '$1\\-$2')
                    .replace(/([a-z\d])([A-Z])/g, '$1\\-$2')
                    .replace(/^(\-*webkit|\-*moz|\-*o|\-*ms|\-*khtml)\-/, '')
                    .toLowerCase();
                switch (property) {
                    case 'gradient':
                        if (css.gradient !== undefined) {
                            return css.gradient;
                        }

                        property = 'background-image:';
                        var value1 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));';
                        var value2 = 'linear-gradient(left top,#9f9, white);';

                        style.cssText = (property + prefixes.join(value1 + property) + prefixes.join(value2 + property))
                            .slice(0, -property.length);
                        css.gradient = (style.backgroundImage.indexOf('gradient') !== -1);
                        return css.gradient;

                    case 'inset-box-shadow':
                        if (css['inset-box-shadow'] !== undefined) {
                            return css['inset-box-shadow'];
                        }

                        property = 'box-shadow:';
                        var value = '#fff 0 1px 1px inset;';

                        style.cssText = prefixes.join(property + value);
                        css['inset-box-shadow'] = (style.cssText.indexOf('inset') !== -1);
                        return css['inset-box-shadow'];

                    default:
                        var properties = property.split('-');
                        var length = properties.length;
                        var Property;
                        var i;
                        var j;

                        if (properties.length > 0) {
                            property = properties[0];
                            for (i = 1; i < length; i += 1) {
                                property += properties[i].substr(0, 1)
                                    .toUpperCase() + properties[i].substr(1);
                            }
                        }
                        Property = property.substr(0, 1)
                            .toUpperCase() + property.substr(1);

                        if (css[property] !== undefined) {
                            return css[property];
                        }

                        for (j = preFixes.length - 1; j >= 0; j -= 1) {
                            if (style[preFixes[j] + property] !== undefined || style[preFixes[j] + Property] !== undefined) {
                                css[property] = true;
                                return true;
                            }
                        }
                        return false;

                }
            };
        }());

        /**
         * @deprecated Please use module:ac-base.Environment.Feature.threeDTransformsAvailable
         */
        ac_Environment_Feature.supportsThreeD = function() {
            ac_log('ac-base.Environment.Feature.supportsThreeD is deprecated. Please use ac-base.Environment.Feature.threeDTransformsAvailable instead.');
            return this.threeDTransformsAvailable();
        };

        /**
        	Returns whether the browser supports the 3d media query
        	@returns {Boolean} whether or not the browser supports the 3d media query
        */
        ac_Environment_Feature.threeDTransformsAvailable = function() {
            // Memoize previously returned value
            if (typeof this._threeDTransformsAvailable !== 'undefined') {
                return this._threeDTransformsAvailable;
            }

            var div, style;

            try {
                this._threeDTransformsAvailable = false;

                if (hasOwnProp.call(window, 'styleMedia')) {
                    this._threeDTransformsAvailable = window.styleMedia.matchMedium('(-webkit-transform-3d)');

                } else if (hasOwnProp.call(window, 'media')) {
                    this._threeDTransformsAvailable = window.media.matchMedium('(-webkit-transform-3d)');
                }

                // chrome returns all the values as true, but doesn't actually have 3d support
                if (!this._threeDTransformsAvailable) {
                    if (!(style = document.getElementById('supportsThreeDStyle'))) {
                        style = document.createElement('style');
                        style.id = 'supportsThreeDStyle';
                        style.textContent = '@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-ms-transform-3d),(-webkit-transform-3d) { #supportsThreeD { height:3px } }';
                        document.querySelector('head')
                            .appendChild(style);
                    }

                    if (!(div = document.querySelector('#supportsThreeD'))) {
                        div = document.createElement('div');
                        div.id = 'supportsThreeD';
                        document.body.appendChild(div);
                    }
                    this._threeDTransformsAvailable = (div.offsetHeight === 3) || style.style['MozTransform'] !== undefined || style.style['WebkitTransform'] !== undefined;
                }

                return this._threeDTransformsAvailable;
            } catch (e) {
                return false;
            }
        };

        /**
         * @deprecated module:ac-base.Environment.Feature.supportsCanvas is deprecated. Please use module:ac-base.Environment.Feature.canvasAvailable instead.
         */
        ac_Environment_Feature.supportsCanvas = function() {
            ac_log('ac-base.Environment.Feature.supportsCanvas is deprecated. Please use ac-base.Environment.Feature.canvasAvailable instead.');
            return this.canvasAvailable();
        };

        /**
        	Detects whether or not the browser understands the HTML5 Canvas API.
        	@returns {Boolean} true if the browser supports canvas.
        */
        ac_Environment_Feature.canvasAvailable = function() {
            // Memoize previously returned value
            if (typeof this._canvasAvailable !== 'undefined') {
                return this._canvasAvailable;
            }

            var canvas = document.createElement('canvas');

            this._canvasAvailable = !!(typeof canvas.getContext === 'function' && canvas.getContext('2d'));
            return this._canvasAvailable;
        };

        /**
        	Returns whether the browser supports HTML5 sessionStorage, and
        	does not have privacy mode enabled or cookies turned off.
        	@returns {Boolean} true if the browser supports sessionStorage
        */
        ac_Environment_Feature.sessionStorageAvailable = function() {
            // Memoize previously returned value
            if (typeof this._sessionStorageAvailable !== 'undefined') {
                return this._sessionStorageAvailable;
            }

            try {
                if (typeof window.sessionStorage !== 'undefined' && typeof window.sessionStorage.setItem === 'function') {
                    window.sessionStorage.setItem('ac_browser_detect', 'test');
                    this._sessionStorageAvailable = true;
                    window.sessionStorage.removeItem('ac_browser_detect', 'test');
                } else {
                    this._sessionStorageAvailable = false;
                }
            } catch (e) {
                this._sessionStorageAvailable = false;
            }
            return this._sessionStorageAvailable;
        };

        /**
        	Returns whether the browser has cookies enabled.
        	@returns {Boolean} true if cookies are enabled.
        */
        ac_Environment_Feature.cookiesAvailable = function() {
            // Memoize previously returned value
            if (typeof this._cookiesAvailable !== 'undefined') {
                return this._cookiesAvailable;
            }
            this._cookiesAvailable = (hasOwnProp.call(document, 'cookie') && !!navigator.cookieEnabled) ? true : false;
            return this._cookiesAvailable;
        };

        /**
        	Some devices swap the width/height when in landscape, so we want to make
        	sure we're always reporting width as the lesser value. Except when the
        	device isn't orientable, then we want to honor window.screen.width.
        	@ignore
        */
        ac_Environment_Feature.__normalizedScreenWidth = function() {
            // We only care if the device is orientable
            if (typeof window.orientation === 'undefined') {
                return window.screen.width;
            }
            return window.screen.width < window.screen.height ? window.screen.width : window.screen.height;
        };

        /**
         * Tests for touch support on the device.
         * DocumentTouch is specific to Firefox <25 support.
         *
         * @returns {Boolean} true if the device supports touch.
         */
        ac_Environment_Feature.touchAvailable = function() {
            return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch);
        };

        /**
        	Attempts to determine if device is a desktop. The test is based on the assumptions
        	that desktop machines don't support touch and aren't orientable
        	@returns {Boolean} true if device has no support for touch and orientation
        */
        ac_Environment_Feature.isDesktop = function() {
            if (!this.touchAvailable() && !window.orientation) {
                return true;
            }
            return false;
        };

        /**
        	Attempts to determine if device is handheld. e.g. phones and iPod Touches.
        	The test is based on the value of module:ac-base.Environment.Feature.isDesktop() and
        	if the device screen width is less than or equal to 480 pixels.
        	@returns {Boolean} true if the device is determined to be handheld
        */
        ac_Environment_Feature.isHandheld = function() {
            return !this.isDesktop() && !this.isTablet();
        };

        /**
        	Attempts to determine if device is a tablet. i.e. iPad or Nexus 7.
        	The test is based on the value of module:ac-base.Environment.Feature.isDesktop() and
        	if the device screen width is greater than 480 pixels.
        	@returns {Boolean} true if the device is determined to be a tablet
        */
        ac_Environment_Feature.isTablet = function() {
            return !this.isDesktop() && this.__normalizedScreenWidth() > 480;
        };

        /**
        	Attempts to determine whether the display is retina.
        	@returns {Boolean} true if DPR is determined to be greater than or equal to 1.5
        */
        ac_Environment_Feature.isRetina = function() {
            // Vendor prefixes and media queries for DPR detection are a mess
            var mediaQueryStrings = [
                'min-device-pixel-ratio:1.5',
                '-webkit-min-device-pixel-ratio:1.5',
                'min-resolution:1.5dppx',
                'min-resolution:144dpi',
                'min--moz-device-pixel-ratio:1.5'
            ];
            var i;

            // Use devicePixelRatio if available
            if (window.devicePixelRatio !== undefined) {
                if (window.devicePixelRatio >= 1.5) {
                    return true;
                }

                // Else resort to matchMedia
            } else {
                for (i = 0; i < mediaQueryStrings.length; i += 1) {
                    if (window.matchMedia('(' + mediaQueryStrings[i] + ')')
                        .matches === true) {
                        return true;
                    }
                }
            }

            // Otherwise return false
            return false;
        };

        /**
         * Browser support for SVG in background images very closely matches that of SVG in <img> tags.
         * Detecting this feature checks for support as both inline and background images.
         * @returns {Boolean} true if SVG support is available
         */
        ac_Environment_Feature.svgAvailable = function() {
            return document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1');
        };

        module.exports = ac_Environment_Feature;

    }, {
        "../log": 47,
        "./Feature/localStorageAvailable": 32
    }],
    32: [function(require, module, exports) {
        'use strict';

        var isAvailable = null;

        /**
         * Returns whether the browser supports HTML5 localStorage, and
         * does not have privacy mode enabled or cookies turned off.
         * NOTE: Does not support Firefox <= 13 because of a bug where Firefox interprets a nonexistent item as null instead of undefined
         * @returns {Boolean} true if the browser supports localStorage
         * @name module:ac-base.Environment.Feature.localStorageAvailable
         * @kind function
         */
        module.exports = function localStorageAvailable() {
            // Memoize previously returned value
            if (isAvailable === null) {
                isAvailable = !!(window.localStorage && window.localStorage.non_existent !== null);
            }
            return isAvailable;
        };

    }, {}],
    33: [function(require, module, exports) {
        'use strict';

        /**
         * @name module:ac-base.Event
         * @kind namespace
         */
        var ac_Event = {};

        /**
         * Stop propagation of event and prevent default behavior.
         * @param {Event} evt The event to stop
         * @name module:ac-base.Event.stop
         * @kind function
         */
        ac_Event.stop = function(evt) {
            if (!evt) {
                evt = window.event;
            }

            if (evt.stopPropagation) {
                evt.stopPropagation();
            } else {
                evt.cancelBubble = true;
            }

            if (evt.preventDefault) {
                evt.preventDefault();
            }

            evt.stopped = true;
            evt.returnValue = false;
        };

        /**
         * Cross-browser event target getter
         * @param {Event} evt
         * @name module:ac-base.Event.target
         * @kind function
         */
        ac_Event.target = function(evt) {
            return (typeof evt.target !== 'undefined') ? evt.target : evt.srcElement;
        };

        /**
         * @enum Keycode Map
         */
        ac_Event.Keys = {
            UP: 38,
            DOWN: 40,
            LEFT: 37,
            RIGHT: 39,
            ESC: 27,
            SPACE: 32,
            BACKSPACE: 8,
            DELETE: 46,
            END: 35,
            HOME: 36,
            PAGEDOWN: 34,
            PAGEUP: 33,
            RETURN: 13,
            TAB: 9
        };

        module.exports = ac_Event;

    }, {}],
    34: [function(require, module, exports) {
        'use strict';

        var ac_Array = require('./Array');

        /**
         * @name module:ac-base.Function
         * @kind namespace
         */
        var ac_Function = {};

        /**
         * Empty function. Useful for things like defaults for callbacks, etc.
         * @name module:ac-base.Function.emptyFunction
         * @kind function
         */
        ac_Function.emptyFunction = function() {};

        /**
         * Bind <code>this</code> to an Object for a Function
         * @name module:ac-base.Function.bindAsEventListener
         * @kind function
         */
        ac_Function.bindAsEventListener = function(__method, obj) {
            // Pass arguments after method name and obj as arguments to method
            var args = ac_Array.toArray(arguments)
                .slice(2);
            return function(event) {
                return __method.apply(obj, [event || window.event].concat(args));
            };
        };

        /**
         * @returns {Array} Names of arguments as strings as described in function’s implementation.
         * @name module:ac-base.Function.getParamNames
         * @kind function
         */
        ac_Function.getParamNames = function(func) {
            var funStr = func.toString();
            return funStr.slice(funStr.indexOf('(') + 1, funStr.indexOf(')'))
                .match(/([^\s,]+)/g) || [];
        };

        /**
         * Wrapper for requestAnimationFrame that executes/iterates a rendering function over a set
         * duration, passing it the percent of the duration that has passed with each call.
         * @param drawFrameFunction {Function} animation rendering function that accepts a single
         * argument as a {Number} indicating the percent of the duration that has
         * passed as decimal (0-1).
         * @param duration {Float} duration of animation in seconds.
         * @param afterFinish {Function} optional; Function to be executed once the animation
         * duration has expired.
         * @name module:ac-base.Function.iterateFramesOverAnimationDuration
         * @kind function
         */
        ac_Function.iterateFramesOverAnimationDuration = function(drawFrameFunction, duration, afterFinish) {
            var percentProgress = 0;
            var animationFrameRequestID;
            var requestAnimationFrameIteratorFunction;
            var startTime;

            // Convert duration to milliseconds
            duration = duration * 1000;

            // Function to be ran every animation frame
            requestAnimationFrameIteratorFunction = function(t) {
                startTime = startTime || t;
                // Determine the progress we’ve made relative to how long we plan to animate in total
                // Allow zero duration to defer to next frame, but avoid divide by zero and report percent of 1
                percentProgress = duration ? Math.min(Math.max(0, (t - startTime) / duration), 1) : 1;
                drawFrameFunction(percentProgress);

                // We’ve still got some animating to do!
                if (percentProgress < 1) {
                    animationFrameRequestID = window.requestAnimationFrame(requestAnimationFrameIteratorFunction);
                    // We’ve ran for our entire duration
                } else {
                    // Clean up requestAnimationFrame if it’s still outstanding
                    window.cancelAnimationFrame(animationFrameRequestID);

                    if (typeof afterFinish === 'function') {
                        afterFinish();
                    }
                }
            };

            // Run initial draw, which will call itself recursively every animation frame until the duration has expired
            animationFrameRequestID = window.requestAnimationFrame(requestAnimationFrameIteratorFunction);
        };

        module.exports = ac_Function;

    }, {
        "./Array": 15
    }],
    35: [function(require, module, exports) {
        'use strict';

        var ac_NotificationCenter = require('./NotificationCenter');
        var ac_Class = require('./Class');
        var ac_Object = require('./Object');
        var ac_Element = require('./Element');

        /**
         * @namespace
         * @name module:ac-base.History
         */
        var ac_History = {};

        ac_History.HashChange = ac_Class({
            initialize: function(notificationString) {
                this._boundEventHandler = null;
                this._notificationString = notificationString || 'ac-history-hashchange';

                this.synthesize();
            },

            __eventHandler: function(evt) {
                var hashChangeEvent = new ac_History.HashChange.Event(evt);
                ac_NotificationCenter.publish(this.notificationString(), {
                    data: hashChangeEvent
                }, false);
            },

            __bindWindowEvent: function() {
                this.setBoundEventHandler(this.__eventHandler.bind(this));
                ac_Element.addEventListener(window, 'hashchange', this.boundEventHandler());
            },

            __unbindWindowEvent: function() {
                ac_Element.removeEventListener(window, 'hashchange', this.boundEventHandler());
                this.setBoundEventHandler(null);
            },

            subscribe: function(callback) {
                if (this.boundEventHandler() === null) {
                    this.__bindWindowEvent();
                }

                ac_NotificationCenter.subscribe(this.notificationString(), callback);
            },

            unsubscribe: function(callback) {
                ac_NotificationCenter.unsubscribe(this.notificationString(), callback);
                if (!ac_NotificationCenter.hasSubscribers(this.notificationString())) {
                    this.__unbindWindowEvent();
                }
            }

        });

        ac_History.HashChange.Event = ac_Class({
            initialize: function(originalEvt) {
                this.event = originalEvt;

                ac_Object.extend(this, originalEvt);

                if (this.hasOwnProperty('oldURL') && this.oldURL.match('#')) {
                    this.oldHash = this.oldURL.split("#")[1];
                }
                if (this.hasOwnProperty('newURL') && this.newURL.match('#')) {
                    this.newHash = this.newURL.split("#")[1];
                }
            }
        });

        module.exports = ac_History;

    }, {
        "./Class": 17,
        "./Element": 21,
        "./NotificationCenter": 36,
        "./Object": 37
    }],
    36: [function(require, module, exports) {
        'use strict';

        var subscribers = {};

        /**
         * Publishes one-to-many notifications; similar to events but do not have to be attached to an element;
         * @name module:ac-base.NotificationCenter
         * @kind namespace
         * @deprecated
         */
        module.exports = /** @lends module:ac-base.NotificationCenter. */ {
            /**
             * @param {String} event Name of the event to publish
             * @param {Object} options Object contains the target and data for this event to pass on
             * @param {Boolean} asynchronous Whether to publish notification immediately (<code>false</code>) or after a timeout (<code>true</code>)
             */
            publish: function(event, options, asynchronous) {
                options = options || {};

                var publish = function() {
                    if ((!subscribers[event]) || subscribers[event].length < 1) {
                        return;
                    }

                    subscribers[event].forEach(function(subscriber) {
                        if (typeof subscriber !== 'undefined') {
                            if (subscriber.target && options.target) {
                                if (subscriber.target === options.target) {
                                    subscriber.callback(options.data);
                                }
                            } else {
                                subscriber.callback(options.data);
                            }
                        }
                    });
                };

                if (asynchronous === true) {
                    window.setTimeout(publish, 10);
                } else {
                    publish();
                }
            },



            /**
             * @param {String} event Name of the event to publish
             * @param {Function} callback Function to run when this notification is published
             * @param {Object} target Object that is expected to publish the notification
             */
            subscribe: function(event, callback, target) {
                if (!subscribers[event]) {
                    subscribers[event] = [];
                }

                subscribers[event].push({
                    callback: callback,
                    target: target
                });
            },



            /**
             * @param {String} event Name of the event to publish
             * @param {Function} callback Function to run when this notification is published
             * @param {Object} target Object that is expected to publish the notification
             */
            unsubscribe: function(event, callback, target) {
                // Clone array so that we don’t modify the original while we are iterating through it
                var subscribersForEventClone = subscribers[event].slice(0);

                subscribers[event].forEach(function(subscriber, i) {
                    if (typeof subscriber !== 'undefined') {
                        if (target) {
                            if (callback === subscriber.callback && subscriber.target === target) {
                                // Modify clone so that index positions in original do not change
                                subscribersForEventClone.splice(i, 1);
                            }
                        } else if (callback === subscriber.callback) {
                            // Modify clone so that index positions in original do not change
                            subscribersForEventClone.splice(i, 1);
                        }
                    }
                });

                // Overwrite original with clone to accept changes
                subscribers[event] = subscribersForEventClone;
            },



            /**
             * @param {String} event Name of the event to check
             * @param {Object} target Object that is expected to publish the notification
             */
            hasSubscribers: function(event, target) {
                // If there are no subscribers to event name
                if ((!subscribers[event]) || subscribers[event].length < 1) {
                    return false;
                }

                if (!target) {
                    return true;
                }

                var i = subscribers[event].length;
                var subscriber;
                while (i--) {
                    subscriber = subscribers[event][i];
                    // If any subscribers have a target and we’re looking to match to a target
                    if (subscriber.target && target) {
                        // And if the target is what we’re trying to match
                        if (subscriber.target === target) {
                            return true;
                        }
                    }
                }

                return false;
            }
        };

    }, {}],
    37: [function(require, module, exports) {
        /*jshint -W040*/
        'use strict';

        var ac_Synthesize = require('./Synthesize');
        var qs = require('qs');

        /**
         * @name module:ac-base.Object
         * @kind namespace
         */
        var ac_Object = {};

        var hasOwnProp = Object.prototype.hasOwnProperty;

        /**
         * Add properties from one object into another. Not a deep copy.
         * @param {Object} destination The object where the properties will end up. Properties in
         * this Object that have the same key as properties in the source object will be overwritten
         * with the source property’s value. If destination is not provided a blank object is created.
         * @param {Object} source The properties to add / overwrite in the destination Object.
         * An infinite number of source paramaters may be passed.
         * @name module:ac-base.Object.extend
         * @kind function
         */
        ac_Object.extend = function extend() {
            var args;
            var dest;

            if (arguments.length < 2) {
                args = [{}, arguments[0]];
            } else {
                args = [].slice.call(arguments);
            }

            dest = args.shift();

            args.forEach(function(source) {
                for (var property in source) {
                    // Anything that does not prototype Object will not have this method
                    if (hasOwnProp.call(source, property)) {
                        dest[property] = source[property];
                    }
                }
            });

            return dest;
        };

        /**
         * Create a new Object that has the same properties as the original.
         * @param {Object} object The Object to make a clone of.
         * @name module:ac-base.Object.clone
         * @kind function
         */
        ac_Object.clone = function clone(object) {
            return ac_Object.extend({}, object);
        };


        if (Object.getPrototypeOf) {
            ac_Object.getPrototypeOf = Object.getPrototypeOf;
        } else {
            if (typeof this.__proto__ === 'object') {
                /** @ignore */
                ac_Object.getPrototypeOf = function getPrototypeOf(obj) {
                    return obj.__proto__;
                };
            } else {
                /**
                 * @name module:ac-base.Object.getPrototypeOf
                 * @kind function
                 */
                ac_Object.getPrototypeOf = function getPrototypeOf(obj) {
                    var constructor = obj.constructor;
                    var oldConstructor;
                    if (hasOwnProp.call(obj, 'constructor')) {
                        oldConstructor = constructor;
                        // reset constructor
                        if (!(delete obj.constructor)) {
                            // can't delete obj.constructor, return null
                            return null;
                        }
                        // get real constructor
                        constructor = obj.constructor;
                        // restore constructor
                        obj.constructor = oldConstructor;
                    }
                    // needed for IE
                    return constructor ? constructor.prototype : null;
                };
            }
        }

        /**
         * Convert object to query string
         * @param {Object} object
         * @returns {String} Returns query string representation of object
         * @name module:ac-base.Object.toQueryParameters
         * @kind function
         */
        ac_Object.toQueryParameters = function(object) {

            if (typeof object !== 'object') {
                throw new TypeError('toQueryParameters error: argument is not an object');
            }

            return qs.stringify(object);
        };

        /**
         * @param {Object} object
         * @returns {Boolean} Return true if and only if object is empty ({}).
         * @name module:ac-base.Object.isEmpty
         * @kind function
         */
        ac_Object.isEmpty = function(object) {
            var prop;

            if (typeof object !== 'object') {
                throw new TypeError('ac-base.Object.isEmpty : Invalid parameter - expected object');
            }

            for (prop in object) {
                if (hasOwnProp.call(object, prop)) {
                    return false;
                }
            }

            return true;
        };

        /**
         * @param {Object} object
         * @name module:ac-base.Object.synthesize
         * @kind function
         */
        ac_Object.synthesize = function(object) {
            if (typeof object === 'object') {
                // Create new instance of module:ac-base.Synthesize and extend it with your object
                ac_Object.extend(object, ac_Object.clone(ac_Synthesize));

                // Synthesize member data in extended object
                object.synthesize();
                return object;
            } else {
                throw new TypeError('Argument supplied was not a valid object.');
            }
        };

        module.exports = ac_Object;

    }, {
        "./Synthesize": 42,
        "qs": 8
    }],
    38: [function(require, module, exports) {
        'use strict';

        /**
         * @name module:ac-base.RegExp
         * @kind namespace
         */
        var ac_RegExp = {};

        /**
         * @param {Object} obj Object to test whether or not it is a Regular Expression
         * @name module:ac-base.RegExp.isRegExp
         * @kind function
         */
        ac_RegExp.isRegExp = function(obj) {
            return window.RegExp ? obj instanceof RegExp : false;
        };

        module.exports = ac_RegExp;

    }, {}],
    39: [function(require, module, exports) {
        'use strict';

        var ac_Class = require('./Class');
        var ac_Object = require('./Object');
        var ac_Element = require('./Element');

        /**
        	@class
        	@name module:ac-base.Registry
        	@version 2.0
        	@author <a href="mailto:kyle_olson@apple.com">Kyle Olson</a>

        	@description The Component registry is used to create useful groups of instances of Components that are relevant to their intended use. (e.g. ‘gallery’ vs. ‘slideshow’ Components)

        	<br /><br />

        	They are also used to match elements to a Component based on the html classname, qualifier function, and the Component hierarchy. The model contains a structural hierarchy of Components, but the actual link is maintained by the ‘parent’ variable in each Component.

        	<br /><br />

        	The registry is also the appropriate place to create a new Component, as it automatically adds it to the model, lookup object, and does some validation.

        	<br /><br />

        	@todo Document the Model hierarchy and specificity (including className vs Qualifier)
        	@todo Document the idea of the _base Component

        	@property {String} prefix Used to match Elements to Components based on the classname attribute.
        	@property {Array} reservedNames List of strings that cannot be used as Component names for any Components this Registry manages.
        	@property {Array} __model Two-dimensional array that keeps track of the index level heirarchy of the Components in this Registry.
        	@property {Object} __lookup Dictionary that keeps track of all Components in the Registry by name.

        	@param {String} prefix This prefix is used for matching based on classname. An Element will match a Component if it has a classname of the <code>prefix</code> appended with the <code>name</code> of the Component.

        	@param {Object} options Optional; Customize the behavior of this Registry.
        */
        var ac_Registry = ac_Class();
        ac_Registry.Component = require('./Registry/Component');

        ac_Registry.prototype = {
            __defaultOptions: {
                contextInherits: [],
                matchCatchAll: false
            },

            /** @inner */
            initialize: function(prefix, options) {
                if (typeof prefix !== 'string') {
                    throw new Error('Prefix not defined for Component Registry');
                }

                // Setup options
                if (typeof options !== 'object') {
                    options = {};
                }
                this._options = ac_Object.extend(ac_Object.clone(this.__defaultOptions), options);

                this._prefix = prefix;
                this._reservedNames = [];
                this.__model = [];
                this.__lookup = {};

                // Synthesize Member Data
                ac_Object.synthesize(this);
            },



            /**
		Add a Component to this registry

		<br /><br />

		Note: You must add <code>_base</code> as the first Component or else it will generate a <code>_base</code> Component automatically, with an empty property dictionary.

		@param {String} name A unique identifier for this Component. Also used for the html classname attribute to decide whether or not a gallery is of this Component (e.g. ‘image’ would be the Component if the classname was ‘autogallery-image’).
		@param {Object} properties Optional; A dictionary of keys and values that this Component’s intended use will understand. These are the properties that will be merged with the parents’ and <code>_base</code> properties to form the properties Object passed to whatever Object uses this Component Registry. The default is empty object, which will inherit all parent properties.
		@param {Function} qualifier Optional; A Function that can be used to determine whether or not an Element is of a certain Component without needing the classname attribute. Should return true or false. Use <code>module:ac-base.Function.emptyFunction</code> to opt out of having a qualifier if you still want to define a <code>parentComponentName</code>. The qualifier Function will be passed the Element and the <code>prefix</code> for the classname attribute, and will be bound such that <code>this</code> will refer to the instance of Component that is attempting to be matched.
		@param {String} parentComponentName Optional; Link this Component to a parent Component, which means this Component will be more specific (higher index level in the model) and will be considered before any Components at a lower index in the model. When asking a Component for its properties, it will extend a clone of its parent’s properties and return the extended Object. The parent will do the same with its parent before returning its properties, all the way to index level 0 (<code>_base</code>).
		@param {Object} context Optional; If you need to store more information in a Component that you will access later, you can put it inside of the context object. An example of when you might use this would be for a delegate that is associated with a Component. This information is presumably used by the Object that deals with the Registry and asks it for matches.

		@returns {module:ac-base.Registry.Component} The Component that was created, or <code>null</code> if something went wrong.
	*/
            addComponent: function(name, properties, qualifier, parentComponentName, context) {
                var parent = null;
                var component;

                // Make sure Component name isn’t reserved
                if (!this.__isReserved(name)) {

                    // The only property that is required to create a new Component is a name
                    if (typeof name === 'string') {

                        // Find the parent Component instance
                        if (typeof parentComponentName === 'string') {
                            parent = this.lookup(parentComponentName);
                        }

                        // <code>_base</code> is the parent if there is no parent defined
                        // Create the <code>_base</code> Component if one doesn’t exist.
                        if (!parent && name !== '_base') {
                            parent = this.lookup('_base') || this.addComponent('_base');
                        }

                        // Warn me if we are overwriting an existing Component
                        if (this.lookup(name)) {
                            throw new Error('Cannot overwrite existing Component: ' + name);
                        }

                        // Context inheritance
                        if (typeof context !== 'object') {
                            context = {};
                        }
                        if (typeof context.inherits === 'undefined' && Array.isArray(this._options.contextInherits)) {
                            context.inherits = this._options.contextInherits;
                        }

                        // Create your new instance of Component and add it to the lookup
                        // Add Component to the lookup table
                        component = this.__lookup[name] = new ac_Registry.Component(name, properties, qualifier, parent, context);

                        // Add this Component to the model
                        this.__addToModel(component);

                        return component;
                    }
                }

                return null;
            },



            /**
		Try to match this element to a Component.

		@param {Element} element Element to test against

		@returns {module:ac-base.Registry.Component} The Component that matches this element first, or <code>null</code> if there is no Component that matches.
	*/
            match: function(element) {
                var component;

                // Try to match against the html classname attribute on the element
                if (component = this.__matchName(element)) {
                    return component;
                }

                // Try to match against the qualifiers
                if (component = this.__matchQualifier(element)) {
                    return component;
                }

                if (this.options()
                    .matchCatchAll === true) {
                    // Catch all (if no other types matched)
                    if (typeof this.__model[1] !== 'undefined') {
                        if (typeof this.__model[1][0] !== 'undefined') {
                            return this.__model[1][0];
                        } else {
                            throw new Error('Catchall Type not defined');
                        }
                    } else {
                        throw new Error('No non-_base types defined at index 1.');
                    }
                }

                return null;
            },



            /**
		@inner
		Test each Component for a match based on html classname attribute (e.g. ‘autogallery-image’);

		@params {Element} element
	*/
            __matchName: function(element) {

                // If we don’t have an element, fail here
                if (!ac_Element.isElement(element)) {
                    return null;
                }

                // Iterate through model from the index with highest specificity/level to lowest
                var i, ii;
                for (i = this.__model.length - 1; i >= 0; i--) {
                    // Iterate through this level if the level is defined
                    // (in chronological order of when the Component was defined)
                    if (Array.isArray(this.__model[i])) {
                        for (ii = this.__model[i].length - 1; ii >= 0; ii--) {

                            // The first Component with a html classname attribute that matches
                            if (ac_Element.hasClassName(element, this._prefix + this.__model[i][ii].name())) {
                                return this.__model[i][ii];
                            }
                        }
                    }
                }

                return null;
            },



            /**
		@inner
		Test each Component for a match based on qualifier function

		@params {Element} element
	*/
            __matchQualifier: function(element) {

                // If we don’t have an element, fail here
                if (!ac_Element.isElement(element)) {
                    return null;
                }

                // Iterate through model from the index with highest specificity/level to lowest
                var i, ii;
                for (i = this.__model.length - 1; i >= 0; i--) {
                    // Iterate through this level if the level is defined
                    // (in chronological order of when the Component was defined)
                    if (Array.isArray(this.__model[i])) {
                        for (ii = this.__model[i].length - 1; ii >= 0; ii--) {

                            // The first Component that passes a qualifier
                            if (typeof this.__model[i][ii].qualifier === 'function') {
                                if (this.__model[i][ii].qualifier.apply(this.__model[i][ii], [element, this._prefix]) === true) {
                                    return this.__model[i][ii];
                                }
                            }
                        }
                    }
                }

                return null;
            },



            /**
		@inner
		Add the Component to the model at its index level

		@params {module:ac-base.Registry.Component} component
	*/
            __addToModel: function(component) {
                if (ac_Registry.Component.isComponent(component)) {
                    // If this is the first Component at this index, create a new Array in the model to store it
                    if (typeof this.__model[component.level()] === 'undefined') {
                        this.__model[component.level()] = [];
                    }

                    // Add Component to the model at your index level
                    this.__model[component.level()].push(component);
                }
            },



            /**
		Lookup a Component by name.

		@param {String} name The name of the Component you are looking for

		@returns {module:ac-base.Registry.Component} The Component with that name, or <code>null</code> if there isn’t one in this Registry.
	*/
            lookup: function(name) {
                if (typeof name === 'string') {
                    if (typeof this.__lookup[name] !== 'undefined') {
                        return this.__lookup[name];
                    }
                }
                return null;
            },



            /**
		Determine whether a Component is registered in this particular instance of <code>module:ac-base.Registry</code>

		@param {module:ac-base.Registry.Component} component The name of the Component you are testing

		@returns {Boolean}
	*/
            hasComponent: function(component) {
                var comparisionComponent;
                // If the component is an object and has a name
                if (typeof component === 'object' && typeof component.name === 'function') {
                    // If a component exists in this Registry by that name
                    if (comparisionComponent = this.lookup(component.name())) {
                        return comparisionComponent === component;
                    }
                }
                return false;
            },

            /**
		Reserve a name so that Components added to this registry after this point cannot be named with that String.

		<br /><br />

		Note: Name cannot be reserved if a Component in this registry has already used that name before you try to reserve it.

		@param {String} name
	*/
            reserveName: function(name) {
                if (typeof name === 'string') {
                    if (this.lookup(name) !== null) {
                        throw new Error('Cannot reserve name: Component with name already exists.');
                    } else if (!this.__isReserved(name)) {
                        this._reservedNames.push(name);
                    }
                } else {
                    throw new Error('Cannot reserve name: Name must be a string');
                }
            },

            /**
		@inner
		Check if a name is reserved.

		@param {String} name
	*/
            __isReserved: function(name) {
                if (typeof name === 'string') {
                    return (this._reservedNames.indexOf(name) !== -1);
                } else {
                    throw new Error('Cannot check if this name is reserved because it is not a String.');
                }
            }
        };

        module.exports = ac_Registry;

    }, {
        "./Class": 17,
        "./Element": 21,
        "./Object": 37,
        "./Registry/Component": 40
    }],
    40: [function(require, module, exports) {
        'use strict';

        var ac_Class = require('../Class');
        var ac_Function = require('../Function');
        var ac_Object = require('../Object');

        /**
         * @version 2.0
         * @author <a href="mailto:kyle_olson@apple.com">Kyle Olson</a>

         * @description A Component is collection of properties in an object that is attributed to a unique identifier. The intended use for this is for creating a set of ‘properties’ to be used for another class or function, but it can really be used for anything similar. A Component is assumed to be associated with an element on the page, which is probably associated with an instance of a class.

         * <br /><br />

         * Components also have the notion of inheritance. You can define a parent Component for any given Component and create a hierarchical link between the two Components. This is used to extend the properties object with all parents to create inheritance within that object when getting the properties.

         * <br /><br />

         * The qualifier is only used externally. A Component registry will use the qualifier to match an element to a Component if it can not already be matched based on an html classname attribute. The qualifier receives the element plus a string, and is expected to return exactly <code>true</code> if that element should be of this Component. Anything else is considered false.  The context can be used to store any other data that you might need related to your Component. Anything can be stored in the context, but some of the values might be considered by other scripts, such as <code>module:ac-base.AutoGallery</code>, to be key values that allow for extra behavior to be attributed to a particular Component.

         * @param {String} name A unique identifier for this Component. Also used for the html classname attribute to decide whether or not a gallery is of this Component (e.g. ‘image’ would be the Component if the classname was ‘autogallery-image’).
         * @param {Object} properties Optional; A dictionary of keys and values that this Component’s intended use will understand. These are the properties that will be merged with the parents’ and <code>_base</code> properties to form the properties Object passed to whatever Object uses this Component Registry. The default is empty object, which will inherit all parent properties.
         * @param {Function} qualifier Optional; A Function that can be used to determine whether or not an Element is of a certain Component without needing the classname attribute. Should return true or false. Use <code>module:ac-base.Function.emptyFunction</code> to opt out of having a qualifier if you still want to define a <code>parentComponentName</code>. The qualifier Function will be passed the Element and the <code>prefix</code> for the classname attribute, and will be bound such that <code>this</code> will refer to the instance of Component that is attempting to be matched.
         * @param {String} parentComponentName Optional; Link this Component to a parent Component, which means this Component will be more specific (higher index level in the model) and will be considered before any Components at a lower index in the model. When asking a Component for its properties, it will extend a clone of its parent’s properties and return the extended Object. The parent will do the same with its parent before returning its properties, all the way to index level 0 (<code>_base</code>).
         * @param {Object} context Optional; If you need to store more information in a Component that you will access later, you can put it inside of the context object. An example of when you might use this would be for a delegate that is associated with a Component. This information is presumably used by the Object that deals with the Registry and asks it for matches.
         * @name module:ac-base.Registry.Component
         * @kind class
         */
        var ac_Registry_Component = ac_Class();
        ac_Registry_Component.prototype = /** @lends @module:ac-base.Registry.Component# */ {

            /** @ignore */
            initialize: function(name, properties, qualifier, parent, context) {
                if (typeof name !== 'string') {
                    throw new Error('Cannot create Component without a name');
                }
                this._name = name;
                this._properties = properties || {};
                this.qualifier = typeof qualifier === 'function' ? qualifier : ac_Function.emptyFunction;
                this._parent = parent;
                this._context = context || {};

                // Synthesize Member Data
                ac_Object.synthesize(this);
            },

            /**
             * @returns {Object} The properties for this Component, extended from the properties of its parents’, all the way back up to _base.
             */
            properties: function() {
                var parentProperties = (typeof this._parent === 'undefined' || this._parent === null) ? {} : this._parent.properties();
                return ac_Object.extend(parentProperties, this._properties);
            },

            /**
             * Getter for the context Dictionary. Use this method to take advantage of context inheritance. Context inheritance means that the Component will use it’s parent’s value for a context key if it does not have something defined on it’s own context for that key. There is no Object extending with Context inheritance.
             * @param {Stirng} key Get the value for this key as it exists in the context object for this Component.
             * @returns The value in the context dictionary for this key, or null if the key does not exist in the context.
             */
            context: function(key) {
                // If we have a value for this key, return it.
                if (this._context[key]) {
                    return this._context[key];

                    // If there is no value for this key in this context, check the parent’s if that key is set to inherit
                } else if (Array.isArray(this._context.inherits) && this._context.inherits.indexOf[key] !== -1) {
                    return (this.parent()) ? this.parent()
                        .context(key) : null;
                }

                return null;
            },

            /**
             * The level is the number of parents a Component has (not including _base) and is factored into the specificity of the Component. A Registry will use this level for the order in which it tries to match.
             * @returns {Integer} The level of this Component
             */
            level: function() {
                // Memoize level as it is not intended to change.
                if (typeof this._level !== 'undefined') {
                    return this._level;
                }

                // _base is a key word that assumes level 0
                if (this._name === '_base') {
                    return 0;

                    // If there is no parent or if the parent is _base, assume level 1
                } else if (typeof this._parent === 'undefined' || this._parent.name() === '_base') {
                    return 1;

                    // Otherwise if there is a parent the level is always 1 more than the parent’s
                } else {
                    return this._parent.level() + 1;
                }
            }
        };

        /**
         * @param {Object} obj Test if the Object is an instance of module:ac-base.Registry.Component
         * @returns {Boolean} Whether or not this Object is an instance of module:ac-base.Registry.Component
         * @name module:ac-base.Registry.Component.isComponent
         * @kind function
         */
        ac_Registry_Component.isComponent = function(obj) {
            return (obj instanceof ac_Registry_Component);
        };

        module.exports = ac_Registry_Component;

    }, {
        "../Class": 17,
        "../Function": 34,
        "../Object": 37
    }],
    41: [function(require, module, exports) {
        'use strict';

        var qs = require('qs');

        /**
         * @name module:ac-base.String
         * @kind namespace
         */
        var ac_String = {};

        /**
         * Returns <code>true</code> or <code>false</code> whether or not the Object is a string
         * @param {Object} object Object to test against
         * @name module:ac-base.String.isString
         * @kind function
         */
        ac_String.isString = function(object) {
            return (typeof object === 'string');
        };

        /**
         * Returns string with dashes remove and characters following dashes in uppercase
         * @param {String} string String to turn into camelCase
         * @name module:ac-base.String.toCamelCase
         * @kind function
         */
        ac_String.toCamelCase = function(string) {
            if (!ac_String.isString(string)) {
                throw new TypeError('Argument must be of type String.');
            }

            return string.replace(/-+(.)?/g, function(match, character) {
                return character ? character.toUpperCase() : '';
            });
        };

        /**
         * @param {String} queryString String to turn into object
         * @name module:ac-base.String.queryStringToObject
         * @kind function
         */
        ac_String.queryStringToObject = function(queryString) {
            // var queryObject = {};
            // var regExp = new RegExp('([^?=&]+)(=([^&]*))?', 'g');

            if (!ac_String.isString(queryString)) {
                throw new TypeError('QueryStringToObject error: argument must be a string');
            }
            return qs.parse(queryString);

            // queryString.replace(
            //  regExp,
            //  function($0, key, $2, value) { queryObject[key] = value; }
            // );

            // return queryObject;
        };

        /**
         * Convert key/value into a query string pair
         * @param {String} key
         * @param {String} value
         * @returns {String} Returns query string representation of a key/value pair
         * @name module:ac-base.String.toQueryPair
         * @kind function
         */
        ac_String.toQueryPair = function(key, value) {

            if (!ac_String.isString(key) || !ac_String.isString(value)) {
                throw new TypeError('toQueryPair error: argument must be a string');
            }

            return encodeURIComponent(key) + '=' + encodeURIComponent(value);
        };

        module.exports = ac_String;

    }, {
        "qs": 8
    }],
    42: [function(require, module, exports) {
        'use strict';

        /**
         * Contains methods that automatically make getter and setter
         * methods for you based on the existence of private variables.

         * <br/><br/>

         * Getter and Setter methods are used to control how external scripts can access your
         * object’s member data. There are any number of reasons why you might want to do this,
         * but just a couple examples are:

         * <ul>
         *     <li>To validate the value you’re trying to set will work for the intended use of your variable.</li>
         *     <li>To create hooks any time a variable changes, in case you need to update something else in your script at that time.</li>
         *     <li>To calculate the value of the variable at the time of getting it (memoization).</li>
         * </ul>

         * <br/>

         * <h2>Naming Convention</h2>
         * We follow the convention from Objective-C for naming getter/setter methods. If your
         * variable is called '_variable', then the getter method would be 'variable' (without
         * the _) and the setter would be 'setVariable' (notice the camelCase).

         * <br/><br/>

         * <h2>Applicable Variables</h2>
         * Variables that are applicable to receive setters/getters are determined
         * by two conditions:

         * <ol>
         *     <li>Its key is preceded by '_' (e.x. _key)</li>
         *     <li>It is not of the type “function”</li>
         * </ol>

         * <br/>

         * A variable preceded by __ (two underscores) is ignored by module:ac-base.Synthesize. This is
         * a convention you can use to make variables that are private, which is to say
         * that they are not intended to be touched or used at all outside of the context
         * of the object that holds it.

         * <br/><br/>

         * <strong>NOTE:</strong> Variables preceded by a single _ are also considered private, which is
         * why you’re creating getter/setter methods in the first place. External scripts are
         * not intended to directly touch those variables. Instead they should access them
         * through the getter/setter methods.

         * <br/><br/>

         * <h2>Custom Getters/Setters</h2>

         * To have custom getter/setter methods for your variables, you simply define them
         * in your object before synthesizing. Before setting either method, module:ac-base.Synthesize
         * will check to see if there is already a value for the variable that follows the
         * naming convention for getters/setters. If there already is something defined, it
         * ignores it.

         * <br/><br/>

         * <strong>NOTE:</strong> Custom getter methods are still expected to return the final value
         * of the variable after it has been gotten.

         * <br/><br/>

         * <strong>NOTE:</strong> If you want neither a getter nor a setter for your variable, consider
         * using the __ syntax described above. Do not provide null/useless values for the
         * getter/setter variable names following the naming convention for your variable.

         * <br/><br/>

         * @example
         * var myObj = module:ac-base.Object.synthesize({
         *     ...
         * });

         * @example
         * var myObj = { ... };
         * module:ac-base.Synthesize.synthesize(myObj);
         */

        /**
         * This is the method you call to synthesize your object. If you have extended
         * your object with module:ac-base.Synthesize, then you do not need to pass any arguments
         * to this method (i.e. if <code>this</code> inside of your method would be the object
         * you're trying to synthesize). Otherwise you can provide an object to it directly.
         *
         * @namespace
         * @name module:ac-base.Synthesize
         * @version 1.1
         * @author <a href="mailto:kyle_olson@apple.com">Kyle Olson</a>
         */
        var ac_Synthesize = {};

        /**
         * Private method for creating a setter when synthesizing a private variable
         * if one doesn’t already exist.
         * @ignore
         */
        function synthesizeGetter(privateVariable, object) {
            // Get name of getter function
            var functionName = privateVariable.slice(1, privateVariable.length);

            // Define getter if not already defined
            if (typeof object[functionName] === 'undefined') {
                object[functionName] = function() {
                    return object[privateVariable];
                };
            }
        }

        /**
         * Private method for creating a setter when synthesizing a private variable
         * if one doesn't already exist.
         * @ignore
         */
        function synthesizeSetter(privateVariable, object) {
            var functionName = privateVariable.slice(1, privateVariable.length);
            functionName = 'set' + functionName.slice(0, 1)
                .toUpperCase() + functionName.slice(1, functionName.length);

            // Define setter if not already defined
            if (typeof object[functionName] === 'undefined') {
                object[functionName] = function(value) {
                    object[privateVariable] = value;
                };
            }
        }

        /**
         * @function
         * @name module:ac-base.Synthesize.synthesize
         * @param {Object} object The object to synthesize (or <code>this</code> by default).
         */
        ac_Synthesize.synthesize = function(object) {
            if (typeof object !== 'object') {
                object = this;
            }

            var privateVariable;

            // Check all properties under object, ignore inherited properties
            for (privateVariable in object) {
                if (object.hasOwnProperty(privateVariable)) {
                    // Check that first character is private variable indicator '_' and not '__'
                    if (privateVariable.charAt(0) === '_' && privateVariable.charAt(1) !== '_') {
                        // Don't create getter/setters for functions
                        if (typeof object[privateVariable] !== 'function') {
                            synthesizeGetter(privateVariable, object);
                            synthesizeSetter(privateVariable, object);
                        }
                    }
                }
            }
        };

        module.exports = ac_Synthesize;

    }, {}],
    43: [function(require, module, exports) {
        'use strict';

        /**
         * @name module:ac-base.Viewport
         * @kind namespace
         */
        var ac_Viewport = {};

        /**
         * @returns {Object} Left scroll offset as x, top scroll offset as y.
         * @name module:ac-base.Viewport.scrollOffsets
         * @kind function
         */
        ac_Viewport.scrollOffsets = function() {
            return {
                x: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
                y: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            };
        };

        /**
         * @returns {Object} Returns window width and height (px).
         * @name module:ac-base.Viewport.dimensions
         * @kind function
         */
        ac_Viewport.dimensions = function() {
            return {
                height: window.innerHeight || document.documentElement.clientHeight,
                width: window.innerWidth || document.documentElement.clientWidth
            };
        };

        module.exports = ac_Viewport;

    }, {}],
    44: [function(require, module, exports) {
        'use strict';

        /**
         * @reference http://en.wikipedia.org/wiki/Adler-32
         * @param {String} string The string you want to get the checksum for.
         * @returns {Integer} Adler-32 checksum for string provided
         * @name module:ac-base.adler32
         * @kind function
         */
        module.exports = function ac_adler32(string) {
            var adlerModulo = 65521;
            var checksum16a = 1;
            var checksum16b = 0;
            var unicodeValueForCurrentChar;
            var i;

            for (i = 0; i < string.length; i += 1) {
                unicodeValueForCurrentChar = string.charCodeAt(i);
                checksum16a = (checksum16a + unicodeValueForCurrentChar) % adlerModulo;
                checksum16b = (checksum16b + checksum16a) % adlerModulo;
            }

            return (checksum16b << 16) | checksum16a;
        };

    }, {}],
    45: [function(require, module, exports) {
        'use strict';

        var ac_Element = require('./Element');
        var ac_Function = require('./Function');

        /**
         * Add multiple event listeners to the same element and bind the callback methods to an object.
         * @param {Object} object What your method is bound to.
         * @param {Element} element The element that we are listening on.
         * @param {Object} handlerDictionary dictionary of event names and functions to run on that event.
         * @name module:ac-base.bindEventListeners
         * @kind function
         * @deprecated
         */
        module.exports = function ac_bindEventListeners(object, element, handlerDictionary) {
            var aKey;

            element = ac_Element.getElementById(element);

            if (!ac_Element.isElement(element)) {
                throw 'Invalid or non-existent element passed to bindEventListeners.';
            }

            for (aKey in handlerDictionary) {
                if (handlerDictionary.hasOwnProperty(aKey)) {
                    var aVal = handlerDictionary[aKey];
                    if (typeof aVal === 'function') {
                        ac_Element.addEventListener(element, aKey, ac_Function.bindAsEventListener(aVal, object));
                    } else if (typeof aVal === 'string') {
                        ac_Element.addEventListener(element, aKey, ac_Function.bindAsEventListener(object[aVal], object));
                    }
                }
            }
        };

    }, {
        "./Element": 21,
        "./Function": 34
    }],
    46: [function(require, module, exports) {
        /*global window, document*/
        'use strict';

        module.exports = {
            console: window.console,
            document: document,
            window: window
        };

    }, {}],
    47: [function(require, module, exports) {
        'use strict';

        var localStorageAvailable = require('./Environment/Feature/localStorageAvailable');
        var debugMessagingKey = 'f7c9180f-5c45-47b4-8de4-428015f096c0';
        var allowDebugMessaging = (localStorageAvailable() && !!window.localStorage.getItem(debugMessagingKey));

        /**
         * If there’s a console, print a message.
         * @param {String} message Error string to print.
         * @name module:ac-base.log
         * @kind function
         */
        module.exports = function ac_log(message) {
            if (window.console && typeof console.log === 'function' && allowDebugMessaging) {
                console.log(message);
            }
        };

    }, {
        "./Environment/Feature/localStorageAvailable": 32
    }],
    48: [function(require, module, exports) {
        'use strict';

        /**
         * Ensure that a given namespace exists.
         * @param {String} namespacePath The namespace to ensure.
         * @name module:ac-base.namespace
         * @kind function
         * @deprecated
         */
        module.exports = function ac_namespace(namespacePath) {
            var i;

            if (!(namespacePath && namespacePath.match && namespacePath.match(/\S/))) {
                throw 'Attempt to create namespace with no name.';
            }

            var splitnamespaceArr = namespacePath.split(/\./);
            var cursor = window;

            for (i = 0; i < splitnamespaceArr.length; i++) {
                cursor[splitnamespaceArr[i]] = cursor[splitnamespaceArr[i]] || {};
                cursor = cursor[splitnamespaceArr[i]];
            }
        };

    }, {}],
    49: [function(require, module, exports) {
        'use strict';

        var ac_String = require('./String');

        /**
         * Returns and object populated from the url query string.
         * If no query string is present, an empty object is returned
         * @returns {Object} key/value mappings to query string
         * @name module:ac-base.queryParameters
         * @kind function
         */
        module.exports = function queryParameters() {
            var object = {};
            var queryString = window.location.toString()
                .split('?')[1];

            if (ac_String.isString(queryString)) {
                object = ac_String.queryStringToObject(queryString);
            }

            return object;
        };

    }, {
        "./String": 41
    }],
    50: [function(require, module, exports) {
        'use strict';

        module.exports = function() {
            var arr = [
                'abbr',
                'article',
                'aside',
                'command',
                'details',
                'figcaption',
                'figure',
                'footer',
                'header',
                'hgroup',
                'mark',
                'meter',
                'nav',
                'output',
                'picture',
                'progress',
                'section',
                'source',
                'summary',
                'time',
                'video'
            ];
            arr.forEach(function(name) {
                document.createElement(name);
            });
        };

    }, {}],
    51: [function(require, module, exports) {
        'use strict';

        module.exports = function(ac_Array, ac_Environment_Browser) {

            /**
             * Decorate module:ac-base.Array.toArray for < IE8
             * The original method returns Array.prototype.slice.call(arrayLike);
             * The Array.prototype.slice method throws an exception when used with
             * nodelists and similar host objects in < IE8.
             * We have to hold IE's hand here to manually produce the array.
             */
            if (ac_Environment_Browser.IE.documentMode <= 8) {
                ac_Array.toArray = function(arrayLike) {
                    var array = [];
                    var len = arrayLike.length;
                    var i;

                    if (len > 0) {
                        for (i = 0; i < len; i += 1) {
                            array.push(arrayLike[i]);
                        }
                    }
                    return array;
                };
            }
        };

    }, {}],
    52: [function(require, module, exports) {
        'use strict';

        var ac_Array = require('../../Array');
        var ac_sizzle = require('../../vendor/Sizzle');

        module.exports = function(ac_Element, ac_Environment_Browser, sizzle) {

            var documentMode = ac_Environment_Browser.IE.documentMode;

            sizzle = sizzle || ac_sizzle;

            if (documentMode < 8) {
                /**
                 * module:ac-base.Element.selectAll shim for IE < 8
                 * Fallback to sizzle needed due to lack of native querySelectorAll
                 */
                ac_Element.selectAll = function(selector, context) {
                    if (typeof context === 'undefined') {
                        context = document;
                    } else if (!ac_Element.isElement(context) && context.nodeType !== 9 && context.nodeType !== 11) {
                        throw new TypeError('ac-base.Element.selectAll: Invalid context nodeType');
                    }
                    if (typeof selector !== 'string') {
                        throw new TypeError('ac-base.Element.selectAll: Selector must be a string');
                    }

                    // if context is document fragment
                    if (context.nodeType === 11) {
                        var matches = [];
                        var childMatches;
                        ac_Array.toArray(context.childNodes)
                            .forEach(function(node) {
                                // check the child node
                                if (sizzle.matchesSelector(node, selector)) {
                                    matches.push(node);
                                }
                                // check the child node's children
                                if (childMatches = sizzle(selector, node)
                                    .length > 0) {
                                    matches.concat(childMatches);
                                }
                            });
                        return matches;
                    }
                    return sizzle(selector, context);
                };

            } else if (documentMode < 9) {
                /**
                 * module:ac-base.Element.selectAll shim for IE 8
                 * Use native querySelectorAll but convert to array with shim
                 */
                ac_Element.selectAll = function(selector, context) {
                    if (typeof context === 'undefined') {
                        context = document;
                    } else if (!ac_Element.isElement(context) && context.nodeType !== 9 && context.nodeType !== 11) {
                        throw new TypeError('ac-base.Element.selectAll: Invalid context nodeType');
                    }
                    if (typeof selector !== 'string') {
                        throw new TypeError('ac-base.Element.selectAll: Selector must be a string');
                    }
                    return ac_Array.toArray(context.querySelectorAll(selector));
                };
            }

            /**
             * module:ac-base.Element.select shim for IE < 8
             * Fallback to sizzle needed due to lack of native querySelectorAll
             */
            if (documentMode < 8) {
                ac_Element.select = function(selector, context) {
                    if (typeof context === 'undefined') {
                        context = document;
                    } else if (!ac_Element.isElement(context) && context.nodeType !== 9 && context.nodeType !== 11) {
                        throw new TypeError('ac-base.Element.select: Invalid context nodeType');
                    }
                    if (typeof selector !== 'string') {
                        throw new TypeError('ac-base.Element.select: Selector must be a string');
                    }
                    // if context is document fragment
                    if (context.nodeType === 11) {
                        var match = [];
                        var childMatches;
                        ac_Array.toArray(context.childNodes)
                            .some(function(node) {
                                // if the child node matches, return that, else look for a match in its children
                                if (sizzle.matchesSelector(node, selector)) {
                                    match = node;
                                    return true;
                                } else if (childMatches = sizzle(selector, node)
                                    .length > 0) {
                                    match = childMatches[0];
                                    return true;
                                }
                            });
                        return match;
                    }
                    return sizzle(selector, context)[0];
                };
            }

            /**
             * IE 9 and below account for the absence of Element.prototype.matches
             * and/or Element.prototype.msMatchesSelector.
             */
            if (documentMode < 9) {

                ac_Element.matchesSelector = function(element, selector) {
                    return sizzle.matchesSelector(element, selector);
                };

                ac_Element.filterBySelector = function(elements, selector) {
                    return sizzle.matches(selector, elements);
                };
            }

            /**
             * IE 8 and below getStyle shim accounts for the absence of getComputedStyle as well as IE's
             * currentStyle object's lack of support for background, font and border css shorthand props.
             */
            if (documentMode < 9 && typeof window.getComputedStyle !== 'function') {
                ac_Element.getStyle = function(element, style, css) {
                    element = ac_Element.getElementById(element);
                    var alphaFilter;
                    var value;

                    css = css || element.currentStyle;
                    if (css) {
                        style = style.replace(/-(\w)/g, ac_Element.setStyle.__camelCaseReplace);

                        // IE's currentStyle uses styleFloat instead of float
                        style = style === 'float' ? 'styleFloat' : style;

                        // Handle opacity
                        if (style === 'opacity') {
                            alphaFilter = element.filters['DXImageTransform.Microsoft.Alpha'] || element.filters.Alpha;
                            if (alphaFilter) {
                                return parseFloat(alphaFilter.Opacity / 100);
                            }
                            return 1.0;
                        }

                        value = css[style] || null;
                        return value === 'auto' ? null : value;
                    }
                };
            }

            /**
             * Shimming the __setStyle private method of module:ac-base.Element.setStyle. IE requires opacity to be
             * set via the proprietary IE filters. The shimmed __setStyle method calls on the IE only
             * private method module:ac-base.Element.setStyle.__setOpacity to handle this task. If the style being
             * set is not opacity, __setStyle defers back to an original stashed version of __setStyle
             * to handle the task. Referred to here as module:ac-base.Element.setStyle.__superSetStyle.
             */
            if (documentMode <= 8) {

                ac_Element.setStyle.__superSetStyle = ac_Element.setStyle.__setStyle;

                ac_Element.setStyle.__setStyle = function(element, camelCaseProp, stylesObj, stylesValue) {
                    if (camelCaseProp === 'opacity') {
                        ac_Element.setStyle.__setOpacity(element, stylesValue);
                        // else do it the easy way
                    } else {
                        ac_Element.setStyle.__superSetStyle(element, camelCaseProp, stylesObj, stylesValue);
                    }
                };

                ac_Element.setStyle.__setOpacity = function(element, value) {
                    value = (value > 1) ? 1 : ((value < 0.00001) ? 0 : value) * 100;
                    var alphaFilter = element.filters['DXImageTransform.Microsoft.Alpha'] || element.filters.Alpha;

                    if (alphaFilter) {
                        // Favor modifying existing filters via the filters collection if already set.
                        alphaFilter.Opacity = value;
                    } else {
                        // Don't clobber existing filter string if any
                        element.style.filter += ' progid:DXImageTransform.Microsoft.Alpha(Opacity=' + value + ')';
                    }
                };
            }

            /**
             * Rudimentary shim for getBoundingClientRect in IE < 8.
             * getBoundingClientRect is available in IE8 even with documentMode as IE7.
             * It is not available in vanilla IE7.
             */
            if (ac_Environment_Browser.version < 8) {
                ac_Element.getBoundingBox = function(element) {
                    element = ac_Element.getElementById(element);
                    var left = element.offsetLeft;
                    var top = element.offsetTop;
                    var w = element.offsetWidth;
                    var h = element.offsetHeight;
                    return {
                        top: top,
                        right: left + w,
                        bottom: top + h,
                        left: left,
                        width: w,
                        height: h
                    };
                };
            }
        };

    }, {
        "../../Array": 15,
        "../../vendor/Sizzle": 56
    }],
    53: [function(require, module, exports) {
        'use strict';

        module.exports = function(ac_Environment_Browser) {

            /**
             * Function to detect what version or document/standards mode IE is rendering the page as.
             * Accounts for later versions of IE rendering pages in earlier standards modes. E.G. it is
             * possible to set the X-UA-Compatible tag to tell IE9 to render pages in IE7 standards mode.
             *
             * Based on Microsoft test
             * @see http://msdn.microsoft.com/en-us/library/jj676915(v=vs.85).aspx
             */
            function __getIEDocumentMode() {
                var ie;

                // IE8 or later
                if (document.documentMode) {
                    ie = parseInt(document.documentMode, 10);
                    // IE 5-7
                } else {
                    // Assume quirks mode unless proven otherwise
                    ie = 5;
                    if (document.compatMode) {
                        // standards mode
                        if (document.compatMode === "CSS1Compat") {
                            ie = 7;
                        }
                    }
                    // There is no test for IE6 standards mode because that mode
                    // was replaced by IE7 standards mode; there is no emulation.
                }

                return ie;
            }

            ac_Environment_Browser.IE = {
                documentMode: __getIEDocumentMode()
            };
        };

    }, {}],
    54: [function(require, module, exports) {
        'use strict';

        var ac_Element = require('../../Element');

        /*
         * Used by the nonClickableImageBooster method
         * TODO: Investigate at which IE version hasLayout becomes moot
         * Given an element and a specific ancestor element, search all elements in the ancestor
         * chain up to and including the specified ancestor element for the hasLayout property.
         * Returns true if any element in the chain has hasLayout.
         */
        /** @ignore */
        function ancestorHasLayout(element, limitElement) {
            var hasLayout = false;
            var currentElement = element.parentNode;
            while (currentElement !== limitElement) {
                if (currentElement) {
                    if (currentElement.currentStyle.hasLayout) {
                        hasLayout = true;
                        break;
                    }
                    currentElement = currentElement.parentNode;
                }
            }
            return hasLayout;
        }

        /**
         * Fixing the non-clickable image bug for IE versions and compatibliity modes <= 7
         *
         * This bug occurs when an image is the grandchild of an <a> and the image’s parent node’s
         * hasLayout IE property is true. The image becomes non-clickable while the rest of the
         * area around the image, inside of the <a> remains clickable.
         *
         * See http://www.brunildo.org/test/IEaL.html for an example.
         */
        module.exports = function() {
            var parent;
            var anchor;
            var booster;
            var aPosition;
            var zIndices = [];
            var zIdx;
            // 1x1 transparent gif
            // @see http://css-tricks.com/snippets/html/base64-encode-of-1x1px-transparent-gif/
            // @see http://stackoverflow.com/questions/6018611/smallest-data-uri-image-possible-for-a-transparent-image
            // IE7 does not support data uri
            // url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)
            var baseUri = (location.protocol === 'https:' ? 'https://ssl' : 'http://images') + '.apple.com';
            var g = 'g';
            var backgroundImage = 'url(' + baseUri + '/global/elements/blank.' + g + 'if)';

            // Eligible elements are images that are grandchildren of <a>'s
            ac_Element.selectAll('a > * img')
                .forEach(function(img) {
                    parent = img.parentNode;
                    anchor = ac_Element.ancestor(img, 'a');

                    // The bug is triggered when an image's ancestor node has layout
                    if (ancestorHasLayout(img, anchor) && img.height > 0 && img.width > 0) {

                        // We only need one booster per anchor
                        if (!ac_Element.select('ieclickbooster', anchor)) {
                            booster = document.createElement('ieclickbooster');
                            aPosition = ac_Element.getStyle(anchor, 'position');

                            if (aPosition === 'static') {
                                ac_Element.setStyle(anchor, {
                                    position: 'relative'
                                });
                            }

                            // Collect zIndices for all of the anchor's direct children
                            ac_Element.selectAll('> *', anchor)
                                .forEach(function(element) {
                                    var elementZidx = parseInt(element.currentStyle.zIndex, 10);
                                    if (elementZidx > 0) {
                                        zIndices.push(elementZidx);
                                    }
                                });
                            zIndices.sort(function(a, b) {
                                return b - a;
                            });

                            zIdx = zIndices[0] ? zIndices[0].toString() : '1';

                            ac_Element.insert(booster, anchor);

                            ac_Element.setStyle(booster, {
                                display: 'block',
                                position: 'absolute',
                                top: '0',
                                bottom: '0',
                                left: '0',
                                right: '0',
                                background: backgroundImage,
                                cursor: 'pointer',
                                zIndex: zIdx
                            });
                        }
                    }
                });
        };

    }, {
        "../../Element": 21
    }],
    55: [function(require, module, exports) {
        'use strict';

        var uid = 0;

        /**
         * Return an integer which is incremented each time; used to make HTML IDs unique.
         * @returns {Integer}
         * @name module:ac-base.uid
         * @kind function
         */
        module.exports = function ac_uid() {
            return uid++;
        };

    }, {}],
    56: [function(require, module, exports) {
        /*!
         * Sizzle CSS Selector Engine
         *  Copyright 2012, The Dojo Foundation
         *  Released under the MIT, BSD, and GPL Licenses.
         *  More information: http://sizzlejs.com/
         */
        /* istanbul ignore next */
        (function(window, undefined) {

            var cachedruns,
                dirruns,
                sortOrder,
                siblingCheck,
                assertGetIdNotName,

                document = window.document,
                docElem = document.documentElement,

                strundefined = "undefined",
                hasDuplicate = false,
                baseHasDuplicate = true,
                done = 0,
                slice = [].slice,
                push = [].push,

                expando = ("sizcache" + Math.random())
                .replace(".", ""),

                // Regex

                // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
                whitespace = "[\\x20\\t\\r\\n\\f]",
                // http://www.w3.org/TR/css3-syntax/#characters
                characterEncoding = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])",

                // Loosely modeled on Javascript identifier characters
                identifier = "(?:[\\w#_-]|[^\\x00-\\xa0]|\\\\.)",
                // Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
                operators = "([*^$|!~]?=)",
                attributes = "\\[" + whitespace + "*(" + characterEncoding + "+)" + whitespace +
                "*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + "+)|)|)" + whitespace + "*\\]",
                pseudos = ":(" + characterEncoding + "+)(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|(.*))\\)|)",
                pos = ":(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)",
                combinators = whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*",
                groups = "(?=[^\\x20\\t\\r\\n\\f])(?:\\\\.|" + attributes + "|" + pseudos.replace(2, 7) + "|[^\\\\(),])+",

                // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
                rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),

                rcombinators = new RegExp("^" + combinators),

                // All simple (non-comma) selectors, excluding insignifant trailing whitespace
                rgroups = new RegExp(groups + "?(?=" + whitespace + "*,|$)", "g"),

                // A selector, or everything after leading whitespace
                // Optionally followed in either case by a ")" for terminating sub-selectors
                rselector = new RegExp("^(?:(?!,)(?:(?:^|,)" + whitespace + "*" + groups + ")*?|" + whitespace + "*(.*?))(\\)|$)"),

                // All combinators and selector components (attribute test, tag, pseudo, etc.), the latter appearing together when consecutive
                rtokens = new RegExp(groups.slice(19, -6) + "\\x20\\t\\r\\n\\f>+~])+|" + combinators, "g"),

                // Easily-parseable/retrievable ID or TAG or CLASS selectors
                rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,

                rsibling = /[\x20\t\r\n\f]*[+~]/,
                rendsWithNot = /:not\($/,

                rheader = /h\d/i,
                rinputs = /input|select|textarea|button/i,

                rbackslash = /\\(?!\\)/g,

                matchExpr = {
                    "ID": new RegExp("^#(" + characterEncoding + "+)"),
                    "CLASS": new RegExp("^\\.(" + characterEncoding + "+)"),
                    "NAME": new RegExp("^\\[name=['\"]?(" + characterEncoding + "+)['\"]?\\]"),
                    "TAG": new RegExp("^(" + characterEncoding.replace("[-", "[-\\*") + "+)"),
                    "ATTR": new RegExp("^" + attributes),
                    "PSEUDO": new RegExp("^" + pseudos),
                    "CHILD": new RegExp("^:(only|nth|last|first)-child(?:\\(" + whitespace +
                        "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
                        "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                    "POS": new RegExp(pos, "ig"),
                    // For use in libraries implementing .is()
                    "needsContext": new RegExp("^" + whitespace + "*[>+~]|" + pos, "i")
                },

                classCache = {},
                cachedClasses = [],
                compilerCache = {},
                cachedSelectors = [],

                // Mark a function for use in filtering
                markFunction = function(fn) {
                    fn.sizzleFilter = true;
                    return fn;
                },

                // Returns a function to use in pseudos for input types
                createInputFunction = function(type) {
                    return function(elem) {
                        // Check the input's nodeName and type
                        return elem.nodeName.toLowerCase() === "input" && elem.type === type;
                    };
                },

                // Returns a function to use in pseudos for buttons
                createButtonFunction = function(type) {
                    return function(elem) {
                        var name = elem.nodeName.toLowerCase();
                        return (name === "input" || name === "button") && elem.type === type;
                    };
                },

                // Used for testing something on an element
                assert = function(fn) {
                    var pass = false,
                        div = document.createElement("div");
                    try {
                        pass = fn(div);
                    } catch (e) {}
                    // release memory in IE
                    div = null;
                    return pass;
                },

                // Check if attributes should be retrieved by attribute nodes
                assertAttributes = assert(function(div) {
                    div.innerHTML = "<select></select>";
                    var type = typeof div.lastChild.getAttribute("multiple");
                    // IE8 returns a string for some attributes even when not present
                    return type !== "boolean" && type !== "string";
                }),

                // Check if getElementById returns elements by name
                // Check if getElementsByName privileges form controls or returns elements by ID
                assertUsableName = assert(function(div) {
                    // Inject content
                    div.id = expando + 0;
                    div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
                    docElem.insertBefore(div, docElem.firstChild);

                    // Test
                    var pass = document.getElementsByName &&
                        // buggy browsers will return fewer than the correct 2
                        document.getElementsByName(expando)
                        .length ===
                        // buggy browsers will return more than the correct 0
                        2 + document.getElementsByName(expando + 0)
                        .length;
                    assertGetIdNotName = !document.getElementById(expando);

                    // Cleanup
                    docElem.removeChild(div);

                    return pass;
                }),

                // Check if the browser returns only elements
                // when doing getElementsByTagName("*")
                assertTagNameNoComments = assert(function(div) {
                    div.appendChild(document.createComment(""));
                    return div.getElementsByTagName("*")
                        .length === 0;
                }),

                // Check if getAttribute returns normalized href attributes
                assertHrefNotNormalized = assert(function(div) {
                    div.innerHTML = "<a href='#'></a>";
                    return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
                        div.firstChild.getAttribute("href") === "#";
                }),

                // Check if getElementsByClassName can be trusted
                assertUsableClassName = assert(function(div) {
                    // Opera can't find a second classname (in 9.6)
                    div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
                    if (!div.getElementsByClassName || div.getElementsByClassName("e")
                        .length === 0) {
                        return false;
                    }

                    // Safari caches class attributes, doesn't catch changes (in 3.2)
                    div.lastChild.className = "e";
                    return div.getElementsByClassName("e")
                        .length !== 1;
                });

            var Sizzle = function(selector, context, results, seed) {
                results = results || [];
                context = context || document;
                var match, elem, xml, m,
                    nodeType = context.nodeType;

                if (nodeType !== 1 && nodeType !== 9) {
                    return [];
                }

                if (!selector || typeof selector !== "string") {
                    return results;
                }

                xml = isXML(context);

                if (!xml && !seed) {
                    if ((match = rquickExpr.exec(selector))) {
                        // Speed-up: Sizzle("#ID")
                        if ((m = match[1])) {
                            if (nodeType === 9) {
                                elem = context.getElementById(m);
                                // Check parentNode to catch when Blackberry 4.6 returns
                                // nodes that are no longer in the document #6963
                                if (elem && elem.parentNode) {
                                    // Handle the case where IE, Opera, and Webkit return items
                                    // by name instead of ID
                                    if (elem.id === m) {
                                        results.push(elem);
                                        return results;
                                    }
                                } else {
                                    return results;
                                }
                            } else {
                                // Context is not a document
                                if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) &&
                                    contains(context, elem) && elem.id === m) {
                                    results.push(elem);
                                    return results;
                                }
                            }

                            // Speed-up: Sizzle("TAG")
                        } else if (match[2]) {
                            push.apply(results, slice.call(context.getElementsByTagName(selector), 0));
                            return results;

                            // Speed-up: Sizzle(".CLASS")
                        } else if ((m = match[3]) && assertUsableClassName && context.getElementsByClassName) {
                            push.apply(results, slice.call(context.getElementsByClassName(m), 0));
                            return results;
                        }
                    }
                }

                // All others
                return select(selector, context, results, seed, xml);
            };

            var Expr = Sizzle.selectors = {

                // Can be adjusted by the user
                cacheLength: 50,

                match: matchExpr,

                order: ["ID", "TAG"],

                attrHandle: {},

                createPseudo: markFunction,

                find: {
                    "ID": assertGetIdNotName ?
                        function(id, context, xml) {
                            if (typeof context.getElementById !== strundefined && !xml) {
                                var m = context.getElementById(id);
                                // Check parentNode to catch when Blackberry 4.6 returns
                                // nodes that are no longer in the document #6963
                                return m && m.parentNode ? [m] : [];
                            }
                        } : function(id, context, xml) {
                            if (typeof context.getElementById !== strundefined && !xml) {
                                var m = context.getElementById(id);

                                return m ?
                                    m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id")
                                    .value === id ? [m] :
                                    undefined : [];
                            }
                        },

                    "TAG": assertTagNameNoComments ?
                        function(tag, context) {
                            if (typeof context.getElementsByTagName !== strundefined) {
                                return context.getElementsByTagName(tag);
                            }
                        } : function(tag, context) {
                            var results = context.getElementsByTagName(tag);

                            // Filter out possible comments
                            if (tag === "*") {
                                var elem,
                                    tmp = [],
                                    i = 0;

                                for (;
                                    (elem = results[i]); i++) {
                                    if (elem.nodeType === 1) {
                                        tmp.push(elem);
                                    }
                                }

                                return tmp;
                            }
                            return results;
                        }
                },

                relative: {
                    ">": {
                        dir: "parentNode",
                        first: true
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: true
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },

                preFilter: {
                    "ATTR": function(match) {
                        match[1] = match[1].replace(rbackslash, "");

                        // Move the given value to match[3] whether quoted or unquoted
                        match[3] = (match[4] || match[5] || "")
                            .replace(rbackslash, "");

                        if (match[2] === "~=") {
                            match[3] = " " + match[3] + " ";
                        }

                        return match.slice(0, 4);
                    },

                    "CHILD": function(match) {
                        /* matches from matchExpr.CHILD
				1 type (only|nth|...)
				2 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				3 xn-component of xn+y argument ([+-]?\d*n|)
				4 sign of xn-component
				5 x of xn-component
				6 sign of y-component
				7 y of y-component
			*/
                        match[1] = match[1].toLowerCase();

                        if (match[1] === "nth") {
                            // nth-child requires argument
                            if (!match[2]) {
                                Sizzle.error(match[0]);
                            }

                            // numeric x and y parameters for Expr.filter.CHILD
                            // remember that false/true cast respectively to 0/1
                            match[3] = +(match[3] ? match[4] + (match[5] || 1) : 2 * (match[2] === "even" || match[2] === "odd"));
                            match[4] = +((match[6] + match[7]) || match[2] === "odd");

                            // other types prohibit arguments
                        } else if (match[2]) {
                            Sizzle.error(match[0]);
                        }

                        return match;
                    },

                    "PSEUDO": function(match) {
                        var argument,
                            unquoted = match[4];

                        if (matchExpr["CHILD"].test(match[0])) {
                            return null;
                        }

                        // Relinquish our claim on characters in `unquoted` from a closing parenthesis on
                        if (unquoted && (argument = rselector.exec(unquoted)) && argument.pop()) {

                            match[0] = match[0].slice(0, argument[0].length - unquoted.length - 1);
                            unquoted = argument[0].slice(0, -1);
                        }

                        // Quoted or unquoted, we have the full argument
                        // Return only captures needed by the pseudo filter method (type and argument)
                        match.splice(2, 3, unquoted || match[3]);
                        return match;
                    }
                },

                filter: {
                    "ID": assertGetIdNotName ?
                        function(id) {
                            id = id.replace(rbackslash, "");
                            return function(elem) {
                                return elem.getAttribute("id") === id;
                            };
                        } : function(id) {
                            id = id.replace(rbackslash, "");
                            return function(elem) {
                                var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                                return node && node.value === id;
                            };
                        },

                    "TAG": function(nodeName) {
                        if (nodeName === "*") {
                            return function() {
                                return true;
                            };
                        }
                        nodeName = nodeName.replace(rbackslash, "")
                            .toLowerCase();

                        return function(elem) {
                            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                        };
                    },

                    "CLASS": function(className) {
                        var pattern = classCache[className];
                        if (!pattern) {
                            pattern = classCache[className] = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)");
                            cachedClasses.push(className);
                            // Avoid too large of a cache
                            if (cachedClasses.length > Expr.cacheLength) {
                                delete classCache[cachedClasses.shift()];
                            }
                        }
                        return function(elem) {
                            return pattern.test(elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "");
                        };
                    },

                    "ATTR": function(name, operator, check) {
                        if (!operator) {
                            return function(elem) {
                                return Sizzle.attr(elem, name) != null;
                            };
                        }

                        return function(elem) {
                            var result = Sizzle.attr(elem, name),
                                value = result + "";

                            if (result == null) {
                                return operator === "!=";
                            }

                            switch (operator) {
                                case "=":
                                    return value === check;
                                case "!=":
                                    return value !== check;
                                case "^=":
                                    return check && value.indexOf(check) === 0;
                                case "*=":
                                    return check && value.indexOf(check) > -1;
                                case "$=":
                                    return check && value.substr(value.length - check.length) === check;
                                case "~=":
                                    return (" " + value + " ")
                                        .indexOf(check) > -1;
                                case "|=":
                                    return value === check || value.substr(0, check.length + 1) === check + "-";
                            }
                        };
                    },

                    "CHILD": function(type, argument, first, last) {

                        if (type === "nth") {
                            var doneName = done++;

                            return function(elem) {
                                var parent, diff,
                                    count = 0,
                                    node = elem;

                                if (first === 1 && last === 0) {
                                    return true;
                                }

                                parent = elem.parentNode;

                                if (parent && (parent[expando] !== doneName || !elem.sizset)) {
                                    for (node = parent.firstChild; node; node = node.nextSibling) {
                                        if (node.nodeType === 1) {
                                            node.sizset = ++count;
                                            if (node === elem) {
                                                break;
                                            }
                                        }
                                    }

                                    parent[expando] = doneName;
                                }

                                diff = elem.sizset - last;

                                if (first === 0) {
                                    return diff === 0;

                                } else {
                                    return (diff % first === 0 && diff / first >= 0);
                                }
                            };
                        }

                        return function(elem) {
                            var node = elem;

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

                                    /* falls through */
                                case "last":
                                    while ((node = node.nextSibling)) {
                                        if (node.nodeType === 1) {
                                            return false;
                                        }
                                    }

                                    return true;
                            }
                        };
                    },

                    "PSEUDO": function(pseudo, argument, context, xml) {
                        // pseudo-class names are case-insensitive
                        // http://www.w3.org/TR/selectors/#pseudo-classes
                        // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
                        var fn = Expr.pseudos[pseudo] || Expr.pseudos[pseudo.toLowerCase()];

                        if (!fn) {
                            Sizzle.error("unsupported pseudo: " + pseudo);
                        }

                        // The user may set fn.sizzleFilter to indicate
                        // that arguments are needed to create the filter function
                        // just as Sizzle does
                        if (!fn.sizzleFilter) {
                            return fn;
                        }

                        return fn(argument, context, xml);
                    }
                },

                pseudos: {
                    "not": markFunction(function(selector, context, xml) {
                        // Trim the selector passed to compile
                        // to avoid treating leading and trailing
                        // spaces as combinators
                        var matcher = compile(selector.replace(rtrim, "$1"), context, xml);
                        return function(elem) {
                            return !matcher(elem);
                        };
                    }),

                    "enabled": function(elem) {
                        return elem.disabled === false;
                    },

                    "disabled": function(elem) {
                        return elem.disabled === true;
                    },

                    "checked": function(elem) {
                        // In CSS3, :checked should return both checked and selected elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        var nodeName = elem.nodeName.toLowerCase();
                        return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
                    },

                    "selected": function(elem) {
                        // Accessing this property makes selected-by-default
                        // options in Safari work properly
                        if (elem.parentNode) {
                            elem.parentNode.selectedIndex;
                        }

                        return elem.selected === true;
                    },

                    "parent": function(elem) {
                        return !!elem.firstChild;
                    },

                    "empty": function(elem) {
                        return !elem.firstChild;
                    },

                    "contains": markFunction(function(text) {
                        return function(elem) {
                            return (elem.textContent || elem.innerText || getText(elem))
                                .indexOf(text) > -1;
                        };
                    }),

                    "has": markFunction(function(selector) {
                        return function(elem) {
                            return Sizzle(selector, elem)
                                .length > 0;
                        };
                    }),

                    "header": function(elem) {
                        return rheader.test(elem.nodeName);
                    },

                    "text": function(elem) {
                        var type, attr;
                        // IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
                        // use getAttribute instead to test this case
                        return elem.nodeName.toLowerCase() === "input" &&
                            (type = elem.type) === "text" &&
                            ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === type);
                    },

                    // Input types
                    "radio": createInputFunction("radio"),
                    "checkbox": createInputFunction("checkbox"),
                    "file": createInputFunction("file"),
                    "password": createInputFunction("password"),
                    "image": createInputFunction("image"),

                    "submit": createButtonFunction("submit"),
                    "reset": createButtonFunction("reset"),

                    "button": function(elem) {
                        var name = elem.nodeName.toLowerCase();
                        return name === "input" && elem.type === "button" || name === "button";
                    },

                    "input": function(elem) {
                        return rinputs.test(elem.nodeName);
                    },

                    "focus": function(elem) {
                        var doc = elem.ownerDocument;
                        return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href);
                    },

                    "active": function(elem) {
                        return elem === elem.ownerDocument.activeElement;
                    }
                },

                setFilters: {
                    "first": function(elements, argument, not) {
                        return not ? elements.slice(1) : [elements[0]];
                    },

                    "last": function(elements, argument, not) {
                        var elem = elements.pop();
                        return not ? elements : [elem];
                    },

                    "even": function(elements, argument, not) {
                        var results = [],
                            i = not ? 1 : 0,
                            len = elements.length;
                        for (; i < len; i = i + 2) {
                            results.push(elements[i]);
                        }
                        return results;
                    },

                    "odd": function(elements, argument, not) {
                        var results = [],
                            i = not ? 0 : 1,
                            len = elements.length;
                        for (; i < len; i = i + 2) {
                            results.push(elements[i]);
                        }
                        return results;
                    },

                    "lt": function(elements, argument, not) {
                        return not ? elements.slice(+argument) : elements.slice(0, +argument);
                    },

                    "gt": function(elements, argument, not) {
                        return not ? elements.slice(0, +argument + 1) : elements.slice(+argument + 1);
                    },

                    "eq": function(elements, argument, not) {
                        var elem = elements.splice(+argument, 1);
                        return not ? elements : elem;
                    }
                }
            };

            // Deprecated
            Expr.setFilters["nth"] = Expr.setFilters["eq"];

            // Back-compat
            Expr.filters = Expr.pseudos;

            // IE6/7 return a modified href
            if (!assertHrefNotNormalized) {
                Expr.attrHandle = {
                    "href": function(elem) {
                        return elem.getAttribute("href", 2);
                    },
                    "type": function(elem) {
                        return elem.getAttribute("type");
                    }
                };
            }

            // Add getElementsByName if usable
            if (assertUsableName) {
                Expr.order.push("NAME");
                Expr.find["NAME"] = function(name, context) {
                    if (typeof context.getElementsByName !== strundefined) {
                        return context.getElementsByName(name);
                    }
                };
            }

            // Add getElementsByClassName if usable
            if (assertUsableClassName) {
                Expr.order.splice(1, 0, "CLASS");
                Expr.find["CLASS"] = function(className, context, xml) {
                    if (typeof context.getElementsByClassName !== strundefined && !xml) {
                        return context.getElementsByClassName(className);
                    }
                };
            }

            // If slice is not available, provide a backup
            try {
                slice.call(docElem.childNodes, 0)[0].nodeType;
            } catch (e) {
                slice = function(i) {
                    var elem, results = [];
                    for (;
                        (elem = this[i]); i++) {
                        results.push(elem);
                    }
                    return results;
                };
            }

            var isXML = Sizzle.isXML = function(elem) {
                // documentElement is verified for cases where it doesn't yet exist
                // (such as loading iframes in IE - #4833)
                var documentElement = elem && (elem.ownerDocument || elem)
                    .documentElement;
                return documentElement ? documentElement.nodeName !== "HTML" : false;
            };

            // Element contains another
            var contains = Sizzle.contains = docElem.compareDocumentPosition ?
                function(a, b) {
                    return !!(a.compareDocumentPosition(b) & 16);
                } :
                docElem.contains ?
                function(a, b) {
                    var adown = a.nodeType === 9 ? a.documentElement : a,
                        bup = b.parentNode;
                    return a === bup || !!(bup && bup.nodeType === 1 && adown.contains && adown.contains(bup));
                } :
                function(a, b) {
                    while ((b = b.parentNode)) {
                        if (b === a) {
                            return true;
                        }
                    }
                    return false;
                };

            /**
             * Utility function for retrieving the text value of an array of DOM nodes
             * @param {Array|Element} elem
             */
            var getText = Sizzle.getText = function(elem) {
                var node,
                    ret = "",
                    i = 0,
                    nodeType = elem.nodeType;

                if (nodeType) {
                    if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                        // Use textContent for elements
                        // innerText usage removed for consistency of new lines (see #11153)
                        if (typeof elem.textContent === "string") {
                            return elem.textContent;
                        } else {
                            // Traverse its children
                            for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                                ret += getText(elem);
                            }
                        }
                    } else if (nodeType === 3 || nodeType === 4) {
                        return elem.nodeValue;
                    }
                    // Do not include comment or processing instruction nodes
                } else {

                    // If no nodeType, this is expected to be an array
                    for (;
                        (node = elem[i]); i++) {
                        // Do not traverse comment nodes
                        ret += getText(node);
                    }
                }
                return ret;
            };

            Sizzle.attr = function(elem, name) {
                var attr,
                    xml = isXML(elem);

                if (!xml) {
                    name = name.toLowerCase();
                }
                if (Expr.attrHandle[name]) {
                    return Expr.attrHandle[name](elem);
                }
                if (assertAttributes || xml) {
                    return elem.getAttribute(name);
                }
                attr = elem.getAttributeNode(name);
                return attr ?
                    typeof elem[name] === "boolean" ?
                    elem[name] ? name : null :
                    attr.specified ? attr.value : null :
                    null;
            };

            Sizzle.error = function(msg) {
                throw new Error("Syntax error, unrecognized expression: " + msg);
            };

            // Check if the JavaScript engine is using some sort of
            // optimization where it does not always call our comparision
            // function. If that is the case, discard the hasDuplicate value.
            //   Thus far that includes Google Chrome.
            [0, 0].sort(function() {
                return (baseHasDuplicate = 0);
            });


            if (docElem.compareDocumentPosition) {
                sortOrder = function(a, b) {
                    if (a === b) {
                        hasDuplicate = true;
                        return 0;
                    }

                    return (!a.compareDocumentPosition || !b.compareDocumentPosition ?
                        a.compareDocumentPosition :
                        a.compareDocumentPosition(b) & 4
                    ) ? -1 : 1;
                };

            } else {
                sortOrder = function(a, b) {
                    // The nodes are identical, we can exit early
                    if (a === b) {
                        hasDuplicate = true;
                        return 0;

                        // Fallback to using sourceIndex (in IE) if it's available on both nodes
                    } else if (a.sourceIndex && b.sourceIndex) {
                        return a.sourceIndex - b.sourceIndex;
                    }

                    var al, bl,
                        ap = [],
                        bp = [],
                        aup = a.parentNode,
                        bup = b.parentNode,
                        cur = aup;

                    // If the nodes are siblings (or identical) we can do a quick check
                    if (aup === bup) {
                        return siblingCheck(a, b);

                        // If no parents were found then the nodes are disconnected
                    } else if (!aup) {
                        return -1;

                    } else if (!bup) {
                        return 1;
                    }

                    // Otherwise they're somewhere else in the tree so we need
                    // to build up a full list of the parentNodes for comparison
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

                    // Start walking down the tree looking for a discrepancy
                    for (var i = 0; i < al && i < bl; i++) {
                        if (ap[i] !== bp[i]) {
                            return siblingCheck(ap[i], bp[i]);
                        }
                    }

                    // We ended someplace up the tree so do a sibling check
                    return i === al ?
                        siblingCheck(a, bp[i], -1) :
                        siblingCheck(ap[i], b, 1);
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

            // Document sorting and removing duplicates
            Sizzle.uniqueSort = function(results) {
                var elem,
                    i = 1;

                if (sortOrder) {
                    hasDuplicate = baseHasDuplicate;
                    results.sort(sortOrder);

                    if (hasDuplicate) {
                        for (;
                            (elem = results[i]); i++) {
                            if (elem === results[i - 1]) {
                                results.splice(i--, 1);
                            }
                        }
                    }
                }

                return results;
            };

            function multipleContexts(selector, contexts, results, seed) {
                var i = 0,
                    len = contexts.length;
                for (; i < len; i++) {
                    Sizzle(selector, contexts[i], results, seed);
                }
            }

            function handlePOSGroup(selector, posfilter, argument, contexts, seed, not) {
                var results,
                    fn = Expr.setFilters[posfilter.toLowerCase()];

                if (!fn) {
                    Sizzle.error(posfilter);
                }

                if (selector || !(results = seed)) {
                    multipleContexts(selector || "*", contexts, (results = []), seed);
                }

                return results.length > 0 ? fn(results, argument, not) : [];
            }

            function handlePOS(selector, context, results, seed, groups) {
                var match, not, anchor, ret, elements, currentContexts, part, lastIndex,
                    i = 0,
                    len = groups.length,
                    rpos = matchExpr["POS"],
                    // This is generated here in case matchExpr["POS"] is extended
                    rposgroups = new RegExp("^" + rpos.source + "(?!" + whitespace + ")", "i"),
                    // This is for making sure non-participating
                    // matching groups are represented cross-browser (IE6-8)
                    setUndefined = function() {
                        var i = 1,
                            len = arguments.length - 2;
                        for (; i < len; i++) {
                            if (arguments[i] === undefined) {
                                match[i] = undefined;
                            }
                        }
                    };

                for (; i < len; i++) {
                    // Reset regex index to 0
                    rpos.exec("");
                    selector = groups[i];
                    ret = [];
                    anchor = 0;
                    elements = seed;
                    while ((match = rpos.exec(selector))) {
                        lastIndex = rpos.lastIndex = match.index + match[0].length;
                        if (lastIndex > anchor) {
                            part = selector.slice(anchor, match.index);
                            anchor = lastIndex;
                            currentContexts = [context];

                            if (rcombinators.test(part)) {
                                if (elements) {
                                    currentContexts = elements;
                                }
                                elements = seed;
                            }

                            if ((not = rendsWithNot.test(part))) {
                                part = part.slice(0, -5)
                                    .replace(rcombinators, "$&*");
                            }

                            if (match.length > 1) {
                                match[0].replace(rposgroups, setUndefined);
                            }
                            elements = handlePOSGroup(part, match[1], match[2], currentContexts, elements, not);
                        }
                    }

                    if (elements) {
                        ret = ret.concat(elements);

                        if ((part = selector.slice(anchor)) && part !== ")") {
                            multipleContexts(part, ret, results, seed);
                        } else {
                            push.apply(results, ret);
                        }
                    } else {
                        Sizzle(selector, context, results, seed);
                    }
                }

                // Do not sort if this is a single filter
                return len === 1 ? results : Sizzle.uniqueSort(results);
            }

            function tokenize(selector, context, xml) {
                var tokens, soFar, type,
                    groups = [],
                    i = 0,

                    // Catch obvious selector issues: terminal ")"; nonempty fallback match
                    // rselector never fails to match *something*
                    match = rselector.exec(selector),
                    matched = !match.pop() && !match.pop(),
                    selectorGroups = matched && selector.match(rgroups) || [""],

                    preFilters = Expr.preFilter,
                    filters = Expr.filter,
                    checkContext = !xml && context !== document;

                for (;
                    (soFar = selectorGroups[i]) != null && matched; i++) {
                    groups.push(tokens = []);

                    // Need to make sure we're within a narrower context if necessary
                    // Adding a descendant combinator will generate what is needed
                    if (checkContext) {
                        soFar = " " + soFar;
                    }

                    while (soFar) {
                        matched = false;

                        // Combinators
                        if ((match = rcombinators.exec(soFar))) {
                            soFar = soFar.slice(match[0].length);

                            // Cast descendant combinators to space
                            matched = tokens.push({
                                part: match.pop()
                                    .replace(rtrim, " "),
                                captures: match
                            });
                        }

                        // Filters
                        for (type in filters) {
                            if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] ||
                                    (match = preFilters[type](match, context, xml)))) {

                                soFar = soFar.slice(match.shift()
                                    .length);
                                matched = tokens.push({
                                    part: type,
                                    captures: match
                                });
                            }
                        }

                        if (!matched) {
                            break;
                        }
                    }
                }

                if (!matched) {
                    Sizzle.error(selector);
                }

                return groups;
            }

            function addCombinator(matcher, combinator, context) {
                var dir = combinator.dir,
                    doneName = done++;

                if (!matcher) {
                    // If there is no matcher to check, check against the context
                    matcher = function(elem) {
                        return elem === context;
                    };
                }
                return combinator.first ?
                    function(elem, context) {
                        while ((elem = elem[dir])) {
                            if (elem.nodeType === 1) {
                                return matcher(elem, context) && elem;
                            }
                        }
                    } :
                    function(elem, context) {
                        var cache,
                            dirkey = doneName + "." + dirruns,
                            cachedkey = dirkey + "." + cachedruns;
                        while ((elem = elem[dir])) {
                            if (elem.nodeType === 1) {
                                if ((cache = elem[expando]) === cachedkey) {
                                    return false;
                                } else if (typeof cache === "string" && cache.indexOf(dirkey) === 0) {
                                    if (elem.sizset) {
                                        return elem;
                                    }
                                } else {
                                    elem[expando] = cachedkey;
                                    if (matcher(elem, context)) {
                                        elem.sizset = true;
                                        return elem;
                                    }
                                    elem.sizset = false;
                                }
                            }
                        }
                    };
            }

            function addMatcher(higher, deeper) {
                return higher ?
                    function(elem, context) {
                        var result = deeper(elem, context);
                        return result && higher(result === true ? elem : result, context);
                    } :
                    deeper;
            }

            // ["TAG", ">", "ID", " ", "CLASS"]
            function matcherFromTokens(tokens, context, xml) {
                var token, matcher,
                    i = 0;

                for (;
                    (token = tokens[i]); i++) {
                    if (Expr.relative[token.part]) {
                        matcher = addCombinator(matcher, Expr.relative[token.part], context);
                    } else {
                        token.captures.push(context, xml);
                        matcher = addMatcher(matcher, Expr.filter[token.part].apply(null, token.captures));
                    }
                }

                return matcher;
            }

            function matcherFromGroupMatchers(matchers) {
                return function(elem, context) {
                    var matcher,
                        j = 0;
                    for (;
                        (matcher = matchers[j]); j++) {
                        if (matcher(elem, context)) {
                            return true;
                        }
                    }
                    return false;
                };
            }

            var compile = Sizzle.compile = function(selector, context, xml) {
                var tokens, group, i,
                    cached = compilerCache[selector];

                // Return a cached group function if already generated (context dependent)
                if (cached && cached.context === context) {
                    cached.dirruns++;
                    return cached;
                }

                // Generate a function of recursive functions that can be used to check each element
                group = tokenize(selector, context, xml);
                for (i = 0;
                    (tokens = group[i]); i++) {
                    group[i] = matcherFromTokens(tokens, context, xml);
                }

                // Cache the compiled function
                cached = compilerCache[selector] = matcherFromGroupMatchers(group);
                cached.context = context;
                cached.runs = cached.dirruns = 0;
                cachedSelectors.push(selector);
                // Ensure only the most recent are cached
                if (cachedSelectors.length > Expr.cacheLength) {
                    delete compilerCache[cachedSelectors.shift()];
                }
                return cached;
            };

            Sizzle.matches = function(expr, elements) {
                return Sizzle(expr, null, null, elements);
            };

            Sizzle.matchesSelector = function(elem, expr) {
                return Sizzle(expr, null, null, [elem])
                    .length > 0;
            };

            var select = function(selector, context, results, seed, xml) {
                // Remove excessive whitespace
                selector = selector.replace(rtrim, "$1");
                var elements, matcher, i, len, elem, token,
                    type, findContext, notTokens,
                    match = selector.match(rgroups),
                    tokens = selector.match(rtokens),
                    contextNodeType = context.nodeType;

                // POS handling
                if (matchExpr["POS"].test(selector)) {
                    return handlePOS(selector, context, results, seed, match);
                }

                if (seed) {
                    elements = slice.call(seed, 0);

                    // To maintain document order, only narrow the
                    // set if there is one group
                } else if (match && match.length === 1) {

                    // Take a shortcut and set the context if the root selector is an ID
                    if (tokens.length > 1 && contextNodeType === 9 && !xml &&
                        (match = matchExpr["ID"].exec(tokens[0]))) {

                        context = Expr.find["ID"](match[1], context, xml)[0];
                        if (!context) {
                            return results;
                        }

                        selector = selector.slice(tokens.shift()
                            .length);
                    }

                    findContext = ((match = rsibling.exec(tokens[0])) && !match.index && context.parentNode) || context;

                    // Get the last token, excluding :not
                    notTokens = tokens.pop();
                    token = notTokens.split(":not")[0];

                    for (i = 0, len = Expr.order.length; i < len; i++) {
                        type = Expr.order[i];

                        if ((match = matchExpr[type].exec(token))) {
                            elements = Expr.find[type]((match[1] || "")
                                .replace(rbackslash, ""), findContext, xml);

                            if (elements == null) {
                                continue;
                            }

                            if (token === notTokens) {
                                selector = selector.slice(0, selector.length - notTokens.length) +
                                    token.replace(matchExpr[type], "");

                                if (!selector) {
                                    push.apply(results, slice.call(elements, 0));
                                }
                            }
                            break;
                        }
                    }
                }

                // Only loop over the given elements once
                // If selector is empty, we're already done
                if (selector) {
                    matcher = compile(selector, context, xml);
                    dirruns = matcher.dirruns;

                    if (elements == null) {
                        elements = Expr.find["TAG"]("*", (rsibling.test(selector) && context.parentNode) || context);
                    }
                    for (i = 0;
                        (elem = elements[i]); i++) {
                        cachedruns = matcher.runs++;
                        if (matcher(elem, context)) {
                            results.push(elem);
                        }
                    }
                }

                return results;
            };

            if (document.querySelectorAll) {
                (function() {
                    var disconnectedMatch,
                        oldSelect = select,
                        rescape = /'|\\/g,
                        rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
                        rbuggyQSA = [],
                        // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
                        // A support test would require too much code (would include document ready)
                        // just skip matchesSelector for :active
                        rbuggyMatches = [":active"],
                        matches = docElem.matchesSelector ||
                        docElem.mozMatchesSelector ||
                        docElem.webkitMatchesSelector ||
                        docElem.oMatchesSelector ||
                        docElem.msMatchesSelector;

                    // Build QSA regex
                    // Regex strategy adopted from Diego Perini
                    assert(function(div) {
                        div.innerHTML = "<select><option selected></option></select>";

                        // IE8 - Some boolean attributes are not treated correctly
                        if (!div.querySelectorAll("[selected]")
                            .length) {
                            rbuggyQSA.push("\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)");
                        }

                        // Webkit/Opera - :checked should return selected option elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        // IE8 throws error here (do not put tests after this one)
                        if (!div.querySelectorAll(":checked")
                            .length) {
                            rbuggyQSA.push(":checked");
                        }
                    });

                    assert(function(div) {

                        // Opera 10-12/IE9 - ^= $= *= and empty values
                        // Should not select anything
                        div.innerHTML = "<p test=''></p>";
                        if (div.querySelectorAll("[test^='']")
                            .length) {
                            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:\"\"|'')");
                        }

                        // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
                        // IE8 throws error here (do not put tests after this one)
                        div.innerHTML = "<input type='hidden'>";
                        if (!div.querySelectorAll(":enabled")
                            .length) {
                            rbuggyQSA.push(":enabled", ":disabled");
                        }
                    });

                    rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));

                    select = function(selector, context, results, seed, xml) {
                        // Only use querySelectorAll when not filtering,
                        // when this is not xml,
                        // and when no QSA bugs apply
                        if (!seed && !xml && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                            if (context.nodeType === 9) {
                                try {
                                    push.apply(results, slice.call(context.querySelectorAll(selector), 0));
                                    return results;
                                } catch (qsaError) {}
                                // qSA works strangely on Element-rooted queries
                                // We can work around this by specifying an extra ID on the root
                                // and working up from there (Thanks to Andrew Dupont for the technique)
                                // IE 8 doesn't work on object elements
                            } else if (context.nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                                var old = context.getAttribute("id"),
                                    nid = old || expando,
                                    newContext = rsibling.test(selector) && context.parentNode || context;

                                if (old) {
                                    nid = nid.replace(rescape, "\\$&");
                                } else {
                                    context.setAttribute("id", nid);
                                }

                                try {
                                    push.apply(results, slice.call(newContext.querySelectorAll(
                                        selector.replace(rgroups, "[id='" + nid + "'] $&")
                                    ), 0));
                                    return results;
                                } catch (qsaError) {} finally {
                                    if (!old) {
                                        context.removeAttribute("id");
                                    }
                                }
                            }
                        }

                        return oldSelect(selector, context, results, seed, xml);
                    };

                    if (matches) {
                        assert(function(div) {
                            // Check to see if it's possible to do matchesSelector
                            // on a disconnected node (IE 9)
                            disconnectedMatch = matches.call(div, "div");

                            // This should fail with an exception
                            // Gecko does not error, returns false instead
                            try {
                                matches.call(div, "[test!='']:sizzle");
                                rbuggyMatches.push(Expr.match.PSEUDO);
                            } catch (e) {}
                        });

                        // rbuggyMatches always contains :active, so no need for a length check
                        rbuggyMatches = /* rbuggyMatches.length && */ new RegExp(rbuggyMatches.join("|"));

                        Sizzle.matchesSelector = function(elem, expr) {
                            // Make sure that attribute selectors are quoted
                            expr = expr.replace(rattributeQuotes, "='$1']");

                            // rbuggyMatches always contains :active, so no need for an existence check
                            if (!isXML(elem) && !rbuggyMatches.test(expr) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
                                try {
                                    var ret = matches.call(elem, expr);

                                    // IE 9's matchesSelector returns false on disconnected nodes
                                    if (ret || disconnectedMatch ||
                                        // As well, disconnected nodes are said to be in a document
                                        // fragment in IE 9
                                        elem.document && elem.document.nodeType !== 11) {
                                        return ret;
                                    }
                                } catch (e) {}
                            }

                            return Sizzle(expr, null, null, [elem])
                                .length > 0;
                        };
                    }
                })();
            }

            // EXPOSE

            if (typeof module === 'object' && module.exports) {
                module.exports = Sizzle;
            } else {
                window.Sizzle = Sizzle;
            }
            // EXPOSE

        })(window);

    }, {}]
}, {}, ["QQX0yI"]);
require("ac-base");
/* ---- BUILT FILE. DO NOT MODIFY THIS DIRECTLY. ---- */
(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                throw new Error("Cannot find module '" + o + "'")
            }
            var f = n[o] = {
                exports: {}
            };
            t[o][0].call(f.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, f, f.exports, e, t, n, r)
        }
        return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s
})({
    1: [function(require, module, exports) {
        'use strict';

        var FeatureDetect = require("../../../../ipad/shared/js/FeatureDetect");

        var Main = (function() {

            return {

                initialize: function() {
                    FeatureDetect.htmlClass();

                    return this;
                }

            };

        }());

        module.exports = Main.initialize();

    }, {
        "../../../../ipad/shared/js/FeatureDetect": 2
    }],
    2: [function(require, module, exports) {
        'use strict';

        var ac_Element = require('ac-base')
            .Element;
        var ac_Browser = require('ac-base')
            .Environment.Browser;
        var ac_Feature = require('ac-base')
            .Environment.Feature;

        var FeatureDetect = (function() {

            var target = document.documentElement;

            var supportSticky = function() {
                var prop = 'position:';
                var el = document.createElement('div');

                el.style.cssText = prop + ['-webkit-', '-moz-', '-ms-', '-o-', ''].join('sticky' + ';' + prop) + 'sticky' + ';';

                if (el.style['position'].indexOf('sticky') !== -1) {
                    return true;
                } else {
                    return false;
                }
            };

            var supportsTransform = function() {
                var style = document.createElement('style');
                style.id = 'supportsThreeDStyle';
                return ac_Feature.threeDTransformsAvailable() || style.style['MozTransform'] !== undefined || style.style['WebkitTransform'] !== undefined;
            };

            var tests = {
                touch: ac_Feature.touchAvailable,
                svg: ac_Feature.svgAvailable,
                oldie: (ac_Browser.IE && ac_Browser.IE.documentMode < 9),
                ie: (ac_Browser.IE && ac_Browser.IE.documentMode >= 9),
                sticky: supportSticky,
                transform: supportsTransform
            };

            return {
                htmlClass: function() {
                    var key;

                    ac_Element.removeClassName(target, 'no-js');
                    ac_Element.addClassName(target, 'js');

                    for (key in tests) {
                        this._addClass(key);
                    }
                },

                _supports: function(feature) {
                    if (typeof tests[feature] === 'undefined') {
                        return false;
                    }

                    if (typeof tests[feature] === 'function') {
                        // only run each test once
                        tests[feature] = tests[feature]();
                    }

                    return tests[feature];
                },

                _addClass: function(feature, failure_prefix) {
                    failure_prefix = failure_prefix || 'no-';

                    if (this._supports(feature)) {
                        ac_Element.addClassName(target, feature);
                    } else {
                        ac_Element.addClassName(target, failure_prefix + feature);
                    }
                }
            };

        }());

        module.exports = FeatureDetect;

    }, {
        "ac-base": false
    }]
}, {}, [1])