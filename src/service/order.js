import axios from 'axios'

export default {
  async addorder(params) {
    return await axios.post('/api/client/order/addOrder', params)
  },
  async getorder(params) {
    return await axios.post('/api/client/order/getOrder', params)
  },
}
