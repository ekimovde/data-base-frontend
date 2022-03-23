import _ from "lodash";

import { chamberApi } from "@/http/api";

function initialState() {
  return {
    chambers: [],
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

    async GET_CHAMBERS({ commit, dispatch }) {
      try {
        const { chambers } = await chamberApi.index();
        commit("SET_STATES", { chambers });
      } catch (error) {
        dispatch("ADD_ALERT", error.response.data);
      }
    },

    async ADD_CHAMBER({ commit, state, dispatch }, payload) {
      try {
        const { chamber, status, title, text } = await chamberApi.create(
          payload
        );

        let chambers = _.cloneDeep(state.chambers);
        chambers.push(chamber);

        commit("SET_STATES", { chambers });
        dispatch("ADD_ALERT", { status, title, text });
        dispatch("audit/GET_AUDITS", {}, { root: true });

        return { status };
      } catch (error) {
        const { status } = error.response.data;
        dispatch("ADD_ALERT", error.response.data);

        return { status };
      }
    },

    async EDIT_CHAMBER({ commit, state, dispatch }, payload) {
      try {
        const { id, name, email } = payload;
        const { chamber, status, title, text } = await chamberApi.update(id, {
          name,
          email,
        });

        let chambers = _.cloneDeep(state.chambers);
        const index = _.findIndex(chambers, { id });

        if (index > -1) chambers.splice(index, 1, chamber);

        commit("SET_STATES", { chambers });
        dispatch("ADD_ALERT", { status, title, text });
        dispatch("audit/GET_AUDITS", {}, { root: true });

        return { status };
      } catch (error) {
        const { status } = error.response.data;
        dispatch("ADD_ALERT", error.response.data);

        return { status };
      }
    },

    async REMOVE_CHAMBER({ commit, state, dispatch }, id) {
      try {
        const { status, title, text } = await chamberApi.delete(id);

        let chambers = _.cloneDeep(state.chambers);
        const index = _.findIndex(chambers, { id });

        if (index > -1) chambers.splice(index, 1);

        commit("SET_STATES", { chambers });
        dispatch("ADD_ALERT", { status, title, text });
        dispatch("audit/GET_AUDITS", {}, { root: true });
      } catch (error) {
        dispatch("ADD_ALERT", error.response.data);
      }
    },

    async ADD_DOCTOR_CHAMBER({ commit, state, dispatch }, payload) {
      try {
        const { id } = payload;
        const { chamber, status, title, text } = await chamberApi.doctor(
          payload
        );

        let chambers = _.cloneDeep(state.chambers);
        const index = _.findIndex(chambers, { id });

        if (index > -1) chambers.splice(index, 1, chamber);

        commit("SET_STATES", { chambers });
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
