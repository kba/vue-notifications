import Vue from 'vue'
import App from './App'
import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr'

miniToastr.init()

function toast ({title, message, type, timeout, cb, debugMsg}) {
  if (debugMsg) console[type](debugMsg)
  return miniToastr[type](message, title, timeout, cb)
}

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}

Vue.use(VueNotifications, options)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
