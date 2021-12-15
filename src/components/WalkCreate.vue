<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-lg-10" d>
        <div class="card">
          <div class="card-body">
            <h4>Create a Walkthrough</h4>
            <form id="review-form" @submit.prevent="submitWalk">
              <div class="mb-3">
                <label for="title-input" class="form-label">Title</label
                ><input
                  type="text"
                  class="form-control"
                  id="title-input"
                  required=""
                  v-model="title"
                />
              </div>
              <div class="mb-3">
                <label for="rating-input" class="form-label">Rating</label
                ><input
                  type="number"
                  class="form-control"
                  id="rating-input"
                  required=""
                  min="1"
                  max="10"
                  v-model="rating"
                />
              </div>
              <div class="mb-3">
                <label for="summary-input" class="form-label">Review</label
                ><input
                  type="text"
                  row="3"
                  class="form-control"
                  id="summary-input"
                  required=""
                  v-model="summary"
                />
              </div>
              <div class="mb-3">
                <label for="vidleng-input" class="form-label"
                  >Video Length</label
                ><input
                  type="number"
                  class="form-control"
                  id="vidleng-input"
                  required=""
                  v-model="vidleng"
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Submit WalkThrough</button
              ><button
                type="clear"
                class="btn btn-outline-danger"
                v-on:click="cancelWalk"
              >
                Cancel</button
              ><!---->

              <p v-if="errorMessage" class="form-text text-danger">
                {{ errorMessage }}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      rating: null,
      summary: "",
      errorMessage: null,
    };
  },
  methods: {
    submitWalk() {
      let myWalk = {
        title: this.title,
        rating: this.rating,
        summary: this.summary,
        videolength: this.vidleng,
        gameFK: this.$route.params.pk,
      };

      axios
        .post("/walkthroughs", myWalk, {
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        })
        .then(() => {
          this.$router.replace("/account");
        })
        .catch(() => {
          this.errorMessage =
            "Unable to create a review. Please try again later.";
        });
    },
    cancelWalk() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
button {
  margin-right: 5px;
}
</style>
