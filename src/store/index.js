import Vue from 'vue'
import Vuex from 'vuex'

import user from './client/user'
import good from './client/good'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    videoUrl: '',
  },
  mutations: {
    setVideoUrl(state, url) {
      state.videoUrl = url
    },
  },
  modules: {
    user,
    good,
  },
})
