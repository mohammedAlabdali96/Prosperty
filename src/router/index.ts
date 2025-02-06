import { createRouter, createWebHistory } from "vue-router";
import AssetsList from "../views/AssetsList.vue";
import AssetDetails from "../views/AssetDetails.vue";

const routes = [
  { path: "/", component: AssetsList, name: "AssetsList" },
  {
    path: "/assets/:uuid",
    name: "AssetDetails",
    component: AssetDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
