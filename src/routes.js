import { createRouter, createWebHistory } from "vue-router";

import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import GameDetail from "./components/GameDetails.vue";
import Game from "./components/Games.vue";
import NotFound from "./components/NotFound.vue";
import WalkCreate from "./components/WalkCreate.vue";
import Signup from "./components/Signup.vue";
import Account from "./components/Account.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/account", component: Account },
    { path: "/login", component: Login },
    { path: "/games", component: Game },
    {
      path: "/games/:pk",
      component: GameDetail,
      children: [{ path: "walkthroughs", component: WalkCreate }],
    },
    { path: "/signup", component: Signup },
    { path: "/:invalidroute(.*)", component: NotFound },
  ],
});

export default router;
