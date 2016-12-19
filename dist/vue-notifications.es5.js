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

var PLUGIN_NAME = 'VueNotifications';
var PROPERTY_NAME = '$n';

var TYPE = {
  error: 'error',
  warn: 'warn',
  info: 'info',
  success: 'success'
};

var MESSAGES = {
  alreadyInstalled: PLUGIN_NAME + ': plugin already installed'
};

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

  // TODO (S.Panfilov) if {} we have to build object that extend properties from parents
  // TODO (S.Panfilov) if func - pass function
  // TODO (S.Panfilov) if string - pass {msg: 'string'} and etend from upper properties

  Object.keys(config).forEach(function (field) {
    result[field] = typeof config[field] === 'function' ? config[field].call(vueApp) : config[field];
  });

  return result;
}

function showMessage(config, options) {
  return new Promise(function (resolve, reject) {
    var valuesObj = getValues(vueApp, config);
    var isMethodOverridden = options && options[valuesObj.type];
    var method = isMethodOverridden ? options[valuesObj.type] : showDefaultMessage;

    return resolve(method(valuesObj));
  });
}

// function initVueNotificationPlugin (vueApp, notifications, pluginOptions) {
//   if (!notifications) return
//   Object.keys(notifications).forEach(name => {
//     setMethod(vueApp, name, vueApp.$options, pluginOptions)
//   })
//
//   vueApp.$emit(`${PACKAGE_NAME}-initiated`)
// }

// function unlinkVueNotificationPlugin (vueApp, notifications) {
//   if (!notifications) return
//   const attachedMethods = vueApp.$options.methods
//   Object.keys(notifications).forEach(name => {
//     if (attachedMethods[name]) {
//       attachedMethods[name] = undefined
//       delete attachedMethods[name]
//     }
//   })
//
//   vueApp.$emit(`${PACKAGE_NAME}-unlinked`)
// }

var VueNotifications = {
  type: TYPE,
  propertyName: PROPERTY_NAME,
  config: {
    type: TYPE.info,
    timeout: 3000
  },
  installed: false,
  show: function show(config) {
    var _this = this;

    // TODO (S.Panfilov) config has to be an Object
    // TODO (S.Panfilov) add Promise for async reasons
    //example 1: this.$n.show(this.$n.login.success)
    //example 2: this.$n.show(this.$n.error.login)
    //example 3: this.$n.show({msg: 'asdasd'})

    return new Promise(function (resolve, reject) {
      var newConfig = {};
      Object.assign(newConfig, _this.config); // TODO (S.Panfilov) make sure that "this === VueNotifications"
      Object.assign(newConfig, config);

      return showMessage(newConfig, _this.options).then(function (resp) {
        resolve(resp);
      });
    });
  },
  dismiss: function dismiss() {
    // TODO (S.Panfilov) required for timeout 0
  },
  install: function install(Vue) {
    var pluginOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (this.installed) throw console.error(MESSAGES.alreadyInstalled);

    // TODO (S.Panfilov)check if it's necessary
    //this.// const mixin = makeMixin(Vue, pluginOptions)
    // Vue.mixin(mixin)

    // addMethods(this, this.type, pluginOptions)


    this.installed = true;
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueNotifications);
}
return VueNotifications;
}));
