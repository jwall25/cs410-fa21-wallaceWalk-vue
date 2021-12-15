<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h2 class="text-primary">{{ game.Title }}</h2>
        <br />
        <p>
          Systems: <br /><strong>{{ game.System }}</strong>
        </p>
        <p>
          Price: <br /><strong>{{ formattedPrice }}</strong>
        </p>
        <p>
          Genre: <br /><strong>{{ game.Name }}</strong>
        </p>
      </div>
    </div>

    <br />
    <router-link
      v-if="auth"
      :to="`/games/${this.$route.params.pk}/walkthroughs`"
      ><button class="btn btn-success">Add a Walkthrough</button></router-link
    >

    <router-link v-else :to="`/login`"
      ><button class="btn btn-outline-success">
        Sign In to Add a Walkthrough
      </button></router-link
    >
  </div>
</template>

<script>
export default {
  computed: {
    game() {
      let allGames = this.$store.state.games;

      let thisGame = allGames.find((aGame) => {
        return aGame.GamePK == this.$route.params.pk;
      });

      return thisGame;
    },
    formattedPrice() {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(this.game.Price);
    },
    auth() {
      return this.$store.state.token;
    },
  },
};
</script>

<style></style>
