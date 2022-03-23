import { authApi, loginApi, registrationApi, checkAuthApi } from "@/http/api";
import router from "@/router";

function initialState() {
  return {
    isAuth: false,
  };
}

export default {
  namespaced: true,
  state: () => {
    return initialState();
  },

  mutations: {
    SET_STATES(state, payload) {
      const keys = Object.keys(payload);

      keys.forEach((key) => {
        state[key] = payload[key];
      });
    },

    CLEAR_STATES(state, payload) {
      const data = initialState();

      if (!payload) payload = Object.keys(data);

      payload.forEach((item) => {
        state[item] = data[item];
      });
    },
  },

  actions: {
    SET_STATES({ commit }, payload) {
      commit("SET_STATES", payload);
    },

    CLEAR_STATES({ commit }, payload) {
      commit("CLEAR_STATES", payload);
    },

    ADD_ALERT({ dispatch }, payload) {
      const { status, title, text } = payload;
      dispatch("alerts/ADD_ALERT", { status, title, text }, { root: true });
    },

    async LOGIN({ commit, dispatch }, payload) {
      try {
        const { token, status, title, text } = await authApi.login(payload);

        localStorage.setItem("token", token);

        commit("SET_STATES", { isAuth: true });
        dispatch("profile/GET_PROFILE", {}, { root: true });
        dispatch("ADD_ALERT", { status, title, text });

        router.push({ name: "home" });
      } catch (error) {
        dispatch("ADD_ALERT", error.response.data);
      }
    },

    async REGISTRATION({ commit, dispatch }, payload) {
      try {
        const { token, status, title, text } = await authApi.registration(
          payload
        );

        localStorage.setItem("token", token);

        commit("SET_STATES", { isAuth: true });
        dispatch("ADD_ALERT", { status, title, text });

        router.push({ name: "home" });
      } catch (error) {
        dispatch("ADD_ALERT", error.response.data);
      }
    },

    async CHECK_AUTH({ commit, dispatch }) {
      try {
        const { token, status } = await authApi.check();

        localStorage.setItem("token", token);
        commit("SET_STATES", { isAuth: true });
        dispatch("profile/GET_PROFILE", {}, { root: true });

        return { status };
      } catch (error) {
        const { status } = error.response.data;
        localStorage.removeItem("token");

        commit("SET_STATES", { isAuth: false });
        dispatch("ADD_ALERT", error.response.data);

        return { status };
      }
    },

    LOGOUT({ commit, dispatch }) {
      const data = {
        status: "success",
        title: "Выход из приложения",
        text: "Все прошло успешно!",
      };

      localStorage.removeItem("token");
      commit("CLEAR_STATES");

      dispatch("ADD_ALERT", data);
      dispatch("profile/CLEAR_STATES", null, { root: true });
      dispatch("alerts/CLEAR_STATES", null, { root: true });
      dispatch("chamber/CLEAR_STATES", null, { root: true });
      dispatch("users/CLEAR_STATES", null, { root: true });
      dispatch("audit/CLEAR_STATES", null, { root: true });

      router.push({ name: "auth" });
    },
  },

  getters: {
    //
  },
};
