import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import VueBus from 'vue-bus'
import axios from 'axios'
import globalUrl from './assets/util/DataInterface'
import base from './assets/util/base'
import util from './assets/util/util'
import 'swiper/dist/css/swiper.css';
Vue.config.productionTip = false

Vue.use(VueBus);

Vue.prototype.$ajax = axios;

Vue.prototype.$url = globalUrl;

Vue.prototype.$base = base;

Vue.prototype.$util = util;

window.CODE = {
	SUCCESS: 10000
}

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
