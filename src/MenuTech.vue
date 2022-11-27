<template>
  <div id="menu-tech">
    <Header v-if="!$route.meta.hideHeader" :user="getUser" />
    <main>
      <Navigation v-if="!$route.meta.hideNavigation"/>
      <router-view class="main"/>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '@/components/Header.vue';
import Navigation from '@/components/Navigation.vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'menu-tech',
  components: { Header, Navigation },
  computed: {
    ...mapGetters([
      'getUser'
    ])
  },
  mounted() {
    const user = localStorage.getItem('menuLoggedIn');
    this.$store.dispatch('setUser', user);
  }
})
</script>

<style lang="scss">
@import '@/styles/variables.scss';

#menu-tech {
  height: 100%;
  background-color: $color-white;
  display: flex;
  flex-direction: column;

  main {
    flex: 1;
    height: 100%;
    display: flex;
  }
}
</style>
