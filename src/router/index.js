import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import loginView from "../views/LoginView";
import registerView from '../views/RegisterView'
import historyView from '../views/HistoryView'
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  { path: "/login", name: "loginView",
  component: loginView
},
{
  path :"/register",
  name : "registerView",
  component : registerView
},
{
  path :"/history",
  name : "historyView",
  component : historyView
}
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
