/**
 * loader转化
 * 用于转换npm和verdaccio的数据结构
 * 方便程序中使用
 */
export default new class {

  /**
   * npm
   */
  npm(data = []) {
    // console.log(data, 'npm')
    let list = []
    for (let item of data) {
      if (item.name.indexOf('funtask-') != 0) continue
      list.push({
        source: 'npm',
        name: item.name,
        version: item.version,
        publisher: item.publisher,
        date: item.date,
        keywords: item.keywords,
        description: item.description,
        dist: {
          // 拼接下载地址
          tarball: `https://registry.npmjs.org/${item.name}/-/${item.name}-${item.version}.tgz`
        }
      })
    }
    return list
  }

  /**
   * 私有库
   */
  verdaccio(data = []) {
    // console.log(data, 'verdaccio')
    let list = []
    for (let item of data) {
      if (!item._npmUser) continue
      if (item.name.indexOf('funtask-') != 0) continue
      list.push({
        source: 'verdaccio',
        name: item.name,
        version: item.version,
        publisher: {
          email: item._npmUser.email,
          username: item._npmUser.name
        },
        date: item.time || '',
        keywords: item.keywords,
        description: item.description,
        dist: {
          // 拼接下载地址
          tarball: item.tarball
        }
      })
    }
    return list
  }
}
