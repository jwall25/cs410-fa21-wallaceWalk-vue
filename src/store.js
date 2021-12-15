import { createStore } from "vuex";
import axios from "axios";
import myRoutes from "./routes.js";

export default createStore({
  state: {
    token: null,
    user: null,
    games: [],
  },
  mutations: {
    storeTokenInApp(state, myToken) {
      state.token = myToken;
    },
    storeUserInApp(state, theUser) {
      state.user = theUser;
    },
    storeGames(state, games) {
      state.games = games;
    },
    clearAuthData(state) {
      state.token = null;
      state.user = null;
    },
  },
  actions: {
    getGames({ commit }) {
      axios.get("/games").then((aResponse) => {
        console.log("response in /games", aResponse);
        commit("storeGames", aResponse.data);
      });
    },
    logout({ commit, state }) {
      axios
        .post("/creators/logout", null, {
          headers: { Authorization: `Bearer ${state.token}` },
        })
        .then(() => {
          commit("clearAuthData");
          myRoutes.replace("/");
        })
        .catch(() => {
          console.log("error logging out");
        });
    },
  },
});
