import us from '../../service/user'

export default {
  state: {
    // Vuex中的数据 一旦刷新页面就会消失  所以有要长期存的东西就不能放在这里
    loginUserId: null,
    isLogin: sessionStorage.getItem('token') ? true : false,
    registerid: '',
    user: {},
  },
  mutations: {
    setLoginState(state, value) {
      state.isLogin = value
    },
    setRegisertId(state, value) {
      state.registerid = value
    },
    setLoginUserId(state, value) {
      state.loginUserId = value
    },
    setUserMsg(state, value) {
      state.user = value
    },
  },
  actions: {
    async login({ commit }, clientmsg) {
      console.log('1111', clientmsg)
      let res = await us.login(clientmsg)
      const { code, token, userName, msg } = res.data
      // console.log(portrait)
      if (code) {
        commit('setUserMsg', res.data)
        sessionStorage.setItem('loginUserId', parseInt(clientmsg.form.userid))
        commit('setLoginState', true)
        sessionStorage.setItem('user', userName)
        sessionStorage.setItem('header', msg.header)
        sessionStorage.setItem('token', token)
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
