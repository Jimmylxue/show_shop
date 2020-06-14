import Vue from 'vue'
import Vuex from 'vuex'

import user from './client/user'
import good from './client/good'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    good,
  },
})
