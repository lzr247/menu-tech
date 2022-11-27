import Vue from 'vue'
import MenuTech from './MenuTech.vue'
import router from './router'
import store from './store'
import "./styles/styles.scss";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(MenuTech)
}).$mount('#app')
