import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Импорт маршрутизатора
import { store } from './store/store';

const app = createApp(App);
app.use(router); // Подключение маршрутизатора
app.use(store); // Подключение Vuex
app.mount('#app');