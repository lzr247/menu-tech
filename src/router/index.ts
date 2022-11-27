import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Currencies from "../pages/Currencies.vue";
import Login from "../pages/Login.vue";
import Analytics from "@/pages/Analytics.vue";
import Offers from "@/pages/Offers.vue";
import Loyalty from "@/pages/Loyalty.vue";
import Dispatch from "@/pages/Dispatch.vue";
import Configurations from "@/pages/Configurations.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: () => {
      return { path: '/currencies' }
    }
  },
  {
    path: "/currencies",
    name: "Currencies",
    component: Currencies,
    meta: {
      hideHeader: false
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      hideHeader: true,
      hideNavigation: true,
    }
  },
  {
    path: "/analytics",
    name: "Analytics",
    component: Analytics,
    meta: {
      hideHeader: false
    }
  },
  {
    path: "/offers",
    name: "Offers",
    component: Offers,
    meta: {
      hideHeader: false
    }
  },
  {
    path: "/loyalty",
    name: "Loyalty",
    component: Loyalty,
    meta: {
      hideHeader: false
    }
  },
  {
    path: "/dispatch",
    name: "Dispatch",
    component: Dispatch,
    meta: {
      hideHeader: false
    }
  },
  {
    path: "/configurations",
    name: "Configurations",
    component: Configurations,
    meta: {
      hideHeader: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
