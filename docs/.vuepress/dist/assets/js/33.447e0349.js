(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{492:function(t,a,s){"use strict";s.r(a);var n=s(27),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"插件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#插件"}},[t._v("#")]),t._v(" 插件")]),t._v(" "),s("p",[t._v("Funtask 只是一个基础框架，所有功能均由插件来实现，所以你可以通过安装各种插件来辅助你完成工作任务")]),t._v(" "),s("h2",{attrs:{id:"目录结构"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#目录结构"}},[t._v("#")]),t._v(" 目录结构")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[t._v("│  CHANGELOG.md // 更新日志文件\n│  index.js // 插件入口文件（将被加载到主进程中）\n│  app.yaml // 应用配置文件\n│  LICENSE.md // 开源协议\n│  logo.png // logo\n│  package.json // 依赖文件\n│\n├─keymaps // 快捷键配置\n│      keymap.json\n│\n├─menus // 菜单配置\n│      menus.json\n│\n└─views // 视图文件\n        index.html\n")])])]),s("h2",{attrs:{id:"插件配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#插件配置"}},[t._v("#")]),t._v(" 插件配置")]),t._v(" "),s("p",[t._v("通过app.yaml 可对插件进行一些个性化的配置，可配置项如下：")]),t._v(" "),s("div",{staticClass:"language-yaml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yaml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 应用名称")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" hello funtask\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 应用环境配置，一般开发环境和正式环境有所区别，通过此配置可避免每次开发需要来回更改配置文件的麻烦")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("env")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 开发环境")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("dev")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 入口页面 default : views/index.html , 调试模式可以写成本地服务器地址例如： http://localhost:8080")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("main")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("           http"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("//localhost"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("8080")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 生产环境")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("prod")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 生产环境入口页面")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("main")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("           views/index.html\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 应用窗体配置")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("winconf")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 窗体宽度 如果宽度值小于1则按照屏幕宽度的百分比设置 default 618")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("width")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("618")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 窗体高度 如果高度值小于1则按照屏幕高度的百分比设置 default 380")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("height")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("380")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 是否为无边框窗体 default true")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("frame")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("true")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 窗口是否总是在最前面 default true")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("alwaysOnTop")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("true")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 是否为透明窗体 default false")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("transparent")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("true")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 窗体背景颜色 default #ffffff")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("backgroundColor")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#00ffffff")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 是否全屏  default false")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("fullscreen")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("false")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 默认窗口进入最大化 default false")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("maximize")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("false")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 窗体透明度 default 1")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("opacity")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),t._v("\n")])])])])}),[],!1,null,null,null);a.default=e.exports}}]);