<template>
  <div>
    <h1>Login</h1>
    <div v-if="this.$route.query.signupsuccess" class="alert alert-success">
      Thanks for signing up! Please log in now.
    </div>

    <form @submit.prevent="onSubmit">
      <div class="mb-3">
        <label for="username-input" class="form-label">Username</label
        ><input
          type="text"
          class="form-control"
          id="username-input"
          required=""
          placeholder="Enter username"
          v-model="username"
        />
      </div>
      <div class="mb-3">
        <label for="email-input" class="form-label">Email</label
        ><input
          type="email"
          class="form-control"
          id="email-input"
          required=""
          placeholder="Enter email"
          v-model="email"
        />
      </div>
      <div class="mb-3">
        <label for="password-input" class="form-label">Password</label
        ><input
          type="password"
          class="form-control"
          id="password-input"
          placeholder="Password"
          required=""
          v-model="password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>

      <p v-if="credentialsError" class="form-text text-danger">
        Invalid credentials
      </p>

      <p v-if="loginError" class="form-text text-danger">
        Could not log you in, please try again later
      </p>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      username: "",
      loginError: false,
      credentialsError: false,
    };
  },

  methods: {
    onSubmit() {
      let myFormData = {
        email: this.email,
        password: this.password,
        username: this.username,
      };

      //console.log("form data: ", myFormData);

      axios
        .post("/creators/login", myFormData)
        .then((myResponse) => {
          // console.log("the response", myResponse);

          this.$store.commit("storeTokenInApp", myResponse.data.token);
          this.$store.commit("storeUserInApp", myResponse.data.user);

          this.$router.replace("/account");
        })
        .catch((myError) => {
          if (myError.response.status == 401) {
            this.credentialsError = true;
          } else {
            this.loginError = true;
          }
          // console.log("error in Login", myError);
        });
    },
  },
};
</script>

<style></style>
