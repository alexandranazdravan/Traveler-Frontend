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
    <!-- <v-select
    v-model="chosenOption"
    :items="options"
    label="Choose an option"
    single-line
    style="margin-left: 45vh; margin-right: 45vh; margin-top: -3vh"
  ></v-select> -->

  </v-card>
  <v-img
    src="https://www.perthnow.com.au/stories/perth-misses-out-on-return-to-international-travel/assets/8.gif"
    style="margin-left: 180vh; margin-top: -25vh"
  ></v-img>
  
  <v-select
    v-model="chosenOption"
    :items="options"
    label="Choose an option"
    single-line
    style="margin-left: 45vh; margin-right: 45vh; margin-top: 3vh"
  ></v-select>
  <v-card-title v-if="showCitiesStart">
            <v-text-field
              v-model="search"
              label="Search"
              single-line
              hide-details
              style="margin-left: 19vh; width: 190vh; margin-top: 3vw"
            ></v-text-field>
          </v-card-title>

          <v-data-table
            v-if="showCitiesStart"
            :headers="cities_headers"
            :items="cities"
            item-key="name"
            :search="search"
            @update:options="options = $event"
            style="margin-left: 20vh; width: 190vh; margin-bottom: 5vh"
            hide-default-footer
          >
          </v-data-table>

  <v-data-table
    v-if="showCityDir"
    v-model:expanded="expanded"
    :headers="popular_cities_headers"
    :items="citiesDetails"
    item-value="destination"
    item-key="destination"
    show-expand
    class="elevation-1"
    style="margin-left: 20vh; width: 190vh; margin-bottom: 5vh"
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
      <v-icon
        small
        @click="item.props.title.is_favourite = !item.props.title.is_favourite"
      >
        {{ item.props.title.is_favourite ? "mdi-heart" : "mdi-heart-outline" }}
      </v-icon>
    </template>
  </v-data-table>

  <v-data-table
    v-if="showDirectCheap"
    v-model:expanded="expanded"
    :headers="direct_cheap_headers"
    :items="cheapDirectDetails"
    item-value="destination"
    item-key="destination"
    show-expand
    class="elevation-1"
    style="margin-left: 20vh; width: 190vh; margin-bottom: 5vh"
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
      <v-icon
        small
        @click="item.props.title.is_favourite = !item.props.title.is_favourite"
      >
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
    style="margin-left: 20vh; width: 190vh; margin-bottom: 5vh"
  >
  </v-data-table>

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
        <!-- <v-btn
            @click="cancelPricesCheap"
            :transparent="true"
            style="
              width: 20vh;
              margin-left: 133vh;
              margin-top: 15vh;
              height: 9vh;
              width: 19vh;
              font-size: medium;
        "
            >Cancel</v-btn
          >
          <v-btn
            @click="sendReqPricesCheap"
            style="
              width: 20vh;
              margin-left: 133vh;
              background-color: #f3f9e3ff;
              margin-top: 5vh;
              height: 9vh;
              width: 19vh;
              font-size: medium;
        "
            >Search</v-btn
          > -->
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
          <!-- <v-autocomplete
        v-model="chosenAirline"
        :hint="`${chosenAirline.name}, ${chosenAirline.code}`"
        :items="airlines"
        item-title="name"
        item-value="code"
        label="Airline *"
        return-object
        style="max-width: 60vh; margin-top: 6vh; margin-bottom: 5vh;"
      >                <template v-slot:append-item>
                  <div v-intersect="loadMoreData" class="pa-4 teal--text">
                     Loading more items ...
                  </div>
                </template></v-autocomplete> -->

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
            to="/"
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
</template>

<style>
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
import { registerRuntimeHelpers } from "@vue/compiler-core";

