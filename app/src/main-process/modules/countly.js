/**
 * 主进程 countly 统计模块
 */
import {
  BrowserWindow,
  app
} from 'electron'
export default new class {
  constructor() {
    app.on('ready', () => {
      // TODO: 监听主进程发送过来的事件
    })
  }

  emit(key, value) {
    let ball = BrowserWindow.fromId('ball')
    if (!ball) return
    ball.webContents.send('countly-emit', {
      key,
      value
    })
  }
}
