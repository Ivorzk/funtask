/**
 * 系统托盘
 */
import {
  app,
  Menu,
  Tray,
  ipcMain
} from 'electron'
import path from 'path'
export default class {
  constructor() {
    // 托盘示例
    this.tray = null
  }

  // 获取图标
  get icon() {
    return global.$config.app.tray.icon || path.resolve(`${__static}/favicon.ico`)
  }

  // 设置icon
  set icon(icon) {
    global.$config.app.tray.icon = icon
  }

  // 获取描述
  get tip() {
    return global.$config.app.tray.tip || `Funtask`
  }

  // 设置描述
  set tip(tip) {
    global.$config.app.tray.tip = tip
  }

  // 初始化系统托盘
  createTray() {
    app.on('ready', () => {
      this.tray = new Tray(this.icon)
      const contextMenu = Menu.buildFromTemplate([{
        label: '退出',
        type: 'normal',
        role: 'quit'
      }])
      // 设置悬浮描述
      this.tray.setToolTip(this.tip)
      this.tray.setContextMenu(contextMenu)
      // 监听单击事件
      this.tray.on('click', () => {
        // 切换悬浮球
        ipcMain.emit('ball-toggle')
      })
    })
  }

  // 显示托盘
  show() {

  }

  // 隐藏托盘
  hide() {

  }

  // 闪烁
  twinkle() {

  }
}
