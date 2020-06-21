import axios from 'axios'

export default {
  async addCart(params) {
    return await axios.post('/api/client/cart/addCart', params)
  },
  async cartList(params) {
    return await axios.post('/api/client/cart/cartList', params)
  },
  async deleteOne(params) {
    return await axios.post('/api/client/cart/deleteOne', params)
  },
}
