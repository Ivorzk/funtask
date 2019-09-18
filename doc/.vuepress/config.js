module.exports = {
  title: '丰潮极速大作战2.0',
  description: '丰潮极速大作战2.0',
  base: '/1909_fcgame/docs/.vuepress/dist/',
  themeConfig: {
    // 搜索
    search: true,
    searchMaxSuggestions: 10,
    // 最后一次更新
    lastUpdated: '上次更新:',
    nav: [{
      text: '主页',
      link: '/'
    }, {
      text: 'API文档',
      link: '#',
    }, {
      text: '项目介绍',
      link: '/project'
    }, {
      text: '更新日志',
      link: '/change-log'
    }, {
      text: 'markdown',
      link: 'http://www.markdown.cn/'
    }, {
      text: 'VuePress',
      link: 'https://vuepress.vuejs.org/zh/'
    }, {
      text: 'NPM',
      link: 'https://npm.suwis.com/'
    }, {
      text: 'PMS',
      link: 'http://svn.cloud-top.com.cn:82/index.php?c=login'
    }, {
      text: 'CTI',
      link: 'http://www.cloud-top.com.cn/'
    }],
    sidebar: [{
      title: '运维',
      collapsable: false,
      children: []
    }, {
      title: '全局',
      collapsable: false,
      children: [
        ['/dir.md', '目录结构'],
        ['/principal.md', '各模块负责人']
      ]
    }, {
      title: '第三工具',
      collapsable: false,
      children: [
        ['http://momentjs.cn/', 'momentjs']
      ]
    }, {
      title: '内部组件',
      collapsable: false,
      children: []
    }, {
      title: '第三方组件',
      collapsable: false,
      children: []
    }]
  }
}
