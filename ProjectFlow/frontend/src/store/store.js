import { createStore } from 'vuex';

export const store = createStore({
  state: {
    user: {
      firstName: '',
      lastName: '',
      username: ''
    }
  },
  mutations: {
    setUser(state, user) {
      console.log('Обновление пользователя:', user);
      state.user = user;
    },
    clearUser(state) {
      state.user = {
        firstName: '',
        lastName: '',
        username: ''
      };
    }
  },
  actions: {
    async fetchUserInfo({ commit }) {
      const response = await fetch('http://localhost:8000/users/api/user-info/', {
        method: 'GET',
        credentials: 'include'
      });
      const data = await response.json();
      console.log('Полученные данные пользователя:', data);
      commit('setUser', {
        firstName: data.first_name,
        lastName: data.last_name,
        username: `${data.first_name} ${data.last_name}`
      });
    }
  }
});