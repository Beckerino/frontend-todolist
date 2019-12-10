import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../layouts/MyLayout.vue"),
    children: [{ path: "", component: () => import("../views/Home.vue") }]
  },
  {
    path: "/About",
    component: () => import("../layouts/MyLayout.vue"),
    children: [{ path: "", component: () => import("../views/About.vue") }]
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
