module.exports = {
  // 不同环境环境配置
  env: {
    // 开发环境
    dev: {
      apihost: 'http://cloudapi.suwis.com',
      uploadhost: 'http://cloudapi.suwis.com'
    },
    // 测试环境
    test: {
      apihost: 'http://cloudapi.suwis.com',
      uploadhost: 'http://cloudapi.suwis.com'
    },
    // 投产环境
    prod: {
      apihost: 'http://cloudapi.suwis.com',
      uploadhost: 'http://cloudapi.suwis.com'
    }
  },
  // 公用配置
  common: {
    // 接口超时时间
    timeout: 20000
  }
}
