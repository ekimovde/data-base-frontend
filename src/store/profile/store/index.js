import _ from "lodash";

import { userApi } from "@/http/api";

function initialState() {
  return {
    profile: {},
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

    async GET_PROFILE({ commit, dispatch }) {
      try {
        const { profile } = await userApi.show();
        commit("SET_STATES", { profile });

        return;
      } catch (error) {
        dispatch("ADD_ALERT", error.response.data);
        return;
      }
    },
  },

  getters: {
    GET_ROLE: (state) => {
      return state.profile.role;
    },
  },
};
