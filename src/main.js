import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import popover from "./plugins/popover";

import "./assets/styles/main.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  popover,
  render: (h) => h(App),
}).$mount("#app");
