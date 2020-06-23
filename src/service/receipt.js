import axios from 'axios'

export default {
  async getUserReceipt(params) {
    return axios.post('/api/client/receipt/getReceipt', params)
  },
  async addUserReceipt(params) {
    return axios.post('/api/client/receipt/addReceipt', params)
  },
}
