// 相当于是http的拦截器
import axios from 'axios'

export default (vm) => {
  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
      // Token令牌共同遵守的一个格式
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  })

  axios.interceptors.response.use(null, (err) => {
    // 错误代码401表示的是可能密码错误 令牌过期等等
    if (err.response.status === 401) {
      // this.$store.dispatch('logout')
      vm.$router.push('/login')
    }
    return Promise.reject(err)
  })
}
