import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'index',
  component: () => import('../views/index.vue')
}, {
  path: '/control',
  name: 'control',
  component: () => import('../views/control'),
  children: [{
    path: '/funlist',
    name: 'funlist',
    component: () => import('../views/control/funlist'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/appstore',
    name: 'appstore',
    component: () => import('../views/control/appstore'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/feedback',
    name: 'feedback',
    component: () => import('../views/control/feedback'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/notice',
    name: 'notice',
    component: () => import('../views/notice'),
    meta: {
      keepAlive: true
    }
  }]
}]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
