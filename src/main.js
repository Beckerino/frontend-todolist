import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./quasar";
import VueNativeNotification from "vue-notification";
import VueLoading from "vue-loading-overlay";
Vue.use(VueLoading);
Vue.use(VueNativeNotification);
Vue.config.productionTip = false;
Vue.component("loading", VueLoading);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
