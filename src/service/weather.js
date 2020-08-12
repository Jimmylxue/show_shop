import axios from 'axios'

export default {
  async getWeather(params) {
    return await axios.post('/api/client/weather/getCityWeather', params)
  },
}
