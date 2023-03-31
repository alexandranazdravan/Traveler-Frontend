<template>
    <div class="d-flex align-center justify-center" style="background-position: center; background-size: contain; background-attachment: fixed !important; background-repeat:no-repeat !important; height: 100vh; background-color: #368790;">
        <v-sheet width="80vh" class="mx-auto" style="background-color: #f3f9e3ff; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); border-radius: 10px; ">
            <v-form fast-fail style="margin: 5%;">
                <v-card-text style="font-size: 24px; font-family:Verdana, Geneva, Tahoma, sans-serif;">
                    Email sent! <br>
                    Please check your inbox.
                </v-card-text>
                <div class="mt-2">
                    <p class="text-caption" style="margin-bottom: 3%; margin-left: 3%">Go back to <a href="/login">login</a></p>
                </div>
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
  export default {
    
  }
  </script>