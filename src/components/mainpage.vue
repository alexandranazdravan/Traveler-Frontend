<template>
  <v-card class="mx-auto" color="#368790" style="height: 30vh">
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
    <v-card-text
      style="
        margin-left: 45vh;
        margin-top: 2vh;
        font-size: xx-large;
        font-family: Book Antiqua;
      "
    >
      Find your next flights
    </v-card-text>
  </v-card>
  <v-img
    src="https://www.perthnow.com.au/stories/perth-misses-out-on-return-to-international-travel/assets/8.gif"
    style="margin-left: 180vh; margin-top: -25vh"
  ></v-img>
  <div class="dashboard-page">
  <v-top-navigation v-model="value" mode="shift" style="margin-left: 11vh">
    <v-btn @click="getCheapFlights()" style="width: 41vh">

      <span style="font-size: small">Cheap Flights</span>
    </v-btn>

    <v-btn @click="getDirectFlights()" style="width: 41vh">

      <span style="font-size: small">Direct Flights</span>
    </v-btn>

    <v-btn @click="getPopularCityDir()" style="width: 41vh">

      <span style="font-size: small">Popular City Directions</span>
    </v-btn>

    <v-btn @click="getPricesPerMonth()" style="width: 41vh">

      <span style="font-size: small">Prices for a Month</span>
    </v-btn>

    <v-btn @click="getPopularAirlines()" style="width: 41vh">

      <span style="font-size: small">Popular Airlines</span>
    </v-btn>
  </v-top-navigation>

  <v-img 
          v-if="showCreated"
          class="custom-img"
          :src="image"
          style="margin-top: 0vh; height: 66.6vh;"
        ></v-img>

  <v-data-table
    v-if="showCityDir"
    v-model:expanded="expanded"
    :headers="popular_cities_headers"
    :items="citiesDetails"
    item-value="destination"
    item-key="destination"
    show-expand
    class="elevation-1"
    style="margin-left: 20vh; width: 190vh; margin-bottom: 5vh; margin-top: 5vh; min-height: 66.6vh;"
  >
    <template v-slot:top> </template>
    <template v-slot:expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length">
          <div>Airline: {{ item.props.title.airline }}</div>
          <div>Is it low cost?: {{ item.props.title.is_lowcost }}</div>
          <div>Flight number: {{ item.props.title.flight_number }}</div>
          <div>Price: {{ item.props.title.price }}</div>
          <div>Departure time: {{ item.props.title.departure_time }}</div>
          <div>Return time: {{ item.props.title.return_time }}</div>
        </td>
      </tr>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small @click="toggleFavourite(item)">
        {{ item.props.title.is_favourite ? "mdi-heart" : "mdi-heart-outline" }}
      </v-icon>
    </template>
  </v-data-table>

  <v-data-table
    v-if="showDirectCheap"
    v-model:expanded="expanded"
    :headers="direct_cheap_headers"
    :items="cheapDirectDetails"
    item-value="departure_at"
    item-key="departure_at"
    show-expand
    class="elevation-1"
    style="margin-left: 20vh; width: 190vh; margin-bottom: 5vh; margin-top: 5vh;  min-height: 56.6vh;"
  >
    <template v-slot:top> </template>
    <template v-slot:expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length">
          <div>Airline: {{ item.props.title.airline }}</div>
          <div>Is it low cost?: {{ item.props.title.is_lowcost }}</div>
          <div>Flight number: {{ item.props.title.flight_number }}</div>
          <div>Price: {{ item.props.title.price }}</div>
          <div>Departure time: {{ item.props.title.departure_time }}</div>
          <div>Return time: {{ item.props.title.return_time }}</div>
        </td>
      </tr>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small @click="toggleFavourite(item)">
        {{ item.props.title.is_favourite ? "mdi-heart" : "mdi-heart-outline" }}
      </v-icon>
    </template>
  </v-data-table>

  <v-data-table
    v-if="showPricesMonthly"
    v-model:expanded="expanded"
    :headers="direct_cheap_headers"
    :items="perMonthDetails"
    item-value="departure_at"
    item-key="departure_at"
    show-expand
    class="elevation-1"
    style="margin-left: 20vh; width: 190vh; margin-bottom: 5vh; margin-top: 5vh"
  >
    <template v-slot:top> </template>
    <template v-slot:expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length">
          <div>Distance: {{ item.props.title.distance }}</div>
          <div>Duration: {{ item.props.title.duration }}</div>
          <div>Trip Class: {{ item.props.title.class }}</div>
          <div>Price: {{ item.props.title.price }}</div>
          <div>Number of changes: {{ item.props.title.no_of_changes }}</div>
        </td>
      </tr>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small @click="toggleFavourite(item)">
        {{ item.props.title.is_favourite ? "mdi-heart" : "mdi-heart-outline" }}
      </v-icon>
    </template>
  </v-data-table>

  <v-data-table
    v-if="showAirlineRoutes"
    :headers="popular_airline_routes_headers"
    :items="airlinesDetails"
    item-value="Destination City"
    item-key="Destination City"
    class="elevation-1"
    style="margin-left: 20vh; width: 190vh; margin-bottom: 5vh; margin-top: 5vh"
  >
  </v-data-table>

  <v-dialog v-model="showComponentsPerMonth" style="position: center">
    <v-card
      style="height: 90vh; width: 120vh; position: center; margin-left: 44vh"
    >
      <div style="display: flex">
        <v-text-field
          v-model="origin"
          label="Departure City *"
          :rules="[requiredO]"
          style="margin-left: 25vh; margin-right: 25vh; margin-top: 5vh"
        ></v-text-field>
      </div>
      <div style="display: flex">
        <v-text-field
          v-model="destination"
          label="Destination City *"
          :rules="[requiredD]"
          style="margin-left: 25vh; margin-right: 25vh; margin-top: 1vh"
        ></v-text-field>
      </div>
      <div style="display: flex">
        <v-select
          v-model="chosenCurrency"
          :hint="`${chosenCurrency.name}, ${chosenCurrency.code}`"
          :items="currencies"
          item-title="name"
          item-value="code"
          label="Currency"
          persistent-hint
          return-object
          single-line
          style="margin-left: 25vh; margin-right: 25vh"
        ></v-select>
      </div>
      <div style="display: flex">
        <v-img
          class="custom-img"
          :src="image"
          style="margin-top: 20vh; margin-left: -40vh; margin-right: 20vh"
        ></v-img>
        <v-card-actions style="margin-top: 30vh; margin-right: 5vh">
          <v-spacer></v-spacer>
          <v-btn color="#368790" text @click="cancelPricesPerMonth"
            >Cancel</v-btn
          >
          <v-btn color="#368790" text @click="sendReqPricesPerMonth"
            >Search</v-btn
          >
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>

  <v-dialog v-model="showComponentsPricesCheap" style="position: center">
    <v-card
      style="height: 100vh; width: 160vh; position: center; margin-left: 17vh"
    >
      <div style="display: flex">
        <v-text-field
          v-model="origin"
          label="Departure City *"
          :rules="[requiredO]"
          style="
            width: 5vh;
            margin-left: 5vh;
            margin-right: 30vh;
            margin-top: 5vh;
          "
        ></v-text-field>
        <div class="date_picker" style="margin-right: 15vh; margin-top: 1vh">
          <v-card-text class="text-body-2 text-medium-emphasis">
            Departure time
          </v-card-text>
          <vue-datepicker
            v-model="selectedDateDepart"
            :format="dateFormat"
            :enable-time-picker="false"
            style="margin-top: -2vh"
          >
          </vue-datepicker>
        </div>
      </div>
      <div style="display: flex">
        <v-text-field
          v-model="destination"
          label="Destination City *"
          :rules="[requiredD]"
          style="
            width: 5vh;
            margin-left: 5vh;
            margin-right: 30vh;
            margin-top: 1vh;
          "
        ></v-text-field>

        <div class="date_picker" style="margin-right: 15vh; margin-top: -3vh">
          <v-card-text class="text-body-2 text-medium-emphasis">
            Return time
          </v-card-text>
          <vue-datepicker
            v-model="selectedDateReturn"
            :format="dateFormat"
            :enable-time-picker="false"
            style="margin-top: -2vh"
          ></vue-datepicker>
        </div>
      </div>
      <div style="display: flex">
        <v-select
          v-model="chosenCurrency"
          :hint="`${chosenCurrency.name}, ${chosenCurrency.code}`"
          :items="currencies"
          item-title="name"
          item-value="code"
          label="Currency"
          persistent-hint
          return-object
          single-line
          style="width: 15%; margin-left: 5vh; margin-right: 80vh"
        ></v-select>
      </div>
      <div style="display: flex">
        <v-img
          class="custom-img"
          :src="image"
          style="margin-top: 20vh; margin-left: -60vh; margin-right: 20vh"
        ></v-img>
        <v-card-actions style="margin-top: 30vh; margin-right: 5vh">
          <v-spacer></v-spacer>
          <v-btn color="#368790" text @click="cancelPricesCheap">Cancel</v-btn>
          <v-btn color="#368790" text @click="sendReqPricesCheap">Search</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>

  <v-dialog v-model="showComponentsCityDir" persistent>
    <v-card
      style="
        max-width: 130vh;
        max-height: 60vh;
        margin-bottom: 10vh;
        margin-left: 30vh;
      "
    >
      <v-card-text>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <v-select
            v-model="chosenCurrency"
            :hint="`${chosenCurrency.name}, ${chosenCurrency.code}`"
            :items="currencies"
            item-title="name"
            item-value="code"
            label="Currency"
            persistent-hint
            return-object
            single-line
            style="
              width: 8%;
              margin-left: 2vh;
              margin-right: 5vh;
              margin-top: 1vh;
            "
          ></v-select>
          <v-text-field
            v-model="origin"
            label="Departure City *"
            :rules="[requiredO]"
            style="flex: 1; margin-top: 6vh; margin-bottom: 5vh"
          ></v-text-field>
        </div>
        <v-img
          class="custom-img"
          :src="image"
          style="margin-top: 2vh; width: 20vh"
        ></v-img>
      </v-card-text>
      <v-card-actions style="margin-right: 5vh">
        <v-spacer></v-spacer>
        <v-btn
          color="#368790"
          text
          @click="cancelCity"
          style="margin-top: -20vh"
          >Cancel</v-btn
        >
        <v-btn
          color="#368790"
          text
          @click="sendReqCity"
          style="margin-top: -20vh"
          >Search</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="showComponentsAirRoutes" persistent>
    <v-card
      style="
        max-width: 130vh;
        max-height: 60vh;
        margin-bottom: 10vh;
        margin-left: 30vh;
      "
    >
      <v-card-text>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <v-autocomplete
            v-model="chosenAirline"
            :hint="`${chosenAirline.name}, ${chosenAirline.code}`"
            :items="airlines"
            item-title="name"
            item-value="code"
            label="Airline *"
            return-object
            style="max-width: 60vh; margin-top: 6vh; margin-bottom: 5vh"
          >
            <template v-slot:append-item>
              <div v-intersect="loadMoreData" class="pa-4 teal--text">
                Loading more items ...
              </div>
            </template></v-autocomplete
          >

          <v-select
            v-model="chosenNoOfRoutes"
            :items="no_of_routes"
            label="Number of routes"
            persistent-hint
            return-object
            single-line
            style="
              width: 8%;
              margin-left: 2vh;
              margin-right: 5vh;
              margin-top: 1vh;
            "
          ></v-select>
        </div>
        <v-img
          class="custom-img"
          :src="image"
          style="margin-top: 2vh; width: 20vh"
        ></v-img>
      </v-card-text>
      <v-card-actions style="margin-right: 5vh">
        <v-spacer></v-spacer>
        <v-btn
          color="#368790"
          text
          @click="cancelAirline"
          style="margin-top: -20vh"
          >Cancel</v-btn
        >
        <v-btn
          color="#368790"
          text
          @click="sendReqAirline"
          style="margin-top: -20vh"
          >Search</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="errorDialog" max-width="300px">
    <template v-slot:activator="{ on }"> </template>
    <v-card>
      <v-card-text>
        {{ errorMessage }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="showErrorDialog()">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-card>
    <v-layout>
      <v-navigation-drawer
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
            to="/wishlist"
            prepend-icon="mdi-heart"
            title="Wishlist"
            value="wishlist"
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
    </v-layout>
  </v-card>
</div>
</template>

<style>
.dashboard-page {
  background-position: center;
  background-size: cover;
  background-attachment: fixed !important;
  background-repeat: no-repeat !important;
  /* height: 72.8vh; */
  background: linear-gradient(to bottom, #368790, #E3F5EF);
}

.dp__theme_light {
  --dp-success-color: #368790;
}
.date_picker {
  width: 35vh;
}

.custom-img {
  margin-top: 50vh;
  margin-right: 5vh;
  height: 20vh;
}
.card-text {
  font-family: "Roboto", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}
</style>
<script>
import axios from "axios";
import myImage from "../assets/logo/airplanes-are-flying-around-the-world-illustration-in-minimal-style-png.png";
import VueDatepicker from "@vuepic/vue-datepicker";

export default {
  components: {
    VueDatepicker,
  },
  data() {
    return {
      expanded: [],
      airlines: [],
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
      image: myImage,
      chosenCurrency: { code: "RON", name: "Romanian Leu" },
      currencies: [
        {
          code: "USD",
          name: "United States Dollar",
        },
        { code: "EUR", name: "Euro" },
        { code: "RUB", name: "Russian Ruble" },
        { code: "CAD", name: "Canadian Dollar" },
        { code: "CHF", name: "Swiss Franc" },
        { code: "CNY", name: "Chinese Yuan" },
        { code: "JPY", name: "Japanese Yen" },
        { code: "RON", name: "Romanian Leu" },
        { code: "MXN", name: "Mexican Peso" },
        { code: "BRL", name: "Brazilian Real" },
        { code: "GBP", name: "British Pound" },
        { code: "AUD", name: "Australian Dollar" },
        { code: "SGD", name: "Singapore Dollar" },
        { code: "UAH", name: "Ukrainian Hryvnia" },
        { code: "INR", name: "Indian Rupee" },
        { code: "TRY", name: "Turkish Lira" },
        { code: "KRW", name: "South Korean Won" },
        { code: "ZAR", name: "South African Rand" },
        { code: "THB", name: "Thai Baht" },
        { code: "VND", name: "Vietnamese Dong" },
      ],
      search: "",
      origin: "",
      destination: "",
      chosenAirline: { name: "Blue Air", code: "0B" },
      showComponentsPricesCheap: false,
      showComponentsCityDir: false,
      showComponentsPerMonth: false,
      showPricesMonthly: false,
      selectedDateDepart: null,
      showCityDir: false,
      showAirlineRoutes: false,
      citiesDetails: [],
      page: 1,
      selectedDateReturn: null,
      dateFormat: "yyyy-MM-dd",
      requiredD: (value) => !!value || "This field is required",
      requiredO: (value) => !!value || "This field is required",
      uri: "v1/prices/direct",
      popular_cities_headers: [
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
        { title: "Departure at", key: "departure_at" },
        { title: "Return at", key: "return_at" },
        {
          title: "Save",
          key: "actions",
          align: "center",
          sortable: false,
        },
      ],
      popular_airline_routes_headers: [
        {
          align: "start",
          key: "Departure City",
          sortable: true,
          title: "Departure City",
        },
        {
          align: "start",
          key: "Destination City",
          sortable: true,
          title: "Destination City",
        },
        {
          title: "Popularity Points",
          key: "Popularity",
          align: "center",
          sortable: false,
        },
      ],
      direct_cheap_headers: [
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
        { title: "Departure at", key: "departure_at" },
        { title: "Return at", key: "return_at" },
        {
          title: "Save",
          key: "actions",
          align: "center",
          sortable: false,
        },
      ],
      perMonthDetails: [],
      errorMessage: "",
      errorDialog: false,
      chosenNoOfRoutes: 10,
      no_of_routes: [5, 10, 25, 50, 100],
      showComponentsAirRoutes: false,
      airlinesDetails: [],
      showDirectCheap: false,
      cheapDirectDetails: [],
      showCreated: true,
      startDetails: []
    };
  },
  methods: {
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
    getCheapFlights() {
      this.showComponentsPricesCheap = true;
      this.showComponentsCityDir = false;
      this.showComponentsAirRoutes = false;
      this.showCityDir = false;
      this.showAirlineRoutes = false;
      this.showComponentsPerMonth = false;
      this.showPricesMonthly = false;
      this.showCreated = true;
      this.uri = "v1/prices/cheap";
    },
    getDirectFlights() {
      this.showComponentsPricesCheap = true;
      this.showComponentsCityDir = false;
      this.showComponentsAirRoutes = false;
      this.showCityDir = false;
      this.showAirlineRoutes = false;
      this.showComponentsPerMonth = false;
      this.showPricesMonthly = false;
      this.showCreated = true;
      this.uri = "v1/prices/direct";
    },
    getPopularAirlines() {
      this.showComponentsAirRoutes = true;
      this.showComponentsPricesCheap = false;
      this.showComponentsCityDir = false;
      this.showCityDir = false;
      this.showDirectCheap = false;
      this.showComponentsPerMonth = false;
      this.showPricesMonthly = false;
      this.showCreated = true;
    },
    getPopularCityDir() {
      this.showComponentsCityDir = true;
      this.showComponentsPricesCheap = false;
      this.showComponentsAirRoutes = false;
      this.showAirlineRoutes = false;
      this.showDirectCheap = false;
      this.showComponentsPerMonth = false;
      this.showPricesMonthly = false;
      this.showCreated = true;
    },
    getPricesPerMonth() {
      this.showComponentsCityDir = false;
      this.showComponentsPricesCheap = false;
      this.showComponentsAirRoutes = false;
      this.showAirlineRoutes = false;
      this.showDirectCheap = false;
      this.showCityDir = false;
      this.showComponentsPerMonth = true;
      this.showPricesMonthly = false;
      this.showCreated = true;
    },
    cancelPricesPerMonth() {
      this.showComponentsPerMonth = false;
      this.origin = "";
      this.destination = "";
      this.chosenCurrency =  { code: "RON", name: "Romanian Leu" };
      this.showCreated = true;
    },
    cancelPricesCheap() {
      this.showComponentsPricesCheap = false;
      this.origin = "";
      this.destination = "";
      this.chosenCurrency =  { code: "RON", name: "Romanian Leu" };
      this.selectedDateDepart = null;
      this.selectedDateReturn = null;
      this.showCreated = true;
    },
    sendReqPricesPerMonth() {
      axios
        .post(
          "http://localhost:80/Traveler/dashboard",
          {
            uri: "v2/prices/month-matrix",
            currency: this.chosenCurrency["code"],
            origin: this.origin,
            destination: this.destination,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          this.showCreated = false;
          this.showComponentsPerMonth = false;
          this.chosenCurrency = { code: "RON", name: "Romanian Leu" };
          this.origin = "";
          this.destination = "";
          this.perMonthDetails = JSON.parse(JSON.stringify(response.data));
          this.showPricesMonthly = true;
        })
        .catch((error) => {
          const error_js = JSON.stringify(error.response.data);
          const error_parse = JSON.parse(error_js);
          this.errorMessage = error_parse.error;
          this.errorDialog = true;
        });
    },
    sendReqPricesCheap() {
      axios
        .post(
          "http://localhost:80/Traveler/dashboard",
          {
            uri: this.uri,
            currency: this.chosenCurrency["code"],
            origin: this.origin,
            destination: this.destination,
            depart_date: this.selectedDateDepart,
            return_date: this.selectedDateReturn,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          this.showCreated = false;
          this.showComponentsPricesCheap = false;
          this.chosenCurrency = { code: "RON", name: "Romanian Leu" };
          this.origin = "";
          this.destination = "";
          this.selectedDateDepart = null;
          this.selectedDateReturn = null;
          this.cheapDirectDetails = JSON.parse(JSON.stringify(response.data));
          this.showDirectCheap = true;
        })
        .catch((error) => {
          const error_js = JSON.stringify(error.response.data);
          const error_parse = JSON.parse(error_js);
          this.errorMessage = error_parse.error;
          this.errorDialog = true;
        });
    },
    cancelCity() {
      this.showComponentsCityDir = false;
      this.origin = "";
      this.chosenCurrency =  { code: "RON", name: "Romanian Leu" };
      this.showCreated = true;
    },
    sendReqCity() {
      axios
        .post(
          "http://localhost:80/Traveler/dashboard",
          {
            uri: "v1/city-directions",
            currency: this.chosenCurrency["code"],
            origin: this.origin,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          this.showCreated = false;
          this.showComponentsCityDir = false;
          this.chosenCurrency = { code: "RON", name: "Romanian Leu" };
          this.origin = "";
          this.citiesDetails = JSON.parse(JSON.stringify(response.data));
          this.showCityDir = true;
        })
        .catch((error) => {
          const error_js = JSON.stringify(error.response.data);
          const error_parse = JSON.parse(error_js);
          this.errorMessage = error_parse.error;
          this.errorDialog = true;
        });
    },
    showErrorDialog() {
      this.errorDialog = !this.errorDialog;
    },
    cancelAirline() {
      this.showComponentsAirRoutes = false;
      this.chosenAirline = { name: "Blue Air", code: "0B" };
      this.chosenNoOfRoutes = 10;
      this.showCreated = true;
    },
    sendReqAirline() {
      axios
        .post(
          "http://localhost:80/Traveler/dashboard",
          {
            uri: "v1/airline-directions",
            airline_code: this.chosenAirline.code,
            limit: this.chosenNoOfRoutes,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          this.showCreated = false;
          this.showComponentsAirRoutes = false;
          this.chosenAirline = { name: "Blue Air", code: "0B" };
          this.chosenNoOfRoutes = 10;
          this.airlinesDetails = JSON.parse(JSON.stringify(response.data));
          this.showAirlineRoutes = true;
        })
        .catch((error) => {
          const error_js = JSON.stringify(error.response.data);
          const error_parse = JSON.parse(error_js);
          this.errorMessage = error_parse.error;
          this.errorDialog = true;
        });
    },
    async loadMoreData() {
      const lastIndex = this.airlines.length - 1;
      const lastItem = this.airlines[lastIndex];
      if (!lastItem) return;
      const lastCode = lastItem.code;
      const response = await fetch(
        `http://localhost:80/Traveler/dashboard?item=airline&page=${
          this.page + 1
        }&pageSize=10&lastCode=${lastCode}`
      );
      const data = await response.json();

      const newData = data.filter(
        (item) => !this.airlines.find((existing) => existing.code === item.code)
      );
      this.airlines = this.airlines.concat(newData);
      this.page++;
    },
    toggleFavourite(item) {
      if (item.props.title.is_favourite) {
        this.removeFromWishlist(item);
      } else {
        this.addToWishlist(item);
      }
      item.props.title.is_favourite = !item.props.title.is_favourite;
    },
    addToWishlist(item) {
      const cookieValue = document.cookie.match(
        "(^|;)\\s*" + "loggedin" + "\\s*=\\s*([^;]+)"
      );
      const cookie = cookieValue ? cookieValue.pop() : "";
      axios
        .post(
          "http://localhost:80/Traveler/wishlist",
          {
            cookie: cookie,
            flight: item.props.title,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "application/json",
            },
          }
        )
        .then((response) => {})
        .catch((error) => {});
    },
    removeFromWishlist(item) {
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
        .then((response) => {})
        .catch((error) => {});
    },
  },
};
</script>
