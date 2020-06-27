// 把请求的一些代码独立到其他的文件中  让组件尽量的只做渲染和一些简单的逻辑
import axios from 'axios'

export default {
  async login(clientmsg) {
    let res = await axios.post('/api/client/user/login', clientmsg)
    // console.log('rews', res)
    return res
  },
  // 获取二维码
  async getCode() {
    let res = await axios.get('/api/client/user/login')
    return res
  },
  // 注册
  async register(clientmsg) {
    let res = await axios.post('/api/client/user/register', clientmsg)
    return res
  },
  async getUserMsg(params) {
    return await axios.post('/api/client/user/getUser', params)
  },
}
