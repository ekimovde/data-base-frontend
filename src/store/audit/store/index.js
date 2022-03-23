import _ from "lodash";

import { auditApi } from "@/http/api";

function initialState() {
  return {
    audits: [],
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

    async GET_AUDITS({ commit, dispatch }) {
      try {
        const { audits } = await auditApi.index();
        commit("SET_STATES", { audits });
      } catch (error) {
        dispatch("ADD_ALERT", error.response.data);
      }
    },
  },

  getters: {
    //
  },
};
