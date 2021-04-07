import Vue from 'vue'
import axios from 'axios'
const instance = axios.create({
  baseURL: $config.apihost,
  withCredentials: true,
  timeout: $config.timeout
})

// 拦截器
instance.interceptors.request.use((config) => {
  return config
}, (err) => {
  return Promise.reject(err)
})
Vue.prototype.$axios = instance
