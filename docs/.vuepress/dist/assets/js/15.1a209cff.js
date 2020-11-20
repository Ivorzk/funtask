(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{375:function(a,s,t){"use strict";t.r(s);var n=t(25),e=Object(n.a)({},(function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"开发指南"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#开发指南"}},[a._v("#")]),a._v(" 开发指南")]),a._v(" "),t("p",[a._v("Funtask借助Eelectron和uni-app这两个框架，实现了跨平台运行的能力，你只需要使用HTML+CSS+JS开发一套应用代码，即可在Windows、Mac、Linux、IOS、Android等多平台运行, 这将大幅度帮你降低开发成本，让你的应用模块快速上线")]),a._v(" "),t("h2",{attrs:{id:"开发第一个应用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#开发第一个应用"}},[a._v("#")]),a._v(" 开发第一个应用")]),a._v(" "),t("p",[a._v("funtask为你提供了一个开发脚手架，可帮你快速构建一个完整的应用目录及开发文件，使用方法如下")]),a._v(" "),t("div",{staticClass:"custom-block warning"},[t("p",{staticClass:"custom-block-title"},[a._v("注意")]),a._v(" "),t("p",[a._v("Funtask应用需要客户端承载才能运行，开发前请安装好Funtask客户端，并且配置好 Node.js开发环境")])]),a._v(" "),t("h4",{attrs:{id:"全局安装funtask-以npm为例"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#全局安装funtask-以npm为例"}},[a._v("#")]),a._v(" 全局安装Funtask(以npm为例)")]),a._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" -g @suwis/funtask\n")])])]),t("h4",{attrs:{id:"创建一个funtask应用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#创建一个funtask应用"}},[a._v("#")]),a._v(" 创建一个Funtask应用")]),a._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[a._v("funtask create hello-funtask\n")])])]),t("h4",{attrs:{id:"将应用软链接到funtask运行环境中"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#将应用软链接到funtask运行环境中"}},[a._v("#")]),a._v(" 将应用软链接到Funtask运行环境中")]),a._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("cd")]),a._v(" hello-funtask\n\nfuntask "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("link")]),a._v("\n")])])]),t("p",[a._v("以上步骤完成后，启动/重启funtask客户端方可看到效果")]),a._v(" "),t("h2",{attrs:{id:"移除软链接"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#移除软链接"}},[a._v("#")]),a._v(" 移除软链接")]),a._v(" "),t("p",[a._v("应用调试完毕，需要运行unlink命令将本地应用从Funtask运行环境中移除")]),a._v(" "),t("p",[a._v("以"),t("code",[a._v("funtask-api-demos")]),a._v("为例：")]),a._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[a._v("funtask unlink funtask"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("api"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("demos\n")])])]),t("h2",{attrs:{id:"应用目录结构说明"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#应用目录结构说明"}},[a._v("#")]),a._v(" 应用目录结构说明")]),a._v(" "),t("p",[a._v("Funtask 遵循 “约定优于配置” 的原则，插件的目录结构如下：")]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[a._v("│  CHANGELOG.md // 更新日志文件\n│  index.js // 插件入口文件（将被加载到主进程中）\n│  app.yaml // 应用配置\n│  LICENSE.md // 开源协议\n│  logo.png // logo\n│  package.json // 依赖文件\n│  app.json // 应用配置文件\n│\n├─keymaps // 快捷键配置\n│      keymap.json\n│\n├─menus // 菜单配置\n│      menus.json\n│\n└─views // 视图文件\n        index.html\n")])])]),t("h2",{attrs:{id:"发布funtask应用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#发布funtask应用"}},[a._v("#")]),a._v(" 发布Funtask应用")]),a._v(" "),t("p",[a._v("funtask会自动去npm上搜索@funtask/开头的应用，所以你只要将应用发布到npm上即可")]),a._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[a._v("// 进入工程目录，运行下面的命令\n"),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" publish\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);