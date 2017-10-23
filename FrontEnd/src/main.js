// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueSocketio from 'vue-socket.io'
import router from './router'
import * as VueGoogleMaps from 'vue2-google-maps'

var googlekey = require('./config.js').google.key
var socketUrl = require('./config.js').socket.url

Vue.use(VueGoogleMaps, {
  load: {
    key: googlekey,
    libraries: 'places'
  }
})
Vue.use(VueSocketio, socketUrl)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
