import {
  ipcRenderer
} from 'electron'
export default {
  // 发送消息
  send(data) {
    return new Promise((resolve, reject) => {
      ipcRenderer.send('notice-send', data)
      ipcRenderer.on('notice-send-reply', (data) => {
        resolve(data)
      })
    })
  }
}
