import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {axiosProjet, axiosNode} from './http'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.prototype.$axios = axiosProjet;
Vue.prototype.$axiosNode = axiosNode;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
