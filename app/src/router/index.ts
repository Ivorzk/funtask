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
  children: []
}]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
