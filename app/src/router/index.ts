import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [{
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
    path: '/notice-list',
    name: 'notice-list',
    component: () => import('../views/notice/list'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/themes',
    name: 'themes',
    component: () => import('../views/control/themes'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/control/settings'),
    meta: {
      keepAlive: true
    }
  }]
}, {
  path: '/notice',
  name: 'notice',
  component: () => import('../views/notice'),
  meta: {
    keepAlive: true
  }
}]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
