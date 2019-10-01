import Vue from 'vue'
import App from './App'
import router from './config/router'
import store from './config/store'
import './config/msgs'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')