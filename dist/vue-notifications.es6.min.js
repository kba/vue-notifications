const PLUGIN_NAME = 'VueNotifications'
// const PROPERTY_NAME = '$n'
const PROPERTY_NAME = 'notifications'

const TYPE = {
  error: 'error',
  warn: 'warn',
  info: 'info',
  success: 'success'
}

const MESSAGES = {
  alreadyInstalled: `${PLUGIN_NAME}: plugin already installed`
}

function showInConsole (msg, type, types) {
  if (type === types.error) console.error(msg)
  else if (type === types.warn) console.warn(msg)
  else if (type === types.success) console.info(msg)
  else console.log(msg)
}

function showDefaultMessage ({type, message, title, debugMsg}) {
  let msg = `Title: ${title}, Message: ${message}, DebugMsg: ${debugMsg}, type: ${type}`
  showInConsole(msg, type, TYPE)

  return msg
}

function getValues (vueApp, config) {
  const result = {}

  // TODO (S.Panfilov) if {} we have to build object that extend properties from parents
  // TODO (S.Panfilov) if func - pass function
  // TODO (S.Panfilov) if string - pass {msg: 'string'} and extend from upper properties

  Object.keys(config).forEach(field => {
    result[field] = (typeof config[field] === 'function') ? config[field].call(vueApp) : config[field]
  })

  return result
}

function showMessage (config, options) {
  return new Promise((resolve, reject) => {
    const valuesObj = getValues(vueApp, config)
    const isMethodOverridden = options && options[valuesObj.type]
    const method = isMethodOverridden ? options[valuesObj.type] : showDefaultMessage

    return resolve(method(valuesObj))
  })
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
    // TODO (S.Panfilov) add Promise for async reasons
    //example 1: this.$n.show(this.$n.login.success)
    //example 2: this.$n.show(this.$n.error.login)
    //example 3: this.$n.show({msg: 'asdasd'})

    return new Promise((resolve, reject) => {
      const newConfig = {}
      Object.assign(newConfig, this.config) // TODO (S.Panfilov) make sure that "this === VueNotifications"
      Object.assign(newConfig, config)

      return showMessage(newConfig, this.options).then((resp) => {
        resolve(resp)
      })
    })
  },
  dismiss () {
    // TODO (S.Panfilov) required for timeout 0
  },
  install (Vue, pluginOptions = {}) {
    // console.info(this)
    if (this.installed) throw console.error(MESSAGES.alreadyInstalled)

    // TODO (S.Panfilov) check if it's necessary
    //this.// const mixin = makeMixin(Vue, pluginOptions)
    // Vue.mixin(mixin)

    // addMethods(this, this.type, pluginOptions)

    const mixin = {
      beforeCreated () {
        console.info(this.notifications)
      },
      created () {
        console.info(this.notifications)
      },
      beforeMount (){
        console.info(this.notifications)
      },
      mounted (){
        console.info(this.notifications)
      }
    }
    Vue.mixin(mixin)

    // TODO (S.Panfilov) perhaps add global method show instead of this.show(), like Vue.show = ...


    this.installed = true
  }

}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueNotifications)
}

