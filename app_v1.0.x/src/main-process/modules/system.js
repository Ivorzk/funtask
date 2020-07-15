import {
  ipcMain
} from 'electron'
import os from 'os'
export default class {

  constructor() {
    ipcMain.on('system-get-info', async (evt, dataType) => {
      let data = await this.getInfo(dataType)
      evt.reply('system-get-info-reply', data)
    })
  }

  // 下载文件
  async getInfo() {
    let info = {}
    for (let key in os) {
      if (key.indexOf('set') == 0) continue
      typeof os[key] == 'function' ? info[key] = os[key]() : info[key] = os[key]
    }
    return info
  }
}
