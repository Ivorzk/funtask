import {
  ipcRenderer
} from 'electron'
export default {
  // 获取全局配置
  get() {
    return new Promise((resolve, reject) => {
      ipcRenderer.send('config-get', 'json')
      ipcRenderer.on('config-get-reply', (data) => {
        resolve(data)
      })
    })
  }
}
