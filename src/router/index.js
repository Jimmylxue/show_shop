import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import login from '../views/login.vue'
import gooddetail from '../views/gooddetail.vue'
import cart from '../views/cart.vue'
import payment from '../views/payment.vue'
import register from '../views/register.vue'
import user from '@/views/mine.vue'
import orderdetail from '@/components/order/orderdetail.vue'
import portal from '@/components/portal/portal.vue'
import chat from '@/views/chat.vue'

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
  { path: '/register', component: register },
  { path: '/good', component: gooddetail },
  { path: '/cart', component: cart },
  { path: '/pay', component: payment },
  {
    path: '/users',
    component: user,
    children: [
      { path: 'order', component: orderdetail },
      { path: 'portal', component: portal },
    ],
  },
  { path: '/chat', component: chat },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
