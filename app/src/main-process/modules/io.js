import download from 'download'

export default new class {

  // 下载文件
  async download(repo, path) {
    console.log('download ' + repo, global.$config.tmpdir)
    await download(repo, path || global.$config.tmpdir + '/funtask/')
  }
}
