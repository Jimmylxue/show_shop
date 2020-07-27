import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui' ///
import Video from 'video.js'
import api from './service/index'

import interceptor from './interceptor'
import vueSweetAlert2 from './plugins/sweetalert2'

import 'element-ui/lib/theme-chalk/index.css' ///
import 'font-awesome/css/font-awesome.min.css'
import './assets/css/reset.css'
import 'video.js/dist/video-js.css'

import VueSocketIo from 'vue-socket.io'

Vue.use(
  new VueSocketIo({
    debug: true,
    connection: 'http://127.0.0.1:666',
  })
)

// 定义全局都可以使用的转换时间的过滤器
Vue.filter('formatTime', val => {
  let time = new Date(val * 1) // *1 是为了将字符串类型转换能number类型
  let str = `${time.getFullYear()}-${time.getMonth()}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
  return str
})

Vue.prototype.$api = api
Vue.prototype.$video = Video

Vue.use(vueSweetAlert2)

Vue.config.productionTip = false

Vue.use(ElementUI)

const vm = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
console.log('hello???')
interceptor(vm)
