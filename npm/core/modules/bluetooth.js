import {
  ipcRenderer
} from 'electron'
export default {
  // 获取全局配置
  get() {
    return new Promise((resolve, reject) => {
      ipcRenderer.send('bluetooth-get', 'json')
      ipcRenderer.on('bluetooth-get-reply', (data) => {
        resolve(data)
      })
    })
  }
}
