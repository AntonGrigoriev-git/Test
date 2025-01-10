import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from './components/users/UserLogin.vue';
import UserRegister from './components/users/UserRegister.vue';
import UserHome from './components/users/UserHome.vue';

const routes = [
  {
    path: '/',
    name: 'UserLogin',
    component: UserLogin,
  },
  {
    path: '/register',
    name: 'UserRegister',
    component: UserRegister,
  },
  {
    path: '/home',
    name: 'UserHome',
    component: UserHome,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;