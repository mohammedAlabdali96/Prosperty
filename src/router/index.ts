import { createRouter, createWebHistory } from "vue-router";
import AssetsList from "../views/AssetsList.vue";

const routes = [
  { path: "/", component: AssetsList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
