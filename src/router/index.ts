import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home,
  // },
  {
    path: "/",
    name: "chat",
    component: () => import(/* webpackChunkName: "chat" */ "@/views/Chat.vue"),
  },
  {
    path: "/terms-and-conditions",
    name: "tandc",
    component: () =>
      import(/* webpackChunkName: "tandc" */ "@/views/Terms.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