export default {
  components: {
    VueDatepicker,
  },
  data() {
    return {
      expanded: [],
      singleExpand: false,
      cities: [],
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
      chosenCity: "",
      search: "",
      origin: "",
      destination: "",
      options: [
        "Cheap Flights",
        "Direct Flights",
        "Popular City Directions",
        "Popular Airlines",
      ],
      chosenOption: "",
      chosenAirline: { name: "Blue Air", code: "0B" },
      showComponentsPricesCheap: false,
      showComponentsCityDir: false,
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: "",
      selectedDateDepart: null,
      showCityDir: false,
      showAirlineRoutes: false,
      citiesDetails: [],
      page: 1,
      selectedDateReturn: null,
      dateFormat: "yyyy-MM-dd",
      menu: false,
      requiredD: (value) => !!value || "This field is required",
      requiredO: (value) => !!value || "This field is required",
      loading: false,
      disabled: false,
      cities: [],
      items: [],
      uri: "prices/direct",
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
      errorMessage: "",
      errorDialog: false,
      chosenNoOfRoutes: 10,
      no_of_routes: [5, 10, 25, 50, 100],
      showComponentsAirRoutes: false,
      airlinesDetails: [],
      showDirectCheap: false,
      cheapDirectDetails: [],
      showCitiesStart: true,
    };
  },
  created() {
    this.fetchAirlines(this.page);
    this.fetchCities();
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
          console.log("LoggedOut");
          this.$router.push("/login");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    updateSearchQuery(newValue, oldValue) {
      this.searchQuery = newValue;
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    cancelPricesCheap() {
      this.showComponentsPricesCheap = false;
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
          this.showComponentsPricesCheap = false;
          this.chosenCurrency = { code: "RON", name: "Romanian Leu" };
          this.origin = "";
          this.destination = "";
          this.selectedDateDepart = null;
          this.selectedDateReturn = null;
          this.cheapDirectDetails = JSON.parse(JSON.stringify(response.data));
          console.log(this.cheapDirectDetails);
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
    },
    sendReqCity() {
      axios
        .post(
          "http://localhost:80/Traveler/dashboard",
          {
            uri: "city-directions",
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
    },
    sendReqAirline() {
      console.log(this.chosenAirline.code);
      console.log(this.chosenNoOfRoutes);
      axios
        .post(
          "http://localhost:80/Traveler/dashboard",
          {
            uri: "airline-directions",
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
    async fetchCities() {
        try {
          const response = await fetch('/city_codes.json') // Replace with your own file path
          const data = await response.json()
          this.cities = data
        } catch (error) {
          console.error(error)
        }
      },
    // async fetchAirlines() {
    //   try {
    //     const response = await fetch('/airlines.json')
    //     const data = await response.json()
    //     // Map the JSON data to a new array with only the required fields
    //     const modifiedData = data.map((item) => ({
    //       name: item.name,
    //       code: item.code,
    //       is_lowcost: item.is_lowcost,
    //     }))
    //     this.airlines = modifiedData
    //   } catch (error) {
    //     console.error(error)
    //   }
    //   },
    async fetchAirlines(page) {
      try {
        const response = await axios.get(
          `http://localhost:80/Traveler/dashboard?item=airline&page=${page}&pageSize=10`
        );
        const json_item = JSON.stringify(response.data);
        const json_item_parse = JSON.parse(json_item);
        const uniqueItems = json_item_parse.filter(
          (item, index, self) =>
            index ===
            self.findIndex((t) => t.code === item.code && t.name === item.name)
        );
        this.airlines = [...this.airlines, ...uniqueItems];
      } catch (error) {
        // this.errorRegisterMsg = true;
      }
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

      // Filter out already existing airlines
      const newData = data.filter(
        (item) => !this.airlines.find((existing) => existing.code === item.code)
      );
      this.airlines = this.airlines.concat(newData);
      this.page++;
    },
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },
  watch: {
    chosenOption(newValue) {
      if (newValue === "Direct Flights" || newValue === "Cheap Flights") {
        this.showComponentsPricesCheap = true;
        this.showComponentsCityDir = false;
        this.showComponentsAirRoutes = false;
        this.showCityDir = false;
        this.showAirlineRoutes = false;
        if (newValue == "Direct Flights") {
          this.uri = "prices/direct";
        } else {
          this.uri = "prices/cheap";
        }
      } else if (newValue === "Popular City Directions") {
        this.showComponentsCityDir = true;
        this.showComponentsPricesCheap = false;
        this.showComponentsAirRoutes = false;
        this.showAirlineRoutes = false;
        this.showDirectCheap = false;
      } else if (newValue == "Popular Airlines") {
        this.showComponentsAirRoutes = true;
        this.showComponentsPricesCheap = false;
        this.showComponentsCityDir = false;
        this.showCityDir = false;
        this.showDirectCheap = false;
      } else {
        this.showComponentsPricesCheap = false;
        this.showComponentsCityDir = false;
        this.showComponentsAirRoutes = false;
        this.showCityDir = false;
        this.showDirectCheap = false;
        this.showAirlineRoutes = false;
        this.fetchCities()
        // this.chosenOption = true;
      }
    },
  },

  mounted() {
      this.fetchCities() // Call the fetchCities function when the component is mounted
    },
};
</script>
