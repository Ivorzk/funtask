import {
  ipcRenderer
} from 'electron'
export default {
  // 获取全局配置
  download(data) {
    return new Promise((resolve, reject) => {
      ipcRenderer.send('io-download', data)
      ipcRenderer.on('io-download-reply', (data) => {
        resolve(data)
      })
    })
  }
}
