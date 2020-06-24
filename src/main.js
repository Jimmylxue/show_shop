import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui' ///

import interceptor from './interceptor'
import vueSweetAlert2 from './plugins/sweetalert2'

import 'element-ui/lib/theme-chalk/index.css' ///
import 'font-awesome/css/font-awesome.min.css'
import './assets/css/reset.css'

import api from './service/index'
Vue.prototype.$api = api

Vue.use(vueSweetAlert2)

Vue.config.productionTip = false

Vue.use(ElementUI)

const vm = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

interceptor(vm)
