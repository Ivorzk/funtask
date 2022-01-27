# 框架

Funtask PC客户端是基于Electron开发的，所以你可以在渲染进程中使用 ipcRenderer 向主进程进行通讯，获取相应的数据，但建议使用funtask sdk和客户端进行通讯

## 获取全局配置

> 主进程中获取配置

```js
let config = global.$config
```

> 渲染进程中获取配置

```js
import { ipcRenderer } from 'electron'
ipcRenderer.send('config-get', 'json')
ipcRenderer.on('config-reply', (data) => {
  // config data
  console.log(data)
})
```

## 获取应用菜单

在渲染进程中可以通过以下方式获取全局菜单数据

```js
import { ipcRenderer } from 'electron'
ipcRenderer.send('apps-get', 'json')
ipcRenderer.on('apps-reply', (data) => {
  // apps data
  console.log(data)
})
```
