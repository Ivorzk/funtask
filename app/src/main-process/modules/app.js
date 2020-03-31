/**
 * APP管理类
 */
import YAML from 'yaml'
import fs from 'fs-extra'
import path from 'path'
import io from './io'
import compressing from 'compressing'
import {
  BrowserWindow,
  ipcMain,
  screen
} from 'electron'
var apps = new Map()
export default class {
  constructor() {
    // 获取app菜单
    ipcMain.on('app-get-apps', (evt, dataType) => {
      evt.reply('app-get-apps-reply', global.$apps)
    })
    // 监听app打开操作
    ipcMain.on('app-start', async (evt, app) => {
      await this.openWindow(app)
      evt.reply('app-start-reply', app)
    })
    // 监听app安装事件
    ipcMain.on('app-install', async (evt, app) => {
      let data = await this.install(app)
      evt.reply('app-install-reply', data)
    })

    ipcMain.on('app-uninstall', async (evt, app) => {
      let data = await this.uninstall(app)
      evt.reply('app-uninstall-reply', data)
    })

    ipcMain.on('app-disable', async (evt, app) => {
      let data = await this.disable(app)
      evt.reply('app-disable-reply', data)
    })
  }

  // 初始化readme文件
  async copyReadme() {
    // 复制readme文件到packages目录中
    return fs.copy(`${__static}/packages-readme.md`, global.$config.packagesdir + 'README.md')
  }

  // 加载应用
  async loadApps() {
    // await this.copyReadme()
    // 所有应用的信息
    global.$apps = []
    // 遍历包存放目录
    let dirs = await this.eachdirs([global.$config.packagesdir])
    // 获取调试目录
    let debugdirs = global.$config.dev.debugdirs || []
    // 获取app信息
    global.$apps = await this.eachAppInfo([...dirs, ...debugdirs])
    // console.log(global.$apps)
    return global.$apps
  }

  // 遍历目录
  eachdirs(dirs) {
    return new Promise((resolve, reject) => {
      let apppaths = []
      var loopFun = (idx) => {
        try {
          var files = fs.readdirSync(dirs[idx])
          files.forEach((item, index) => {
            let apppath = `${dirs[idx]}/${item}`
            let stat = fs.lstatSync(apppath)
            if (stat.isDirectory() === true) {
              apppaths.push(path.resolve(apppath))
            }
          })
        } catch (e) {}
        idx += 1
        idx > dirs.length - 1 ? resolve(apppaths) : loopFun(idx)
      }
      loopFun(0)
    })
  }

  // 遍历app信息
  eachAppInfo(dirs) {
    return new Promise((resolve, reject) => {
      let apps = []
      dirs.forEach(apppath => {
        try {
          var packageFile = fs.readFileSync(path.resolve(apppath + '/package.json'), 'utf-8')
          var configFile = fs.readFileSync(path.resolve(apppath + '/app.yaml'), 'utf-8')
          if (packageFile && configFile) {
            let config = YAML.parse(configFile)
            let packageJson = JSON.parse(packageFile)
            apps.push({
              logo: './' + packageJson.name + '/logo.png',
              icon: path.resolve(apppath + '/logo.png'),
              // 应用配置
              ...config,
              // 包信息
              package: packageJson,
              // 应用路径
              path: apppath,
              // 是否已安装
              installed: true,
              // 是否禁用
              disabled: false
            })
          }
        } catch (e) {
          // console.log(e, 'e')
        }
      })
      resolve(apps)
    })
  }

  // 载入缓存
  cacheAppData() {

  }

  // 打开应用
  async openWindow(app) {
    console.log(app, 'app')
    // 获取宽高
    const {
      width,
      height
    } = screen.getPrimaryDisplay().workAreaSize
    let winconf = app.winconf || {}
    let win = new BrowserWindow(Object.assign({
      x: (width - winconf.width || 618) + 28 * apps.size,
      y: (height - winconf.height || 380) + 28 * apps.size,
      title: app.name,
      icon: app.icon,
      width: 618,
      height: 380,
      frame: true,
      transparent: true,
      backgroundColor: '#00ffffff',
      resizable: false,
      maximizable: false,
      minimizable: false,
      alwaysOnTop: true,
      fullscreenable: false,
      hasShadow: true,
      skipTaskbar: true,
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
        webSecurity: false
      },
      titleBarStyle: 'hidden'
    }, winconf))
    win.winId = 'win_' + Date.now()
    apps.set(win.winId, win)
    win.on('closed', (win) => {
      apps.delete(win.sender.winId)
    })
    // console.log(app, 'app', 'funtask://' + app.package.name + '/views/index.html')
    win.loadURL(global.$config.app.protocol + '://./' + app.package.name + '/views/index.html')
    return true
  }

  // 安装应用
  async install(app) {
    // 下载
    let tmpdir = global.$config.tmpdir + '/funtask/app/'
    let path = await io.download(`https://registry.npmjs.org/${app.name}/-/${app.name}-${app.version}.tgz`, tmpdir)
    console.log('download complete')
    // 解压
    await compressing.tgz.uncompress(path + `${app.name}-${app.version}.tgz`, path + `${app.name}-${app.version}/`)
    console.log('unzip ok')
    // 复制 packages 至 funtask 安装目录
    await fs.copy(path + `${app.name}-${app.version}/package`, global.$config.packagesdir + `/${app.name}`)
    this.loadApps()
    // 返回app信息给客户端
    return app
  }

  // 删除应用
  async uninstall(app) {
    console.log('remove ' + path.resolve(global.$config.packagesdir + `/${app.name}`))
    await fs.remove(path.resolve(global.$config.packagesdir + `/${app.name}`))
    await this.loadApps()
    return app
  }

  // 禁用应用
  async disable(app) {
    // 读取配置文件
    var configFile = fs.readFileSync(path.resolve(global.$config.apphome + '/config.yaml'), 'utf-8')
    // 设置将app禁用
    var configJson = YAML.parse(configFile)
    // 初始化app
    configJson.disabledApps ? '' : configJson.disabledApps = []
    // 添加到禁用列表
    configJson.disabledApps.push(app.name)
    // 写入本地磁盘
    console.log(YAML.stringify(configJson))
    fs.writeFileSync(path.resolve(global.$config.apphome + '/config.yaml'), YAML.stringify(configJson))
    return app
  }
}
