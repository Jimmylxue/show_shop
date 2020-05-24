// 把请求的一些代码独立到其他的文件中  让组件尽量的只做渲染和一些简单的逻辑
import axios from 'axios'

export default {
  async login(clientmsg) {
    let res = await axios.post('/api/client/user/login', clientmsg)
    return res
  },
}
