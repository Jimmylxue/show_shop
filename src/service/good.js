import axios from 'axios'

export default {
  // 详情
  async getGood(params) {
    return await axios.get(`/api/client/good/allgood?id=${params}`)
  },
  async getSomeGood(params) {
    return await axios.post('/api/client/good/getSomeGood', params)
  },
  // 输入框模糊查询
  async getFuzzyQuery(params) {
    return await axios.post('/api/client/good/fuzzy', params)
  },
}
