// 相当于是http的拦截器
import axios from 'axios'

export default vm => {
  axios.interceptors.request.use(config => {
    const token = sessionStorage.getItem('token')
    console.log('token')
    if (token) {
      // Token令牌共同遵守的一个格式
      config.headers.Authorization = 'Bearer ' + token
    }
    console.log('configgggg', config)
    return config
  })

  axios.interceptors.response.use(null, err => {
    // 错误代码401表示的是可能密码错误 令牌过期等等
    console.log(err.response)
    if (err.response.status == 401) {
      vm.$swal('注意~', '清先登录哦~', 'error')
      vm.$store.dispatch('logout') // 清空浏览器中的登录数据
      vm.$router.push('/login')
    }
    return Promise.reject(err)
  })
}
