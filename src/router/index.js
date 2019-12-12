import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../layouts/MyLayout.vue"),
    children: [
      {
        path: "/Home",
        component: () => import("../views/Home.vue")
      },
      {
        path: "/Cadastrar",
        component: () => import("../views/Cadastrar.vue")
      },
      {
        path: "/Excluir",
        component: () => import("../views/Excluir.vue")
      },
      {
        path: "/Alterar",
        component: () => import("../views/Alterar.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("../layouts/MyLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("../views/Error404.vue")
      }
    ]
  });
}
export default router;
