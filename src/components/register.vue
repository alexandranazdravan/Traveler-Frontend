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
      <v-form fast-fail @submit.prevent="register" style="margin: 10%">
        <div style="display: flex; align-items: center; width: 100%">
          <v-text-field
            v-model="username"
            label="Username *"
            style="width: 100%"
          ></v-text-field>
        </div>
        <div style="display: flex; align-items: center; width: 100%">
          <v-text-field
            v-model="fullname"
            label="Fullname"
            style="width: 100%"
          ></v-text-field>
        </div>
        <div style="display: flex; align-items: center; width: 100%">
          <v-text-field
            v-model="email"
            label="Email *"
            style="width: 100%"
          ></v-text-field>
        </div>
        <div style="display: flex; align-items: center; width: 100%">
          <div style="position: relative; width: 100%">
            <v-text-field
              v-model="password"
              label="Password *"
              :type="show1 ? 'text' : 'password'"
              style="width: 100%"
            ></v-text-field>
            <v-icon
              :class="show1 ? 'text-primary' : ''"
              @click="show1 = !show1"
              style="
                position: absolute;
                right: 5px;
                top: 40%;
                transform: translateY(-50%);
                cursor: pointer;
              "
              >{{ show1 ? "mdi-eye" : "mdi-eye-off" }}</v-icon
            >
          </div>
        </div>

        <div style="display: flex; align-items: center; width: 100%">
          <div style="position: relative; width: 100%">
            <v-text-field
              v-model="repeatpassword"
              label="Confirm Password *"
              :type="show2 ? 'text' : 'password'"
              style="width: 100%"
            ></v-text-field>
            <v-icon
              :class="show ? 'text-primary' : ''"
              @click="show2 = !show2"
              style="
                position: absolute;
                right: 5px;
                top: 40%;
                transform: translateY(-50%);
                cursor: pointer;
              "
              >{{ show2 ? "mdi-eye" : "mdi-eye-off" }}</v-icon
            >
          </div>
        </div>

        <v-btn
          type="submit"
          color="primary"
          block
          class="mt-2"
          style="background-color: #6ab547ff !important"
          >Sign up</v-btn
        >
      </v-form>
    </v-sheet>
  </div>

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
        Username, Password, Confirm Password and User's Email cannot be empty!
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="showErrorDialog()">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="errorEmail"
    max-width="300px"
    style="
      background-image: url('../assets/logo/airplanes-are-flying-around-the-world-illustration-in-minimal-style-png.png');
    "
  >
    <template v-slot:activator="{ on }"> </template>
    <v-card>
      <v-card-text> This is not a valid email </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="showErrorEmailDialog()"
          >OK</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="errorUsername"
    max-width="300px"
    style="
      background-image: url('../assets/logo/airplanes-are-flying-around-the-world-illustration-in-minimal-style-png.png');
    "
  >
    <template v-slot:activator="{ on }"> </template>
    <v-card>
      <v-card-text> Username contains illegal characters. </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="showErrorUsernameDialog()"
          >OK</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="errorPassword"
    max-width="300px"
    style="background-image: url('../assets/logo/airplanes-are-flying-around-the-world-illustration-in-minimal-style-png.png');
    "
  >
    <template v-slot:activator="{ on }"> </template>
    <v-card>
      <v-card-text> Passwords must match. </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="showErrorPasswordDialog()"
          >OK</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="errorRegisterMsg"
    max-width="300px"
    style="background-image: url('../assets/logo/airplanes-are-flying-around-the-world-illustration-in-minimal-style-png.png');"
  >
    <template v-slot:activator="{ on }"> </template>
    <v-card>
      <v-card-text> {{ errorMsg }} </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="showErrorDuplicateDialog()"
          >OK</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
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
      email: "",
      fullname: "",
      repeatpassword: "",
      show1: false,
      show2: false,
      errorDialog: false,
      emailRegex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/,
      usernameRegex: /^[a-zA-Z0-9_.]+$/,
      errorEmail: false,
      errorUsername: false,
      errorPassword: false,
      errorRegisterMsg: false,
      errorMsg: "",
    };
  },
  methods: {
    showErrorDialog() {
      this.errorDialog = !this.errorDialog;
    },
    showErrorEmailDialog() {
      this.errorEmail = !this.errorEmail;
    },
    showErrorUsernameDialog() {
      this.errorUsername = !this.errorUsername;
    },
    showErrorPasswordDialog() {
      this.errorPassword = !this.errorPassword;
    },
    showErrorDuplicateDialog() {
      this.errorRegisterMsg = !this.errorRegisterMsg;
    },
    register() {
      if (
        this.username === "" ||
        this.password === "" ||
        this.repeatpassword === "" ||
        this.email === ""
      ) {
        this.errorDialog = true;
        return;
      }

      console.log(this.username);
      if (!this.emailRegex.test(this.email)) {
        this.errorEmail = true;
        return;
      }

      if (!this.usernameRegex.test(this.username)) {
        this.errorUsername = true;
        return;
      }

      if (this.password !== this.repeatpassword) {
        this.errorPassword = true;
        return;
      }
      axios
        .post(
          "http://localhost:80/Traveler/register",
          {
            username: this.username,
            password: this.password,
            repeatpassword: this.repeatpassword,
            fullname: this.fullname,
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
          document.cookie = `loggedin=${response.data.loggedin}; path=/`;
          const role = response.data["role"];
          this.$router.push("/dashboard");
        })
        .catch((error) => {
            const error_js = JSON.stringify(error.response.data)
            const error_parse = JSON.parse(error_js)
            // console.error(error_js);
            this.errorMsg = error_parse.error
            console.log(this.errorMsg)
            this.errorRegisterMsg = true
            // console.error(error_parse.response);
            // console.error(error_parse.response.data.error);
    //         if (error.response) {
    //   // The request was made and the server responded with a status code
    //   // that falls out of the range of 2xx
    //   console.log(error.response.data.message);
    // } else if (error.request) {
    //   // The request was made but no response was received
    //   console.log(error.request);
    // } else {
    //   // Something happened in setting up the request that triggered an Error
    //   console.log('Error', error.message);
    // }
        });
    },
  },
};
</script>
