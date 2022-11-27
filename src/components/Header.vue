<template>
  <header class="header">
    <section class="header__section-left">
      <div v-if="user" class="header__profile">{{user[0].toUpperCase()}}</div>
      <div class="header__info">
        <span class="header__brand-name">BRAND NAME</span>
        <span>All stores</span>
      </div>
    </section>
    <section class="header__section-right">
      <IconBell class='header__icon-bell' fillColor="#808080" />
      <IconAccount class="header__icon-account" fillColor="#808080" />
      <div class="logout" @click="logout">Logout</div>
    </section>
  </header>
</template>

<script lang='ts'>
import Vue from 'vue';
import IconBell from 'vue-material-design-icons/Bell.vue'
import IconAccount from 'vue-material-design-icons/Account.vue'

export default Vue.extend({
  name: 'header-component',
  components: { IconBell, IconAccount },
  props: {
    user: String
  },
  methods: {
    logout() {
      localStorage.removeItem('menuLoggedIn');
      this.$router.push({ name: "Login" });
    }
  }
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.header {
  height: 60px;
  background: #fff;
  box-shadow: 0 4px 2px -4px gray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;

  &__section-left {
    padding-left: 20px;
    display: flex;
  }

  &__profile {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #ff6600;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }

  &__brand-name {
    color: #666666;
  }

  &__section-right {
    padding-right: 20px;
    position: relative;
  }

  &__icon-bell {
    margin-right: 10px;
  }

  &__icon-account {
    cursor: pointer;
    width: 30px;
    height: 30px;

    &:hover {
      & ~ .logout {
        display: block;
      }
    }
  }

  .logout {
    border: 1px solid $color-gray;
    cursor: pointer;
    padding: 4px;
    border-radius: 6px;
    background-color: $color-gray;
    position: absolute;
    right: 25px;
    top: 20px;
    display: none;
  }
}
</style>