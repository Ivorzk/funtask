import electron from './../utils/electron'
export default {
  // 获取全局配置
  getInfo() {
    return new Promise((resolve, reject) => {
      electron.ipcRenderer.send('system-get-info', 'json')
      electron.ipcRenderer.on('system-get-info-reply', (data) => {
        resolve(data)
      })
    })
  }
}
