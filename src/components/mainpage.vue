<template>
  <header>Hello bitches, we re here</header>
  <button @click="makeRequest()">Make Request</button>
  <br />
  <button @click="logout()">Logout</button>

  <v-card>
    <v-layout>
      <v-navigation-drawer class="bg-deep-purple" theme="dark" permanent>
        <v-list color="transparent">
          <v-list-item
            prepend-icon="mdi-view-dashboard"
            title="Dashboard"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-box"
            title="Account"
          ></v-list-item>
          <v-list-item prepend-icon="mdi-gavel" title="Admin"></v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn block> Logout </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      <v-main style="height: 400px"></v-main>
    </v-layout>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  methods: {
    makeRequest() {
      const cookies =
        "XDEBUG_SESSION=PHPSTORM; Phpstorm-c311215b=e680c706-d983-4041-8885-e632d9421aa2; PHPSESSID=1k6fq7j22vfkamr7143b3e9i51;";
      axios
        .get("http://localhost:80/Traveler/", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            Cookies: cookies,
          },
        })
        .then((response) => {
          const cookieValue = document.cookie.match(
            "(^|;)\\s*" + "loggedin" + "\\s*=\\s*([^;]+)"
          );
          const cookie = cookieValue ? cookieValue.pop() : "";
        })
        .catch((error) => {
          console.error(error);
        });
    },
    logout() {
      axios
        .get("http://localhost:80/Traveler/logout", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          document.cookie =
            "loggedin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          console.log("LoggedOut");
          this.$router.push("/login");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
