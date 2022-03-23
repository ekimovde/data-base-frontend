import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth/store";
import alerts from "./alerts/store";
import profile from "./profile/store";
import users from "./users/store";
import chamber from "./chamber/store";
import audit from "./audit/store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { auth, alerts, profile, users, chamber, audit },
});
