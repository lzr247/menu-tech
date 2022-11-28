<template>
  <div class="login-page">
    <LoginComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginComponent from "../components/LoginComponent.vue";

export default defineComponent({
  name: "login-page",
  components: { LoginComponent },
  created() {
    if (localStorage.getItem("menuLoggedIn")) {
      this.$router.push({ name: "Currencies" });
    }
  }
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
