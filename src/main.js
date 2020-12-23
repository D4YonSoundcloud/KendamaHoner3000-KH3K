import Vue from 'vue'
import App from './App.vue'
import {store} from './store/store.js'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueRouter from 'vue-router';
import firebase from 'firebase/app';
import TrickGenerator from "@/components/TrickGenerator";
import Login from "@/components/Login";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false

const routes = [
  { path: '/home', component: TrickGenerator, name: 'Home' },
  { path: '/login', component: Login, name: 'Login'},
]

const router = new VueRouter({
  routes,
})



new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
