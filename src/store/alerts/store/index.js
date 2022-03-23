import _ from "lodash";

import Service from "../service/Service";

const AUTO_REMOVE_TIME = 8000;

function initialState() {
  return {
    alerts: [],
    timers: [],
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

    REMOVE_ALERT(state, id) {
      const findAlert = _.find(state.alerts, { id });

      if (findAlert) {
        state.alerts.splice(state.alerts.indexOf(findAlert), 1);
      }
    },

    REMOVE_TIMER(state, id) {
      const findTimer = _.find(state.timers, { id });

      if (findTimer) {
        state.timers.splice(state.timers.indexOf(findTimer), 1);
      }
    },
  },

  actions: {
    SET_STATES({ commit }, payload) {
      commit("SET_STATES", payload);
    },

    CLEAR_STATES({ commit }, payload) {
      commit("CLEAR_STATES", payload);
    },

    ADD_ALERT({ commit, state }, { status, title, text, autoRemove = true }) {
      const alert = new Service({ status, title, text });
      commit("SET_STATES", { alerts: [...state.alerts, alert] });

      if (autoRemove) {
        const timers = [
          ...state.timers,
          {
            id: alert.id,
            timer: setTimeout(() => {
              commit("REMOVE_ALERT", alert.id);
              commit("REMOVE_TIMER", alert.id);
            }, AUTO_REMOVE_TIME),
          },
        ];

        commit("SET_STATES", { timers });
      }
    },

    REMOVE_ALERT({ commit, state }, id) {
      const findTimer = _.find(state.timers, { id });
      commit("REMOVE_ALERT", id);

      if (findTimer) {
        clearTimeout(findTimer.timer);
        commit("REMOVE_TIMER", id);
      }
    },
  },

  getters: {
    GET_ALERTS(state) {
      return [...state.alerts].reverse();
    },
  },
};
