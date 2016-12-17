const PLUGIN_NAME = 'VueNotifications'
const PACKAGE_NAME = 'vue-notifications'
const PROPERTY_NAME = '$n'

const TYPE = {
  error: 'error',
  warn: 'warn',
  info: 'info',
  success: 'success'
}

const VUE_VERSION = {
  evangelion: 1,
  ghostInTheShell: 2
}

const MESSAGES = {
  alreadyInstalled: `${PLUGIN_NAME}: plugin already installed`,
  methodNameConflict: `${PLUGIN_NAME}: names conflict - `
}

const innerMethods = {
  getVersion (Vue) {
    const version = Vue.version.match(/(\d+)/g)
    return {
      major: +version[0],
      regular: +version[1],
      minor: +version[2]
    }
  },
  showInConsole (msg, type, types) {
    if (type === types.error) console.error(msg)
    else if (type === types.warn) console.warn(msg)
    else if (type === types.success) console.info(msg)
    else console.log(msg)
  },
  showDefaultMessage ({ type, message, title, debugMsg }) {
    let msg = `Title: ${title}, Message: ${message}, DebugMsg: ${debugMsg}, type: ${type}`

    innerMethods.showInConsole(msg, type, TYPE)

    return msg
  },
  getValues (vueApp, config) {
    const result = {}
    const keepFnFields = ['cb', 'watch']

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
  },
  showMessage (config, options, vueApp) {
    const valuesObj = innerMethods.getValues(vueApp, config)

    const isMethodOverridden = options && options[valuesObj.type]
    const method = isMethodOverridden ? options[valuesObj.type] : innerMethods.showDefaultMessage
    method(valuesObj, vueApp)

    if (config.cb) return config.cb()
  },
  addMethods (targetObj, typesObj, options) {
    Object.keys(typesObj).forEach(v => {
      targetObj[typesObj[v]] = function (config) {
        config.type = typesObj[v]
        // TODO (S.Panfilov)fix 'vueApp' in param
        return innerMethods.showMessage(config, options)
      }
    })
  },
  setMethod (vueApp, name, options, pluginOptions) {
    if (!options.methods) options.methods = {}

    if (options.methods[name]) {
      // TODO (S.Panfilov) not sure - throw error here or just warn
      console.error(MESSAGES.methodNameConflict + name)
    } else {
      options.methods[name] = innerMethods.makeMethod(vueApp, name, options, pluginOptions)
    }
  },
  makeMethod (vueApp, configName, options, pluginOptions) {
    return function (config) {
      const newConfig = {}
      Object.assign(newConfig, VueNotifications.config)
      Object.assign(newConfig, options[VueNotifications.propertyName][configName])
      Object.assign(newConfig, config)

      return innerMethods.showMessage(newConfig, pluginOptions, vueApp)
    }
  },
  initVueNotificationPlugin (vueApp, notifications, pluginOptions) {
    if (!notifications) return
    Object.keys(notifications).forEach(name => {
      innerMethods.setMethod(vueApp, name, vueApp.$options, pluginOptions)
    })

    vueApp.$emit(`${PACKAGE_NAME}-initiated`)
  },
  launchWatchableNotifications (vueApp, notifications) {
    if (!notifications) return
    Object.keys(notifications).forEach(name => {
      if (vueApp[name] && notifications[name].watch) {
        vueApp[name]()
      }
    })

    vueApp.$emit(`${PACKAGE_NAME}-launched_watchable`)
  },
  unlinkVueNotificationPlugin (vueApp, notifications) {
    if (!notifications) return
    const attachedMethods = vueApp.$options.methods
    Object.keys(notifications).forEach(name => {
      if (attachedMethods[name]) {
        attachedMethods[name] = undefined
        delete attachedMethods[name]
      }
    })

    vueApp.$emit(`${PACKAGE_NAME}-unlinked`)
  }
}

function makeMixin (Vue, pluginOptions) {
  let hooks = {
    init: '',
    destroy: 'beforeDestroy',
    mounted: ''
  }

  if (innerMethods.getVersion(Vue).major === VUE_VERSION.evangelion) {
    hooks.init = 'init'
    hooks.mounted = 'compiled'
  }
  if (innerMethods.getVersion(Vue).major === VUE_VERSION.ghostInTheShell) {
    hooks.init = 'beforeCreate'
    hooks.mounted = 'mounted'
  }

  return {
    [hooks.init]: function () {
      const vueApp = this
      const vueAppOptions = this.$options
      const notificationsField = vueAppOptions[VueNotifications.propertyName]

      innerMethods.initVueNotificationPlugin(vueApp, notificationsField, pluginOptions)
    },
    [hooks.mounted]: function () {
      const vueApp = this
      const vueAppOptions = this.$options
      const notificationsField = vueAppOptions[VueNotifications.propertyName]

      innerMethods.launchWatchableNotifications(vueApp, notificationsField)
    },
    [hooks.destroy]: function () {
      const vueApp = this
      const vueAppOptions = this.$options
      const notificationsField = vueAppOptions[VueNotifications.propertyName]
      innerMethods.unlinkVueNotificationPlugin(vueApp, notificationsField)
    }
  }
}

const VueNotifications = {
  type: TYPE,
  propertyName: PROPERTY_NAME,
  config: {
    type: TYPE.info,
    timeout: 3000
  },
  installed: false,
  install (Vue, pluginOptions = {}) {
    if (this.installed) throw console.error(MESSAGES.alreadyInstalled)
    const mixin = makeMixin(Vue, pluginOptions)
    Vue.mixin(mixin)

    innerMethods.addMethods(this, this.type, pluginOptions)

    this.installed = true
  }

}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueNotifications)
}

/*START.TESTS_ONLY*/
VueNotifications._private = innerMethods
VueNotifications._private.TYPE = TYPE
VueNotifications._private.PLUGIN_NAME = PLUGIN_NAME
VueNotifications._private.PACKAGE_NAME = PACKAGE_NAME
VueNotifications._private.PROPERTY_NAME = PROPERTY_NAME
VueNotifications._private.VUE_VERSION = VUE_VERSION
VueNotifications._private.MESSAGES = MESSAGES

export default VueNotifications

/*END.TESTS_ONLY*/
