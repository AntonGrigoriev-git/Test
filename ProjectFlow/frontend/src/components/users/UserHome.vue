<template>
  <div class="home-container">
    <div class="header">
      <h2>Добро пожаловать, {{ user.username }}!</h2>
      <button @click="logout">Выйти</button>
    </div>
    <div class="content">
      <div class="sidebar">
        <h3>Projects</h3>
      </div>
      <div class="main-content">
        <ProjectDashboard :projects="projects" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ProjectDashboard from '../projects/ProjectDashboard.vue';

export default {
  components: { ProjectDashboard },
  computed: {
    ...mapState(['user']) // Получаем данные пользователя из Vuex
  },
  mounted() {
    this.fetchUserInfo(); // Вызываем действие для получения информации о пользователе
  },
  data() {
    return {
      projects: []
    };
  },
  methods: {
    ...mapActions(['clearUserInfo']), // Подключаем действие для очистки информации о пользователе
    async logout() {
      console.log('Logout initiated');
      await this.clearUserInfo(); // Вызываем действие для очистки информации о пользователе
      console.log('User info cleared');
      this.$router.push('/'); // Перенаправляем на главную страницу
    },
    async fetchUserInfo() {
      await this.$store.dispatch('fetchUserInfo'); // Вызываем действие для получения информации о пользователе
    }
  }
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  height: 97vh;
  margin: 0 auto;
  max-width: 100%;
}

.header {
  width: 97%;
  height: 60px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border: 1px solid #000;
  border-radius: 10px;
}

.content {
  display: flex;
  flex-grow: 1;
}

.sidebar {
  width: 150px;
  background-color: #f0f0f0;
  padding: 20px;
  box-sizing: border-box;
  margin-right: 10px;
  margin-top: 10px;
  border: 1px solid #000;
  border-radius: 10px;
}

.main-content {
  flex-grow: 1;
  background-color: #ffffff;
  padding: 20px;
  box-sizing: border-box;
  margin-top: 10px;
}
</style>