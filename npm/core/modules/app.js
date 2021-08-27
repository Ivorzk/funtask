import dce from './../utils/dce'
export default new class {
  // 安装app
  install(app) {
    return new Promise((resolve, reject) => {
      dce.send('app-install', app, {
        resolve,
        reject
      })
    })
  }

  // 删除app
  uninstall(app) {
    return new Promise((resolve, reject) => {
      dce.send('app-uninstall', app, {
        resolve,
        reject
      })
    })
  }

  // 应用设置
  setting(data) {
    return new Promise((resolve, reject) => {
      dce.send('app-setting', data, {
        resolve,
        reject
      })
    })
  }

  // 禁用
  disable(data) {
    return new Promise((resolve, reject) => {
      dce.send('app-disable', data, {
        resolve,
        reject
      })
    })
  }

  // 启用
  enable(data) {
    return new Promise((resolve, reject) => {
      dce.send('app-enable', data, {
        resolve,
        reject
      })
    })
  }

  // 运行app
  start(app) {
    return new Promise((resolve, reject) => {
      dce.send('app-start', app, {
        resolve,
        reject
      })
    })
  }

  // 关闭app
  stop(app = {}) {
    return new Promise((resolve, reject) => {
      let winId = sessionStorage.getItem('winId') || app.winId
      dce.send('app-stop', winId, {
        resolve,
        reject
      })
    })
  }

  // 获取应用列表
  getApps() {
    return new Promise((resolve, reject) => {
      dce.send('app-get-apps', 'json', {
        resolve,
        reject
      })
    })
  }

  // 打开调试工具
  openDevTools(app) {
    return new Promise((resolve, reject) => {
      let winId = sessionStorage.getItem('winId') || app.winId
      dce.send('app-openDevTools', winId, {
        resolve,
        reject
      })
    })
  }

  // 打开右键菜单
  showContextMenu(menus) {
    return new Promise((resolve, reject) => {
      dce.send('show-context-menu', menus || [], {
        resolve,
        reject
      })
    })
  }

  // login
  login() {
    return new Promise((resolve, reject) => {
      dce.send('app-login', {}, {
        resolve,
        reject
      })
    })
  }
}
