import Vue from 'vue'
import Vuex from 'vuex'
import saveData from 'vue-savedata'

import user from './client/user'
import good from './client/good'
import weather from './client/weather'

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
    weather,
  },
  plugins: [saveData()],
})
