import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import VueBus from 'vue-bus'
import 'swiper/dist/css/swiper.css';
Vue.config.productionTip = false

Vue.use(VueBus);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
