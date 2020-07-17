import {
  ipcMain
} from 'electron'
import os from 'os'
import process from 'child_process'
export default class {

  constructor() {

    ipcMain.on('system-get-info', async (evt, dataType) => {
      let data = await this.getInfo(dataType)
      evt.reply('system-get-info-reply', data)
    })

    ipcMain.on('system-get-uuid', async (evt, dataType) => {
      let data = await this.getUUID(dataType)
      evt.reply('system-get-uuid-reply', data)
    })
  }

  // 获取系统信息
  async getInfo() {
    let info = {}
    for (let key in os) {
      if (key.indexOf('set') == 0) continue
      typeof os[key] == 'function' ? info[key] = os[key]() : info[key] = os[key]
    }
    return info
  }

  // 获取uuid
  async getUUID() {
    let res = process.execSync('wmic csproduct get UUID', {
      encoding: 'UTF-8'
    })
    let uuid = res.replace('UUID', '').replace(/[\r\n]/g, '').replace(/\s+/g, '')
    return uuid
  }
}
