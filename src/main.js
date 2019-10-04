import Vue from 'vue'
import App from './App'

import router from './config/router'
import store from './config/store'
import './config/msgs'

import AOS from 'aos'
import BootstrapVue from 'bootstrap-vue'
import SvgTransition from 'vue-svg-transition';

Vue.config.productionTip = false

AOS.init();
Vue.use(BootstrapVue)
Vue.use(SvgTransition);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')