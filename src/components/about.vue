<template>
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
            to="/login"
            prepend-icon="mdi-login-variant"
            title="Login"
            value="login"
          ></v-list-item>
          <v-list-item
            link
            to="/"
            prepend-icon="mdi-home"
            title="Home page"
            value="admin"
          ></v-list-item>
          <v-list-item>
            <v-img class="custom-img" :src="image"></v-img>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </v-card>

  <div class="about-page">
    <v-card style="position: center">
      <v-card-text
        class="text-caption"
        style="
          background-color: #d9e5e1;
          padding-top: 5vh;
          padding-left: 5vh;
          padding-right: 5vh;
          padding-bottom: 5vh;
          font-size: medium !important;
          font-family: Garamond !important;
          color: #1e6068;
        "
      >
        Users of the free travel application Traveler may find the best airline
        deals with the aid of the Google Flights API. <br />
        The software is designed to help users plan their trips on a budget with
        a simple and user-friendly layout that makes it easy to find the best
        flight tickets. Users of Traveler can search for flights based on their
        departure city, destination, and travel dates. Depending on whether they
        want to book a cheap flight or not, users can further filter results.
        Once they've discovered a flight they want, they may add it to their
        wishlist for subsequent easy access.
        <br />
        One of Traveler's biggest features is the fact that using it is
        completely free. Customers are able to check up as many flights as they
        wish without paying any additional fees or taxes. This makes it a great
        option for budget-conscious tourists who wish to reduce their travel
        expenses. Together with its powerful search features, Traveler offers a
        variety of services to help consumers plan their travels. The app, for
        instance, offers a currency converter that makes it simple to see how
        much flights cost in different currencies. Overall, Traveler is a
        fantastic travel application that makes finding the cheapest flights
        easier. Its user-friendly interface, powerful search capabilities, and
        variety of useful features make it the perfect tool for anyone seeking
        to plan a trip on a budget. The fact that anyone can use it for free
        makes it particularly accessible to tourists from all walks of life.
      </v-card-text>
    </v-card>
  </div>
</template>

<style>
.about-page {
  background-color: #368790;
  /* background-color: #f3f9e3ff; */

  background-position: center;
  height: 100vh;
  padding-top: 15vh;
  padding-left: 50vh;
  padding-right: 40vh;
}
.custom-img {
  margin-top: 55vh;
  margin-right: 10vh;
  height: 20vh;
}
</style>
<script>
import myImage from "../assets/logo/airplanes-are-flying-around-the-world-illustration-in-minimal-style-png.png";
export default {
  data() {
    return {
      image: myImage,
    };
  },
  //
};
</script>
