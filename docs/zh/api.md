# API

::: tip
在使用API前，需要引入funtask sdk
:::

```js
import funtask from "@suwis/funtask"
```

## system 系统

系统模块

### funtask.system.getInfo

获取应用信息

```js
async getSystemInfo() {
  let result = await funtask.system.getInfo()
  console.log(result)
}
```

### funtask.system.getUUID

获取设备唯一标识

```js
async getUUID() {
  let uuid = await funtask.system.getUUID()
  console.log(uuid)
}
```

## config 配置

Funtask 配置模块

### funtask.config.get

获取Funtask配置

```js
async getConfig() {
  let result = await funtask.config.get()
  console.log(result)
}
```

### funtask.config.set

设置Funtask配置

```js
async getConfig() {
  let result = await funtask.config.set(options)
  console.log(result)
}
```

### funtask.config.getUserInfo

获取登录用户信息

```js
async getUserInfo() {
  let result = await funtask.config.getUserInfo()
  console.log(result)
}
```

## io 文件操作

文件操作模块

### funtask.io.download

下载文件

```js
async download() {
  let result = await funtask.io.download(url,path)
  console.log(result)
}
```

> options 参数结构

| 名称   | 说明      | 类型     | 默认值          |
| :--- | :------ | ------ | ------------ |
| url  | 下载的文件地址 | String | -            |
| path | 目标存储位置  | String | Temp/funtask |

## app 应用管理

应用管理模块

### funtask.app.install

安装应用

```js
async install() {
  let result = await funtask.app.install(options)
  console.log(result)
}
```

> options 参数结构

| 名称          | 说明   | 类型     | 默认值      |
| :---------- | :--- | ------ | -------- |
| name        | 应用名称 | String | -        |
| version     | 版本   | String | -        |
| scope       | 范围   | String | unscoped |
| description | 应用描述 | String |          |

### funtask.app.uninstall

卸载应用

```js
async uninstall() {
  let result = await funtask.app.uninstall(options)
  console.log(result)
}
```

> options 参数结构

| 名称          | 说明   | 类型     | 默认值      |
| :---------- | :--- | ------ | -------- |
| name        | 应用名称 | String | -        |
| version     | 版本   | String | -        |
| scope       | 范围   | String | unscoped |
| description | 应用描述 | String |          |

### funtask.app.setting

配置应用

```js
async setting() {
  let result = await funtask.app.setting(options)
  console.log(result)
}
```

> options 参数结构

| 名称      | 说明     | 类型     | 默认值 |
| :------ | :----- | ------ | --- |
| name    | 应用名称   | String | -   |
| version | 版本     | String | -   |
| data    | 应用配置数据 | Object | -   |

### funtask.app.disable

禁用应用

```js
async disable() {
  let result = await funtask.app.disable(options)
  console.log(result)
}
```

> options 参数结构

| 名称      | 说明   | 类型     | 默认值 |
| :------ | :--- | ------ | --- |
| name    | 应用名称 | String | -   |
| version | 版本   | String | -   |

### funtask.app.enable

启用应用

```js
async enable() {
  let result = await funtask.app.enable(options)
  console.log(result)
}
```

> options 参数结构

| 名称      | 说明   | 类型     | 默认值 |
| :------ | :--- | ------ | --- |
| name    | 应用名称 | String | -   |
| version | 版本   | String | -   |

### funtask.app.getApps

获取Funtask已安装应用菜单

```js
async getApps() {
  let result = await funtask.app.getApps()
  console.log(result)
}
```

### funtask.app.start

启动一个应用

```js
let apps = await funtask.app.getApps()
var app = apps[0]
await funtask.app.start(app)
```

### funtask.app.stop

关闭应用, 默认关闭当前窗口

```js
funtask.app.stop()
```

### funtask.app.openDevTools

打开调试工具

```js
funtask.app.openDevTools()
```

### funtask.app.showContextMenu

打开右键菜单

```js
funtask.app.showContextMenu([{
  label: '打开',
  key: 'start'
}]).then((item) => {
  console.log(item)
})
```

## notice 通知

系统通知模块

### funtask.notice.send

发送系统通知消息

```js
async send() {
  let result = await funtask.notice.send(options)
  console.log(result)
}
```

> options

```js
{
  title: '有新版本更新', // 标题
  body: '点击下载', // 内容
  icon: 'https://funtask.dev/funtask.svg', // 图标
  url: 'https://funtask.dev/zh/introduction.html#funtask客户端下载',  // 点击消息后需要打开的url
  command: 'api-demos:open' // 应用唤起命令
}
```

默认 url 和 command 如果都有值的话，都会被执行

### funtask.notice.getList

获取通知列表

```js
async getList() {
  let result = await funtask.notice.getList()
  console.log(result)
  // result => [{title: '标题', icon: 'xxx.jpg', body: '主内容'}]
}
```

## clipboard 粘贴板

粘贴板模块

### funtask.clipboard.writeText

往粘贴板写入文本

```js
// 写入
funtask.clipboard.writeText('hello world')
```

### funtask.clipboard.readText

从粘贴板获取文本

```js
// 读取
let text = funtask.clipboard.readText()

// => hello world
```

### funtask.clipboard.writeHTML

往粘贴板写入HTML

```js
// 写入
funtask.clipboard.writeHTML('<h1>hello world</h1>')
```

### funtask.clipboard.readHTML

从粘贴板获取HTML

```js
// 读取
let html = funtask.clipboard.readText()

// => <h1>hello world</h1>
```

### funtask.clipboard.writeImage

往粘贴板写入图片

```js
// 写入
funtask.clipboard.writeImage(base64|NativeImage)
```

### funtask.clipboard.readImage

从粘贴板获取文本

```js
// 读取
let img = funtask.clipboard.readText()

console.log(img.toDataURL())

// => base64
```

## bluetooth 蓝牙

蓝牙模块

### funtask.bluetooth.getDevices

获取蓝牙列表
