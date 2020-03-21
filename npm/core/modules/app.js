import {
  ipcRenderer
} from 'electron'
export default new class {
  // 安装app
  install(app) {
    return new Promise((resolve, reject) => {
      ipcRenderer.send('app-install', app)
      ipcRenderer.on('app-install-reply', (evt, data) => {
        resolve(data)
      })
    })
  }

  // 删除app
  uninstall(app) {
    return new Promise((resolve, reject) => {
      ipcRenderer.send('app-remove', app)
      ipcRenderer.on('app-remove-reply', (evt, data) => {
        resolve(data)
      })
    })
  }

  // 应用设置
  setting(data) {
    return new Promise((resolve, reject) => {
      ipcRenderer.send('app-setting', data)
      ipcRenderer.on('app-setting-reply', (evt, data) => {
        resolve(data)
      })
    })
  }

  // 禁用
  disable(data) {
    return new Promise((resolve, reject) => {
      ipcRenderer.send('app-disable', data)
      ipcRenderer.on('app-disable-reply', (evt, data) => {
        resolve(data)
      })
    })
  }

  // 启用
  enable(data) {
    return new Promise((resolve, reject) => {
      ipcRenderer.send('app-enable', data)
      ipcRenderer.on('app-enable-reply', (evt, data) => {
        resolve(data)
      })
    })
  }

  // 运行app
  start(app) {
    return new Promise((resolve, reject) => {
      ipcRenderer.send('app-start', app)
      ipcRenderer.on('app-start-reply', (evt, data) => {
        resolve(data)
      })
    })
  }

  // 获取应用列表
  getApps() {
    return new Promise((resolve, reject) => {
      ipcRenderer.send('app-get-apps', 'json')
      ipcRenderer.on('app-get-apps-reply', (evt, data) => {
        resolve(data)
      })
    })
  }
}
