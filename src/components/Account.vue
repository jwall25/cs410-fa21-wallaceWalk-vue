<template>
  <div>
    <h1>Account</h1>
    <hr />
    <h3>{{ firstName }}'s Walkthroughs</h3>

    <p v-if="accountError" class="text-danger">
      Cannot get your account information. Please try again Later
    </p>

    <table v-if="walksByUser" class="table">
      <thead>
        <th>Title</th>
        <th>Game</th>
        <th>Summary</th>
        <th>Rating</th>
        <th>Video Length</th>
      </thead>
      <tbody>
        <tr v-for="thisWalk in walksByUser" :key="thisWalk.WalkPK">
          <th>
            <router-link :to="`/games/${thisWalk.GameFK}`">{{
              thisWalk.Title
            }}</router-link>
          </th>
          <th>{{ thisWalk.GameTitle }}</th>
          <th>{{ thisWalk.Summary }}</th>
          <th>{{ thisWalk.Rating }}</th>
          <th>{{ thisWalk.VideoLength }}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      walksByUser: null,
      accountError: false,
    };
  },
  computed: {
    firstName() {
      console.log("Here is store so far:", this.$store.state);
      return this.$store.state.user.NameFirst;
    },
  },
  created() {
    axios
      .get("/walkthroughs/me", {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      })
      .then((theResponse) => {
        console.log("Response", theResponse);
        this.walksByUser = theResponse.data;
      })
      .catch(() => {
        this.accountError = true;
      });
  },
};
</script>

<style></style>
