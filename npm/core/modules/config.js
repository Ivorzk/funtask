import electron from './../utils/electron'
export default new class {
  // 获取全局配置
  get() {
    return new Promise((resolve, reject) => {
      electron.ipcRenderer.send('config-get', 'json')
      electron.ipcRenderer.once('config-get-reply', (evt, data) => {
        resolve(data)
      })
    })
  }

  // 设置配置
  set(data) {
    return new Promise((resolve, reject) => {
      electron.ipcRenderer.send('config-set', data)
      electron.ipcRenderer.once('config-set-reply', (evt, data) => {
        resolve(data)
      })
    })
  }
}
