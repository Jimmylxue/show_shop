import axios from 'axios'

export default {
  async addorder(params) {
    console.log('hellio')
    return await axios.post('/api/client/order/addOrder', params)
  },
}
