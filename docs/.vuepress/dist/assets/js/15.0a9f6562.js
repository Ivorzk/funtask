(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{374:function(s,a,t){"use strict";t.r(a);var n=t(25),e=Object(n.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"开发指南"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#开发指南"}},[s._v("#")]),s._v(" 开发指南")]),s._v(" "),t("p",[s._v("Funtask借助Eelectron和uni-app这两个框架，实现了跨平台运行的能力，你只需要使用HTML+CSS+JS开发一套应用代码，即可在Windows、Mac、Linux、IOS、Android等多平台运行, 这将大幅度帮你降低开发成本，让你的应用模块快速上线")]),s._v(" "),t("h2",{attrs:{id:"开发第一个应用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#开发第一个应用"}},[s._v("#")]),s._v(" 开发第一个应用")]),s._v(" "),t("p",[s._v("funtask为你提供了一个开发脚手架，可帮你快速构建一个完整的应用目录及开发文件，使用方法如下")]),s._v(" "),t("div",{staticClass:"custom-block warning"},[t("p",{staticClass:"custom-block-title"},[s._v("注意")]),s._v(" "),t("p",[s._v("Funtask应用需要客户端承载才能运行，开发前请安装好Funtask客户端，并且配置好 Node.js开发环境")])]),s._v(" "),t("h4",{attrs:{id:"全局安装funtask-以npm为例"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#全局安装funtask-以npm为例"}},[s._v("#")]),s._v(" 全局安装Funtask(以npm为例)")]),s._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" -g @suwis/funtask\n")])])]),t("h4",{attrs:{id:"创建一个funtask应用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#创建一个funtask应用"}},[s._v("#")]),s._v(" 创建一个Funtask应用")]),s._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("funtask create hello-funtask\n")])])]),t("h4",{attrs:{id:"本地引入应用到funtask中"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#本地引入应用到funtask中"}},[s._v("#")]),s._v(" 本地引入应用到Funtask中")]),s._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" hello-funtask\n\nfuntask "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("link")]),s._v("\n")])])]),t("p",[s._v("以上步骤完成后，启动/重启funtask客户端方可看到效果")]),s._v(" "),t("h2",{attrs:{id:"应用目录结构说明"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#应用目录结构说明"}},[s._v("#")]),s._v(" 应用目录结构说明")]),s._v(" "),t("p",[s._v("Funtask 遵循 “约定优于配置” 的原则，插件的目录结构如下：")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("│  CHANGELOG.md // 更新日志文件\n│  index.js // 插件入口文件（将被加载到主进程中）\n│  app.yaml // 应用配置\n│  LICENSE.md // 开源协议\n│  logo.png // logo\n│  package.json // 依赖文件\n│  app.json // 应用配置文件\n│\n├─keymaps // 快捷键配置\n│      keymap.json\n│\n├─menus // 菜单配置\n│      menus.json\n│\n└─views // 视图文件\n        index.html\n")])])]),t("h2",{attrs:{id:"发布funtask应用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#发布funtask应用"}},[s._v("#")]),s._v(" 发布Funtask应用")]),s._v(" "),t("p",[s._v("funtask会自动去npm上搜索@funtask/开头的应用，所以你只要将应用发布到npm上即可")]),s._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("// 进入工程目录，运行下面的命令\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" publish\n")])])])])}),[],!1,null,null,null);a.default=e.exports}}]);