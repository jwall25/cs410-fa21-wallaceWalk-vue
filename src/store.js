import { createStore } from "vuex";
import axios from "axios";

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
  },
  actions: {
    getGames({ commit }) {
      axios.get("/games").then((aResponse) => {
        console.log("response in /games", aResponse);
        commit("storeGames", aResponse.data);
      });
    },
  },
});
