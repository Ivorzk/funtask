# API

::: tip
在使用API前，需要引入funtask sdk
:::

```js
import funtask from "@suwis/funtask/core"
```

## system

系统模块

### funtask.system.getInfo

获取应用信息

```js
async getSystemInfo() {
  let result = await funtask.system.getInfo()
  console.log(result)
}
```

## config

Funtask 配置模块

### funtask.config.get

获取Funtask配置

```js
async getConfig() {
  let result = await funtask.config.get()
  console.log(result)
}
```

## io

文件操作模块

### funtask.io.download

下载文件

```js
async download() {
  let result = await funtask.io.download(options)
  console.log(result)
}
```

> options 参数结构

| 名称  | 说明      | 类型     | 默认值 |
| :-- | :------ | ------ | --- |
| url | 下载的文件地址 | String | -   |

## app

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

## notice

系统通知模块

### funtask.notice.send

发送系统通知消息

```js
async send() {
  let result = await funtask.notice.send(options)
  console.log(result)
}
```

> options 参数结构

| 名称      | 说明   | 类型     | 默认值 |
| :------ | :--- | ------ | --- |
| title   | 推送标题 | String | -   |
| content | 推送内容 | String | -   |

## bluetooth

蓝牙模块

### funtask.bluetooth.getDevices

获取蓝牙列表
