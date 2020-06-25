import electron from './../utils/electron'
export default new class {
  // 获取全局配置
  getInfo() {
    return new Promise((resolve, reject) => {
      electron.ipcRenderer.send('system-get-info', 'json')
      electron.ipcRenderer.once('system-get-info-reply', (evt, data) => {
        resolve(data)
      })
    })
  }

  // 获取唯一标识
  getUUID() {
    return new Promise((resolve, reject) => {
      electron.ipcRenderer.send('system-get-uuid', 'json')
      electron.ipcRenderer.once('system-get-uuid-reply', (evt, data) => {
        resolve(data)
      })
    })
  }
}
