import Vue from 'vue'
import axios from 'axios'
var instance = axios.create({
  baseURL: '',
  withCredentials: true
})

// 拦截器
instance.interceptors.request.use((config) => {
  return config
}, (err) => {
  return Promise.reject(err)
})
Vue.prototype.$axios = instance
