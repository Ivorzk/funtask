import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('@/assets/logo.jpg'),
  loading: require('@/assets/loading.svg'),
  attempt: 1
})
