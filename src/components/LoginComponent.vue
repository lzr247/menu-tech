<template>
  <div class="login-component">
    <MenuIcon class="login-component__icon" />
    <h2 class="login-component__title">Sign in</h2>
    <h4 class="login-component__subtitle">
      Please enter your email and password
    </h4>

    <form
      @submit.prevent="login"
      id="login-form"
      class="login-component__login-form"
      novalidate
    >
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Your email address"
        v-model="formData.email"
        required
      />
      <input
        type="password"
        name="password"
        id="password"
        v-model="formData.password"
        placeholder="Password"
        autocomplete="off"
        required
      />
    </form>

    <div v-if="error" class="error">Either email format is invalid or password length is less than 6.</div>

    <button
      form="login-form"
      class="login-component__submit-button"
      type="submit"
      :disabled="buttonDisabled"
    >
      Sign in
    </button>
  </div>
</template>

<script lang="ts">
import MenuIcon from "@/assets/icons/menu.svg";
import User from "@/interfaces/User";
import Vue from "vue";

export default Vue.extend({
  name: "login-component",
  components: { MenuIcon },
  data() {
    return {
      formData: {
        email: "",
        password: "",
      } as User,
      error: false
    };
  },
  methods: {
    login() {
      // Custom validation
      let emailValid = this.formData.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      let passwordValid = this.formData.password && this.formData.password.length >= 6;

      if(emailValid && passwordValid) {
        this.error = false;
        localStorage.setItem("menuLoggedIn", this.formData.email);
        this.$store.dispatch('setUser', this.formData.email);
        
        if (localStorage.getItem("menuLoggedIn")) {
          this.$router.push({ name: "Currencies" });
        }
      } else {
        this.error = true;
      }

    },
  },
  computed: {
    buttonDisabled(): boolean {
      if(this.formData.email && this.formData.password) return false;
      else return true;
    }
  }
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.login-component {
  max-width: 500px;
  padding: 40px;
  border-radius: 12px;
  box-sizing: border-box;
  background-color: #fff;
  text-align: left;

  &__icon {
    max-width: 280px;
  }

  &__title {
    font-family: $font-primary-bold;
    margin-top: 18px;
  }

  &__subtitle {
    margin-bottom: 18px;
  }

  &__login-form {
    width: 100%;

    input {
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      margin-bottom: 24px;
      border-radius: 6px;
      font-size: 16px;
      outline: none;
      border: 1px solid $color-gray;

      &:focus {
        border: 1px solid $color-primary;
      }
    }
  }

  .error {
    color: $color-error;
    margin-bottom: 24px;
    max-width: 100%;
  }

  &__submit-button {
    width: 100%;
    height: 40px;
    border: none;
    background: $color-primary;
    border-radius: 6px;
    color: $color-white;
    cursor: pointer;

    &:disabled, &[disabled] {
      background: #cccccc;
    }
  }
}
</style>
