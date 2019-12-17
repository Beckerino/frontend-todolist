import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./quasar";
import VueResource from "vue-resource";
import VueNativeNotification from "vue-notification";
Vue.config.productionTip = false;

Vue.use(VueResource);
Vue.use(VueNativeNotification, {
  requestOnNotify: true
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
