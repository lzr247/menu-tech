import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    email: '',
  },
  mutations: {
    setUser: (state, payload) => {
      state.email = payload;
    }
  },
  actions: {
    setUser: (context, payload) => {
      context.commit('setUser', payload);
    }
  },
  getters: {
    getUser: state => {
      return state.email;
    }
  }
})
