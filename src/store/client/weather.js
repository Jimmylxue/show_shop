export default {
  state: {
    weatherMsg: '',
  },
  mutations: {
    saveWeather(state, value) {
      state.weatherMsg = value
    },
  },
}
