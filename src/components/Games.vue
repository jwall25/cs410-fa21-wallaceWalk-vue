<template>
  <div>
    <h1>Games</h1>
    <hr />
    <table class="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Rating</th>
          <th>Genre</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="aGame in theGames" :key="aGame.GamePK">
          <th>{{ aGame.Title }}</th>
          <th>{{ aGame.Rating }}</th>
          <th>{{ aGame.Name }}</th>
          <th>{{ aGame.Price }}</th>
          <th>
            <router-link :to="`/games/${aGame.GamePK}`"
              ><button class="btn btn-primary">Details</button></router-link
            >
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  computed: {
    theGames() {
      return this.$store.state.games;
    },
  },
};
</script>

<style></style>
