<template>
  <div>
    <h1>Signup</h1>
    <form @submit.prevent="onSubmit" id="signup-form">
      <div class="mb-3">
        <label for="user-nameFirst" class="form-label">First Name</label>
        <input
          type="text"
          class="form-control"
          id="user-nameFirst"
          name="userNameFirst"
          required
          v-model="nameFirst"
        />
      </div>
      <div class="mb-3">
        <label for="user-nameLast" class="form-label">Last Name</label>
        <input
          type="text"
          class="form-control"
          id="user-nameLast"
          name="userNameLast"
          required
          v-model="nameLast"
        />
      </div>
      <div class="mb-3">
        <label for="user-username" class="form-label">Username</label>
        <input
          type="text"
          class="form-control"
          id="user-username"
          name="userUsername"
          required
          v-model="username"
        />
      </div>
      <div class="mb-3">
        <label for="user-email" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="user-email"
          aria-describedby="emailHelp"
          name="userEmail"
          required
          v-model="email"
        />
        <small v-if="dupEmail" class="text-danger"
          >Please choose a different email</small
        >
      </div>
      <div class="mb-3">
        <label for="user-password" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="user-password"
          required
          v-model="password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Sign Up</button>
      <p class="text-danger" id="error-signup">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      nameFirst: "",
      nameLast: "",
      username: "",
      email: "",
      password: "",
      errorMessage: "",
      dupEmail: false,
    };
  },
  methods: {
    onSubmit() {
      // console.log("Form Submitted");
      const myFormData = {
        nameFirst: this.nameFirst,
        nameLast: this.nameLast,
        username: this.username,
        email: this.email,
        password: this.password,
      };
      // console.log(myFormData);
      axios
        .post("/creators", myFormData)
        .then((myResponse) => {
          console.log(myResponse);
          this.$router.replace("/login?signupsuccess=true");
        })
        .catch((myError) => {
          if (myError.response.status === 409) {
            this.dupEmail = true;
          } else {
            this.errorMessage = "Can not sign you up. Please try again later";
          }
        });
    },
  },
};
</script>

<style></style>
