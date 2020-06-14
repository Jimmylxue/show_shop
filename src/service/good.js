import axios from 'axios'

export default {
  // 详情
  async getGood(params) {
    return await axios.get(`/api/client/good/allgood?id=${params}`)
  },
}
