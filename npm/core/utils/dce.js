/**
 * 渲染进程&主进程通讯辅助工具
 */
import electron from './electron'
export default new class {
  constructor() {
    // 事件队列
    this.queues = {}
    this.keymaping = []
  }

  // 向主进程发送数据
  send(key, data, callback) {
    electron.ipcRenderer.send(key, data)
    this.queues[key] ? this.queues[key].push(callback) : this.queues[key] = [callback]
    // 判断是否监听过
    if (this.keymaping.indexOf(key) != -1) return
    this.keymaping.push(key)
    // 监听事件
    electron.ipcRenderer.on(`${key}-reply`, (evt, data) => {
      let item = this.queues[key].pop()
      if (item) item.resolve(data)
    })
  }
}
