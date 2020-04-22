import electron from './../utils/electron'
export default {
  // 获取全局配置
  get() {
    return new Promise((resolve, reject) => {
      electron.ipcRenderer.send('bluetooth-get', 'json')
      electron.ipcRenderer.on('bluetooth-get-reply', (data) => {
        resolve(data)
      })
    })
  }
}
