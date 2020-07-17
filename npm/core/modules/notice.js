import electron from './../utils/electron'
export default new class {
  // 发送消息
  send(data) {
    return new Promise((resolve, reject) => {
      electron.ipcRenderer.send('notice-send', data)
      electron.ipcRenderer.once('notice-send-reply', (evt, data) => {
        resolve(data)
      })
    })
  }

  // 获取消息列表
  getList(data) {
    return new Promise((resolve, reject) => {
      electron.ipcRenderer.send('notice-get-list', data)
      electron.ipcRenderer.once('notice-get-list-reply', (evt, data) => {
        resolve(data)
      })
    })
  }

  // 删除消息
  remove(data) {
    return new Promise((resolve, reject) => {
      electron.ipcRenderer.send('notice-remove', data)
      electron.ipcRenderer.once('notice-remove-reply', (evt, data) => {
        resolve(data)
      })
    })
  }
}
