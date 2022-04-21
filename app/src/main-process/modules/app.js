/**
 * APP管理类
 */
import YAML from 'yaml'
import fs from 'fs-extra'
import path from 'path'
import io from './io'
import os from 'os'
import compressing from 'compressing'
import _ from 'lodash'
import axios from 'axios'
import Store from 'electron-store'
import {
  BrowserWindow,
  ipcMain,
  screen,
  Menu,
  app
} from 'electron'
import {
  Worker
} from 'worker_threads'
import {
  exec
} from 'child_process'
const apps = new Map()
const workers = {}
const store = new Store()
export default class {
  constructor() {
    // 获取app菜单
    ipcMain.on('app-get-apps', (evt, dataType) => {
      evt.reply('app-get-apps-reply', global.$apps)
    })
    // 打开应用
    ipcMain.on('app-start', async (evt, app) => {
      const win = await this.openWindow(app)
      evt.reply('app-start-reply', {
        winId: win.winId
      })
    })
    // 关闭应用
    ipcMain.on('app-stop', async (evt, winId) => {
      await this.closeWindow(winId)
      evt.reply('app-stop-reply', winId)
    })
    // 监听app安装事件
    ipcMain.on('app-install', async (evt, app) => {
      const data = await this.install(app)
      evt.reply('app-install-reply', data)
    })
    //  卸载
    ipcMain.on('app-uninstall', async (evt, app) => {
      const data = await this.uninstall(app)
      // 加入延迟防止前端出现无法及时生效的问题
      evt.reply('app-uninstall-reply', data)
    })
    // 禁用
    ipcMain.on('app-disable', async (evt, app) => {
      const data = await this.disable(app)
      evt.reply('app-disable-reply', data)
    })
    // 启用
    ipcMain.on('app-enable', async (evt, app) => {
      const data = await this.enable(app)
      evt.reply('app-enable-reply', data)
    })
    // 打开调试
    ipcMain.on('app-openDevTools', async (evt, app) => {
      const data = await this.openDevTools(app)
      evt.reply('app-openDevTools-reply', data)
    })
    // 显示右键菜单
    ipcMain.on('show-context-menu', (evt, menus) => {
      const template = []
      menus.forEach(item => {
        template.push({
          ...item,
          click: () => {
            evt.sender.send('show-context-menu-reply', item)
          }
        })
      })
      const menu = Menu.buildFromTemplate(template)
      menu.popup(BrowserWindow.fromWebContents(evt.sender))
    })
    // 登录
    ipcMain.on('app-login', async (evt, params) => {
      const data = await this.login()
      evt.reply('app-login-reply', data)
    })
    // 登录
    ipcMain.on('app-printToPdf', async (evt, options) => {
      const data = await this.printToPDF(options)
      evt.reply('app-printToPdf-reply', data)
    })
  }

  // 初始化readme文件
  async copyReadme() {
    // 复制readme文件到packages目录中
    return fs.copy(`${__static}/packages-readme.md`, global.$config.packagesdir + 'README.md')
  }

  // app初始化
  init() {
    return new Promise((resolve, reject) => {
      // 自动启动配置
      if (process.env.NODE_ENV == 'production') {
        app.setLoginItemSettings({
          openAtLogin: global.$config.app.autostart,
          openAsHidden: global.$config.app.autostart
        })
      }
      setTimeout(() => {
        resolve()
      }, 888)
    })
  }

  // 加载应用
  async loadApps() {
    // await this.copyReadme()
    // 所有应用的信息
    global.$apps = []
    // 遍历包存放目录
    const dirs = await this.eachdirs([global.$config.packagesdir])
    // 获取调试目录
    const debugdirs = global.$config.dev.debugdirs || []
    // 获取本地安装的app信息
    let localApps = await this.eachAppInfo(dirs, false)
    // 获取调试app信息
    let devApps = await this.eachAppInfo(debugdirs, true)
    // 合并混入
    global.$apps = [...localApps, ...devApps]
    this.runAppProcess()
    // 运行初始化任务
    await this.init()
    return global.$apps
  }

