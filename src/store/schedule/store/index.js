import _ from "lodash";

import { scheduleApi } from "@/http/api";

function initialState() {
  return {
    schedules: [],
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

    async GET_SCHEDULES({ commit, dispatch }) {
      try {
        const { schedules } = await scheduleApi.index();
        commit("SET_STATES", { schedules });
      } catch (error) {
        dispatch("ADD_ALERT", error.response.data);
      }
    },

    async ADD_SCHEDULE({ commit, state, dispatch }, payload) {
      try {
        const { schedule, status, title, text } = await scheduleApi.create(payload);

        let schedules = _.cloneDeep(state.schedules);
        schedules.push(schedule);

        commit("SET_STATES", { schedules });
        dispatch("ADD_ALERT", { status, title, text });
        dispatch("audit/GET_AUDITS", {}, { root: true });

        return { status };
      } catch (error) {
        const { status } = error.response.data;
        dispatch("ADD_ALERT", error.response.data);

        return { status };
      }
    },
  },

  getters: {
    //
  },
};
