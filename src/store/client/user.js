import us from '../../service/user'

export default {
  state: {
    isLogin: localStorage.getItem('token') ? true : false,
    registerid: '',
  },
  mutations: {
    setLoginState(state, value) {
      state.isLogin = value
    },
    setRegisertId(state, value) {
      state.registerid = value
    },
  },
  actions: {
    async login({ commit }, clientmsg) {
      let res = await us.login(clientmsg)
      const { code, token, userName } = res.data
      if (code) {
        commit('setLoginState', true)
        localStorage.setItem('user', userName)
        localStorage.setItem('token', token)
      }
      return code
    },
    // 获取图形验证码
    async getCode() {
      let res = await us.getCode()
      // console.log('ook', res.data)
      return res.data
    },
    async register({ commit }, clitenmsg) {
      // console.log(commit)
      let res = await us.register(clitenmsg)
      console.log('res', res)
      let { code, registerid } = res.data
      commit('setRegisertId', registerid)
      return code
    },
  },
  getters: {},
}
