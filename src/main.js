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
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4ftJiVElFIdy_j6NMPq8pAgsKw3OAYEY",
  authDomain: "kh3k-23880.firebaseapp.com",
  projectId: "kh3k-23880",
  storageBucket: "kh3k-23880.appspot.com",
  messagingSenderId: "837268358875",
  appId: "1:837268358875:web:73b819eb83a9e8c8ceaefe",
  measurementId: "G-BS0FXET2M2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
