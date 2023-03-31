<template>
  <div class="d-flex align-center justify-center" style="background-position: center; background-size: contain;  background-attachment: fixed !important; background-repeat:no-repeat !important; height: 100vh; background-color: #368790;">
      <v-sheet width="70vh" class="mx-auto" style="background-color: #f3f9e3ff; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); border-radius: 10px; ">
          <v-form fast-fail @submit.prevent="resetpass" style="margin: 10%;">
              <v-text-field v-model="username" label="Username"></v-text-field>
              <v-text-field v-model="email" label="User Email"></v-text-field>

              <v-btn type="submit" color="primary" block class="mt-2" style="background-color: #6ab547ff !important;">Submit</v-btn>
              
              <div v-if="errorMessage" class="text-danger mt-2" style="font-size:large; font-weight: bold; color: red;">{{ errorMessage }}</div>

          </v-form>
      </v-sheet>
  </div>
</template>
<style>
div {
  background-image: url('../assets/logo/airplanes-are-flying-around-the-world-illustration-in-minimal-style-png.png');
}
</style>

<script>
import axios from 'axios';
export default {
  data() {
      return {
          username: "",
          email: "",
         errorMessage: ""
      }
  },
  methods: {
      resetpass() {
        console.log(this.username)
        console.log(this.email)
        axios.post('http://localhost:80/Traveler/forgotpass', {
        username: this.username,
        email: this.email,
      }, {headers: {
        // 'Content-Type': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'XDEBUG_SESSION': 'PHPSTORM'
        }
    })
      .then(response => {
        // handle successful response
        this.errorMessage = ""
        console.log(response.data);
        this.$router.push('/resetpass');
      })
      .catch(error => {
        // handle error
        console.log(error);
        this.errorMessage = 'Invalid username or email';
      });
      },
  },
}
</script>