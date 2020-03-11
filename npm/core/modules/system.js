import {
  ipcRenderer
} from 'electron'
export default {
  // 获取全局配置
  getInfo() {
    return new Promise((resolve, reject) => {
      ipcRenderer.send('system-get-info', 'json')
      ipcRenderer.on('system-get-info-reply', (data) => {
        resolve(data)
      })
    })
  }
}
