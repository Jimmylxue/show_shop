import good from '../../service/good'

export default {
  state: {
    allGoods: [],
    recommand: [],
  },
  mutations: {
    pushAllGood(state, value) {
      state.allGoods = value
    },
    pushRecommand(state, value) {
      state.recommand = value
    },
  },
  actions: {
    //
    async getGoods({ commit }, params) {
      let res = await good.getGood(params)
      commit('pushAllGood', res.data)
      commit(
        'pushRecommand',
        res.data.filter(item => item.tag === 'recommand')
      )
    },
  },
  getters: {},
}
