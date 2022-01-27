# 开发指南

Funtask借助Eelectron和flutter这两个框架，实现了跨平台运行的能力，你只需要使用HTML+CSS+JS开发一套应用代码，即可在Windows、Mac、Linux、IOS、Android等多平台运行, 这将大幅度帮你降低开发成本，让你的应用模块快速上线

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

#### 将应用软链接到Funtask运行环境中

```sh
cd hello-funtask

funtask link
```

以上步骤完成后，启动/重启funtask客户端方可看到效果

## 移除软链接

应用调试完毕，需要运行unlink命令将本地应用从Funtask运行环境中移除

以`funtask-api-demos`为例：

```js
funtask unlink funtask-api-demos
```

或者进入项目根目录直接运行

```js
// unlink 后面不带插件名的话，系统会尝试寻找当前命令所在目录的插件
funtask unlink
```

## 应用目录结构说明

Funtask 遵循 “约定优于配置” 的原则，插件的目录结构如下：

```shell
│  CHANGELOG.md // 更新日志文件
│  index.js // 插件入口文件（将被加载到主进程中）
│  app.yaml // 应用配置
│  LICENSE.md // 开源协议
│  logo.png // logo
│  package.json // 依赖文件
│  app.json // 应用配置文件
│
├─keymaps // 快捷键配置
│      keymap.json
│
├─menus // 菜单配置
│      menus.json
│
└─views // 视图文件
        index.html
```

## 发布Funtask应用

funtask会自动去npm上搜索@funtask/开头的应用，所以你只要将应用发布到npm上即可

```sh
// 进入工程目录，运行下面的命令
npm publish
```
