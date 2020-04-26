import electron from './../utils/electron'
export default {
  // 获取全局配置
  download(data) {
    return new Promise((resolve, reject) => {
      electron.ipcRenderer.send('io-download', data)
      electron.ipcRenderer.once('io-download-reply', (evt, data) => {
        resolve(data)
      })
    })
  }
}
