import { createRouter, createWebHistory } from 'vue-router';
import UserRegister from '../components/UserRegister.vue'; // Asegúrate de la ruta correcta

const routes = [
  {
    path: '/register', // La ruta que vas a usar para el registro
    name: 'UserRegister',
    component: UserRegister,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
