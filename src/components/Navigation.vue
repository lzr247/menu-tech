<template>
  <nav class="navigation">
    <router-link
      v-for="(el, index) of this.navigationData" 
      :key="index"
      :to="el.path"
      class="navigation__element"
    >
      <component :is="el.icon" class="navigation__icon"></component>
      {{ el.title }}
    </router-link>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Analytics from "vue-material-design-icons/GoogleAnalytics.vue";
import Offer from "vue-material-design-icons/Offer.vue";
import Account from "vue-material-design-icons/Account.vue";
import CurrencyEur from "vue-material-design-icons/CurrencyEur.vue";
import BikeFast from "vue-material-design-icons/BikeFast.vue";
import Cog from "vue-material-design-icons/Cog.vue";

export default defineComponent({
  name: "navigation-component",
  data() {
    return {
      navigationData: [
        {
          title: "Analytics",
          path: "/analytics",
          icon: Analytics,
        },
        {
          title: "Offers",
          path: "/offers",
          icon: Offer,
        },
        {
          title: "Loyalty",
          path: "/loyalty",
          icon: Account,
        },
        {
          title: "Currencies",
          path: "/currencies",
          icon: CurrencyEur,
        },
        {
          title: "Dispatch",
          path: "/dispatch",
          icon: BikeFast,
        },
        {
          title: "Configurations",
          path: "/configurations",
          icon: Cog,
        }
      ],
    };
  }
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.navigation {
  width: 250px;
  min-width: 250px;
  background-color: #f2f2f2;
  color: $color-black;
  padding: 20px 15px 0 15px;
  box-sizing: border-box;

  &__element {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 10px;
    text-decoration: none;
    color: #000;
    padding: 0 10px 0 10px;
    box-sizing: border-box;
    border-radius: 8px;

    &.router-link-exact-active.router-link-active {
      color: $color-primary;
      background-color: #f3e8e1;

      .navigation__icon {
        color: $color-primary;
      }
    }
  }

  &__icon {
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $color-gray-icons;
  }
}
</style>
