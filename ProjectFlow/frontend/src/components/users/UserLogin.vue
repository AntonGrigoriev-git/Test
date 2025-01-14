<template>
  <div class="container">
    <h2>Вход</h2>
    <form @submit.prevent="login" class="form">
      <label for="email">Email:</label>
      <input type="email" v-model="email" required class="input-field">
      
      <label for="password">Пароль:</label>
      <input type="password" v-model="password" required class="input-field">
      
      <button type="submit" class="submit-button">Войти</button>
    </form>
    <button @click="goToRegister" class="register-button">Регистрация</button>
  </div>
  <p v-if="error" class="error-message">{{ error }}</p>
</template>

<script>
// import { mapActions } from 'vuex'; // Импортируем mapActions

// export default {
//   data() {
//     return {
//       email: '',
//       password: '',
//       error: null,
//     };
//   },
//   methods: {
//     ...mapActions(['fetchUserInfo']), // Подключаем действие из Vuex
//     async login() {
//       try {
//         const response = await fetch('http://localhost:8000/users/api/login/', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             email: this.email,
//             password: this.password,
//           }),
//         });
//         if (!response.ok) {
//           const errorData = await response.json(); // Получаем данные об ошибке от сервера
//           throw new Error(errorData.error || 'Ошибка входа'); // Используем сообщение от сервера
//         }
//         await this.fetchUserInfo(); // Вызываем действие для получения информации о пользователе
//         this.$router.push('/home');
//       } catch (error) {
//         this.error = error.message;
//       }
//     },
//     goToRegister() {
//       this.$router.push('/register');
//     },
//   },
// };


import { mapActions } from 'vuex'; // Импортируем mapActions

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    ...mapActions(['login']), // Подключаем действие для входа
    async handleLogin() {
      this.error = null; // Сбрасываем ошибку перед новым входом
      try {
        await this.login({ email: this.email, password: this.password }); // Вызываем действие для входа
        this.$router.push('/home'); // Перенаправляем на домашнюю страницу после успешного входа
      } catch (error) {
        this.error = error.message; // Устанавливаем сообщение об ошибке
      }
    },
    goToRegister() {
      this.$router.push('/register');
    },
  },
};

</script>

<style>
@import '../../assets/styles/common-styles.css';
</style>