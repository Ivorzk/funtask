import Vue from 'vue'
import Countly from 'countly-sdk-web'

Countly.init({
  app_key: '55949f46e75e11a20e555e405d80920df13b6d7a',
  url: 'https://countly.suwis.cloud/',
  debug: $config.env == 'dev'
})

Countly.begin_session()

Countly.add_event({
  'key': 'app_starting',
  'count': 3,
  'sum': 2.97,
  'dur': 1000,
  'segmentation': {
    'app_version': '1.0',
    'country': 'Turkey'
  }
})

Vue.prototype.$countly = Countly
