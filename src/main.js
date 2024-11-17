// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // Importa tu tienda
import router from './router'; // Asegúrate de que tienes un router configurado

const app = createApp(App);
app.use(store);   // Usa la tienda
app.use(router);  // Usa el router
app.mount('#app');