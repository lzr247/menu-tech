import Vue from 'vue'
import Vuex from 'vuex'
import Currency from '@/interfaces/Currency';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    email: '',
    currencies: [] as Currency[],
    filteredCurrencies: [] as Currency[],
    editCurrency: {} as Currency,
    search: '',
  },
  mutations: {
    setUser: (state, payload) => {
      state.email = payload;
    },
    addCurrency: (state, payload) => {
      state.currencies.push(payload);
      localStorage.setItem('menuCurrencies', JSON.stringify(state.currencies));
      state.filteredCurrencies = state.currencies;
    },
    deleteCurrency: (state, payload) => {
      const elToDelete: Currency = state.currencies.find((el) => el.id === payload)!;
      state.currencies.splice(state.currencies.indexOf(elToDelete), 1);
      localStorage.setItem('menuCurrencies', JSON.stringify(state.currencies));
      state.filteredCurrencies = state.currencies;
    },
    setEditCurrency: (state, payload) => {
      state.editCurrency = payload;
    },
    editCurrency: (state, payload) => {
      const indexToEdit = state.currencies.findIndex(el => el.id === payload.id);
      state.currencies[indexToEdit] = payload;
      localStorage.setItem('menuCurrencies', JSON.stringify(state.currencies));
      state.filteredCurrencies = state.currencies;
    },
    filterList: (state, payload) => {
      // Here change search state and then change array if not empty
      state.search = payload;

      state.filteredCurrencies = state.currencies.filter((currency) => {
        if(Object.values(currency).slice(1).some((objVal) => objVal.toString().toLowerCase().includes(state.search.toString().toLowerCase()))) {
          return currency;
        }
      })
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
    filteredCurrencies: state => {
      return state.filteredCurrencies;
    }
  }
})
