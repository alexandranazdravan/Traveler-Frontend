<template>
  <div class="split-screen">
    <div class="split-screen__half1">
      <h1 class="header">Welcome to Traveler!</h1>
      <div class="backgroundimg"></div>
    </div>
    <div class="vertical-line"></div>
    <div class="split-screen__half2">
      <v-btn
        class="mr-2"
        link
        to="/login"
        outlined
        color="#65CEC5"
        style="
          margin-top: 7vw;
          margin-bottom: 4vw;
          margin-left: 3vw;
          height: 4.5vw;
          width: 12vw;
          font-size: medium;
        "
        >Login Page</v-btn
      >
      <br />
      <v-btn
        class="mr-2"
        link
        to="/about"
        outlined
        color="#65CEC5"
        style="
          margin-bottom: 3vw;
          margin-left: 3vw;
          height: 4.5vw;
          width: 12vw;
          font-size: medium;
        "
        >About Us</v-btn
      >
      <v-container class="my-auto px-7">
        <v-layout>
          <v-flex py-1 no-wrap>
            <v-btn
              color="#65CEC5"
              @click="compose({})"
              style="
                margin-bottom: 3vw;
                margin-left: 1vw;
                height: 4.5vw;
                width: 12vw;
                font-size: medium;
              "
              >Contact Us <v-icon>mdi-email-edit-outline</v-icon></v-btn
            >
          </v-flex>
        </v-layout>
      </v-container>
      <v-dialog v-model="dialogCompose" width="500">
        <v-card>
          <v-card-text class="pa-5" style="background-color: #d9e5e1">
            <v-form ref="sendForm" v-model="valid" lazy-validation>
              <v-text-field
                v-model="composeMessage.from"
                label="From"
                :rules="[rules.required, rules.email]"
              ></v-text-field>
              <v-text-field
                v-model="composeMessage.subject"
                label="Subject"
                :rules="[rules.required]"
              ></v-text-field>
              <div v-html="composeMessage.originalBody"></div>
              <v-textarea
                v-model="composeMessage.body"
                label="Message"
              ></v-textarea>
            </v-form>
          </v-card-text>
          <v-card-actions class="pa-5" style="background-color: #6fbdc6">
            <v-btn class="mr-2" @click="saveDraft()" outlined color="#00353d"
              >Send</v-btn
            >
            <v-btn @click="cancelDraft()" outlined color="#00353d"
              >Cancel</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="showSent" max-width="300px">
        <template v-slot:activator="{ on }"> </template>
        <v-card>
          <v-card-text>
            Email sent! We will contact you as soon as possible.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="showContactDialog()"
              >OK</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<style>
.split-screen {
  display: flex;
  background: linear-gradient(to right, #00353d, #e6f4f1);
}

.split-screen__half1 {
  flex: 1;
}

.header {
  height: 30vh;
  font-family: Gabriola;
  font-style: italic;
  font-size: 3rem;
  color: #e6f4f1;
  z-index: 1;
  opacity: 0;
  margin-left: 12vw;
  animation: fade-in 1s ease-out forwards;
  animation-delay: 1s;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.backgroundimg {
  background-size: contain;
  background-position: center;
  height: 70vh;
  padding-top: 30%;
  background-image: url("../assets/logo/airplanes-are-flying-around-the-world-illustration-in-minimal-style-png.png");
  animation: fade-in 1s ease-out forwards;
}

.vertical-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  margin-top: 5vw;
  transform: translateX(-50%);
  height: 40vw;
  width: 2px;
  background-position: center;
  background-repeat: no-repeat;

  background-image: linear-gradient(
    to bottom,
    transparent 2px,
    #243933 20vw,
    #243933 15vw,
    transparent 80%
  );
}

.split-screen__half2 {
  flex: 1;
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      messages: [],
      drafts: [],
      sent: [],
      dialogCompose: false,
      activeMessage: {},
      composeMessage: {},
      valid: true,
      showSent: false,
      rules: {
        required: (value) => !!value || "This field is required",
        email: (v) => /.+@.+\..+/.test(v) || "Must be a valid email",
      },
    };
  },
  methods: {
    showContactDialog() {
      this.showSent = !this.showSent;
    },
    compose() {
      this.dialogCompose = true;
    },
    saveDraft() {
      const json_item = JSON.stringify(this.composeMessage);
      var json_parse_item = JSON.parse(json_item);
      console.log(json_parse_item);

      axios
        .post("http://localhost:80/Traveler/contact", json_parse_item, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.showContactDialog = true;
        })
        .catch((error) => {
          this.errorMessage = "Invalid credentials";
          this.show = true;
        });

      this.dialogCompose = false;
    },
    cancelDraft() {
      this.dialogCompose = false;
    },
  },
};
</script>
