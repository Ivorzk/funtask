# 框架

Funtask客户端是基于Electron开发的，所以你可以在渲染进程中使用 ipcRenderer 向主进程进行通讯，获取相应的数据

## 获取全局配置

在渲染进程中可以通过以下方式获取全局的配置文件数据

```js
import { ipcRenderer } from 'electron'
ipcRenderer.send('config-get', 'json')
ipcRenderer.on('config-reply', (data) => {
  // config data
  console.log(data)
})
```
