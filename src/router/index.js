import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import login from '../views/login.vue'
import gooddetail from '../views/gooddetail.vue'
import cart from '../views/cart.vue'
import payment from '../views/payment.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: home,
  },
  {
    path: '/login',
    component: login,
  },
  { path: '/good', component: gooddetail },
  { path: '/cart', component: cart },
  { path: '/pay', component: payment },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
