import {
  EventEmitter
} from 'events'
export default new class Event extends EventEmitter {

  // 首次使用构造器实例
  constructor() {
    super()
    if (!Event.instance) {
      Event.instance = this
    }
    return Event.instance
  }
}
