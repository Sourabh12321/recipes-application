import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import LoginSignup from "./components/LoginSignup.vue"
import HomePage from "./components/HomePage.vue"
import RecipesPage from "./components/RecipesPage"
import RecipeDetails from "./components/RecipeDetails"
import MyItems from "./components/MyItems"

const routes = [
   { path: '/', component: HomePage,name:'Home' },
   { path: '/login', component: LoginSignup ,name:'Login' },
   { path: '/recipe', component: RecipesPage ,name:'Recipes' },
   { path: '/recipe-details', component: RecipeDetails ,name:'Details' },
   { path: '/my-items', component: MyItems ,name:'my-items' },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');
