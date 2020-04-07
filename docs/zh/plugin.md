# 插件

Funtask 只是一个基础框架，所有功能均由插件来实现，所以你可以通过安装各种插件来辅助你完成工作任务

## 目录结构

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

## 插件配置

通过app.json 可对插件进行一些个性化的配置，可配置项如下：

| 名称   | 描述   | 数据类型   | 默认值 |
| :--- | :--- | :----- | :-- |
| name | 应用名称 | String | -   |
