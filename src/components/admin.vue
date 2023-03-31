<template>
  <v-card>
    <v-layout flat>
      <v-top-navigation v-model="value" mode="shift">
        <v-btn @click="makeRequest()">
          <v-icon>mdi-account-supervisor</v-icon>

          <span>Manage Users</span>
        </v-btn>

        <v-btn @click="getAirports()">
          <v-icon>mdi-airport</v-icon>

          <span>Airports</span>
        </v-btn>

        <v-btn @click="getAirlines()">
          <v-icon>mdi-airplane</v-icon>

          <span>Airlines</span>
        </v-btn>

        <v-btn @click="getCities()">
          <v-icon>mdi-city</v-icon>

          <span>Cities</span>
        </v-btn>

        <v-btn @click="dahsboard()">
          <v-icon>mdi-view-dashboard</v-icon>

          <span>Dashboard</span>
        </v-btn>

        <v-btn @click="logout()">
          <v-icon>mdi-logout</v-icon>

          <span>Logout</span>
        </v-btn>


        <div class="content-wrapper">
        <v-card-title v-if="showUsers">
          <v-text-field
            v-model="search"
            label="Search"
            single-line
            hide-details
            append-inner-icon="mdi-magnify"
            style="margin-left: -1vw; margin-top: 3vw"
          ></v-text-field>
        </v-card-title>
        <v-data-table
          v-if="showUsers"
          v-model:page="page"
          :headers="users_headers"
          :items="users"
          item-key="user_name"
          :search="search"
          :items-per-page="itemsPerPage"
          @update:options="options = $event"
          hide-default-footer
          style="width: 100vw"
          ><template v-slot:item.actions="{ item }">
            <v-icon small @click="editUser(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteUser(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <v-dialog v-model="dialog" max-width="500px" v-if="showUsers">
          <v-card>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="editedItem.user_name"
                    label="Username"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="8">
                  <v-text-field
                    v-model="editedItem.user_fullname"
                    label="User's Fullname"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="editedItem.user_email"
                    label="User's email"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="showEditDialog()"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="saveItem(editedItem)"
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogAdd" max-width="500px" v-if="showUsers">
          <template v-slot:activator="{ on }">
            <div class="d-flex">
              <v-btn
                color="primary"
                dark
                class="ml-auto ma-3"
                v-on="on"
                style="background-color: #6ab547ff !important"
                @click="showAddDialog(item)"
              >
                New user
                <v-icon small>mdi-plus-circle-outline</v-icon>
              </v-btn>
            </div>
          </template>
          <v-card>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="editedItem.user_name"
                    label="Username"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="editedItem.user_fullname"
                    label="User's Fullname"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="editedItem.user_email"
                    label="User's email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="newPass"
                    label="User's password"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="showAddDialog()"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="saveAddItem(editedItem)"
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="errorDialog" max-width="300px" v-if="showUsers">
          <template v-slot:activator="{ on }"> </template>
          <v-card>
            <v-card-text>
              Username, Password and User's Email cannot be empty!
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="showErrorDialog()"
                >OK</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="errorEmail" max-width="300px" v-if="showUsers">
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

        <v-dialog v-model="errorUsername" max-width="300px" v-if="showUsers">
          <template v-slot:activator="{ on }"> </template>
          <v-card>
            <v-card-text> Username contains illegal characters. </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="showErrorUsernameDialog()"
                >OK</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-card-title v-if="showAirports">
          <v-text-field
            v-model="search"
            label="Search"
            single-line
            hide-details
            style="margin-left: -1vw; margin-top: 3vw;"
          ></v-text-field>
        </v-card-title>

        <v-data-table
          v-if="showAirports"
          v-model:page="page"
          :headers="airports_headers"
          :items="airports"
          item-key="name"
          :search="search"
          :items-per-page="itemsPerPage"
          @update:options="options = $event"
          style="width: 100vw;"
          hide-default-footer
        >
        </v-data-table>

        <v-card-title v-if="showAirlines">
          <v-text-field
            v-model="search"
            label="Search"
            single-line
            hide-details
            style="margin-left: -1vw; margin-top: 3vw"
          ></v-text-field>
        </v-card-title>

        <v-data-table
          v-if="showAirlines"
          v-model:page="page"
          :headers="airlines_headers"
          :items="mappedAirlines"
          item-key="name"
          :search="search"
          :items-per-page="itemsPerPage"
          @update:options="options = $event"
          hide-default-footer
          style="width: 100vw"
        >
        </v-data-table>

        <v-card-title v-if="showCities">
          <v-text-field
            v-model="search"
            label="Search"
            single-line
            hide-details
            style="margin-left: -1vw; margin-top: 3vw"
          ></v-text-field>
        </v-card-title>

        <v-data-table
          v-if="showCities"
          v-model:page="page"
          :headers="cities_headers"
          :items="cities"
          item-key="code"
          :search="search"
          :items-per-page="itemsPerPage"
          @update:options="options = $event"
          hide-default-footer
          style="width: 100vw"
        >
        </v-data-table>
      </div>
      </v-top-navigation>
    </v-layout>
  </v-card>
