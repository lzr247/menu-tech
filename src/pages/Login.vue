<template>
  <div class="login-page">
    <LoginComponent />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import LoginComponent from "../components/LoginComponent.vue";

export default Vue.extend({
  name: "login-page",
  components: { LoginComponent },
});
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: url('../assets/images/food.jpg');
  background-size: cover;
}
</style>
