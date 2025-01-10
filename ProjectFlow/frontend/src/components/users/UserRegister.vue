<template>
  <div class="container">
    <div class="back-button" @click="goBack">
      &#8592; Назад
    </div>
    <h2>Регистрация</h2>
    <form @submit.prevent="register" class="form">
      <label for="last_name">Фамилия:</label>
      <input type="text" v-model="lastName" required class="input-field">

      <label for="first_name">Имя:</label>
      <input type="text" v-model="firstName" required class="input-field">

      <label for="middle_name">Отчество:</label>
      <input type="text" v-model="middleName" required class="input-field">

      <label for="email">Email:</label>
      <input type="email" v-model="email" required class="input-field">

      <label for="password">Пароль:</label>
      <input type="password" v-model="password" required class="input-field">

      <label for="confirm_password">Подтверждение пароля:</label>
      <input type="password" v-model="confirmPassword" required class="input-field">

      <button type="submit" class="submit-button">Зарегистрироваться</button>
    </form>
  </div>
  <p v-if="error" class="error-message">{{ error }}</p>
  <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
</template>

<script>
export default {
  data() {
    return {
      lastName: '',
      firstName: '',
      middleName: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: null,
      successMessage: null,
    };
  },
  methods: {
    async register() {
      // Проверка совпадения паролей
      if (this.password !== this.confirmPassword) {
        this.error = 'Пароли не совпадают.';
        return;
      }
      
      try {
        const response = await fetch('http://localhost:8000/users/api/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            last_name: this.lastName,
            first_name: this.firstName,
            middle_name: this.middleName,
            email: this.email,
            password: this.password,
          }),
        });
        if (!response.ok) {
          const errorData = await response.json(); // Получаем данные об ошибке от сервера
          throw new Error(errorData.error || 'Ошибка регистрации'); // Используем сообщение от сервера
        }
        const data = await response.json(); // Получаем данные об успешной регистрации
        this.successMessage = data.message; // Устанавливаем сообщение об успешной регистрации
        this.error = null; // Сбрасываем сообщение об ошибке

        // Задержка перед перенаправлением
        setTimeout(() => {
          this.$router.push('/'); // Перенаправление на страницу входа
        }, 2000);
      } catch (error) {
        this.error = error.message;
      }
    },
    goBack() {
      this.$router.go(-1); // Возврат на предыдущую страницу
    },
  },
};
</script>

<style>
@import '../../assets/styles/common-styles.css';
</style>