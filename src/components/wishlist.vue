<template>
  <div class="wishlist-page" style="min-height: 100vh">
    <v-card class="mx-auto" color="#368790" style="height: 20vh">
      <v-card-text
        style="
          font-size: x-large;
          font-family: Book Antiqua;
          margin-left: 15vh;
          margin-top: 3vh;
        "
      >
        Traveler
      </v-card-text>
    </v-card>
    <v-img
      src="https://www.perthnow.com.au/stories/perth-misses-out-on-return-to-international-travel/assets/8.gif"
      style="margin-left: 180vh; margin-top: -20vh"
    ></v-img>
    <v-data-table
      v-model:expanded="expanded"
      :headers="headers"
      :items="details"
      item-value="price"
      item-key="price"
      show-expand
      class="elevation-1"
      style="
        margin-left: 35vh;
        width: 160vh;
        margin-top: 2vh;
        min-height: 66.6vh;
      "
    >
      <template v-slot:top> </template>
      <template v-slot:expanded-row="{ columns, item }">
        <tr>
          <td :colspan="columns.length" v-if="item.props.title.flag === 'v2'">
            <div>Class: {{ item.props.title.class }}</div>
            <div>Price: {{ item.props.title.price }}</div>
            <div>Duration: {{ item.props.title.duration }}</div>
            <div>Distance: {{ item.props.title.distance }}</div>
            <div>Number of changes: {{ item.props.title.no_of_changes }}</div>
            <div>Departure day: {{ item.props.title.depart_day }}</div>
            <div>
              Return day:
              {{
                item.props.title.return_day !== "0000-00-00"
                  ? item.props.title.return_day
                  : "Unknown"
              }}
            </div>
          </td>
          <td :colspan="columns.length" v-if="item.props.title.flag === 'v1'">
            <div>Airline: {{ item.props.title.airline }}</div>
            <div>Is it low cost?: {{ item.props.title.lowcost }}</div>
            <div>Flight number: {{ item.props.title.flight_number }}</div>
            <div>Price: {{ item.props.title.price }}</div>
            <div>Departure day: {{ item.props.title.depart_day }}</div>
            <div>Departure time: {{ item.props.title.depart_time }}</div>
            <div>Return day: {{ item.props.title.return_day }}</div>
            <div>Return time: {{ item.props.title.return_time }}</div>
          </td>
        </tr>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="deleteItem(item)"> mdi-close </v-icon>
      </template>
    </v-data-table>
  </div>
  <v-card>
    <v-layout>
        <v-navigation-drawer
          v-if="role_user"
          expand-on-hover
          rail
          :style="{ backgroundColor: '#6FBDC6' }"
        >
          <v-list density="compact" nav>
            <v-list-item
              link
              to="/profile"
              prepend-icon="mdi-face-man-profile"
              title="My Profile"
              value="profile"
            ></v-list-item>
            <v-list-item
              link
              to="/dashboard"
              prepend-icon="mdi-view-dashboard"
              title="Dashboard"
              value="dashboard"
            ></v-list-item>
            <v-list-item>
              <v-img class="custom-img" :src="image"></v-img>
            </v-list-item>
          </v-list>

          <template v-slot:append>
            <div class="pa-2">
              <v-btn
                @click="logout()"
                block
                style="
                  font-size: xx-small;
                  background-color: #324b4e;
                  color: antiquewhite;
                "
              >
                Logout
              </v-btn>
            </div>
          </template>
        </v-navigation-drawer>

        <v-navigation-drawer
          v-if="role_admin"
          expand-on-hover
          rail
          :style="{ backgroundColor: '#6FBDC6' }"
        >
          <v-list density="compact" nav>
            <v-list-item
              link
              to="/profile"
              prepend-icon="mdi-face-man-profile"
              title="My Profile"
              value="profile"
            ></v-list-item>
            <v-list-item
              link
              to="/dashboard"
              prepend-icon="mdi-view-dashboard"
              title="Dashboard"
              value="dashboard"
            ></v-list-item>
            <v-list-item
              link
              to="/admin"
              prepend-icon="mdi-account-supervisor"
              title="Admin"
              value="admin"
            ></v-list-item>
            <v-list-item>
              <v-img class="custom-img-ad" :src="image"></v-img>
            </v-list-item>
          </v-list>

          <template v-slot:append>
            <div class="pa-2">
              <v-btn
                @click="logout()"
                block
                style="
                  font-size: xx-small;
                  background-color: #324b4e;
                  color: antiquewhite;
                "
              >
                Logout
              </v-btn>
            </div>
          </template>
        </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>

<style>
.custom-img {
  margin-top: 50vh;
  margin-right: 5vh;
  height: 20vh;
}
.wishlist-page {
  /* background-color: #6FBDC6; */
  background: linear-gradient(to bottom, #368790, #e3f5ef);
}
</style>

<script>
import myImage from "../assets/logo/airplanes-are-flying-around-the-world-illustration-in-minimal-style-png.png";
import axios from "axios";

export default {
  data() {
    return {
      role_user: false,
      role_admin: false,
      expanded: [],
      image: myImage,
      details: [],
      headers: [
        {
          align: "start",
          key: "origin",
          sortable: true,
          title: "Departure City",
        },
        {
          align: "start",
          key: "destination",
          sortable: true,
          title: "Destination City",
        },
        {
          title: "Remove from whishlist",
          key: "actions",
          align: "center",
          sortable: false,
        },
      ],
    };
  },
  methods: {
    deleteItem(item) {
      const cookieValue = document.cookie.match(
        "(^|;)\\s*" + "loggedin" + "\\s*=\\s*([^;]+)"
      );
      const cookie = cookieValue ? cookieValue.pop() : "";
      axios
        .delete("http://localhost:80/Traveler/wishlist", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          data: {
            cookie: cookie,
            flight: item.props.title,
          },
        })
        .then((response) => {
            window.location.reload();
        })
        .catch((error) => {});
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
          this.$router.push("/login");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  created() {
    axios
      .get("http://localhost:80/Traveler/dashboard?role=null", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (response.data["user_role"] == "admin") {
          this.role_admin = true;
        } else if (response.data["user_role"] == "user") {
          this.role_user = true;
        }
      })
      .catch((error) => {
        const error_js = JSON.stringify(error.response.data);
          const error_parse = JSON.parse(error_js);
          this.errorMessage = error_parse.error;
          if (this.errorMessage == "User not logged in!") {
            document.cookie =
              "loggedin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            this.errorDialogLogin = true;
          } else {
            this.errorDialog = true;
          }
      });

    axios
      .get(
        "http://localhost:80/Traveler/wishlist",
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
        this.details = response.data;
      })
      .catch((error) => {
        const error_js = JSON.stringify(error.response.data);
        const error_parse = JSON.parse(error_js);
        this.errorMessage = error_parse.error;
        this.errorDialog = true;
      });
  },
};
</script>
