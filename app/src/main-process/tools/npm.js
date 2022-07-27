/**
 * npm 工具模块
 */
import axios from 'axios'
export default new class {
  // 搜索
  async search(keyword) {
    let res = await axios.get(`https://www.npmjs.com/search/suggestions?q=${keyword}`)
    console.log(res, 'res')
    return res.data || []
  }
}
