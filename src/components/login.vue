<template>
  <v-dialog
    v-model="errorDialog"
    max-width="300px"
    style="
      background-image: url('../assets/logo/airplanes-are-flying-around-the-world-illustration-in-minimal-style-png.png');
    "
  >
    <template v-slot:activator="{ on }"> </template>
    <v-card>
      <v-card-text>
        Username, Password and User's Email cannot be empty!
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="showErrorDialog()">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <div
    class="d-flex align-center justify-center"
    style="
      background-position: center;
      background-size: contain;
      background-attachment: fixed;
      background-repeat: no-repeat;
      height: 100vh;
      background-color: #368790;
    "
  >
    <v-dialog
      v-model="show"
      max-width="300px"
      style="
        background-image: url('../assets/logo/airplanes-are-flying-around-the-world-illustration-in-minimal-style-png.png');
      "
    >
      <template v-slot:activator="{ on }"> </template>
      <v-card>
        <v-card-text> Invalid credentials </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showInvalid()">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-sheet
      width="70vh"
      class="mx-auto"
      style="
        background-color: #f3f9e3ff;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
      "
    >
      <v-form fast-fail @submit.prevent="login" style="margin: 10%">
        <div style="display: flex; align-items: center; width: 100%">
          <v-text-field
            v-model="username"
            label="Username"
            style="width: 100%"
          ></v-text-field>
        </div>
        <div style="display: flex; align-items: center; width: 100%">
          <div style="position: relative; width: 100%">
            <v-text-field
              v-model="password"
              label="Password"
              :type="show ? 'text' : 'password'"
              style="width: 100%"
            ></v-text-field>
            <v-icon
              :class="show ? 'text-primary' : ''"
              @click="show = !show"
              style="
                position: absolute;
                right: 5px;
                top: 40%;
                transform: translateY(-50%);
                cursor: pointer;
              "
              >{{ show ? "mdi-eye" : "mdi-eye-off" }}</v-icon
            >
          </div>
        </div>

        <a href="/forgotpass" class="text-body-2 font-weight-regular"
          >Forgot Password?</a
        >

        <v-btn
          type="submit"
          color="primary"
          block
          class="mt-2"
          style="background-color: #6ab547ff !important"
          >Sign in</v-btn
        >
      </v-form>
      <div class="mt-2">
        <p class="text-body-2" style="margin-bottom: 3%; margin-left: 3%">
          Don't have an account? <a href="/register">Sign Up</a>
        </p>
      </div>
    </v-sheet>
  </div>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        rail
        :style="{ backgroundColor: '#f3f9e3ff' }"
      >
        <v-list density="compact" nav>
          <v-list-item
            link
            to="/admin"
            prepend-icon="mdi-shield-account"
            title="Admin page"
            value="admin"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
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
      password: "",
      show: false,
      errorMessage: "",
      errorDialog: false,
    };
  },
  methods: {
    showErrorDialog() {
      this.errorDialog = !this.errorDialog;
    },
    showInvalid() {
      this.show = !this.show;
    },
    login() {
      this.show = false;

      if (this.username === "" || this.password === "") {
        this.errorDialog = true;
        return;
      }

      axios
        .post(
          "http://localhost:80/Traveler/login",
          {
            username: this.username,
            password: this.password,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          document.cookie = `loggedin=${response.data.loggedin}; path=/`;
          const role = response.data["role"];
          console.log(role);
          if (role == "user") {
            this.$router.push("/dashboard");
          }
          if (role == "admin") {
            this.$router.push("/admin");
          }
        })
        .catch((error) => {
          this.errorMessage = "Invalid credentials";
          this.show = true;
        });
    },
  },
};
</script>
