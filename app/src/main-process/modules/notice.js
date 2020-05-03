import {
  ipcMain,
  Notification
} from 'electron'
export default class {
  constructor() {
    ipcMain.on('notice-send', async (evt, data) => {
      let res = await this.send(data)
      evt.reply('notice-send-reply', res)
    })
  }

  // 发送通知
  async send(data) {
    // 监测系统是否支持
    if (!Notification.isSupported()) {
      console.log('not supported')
      return false
    }
    console.log(data)
    let notice = new Notification({
      ...data
    })
    notice.show()
    return true
  }
}
