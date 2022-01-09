/**
 * 渲染进程&主进程通讯辅助工具
 */
import electron from './electron'
let threads = {}
let env = typeof window !== 'undefined' ? 'browser' : 'node'
export default new class {
  constructor() {
    // 判断是否在node环境中工作
    if (env == 'node') {
      let thread = 'worker_threads'
      threads = require(thread)
    }
    // 事件队列
    this.queues = {}
    this.keymaping = []
  }

  // 向主进程发送数据
  send(key, data, callback) {
    // 判断是否是worker_threads发来的
    if (threads.parentPort) {
      this.worker(key, data, callback)
    } else {
      this.electron(key, data, callback)
    }
  }

  // 页面发过来的
  electron(key, data, callback) {
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

  // 工作线程
  worker(key, data, callback) {
    threads.parentPort.postMessage({
      event: key,
      data: data
    })
    this.queues[key] ? this.queues[key].push(callback) : this.queues[key] = [callback]
    // 监听主进程发来的数据
    thread.parentPort.once('message', (data) => {
      let item = this.queues[key].pop()
      if (item) item.resolve(data)
    })
  }
}
