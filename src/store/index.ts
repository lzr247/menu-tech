import Vue from 'vue'
import Vuex from 'vuex'
import Currency from '@/interfaces/Currency';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    email: '',
    currencies: [] as Currency[],
    editCurrency: {} as Currency
  },
  mutations: {
    setUser: (state, payload) => {
      state.email = payload;
    },
    addCurrency: (state, payload) => {
      state.currencies.push(payload);
    },
    deleteCurrency: (state, payload) => {
      const elToDelete: Currency = state.currencies.find((el) => el.id === payload)!;
      state.currencies.splice(state.currencies.indexOf(elToDelete), 1);
    },
    setEditCurrency: (state, payload) => {
      state.editCurrency = payload;
    },
    editCurrency: (state, payload) => {
      const indexToEdit = state.currencies.findIndex(el => el.id === payload.id);
      state.currencies[indexToEdit] = payload;
    }
  },
  actions: {
    setUser: (context, payload) => {
      context.commit('setUser', payload);
    },
    addCurrency: (context, payload) => {
      context.commit('addCurrency', payload);
    },
    deleteCurrency: (context, payload) => {
      context.commit('deleteCurrency', payload);
    },
    setEditCurrency: (context, payload) => {
      context.commit('setEditCurrency', payload);
    },
    editCurrency: (context, payload) => {
      context.commit('editCurrency', payload);
    }
  },
  getters: {
    getUser: state => {
      return state.email;
    },
    currencies: state => {
      return state.currencies;
    },
  }
})
