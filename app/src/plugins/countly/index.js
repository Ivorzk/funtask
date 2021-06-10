import Vue from 'vue'
import Countly from 'countly-sdk-web'
import electron from '@suwis/funtask/core/utils/electron'
Countly.init({
  app_key: '55949f46e75e11a20e555e405d80920df13b6d7a',
  url: 'https://countly.suwis.cloud/',
  debug: $config.env == 'dev'
})

Countly.begin_session()

Countly.add_event({
  key: 'system-starting',
  segmentation: {
    version: $config.package ? $config.package.version || '-' : '-'
  }
})

// 扩展一个方法, 方便发送事件
Countly.$emit = (key, value = {}) => {
  // serialize
  value = JSON.parse(JSON.stringify(value))
  for (let key in value) {
    if (typeof value[key] == 'function' || !value[key]) delete value[key]
    if (typeof value[key] == 'object') value[key] = JSON.stringify(value[key])
  }
  Countly.add_event({
    key,
    segmentation: value
  })
}

// 监听主进程发来的统计
try {
  electron.ipcRenderer.on('countly-emit', (event, data) => {
    Countly.$emit(data.key, data.value)
  })
} catch (e) {}

Vue.prototype.$countly = Countly
