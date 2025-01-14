// import { createStore } from 'vuex';

// export const store = createStore({
//   state: {
//     user: {
//       firstName: '',
//       lastName: '',
//       username: ''
//     }
//   },
//   mutations: {
//     setUser(state, user) {
//       console.log('Обновление пользователя:', user);
//       state.user = user;
//     },
//     clearUser(state) {
//       console.log('Clearing user state');
//       state.user = {
//         firstName: '',
//         lastName: '',
//         username: ''
//       };
//     }
//   },
//   actions: {
//     async fetchUserInfo({ commit }) {
//       const response = await fetch('http://localhost:8000/users/api/user-info/', {
//         method: 'GET',
//         credentials: 'include'
//       });
//       const data = await response.json();
//       console.log('Полученные данные пользователя:', data);
//       commit('setUser', {
//         firstName: data.first_name,
//         lastName: data.last_name,
//         username: `${data.first_name} ${data.last_name}`
//       });
//     },
//     clearUserInfo({ commit }) {
//       console.log('Clearing user info');
//       commit('clearUser');
//     }
//   }
// });


import { createStore } from 'vuex';

export const store = createStore({
  state: {
    user: {
      firstName: '',
      lastName: '',
      username: ''
    },
    token: '' // Добавляем токен в состояние
  },
  mutations: {
    setUser(state, user) {
      console.log('Обновление пользователя:', user);
      state.user = user;
    },
    clearUser(state) {
      console.log('Clearing user state');
      state.user = {
        firstName: '',
        lastName: '',
        username: ''
      };
    },
    setToken(state, token) { // Мутация для установки токена
      state.token = token;
    },
    clearToken(state) { // Мутация для очистки токена
      state.token = '';
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      const response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        commit('setToken', data.access); // Сохраняем access токен
        await this.dispatch('fetchUserInfo'); // Получаем информацию о пользователе
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка входа');
      }
    },
    async fetchUserInfo({ commit, state }) {
      const response = await fetch('http://localhost:8000/users/api/user-info/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${state.token}` // Используем токен в заголовках
        },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Полученные данные пользователя:', data);
        commit('setUser', {
          firstName: data.first_name,
          lastName: data.last_name,
          username: `${data.first_name} ${data.last_name}`
        });
      } else {
        console.error('Ошибка получения данных пользователя:', response.status);
      }
    },
    clearUserInfo({ commit }) {
      console.log('Clearing user info');
      commit('clearUser');
    },
    setToken({ commit }, token) { // Действие для установки токена
      commit('setToken', token);
    },
    clearToken({ commit }) { // Действие для очистки токена
      commit('clearToken');
    }
  }
});
