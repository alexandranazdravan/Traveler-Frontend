<template>
    <v-card>
      <v-layout>
        <v-navigation-drawer
          expand-on-hover
          rail
        >
          <v-list density="compact" nav>
            <v-list-item link to="/login" prepend-icon="mdi-login-variant" title="Login" value="login"></v-list-item>
            <v-list-item link to="/admin" prepend-icon="mdi-shield-account" title="Admin page" value="admin"></v-list-item>
          </v-list>
        </v-navigation-drawer>
      
      </v-layout>
    </v-card>
  </template>
  
  <script>
    export default {
      //
    }
  </script>