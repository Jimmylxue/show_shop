import us from '../../service/user'

export default {
  state: {
    isLogin: localStorage.getItem('token') ? true : false,
  },
  mutations: {
    setLoginState(state, value) {
      state.isLogin = value
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
  },
  getters: {},
}
