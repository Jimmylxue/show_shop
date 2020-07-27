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
import myVideo from '@/components/video/myVideo.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/home',
    meta: { auth: true },
    component: home,
  },
  {
    path: '/login',
    component: login,
  },
  { path: '/register', component: register },
  { path: '/good', meta: { auth: true }, component: gooddetail },
  { path: '/cart', meta: { auth: true }, component: cart },
  { path: '/pay', meta: { auth: true }, component: payment },
  {
    path: '/users',
    component: user,
    children: [
      { path: 'order', meta: { auth: true }, component: orderdetail },
      { path: 'portal', meta: { auth: true }, component: portal },
    ],
  },
  { path: '/chat', meta: { auth: true }, component: chat },
  { path: '/video', meta: { auth: true }, component: myVideo },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    const token = sessionStorage.getItem('token')
    if (token) {
      next()
    } else {
      next({
        path: '/login?redirect',
        query: { redirect: to.path },
      })
    }
  } else {
    next()
  }
})

export default router
