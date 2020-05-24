import Vue from 'vue'
import Vuex from 'vuex'

import user from './client/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
  },
})
