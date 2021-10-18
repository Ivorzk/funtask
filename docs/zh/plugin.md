# 插件

Funtask 只是一个基础框架，所有功能均由插件来实现，所以你可以通过安装各种插件来辅助你完成工作任务

## 目录结构

```shell
│  CHANGELOG.md // 更新日志文件
│  index.js // 插件入口文件（将被加载到主进程中）
│  app.yaml // 应用配置文件
│  LICENSE.md // 开源协议
│  logo.png // logo
│  package.json // 依赖文件
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

## 插件配置

通过app.yaml 可对插件进行一些个性化的配置，可配置项如下：

```yaml
# 应用名称
name: hello funtask
# 应用环境配置，一般开发环境和正式环境有所区别，通过此配置可避免每次开发需要来回更改配置文件的麻烦
env:
  # 开发环境
  dev:
    # 入口页面 default : views/index.html , 调试模式可以写成本地服务器地址例如： http://localhost:8080
    main:           http://localhost:8080
  # 生产环境
  prod:
    # 生产环境入口页面
    main:           views/index.html
# 应用窗体配置
winconf:
  # 窗体宽度 如果宽度值小于1则按照屏幕宽度的百分比设置 default 618
  width: 618
  # 窗体高度 如果高度值小于1则按照屏幕高度的百分比设置 default 380
  height: 380
  # 是否为无边框窗体 default true
  frame: true
  # 窗口是否总是在最前面 default true
  alwaysOnTop: true
  # 是否为透明窗体 default false
  transparent: true
  # 窗体背景颜色 default #ffffff
  backgroundColor: #00ffffff
  # 是否全屏  default false
  fullscreen: false
  # 默认窗口进入最大化 default false
  maximize: false
  # 窗体透明度 default 1
  opacity: 0.5
```
