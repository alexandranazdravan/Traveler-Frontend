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
        margin-top: 6vh;
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
<!-- 
  <v-data-table
            v-model:page="page"
            :headers="cities_headers"
            :items="cities"
            item-key="code"
            :search="search"
            :items-per-page="itemsPerPage"
            @update:options="options = $event"
            hide-default-footer
          >
          </v-data-table> -->
          <v-select
      v-model="chosenOption"
      :items="options"
      label="Choose an option"
      single-line
      style="margin-left: 45vh; margin-right: 45vh; margin-top: 3vh;"
    ></v-select>
      <v-dialog v-model="showComponentsPricesCheap" style="position: center;">
        <v-card style="background-color: #f3f9e3ff; height: 100vh; width: 160vh; position: center; margin-left: 17vh;">
        <div style="display: flex;">
        <v-text-field
        v-model="origin"
        label="Origin *"
        :rules="[requiredO]"
        style="width: 5vh; margin-left: 5vh; margin-right: 30vh; margin-top: 5vh;"
      ></v-text-field>
      <div class="date_picker" style="margin-right: 15vh; margin-top: 1vh;">
        <v-card-text class="text-body-2 text-medium-emphasis"
    
    >
      Departure time
    </v-card-text>
    <vue-datepicker v-model="selectedDateDepart" :format="dateFormat" :enable-time-picker="false" style="margin-top: -2vh;"> </vue-datepicker>
  </div>
        </div>
        <div style="display: flex;">
      <v-text-field
        v-model="destination"
        label="Destination *"
        :rules="[requiredD]"
        style="width: 5vh; margin-left: 5vh; margin-right: 30vh; margin-top: 1vh;"
      ></v-text-field>

  <div class="date_picker" style="margin-right: 15vh; margin-top: -3vh;">
        <v-card-text class="text-body-2 text-medium-emphasis"
    
    >
      Return time
    </v-card-text>
    <vue-datepicker v-model="selectedDateReturn" :format="dateFormat" :enable-time-picker="false" style="margin-top: -2vh;"></vue-datepicker>
  </div>
</div>
<div style="display: flex;">
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
        item-color="#f3f9e3ff"
        style="width: 15%; margin-left: 5vh; margin-right: 80vh;"
      ></v-select>
      </div>
      <v-btn
            @click="cancelPricesCheap"
            style="
              width: 20vh;
              margin-left: 133vh;
              margin-top: 15vh;
              height: 9vh;
              width: 19vh;
              font-size: medium;
              background-color: #6ab547ff !important
        "
            >Cancel</v-btn
          >
          <v-btn
            @click="sendReqPricesCheap"
            style="
              width: 20vh;
              margin-left: 133vh;
              background-color: #57bf80;
              margin-top: 5vh;
              height: 9vh;
              width: 19vh;
              font-size: medium;
              background-color: #6ab547ff !important
        "
            >Search</v-btn
          >
</v-card>
</v-dialog>

<v-dialog v-model="showComponentsCityDir" persistent>
  <v-card style="max-width: 600px">
    <v-card-title class="headline">Search flights</v-card-title>
    <v-card-text>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <v-text-field
          v-model="airline"
          label="Airline *"
          :rules="[requiredA]"
          style="flex: 1; margin-right: 10px;"
        ></v-text-field>
        <v-text-field
          v-model="origin"
          label="Origin *"
          :rules="[requiredO]"
          style="flex: 1; margin-left: 10px;"
        ></v-text-field>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="red" text @click="cancelCity">Cancel</v-btn>
      <v-btn color="primary" text @click="sendReqCity">Search</v-btn>
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
   --dp-background-color: #eaf0db;
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
import VueDatepicker from '@vuepic/vue-datepicker';

export default {
  components: {
      VueDatepicker,
    },
  data() {
    return {
      cities: [],
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
      options: ["Cheap Flights", "Direct Flights", "Popular City Directions", "Popular Airlines"],
      chosenOption: "",
      showComponentsPricesCheap: false,
      showComponentsCityDir: false,
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: "",
      selectedDateDepart:null,
      selectedDateReturn: null,
        dateFormat: 'yyyy-MM-dd',
      menu: false,
      requiredD: (value) => !!value || "This field is required",
      requiredO: (value) => !!value || "This field is required",
      loading: false, // A boolean to indicate whether the autocomplete is currently fetching data
      disabled: false,
      // cities: ["New York", "Los Angeles", "Nebraska"],
      cities: [],
      // [  { "name": "New York", "population": 8398748, "country": "United States" },
      //       { "name": "Los Angeles", "population": 3990456, "country": "United States" },
      //       { "name": "Chicago", "population": 2705994, "country": "United States" },
      //       { "name": "Houston", "population": 2325502, "country": "United States" }],
      items: [],
    };
  },
  // watch: {
  //     search (val) {
  //       val && val !== this.chosenCity && this.querySelections(val)
  //     },
  //   },
  created() {
    fetch("/city_codes.json")
      .then((response) => response.json())
      .then((data) => {
        this.cities = data.map((city) => city.name);
        console.log(this.cities);
      })
      .catch((error) => {
        console.error(error);
      });

    //         const options = {
    //   method: 'GET',
    //   url: 'https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/direct?origin=BUH&currency=EUR',
    //   headers: {
    //     'X-Access-Token': '05f40c220e8193fc8297804b069de4d8',
    //     'X-RapidAPI-Key': '54db60a185mshe7972e9ad846b31p1ee7b6jsnc676d9a1406e',
    //     'X-RapidAPI-Host': 'travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com'
    //   }
    // };

    // axios.request(options).then(function (response) {
    // 	console.log(response.data);
    //   const json_item = JSON.stringify(response.data)
    //   console.log(json_item)
    //   const json_item_parse = JSON.parse(json_item)
    //   console.log(json_item_parse.data)

    // }).catch(function (error) {
    // 	console.error(error);
    // });
  },
  methods: {
    // querySelections (v) {
    //   this.loading = true
    //   // Simulated ajax query
    //   setTimeout(() => {
    //     this.items = this.cities.filter(city => {
    //       return (city.name || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
    //     })
    //     this.loading = false
    //   }, 500)
    //   console.log(this.items)
    // },
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
    formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },     
      cancelPricesCheap() {
        this.showComponentsPricesCheap = false;
    },
    sendReqPricesCheap() {
        this.showComponentsPricesCheap = false;
    },
    cancelCity() {
        this.showComponentsCityDir = false;
    },
    sendReqCity() {
        this.showComponentsCityDir = false;
    },
    // async fetchCities() {
    //     try {
    //       const response = await fetch('/city_codes.json') // Replace with your own file path
    //       const data = await response.json()
    //       this.cities = data
    //     } catch (error) {
    //       console.error(error)
    //     }
    //   },
  },
  computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      }
    },
    watch: {
    chosenOption(newValue) {
      if (newValue === "Direct Flights" || newValue === "Cheap Flights") {
        this.showComponentsPricesCheap = true;
      } else if (newValue === "Popular City Directions") {
        this.showComponentsCityDir = true;
      } else {
        this.showComponentsPricesCheap = false;
        this.showComponentsDir = false;
        //send req to popular airlines.
      }
    },
  }

  // mounted() {
  //     this.fetchCities() // Call the fetchCities function when the component is mounted
  //   },
};
</script>