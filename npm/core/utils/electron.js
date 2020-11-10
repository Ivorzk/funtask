export default new class {
  get ipcRenderer() {
    return window.require('electron').ipcRenderer
  }

  get shell() {
    return window.require('electron').shell
  }

  get clipboard() {
    return window.require('electron').clipboard
  }
}