</template>

<style>
  body[shouldHaveBackground="true"] {
    background-image: url('../assets/logo/airplanes-are-flying-around-the-world-illustration-in-minimal-style-png.png');
    background-position: center; 
    background-size: contain;  
    background-attachment: fixed !important; 
    background-repeat:no-repeat !important; 
    height: 100vh; 
    background-color: #368790;
  }
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dialog: false,
      dialogAdd: false,
      errorDialog: false,
      errorEmail: false,
      errorUsername: false,
      shouldHaveBackground: true,
      emailRegex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/,
      usernameRegex: /^[a-zA-Z0-9_.]+$/,
      newId: 0,
      newPass: "",
      editedItem: {},
      users: [],
      showUsers: false,
      airports: [],
      showAirports: false,
      airlines: [],
      showAirlines: false,
      cities: [],
      showCities: false,
      selectedUser: null,
      options: {
        pageCount: 1,
      },
      search: "",
      page: 1,
      itemsPerPage: 10,
      users_headers: [
        {
          align: "start",
          key: "user_id",
          sortable: true,
          title: "User Id",
        },
        { title: "User's Fullname", key: "user_fullname" },
        { title: "Username", key: "user_name" },
        { title: "User's email", key: "user_email" },
        {
          title: "Actions",
          key: "actions",
          align: "center",
          sortable: false,
        },
      ],
      airports_headers: [
        {
          align: "start",
          key: "code",
          sortable: true,
          title: "City IATA Code",
        },
        { title: "Airport Name", key: "name" },
        { title: "Time Zone", key: "time_zone" },
      ],
      airlines_headers: [
        {
          align: "start",
          key: "code",
          sortable: true,
          title: "Airline Code",
        },
        { title: "Airline Name", key: "name" },
        { title: "Lowcost", key: "is_lowcost" },
      ],
      cities_headers: [
        {
          align: "start",
          key: "code",
          sortable: true,
          title: "City IATA Code",
        },
        { title: "City Name", key: "name" },
        { title: "Time Zone", key: "time_zone" },
      ],
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
    showEditDialog(item) {
      this.editedItem = item || {};
      console.log(this.item);
      this.dialog = !this.dialog;
    },
    showAddDialog(item) {
      this.editedItem = item || {};
      console.log(this.item);
      this.dialogAdd = !this.dialogAdd;
    },
    saveAddItem(item) {
      const json_item = JSON.stringify(this.editedItem);
      var json_parse_item = JSON.parse(json_item);
      if (
        typeof json_parse_item["user_name"] === "undefined" ||
        this.newPass == "" ||
        typeof json_parse_item["user_email"] === "undefined"
      ) {
        this.errorDialog = true;
        return;
      }

      if (!this.emailRegex.test(json_parse_item["user_email"])) {
        this.errorEmail = true;
        return;
      }

      if (!this.usernameRegex.test(json_parse_item["user_name"])) {
        this.errorUsername = true;
        return;
      }

      const cookieValue = document.cookie.match(
        "(^|;)\\s*" + "loggedin" + "\\s*=\\s*([^;]+)"
      );
      const cookie = cookieValue ? cookieValue.pop() : "";
      const data = {
        cookie: cookie,
        user_id: this.newId,
        user_fullname: json_parse_item["user_fullname"]
          ? json_parse_item["user_fullname"]
          : "",
        user_name: json_parse_item["user_name"]
          ? json_parse_item["user_name"]
          : json_parse_item["columns"]["user_name"],
        user_email: json_parse_item["user_email"]
          ? json_parse_item["user_email"]
          : json_parse_item["columns"]["user_email"],
        user_pass: this.newPass,
      };
      axios
        .post("http://localhost:80/Traveler/admin/create", data, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.dialogAdd = !this.dialogAdd;
          this.editedItem = {};
          window.location.reload();
        })
        .catch((error) => {
          this.errorMessage = "Invalid credentials";
        });
    },
    saveItem(item) {
      const json_item = JSON.stringify(this.editedItem);
      var json_parse_item = JSON.parse(json_item);
      console.log(json_item);

      const cookieValue = document.cookie.match(
        "(^|;)\\s*" + "loggedin" + "\\s*=\\s*([^;]+)"
      );
      const cookie = cookieValue ? cookieValue.pop() : "";
      const data = {
        cookie: cookie,
        user_id: json_parse_item["columns"]["user_id"],
        user_fullname: json_parse_item["user_fullname"]
          ? json_parse_item["user_fullname"]
          : json_parse_item["columns"]["user_fullname"],
        user_name: json_parse_item["user_name"]
          ? json_parse_item["user_name"]
          : json_parse_item["columns"]["user_name"],
        user_email: json_parse_item["user_email"]
          ? json_parse_item["user_email"]
          : json_parse_item["columns"]["user_email"],
      };

      if (
        typeof json_parse_item["user_name"] !== "undefined" &&
        !this.usernameRegex.test(json_parse_item["user_name"])
      ) {
        this.errorUsername = true;
        return;
      }

      if (
        typeof json_parse_item["user_email"] !== "undefined" &&
        !this.emailRegex.test(json_parse_item["user_email"])
      ) {
        this.errorEmail = true;
        return;
      }

      axios
        .post("http://localhost:80/Traveler/admin/update", data, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.dialogAdd = !this.dialogAdd;
          this.editedItem = {};
          window.location.reload();
        })
        .catch((error) => {
          this.errorMessage = "Invalid credentials";
        });
    },
    makeRequest() {
      axios
        .get("http://localhost:80/Traveler/admin/read", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          const dataString = response.data;
          if (dataString.includes("users")) {
            this.showUserTable(dataString);
          }
        })
        .catch((error) => {
          this.errorMessage = "Invalid credentials";
        });
    },
    showUserTable(dataString) {
      const usersIndex = dataString.indexOf('"users":');
      const usersString = dataString.slice(usersIndex).match(/\[.*\]/)[0];
      const usersArray = JSON.parse(usersString);
      this.shouldHaveBackground = !this.shouldHaveBackground;
      document.body.setAttribute("shouldHaveBackground", this.shouldHaveBackground);
      this.showUsers = true;
      this.showAirports = false;
      this.showAirlines = false;
      this.showCities = false;
      this.users = usersArray;
    },
    editUser(item) {
      this.editedItem = item;
      this.dialog = !this.dialog;
    },
    deleteUser(item) {
      var dict = {};
      const columnsValues = Object.values(item.columns);
      const columnKeys = Object.keys(item.columns);
      for (
        let i = 0;
        i < Math.min(columnKeys.length, columnsValues.length);
        i++
      ) {
        dict[columnKeys[i]] = columnsValues[i];
      }
      const cookieValue = document.cookie.match(
        "(^|;)\\s*" + "loggedin" + "\\s*=\\s*([^;]+)"
      );
      const cookie = cookieValue ? cookieValue.pop() : "";
      const data = {
        user_id: dict["user_id"],
        cookie: cookie,
      };
      axios
        .post("http://localhost:80/Traveler/admin/delete", data, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          this.errorMessage = "Invalid credentials";
        });
    },
    getAirports() {
      fetch("/airports.json")
        .then((response) => response.json())
        .then((data) => {
          this.showAirports = true;
          this.airports = data;
          this.showUsers = false;
          this.showAirlines = false;
          this.showCities = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getAirlines() {
      fetch("/airlines.json")
        .then((response) => response.json())
        .then((data) => {
          this.showAirports = false;
          this.airlines = data;
          this.showUsers = false;
          this.showAirlines = true;
          this.showCities = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getCities() {
      fetch("/city_codes.json")
        .then((response) => response.json())
        .then((data) => {
          this.showAirports = false;
          this.cities = data;
          this.showUsers = false;
          this.showAirlines = false;
          this.showCities = true;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    dahsboard() {
      this.$router.push("/dashboard");
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
  computed: {
    mappedAirlines() {
      return this.airlines.map((airline) => {
        return {
          ...airline,
          is_lowcost: airline.is_lowcost ? "yes" : "no",
        };
      });
    },
    shouldHaveBackground() {
      this.shouldHaveBackground;
    }
  },
};
</script>
