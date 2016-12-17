const PLUGIN_NAME = 'VueNotifications'
// const PACKAGE_NAME = 'vue-notifications'
const PROPERTY_NAME = '$n'

const TYPE = {
  error: 'error',
  warn: 'warn',
  info: 'info',
  success: 'success'
}

// const VUE_VERSION = {
//   1: {
//     init: 'init',
//     destroy: 'beforeDestroy'
//   },
//   2: {
//     init: 'beforeCreate',
//     destroy: 'beforeDestroy'
//   },
// }

const MESSAGES = {
  alreadyInstalled: `${PLUGIN_NAME}: plugin already installed`,
  methodNameConflict: `${PLUGIN_NAME}: names conflict - `
}

// function getVersion (Vue) {
//   const version = Vue.version.match(/(\d+)/g)
//   return {
//     major: +version[0],
//     regular: +version[1],
//     minor: +version[2]
//   }
// }

function showInConsole (msg, type, types) {
  if (type === types.error) console.error(msg)
  else if (type === types.warn) console.warn(msg)
  else if (type === types.success) console.info(msg)
  else console.log(msg)
}

function showDefaultMessage ({ type, message, title, debugMsg }) {
  let msg = `Title: ${title}, Message: ${message}, DebugMsg: ${debugMsg}, type: ${type}`

  showInConsole(msg, type, TYPE)

  return msg
}

function getValues (vueApp, config) {
  const result = {}
  const keepFnFields = ['cb'] // TODO (S.Panfilov) any field can be a fn now!

  // TODO (S.Panfilov) if {} we have to build object that extend properties from parents
  // TODO (S.Panfilov) if func - pass function
  // TODO (S.Panfilov) if string - pass {msg: 'string'} and etend from upper properties

  Object.keys(config).forEach(field => {
    keepFnFields.forEach(fnField => {
      if (field === fnField) {
        result[field] = config[field].bind(vueApp)
      } else {
        result[field] = (typeof config[field] === 'function') ? config[field].call(vueApp) : config[field]
      }
    })
  })

  return result
}

function showMessage (config, options, vueApp) {
  const valuesObj = getValues(vueApp, config)

  const isMethodOverridden = options && options[valuesObj.type]
  const method = isMethodOverridden ? options[valuesObj.type] : showDefaultMessage
  method(valuesObj, vueApp)

  if (config.cb) return config.cb()
}

// function addMethods (targetObj, typesObj, options) {
//   Object.keys(typesObj).forEach(v => {
//     targetObj[typesObj[v]] = function (config) {
//       config.type = typesObj[v]
//       // TODO (S.Panfilov)fix 'vueApp' in param
//       return showMessage(config, options)
//     }
//   })
// }

// function setMethod (vueApp, name, options, pluginOptions) {
//   if (!options.methods) options.methods = {}
//
//   if (options.methods[name]) {
//     // TODO (S.Panfilov) not sure - throw error here or just warn
//     console.error(MESSAGES.methodNameConflict + name)
//   } else {
//     options.methods[name] = makeMethod(vueApp, name, options, pluginOptions)
//   }
// }

// function makeMethod (vueApp, configName, options, pluginOptions) {
//   return function (config) {
//     const newConfig = {}
//     Object.assign(newConfig, VueNotifications.config)
//     Object.assign(newConfig, options[VueNotifications.propertyName][configName])
//     Object.assign(newConfig, config)
//
//     return showMessage(newConfig, pluginOptions, vueApp)
//   }
// }

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


// function makeMixin (Vue, pluginOptions) {
//   const version = getVersion(Vue).major
//
//   // TODO (S.Panfilov) this?
//   // TODO (S.Panfilov) : function () { ?
//
//   return {
//     [VUE_VERSION[version].init]: function () {
//       const vueApp = this
//       const vueAppOptions = this.$options
//       const notificationsField = vueAppOptions[VueNotifications.propertyName]
//
//       initVueNotificationPlugin(vueApp, notificationsField, pluginOptions)
//     },
//     [VUE_VERSION[version].destroy]: function () {
//       const vueApp = this
//       const vueAppOptions = this.$options
//       const notificationsField = vueAppOptions[VueNotifications.propertyName]
//       unlinkVueNotificationPlugin(vueApp, notificationsField)
//     }
//   }
// }

const VueNotifications = {
  type: TYPE,
  propertyName: PROPERTY_NAME,
  config: {
    type: TYPE.info,
    timeout: 3000
  },
  installed: false,
  show (config) {
    // TODO (S.Panfilov) config has to be an Object
    //example 1: this.$n.show(this.$n.login.success)
    //example 2: this.$n.show(this.$n.error.login)
    //example 3: this.$n.show({msg: 'asdasd'})
  },
  dismiss () {
    // TODO (S.Panfilov) required for timeout 0
  },
  install (Vue, pluginOptions = {}) {
    if (this.installed) throw console.error(MESSAGES.alreadyInstalled)
    // const mixin = makeMixin(Vue, pluginOptions)
    // Vue.mixin(mixin)

    // addMethods(this, this.type, pluginOptions)

    this.installed = true
  }

}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueNotifications)
}

/*START.TESTS_ONLY*/
// VueNotifications._private.TYPE = TYPE
// VueNotifications._private.PLUGIN_NAME = PLUGIN_NAME
// VueNotifications._private.PACKAGE_NAME = PACKAGE_NAME
// VueNotifications._private.PROPERTY_NAME = PROPERTY_NAME
// VueNotifications._private.VUE_VERSION = VUE_VERSION
// VueNotifications._private.MESSAGES = MESSAGES

export default VueNotifications

/*END.TESTS_ONLY*/
