import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import UserRegister from '../components/UserRegister.vue';
import UserLogin from '../components/UserLogin.vue';
import CheckoutPage from '../views/CheckoutPage.vue';
import CategoryPage from '../components/CategoryPage.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/register',
    name: 'Register',
    component: UserRegister,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: CheckoutPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: UserLogin,
  },
  {
    path: '/categoria/:category',
    name: 'Category',
    component: CategoryPage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
