import _ from "lodash";

import { userApi } from "@/http/api";

function initialState() {
  return {
    users: [],
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

    async GET_USERS({ commit, dispatch }) {
      try {
        const { users } = await userApi.index();
        commit("SET_STATES", { users });
      } catch (error) {
        dispatch("ADD_ALERT", error.response.data);
      }
    },

    async ADD_USER({ commit, state, dispatch }, payload) {
      try {
        const { user, status, title, text } = await userApi.create(payload);

        let users = _.cloneDeep(state.users);
        users.push(user);

        commit("SET_STATES", { users });
        dispatch("ADD_ALERT", { status, title, text });
        dispatch("audit/GET_AUDITS", {}, { root: true });

        return { status };
      } catch (error) {
        const { status } = error.response.data;
        dispatch("ADD_ALERT", error.response.data);

        return { status };
      }
    },

    async EDIT_USER({ commit, state, dispatch }, payload) {
      try {
        const { id, age, disease } = payload;
        const { user, status, title, text } = await userApi.update(id, {
          age,
          disease,
        });

        let users = _.cloneDeep(state.users);
        const index = _.findIndex(users, { id });

        if (index > -1) users.splice(index, 1, user);

        commit("SET_STATES", { users });
        dispatch("ADD_ALERT", { status, title, text });
        dispatch("audit/GET_AUDITS", {}, { root: true });

        return { status };
      } catch (error) {
        const { status } = error.response.data;
        dispatch("ADD_ALERT", error.response.data);

        return { status };
      }
    },

    async REMOVE_USER({ commit, state, dispatch }, id) {
      try {
        const { status, title, text } = await userApi.delete(id);

        let users = _.cloneDeep(state.users);
        const index = _.findIndex(users, { id });

        if (index > -1) users.splice(index, 1);

        commit("SET_STATES", { users });
        dispatch("ADD_ALERT", { status, title, text });
        dispatch("audit/GET_AUDITS", {}, { root: true });
      } catch (error) {
        dispatch("ADD_ALERT", error.response.data);
      }
    },
  },

  getters: {
    //
  },
};
