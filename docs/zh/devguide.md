# 开发指南

Funtask借助Eelectron和uni-app这两个框架，实现了跨平台运行的能力，你只需要使用HTML+CSS+JS开发一套应用代码，即可在Windows、Mac、Linux、IOS、Android等多平台运行, 这将大幅度帮你降低开发成本，让你的应用模块快速上线

## Funtask客户端下载

| 平台      | 应用大小 | 更新时间       | 版本号    | 下载链接                                                                     |
| :------ | :--- | :--------- | :----- | :----------------------------------------------------------------------- |
| Windows | 39M  | 2019-11-18 | v1.0.1 | [点击下载](https://funtask.dev/download/windows/funtask%20Setup%201.0.1.exe) |
| Mac     | 39M  | 2019-11-18 | v1.0.1 | [点击下载](https://funtask.dev/download/windows-step.exe)                    |
| Linux   | 39M  | 2019-11-18 | v1.0.1 | [点击下载](https://funtask.dev/download/windows-step.exe)                    |

## 开发第一个应用

funtask为你提供了一个开发脚手架，可帮你快速构建一个完整的应用目录及开发文件，使用方法如下

::: warning
Funtask应用需要客户端承载才能运行，开发前请安装好Funtask客户端，并且配置好 Node.js开发环境
:::

#### 全局安装Funtask(以npm为例)

```sh
npm install -g @suwis/funtask
```

#### 创建一个Funtask应用

```sh
funtask create hello-funtask
```

#### 本地引入应用到Funtask中

```sh
cd hello-funtask

funtask link
```

以上步骤完成后，启动/重启funtask客户端方可看到效果

## 应用目录结构说明

Funtask 遵循 “约定优于配置” 的原则，插件的目录结构如下：

    .
    │  CHANGELOG.md // 修改日志
    │  index.js // 应用入口文件
    │  LICENSE.md // 协议
    │  logo.png // 应用logo
    │  package.json // npm 依赖文件
    │
    ├─keymaps
    │      keymap.json // 快捷键绑定
    │
    └─menus
            menus.json // 菜单文件

## 发布Funtask应用

funtask会自动去npm上搜索@funtask/开头的应用，所以你只要将应用发布到npm上即可

```sh
// 进入工程目录，运行下面的命令
npm publish
```
