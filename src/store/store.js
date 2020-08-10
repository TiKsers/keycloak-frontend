import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authorizationToken: ""
  },

  mutations: {
    setSecurityToken(state, token) {
      state.authorizationToken = token;
    }
  },

  getters: {
    authorizationToken: state => state.authorizationToken
  }
})