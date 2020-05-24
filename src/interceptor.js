// 相当于是http的拦截器
import axios from 'axios'

export default () => {
  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
      // Token令牌共同遵守的一个格式
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  })

  axios.interceptors.response(null, (err) => {
    if (err.response.status === 401) {
      this.$store.dispatch('logout')
      vm.$router.push('/login')
    }
    return Promise.reject(err)
  })
}
