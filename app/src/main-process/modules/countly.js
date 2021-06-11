/**
 * 主进程 countly 统计模块
 */
import {
  BrowserWindow
} from 'electron'
export default class {

  // 往渲染进程提交
  static $emit(key, value) {
    let win = BrowserWindow.getAllWindows()[0]
    if (!win) return
    win.webContents.send('countly-emit', {
      key,
      value
    })
  }
}
