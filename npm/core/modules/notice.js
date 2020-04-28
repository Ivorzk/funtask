import electron from './../utils/electron'
export default {
  // 发送消息
  send(data) {
    return new Promise((resolve, reject) => {
      electron.ipcRenderer.send('notice-send', data)
      electron.ipcRenderer.once('notice-send-reply', (evt, data) => {
        resolve(data)
      })
    })
  }
}
