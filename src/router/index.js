import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/debito",
    name: "debito",
    props: true,
    component: () => import("../views/PagDebito.vue")
  },
  {
    path: "/credito",
    name: "credito",
    component: () => import("../views/PagCredito.vue")
  },
  {
    path: "/concluido",
    name: "concluido",
    component: () => import("../views/Concluido.vue")
  },
  {
    path: "/error",
    name: "error",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/:token",
    name: "home",
    props: true,
    component: () => import("../views/Home.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name == "home") {
    next();
  } else {
    var token = store.getters.logado;
    if (token) {
      next();
    } else {
      Vue.notify({
        group: "foo",
        type: "error",
        title: "Token não válido"
      });
      next("/home");
    }
  }
});
export default router;
