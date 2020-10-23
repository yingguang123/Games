import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入字体图标
import "font-awesome/css/font-awesome.min.css"
// 引入swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)
// 引入axios
import axios from 'axios'
Vue.prototype.$axios=axios
// 引入element-UI
import Element from 'element-ui'
// 引入jQuery
//引入base64
const Base64 = require('js-base64').Base64



Vue.use(Element)
//引入viewer
new Vue({
  Base64,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
