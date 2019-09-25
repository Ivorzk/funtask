import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: () => import('@/views/index.vue')
  }, {
    path: '/control',
    name: 'control',
    component: () => import('@/views/control.vue')
  }, {
    path: '*',
    redirect: '/'
  }]
})
