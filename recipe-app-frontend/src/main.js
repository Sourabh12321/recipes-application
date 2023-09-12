import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import LoginSignup from "./components/LoginSignup.vue"
import HomePage from "./components/HomePage.vue"
const routes = [
   { path: '/', component: HomePage,name:'Home' },
   { path: '/login', component: LoginSignup ,name:'Login' },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');
