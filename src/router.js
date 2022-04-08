import Vue from "vue";
import VueRouter from "vue-router";
import _ from "lodash";

import store from "@/store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/auth",
    name: "auth",
    component: () => import("./modules/Auth/pages/Auth"),
    meta: { layout: "clear", requiresAuth: false },
  },
  {
    path: "/",
    name: "home",
    component: () => import("./modules/Home/pages/Home"),
    meta: { layout: "default", requiresAuth: true },
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("./modules/Profile/pages/Profile"),
    meta: { layout: "default", requiresAuth: true },
  },
  {
    path: "/chamber",
    name: "chamber",
    component: () => import("./modules/Chamber/pages/Chamber"),
    meta: { layout: "default", requiresAuth: true },
  },
  {
    path: "/audit",
    name: "audit",
    component: () => import("./modules/Audit/pages/Audit"),
    meta: { layout: "default", requiresAuth: true },
  },
  {
    path: "/schedule",
    name: "schedule",
    component: () => import("./modules/Schedule/pages/Schedule"),
    meta: { layout: "default", requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

let isInitial = true;

router.beforeEach(async (to, from, next) => {
  if (localStorage.getItem("token") && isInitial) {
    const { status } = await store.dispatch("auth/CHECK_AUTH");
    isInitial = false;

    if (status === "error") {
      next("/auth");
      return;
    }
  }

  if (to.name === "audit") {
    await store.dispatch("profile/GET_PROFILE");
    const role = _.get(store.state.profile, "profile.role");

    if (role !== "ADMIN") {
      next(from.path);
      return;
    }
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.state.auth.isAuth) {
      next();
      return;
    }

    next("/auth");
  } else {
    if (store.state.auth.isAuth) {
      next("/");
      return;
    }

    next();
  }
});

export default router;
