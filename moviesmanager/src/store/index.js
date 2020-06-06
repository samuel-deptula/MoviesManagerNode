import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);


const user = {
  namespaced: true,
  state: {
    user: {},
    isLoading: false,
    isLoggedIn: null,
    jwtToken: null,
    errors: []
  },
  getters: {
    isLoading: state => state.isLoading,
    user: state => state.user,
    isLoggedIn: state => state.isLoggedIn,
    errors: state => state.errors,
    currentUser: state => state.data,
    jwtToken: state => {
      return state.jwtToken
    }
  },
  actions: {
    async trySignin(context, credentials) {
      try {
        context.commit("updateIsLoading", true);
        const response = await Vue.prototype.$axiosNode.post("/login", credentials);
        context.commit("signinSuccess", response.data);
        router.push("/");
      } catch (err) {
        context.commit("signError", err);
      }
    },
    async trySignup(context, user) {
      try {
        context.commit("updateIsLoading", true);
        await Vue.prototype.$axiosNode.post("/signup", user);
        context.commit("signupSuccess");
        router.push("/signin");
      } catch (err) {
        context.commit("signError", err);
      }
    },
  },
  mutations: {
    updateIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    signupSuccess(state) {
      state.isLoading = false;
      state.errors = [];
    },
    signError(state, errors) {
      state.isLoading = false;
      state.errors = errors;
    },
    signinSuccess(state, data) {
      state.isLoading = false;
      state.errors = [];
      state.isLoggedIn = true;
      state.user = data.user;
      state.jwtToken = data.token;
    },
    signOut(state) {
      state.jwtToken = null;
      state.isLoggedIn = null;
    },
  }
};

const store = new Vuex.Store({
  modules: {
    user
  },
  plugins: [createPersistedState()]
});

export default store
