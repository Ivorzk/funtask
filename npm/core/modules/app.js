import electron from './../utils/electron'
export default new class {
  // 安装app
  install(app) {
    return new Promise((resolve, reject) => {
      electron.ipcRenderer.send('app-install', app)
      electron.ipcRenderer.on('app-install-reply', (evt, data) => {
        resolve(data)
      })
    })
  }

  // 删除app
  uninstall(app) {
    return new Promise((resolve, reject) => {
      electron.ipcRenderer.send('app-uninstall', app)
      electron.ipcRenderer.on('app-uninstall-reply', (evt, data) => {
        resolve(data)
      })
    })
  }

  // 应用设置
  setting(data) {
    return new Promise((resolve, reject) => {
      electron.ipcRenderer.send('app-setting', data)
      electron.ipcRenderer.on('app-setting-reply', (evt, data) => {
        resolve(data)
      })
    })
  }

  // 禁用
  disable(data) {
    return new Promise((resolve, reject) => {
      electron.ipcRenderer.send('app-disable', data)
      electron.ipcRenderer.on('app-disable-reply', (evt, data) => {
        resolve(data)
      })
    })
  }

  // 启用
  enable(data) {
    return new Promise((resolve, reject) => {
      electron.ipcRenderer.send('app-enable', data)
      electron.ipcRenderer.on('app-enable-reply', (evt, data) => {
        resolve(data)
      })
    })
  }

  // 运行app
  start(app) {
    return new Promise((resolve, reject) => {
      electron.ipcRenderer.send('app-start', app)
      electron.ipcRenderer.on('app-start-reply', (evt, data) => {
        resolve(data)
      })
    })
  }

  // 获取应用列表
  getApps() {
    return new Promise((resolve, reject) => {
      electron.ipcRenderer.send('app-get-apps', 'json')
      electron.ipcRenderer.on('app-get-apps-reply', (evt, data) => {
        resolve(data)
      })
    })
  }
}
