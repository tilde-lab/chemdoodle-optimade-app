(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["math"] = factory();
	else
		root["math"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	
	// Custom math.js build:
	// webpack math.custom.js math.custom.webpack.js
	// java -jar utils/compiler.jar --jscomp_off checkTypes --language_in ECMASCRIPT5_STRICT --js math.custom.webpack.js --js_output_file math.custom.min.js

	var core = __webpack_require__(1);
	var math = core.create();

	math.import(__webpack_require__(15));
	math.import(__webpack_require__(24));
	math.import(__webpack_require__(27));
	math.import(__webpack_require__(29));
	math.import(__webpack_require__(30));
	math.import(__webpack_require__(31));
	math.import(__webpack_require__(58));
	math.import(__webpack_require__(47));
	math.import(__webpack_require__(65));
	math.import(__webpack_require__(68));
	math.import(__webpack_require__(69));
	math.import(__webpack_require__(70));
	math.import(__webpack_require__(71));

	module.exports = math;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2)


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(3);

	var isFactory = __webpack_require__(4).isFactory;

	var typedFactory = __webpack_require__(6);

	var emitter = __webpack_require__(10);

	var importFactory = __webpack_require__(12);

	var configFactory = __webpack_require__(14);
	/**
	 * Math.js core. Creates a new, empty math.js instance
	 * @param {Object} [options] Available options:
	 *                            {number} epsilon
	 *                              Minimum relative difference between two
	 *                              compared values, used by all comparison functions.
	 *                            {string} matrix
	 *                              A string 'Matrix' (default) or 'Array'.
	 *                            {string} number
	 *                              A string 'number' (default), 'BigNumber', or 'Fraction'
	 *                            {number} precision
	 *                              The number of significant digits for BigNumbers.
	 *                              Not applicable for Numbers.
	 *                            {boolean} predictable
	 *                              Predictable output type of functions. When true,
	 *                              output type depends only on the input types. When
	 *                              false (default), output type can vary depending
	 *                              on input values. For example `math.sqrt(-4)`
	 *                              returns `complex('2i')` when predictable is false, and
	 *                              returns `NaN` when true.
	 *                            {string} randomSeed
	 *                              Random seed for seeded pseudo random number generator.
	 *                              Set to null to randomly seed.
	 * @returns {Object} Returns a bare-bone math.js instance containing
	 *                   functions:
	 *                   - `import` to add new functions
	 *                   - `config` to change configuration
	 *                   - `on`, `off`, `once`, `emit` for events
	 */


	exports.create = function create(options) {
	  // simple test for ES5 support
	  if (typeof Object.create !== 'function') {
	    throw new Error('ES5 not supported by this JavaScript engine. ' + 'Please load the es5-shim and es5-sham library for compatibility.');
	  } // cached factories and instances


	  var factories = [];
	  var instances = []; // create a namespace for the mathjs instance, and attach emitter functions

	  var math = emitter.mixin({});
	  math.type = {};
	  math.expression = {
	    transform: {},
	    mathWithTransform: {} // create a new typed instance

	  };
	  math.typed = typedFactory.create(math.type); // create configuration options. These are private

	  var _config = {
	    // minimum relative difference between two compared values,
	    // used by all comparison functions
	    epsilon: 1e-12,
	    // type of default matrix output. Choose 'matrix' (default) or 'array'
	    matrix: 'Matrix',
	    // type of default number output. Choose 'number' (default) 'BigNumber', or 'Fraction
	    number: 'number',
	    // number of significant digits in BigNumbers
	    precision: 64,
	    // predictable output type of functions. When true, output type depends only
	    // on the input types. When false (default), output type can vary depending
	    // on input values. For example `math.sqrt(-4)` returns `complex('2i')` when
	    // predictable is false, and returns `NaN` when true.
	    predictable: false,
	    // random seed for seeded pseudo random number generation
	    // null = randomly seed
	    randomSeed: null
	    /**
	     * Load a function or data type from a factory.
	     * If the function or data type already exists, the existing instance is
	     * returned.
	     * @param {{type: string, name: string, factory: Function}} factory
	     * @returns {*}
	     */

	  };

	  function load(factory) {
	    if (!isFactory(factory)) {
	      throw new Error('Factory object with properties `type`, `name`, and `factory` expected');
	    }

	    var index = factories.indexOf(factory);
	    var instance;

	    if (index === -1) {
	      // doesn't yet exist
	      if (factory.math === true) {
	        // pass with math namespace
	        instance = factory.factory(math.type, _config, load, math.typed, math);
	      } else {
	        instance = factory.factory(math.type, _config, load, math.typed);
	      } // append to the cache


	      factories.push(factory);
	      instances.push(instance);
	    } else {
	      // already existing function, return the cached instance
	      instance = instances[index];
	    }

	    return instance;
	  } // load the import and config functions


	  math['import'] = load(importFactory);
	  math['config'] = load(configFactory);
	  math.expression.mathWithTransform['config'] = math['config']; // apply options

	  if (options) {
	    math.config(options);
	  }

	  return math;
	};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	// TODO: remove these polyfills as soon as we have a build process that transpiles the code to ES5
	// Polyfill for IE 11 (Number.isFinite is used in `complex.js`)
	// source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite
	Number.isFinite = Number.isFinite || function (value) {
	  return typeof value === 'number' && isFinite(value);
	}; // Polyfill for IE 11
	// source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN


	Number.isNaN = Number.isNaN || function (value) {
	  return value !== value; // eslint-disable-line no-self-compare
	};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	var isBigNumber = __webpack_require__(5);
	/**
	 * Clone an object
	 *
	 *     clone(x)
	 *
	 * Can clone any primitive type, array, and object.
	 * If x has a function clone, this function will be invoked to clone the object.
	 *
	 * @param {*} x
	 * @return {*} clone
	 */


	exports.clone = function clone(x) {
	  var type = _typeof(x); // immutable primitive types


	  if (type === 'number' || type === 'string' || type === 'boolean' || x === null || x === undefined) {
	    return x;
	  } // use clone function of the object when available


	  if (typeof x.clone === 'function') {
	    return x.clone();
	  } // array


	  if (Array.isArray(x)) {
	    return x.map(function (value) {
	      return clone(value);
	    });
	  }

	  if (x instanceof Date) return new Date(x.valueOf());
	  if (isBigNumber(x)) return x; // bignumbers are immutable

	  if (x instanceof RegExp) throw new TypeError('Cannot clone ' + x); // TODO: clone a RegExp
	  // object

	  return exports.map(x, clone);
	};
	/**
	 * Apply map to all properties of an object
	 * @param {Object} object
	 * @param {function} callback
	 * @return {Object} Returns a copy of the object with mapped properties
	 */


	exports.map = function (object, callback) {
	  var clone = {};

	  for (var key in object) {
	    if (exports.hasOwnProperty(object, key)) {
	      clone[key] = callback(object[key]);
	    }
	  }

	  return clone;
	};
	/**
	 * Extend object a with the properties of object b
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 */


	exports.extend = function (a, b) {
	  for (var prop in b) {
	    if (exports.hasOwnProperty(b, prop)) {
	      a[prop] = b[prop];
	    }
	  }

	  return a;
	};
	/**
	 * Deep extend an object a with the properties of object b
	 * @param {Object} a
	 * @param {Object} b
	 * @returns {Object}
	 */


	exports.deepExtend = function deepExtend(a, b) {
	  // TODO: add support for Arrays to deepExtend
	  if (Array.isArray(b)) {
	    throw new TypeError('Arrays are not supported by deepExtend');
	  }

	  for (var prop in b) {
	    if (exports.hasOwnProperty(b, prop)) {
	      if (b[prop] && b[prop].constructor === Object) {
	        if (a[prop] === undefined) {
	          a[prop] = {};
	        }

	        if (a[prop].constructor === Object) {
	          deepExtend(a[prop], b[prop]);
	        } else {
	          a[prop] = b[prop];
	        }
	      } else if (Array.isArray(b[prop])) {
	        throw new TypeError('Arrays are not supported by deepExtend');
	      } else {
	        a[prop] = b[prop];
	      }
	    }
	  }

	  return a;
	};
	/**
	 * Deep test equality of all fields in two pairs of arrays or objects.
	 * @param {Array | Object} a
	 * @param {Array | Object} b
	 * @returns {boolean}
	 */


	exports.deepEqual = function deepEqual(a, b) {
	  var prop, i, len;

	  if (Array.isArray(a)) {
	    if (!Array.isArray(b)) {
	      return false;
	    }

	    if (a.length !== b.length) {
	      return false;
	    }

	    for (i = 0, len = a.length; i < len; i++) {
	      if (!exports.deepEqual(a[i], b[i])) {
	        return false;
	      }
	    }

	    return true;
	  } else if (a instanceof Object) {
	    if (Array.isArray(b) || !(b instanceof Object)) {
	      return false;
	    }

	    for (prop in a) {
	      // noinspection JSUnfilteredForInLoop
	      if (!exports.deepEqual(a[prop], b[prop])) {
	        return false;
	      }
	    }

	    for (prop in b) {
	      // noinspection JSUnfilteredForInLoop
	      if (!exports.deepEqual(a[prop], b[prop])) {
	        return false;
	      }
	    }

	    return true;
	  } else {
	    return a === b;
	  }
	};
	/**
	 * Test whether the current JavaScript engine supports Object.defineProperty
	 * @returns {boolean} returns true if supported
	 */


	exports.canDefineProperty = function () {
	  // test needed for broken IE8 implementation
	  try {
	    if (Object.defineProperty) {
	      Object.defineProperty({}, 'x', {
	        get: function get() {}
	      });
	      return true;
	    }
	  } catch (e) {}

	  return false;
	};
	/**
	 * Attach a lazy loading property to a constant.
	 * The given function `fn` is called once when the property is first requested.
	 * On older browsers (<IE8), the function will fall back to direct evaluation
	 * of the properties value.
	 * @param {Object} object   Object where to add the property
	 * @param {string} prop     Property name
	 * @param {Function} fn     Function returning the property value. Called
	 *                          without arguments.
	 */


	exports.lazy = function (object, prop, fn) {
	  if (exports.canDefineProperty()) {
	    var _uninitialized = true;

	    var _value;

	    Object.defineProperty(object, prop, {
	      get: function get() {
	        if (_uninitialized) {
	          _value = fn();
	          _uninitialized = false;
	        }

	        return _value;
	      },
	      set: function set(value) {
	        _value = value;
	        _uninitialized = false;
	      },
	      configurable: true,
	      enumerable: true
	    });
	  } else {
	    // fall back to immediate evaluation
	    object[prop] = fn();
	  }
	};
	/**
	 * Traverse a path into an object.
	 * When a namespace is missing, it will be created
	 * @param {Object} object
	 * @param {string} path   A dot separated string like 'name.space'
	 * @return {Object} Returns the object at the end of the path
	 */


	exports.traverse = function (object, path) {
	  var obj = object;

	  if (path) {
	    var names = path.split('.');

	    for (var i = 0; i < names.length; i++) {
	      var name = names[i];

	      if (!(name in obj)) {
	        obj[name] = {};
	      }

	      obj = obj[name];
	    }
	  }

	  return obj;
	};
	/**
	 * A safe hasOwnProperty
	 * @param {Object} object
	 * @param {string} property
	 */


	exports.hasOwnProperty = function (object, property) {
	  return object && Object.hasOwnProperty.call(object, property);
	};
	/**
	 * Test whether an object is a factory. a factory has fields:
	 *
	 * - factory: function (type: Object, config: Object, load: function, typed: function [, math: Object])   (required)
	 * - name: string (optional)
	 * - path: string    A dot separated path (optional)
	 * - math: boolean   If true (false by default), the math namespace is passed
	 *                   as fifth argument of the factory function
	 *
	 * @param {*} object
	 * @returns {boolean}
	 */


	exports.isFactory = function (object) {
	  return object && typeof object.factory === 'function';
	};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';
	/**
	 * Test whether a value is a BigNumber
	 * @param {*} x
	 * @return {boolean}
	 */

	module.exports = function isBigNumber(x) {
	  return x && x.constructor.prototype.isBigNumber || false;
	};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	var typedFunction = __webpack_require__(7);

	var digits = __webpack_require__(8).digits;

	var isBigNumber = __webpack_require__(5);

	var isMatrix = __webpack_require__(9); // returns a new instance of typed-function


	var _createTyped = function createTyped() {
	  // initially, return the original instance of typed-function
	  // consecutively, return a new instance from typed.create.
	  _createTyped = typedFunction.create;
	  return typedFunction;
	};
	/**
	 * Factory function for creating a new typed instance
	 * @param {Object} type   Object with data types like Complex and BigNumber
	 * @returns {Function}
	 */


	exports.create = function create(type) {
	  // TODO: typed-function must be able to silently ignore signatures with unknown data types
	  // type checks for all known types
	  //
	  // note that:
	  //
	  // - check by duck-typing on a property like `isUnit`, instead of checking instanceof.
	  //   instanceof cannot be used because that would not allow to pass data from
	  //   one instance of math.js to another since each has it's own instance of Unit.
	  // - check the `isUnit` property via the constructor, so there will be no
	  //   matches for "fake" instances like plain objects with a property `isUnit`.
	  //   That is important for security reasons.
	  // - It must not be possible to override the type checks used internally,
	  //   for security reasons, so these functions are not exposed in the expression
	  //   parser.
	  type.isNumber = function (x) {
	    return typeof x === 'number';
	  };

	  type.isComplex = function (x) {
	    return type.Complex && x instanceof type.Complex || false;
	  };

	  type.isBigNumber = isBigNumber;

	  type.isFraction = function (x) {
	    return type.Fraction && x instanceof type.Fraction || false;
	  };

	  type.isUnit = function (x) {
	    return x && x.constructor.prototype.isUnit || false;
	  };

	  type.isString = function (x) {
	    return typeof x === 'string';
	  };

	  type.isArray = Array.isArray;
	  type.isMatrix = isMatrix;

	  type.isDenseMatrix = function (x) {
	    return x && x.isDenseMatrix && x.constructor.prototype.isMatrix || false;
	  };

	  type.isSparseMatrix = function (x) {
	    return x && x.isSparseMatrix && x.constructor.prototype.isMatrix || false;
	  };

	  type.isRange = function (x) {
	    return x && x.constructor.prototype.isRange || false;
	  };

	  type.isIndex = function (x) {
	    return x && x.constructor.prototype.isIndex || false;
	  };

	  type.isBoolean = function (x) {
	    return typeof x === 'boolean';
	  };

	  type.isResultSet = function (x) {
	    return x && x.constructor.prototype.isResultSet || false;
	  };

	  type.isHelp = function (x) {
	    return x && x.constructor.prototype.isHelp || false;
	  };

	  type.isFunction = function (x) {
	    return typeof x === 'function';
	  };

	  type.isDate = function (x) {
	    return x instanceof Date;
	  };

	  type.isRegExp = function (x) {
	    return x instanceof RegExp;
	  };

	  type.isObject = function (x) {
	    return _typeof(x) === 'object' && x.constructor === Object && !type.isComplex(x) && !type.isFraction(x);
	  };

	  type.isNull = function (x) {
	    return x === null;
	  };

	  type.isUndefined = function (x) {
	    return x === undefined;
	  };

	  type.isAccessorNode = function (x) {
	    return x && x.isAccessorNode && x.constructor.prototype.isNode || false;
	  };

	  type.isArrayNode = function (x) {
	    return x && x.isArrayNode && x.constructor.prototype.isNode || false;
	  };

	  type.isAssignmentNode = function (x) {
	    return x && x.isAssignmentNode && x.constructor.prototype.isNode || false;
	  };

	  type.isBlockNode = function (x) {
	    return x && x.isBlockNode && x.constructor.prototype.isNode || false;
	  };

	  type.isConditionalNode = function (x) {
	    return x && x.isConditionalNode && x.constructor.prototype.isNode || false;
	  };

	  type.isConstantNode = function (x) {
	    return x && x.isConstantNode && x.constructor.prototype.isNode || false;
	  };

	  type.isFunctionAssignmentNode = function (x) {
	    return x && x.isFunctionAssignmentNode && x.constructor.prototype.isNode || false;
	  };

	  type.isFunctionNode = function (x) {
	    return x && x.isFunctionNode && x.constructor.prototype.isNode || false;
	  };

	  type.isIndexNode = function (x) {
	    return x && x.isIndexNode && x.constructor.prototype.isNode || false;
	  };

	  type.isNode = function (x) {
	    return x && x.isNode && x.constructor.prototype.isNode || false;
	  };

	  type.isObjectNode = function (x) {
	    return x && x.isObjectNode && x.constructor.prototype.isNode || false;
	  };

	  type.isOperatorNode = function (x) {
	    return x && x.isOperatorNode && x.constructor.prototype.isNode || false;
	  };

	  type.isParenthesisNode = function (x) {
	    return x && x.isParenthesisNode && x.constructor.prototype.isNode || false;
	  };

	  type.isRangeNode = function (x) {
	    return x && x.isRangeNode && x.constructor.prototype.isNode || false;
	  };

	  type.isSymbolNode = function (x) {
	    return x && x.isSymbolNode && x.constructor.prototype.isNode || false;
	  };

	  type.isChain = function (x) {
	    return x && x.constructor.prototype.isChain || false;
	  }; // get a new instance of typed-function


	  var typed = _createTyped(); // define all types. The order of the types determines in which order function
	  // arguments are type-checked (so for performance it's important to put the
	  // most used types first).


	  typed.types = [{
	    name: 'number',
	    test: type.isNumber
	  }, {
	    name: 'Complex',
	    test: type.isComplex
	  }, {
	    name: 'BigNumber',
	    test: type.isBigNumber
	  }, {
	    name: 'Fraction',
	    test: type.isFraction
	  }, {
	    name: 'Unit',
	    test: type.isUnit
	  }, {
	    name: 'string',
	    test: type.isString
	  }, {
	    name: 'Array',
	    test: type.isArray
	  }, {
	    name: 'Matrix',
	    test: type.isMatrix
	  }, {
	    name: 'DenseMatrix',
	    test: type.isDenseMatrix
	  }, {
	    name: 'SparseMatrix',
	    test: type.isSparseMatrix
	  }, {
	    name: 'Range',
	    test: type.isRange
	  }, {
	    name: 'Index',
	    test: type.isIndex
	  }, {
	    name: 'boolean',
	    test: type.isBoolean
	  }, {
	    name: 'ResultSet',
	    test: type.isResultSet
	  }, {
	    name: 'Help',
	    test: type.isHelp
	  }, {
	    name: 'function',
	    test: type.isFunction
	  }, {
	    name: 'Date',
	    test: type.isDate
	  }, {
	    name: 'RegExp',
	    test: type.isRegExp
	  }, {
	    name: 'null',
	    test: type.isNull
	  }, {
	    name: 'undefined',
	    test: type.isUndefined
	  }, {
	    name: 'OperatorNode',
	    test: type.isOperatorNode
	  }, {
	    name: 'ConstantNode',
	    test: type.isConstantNode
	  }, {
	    name: 'SymbolNode',
	    test: type.isSymbolNode
	  }, {
	    name: 'ParenthesisNode',
	    test: type.isParenthesisNode
	  }, {
	    name: 'FunctionNode',
	    test: type.isFunctionNode
	  }, {
	    name: 'FunctionAssignmentNode',
	    test: type.isFunctionAssignmentNode
	  }, {
	    name: 'ArrayNode',
	    test: type.isArrayNode
	  }, {
	    name: 'AssignmentNode',
	    test: type.isAssignmentNode
	  }, {
	    name: 'BlockNode',
	    test: type.isBlockNode
	  }, {
	    name: 'ConditionalNode',
	    test: type.isConditionalNode
	  }, {
	    name: 'IndexNode',
	    test: type.isIndexNode
	  }, {
	    name: 'RangeNode',
	    test: type.isRangeNode
	  }, {
	    name: 'Node',
	    test: type.isNode
	  }, {
	    name: 'Object',
	    test: type.isObject // order 'Object' last, it matches on other classes too

	  }]; // TODO: add conversion from BigNumber to number?

	  typed.conversions = [{
	    from: 'number',
	    to: 'BigNumber',
	    convert: function convert(x) {
	      // note: conversion from number to BigNumber can fail if x has >15 digits
	      if (digits(x) > 15) {
	        throw new TypeError('Cannot implicitly convert a number with >15 significant digits to BigNumber ' + '(value: ' + x + '). ' + 'Use function bignumber(x) to convert to BigNumber.');
	      }

	      return new type.BigNumber(x);
	    }
	  }, {
	    from: 'number',
	    to: 'Complex',
	    convert: function convert(x) {
	      return new type.Complex(x, 0);
	    }
	  }, {
	    from: 'number',
	    to: 'string',
	    convert: function convert(x) {
	      return x + '';
	    }
	  }, {
	    from: 'BigNumber',
	    to: 'Complex',
	    convert: function convert(x) {
	      return new type.Complex(x.toNumber(), 0);
	    }
	  }, {
	    from: 'Fraction',
	    to: 'BigNumber',
	    convert: function convert(x) {
	      throw new TypeError('Cannot implicitly convert a Fraction to BigNumber or vice versa. ' + 'Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.');
	    }
	  }, {
	    from: 'Fraction',
	    to: 'Complex',
	    convert: function convert(x) {
	      return new type.Complex(x.valueOf(), 0);
	    }
	  }, {
	    from: 'number',
	    to: 'Fraction',
	    convert: function convert(x) {
	      var f = new type.Fraction(x);

	      if (f.valueOf() !== x) {
	        throw new TypeError('Cannot implicitly convert a number to a Fraction when there will be a loss of precision ' + '(value: ' + x + '). ' + 'Use function fraction(x) to convert to Fraction.');
	      }

	      return new type.Fraction(x);
	    }
	  }, {
	    // FIXME: add conversion from Fraction to number, for example for `sqrt(fraction(1,3))`
	    //  from: 'Fraction',
	    //  to: 'number',
	    //  convert: function (x) {
	    //    return x.valueOf()
	    //  }
	    // }, {
	    from: 'string',
	    to: 'number',
	    convert: function convert(x) {
	      var n = Number(x);

	      if (isNaN(n)) {
	        throw new Error('Cannot convert "' + x + '" to a number');
	      }

	      return n;
	    }
	  }, {
	    from: 'string',
	    to: 'BigNumber',
	    convert: function convert(x) {
	      try {
	        return new type.BigNumber(x);
	      } catch (err) {
	        throw new Error('Cannot convert "' + x + '" to BigNumber');
	      }
	    }
	  }, {
	    from: 'string',
	    to: 'Fraction',
	    convert: function convert(x) {
	      try {
	        return new type.Fraction(x);
	      } catch (err) {
	        throw new Error('Cannot convert "' + x + '" to Fraction');
	      }
	    }
	  }, {
	    from: 'string',
	    to: 'Complex',
	    convert: function convert(x) {
	      try {
	        return new type.Complex(x);
	      } catch (err) {
	        throw new Error('Cannot convert "' + x + '" to Complex');
	      }
	    }
	  }, {
	    from: 'boolean',
	    to: 'number',
	    convert: function convert(x) {
	      return +x;
	    }
	  }, {
	    from: 'boolean',
	    to: 'BigNumber',
	    convert: function convert(x) {
	      return new type.BigNumber(+x);
	    }
	  }, {
	    from: 'boolean',
	    to: 'Fraction',
	    convert: function convert(x) {
	      return new type.Fraction(+x);
	    }
	  }, {
	    from: 'boolean',
	    to: 'string',
	    convert: function convert(x) {
	      return +x;
	    }
	  }, {
	    from: 'Array',
	    to: 'Matrix',
	    convert: function convert(array) {
	      return new type.DenseMatrix(array);
	    }
	  }, {
	    from: 'Matrix',
	    to: 'Array',
	    convert: function convert(matrix) {
	      return matrix.valueOf();
	    }
	  }];
	  return typed;
	};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * typed-function
	 *
	 * Type checking for JavaScript functions
	 *
	 * https://github.com/josdejong/typed-function
	 */
	'use strict';

	(function (root, factory) {
	  if (true) {
	    // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    // OldNode. Does not work with strict CommonJS, but
	    // only CommonJS-like environments that support module.exports,
	    // like OldNode.
	    module.exports = factory();
	  } else {
	    // Browser globals (root is window)
	    root.typed = factory();
	  }
	}(this, function () {

	  function ok () {
	    return true;
	  }

	  function notOk () {
	    return false;
	  }

	  function undef () {
	    return undefined;
	  }

	  /**
	   * @typedef {{
	   *   params: Param[],
	   *   fn: function
	   * }} Signature
	   *
	   * @typedef {{
	   *   types: Type[],
	   *   restParam: boolean
	   * }} Param
	   *
	   * @typedef {{
	   *   name: string,
	   *   typeIndex: number,
	   *   test: function,
	   *   conversion?: ConversionDef,
	   *   conversionIndex: number,
	   * }} Type
	   *
	   * @typedef {{
	   *   from: string,
	   *   to: string,
	   *   convert: function (*) : *
	   * }} ConversionDef
	   *
	   * @typedef {{
	   *   name: string,
	   *   test: function(*) : boolean
	   * }} TypeDef
	   */

	  // create a new instance of typed-function
	  function create () {
	    // data type tests
	    var _types = [
	      { name: 'number',    test: function (x) { return typeof x === 'number' } },
	      { name: 'string',    test: function (x) { return typeof x === 'string' } },
	      { name: 'boolean',   test: function (x) { return typeof x === 'boolean' } },
	      { name: 'Function',  test: function (x) { return typeof x === 'function'} },
	      { name: 'Array',     test: Array.isArray },
	      { name: 'Date',      test: function (x) { return x instanceof Date } },
	      { name: 'RegExp',    test: function (x) { return x instanceof RegExp } },
	      { name: 'Object',    test: function (x) {
	        return typeof x === 'object' && x.constructor === Object
	      }},
	      { name: 'null',      test: function (x) { return x === null } },
	      { name: 'undefined', test: function (x) { return x === undefined } }
	    ];

	    var anyType = {
	      name: 'any',
	      test: ok
	    }

	    // types which need to be ignored
	    var _ignore = [];

	    // type conversions
	    var _conversions = [];

	    // This is a temporary object, will be replaced with a typed function at the end
	    var typed = {
	      types: _types,
	      conversions: _conversions,
	      ignore: _ignore
	    };

	    /**
	     * Find the test function for a type
	     * @param {String} typeName
	     * @return {TypeDef} Returns the type definition when found,
	     *                    Throws a TypeError otherwise
	     */
	    function findTypeByName (typeName) {
	      var entry = findInArray(typed.types, function (entry) {
	        return entry.name === typeName;
	      });

	      if (entry) {
	        return entry;
	      }

	      if (typeName === 'any') { // special baked-in case 'any'
	        return anyType;
	      }

	      var hint = findInArray(typed.types, function (entry) {
	        return entry.name.toLowerCase() === typeName.toLowerCase();
	      });

	      throw new TypeError('Unknown type "' + typeName + '"' +
	          (hint ? ('. Did you mean "' + hint.name + '"?') : ''));
	    }

	    /**
	     * Find the index of a type definition. Handles special case 'any'
	     * @param {TypeDef} type
	     * @return {number}
	     */
	    function findTypeIndex(type) {
	      if (type === anyType) {
	        return 999;
	      }

	      return typed.types.indexOf(type);
	    }

	    /**
	     * Find a type that matches a value.
	     * @param {*} value
	     * @return {string} Returns the name of the first type for which
	     *                  the type test matches the value.
	     */
	    function findTypeName(value) {
	      var entry = findInArray(typed.types, function (entry) {
	        return entry.test(value);
	      });

	      if (entry) {
	        return entry.name;
	      }

	      throw new TypeError('Value has unknown type. Value: ' + value);
	    }

	    /**
	     * Find a specific signature from a (composed) typed function, for example:
	     *
	     *   typed.find(fn, ['number', 'string'])
	     *   typed.find(fn, 'number, string')
	     *
	     * Function find only only works for exact matches.
	     *
	     * @param {Function} fn                   A typed-function
	     * @param {string | string[]} signature   Signature to be found, can be
	     *                                        an array or a comma separated string.
	     * @return {Function}                     Returns the matching signature, or
	     *                                        throws an error when no signature
	     *                                        is found.
	     */
	    function find (fn, signature) {
	      if (!fn.signatures) {
	        throw new TypeError('Function is no typed-function');
	      }

	      // normalize input
	      var arr;
	      if (typeof signature === 'string') {
	        arr = signature.split(',');
	        for (var i = 0; i < arr.length; i++) {
	          arr[i] = arr[i].trim();
	        }
	      }
	      else if (Array.isArray(signature)) {
	        arr = signature;
	      }
	      else {
	        throw new TypeError('String array or a comma separated string expected');
	      }

	      var str = arr.join(',');

	      // find an exact match
	      var match = fn.signatures[str];
	      if (match) {
	        return match;
	      }

	      // TODO: extend find to match non-exact signatures

	      throw new TypeError('Signature not found (signature: ' + (fn.name || 'unnamed') + '(' + arr.join(', ') + '))');
	    }

	    /**
	     * Convert a given value to another data type.
	     * @param {*} value
	     * @param {string} type
	     */
	    function convert (value, type) {
	      var from = findTypeName(value);

	      // check conversion is needed
	      if (type === from) {
	        return value;
	      }

	      for (var i = 0; i < typed.conversions.length; i++) {
	        var conversion = typed.conversions[i];
	        if (conversion.from === from && conversion.to === type) {
	          return conversion.convert(value);
	        }
	      }

	      throw new Error('Cannot convert from ' + from + ' to ' + type);
	    }
	    
	    /**
	     * Stringify parameters in a normalized way
	     * @param {Param[]} params
	     * @return {string}
	     */
	    function stringifyParams (params) {
	      return params
	          .map(function (param) {
	            var typeNames = param.types.map(getTypeName);

	            return (param.restParam ? '...' : '') + typeNames.join('|');
	          })
	          .join(',');
	    }

	    /**
	     * Parse a parameter, like "...number | boolean"
	     * @param {string} param
	     * @param {ConversionDef[]} conversions
	     * @return {Param} param
	     */
	    function parseParam (param, conversions) {
	      var restParam = param.indexOf('...') === 0;
	      var types = (!restParam)
	          ? param
	          : (param.length > 3)
	              ? param.slice(3)
	              : 'any';

	      var typeNames = types.split('|').map(trim)
	          .filter(notEmpty)
	          .filter(notIgnore);

	      var matchingConversions = filterConversions(conversions, typeNames);

	      var exactTypes = typeNames.map(function (typeName) {
	        var type = findTypeByName(typeName);

	        return {
	          name: typeName,
	          typeIndex: findTypeIndex(type),
	          test: type.test,
	          conversion: null,
	          conversionIndex: -1
	        };
	      });

	      var convertibleTypes = matchingConversions.map(function (conversion) {
	        var type = findTypeByName(conversion.from);

	        return {
	          name: conversion.from,
	          typeIndex: findTypeIndex(type),
	          test: type.test,
	          conversion: conversion,
	          conversionIndex: conversions.indexOf(conversion)
	        };
	      });

	      return {
	        types: exactTypes.concat(convertibleTypes),
	        restParam: restParam
	      };
	    }

	    /**
	     * Parse a signature with comma separated parameters,
	     * like "number | boolean, ...string"
	     * @param {string} signature
	     * @param {function} fn
	     * @param {ConversionDef[]} conversions
	     * @return {Signature | null} signature
	     */
	    function parseSignature (signature, fn, conversions) {
	      var params = [];

	      if (signature.trim() !== '') {
	        params = signature
	            .split(',')
	            .map(trim)
	            .map(function (param, index, array) {
	              var parsedParam = parseParam(param, conversions);

	              if (parsedParam.restParam && (index !== array.length - 1)) {
	                throw new SyntaxError('Unexpected rest parameter "' + param + '": ' +
	                    'only allowed for the last parameter');
	              }

	              return parsedParam;
	          });
	      }

	      if (params.some(isInvalidParam)) {
	        // invalid signature: at least one parameter has no types
	        // (they may have been filtered)
	        return null;
	      }

	      return {
	        params: params,
	        fn: fn
	      };
	    }

	    /**
	     * Test whether a set of params contains a restParam
	     * @param {Param[]} params
	     * @return {boolean} Returns true when the last parameter is a restParam
	     */
	    function hasRestParam(params) {
	      var param = last(params)
	      return param ? param.restParam : false;
	    }

	    /**
	     * Test whether a parameter contains conversions
	     * @param {Param} param
	     * @return {boolean} Returns true when at least one of the parameters
	     *                   contains a conversion.
	     */
	    function hasConversions(param) {
	      return param.types.some(function (type) {
	        return type.conversion != null;
	      });
	    }

	    /**
	     * Create a type test for a single parameter, which can have one or multiple
	     * types.
	     * @param {Param} param
	     * @return {function(x: *) : boolean} Returns a test function
	     */
	    function compileTest(param) {
	      if (!param || param.types.length === 0) {
	        // nothing to do
	        return ok;
	      }
	      else if (param.types.length === 1) {
	        return findTypeByName(param.types[0].name).test;
	      }
	      else if (param.types.length === 2) {
	        var test0 = findTypeByName(param.types[0].name).test;
	        var test1 = findTypeByName(param.types[1].name).test;
	        return function or(x) {
	          return test0(x) || test1(x);
	        }
	      }
	      else { // param.types.length > 2
	        var tests = param.types.map(function (type) {
	          return findTypeByName(type.name).test;
	        })
	        return function or(x) {
	          for (var i = 0; i < tests.length; i++) {
	            if (tests[i](x)) {
	              return true;
	            }
	          }
	          return false;
	        }
	      }
	    }

	    /**
	     * Create a test for all parameters of a signature
	     * @param {Param[]} params
	     * @return {function(args: Array<*>) : boolean}
	     */
	    function compileTests(params) {
	      var tests, test0, test1;

	      if (hasRestParam(params)) {
	        // variable arguments like '...number'
	        tests = initial(params).map(compileTest);
	        var varIndex = tests.length;
	        var lastTest = compileTest(last(params));
	        var testRestParam = function (args) {
	          for (var i = varIndex; i < args.length; i++) {
	            if (!lastTest(args[i])) {
	              return false;
	            }
	          }
	          return true;
	        }

	        return function testArgs(args) {
	          for (var i = 0; i < tests.length; i++) {
	            if (!tests[i](args[i])) {
	              return false;
	            }
	          }
	          return testRestParam(args) && (args.length >= varIndex + 1);
	        };
	      }
	      else {
	        // no variable arguments
	        if (params.length === 0) {
	          return function testArgs(args) {
	            return args.length === 0;
	          };
	        }
	        else if (params.length === 1) {
	          test0 = compileTest(params[0]);
	          return function testArgs(args) {
	            return test0(args[0]) && args.length === 1;
	          };
	        }
	        else if (params.length === 2) {
	          test0 = compileTest(params[0]);
	          test1 = compileTest(params[1]);
	          return function testArgs(args) {
	            return test0(args[0]) && test1(args[1]) && args.length === 2;
	          };
	        }
	        else { // arguments.length > 2
	          tests = params.map(compileTest);
	          return function testArgs(args) {
	            for (var i = 0; i < tests.length; i++) {
	              if (!tests[i](args[i])) {
	                return false;
	              }
	            }
	            return args.length === tests.length;
	          };
	        }
	      }
	    }

	    /**
	     * Find the parameter at a specific index of a signature.
	     * Handles rest parameters.
	     * @param {Signature} signature
	     * @param {number} index
	     * @return {Param | null} Returns the matching parameter when found,
	     *                        null otherwise.
	     */
	    function getParamAtIndex(signature, index) {
	      return index < signature.params.length
	          ? signature.params[index]
	          : hasRestParam(signature.params)
	              ? last(signature.params)
	              : null
	    }

	    /**
	     * Get all type names of a parameter
	     * @param {Signature} signature
	     * @param {number} index
	     * @param {boolean} excludeConversions
	     * @return {string[]} Returns an array with type names
	     */
	    function getExpectedTypeNames (signature, index, excludeConversions) {
	      var param = getParamAtIndex(signature, index);
	      var types = param
	          ? excludeConversions
	                  ? param.types.filter(isExactType)
	                  : param.types
	          : [];

	      return types.map(getTypeName);
	    }

	    /**
	     * Returns the name of a type
	     * @param {Type} type
	     * @return {string} Returns the type name
	     */
	    function getTypeName(type) {
	      return type.name;
	    }

	    /**
	     * Test whether a type is an exact type or conversion
	     * @param {Type} type
	     * @return {boolean} Returns true when
	     */
	    function isExactType(type) {
	      return type.conversion === null || type.conversion === undefined;
	    }

	    /**
	     * Helper function for creating error messages: create an array with
	     * all available types on a specific argument index.
	     * @param {Signature[]} signatures
	     * @param {number} index
	     * @return {string[]} Returns an array with available types
	     */
	    function mergeExpectedParams(signatures, index) {
	      var typeNames = uniq(flatMap(signatures, function (signature) {
	        return getExpectedTypeNames(signature, index, false);
	      }));

	      return (typeNames.indexOf('any') !== -1) ? ['any'] : typeNames;
	    }

	    /**
	     * Create
	     * @param {string} name             The name of the function
	     * @param {array.<*>} args          The actual arguments passed to the function
	     * @param {Signature[]} signatures  A list with available signatures
	     * @return {TypeError} Returns a type error with additional data
	     *                     attached to it in the property `data`
	     */
	    function createError(name, args, signatures) {
	      var err, expected;
	      var _name = name || 'unnamed';

	      // test for wrong type at some index
	      var matchingSignatures = signatures;
	      var index;
	      for (index = 0; index < args.length; index++) {
	        var nextMatchingDefs = matchingSignatures.filter(function (signature) {
	          var test = compileTest(getParamAtIndex(signature, index));
	          return (index < signature.params.length || hasRestParam(signature.params)) &&
	              test(args[index]);
	        });

	        if (nextMatchingDefs.length === 0) {
	          // no matching signatures anymore, throw error "wrong type"
	          expected = mergeExpectedParams(matchingSignatures, index);
	          if (expected.length > 0) {
	            var actualType = findTypeName(args[index]);

	            err = new TypeError('Unexpected type of argument in function ' + _name +
	                ' (expected: ' + expected.join(' or ') +
	                ', actual: ' + actualType + ', index: ' + index + ')');
	            err.data = {
	              category: 'wrongType',
	              fn: _name,
	              index: index,
	              actual: actualType,
	              expected: expected
	            }
	            return err;
	          }
	        }
	        else {
	          matchingSignatures = nextMatchingDefs;
	        }
	      }

	      // test for too few arguments
	      var lengths = matchingSignatures.map(function (signature) {
	        return hasRestParam(signature.params) ? Infinity : signature.params.length;
	      });
	      if (args.length < Math.min.apply(null, lengths)) {
	        expected = mergeExpectedParams(matchingSignatures, index);
	        err = new TypeError('Too few arguments in function ' + _name +
	            ' (expected: ' + expected.join(' or ') +
	            ', index: ' + args.length + ')');
	        err.data = {
	          category: 'tooFewArgs',
	          fn: _name,
	          index: args.length,
	          expected: expected
	        }
	        return err;
	      }

	      // test for too many arguments
	      var maxLength = Math.max.apply(null, lengths);
	      if (args.length > maxLength) {
	        err = new TypeError('Too many arguments in function ' + _name +
	            ' (expected: ' + maxLength + ', actual: ' + args.length + ')');
	        err.data = {
	          category: 'tooManyArgs',
	          fn: _name,
	          index: args.length,
	          expectedLength: maxLength
	        }
	        return err;
	      }

	      err = new TypeError('Arguments of type "' + args.join(', ') +
	          '" do not match any of the defined signatures of function ' + _name + '.');
	      err.data = {
	        category: 'mismatch',
	        actual: args.map(findTypeName)
	      }
	      return err;
	    }

	    /**
	     * Find the lowest index of all exact types of a parameter (no conversions)
	     * @param {Param} param
	     * @return {number} Returns the index of the lowest type in typed.types
	     */
	    function getLowestTypeIndex (param) {
	      var min = 999;

	      for (var i = 0; i < param.types.length; i++) {
	        if (isExactType(param.types[i])) {
	          min = Math.min(min, param.types[i].typeIndex);
	        }
	      }

	      return min;
	    }

	    /**
	     * Find the lowest index of the conversion of all types of the parameter
	     * having a conversion
	     * @param {Param} param
	     * @return {number} Returns the lowest index of the conversions of this type
	     */
	    function getLowestConversionIndex (param) {
	      var min = 999;

	      for (var i = 0; i < param.types.length; i++) {
	        if (!isExactType(param.types[i])) {
	          min = Math.min(min, param.types[i].conversionIndex);
	        }
	      }

	      return min;
	    }

	    /**
	     * Compare two params
	     * @param {Param} param1
	     * @param {Param} param2
	     * @return {number} returns a negative number when param1 must get a lower
	     *                  index than param2, a positive number when the opposite,
	     *                  or zero when both are equal
	     */
	    function compareParams (param1, param2) {
	      var c;

	      // compare having a rest parameter or not
	      c = param1.restParam - param2.restParam;
	      if (c !== 0) {
	        return c;
	      }

	      // compare having conversions or not
	      c = hasConversions(param1) - hasConversions(param2);
	      if (c !== 0) {
	        return c;
	      }

	      // compare the index of the types
	      c = getLowestTypeIndex(param1) - getLowestTypeIndex(param2);
	      if (c !== 0) {
	        return c;
	      }

	      // compare the index of any conversion
	      return getLowestConversionIndex(param1) - getLowestConversionIndex(param2);
	    }

	    /**
	     * Compare two signatures
	     * @param {Signature} signature1
	     * @param {Signature} signature2
	     * @return {number} returns a negative number when param1 must get a lower
	     *                  index than param2, a positive number when the opposite,
	     *                  or zero when both are equal
	     */
	    function compareSignatures (signature1, signature2) {
	      var len = Math.min(signature1.params.length, signature2.params.length);
	      var i;
	      var c;

	      // compare whether the params have conversions at all or not
	      c = signature1.params.some(hasConversions) - signature2.params.some(hasConversions)
	      if (c !== 0) {
	        return c;
	      }

	      // next compare whether the params have conversions one by one
	      for (i = 0; i < len; i++) {
	        c = hasConversions(signature1.params[i]) - hasConversions(signature2.params[i]);
	        if (c !== 0) {
	          return c;
	        }
	      }

	      // compare the types of the params one by one
	      for (i = 0; i < len; i++) {
	        c = compareParams(signature1.params[i], signature2.params[i]);
	        if (c !== 0) {
	          return c;
	        }
	      }

	      // compare the number of params
	      return signature1.params.length - signature2.params.length;
	    }

	    /**
	     * Get params containing all types that can be converted to the defined types.
	     *
	     * @param {ConversionDef[]} conversions
	     * @param {string[]} typeNames
	     * @return {ConversionDef[]} Returns the conversions that are available
	     *                        for every type (if any)
	     */
	    function filterConversions(conversions, typeNames) {
	      var matches = {};

	      conversions.forEach(function (conversion) {
	        if (typeNames.indexOf(conversion.from) === -1 &&
	            typeNames.indexOf(conversion.to) !== -1 &&
	            !matches[conversion.from]) {
	          matches[conversion.from] = conversion;
	        }
	      });

	      return Object.keys(matches).map(function (from) {
	        return matches[from];
	      });
	    }

	    /**
	     * Preprocess arguments before calling the original function:
	     * - if needed convert the parameters
	     * - in case of rest parameters, move the rest parameters into an Array
	     * @param {Param[]} params
	     * @param {function} fn
	     * @return {function} Returns a wrapped function
	     */
	    function compileArgsPreprocessing(params, fn) {
	      var fnConvert = fn;

	      // TODO: can we make this wrapper function smarter/simpler?

	      if (params.some(hasConversions)) {
	        var restParam = hasRestParam(params);
	        var compiledConversions = params.map(compileArgConversion)

	        fnConvert = function convertArgs() {
	          var args = [];
	          var last = restParam ? arguments.length - 1 : arguments.length;
	          for (var i = 0; i < last; i++) {
	            args[i] = compiledConversions[i](arguments[i]);
	          }
	          if (restParam) {
	            args[last] = arguments[last].map(compiledConversions[last]);
	          }

	          return fn.apply(null, args);
	        }
	      }

	      var fnPreprocess = fnConvert;
	      if (hasRestParam(params)) {
	        var offset = params.length - 1;

	        fnPreprocess = function preprocessRestParams () {
	          return fnConvert.apply(null,
	              slice(arguments, 0, offset).concat([slice(arguments, offset)]));
	        }
	      }

	      return fnPreprocess;
	    }

	    /**
	     * Compile conversion for a parameter to the right type
	     * @param {Param} param
	     * @return {function} Returns the wrapped function that will convert arguments
	     *
	     */
	    function compileArgConversion(param) {
	      var test0, test1, conversion0, conversion1;
	      var tests = [];
	      var conversions = [];

	      param.types.forEach(function (type) {
	        if (type.conversion) {
	          tests.push(findTypeByName(type.conversion.from).test);
	          conversions.push(type.conversion.convert);
	        }
	      });

	      // create optimized conversion functions depending on the number of conversions
	      switch (conversions.length) {
	        case 0:
	          return function convertArg(arg) {
	            return arg;
	          }

	        case 1:
	          test0 = tests[0]
	          conversion0 = conversions[0];
	          return function convertArg(arg) {
	            if (test0(arg)) {
	              return conversion0(arg)
	            }
	            return arg;
	          }

	        case 2:
	          test0 = tests[0]
	          test1 = tests[1]
	          conversion0 = conversions[0];
	          conversion1 = conversions[1];
	          return function convertArg(arg) {
	            if (test0(arg)) {
	              return conversion0(arg)
	            }
	            if (test1(arg)) {
	              return conversion1(arg)
	            }
	            return arg;
	          }

	        default:
	          return function convertArg(arg) {
	            for (var i = 0; i < conversions.length; i++) {
	              if (tests[i](arg)) {
	                return conversions[i](arg);
	              }
	            }
	            return arg;
	          }
	      }
	    }

	    /**
	     * Convert an array with signatures into a map with signatures,
	     * where signatures with union types are split into separate signatures
	     *
	     * Throws an error when there are conflicting types
	     *
	     * @param {Signature[]} signatures
	     * @return {Object.<string, function>}  Returns a map with signatures
	     *                                      as key and the original function
	     *                                      of this signature as value.
	     */
	    function createSignaturesMap(signatures) {
	      var signaturesMap = {};
	      signatures.forEach(function (signature) {
	        if (!signature.params.some(hasConversions)) {
	          splitParams(signature.params, true).forEach(function (params) {
	            signaturesMap[stringifyParams(params)] = signature.fn;
	          });
	        }
	      });

	      return signaturesMap;
	    }

	    /**
	     * Split params with union types in to separate params.
	     *
	     * For example:
	     *
	     *     splitParams([['Array', 'Object'], ['string', 'RegExp'])
	     *     // returns:
	     *     // [
	     *     //   ['Array', 'string'],
	     *     //   ['Array', 'RegExp'],
	     *     //   ['Object', 'string'],
	     *     //   ['Object', 'RegExp']
	     *     // ]
	     *
	     * @param {Param[]} params
	     * @param {boolean} ignoreConversionTypes
	     * @return {Param[]}
	     */
	    function splitParams(params, ignoreConversionTypes) {
	      function _splitParams(params, index, types) {
	        if (index < params.length) {
	          var param = params[index]
	          var filteredTypes = ignoreConversionTypes
	              ? param.types.filter(isExactType)
	              : param.types;
	          var typeGroups

	          if (param.restParam) {
	            // split the types of a rest parameter in two:
	            // one with only exact types, and one with exact types and conversions
	            var exactTypes = filteredTypes.filter(isExactType)
	            typeGroups = exactTypes.length < filteredTypes.length
	                ? [exactTypes, filteredTypes]
	                : [filteredTypes]

	          }
	          else {
	            // split all the types of a regular parameter into one type per group
	            typeGroups = filteredTypes.map(function (type) {
	              return [type]
	            })
	          }

	          // recurse over the groups with types
	          return flatMap(typeGroups, function (typeGroup) {
	            return _splitParams(params, index + 1, types.concat([typeGroup]));
	          });

	        }
	        else {
	          // we've reached the end of the parameters. Now build a new Param
	          var splittedParams = types.map(function (type, typeIndex) {
	            return {
	              types: type,
	              restParam: (typeIndex === params.length - 1) && hasRestParam(params)
	            }
	          });

	          return [splittedParams];
	        }
	      }

	      return _splitParams(params, 0, []);
	    }

	    /**
	     * Test whether two signatures have a conflicting signature
	     * @param {Signature} signature1
	     * @param {Signature} signature2
	     * @return {boolean} Returns true when the signatures conflict, false otherwise.
	     */
	    function hasConflictingParams(signature1, signature2) {
	      var ii = Math.max(signature1.params.length, signature2.params.length);

	      for (var i = 0; i < ii; i++) {
	        var typesNames1 = getExpectedTypeNames(signature1, i, true);
	        var typesNames2 = getExpectedTypeNames(signature2, i, true);

	        if (!hasOverlap(typesNames1, typesNames2)) {
	          return false;
	        }
	      }

	      var len1 = signature1.params.length;
	      var len2 = signature2.params.length;
	      var restParam1 = hasRestParam(signature1.params);
	      var restParam2 = hasRestParam(signature2.params);

	      return restParam1
	          ? restParam2 ? (len1 === len2) : (len2 >= len1)
	          : restParam2 ? (len1 >= len2)  : (len1 === len2)
	    }

	    /**
	     * Create a typed function
	     * @param {String} name               The name for the typed function
	     * @param {Object.<string, function>} signaturesMap
	     *                                    An object with one or
	     *                                    multiple signatures as key, and the
	     *                                    function corresponding to the
	     *                                    signature as value.
	     * @return {function}  Returns the created typed function.
	     */
	    function createTypedFunction(name, signaturesMap) {
	      if (Object.keys(signaturesMap).length === 0) {
	        throw new SyntaxError('No signatures provided');
	      }

	      // parse the signatures, and check for conflicts
	      var parsedSignatures = [];
	      Object.keys(signaturesMap)
	          .map(function (signature) {
	            return parseSignature(signature, signaturesMap[signature], typed.conversions);
	          })
	          .filter(notNull)
	          .forEach(function (parsedSignature) {
	            // check whether this parameter conflicts with already parsed signatures
	            var conflictingSignature = findInArray(parsedSignatures, function (s) {
	              return hasConflictingParams(s, parsedSignature)
	            });
	            if (conflictingSignature) {
	              throw new TypeError('Conflicting signatures "' +
	                  stringifyParams(conflictingSignature.params) + '" and "' +
	                  stringifyParams(parsedSignature.params) + '".');
	            }

	            parsedSignatures.push(parsedSignature);
	          });

	      // split and filter the types of the signatures, and then order them
	      var signatures = flatMap(parsedSignatures, function (parsedSignature) {
	        var params = parsedSignature ? splitParams(parsedSignature.params, false) : []

	        return params.map(function (params) {
	          return {
	            params: params,
	            fn: parsedSignature.fn
	          };
	        });
	      }).filter(notNull);

	      signatures.sort(compareSignatures);

	      // we create a highly optimized checks for the first couple of signatures with max 2 arguments
	      var ok0 = signatures[0] && signatures[0].params.length <= 2 && !hasRestParam(signatures[0].params);
	      var ok1 = signatures[1] && signatures[1].params.length <= 2 && !hasRestParam(signatures[1].params);
	      var ok2 = signatures[2] && signatures[2].params.length <= 2 && !hasRestParam(signatures[2].params);
	      var ok3 = signatures[3] && signatures[3].params.length <= 2 && !hasRestParam(signatures[3].params);
	      var ok4 = signatures[4] && signatures[4].params.length <= 2 && !hasRestParam(signatures[4].params);
	      var ok5 = signatures[5] && signatures[5].params.length <= 2 && !hasRestParam(signatures[5].params);
	      var allOk = ok0 && ok1 && ok2 && ok3 && ok4 && ok5;

	      // compile the tests
	      var tests = signatures.map(function (signature) {
	        return compileTests(signature.params);
	      });

	      var test00 = ok0 ? compileTest(signatures[0].params[0]) : notOk;
	      var test10 = ok1 ? compileTest(signatures[1].params[0]) : notOk;
	      var test20 = ok2 ? compileTest(signatures[2].params[0]) : notOk;
	      var test30 = ok3 ? compileTest(signatures[3].params[0]) : notOk;
	      var test40 = ok4 ? compileTest(signatures[4].params[0]) : notOk;
	      var test50 = ok5 ? compileTest(signatures[5].params[0]) : notOk;

	      var test01 = ok0 ? compileTest(signatures[0].params[1]) : notOk;
	      var test11 = ok1 ? compileTest(signatures[1].params[1]) : notOk;
	      var test21 = ok2 ? compileTest(signatures[2].params[1]) : notOk;
	      var test31 = ok3 ? compileTest(signatures[3].params[1]) : notOk;
	      var test41 = ok4 ? compileTest(signatures[4].params[1]) : notOk;
	      var test51 = ok5 ? compileTest(signatures[5].params[1]) : notOk;

	      // compile the functions
	      var fns = signatures.map(function(signature) {
	        return compileArgsPreprocessing(signature.params, signature.fn)
	      });

	      var fn0 = ok0 ? fns[0] : undef;
	      var fn1 = ok1 ? fns[1] : undef;
	      var fn2 = ok2 ? fns[2] : undef;
	      var fn3 = ok3 ? fns[3] : undef;
	      var fn4 = ok4 ? fns[4] : undef;
	      var fn5 = ok5 ? fns[5] : undef;

	      var len0 = ok0 ? signatures[0].params.length : -1;
	      var len1 = ok1 ? signatures[1].params.length : -1;
	      var len2 = ok2 ? signatures[2].params.length : -1;
	      var len3 = ok3 ? signatures[3].params.length : -1;
	      var len4 = ok4 ? signatures[4].params.length : -1;
	      var len5 = ok5 ? signatures[5].params.length : -1;

	      // simple and generic, but also slow
	      var iStart = allOk ? 6 : 0;
	      var iEnd = signatures.length;
	      var generic = function generic() {
	        'use strict';

	        for (var i = iStart; i < iEnd; i++) {
	          if (tests[i](arguments)) {
	            return fns[i].apply(null, arguments);
	          }
	        }

	        throw createError(name, arguments, signatures);
	      }

	      // create the typed function
	      // fast, specialized version. Falls back to the slower, generic one if needed
	      var fn = function fn(arg0, arg1) {
	        'use strict';

	        if (arguments.length === len0 && test00(arg0) && test01(arg1)) { return fn0.apply(null, arguments); }
	        if (arguments.length === len1 && test10(arg0) && test11(arg1)) { return fn1.apply(null, arguments); }
	        if (arguments.length === len2 && test20(arg0) && test21(arg1)) { return fn2.apply(null, arguments); }
	        if (arguments.length === len3 && test30(arg0) && test31(arg1)) { return fn3.apply(null, arguments); }
	        if (arguments.length === len4 && test40(arg0) && test41(arg1)) { return fn4.apply(null, arguments); }
	        if (arguments.length === len5 && test50(arg0) && test51(arg1)) { return fn5.apply(null, arguments); }

	        return generic.apply(null, arguments);
	      }

	      // attach name the typed function
	      try {
	        Object.defineProperty(fn, 'name', {value: name});
	      }
	      catch (err) {
	        // old browsers do not support Object.defineProperty and some don't support setting the name property
	        // the function name is not essential for the functioning, it's mostly useful for debugging,
	        // so it's fine to have unnamed functions.
	      }

	      // attach signatures to the function
	      fn.signatures = createSignaturesMap(signatures);

	      return fn;
	    }

	    /**
	     * Test whether a type should be NOT be ignored
	     * @param {string} typeName
	     * @return {boolean}
	     */
	    function notIgnore(typeName) {
	      return typed.ignore.indexOf(typeName) === -1;
	    }

	    /**
	     * trim a string
	     * @param {string} str
	     * @return {string}
	     */
	    function trim(str) {
	      return str.trim();
	    }

	    /**
	     * Test whether a string is not empty
	     * @param {string} str
	     * @return {boolean}
	     */
	    function notEmpty(str) {
	      return !!str;
	    }

	    /**
	     * test whether a value is not strict equal to null
	     * @param {*} value
	     * @return {boolean}
	     */
	    function notNull(value) {
	      return value !== null;
	    }

	    /**
	     * Test whether a parameter has no types defined
	     * @param {Param} param
	     * @return {boolean}
	     */
	    function isInvalidParam (param) {
	      return param.types.length === 0;
	    }

	    /**
	     * Return all but the last items of an array
	     * @param {Array} arr
	     * @return {Array}
	     */
	    function initial(arr) {
	      return arr.slice(0, arr.length - 1);
	    }

	    /**
	     * return the last item of an array
	     * @param {Array} arr
	     * @return {*}
	     */
	    function last(arr) {
	      return arr[arr.length - 1];
	    }

	    /**
	     * Slice an array or function Arguments
	     * @param {Array | Arguments | IArguments} arr
	     * @param {number} start
	     * @param {number} [end]
	     * @return {Array}
	     */
	    function slice(arr, start, end) {
	      return Array.prototype.slice.call(arr, start, end);
	    }

	    /**
	     * Test whether an array contains some item
	     * @param {Array} array
	     * @param {*} item
	     * @return {boolean} Returns true if array contains item, false if not.
	     */
	    function contains(array, item) {
	      return array.indexOf(item) !== -1;
	    }

	    /**
	     * Test whether two arrays have overlapping items
	     * @param {Array} array1
	     * @param {Array} array2
	     * @return {boolean} Returns true when at least one item exists in both arrays
	     */
	    function hasOverlap(array1, array2) {
	      for (var i = 0; i < array1.length; i++) {
	        if (contains(array2, array1[i])) {
	          return true;
	        }
	      }

	      return false;
	    }

	    /**
	     * Return the first item from an array for which test(arr[i]) returns true
	     * @param {Array} arr
	     * @param {function} test
	     * @return {* | undefined} Returns the first matching item
	     *                         or undefined when there is no match
	     */
	    function findInArray(arr, test) {
	      for (var i = 0; i < arr.length; i++) {
	        if (test(arr[i])) {
	          return arr[i];
	        }
	      }
	      return undefined;
	    }

	    /**
	     * Filter unique items of an array with strings
	     * @param {string[]} arr
	     * @return {string[]}
	     */
	    function uniq(arr) {
	      var entries = {}
	      for (var i = 0; i < arr.length; i++) {
	        entries[arr[i]] = true;
	      }
	      return Object.keys(entries);
	    }

	    /**
	     * Flat map the result invoking a callback for every item in an array.
	     * https://gist.github.com/samgiles/762ee337dff48623e729
	     * @param {Array} arr
	     * @param {function} callback
	     * @return {Array}
	     */
	    function flatMap(arr, callback) {
	      return Array.prototype.concat.apply([], arr.map(callback));
	    }

	    /**
	     * Retrieve the function name from a set of typed functions,
	     * and check whether the name of all functions match (if given)
	     * @param {function[]} fns
	     */
	    function getName (fns) {
	      var name = '';

	      for (var i = 0; i < fns.length; i++) {
	        var fn = fns[i];

	        // check whether the names are the same when defined
	        if ((typeof fn.signatures === 'object' || typeof fn.signature === 'string') && fn.name !== '') {
	          if (name === '') {
	            name = fn.name;
	          }
	          else if (name !== fn.name) {
	            var err = new Error('Function names do not match (expected: ' + name + ', actual: ' + fn.name + ')');
	            err.data = {
	              actual: fn.name,
	              expected: name
	            };
	            throw err;
	          }
	        }
	      }

	      return name;
	    }

	    // extract and merge all signatures of a list with typed functions
	    function extractSignatures(fns) {
	      var err;
	      var signaturesMap = {};

	      function validateUnique(_signature, _fn) {
	        if (signaturesMap.hasOwnProperty(_signature) && _fn !== signaturesMap[_signature]) {
	          err = new Error('Signature "' + _signature + '" is defined twice');
	          err.data = {signature: _signature};
	          throw err;
	          // else: both signatures point to the same function, that's fine
	        }
	      }

	      for (var i = 0; i < fns.length; i++) {
	        var fn = fns[i];

	        // test whether this is a typed-function
	        if (typeof fn.signatures === 'object') {
	          // merge the signatures
	          for (var signature in fn.signatures) {
	            if (fn.signatures.hasOwnProperty(signature)) {
	              validateUnique(signature, fn.signatures[signature]);
	              signaturesMap[signature] = fn.signatures[signature];
	            }
	          }
	        }
	        else if (typeof fn.signature === 'string') {
	          validateUnique(fn.signature, fn);
	          signaturesMap[fn.signature] = fn;
	        }
	        else {
	          err = new TypeError('Function is no typed-function (index: ' + i + ')');
	          err.data = {index: i};
	          throw err;
	        }
	      }

	      return signaturesMap;
	    }

	    typed = createTypedFunction('typed', {
	      'string, Object': createTypedFunction,
	      'Object': function (signaturesMap) {
	        // find existing name
	        var fns = [];
	        for (var signature in signaturesMap) {
	          if (signaturesMap.hasOwnProperty(signature)) {
	            fns.push(signaturesMap[signature]);
	          }
	        }
	        var name = getName(fns);
	        return createTypedFunction(name, signaturesMap);
	      },
	      '...Function': function (fns) {
	        return createTypedFunction(getName(fns), extractSignatures(fns));
	      },
	      'string, ...Function': function (name, fns) {
	        return createTypedFunction(name, extractSignatures(fns));
	      }
	    });

	    typed.create = create;
	    typed.types = _types;
	    typed.conversions = _conversions;
	    typed.ignore = _ignore;
	    typed.convert = convert;
	    typed.find = find;

	    /**
	     * add a type
	     * @param {{name: string, test: function}} type
	     * @param {boolean} [beforeObjectTest=true]
	     *                          If true, the new test will be inserted before
	     *                          the test with name 'Object' (if any), since
	     *                          tests for Object match Array and classes too.
	     */
	    typed.addType = function (type, beforeObjectTest) {
	      if (!type || typeof type.name !== 'string' || typeof type.test !== 'function') {
	        throw new TypeError('Object with properties {name: string, test: function} expected');
	      }

	      if (beforeObjectTest !== false) {
	        for (var i = 0; i < typed.types.length; i++) {
	          if (typed.types[i].name === 'Object') {
	            typed.types.splice(i, 0, type);
	            return
	          }
	        }
	      }

	      typed.types.push(type);
	    };

	    // add a conversion
	    typed.addConversion = function (conversion) {
	      if (!conversion
	          || typeof conversion.from !== 'string'
	          || typeof conversion.to !== 'string'
	          || typeof conversion.convert !== 'function') {
	        throw new TypeError('Object with properties {from: string, to: string, convert: function} expected');
	      }

	      typed.conversions.push(conversion);
	    };

	    return typed;
	  }

	  return create();
	}));

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var objectUtils = __webpack_require__(4);
	/**
	 * @typedef {{sign: '+' | '-' | '', coefficients: number[], exponent: number}} SplitValue
	 */

	/**
	 * Test whether value is a number
	 * @param {*} value
	 * @return {boolean} isNumber
	 */


	exports.isNumber = function (value) {
	  return typeof value === 'number';
	};
	/**
	 * Check if a number is integer
	 * @param {number | boolean} value
	 * @return {boolean} isInteger
	 */


	exports.isInteger = function (value) {
	  if (typeof value === 'boolean') {
	    return true;
	  }

	  return isFinite(value) ? value === Math.round(value) : false; // Note: we use ==, not ===, as we can have Booleans as well
	};
	/**
	 * Calculate the sign of a number
	 * @param {number} x
	 * @returns {*}
	 */


	exports.sign = Math.sign || function (x) {
	  if (x > 0) {
	    return 1;
	  } else if (x < 0) {
	    return -1;
	  } else {
	    return 0;
	  }
	};
	/**
	 * Convert a number to a formatted string representation.
	 *
	 * Syntax:
	 *
	 *    format(value)
	 *    format(value, options)
	 *    format(value, precision)
	 *    format(value, fn)
	 *
	 * Where:
	 *
	 *    {number} value   The value to be formatted
	 *    {Object} options An object with formatting options. Available options:
	 *                     {string} notation
	 *                         Number notation. Choose from:
	 *                         'fixed'          Always use regular number notation.
	 *                                          For example '123.40' and '14000000'
	 *                         'exponential'    Always use exponential notation.
	 *                                          For example '1.234e+2' and '1.4e+7'
	 *                         'engineering'    Always use engineering notation.
	 *                                          For example '123.4e+0' and '14.0e+6'
	 *                         'auto' (default) Regular number notation for numbers
	 *                                          having an absolute value between
	 *                                          `lowerExp` and `upperExp` bounds, and
	 *                                          uses exponential notation elsewhere.
	 *                                          Lower bound is included, upper bound
	 *                                          is excluded.
	 *                                          For example '123.4' and '1.4e7'.
	 *                     {number} precision   A number between 0 and 16 to round
	 *                                          the digits of the number.
	 *                                          In case of notations 'exponential',
	 *                                          'engineering', and 'auto',
	 *                                          `precision` defines the total
	 *                                          number of significant digits returned.
	 *                                          In case of notation 'fixed',
	 *                                          `precision` defines the number of
	 *                                          significant digits after the decimal
	 *                                          point.
	 *                                          `precision` is undefined by default,
	 *                                          not rounding any digits.
	 *                     {number} lowerExp    Exponent determining the lower boundary
	 *                                          for formatting a value with an exponent
	 *                                          when `notation='auto`.
	 *                                          Default value is `-3`.
	 *                     {number} upperExp    Exponent determining the upper boundary
	 *                                          for formatting a value with an exponent
	 *                                          when `notation='auto`.
	 *                                          Default value is `5`.
	 *    {Function} fn    A custom formatting function. Can be used to override the
	 *                     built-in notations. Function `fn` is called with `value` as
	 *                     parameter and must return a string. Is useful for example to
	 *                     format all values inside a matrix in a particular way.
	 *
	 * Examples:
	 *
	 *    format(6.4)                                        // '6.4'
	 *    format(1240000)                                    // '1.24e6'
	 *    format(1/3)                                        // '0.3333333333333333'
	 *    format(1/3, 3)                                     // '0.333'
	 *    format(21385, 2)                                   // '21000'
	 *    format(12.071, {notation: 'fixed'})                // '12'
	 *    format(2.3,    {notation: 'fixed', precision: 2})  // '2.30'
	 *    format(52.8,   {notation: 'exponential'})          // '5.28e+1'
	 *    format(12345678, {notation: 'engineering'})        // '12.345678e+6'
	 *
	 * @param {number} value
	 * @param {Object | Function | number} [options]
	 * @return {string} str The formatted value
	 */


	exports.format = function (value, options) {
	  if (typeof options === 'function') {
	    // handle format(value, fn)
	    return options(value);
	  } // handle special cases


	  if (value === Infinity) {
	    return 'Infinity';
	  } else if (value === -Infinity) {
	    return '-Infinity';
	  } else if (isNaN(value)) {
	    return 'NaN';
	  } // default values for options


	  var notation = 'auto';
	  var precision;

	  if (options) {
	    // determine notation from options
	    if (options.notation) {
	      notation = options.notation;
	    } // determine precision from options


	    if (exports.isNumber(options)) {
	      precision = options;
	    } else if (exports.isNumber(options.precision)) {
	      precision = options.precision;
	    }
	  } // handle the various notations


	  switch (notation) {
	    case 'fixed':
	      return exports.toFixed(value, precision);

	    case 'exponential':
	      return exports.toExponential(value, precision);

	    case 'engineering':
	      return exports.toEngineering(value, precision);

	    case 'auto':
	      // TODO: clean up some day. Deprecated since: 2018-01-24
	      // @deprecated upper and lower are replaced with upperExp and lowerExp since v4.0.0
	      if (options && options.exponential && (options.exponential.lower !== undefined || options.exponential.upper !== undefined)) {
	        var fixedOptions = objectUtils.map(options, function (x) {
	          return x;
	        });
	        fixedOptions.exponential = undefined;

	        if (options.exponential.lower !== undefined) {
	          fixedOptions.lowerExp = Math.round(Math.log(options.exponential.lower) / Math.LN10);
	        }

	        if (options.exponential.upper !== undefined) {
	          fixedOptions.upperExp = Math.round(Math.log(options.exponential.upper) / Math.LN10);
	        }

	        console.warn('Deprecation warning: Formatting options exponential.lower and exponential.upper ' + '(minimum and maximum value) ' + 'are replaced with exponential.lowerExp and exponential.upperExp ' + '(minimum and maximum exponent) since version 4.0.0. ' + 'Replace ' + JSON.stringify(options) + ' with ' + JSON.stringify(fixedOptions));
	        return exports.toPrecision(value, precision, fixedOptions);
	      }

	      return exports.toPrecision(value, precision, options && options) // remove trailing zeros after the decimal point
	      .replace(/((\.\d*?)(0+))($|e)/, function () {
	        var digits = arguments[2];
	        var e = arguments[4];
	        return digits !== '.' ? digits + e : e;
	      });

	    default:
	      throw new Error('Unknown notation "' + notation + '". ' + 'Choose "auto", "exponential", or "fixed".');
	  }
	};
	/**
	 * Split a number into sign, coefficients, and exponent
	 * @param {number | string} value
	 * @return {SplitValue}
	 *              Returns an object containing sign, coefficients, and exponent
	 */


	exports.splitNumber = function (value) {
	  // parse the input value
	  var match = String(value).toLowerCase().match(/^0*?(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);

	  if (!match) {
	    throw new SyntaxError('Invalid number ' + value);
	  }

	  var sign = match[1];
	  var digits = match[2];
	  var exponent = parseFloat(match[4] || '0');
	  var dot = digits.indexOf('.');
	  exponent += dot !== -1 ? dot - 1 : digits.length - 1;
	  var coefficients = digits.replace('.', '') // remove the dot (must be removed before removing leading zeros)
	  .replace(/^0*/, function (zeros) {
	    // remove leading zeros, add their count to the exponent
	    exponent -= zeros.length;
	    return '';
	  }).replace(/0*$/, '') // remove trailing zeros
	  .split('').map(function (d) {
	    return parseInt(d);
	  });

	  if (coefficients.length === 0) {
	    coefficients.push(0);
	    exponent++;
	  }

	  return {
	    sign: sign,
	    coefficients: coefficients,
	    exponent: exponent
	  };
	};
	/**
	 * Format a number in engineering notation. Like '1.23e+6', '2.3e+0', '3.500e-3'
	 * @param {number | string} value
	 * @param {number} [precision]        Optional number of significant figures to return.
	 */


	exports.toEngineering = function (value, precision) {
	  if (isNaN(value) || !isFinite(value)) {
	    return String(value);
	  }

	  var rounded = exports.roundDigits(exports.splitNumber(value), precision);
	  var e = rounded.exponent;
	  var c = rounded.coefficients; // find nearest lower multiple of 3 for exponent

	  var newExp = e % 3 === 0 ? e : e < 0 ? e - 3 - e % 3 : e - e % 3;

	  if (exports.isNumber(precision)) {
	    // add zeroes to give correct sig figs
	    while (precision > c.length || e - newExp + 1 > c.length) {
	      c.push(0);
	    }
	  } else {
	    // concatenate coefficients with necessary zeros
	    var significandsDiff = e >= 0 ? e : Math.abs(newExp); // add zeros if necessary (for ex: 1e+8)

	    while (c.length - 1 < significandsDiff) {
	      c.push(0);
	    }
	  } // find difference in exponents


	  var expDiff = Math.abs(e - newExp);
	  var decimalIdx = 1; // push decimal index over by expDiff times

	  while (expDiff > 0) {
	    decimalIdx++;
	    expDiff--;
	  } // if all coefficient values are zero after the decimal point and precision is unset, don't add a decimal value.
	  // otherwise concat with the rest of the coefficients


	  var decimals = c.slice(decimalIdx).join('');
	  var decimalVal = exports.isNumber(precision) && decimals.length || decimals.match(/[1-9]/) ? '.' + decimals : '';
	  var str = c.slice(0, decimalIdx).join('') + decimalVal + 'e' + (e >= 0 ? '+' : '') + newExp.toString();
	  return rounded.sign + str;
	};
	/**
	 * Format a number with fixed notation.
	 * @param {number | string} value
	 * @param {number} [precision=undefined]  Optional number of decimals after the
	 *                                        decimal point. null by default.
	 */


	exports.toFixed = function (value, precision) {
	  if (isNaN(value) || !isFinite(value)) {
	    return String(value);
	  }

	  var splitValue = exports.splitNumber(value);
	  var rounded = typeof precision === 'number' ? exports.roundDigits(splitValue, splitValue.exponent + 1 + precision) : splitValue;
	  var c = rounded.coefficients;
	  var p = rounded.exponent + 1; // exponent may have changed
	  // append zeros if needed

	  var pp = p + (precision || 0);

	  if (c.length < pp) {
	    c = c.concat(zeros(pp - c.length));
	  } // prepend zeros if needed


	  if (p < 0) {
	    c = zeros(-p + 1).concat(c);
	    p = 1;
	  } // insert a dot if needed


	  if (p < c.length) {
	    c.splice(p, 0, p === 0 ? '0.' : '.');
	  }

	  return rounded.sign + c.join('');
	};
	/**
	 * Format a number in exponential notation. Like '1.23e+5', '2.3e+0', '3.500e-3'
	 * @param {number | string} value
	 * @param {number} [precision]  Number of digits in formatted output.
	 *                              If not provided, the maximum available digits
	 *                              is used.
	 */


	exports.toExponential = function (value, precision) {
	  if (isNaN(value) || !isFinite(value)) {
	    return String(value);
	  } // round if needed, else create a clone


	  var split = exports.splitNumber(value);
	  var rounded = precision ? exports.roundDigits(split, precision) : split;
	  var c = rounded.coefficients;
	  var e = rounded.exponent; // append zeros if needed

	  if (c.length < precision) {
	    c = c.concat(zeros(precision - c.length));
	  } // format as `C.CCCe+EEE` or `C.CCCe-EEE`


	  var first = c.shift();
	  return rounded.sign + first + (c.length > 0 ? '.' + c.join('') : '') + 'e' + (e >= 0 ? '+' : '') + e;
	};
	/**
	 * Format a number with a certain precision
	 * @param {number | string} value
	 * @param {number} [precision=undefined] Optional number of digits.
	 * @param {{lowerExp: number | undefined, upperExp: number | undefined}} [options]
	 *                                       By default:
	 *                                         lowerExp = -3 (incl)
	 *                                         upper = +5 (excl)
	 * @return {string}
	 */


	exports.toPrecision = function (value, precision, options) {
	  if (isNaN(value) || !isFinite(value)) {
	    return String(value);
	  } // determine lower and upper bound for exponential notation.


	  var lowerExp = options && options.lowerExp !== undefined ? options.lowerExp : -3;
	  var upperExp = options && options.upperExp !== undefined ? options.upperExp : 5;
	  var split = exports.splitNumber(value);

	  if (split.exponent < lowerExp || split.exponent >= upperExp) {
	    // exponential notation
	    return exports.toExponential(value, precision);
	  } else {
	    var rounded = precision ? exports.roundDigits(split, precision) : split;
	    var c = rounded.coefficients;
	    var e = rounded.exponent; // append trailing zeros

	    if (c.length < precision) {
	      c = c.concat(zeros(precision - c.length));
	    } // append trailing zeros
	    // TODO: simplify the next statement


	    c = c.concat(zeros(e - c.length + 1 + (c.length < precision ? precision - c.length : 0))); // prepend zeros

	    c = zeros(-e).concat(c);
	    var dot = e > 0 ? e : 0;

	    if (dot < c.length - 1) {
	      c.splice(dot + 1, 0, '.');
	    }

	    return rounded.sign + c.join('');
	  }
	};
	/**
	 * Round the number of digits of a number *
	 * @param {SplitValue} split       A value split with .splitNumber(value)
	 * @param {number} precision  A positive integer
	 * @return {SplitValue}
	 *              Returns an object containing sign, coefficients, and exponent
	 *              with rounded digits
	 */


	exports.roundDigits = function (split, precision) {
	  // create a clone
	  var rounded = {
	    sign: split.sign,
	    coefficients: split.coefficients,
	    exponent: split.exponent
	  };
	  var c = rounded.coefficients; // prepend zeros if needed

	  while (precision <= 0) {
	    c.unshift(0);
	    rounded.exponent++;
	    precision++;
	  }

	  if (c.length > precision) {
	    var removed = c.splice(precision, c.length - precision);

	    if (removed[0] >= 5) {
	      var i = precision - 1;
	      c[i]++;

	      while (c[i] === 10) {
	        c.pop();

	        if (i === 0) {
	          c.unshift(0);
	          rounded.exponent++;
	          i++;
	        }

	        i--;
	        c[i]++;
	      }
	    }
	  }

	  return rounded;
	};
	/**
	 * Create an array filled with zeros.
	 * @param {number} length
	 * @return {Array}
	 */


	function zeros(length) {
	  var arr = [];

	  for (var i = 0; i < length; i++) {
	    arr.push(0);
	  }

	  return arr;
	}
	/**
	 * Count the number of significant digits of a number.
	 *
	 * For example:
	 *   2.34 returns 3
	 *   0.0034 returns 2
	 *   120.5e+30 returns 4
	 *
	 * @param {number} value
	 * @return {number} digits   Number of significant digits
	 */


	exports.digits = function (value) {
	  return value.toExponential().replace(/e.*$/, '') // remove exponential notation
	  .replace(/^0\.?0*|\./, '') // remove decimal point and leading zeros
	  .length;
	};
	/**
	 * Minimum number added to one that makes the result different than one
	 */


	exports.DBL_EPSILON = Number.EPSILON || 2.2204460492503130808472633361816E-16;
	/**
	 * Compares two floating point numbers.
	 * @param {number} x          First value to compare
	 * @param {number} y          Second value to compare
	 * @param {number} [epsilon]  The maximum relative difference between x and y
	 *                            If epsilon is undefined or null, the function will
	 *                            test whether x and y are exactly equal.
	 * @return {boolean} whether the two numbers are nearly equal
	*/

	exports.nearlyEqual = function (x, y, epsilon) {
	  // if epsilon is null or undefined, test whether x and y are exactly equal
	  if (epsilon === null || epsilon === undefined) {
	    return x === y;
	  }

	  if (x === y) {
	    return true;
	  } // NaN


	  if (isNaN(x) || isNaN(y)) {
	    return false;
	  } // at this point x and y should be finite


	  if (isFinite(x) && isFinite(y)) {
	    // check numbers are very close, needed when comparing numbers near zero
	    var diff = Math.abs(x - y);

	    if (diff < exports.DBL_EPSILON) {
	      return true;
	    } else {
	      // use relative error
	      return diff <= Math.max(Math.abs(x), Math.abs(y)) * epsilon;
	    }
	  } // Infinite and Number or negative Infinite and positive Infinite cases


	  return false;
	};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	'use strict';
	/**
	 * Test whether a value is a Matrix
	 * @param {*} x
	 * @returns {boolean} returns true with input is a Matrix
	 *                    (like a DenseMatrix or SparseMatrix)
	 */

	module.exports = function isMatrix(x) {
	  return x && x.constructor.prototype.isMatrix || false;
	};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Emitter = __webpack_require__(11);
	/**
	 * Extend given object with emitter functions `on`, `off`, `once`, `emit`
	 * @param {Object} obj
	 * @return {Object} obj
	 */


	exports.mixin = function (obj) {
	  // create event emitter
	  var emitter = new Emitter(); // bind methods to obj (we don't want to expose the emitter.e Array...)

	  obj.on = emitter.on.bind(emitter);
	  obj.off = emitter.off.bind(emitter);
	  obj.once = emitter.once.bind(emitter);
	  obj.emit = emitter.emit.bind(emitter);
	  return obj;
	};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	function E () {
	  // Keep this empty so it's easier to inherit from
	  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
	}

	E.prototype = {
	  on: function (name, callback, ctx) {
	    var e = this.e || (this.e = {});

	    (e[name] || (e[name] = [])).push({
	      fn: callback,
	      ctx: ctx
	    });

	    return this;
	  },

	  once: function (name, callback, ctx) {
	    var self = this;
	    function listener () {
	      self.off(name, listener);
	      callback.apply(ctx, arguments);
	    };

	    listener._ = callback
	    return this.on(name, listener, ctx);
	  },

	  emit: function (name) {
	    var data = [].slice.call(arguments, 1);
	    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
	    var i = 0;
	    var len = evtArr.length;

	    for (i; i < len; i++) {
	      evtArr[i].fn.apply(evtArr[i].ctx, data);
	    }

	    return this;
	  },

	  off: function (name, callback) {
	    var e = this.e || (this.e = {});
	    var evts = e[name];
	    var liveEvents = [];

	    if (evts && callback) {
	      for (var i = 0, len = evts.length; i < len; i++) {
	        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
	          liveEvents.push(evts[i]);
	      }
	    }

	    // Remove event from queue to prevent memory leak
	    // Suggested by https://github.com/lazd
	    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

	    (liveEvents.length)
	      ? e[name] = liveEvents
	      : delete e[name];

	    return this;
	  }
	};

	module.exports = E;
	module.exports.TinyEmitter = E;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	var lazy = __webpack_require__(4).lazy;

	var isFactory = __webpack_require__(4).isFactory;

	var traverse = __webpack_require__(4).traverse;

	var ArgumentsError = __webpack_require__(13);

	function factory(type, config, load, typed, math) {
	  /**
	   * Import functions from an object or a module
	   *
	   * Syntax:
	   *
	   *    math.import(object)
	   *    math.import(object, options)
	   *
	   * Where:
	   *
	   * - `object: Object`
	   *   An object with functions to be imported.
	   * - `options: Object` An object with import options. Available options:
	   *   - `override: boolean`
	   *     If true, existing functions will be overwritten. False by default.
	   *   - `silent: boolean`
	   *     If true, the function will not throw errors on duplicates or invalid
	   *     types. False by default.
	   *   - `wrap: boolean`
	   *     If true, the functions will be wrapped in a wrapper function
	   *     which converts data types like Matrix to primitive data types like Array.
	   *     The wrapper is needed when extending math.js with libraries which do not
	   *     support these data type. False by default.
	   *
	   * Examples:
	   *
	   *    // define new functions and variables
	   *    math.import({
	   *      myvalue: 42,
	   *      hello: function (name) {
	   *        return 'hello, ' + name + '!'
	   *      }
	   *    })
	   *
	   *    // use the imported function and variable
	   *    math.myvalue * 2               // 84
	   *    math.hello('user')             // 'hello, user!'
	   *
	   *    // import the npm module 'numbers'
	   *    // (must be installed first with `npm install numbers`)
	   *    math.import(require('numbers'), {wrap: true})
	   *
	   *    math.fibonacci(7) // returns 13
	   *
	   * @param {Object | Array} object   Object with functions to be imported.
	   * @param {Object} [options]        Import options.
	   */
	  function mathImport(object, options) {
	    var num = arguments.length;

	    if (num !== 1 && num !== 2) {
	      throw new ArgumentsError('import', num, 1, 2);
	    }

	    if (!options) {
	      options = {};
	    } // TODO: allow a typed-function with name too


	    if (isFactory(object)) {
	      _importFactory(object, options);
	    } else if (Array.isArray(object)) {
	      object.forEach(function (entry) {
	        mathImport(entry, options);
	      });
	    } else if (_typeof(object) === 'object') {
	      // a map with functions
	      for (var name in object) {
	        if (object.hasOwnProperty(name)) {
	          var value = object[name];

	          if (isSupportedType(value)) {
	            _import(name, value, options);
	          } else if (isFactory(object)) {
	            _importFactory(object, options);
	          } else {
	            mathImport(value, options);
	          }
	        }
	      }
	    } else {
	      if (!options.silent) {
	        throw new TypeError('Factory, Object, or Array expected');
	      }
	    }
	  }
	  /**
	   * Add a property to the math namespace and create a chain proxy for it.
	   * @param {string} name
	   * @param {*} value
	   * @param {Object} options  See import for a description of the options
	   * @private
	   */


	  function _import(name, value, options) {
	    // TODO: refactor this function, it's to complicated and contains duplicate code
	    if (options.wrap && typeof value === 'function') {
	      // create a wrapper around the function
	      value = _wrap(value);
	    }

	    if (isTypedFunction(math[name]) && isTypedFunction(value)) {
	      if (options.override) {
	        // give the typed function the right name
	        value = typed(name, value.signatures);
	      } else {
	        // merge the existing and typed function
	        value = typed(math[name], value);
	      }

	      math[name] = value;

	      _importTransform(name, value);

	      math.emit('import', name, function resolver() {
	        return value;
	      });
	      return;
	    }

	    if (math[name] === undefined || options.override) {
	      math[name] = value;

	      _importTransform(name, value);

	      math.emit('import', name, function resolver() {
	        return value;
	      });
	      return;
	    }

	    if (!options.silent) {
	      throw new Error('Cannot import "' + name + '": already exists');
	    }
	  }

	  function _importTransform(name, value) {
	    if (value && typeof value.transform === 'function') {
	      math.expression.transform[name] = value.transform;

	      if (allowedInExpressions(name)) {
	        math.expression.mathWithTransform[name] = value.transform;
	      }
	    } else {
	      // remove existing transform
	      delete math.expression.transform[name];

	      if (allowedInExpressions(name)) {
	        math.expression.mathWithTransform[name] = value;
	      }
	    }
	  }

	  function _deleteTransform(name) {
	    delete math.expression.transform[name];

	    if (allowedInExpressions(name)) {
	      math.expression.mathWithTransform[name] = math[name];
	    } else {
	      delete math.expression.mathWithTransform[name];
	    }
	  }
	  /**
	   * Create a wrapper a round an function which converts the arguments
	   * to their primitive values (like convert a Matrix to Array)
	   * @param {Function} fn
	   * @return {Function} Returns the wrapped function
	   * @private
	   */


	  function _wrap(fn) {
	    var wrapper = function wrapper() {
	      var args = [];

	      for (var i = 0, len = arguments.length; i < len; i++) {
	        var arg = arguments[i];
	        args[i] = arg && arg.valueOf();
	      }

	      return fn.apply(math, args);
	    };

	    if (fn.transform) {
	      wrapper.transform = fn.transform;
	    }

	    return wrapper;
	  }
	  /**
	   * Import an instance of a factory into math.js
	   * @param {{factory: Function, name: string, path: string, math: boolean}} factory
	   * @param {Object} options  See import for a description of the options
	   * @private
	   */


	  function _importFactory(factory, options) {
	    if (typeof factory.name === 'string') {
	      var name = factory.name;
	      var existingTransform = name in math.expression.transform;
	      var namespace = factory.path ? traverse(math, factory.path) : math;
	      var existing = namespace.hasOwnProperty(name) ? namespace[name] : undefined;

	      var resolver = function resolver() {
	        var instance = load(factory);

	        if (instance && typeof instance.transform === 'function') {
	          throw new Error('Transforms cannot be attached to factory functions. ' + 'Please create a separate function for it with exports.path="expression.transform"');
	        }

	        if (isTypedFunction(existing) && isTypedFunction(instance)) {
	          if (options.override) {// replace the existing typed function (nothing to do)
	          } else {
	            // merge the existing and new typed function
	            instance = typed(existing, instance);
	          }

	          return instance;
	        }

	        if (existing === undefined || options.override) {
	          return instance;
	        }

	        if (!options.silent) {
	          throw new Error('Cannot import "' + name + '": already exists');
	        }
	      };

	      if (factory.lazy !== false) {
	        lazy(namespace, name, resolver);

	        if (existingTransform) {
	          _deleteTransform(name);
	        } else {
	          if (factory.path === 'expression.transform' || factoryAllowedInExpressions(factory)) {
	            lazy(math.expression.mathWithTransform, name, resolver);
	          }
	        }
	      } else {
	        namespace[name] = resolver();

	        if (existingTransform) {
	          _deleteTransform(name);
	        } else {
	          if (factory.path === 'expression.transform' || factoryAllowedInExpressions(factory)) {
	            math.expression.mathWithTransform[name] = resolver();
	          }
	        }
	      }

	      math.emit('import', name, resolver, factory.path);
	    } else {
	      // unnamed factory.
	      // no lazy loading
	      load(factory);
	    }
	  }
	  /**
	   * Check whether given object is a type which can be imported
	   * @param {Function | number | string | boolean | null | Unit | Complex} object
	   * @return {boolean}
	   * @private
	   */


	  function isSupportedType(object) {
	    return typeof object === 'function' || typeof object === 'number' || typeof object === 'string' || typeof object === 'boolean' || object === null || object && type.isUnit(object) || object && type.isComplex(object) || object && type.isBigNumber(object) || object && type.isFraction(object) || object && type.isMatrix(object) || object && Array.isArray(object);
	  }
	  /**
	   * Test whether a given thing is a typed-function
	   * @param {*} fn
	   * @return {boolean} Returns true when `fn` is a typed-function
	   */


	  function isTypedFunction(fn) {
	    return typeof fn === 'function' && _typeof(fn.signatures) === 'object';
	  }

	  function allowedInExpressions(name) {
	    return !unsafe.hasOwnProperty(name);
	  }

	  function factoryAllowedInExpressions(factory) {
	    return factory.path === undefined && !unsafe.hasOwnProperty(factory.name);
	  } // namespaces and functions not available in the parser for safety reasons


	  var unsafe = {
	    'expression': true,
	    'type': true,
	    'docs': true,
	    'error': true,
	    'json': true,
	    'chain': true // chain method not supported. Note that there is a unit chain too.

	  };
	  return mathImport;
	}

	exports.math = true; // request access to the math namespace as 5th argument of the factory function

	exports.name = 'import';
	exports.factory = factory;
	exports.lazy = true;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	'use strict';
	/**
	 * Create a syntax error with the message:
	 *     'Wrong number of arguments in function <fn> (<count> provided, <min>-<max> expected)'
	 * @param {string} fn     Function name
	 * @param {number} count  Actual argument count
	 * @param {number} min    Minimum required argument count
	 * @param {number} [max]  Maximum required argument count
	 * @extends Error
	 */

	function ArgumentsError(fn, count, min, max) {
	  if (!(this instanceof ArgumentsError)) {
	    throw new SyntaxError('Constructor must be called with the new operator');
	  }

	  this.fn = fn;
	  this.count = count;
	  this.min = min;
	  this.max = max;
	  this.message = 'Wrong number of arguments in function ' + fn + ' (' + count + ' provided, ' + min + (max !== undefined && max !== null ? '-' + max : '') + ' expected)';
	  this.stack = new Error().stack;
	}

	ArgumentsError.prototype = new Error();
	ArgumentsError.prototype.constructor = Error;
	ArgumentsError.prototype.name = 'ArgumentsError';
	ArgumentsError.prototype.isArgumentsError = true;
	module.exports = ArgumentsError;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(4);

	function factory(type, config, load, typed, math) {
	  var MATRIX = ['Matrix', 'Array']; // valid values for option matrix

	  var NUMBER = ['number', 'BigNumber', 'Fraction']; // valid values for option number

	  /**
	   * Set configuration options for math.js, and get current options.
	   * Will emit a 'config' event, with arguments (curr, prev, changes).
	   *
	   * Syntax:
	   *
	   *     math.config(config: Object): Object
	   *
	   * Examples:
	   *
	   *     math.config().number                // outputs 'number'
	   *     math.eval('0.4')                    // outputs number 0.4
	   *     math.config({number: 'Fraction'})
	   *     math.eval('0.4')                    // outputs Fraction 2/5
	   *
	   * @param {Object} [options] Available options:
	   *                            {number} epsilon
	   *                              Minimum relative difference between two
	   *                              compared values, used by all comparison functions.
	   *                            {string} matrix
	   *                              A string 'Matrix' (default) or 'Array'.
	   *                            {string} number
	   *                              A string 'number' (default), 'BigNumber', or 'Fraction'
	   *                            {number} precision
	   *                              The number of significant digits for BigNumbers.
	   *                              Not applicable for Numbers.
	   *                            {string} parenthesis
	   *                              How to display parentheses in LaTeX and string
	   *                              output.
	   *                            {string} randomSeed
	   *                              Random seed for seeded pseudo random number generator.
	   *                              Set to null to randomly seed.
	   * @return {Object} Returns the current configuration
	   */

	  function _config(options) {
	    if (options) {
	      var prev = object.map(config, object.clone); // validate some of the options

	      validateOption(options, 'matrix', MATRIX);
	      validateOption(options, 'number', NUMBER); // merge options

	      object.deepExtend(config, options);
	      var curr = object.map(config, object.clone);
	      var changes = object.map(options, object.clone); // emit 'config' event

	      math.emit('config', curr, prev, changes);
	      return curr;
	    } else {
	      return object.map(config, object.clone);
	    }
	  } // attach the valid options to the function so they can be extended


	  _config.MATRIX = MATRIX;
	  _config.NUMBER = NUMBER;
	  return _config;
	}
	/**
	 * Test whether an Array contains a specific item.
	 * @param {Array.<string>} array
	 * @param {string} item
	 * @return {boolean}
	 */


	function contains(array, item) {
	  return array.indexOf(item) !== -1;
	}
	/**
	 * Find a string in an array. Case insensitive search
	 * @param {Array.<string>} array
	 * @param {string} item
	 * @return {number} Returns the index when found. Returns -1 when not found
	 */


	function findIndex(array, item) {
	  return array.map(function (i) {
	    return i.toLowerCase();
	  }).indexOf(item.toLowerCase());
	}
	/**
	 * Validate an option
	 * @param {Object} options         Object with options
	 * @param {string} name            Name of the option to validate
	 * @param {Array.<string>} values  Array with valid values for this option
	 */


	function validateOption(options, name, values) {
	  if (options[name] !== undefined && !contains(values, options[name])) {
	    var index = findIndex(values, options[name]);

	    if (index !== -1) {
	      // right value, wrong casing
	      // TODO: lower case values are deprecated since v3, remove this warning some day.
	      console.warn('Warning: Wrong casing for configuration option "' + name + '", should be "' + values[index] + '" instead of "' + options[name] + '".');
	      options[name] = values[index]; // change the option to the right casing
	    } else {
	      // unknown value
	      console.warn('Warning: Unknown value "' + options[name] + '" for configuration option "' + name + '". Available options: ' + values.map(JSON.stringify).join(', ') + '.');
	    }
	  }
	}

	exports.name = 'config';
	exports.math = true; // request the math namespace as fifth argument

	exports.factory = factory;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(16);

	var string = util.string;
	var isString = string.isString;

	function factory(type, config, load, typed) {
	  /**
	   * @constructor Matrix
	   *
	   * A Matrix is a wrapper around an Array. A matrix can hold a multi dimensional
	   * array. A matrix can be constructed as:
	   *
	   *     let matrix = math.matrix(data)
	   *
	   * Matrix contains the functions to resize, get and set values, get the size,
	   * clone the matrix and to convert the matrix to a vector, array, or scalar.
	   * Furthermore, one can iterate over the matrix using map and forEach.
	   * The internal Array of the Matrix can be accessed using the function valueOf.
	   *
	   * Example usage:
	   *
	   *     let matrix = math.matrix([[1, 2], [3, 4]])
	   *     matix.size()              // [2, 2]
	   *     matrix.resize([3, 2], 5)
	   *     matrix.valueOf()          // [[1, 2], [3, 4], [5, 5]]
	   *     matrix.subset([1,2])       // 3 (indexes are zero-based)
	   *
	   */
	  function Matrix() {
	    if (!(this instanceof Matrix)) {
	      throw new SyntaxError('Constructor must be called with the new operator');
	    }
	  }
	  /**
	   * Attach type information
	   */


	  Matrix.prototype.type = 'Matrix';
	  Matrix.prototype.isMatrix = true;
	  /**
	   * Get the Matrix storage constructor for the given format.
	   *
	   * @param {string} format       The Matrix storage format.
	   *
	   * @return {Function}           The Matrix storage constructor.
	   */

	  Matrix.storage = function (format) {
	    // check storage format is a string
	    if (!isString(format)) {
	      throw new TypeError('format must be a string value');
	    } // get storage format constructor


	    var constructor = Matrix._storage[format];

	    if (!constructor) {
	      throw new SyntaxError('Unsupported matrix storage format: ' + format);
	    } // return storage constructor


	    return constructor;
	  }; // a map with all constructors for all storage types


	  Matrix._storage = {};
	  /**
	   * Get the storage format used by the matrix.
	   *
	   * Usage:
	   *     const format = matrix.storage()   // retrieve storage format
	   *
	   * @return {string}           The storage format.
	   */

	  Matrix.prototype.storage = function () {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke storage on a Matrix interface');
	  };
	  /**
	   * Get the datatype of the data stored in the matrix.
	   *
	   * Usage:
	   *     const format = matrix.datatype()    // retrieve matrix datatype
	   *
	   * @return {string}           The datatype.
	   */


	  Matrix.prototype.datatype = function () {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke datatype on a Matrix interface');
	  };
	  /**
	   * Create a new Matrix With the type of the current matrix instance
	   * @param {Array | Object} data
	   * @param {string} [datatype]
	   */


	  Matrix.prototype.create = function (data, datatype) {
	    throw new Error('Cannot invoke create on a Matrix interface');
	  };
	  /**
	   * Get a subset of the matrix, or replace a subset of the matrix.
	   *
	   * Usage:
	   *     const subset = matrix.subset(index)               // retrieve subset
	   *     const value = matrix.subset(index, replacement)   // replace subset
	   *
	   * @param {Index} index
	   * @param {Array | Matrix | *} [replacement]
	   * @param {*} [defaultValue=0]      Default value, filled in on new entries when
	   *                                  the matrix is resized. If not provided,
	   *                                  new matrix elements will be filled with zeros.
	   */


	  Matrix.prototype.subset = function (index, replacement, defaultValue) {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke subset on a Matrix interface');
	  };
	  /**
	   * Get a single element from the matrix.
	   * @param {number[]} index   Zero-based index
	   * @return {*} value
	   */


	  Matrix.prototype.get = function (index) {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke get on a Matrix interface');
	  };
	  /**
	   * Replace a single element in the matrix.
	   * @param {number[]} index   Zero-based index
	   * @param {*} value
	   * @param {*} [defaultValue]        Default value, filled in on new entries when
	   *                                  the matrix is resized. If not provided,
	   *                                  new matrix elements will be left undefined.
	   * @return {Matrix} self
	   */


	  Matrix.prototype.set = function (index, value, defaultValue) {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke set on a Matrix interface');
	  };
	  /**
	   * Resize the matrix to the given size. Returns a copy of the matrix when
	   * `copy=true`, otherwise return the matrix itself (resize in place).
	   *
	   * @param {number[]} size           The new size the matrix should have.
	   * @param {*} [defaultValue=0]      Default value, filled in on new entries.
	   *                                  If not provided, the matrix elements will
	   *                                  be filled with zeros.
	   * @param {boolean} [copy]          Return a resized copy of the matrix
	   *
	   * @return {Matrix}                 The resized matrix
	   */


	  Matrix.prototype.resize = function (size, defaultValue) {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke resize on a Matrix interface');
	  };
	  /**
	   * Reshape the matrix to the given size. Returns a copy of the matrix when
	   * `copy=true`, otherwise return the matrix itself (reshape in place).
	   *
	   * @param {number[]} size           The new size the matrix should have.
	   * @param {boolean} [copy]          Return a reshaped copy of the matrix
	   *
	   * @return {Matrix}                 The reshaped matrix
	   */


	  Matrix.prototype.reshape = function (size, defaultValue) {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke reshape on a Matrix interface');
	  };
	  /**
	   * Create a clone of the matrix
	   * @return {Matrix} clone
	   */


	  Matrix.prototype.clone = function () {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke clone on a Matrix interface');
	  };
	  /**
	   * Retrieve the size of the matrix.
	   * @returns {number[]} size
	   */


	  Matrix.prototype.size = function () {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke size on a Matrix interface');
	  };
	  /**
	   * Create a new matrix with the results of the callback function executed on
	   * each entry of the matrix.
	   * @param {Function} callback   The callback function is invoked with three
	   *                              parameters: the value of the element, the index
	   *                              of the element, and the Matrix being traversed.
	   * @param {boolean} [skipZeros] Invoke callback function for non-zero values only.
	   *
	   * @return {Matrix} matrix
	   */


	  Matrix.prototype.map = function (callback, skipZeros) {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke map on a Matrix interface');
	  };
	  /**
	   * Execute a callback function on each entry of the matrix.
	   * @param {Function} callback   The callback function is invoked with three
	   *                              parameters: the value of the element, the index
	   *                              of the element, and the Matrix being traversed.
	   */


	  Matrix.prototype.forEach = function (callback) {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke forEach on a Matrix interface');
	  };
	  /**
	   * Create an Array with a copy of the data of the Matrix
	   * @returns {Array} array
	   */


	  Matrix.prototype.toArray = function () {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke toArray on a Matrix interface');
	  };
	  /**
	   * Get the primitive value of the Matrix: a multidimensional array
	   * @returns {Array} array
	   */


	  Matrix.prototype.valueOf = function () {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke valueOf on a Matrix interface');
	  };
	  /**
	   * Get a string representation of the matrix, with optional formatting options.
	   * @param {Object | number | Function} [options]  Formatting options. See
	   *                                                lib/utils/number:format for a
	   *                                                description of the available
	   *                                                options.
	   * @returns {string} str
	   */


	  Matrix.prototype.format = function (options) {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke format on a Matrix interface');
	  };
	  /**
	   * Get a string representation of the matrix
	   * @returns {string} str
	   */


	  Matrix.prototype.toString = function () {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke toString on a Matrix interface');
	  }; // exports


	  return Matrix;
	}

	exports.name = 'Matrix';
	exports.path = 'type';
	exports.factory = factory;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.array = __webpack_require__(17);
	exports['boolean'] = __webpack_require__(22);
	exports['function'] = __webpack_require__(23);
	exports.number = __webpack_require__(8);
	exports.object = __webpack_require__(4);
	exports.string = __webpack_require__(18);
	exports.emitter = __webpack_require__(10);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.size = size;
	exports.validate = validate;
	exports.validateIndex = validateIndex;
	exports.resize = resize;
	exports.reshape = reshape;
	exports.squeeze = squeeze;
	exports.unsqueeze = unsqueeze;
	exports.flatten = flatten;
	exports.map = map;
	exports.forEach = forEach;
	exports.filter = filter;
	exports.filterRegExp = filterRegExp;
	exports.join = join;
	exports.identify = identify;
	exports.generalize = generalize;

	var _number = _interopRequireDefault(__webpack_require__(8));

	var _string = _interopRequireDefault(__webpack_require__(18));

	var _DimensionError = _interopRequireDefault(__webpack_require__(20));

	var _IndexError = _interopRequireDefault(__webpack_require__(21));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/**
	 * Calculate the size of a multi dimensional array.
	 * This function checks the size of the first entry, it does not validate
	 * whether all dimensions match. (use function `validate` for that)
	 * @param {Array} x
	 * @Return {Number[]} size
	 */
	function size(x) {
	  var s = [];

	  while (Array.isArray(x)) {
	    s.push(x.length);
	    x = x[0];
	  }

	  return s;
	}
	/**
	 * Recursively validate whether each element in a multi dimensional array
	 * has a size corresponding to the provided size array.
	 * @param {Array} array    Array to be validated
	 * @param {number[]} size  Array with the size of each dimension
	 * @param {number} dim   Current dimension
	 * @throws DimensionError
	 * @private
	 */


	function _validate(array, size, dim) {
	  var i;
	  var len = array.length;

	  if (len !== size[dim]) {
	    throw new _DimensionError["default"](len, size[dim]);
	  }

	  if (dim < size.length - 1) {
	    // recursively validate each child array
	    var dimNext = dim + 1;

	    for (i = 0; i < len; i++) {
	      var child = array[i];

	      if (!Array.isArray(child)) {
	        throw new _DimensionError["default"](size.length - 1, size.length, '<');
	      }

	      _validate(array[i], size, dimNext);
	    }
	  } else {
	    // last dimension. none of the childs may be an array
	    for (i = 0; i < len; i++) {
	      if (Array.isArray(array[i])) {
	        throw new _DimensionError["default"](size.length + 1, size.length, '>');
	      }
	    }
	  }
	}
	/**
	 * Validate whether each element in a multi dimensional array has
	 * a size corresponding to the provided size array.
	 * @param {Array} array    Array to be validated
	 * @param {number[]} size  Array with the size of each dimension
	 * @throws DimensionError
	 */


	function validate(array, size) {
	  var isScalar = size.length === 0;

	  if (isScalar) {
	    // scalar
	    if (Array.isArray(array)) {
	      throw new _DimensionError["default"](array.length, 0);
	    }
	  } else {
	    // array
	    _validate(array, size, 0);
	  }
	}
	/**
	 * Test whether index is an integer number with index >= 0 and index < length
	 * when length is provided
	 * @param {number} index    Zero-based index
	 * @param {number} [length] Length of the array
	 */


	function validateIndex(index, length) {
	  if (!_number["default"].isNumber(index) || !_number["default"].isInteger(index)) {
	    throw new TypeError('Index must be an integer (value: ' + index + ')');
	  }

	  if (index < 0 || typeof length === 'number' && index >= length) {
	    throw new _IndexError["default"](index, length);
	  }
	}
	/**
	 * Resize a multi dimensional array. The resized array is returned.
	 * @param {Array} array         Array to be resized
	 * @param {Array.<number>} size Array with the size of each dimension
	 * @param {*} [defaultValue=0]  Value to be filled in in new entries,
	 *                              zero by default. Specify for example `null`,
	 *                              to clearly see entries that are not explicitly
	 *                              set.
	 * @return {Array} array         The resized array
	 */


	function resize(array, size, defaultValue) {
	  // TODO: add support for scalars, having size=[] ?
	  // check the type of the arguments
	  if (!Array.isArray(array) || !Array.isArray(size)) {
	    throw new TypeError('Array expected');
	  }

	  if (size.length === 0) {
	    throw new Error('Resizing to scalar is not supported');
	  } // check whether size contains positive integers


	  size.forEach(function (value) {
	    if (!_number["default"].isNumber(value) || !_number["default"].isInteger(value) || value < 0) {
	      throw new TypeError('Invalid size, must contain positive integers ' + '(size: ' + _string["default"].format(size) + ')');
	    }
	  }); // recursively resize the array

	  var _defaultValue = defaultValue !== undefined ? defaultValue : 0;

	  _resize(array, size, 0, _defaultValue);

	  return array;
	}
	/**
	 * Recursively resize a multi dimensional array
	 * @param {Array} array         Array to be resized
	 * @param {number[]} size       Array with the size of each dimension
	 * @param {number} dim          Current dimension
	 * @param {*} [defaultValue]    Value to be filled in in new entries,
	 *                              undefined by default.
	 * @private
	 */


	function _resize(array, size, dim, defaultValue) {
	  var i;
	  var elem;
	  var oldLen = array.length;
	  var newLen = size[dim];
	  var minLen = Math.min(oldLen, newLen); // apply new length

	  array.length = newLen;

	  if (dim < size.length - 1) {
	    // non-last dimension
	    var dimNext = dim + 1; // resize existing child arrays

	    for (i = 0; i < minLen; i++) {
	      // resize child array
	      elem = array[i];

	      if (!Array.isArray(elem)) {
	        elem = [elem]; // add a dimension

	        array[i] = elem;
	      }

	      _resize(elem, size, dimNext, defaultValue);
	    } // create new child arrays


	    for (i = minLen; i < newLen; i++) {
	      // get child array
	      elem = [];
	      array[i] = elem; // resize new child array

	      _resize(elem, size, dimNext, defaultValue);
	    }
	  } else {
	    // last dimension
	    // remove dimensions of existing values
	    for (i = 0; i < minLen; i++) {
	      while (Array.isArray(array[i])) {
	        array[i] = array[i][0];
	      }
	    } // fill new elements with the default value


	    for (i = minLen; i < newLen; i++) {
	      array[i] = defaultValue;
	    }
	  }
	}
	/**
	 * Re-shape a multi dimensional array to fit the specified dimensions
	 * @param {Array} array           Array to be reshaped
	 * @param {Array.<number>} sizes  List of sizes for each dimension
	 * @returns {Array}               Array whose data has been formatted to fit the
	 *                                specified dimensions
	 *
	 * @throws {DimensionError}       If the product of the new dimension sizes does
	 *                                not equal that of the old ones
	 */


	function reshape(array, sizes) {
	  var flatArray = flatten(array);
	  var newArray;

	  function product(arr) {
	    return arr.reduce(function (prev, curr) {
	      return prev * curr;
	    });
	  }

	  if (!Array.isArray(array) || !Array.isArray(sizes)) {
	    throw new TypeError('Array expected');
	  }

	  if (sizes.length === 0) {
	    throw new _DimensionError["default"](0, product(size(array)), '!=');
	  }

	  var totalSize = 1;

	  for (var sizeIndex = 0; sizeIndex < sizes.length; sizeIndex++) {
	    totalSize *= sizes[sizeIndex];
	  }

	  if (flatArray.length !== totalSize) {
	    throw new _DimensionError["default"](product(sizes), product(size(array)), '!=');
	  }

	  try {
	    newArray = _reshape(flatArray, sizes);
	  } catch (e) {
	    if (e instanceof _DimensionError["default"]) {
	      throw new _DimensionError["default"](product(sizes), product(size(array)), '!=');
	    }

	    throw e;
	  }

	  return newArray;
	}
	/**
	 * Iteratively re-shape a multi dimensional array to fit the specified dimensions
	 * @param {Array} array           Array to be reshaped
	 * @param {Array.<number>} sizes  List of sizes for each dimension
	 * @returns {Array}               Array whose data has been formatted to fit the
	 *                                specified dimensions
	 */


	function _reshape(array, sizes) {
	  // testing if there are enough elements for the requested shape
	  var tmpArray = array;
	  var tmpArray2; // for each dimensions starting by the last one and ignoring the first one

	  for (var sizeIndex = sizes.length - 1; sizeIndex > 0; sizeIndex--) {
	    var size = sizes[sizeIndex];
	    tmpArray2 = []; // aggregate the elements of the current tmpArray in elements of the requested size

	    var length = tmpArray.length / size;

	    for (var i = 0; i < length; i++) {
	      tmpArray2.push(tmpArray.slice(i * size, (i + 1) * size));
	    } // set it as the new tmpArray for the next loop turn or for return


	    tmpArray = tmpArray2;
	  }

	  return tmpArray;
	}
	/**
	 * Squeeze a multi dimensional array
	 * @param {Array} array
	 * @param {Array} [arraySize]
	 * @returns {Array} returns the array itself
	 */


	function squeeze(array, arraySize) {
	  var s = arraySize || size(array); // squeeze outer dimensions

	  while (Array.isArray(array) && array.length === 1) {
	    array = array[0];
	    s.shift();
	  } // find the first dimension to be squeezed


	  var dims = s.length;

	  while (s[dims - 1] === 1) {
	    dims--;
	  } // squeeze inner dimensions


	  if (dims < s.length) {
	    array = _squeeze(array, dims, 0);
	    s.length = dims;
	  }

	  return array;
	}
	/**
	 * Recursively squeeze a multi dimensional array
	 * @param {Array} array
	 * @param {number} dims Required number of dimensions
	 * @param {number} dim  Current dimension
	 * @returns {Array | *} Returns the squeezed array
	 * @private
	 */


	function _squeeze(array, dims, dim) {
	  var i, ii;

	  if (dim < dims) {
	    var next = dim + 1;

	    for (i = 0, ii = array.length; i < ii; i++) {
	      array[i] = _squeeze(array[i], dims, next);
	    }
	  } else {
	    while (Array.isArray(array)) {
	      array = array[0];
	    }
	  }

	  return array;
	}
	/**
	 * Unsqueeze a multi dimensional array: add dimensions when missing
	 *
	 * Paramter `size` will be mutated to match the new, unqueezed matrix size.
	 *
	 * @param {Array} array
	 * @param {number} dims       Desired number of dimensions of the array
	 * @param {number} [outer]    Number of outer dimensions to be added
	 * @param {Array} [arraySize] Current size of array.
	 * @returns {Array} returns the array itself
	 * @private
	 */


	function unsqueeze(array, dims, outer, arraySize) {
	  var s = arraySize || size(array); // unsqueeze outer dimensions

	  if (outer) {
	    for (var i = 0; i < outer; i++) {
	      array = [array];
	      s.unshift(1);
	    }
	  } // unsqueeze inner dimensions


	  array = _unsqueeze(array, dims, 0);

	  while (s.length < dims) {
	    s.push(1);
	  }

	  return array;
	}
	/**
	 * Recursively unsqueeze a multi dimensional array
	 * @param {Array} array
	 * @param {number} dims Required number of dimensions
	 * @param {number} dim  Current dimension
	 * @returns {Array | *} Returns the squeezed array
	 * @private
	 */


	function _unsqueeze(array, dims, dim) {
	  var i, ii;

	  if (Array.isArray(array)) {
	    var next = dim + 1;

	    for (i = 0, ii = array.length; i < ii; i++) {
	      array[i] = _unsqueeze(array[i], dims, next);
	    }
	  } else {
	    for (var d = dim; d < dims; d++) {
	      array = [array];
	    }
	  }

	  return array;
	}
	/**
	 * Flatten a multi dimensional array, put all elements in a one dimensional
	 * array
	 * @param {Array} array   A multi dimensional array
	 * @return {Array}        The flattened array (1 dimensional)
	 */


	function flatten(array) {
	  if (!Array.isArray(array)) {
	    // if not an array, return as is
	    return array;
	  }

	  var flat = [];
	  array.forEach(function callback(value) {
	    if (Array.isArray(value)) {
	      value.forEach(callback); // traverse through sub-arrays recursively
	    } else {
	      flat.push(value);
	    }
	  });
	  return flat;
	}
	/**
	 * A safe map
	 * @param {Array} array
	 * @param {function} callback
	 */


	function map(array, callback) {
	  return Array.prototype.map.call(array, callback);
	}
	/**
	 * A safe forEach
	 * @param {Array} array
	 * @param {function} callback
	 */


	function forEach(array, callback) {
	  Array.prototype.forEach.call(array, callback);
	}
	/**
	 * A safe filter
	 * @param {Array} array
	 * @param {function} callback
	 */


	function filter(array, callback) {
	  if (size(array).length !== 1) {
	    throw new Error('Only one dimensional matrices supported');
	  }

	  return Array.prototype.filter.call(array, callback);
	}
	/**
	 * Filter values in a callback given a regular expression
	 * @param {Array} array
	 * @param {RegExp} regexp
	 * @return {Array} Returns the filtered array
	 * @private
	 */


	function filterRegExp(array, regexp) {
	  if (size(array).length !== 1) {
	    throw new Error('Only one dimensional matrices supported');
	  }

	  return Array.prototype.filter.call(array, function (entry) {
	    return regexp.test(entry);
	  });
	}
	/**
	 * A safe join
	 * @param {Array} array
	 * @param {string} separator
	 */


	function join(array, separator) {
	  return Array.prototype.join.call(array, separator);
	}
	/**
	 * Assign a numeric identifier to every element of a sorted array
	 * @param {Array} a  An array
	 * @return {Array} An array of objects containing the original value and its identifier
	 */


	function identify(a) {
	  if (!Array.isArray(a)) {
	    throw new TypeError('Array input expected');
	  }

	  if (a.length === 0) {
	    return a;
	  }

	  var b = [];
	  var count = 0;
	  b[0] = {
	    value: a[0],
	    identifier: 0
	  };

	  for (var i = 1; i < a.length; i++) {
	    if (a[i] === a[i - 1]) {
	      count++;
	    } else {
	      count = 0;
	    }

	    b.push({
	      value: a[i],
	      identifier: count
	    });
	  }

	  return b;
	}
	/**
	 * Remove the numeric identifier from the elements
	 * @param {array} a  An array
	 * @return {array} An array of values without identifiers
	 */


	function generalize(a) {
	  if (!Array.isArray(a)) {
	    throw new TypeError('Array input expected');
	  }

	  if (a.length === 0) {
	    return a;
	  }

	  var b = [];

	  for (var i = 0; i < a.length; i++) {
	    b.push(a[i].value);
	  }

	  return b;
	}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	var formatNumber = __webpack_require__(8).format;

	var formatBigNumber = __webpack_require__(19).format;

	var isBigNumber = __webpack_require__(5);
	/**
	 * Test whether value is a string
	 * @param {*} value
	 * @return {boolean} isString
	 */


	exports.isString = function (value) {
	  return typeof value === 'string';
	};
	/**
	 * Check if a text ends with a certain string.
	 * @param {string} text
	 * @param {string} search
	 */


	exports.endsWith = function (text, search) {
	  var start = text.length - search.length;
	  var end = text.length;
	  return text.substring(start, end) === search;
	};
	/**
	 * Format a value of any type into a string.
	 *
	 * Usage:
	 *     math.format(value)
	 *     math.format(value, precision)
	 *
	 * When value is a function:
	 *
	 * - When the function has a property `syntax`, it returns this
	 *   syntax description.
	 * - In other cases, a string `'function'` is returned.
	 *
	 * When `value` is an Object:
	 *
	 * - When the object contains a property `format` being a function, this
	 *   function is invoked as `value.format(options)` and the result is returned.
	 * - When the object has its own `toString` method, this method is invoked
	 *   and the result is returned.
	 * - In other cases the function will loop over all object properties and
	 *   return JSON object notation like '{"a": 2, "b": 3}'.
	 *
	 * Example usage:
	 *     math.format(2/7)                // '0.2857142857142857'
	 *     math.format(math.pi, 3)         // '3.14'
	 *     math.format(new Complex(2, 3))  // '2 + 3i'
	 *     math.format('hello')            // '"hello"'
	 *
	 * @param {*} value             Value to be stringified
	 * @param {Object | number | Function} [options]  Formatting options. See
	 *                                                lib/utils/number:format for a
	 *                                                description of the available
	 *                                                options.
	 * @return {string} str
	 */


	exports.format = function (value, options) {
	  if (typeof value === 'number') {
	    return formatNumber(value, options);
	  }

	  if (isBigNumber(value)) {
	    return formatBigNumber(value, options);
	  } // note: we use unsafe duck-typing here to check for Fractions, this is
	  // ok here since we're only invoking toString or concatenating its values


	  if (looksLikeFraction(value)) {
	    if (!options || options.fraction !== 'decimal') {
	      // output as ratio, like '1/3'
	      return value.s * value.n + '/' + value.d;
	    } else {
	      // output as decimal, like '0.(3)'
	      return value.toString();
	    }
	  }

	  if (Array.isArray(value)) {
	    return formatArray(value, options);
	  }

	  if (exports.isString(value)) {
	    return '"' + value + '"';
	  }

	  if (typeof value === 'function') {
	    return value.syntax ? String(value.syntax) : 'function';
	  }

	  if (value && _typeof(value) === 'object') {
	    if (typeof value.format === 'function') {
	      return value.format(options);
	    } else if (value && value.toString() !== {}.toString()) {
	      // this object has a non-native toString method, use that one
	      return value.toString();
	    } else {
	      var entries = [];

	      for (var key in value) {
	        if (value.hasOwnProperty(key)) {
	          entries.push('"' + key + '": ' + exports.format(value[key], options));
	        }
	      }

	      return '{' + entries.join(', ') + '}';
	    }
	  }

	  return String(value);
	};
	/**
	 * Stringify a value into a string enclosed in double quotes.
	 * Unescaped double quotes and backslashes inside the value are escaped.
	 * @param {*} value
	 * @return {string}
	 */


	exports.stringify = function (value) {
	  var text = String(value);
	  var escaped = '';
	  var i = 0;

	  while (i < text.length) {
	    var c = text.charAt(i);

	    if (c === '\\') {
	      escaped += c;
	      i++;
	      c = text.charAt(i);

	      if (c === '' || '"\\/bfnrtu'.indexOf(c) === -1) {
	        escaped += '\\'; // no valid escape character -> escape it
	      }

	      escaped += c;
	    } else if (c === '"') {
	      escaped += '\\"';
	    } else {
	      escaped += c;
	    }

	    i++;
	  }

	  return '"' + escaped + '"';
	};
	/**
	 * Escape special HTML characters
	 * @param {*} value
	 * @return {string}
	 */


	exports.escape = function (value) {
	  var text = String(value);
	  text = text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	  return text;
	};
	/**
	 * Recursively format an n-dimensional matrix
	 * Example output: "[[1, 2], [3, 4]]"
	 * @param {Array} array
	 * @param {Object | number | Function} [options]  Formatting options. See
	 *                                                lib/utils/number:format for a
	 *                                                description of the available
	 *                                                options.
	 * @returns {string} str
	 */


	function formatArray(array, options) {
	  if (Array.isArray(array)) {
	    var str = '[';
	    var len = array.length;

	    for (var i = 0; i < len; i++) {
	      if (i !== 0) {
	        str += ', ';
	      }

	      str += formatArray(array[i], options);
	    }

	    str += ']';
	    return str;
	  } else {
	    return exports.format(array, options);
	  }
	}
	/**
	 * Check whether a value looks like a Fraction (unsafe duck-type check)
	 * @param {*} value
	 * @return {boolean}
	 */


	function looksLikeFraction(value) {
	  return value && _typeof(value) === 'object' && typeof value.s === 'number' && typeof value.n === 'number' && typeof value.d === 'number' || false;
	}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var objectUtils = __webpack_require__(4);
	/**
	 * Convert a BigNumber to a formatted string representation.
	 *
	 * Syntax:
	 *
	 *    format(value)
	 *    format(value, options)
	 *    format(value, precision)
	 *    format(value, fn)
	 *
	 * Where:
	 *
	 *    {number} value   The value to be formatted
	 *    {Object} options An object with formatting options. Available options:
	 *                     {string} notation
	 *                         Number notation. Choose from:
	 *                         'fixed'          Always use regular number notation.
	 *                                          For example '123.40' and '14000000'
	 *                         'exponential'    Always use exponential notation.
	 *                                          For example '1.234e+2' and '1.4e+7'
	 *                         'auto' (default) Regular number notation for numbers
	 *                                          having an absolute value between
	 *                                          `lower` and `upper` bounds, and uses
	 *                                          exponential notation elsewhere.
	 *                                          Lower bound is included, upper bound
	 *                                          is excluded.
	 *                                          For example '123.4' and '1.4e7'.
	 *                     {number} precision   A number between 0 and 16 to round
	 *                                          the digits of the number.
	 *                                          In case of notations 'exponential',
	 *                                          'engineering', and 'auto',
	 *                                          `precision` defines the total
	 *                                          number of significant digits returned.
	 *                                          In case of notation 'fixed',
	 *                                          `precision` defines the number of
	 *                                          significant digits after the decimal
	 *                                          point.
	 *                                          `precision` is undefined by default.
	 *                     {number} lowerExp    Exponent determining the lower boundary
	 *                                          for formatting a value with an exponent
	 *                                          when `notation='auto`.
	 *                                          Default value is `-3`.
	 *                     {number} upperExp    Exponent determining the upper boundary
	 *                                          for formatting a value with an exponent
	 *                                          when `notation='auto`.
	 *                                          Default value is `5`.
	 *    {Function} fn    A custom formatting function. Can be used to override the
	 *                     built-in notations. Function `fn` is called with `value` as
	 *                     parameter and must return a string. Is useful for example to
	 *                     format all values inside a matrix in a particular way.
	 *
	 * Examples:
	 *
	 *    format(6.4)                                        // '6.4'
	 *    format(1240000)                                    // '1.24e6'
	 *    format(1/3)                                        // '0.3333333333333333'
	 *    format(1/3, 3)                                     // '0.333'
	 *    format(21385, 2)                                   // '21000'
	 *    format(12e8, {notation: 'fixed'})                  // returns '1200000000'
	 *    format(2.3,    {notation: 'fixed', precision: 4})  // returns '2.3000'
	 *    format(52.8,   {notation: 'exponential'})          // returns '5.28e+1'
	 *    format(12400,  {notation: 'engineering'})          // returns '12.400e+3'
	 *
	 * @param {BigNumber} value
	 * @param {Object | Function | number} [options]
	 * @return {string} str The formatted value
	 */


	exports.format = function (value, options) {
	  if (typeof options === 'function') {
	    // handle format(value, fn)
	    return options(value);
	  } // handle special cases


	  if (!value.isFinite()) {
	    return value.isNaN() ? 'NaN' : value.gt(0) ? 'Infinity' : '-Infinity';
	  } // default values for options


	  var notation = 'auto';
	  var precision;

	  if (options !== undefined) {
	    // determine notation from options
	    if (options.notation) {
	      notation = options.notation;
	    } // determine precision from options


	    if (typeof options === 'number') {
	      precision = options;
	    } else if (options.precision) {
	      precision = options.precision;
	    }
	  } // handle the various notations


	  switch (notation) {
	    case 'fixed':
	      return exports.toFixed(value, precision);

	    case 'exponential':
	      return exports.toExponential(value, precision);

	    case 'engineering':
	      return exports.toEngineering(value, precision);

	    case 'auto':
	      // TODO: clean up some day. Deprecated since: 2018-01-24
	      // @deprecated upper and lower are replaced with upperExp and lowerExp since v4.0.0
	      if (options && options.exponential && (options.exponential.lower !== undefined || options.exponential.upper !== undefined)) {
	        var fixedOptions = objectUtils.map(options, function (x) {
	          return x;
	        });
	        fixedOptions.exponential = undefined;

	        if (options.exponential.lower !== undefined) {
	          fixedOptions.lowerExp = Math.round(Math.log(options.exponential.lower) / Math.LN10);
	        }

	        if (options.exponential.upper !== undefined) {
	          fixedOptions.upperExp = Math.round(Math.log(options.exponential.upper) / Math.LN10);
	        }

	        console.warn('Deprecation warning: Formatting options exponential.lower and exponential.upper ' + '(minimum and maximum value) ' + 'are replaced with exponential.lowerExp and exponential.upperExp ' + '(minimum and maximum exponent) since version 4.0.0. ' + 'Replace ' + JSON.stringify(options) + ' with ' + JSON.stringify(fixedOptions));
	        return exports.format(value, fixedOptions);
	      } // determine lower and upper bound for exponential notation.
	      // TODO: implement support for upper and lower to be BigNumbers themselves


	      var lowerExp = options && options.lowerExp !== undefined ? options.lowerExp : -3;
	      var upperExp = options && options.upperExp !== undefined ? options.upperExp : 5; // handle special case zero

	      if (value.isZero()) return '0'; // determine whether or not to output exponential notation

	      var str;
	      var exp = value.e;

	      if (exp >= lowerExp && exp < upperExp) {
	        // normal number notation
	        str = value.toSignificantDigits(precision).toFixed();
	      } else {
	        // exponential notation
	        str = exports.toExponential(value, precision);
	      } // remove trailing zeros after the decimal point


	      return str.replace(/((\.\d*?)(0+))($|e)/, function () {
	        var digits = arguments[2];
	        var e = arguments[4];
	        return digits !== '.' ? digits + e : e;
	      });

	    default:
	      throw new Error('Unknown notation "' + notation + '". ' + 'Choose "auto", "exponential", or "fixed".');
	  }
	};
	/**
	 * Format a BigNumber in engineering notation. Like '1.23e+6', '2.3e+0', '3.500e-3'
	 * @param {BigNumber | string} value
	 * @param {number} [precision]        Optional number of significant figures to return.
	 */


	exports.toEngineering = function (value, precision) {
	  // find nearest lower multiple of 3 for exponent
	  var e = value.e;
	  var newExp = e % 3 === 0 ? e : e < 0 ? e - 3 - e % 3 : e - e % 3; // find difference in exponents, and calculate the value without exponent

	  var valueWithoutExp = value.mul(Math.pow(10, -newExp));
	  var valueStr = valueWithoutExp.toPrecision(precision);

	  if (valueStr.indexOf('e') !== -1) {
	    valueStr = valueWithoutExp.toString();
	  }

	  return valueStr + 'e' + (e >= 0 ? '+' : '') + newExp.toString();
	};
	/**
	 * Format a number in exponential notation. Like '1.23e+5', '2.3e+0', '3.500e-3'
	 * @param {BigNumber} value
	 * @param {number} [precision]  Number of digits in formatted output.
	 *                              If not provided, the maximum available digits
	 *                              is used.
	 * @returns {string} str
	 */


	exports.toExponential = function (value, precision) {
	  if (precision !== undefined) {
	    return value.toExponential(precision - 1); // Note the offset of one
	  } else {
	    return value.toExponential();
	  }
	};
	/**
	 * Format a number with fixed notation.
	 * @param {BigNumber} value
	 * @param {number} [precision=undefined] Optional number of decimals after the
	 *                                       decimal point. Undefined by default.
	 */


	exports.toFixed = function (value, precision) {
	  return value.toFixed(precision);
	};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	'use strict';
	/**
	 * Create a range error with the message:
	 *     'Dimension mismatch (<actual size> != <expected size>)'
	 * @param {number | number[]} actual        The actual size
	 * @param {number | number[]} expected      The expected size
	 * @param {string} [relation='!=']          Optional relation between actual
	 *                                          and expected size: '!=', '<', etc.
	 * @extends RangeError
	 */

	function DimensionError(actual, expected, relation) {
	  if (!(this instanceof DimensionError)) {
	    throw new SyntaxError('Constructor must be called with the new operator');
	  }

	  this.actual = actual;
	  this.expected = expected;
	  this.relation = relation;
	  this.message = 'Dimension mismatch (' + (Array.isArray(actual) ? '[' + actual.join(', ') + ']' : actual) + ' ' + (this.relation || '!=') + ' ' + (Array.isArray(expected) ? '[' + expected.join(', ') + ']' : expected) + ')';
	  this.stack = new Error().stack;
	}

	DimensionError.prototype = new RangeError();
	DimensionError.prototype.constructor = RangeError;
	DimensionError.prototype.name = 'DimensionError';
	DimensionError.prototype.isDimensionError = true;
	module.exports = DimensionError;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	'use strict';
	/**
	 * Create a range error with the message:
	 *     'Index out of range (index < min)'
	 *     'Index out of range (index < max)'
	 *
	 * @param {number} index     The actual index
	 * @param {number} [min=0]   Minimum index (included)
	 * @param {number} [max]     Maximum index (excluded)
	 * @extends RangeError
	 */

	function IndexError(index, min, max) {
	  if (!(this instanceof IndexError)) {
	    throw new SyntaxError('Constructor must be called with the new operator');
	  }

	  this.index = index;

	  if (arguments.length < 3) {
	    this.min = 0;
	    this.max = min;
	  } else {
	    this.min = min;
	    this.max = max;
	  }

	  if (this.min !== undefined && this.index < this.min) {
	    this.message = 'Index out of range (' + this.index + ' < ' + this.min + ')';
	  } else if (this.max !== undefined && this.index >= this.max) {
	    this.message = 'Index out of range (' + this.index + ' > ' + (this.max - 1) + ')';
	  } else {
	    this.message = 'Index out of range (' + this.index + ')';
	  }

	  this.stack = new Error().stack;
	}

	IndexError.prototype = new RangeError();
	IndexError.prototype.constructor = RangeError;
	IndexError.prototype.name = 'IndexError';
	IndexError.prototype.isIndexError = true;
	module.exports = IndexError;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	'use strict';
	/**
	 * Test whether value is a boolean
	 * @param {*} value
	 * @return {boolean} isBoolean
	 */

	exports.isBoolean = function (value) {
	  return typeof value === 'boolean';
	};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	'use strict'; // function utils

	/**
	 * Memoize a given function by caching the computed result.
	 * The cache of a memoized function can be cleared by deleting the `cache`
	 * property of the function.
	 *
	 * @param {function} fn                     The function to be memoized.
	 *                                          Must be a pure function.
	 * @param {function(args: Array)} [hasher]  A custom hash builder.
	 *                                          Is JSON.stringify by default.
	 * @return {function}                       Returns the memoized function
	 */

	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	exports.memoize = function (fn, hasher) {
	  return function memoize() {
	    if (_typeof(memoize.cache) !== 'object') {
	      memoize.cache = {};
	    }

	    var args = [];

	    for (var i = 0; i < arguments.length; i++) {
	      args[i] = arguments[i];
	    }

	    var hash = hasher ? hasher(args) : JSON.stringify(args);

	    if (!(hash in memoize.cache)) {
	      memoize.cache[hash] = fn.apply(fn, args);
	    }

	    return memoize.cache[hash];
	  };
	};
	/**
	 * Find the maximum number of arguments expected by a typed function.
	 * @param {function} fn   A typed function
	 * @return {number} Returns the maximum number of expected arguments.
	 *                  Returns -1 when no signatures where found on the function.
	 */


	exports.maxArgumentCount = function (fn) {
	  return Object.keys(fn.signatures || {}).reduce(function (args, signature) {
	    var count = (signature.match(/,/g) || []).length + 1;
	    return Math.max(args, count);
	  }, -1);
	};
	/**
	 * Call a typed function with the
	 * @param {function} fn   A function or typed function
	 * @return {number} Returns the maximum number of expected arguments.
	 *                  Returns -1 when no signatures where found on the function.
	 */


	exports.callWithRightArgumentCount = function (fn, args, argCount) {
	  return Object.keys(fn.signatures || {}).reduce(function (args, signature) {
	    var count = (signature.match(/,/g) || []).length + 1;
	    return Math.max(args, count);
	  }, -1);
	};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(16);

	var DimensionError = __webpack_require__(20);

	var string = util.string;
	var array = util.array;
	var object = util.object;
	var number = util.number;
	var isArray = Array.isArray;
	var isNumber = number.isNumber;
	var isInteger = number.isInteger;
	var isString = string.isString;
	var validateIndex = array.validateIndex;

	function factory(type, config, load, typed) {
	  var getArrayDataType = load(__webpack_require__(25));
	  var Matrix = load(__webpack_require__(15)); // force loading Matrix (do not use via type.Matrix)

	  /**
	   * Dense Matrix implementation. A regular, dense matrix, supporting multi-dimensional matrices. This is the default matrix type.
	   * @class DenseMatrix
	   */

	  function DenseMatrix(data, datatype) {
	    if (!(this instanceof DenseMatrix)) {
	      throw new SyntaxError('Constructor must be called with the new operator');
	    }

	    if (datatype && !isString(datatype)) {
	      throw new Error('Invalid datatype: ' + datatype);
	    }

	    if (type.isMatrix(data)) {
	      // check data is a DenseMatrix
	      if (data.type === 'DenseMatrix') {
	        // clone data & size
	        this._data = object.clone(data._data);
	        this._size = object.clone(data._size);
	        this._datatype = datatype || data._datatype;
	      } else {
	        // build data from existing matrix
	        this._data = data.toArray();
	        this._size = data.size();
	        this._datatype = datatype || data._datatype;
	      }
	    } else if (data && isArray(data.data) && isArray(data.size)) {
	      // initialize fields from JSON representation
	      this._data = data.data;
	      this._size = data.size;
	      this._datatype = datatype || data.datatype;
	    } else if (isArray(data)) {
	      // replace nested Matrices with Arrays
	      this._data = preprocess(data); // get the dimensions of the array

	      this._size = array.size(this._data); // verify the dimensions of the array, TODO: compute size while processing array

	      array.validate(this._data, this._size); // data type unknown

	      this._datatype = datatype;
	    } else if (data) {
	      // unsupported type
	      throw new TypeError('Unsupported type of data (' + util.types.type(data) + ')');
	    } else {
	      // nothing provided
	      this._data = [];
	      this._size = [0];
	      this._datatype = datatype;
	    }
	  }

	  DenseMatrix.prototype = new Matrix();
	  /**
	   * Attach type information
	   */

	  DenseMatrix.prototype.type = 'DenseMatrix';
	  DenseMatrix.prototype.isDenseMatrix = true;
	  /**
	   * Get the matrix type
	   *
	   * Usage:
	   *    const matrixType = matrix.getDataType()  // retrieves the matrix type
	   *
	   * @memberOf DenseMatrix
	   * @return {string}   type information; if multiple types are found from the Matrix, it will return "mixed"
	   */

	  DenseMatrix.prototype.getDataType = function () {
	    return getArrayDataType(this._data);
	  };
	  /**
	   * Get the storage format used by the matrix.
	   *
	   * Usage:
	   *     const format = matrix.storage()  // retrieve storage format
	   *
	   * @memberof DenseMatrix
	   * @return {string}           The storage format.
	   */


	  DenseMatrix.prototype.storage = function () {
	    return 'dense';
	  };
	  /**
	   * Get the datatype of the data stored in the matrix.
	   *
	   * Usage:
	   *     const format = matrix.datatype()   // retrieve matrix datatype
	   *
	   * @memberof DenseMatrix
	   * @return {string}           The datatype.
	   */


	  DenseMatrix.prototype.datatype = function () {
	    return this._datatype;
	  };
	  /**
	   * Create a new DenseMatrix
	   * @memberof DenseMatrix
	   * @param {Array} data
	   * @param {string} [datatype]
	   */


	  DenseMatrix.prototype.create = function (data, datatype) {
	    return new DenseMatrix(data, datatype);
	  };
	  /**
	   * Get a subset of the matrix, or replace a subset of the matrix.
	   *
	   * Usage:
	   *     const subset = matrix.subset(index)               // retrieve subset
	   *     const value = matrix.subset(index, replacement)   // replace subset
	   *
	   * @memberof DenseMatrix
	   * @param {Index} index
	   * @param {Array | Matrix | *} [replacement]
	   * @param {*} [defaultValue=0]      Default value, filled in on new entries when
	   *                                  the matrix is resized. If not provided,
	   *                                  new matrix elements will be filled with zeros.
	   */


	  DenseMatrix.prototype.subset = function (index, replacement, defaultValue) {
	    switch (arguments.length) {
	      case 1:
	        return _get(this, index);
	      // intentional fall through

	      case 2:
	      case 3:
	        return _set(this, index, replacement, defaultValue);

	      default:
	        throw new SyntaxError('Wrong number of arguments');
	    }
	  };
	  /**
	   * Get a single element from the matrix.
	   * @memberof DenseMatrix
	   * @param {number[]} index   Zero-based index
	   * @return {*} value
	   */


	  DenseMatrix.prototype.get = function (index) {
	    if (!isArray(index)) {
	      throw new TypeError('Array expected');
	    }

	    if (index.length !== this._size.length) {
	      throw new DimensionError(index.length, this._size.length);
	    } // check index


	    for (var x = 0; x < index.length; x++) {
	      validateIndex(index[x], this._size[x]);
	    }

	    var data = this._data;

	    for (var i = 0, ii = index.length; i < ii; i++) {
	      var indexI = index[i];
	      validateIndex(indexI, data.length);
	      data = data[indexI];
	    }

	    return data;
	  };
	  /**
	   * Replace a single element in the matrix.
	   * @memberof DenseMatrix
	   * @param {number[]} index   Zero-based index
	   * @param {*} value
	   * @param {*} [defaultValue]        Default value, filled in on new entries when
	   *                                  the matrix is resized. If not provided,
	   *                                  new matrix elements will be left undefined.
	   * @return {DenseMatrix} self
	   */


	  DenseMatrix.prototype.set = function (index, value, defaultValue) {
	    if (!isArray(index)) {
	      throw new TypeError('Array expected');
	    }

	    if (index.length < this._size.length) {
	      throw new DimensionError(index.length, this._size.length, '<');
	    }

	    var i, ii, indexI; // enlarge matrix when needed

	    var size = index.map(function (i) {
	      return i + 1;
	    });

	    _fit(this, size, defaultValue); // traverse over the dimensions


	    var data = this._data;

	    for (i = 0, ii = index.length - 1; i < ii; i++) {
	      indexI = index[i];
	      validateIndex(indexI, data.length);
	      data = data[indexI];
	    } // set new value


	    indexI = index[index.length - 1];
	    validateIndex(indexI, data.length);
	    data[indexI] = value;
	    return this;
	  };
	  /**
	   * Get a submatrix of this matrix
	   * @memberof DenseMatrix
	   * @param {DenseMatrix} matrix
	   * @param {Index} index   Zero-based index
	   * @private
	   */


	  function _get(matrix, index) {
	    if (!type.isIndex(index)) {
	      throw new TypeError('Invalid index');
	    }

	    var isScalar = index.isScalar();

	    if (isScalar) {
	      // return a scalar
	      return matrix.get(index.min());
	    } else {
	      // validate dimensions
	      var size = index.size();

	      if (size.length !== matrix._size.length) {
	        throw new DimensionError(size.length, matrix._size.length);
	      } // validate if any of the ranges in the index is out of range


	      var min = index.min();
	      var max = index.max();

	      for (var i = 0, ii = matrix._size.length; i < ii; i++) {
	        validateIndex(min[i], matrix._size[i]);
	        validateIndex(max[i], matrix._size[i]);
	      } // retrieve submatrix
	      // TODO: more efficient when creating an empty matrix and setting _data and _size manually


	      return new DenseMatrix(_getSubmatrix(matrix._data, index, size.length, 0), matrix._datatype);
	    }
	  }
	  /**
	   * Recursively get a submatrix of a multi dimensional matrix.
	   * Index is not checked for correct number or length of dimensions.
	   * @memberof DenseMatrix
	   * @param {Array} data
	   * @param {Index} index
	   * @param {number} dims   Total number of dimensions
	   * @param {number} dim    Current dimension
	   * @return {Array} submatrix
	   * @private
	   */


	  function _getSubmatrix(data, index, dims, dim) {
	    var last = dim === dims - 1;
	    var range = index.dimension(dim);

	    if (last) {
	      return range.map(function (i) {
	        validateIndex(i, data.length);
	        return data[i];
	      }).valueOf();
	    } else {
	      return range.map(function (i) {
	        validateIndex(i, data.length);
	        var child = data[i];
	        return _getSubmatrix(child, index, dims, dim + 1);
	      }).valueOf();
	    }
	  }
	  /**
	   * Replace a submatrix in this matrix
	   * Indexes are zero-based.
	   * @memberof DenseMatrix
	   * @param {DenseMatrix} matrix
	   * @param {Index} index
	   * @param {DenseMatrix | Array | *} submatrix
	   * @param {*} defaultValue          Default value, filled in on new entries when
	   *                                  the matrix is resized.
	   * @return {DenseMatrix} matrix
	   * @private
	   */


	  function _set(matrix, index, submatrix, defaultValue) {
	    if (!index || index.isIndex !== true) {
	      throw new TypeError('Invalid index');
	    } // get index size and check whether the index contains a single value


	    var iSize = index.size();
	    var isScalar = index.isScalar(); // calculate the size of the submatrix, and convert it into an Array if needed

	    var sSize;

	    if (type.isMatrix(submatrix)) {
	      sSize = submatrix.size();
	      submatrix = submatrix.valueOf();
	    } else {
	      sSize = array.size(submatrix);
	    }

	    if (isScalar) {
	      // set a scalar
	      // check whether submatrix is a scalar
	      if (sSize.length !== 0) {
	        throw new TypeError('Scalar expected');
	      }

	      matrix.set(index.min(), submatrix, defaultValue);
	    } else {
	      // set a submatrix
	      // validate dimensions
	      if (iSize.length < matrix._size.length) {
	        throw new DimensionError(iSize.length, matrix._size.length, '<');
	      }

	      if (sSize.length < iSize.length) {
	        // calculate number of missing outer dimensions
	        var i = 0;
	        var outer = 0;

	        while (iSize[i] === 1 && sSize[i] === 1) {
	          i++;
	        }

	        while (iSize[i] === 1) {
	          outer++;
	          i++;
	        } // unsqueeze both outer and inner dimensions


	        submatrix = array.unsqueeze(submatrix, iSize.length, outer, sSize);
	      } // check whether the size of the submatrix matches the index size


	      if (!object.deepEqual(iSize, sSize)) {
	        throw new DimensionError(iSize, sSize, '>');
	      } // enlarge matrix when needed


	      var size = index.max().map(function (i) {
	        return i + 1;
	      });

	      _fit(matrix, size, defaultValue); // insert the sub matrix


	      var dims = iSize.length;
	      var dim = 0;

	      _setSubmatrix(matrix._data, index, submatrix, dims, dim);
	    }

	    return matrix;
	  }
	  /**
	   * Replace a submatrix of a multi dimensional matrix.
	   * @memberof DenseMatrix
	   * @param {Array} data
	   * @param {Index} index
	   * @param {Array} submatrix
	   * @param {number} dims   Total number of dimensions
	   * @param {number} dim
	   * @private
	   */


	  function _setSubmatrix(data, index, submatrix, dims, dim) {
	    var last = dim === dims - 1;
	    var range = index.dimension(dim);

	    if (last) {
	      range.forEach(function (dataIndex, subIndex) {
	        validateIndex(dataIndex);
	        data[dataIndex] = submatrix[subIndex[0]];
	      });
	    } else {
	      range.forEach(function (dataIndex, subIndex) {
	        validateIndex(dataIndex);

	        _setSubmatrix(data[dataIndex], index, submatrix[subIndex[0]], dims, dim + 1);
	      });
	    }
	  }
	  /**
	   * Resize the matrix to the given size. Returns a copy of the matrix when
	   * `copy=true`, otherwise return the matrix itself (resize in place).
	   *
	   * @memberof DenseMatrix
	   * @param {number[]} size           The new size the matrix should have.
	   * @param {*} [defaultValue=0]      Default value, filled in on new entries.
	   *                                  If not provided, the matrix elements will
	   *                                  be filled with zeros.
	   * @param {boolean} [copy]          Return a resized copy of the matrix
	   *
	   * @return {Matrix}                 The resized matrix
	   */


	  DenseMatrix.prototype.resize = function (size, defaultValue, copy) {
	    // validate arguments
	    if (!isArray(size)) {
	      throw new TypeError('Array expected');
	    } // matrix to resize


	    var m = copy ? this.clone() : this; // resize matrix

	    return _resize(m, size, defaultValue);
	  };

	  function _resize(matrix, size, defaultValue) {
	    // check size
	    if (size.length === 0) {
	      // first value in matrix
	      var v = matrix._data; // go deep

	      while (isArray(v)) {
	        v = v[0];
	      }

	      return v;
	    } // resize matrix


	    matrix._size = size.slice(0); // copy the array

	    matrix._data = array.resize(matrix._data, matrix._size, defaultValue); // return matrix

	    return matrix;
	  }
	  /**
	   * Reshape the matrix to the given size. Returns a copy of the matrix when
	   * `copy=true`, otherwise return the matrix itself (reshape in place).
	   *
	   * NOTE: This might be better suited to copy by default, instead of modifying
	   *       in place. For now, it operates in place to remain consistent with
	   *       resize().
	   *
	   * @memberof DenseMatrix
	   * @param {number[]} size           The new size the matrix should have.
	   * @param {boolean} [copy]          Return a reshaped copy of the matrix
	   *
	   * @return {Matrix}                 The reshaped matrix
	   */


	  DenseMatrix.prototype.reshape = function (size, copy) {
	    var m = copy ? this.clone() : this;
	    m._data = array.reshape(m._data, size);
	    m._size = size.slice(0);
	    return m;
	  };
	  /**
	   * Enlarge the matrix when it is smaller than given size.
	   * If the matrix is larger or equal sized, nothing is done.
	   * @memberof DenseMatrix
	   * @param {DenseMatrix} matrix           The matrix to be resized
	   * @param {number[]} size
	   * @param {*} defaultValue          Default value, filled in on new entries.
	   * @private
	   */


	  function _fit(matrix, size, defaultValue) {
	    var // copy the array
	    newSize = matrix._size.slice(0);

	    var changed = false; // add dimensions when needed

	    while (newSize.length < size.length) {
	      newSize.push(0);
	      changed = true;
	    } // enlarge size when needed


	    for (var i = 0, ii = size.length; i < ii; i++) {
	      if (size[i] > newSize[i]) {
	        newSize[i] = size[i];
	        changed = true;
	      }
	    }

	    if (changed) {
	      // resize only when size is changed
	      _resize(matrix, newSize, defaultValue);
	    }
	  }
	  /**
	   * Create a clone of the matrix
	   * @memberof DenseMatrix
	   * @return {DenseMatrix} clone
	   */


	  DenseMatrix.prototype.clone = function () {
	    var m = new DenseMatrix({
	      data: object.clone(this._data),
	      size: object.clone(this._size),
	      datatype: this._datatype
	    });
	    return m;
	  };
	  /**
	   * Retrieve the size of the matrix.
	   * @memberof DenseMatrix
	   * @returns {number[]} size
	   */


	  DenseMatrix.prototype.size = function () {
	    return this._size.slice(0); // return a clone of _size
	  };
	  /**
	   * Create a new matrix with the results of the callback function executed on
	   * each entry of the matrix.
	   * @memberof DenseMatrix
	   * @param {Function} callback   The callback function is invoked with three
	   *                              parameters: the value of the element, the index
	   *                              of the element, and the Matrix being traversed.
	   *
	   * @return {DenseMatrix} matrix
	   */


	  DenseMatrix.prototype.map = function (callback) {
	    // matrix instance
	    var me = this;

	    var recurse = function recurse(value, index) {
	      if (isArray(value)) {
	        return value.map(function (child, i) {
	          return recurse(child, index.concat(i));
	        });
	      } else {
	        return callback(value, index, me);
	      }
	    }; // return dense format


	    return new DenseMatrix({
	      data: recurse(this._data, []),
	      size: object.clone(this._size),
	      datatype: this._datatype
	    });
	  };
	  /**
	   * Execute a callback function on each entry of the matrix.
	   * @memberof DenseMatrix
	   * @param {Function} callback   The callback function is invoked with three
	   *                              parameters: the value of the element, the index
	   *                              of the element, and the Matrix being traversed.
	   */


	  DenseMatrix.prototype.forEach = function (callback) {
	    // matrix instance
	    var me = this;

	    var recurse = function recurse(value, index) {
	      if (isArray(value)) {
	        value.forEach(function (child, i) {
	          recurse(child, index.concat(i));
	        });
	      } else {
	        callback(value, index, me);
	      }
	    };

	    recurse(this._data, []);
	  };
	  /**
	   * Create an Array with a copy of the data of the DenseMatrix
	   * @memberof DenseMatrix
	   * @returns {Array} array
	   */


	  DenseMatrix.prototype.toArray = function () {
	    return object.clone(this._data);
	  };
	  /**
	   * Get the primitive value of the DenseMatrix: a multidimensional array
	   * @memberof DenseMatrix
	   * @returns {Array} array
	   */


	  DenseMatrix.prototype.valueOf = function () {
	    return this._data;
	  };
	  /**
	   * Get a string representation of the matrix, with optional formatting options.
	   * @memberof DenseMatrix
	   * @param {Object | number | Function} [options]  Formatting options. See
	   *                                                lib/utils/number:format for a
	   *                                                description of the available
	   *                                                options.
	   * @returns {string} str
	   */


	  DenseMatrix.prototype.format = function (options) {
	    return string.format(this._data, options);
	  };
	  /**
	   * Get a string representation of the matrix
	   * @memberof DenseMatrix
	   * @returns {string} str
	   */


	  DenseMatrix.prototype.toString = function () {
	    return string.format(this._data);
	  };
	  /**
	   * Get a JSON representation of the matrix
	   * @memberof DenseMatrix
	   * @returns {Object}
	   */


	  DenseMatrix.prototype.toJSON = function () {
	    return {
	      mathjs: 'DenseMatrix',
	      data: this._data,
	      size: this._size,
	      datatype: this._datatype
	    };
	  };
	  /**
	   * Get the kth Matrix diagonal.
	   *
	   * @memberof DenseMatrix
	   * @param {number | BigNumber} [k=0]     The kth diagonal where the vector will retrieved.
	   *
	   * @returns {Matrix}                     The matrix with the diagonal values.
	   */


	  DenseMatrix.prototype.diagonal = function (k) {
	    // validate k if any
	    if (k) {
	      // convert BigNumber to a number
	      if (type.isBigNumber(k)) {
	        k = k.toNumber();
	      } // is must be an integer


	      if (!isNumber(k) || !isInteger(k)) {
	        throw new TypeError('The parameter k must be an integer number');
	      }
	    } else {
	      // default value
	      k = 0;
	    }

	    var kSuper = k > 0 ? k : 0;
	    var kSub = k < 0 ? -k : 0; // rows & columns

	    var rows = this._size[0];
	    var columns = this._size[1]; // number diagonal values

	    var n = Math.min(rows - kSub, columns - kSuper); // x is a matrix get diagonal from matrix

	    var data = []; // loop rows

	    for (var i = 0; i < n; i++) {
	      data[i] = this._data[i + kSub][i + kSuper];
	    } // create DenseMatrix


	    return new DenseMatrix({
	      data: data,
	      size: [n],
	      datatype: this._datatype
	    });
	  };
	  /**
	   * Create a diagonal matrix.
	   *
	   * @memberof DenseMatrix
	   * @param {Array} size                     The matrix size.
	   * @param {number | Matrix | Array } value The values for the diagonal.
	   * @param {number | BigNumber} [k=0]       The kth diagonal where the vector will be filled in.
	   * @param {number} [defaultValue]          The default value for non-diagonal
	   * @param {string} [datatype]              The datatype for the diagonal
	   *
	   * @returns {DenseMatrix}
	   */


	  DenseMatrix.diagonal = function (size, value, k, defaultValue, datatype) {
	    if (!isArray(size)) {
	      throw new TypeError('Array expected, size parameter');
	    }

	    if (size.length !== 2) {
	      throw new Error('Only two dimensions matrix are supported');
	    } // map size & validate


	    size = size.map(function (s) {
	      // check it is a big number
	      if (type.isBigNumber(s)) {
	        // convert it
	        s = s.toNumber();
	      } // validate arguments


	      if (!isNumber(s) || !isInteger(s) || s < 1) {
	        throw new Error('Size values must be positive integers');
	      }

	      return s;
	    }); // validate k if any

	    if (k) {
	      // convert BigNumber to a number
	      if (type.isBigNumber(k)) {
	        k = k.toNumber();
	      } // is must be an integer


	      if (!isNumber(k) || !isInteger(k)) {
	        throw new TypeError('The parameter k must be an integer number');
	      }
	    } else {
	      // default value
	      k = 0;
	    }

	    if (defaultValue && isString(datatype)) {
	      // convert defaultValue to the same datatype
	      defaultValue = typed.convert(defaultValue, datatype);
	    }

	    var kSuper = k > 0 ? k : 0;
	    var kSub = k < 0 ? -k : 0; // rows and columns

	    var rows = size[0];
	    var columns = size[1]; // number of non-zero items

	    var n = Math.min(rows - kSub, columns - kSuper); // value extraction function

	    var _value; // check value


	    if (isArray(value)) {
	      // validate array
	      if (value.length !== n) {
	        // number of values in array must be n
	        throw new Error('Invalid value array length');
	      } // define function


	      _value = function _value(i) {
	        // return value @ i
	        return value[i];
	      };
	    } else if (type.isMatrix(value)) {
	      // matrix size
	      var ms = value.size(); // validate matrix

	      if (ms.length !== 1 || ms[0] !== n) {
	        // number of values in array must be n
	        throw new Error('Invalid matrix length');
	      } // define function


	      _value = function _value(i) {
	        // return value @ i
	        return value.get([i]);
	      };
	    } else {
	      // define function
	      _value = function _value() {
	        // return value
	        return value;
	      };
	    } // discover default value if needed


	    if (!defaultValue) {
	      // check first value in array
	      defaultValue = type.isBigNumber(_value(0)) ? new type.BigNumber(0) : 0;
	    } // empty array


	    var data = []; // check we need to resize array

	    if (size.length > 0) {
	      // resize array
	      data = array.resize(data, size, defaultValue); // fill diagonal

	      for (var d = 0; d < n; d++) {
	        data[d + kSub][d + kSuper] = _value(d);
	      }
	    } // create DenseMatrix


	    return new DenseMatrix({
	      data: data,
	      size: [rows, columns]
	    });
	  };
	  /**
	   * Generate a matrix from a JSON object
	   * @memberof DenseMatrix
	   * @param {Object} json  An object structured like
	   *                       `{"mathjs": "DenseMatrix", data: [], size: []}`,
	   *                       where mathjs is optional
	   * @returns {DenseMatrix}
	   */


	  DenseMatrix.fromJSON = function (json) {
	    return new DenseMatrix(json);
	  };
	  /**
	   * Swap rows i and j in Matrix.
	   *
	   * @memberof DenseMatrix
	   * @param {number} i       Matrix row index 1
	   * @param {number} j       Matrix row index 2
	   *
	   * @return {Matrix}        The matrix reference
	   */


	  DenseMatrix.prototype.swapRows = function (i, j) {
	    // check index
	    if (!isNumber(i) || !isInteger(i) || !isNumber(j) || !isInteger(j)) {
	      throw new Error('Row index must be positive integers');
	    } // check dimensions


	    if (this._size.length !== 2) {
	      throw new Error('Only two dimensional matrix is supported');
	    } // validate index


	    validateIndex(i, this._size[0]);
	    validateIndex(j, this._size[0]); // swap rows

	    DenseMatrix._swapRows(i, j, this._data); // return current instance


	    return this;
	  };
	  /**
	   * Swap rows i and j in Dense Matrix data structure.
	   *
	   * @param {number} i       Matrix row index 1
	   * @param {number} j       Matrix row index 2
	   * @param {Array} data     Matrix data
	   */


	  DenseMatrix._swapRows = function (i, j, data) {
	    // swap values i <-> j
	    var vi = data[i];
	    data[i] = data[j];
	    data[j] = vi;
	  };
	  /**
	   * Preprocess data, which can be an Array or DenseMatrix with nested Arrays and
	   * Matrices. Replaces all nested Matrices with Arrays
	   * @memberof DenseMatrix
	   * @param {Array} data
	   * @return {Array} data
	   */


	  function preprocess(data) {
	    for (var i = 0, ii = data.length; i < ii; i++) {
	      var elem = data[i];

	      if (isArray(elem)) {
	        data[i] = preprocess(elem);
	      } else if (elem && elem.isMatrix === true) {
	        data[i] = preprocess(elem.valueOf());
	      }
	    }

	    return data;
	  } // register this type in the base class Matrix


	  type.Matrix._storage.dense = DenseMatrix;
	  type.Matrix._storage['default'] = DenseMatrix; // exports

	  return DenseMatrix;
	}

	exports.name = 'DenseMatrix';
	exports.path = 'type';
	exports.factory = factory;
	exports.lazy = false; // no lazy loading, as we alter type.Matrix._storage

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function factory(type, config, load, typed) {
	  var _typeof = load(__webpack_require__(26));

	  function getArrayDataType(array) {
	    var _type; // to hold type info


	    var _length = 0; // to hold length value to ensure it has consistent sizes

	    for (var i = 0; i < array.length; i++) {
	      var item = array[i];
	      var isArray = Array.isArray(item); // Saving the target matrix row size

	      if (i === 0 && isArray) {
	        _length = item.length;
	      } // If the current item is an array but the length does not equal the targetVectorSize


	      if (isArray && item.length !== _length) {
	        return undefined;
	      }

	      var itemType = isArray ? getArrayDataType(item) // recurse into a nested array
	      : _typeof(item);

	      if (_type === undefined) {
	        _type = itemType; // first item
	      } else if (_type !== itemType) {
	        return 'mixed';
	      } else {// we're good, everything has the same type so far
	      }
	    }

	    return _type;
	  }

	  return getArrayDataType;
	}
	/**
	 * Check the datatype of a given object
	 * This is a low level implementation that should only be used by
	 * parent Matrix classes such as SparseMatrix or DenseMatrix
	 * This method does not validate Array Matrix shape
	 * @param array
	 * @return string
	 */


	exports.factory = factory;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	'use strict';

	function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

	function factory(type, config, load, typed) {
	  /**
	   * Determine the type of a variable.
	   *
	   * Function `typeof` recognizes the following types of objects:
	   *
	   * Object                 | Returns       | Example
	   * ---------------------- | ------------- | ------------------------------------------
	   * null                   | `'null'`      | `math.typeof(null)`
	   * number                 | `'number'`    | `math.typeof(3.5)`
	   * boolean                | `'boolean'`   | `math.typeof(true)`
	   * string                 | `'string'`    | `math.typeof('hello world')`
	   * Array                  | `'Array'`     | `math.typeof([1, 2, 3])`
	   * Date                   | `'Date'`      | `math.typeof(new Date())`
	   * Function               | `'Function'`  | `math.typeof(function () {})`
	   * Object                 | `'Object'`    | `math.typeof({a: 2, b: 3})`
	   * RegExp                 | `'RegExp'`    | `math.typeof(/a regexp/)`
	   * undefined              | `'undefined'` | `math.typeof(undefined)`
	   * math.type.BigNumber    | `'BigNumber'` | `math.typeof(math.bignumber('2.3e500'))`
	   * math.type.Chain        | `'Chain'`     | `math.typeof(math.chain(2))`
	   * math.type.Complex      | `'Complex'`   | `math.typeof(math.complex(2, 3))`
	   * math.type.Fraction     | `'Fraction'`  | `math.typeof(math.fraction(1, 3))`
	   * math.type.Help         | `'Help'`      | `math.typeof(math.help('sqrt'))`
	   * math.type.Help         | `'Help'`      | `math.typeof(math.help('sqrt'))`
	   * math.type.Index        | `'Index'`     | `math.typeof(math.index(1, 3))`
	   * math.type.Matrix       | `'Matrix'`    | `math.typeof(math.matrix([[1,2], [3, 4]]))`
	   * math.type.Range        | `'Range'`     | `math.typeof(math.range(0, 10))`
	   * math.type.ResultSet    | `'ResultSet'` | `math.typeof(math.eval('a=2\nb=3'))`
	   * math.type.Unit         | `'Unit'`      | `math.typeof(math.unit('45 deg'))`
	   * math.expression.node&#8203;.AccessorNode            | `'AccessorNode'`            | `math.typeof(math.parse('A[2]'))`
	   * math.expression.node&#8203;.ArrayNode               | `'ArrayNode'`               | `math.typeof(math.parse('[1,2,3]'))`
	   * math.expression.node&#8203;.AssignmentNode          | `'AssignmentNode'`          | `math.typeof(math.parse('x=2'))`
	   * math.expression.node&#8203;.BlockNode               | `'BlockNode'`               | `math.typeof(math.parse('a=2; b=3'))`
	   * math.expression.node&#8203;.ConditionalNode         | `'ConditionalNode'`         | `math.typeof(math.parse('x<0 ? -x : x'))`
	   * math.expression.node&#8203;.ConstantNode            | `'ConstantNode'`            | `math.typeof(math.parse('2.3'))`
	   * math.expression.node&#8203;.FunctionAssignmentNode  | `'FunctionAssignmentNode'`  | `math.typeof(math.parse('f(x)=x^2'))`
	   * math.expression.node&#8203;.FunctionNode            | `'FunctionNode'`            | `math.typeof(math.parse('sqrt(4)'))`
	   * math.expression.node&#8203;.IndexNode               | `'IndexNode'`               | `math.typeof(math.parse('A[2]').index)`
	   * math.expression.node&#8203;.ObjectNode              | `'ObjectNode'`              | `math.typeof(math.parse('{a:2}'))`
	   * math.expression.node&#8203;.ParenthesisNode         | `'ParenthesisNode'`         | `math.typeof(math.parse('(2+3)'))`
	   * math.expression.node&#8203;.RangeNode               | `'RangeNode'`               | `math.typeof(math.parse('1:10'))`
	   * math.expression.node&#8203;.SymbolNode              | `'SymbolNode'`              | `math.typeof(math.parse('x'))`
	   *
	   * Syntax:
	   *
	   *    math.typeof(x)
	   *
	   * Examples:
	   *
	   *    math.typeof(3.5)                     // returns 'number'
	   *    math.typeof(math.complex('2-4i'))    // returns 'Complex'
	   *    math.typeof(math.unit('45 deg'))     // returns 'Unit'
	   *    math.typeof('hello world')           // returns 'string'
	   *
	   * @param {*} x     The variable for which to test the type.
	   * @return {string} Returns the name of the type. Primitive types are lower case,
	   *                  non-primitive types are upper-camel-case.
	   *                  For example 'number', 'string', 'Array', 'Date'.
	   */
	  var _typeof = typed('_typeof', {
	    'any': function any(x) {
	      var t = _typeof2(x);

	      if (t === 'object') {
	        // JavaScript types
	        if (x === null) return 'null';
	        if (Array.isArray(x)) return 'Array';
	        if (x instanceof Date) return 'Date';
	        if (x instanceof RegExp) return 'RegExp'; // math.js types

	        if (type.isBigNumber(x)) return 'BigNumber';
	        if (type.isComplex(x)) return 'Complex';
	        if (type.isFraction(x)) return 'Fraction';
	        if (type.isMatrix(x)) return 'Matrix';
	        if (type.isUnit(x)) return 'Unit';
	        if (type.isIndex(x)) return 'Index';
	        if (type.isRange(x)) return 'Range';
	        if (type.isResultSet(x)) return 'ResultSet';
	        if (type.isNode(x)) return x.type;
	        if (type.isChain(x)) return 'Chain';
	        if (type.isHelp(x)) return 'Help';
	        return 'Object';
	      }

	      if (t === 'function') return 'Function';
	      return t; // can be 'string', 'number', 'boolean', ...
	    }
	  });

	  _typeof.toTex = undefined; // use default template

	  return _typeof;
	}

	exports.name = 'typeof';
	exports.factory = factory;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var deepMap = __webpack_require__(28);

	function factory(type, config, load, typed) {
	  /**
	   * Calculate the sine of a value.
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * Syntax:
	   *
	   *    math.sin(x)
	   *
	   * Examples:
	   *
	   *    math.sin(2)                      // returns number 0.9092974268256813
	   *    math.sin(math.pi / 4)            // returns number 0.7071067811865475
	   *    math.sin(math.unit(90, 'deg'))   // returns number 1
	   *    math.sin(math.unit(30, 'deg'))   // returns number 0.5
	   *
	   *    const angle = 0.2
	   *    math.pow(math.sin(angle), 2) + math.pow(math.cos(angle), 2) // returns number ~1
	   *
	   * See also:
	   *
	   *    cos, tan
	   *
	   * @param {number | BigNumber | Complex | Unit | Array | Matrix} x  Function input
	   * @return {number | BigNumber | Complex | Array | Matrix} Sine of x
	   */
	  var sin = typed('sin', {
	    'number': Math.sin,
	    'Complex': function Complex(x) {
	      return x.sin();
	    },
	    'BigNumber': function BigNumber(x) {
	      return x.sin();
	    },
	    'Unit': function Unit(x) {
	      if (!x.hasBase(type.Unit.BASE_UNITS.ANGLE)) {
	        throw new TypeError('Unit in function sin is no angle');
	      }

	      return sin(x.value);
	    },
	    'Array | Matrix': function ArrayMatrix(x) {
	      // deep map collection, skip zeros since sin(0) = 0
	      return deepMap(x, sin, true);
	    }
	  });
	  sin.toTex = {
	    1: "\\sin\\left(${args[0]}\\right)"
	  };
	  return sin;
	}

	exports.name = 'sin';
	exports.factory = factory;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	'use strict';
	/**
	 * Execute the callback function element wise for each element in array and any
	 * nested array
	 * Returns an array with the results
	 * @param {Array | Matrix} array
	 * @param {Function} callback   The callback is called with two parameters:
	 *                              value1 and value2, which contain the current
	 *                              element of both arrays.
	 * @param {boolean} [skipZeros] Invoke callback function for non-zero values only.
	 *
	 * @return {Array | Matrix} res
	 */

	module.exports = function deepMap(array, callback, skipZeros) {
	  if (array && typeof array.map === 'function') {
	    // TODO: replace array.map with a for loop to improve performance
	    return array.map(function (x) {
	      return deepMap(x, callback, skipZeros);
	    });
	  } else {
	    return callback(array);
	  }
	};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var deepMap = __webpack_require__(28);

	function factory(type, config, load, typed) {
	  /**
	   * Calculate the cosine of a value.
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * Syntax:
	   *
	   *    math.cos(x)
	   *
	   * Examples:
	   *
	   *    math.cos(2)                      // returns number -0.4161468365471422
	   *    math.cos(math.pi / 4)            // returns number  0.7071067811865475
	   *    math.cos(math.unit(180, 'deg'))  // returns number -1
	   *    math.cos(math.unit(60, 'deg'))   // returns number  0.5
	   *
	   *    const angle = 0.2
	   *    math.pow(math.sin(angle), 2) + math.pow(math.cos(angle), 2) // returns number ~1
	   *
	   * See also:
	   *
	   *    cos, tan
	   *
	   * @param {number | BigNumber | Complex | Unit | Array | Matrix} x  Function input
	   * @return {number | BigNumber | Complex | Array | Matrix} Cosine of x
	   */
	  var cos = typed('cos', {
	    'number': Math.cos,
	    'Complex': function Complex(x) {
	      return x.cos();
	    },
	    'BigNumber': function BigNumber(x) {
	      return x.cos();
	    },
	    'Unit': function Unit(x) {
	      if (!x.hasBase(type.Unit.BASE_UNITS.ANGLE)) {
	        throw new TypeError('Unit in function cos is no angle');
	      }

	      return cos(x.value);
	    },
	    'Array | Matrix': function ArrayMatrix(x) {
	      return deepMap(x, cos);
	    }
	  });
	  cos.toTex = {
	    1: "\\cos\\left(${args[0]}\\right)"
	  };
	  return cos;
	}

	exports.name = 'cos';
	exports.factory = factory;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var deepMap = __webpack_require__(28);

	function factory(type, config, load, typed) {
	  /**
	   * Calculate the square root of a value.
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * Syntax:
	   *
	   *    math.sqrt(x)
	   *
	   * Examples:
	   *
	   *    math.sqrt(25)                // returns 5
	   *    math.square(5)               // returns 25
	   *    math.sqrt(-4)                // returns Complex 2i
	   *
	   * See also:
	   *
	   *    square, multiply, cube, cbrt, sqrtm
	   *
	   * @param {number | BigNumber | Complex | Array | Matrix | Unit} x
	   *            Value for which to calculate the square root.
	   * @return {number | BigNumber | Complex | Array | Matrix | Unit}
	   *            Returns the square root of `x`
	   */
	  var sqrt = typed('sqrt', {
	    'number': _sqrtNumber,
	    'Complex': function Complex(x) {
	      return x.sqrt();
	    },
	    'BigNumber': function BigNumber(x) {
	      if (!x.isNegative() || config.predictable) {
	        return x.sqrt();
	      } else {
	        // negative value -> downgrade to number to do complex value computation
	        return _sqrtNumber(x.toNumber());
	      }
	    },
	    'Array | Matrix': function ArrayMatrix(x) {
	      // deep map collection, skip zeros since sqrt(0) = 0
	      return deepMap(x, sqrt, true);
	    },
	    'Unit': function Unit(x) {
	      // Someday will work for complex units when they are implemented
	      return x.pow(0.5);
	    }
	  });
	  /**
	   * Calculate sqrt for a number
	   * @param {number} x
	   * @returns {number | Complex} Returns the square root of x
	   * @private
	   */

	  function _sqrtNumber(x) {
	    if (isNaN(x)) {
	      return NaN;
	    } else if (x >= 0 || config.predictable) {
	      return Math.sqrt(x);
	    } else {
	      return new type.Complex(x, 0).sqrt();
	    }
	  }

	  sqrt.toTex = {
	    1: "\\sqrt{${args[0]}}"
	  };
	  return sqrt;
	}

	exports.name = 'sqrt';
	exports.factory = factory;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function factory(type, config, load, typed) {
	  var abs = load(__webpack_require__(32));
	  var add = load(__webpack_require__(33));
	  var pow = load(__webpack_require__(45));
	  var conj = load(__webpack_require__(52));
	  var sqrt = load(__webpack_require__(30));
	  var multiply = load(__webpack_require__(47));
	  var equalScalar = load(__webpack_require__(40));
	  var larger = load(__webpack_require__(53));
	  var smaller = load(__webpack_require__(57));
	  var matrix = load(__webpack_require__(34));
	  /**
	   * Calculate the norm of a number, vector or matrix.
	   *
	   * The second parameter p is optional. If not provided, it defaults to 2.
	   *
	   * Syntax:
	   *
	   *    math.norm(x)
	   *    math.norm(x, p)
	   *
	   * Examples:
	   *
	   *    math.abs(-3.5)                         // returns 3.5
	   *    math.norm(-3.5)                        // returns 3.5
	   *
	   *    math.norm(math.complex(3, -4))         // returns 5
	   *
	   *    math.norm([1, 2, -3], Infinity)        // returns 3
	   *    math.norm([1, 2, -3], -Infinity)       // returns 1
	   *
	   *    math.norm([3, 4], 2)                   // returns 5
	   *
	   *    math.norm([[1, 2], [3, 4]], 1)          // returns 6
	   *    math.norm([[1, 2], [3, 4]], 'inf')     // returns 7
	   *    math.norm([[1, 2], [3, 4]], 'fro')     // returns 5.477225575051661
	   *
	   * See also:
	   *
	   *    abs, hypot
	   *
	   * @param  {number | BigNumber | Complex | Array | Matrix} x
	   *            Value for which to calculate the norm
	   * @param  {number | BigNumber | string} [p=2]
	   *            Vector space.
	   *            Supported numbers include Infinity and -Infinity.
	   *            Supported strings are: 'inf', '-inf', and 'fro' (The Frobenius norm)
	   * @return {number | BigNumber} the p-norm
	   */

	  var norm = typed('norm', {
	    'number': Math.abs,
	    'Complex': function Complex(x) {
	      return x.abs();
	    },
	    'BigNumber': function BigNumber(x) {
	      // norm(x) = abs(x)
	      return x.abs();
	    },
	    'boolean': function boolean(x) {
	      // norm(x) = abs(x)
	      return Math.abs(x);
	    },
	    'Array': function Array(x) {
	      return _norm(matrix(x), 2);
	    },
	    'Matrix': function Matrix(x) {
	      return _norm(x, 2);
	    },
	    'number | Complex | BigNumber | boolean, number | BigNumber | string': function numberComplexBigNumberBooleanNumberBigNumberString(x) {
	      // ignore second parameter, TODO: remove the option of second parameter for these types
	      return norm(x);
	    },
	    'Array, number | BigNumber | string': function ArrayNumberBigNumberString(x, p) {
	      return _norm(matrix(x), p);
	    },
	    'Matrix, number | BigNumber | string': function MatrixNumberBigNumberString(x, p) {
	      return _norm(x, p);
	    }
	  });
	  /**
	   * Calculate the norm for an array
	   * @param {Matrix} x
	   * @param {number | string} p
	   * @returns {number} Returns the norm
	   * @private
	   */

	  function _norm(x, p) {
	    // size
	    var sizeX = x.size(); // check if it is a vector

	    if (sizeX.length === 1) {
	      // check p
	      if (p === Number.POSITIVE_INFINITY || p === 'inf') {
	        // norm(x, Infinity) = max(abs(x))
	        var pinf = 0; // skip zeros since abs(0) === 0

	        x.forEach(function (value) {
	          var v = abs(value);

	          if (larger(v, pinf)) {
	            pinf = v;
	          }
	        }, true);
	        return pinf;
	      }

	      if (p === Number.NEGATIVE_INFINITY || p === '-inf') {
	        // norm(x, -Infinity) = min(abs(x))
	        var ninf; // skip zeros since abs(0) === 0

	        x.forEach(function (value) {
	          var v = abs(value);

	          if (!ninf || smaller(v, ninf)) {
	            ninf = v;
	          }
	        }, true);
	        return ninf || 0;
	      }

	      if (p === 'fro') {
	        return _norm(x, 2);
	      }

	      if (typeof p === 'number' && !isNaN(p)) {
	        // check p != 0
	        if (!equalScalar(p, 0)) {
	          // norm(x, p) = sum(abs(xi) ^ p) ^ 1/p
	          var n = 0; // skip zeros since abs(0) === 0

	          x.forEach(function (value) {
	            n = add(pow(abs(value), p), n);
	          }, true);
	          return pow(n, 1 / p);
	        }

	        return Number.POSITIVE_INFINITY;
	      } // invalid parameter value


	      throw new Error('Unsupported parameter value');
	    } // MxN matrix


	    if (sizeX.length === 2) {
	      // check p
	      if (p === 1) {
	        // norm(x) = the largest column sum
	        var c = []; // result

	        var maxc = 0; // skip zeros since abs(0) == 0

	        x.forEach(function (value, index) {
	          var j = index[1];
	          var cj = add(c[j] || 0, abs(value));

	          if (larger(cj, maxc)) {
	            maxc = cj;
	          }

	          c[j] = cj;
	        }, true);
	        return maxc;
	      }

	      if (p === Number.POSITIVE_INFINITY || p === 'inf') {
	        // norm(x) = the largest row sum
	        var r = []; // result

	        var maxr = 0; // skip zeros since abs(0) == 0

	        x.forEach(function (value, index) {
	          var i = index[0];
	          var ri = add(r[i] || 0, abs(value));

	          if (larger(ri, maxr)) {
	            maxr = ri;
	          }

	          r[i] = ri;
	        }, true);
	        return maxr;
	      }

	      if (p === 'fro') {
	        // norm(x) = sqrt(sum(diag(x'x)))
	        var fro = 0;
	        x.forEach(function (value, index) {
	          fro = add(fro, multiply(value, conj(value)));
	        });
	        return abs(sqrt(fro));
	      }

	      if (p === 2) {
	        // not implemented
	        throw new Error('Unsupported parameter value, missing implementation of matrix singular value decomposition');
	      } // invalid parameter value


	      throw new Error('Unsupported parameter value');
	    }
	  }

	  norm.toTex = {
	    1: "\\left\\|${args[0]}\\right\\|",
	    2: undefined // use default template

	  };
	  return norm;
	}

	exports.name = 'norm';
	exports.factory = factory;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var deepMap = __webpack_require__(28);

	function factory(type, config, load, typed) {
	  /**
	   * Calculate the absolute value of a number. For matrices, the function is
	   * evaluated element wise.
	   *
	   * Syntax:
	   *
	   *    math.abs(x)
	   *
	   * Examples:
	   *
	   *    math.abs(3.5)                // returns number 3.5
	   *    math.abs(-4.2)               // returns number 4.2
	   *
	   *    math.abs([3, -5, -1, 0, 2])  // returns Array [3, 5, 1, 0, 2]
	   *
	   * See also:
	   *
	   *    sign
	   *
	   * @param  {number | BigNumber | Fraction | Complex | Array | Matrix | Unit} x
	   *            A number or matrix for which to get the absolute value
	   * @return {number | BigNumber | Fraction | Complex | Array | Matrix | Unit}
	   *            Absolute value of `x`
	   */
	  var abs = typed('abs', {
	    'number': Math.abs,
	    'Complex': function Complex(x) {
	      return x.abs();
	    },
	    'BigNumber': function BigNumber(x) {
	      return x.abs();
	    },
	    'Fraction': function Fraction(x) {
	      return x.abs();
	    },
	    'Array | Matrix': function ArrayMatrix(x) {
	      // deep map collection, skip zeros since abs(0) = 0
	      return deepMap(x, abs, true);
	    },
	    'Unit': function Unit(x) {
	      return x.abs();
	    }
	  });
	  abs.toTex = {
	    1: "\\left|${args[0]}\\right|"
	  };
	  return abs;
	}

	exports.name = 'abs';
	exports.factory = factory;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var extend = __webpack_require__(4).extend;

	function factory(type, config, load, typed) {
	  var matrix = load(__webpack_require__(34));
	  var addScalar = load(__webpack_require__(35));

	  var latex = __webpack_require__(36);

	  var algorithm01 = load(__webpack_require__(38));
	  var algorithm04 = load(__webpack_require__(39));
	  var algorithm10 = load(__webpack_require__(42));
	  var algorithm13 = load(__webpack_require__(43));
	  var algorithm14 = load(__webpack_require__(44));
	  /**
	   * Add two or more values, `x + y`.
	   * For matrices, the function is evaluated element wise.
	   *
	   * Syntax:
	   *
	   *    math.add(x, y)
	   *    math.add(x, y, z, ...)
	   *
	   * Examples:
	   *
	   *    math.add(2, 3)               // returns number 5
	   *    math.add(2, 3, 4)            // returns number 9
	   *
	   *    const a = math.complex(2, 3)
	   *    const b = math.complex(-4, 1)
	   *    math.add(a, b)               // returns Complex -2 + 4i
	   *
	   *    math.add([1, 2, 3], 4)       // returns Array [5, 6, 7]
	   *
	   *    const c = math.unit('5 cm')
	   *    const d = math.unit('2.1 mm')
	   *    math.add(c, d)               // returns Unit 52.1 mm
	   *
	   *    math.add("2.3", "4")         // returns number 6.3
	   *
	   * See also:
	   *
	   *    subtract, sum
	   *
	   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} x First value to add
	   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} y Second value to add
	   * @return {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} Sum of `x` and `y`
	   */

	  var add = typed('add', extend({
	    // we extend the signatures of addScalar with signatures dealing with matrices
	    'DenseMatrix, DenseMatrix': function DenseMatrixDenseMatrix(x, y) {
	      return algorithm13(x, y, addScalar);
	    },
	    'DenseMatrix, SparseMatrix': function DenseMatrixSparseMatrix(x, y) {
	      return algorithm01(x, y, addScalar, false);
	    },
	    'SparseMatrix, DenseMatrix': function SparseMatrixDenseMatrix(x, y) {
	      return algorithm01(y, x, addScalar, true);
	    },
	    'SparseMatrix, SparseMatrix': function SparseMatrixSparseMatrix(x, y) {
	      return algorithm04(x, y, addScalar);
	    },
	    'Array, Array': function ArrayArray(x, y) {
	      // use matrix implementation
	      return add(matrix(x), matrix(y)).valueOf();
	    },
	    'Array, Matrix': function ArrayMatrix(x, y) {
	      // use matrix implementation
	      return add(matrix(x), y);
	    },
	    'Matrix, Array': function MatrixArray(x, y) {
	      // use matrix implementation
	      return add(x, matrix(y));
	    },
	    'DenseMatrix, any': function DenseMatrixAny(x, y) {
	      return algorithm14(x, y, addScalar, false);
	    },
	    'SparseMatrix, any': function SparseMatrixAny(x, y) {
	      return algorithm10(x, y, addScalar, false);
	    },
	    'any, DenseMatrix': function anyDenseMatrix(x, y) {
	      return algorithm14(y, x, addScalar, true);
	    },
	    'any, SparseMatrix': function anySparseMatrix(x, y) {
	      return algorithm10(y, x, addScalar, true);
	    },
	    'Array, any': function ArrayAny(x, y) {
	      // use matrix implementation
	      return algorithm14(matrix(x), y, addScalar, false).valueOf();
	    },
	    'any, Array': function anyArray(x, y) {
	      // use matrix implementation
	      return algorithm14(matrix(y), x, addScalar, true).valueOf();
	    },
	    'any, any': addScalar,
	    'any, any, ...any': function anyAnyAny(x, y, rest) {
	      var result = add(x, y);

	      for (var i = 0; i < rest.length; i++) {
	        result = add(result, rest[i]);
	      }

	      return result;
	    }
	  }, addScalar.signatures));
	  add.toTex = {
	    2: "\\left(${args[0]}".concat(latex.operators['add'], "${args[1]}\\right)")
	  };
	  return add;
	}

	exports.name = 'add';
	exports.factory = factory;

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	'use strict';

	function factory(type, config, load, typed) {
	  /**
	   * Create a Matrix. The function creates a new `math.type.Matrix` object from
	   * an `Array`. A Matrix has utility functions to manipulate the data in the
	   * matrix, like getting the size and getting or setting values in the matrix.
	   * Supported storage formats are 'dense' and 'sparse'.
	   *
	   * Syntax:
	   *
	   *    math.matrix()                         // creates an empty matrix using default storage format (dense).
	   *    math.matrix(data)                     // creates a matrix with initial data using default storage format (dense).
	   *    math.matrix('dense')                  // creates an empty matrix using the given storage format.
	   *    math.matrix(data, 'dense')            // creates a matrix with initial data using the given storage format.
	   *    math.matrix(data, 'sparse')           // creates a sparse matrix with initial data.
	   *    math.matrix(data, 'sparse', 'number') // creates a sparse matrix with initial data, number data type.
	   *
	   * Examples:
	   *
	   *    let m = math.matrix([[1, 2], [3, 4]])
	   *    m.size()                        // Array [2, 2]
	   *    m.resize([3, 2], 5)
	   *    m.valueOf()                     // Array [[1, 2], [3, 4], [5, 5]]
	   *    m.get([1, 0])                    // number 3
	   *
	   * See also:
	   *
	   *    bignumber, boolean, complex, index, number, string, unit, sparse
	   *
	   * @param {Array | Matrix} [data]    A multi dimensional array
	   * @param {string} [format]          The Matrix storage format
	   *
	   * @return {Matrix} The created matrix
	   */
	  var matrix = typed('matrix', {
	    '': function _() {
	      return _create([]);
	    },
	    'string': function string(format) {
	      return _create([], format);
	    },
	    'string, string': function stringString(format, datatype) {
	      return _create([], format, datatype);
	    },
	    'Array': function Array(data) {
	      return _create(data);
	    },
	    'Matrix': function Matrix(data) {
	      return _create(data, data.storage());
	    },
	    'Array | Matrix, string': _create,
	    'Array | Matrix, string, string': _create
	  });
	  matrix.toTex = {
	    0: '\\begin{bmatrix}\\end{bmatrix}',
	    1: "\\left(${args[0]}\\right)",
	    2: "\\left(${args[0]}\\right)"
	  };
	  return matrix;
	  /**
	   * Create a new Matrix with given storage format
	   * @param {Array} data
	   * @param {string} [format]
	   * @param {string} [datatype]
	   * @returns {Matrix} Returns a new Matrix
	   * @private
	   */

	  function _create(data, format, datatype) {
	    // get storage format constructor
	    var M = type.Matrix.storage(format || 'default'); // create instance

	    return new M(data, datatype);
	  }
	}

	exports.name = 'matrix';
	exports.factory = factory;

/***/ }),
/* 35 */
/***/ (function(module, exports) {

	'use strict';

	function factory(type, config, load, typed) {
	  /**
	   * Add two scalar values, `x + y`.
	   * This function is meant for internal use: it is used by the public function
	   * `add`
	   *
	   * This function does not support collections (Array or Matrix), and does
	   * not validate the number of of inputs.
	   *
	   * @param  {number | BigNumber | Fraction | Complex | Unit} x   First value to add
	   * @param  {number | BigNumber | Fraction | Complex} y          Second value to add
	   * @return {number | BigNumber | Fraction | Complex | Unit}                      Sum of `x` and `y`
	   * @private
	   */
	  var add = typed('add', {
	    'number, number': function numberNumber(x, y) {
	      return x + y;
	    },
	    'Complex, Complex': function ComplexComplex(x, y) {
	      return x.add(y);
	    },
	    'BigNumber, BigNumber': function BigNumberBigNumber(x, y) {
	      return x.plus(y);
	    },
	    'Fraction, Fraction': function FractionFraction(x, y) {
	      return x.add(y);
	    },
	    'Unit, Unit': function UnitUnit(x, y) {
	      if (x.value === null || x.value === undefined) throw new Error('Parameter x contains a unit with undefined value');
	      if (y.value === null || y.value === undefined) throw new Error('Parameter y contains a unit with undefined value');
	      if (!x.equalBase(y)) throw new Error('Units do not match');
	      var res = x.clone();
	      res.value = add(res.value, y.value);
	      res.fixPrefix = false;
	      return res;
	    }
	  });
	  return add;
	}

	exports.factory = factory;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var escapeLatex = __webpack_require__(37);

	exports.symbols = {
	  // GREEK LETTERS
	  Alpha: 'A',
	  alpha: '\\alpha',
	  Beta: 'B',
	  beta: '\\beta',
	  Gamma: '\\Gamma',
	  gamma: '\\gamma',
	  Delta: '\\Delta',
	  delta: '\\delta',
	  Epsilon: 'E',
	  epsilon: '\\epsilon',
	  varepsilon: '\\varepsilon',
	  Zeta: 'Z',
	  zeta: '\\zeta',
	  Eta: 'H',
	  eta: '\\eta',
	  Theta: '\\Theta',
	  theta: '\\theta',
	  vartheta: '\\vartheta',
	  Iota: 'I',
	  iota: '\\iota',
	  Kappa: 'K',
	  kappa: '\\kappa',
	  varkappa: '\\varkappa',
	  Lambda: '\\Lambda',
	  lambda: '\\lambda',
	  Mu: 'M',
	  mu: '\\mu',
	  Nu: 'N',
	  nu: '\\nu',
	  Xi: '\\Xi',
	  xi: '\\xi',
	  Omicron: 'O',
	  omicron: 'o',
	  Pi: '\\Pi',
	  pi: '\\pi',
	  varpi: '\\varpi',
	  Rho: 'P',
	  rho: '\\rho',
	  varrho: '\\varrho',
	  Sigma: '\\Sigma',
	  sigma: '\\sigma',
	  varsigma: '\\varsigma',
	  Tau: 'T',
	  tau: '\\tau',
	  Upsilon: "\\Upsilon",
	  upsilon: "\\upsilon",
	  Phi: '\\Phi',
	  phi: '\\phi',
	  varphi: '\\varphi',
	  Chi: 'X',
	  chi: '\\chi',
	  Psi: '\\Psi',
	  psi: '\\psi',
	  Omega: '\\Omega',
	  omega: '\\omega',
	  // logic
	  'true': '\\mathrm{True}',
	  'false': '\\mathrm{False}',
	  // other
	  i: 'i',
	  // TODO use \i ??
	  inf: '\\infty',
	  Inf: '\\infty',
	  infinity: '\\infty',
	  Infinity: '\\infty',
	  oo: '\\infty',
	  lim: '\\lim',
	  'undefined': '\\mathbf{?}'
	};
	exports.operators = {
	  'transpose': '^\\top',
	  'ctranspose': '^H',
	  'factorial': '!',
	  'pow': '^',
	  'dotPow': '.^\\wedge',
	  // TODO find ideal solution
	  'unaryPlus': '+',
	  'unaryMinus': '-',
	  'bitNot': '\\~',
	  // TODO find ideal solution
	  'not': '\\neg',
	  'multiply': '\\cdot',
	  'divide': '\\frac',
	  // TODO how to handle that properly?
	  'dotMultiply': '.\\cdot',
	  // TODO find ideal solution
	  'dotDivide': '.:',
	  // TODO find ideal solution
	  'mod': '\\mod',
	  'add': '+',
	  'subtract': '-',
	  'to': '\\rightarrow',
	  'leftShift': '<<',
	  'rightArithShift': '>>',
	  'rightLogShift': '>>>',
	  'equal': '=',
	  'unequal': '\\neq',
	  'smaller': '<',
	  'larger': '>',
	  'smallerEq': '\\leq',
	  'largerEq': '\\geq',
	  'bitAnd': '\\&',
	  'bitXor': "\\underline{|}",
	  'bitOr': '|',
	  'and': '\\wedge',
	  'xor': '\\veebar',
	  'or': '\\vee'
	};
	exports.defaultTemplate = "\\mathrm{${name}}\\left(${args}\\right)";
	var units = {
	  deg: '^\\circ'
	};

	exports.escape = function (string) {
	  return escapeLatex(string, {
	    'preserveFormatting': true
	  });
	}; // @param {string} name
	// @param {boolean} isUnit


	exports.toSymbol = function (name, isUnit) {
	  isUnit = typeof isUnit === 'undefined' ? false : isUnit;

	  if (isUnit) {
	    if (units.hasOwnProperty(name)) {
	      return units[name];
	    }

	    return '\\mathrm{' + exports.escape(name) + '}';
	  }

	  if (exports.symbols.hasOwnProperty(name)) {
	    return exports.symbols[name];
	  }

	  return exports.escape(name);
	};

/***/ }),
/* 37 */
/***/ (function(module, exports) {

	"use strict";

	// Map the characters to escape to their escaped values. The list is derived
	// from http://www.cespedes.org/blog/85/how-to-escape-latex-special-characters

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var defaultEscapes = {
	  "{": "\\{",
	  "}": "\\}",
	  "\\": "\\textbackslash{}",
	  "#": "\\#",
	  $: "\\$",
	  "%": "\\%",
	  "&": "\\&",
	  "^": "\\textasciicircum{}",
	  _: "\\_",
	  "~": "\\textasciitilde{}"
	};
	var formatEscapes = {
	  "\u2013": "\\--",
	  "\u2014": "\\---",
	  " ": "~",
	  "\t": "\\qquad{}",
	  "\r\n": "\\newline{}",
	  "\n": "\\newline{}"
	};

	var defaultEscapeMapFn = function defaultEscapeMapFn(defaultEscapes, formatEscapes) {
	  return _extends({}, defaultEscapes, formatEscapes);
	};

	/**
	 * Escape a string to be used in LaTeX documents.
	 * @param {string} str the string to be escaped.
	 * @param {boolean} params.preserveFormatting whether formatting escapes should
	 *  be performed (default: false).
	 * @param {function} params.escapeMapFn the function to modify the escape maps.
	 * @return {string} the escaped string, ready to be used in LaTeX.
	 */
	module.exports = function (str) {
	  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref$preserveFormatti = _ref.preserveFormatting,
	      preserveFormatting = _ref$preserveFormatti === undefined ? false : _ref$preserveFormatti,
	      _ref$escapeMapFn = _ref.escapeMapFn,
	      escapeMapFn = _ref$escapeMapFn === undefined ? defaultEscapeMapFn : _ref$escapeMapFn;

	  var runningStr = String(str);
	  var result = "";

	  var escapes = escapeMapFn(_extends({}, defaultEscapes), preserveFormatting ? _extends({}, formatEscapes) : {});
	  var escapeKeys = Object.keys(escapes); // as it is reused later on

	  // Algorithm: Go through the string character by character, if it matches
	  // with one of the special characters then we'll replace it with the escaped
	  // version.

	  var _loop = function _loop() {
	    var specialCharFound = false;
	    escapeKeys.forEach(function (key, index) {
	      if (specialCharFound) {
	        return;
	      }
	      if (runningStr.length >= key.length && runningStr.slice(0, key.length) === key) {
	        result += escapes[escapeKeys[index]];
	        runningStr = runningStr.slice(key.length, runningStr.length);
	        specialCharFound = true;
	      }
	    });
	    if (!specialCharFound) {
	      result += runningStr.slice(0, 1);
	      runningStr = runningStr.slice(1, runningStr.length);
	    }
	  };

	  while (runningStr) {
	    _loop();
	  }
	  return result;
	};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var DimensionError = __webpack_require__(20);

	function factory(type, config, load, typed) {
	  var DenseMatrix = type.DenseMatrix;
	  /**
	   * Iterates over SparseMatrix nonzero items and invokes the callback function f(Dij, Sij).
	   * Callback function invoked NNZ times (number of nonzero items in SparseMatrix).
	   *
	   *
	   *          ┌  f(Dij, Sij)  ; S(i,j) !== 0
	   * C(i,j) = ┤
	   *          └  Dij          ; otherwise
	   *
	   *
	   * @param {Matrix}   denseMatrix       The DenseMatrix instance (D)
	   * @param {Matrix}   sparseMatrix      The SparseMatrix instance (S)
	   * @param {Function} callback          The f(Dij,Sij) operation to invoke, where Dij = DenseMatrix(i,j) and Sij = SparseMatrix(i,j)
	   * @param {boolean}  inverse           A true value indicates callback should be invoked f(Sij,Dij)
	   *
	   * @return {Matrix}                    DenseMatrix (C)
	   *
	   * see https://github.com/josdejong/mathjs/pull/346#issuecomment-97477571
	   */

	  var algorithm01 = function algorithm01(denseMatrix, sparseMatrix, callback, inverse) {
	    // dense matrix arrays
	    var adata = denseMatrix._data;
	    var asize = denseMatrix._size;
	    var adt = denseMatrix._datatype; // sparse matrix arrays

	    var bvalues = sparseMatrix._values;
	    var bindex = sparseMatrix._index;
	    var bptr = sparseMatrix._ptr;
	    var bsize = sparseMatrix._size;
	    var bdt = sparseMatrix._datatype; // validate dimensions

	    if (asize.length !== bsize.length) {
	      throw new DimensionError(asize.length, bsize.length);
	    } // check rows & columns


	    if (asize[0] !== bsize[0] || asize[1] !== bsize[1]) {
	      throw new RangeError('Dimension mismatch. Matrix A (' + asize + ') must match Matrix B (' + bsize + ')');
	    } // sparse matrix cannot be a Pattern matrix


	    if (!bvalues) {
	      throw new Error('Cannot perform operation on Dense Matrix and Pattern Sparse Matrix');
	    } // rows & columns


	    var rows = asize[0];
	    var columns = asize[1]; // process data types

	    var dt = typeof adt === 'string' && adt === bdt ? adt : undefined; // callback function

	    var cf = dt ? typed.find(callback, [dt, dt]) : callback; // vars

	    var i, j; // result (DenseMatrix)

	    var cdata = []; // initialize c

	    for (i = 0; i < rows; i++) {
	      cdata[i] = [];
	    } // workspace


	    var x = []; // marks indicating we have a value in x for a given column

	    var w = []; // loop columns in b

	    for (j = 0; j < columns; j++) {
	      // column mark
	      var mark = j + 1; // values in column j

	      for (var k0 = bptr[j], k1 = bptr[j + 1], k = k0; k < k1; k++) {
	        // row
	        i = bindex[k]; // update workspace

	        x[i] = inverse ? cf(bvalues[k], adata[i][j]) : cf(adata[i][j], bvalues[k]); // mark i as updated

	        w[i] = mark;
	      } // loop rows


	      for (i = 0; i < rows; i++) {
	        // check row is in workspace
	        if (w[i] === mark) {
	          // c[i][j] was already calculated
	          cdata[i][j] = x[i];
	        } else {
	          // item does not exist in S
	          cdata[i][j] = adata[i][j];
	        }
	      }
	    } // return dense matrix


	    return new DenseMatrix({
	      data: cdata,
	      size: [rows, columns],
	      datatype: dt
	    });
	  };

	  return algorithm01;
	}

	exports.name = 'algorithm01';
	exports.factory = factory;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var DimensionError = __webpack_require__(20);

	function factory(type, config, load, typed) {
	  var equalScalar = load(__webpack_require__(40));
	  var SparseMatrix = type.SparseMatrix;
	  /**
	   * Iterates over SparseMatrix A and SparseMatrix B nonzero items and invokes the callback function f(Aij, Bij).
	   * Callback function invoked MAX(NNZA, NNZB) times
	   *
	   *
	   *          ┌  f(Aij, Bij)  ; A(i,j) !== 0 && B(i,j) !== 0
	   * C(i,j) = ┤  A(i,j)       ; A(i,j) !== 0
	   *          └  B(i,j)       ; B(i,j) !== 0
	   *
	   *
	   * @param {Matrix}   a                 The SparseMatrix instance (A)
	   * @param {Matrix}   b                 The SparseMatrix instance (B)
	   * @param {Function} callback          The f(Aij,Bij) operation to invoke
	   *
	   * @return {Matrix}                    SparseMatrix (C)
	   *
	   * see https://github.com/josdejong/mathjs/pull/346#issuecomment-97620294
	   */

	  var algorithm04 = function algorithm04(a, b, callback) {
	    // sparse matrix arrays
	    var avalues = a._values;
	    var aindex = a._index;
	    var aptr = a._ptr;
	    var asize = a._size;
	    var adt = a._datatype; // sparse matrix arrays

	    var bvalues = b._values;
	    var bindex = b._index;
	    var bptr = b._ptr;
	    var bsize = b._size;
	    var bdt = b._datatype; // validate dimensions

	    if (asize.length !== bsize.length) {
	      throw new DimensionError(asize.length, bsize.length);
	    } // check rows & columns


	    if (asize[0] !== bsize[0] || asize[1] !== bsize[1]) {
	      throw new RangeError('Dimension mismatch. Matrix A (' + asize + ') must match Matrix B (' + bsize + ')');
	    } // rows & columns


	    var rows = asize[0];
	    var columns = asize[1]; // datatype

	    var dt; // equal signature to use

	    var eq = equalScalar; // zero value

	    var zero = 0; // callback signature to use

	    var cf = callback; // process data types

	    if (typeof adt === 'string' && adt === bdt) {
	      // datatype
	      dt = adt; // find signature that matches (dt, dt)

	      eq = typed.find(equalScalar, [dt, dt]); // convert 0 to the same datatype

	      zero = typed.convert(0, dt); // callback

	      cf = typed.find(callback, [dt, dt]);
	    } // result arrays


	    var cvalues = avalues && bvalues ? [] : undefined;
	    var cindex = [];
	    var cptr = []; // matrix

	    var c = new SparseMatrix({
	      values: cvalues,
	      index: cindex,
	      ptr: cptr,
	      size: [rows, columns],
	      datatype: dt
	    }); // workspace

	    var xa = avalues && bvalues ? [] : undefined;
	    var xb = avalues && bvalues ? [] : undefined; // marks indicating we have a value in x for a given column

	    var wa = [];
	    var wb = []; // vars

	    var i, j, k, k0, k1; // loop columns

	    for (j = 0; j < columns; j++) {
	      // update cptr
	      cptr[j] = cindex.length; // columns mark

	      var mark = j + 1; // loop A(:,j)

	      for (k0 = aptr[j], k1 = aptr[j + 1], k = k0; k < k1; k++) {
	        // row
	        i = aindex[k]; // update c

	        cindex.push(i); // update workspace

	        wa[i] = mark; // check we need to process values

	        if (xa) {
	          xa[i] = avalues[k];
	        }
	      } // loop B(:,j)


	      for (k0 = bptr[j], k1 = bptr[j + 1], k = k0; k < k1; k++) {
	        // row
	        i = bindex[k]; // check row exists in A

	        if (wa[i] === mark) {
	          // update record in xa @ i
	          if (xa) {
	            // invoke callback
	            var v = cf(xa[i], bvalues[k]); // check for zero

	            if (!eq(v, zero)) {
	              // update workspace
	              xa[i] = v;
	            } else {
	              // remove mark (index will be removed later)
	              wa[i] = null;
	            }
	          }
	        } else {
	          // update c
	          cindex.push(i); // update workspace

	          wb[i] = mark; // check we need to process values

	          if (xb) {
	            xb[i] = bvalues[k];
	          }
	        }
	      } // check we need to process values (non pattern matrix)


	      if (xa && xb) {
	        // initialize first index in j
	        k = cptr[j]; // loop index in j

	        while (k < cindex.length) {
	          // row
	          i = cindex[k]; // check workspace has value @ i

	          if (wa[i] === mark) {
	            // push value (Aij != 0 || (Aij != 0 && Bij != 0))
	            cvalues[k] = xa[i]; // increment pointer

	            k++;
	          } else if (wb[i] === mark) {
	            // push value (bij != 0)
	            cvalues[k] = xb[i]; // increment pointer

	            k++;
	          } else {
	            // remove index @ k
	            cindex.splice(k, 1);
	          }
	        }
	      }
	    } // update cptr


	    cptr[columns] = cindex.length; // return sparse matrix

	    return c;
	  };

	  return algorithm04;
	}

	exports.name = 'algorithm04';
	exports.factory = factory;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var nearlyEqual = __webpack_require__(8).nearlyEqual;

	var bigNearlyEqual = __webpack_require__(41);

	function factory(type, config, load, typed) {
	  /**
	   * Test whether two values are equal.
	   *
	   * @param  {number | BigNumber | Fraction | boolean | Complex | Unit} x   First value to compare
	   * @param  {number | BigNumber | Fraction | boolean | Complex} y          Second value to compare
	   * @return {boolean}                                                  Returns true when the compared values are equal, else returns false
	   * @private
	   */
	  var equalScalar = typed('equalScalar', {
	    'boolean, boolean': function booleanBoolean(x, y) {
	      return x === y;
	    },
	    'number, number': function numberNumber(x, y) {
	      return x === y || nearlyEqual(x, y, config.epsilon);
	    },
	    'BigNumber, BigNumber': function BigNumberBigNumber(x, y) {
	      return x.eq(y) || bigNearlyEqual(x, y, config.epsilon);
	    },
	    'Fraction, Fraction': function FractionFraction(x, y) {
	      return x.equals(y);
	    },
	    'Complex, Complex': function ComplexComplex(x, y) {
	      return x.equals(y);
	    },
	    'Unit, Unit': function UnitUnit(x, y) {
	      if (!x.equalBase(y)) {
	        throw new Error('Cannot compare units with different base');
	      }

	      return equalScalar(x.value, y.value);
	    }
	  });
	  return equalScalar;
	}

	exports.factory = factory;

/***/ }),
/* 41 */
/***/ (function(module, exports) {

	'use strict';
	/**
	 * Compares two BigNumbers.
	 * @param {BigNumber} x       First value to compare
	 * @param {BigNumber} y       Second value to compare
	 * @param {number} [epsilon]  The maximum relative difference between x and y
	 *                            If epsilon is undefined or null, the function will
	 *                            test whether x and y are exactly equal.
	 * @return {boolean} whether the two numbers are nearly equal
	 */

	module.exports = function nearlyEqual(x, y, epsilon) {
	  // if epsilon is null or undefined, test whether x and y are exactly equal
	  if (epsilon === null || epsilon === undefined) {
	    return x.eq(y);
	  } // use "==" operator, handles infinities


	  if (x.eq(y)) {
	    return true;
	  } // NaN


	  if (x.isNaN() || y.isNaN()) {
	    return false;
	  } // at this point x and y should be finite


	  if (x.isFinite() && y.isFinite()) {
	    // check numbers are very close, needed when comparing numbers near zero
	    var diff = x.minus(y).abs();

	    if (diff.isZero()) {
	      return true;
	    } else {
	      // use relative error
	      var max = x.constructor.max(x.abs(), y.abs());
	      return diff.lte(max.times(epsilon));
	    }
	  } // Infinite and Number or negative Infinite and positive Infinite cases


	  return false;
	};

/***/ }),
/* 42 */
/***/ (function(module, exports) {

	'use strict';

	function factory(type, config, load, typed) {
	  var DenseMatrix = type.DenseMatrix;
	  /**
	   * Iterates over SparseMatrix S nonzero items and invokes the callback function f(Sij, b).
	   * Callback function invoked NZ times (number of nonzero items in S).
	   *
	   *
	   *          ┌  f(Sij, b)  ; S(i,j) !== 0
	   * C(i,j) = ┤
	   *          └  b          ; otherwise
	   *
	   *
	   * @param {Matrix}   s                 The SparseMatrix instance (S)
	   * @param {Scalar}   b                 The Scalar value
	   * @param {Function} callback          The f(Aij,b) operation to invoke
	   * @param {boolean}  inverse           A true value indicates callback should be invoked f(b,Sij)
	   *
	   * @return {Matrix}                    DenseMatrix (C)
	   *
	   * https://github.com/josdejong/mathjs/pull/346#issuecomment-97626813
	   */

	  var algorithm10 = function algorithm10(s, b, callback, inverse) {
	    // sparse matrix arrays
	    var avalues = s._values;
	    var aindex = s._index;
	    var aptr = s._ptr;
	    var asize = s._size;
	    var adt = s._datatype; // sparse matrix cannot be a Pattern matrix

	    if (!avalues) {
	      throw new Error('Cannot perform operation on Pattern Sparse Matrix and Scalar value');
	    } // rows & columns


	    var rows = asize[0];
	    var columns = asize[1]; // datatype

	    var dt; // callback signature to use

	    var cf = callback; // process data types

	    if (typeof adt === 'string') {
	      // datatype
	      dt = adt; // convert b to the same datatype

	      b = typed.convert(b, dt); // callback

	      cf = typed.find(callback, [dt, dt]);
	    } // result arrays


	    var cdata = []; // matrix

	    var c = new DenseMatrix({
	      data: cdata,
	      size: [rows, columns],
	      datatype: dt
	    }); // workspaces

	    var x = []; // marks indicating we have a value in x for a given column

	    var w = []; // loop columns

	    for (var j = 0; j < columns; j++) {
	      // columns mark
	      var mark = j + 1; // values in j

	      for (var k0 = aptr[j], k1 = aptr[j + 1], k = k0; k < k1; k++) {
	        // row
	        var r = aindex[k]; // update workspace

	        x[r] = avalues[k];
	        w[r] = mark;
	      } // loop rows


	      for (var i = 0; i < rows; i++) {
	        // initialize C on first column
	        if (j === 0) {
	          // create row array
	          cdata[i] = [];
	        } // check sparse matrix has a value @ i,j


	        if (w[i] === mark) {
	          // invoke callback, update C
	          cdata[i][j] = inverse ? cf(b, x[i]) : cf(x[i], b);
	        } else {
	          // dense matrix value @ i, j
	          cdata[i][j] = b;
	        }
	      }
	    } // return sparse matrix


	    return c;
	  };

	  return algorithm10;
	}

	exports.name = 'algorithm10';
	exports.factory = factory;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var DimensionError = __webpack_require__(20);

	function factory(type, config, load, typed) {
	  var DenseMatrix = type.DenseMatrix;
	  /**
	   * Iterates over DenseMatrix items and invokes the callback function f(Aij..z, Bij..z).
	   * Callback function invoked MxN times.
	   *
	   * C(i,j,...z) = f(Aij..z, Bij..z)
	   *
	   * @param {Matrix}   a                 The DenseMatrix instance (A)
	   * @param {Matrix}   b                 The DenseMatrix instance (B)
	   * @param {Function} callback          The f(Aij..z,Bij..z) operation to invoke
	   *
	   * @return {Matrix}                    DenseMatrix (C)
	   *
	   * https://github.com/josdejong/mathjs/pull/346#issuecomment-97658658
	   */

	  var algorithm13 = function algorithm13(a, b, callback) {
	    // a arrays
	    var adata = a._data;
	    var asize = a._size;
	    var adt = a._datatype; // b arrays

	    var bdata = b._data;
	    var bsize = b._size;
	    var bdt = b._datatype; // c arrays

	    var csize = []; // validate dimensions

	    if (asize.length !== bsize.length) {
	      throw new DimensionError(asize.length, bsize.length);
	    } // validate each one of the dimension sizes


	    for (var s = 0; s < asize.length; s++) {
	      // must match
	      if (asize[s] !== bsize[s]) {
	        throw new RangeError('Dimension mismatch. Matrix A (' + asize + ') must match Matrix B (' + bsize + ')');
	      } // update dimension in c


	      csize[s] = asize[s];
	    } // datatype


	    var dt; // callback signature to use

	    var cf = callback; // process data types

	    if (typeof adt === 'string' && adt === bdt) {
	      // datatype
	      dt = adt; // callback

	      cf = typed.find(callback, [dt, dt]);
	    } // populate cdata, iterate through dimensions


	    var cdata = csize.length > 0 ? _iterate(cf, 0, csize, csize[0], adata, bdata) : []; // c matrix

	    return new DenseMatrix({
	      data: cdata,
	      size: csize,
	      datatype: dt
	    });
	  }; // recursive function


	  function _iterate(f, level, s, n, av, bv) {
	    // initialize array for this level
	    var cv = []; // check we reach the last level

	    if (level === s.length - 1) {
	      // loop arrays in last level
	      for (var i = 0; i < n; i++) {
	        // invoke callback and store value
	        cv[i] = f(av[i], bv[i]);
	      }
	    } else {
	      // iterate current level
	      for (var j = 0; j < n; j++) {
	        // iterate next level
	        cv[j] = _iterate(f, level + 1, s, s[level + 1], av[j], bv[j]);
	      }
	    }

	    return cv;
	  }

	  return algorithm13;
	}

	exports.name = 'algorithm13';
	exports.factory = factory;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var clone = __webpack_require__(4).clone;

	function factory(type, config, load, typed) {
	  var DenseMatrix = type.DenseMatrix;
	  /**
	   * Iterates over DenseMatrix items and invokes the callback function f(Aij..z, b).
	   * Callback function invoked MxN times.
	   *
	   * C(i,j,...z) = f(Aij..z, b)
	   *
	   * @param {Matrix}   a                 The DenseMatrix instance (A)
	   * @param {Scalar}   b                 The Scalar value
	   * @param {Function} callback          The f(Aij..z,b) operation to invoke
	   * @param {boolean}  inverse           A true value indicates callback should be invoked f(b,Aij..z)
	   *
	   * @return {Matrix}                    DenseMatrix (C)
	   *
	   * https://github.com/josdejong/mathjs/pull/346#issuecomment-97659042
	   */

	  var algorithm14 = function algorithm14(a, b, callback, inverse) {
	    // a arrays
	    var adata = a._data;
	    var asize = a._size;
	    var adt = a._datatype; // datatype

	    var dt; // callback signature to use

	    var cf = callback; // process data types

	    if (typeof adt === 'string') {
	      // datatype
	      dt = adt; // convert b to the same datatype

	      b = typed.convert(b, dt); // callback

	      cf = typed.find(callback, [dt, dt]);
	    } // populate cdata, iterate through dimensions


	    var cdata = asize.length > 0 ? _iterate(cf, 0, asize, asize[0], adata, b, inverse) : []; // c matrix

	    return new DenseMatrix({
	      data: cdata,
	      size: clone(asize),
	      datatype: dt
	    });
	  }; // recursive function


	  function _iterate(f, level, s, n, av, bv, inverse) {
	    // initialize array for this level
	    var cv = []; // check we reach the last level

	    if (level === s.length - 1) {
	      // loop arrays in last level
	      for (var i = 0; i < n; i++) {
	        // invoke callback and store value
	        cv[i] = inverse ? f(bv, av[i]) : f(av[i], bv);
	      }
	    } else {
	      // iterate current level
	      for (var j = 0; j < n; j++) {
	        // iterate next level
	        cv[j] = _iterate(f, level + 1, s, s[level + 1], av[j], bv, inverse);
	      }
	    }

	    return cv;
	  }

	  return algorithm14;
	}

	exports.name = 'algorithm14';
	exports.factory = factory;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var isInteger = __webpack_require__(8).isInteger;

	var size = __webpack_require__(17).size;

	function factory(type, config, load, typed) {
	  var latex = __webpack_require__(36);

	  var identity = load(__webpack_require__(46));
	  var multiply = load(__webpack_require__(47));
	  var matrix = load(__webpack_require__(34));
	  var fraction = load(__webpack_require__(50));
	  var number = load(__webpack_require__(51));
	  /**
	   * Calculates the power of x to y, `x ^ y`.
	   * Matrix exponentiation is supported for square matrices `x`, and positive
	   * integer exponents `y`.
	   *
	   * For cubic roots of negative numbers, the function returns the principal
	   * root by default. In order to let the function return the real root,
	   * math.js can be configured with `math.config({predictable: true})`.
	   * To retrieve all cubic roots of a value, use `math.cbrt(x, true)`.
	   *
	   * Syntax:
	   *
	   *    math.pow(x, y)
	   *
	   * Examples:
	   *
	   *    math.pow(2, 3)               // returns number 8
	   *
	   *    const a = math.complex(2, 3)
	   *    math.pow(a, 2)                // returns Complex -5 + 12i
	   *
	   *    const b = [[1, 2], [4, 3]]
	   *    math.pow(b, 2)               // returns Array [[9, 8], [16, 17]]
	   *
	   * See also:
	   *
	   *    multiply, sqrt, cbrt, nthRoot
	   *
	   * @param  {number | BigNumber | Complex | Unit | Array | Matrix} x  The base
	   * @param  {number | BigNumber | Complex} y                          The exponent
	   * @return {number | BigNumber | Complex | Array | Matrix} The value of `x` to the power `y`
	   */

	  var pow = typed('pow', {
	    'number, number': _pow,
	    'Complex, Complex': function ComplexComplex(x, y) {
	      return x.pow(y);
	    },
	    'BigNumber, BigNumber': function BigNumberBigNumber(x, y) {
	      if (y.isInteger() || x >= 0 || config.predictable) {
	        return x.pow(y);
	      } else {
	        return new type.Complex(x.toNumber(), 0).pow(y.toNumber(), 0);
	      }
	    },
	    'Fraction, Fraction': function FractionFraction(x, y) {
	      if (y.d !== 1) {
	        if (config.predictable) {
	          throw new Error('Function pow does not support non-integer exponents for fractions.');
	        } else {
	          return _pow(x.valueOf(), y.valueOf());
	        }
	      } else {
	        return x.pow(y);
	      }
	    },
	    'Array, number': _powArray,
	    'Array, BigNumber': function ArrayBigNumber(x, y) {
	      return _powArray(x, y.toNumber());
	    },
	    'Matrix, number': _powMatrix,
	    'Matrix, BigNumber': function MatrixBigNumber(x, y) {
	      return _powMatrix(x, y.toNumber());
	    },
	    'Unit, number | BigNumber': function UnitNumberBigNumber(x, y) {
	      return x.pow(y);
	    }
	  });
	  /**
	   * Calculates the power of x to y, x^y, for two numbers.
	   * @param {number} x
	   * @param {number} y
	   * @return {number | Complex} res
	   * @private
	   */

	  function _pow(x, y) {
	    // Alternatively could define a 'realmode' config option or something, but
	    // 'predictable' will work for now
	    if (config.predictable && !isInteger(y) && x < 0) {
	      // Check to see if y can be represented as a fraction
	      try {
	        var yFrac = fraction(y);
	        var yNum = number(yFrac);

	        if (y === yNum || Math.abs((y - yNum) / y) < 1e-14) {
	          if (yFrac.d % 2 === 1) {
	            return (yFrac.n % 2 === 0 ? 1 : -1) * Math.pow(-x, y);
	          }
	        }
	      } catch (ex) {} // fraction() throws an error if y is Infinity, etc.
	      // Unable to express y as a fraction, so continue on

	    } // x^Infinity === 0 if -1 < x < 1
	    // A real number 0 is returned instead of complex(0)


	    if (x * x < 1 && y === Infinity || x * x > 1 && y === -Infinity) {
	      return 0;
	    } // **for predictable mode** x^Infinity === NaN if x < -1
	    // N.B. this behavour is different from `Math.pow` which gives
	    // (-2)^Infinity === Infinity


	    if (config.predictable && (x < -1 && y === Infinity || x > -1 && x < 0 && y === -Infinity)) {
	      return NaN;
	    }

	    if (isInteger(y) || x >= 0 || config.predictable) {
	      return Math.pow(x, y);
	    } else {
	      return new type.Complex(x, 0).pow(y, 0);
	    }
	  }
	  /**
	   * Calculate the power of a 2d array
	   * @param {Array} x     must be a 2 dimensional, square matrix
	   * @param {number} y    a positive, integer value
	   * @returns {Array}
	   * @private
	   */


	  function _powArray(x, y) {
	    if (!isInteger(y) || y < 0) {
	      throw new TypeError('For A^b, b must be a positive integer (value is ' + y + ')');
	    } // verify that A is a 2 dimensional square matrix


	    var s = size(x);

	    if (s.length !== 2) {
	      throw new Error('For A^b, A must be 2 dimensional (A has ' + s.length + ' dimensions)');
	    }

	    if (s[0] !== s[1]) {
	      throw new Error('For A^b, A must be square (size is ' + s[0] + 'x' + s[1] + ')');
	    }

	    var res = identity(s[0]).valueOf();
	    var px = x;

	    while (y >= 1) {
	      if ((y & 1) === 1) {
	        res = multiply(px, res);
	      }

	      y >>= 1;
	      px = multiply(px, px);
	    }

	    return res;
	  }
	  /**
	   * Calculate the power of a 2d matrix
	   * @param {Matrix} x     must be a 2 dimensional, square matrix
	   * @param {number} y    a positive, integer value
	   * @returns {Matrix}
	   * @private
	   */


	  function _powMatrix(x, y) {
	    return matrix(_powArray(x.valueOf(), y));
	  }

	  pow.toTex = {
	    2: "\\left(${args[0]}\\right)".concat(latex.operators['pow'], "{${args[1]}}")
	  };
	  return pow;
	}

	exports.name = 'pow';
	exports.factory = factory;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var array = __webpack_require__(17);

	var isInteger = __webpack_require__(8).isInteger;

	function factory(type, config, load, typed) {
	  var matrix = load(__webpack_require__(34));
	  /**
	   * Create a 2-dimensional identity matrix with size m x n or n x n.
	   * The matrix has ones on the diagonal and zeros elsewhere.
	   *
	   * Syntax:
	   *
	   *    math.identity(n)
	   *    math.identity(n, format)
	   *    math.identity(m, n)
	   *    math.identity(m, n, format)
	   *    math.identity([m, n])
	   *    math.identity([m, n], format)
	   *
	   * Examples:
	   *
	   *    math.identity(3)                    // returns [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
	   *    math.identity(3, 2)                 // returns [[1, 0], [0, 1], [0, 0]]
	   *
	   *    const A = [[1, 2, 3], [4, 5, 6]]
	   *    math.identity(math.size(A))         // returns [[1, 0, 0], [0, 1, 0]]
	   *
	   * See also:
	   *
	   *    diag, ones, zeros, size, range
	   *
	   * @param {...number | Matrix | Array} size   The size for the matrix
	   * @param {string} [format]                   The Matrix storage format
	   *
	   * @return {Matrix | Array | number} A matrix with ones on the diagonal.
	   */

	  var identity = typed('identity', {
	    '': function _() {
	      return config.matrix === 'Matrix' ? matrix([]) : [];
	    },
	    'string': function string(format) {
	      return matrix(format);
	    },
	    'number | BigNumber': function numberBigNumber(rows) {
	      return _identity(rows, rows, config.matrix === 'Matrix' ? 'default' : undefined);
	    },
	    'number | BigNumber, string': function numberBigNumberString(rows, format) {
	      return _identity(rows, rows, format);
	    },
	    'number | BigNumber, number | BigNumber': function numberBigNumberNumberBigNumber(rows, cols) {
	      return _identity(rows, cols, config.matrix === 'Matrix' ? 'default' : undefined);
	    },
	    'number | BigNumber, number | BigNumber, string': function numberBigNumberNumberBigNumberString(rows, cols, format) {
	      return _identity(rows, cols, format);
	    },
	    'Array': function Array(size) {
	      return _identityVector(size);
	    },
	    'Array, string': function ArrayString(size, format) {
	      return _identityVector(size, format);
	    },
	    'Matrix': function Matrix(size) {
	      return _identityVector(size.valueOf(), size.storage());
	    },
	    'Matrix, string': function MatrixString(size, format) {
	      return _identityVector(size.valueOf(), format);
	    }
	  });
	  identity.toTex = undefined; // use default template

	  return identity;

	  function _identityVector(size, format) {
	    switch (size.length) {
	      case 0:
	        return format ? matrix(format) : [];

	      case 1:
	        return _identity(size[0], size[0], format);

	      case 2:
	        return _identity(size[0], size[1], format);

	      default:
	        throw new Error('Vector containing two values expected');
	    }
	  }
	  /**
	   * Create an identity matrix
	   * @param {number | BigNumber} rows
	   * @param {number | BigNumber} cols
	   * @param {string} [format]
	   * @returns {Matrix}
	   * @private
	   */


	  function _identity(rows, cols, format) {
	    // BigNumber constructor with the right precision
	    var Big = type.isBigNumber(rows) || type.isBigNumber(cols) ? type.BigNumber : null;
	    if (type.isBigNumber(rows)) rows = rows.toNumber();
	    if (type.isBigNumber(cols)) cols = cols.toNumber();

	    if (!isInteger(rows) || rows < 1) {
	      throw new Error('Parameters in function identity must be positive integers');
	    }

	    if (!isInteger(cols) || cols < 1) {
	      throw new Error('Parameters in function identity must be positive integers');
	    }

	    var one = Big ? new type.BigNumber(1) : 1;
	    var defaultValue = Big ? new Big(0) : 0;
	    var size = [rows, cols]; // check we need to return a matrix

	    if (format) {
	      // get matrix storage constructor
	      var F = type.Matrix.storage(format); // create diagonal matrix (use optimized implementation for storage format)

	      return F.diagonal(size, one, 0, defaultValue);
	    } // create and resize array


	    var res = array.resize([], size, defaultValue); // fill in ones on the diagonal

	    var minimum = rows < cols ? rows : cols; // fill diagonal

	    for (var d = 0; d < minimum; d++) {
	      res[d][d] = one;
	    }

	    return res;
	  }
	}

	exports.name = 'identity';
	exports.factory = factory;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var extend = __webpack_require__(4).extend;

	var array = __webpack_require__(17);

	function factory(type, config, load, typed) {
	  var latex = __webpack_require__(36);

	  var matrix = load(__webpack_require__(34));
	  var addScalar = load(__webpack_require__(35));
	  var multiplyScalar = load(__webpack_require__(48));
	  var equalScalar = load(__webpack_require__(40));
	  var algorithm11 = load(__webpack_require__(49));
	  var algorithm14 = load(__webpack_require__(44));
	  var DenseMatrix = type.DenseMatrix;
	  var SparseMatrix = type.SparseMatrix;
	  /**
	   * Multiply two or more values, `x * y`.
	   * For matrices, the matrix product is calculated.
	   *
	   * Syntax:
	   *
	   *    math.multiply(x, y)
	   *    math.multiply(x, y, z, ...)
	   *
	   * Examples:
	   *
	   *    math.multiply(4, 5.2)        // returns number 20.8
	   *    math.multiply(2, 3, 4)       // returns number 24
	   *
	   *    const a = math.complex(2, 3)
	   *    const b = math.complex(4, 1)
	   *    math.multiply(a, b)          // returns Complex 5 + 14i
	   *
	   *    const c = [[1, 2], [4, 3]]
	   *    const d = [[1, 2, 3], [3, -4, 7]]
	   *    math.multiply(c, d)          // returns Array [[7, -6, 17], [13, -4, 33]]
	   *
	   *    const e = math.unit('2.1 km')
	   *    math.multiply(3, e)          // returns Unit 6.3 km
	   *
	   * See also:
	   *
	   *    divide, prod, cross, dot
	   *
	   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} x First value to multiply
	   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} y Second value to multiply
	   * @return {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} Multiplication of `x` and `y`
	   */

	  var multiply = typed('multiply', extend({
	    // we extend the signatures of multiplyScalar with signatures dealing with matrices
	    'Array, Array': function ArrayArray(x, y) {
	      // check dimensions
	      _validateMatrixDimensions(array.size(x), array.size(y)); // use dense matrix implementation


	      var m = multiply(matrix(x), matrix(y)); // return array or scalar

	      return type.isMatrix(m) ? m.valueOf() : m;
	    },
	    'Matrix, Matrix': function MatrixMatrix(x, y) {
	      // dimensions
	      var xsize = x.size();
	      var ysize = y.size(); // check dimensions

	      _validateMatrixDimensions(xsize, ysize); // process dimensions


	      if (xsize.length === 1) {
	        // process y dimensions
	        if (ysize.length === 1) {
	          // Vector * Vector
	          return _multiplyVectorVector(x, y, xsize[0]);
	        } // Vector * Matrix


	        return _multiplyVectorMatrix(x, y);
	      } // process y dimensions


	      if (ysize.length === 1) {
	        // Matrix * Vector
	        return _multiplyMatrixVector(x, y);
	      } // Matrix * Matrix


	      return _multiplyMatrixMatrix(x, y);
	    },
	    'Matrix, Array': function MatrixArray(x, y) {
	      // use Matrix * Matrix implementation
	      return multiply(x, matrix(y));
	    },
	    'Array, Matrix': function ArrayMatrix(x, y) {
	      // use Matrix * Matrix implementation
	      return multiply(matrix(x, y.storage()), y);
	    },
	    'SparseMatrix, any': function SparseMatrixAny(x, y) {
	      return algorithm11(x, y, multiplyScalar, false);
	    },
	    'DenseMatrix, any': function DenseMatrixAny(x, y) {
	      return algorithm14(x, y, multiplyScalar, false);
	    },
	    'any, SparseMatrix': function anySparseMatrix(x, y) {
	      return algorithm11(y, x, multiplyScalar, true);
	    },
	    'any, DenseMatrix': function anyDenseMatrix(x, y) {
	      return algorithm14(y, x, multiplyScalar, true);
	    },
	    'Array, any': function ArrayAny(x, y) {
	      // use matrix implementation
	      return algorithm14(matrix(x), y, multiplyScalar, false).valueOf();
	    },
	    'any, Array': function anyArray(x, y) {
	      // use matrix implementation
	      return algorithm14(matrix(y), x, multiplyScalar, true).valueOf();
	    },
	    'any, any': multiplyScalar,
	    'any, any, ...any': function anyAnyAny(x, y, rest) {
	      var result = multiply(x, y);

	      for (var i = 0; i < rest.length; i++) {
	        result = multiply(result, rest[i]);
	      }

	      return result;
	    }
	  }, multiplyScalar.signatures));

	  function _validateMatrixDimensions(size1, size2) {
	    // check left operand dimensions
	    switch (size1.length) {
	      case 1:
	        // check size2
	        switch (size2.length) {
	          case 1:
	            // Vector x Vector
	            if (size1[0] !== size2[0]) {
	              // throw error
	              throw new RangeError('Dimension mismatch in multiplication. Vectors must have the same length');
	            }

	            break;

	          case 2:
	            // Vector x Matrix
	            if (size1[0] !== size2[0]) {
	              // throw error
	              throw new RangeError('Dimension mismatch in multiplication. Vector length (' + size1[0] + ') must match Matrix rows (' + size2[0] + ')');
	            }

	            break;

	          default:
	            throw new Error('Can only multiply a 1 or 2 dimensional matrix (Matrix B has ' + size2.length + ' dimensions)');
	        }

	        break;

	      case 2:
	        // check size2
	        switch (size2.length) {
	          case 1:
	            // Matrix x Vector
	            if (size1[1] !== size2[0]) {
	              // throw error
	              throw new RangeError('Dimension mismatch in multiplication. Matrix columns (' + size1[1] + ') must match Vector length (' + size2[0] + ')');
	            }

	            break;

	          case 2:
	            // Matrix x Matrix
	            if (size1[1] !== size2[0]) {
	              // throw error
	              throw new RangeError('Dimension mismatch in multiplication. Matrix A columns (' + size1[1] + ') must match Matrix B rows (' + size2[0] + ')');
	            }

	            break;

	          default:
	            throw new Error('Can only multiply a 1 or 2 dimensional matrix (Matrix B has ' + size2.length + ' dimensions)');
	        }

	        break;

	      default:
	        throw new Error('Can only multiply a 1 or 2 dimensional matrix (Matrix A has ' + size1.length + ' dimensions)');
	    }
	  }
	  /**
	   * C = A * B
	   *
	   * @param {Matrix} a            Dense Vector   (N)
	   * @param {Matrix} b            Dense Vector   (N)
	   *
	   * @return {number}             Scalar value
	   */


	  function _multiplyVectorVector(a, b, n) {
	    // check empty vector
	    if (n === 0) {
	      throw new Error('Cannot multiply two empty vectors');
	    } // a dense


	    var adata = a._data;
	    var adt = a._datatype; // b dense

	    var bdata = b._data;
	    var bdt = b._datatype; // datatype

	    var dt; // addScalar signature to use

	    var af = addScalar; // multiplyScalar signature to use

	    var mf = multiplyScalar; // process data types

	    if (adt && bdt && adt === bdt && typeof adt === 'string') {
	      // datatype
	      dt = adt; // find signatures that matches (dt, dt)

	      af = typed.find(addScalar, [dt, dt]);
	      mf = typed.find(multiplyScalar, [dt, dt]);
	    } // result (do not initialize it with zero)


	    var c = mf(adata[0], bdata[0]); // loop data

	    for (var i = 1; i < n; i++) {
	      // multiply and accumulate
	      c = af(c, mf(adata[i], bdata[i]));
	    }

	    return c;
	  }
	  /**
	   * C = A * B
	   *
	   * @param {Matrix} a            Dense Vector   (M)
	   * @param {Matrix} b            Matrix         (MxN)
	   *
	   * @return {Matrix}             Dense Vector   (N)
	   */


	  function _multiplyVectorMatrix(a, b) {
	    // process storage
	    if (b.storage() !== 'dense') {
	      throw new Error('Support for SparseMatrix not implemented');
	    }

	    return _multiplyVectorDenseMatrix(a, b);
	  }
	  /**
	   * C = A * B
	   *
	   * @param {Matrix} a            Dense Vector   (M)
	   * @param {Matrix} b            Dense Matrix   (MxN)
	   *
	   * @return {Matrix}             Dense Vector   (N)
	   */


	  function _multiplyVectorDenseMatrix(a, b) {
	    // a dense
	    var adata = a._data;
	    var asize = a._size;
	    var adt = a._datatype; // b dense

	    var bdata = b._data;
	    var bsize = b._size;
	    var bdt = b._datatype; // rows & columns

	    var alength = asize[0];
	    var bcolumns = bsize[1]; // datatype

	    var dt; // addScalar signature to use

	    var af = addScalar; // multiplyScalar signature to use

	    var mf = multiplyScalar; // process data types

	    if (adt && bdt && adt === bdt && typeof adt === 'string') {
	      // datatype
	      dt = adt; // find signatures that matches (dt, dt)

	      af = typed.find(addScalar, [dt, dt]);
	      mf = typed.find(multiplyScalar, [dt, dt]);
	    } // result


	    var c = []; // loop matrix columns

	    for (var j = 0; j < bcolumns; j++) {
	      // sum (do not initialize it with zero)
	      var sum = mf(adata[0], bdata[0][j]); // loop vector

	      for (var i = 1; i < alength; i++) {
	        // multiply & accumulate
	        sum = af(sum, mf(adata[i], bdata[i][j]));
	      }

	      c[j] = sum;
	    } // return matrix


	    return new DenseMatrix({
	      data: c,
	      size: [bcolumns],
	      datatype: dt
	    });
	  }
	  /**
	   * C = A * B
	   *
	   * @param {Matrix} a            Matrix         (MxN)
	   * @param {Matrix} b            Dense Vector   (N)
	   *
	   * @return {Matrix}             Dense Vector   (M)
	   */


	  var _multiplyMatrixVector = typed('_multiplyMatrixVector', {
	    'DenseMatrix, any': _multiplyDenseMatrixVector,
	    'SparseMatrix, any': _multiplySparseMatrixVector
	  });
	  /**
	   * C = A * B
	   *
	   * @param {Matrix} a            Matrix         (MxN)
	   * @param {Matrix} b            Matrix         (NxC)
	   *
	   * @return {Matrix}             Matrix         (MxC)
	   */


	  var _multiplyMatrixMatrix = typed('_multiplyMatrixMatrix', {
	    'DenseMatrix, DenseMatrix': _multiplyDenseMatrixDenseMatrix,
	    'DenseMatrix, SparseMatrix': _multiplyDenseMatrixSparseMatrix,
	    'SparseMatrix, DenseMatrix': _multiplySparseMatrixDenseMatrix,
	    'SparseMatrix, SparseMatrix': _multiplySparseMatrixSparseMatrix
	  });
	  /**
	   * C = A * B
	   *
	   * @param {Matrix} a            DenseMatrix  (MxN)
	   * @param {Matrix} b            Dense Vector (N)
	   *
	   * @return {Matrix}             Dense Vector (M)
	   */


	  function _multiplyDenseMatrixVector(a, b) {
	    // a dense
	    var adata = a._data;
	    var asize = a._size;
	    var adt = a._datatype; // b dense

	    var bdata = b._data;
	    var bdt = b._datatype; // rows & columns

	    var arows = asize[0];
	    var acolumns = asize[1]; // datatype

	    var dt; // addScalar signature to use

	    var af = addScalar; // multiplyScalar signature to use

	    var mf = multiplyScalar; // process data types

	    if (adt && bdt && adt === bdt && typeof adt === 'string') {
	      // datatype
	      dt = adt; // find signatures that matches (dt, dt)

	      af = typed.find(addScalar, [dt, dt]);
	      mf = typed.find(multiplyScalar, [dt, dt]);
	    } // result


	    var c = []; // loop matrix a rows

	    for (var i = 0; i < arows; i++) {
	      // current row
	      var row = adata[i]; // sum (do not initialize it with zero)

	      var sum = mf(row[0], bdata[0]); // loop matrix a columns

	      for (var j = 1; j < acolumns; j++) {
	        // multiply & accumulate
	        sum = af(sum, mf(row[j], bdata[j]));
	      }

	      c[i] = sum;
	    } // return matrix


	    return new DenseMatrix({
	      data: c,
	      size: [arows],
	      datatype: dt
	    });
	  }
	  /**
	   * C = A * B
	   *
	   * @param {Matrix} a            DenseMatrix    (MxN)
	   * @param {Matrix} b            DenseMatrix    (NxC)
	   *
	   * @return {Matrix}             DenseMatrix    (MxC)
	   */


	  function _multiplyDenseMatrixDenseMatrix(a, b) {
	    // a dense
	    var adata = a._data;
	    var asize = a._size;
	    var adt = a._datatype; // b dense

	    var bdata = b._data;
	    var bsize = b._size;
	    var bdt = b._datatype; // rows & columns

	    var arows = asize[0];
	    var acolumns = asize[1];
	    var bcolumns = bsize[1]; // datatype

	    var dt; // addScalar signature to use

	    var af = addScalar; // multiplyScalar signature to use

	    var mf = multiplyScalar; // process data types

	    if (adt && bdt && adt === bdt && typeof adt === 'string') {
	      // datatype
	      dt = adt; // find signatures that matches (dt, dt)

	      af = typed.find(addScalar, [dt, dt]);
	      mf = typed.find(multiplyScalar, [dt, dt]);
	    } // result


	    var c = []; // loop matrix a rows

	    for (var i = 0; i < arows; i++) {
	      // current row
	      var row = adata[i]; // initialize row array

	      c[i] = []; // loop matrix b columns

	      for (var j = 0; j < bcolumns; j++) {
	        // sum (avoid initializing sum to zero)
	        var sum = mf(row[0], bdata[0][j]); // loop matrix a columns

	        for (var x = 1; x < acolumns; x++) {
	          // multiply & accumulate
	          sum = af(sum, mf(row[x], bdata[x][j]));
	        }

	        c[i][j] = sum;
	      }
	    } // return matrix


	    return new DenseMatrix({
	      data: c,
	      size: [arows, bcolumns],
	      datatype: dt
	    });
	  }
	  /**
	   * C = A * B
	   *
	   * @param {Matrix} a            DenseMatrix    (MxN)
	   * @param {Matrix} b            SparseMatrix   (NxC)
	   *
	   * @return {Matrix}             SparseMatrix   (MxC)
	   */


	  function _multiplyDenseMatrixSparseMatrix(a, b) {
	    // a dense
	    var adata = a._data;
	    var asize = a._size;
	    var adt = a._datatype; // b sparse

	    var bvalues = b._values;
	    var bindex = b._index;
	    var bptr = b._ptr;
	    var bsize = b._size;
	    var bdt = b._datatype; // validate b matrix

	    if (!bvalues) {
	      throw new Error('Cannot multiply Dense Matrix times Pattern only Matrix');
	    } // rows & columns


	    var arows = asize[0];
	    var bcolumns = bsize[1]; // datatype

	    var dt; // addScalar signature to use

	    var af = addScalar; // multiplyScalar signature to use

	    var mf = multiplyScalar; // equalScalar signature to use

	    var eq = equalScalar; // zero value

	    var zero = 0; // process data types

	    if (adt && bdt && adt === bdt && typeof adt === 'string') {
	      // datatype
	      dt = adt; // find signatures that matches (dt, dt)

	      af = typed.find(addScalar, [dt, dt]);
	      mf = typed.find(multiplyScalar, [dt, dt]);
	      eq = typed.find(equalScalar, [dt, dt]); // convert 0 to the same datatype

	      zero = typed.convert(0, dt);
	    } // result


	    var cvalues = [];
	    var cindex = [];
	    var cptr = []; // c matrix

	    var c = new SparseMatrix({
	      values: cvalues,
	      index: cindex,
	      ptr: cptr,
	      size: [arows, bcolumns],
	      datatype: dt
	    }); // loop b columns

	    for (var jb = 0; jb < bcolumns; jb++) {
	      // update ptr
	      cptr[jb] = cindex.length; // indeces in column jb

	      var kb0 = bptr[jb];
	      var kb1 = bptr[jb + 1]; // do not process column jb if no data exists

	      if (kb1 > kb0) {
	        // last row mark processed
	        var last = 0; // loop a rows

	        for (var i = 0; i < arows; i++) {
	          // column mark
	          var mark = i + 1; // C[i, jb]

	          var cij = void 0; // values in b column j

	          for (var kb = kb0; kb < kb1; kb++) {
	            // row
	            var ib = bindex[kb]; // check value has been initialized

	            if (last !== mark) {
	              // first value in column jb
	              cij = mf(adata[i][ib], bvalues[kb]); // update mark

	              last = mark;
	            } else {
	              // accumulate value
	              cij = af(cij, mf(adata[i][ib], bvalues[kb]));
	            }
	          } // check column has been processed and value != 0


	          if (last === mark && !eq(cij, zero)) {
	            // push row & value
	            cindex.push(i);
	            cvalues.push(cij);
	          }
	        }
	      }
	    } // update ptr


	    cptr[bcolumns] = cindex.length; // return sparse matrix

	    return c;
	  }
	  /**
	   * C = A * B
	   *
	   * @param {Matrix} a            SparseMatrix    (MxN)
	   * @param {Matrix} b            Dense Vector (N)
	   *
	   * @return {Matrix}             SparseMatrix    (M, 1)
	   */


	  function _multiplySparseMatrixVector(a, b) {
	    // a sparse
	    var avalues = a._values;
	    var aindex = a._index;
	    var aptr = a._ptr;
	    var adt = a._datatype; // validate a matrix

	    if (!avalues) {
	      throw new Error('Cannot multiply Pattern only Matrix times Dense Matrix');
	    } // b dense


	    var bdata = b._data;
	    var bdt = b._datatype; // rows & columns

	    var arows = a._size[0];
	    var brows = b._size[0]; // result

	    var cvalues = [];
	    var cindex = [];
	    var cptr = []; // datatype

	    var dt; // addScalar signature to use

	    var af = addScalar; // multiplyScalar signature to use

	    var mf = multiplyScalar; // equalScalar signature to use

	    var eq = equalScalar; // zero value

	    var zero = 0; // process data types

	    if (adt && bdt && adt === bdt && typeof adt === 'string') {
	      // datatype
	      dt = adt; // find signatures that matches (dt, dt)

	      af = typed.find(addScalar, [dt, dt]);
	      mf = typed.find(multiplyScalar, [dt, dt]);
	      eq = typed.find(equalScalar, [dt, dt]); // convert 0 to the same datatype

	      zero = typed.convert(0, dt);
	    } // workspace


	    var x = []; // vector with marks indicating a value x[i] exists in a given column

	    var w = []; // update ptr

	    cptr[0] = 0; // rows in b

	    for (var ib = 0; ib < brows; ib++) {
	      // b[ib]
	      var vbi = bdata[ib]; // check b[ib] != 0, avoid loops

	      if (!eq(vbi, zero)) {
	        // A values & index in ib column
	        for (var ka0 = aptr[ib], ka1 = aptr[ib + 1], ka = ka0; ka < ka1; ka++) {
	          // a row
	          var ia = aindex[ka]; // check value exists in current j

	          if (!w[ia]) {
	            // ia is new entry in j
	            w[ia] = true; // add i to pattern of C

	            cindex.push(ia); // x(ia) = A

	            x[ia] = mf(vbi, avalues[ka]);
	          } else {
	            // i exists in C already
	            x[ia] = af(x[ia], mf(vbi, avalues[ka]));
	          }
	        }
	      }
	    } // copy values from x to column jb of c


	    for (var p1 = cindex.length, p = 0; p < p1; p++) {
	      // row
	      var ic = cindex[p]; // copy value

	      cvalues[p] = x[ic];
	    } // update ptr


	    cptr[1] = cindex.length; // return sparse matrix

	    return new SparseMatrix({
	      values: cvalues,
	      index: cindex,
	      ptr: cptr,
	      size: [arows, 1],
	      datatype: dt
	    });
	  }
	  /**
	   * C = A * B
	   *
	   * @param {Matrix} a            SparseMatrix      (MxN)
	   * @param {Matrix} b            DenseMatrix       (NxC)
	   *
	   * @return {Matrix}             SparseMatrix      (MxC)
	   */


	  function _multiplySparseMatrixDenseMatrix(a, b) {
	    // a sparse
	    var avalues = a._values;
	    var aindex = a._index;
	    var aptr = a._ptr;
	    var adt = a._datatype; // validate a matrix

	    if (!avalues) {
	      throw new Error('Cannot multiply Pattern only Matrix times Dense Matrix');
	    } // b dense


	    var bdata = b._data;
	    var bdt = b._datatype; // rows & columns

	    var arows = a._size[0];
	    var brows = b._size[0];
	    var bcolumns = b._size[1]; // datatype

	    var dt; // addScalar signature to use

	    var af = addScalar; // multiplyScalar signature to use

	    var mf = multiplyScalar; // equalScalar signature to use

	    var eq = equalScalar; // zero value

	    var zero = 0; // process data types

	    if (adt && bdt && adt === bdt && typeof adt === 'string') {
	      // datatype
	      dt = adt; // find signatures that matches (dt, dt)

	      af = typed.find(addScalar, [dt, dt]);
	      mf = typed.find(multiplyScalar, [dt, dt]);
	      eq = typed.find(equalScalar, [dt, dt]); // convert 0 to the same datatype

	      zero = typed.convert(0, dt);
	    } // result


	    var cvalues = [];
	    var cindex = [];
	    var cptr = []; // c matrix

	    var c = new SparseMatrix({
	      values: cvalues,
	      index: cindex,
	      ptr: cptr,
	      size: [arows, bcolumns],
	      datatype: dt
	    }); // workspace

	    var x = []; // vector with marks indicating a value x[i] exists in a given column

	    var w = []; // loop b columns

	    for (var jb = 0; jb < bcolumns; jb++) {
	      // update ptr
	      cptr[jb] = cindex.length; // mark in workspace for current column

	      var mark = jb + 1; // rows in jb

	      for (var ib = 0; ib < brows; ib++) {
	        // b[ib, jb]
	        var vbij = bdata[ib][jb]; // check b[ib, jb] != 0, avoid loops

	        if (!eq(vbij, zero)) {
	          // A values & index in ib column
	          for (var ka0 = aptr[ib], ka1 = aptr[ib + 1], ka = ka0; ka < ka1; ka++) {
	            // a row
	            var ia = aindex[ka]; // check value exists in current j

	            if (w[ia] !== mark) {
	              // ia is new entry in j
	              w[ia] = mark; // add i to pattern of C

	              cindex.push(ia); // x(ia) = A

	              x[ia] = mf(vbij, avalues[ka]);
	            } else {
	              // i exists in C already
	              x[ia] = af(x[ia], mf(vbij, avalues[ka]));
	            }
	          }
	        }
	      } // copy values from x to column jb of c


	      for (var p0 = cptr[jb], p1 = cindex.length, p = p0; p < p1; p++) {
	        // row
	        var ic = cindex[p]; // copy value

	        cvalues[p] = x[ic];
	      }
	    } // update ptr


	    cptr[bcolumns] = cindex.length; // return sparse matrix

	    return c;
	  }
	  /**
	   * C = A * B
	   *
	   * @param {Matrix} a            SparseMatrix      (MxN)
	   * @param {Matrix} b            SparseMatrix      (NxC)
	   *
	   * @return {Matrix}             SparseMatrix      (MxC)
	   */


	  function _multiplySparseMatrixSparseMatrix(a, b) {
	    // a sparse
	    var avalues = a._values;
	    var aindex = a._index;
	    var aptr = a._ptr;
	    var adt = a._datatype; // b sparse

	    var bvalues = b._values;
	    var bindex = b._index;
	    var bptr = b._ptr;
	    var bdt = b._datatype; // rows & columns

	    var arows = a._size[0];
	    var bcolumns = b._size[1]; // flag indicating both matrices (a & b) contain data

	    var values = avalues && bvalues; // datatype

	    var dt; // addScalar signature to use

	    var af = addScalar; // multiplyScalar signature to use

	    var mf = multiplyScalar; // process data types

	    if (adt && bdt && adt === bdt && typeof adt === 'string') {
	      // datatype
	      dt = adt; // find signatures that matches (dt, dt)

	      af = typed.find(addScalar, [dt, dt]);
	      mf = typed.find(multiplyScalar, [dt, dt]);
	    } // result


	    var cvalues = values ? [] : undefined;
	    var cindex = [];
	    var cptr = []; // c matrix

	    var c = new SparseMatrix({
	      values: cvalues,
	      index: cindex,
	      ptr: cptr,
	      size: [arows, bcolumns],
	      datatype: dt
	    }); // workspace

	    var x = values ? [] : undefined; // vector with marks indicating a value x[i] exists in a given column

	    var w = []; // variables

	    var ka, ka0, ka1, kb, kb0, kb1, ia, ib; // loop b columns

	    for (var jb = 0; jb < bcolumns; jb++) {
	      // update ptr
	      cptr[jb] = cindex.length; // mark in workspace for current column

	      var mark = jb + 1; // B values & index in j

	      for (kb0 = bptr[jb], kb1 = bptr[jb + 1], kb = kb0; kb < kb1; kb++) {
	        // b row
	        ib = bindex[kb]; // check we need to process values

	        if (values) {
	          // loop values in a[:,ib]
	          for (ka0 = aptr[ib], ka1 = aptr[ib + 1], ka = ka0; ka < ka1; ka++) {
	            // row
	            ia = aindex[ka]; // check value exists in current j

	            if (w[ia] !== mark) {
	              // ia is new entry in j
	              w[ia] = mark; // add i to pattern of C

	              cindex.push(ia); // x(ia) = A

	              x[ia] = mf(bvalues[kb], avalues[ka]);
	            } else {
	              // i exists in C already
	              x[ia] = af(x[ia], mf(bvalues[kb], avalues[ka]));
	            }
	          }
	        } else {
	          // loop values in a[:,ib]
	          for (ka0 = aptr[ib], ka1 = aptr[ib + 1], ka = ka0; ka < ka1; ka++) {
	            // row
	            ia = aindex[ka]; // check value exists in current j

	            if (w[ia] !== mark) {
	              // ia is new entry in j
	              w[ia] = mark; // add i to pattern of C

	              cindex.push(ia);
	            }
	          }
	        }
	      } // check we need to process matrix values (pattern matrix)


	      if (values) {
	        // copy values from x to column jb of c
	        for (var p0 = cptr[jb], p1 = cindex.length, p = p0; p < p1; p++) {
	          // row
	          var ic = cindex[p]; // copy value

	          cvalues[p] = x[ic];
	        }
	      }
	    } // update ptr


	    cptr[bcolumns] = cindex.length; // return sparse matrix

	    return c;
	  }

	  multiply.toTex = {
	    2: "\\left(${args[0]}".concat(latex.operators['multiply'], "${args[1]}\\right)")
	  };
	  return multiply;
	}

	exports.name = 'multiply';
	exports.factory = factory;

/***/ }),
/* 48 */
/***/ (function(module, exports) {

	'use strict';

	function factory(type, config, load, typed) {
	  /**
	   * Multiply two scalar values, `x * y`.
	   * This function is meant for internal use: it is used by the public function
	   * `multiply`
	   *
	   * This function does not support collections (Array or Matrix), and does
	   * not validate the number of of inputs.
	   *
	   * @param  {number | BigNumber | Fraction | Complex | Unit} x   First value to multiply
	   * @param  {number | BigNumber | Fraction | Complex} y          Second value to multiply
	   * @return {number | BigNumber | Fraction | Complex | Unit}                      Multiplication of `x` and `y`
	   * @private
	   */
	  var multiplyScalar = typed('multiplyScalar', {
	    'number, number': function numberNumber(x, y) {
	      return x * y;
	    },
	    'Complex, Complex': function ComplexComplex(x, y) {
	      return x.mul(y);
	    },
	    'BigNumber, BigNumber': function BigNumberBigNumber(x, y) {
	      return x.times(y);
	    },
	    'Fraction, Fraction': function FractionFraction(x, y) {
	      return x.mul(y);
	    },
	    'number | Fraction | BigNumber | Complex, Unit': function numberFractionBigNumberComplexUnit(x, y) {
	      var res = y.clone();
	      res.value = res.value === null ? res._normalize(x) : multiplyScalar(res.value, x);
	      return res;
	    },
	    'Unit, number | Fraction | BigNumber | Complex': function UnitNumberFractionBigNumberComplex(x, y) {
	      var res = x.clone();
	      res.value = res.value === null ? res._normalize(y) : multiplyScalar(res.value, y);
	      return res;
	    },
	    'Unit, Unit': function UnitUnit(x, y) {
	      return x.multiply(y);
	    }
	  });
	  return multiplyScalar;
	}

	exports.factory = factory;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function factory(type, config, load, typed) {
	  var equalScalar = load(__webpack_require__(40));
	  var SparseMatrix = type.SparseMatrix;
	  /**
	   * Iterates over SparseMatrix S nonzero items and invokes the callback function f(Sij, b).
	   * Callback function invoked NZ times (number of nonzero items in S).
	   *
	   *
	   *          ┌  f(Sij, b)  ; S(i,j) !== 0
	   * C(i,j) = ┤
	   *          └  0          ; otherwise
	   *
	   *
	   * @param {Matrix}   s                 The SparseMatrix instance (S)
	   * @param {Scalar}   b                 The Scalar value
	   * @param {Function} callback          The f(Aij,b) operation to invoke
	   * @param {boolean}  inverse           A true value indicates callback should be invoked f(b,Sij)
	   *
	   * @return {Matrix}                    SparseMatrix (C)
	   *
	   * https://github.com/josdejong/mathjs/pull/346#issuecomment-97626813
	   */

	  var algorithm11 = function algorithm11(s, b, callback, inverse) {
	    // sparse matrix arrays
	    var avalues = s._values;
	    var aindex = s._index;
	    var aptr = s._ptr;
	    var asize = s._size;
	    var adt = s._datatype; // sparse matrix cannot be a Pattern matrix

	    if (!avalues) {
	      throw new Error('Cannot perform operation on Pattern Sparse Matrix and Scalar value');
	    } // rows & columns


	    var rows = asize[0];
	    var columns = asize[1]; // datatype

	    var dt; // equal signature to use

	    var eq = equalScalar; // zero value

	    var zero = 0; // callback signature to use

	    var cf = callback; // process data types

	    if (typeof adt === 'string') {
	      // datatype
	      dt = adt; // find signature that matches (dt, dt)

	      eq = typed.find(equalScalar, [dt, dt]); // convert 0 to the same datatype

	      zero = typed.convert(0, dt); // convert b to the same datatype

	      b = typed.convert(b, dt); // callback

	      cf = typed.find(callback, [dt, dt]);
	    } // result arrays


	    var cvalues = [];
	    var cindex = [];
	    var cptr = []; // matrix

	    var c = new SparseMatrix({
	      values: cvalues,
	      index: cindex,
	      ptr: cptr,
	      size: [rows, columns],
	      datatype: dt
	    }); // loop columns

	    for (var j = 0; j < columns; j++) {
	      // initialize ptr
	      cptr[j] = cindex.length; // values in j

	      for (var k0 = aptr[j], k1 = aptr[j + 1], k = k0; k < k1; k++) {
	        // row
	        var i = aindex[k]; // invoke callback

	        var v = inverse ? cf(b, avalues[k]) : cf(avalues[k], b); // check value is zero

	        if (!eq(v, zero)) {
	          // push index & value
	          cindex.push(i);
	          cvalues.push(v);
	        }
	      }
	    } // update ptr


	    cptr[columns] = cindex.length; // return sparse matrix

	    return c;
	  };

	  return algorithm11;
	}

	exports.name = 'algorithm11';
	exports.factory = factory;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var deepMap = __webpack_require__(28);

	function factory(type, config, load, typed) {
	  /**
	   * Create a fraction convert a value to a fraction.
	   *
	   * Syntax:
	   *     math.fraction(numerator, denominator)
	   *     math.fraction({n: numerator, d: denominator})
	   *     math.fraction(matrix: Array | Matrix)         Turn all matrix entries
	   *                                                   into fractions
	   *
	   * Examples:
	   *
	   *     math.fraction(1, 3)
	   *     math.fraction('2/3')
	   *     math.fraction({n: 2, d: 3})
	   *     math.fraction([0.2, 0.25, 1.25])
	   *
	   * See also:
	   *
	   *    bignumber, number, string, unit
	   *
	   * @param {number | string | Fraction | BigNumber | Array | Matrix} [args]
	   *            Arguments specifying the numerator and denominator of
	   *            the fraction
	   * @return {Fraction | Array | Matrix} Returns a fraction
	   */
	  var fraction = typed('fraction', {
	    'number': function number(x) {
	      if (!isFinite(x) || isNaN(x)) {
	        throw new Error(x + ' cannot be represented as a fraction');
	      }

	      return new type.Fraction(x);
	    },
	    'string': function string(x) {
	      return new type.Fraction(x);
	    },
	    'number, number': function numberNumber(numerator, denominator) {
	      return new type.Fraction(numerator, denominator);
	    },
	    'null': function _null(x) {
	      return new type.Fraction(0);
	    },
	    'BigNumber': function BigNumber(x) {
	      return new type.Fraction(x.toString());
	    },
	    'Fraction': function Fraction(x) {
	      return x; // fractions are immutable
	    },
	    'Object': function Object(x) {
	      return new type.Fraction(x);
	    },
	    'Array | Matrix': function ArrayMatrix(x) {
	      return deepMap(x, fraction);
	    }
	  });
	  return fraction;
	}

	exports.name = 'fraction';
	exports.factory = factory;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var deepMap = __webpack_require__(28);

	function factory(type, config, load, typed) {
	  /**
	   * Create a number or convert a string, boolean, or unit to a number.
	   * When value is a matrix, all elements will be converted to number.
	   *
	   * Syntax:
	   *
	   *    math.number(value)
	   *    math.number(unit, valuelessUnit)
	   *
	   * Examples:
	   *
	   *    math.number(2)                         // returns number 2
	   *    math.number('7.2')                     // returns number 7.2
	   *    math.number(true)                      // returns number 1
	   *    math.number([true, false, true, true]) // returns [1, 0, 1, 1]
	   *    math.number(math.unit('52cm'), 'm')    // returns 0.52
	   *
	   * See also:
	   *
	   *    bignumber, boolean, complex, index, matrix, string, unit
	   *
	   * @param {string | number | BigNumber | Fraction | boolean | Array | Matrix | Unit | null} [value]  Value to be converted
	   * @param {Unit | string} [valuelessUnit] A valueless unit, used to convert a unit to a number
	   * @return {number | Array | Matrix} The created number
	   */
	  var number = typed('number', {
	    '': function _() {
	      return 0;
	    },
	    'number': function number(x) {
	      return x;
	    },
	    'string': function string(x) {
	      if (x === 'NaN') return NaN;
	      var num = Number(x);

	      if (isNaN(num)) {
	        throw new SyntaxError('String "' + x + '" is no valid number');
	      }

	      return num;
	    },
	    'BigNumber': function BigNumber(x) {
	      return x.toNumber();
	    },
	    'Fraction': function Fraction(x) {
	      return x.valueOf();
	    },
	    'Unit': function Unit(x) {
	      throw new Error('Second argument with valueless unit expected');
	    },
	    'null': function _null(x) {
	      return 0;
	    },
	    'Unit, string | Unit': function UnitStringUnit(unit, valuelessUnit) {
	      return unit.toNumber(valuelessUnit);
	    },
	    'Array | Matrix': function ArrayMatrix(x) {
	      return deepMap(x, number);
	    }
	  });
	  number.toTex = {
	    0: "0",
	    1: "\\left(${args[0]}\\right)",
	    2: "\\left(\\left(${args[0]}\\right)${args[1]}\\right)"
	  };
	  return number;
	}

	exports.name = 'number';
	exports.factory = factory;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var deepMap = __webpack_require__(28);

	function factory(type, config, load, typed) {
	  /**
	   * Compute the complex conjugate of a complex value.
	   * If `x = a+bi`, the complex conjugate of `x` is `a - bi`.
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * Syntax:
	   *
	   *    math.conj(x)
	   *
	   * Examples:
	   *
	   *    math.conj(math.complex('2 + 3i'))  // returns Complex 2 - 3i
	   *    math.conj(math.complex('2 - 3i'))  // returns Complex 2 + 3i
	   *    math.conj(math.complex('-5.2i'))  // returns Complex 5.2i
	   *
	   * See also:
	   *
	   *    re, im, arg, abs
	   *
	   * @param {number | BigNumber | Complex | Array | Matrix} x
	   *            A complex number or array with complex numbers
	   * @return {number | BigNumber | Complex | Array | Matrix}
	   *            The complex conjugate of x
	   */
	  var conj = typed('conj', {
	    'number': function number(x) {
	      return x;
	    },
	    'BigNumber': function BigNumber(x) {
	      return x;
	    },
	    'Complex': function Complex(x) {
	      return x.conjugate();
	    },
	    'Array | Matrix': function ArrayMatrix(x) {
	      return deepMap(x, conj);
	    }
	  });
	  conj.toTex = {
	    1: "\\left(${args[0]}\\right)^*"
	  };
	  return conj;
	}

	exports.name = 'conj';
	exports.factory = factory;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var nearlyEqual = __webpack_require__(8).nearlyEqual;

	var bigNearlyEqual = __webpack_require__(41);

	function factory(type, config, load, typed) {
	  var matrix = load(__webpack_require__(34));
	  var algorithm03 = load(__webpack_require__(54));
	  var algorithm07 = load(__webpack_require__(55));
	  var algorithm12 = load(__webpack_require__(56));
	  var algorithm13 = load(__webpack_require__(43));
	  var algorithm14 = load(__webpack_require__(44));

	  var latex = __webpack_require__(36);
	  /**
	   * Test whether value x is larger than y.
	   *
	   * The function returns true when x is larger than y and the relative
	   * difference between x and y is larger than the configured epsilon. The
	   * function cannot be used to compare values smaller than approximately 2.22e-16.
	   *
	   * For matrices, the function is evaluated element wise.
	   * Strings are compared by their numerical value.
	   *
	   * Syntax:
	   *
	   *    math.larger(x, y)
	   *
	   * Examples:
	   *
	   *    math.larger(2, 3)             // returns false
	   *    math.larger(5, 2 + 2)         // returns true
	   *
	   *    const a = math.unit('5 cm')
	   *    const b = math.unit('2 inch')
	   *    math.larger(a, b)             // returns false
	   *
	   * See also:
	   *
	   *    equal, unequal, smaller, smallerEq, largerEq, compare
	   *
	   * @param  {number | BigNumber | Fraction | boolean | Unit | string | Array | Matrix} x First value to compare
	   * @param  {number | BigNumber | Fraction | boolean | Unit | string | Array | Matrix} y Second value to compare
	   * @return {boolean | Array | Matrix} Returns true when the x is larger than y, else returns false
	   */


	  var larger = typed('larger', {
	    'boolean, boolean': function booleanBoolean(x, y) {
	      return x > y;
	    },
	    'number, number': function numberNumber(x, y) {
	      return x > y && !nearlyEqual(x, y, config.epsilon);
	    },
	    'BigNumber, BigNumber': function BigNumberBigNumber(x, y) {
	      return x.gt(y) && !bigNearlyEqual(x, y, config.epsilon);
	    },
	    'Fraction, Fraction': function FractionFraction(x, y) {
	      return x.compare(y) === 1;
	    },
	    'Complex, Complex': function ComplexComplex() {
	      throw new TypeError('No ordering relation is defined for complex numbers');
	    },
	    'Unit, Unit': function UnitUnit(x, y) {
	      if (!x.equalBase(y)) {
	        throw new Error('Cannot compare units with different base');
	      }

	      return larger(x.value, y.value);
	    },
	    'SparseMatrix, SparseMatrix': function SparseMatrixSparseMatrix(x, y) {
	      return algorithm07(x, y, larger);
	    },
	    'SparseMatrix, DenseMatrix': function SparseMatrixDenseMatrix(x, y) {
	      return algorithm03(y, x, larger, true);
	    },
	    'DenseMatrix, SparseMatrix': function DenseMatrixSparseMatrix(x, y) {
	      return algorithm03(x, y, larger, false);
	    },
	    'DenseMatrix, DenseMatrix': function DenseMatrixDenseMatrix(x, y) {
	      return algorithm13(x, y, larger);
	    },
	    'Array, Array': function ArrayArray(x, y) {
	      // use matrix implementation
	      return larger(matrix(x), matrix(y)).valueOf();
	    },
	    'Array, Matrix': function ArrayMatrix(x, y) {
	      // use matrix implementation
	      return larger(matrix(x), y);
	    },
	    'Matrix, Array': function MatrixArray(x, y) {
	      // use matrix implementation
	      return larger(x, matrix(y));
	    },
	    'SparseMatrix, any': function SparseMatrixAny(x, y) {
	      return algorithm12(x, y, larger, false);
	    },
	    'DenseMatrix, any': function DenseMatrixAny(x, y) {
	      return algorithm14(x, y, larger, false);
	    },
	    'any, SparseMatrix': function anySparseMatrix(x, y) {
	      return algorithm12(y, x, larger, true);
	    },
	    'any, DenseMatrix': function anyDenseMatrix(x, y) {
	      return algorithm14(y, x, larger, true);
	    },
	    'Array, any': function ArrayAny(x, y) {
	      // use matrix implementation
	      return algorithm14(matrix(x), y, larger, false).valueOf();
	    },
	    'any, Array': function anyArray(x, y) {
	      // use matrix implementation
	      return algorithm14(matrix(y), x, larger, true).valueOf();
	    }
	  });
	  larger.toTex = {
	    2: "\\left(${args[0]}".concat(latex.operators['larger'], "${args[1]}\\right)")
	  };
	  return larger;
	}

	exports.name = 'larger';
	exports.factory = factory;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var DimensionError = __webpack_require__(20);

	function factory(type, config, load, typed) {
	  var DenseMatrix = type.DenseMatrix;
	  /**
	   * Iterates over SparseMatrix items and invokes the callback function f(Dij, Sij).
	   * Callback function invoked M*N times.
	   *
	   *
	   *          ┌  f(Dij, Sij)  ; S(i,j) !== 0
	   * C(i,j) = ┤
	   *          └  f(Dij, 0)    ; otherwise
	   *
	   *
	   * @param {Matrix}   denseMatrix       The DenseMatrix instance (D)
	   * @param {Matrix}   sparseMatrix      The SparseMatrix instance (C)
	   * @param {Function} callback          The f(Dij,Sij) operation to invoke, where Dij = DenseMatrix(i,j) and Sij = SparseMatrix(i,j)
	   * @param {boolean}  inverse           A true value indicates callback should be invoked f(Sij,Dij)
	   *
	   * @return {Matrix}                    DenseMatrix (C)
	   *
	   * see https://github.com/josdejong/mathjs/pull/346#issuecomment-97477571
	   */

	  var algorithm03 = function algorithm03(denseMatrix, sparseMatrix, callback, inverse) {
	    // dense matrix arrays
	    var adata = denseMatrix._data;
	    var asize = denseMatrix._size;
	    var adt = denseMatrix._datatype; // sparse matrix arrays

	    var bvalues = sparseMatrix._values;
	    var bindex = sparseMatrix._index;
	    var bptr = sparseMatrix._ptr;
	    var bsize = sparseMatrix._size;
	    var bdt = sparseMatrix._datatype; // validate dimensions

	    if (asize.length !== bsize.length) {
	      throw new DimensionError(asize.length, bsize.length);
	    } // check rows & columns


	    if (asize[0] !== bsize[0] || asize[1] !== bsize[1]) {
	      throw new RangeError('Dimension mismatch. Matrix A (' + asize + ') must match Matrix B (' + bsize + ')');
	    } // sparse matrix cannot be a Pattern matrix


	    if (!bvalues) {
	      throw new Error('Cannot perform operation on Dense Matrix and Pattern Sparse Matrix');
	    } // rows & columns


	    var rows = asize[0];
	    var columns = asize[1]; // datatype

	    var dt; // zero value

	    var zero = 0; // callback signature to use

	    var cf = callback; // process data types

	    if (typeof adt === 'string' && adt === bdt) {
	      // datatype
	      dt = adt; // convert 0 to the same datatype

	      zero = typed.convert(0, dt); // callback

	      cf = typed.find(callback, [dt, dt]);
	    } // result (DenseMatrix)


	    var cdata = []; // initialize dense matrix

	    for (var z = 0; z < rows; z++) {
	      // initialize row
	      cdata[z] = [];
	    } // workspace


	    var x = []; // marks indicating we have a value in x for a given column

	    var w = []; // loop columns in b

	    for (var j = 0; j < columns; j++) {
	      // column mark
	      var mark = j + 1; // values in column j

	      for (var k0 = bptr[j], k1 = bptr[j + 1], k = k0; k < k1; k++) {
	        // row
	        var i = bindex[k]; // update workspace

	        x[i] = inverse ? cf(bvalues[k], adata[i][j]) : cf(adata[i][j], bvalues[k]);
	        w[i] = mark;
	      } // process workspace


	      for (var y = 0; y < rows; y++) {
	        // check we have a calculated value for current row
	        if (w[y] === mark) {
	          // use calculated value
	          cdata[y][j] = x[y];
	        } else {
	          // calculate value
	          cdata[y][j] = inverse ? cf(zero, adata[y][j]) : cf(adata[y][j], zero);
	        }
	      }
	    } // return dense matrix


	    return new DenseMatrix({
	      data: cdata,
	      size: [rows, columns],
	      datatype: dt
	    });
	  };

	  return algorithm03;
	}

	exports.name = 'algorithm03';
	exports.factory = factory;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var DimensionError = __webpack_require__(20);

	function factory(type, config, load, typed) {
	  var DenseMatrix = type.DenseMatrix;
	  /**
	   * Iterates over SparseMatrix A and SparseMatrix B items (zero and nonzero) and invokes the callback function f(Aij, Bij).
	   * Callback function invoked MxN times.
	   *
	   * C(i,j) = f(Aij, Bij)
	   *
	   * @param {Matrix}   a                 The SparseMatrix instance (A)
	   * @param {Matrix}   b                 The SparseMatrix instance (B)
	   * @param {Function} callback          The f(Aij,Bij) operation to invoke
	   *
	   * @return {Matrix}                    DenseMatrix (C)
	   *
	   * see https://github.com/josdejong/mathjs/pull/346#issuecomment-97620294
	   */

	  var algorithm07 = function algorithm07(a, b, callback) {
	    // sparse matrix arrays
	    var asize = a._size;
	    var adt = a._datatype; // sparse matrix arrays

	    var bsize = b._size;
	    var bdt = b._datatype; // validate dimensions

	    if (asize.length !== bsize.length) {
	      throw new DimensionError(asize.length, bsize.length);
	    } // check rows & columns


	    if (asize[0] !== bsize[0] || asize[1] !== bsize[1]) {
	      throw new RangeError('Dimension mismatch. Matrix A (' + asize + ') must match Matrix B (' + bsize + ')');
	    } // rows & columns


	    var rows = asize[0];
	    var columns = asize[1]; // datatype

	    var dt; // zero value

	    var zero = 0; // callback signature to use

	    var cf = callback; // process data types

	    if (typeof adt === 'string' && adt === bdt) {
	      // datatype
	      dt = adt; // convert 0 to the same datatype

	      zero = typed.convert(0, dt); // callback

	      cf = typed.find(callback, [dt, dt]);
	    } // vars


	    var i, j; // result arrays

	    var cdata = []; // initialize c

	    for (i = 0; i < rows; i++) {
	      cdata[i] = [];
	    } // matrix


	    var c = new DenseMatrix({
	      data: cdata,
	      size: [rows, columns],
	      datatype: dt
	    }); // workspaces

	    var xa = [];
	    var xb = []; // marks indicating we have a value in x for a given column

	    var wa = [];
	    var wb = []; // loop columns

	    for (j = 0; j < columns; j++) {
	      // columns mark
	      var mark = j + 1; // scatter the values of A(:,j) into workspace

	      _scatter(a, j, wa, xa, mark); // scatter the values of B(:,j) into workspace


	      _scatter(b, j, wb, xb, mark); // loop rows


	      for (i = 0; i < rows; i++) {
	        // matrix values @ i,j
	        var va = wa[i] === mark ? xa[i] : zero;
	        var vb = wb[i] === mark ? xb[i] : zero; // invoke callback

	        cdata[i][j] = cf(va, vb);
	      }
	    } // return sparse matrix


	    return c;
	  };

	  function _scatter(m, j, w, x, mark) {
	    // a arrays
	    var values = m._values;
	    var index = m._index;
	    var ptr = m._ptr; // loop values in column j

	    for (var k = ptr[j], k1 = ptr[j + 1]; k < k1; k++) {
	      // row
	      var i = index[k]; // update workspace

	      w[i] = mark;
	      x[i] = values[k];
	    }
	  }

	  return algorithm07;
	}

	exports.name = 'algorithm07';
	exports.factory = factory;

/***/ }),
/* 56 */
/***/ (function(module, exports) {

	'use strict';

	function factory(type, config, load, typed) {
	  var DenseMatrix = type.DenseMatrix;
	  /**
	   * Iterates over SparseMatrix S nonzero items and invokes the callback function f(Sij, b).
	   * Callback function invoked MxN times.
	   *
	   *
	   *          ┌  f(Sij, b)  ; S(i,j) !== 0
	   * C(i,j) = ┤
	   *          └  f(0, b)    ; otherwise
	   *
	   *
	   * @param {Matrix}   s                 The SparseMatrix instance (S)
	   * @param {Scalar}   b                 The Scalar value
	   * @param {Function} callback          The f(Aij,b) operation to invoke
	   * @param {boolean}  inverse           A true value indicates callback should be invoked f(b,Sij)
	   *
	   * @return {Matrix}                    DenseMatrix (C)
	   *
	   * https://github.com/josdejong/mathjs/pull/346#issuecomment-97626813
	   */

	  var algorithm12 = function algorithm12(s, b, callback, inverse) {
	    // sparse matrix arrays
	    var avalues = s._values;
	    var aindex = s._index;
	    var aptr = s._ptr;
	    var asize = s._size;
	    var adt = s._datatype; // sparse matrix cannot be a Pattern matrix

	    if (!avalues) {
	      throw new Error('Cannot perform operation on Pattern Sparse Matrix and Scalar value');
	    } // rows & columns


	    var rows = asize[0];
	    var columns = asize[1]; // datatype

	    var dt; // callback signature to use

	    var cf = callback; // process data types

	    if (typeof adt === 'string') {
	      // datatype
	      dt = adt; // convert b to the same datatype

	      b = typed.convert(b, dt); // callback

	      cf = typed.find(callback, [dt, dt]);
	    } // result arrays


	    var cdata = []; // matrix

	    var c = new DenseMatrix({
	      data: cdata,
	      size: [rows, columns],
	      datatype: dt
	    }); // workspaces

	    var x = []; // marks indicating we have a value in x for a given column

	    var w = []; // loop columns

	    for (var j = 0; j < columns; j++) {
	      // columns mark
	      var mark = j + 1; // values in j

	      for (var k0 = aptr[j], k1 = aptr[j + 1], k = k0; k < k1; k++) {
	        // row
	        var r = aindex[k]; // update workspace

	        x[r] = avalues[k];
	        w[r] = mark;
	      } // loop rows


	      for (var i = 0; i < rows; i++) {
	        // initialize C on first column
	        if (j === 0) {
	          // create row array
	          cdata[i] = [];
	        } // check sparse matrix has a value @ i,j


	        if (w[i] === mark) {
	          // invoke callback, update C
	          cdata[i][j] = inverse ? cf(b, x[i]) : cf(x[i], b);
	        } else {
	          // dense matrix value @ i, j
	          cdata[i][j] = inverse ? cf(b, 0) : cf(0, b);
	        }
	      }
	    } // return sparse matrix


	    return c;
	  };

	  return algorithm12;
	}

	exports.name = 'algorithm12';
	exports.factory = factory;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var nearlyEqual = __webpack_require__(8).nearlyEqual;

	var bigNearlyEqual = __webpack_require__(41);

	function factory(type, config, load, typed) {
	  var matrix = load(__webpack_require__(34));
	  var algorithm03 = load(__webpack_require__(54));
	  var algorithm07 = load(__webpack_require__(55));
	  var algorithm12 = load(__webpack_require__(56));
	  var algorithm13 = load(__webpack_require__(43));
	  var algorithm14 = load(__webpack_require__(44));

	  var latex = __webpack_require__(36);
	  /**
	   * Test whether value x is smaller than y.
	   *
	   * The function returns true when x is smaller than y and the relative
	   * difference between x and y is smaller than the configured epsilon. The
	   * function cannot be used to compare values smaller than approximately 2.22e-16.
	   *
	   * For matrices, the function is evaluated element wise.
	   * Strings are compared by their numerical value.
	   *
	   * Syntax:
	   *
	   *    math.smaller(x, y)
	   *
	   * Examples:
	   *
	   *    math.smaller(2, 3)            // returns true
	   *    math.smaller(5, 2 * 2)        // returns false
	   *
	   *    const a = math.unit('5 cm')
	   *    const b = math.unit('2 inch')
	   *    math.smaller(a, b)            // returns true
	   *
	   * See also:
	   *
	   *    equal, unequal, smallerEq, smaller, smallerEq, compare
	   *
	   * @param  {number | BigNumber | Fraction | boolean | Unit | string | Array | Matrix} x First value to compare
	   * @param  {number | BigNumber | Fraction | boolean | Unit | string | Array | Matrix} y Second value to compare
	   * @return {boolean | Array | Matrix} Returns true when the x is smaller than y, else returns false
	   */


	  var smaller = typed('smaller', {
	    'boolean, boolean': function booleanBoolean(x, y) {
	      return x < y;
	    },
	    'number, number': function numberNumber(x, y) {
	      return x < y && !nearlyEqual(x, y, config.epsilon);
	    },
	    'BigNumber, BigNumber': function BigNumberBigNumber(x, y) {
	      return x.lt(y) && !bigNearlyEqual(x, y, config.epsilon);
	    },
	    'Fraction, Fraction': function FractionFraction(x, y) {
	      return x.compare(y) === -1;
	    },
	    'Complex, Complex': function ComplexComplex(x, y) {
	      throw new TypeError('No ordering relation is defined for complex numbers');
	    },
	    'Unit, Unit': function UnitUnit(x, y) {
	      if (!x.equalBase(y)) {
	        throw new Error('Cannot compare units with different base');
	      }

	      return smaller(x.value, y.value);
	    },
	    'SparseMatrix, SparseMatrix': function SparseMatrixSparseMatrix(x, y) {
	      return algorithm07(x, y, smaller);
	    },
	    'SparseMatrix, DenseMatrix': function SparseMatrixDenseMatrix(x, y) {
	      return algorithm03(y, x, smaller, true);
	    },
	    'DenseMatrix, SparseMatrix': function DenseMatrixSparseMatrix(x, y) {
	      return algorithm03(x, y, smaller, false);
	    },
	    'DenseMatrix, DenseMatrix': function DenseMatrixDenseMatrix(x, y) {
	      return algorithm13(x, y, smaller);
	    },
	    'Array, Array': function ArrayArray(x, y) {
	      // use matrix implementation
	      return smaller(matrix(x), matrix(y)).valueOf();
	    },
	    'Array, Matrix': function ArrayMatrix(x, y) {
	      // use matrix implementation
	      return smaller(matrix(x), y);
	    },
	    'Matrix, Array': function MatrixArray(x, y) {
	      // use matrix implementation
	      return smaller(x, matrix(y));
	    },
	    'SparseMatrix, any': function SparseMatrixAny(x, y) {
	      return algorithm12(x, y, smaller, false);
	    },
	    'DenseMatrix, any': function DenseMatrixAny(x, y) {
	      return algorithm14(x, y, smaller, false);
	    },
	    'any, SparseMatrix': function anySparseMatrix(x, y) {
	      return algorithm12(y, x, smaller, true);
	    },
	    'any, DenseMatrix': function anyDenseMatrix(x, y) {
	      return algorithm14(y, x, smaller, true);
	    },
	    'Array, any': function ArrayAny(x, y) {
	      // use matrix implementation
	      return algorithm14(matrix(x), y, smaller, false).valueOf();
	    },
	    'any, Array': function anyArray(x, y) {
	      // use matrix implementation
	      return algorithm14(matrix(y), x, smaller, true).valueOf();
	    }
	  });
	  smaller.toTex = {
	    2: "\\left(${args[0]}".concat(latex.operators['smaller'], "${args[1]}\\right)")
	  };
	  return smaller;
	}

	exports.name = 'smaller';
	exports.factory = factory;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var extend = __webpack_require__(4).extend;

	function factory(type, config, load, typed) {
	  var divideScalar = load(__webpack_require__(59));
	  var multiply = load(__webpack_require__(47));
	  var inv = load(__webpack_require__(62));
	  var matrix = load(__webpack_require__(34));
	  var algorithm11 = load(__webpack_require__(49));
	  var algorithm14 = load(__webpack_require__(44));
	  /**
	   * Divide two values, `x / y`.
	   * To divide matrices, `x` is multiplied with the inverse of `y`: `x * inv(y)`.
	   *
	   * Syntax:
	   *
	   *    math.divide(x, y)
	   *
	   * Examples:
	   *
	   *    math.divide(2, 3)            // returns number 0.6666666666666666
	   *
	   *    const a = math.complex(5, 14)
	   *    const b = math.complex(4, 1)
	   *    math.divide(a, b)            // returns Complex 2 + 3i
	   *
	   *    const c = [[7, -6], [13, -4]]
	   *    const d = [[1, 2], [4, 3]]
	   *    math.divide(c, d)            // returns Array [[-9, 4], [-11, 6]]
	   *
	   *    const e = math.unit('18 km')
	   *    math.divide(e, 4.5)          // returns Unit 4 km
	   *
	   * See also:
	   *
	   *    multiply
	   *
	   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} x   Numerator
	   * @param  {number | BigNumber | Fraction | Complex | Array | Matrix} y          Denominator
	   * @return {number | BigNumber | Fraction | Complex | Unit | Array | Matrix}                      Quotient, `x / y`
	   */

	  var divide = typed('divide', extend({
	    // we extend the signatures of divideScalar with signatures dealing with matrices
	    'Array | Matrix, Array | Matrix': function ArrayMatrixArrayMatrix(x, y) {
	      // TODO: implement matrix right division using pseudo inverse
	      // https://www.mathworks.nl/help/matlab/ref/mrdivide.html
	      // https://www.gnu.org/software/octave/doc/interpreter/Arithmetic-Ops.html
	      // https://stackoverflow.com/questions/12263932/how-does-gnu-octave-matrix-division-work-getting-unexpected-behaviour
	      return multiply(x, inv(y));
	    },
	    'DenseMatrix, any': function DenseMatrixAny(x, y) {
	      return algorithm14(x, y, divideScalar, false);
	    },
	    'SparseMatrix, any': function SparseMatrixAny(x, y) {
	      return algorithm11(x, y, divideScalar, false);
	    },
	    'Array, any': function ArrayAny(x, y) {
	      // use matrix implementation
	      return algorithm14(matrix(x), y, divideScalar, false).valueOf();
	    },
	    'any, Array | Matrix': function anyArrayMatrix(x, y) {
	      return multiply(x, inv(y));
	    }
	  }, divideScalar.signatures));
	  divide.toTex = {
	    2: "\\frac{${args[0]}}{${args[1]}}"
	  };
	  return divide;
	}

	exports.name = 'divide';
	exports.factory = factory;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function factory(type, config, load, typed) {
	  var numeric = load(__webpack_require__(60));
	  var getTypeOf = load(__webpack_require__(26));
	  /**
	   * Divide two scalar values, `x / y`.
	   * This function is meant for internal use: it is used by the public functions
	   * `divide` and `inv`.
	   *
	   * This function does not support collections (Array or Matrix), and does
	   * not validate the number of of inputs.
	   *
	   * @param  {number | BigNumber | Fraction | Complex | Unit} x   Numerator
	   * @param  {number | BigNumber | Fraction | Complex} y          Denominator
	   * @return {number | BigNumber | Fraction | Complex | Unit}                      Quotient, `x / y`
	   * @private
	   */

	  var divideScalar = typed('divide', {
	    'number, number': function numberNumber(x, y) {
	      return x / y;
	    },
	    'Complex, Complex': function ComplexComplex(x, y) {
	      return x.div(y);
	    },
	    'BigNumber, BigNumber': function BigNumberBigNumber(x, y) {
	      return x.div(y);
	    },
	    'Fraction, Fraction': function FractionFraction(x, y) {
	      return x.div(y);
	    },
	    'Unit, number | Fraction | BigNumber': function UnitNumberFractionBigNumber(x, y) {
	      var res = x.clone(); // TODO: move the divide function to Unit.js, it uses internals of Unit

	      var one = numeric(1, getTypeOf(y));
	      res.value = divideScalar(res.value === null ? res._normalize(one) : res.value, y);
	      return res;
	    },
	    'number | Fraction | BigNumber, Unit': function numberFractionBigNumberUnit(x, y) {
	      var res = y.clone();
	      res = res.pow(-1); // TODO: move the divide function to Unit.js, it uses internals of Unit

	      var one = numeric(1, getTypeOf(x));
	      res.value = divideScalar(x, y.value === null ? y._normalize(one) : y.value);
	      return res;
	    },
	    'Unit, Unit': function UnitUnit(x, y) {
	      return x.divide(y);
	    }
	  });
	  return divideScalar;
	}

	exports.factory = factory;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function factory(type, config, load, typed) {
	  var getTypeOf = load(__webpack_require__(26));
	  var validInputTypes = {
	    'string': true,
	    'number': true,
	    'BigNumber': true,
	    'Fraction': true // Load the conversion functions for each output type

	  };
	  var validOutputTypes = {
	    'number': load(__webpack_require__(51)),
	    'BigNumber': load(__webpack_require__(61)),
	    'Fraction': load(__webpack_require__(50))
	    /**
	     * Convert a numeric value to a specific type: number, BigNumber, or Fraction
	     *
	     * @param {string | number | BigNumber | Fraction } value
	     * @param {'number' | 'BigNumber' | 'Fraction'} outputType
	     * @return {number | BigNumber | Fraction} Returns an instance of the
	     *                                         numeric in the requested type
	     */

	  };

	  var numeric = function numeric(value, outputType) {
	    var inputType = getTypeOf(value);

	    if (!(inputType in validInputTypes)) {
	      throw new TypeError('Cannot convert ' + value + ' of type "' + inputType + '"; valid input types are ' + Object.keys(validInputTypes).join(', '));
	    }

	    if (!(outputType in validOutputTypes)) {
	      throw new TypeError('Cannot convert ' + value + ' to type "' + outputType + '"; valid output types are ' + Object.keys(validOutputTypes).join(', '));
	    }

	    if (outputType === inputType) {
	      return value;
	    } else {
	      return validOutputTypes[outputType](value);
	    }
	  };

	  numeric.toTex = function (node, options) {
	    // Not sure if this is strictly right but should work correctly for the vast majority of use cases.
	    return node.args[0].toTex();
	  };

	  return numeric;
	} // FIXME: expose numeric in the math namespace after we've decided on a name and have written proper docs for this function. See https://github.com/josdejong/mathjs/pull/1270
	// exports.name = 'type._numeric'


	exports.path = 'type';
	exports.name = '_numeric';
	exports.factory = factory;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var deepMap = __webpack_require__(28);

	function factory(type, config, load, typed) {
	  /**
	   * Create a BigNumber, which can store numbers with arbitrary precision.
	   * When a matrix is provided, all elements will be converted to BigNumber.
	   *
	   * Syntax:
	   *
	   *    math.bignumber(x)
	   *
	   * Examples:
	   *
	   *    0.1 + 0.2                                  // returns number 0.30000000000000004
	   *    math.bignumber(0.1) + math.bignumber(0.2)  // returns BigNumber 0.3
	   *
	   *
	   *    7.2e500                                    // returns number Infinity
	   *    math.bignumber('7.2e500')                  // returns BigNumber 7.2e500
	   *
	   * See also:
	   *
	   *    boolean, complex, index, matrix, string, unit
	   *
	   * @param {number | string | Fraction | BigNumber | Array | Matrix | boolean | null} [value]  Value for the big number,
	   *                                                    0 by default.
	   * @returns {BigNumber} The created bignumber
	   */
	  var bignumber = typed('bignumber', {
	    '': function _() {
	      return new type.BigNumber(0);
	    },
	    'number': function number(x) {
	      // convert to string to prevent errors in case of >15 digits
	      return new type.BigNumber(x + '');
	    },
	    'string': function string(x) {
	      return new type.BigNumber(x);
	    },
	    'BigNumber': function BigNumber(x) {
	      // we assume a BigNumber is immutable
	      return x;
	    },
	    'Fraction': function Fraction(x) {
	      return new type.BigNumber(x.n).div(x.d).times(x.s);
	    },
	    'null': function _null(x) {
	      return new type.BigNumber(0);
	    },
	    'Array | Matrix': function ArrayMatrix(x) {
	      return deepMap(x, bignumber);
	    }
	  });
	  bignumber.toTex = {
	    0: '0',
	    1: "\\left(${args[0]}\\right)"
	  };
	  return bignumber;
	}

	exports.name = 'bignumber';
	exports.factory = factory;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(16);

	function factory(type, config, load, typed) {
	  var matrix = load(__webpack_require__(34));
	  var divideScalar = load(__webpack_require__(59));
	  var addScalar = load(__webpack_require__(35));
	  var multiply = load(__webpack_require__(47));
	  var unaryMinus = load(__webpack_require__(63));
	  var det = load(__webpack_require__(64));
	  var identity = load(__webpack_require__(46));
	  var abs = load(__webpack_require__(32));
	  /**
	   * Calculate the inverse of a square matrix.
	   *
	   * Syntax:
	   *
	   *     math.inv(x)
	   *
	   * Examples:
	   *
	   *     math.inv([[1, 2], [3, 4]])  // returns [[-2, 1], [1.5, -0.5]]
	   *     math.inv(4)                 // returns 0.25
	   *     1 / 4                       // returns 0.25
	   *
	   * See also:
	   *
	   *     det, transpose
	   *
	   * @param {number | Complex | Array | Matrix} x     Matrix to be inversed
	   * @return {number | Complex | Array | Matrix} The inverse of `x`.
	   */

	  var inv = typed('inv', {
	    'Array | Matrix': function ArrayMatrix(x) {
	      var size = type.isMatrix(x) ? x.size() : util.array.size(x);

	      switch (size.length) {
	        case 1:
	          // vector
	          if (size[0] === 1) {
	            if (type.isMatrix(x)) {
	              return matrix([divideScalar(1, x.valueOf()[0])]);
	            } else {
	              return [divideScalar(1, x[0])];
	            }
	          } else {
	            throw new RangeError('Matrix must be square ' + '(size: ' + util.string.format(size) + ')');
	          }

	        case 2:
	          // two dimensional array
	          var rows = size[0];
	          var cols = size[1];

	          if (rows === cols) {
	            if (type.isMatrix(x)) {
	              return matrix(_inv(x.valueOf(), rows, cols), x.storage());
	            } else {
	              // return an Array
	              return _inv(x, rows, cols);
	            }
	          } else {
	            throw new RangeError('Matrix must be square ' + '(size: ' + util.string.format(size) + ')');
	          }

	        default:
	          // multi dimensional array
	          throw new RangeError('Matrix must be two dimensional ' + '(size: ' + util.string.format(size) + ')');
	      }
	    },
	    'any': function any(x) {
	      // scalar
	      return divideScalar(1, x); // FIXME: create a BigNumber one when configured for bignumbers
	    }
	  });
	  /**
	   * Calculate the inverse of a square matrix
	   * @param {Array[]} mat     A square matrix
	   * @param {number} rows     Number of rows
	   * @param {number} cols     Number of columns, must equal rows
	   * @return {Array[]} inv    Inverse matrix
	   * @private
	   */

	  function _inv(mat, rows, cols) {
	    var r, s, f, value, temp;

	    if (rows === 1) {
	      // this is a 1 x 1 matrix
	      value = mat[0][0];

	      if (value === 0) {
	        throw Error('Cannot calculate inverse, determinant is zero');
	      }

	      return [[divideScalar(1, value)]];
	    } else if (rows === 2) {
	      // this is a 2 x 2 matrix
	      var d = det(mat);

	      if (d === 0) {
	        throw Error('Cannot calculate inverse, determinant is zero');
	      }

	      return [[divideScalar(mat[1][1], d), divideScalar(unaryMinus(mat[0][1]), d)], [divideScalar(unaryMinus(mat[1][0]), d), divideScalar(mat[0][0], d)]];
	    } else {
	      // this is a matrix of 3 x 3 or larger
	      // calculate inverse using gauss-jordan elimination
	      //      https://en.wikipedia.org/wiki/Gaussian_elimination
	      //      http://mathworld.wolfram.com/MatrixInverse.html
	      //      http://math.uww.edu/~mcfarlat/inverse.htm
	      // make a copy of the matrix (only the arrays, not of the elements)
	      var A = mat.concat();

	      for (r = 0; r < rows; r++) {
	        A[r] = A[r].concat();
	      } // create an identity matrix which in the end will contain the
	      // matrix inverse


	      var B = identity(rows).valueOf(); // loop over all columns, and perform row reductions

	      for (var c = 0; c < cols; c++) {
	        // Pivoting: Swap row c with row r, where row r contains the largest element A[r][c]
	        var ABig = abs(A[c][c]);
	        var rBig = c;
	        r = c + 1;

	        while (r < rows) {
	          if (abs(A[r][c]) > ABig) {
	            ABig = abs(A[r][c]);
	            rBig = r;
	          }

	          r++;
	        }

	        if (ABig === 0) {
	          throw Error('Cannot calculate inverse, determinant is zero');
	        }

	        r = rBig;

	        if (r !== c) {
	          temp = A[c];
	          A[c] = A[r];
	          A[r] = temp;
	          temp = B[c];
	          B[c] = B[r];
	          B[r] = temp;
	        } // eliminate non-zero values on the other rows at column c


	        var Ac = A[c];
	        var Bc = B[c];

	        for (r = 0; r < rows; r++) {
	          var Ar = A[r];
	          var Br = B[r];

	          if (r !== c) {
	            // eliminate value at column c and row r
	            if (Ar[c] !== 0) {
	              f = divideScalar(unaryMinus(Ar[c]), Ac[c]); // add (f * row c) to row r to eliminate the value
	              // at column c

	              for (s = c; s < cols; s++) {
	                Ar[s] = addScalar(Ar[s], multiply(f, Ac[s]));
	              }

	              for (s = 0; s < cols; s++) {
	                Br[s] = addScalar(Br[s], multiply(f, Bc[s]));
	              }
	            }
	          } else {
	            // normalize value at Acc to 1,
	            // divide each value on row r with the value at Acc
	            f = Ac[c];

	            for (s = c; s < cols; s++) {
	              Ar[s] = divideScalar(Ar[s], f);
	            }

	            for (s = 0; s < cols; s++) {
	              Br[s] = divideScalar(Br[s], f);
	            }
	          }
	        }
	      }

	      return B;
	    }
	  }

	  inv.toTex = {
	    1: "\\left(${args[0]}\\right)^{-1}"
	  };
	  return inv;
	}

	exports.name = 'inv';
	exports.factory = factory;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var deepMap = __webpack_require__(28);

	function factory(type, config, load, typed) {
	  var latex = __webpack_require__(36);
	  /**
	   * Inverse the sign of a value, apply a unary minus operation.
	   *
	   * For matrices, the function is evaluated element wise. Boolean values and
	   * strings will be converted to a number. For complex numbers, both real and
	   * complex value are inverted.
	   *
	   * Syntax:
	   *
	   *    math.unaryMinus(x)
	   *
	   * Examples:
	   *
	   *    math.unaryMinus(3.5)      // returns -3.5
	   *    math.unaryMinus(-4.2)     // returns 4.2
	   *
	   * See also:
	   *
	   *    add, subtract, unaryPlus
	   *
	   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} x Number to be inverted.
	   * @return {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} Returns the value with inverted sign.
	   */


	  var unaryMinus = typed('unaryMinus', {
	    'number': function number(x) {
	      return -x;
	    },
	    'Complex': function Complex(x) {
	      return x.neg();
	    },
	    'BigNumber': function BigNumber(x) {
	      return x.neg();
	    },
	    'Fraction': function Fraction(x) {
	      return x.neg();
	    },
	    'Unit': function Unit(x) {
	      var res = x.clone();
	      res.value = unaryMinus(x.value);
	      return res;
	    },
	    'Array | Matrix': function ArrayMatrix(x) {
	      // deep map collection, skip zeros since unaryMinus(0) = 0
	      return deepMap(x, unaryMinus, true);
	    } // TODO: add support for string

	  });
	  unaryMinus.toTex = {
	    1: "".concat(latex.operators['unaryMinus'], "\\left(${args[0]}\\right)")
	  };
	  return unaryMinus;
	}

	exports.name = 'unaryMinus';
	exports.factory = factory;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(16);

	var object = util.object;
	var string = util.string;

	function factory(type, config, load, typed) {
	  var matrix = load(__webpack_require__(34));
	  var subtract = load(__webpack_require__(65));
	  var multiply = load(__webpack_require__(47));
	  var unaryMinus = load(__webpack_require__(63));
	  var lup = load(__webpack_require__(67));
	  /**
	   * Calculate the determinant of a matrix.
	   *
	   * Syntax:
	   *
	   *    math.det(x)
	   *
	   * Examples:
	   *
	   *    math.det([[1, 2], [3, 4]]) // returns -2
	   *
	   *    const A = [
	   *      [-2, 2, 3],
	   *      [-1, 1, 3],
	   *      [2, 0, -1]
	   *    ]
	   *    math.det(A) // returns 6
	   *
	   * See also:
	   *
	   *    inv
	   *
	   * @param {Array | Matrix} x  A matrix
	   * @return {number} The determinant of `x`
	   */

	  var det = typed('det', {
	    'any': function any(x) {
	      return object.clone(x);
	    },
	    'Array | Matrix': function det(x) {
	      var size;

	      if (type.isMatrix(x)) {
	        size = x.size();
	      } else if (Array.isArray(x)) {
	        x = matrix(x);
	        size = x.size();
	      } else {
	        // a scalar
	        size = [];
	      }

	      switch (size.length) {
	        case 0:
	          // scalar
	          return object.clone(x);

	        case 1:
	          // vector
	          if (size[0] === 1) {
	            return object.clone(x.valueOf()[0]);
	          } else {
	            throw new RangeError('Matrix must be square ' + '(size: ' + string.format(size) + ')');
	          }

	        case 2:
	          // two dimensional array
	          var rows = size[0];
	          var cols = size[1];

	          if (rows === cols) {
	            return _det(x.clone().valueOf(), rows, cols);
	          } else {
	            throw new RangeError('Matrix must be square ' + '(size: ' + string.format(size) + ')');
	          }

	        default:
	          // multi dimensional array
	          throw new RangeError('Matrix must be two dimensional ' + '(size: ' + string.format(size) + ')');
	      }
	    }
	  });
	  det.toTex = {
	    1: "\\det\\left(${args[0]}\\right)"
	  };
	  return det;
	  /**
	   * Calculate the determinant of a matrix
	   * @param {Array[]} matrix  A square, two dimensional matrix
	   * @param {number} rows     Number of rows of the matrix (zero-based)
	   * @param {number} cols     Number of columns of the matrix (zero-based)
	   * @returns {number} det
	   * @private
	   */

	  function _det(matrix, rows, cols) {
	    if (rows === 1) {
	      // this is a 1 x 1 matrix
	      return object.clone(matrix[0][0]);
	    } else if (rows === 2) {
	      // this is a 2 x 2 matrix
	      // the determinant of [a11,a12;a21,a22] is det = a11*a22-a21*a12
	      return subtract(multiply(matrix[0][0], matrix[1][1]), multiply(matrix[1][0], matrix[0][1]));
	    } else {
	      // Compute the LU decomposition
	      var decomp = lup(matrix); // The determinant is the product of the diagonal entries of U (and those of L, but they are all 1)

	      var _det2 = decomp.U[0][0];

	      for (var _i = 1; _i < rows; _i++) {
	        _det2 = multiply(_det2, decomp.U[_i][_i]);
	      } // The determinant will be multiplied by 1 or -1 depending on the parity of the permutation matrix.
	      // This can be determined by counting the cycles. This is roughly a linear time algorithm.


	      var evenCycles = 0;
	      var i = 0;
	      var visited = [];

	      while (true) {
	        while (visited[i]) {
	          i++;
	        }

	        if (i >= rows) break;
	        var j = i;
	        var cycleLen = 0;

	        while (!visited[decomp.p[j]]) {
	          visited[decomp.p[j]] = true;
	          j = decomp.p[j];
	          cycleLen++;
	        }

	        if (cycleLen % 2 === 0) {
	          evenCycles++;
	        }
	      }

	      return evenCycles % 2 === 0 ? _det2 : unaryMinus(_det2);
	    }
	  }
	}

	exports.name = 'det';
	exports.factory = factory;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var DimensionError = __webpack_require__(20);

	function factory(type, config, load, typed) {
	  var latex = __webpack_require__(36);

	  var matrix = load(__webpack_require__(34));
	  var addScalar = load(__webpack_require__(35));
	  var unaryMinus = load(__webpack_require__(63));
	  var algorithm01 = load(__webpack_require__(38));
	  var algorithm03 = load(__webpack_require__(54));
	  var algorithm05 = load(__webpack_require__(66));
	  var algorithm10 = load(__webpack_require__(42));
	  var algorithm13 = load(__webpack_require__(43));
	  var algorithm14 = load(__webpack_require__(44)); // TODO: split function subtract in two: subtract and subtractScalar

	  /**
	   * Subtract two values, `x - y`.
	   * For matrices, the function is evaluated element wise.
	   *
	   * Syntax:
	   *
	   *    math.subtract(x, y)
	   *
	   * Examples:
	   *
	   *    math.subtract(5.3, 2)        // returns number 3.3
	   *
	   *    const a = math.complex(2, 3)
	   *    const b = math.complex(4, 1)
	   *    math.subtract(a, b)          // returns Complex -2 + 2i
	   *
	   *    math.subtract([5, 7, 4], 4)  // returns Array [1, 3, 0]
	   *
	   *    const c = math.unit('2.1 km')
	   *    const d = math.unit('500m')
	   *    math.subtract(c, d)          // returns Unit 1.6 km
	   *
	   * See also:
	   *
	   *    add
	   *
	   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} x
	   *            Initial value
	   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} y
	   *            Value to subtract from `x`
	   * @return {number | BigNumber | Fraction | Complex | Unit | Array | Matrix}
	   *            Subtraction of `x` and `y`
	   */

	  var subtract = typed('subtract', {
	    'number, number': function numberNumber(x, y) {
	      return x - y;
	    },
	    'Complex, Complex': function ComplexComplex(x, y) {
	      return x.sub(y);
	    },
	    'BigNumber, BigNumber': function BigNumberBigNumber(x, y) {
	      return x.minus(y);
	    },
	    'Fraction, Fraction': function FractionFraction(x, y) {
	      return x.sub(y);
	    },
	    'Unit, Unit': function UnitUnit(x, y) {
	      if (x.value === null) {
	        throw new Error('Parameter x contains a unit with undefined value');
	      }

	      if (y.value === null) {
	        throw new Error('Parameter y contains a unit with undefined value');
	      }

	      if (!x.equalBase(y)) {
	        throw new Error('Units do not match');
	      }

	      var res = x.clone();
	      res.value = subtract(res.value, y.value);
	      res.fixPrefix = false;
	      return res;
	    },
	    'SparseMatrix, SparseMatrix': function SparseMatrixSparseMatrix(x, y) {
	      checkEqualDimensions(x, y);
	      return algorithm05(x, y, subtract);
	    },
	    'SparseMatrix, DenseMatrix': function SparseMatrixDenseMatrix(x, y) {
	      checkEqualDimensions(x, y);
	      return algorithm03(y, x, subtract, true);
	    },
	    'DenseMatrix, SparseMatrix': function DenseMatrixSparseMatrix(x, y) {
	      checkEqualDimensions(x, y);
	      return algorithm01(x, y, subtract, false);
	    },
	    'DenseMatrix, DenseMatrix': function DenseMatrixDenseMatrix(x, y) {
	      checkEqualDimensions(x, y);
	      return algorithm13(x, y, subtract);
	    },
	    'Array, Array': function ArrayArray(x, y) {
	      // use matrix implementation
	      return subtract(matrix(x), matrix(y)).valueOf();
	    },
	    'Array, Matrix': function ArrayMatrix(x, y) {
	      // use matrix implementation
	      return subtract(matrix(x), y);
	    },
	    'Matrix, Array': function MatrixArray(x, y) {
	      // use matrix implementation
	      return subtract(x, matrix(y));
	    },
	    'SparseMatrix, any': function SparseMatrixAny(x, y) {
	      return algorithm10(x, unaryMinus(y), addScalar);
	    },
	    'DenseMatrix, any': function DenseMatrixAny(x, y) {
	      return algorithm14(x, y, subtract);
	    },
	    'any, SparseMatrix': function anySparseMatrix(x, y) {
	      return algorithm10(y, x, subtract, true);
	    },
	    'any, DenseMatrix': function anyDenseMatrix(x, y) {
	      return algorithm14(y, x, subtract, true);
	    },
	    'Array, any': function ArrayAny(x, y) {
	      // use matrix implementation
	      return algorithm14(matrix(x), y, subtract, false).valueOf();
	    },
	    'any, Array': function anyArray(x, y) {
	      // use matrix implementation
	      return algorithm14(matrix(y), x, subtract, true).valueOf();
	    }
	  });
	  subtract.toTex = {
	    2: "\\left(${args[0]}".concat(latex.operators['subtract'], "${args[1]}\\right)")
	  };
	  return subtract;
	}
	/**
	 * Check whether matrix x and y have the same number of dimensions.
	 * Throws a DimensionError when dimensions are not equal
	 * @param {Matrix} x
	 * @param {Matrix} y
	 */


	function checkEqualDimensions(x, y) {
	  var xsize = x.size();
	  var ysize = y.size();

	  if (xsize.length !== ysize.length) {
	    throw new DimensionError(xsize.length, ysize.length);
	  }
	}

	exports.name = 'subtract';
	exports.factory = factory;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var DimensionError = __webpack_require__(20);

	function factory(type, config, load, typed) {
	  var equalScalar = load(__webpack_require__(40));
	  var SparseMatrix = type.SparseMatrix;
	  /**
	   * Iterates over SparseMatrix A and SparseMatrix B nonzero items and invokes the callback function f(Aij, Bij).
	   * Callback function invoked MAX(NNZA, NNZB) times
	   *
	   *
	   *          ┌  f(Aij, Bij)  ; A(i,j) !== 0 || B(i,j) !== 0
	   * C(i,j) = ┤
	   *          └  0            ; otherwise
	   *
	   *
	   * @param {Matrix}   a                 The SparseMatrix instance (A)
	   * @param {Matrix}   b                 The SparseMatrix instance (B)
	   * @param {Function} callback          The f(Aij,Bij) operation to invoke
	   *
	   * @return {Matrix}                    SparseMatrix (C)
	   *
	   * see https://github.com/josdejong/mathjs/pull/346#issuecomment-97620294
	   */

	  var algorithm05 = function algorithm05(a, b, callback) {
	    // sparse matrix arrays
	    var avalues = a._values;
	    var aindex = a._index;
	    var aptr = a._ptr;
	    var asize = a._size;
	    var adt = a._datatype; // sparse matrix arrays

	    var bvalues = b._values;
	    var bindex = b._index;
	    var bptr = b._ptr;
	    var bsize = b._size;
	    var bdt = b._datatype; // validate dimensions

	    if (asize.length !== bsize.length) {
	      throw new DimensionError(asize.length, bsize.length);
	    } // check rows & columns


	    if (asize[0] !== bsize[0] || asize[1] !== bsize[1]) {
	      throw new RangeError('Dimension mismatch. Matrix A (' + asize + ') must match Matrix B (' + bsize + ')');
	    } // rows & columns


	    var rows = asize[0];
	    var columns = asize[1]; // datatype

	    var dt; // equal signature to use

	    var eq = equalScalar; // zero value

	    var zero = 0; // callback signature to use

	    var cf = callback; // process data types

	    if (typeof adt === 'string' && adt === bdt) {
	      // datatype
	      dt = adt; // find signature that matches (dt, dt)

	      eq = typed.find(equalScalar, [dt, dt]); // convert 0 to the same datatype

	      zero = typed.convert(0, dt); // callback

	      cf = typed.find(callback, [dt, dt]);
	    } // result arrays


	    var cvalues = avalues && bvalues ? [] : undefined;
	    var cindex = [];
	    var cptr = []; // matrix

	    var c = new SparseMatrix({
	      values: cvalues,
	      index: cindex,
	      ptr: cptr,
	      size: [rows, columns],
	      datatype: dt
	    }); // workspaces

	    var xa = cvalues ? [] : undefined;
	    var xb = cvalues ? [] : undefined; // marks indicating we have a value in x for a given column

	    var wa = [];
	    var wb = []; // vars

	    var i, j, k, k1; // loop columns

	    for (j = 0; j < columns; j++) {
	      // update cptr
	      cptr[j] = cindex.length; // columns mark

	      var mark = j + 1; // loop values A(:,j)

	      for (k = aptr[j], k1 = aptr[j + 1]; k < k1; k++) {
	        // row
	        i = aindex[k]; // push index

	        cindex.push(i); // update workspace

	        wa[i] = mark; // check we need to process values

	        if (xa) {
	          xa[i] = avalues[k];
	        }
	      } // loop values B(:,j)


	      for (k = bptr[j], k1 = bptr[j + 1]; k < k1; k++) {
	        // row
	        i = bindex[k]; // check row existed in A

	        if (wa[i] !== mark) {
	          // push index
	          cindex.push(i);
	        } // update workspace


	        wb[i] = mark; // check we need to process values

	        if (xb) {
	          xb[i] = bvalues[k];
	        }
	      } // check we need to process values (non pattern matrix)


	      if (cvalues) {
	        // initialize first index in j
	        k = cptr[j]; // loop index in j

	        while (k < cindex.length) {
	          // row
	          i = cindex[k]; // marks

	          var wai = wa[i];
	          var wbi = wb[i]; // check Aij or Bij are nonzero

	          if (wai === mark || wbi === mark) {
	            // matrix values @ i,j
	            var va = wai === mark ? xa[i] : zero;
	            var vb = wbi === mark ? xb[i] : zero; // Cij

	            var vc = cf(va, vb); // check for zero

	            if (!eq(vc, zero)) {
	              // push value
	              cvalues.push(vc); // increment pointer

	              k++;
	            } else {
	              // remove value @ i, do not increment pointer
	              cindex.splice(k, 1);
	            }
	          }
	        }
	      }
	    } // update cptr


	    cptr[columns] = cindex.length; // return sparse matrix

	    return c;
	  };

	  return algorithm05;
	}

	exports.name = 'algorithm05';
	exports.factory = factory;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(16);

	var object = util.object;

	function factory(type, config, load, typed) {
	  var matrix = load(__webpack_require__(34));
	  var abs = load(__webpack_require__(32));
	  var addScalar = load(__webpack_require__(35));
	  var divideScalar = load(__webpack_require__(59));
	  var multiplyScalar = load(__webpack_require__(48));
	  var subtract = load(__webpack_require__(65));
	  var larger = load(__webpack_require__(53));
	  var equalScalar = load(__webpack_require__(40));
	  var unaryMinus = load(__webpack_require__(63));
	  var SparseMatrix = type.SparseMatrix;
	  var DenseMatrix = type.DenseMatrix;
	  var Spa = type.Spa;
	  /**
	   * Calculate the Matrix LU decomposition with partial pivoting. Matrix `A` is decomposed in two matrices (`L`, `U`) and a
	   * row permutation vector `p` where `A[p,:] = L * U`
	   *
	   * Syntax:
	   *
	   *    math.lup(A)
	   *
	   * Example:
	   *
	   *    const m = [[2, 1], [1, 4]]
	   *    const r = math.lup(m)
	   *    // r = {
	   *    //   L: [[1, 0], [0.5, 1]],
	   *    //   U: [[2, 1], [0, 3.5]],
	   *    //   P: [0, 1]
	   *    // }
	   *
	   * See also:
	   *
	   *    slu, lsolve, lusolve, usolve
	   *
	   * @param {Matrix | Array} A    A two dimensional matrix or array for which to get the LUP decomposition.
	   *
	   * @return {{L: Array | Matrix, U: Array | Matrix, P: Array.<number>}} The lower triangular matrix, the upper triangular matrix and the permutation matrix.
	   */

	  var lup = typed('lup', {
	    'DenseMatrix': function DenseMatrix(m) {
	      return _denseLUP(m);
	    },
	    'SparseMatrix': function SparseMatrix(m) {
	      return _sparseLUP(m);
	    },
	    'Array': function Array(a) {
	      // create dense matrix from array
	      var m = matrix(a); // lup, use matrix implementation

	      var r = _denseLUP(m); // result


	      return {
	        L: r.L.valueOf(),
	        U: r.U.valueOf(),
	        p: r.p
	      };
	    }
	  });

	  function _denseLUP(m) {
	    // rows & columns
	    var rows = m._size[0];
	    var columns = m._size[1]; // minimum rows and columns

	    var n = Math.min(rows, columns); // matrix array, clone original data

	    var data = object.clone(m._data); // l matrix arrays

	    var ldata = [];
	    var lsize = [rows, n]; // u matrix arrays

	    var udata = [];
	    var usize = [n, columns]; // vars

	    var i, j, k; // permutation vector

	    var p = [];

	    for (i = 0; i < rows; i++) {
	      p[i] = i;
	    } // loop columns


	    for (j = 0; j < columns; j++) {
	      // skip first column in upper triangular matrix
	      if (j > 0) {
	        // loop rows
	        for (i = 0; i < rows; i++) {
	          // min i,j
	          var min = Math.min(i, j); // v[i, j]

	          var s = 0; // loop up to min

	          for (k = 0; k < min; k++) {
	            // s = l[i, k] - data[k, j]
	            s = addScalar(s, multiplyScalar(data[i][k], data[k][j]));
	          }

	          data[i][j] = subtract(data[i][j], s);
	        }
	      } // row with larger value in cvector, row >= j


	      var pi = j;
	      var pabsv = 0;
	      var vjj = 0; // loop rows

	      for (i = j; i < rows; i++) {
	        // data @ i, j
	        var v = data[i][j]; // absolute value

	        var absv = abs(v); // value is greater than pivote value

	        if (larger(absv, pabsv)) {
	          // store row
	          pi = i; // update max value

	          pabsv = absv; // value @ [j, j]

	          vjj = v;
	        }
	      } // swap rows (j <-> pi)


	      if (j !== pi) {
	        // swap values j <-> pi in p
	        p[j] = [p[pi], p[pi] = p[j]][0]; // swap j <-> pi in data

	        DenseMatrix._swapRows(j, pi, data);
	      } // check column is in lower triangular matrix


	      if (j < rows) {
	        // loop rows (lower triangular matrix)
	        for (i = j + 1; i < rows; i++) {
	          // value @ i, j
	          var vij = data[i][j];

	          if (!equalScalar(vij, 0)) {
	            // update data
	            data[i][j] = divideScalar(data[i][j], vjj);
	          }
	        }
	      }
	    } // loop columns


	    for (j = 0; j < columns; j++) {
	      // loop rows
	      for (i = 0; i < rows; i++) {
	        // initialize row in arrays
	        if (j === 0) {
	          // check row exists in upper triangular matrix
	          if (i < columns) {
	            // U
	            udata[i] = [];
	          } // L


	          ldata[i] = [];
	        } // check we are in the upper triangular matrix


	        if (i < j) {
	          // check row exists in upper triangular matrix
	          if (i < columns) {
	            // U
	            udata[i][j] = data[i][j];
	          } // check column exists in lower triangular matrix


	          if (j < rows) {
	            // L
	            ldata[i][j] = 0;
	          }

	          continue;
	        } // diagonal value


	        if (i === j) {
	          // check row exists in upper triangular matrix
	          if (i < columns) {
	            // U
	            udata[i][j] = data[i][j];
	          } // check column exists in lower triangular matrix


	          if (j < rows) {
	            // L
	            ldata[i][j] = 1;
	          }

	          continue;
	        } // check row exists in upper triangular matrix


	        if (i < columns) {
	          // U
	          udata[i][j] = 0;
	        } // check column exists in lower triangular matrix


	        if (j < rows) {
	          // L
	          ldata[i][j] = data[i][j];
	        }
	      }
	    } // l matrix


	    var l = new DenseMatrix({
	      data: ldata,
	      size: lsize
	    }); // u matrix

	    var u = new DenseMatrix({
	      data: udata,
	      size: usize
	    }); // p vector

	    var pv = [];

	    for (i = 0, n = p.length; i < n; i++) {
	      pv[p[i]] = i;
	    } // return matrices


	    return {
	      L: l,
	      U: u,
	      p: pv,
	      toString: function toString() {
	        return 'L: ' + this.L.toString() + '\nU: ' + this.U.toString() + '\nP: ' + this.p;
	      }
	    };
	  }

	  function _sparseLUP(m) {
	    // rows & columns
	    var rows = m._size[0];
	    var columns = m._size[1]; // minimum rows and columns

	    var n = Math.min(rows, columns); // matrix arrays (will not be modified, thanks to permutation vector)

	    var values = m._values;
	    var index = m._index;
	    var ptr = m._ptr; // l matrix arrays

	    var lvalues = [];
	    var lindex = [];
	    var lptr = [];
	    var lsize = [rows, n]; // u matrix arrays

	    var uvalues = [];
	    var uindex = [];
	    var uptr = [];
	    var usize = [n, columns]; // vars

	    var i, j, k; // permutation vectors, (current index -> original index) and (original index -> current index)

	    var pvCo = [];
	    var pvOc = [];

	    for (i = 0; i < rows; i++) {
	      pvCo[i] = i;
	      pvOc[i] = i;
	    } // swap indices in permutation vectors (condition x < y)!


	    var swapIndeces = function swapIndeces(x, y) {
	      // find pv indeces getting data from x and y
	      var kx = pvOc[x];
	      var ky = pvOc[y]; // update permutation vector current -> original

	      pvCo[kx] = y;
	      pvCo[ky] = x; // update permutation vector original -> current

	      pvOc[x] = ky;
	      pvOc[y] = kx;
	    }; // loop columns


	    var _loop = function _loop() {
	      // sparse accumulator
	      var spa = new Spa(); // check lower triangular matrix has a value @ column j

	      if (j < rows) {
	        // update ptr
	        lptr.push(lvalues.length); // first value in j column for lower triangular matrix

	        lvalues.push(1);
	        lindex.push(j);
	      } // update ptr


	      uptr.push(uvalues.length); // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]

	      var k0 = ptr[j];
	      var k1 = ptr[j + 1]; // copy column j into sparse accumulator

	      for (k = k0; k < k1; k++) {
	        // row
	        i = index[k]; // copy column values into sparse accumulator (use permutation vector)

	        spa.set(pvCo[i], values[k]);
	      } // skip first column in upper triangular matrix


	      if (j > 0) {
	        // loop rows in column j (above diagonal)
	        spa.forEach(0, j - 1, function (k, vkj) {
	          // loop rows in column k (L)
	          SparseMatrix._forEachRow(k, lvalues, lindex, lptr, function (i, vik) {
	            // check row is below k
	            if (i > k) {
	              // update spa value
	              spa.accumulate(i, unaryMinus(multiplyScalar(vik, vkj)));
	            }
	          });
	        });
	      } // row with larger value in spa, row >= j


	      var pi = j;
	      var vjj = spa.get(j);
	      var pabsv = abs(vjj); // loop values in spa (order by row, below diagonal)

	      spa.forEach(j + 1, rows - 1, function (x, v) {
	        // absolute value
	        var absv = abs(v); // value is greater than pivote value

	        if (larger(absv, pabsv)) {
	          // store row
	          pi = x; // update max value

	          pabsv = absv; // value @ [j, j]

	          vjj = v;
	        }
	      }); // swap rows (j <-> pi)

	      if (j !== pi) {
	        // swap values j <-> pi in L
	        SparseMatrix._swapRows(j, pi, lsize[1], lvalues, lindex, lptr); // swap values j <-> pi in U


	        SparseMatrix._swapRows(j, pi, usize[1], uvalues, uindex, uptr); // swap values in spa


	        spa.swap(j, pi); // update permutation vector (swap values @ j, pi)

	        swapIndeces(j, pi);
	      } // loop values in spa (order by row)


	      spa.forEach(0, rows - 1, function (x, v) {
	        // check we are above diagonal
	        if (x <= j) {
	          // update upper triangular matrix
	          uvalues.push(v);
	          uindex.push(x);
	        } else {
	          // update value
	          v = divideScalar(v, vjj); // check value is non zero

	          if (!equalScalar(v, 0)) {
	            // update lower triangular matrix
	            lvalues.push(v);
	            lindex.push(x);
	          }
	        }
	      });
	    };

	    for (j = 0; j < columns; j++) {
	      _loop();
	    } // update ptrs


	    uptr.push(uvalues.length);
	    lptr.push(lvalues.length); // return matrices

	    return {
	      L: new SparseMatrix({
	        values: lvalues,
	        index: lindex,
	        ptr: lptr,
	        size: lsize
	      }),
	      U: new SparseMatrix({
	        values: uvalues,
	        index: uindex,
	        ptr: uptr,
	        size: usize
	      }),
	      p: pvCo,
	      toString: function toString() {
	        return 'L: ' + this.L.toString() + '\nU: ' + this.U.toString() + '\nP: ' + this.p;
	      }
	    };
	  }

	  return lup;
	}

	exports.name = 'lup';
	exports.factory = factory;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var array = __webpack_require__(17);

	function factory(type, config, load, typed) {
	  var matrix = load(__webpack_require__(34));
	  var subtract = load(__webpack_require__(65));
	  var multiply = load(__webpack_require__(47));
	  /**
	   * Calculate the cross product for two vectors in three dimensional space.
	   * The cross product of `A = [a1, a2, a3]` and `B = [b1, b2, b3]` is defined
	   * as:
	   *
	   *    cross(A, B) = [
	   *      a2 * b3 - a3 * b2,
	   *      a3 * b1 - a1 * b3,
	   *      a1 * b2 - a2 * b1
	   *    ]
	   *
	   * If one of the input vectors has a dimension greater than 1, the output
	   * vector will be a 1x3 (2-dimensional) matrix.
	   *
	   * Syntax:
	   *
	   *    math.cross(x, y)
	   *
	   * Examples:
	   *
	   *    math.cross([1, 1, 0],   [0, 1, 1])       // Returns [1, -1, 1]
	   *    math.cross([3, -3, 1],  [4, 9, 2])       // Returns [-15, -2, 39]
	   *    math.cross([2, 3, 4],   [5, 6, 7])       // Returns [-3, 6, -3]
	   *    math.cross([[1, 2, 3]], [[4], [5], [6]]) // Returns [[-3, 6, -3]]
	   *
	   * See also:
	   *
	   *    dot, multiply
	   *
	   * @param  {Array | Matrix} x   First vector
	   * @param  {Array | Matrix} y   Second vector
	   * @return {Array | Matrix}     Returns the cross product of `x` and `y`
	   */

	  var cross = typed('cross', {
	    'Matrix, Matrix': function MatrixMatrix(x, y) {
	      return matrix(_cross(x.toArray(), y.toArray()));
	    },
	    'Matrix, Array': function MatrixArray(x, y) {
	      return matrix(_cross(x.toArray(), y));
	    },
	    'Array, Matrix': function ArrayMatrix(x, y) {
	      return matrix(_cross(x, y.toArray()));
	    },
	    'Array, Array': _cross
	  });
	  cross.toTex = {
	    2: "\\left(${args[0]}\\right)\\times\\left(${args[1]}\\right)"
	  };
	  return cross;
	  /**
	   * Calculate the cross product for two arrays
	   * @param {Array} x  First vector
	   * @param {Array} y  Second vector
	   * @returns {Array} Returns the cross product of x and y
	   * @private
	   */

	  function _cross(x, y) {
	    var highestDimension = Math.max(array.size(x).length, array.size(y).length);
	    x = array.squeeze(x);
	    y = array.squeeze(y);
	    var xSize = array.size(x);
	    var ySize = array.size(y);

	    if (xSize.length !== 1 || ySize.length !== 1 || xSize[0] !== 3 || ySize[0] !== 3) {
	      throw new RangeError('Vectors with length 3 expected ' + '(Size A = [' + xSize.join(', ') + '], B = [' + ySize.join(', ') + '])');
	    }

	    var product = [subtract(multiply(x[1], y[2]), multiply(x[2], y[1])), subtract(multiply(x[2], y[0]), multiply(x[0], y[2])), subtract(multiply(x[0], y[1]), multiply(x[1], y[0]))];

	    if (highestDimension > 1) {
	      return [product];
	    } else {
	      return product;
	    }
	  }
	}

	exports.name = 'cross';
	exports.factory = factory;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var size = __webpack_require__(17).size;

	function factory(type, config, load, typed) {
	  var add = load(__webpack_require__(33));
	  var multiply = load(__webpack_require__(47));
	  /**
	   * Calculate the dot product of two vectors. The dot product of
	   * `A = [a1, a2, a3, ..., an]` and `B = [b1, b2, b3, ..., bn]` is defined as:
	   *
	   *    dot(A, B) = a1 * b1 + a2 * b2 + a3 * b3 + ... + an * bn
	   *
	   * Syntax:
	   *
	   *    math.dot(x, y)
	   *
	   * Examples:
	   *
	   *    math.dot([2, 4, 1], [2, 2, 3])       // returns number 15
	   *    math.multiply([2, 4, 1], [2, 2, 3])  // returns number 15
	   *
	   * See also:
	   *
	   *    multiply, cross
	   *
	   * @param  {Array | Matrix} x     First vector
	   * @param  {Array | Matrix} y     Second vector
	   * @return {number}               Returns the dot product of `x` and `y`
	   */

	  var dot = typed('dot', {
	    'Matrix, Matrix': function MatrixMatrix(x, y) {
	      return _dot(x.toArray(), y.toArray());
	    },
	    'Matrix, Array': function MatrixArray(x, y) {
	      return _dot(x.toArray(), y);
	    },
	    'Array, Matrix': function ArrayMatrix(x, y) {
	      return _dot(x, y.toArray());
	    },
	    'Array, Array': _dot
	  });
	  dot.toTex = {
	    2: "\\left(${args[0]}\\cdot${args[1]}\\right)"
	  };
	  return dot;
	  /**
	   * Calculate the dot product for two arrays
	   * @param {Array} x  First vector
	   * @param {Array} y  Second vector
	   * @returns {number} Returns the dot product of x and y
	   * @private
	   */
	  // TODO: double code with math.multiply

	  function _dot(x, y) {
	    var xSize = size(x);
	    var ySize = size(y);
	    var len = xSize[0];
	    if (xSize.length !== 1 || ySize.length !== 1) throw new RangeError('Vector expected'); // TODO: better error message

	    if (xSize[0] !== ySize[0]) throw new RangeError('Vectors must have equal length (' + xSize[0] + ' != ' + ySize[0] + ')');
	    if (len === 0) throw new RangeError('Cannot calculate the dot product of empty vectors');
	    var prod = 0;

	    for (var i = 0; i < len; i++) {
	      prod = add(prod, multiply(x[i], y[i]));
	    }

	    return prod;
	  }
	}

	exports.name = 'dot';
	exports.factory = factory;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var clone = __webpack_require__(4).clone;

	var format = __webpack_require__(18).format;

	function factory(type, config, load, typed) {
	  var latex = __webpack_require__(36);

	  var matrix = load(__webpack_require__(34));
	  var DenseMatrix = type.DenseMatrix;
	  var SparseMatrix = type.SparseMatrix;
	  /**
	   * Transpose a matrix. All values of the matrix are reflected over its
	   * main diagonal. Only applicable to two dimensional matrices containing
	   * a vector (i.e. having size `[1,n]` or `[n,1]`). One dimensional
	   * vectors and scalars return the input unchanged.
	   *
	   * Syntax:
	   *
	   *     math.transpose(x)
	   *
	   * Examples:
	   *
	   *     const A = [[1, 2, 3], [4, 5, 6]]
	   *     math.transpose(A)               // returns [[1, 4], [2, 5], [3, 6]]
	   *
	   * See also:
	   *
	   *     diag, inv, subset, squeeze
	   *
	   * @param {Array | Matrix} x  Matrix to be transposed
	   * @return {Array | Matrix}   The transposed matrix
	   */

	  var transpose = typed('transpose', {
	    'Array': function Array(x) {
	      // use dense matrix implementation
	      return transpose(matrix(x)).valueOf();
	    },
	    'Matrix': function Matrix(x) {
	      // matrix size
	      var size = x.size(); // result

	      var c; // process dimensions

	      switch (size.length) {
	        case 1:
	          // vector
	          c = x.clone();
	          break;

	        case 2:
	          // rows and columns
	          var rows = size[0];
	          var columns = size[1]; // check columns

	          if (columns === 0) {
	            // throw exception
	            throw new RangeError('Cannot transpose a 2D matrix with no columns (size: ' + format(size) + ')');
	          } // process storage format


	          switch (x.storage()) {
	            case 'dense':
	              c = _denseTranspose(x, rows, columns);
	              break;

	            case 'sparse':
	              c = _sparseTranspose(x, rows, columns);
	              break;
	          }

	          break;

	        default:
	          // multi dimensional
	          throw new RangeError('Matrix must be a vector or two dimensional (size: ' + format(this._size) + ')');
	      }

	      return c;
	    },
	    // scalars
	    'any': function any(x) {
	      return clone(x);
	    }
	  });

	  function _denseTranspose(m, rows, columns) {
	    // matrix array
	    var data = m._data; // transposed matrix data

	    var transposed = [];
	    var transposedRow; // loop columns

	    for (var j = 0; j < columns; j++) {
	      // initialize row
	      transposedRow = transposed[j] = []; // loop rows

	      for (var i = 0; i < rows; i++) {
	        // set data
	        transposedRow[i] = clone(data[i][j]);
	      }
	    } // return matrix


	    return new DenseMatrix({
	      data: transposed,
	      size: [columns, rows],
	      datatype: m._datatype
	    });
	  }

	  function _sparseTranspose(m, rows, columns) {
	    // matrix arrays
	    var values = m._values;
	    var index = m._index;
	    var ptr = m._ptr; // result matrices

	    var cvalues = values ? [] : undefined;
	    var cindex = [];
	    var cptr = []; // row counts

	    var w = [];

	    for (var x = 0; x < rows; x++) {
	      w[x] = 0;
	    } // vars


	    var p, l, j; // loop values in matrix

	    for (p = 0, l = index.length; p < l; p++) {
	      // number of values in row
	      w[index[p]]++;
	    } // cumulative sum


	    var sum = 0; // initialize cptr with the cummulative sum of row counts

	    for (var i = 0; i < rows; i++) {
	      // update cptr
	      cptr.push(sum); // update sum

	      sum += w[i]; // update w

	      w[i] = cptr[i];
	    } // update cptr


	    cptr.push(sum); // loop columns

	    for (j = 0; j < columns; j++) {
	      // values & index in column
	      for (var k0 = ptr[j], k1 = ptr[j + 1], k = k0; k < k1; k++) {
	        // C values & index
	        var q = w[index[k]]++; // C[j, i] = A[i, j]

	        cindex[q] = j; // check we need to process values (pattern matrix)

	        if (values) {
	          cvalues[q] = clone(values[k]);
	        }
	      }
	    } // return matrix


	    return new SparseMatrix({
	      values: cvalues,
	      index: cindex,
	      ptr: cptr,
	      size: [columns, rows],
	      datatype: m._datatype
	    });
	  }

	  transpose.toTex = {
	    1: "\\left(${args[0]}\\right)".concat(latex.operators['transpose'])
	  };
	  return transpose;
	}

	exports.name = 'transpose';
	exports.factory = factory;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var isArray = Array.isArray;

	function factory(type, config, load, typed) {
	  var matrix = load(__webpack_require__(34));
	  var lup = load(__webpack_require__(67));
	  var slu = load(__webpack_require__(72));
	  var csIpvec = load(__webpack_require__(91));
	  var solveValidation = load(__webpack_require__(92));
	  var usolve = load(__webpack_require__(93));
	  var lsolve = load(__webpack_require__(94));
	  /**
	   * Solves the linear system `A * x = b` where `A` is an [n x n] matrix and `b` is a [n] column vector.
	   *
	   * Syntax:
	   *
	   *    math.lusolve(A, b)     // returns column vector with the solution to the linear system A * x = b
	   *    math.lusolve(lup, b)   // returns column vector with the solution to the linear system A * x = b, lup = math.lup(A)
	   *
	   * Examples:
	   *
	   *    const m = [[1, 0, 0, 0], [0, 2, 0, 0], [0, 0, 3, 0], [0, 0, 0, 4]]
	   *
	   *    const x = math.lusolve(m, [-1, -1, -1, -1])        // x = [[-1], [-0.5], [-1/3], [-0.25]]
	   *
	   *    const f = math.lup(m)
	   *    const x1 = math.lusolve(f, [-1, -1, -1, -1])       // x1 = [[-1], [-0.5], [-1/3], [-0.25]]
	   *    const x2 = math.lusolve(f, [1, 2, 1, -1])          // x2 = [[1], [1], [1/3], [-0.25]]
	   *
	   *    const a = [[-2, 3], [2, 1]]
	   *    const b = [11, 9]
	   *    const x = math.lusolve(a, b)  // [[2], [5]]
	   *
	   * See also:
	   *
	   *    lup, slu, lsolve, usolve
	   *
	   * @param {Matrix | Array | Object} A      Invertible Matrix or the Matrix LU decomposition
	   * @param {Matrix | Array} b               Column Vector
	   * @param {number} [order]                 The Symbolic Ordering and Analysis order, see slu for details. Matrix must be a SparseMatrix
	   * @param {Number} [threshold]             Partial pivoting threshold (1 for partial pivoting), see slu for details. Matrix must be a SparseMatrix.
	   *
	   * @return {DenseMatrix | Array}           Column vector with the solution to the linear system A * x = b
	   */

	  var lusolve = typed('lusolve', {
	    'Array, Array | Matrix': function ArrayArrayMatrix(a, b) {
	      // convert a to matrix
	      a = matrix(a); // matrix lup decomposition

	      var d = lup(a); // solve

	      var x = _lusolve(d.L, d.U, d.p, null, b); // convert result to array


	      return x.valueOf();
	    },
	    'DenseMatrix, Array | Matrix': function DenseMatrixArrayMatrix(a, b) {
	      // matrix lup decomposition
	      var d = lup(a); // solve

	      return _lusolve(d.L, d.U, d.p, null, b);
	    },
	    'SparseMatrix, Array | Matrix': function SparseMatrixArrayMatrix(a, b) {
	      // matrix lup decomposition
	      var d = lup(a); // solve

	      return _lusolve(d.L, d.U, d.p, null, b);
	    },
	    'SparseMatrix, Array | Matrix, number, number': function SparseMatrixArrayMatrixNumberNumber(a, b, order, threshold) {
	      // matrix lu decomposition
	      var d = slu(a, order, threshold); // solve

	      return _lusolve(d.L, d.U, d.p, d.q, b);
	    },
	    'Object, Array | Matrix': function ObjectArrayMatrix(d, b) {
	      // solve
	      return _lusolve(d.L, d.U, d.p, d.q, b);
	    }
	  });

	  var _toMatrix = function _toMatrix(a) {
	    // check it is a matrix
	    if (type.isMatrix(a)) {
	      return a;
	    } // check array


	    if (isArray(a)) {
	      return matrix(a);
	    } // throw


	    throw new TypeError('Invalid Matrix LU decomposition');
	  };

	  function _lusolve(l, u, p, q, b) {
	    // verify L, U, P
	    l = _toMatrix(l);
	    u = _toMatrix(u); // validate matrix and vector

	    b = solveValidation(l, b, false); // apply row permutations if needed (b is a DenseMatrix)

	    if (p) {
	      b._data = csIpvec(p, b._data);
	    } // use forward substitution to resolve L * y = b


	    var y = lsolve(l, b); // use backward substitution to resolve U * x = y

	    var x = usolve(u, y); // apply column permutations if needed (x is a DenseMatrix)

	    if (q) {
	      x._data = csIpvec(q, x._data);
	    } // return solution


	    return x;
	  }

	  return lusolve;
	}

	exports.name = 'lusolve';
	exports.factory = factory;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(16);

	var number = util.number;
	var isInteger = number.isInteger;

	function factory(type, config, load, typed) {
	  var csSqr = load(__webpack_require__(73));
	  var csLu = load(__webpack_require__(83));
	  /**
	   * Calculate the Sparse Matrix LU decomposition with full pivoting. Sparse Matrix `A` is decomposed in two matrices (`L`, `U`) and two permutation vectors (`pinv`, `q`) where
	   *
	   * `P * A * Q = L * U`
	   *
	   * Syntax:
	   *
	   *    math.slu(A, order, threshold)
	   *
	   * Examples:
	   *
	   *    const A = math.sparse([[4,3], [6, 3]])
	   *    math.slu(A, 1, 0.001)
	   *    // returns:
	   *    // {
	   *    //   L: [[1, 0], [1.5, 1]]
	   *    //   U: [[4, 3], [0, -1.5]]
	   *    //   p: [0, 1]
	   *    //   q: [0, 1]
	   *    // }
	   *
	   * See also:
	   *
	   *    lup, lsolve, usolve, lusolve
	   *
	   * @param {SparseMatrix} A              A two dimensional sparse matrix for which to get the LU decomposition.
	   * @param {Number}       order          The Symbolic Ordering and Analysis order:
	   *                                       0 - Natural ordering, no permutation vector q is returned
	   *                                       1 - Matrix must be square, symbolic ordering and analisis is performed on M = A + A'
	   *                                       2 - Symbolic ordering and analisis is performed on M = A' * A. Dense columns from A' are dropped, A recreated from A'.
	   *                                           This is appropriatefor LU factorization of unsymmetric matrices.
	   *                                       3 - Symbolic ordering and analisis is performed on M = A' * A. This is best used for LU factorization is matrix M has no dense rows.
	   *                                           A dense row is a row with more than 10*sqr(columns) entries.
	   * @param {Number}       threshold       Partial pivoting threshold (1 for partial pivoting)
	   *
	   * @return {Object} The lower triangular matrix, the upper triangular matrix and the permutation vectors.
	   */

	  var slu = typed('slu', {
	    'SparseMatrix, number, number': function SparseMatrixNumberNumber(a, order, threshold) {
	      // verify order
	      if (!isInteger(order) || order < 0 || order > 3) {
	        throw new Error('Symbolic Ordering and Analysis order must be an integer number in the interval [0, 3]');
	      } // verify threshold


	      if (threshold < 0 || threshold > 1) {
	        throw new Error('Partial pivoting threshold must be a number from 0 to 1');
	      } // perform symbolic ordering and analysis


	      var s = csSqr(order, a, false); // perform lu decomposition

	      var f = csLu(a, s, threshold); // return decomposition

	      return {
	        L: f.L,
	        U: f.U,
	        p: f.pinv,
	        q: s.q,
	        toString: function toString() {
	          return 'L: ' + this.L.toString() + '\nU: ' + this.U.toString() + '\np: ' + this.p.toString() + (this.q ? '\nq: ' + this.q.toString() : '') + '\n';
	        }
	      };
	    }
	  });
	  return slu;
	}

	exports.name = 'slu';
	exports.factory = factory;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function factory(type, config, load) {
	  var csAmd = load(__webpack_require__(74));
	  var csPermute = load(__webpack_require__(78));
	  var csEtree = load(__webpack_require__(79));
	  var csPost = load(__webpack_require__(80));
	  var csCounts = load(__webpack_require__(81));
	  /**
	   * Symbolic ordering and analysis for QR and LU decompositions.
	   *
	   * @param {Number}  order           The ordering strategy (see csAmd for more details)
	   * @param {Matrix}  a               The A matrix
	   * @param {boolean} qr              Symbolic ordering and analysis for QR decomposition (true) or
	   *                                  symbolic ordering and analysis for LU decomposition (false)
	   *
	   * @return {Object}                 The Symbolic ordering and analysis for matrix A
	   *
	   * Reference: http://faculty.cse.tamu.edu/davis/publications.html
	   */

	  var csSqr = function csSqr(order, a, qr) {
	    // a arrays
	    var aptr = a._ptr;
	    var asize = a._size; // columns

	    var n = asize[1]; // vars

	    var k; // symbolic analysis result

	    var s = {}; // fill-reducing ordering

	    s.q = csAmd(order, a); // validate results

	    if (order && !s.q) {
	      return null;
	    } // QR symbolic analysis


	    if (qr) {
	      // apply permutations if needed
	      var c = order ? csPermute(a, null, s.q, 0) : a; // etree of C'*C, where C=A(:,q)

	      s.parent = csEtree(c, 1); // post order elimination tree

	      var post = csPost(s.parent, n); // col counts chol(C'*C)

	      s.cp = csCounts(c, s.parent, post, 1); // check we have everything needed to calculate number of nonzero elements

	      if (c && s.parent && s.cp && _vcount(c, s)) {
	        // calculate number of nonzero elements
	        for (s.unz = 0, k = 0; k < n; k++) {
	          s.unz += s.cp[k];
	        }
	      }
	    } else {
	      // for LU factorization only, guess nnz(L) and nnz(U)
	      s.unz = 4 * aptr[n] + n;
	      s.lnz = s.unz;
	    } // return result S


	    return s;
	  };
	  /**
	   * Compute nnz(V) = s.lnz, s.pinv, s.leftmost, s.m2 from A and s.parent
	   */


	  function _vcount(a, s) {
	    // a arrays
	    var aptr = a._ptr;
	    var aindex = a._index;
	    var asize = a._size; // rows & columns

	    var m = asize[0];
	    var n = asize[1]; // initialize s arrays

	    s.pinv = []; // (m + n)

	    s.leftmost = []; // (m)
	    // vars

	    var parent = s.parent;
	    var pinv = s.pinv;
	    var leftmost = s.leftmost; // workspace, next: first m entries, head: next n entries, tail: next n entries, nque: next n entries

	    var w = []; // (m + 3 * n)

	    var next = 0;
	    var head = m;
	    var tail = m + n;
	    var nque = m + 2 * n; // vars

	    var i, k, p, p0, p1; // initialize w

	    for (k = 0; k < n; k++) {
	      // queue k is empty
	      w[head + k] = -1;
	      w[tail + k] = -1;
	      w[nque + k] = 0;
	    } // initialize row arrays


	    for (i = 0; i < m; i++) {
	      leftmost[i] = -1;
	    } // loop columns backwards


	    for (k = n - 1; k >= 0; k--) {
	      // values & index for column k
	      for (p0 = aptr[k], p1 = aptr[k + 1], p = p0; p < p1; p++) {
	        // leftmost[i] = min(find(A(i,:)))
	        leftmost[aindex[p]] = k;
	      }
	    } // scan rows in reverse order


	    for (i = m - 1; i >= 0; i--) {
	      // row i is not yet ordered
	      pinv[i] = -1;
	      k = leftmost[i]; // check row i is empty

	      if (k === -1) {
	        continue;
	      } // first row in queue k


	      if (w[nque + k]++ === 0) {
	        w[tail + k] = i;
	      } // put i at head of queue k


	      w[next + i] = w[head + k];
	      w[head + k] = i;
	    }

	    s.lnz = 0;
	    s.m2 = m; // find row permutation and nnz(V)

	    for (k = 0; k < n; k++) {
	      // remove row i from queue k
	      i = w[head + k]; // count V(k,k) as nonzero

	      s.lnz++; // add a fictitious row

	      if (i < 0) {
	        i = s.m2++;
	      } // associate row i with V(:,k)


	      pinv[i] = k; // skip if V(k+1:m,k) is empty

	      if (--nque[k] <= 0) {
	        continue;
	      } // nque[k] is nnz (V(k+1:m,k))


	      s.lnz += w[nque + k]; // move all rows to parent of k

	      var pa = parent[k];

	      if (pa !== -1) {
	        if (w[nque + pa] === 0) {
	          w[tail + pa] = w[tail + k];
	        }

	        w[next + w[tail + k]] = w[head + pa];
	        w[head + pa] = w[next + i];
	        w[nque + pa] += w[nque + k];
	      }
	    }

	    for (i = 0; i < m; i++) {
	      if (pinv[i] < 0) {
	        pinv[i] = k++;
	      }
	    }

	    return true;
	  }

	  return csSqr;
	}

	exports.name = 'csSqr';
	exports.path = 'algebra.sparse';
	exports.factory = factory;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function factory(type, config, load) {
	  var csFlip = load(__webpack_require__(75));
	  var csFkeep = load(__webpack_require__(76));
	  var csTdfs = load(__webpack_require__(77));
	  var add = load(__webpack_require__(33));
	  var multiply = load(__webpack_require__(47));
	  var transpose = load(__webpack_require__(70));
	  /**
	   * Approximate minimum degree ordering. The minimum degree algorithm is a widely used
	   * heuristic for finding a permutation P so that P*A*P' has fewer nonzeros in its factorization
	   * than A. It is a gready method that selects the sparsest pivot row and column during the course
	   * of a right looking sparse Cholesky factorization.
	   *
	   * Reference: http://faculty.cse.tamu.edu/davis/publications.html
	   *
	   * @param {Number} order    0: Natural, 1: Cholesky, 2: LU, 3: QR
	   * @param {Matrix} m        Sparse Matrix
	   */

	  var csAmd = function csAmd(order, a) {
	    // check input parameters
	    if (!a || order <= 0 || order > 3) {
	      return null;
	    } // a matrix arrays


	    var asize = a._size; // rows and columns

	    var m = asize[0];
	    var n = asize[1]; // initialize vars

	    var lemax = 0; // dense threshold

	    var dense = Math.max(16, 10 * Math.sqrt(n));
	    dense = Math.min(n - 2, dense); // create target matrix C

	    var cm = _createTargetMatrix(order, a, m, n, dense); // drop diagonal entries


	    csFkeep(cm, _diag, null); // C matrix arrays

	    var cindex = cm._index;
	    var cptr = cm._ptr; // number of nonzero elements in C

	    var cnz = cptr[n]; // allocate result (n+1)

	    var P = []; // create workspace (8 * (n + 1))

	    var W = [];
	    var len = 0; // first n + 1 entries

	    var nv = n + 1; // next n + 1 entries

	    var next = 2 * (n + 1); // next n + 1 entries

	    var head = 3 * (n + 1); // next n + 1 entries

	    var elen = 4 * (n + 1); // next n + 1 entries

	    var degree = 5 * (n + 1); // next n + 1 entries

	    var w = 6 * (n + 1); // next n + 1 entries

	    var hhead = 7 * (n + 1); // last n + 1 entries
	    // use P as workspace for last

	    var last = P; // initialize quotient graph

	    var mark = _initializeQuotientGraph(n, cptr, W, len, head, last, next, hhead, nv, w, elen, degree); // initialize degree lists


	    var nel = _initializeDegreeLists(n, cptr, W, degree, elen, w, dense, nv, head, last, next); // minimum degree node


	    var mindeg = 0; // vars

	    var i, j, k, k1, k2, e, pj, ln, nvi, pk, eln, p1, p2, pn, h, d; // while (selecting pivots) do

	    while (nel < n) {
	      // select node of minimum approximate degree. amd() is now ready to start eliminating the graph. It first
	      // finds a node k of minimum degree and removes it from its degree list. The variable nel keeps track of thow
	      // many nodes have been eliminated.
	      for (k = -1; mindeg < n && (k = W[head + mindeg]) === -1; mindeg++) {
	        ;
	      }

	      if (W[next + k] !== -1) {
	        last[W[next + k]] = -1;
	      } // remove k from degree list


	      W[head + mindeg] = W[next + k]; // elenk = |Ek|

	      var elenk = W[elen + k]; // # of nodes k represents

	      var nvk = W[nv + k]; // W[nv + k] nodes of A eliminated

	      nel += nvk; // Construct a new element. The new element Lk is constructed in place if |Ek| = 0. nv[i] is
	      // negated for all nodes i in Lk to flag them as members of this set. Each node i is removed from the
	      // degree lists. All elements e in Ek are absorved into element k.

	      var dk = 0; // flag k as in Lk

	      W[nv + k] = -nvk;
	      var p = cptr[k]; // do in place if W[elen + k] === 0

	      var pk1 = elenk === 0 ? p : cnz;
	      var pk2 = pk1;

	      for (k1 = 1; k1 <= elenk + 1; k1++) {
	        if (k1 > elenk) {
	          // search the nodes in k
	          e = k; // list of nodes starts at cindex[pj]

	          pj = p; // length of list of nodes in k

	          ln = W[len + k] - elenk;
	        } else {
	          // search the nodes in e
	          e = cindex[p++];
	          pj = cptr[e]; // length of list of nodes in e

	          ln = W[len + e];
	        }

	        for (k2 = 1; k2 <= ln; k2++) {
	          i = cindex[pj++]; // check  node i dead, or seen

	          if ((nvi = W[nv + i]) <= 0) {
	            continue;
	          } // W[degree + Lk] += size of node i


	          dk += nvi; // negate W[nv + i] to denote i in Lk

	          W[nv + i] = -nvi; // place i in Lk

	          cindex[pk2++] = i;

	          if (W[next + i] !== -1) {
	            last[W[next + i]] = last[i];
	          } // check we need to remove i from degree list


	          if (last[i] !== -1) {
	            W[next + last[i]] = W[next + i];
	          } else {
	            W[head + W[degree + i]] = W[next + i];
	          }
	        }

	        if (e !== k) {
	          // absorb e into k
	          cptr[e] = csFlip(k); // e is now a dead element

	          W[w + e] = 0;
	        }
	      } // cindex[cnz...nzmax] is free


	      if (elenk !== 0) {
	        cnz = pk2;
	      } // external degree of k - |Lk\i|


	      W[degree + k] = dk; // element k is in cindex[pk1..pk2-1]

	      cptr[k] = pk1;
	      W[len + k] = pk2 - pk1; // k is now an element

	      W[elen + k] = -2; // Find set differences. The scan1 function now computes the set differences |Le \ Lk| for all elements e. At the start of the
	      // scan, no entry in the w array is greater than or equal to mark.
	      // clear w if necessary

	      mark = _wclear(mark, lemax, W, w, n); // scan 1: find |Le\Lk|

	      for (pk = pk1; pk < pk2; pk++) {
	        i = cindex[pk]; // check if W[elen + i] empty, skip it

	        if ((eln = W[elen + i]) <= 0) {
	          continue;
	        } // W[nv + i] was negated


	        nvi = -W[nv + i];
	        var wnvi = mark - nvi; // scan Ei

	        for (p = cptr[i], p1 = cptr[i] + eln - 1; p <= p1; p++) {
	          e = cindex[p];

	          if (W[w + e] >= mark) {
	            // decrement |Le\Lk|
	            W[w + e] -= nvi;
	          } else if (W[w + e] !== 0) {
	            // ensure e is a live element, 1st time e seen in scan 1
	            W[w + e] = W[degree + e] + wnvi;
	          }
	        }
	      } // degree update
	      // The second pass computes the approximate degree di, prunes the sets Ei and Ai, and computes a hash
	      // function h(i) for all nodes in Lk.
	      // scan2: degree update


	      for (pk = pk1; pk < pk2; pk++) {
	        // consider node i in Lk
	        i = cindex[pk];
	        p1 = cptr[i];
	        p2 = p1 + W[elen + i] - 1;
	        pn = p1; // scan Ei

	        for (h = 0, d = 0, p = p1; p <= p2; p++) {
	          e = cindex[p]; // check e is an unabsorbed element

	          if (W[w + e] !== 0) {
	            // dext = |Le\Lk|
	            var dext = W[w + e] - mark;

	            if (dext > 0) {
	              // sum up the set differences
	              d += dext; // keep e in Ei

	              cindex[pn++] = e; // compute the hash of node i

	              h += e;
	            } else {
	              // aggressive absorb. e->k
	              cptr[e] = csFlip(k); // e is a dead element

	              W[w + e] = 0;
	            }
	          }
	        } // W[elen + i] = |Ei|


	        W[elen + i] = pn - p1 + 1;
	        var p3 = pn;
	        var p4 = p1 + W[len + i]; // prune edges in Ai

	        for (p = p2 + 1; p < p4; p++) {
	          j = cindex[p]; // check node j dead or in Lk

	          var nvj = W[nv + j];

	          if (nvj <= 0) {
	            continue;
	          } // degree(i) += |j|


	          d += nvj; // place j in node list of i

	          cindex[pn++] = j; // compute hash for node i

	          h += j;
	        } // check for mass elimination


	        if (d === 0) {
	          // absorb i into k
	          cptr[i] = csFlip(k);
	          nvi = -W[nv + i]; // |Lk| -= |i|

	          dk -= nvi; // |k| += W[nv + i]

	          nvk += nvi;
	          nel += nvi;
	          W[nv + i] = 0; // node i is dead

	          W[elen + i] = -1;
	        } else {
	          // update degree(i)
	          W[degree + i] = Math.min(W[degree + i], d); // move first node to end

	          cindex[pn] = cindex[p3]; // move 1st el. to end of Ei

	          cindex[p3] = cindex[p1]; // add k as 1st element in of Ei

	          cindex[p1] = k; // new len of adj. list of node i

	          W[len + i] = pn - p1 + 1; // finalize hash of i

	          h = (h < 0 ? -h : h) % n; // place i in hash bucket

	          W[next + i] = W[hhead + h];
	          W[hhead + h] = i; // save hash of i in last[i]

	          last[i] = h;
	        }
	      } // finalize |Lk|


	      W[degree + k] = dk;
	      lemax = Math.max(lemax, dk); // clear w

	      mark = _wclear(mark + lemax, lemax, W, w, n); // Supernode detection. Supernode detection relies on the hash function h(i) computed for each node i.
	      // If two nodes have identical adjacency lists, their hash functions wil be identical.

	      for (pk = pk1; pk < pk2; pk++) {
	        i = cindex[pk]; // check i is dead, skip it

	        if (W[nv + i] >= 0) {
	          continue;
	        } // scan hash bucket of node i


	        h = last[i];
	        i = W[hhead + h]; // hash bucket will be empty

	        W[hhead + h] = -1;

	        for (; i !== -1 && W[next + i] !== -1; i = W[next + i], mark++) {
	          ln = W[len + i];
	          eln = W[elen + i];

	          for (p = cptr[i] + 1; p <= cptr[i] + ln - 1; p++) {
	            W[w + cindex[p]] = mark;
	          }

	          var jlast = i; // compare i with all j

	          for (j = W[next + i]; j !== -1;) {
	            var ok = W[len + j] === ln && W[elen + j] === eln;

	            for (p = cptr[j] + 1; ok && p <= cptr[j] + ln - 1; p++) {
	              // compare i and j
	              if (W[w + cindex[p]] !== mark) {
	                ok = 0;
	              }
	            } // check i and j are identical


	            if (ok) {
	              // absorb j into i
	              cptr[j] = csFlip(i);
	              W[nv + i] += W[nv + j];
	              W[nv + j] = 0; // node j is dead

	              W[elen + j] = -1; // delete j from hash bucket

	              j = W[next + j];
	              W[next + jlast] = j;
	            } else {
	              // j and i are different
	              jlast = j;
	              j = W[next + j];
	            }
	          }
	        }
	      } // Finalize new element. The elimination of node k is nearly complete. All nodes i in Lk are scanned one last time.
	      // Node i is removed from Lk if it is dead. The flagged status of nv[i] is cleared.


	      for (p = pk1, pk = pk1; pk < pk2; pk++) {
	        i = cindex[pk]; // check  i is dead, skip it

	        if ((nvi = -W[nv + i]) <= 0) {
	          continue;
	        } // restore W[nv + i]


	        W[nv + i] = nvi; // compute external degree(i)

	        d = W[degree + i] + dk - nvi;
	        d = Math.min(d, n - nel - nvi);

	        if (W[head + d] !== -1) {
	          last[W[head + d]] = i;
	        } // put i back in degree list


	        W[next + i] = W[head + d];
	        last[i] = -1;
	        W[head + d] = i; // find new minimum degree

	        mindeg = Math.min(mindeg, d);
	        W[degree + i] = d; // place i in Lk

	        cindex[p++] = i;
	      } // # nodes absorbed into k


	      W[nv + k] = nvk; // length of adj list of element k

	      if ((W[len + k] = p - pk1) === 0) {
	        // k is a root of the tree
	        cptr[k] = -1; // k is now a dead element

	        W[w + k] = 0;
	      }

	      if (elenk !== 0) {
	        // free unused space in Lk
	        cnz = p;
	      }
	    } // Postordering. The elimination is complete, but no permutation has been computed. All that is left
	    // of the graph is the assembly tree (ptr) and a set of dead nodes and elements (i is a dead node if
	    // nv[i] is zero and a dead element if nv[i] > 0). It is from this information only that the final permutation
	    // is computed. The tree is restored by unflipping all of ptr.
	    // fix assembly tree


	    for (i = 0; i < n; i++) {
	      cptr[i] = csFlip(cptr[i]);
	    }

	    for (j = 0; j <= n; j++) {
	      W[head + j] = -1;
	    } // place unordered nodes in lists


	    for (j = n; j >= 0; j--) {
	      // skip if j is an element
	      if (W[nv + j] > 0) {
	        continue;
	      } // place j in list of its parent


	      W[next + j] = W[head + cptr[j]];
	      W[head + cptr[j]] = j;
	    } // place elements in lists


	    for (e = n; e >= 0; e--) {
	      // skip unless e is an element
	      if (W[nv + e] <= 0) {
	        continue;
	      }

	      if (cptr[e] !== -1) {
	        // place e in list of its parent
	        W[next + e] = W[head + cptr[e]];
	        W[head + cptr[e]] = e;
	      }
	    } // postorder the assembly tree


	    for (k = 0, i = 0; i <= n; i++) {
	      if (cptr[i] === -1) {
	        k = csTdfs(i, k, W, head, next, P, w);
	      }
	    } // remove last item in array


	    P.splice(P.length - 1, 1); // return P

	    return P;
	  };
	  /**
	   * Creates the matrix that will be used by the approximate minimum degree ordering algorithm. The function accepts the matrix M as input and returns a permutation
	   * vector P. The amd algorithm operates on a symmetrix matrix, so one of three symmetric matrices is formed.
	   *
	   * Order: 0
	   *   A natural ordering P=null matrix is returned.
	   *
	   * Order: 1
	   *   Matrix must be square. This is appropriate for a Cholesky or LU factorization.
	   *   P = M + M'
	   *
	   * Order: 2
	   *   Dense columns from M' are dropped, M recreated from M'. This is appropriatefor LU factorization of unsymmetric matrices.
	   *   P = M' * M
	   *
	   * Order: 3
	   *   This is best used for QR factorization or LU factorization is matrix M has no dense rows. A dense row is a row with more than 10*sqr(columns) entries.
	   *   P = M' * M
	   */


	  function _createTargetMatrix(order, a, m, n, dense) {
	    // compute A'
	    var at = transpose(a); // check order = 1, matrix must be square

	    if (order === 1 && n === m) {
	      // C = A + A'
	      return add(a, at);
	    } // check order = 2, drop dense columns from M'


	    if (order === 2) {
	      // transpose arrays
	      var tindex = at._index;
	      var tptr = at._ptr; // new column index

	      var p2 = 0; // loop A' columns (rows)

	      for (var j = 0; j < m; j++) {
	        // column j of AT starts here
	        var p = tptr[j]; // new column j starts here

	        tptr[j] = p2; // skip dense col j

	        if (tptr[j + 1] - p > dense) {
	          continue;
	        } // map rows in column j of A


	        for (var p1 = tptr[j + 1]; p < p1; p++) {
	          tindex[p2++] = tindex[p];
	        }
	      } // finalize AT


	      tptr[m] = p2; // recreate A from new transpose matrix

	      a = transpose(at); // use A' * A

	      return multiply(at, a);
	    } // use A' * A, square or rectangular matrix


	    return multiply(at, a);
	  }
	  /**
	   * Initialize quotient graph. There are four kind of nodes and elements that must be represented:
	   *
	   *  - A live node is a node i (or a supernode) that has not been selected as a pivot nad has not been merged into another supernode.
	   *  - A dead node i is one that has been removed from the graph, having been absorved into r = flip(ptr[i]).
	   *  - A live element e is one that is in the graph, having been formed when node e was selected as the pivot.
	   *  - A dead element e is one that has benn absorved into a subsequent element s = flip(ptr[e]).
	   */


	  function _initializeQuotientGraph(n, cptr, W, len, head, last, next, hhead, nv, w, elen, degree) {
	    // Initialize quotient graph
	    for (var k = 0; k < n; k++) {
	      W[len + k] = cptr[k + 1] - cptr[k];
	    }

	    W[len + n] = 0; // initialize workspace

	    for (var i = 0; i <= n; i++) {
	      // degree list i is empty
	      W[head + i] = -1;
	      last[i] = -1;
	      W[next + i] = -1; // hash list i is empty

	      W[hhead + i] = -1; // node i is just one node

	      W[nv + i] = 1; // node i is alive

	      W[w + i] = 1; // Ek of node i is empty

	      W[elen + i] = 0; // degree of node i

	      W[degree + i] = W[len + i];
	    } // clear w


	    var mark = _wclear(0, 0, W, w, n); // n is a dead element


	    W[elen + n] = -2; // n is a root of assembly tree

	    cptr[n] = -1; // n is a dead element

	    W[w + n] = 0; // return mark

	    return mark;
	  }
	  /**
	   * Initialize degree lists. Each node is placed in its degree lists. Nodes of zero degree are eliminated immediately. Nodes with
	   * degree >= dense are alsol eliminated and merged into a placeholder node n, a dead element. Thes nodes will appera last in the
	   * output permutation p.
	   */


	  function _initializeDegreeLists(n, cptr, W, degree, elen, w, dense, nv, head, last, next) {
	    // result
	    var nel = 0; // loop columns

	    for (var i = 0; i < n; i++) {
	      // degree @ i
	      var d = W[degree + i]; // check node i is empty

	      if (d === 0) {
	        // element i is dead
	        W[elen + i] = -2;
	        nel++; // i is a root of assembly tree

	        cptr[i] = -1;
	        W[w + i] = 0;
	      } else if (d > dense) {
	        // absorb i into element n
	        W[nv + i] = 0; // node i is dead

	        W[elen + i] = -1;
	        nel++;
	        cptr[i] = csFlip(n);
	        W[nv + n]++;
	      } else {
	        var h = W[head + d];

	        if (h !== -1) {
	          last[h] = i;
	        } // put node i in degree list d


	        W[next + i] = W[head + d];
	        W[head + d] = i;
	      }
	    }

	    return nel;
	  }

	  function _wclear(mark, lemax, W, w, n) {
	    if (mark < 2 || mark + lemax < 0) {
	      for (var k = 0; k < n; k++) {
	        if (W[w + k] !== 0) {
	          W[w + k] = 1;
	        }
	      }

	      mark = 2;
	    } // at this point, W [0..n-1] < mark holds


	    return mark;
	  }

	  function _diag(i, j) {
	    return i !== j;
	  }

	  return csAmd;
	}

	exports.name = 'csAmd';
	exports.path = 'algebra.sparse';
	exports.factory = factory;

/***/ }),
/* 75 */
/***/ (function(module, exports) {

	'use strict';

	function factory() {
	  /**
	   * This function "flips" its input about the integer -1.
	   *
	   * @param {Number}  i               The value to flip
	   *
	   * Reference: http://faculty.cse.tamu.edu/davis/publications.html
	   */
	  var csFlip = function csFlip(i) {
	    // flip the value
	    return -i - 2;
	  };

	  return csFlip;
	}

	exports.name = 'csFlip';
	exports.path = 'algebra.sparse';
	exports.factory = factory;

/***/ }),
/* 76 */
/***/ (function(module, exports) {

	'use strict';

	function factory() {
	  /**
	   * Keeps entries in the matrix when the callback function returns true, removes the entry otherwise
	   *
	   * @param {Matrix}   a              The sparse matrix
	   * @param {function} callback       The callback function, function will be invoked with the following args:
	   *                                    - The entry row
	   *                                    - The entry column
	   *                                    - The entry value
	   *                                    - The state parameter
	   * @param {any}      other          The state
	   *
	   * @return                          The number of nonzero elements in the matrix
	   *
	   * Reference: http://faculty.cse.tamu.edu/davis/publications.html
	   */
	  var csFkeep = function csFkeep(a, callback, other) {
	    // a arrays
	    var avalues = a._values;
	    var aindex = a._index;
	    var aptr = a._ptr;
	    var asize = a._size; // columns

	    var n = asize[1]; // nonzero items

	    var nz = 0; // loop columns

	    for (var j = 0; j < n; j++) {
	      // get current location of col j
	      var p = aptr[j]; // record new location of col j

	      aptr[j] = nz;

	      for (; p < aptr[j + 1]; p++) {
	        // check we need to keep this item
	        if (callback(aindex[p], j, avalues ? avalues[p] : 1, other)) {
	          // keep A(i,j)
	          aindex[nz] = aindex[p]; // check we need to process values (pattern only)

	          if (avalues) {
	            avalues[nz] = avalues[p];
	          } // increment nonzero items


	          nz++;
	        }
	      }
	    } // finalize A


	    aptr[n] = nz; // trim arrays

	    aindex.splice(nz, aindex.length - nz); // check we need to process values (pattern only)

	    if (avalues) {
	      avalues.splice(nz, avalues.length - nz);
	    } // return number of nonzero items


	    return nz;
	  };

	  return csFkeep;
	}

	exports.name = 'csFkeep';
	exports.path = 'algebra.sparse';
	exports.factory = factory;

/***/ }),
/* 77 */
/***/ (function(module, exports) {

	'use strict';

	function factory() {
	  /**
	   * Depth-first search and postorder of a tree rooted at node j
	   *
	   * @param {Number}  j               The tree node
	   * @param {Number}  k
	   * @param {Array}   w               The workspace array
	   * @param {Number}  head            The index offset within the workspace for the head array
	   * @param {Number}  next            The index offset within the workspace for the next array
	   * @param {Array}   post            The post ordering array
	   * @param {Number}  stack           The index offset within the workspace for the stack array
	   *
	   * Reference: http://faculty.cse.tamu.edu/davis/publications.html
	   */
	  var csTdfs = function csTdfs(j, k, w, head, next, post, stack) {
	    // variables
	    var top = 0; // place j on the stack

	    w[stack] = j; // while (stack is not empty)

	    while (top >= 0) {
	      // p = top of stack
	      var p = w[stack + top]; // i = youngest child of p

	      var i = w[head + p];

	      if (i === -1) {
	        // p has no unordered children left
	        top--; // node p is the kth postordered node

	        post[k++] = p;
	      } else {
	        // remove i from children of p
	        w[head + p] = w[next + i]; // increment top

	        ++top; // start dfs on child node i

	        w[stack + top] = i;
	      }
	    }

	    return k;
	  };

	  return csTdfs;
	}

	exports.name = 'csTdfs';
	exports.path = 'algebra.sparse';
	exports.factory = factory;

/***/ }),
/* 78 */
/***/ (function(module, exports) {

	'use strict';

	function factory(type) {
	  var SparseMatrix = type.SparseMatrix;
	  /**
	   * Permutes a sparse matrix C = P * A * Q
	   *
	   * @param {Matrix}  a               The Matrix A
	   * @param {Array}   pinv            The row permutation vector
	   * @param {Array}   q               The column permutation vector
	   * @param {boolean} values          Create a pattern matrix (false), values and pattern otherwise
	   *
	   * @return {Matrix}                 C = P * A * Q, null on error
	   *
	   * Reference: http://faculty.cse.tamu.edu/davis/publications.html
	   */

	  var csPermute = function csPermute(a, pinv, q, values) {
	    // a arrays
	    var avalues = a._values;
	    var aindex = a._index;
	    var aptr = a._ptr;
	    var asize = a._size;
	    var adt = a._datatype; // rows & columns

	    var m = asize[0];
	    var n = asize[1]; // c arrays

	    var cvalues = values && a._values ? [] : null;
	    var cindex = []; // (aptr[n])

	    var cptr = []; // (n + 1)
	    // initialize vars

	    var nz = 0; // loop columns

	    for (var k = 0; k < n; k++) {
	      // column k of C is column q[k] of A
	      cptr[k] = nz; // apply column permutation

	      var j = q ? q[k] : k; // loop values in column j of A

	      for (var t0 = aptr[j], t1 = aptr[j + 1], t = t0; t < t1; t++) {
	        // row i of A is row pinv[i] of C
	        var r = pinv ? pinv[aindex[t]] : aindex[t]; // index

	        cindex[nz] = r; // check we need to populate values

	        if (cvalues) {
	          cvalues[nz] = avalues[t];
	        } // increment number of nonzero elements


	        nz++;
	      }
	    } // finalize the last column of C


	    cptr[n] = nz; // return C matrix

	    return new SparseMatrix({
	      values: cvalues,
	      index: cindex,
	      ptr: cptr,
	      size: [m, n],
	      datatype: adt
	    });
	  };

	  return csPermute;
	}

	exports.name = 'csPermute';
	exports.path = 'algebra.sparse';
	exports.factory = factory;

/***/ }),
/* 79 */
/***/ (function(module, exports) {

	'use strict';

	function factory() {
	  /**
	   * Computes the elimination tree of Matrix A (using triu(A)) or the
	   * elimination tree of A'A without forming A'A.
	   *
	   * @param {Matrix}  a               The A Matrix
	   * @param {boolean} ata             A value of true the function computes the etree of A'A
	   *
	   * Reference: http://faculty.cse.tamu.edu/davis/publications.html
	   */
	  var csEtree = function csEtree(a, ata) {
	    // check inputs
	    if (!a) {
	      return null;
	    } // a arrays


	    var aindex = a._index;
	    var aptr = a._ptr;
	    var asize = a._size; // rows & columns

	    var m = asize[0];
	    var n = asize[1]; // allocate result

	    var parent = []; // (n)
	    // allocate workspace

	    var w = []; // (n + (ata ? m : 0))

	    var ancestor = 0; // first n entries in w

	    var prev = n; // last m entries (ata = true)

	    var i, inext; // check we are calculating A'A

	    if (ata) {
	      // initialize workspace
	      for (i = 0; i < m; i++) {
	        w[prev + i] = -1;
	      }
	    } // loop columns


	    for (var k = 0; k < n; k++) {
	      // node k has no parent yet
	      parent[k] = -1; // nor does k have an ancestor

	      w[ancestor + k] = -1; // values in column k

	      for (var p0 = aptr[k], p1 = aptr[k + 1], p = p0; p < p1; p++) {
	        // row
	        var r = aindex[p]; // node

	        i = ata ? w[prev + r] : r; // traverse from i to k

	        for (; i !== -1 && i < k; i = inext) {
	          // inext = ancestor of i
	          inext = w[ancestor + i]; // path compression

	          w[ancestor + i] = k; // check no anc., parent is k

	          if (inext === -1) {
	            parent[i] = k;
	          }
	        }

	        if (ata) {
	          w[prev + r] = k;
	        }
	      }
	    }

	    return parent;
	  };

	  return csEtree;
	}

	exports.name = 'csEtree';
	exports.path = 'algebra.sparse';
	exports.factory = factory;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function factory(type, config, load) {
	  var csTdfs = load(__webpack_require__(77));
	  /**
	   * Post order a tree of forest
	   *
	   * @param {Array}   parent          The tree or forest
	   * @param {Number}  n               Number of columns
	   *
	   * Reference: http://faculty.cse.tamu.edu/davis/publications.html
	   */

	  var csPost = function csPost(parent, n) {
	    // check inputs
	    if (!parent) {
	      return null;
	    } // vars


	    var k = 0;
	    var j; // allocate result

	    var post = []; // (n)
	    // workspace, head: first n entries, next: next n entries, stack: last n entries

	    var w = []; // (3 * n)

	    var head = 0;
	    var next = n;
	    var stack = 2 * n; // initialize workspace

	    for (j = 0; j < n; j++) {
	      // empty linked lists
	      w[head + j] = -1;
	    } // traverse nodes in reverse order


	    for (j = n - 1; j >= 0; j--) {
	      // check j is a root
	      if (parent[j] === -1) {
	        continue;
	      } // add j to list of its parent


	      w[next + j] = w[head + parent[j]];
	      w[head + parent[j]] = j;
	    } // loop nodes


	    for (j = 0; j < n; j++) {
	      // skip j if it is not a root
	      if (parent[j] !== -1) {
	        continue;
	      } // depth-first search


	      k = csTdfs(j, k, w, head, next, post, stack);
	    }

	    return post;
	  };

	  return csPost;
	}

	exports.name = 'csPost';
	exports.path = 'algebra.sparse';
	exports.factory = factory;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function factory(type, config, load) {
	  var transpose = load(__webpack_require__(70));
	  var csLeaf = load(__webpack_require__(82));
	  /**
	   * Computes the column counts using the upper triangular part of A.
	   * It transposes A internally, none of the input parameters are modified.
	   *
	   * @param {Matrix} a           The sparse matrix A
	   *
	   * @param {Matrix} ata         Count the columns of A'A instead
	   *
	   * @return                     An array of size n of the column counts or null on error
	   *
	   * Reference: http://faculty.cse.tamu.edu/davis/publications.html
	   */

	  var csCounts = function csCounts(a, parent, post, ata) {
	    // check inputs
	    if (!a || !parent || !post) {
	      return null;
	    } // a matrix arrays


	    var asize = a._size; // rows and columns

	    var m = asize[0];
	    var n = asize[1]; // variables

	    var i, j, k, J, p, p0, p1; // workspace size

	    var s = 4 * n + (ata ? n + m + 1 : 0); // allocate workspace

	    var w = []; // (s)

	    var ancestor = 0; // first n entries

	    var maxfirst = n; // next n entries

	    var prevleaf = 2 * n; // next n entries

	    var first = 3 * n; // next n entries

	    var head = 4 * n; // next n + 1 entries (used when ata is true)

	    var next = 5 * n + 1; // last entries in workspace
	    // clear workspace w[0..s-1]

	    for (k = 0; k < s; k++) {
	      w[k] = -1;
	    } // allocate result


	    var colcount = []; // (n)
	    // AT = A'

	    var at = transpose(a); // at arrays

	    var tindex = at._index;
	    var tptr = at._ptr; // find w[first + j]

	    for (k = 0; k < n; k++) {
	      j = post[k]; // colcount[j]=1 if j is a leaf

	      colcount[j] = w[first + j] === -1 ? 1 : 0;

	      for (; j !== -1 && w[first + j] === -1; j = parent[j]) {
	        w[first + j] = k;
	      }
	    } // initialize ata if needed


	    if (ata) {
	      // invert post
	      for (k = 0; k < n; k++) {
	        w[post[k]] = k;
	      } // loop rows (columns in AT)


	      for (i = 0; i < m; i++) {
	        // values in column i of AT
	        for (k = n, p0 = tptr[i], p1 = tptr[i + 1], p = p0; p < p1; p++) {
	          k = Math.min(k, w[tindex[p]]);
	        } // place row i in linked list k


	        w[next + i] = w[head + k];
	        w[head + k] = i;
	      }
	    } // each node in its own set


	    for (i = 0; i < n; i++) {
	      w[ancestor + i] = i;
	    }

	    for (k = 0; k < n; k++) {
	      // j is the kth node in postordered etree
	      j = post[k]; // check j is not a root

	      if (parent[j] !== -1) {
	        colcount[parent[j]]--;
	      } // J=j for LL'=A case


	      for (J = ata ? w[head + k] : j; J !== -1; J = ata ? w[next + J] : -1) {
	        for (p = tptr[J]; p < tptr[J + 1]; p++) {
	          i = tindex[p];
	          var r = csLeaf(i, j, w, first, maxfirst, prevleaf, ancestor); // check A(i,j) is in skeleton

	          if (r.jleaf >= 1) {
	            colcount[j]++;
	          } // check account for overlap in q


	          if (r.jleaf === 2) {
	            colcount[r.q]--;
	          }
	        }
	      }

	      if (parent[j] !== -1) {
	        w[ancestor + j] = parent[j];
	      }
	    } // sum up colcount's of each child


	    for (j = 0; j < n; j++) {
	      if (parent[j] !== -1) {
	        colcount[parent[j]] += colcount[j];
	      }
	    }

	    return colcount;
	  };

	  return csCounts;
	}

	exports.name = 'csCounts';
	exports.path = 'algebra.sparse';
	exports.factory = factory;

/***/ }),
/* 82 */
/***/ (function(module, exports) {

	'use strict';

	function factory() {
	  /**
	   * This function determines if j is a leaf of the ith row subtree.
	   * Consider A(i,j), node j in ith row subtree and return lca(jprev,j)
	   *
	   * @param {Number}  i               The ith row subtree
	   * @param {Number}  j               The node to test
	   * @param {Array}   w               The workspace array
	   * @param {Number}  first           The index offset within the workspace for the first array
	   * @param {Number}  maxfirst        The index offset within the workspace for the maxfirst array
	   * @param {Number}  prevleaf        The index offset within the workspace for the prevleaf array
	   * @param {Number}  ancestor        The index offset within the workspace for the ancestor array
	   *
	   * @return {Object}
	   *
	   * Reference: http://faculty.cse.tamu.edu/davis/publications.html
	   */
	  var csLeaf = function csLeaf(i, j, w, first, maxfirst, prevleaf, ancestor) {
	    var s, sparent, jprev; // our result

	    var jleaf = 0;
	    var q; // check j is a leaf

	    if (i <= j || w[first + j] <= w[maxfirst + i]) {
	      return -1;
	    } // update max first[j] seen so far


	    w[maxfirst + i] = w[first + j]; // jprev = previous leaf of ith subtree

	    jprev = w[prevleaf + i];
	    w[prevleaf + i] = j; // check j is first or subsequent leaf

	    if (jprev === -1) {
	      // 1st leaf, q = root of ith subtree
	      jleaf = 1;
	      q = i;
	    } else {
	      // update jleaf
	      jleaf = 2; // q = least common ancester (jprev,j)

	      for (q = jprev; q !== w[ancestor + q]; q = w[ancestor + q]) {
	        ;
	      }

	      for (s = jprev; s !== q; s = sparent) {
	        // path compression
	        sparent = w[ancestor + s];
	        w[ancestor + s] = q;
	      }
	    }

	    return {
	      jleaf: jleaf,
	      q: q
	    };
	  };

	  return csLeaf;
	}

	exports.name = 'csLeaf';
	exports.path = 'algebra.sparse';
	exports.factory = factory;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function factory(type, config, load) {
	  var abs = load(__webpack_require__(32));
	  var divideScalar = load(__webpack_require__(59));
	  var multiply = load(__webpack_require__(47));
	  var larger = load(__webpack_require__(53));
	  var largerEq = load(__webpack_require__(84));
	  var csSpsolve = load(__webpack_require__(85));
	  var SparseMatrix = type.SparseMatrix;
	  /**
	   * Computes the numeric LU factorization of the sparse matrix A. Implements a Left-looking LU factorization
	   * algorithm that computes L and U one column at a tume. At the kth step, it access columns 1 to k-1 of L
	   * and column k of A. Given the fill-reducing column ordering q (see parameter s) computes L, U and pinv so
	   * L * U = A(p, q), where p is the inverse of pinv.
	   *
	   * @param {Matrix}  m               The A Matrix to factorize
	   * @param {Object}  s               The symbolic analysis from csSqr(). Provides the fill-reducing
	   *                                  column ordering q
	   * @param {Number}  tol             Partial pivoting threshold (1 for partial pivoting)
	   *
	   * @return {Number}                 The numeric LU factorization of A or null
	   *
	   * Reference: http://faculty.cse.tamu.edu/davis/publications.html
	   */

	  var csLu = function csLu(m, s, tol) {
	    // validate input
	    if (!m) {
	      return null;
	    } // m arrays


	    var size = m._size; // columns

	    var n = size[1]; // symbolic analysis result

	    var q;
	    var lnz = 100;
	    var unz = 100; // update symbolic analysis parameters

	    if (s) {
	      q = s.q;
	      lnz = s.lnz || lnz;
	      unz = s.unz || unz;
	    } // L arrays


	    var lvalues = []; // (lnz)

	    var lindex = []; // (lnz)

	    var lptr = []; // (n + 1)
	    // L

	    var L = new SparseMatrix({
	      values: lvalues,
	      index: lindex,
	      ptr: lptr,
	      size: [n, n]
	    }); // U arrays

	    var uvalues = []; // (unz)

	    var uindex = []; // (unz)

	    var uptr = []; // (n + 1)
	    // U

	    var U = new SparseMatrix({
	      values: uvalues,
	      index: uindex,
	      ptr: uptr,
	      size: [n, n]
	    }); // inverse of permutation vector

	    var pinv = []; // (n)
	    // vars

	    var i, p; // allocate arrays

	    var x = []; // (n)

	    var xi = []; // (2 * n)
	    // initialize variables

	    for (i = 0; i < n; i++) {
	      // clear workspace
	      x[i] = 0; // no rows pivotal yet

	      pinv[i] = -1; // no cols of L yet

	      lptr[i + 1] = 0;
	    } // reset number of nonzero elements in L and U


	    lnz = 0;
	    unz = 0; // compute L(:,k) and U(:,k)

	    for (var k = 0; k < n; k++) {
	      // update ptr
	      lptr[k] = lnz;
	      uptr[k] = unz; // apply column permutations if needed

	      var col = q ? q[k] : k; // solve triangular system, x = L\A(:,col)

	      var top = csSpsolve(L, m, col, xi, x, pinv, 1); // find pivot

	      var ipiv = -1;
	      var a = -1; // loop xi[] from top -> n

	      for (p = top; p < n; p++) {
	        // x[i] is nonzero
	        i = xi[p]; // check row i is not yet pivotal

	        if (pinv[i] < 0) {
	          // absolute value of x[i]
	          var xabs = abs(x[i]); // check absoulte value is greater than pivot value

	          if (larger(xabs, a)) {
	            // largest pivot candidate so far
	            a = xabs;
	            ipiv = i;
	          }
	        } else {
	          // x(i) is the entry U(pinv[i],k)
	          uindex[unz] = pinv[i];
	          uvalues[unz++] = x[i];
	        }
	      } // validate we found a valid pivot


	      if (ipiv === -1 || a <= 0) {
	        return null;
	      } // update actual pivot column, give preference to diagonal value


	      if (pinv[col] < 0 && largerEq(abs(x[col]), multiply(a, tol))) {
	        ipiv = col;
	      } // the chosen pivot


	      var pivot = x[ipiv]; // last entry in U(:,k) is U(k,k)

	      uindex[unz] = k;
	      uvalues[unz++] = pivot; // ipiv is the kth pivot row

	      pinv[ipiv] = k; // first entry in L(:,k) is L(k,k) = 1

	      lindex[lnz] = ipiv;
	      lvalues[lnz++] = 1; // L(k+1:n,k) = x / pivot

	      for (p = top; p < n; p++) {
	        // row
	        i = xi[p]; // check x(i) is an entry in L(:,k)

	        if (pinv[i] < 0) {
	          // save unpermuted row in L
	          lindex[lnz] = i; // scale pivot column

	          lvalues[lnz++] = divideScalar(x[i], pivot);
	        } // x[0..n-1] = 0 for next k


	        x[i] = 0;
	      }
	    } // update ptr


	    lptr[n] = lnz;
	    uptr[n] = unz; // fix row indices of L for final pinv

	    for (p = 0; p < lnz; p++) {
	      lindex[p] = pinv[lindex[p]];
	    } // trim arrays


	    lvalues.splice(lnz, lvalues.length - lnz);
	    lindex.splice(lnz, lindex.length - lnz);
	    uvalues.splice(unz, uvalues.length - unz);
	    uindex.splice(unz, uindex.length - unz); // return LU factor

	    return {
	      L: L,
	      U: U,
	      pinv: pinv
	    };
	  };

	  return csLu;
	}

	exports.name = 'csLu';
	exports.path = 'algebra.sparse';
	exports.factory = factory;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var nearlyEqual = __webpack_require__(8).nearlyEqual;

	var bigNearlyEqual = __webpack_require__(41);

	function factory(type, config, load, typed) {
	  var matrix = load(__webpack_require__(34));
	  var algorithm03 = load(__webpack_require__(54));
	  var algorithm07 = load(__webpack_require__(55));
	  var algorithm12 = load(__webpack_require__(56));
	  var algorithm13 = load(__webpack_require__(43));
	  var algorithm14 = load(__webpack_require__(44));

	  var latex = __webpack_require__(36);
	  /**
	   * Test whether value x is larger or equal to y.
	   *
	   * The function returns true when x is larger than y or the relative
	   * difference between x and y is smaller than the configured epsilon. The
	   * function cannot be used to compare values smaller than approximately 2.22e-16.
	   *
	   * For matrices, the function is evaluated element wise.
	   * Strings are compared by their numerical value.
	   *
	   * Syntax:
	   *
	   *    math.largerEq(x, y)
	   *
	   * Examples:
	   *
	   *    math.larger(2, 1 + 1)         // returns false
	   *    math.largerEq(2, 1 + 1)       // returns true
	   *
	   * See also:
	   *
	   *    equal, unequal, smaller, smallerEq, larger, compare
	   *
	   * @param  {number | BigNumber | Fraction | boolean | Unit | string | Array | Matrix} x First value to compare
	   * @param  {number | BigNumber | Fraction | boolean | Unit | string | Array | Matrix} y Second value to compare
	   * @return {boolean | Array | Matrix} Returns true when the x is larger or equal to y, else returns false
	   */


	  var largerEq = typed('largerEq', {
	    'boolean, boolean': function booleanBoolean(x, y) {
	      return x >= y;
	    },
	    'number, number': function numberNumber(x, y) {
	      return x >= y || nearlyEqual(x, y, config.epsilon);
	    },
	    'BigNumber, BigNumber': function BigNumberBigNumber(x, y) {
	      return x.gte(y) || bigNearlyEqual(x, y, config.epsilon);
	    },
	    'Fraction, Fraction': function FractionFraction(x, y) {
	      return x.compare(y) !== -1;
	    },
	    'Complex, Complex': function ComplexComplex() {
	      throw new TypeError('No ordering relation is defined for complex numbers');
	    },
	    'Unit, Unit': function UnitUnit(x, y) {
	      if (!x.equalBase(y)) {
	        throw new Error('Cannot compare units with different base');
	      }

	      return largerEq(x.value, y.value);
	    },
	    'SparseMatrix, SparseMatrix': function SparseMatrixSparseMatrix(x, y) {
	      return algorithm07(x, y, largerEq);
	    },
	    'SparseMatrix, DenseMatrix': function SparseMatrixDenseMatrix(x, y) {
	      return algorithm03(y, x, largerEq, true);
	    },
	    'DenseMatrix, SparseMatrix': function DenseMatrixSparseMatrix(x, y) {
	      return algorithm03(x, y, largerEq, false);
	    },
	    'DenseMatrix, DenseMatrix': function DenseMatrixDenseMatrix(x, y) {
	      return algorithm13(x, y, largerEq);
	    },
	    'Array, Array': function ArrayArray(x, y) {
	      // use matrix implementation
	      return largerEq(matrix(x), matrix(y)).valueOf();
	    },
	    'Array, Matrix': function ArrayMatrix(x, y) {
	      // use matrix implementation
	      return largerEq(matrix(x), y);
	    },
	    'Matrix, Array': function MatrixArray(x, y) {
	      // use matrix implementation
	      return largerEq(x, matrix(y));
	    },
	    'SparseMatrix, any': function SparseMatrixAny(x, y) {
	      return algorithm12(x, y, largerEq, false);
	    },
	    'DenseMatrix, any': function DenseMatrixAny(x, y) {
	      return algorithm14(x, y, largerEq, false);
	    },
	    'any, SparseMatrix': function anySparseMatrix(x, y) {
	      return algorithm12(y, x, largerEq, true);
	    },
	    'any, DenseMatrix': function anyDenseMatrix(x, y) {
	      return algorithm14(y, x, largerEq, true);
	    },
	    'Array, any': function ArrayAny(x, y) {
	      // use matrix implementation
	      return algorithm14(matrix(x), y, largerEq, false).valueOf();
	    },
	    'any, Array': function anyArray(x, y) {
	      // use matrix implementation
	      return algorithm14(matrix(y), x, largerEq, true).valueOf();
	    }
	  });
	  largerEq.toTex = {
	    2: "\\left(${args[0]}".concat(latex.operators['largerEq'], "${args[1]}\\right)")
	  };
	  return largerEq;
	}

	exports.name = 'largerEq';
	exports.factory = factory;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function factory(type, config, load) {
	  var divideScalar = load(__webpack_require__(59));
	  var multiply = load(__webpack_require__(47));
	  var subtract = load(__webpack_require__(65));
	  var csReach = load(__webpack_require__(86));
	  /**
	   * The function csSpsolve() computes the solution to G * x = bk, where bk is the
	   * kth column of B. When lo is true, the function assumes G = L is lower triangular with the
	   * diagonal entry as the first entry in each column. When lo is true, the function assumes G = U
	   * is upper triangular with the diagonal entry as the last entry in each column.
	   *
	   * @param {Matrix}  g               The G matrix
	   * @param {Matrix}  b               The B matrix
	   * @param {Number}  k               The kth column in B
	   * @param {Array}   xi              The nonzero pattern xi[top] .. xi[n - 1], an array of size = 2 * n
	   *                                  The first n entries is the nonzero pattern, the last n entries is the stack
	   * @param {Array}   x               The soluton to the linear system G * x = b
	   * @param {Array}   pinv            The inverse row permutation vector, must be null for L * x = b
	   * @param {boolean} lo              The lower (true) upper triangular (false) flag
	   *
	   * @return {Number}                 The index for the nonzero pattern
	   *
	   * Reference: http://faculty.cse.tamu.edu/davis/publications.html
	   */

	  var csSpsolve = function csSpsolve(g, b, k, xi, x, pinv, lo) {
	    // g arrays
	    var gvalues = g._values;
	    var gindex = g._index;
	    var gptr = g._ptr;
	    var gsize = g._size; // columns

	    var n = gsize[1]; // b arrays

	    var bvalues = b._values;
	    var bindex = b._index;
	    var bptr = b._ptr; // vars

	    var p, p0, p1, q; // xi[top..n-1] = csReach(B(:,k))

	    var top = csReach(g, b, k, xi, pinv); // clear x

	    for (p = top; p < n; p++) {
	      x[xi[p]] = 0;
	    } // scatter b


	    for (p0 = bptr[k], p1 = bptr[k + 1], p = p0; p < p1; p++) {
	      x[bindex[p]] = bvalues[p];
	    } // loop columns


	    for (var px = top; px < n; px++) {
	      // x array index for px
	      var j = xi[px]; // apply permutation vector (U x = b), j maps to column J of G

	      var J = pinv ? pinv[j] : j; // check column J is empty

	      if (J < 0) {
	        continue;
	      } // column value indeces in G, p0 <= p < p1


	      p0 = gptr[J];
	      p1 = gptr[J + 1]; // x(j) /= G(j,j)

	      x[j] = divideScalar(x[j], gvalues[lo ? p0 : p1 - 1]); // first entry L(j,j)

	      p = lo ? p0 + 1 : p0;
	      q = lo ? p1 : p1 - 1; // loop

	      for (; p < q; p++) {
	        // row
	        var i = gindex[p]; // x(i) -= G(i,j) * x(j)

	        x[i] = subtract(x[i], multiply(gvalues[p], x[j]));
	      }
	    } // return top of stack


	    return top;
	  };

	  return csSpsolve;
	}

	exports.name = 'csSpsolve';
	exports.path = 'algebra.sparse';
	exports.factory = factory;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function factory(type, config, load) {
	  var csDfs = load(__webpack_require__(87));
	  var csMarked = load(__webpack_require__(88));
	  var csMark = load(__webpack_require__(89));
	  /**
	   * The csReach function computes X = Reach(B), where B is the nonzero pattern of the n-by-1
	   * sparse column of vector b. The function returns the set of nodes reachable from any node in B. The
	   * nonzero pattern xi of the solution x to the sparse linear system Lx=b is given by X=Reach(B).
	   *
	   * @param {Matrix}  g               The G matrix
	   * @param {Matrix}  b               The B matrix
	   * @param {Number}  k               The kth column in B
	   * @param {Array}   xi              The nonzero pattern xi[top] .. xi[n - 1], an array of size = 2 * n
	   *                                  The first n entries is the nonzero pattern, the last n entries is the stack
	   * @param {Array}   pinv            The inverse row permutation vector
	   *
	   * @return {Number}                 The index for the nonzero pattern
	   *
	   * Reference: http://faculty.cse.tamu.edu/davis/publications.html
	   */

	  var csReach = function csReach(g, b, k, xi, pinv) {
	    // g arrays
	    var gptr = g._ptr;
	    var gsize = g._size; // b arrays

	    var bindex = b._index;
	    var bptr = b._ptr; // columns

	    var n = gsize[1]; // vars

	    var p, p0, p1; // initialize top

	    var top = n; // loop column indeces in B

	    for (p0 = bptr[k], p1 = bptr[k + 1], p = p0; p < p1; p++) {
	      // node i
	      var i = bindex[p]; // check node i is marked

	      if (!csMarked(gptr, i)) {
	        // start a dfs at unmarked node i
	        top = csDfs(i, g, top, xi, pinv);
	      }
	    } // loop columns from top -> n - 1


	    for (p = top; p < n; p++) {
	      // restore G
	      csMark(gptr, xi[p]);
	    }

	    return top;
	  };

	  return csReach;
	}

	exports.name = 'csReach';
	exports.path = 'algebra.sparse';
	exports.factory = factory;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function factory(type, config, load) {
	  var csMarked = load(__webpack_require__(88));
	  var csMark = load(__webpack_require__(89));
	  var csUnflip = load(__webpack_require__(90));
	  /**
	   * Depth-first search computes the nonzero pattern xi of the directed graph G (Matrix) starting
	   * at nodes in B (see csReach()).
	   *
	   * @param {Number}  j               The starting node for the DFS algorithm
	   * @param {Matrix}  g               The G matrix to search, ptr array modified, then restored
	   * @param {Number}  top             Start index in stack xi[top..n-1]
	   * @param {Number}  k               The kth column in B
	   * @param {Array}   xi              The nonzero pattern xi[top] .. xi[n - 1], an array of size = 2 * n
	   *                                  The first n entries is the nonzero pattern, the last n entries is the stack
	   * @param {Array}   pinv            The inverse row permutation vector, must be null for L * x = b
	   *
	   * @return {Number}                 New value of top
	   *
	   * Reference: http://faculty.cse.tamu.edu/davis/publications.html
	   */

	  var csDfs = function csDfs(j, g, top, xi, pinv) {
	    // g arrays
	    var index = g._index;
	    var ptr = g._ptr;
	    var size = g._size; // columns

	    var n = size[1]; // vars

	    var i, p, p2; // initialize head

	    var head = 0; // initialize the recursion stack

	    xi[0] = j; // loop

	    while (head >= 0) {
	      // get j from the top of the recursion stack
	      j = xi[head]; // apply permutation vector

	      var jnew = pinv ? pinv[j] : j; // check node j is marked

	      if (!csMarked(ptr, j)) {
	        // mark node j as visited
	        csMark(ptr, j); // update stack (last n entries in xi)

	        xi[n + head] = jnew < 0 ? 0 : csUnflip(ptr[jnew]);
	      } // node j done if no unvisited neighbors


	      var done = 1; // examine all neighbors of j, stack (last n entries in xi)

	      for (p = xi[n + head], p2 = jnew < 0 ? 0 : csUnflip(ptr[jnew + 1]); p < p2; p++) {
	        // consider neighbor node i
	        i = index[p]; // check we have visited node i, skip it

	        if (csMarked(ptr, i)) {
	          continue;
	        } // pause depth-first search of node j, update stack (last n entries in xi)


	        xi[n + head] = p; // start dfs at node i

	        xi[++head] = i; // node j is not done

	        done = 0; // break, to start dfs(i)

	        break;
	      } // check depth-first search at node j is done


	      if (done) {
	        // remove j from the recursion stack
	        head--; // and place in the output stack

	        xi[--top] = j;
	      }
	    }

	    return top;
	  };

	  return csDfs;
	}

	exports.name = 'csDfs';
	exports.path = 'algebra.sparse';
	exports.factory = factory;

/***/ }),
/* 88 */
/***/ (function(module, exports) {

	'use strict';

	function factory() {
	  /**
	   * Checks if the node at w[j] is marked
	   *
	   * @param {Array}   w               The array
	   * @param {Number}  j               The array index
	   *
	   * Reference: http://faculty.cse.tamu.edu/davis/publications.html
	   */
	  var csMarked = function csMarked(w, j) {
	    // check node is marked
	    return w[j] < 0;
	  };

	  return csMarked;
	}

	exports.name = 'csMarked';
	exports.path = 'algebra.sparse';
	exports.factory = factory;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function factory(type, config, load) {
	  var csFlip = load(__webpack_require__(75));
	  /**
	   * Marks the node at w[j]
	   *
	   * @param {Array}   w               The array
	   * @param {Number}  j               The array index
	   *
	   * Reference: http://faculty.cse.tamu.edu/davis/publications.html
	   */

	  var csMark = function csMark(w, j) {
	    // mark w[j]
	    w[j] = csFlip(w[j]);
	  };

	  return csMark;
	}

	exports.name = 'csMark';
	exports.path = 'algebra.sparse';
	exports.factory = factory;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function factory(type, config, load) {
	  var csFlip = load(__webpack_require__(75));
	  /**
	   * Flips the value if it is negative of returns the same value otherwise.
	   *
	   * @param {Number}  i               The value to flip
	   *
	   * Reference: http://faculty.cse.tamu.edu/davis/publications.html
	   */

	  var csUnflip = function csUnflip(i) {
	    // flip the value if it is negative
	    return i < 0 ? csFlip(i) : i;
	  };

	  return csUnflip;
	}

	exports.name = 'csUnflip';
	exports.path = 'algebra.sparse';
	exports.factory = factory;

/***/ }),
/* 91 */
/***/ (function(module, exports) {

	'use strict';

	function factory() {
	  /**
	   * Permutes a vector; x = P'b. In MATLAB notation, x(p)=b.
	   *
	   * @param {Array} p           The permutation vector of length n. null value denotes identity
	   * @param {Array} b           The input vector
	   *
	   * @return {Array}            The output vector x = P'b
	   */
	  function csIpvec(p, b) {
	    // vars
	    var k;
	    var n = b.length;
	    var x = []; // check permutation vector was provided, p = null denotes identity

	    if (p) {
	      // loop vector
	      for (k = 0; k < n; k++) {
	        // apply permutation
	        x[p[k]] = b[k];
	      }
	    } else {
	      // loop vector
	      for (k = 0; k < n; k++) {
	        // x[i] = b[i]
	        x[k] = b[k];
	      }
	    }

	    return x;
	  }

	  return csIpvec;
	}

	exports.name = 'csIpvec';
	exports.path = 'algebra.sparse';
	exports.factory = factory;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(16);

	var string = util.string;
	var array = util.array;
	var isArray = Array.isArray;

	function factory(type) {
	  var DenseMatrix = type.DenseMatrix;
	  /**
	   * Validates matrix and column vector b for backward/forward substitution algorithms.
	   *
	   * @param {Matrix} m            An N x N matrix
	   * @param {Array | Matrix} b    A column vector
	   * @param {Boolean} copy        Return a copy of vector b
	   *
	   * @return {DenseMatrix}        Dense column vector b
	   */

	  var solveValidation = function solveValidation(m, b, copy) {
	    // matrix size
	    var size = m.size(); // validate matrix dimensions

	    if (size.length !== 2) {
	      throw new RangeError('Matrix must be two dimensional (size: ' + string.format(size) + ')');
	    } // rows & columns


	    var rows = size[0];
	    var columns = size[1]; // validate rows & columns

	    if (rows !== columns) {
	      throw new RangeError('Matrix must be square (size: ' + string.format(size) + ')');
	    } // vars


	    var data, i, bdata; // check b is matrix

	    if (type.isMatrix(b)) {
	      // matrix size
	      var msize = b.size(); // vector

	      if (msize.length === 1) {
	        // check vector length
	        if (msize[0] !== rows) {
	          throw new RangeError('Dimension mismatch. Matrix columns must match vector length.');
	        } // create data array


	        data = []; // matrix data (DenseMatrix)

	        bdata = b._data; // loop b data

	        for (i = 0; i < rows; i++) {
	          // row array
	          data[i] = [bdata[i]];
	        } // return Dense Matrix


	        return new DenseMatrix({
	          data: data,
	          size: [rows, 1],
	          datatype: b._datatype
	        });
	      } // two dimensions


	      if (msize.length === 2) {
	        // array must be a column vector
	        if (msize[0] !== rows || msize[1] !== 1) {
	          throw new RangeError('Dimension mismatch. Matrix columns must match vector length.');
	        } // check matrix type


	        if (type.isDenseMatrix(b)) {
	          // check a copy is needed
	          if (copy) {
	            // create data array
	            data = []; // matrix data (DenseMatrix)

	            bdata = b._data; // loop b data

	            for (i = 0; i < rows; i++) {
	              // row array
	              data[i] = [bdata[i][0]];
	            } // return Dense Matrix


	            return new DenseMatrix({
	              data: data,
	              size: [rows, 1],
	              datatype: b._datatype
	            });
	          } // b is already a column vector


	          return b;
	        } // create data array


	        data = [];

	        for (i = 0; i < rows; i++) {
	          data[i] = [0];
	        } // sparse matrix arrays


	        var values = b._values;
	        var index = b._index;
	        var ptr = b._ptr; // loop values in column 0

	        for (var k1 = ptr[1], k = ptr[0]; k < k1; k++) {
	          // row
	          i = index[k]; // add to data

	          data[i][0] = values[k];
	        } // return Dense Matrix


	        return new DenseMatrix({
	          data: data,
	          size: [rows, 1],
	          datatype: b._datatype
	        });
	      } // throw error


	      throw new RangeError('Dimension mismatch. Matrix columns must match vector length.');
	    } // check b is array


	    if (isArray(b)) {
	      // size
	      var asize = array.size(b); // check matrix dimensions, vector

	      if (asize.length === 1) {
	        // check vector length
	        if (asize[0] !== rows) {
	          throw new RangeError('Dimension mismatch. Matrix columns must match vector length.');
	        } // create data array


	        data = []; // loop b

	        for (i = 0; i < rows; i++) {
	          // row array
	          data[i] = [b[i]];
	        } // return Dense Matrix


	        return new DenseMatrix({
	          data: data,
	          size: [rows, 1]
	        });
	      }

	      if (asize.length === 2) {
	        // array must be a column vector
	        if (asize[0] !== rows || asize[1] !== 1) {
	          throw new RangeError('Dimension mismatch. Matrix columns must match vector length.');
	        } // create data array


	        data = []; // loop b data

	        for (i = 0; i < rows; i++) {
	          // row array
	          data[i] = [b[i][0]];
	        } // return Dense Matrix


	        return new DenseMatrix({
	          data: data,
	          size: [rows, 1]
	        });
	      } // throw error


	      throw new RangeError('Dimension mismatch. Matrix columns must match vector length.');
	    }
	  };

	  return solveValidation;
	}

	exports.factory = factory;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function factory(type, config, load, typed) {
	  var matrix = load(__webpack_require__(34));
	  var divideScalar = load(__webpack_require__(59));
	  var multiplyScalar = load(__webpack_require__(48));
	  var subtract = load(__webpack_require__(65));
	  var equalScalar = load(__webpack_require__(40));
	  var solveValidation = load(__webpack_require__(92));
	  var DenseMatrix = type.DenseMatrix;
	  /**
	   * Solves the linear equation system by backward substitution. Matrix must be an upper triangular matrix.
	   *
	   * `U * x = b`
	   *
	   * Syntax:
	   *
	   *    math.usolve(U, b)
	   *
	   * Examples:
	   *
	   *    const a = [[-2, 3], [2, 1]]
	   *    const b = [11, 9]
	   *    const x = usolve(a, b)  // [[8], [9]]
	   *
	   * See also:
	   *
	   *    lup, slu, usolve, lusolve
	   *
	   * @param {Matrix, Array} U       A N x N matrix or array (U)
	   * @param {Matrix, Array} b       A column vector with the b values
	   *
	   * @return {DenseMatrix | Array}  A column vector with the linear system solution (x)
	   */

	  var usolve = typed('usolve', {
	    'SparseMatrix, Array | Matrix': function SparseMatrixArrayMatrix(m, b) {
	      // process matrix
	      return _sparseBackwardSubstitution(m, b);
	    },
	    'DenseMatrix, Array | Matrix': function DenseMatrixArrayMatrix(m, b) {
	      // process matrix
	      return _denseBackwardSubstitution(m, b);
	    },
	    'Array, Array | Matrix': function ArrayArrayMatrix(a, b) {
	      // create dense matrix from array
	      var m = matrix(a); // use matrix implementation

	      var r = _denseBackwardSubstitution(m, b); // result


	      return r.valueOf();
	    }
	  });

	  function _denseBackwardSubstitution(m, b) {
	    // validate matrix and vector, return copy of column vector b
	    b = solveValidation(m, b, true); // column vector data

	    var bdata = b._data; // rows & columns

	    var rows = m._size[0];
	    var columns = m._size[1]; // result

	    var x = []; // arrays

	    var data = m._data; // backward solve m * x = b, loop columns (backwards)

	    for (var j = columns - 1; j >= 0; j--) {
	      // b[j]
	      var bj = bdata[j][0] || 0; // x[j]

	      var xj = void 0; // backward substitution (outer product) avoids inner looping when bj === 0

	      if (!equalScalar(bj, 0)) {
	        // value @ [j, j]
	        var vjj = data[j][j]; // check vjj

	        if (equalScalar(vjj, 0)) {
	          // system cannot be solved
	          throw new Error('Linear system cannot be solved since matrix is singular');
	        } // calculate xj


	        xj = divideScalar(bj, vjj); // loop rows

	        for (var i = j - 1; i >= 0; i--) {
	          // update copy of b
	          bdata[i] = [subtract(bdata[i][0] || 0, multiplyScalar(xj, data[i][j]))];
	        }
	      } else {
	        // zero value @ j
	        xj = 0;
	      } // update x


	      x[j] = [xj];
	    } // return column vector


	    return new DenseMatrix({
	      data: x,
	      size: [rows, 1]
	    });
	  }

	  function _sparseBackwardSubstitution(m, b) {
	    // validate matrix and vector, return copy of column vector b
	    b = solveValidation(m, b, true); // column vector data

	    var bdata = b._data; // rows & columns

	    var rows = m._size[0];
	    var columns = m._size[1]; // matrix arrays

	    var values = m._values;
	    var index = m._index;
	    var ptr = m._ptr; // vars

	    var i, k; // result

	    var x = []; // backward solve m * x = b, loop columns (backwards)

	    for (var j = columns - 1; j >= 0; j--) {
	      // b[j]
	      var bj = bdata[j][0] || 0; // backward substitution (outer product) avoids inner looping when bj === 0

	      if (!equalScalar(bj, 0)) {
	        // value @ [j, j]
	        var vjj = 0; // upper triangular matrix values & index (column j)

	        var jvalues = [];
	        var jindex = []; // first & last indeces in column

	        var f = ptr[j];
	        var l = ptr[j + 1]; // values in column, find value @ [j, j], loop backwards

	        for (k = l - 1; k >= f; k--) {
	          // row
	          i = index[k]; // check row

	          if (i === j) {
	            // update vjj
	            vjj = values[k];
	          } else if (i < j) {
	            // store upper triangular
	            jvalues.push(values[k]);
	            jindex.push(i);
	          }
	        } // at this point we must have a value @ [j, j]


	        if (equalScalar(vjj, 0)) {
	          // system cannot be solved, there is no value @ [j, j]
	          throw new Error('Linear system cannot be solved since matrix is singular');
	        } // calculate xj


	        var xj = divideScalar(bj, vjj); // loop upper triangular

	        for (k = 0, l = jindex.length; k < l; k++) {
	          // row
	          i = jindex[k]; // update copy of b

	          bdata[i] = [subtract(bdata[i][0], multiplyScalar(xj, jvalues[k]))];
	        } // update x


	        x[j] = [xj];
	      } else {
	        // update x
	        x[j] = [0];
	      }
	    } // return vector


	    return new DenseMatrix({
	      data: x,
	      size: [rows, 1]
	    });
	  }

	  return usolve;
	}

	exports.name = 'usolve';
	exports.factory = factory;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function factory(type, config, load, typed) {
	  var matrix = load(__webpack_require__(34));
	  var divideScalar = load(__webpack_require__(59));
	  var multiplyScalar = load(__webpack_require__(48));
	  var subtract = load(__webpack_require__(65));
	  var equalScalar = load(__webpack_require__(40));
	  var solveValidation = load(__webpack_require__(92));
	  var DenseMatrix = type.DenseMatrix;
	  /**
	   * Solves the linear equation system by forwards substitution. Matrix must be a lower triangular matrix.
	   *
	   * `L * x = b`
	   *
	   * Syntax:
	   *
	   *    math.lsolve(L, b)
	   *
	   * Examples:
	   *
	   *    const a = [[-2, 3], [2, 1]]
	   *    const b = [11, 9]
	   *    const x = lsolve(a, b)  // [[-5.5], [20]]
	   *
	   * See also:
	   *
	   *    lup, slu, usolve, lusolve
	   *
	   * @param {Matrix, Array} L       A N x N matrix or array (L)
	   * @param {Matrix, Array} b       A column vector with the b values
	   *
	   * @return {DenseMatrix | Array}  A column vector with the linear system solution (x)
	   */

	  var lsolve = typed('lsolve', {
	    'SparseMatrix, Array | Matrix': function SparseMatrixArrayMatrix(m, b) {
	      // process matrix
	      return _sparseForwardSubstitution(m, b);
	    },
	    'DenseMatrix, Array | Matrix': function DenseMatrixArrayMatrix(m, b) {
	      // process matrix
	      return _denseForwardSubstitution(m, b);
	    },
	    'Array, Array | Matrix': function ArrayArrayMatrix(a, b) {
	      // create dense matrix from array
	      var m = matrix(a); // use matrix implementation

	      var r = _denseForwardSubstitution(m, b); // result


	      return r.valueOf();
	    }
	  });

	  function _denseForwardSubstitution(m, b) {
	    // validate matrix and vector, return copy of column vector b
	    b = solveValidation(m, b, true); // column vector data

	    var bdata = b._data; // rows & columns

	    var rows = m._size[0];
	    var columns = m._size[1]; // result

	    var x = []; // data

	    var data = m._data; // forward solve m * x = b, loop columns

	    for (var j = 0; j < columns; j++) {
	      // b[j]
	      var bj = bdata[j][0] || 0; // x[j]

	      var xj = void 0; // forward substitution (outer product) avoids inner looping when bj === 0

	      if (!equalScalar(bj, 0)) {
	        // value @ [j, j]
	        var vjj = data[j][j]; // check vjj

	        if (equalScalar(vjj, 0)) {
	          // system cannot be solved
	          throw new Error('Linear system cannot be solved since matrix is singular');
	        } // calculate xj


	        xj = divideScalar(bj, vjj); // loop rows

	        for (var i = j + 1; i < rows; i++) {
	          // update copy of b
	          bdata[i] = [subtract(bdata[i][0] || 0, multiplyScalar(xj, data[i][j]))];
	        }
	      } else {
	        // zero @ j
	        xj = 0;
	      } // update x


	      x[j] = [xj];
	    } // return vector


	    return new DenseMatrix({
	      data: x,
	      size: [rows, 1]
	    });
	  }

	  function _sparseForwardSubstitution(m, b) {
	    // validate matrix and vector, return copy of column vector b
	    b = solveValidation(m, b, true); // column vector data

	    var bdata = b._data; // rows & columns

	    var rows = m._size[0];
	    var columns = m._size[1]; // matrix arrays

	    var values = m._values;
	    var index = m._index;
	    var ptr = m._ptr; // vars

	    var i, k; // result

	    var x = []; // forward solve m * x = b, loop columns

	    for (var j = 0; j < columns; j++) {
	      // b[j]
	      var bj = bdata[j][0] || 0; // forward substitution (outer product) avoids inner looping when bj === 0

	      if (!equalScalar(bj, 0)) {
	        // value @ [j, j]
	        var vjj = 0; // lower triangular matrix values & index (column j)

	        var jvalues = [];
	        var jindex = []; // last index in column

	        var l = ptr[j + 1]; // values in column, find value @ [j, j]

	        for (k = ptr[j]; k < l; k++) {
	          // row
	          i = index[k]; // check row (rows are not sorted!)

	          if (i === j) {
	            // update vjj
	            vjj = values[k];
	          } else if (i > j) {
	            // store lower triangular
	            jvalues.push(values[k]);
	            jindex.push(i);
	          }
	        } // at this point we must have a value @ [j, j]


	        if (equalScalar(vjj, 0)) {
	          // system cannot be solved, there is no value @ [j, j]
	          throw new Error('Linear system cannot be solved since matrix is singular');
	        } // calculate xj


	        var xj = divideScalar(bj, vjj); // loop lower triangular

	        for (k = 0, l = jindex.length; k < l; k++) {
	          // row
	          i = jindex[k]; // update copy of b

	          bdata[i] = [subtract(bdata[i][0] || 0, multiplyScalar(xj, jvalues[k]))];
	        } // update x


	        x[j] = [xj];
	      } else {
	        // update x
	        x[j] = [0];
	      }
	    } // return vector


	    return new DenseMatrix({
	      data: x,
	      size: [rows, 1]
	    });
	  }

	  return lsolve;
	}

	exports.name = 'lsolve';
	exports.factory = factory;

/***/ })
/******/ ])
});
;