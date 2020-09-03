module.exports = {
  base: '/',
  head: [
    ['link', {
      rel: 'icon',
      href: '/favicon.ico'
    }],
    ['meta', {
      name: 'keywords',
      content: 'Funtask, SUWIS, 工具, 高效办公'
    }],
    ['meta', {
      name: 'viewport',
      content: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'
    }]
  ],
  plugins: [
    '@vuepress/active-header-links',
    '@vuepress/back-to-top',
    'vuepress-plugin-zooming',
    'vuepress-plugin-smooth-scroll',
    'vuepress-plugin-baidu-autopush',
    ['vuepress-plugin-baidu-google-analytics', {
      hm: 'e8d6d776c48a38d9d9420ec938a537fe',
      ga: '',
      ignore_hash: false
    }]
  ],
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      selectText: '选择语言',
      lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
      title: 'funtask™',
      description: '高效、快乐、人性化的工作方式'
    },
    // '/en/': {
    //   selectText: 'Languages',
    //   lang: 'en-US',
    //   title: 'funtask',
    //   description: 'Efficient, happy, humane way of working'
    // }
  },
  theme: 'funtask',
  themeConfig: {
    // 搜索
    search: true,
    searchMaxSuggestions: 10,
    displayAllHeaders: true,
    sidebar: 'auto',
    // 最后一次更新
    lastUpdated: '上次更新',
    markdown: {
      extractHeaders: ['h2', 'h3', 'h4', 'h5']
    },
    nav: [{
      text: '主页',
      link: '/'
    }, {
      text: '社区',
      link: 'https://funtask.club'
    }, {
      text: 'VI',
      link: '/zh/vi'
    }, {
      text: '应用下载',
      link: '/zh/devguide.html#funtask桌面端下载'
    }, {
      text: '更新日志',
      link: '/zh/change-log'
    }],
    sidebar: {
      '/zh/': [
        'introduction',
        'devguide',
        // 'framework',
        'plugin',
        'api'
      ]
    }
  }
}
