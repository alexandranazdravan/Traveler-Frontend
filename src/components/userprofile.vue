<template>
  <div class="profile-page d-flex align-center justify-center">
    <v-container fluid>
      <v-layout column>
        <v-card
          style="
            width: 100vh;
            height: 90vh;
            background-color: #f3f9e3ff;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
            border-radius: 10px;
          "
        >
          <v-card-text>
            <v-avatar
              color="grey"
              size="90"
              rounded="1"
              style="margin-bottom: 2vh; margin-top: 1vh"
            >
              <v-img cover :src="url"></v-img>
            </v-avatar>
            <v-flex class="mb-4">
              <v-btn
                @click="openAvatarPicker"
                style="
                  margin-left: 3vh;
                  background-color: #57bf80;
                  margin-top: 5vh;
                  font-size: x-small;
                  width: 17vh;
                  height: 5vh;
                "
                >Change Avatar</v-btn
              >
            </v-flex>
            <v-text-field
              v-model="form.fullName"
              label="Fullname"
              style="margin-top: 4vh"
            ></v-text-field>
            <v-text-field
              v-model="form.userName"
              label="Username"
            ></v-text-field>
            <v-text-field
              v-model="form.userEmail"
              label="Email Address"
            ></v-text-field>
            <v-btn
              @click="changePass()"
              style="background-color: #57bf80; margin-top: 4vh"
              >Change password</v-btn
            >
          </v-card-text>
          <v-card-actions>
            <v-btn @click="dashboard()" style="color: #14884e; margin-top: 2vh"
              >Back to Dashboard</v-btn
            >
            <v-btn
              @click="saveChanges()"
              style="color: #14884e; margin-top: 2vh; margin-left: 40vh"
              >Save Changes</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-container>
    <v-dialog
      v-model="showAvatarPicker"
      width="80vh"
      style="margin-left: 140vh"
    >
      <v-row>
        <v-col v-for="(avatar, index) in avatars" :key="index" cols="5">
          <v-avatar
            color="grey"
            size="75"
            rounded="1"
            :class="{ selected: avatar.selected }"
            @click="handleAvatarClick(index)"
          >
            <v-img cover :src="avatar.src"></v-img>
          </v-avatar>
        </v-col>
      </v-row>
      <v-btn
        @click="openAvatarPicker"
        style="
          width: 30vh;
          margin-left: 10vh;
          margin-top: 5vh;
          background-color: #57bf80;
        "
        >Choose Avatar</v-btn
      >
    </v-dialog>
    <v-dialog v-model="showChangePass" width="80vh" style="margin-left: 100vh">
      <v-card style="background-color: #f3f9e3ff; height: 70vh">
        <v-card-text style="margin-left: 2vh; margin-top: 4vh">
          <div style="display: flex; align-items: center; width: 100%">
            <div style="position: relative; width: 100%">
              <v-text-field
                v-model="oldpassword"
                label="Old Password"
                :rules="[requiredO]"
                :type="show3 ? 'text' : 'password'"
                style="width: 100%"
              ></v-text-field>
              <v-icon
                :class="show3 ? 'text-primary' : ''"
                @click="show3 = !show3"
                style="
                  position: absolute;
                  right: 5px;
                  top: 40%;
                  transform: translateY(-50%);
                  cursor: pointer;
                "
                >{{ show3 ? "mdi-eye" : "mdi-eye-off" }}</v-icon
              >
            </div>
          </div>
          <div style="display: flex; align-items: center; width: 100%">
            <div style="position: relative; width: 100%">
              <v-text-field
                v-model="newpassword"
                label="New Password"
                :rules="[requiredN]"
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
                label="Confirm Password"
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
          <a
            href="/forgotpass"
            v-if="errorForgotPassword"
            class="text-body-2 font-weight-regular"
            >Forgot Password?</a
          >
          <v-btn
            @click="cancelChangePass"
            style="
              width: 20vh;
              background-color: #57bf80;
              margin-top: 1vh;
              margin-left: 50vh;
            "
            >Cancel</v-btn
          >
          <v-btn
            @click="closeChangePass"
            style="
              width: 20vh;
              margin-left: 50vh;
              background-color: #57bf80;
              margin-top: 3vh;
            "
            >Submit</v-btn
          >
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="errorPassword" max-width="300px">
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

    <v-dialog v-model="errorSamePassword" max-width="300px">
      <template v-slot:activator="{ on }"> </template>
      <v-card>
        <v-card-text> New password cannot be old password. </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="showErrorSamePasswordDialog()"
            >OK</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="errorEmptyPassword" max-width="300px">
      <template v-slot:activator="{ on }"> </template>
      <v-card>
        <v-card-text> Password field cannot be empty. </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="showErrorEmptyPasswordDialog()"
            >OK</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style>
