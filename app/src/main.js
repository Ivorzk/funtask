import Vue from 'vue'
import store from './store'
// import './registerServiceWorker'
// 注入全局组件
import './components'
// 注入全局样式
import './styles/index.scss'
import config from './../app.config'
Vue.config.productionTip = false
Vue.prototype.$config = config
// 动态获取url映射到组件
let path = location.pathname
path = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.html') || path.length)
if (path == '/') path = 'index'
let page
try {
  page = require(`./pages/${path}`).default
} catch (e) {
  page = require(`./pages/index`).default
}
window.$vm = new Vue({
  store,
  render: h => h(page),
}).$mount('#app')
