;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.VueNotifications = factory();
  }
}(this, function() {
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PLUGIN_NAME = 'VueNotifications';
var PACKAGE_NAME = 'vue-notifications';
var PROPERTY_NAME = '$n';

var TYPE = {
  error: 'error',
  warn: 'warn',
  info: 'info',
  success: 'success'
};

var VUE_VERSION = {
  1: {
    init: 'init',
    destroy: 'beforeDestroy',
    mounted: 'compiled'
  },
  2: {
    init: 'beforeCreate',
    destroy: 'beforeDestroy',
    mounted: 'mounted'
  }
};

var MESSAGES = {
  alreadyInstalled: PLUGIN_NAME + ': plugin already installed',
  methodNameConflict: PLUGIN_NAME + ': names conflict - '
};

function getVersion(Vue) {
  var version = Vue.version.match(/(\d+)/g);
  return {
    major: +version[0],
    regular: +version[1],
    minor: +version[2]
  };
}

function showInConsole(msg, type, types) {
  if (type === types.error) console.error(msg);else if (type === types.warn) console.warn(msg);else if (type === types.success) console.info(msg);else console.log(msg);
}

function showDefaultMessage(_ref) {
  var type = _ref.type,
      message = _ref.message,
      title = _ref.title,
      debugMsg = _ref.debugMsg;

  var msg = 'Title: ' + title + ', Message: ' + message + ', DebugMsg: ' + debugMsg + ', type: ' + type;

  showInConsole(msg, type, TYPE);

  return msg;
}

function getValues(vueApp, config) {
  var result = {};
  var keepFnFields = ['cb', 'watch'];

  Object.keys(config).forEach(function (field) {
    keepFnFields.forEach(function (fnField) {
      if (field === fnField) {
        result[field] = config[field].bind(vueApp);
      } else {
        result[field] = typeof config[field] === 'function' ? config[field].call(vueApp) : config[field];
      }
    });
  });

  return result;
}

function showMessage(config, options, vueApp) {
  var valuesObj = getValues(vueApp, config);

  var isMethodOverridden = options && options[valuesObj.type];
  var method = isMethodOverridden ? options[valuesObj.type] : showDefaultMessage;
  method(valuesObj, vueApp);

  if (config.cb) return config.cb();
}

function addMethods(targetObj, typesObj, options) {
  Object.keys(typesObj).forEach(function (v) {
    targetObj[typesObj[v]] = function (config) {
      config.type = typesObj[v];
      // TODO (S.Panfilov)fix 'vueApp' in param
      return showMessage(config, options);
    };
  });
}

function setMethod(vueApp, name, options, pluginOptions) {
  if (!options.methods) options.methods = {};

  if (options.methods[name]) {
    // TODO (S.Panfilov) not sure - throw error here or just warn
    console.error(MESSAGES.methodNameConflict + name);
  } else {
    options.methods[name] = makeMethod(vueApp, name, options, pluginOptions);
  }
}

function makeMethod(vueApp, configName, options, pluginOptions) {
  return function (config) {
    var newConfig = {};
    Object.assign(newConfig, VueNotifications.config);
    Object.assign(newConfig, options[VueNotifications.propertyName][configName]);
    Object.assign(newConfig, config);

    return showMessage(newConfig, pluginOptions, vueApp);
  };
}

function initVueNotificationPlugin(vueApp, notifications, pluginOptions) {
  if (!notifications) return;
  Object.keys(notifications).forEach(function (name) {
    setMethod(vueApp, name, vueApp.$options, pluginOptions);
  });

  vueApp.$emit(PACKAGE_NAME + '-initiated');
}

function launchWatchableNotifications(vueApp, notifications) {
  if (!notifications) return;
  Object.keys(notifications).forEach(function (name) {
    if (vueApp[name] && notifications[name].watch) {
      vueApp[name]();
    }
  });

  vueApp.$emit(PACKAGE_NAME + '-launched_watchable');
}

function unlinkVueNotificationPlugin(vueApp, notifications) {
  if (!notifications) return;
  var attachedMethods = vueApp.$options.methods;
  Object.keys(notifications).forEach(function (name) {
    if (attachedMethods[name]) {
      attachedMethods[name] = undefined;
      delete attachedMethods[name];
    }
  });

  vueApp.$emit(PACKAGE_NAME + '-unlinked');
}

function makeMixin(Vue, pluginOptions) {
  var _ref2;

  var version = getVersion(Vue).major;

  // TODO (S.Panfilov) this?
  // TODO (S.Panfilov) : function () { ?

  return _ref2 = {}, _defineProperty(_ref2, VUE_VERSION[version].init, function () {
    var vueApp = this;
    var vueAppOptions = this.$options;
    var notificationsField = vueAppOptions[VueNotifications.propertyName];

    initVueNotificationPlugin(vueApp, notificationsField, pluginOptions);
  }), _defineProperty(_ref2, VUE_VERSION[version].mounted, function () {
    var vueApp = this;
    var vueAppOptions = this.$options;
    var notificationsField = vueAppOptions[VueNotifications.propertyName];

    launchWatchableNotifications(vueApp, notificationsField);
  }), _defineProperty(_ref2, VUE_VERSION[version].destroy, function () {
    var vueApp = this;
    var vueAppOptions = this.$options;
    var notificationsField = vueAppOptions[VueNotifications.propertyName];
    unlinkVueNotificationPlugin(vueApp, notificationsField);
  }), _ref2;
}

var VueNotifications = {
  type: TYPE,
  propertyName: PROPERTY_NAME,
  config: {
    type: TYPE.info,
    timeout: 3000
  },
  installed: false,
  install: function install(Vue) {
    var pluginOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (this.installed) throw console.error(MESSAGES.alreadyInstalled);
    var mixin = makeMixin(Vue, pluginOptions);
    Vue.mixin(mixin);

    addMethods(this, this.type, pluginOptions);

    this.installed = true;
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueNotifications);
}
return VueNotifications;
}));
