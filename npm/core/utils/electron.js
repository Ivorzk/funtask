export default new class {
  get ipcRenderer() {
    return window.require('electron').ipcRenderer
  }
}
