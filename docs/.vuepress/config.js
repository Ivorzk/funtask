module.exports = {
  base: '/',
  plugins: [
    '@vuepress/active-header-links',
    '@vuepress/back-to-top',
    'vuepress-plugin-zooming'
  ],
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      selectText: '选择语言',
      lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
      title: 'funtask',
      description: '高效、快乐、人性化的工作方式'
    },
    '/en/': {
      selectText: 'Languages',
      lang: 'en-US',
      title: 'funtask',
      description: 'Efficient, happy, humane way of working'
    }
  },
  themeConfig: {
    // 搜索
    search: true,
    searchMaxSuggestions: 10,
    // 最后一次更新
    lastUpdated: '上次更新',
    nav: [{
      text: '主页',
      link: '/'
    }, {
      text: '项目介绍',
      link: '/project'
    }, {
      text: '更新日志',
      link: '/change-log'
    }],
    sidebar: [{
      title: '全局',
      collapsable: false,
      children: [
        ['/framework.md', '架构概览'],
        ['/dir.md', '目录结构']
        // ['/principal.md', '各模块负责人']
      ]
    }, {
      title: 'API',
      collapsable: false,
      children: []
    }, {
      title: '插件',
      collapsable: false,
      children: [
        ['/zh/plugin-dev.md', '插件开发指南']
      ]
    }]
  }
}
