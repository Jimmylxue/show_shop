import axios from 'axios'

export default {
  async getSlider() {
    return await axios.get('/api/ui/slider/getSlider')
  },
  async getFunctionMode() {
    return await axios.get('/api/ui/function/mode')
  },
  async getBtns() {
    return await axios.get('/api/ui/navBtns/Btns')
  },
  async getVideo() {
    return await axios.post('/api/video/list')
  },
}
