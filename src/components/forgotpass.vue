<template>
  <div
    class="d-flex align-center justify-center"
    style="
      background-position: center;
      background-size: contain;
      background-attachment: fixed !important;
      background-repeat: no-repeat !important;
      height: 100vh;
      background-color: #368790;
    "
  >
    <v-sheet
      width="70vh"
      class="mx-auto"
      style="
        background-color: #f3f9e3ff;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
      "
    >
      <v-form fast-fail @submit.prevent="resetpass" style="margin: 10%">
        <v-text-field v-model="username" label="Username"></v-text-field>
        <v-text-field v-model="email" label="User Email"></v-text-field>

        <v-btn
          type="submit"
          color="primary"
          block
          class="mt-2"
          style="background-color: #6ab547ff !important"
          >Submit</v-btn
        >

        <v-dialog
          v-model="errorMessage"
          max-width="300px"
          style="
            background-image: url('../assets/logo/airplanes-are-flying-around-the-world-illustration-in-minimal-style-png.png');
          "
        >
          <template v-slot:activator="{ on }"> </template>
          <v-card>
            <v-card-text> Invalid username or email. </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="showErrorDialog()"
                >OK</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-form>
    </v-sheet>
  </div>
</template>
<style>
div {
  background-image: url("../assets/logo/airplanes-are-flying-around-the-world-illustration-in-minimal-style-png.png");
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      email: "",
      errorMessage: false,
    };
  },
  methods: {
    showErrorDialog() {
      this.errorMessage = !this.errorMessage;
    },
    resetpass() {
      axios
        .post(
          "http://localhost:80/Traveler/forgotpass",
          {
            username: this.username,
            email: this.email,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          this.$router.push("/resetpass");
        })
        .catch((error) => {
          this.errorMessage = true;
        });
    },
  },
};
</script>
