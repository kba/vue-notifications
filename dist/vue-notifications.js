(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("VueNotifications", [], factory);
	else if(typeof exports === 'object')
		exports["VueNotifications"] = factory();
	else
		root["VueNotifications"] = factory();
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _keys = __webpack_require__(1);

	var _keys2 = _interopRequireDefault(_keys);

	var _classCallCheck2 = __webpack_require__(13);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(14);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _override = __webpack_require__(18);

	var _override2 = _interopRequireDefault(_override);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var PLUGIN_NAME = 'VueNotifications';
	var PACKAGE_NAME = 'vue-notifications';
	var PROPERTY_NAME = 'notifications';

	var STYLE = {
	  error: '-error',
	  warn: '-warn',
	  info: '-info',
	  success: '-success'
	};

	var STATE = {
	  /**
	   * @param  {Object} Vue
	   */
	  getVersion: function getVersion(Vue) {
	    var version = Vue.version.match(/(\d+)/g);
	    return {
	      major: version[0],
	      regular: version[1],
	      minor: version[2]
	    };
	  },

	  /**
	   * @param  {Object} Vue
	   * @param  {Number} majorNum
	   */
	  isVueVersion: function isVueVersion(Vue, majorNum) {
	    return this.getVersion(Vue).major == majorNum;
	  }
	};

	var VUE_VERSION = {
	  evangelion: 1,
	  ghostInTheShell: 2
	};

	var MESSAGES = {
	  alreadyInstalled: PLUGIN_NAME + ': plugin already installed'
	};

	var EVENTS = {
	  initiated: PACKAGE_NAME + '-initiated',
	  installed: PACKAGE_NAME + '-installed'
	};

	var Notification = function () {
	  /**
	   * @param  {Object} obj
	   */
	  function Notification(obj) {
	    (0, _classCallCheck3['default'])(this, Notification);

	    this.type = obj.type;
	    this.isVisible = obj.isVisible;
	    this.timeOut = obj.timeOut;
	  }

	  (0, _createClass3['default'])(Notification, [{
	    key: 'show',
	    value: function show() {
	      console.log(1111);
	    }
	  }]);
	  return Notification;
	}();

	/**
	 * @param  {String} msg
	 * @param  {String} style
	 */


	function showMessage(msg, style) {
	  if (style === STYLE.error) return console.error(msg);
	  if (style === STYLE.warn) return console.warn(msg);
	  if (style === STYLE.info) return console.log(msg);
	  if (style === STYLE.success) return console.info(msg);
	}

	/**
	 * @param  {String} hook
	 */
	function patchNotifications(hook) {
	  if (hook == 'created') {

	    // getAllNotifications(this).map((v, k)=> {
	    // getAllNotifications(this).forEach((v, i, arr)=> {
	    console.info(this);
	    var notifications = getAllNotifications(this);

	    for (var k in notifications) {
	      if (notifications.hasOwnProperty(k)) {
	        console.log(this);
	        console.info(this.methods);
	      }
	    }
	    // => {
	    //   console.info(v)
	    //   console.info(i)
	    //   console.info(arr)
	    //   // Object.setPrototypeOf(v, Notification)
	    //   // v.prototype = Notification
	    //   // console.info(v.show)
	    //   // return new Notification(v)
	    // })
	  }
	  this.__callHook(hook);
	}

	/**
	 * @param  {Object} instance
	 */
	function getAllNotifications(instance) {
	  if (!instance) return {};
	  var obj = instance.$options[PROPERTY_NAME];
	  if (!obj) return {};
	  console.info(obj);
	  return obj;
	  // return Object.values(obj)
	}

	/**
	 * Plugin | vue-notifications
	 * @param  {Function} Vue
	 * @param  {Object} options
	 */
	var VueNotifications = {
	  installed: false,
	  install: function install(Vue) {
	    var _this = this;

	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    // override(Vue, PROPERTY_NAME)

	    if (this.installed) throw console.error(MESSAGES.alreadyInstalled);

	    // Vue.successMsg = msg => showMessage(msg, STYLE.success)
	    // Vue.prototype.$infoMsg = msg => showMessage(msg, STYLE.success)
	    // Vue.prototype.$errorMsg = msg => showMessage(msg, STYLE.success)
	    // Vue.prototype.$warnMsg = msg => showMessage(msg, STYLE.success)

	    // patchNotifications(Vue.prototype)
	    // var p = Vue.prototype;
	    // p.__callHook = p._callHook;
	    // p._callHook = function (hook) {
	    //   if (hook == 'created') {
	    //     var self = this;
	    //
	    //     // const notifications = this.$options[PROPERTY_NAME]
	    //     const notifications = this.$options['notifications']
	    //     console.info(notifications)
	    //     Object.values(notifications).map((v,k) => {
	    //       console.info(123)
	    //     })
	    //   }
	    //   this.__callHook(hook);
	    // }

	    // var p = Vue.prototype;
	    // p.__callHook = p._callHook;
	    // p._callHook = patchNotifications

	    function init() {
	      console.info('init');
	      var notifications = this.$options[PROPERTY_NAME];
	      if (!notifications) return;

	      (0, _keys2['default'])(notifications).map(function (key) {
	        console.info(key);
	        var prop = notifications[key];
	        if (!prop) return;
	        // let obj = (typeof prop === 'function') ? notifications[key].bind(this)() : notifications[key]
	        // if (key === 'title') {
	        //   util[key](obj)
	        //   return
	        // }
	        // util.handle(obj, key, 'head', update)
	      });

	      this.$emit(EVENTS.initiated);
	    }

	    var mixin = {}
	    // destroyed () {
	    //   // destroy(this.$options.head)
	    // },
	    // events: {
	    //   // updateHead () {
	    //   //   init.bind(this)(true)
	    //   //   util.update()
	    //   // }
	    // }


	    // v1
	    ;if (STATE.isVueVersion(Vue, VUE_VERSION.evangelion)) {
	      console.info('eva');
	      mixin.ready = function () {
	        console.info(Vue);
	        init.bind(_this);
	        // init.bind(Vue)()
	      };
	    }

	    //v2
	    // if (STATE.isVueVersion(Vue, VUE_VERSION.ghostInTheShell)) {
	    //   console.info('ghost')
	    //   mixin.mounted = () => {
	    //     init.bind(this)()
	    //   }
	    // }

	    Vue.mixin(mixin);

	    this.installed = true;
	    // this.$emit(EVENTS.installed)
	  }
	};

	if (typeof window !== 'undefined' && window.Vue) {
	  window.Vue.use(VueNotifications);
	}

	exports['default'] = VueNotifications;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(2), __esModule: true };

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(3);
	module.exports = __webpack_require__(9).Object.keys;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(4);

	__webpack_require__(6)('keys', function ($keys) {
	  return function keys(it) {
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(5);
	module.exports = function (it) {
	  return Object(defined(it));
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(7),
	    core = __webpack_require__(9),
	    fails = __webpack_require__(12);
	module.exports = function (KEY, exec) {
	  var fn = (core.Object || {})[KEY] || Object[KEY],
	      exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function () {
	    fn(1);
	  }), 'Object', exp);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(8),
	    core = __webpack_require__(9),
	    ctx = __webpack_require__(10),
	    PROTOTYPE = 'prototype';

	var $export = function $export(type, name, source) {
	  var IS_FORCED = type & $export.F,
	      IS_GLOBAL = type & $export.G,
	      IS_STATIC = type & $export.S,
	      IS_PROTO = type & $export.P,
	      IS_BIND = type & $export.B,
	      IS_WRAP = type & $export.W,
	      exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
	      target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE],
	      key,
	      own,
	      out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if (own && key in exports) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? function (C) {
	      var F = function F(param) {
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	      // make static versions for prototype methods
	    }(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if (IS_PROTO) (exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1; // forced
	$export.G = 2; // global
	$export.S = 4; // static
	$export.P = 8; // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	var core = module.exports = { version: '1.2.6' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// optional / simple context binding
	var aFunction = __webpack_require__(11);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1:
	      return function (a) {
	        return fn.call(that, a);
	      };
	    case 2:
	      return function (a, b) {
	        return fn.call(that, a, b);
	      };
	    case 3:
	      return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	  }
	  return function () /* ...args */{
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(15);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { "default": obj };
	}

	exports["default"] = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2["default"])(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(16), __esModule: true };

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(17);
	module.exports = function defineProperty(it, key, desc) {
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	var $Object = Object;
	module.exports = {
	  create: $Object.create,
	  getProto: $Object.getPrototypeOf,
	  isEnum: {}.propertyIsEnumerable,
	  getDesc: $Object.getOwnPropertyDescriptor,
	  setDesc: $Object.defineProperty,
	  setDescs: $Object.defineProperties,
	  getKeys: $Object.keys,
	  getNames: $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each: [].forEach
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports["default"] = function (Vue, key) {
	  // const _init = Vue.prototype._init
	  // const _destroy = Vue.prototype._destroy
	  //
	  // Vue.prototype._init = function (options = {}) {
	  //   options.init = options.init
	  //   ? [customInit].concat(options.init)
	  //    : customInit
	  //   _init.call(this, options)
	  // }
	  //
	  // Vue.prototype._destroy = () => {
	  //   // if (this[key]) {
	  //   //   this[key] = undefined
	  //   //   delete this[key]
	  //   // }
	  //
	  //   _destroy.apply(this, arguments)
	  // }
	  //
	  // function customInit () {
	  //   if (this[key]) throw console.error(`Override: property "${key}" is already defined`)
	  //   this[key] = {}
	  //
	  //   const options = this.$options
	  //   const keyOption = options[key]
	  //
	  //   if (keyOption) {
	  //     this[key] = keyOption
	  //   } else if (options.parent && options.parent[key]) {
	  //     this[key] = options.parent[key]
	  //   }
	  // }
	};

/***/ }
/******/ ])
});
;