import electron from './../utils/electron'
export default {
  // 发送消息
  send(data) {
    return new Promise((resolve, reject) => {
      electron.ipcRenderer.send('notice-send', data)
      electron.ipcRenderer.on('notice-send-reply', (data) => {
        resolve(data)
      })
    })
  }
}