.selected {
  /* border: 2px solid #7e77b1; */
  border: 4px solid #befbff;
}
.profile-page {
  background-image: url("../assets/logo/airplanes-are-flying-around-the-world-illustration-in-minimal-style-png.png");
  background-position: right bottom;
  background-size: contain;
  background-attachment: fixed !important;
  background-repeat: no-repeat !important;
  height: 100vh;
  background-color: #368790;
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      show1: false,
      show2: false,
      show3: false,
      form: {
        fullName: "John",
        userName: "Doe",
        userEmail: "john@doe.com",
      },
      showAvatarPicker: false,
      showChangePass: false,
      avatars: [
        {
          src: "https://cdn.dribbble.com/users/374672/screenshots/4016181/cat.gif",
          selected: false,
        },
        {
          src: "https://cdn.dribbble.com/users/1210339/screenshots/2767019/avatar18.gif",
          selected: false,
        },
        {
          src: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/3c9f4a40760693.578c9a4699778.gif",
          selected: false,
        },
        {
          src: "https://i.pinimg.com/originals/c3/fd/e0/c3fde00f2f1795d601b3afdde4b5c60d.gif",
          selected: false,
        },
        {
          src: "https://gif-avatars.com/img/200x200/gif-1.gif",
          url: "",
          selected: false,
        },
        {
          src: "https://cdn.myportfolio.com/17be4dd08c5417027a544816a909fcf8/615fee6b-36bf-4165-91a9-08f8a863d089_rw_600.gif?h=463e218126a9deaa67a295de3a58f8f9",
          selected: false,
        },
        {
          src: "https://64.media.tumblr.com/a8df079af37aa8637aface4d40d6906b/tumblr_nmsjgr0Lnt1syljkjo1_1280.gif",
          selected: false,
        },
        {
          src: "https://media.giphy.com/staff/alex-hoang-96MS1JWoHnqg.gif",
          selected: false,
        },
        {
          src: "https://krishastudio.com//wp-content/uploads/2021/06/1.gif",
          selected: false,
        },
        {
          src: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/14cb6b84808917.5d68451d7d126.gif",
          selected: false,
        },
      ],
      url: "https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg",
      id: 0,
      oldpassword: "",
      actualoldpassword: "",
      newpassword: "",
      repeatpassword: "",
      requiredN: (value) => !!value || "This field is required",
      requiredO: (value) => !!value || "This field is required",
      errorPassword: false,
      errorEmptyPassword: false,
      errorForgotPassword: false,
      errorSamePassword: false,
    };
  },
  created() {
    axios
      .get(
        "http://localhost:80/Traveler/userprofile",
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        this.form.userName = response.data["username"];
        this.form.userEmail = response.data["email"];
        this.form.fullName = response.data["fullname"];
        this.url = response.data["avatar"];
        this.actualoldpassword = response.data["password"];
        this.id = response.data["user_id"];
      })
      .catch((error) => {
        this.errorMessage = "Something went wrong";
      });
  },
  methods: {
    changePass() {
      this.showChangePass = true;
    },
    cancelChangePass() {
      (this.oldpassword = ""),
        (this.newpassword = ""),
        (this.repeatpassword = ""),
        (this.showChangePass = false);
    },
    closeChangePass() {
      if (
        this.newpassword == "" ||
        this.oldpassword == "" ||
        this.repeatpassword == ""
      ) {
        this.errorEmptyPassword = true;
        return;
      }

      if (this.newpassword !== this.repeatpassword) {
        this.errorPassword = true;
        return;
      }

      axios
        .post(
          "http://localhost:80/Traveler/userprofile",
          {
            username: this.form.userName,
            actualoldpassword: this.actualoldpassword,
            oldpassword: this.oldpassword,
            newpassword: this.newpassword,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          if (this.newpassword == this.oldpassword) {
            this.errorSamePassword = true;
            return;
          }
          this.showChangePass = !this.showChangePass;
        })
        .catch((error) => {
          this.errorMessage = "Invalid old password";
          this.errorForgotPassword = true;
        });
    },
    saveChanges() {
      axios
        .post(
          "http://localhost:80/Traveler/userprofile",
          {
            username: this.form.userName,
            email: this.form.userEmail,
            fullname: this.form.fullName,
            avatar: this.url,
            id: this.id,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          this.errorMessage = "Invalid old password";
          this.errorForgotPassword = true;
        });
    },
    dashboard() {
      this.$router.push("/dashboard");
    },
    openAvatarPicker() {
      this.showAvatarPicker = !this.showAvatarPicker;
    },
    selectAvatar(avatar) {
      this.form.avatar = avatar;
    },
    handleAvatarClick(index) {
      this.url = this.avatars[index].src;
    },
    showErrorPasswordDialog() {
      this.errorPassword = !this.errorPassword;
    },
    showErrorEmptyPasswordDialog() {
      this.errorEmptyPassword = !this.errorEmptyPassword;
    },
    showErrorSamePasswordDialog() {
      this.errorSamePassword = !this.errorSamePassword;
    },
  },
};
</script>