  // 遍历目录
  eachdirs(dirs) {
    return new Promise((resolve, reject) => {
      const apppaths = []
      var loopFun = (idx) => {
        try {
          const files = fs.readdirSync(dirs[idx])
          files.forEach((item, index) => {
            const apppath = `${dirs[idx]}/${item}`
            const stat = fs.lstatSync(apppath)
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
  eachAppInfo(dirs, debug) {
    return new Promise((resolve, reject) => {
      const apps = []
      // 已禁用的app列表
      const disabledApps = global.$config.disabledApps || []
      dirs.forEach(apppath => {
        try {
          const packageFile = fs.readFileSync(path.resolve(apppath + '/package.json'), 'utf-8')
          const configFile = fs.readFileSync(path.resolve(apppath + '/app.yaml'), 'utf-8')
          if (packageFile && configFile) {
            let config = YAML.parse(configFile)
            const packageJson = JSON.parse(packageFile)
            // 应用当前环境的配置
            let env = config.env || {}
            config = _.defaults(env[debug ? 'dev' : 'prod'] || {}, config)
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
              disabled: disabledApps.indexOf(packageJson.name) > -1,
              // 版本 dev
              debug
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

  // 运行app后台进程
  runAppProcess() {
    for (const app of global.$apps) {
      let appdir = app.debug ? app.path : global.$config.packagesdir + '/' + app.package.name
      const file = path.resolve(appdir + '/index.js')
      if (!fs.existsSync(file)) continue
      let wid = `w${Date.now()}`
      // 尝试运行应用的后台进程
      try {
        workers[wid] = new Worker(file, {
          workerData: {}
        })
      } catch (e) {
        console.log('worker error', e.message)
      }
      app.workerId = wid
      // 监听事件
      workers[wid].on('message', (res) => {
        // console.log(res.event, wid, 'message')
        // 触发主进程事件
        ipcMain.emit(res.event, {
          reply(event, data) {
            console.log(data, 'data')
          }
        })
        // ipcRenderer.send('app-get-apps', 'json')
      })
    }
    console.log('运行应用后台进程完毕')
  }

  // 打开应用
  async openWindow(app) {
    // console.log(app, 'app')
    // 获取宽高
    const {
      width,
      height
    } = screen.getPrimaryDisplay().workAreaSize
    const winconf = app.winconf || {}
    let winx = Math.abs((width * 0.5 - (winconf.width || 618) * 0.5)) + 28 * apps.size
    let winy = Math.abs((height * 0.5 - (winconf.height || 380) * 0.5)) + 28 * apps.size
    // 窗口百分比自适应
    if (winconf.width && winconf.width <= 1) winconf.width = width * winconf.width
    if (winconf.height && winconf.height <= 1) winconf.height = height * winconf.height
    const win = new BrowserWindow(_.merge({
      x: winconf.maximize ? 0 : winx,
      y: winconf.maximize ? 0 : winy,
      title: app.name,
      icon: app.icon,
      width: 618,
      height: 380,
      frame: true,
      backgroundColor: '#ffffff',
      resizable: true,
      maximizable: true,
      minimizable: true,
      alwaysOnTop: !winconf.fullscreen && _.isEmpty(global.$config.app.window.alwaysOnTop),
      autoHideMenuBar: true,
      fullscreenable: true,
      hasShadow: true,
      skipTaskbar: false,
      show: false,
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
        webSecurity: false,
        enableRemoteModule: true,
        contextIsolation: false
      },
      titleBarStyle: 'hiddenInset'
    }, winconf))
    win.winId = 'win_' + Date.now()
    apps.set(win.winId, win)
    win.on('closed', (win) => {
      apps.delete(win.sender.winId)
    })
    // win.openDevTools()
    let url = global.$config.app.protocol + '://./' + app.package.name + '/views/index.html'
    // 判断是否设置入口页面
    if (app.main) {
      app.main.indexOf('://') > -1 ? url = app.main : url = `${global.$config.app.protocol}://./${app.package.name}/${app.main}`
    }
    win.loadURL(url)
    // 启动窗口最大化
    if (winconf.maximize) win.maximize()
    win.webContents.executeJavaScript(`sessionStorage.setItem('winId','${win.winId}')`)
    // win.webContents.openDevTools()
    win.webContents.on('did-finish-load', function() {
      win.webContents.insertCSS(`
        /*---滚动条默认显示样式--*/
        ::-webkit-scrollbar-thumb {
          background-color: #ccc;
          height: 50px;
          outline-offset: -2px;
          outline: 2px solid transparent;
          -webkit-border-radius: 4px;
          border: 2px solid transparent;
        }
        /*---鼠标点击滚动条显示样式--*/
        ::-webkit-scrollbar-thumb:hover {
          background-color: #ccc;
          height: 50px;
          -webkit-border-radius: 4px;
        }
        /*---滚动条大小--*/
        ::-webkit-scrollbar {
          width: 3px;
          height: 3px;
          background: rgba(255,255,255,0);
        }
        /*---滚动框背景样式--*/
        ::-webkit-scrollbar-track-piece {
          -webkit-border-radius: 0;
          background: transparent;
        }
        `)
      win.show()
    })
    return win
  }

  // 关闭窗口
  closeWindow(winId) {
    // 尝试关闭
    try {
      apps.get(winId).close()
    } catch (e) {}
  }

  // 安装应用
  async install(app) {
    // 下载
    const tmpdir = global.$config.tmpdir + '/funtask/app/'
    const apppath = await io.download(app.dist.tarball, tmpdir)
    console.log('download complete')
    // 解压
    await compressing.tgz.uncompress(apppath + `${app.name}-${app.version}.tgz`, apppath + `${app.name}-${app.version}/`)
    console.log('unzip ok')
    // 清理原应用的文件夹
    await fs.remove(path.resolve(global.$config.packagesdir + `/${app.name}`))
    console.log('remove ok')
    // 复制 packages 至 funtask 安装目录
    await fs.copy(apppath + `${app.name}-${app.version}/package`, global.$config.packagesdir + `/${app.name}`)
    await this.loadApps()
    // 返回app信息给客户端
    return app
  }

  // 删除应用
  async uninstall(app) {
    console.log('remove ' + path.resolve(global.$config.packagesdir + `/${app.name}`))
    // 移除调试软件链接
    await this.unlink(app.name)
    // 删除文件夹
    await fs.remove(path.resolve(global.$config.packagesdir + `/${app.name}`))
    // 将app从禁用列表中移除
    await this.toggleApp(app, true)
    return app
  }

  // 取消链接
  async unlink(name) {
    // 读取配置文件
    const configFile = fs.readFileSync(path.resolve(global.$config.apphome + '/config.yaml'), 'utf-8')
    // 设置将app禁用
    const configJson = YAML.parse(configFile)
    // 初始化app
    configJson.dev.debugdirs ? '' : configJson.dev.debugdirs = []
    for (const idx in configJson.dev.debugdirs) {
      const dir = configJson.dev.debugdirs[idx]
      if (dir.indexOf(name) > -1) {
        configJson.dev.debugdirs.splice(idx, 1)
        break
      }
    }
    // 写入本地磁盘
    // console.log(YAML.stringify(configJson))
    try {
      await fs.writeFileSync(path.resolve(global.$config.apphome + '/config.yaml'), YAML.stringify(configJson))
    } catch (e) {
      // 如果报错则删除配置文件，重新写入
      await fs.remove(`${global.$config.apphome}/config.yaml`)
      // 重新写入
      await fs.writeFileSync(path.resolve(global.$config.apphome + '/config.yaml'), YAML.stringify(configJson))
    }
    return true
  }

  // 禁用应用
  async disable(app) {
    return this.toggleApp(app, false)
  }

  // 启用
  async enable(app) {
    return this.toggleApp(app, true)
  }

  async toggleApp(app, state) {
    // 读取配置文件
    const configFile = fs.readFileSync(path.resolve(global.$config.apphome + '/config.yaml'), 'utf-8')
    // 设置将app禁用
    const configJson = YAML.parse(configFile)
    // 初始化app
    configJson.disabledApps ? '' : configJson.disabledApps = []
    // app索引
    const appIdx = configJson.disabledApps.indexOf(app.name)
    // 启用 - 从禁用列表中移除
    if (state) {
      appIdx > -1 ? configJson.disabledApps.splice(appIdx, 1) : ''
    } else {
      // 禁用 - 加入禁用列表
      appIdx == -1 ? configJson.disabledApps.push(app.name) : ''
    }
    // 写入本地磁盘
    // console.log(YAML.stringify(configJson))
    await fs.outputFile(path.resolve(global.$config.apphome + '/config.yaml'), YAML.stringify(configJson))
    // 检查配置文件更新情况
    await this.checkAppStatus(state, app.name)
    // 重新加载app
    await this.loadApps()
    return app
  }

  // 检查app状态
  checkAppStatus(state, name) {
    return new Promise((resolve, reject) => {
      var loopFun = () => {
        const disabledApps = global.$config.disabledApps || []
        // 启用
        if (state) {
          disabledApps.indexOf(name) == -1 ? resolve(true) : setTimeout(loopFun, 150)
        }
        // 禁用
        if (!state) {
          disabledApps.indexOf(name) > -1 ? resolve(true) : setTimeout(loopFun, 150)
        }
      }
      loopFun()
    })
  }

  // 打开调试工具
  openDevTools(winId) {
    // 尝试关闭
    try {
      apps.get(winId).openDevTools()
    } catch (e) {}
  }

  // 登录
  async login() {
    let userInfo = store.get('userInfo')
    if (!userInfo || !userInfo.token) return {
      errmsg: 'not logged in',
      code: ''
    }
    let res = await axios.get('https://cloudapi.suwis.com/auth/login/getCode', {
      headers: {
        'token': userInfo.token
      }
    })
    if (res.data.errno != 0) return {
      errmsg: res.errmsg,
      code: ''
    }
    return {
      code: res.data.data
    }
  }

  // 打印pdf
  async printToPDF(options) {
    let win = apps.get(options.winId)
    try {
      let data = await win.webContents.printToPDF(options)
      if (!options.name) options.name = 'download.pdf'
      if (!options.path) options.path = path.resolve(`${os.homedir()}/Downloads/${options.name}`)
      await fs.writeFile(options.path, data)
      if (options.openFolder) {
        if (os.type() == 'Windows_NT') exec(`explorer.exe /select,${options.path}`)
      }
    } catch (e) {
      console.log(e)
    }
    return true
  }
}
