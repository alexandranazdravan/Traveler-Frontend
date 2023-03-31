<!-- <script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style> -->








<!-- <template>
    <div class="vue-tempalte">
        <form>
            <h3>Sign In</h3>
 
            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control form-control-lg" />
            </div>
 
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" />
            </div>
 
            <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>
 
        </form>
    </div>
</template>
 
<script>
    export default {
        data() {
            console.log()
            return {}
        }
    }
</script> -->
<!-- <style>
    @import '../assets/login.css';
</style> -->


<!-- <template>
  <div>
    <b-button v-b-toggle.sidebar-1>Toggle Sidebar</b-button>
    <b-sidebar id="sidebar-1" title="Sidebar" shadow>
      <div class="px-3 py-2">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
      </div>
    </b-sidebar>
  </div> -->
    <!-- <div class="toggle-btn" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
        <button>Toggle Button</button>
    </div> -->
    <!-- <div class="side-menu" :class="{ 'open': isMenuOpen }">
        <div class="menu-container">
        <button class="toggle-btn" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
          Toggle Menu
        </button>
        <a href="about.html">About</a>
        <a href="admin.html">Admin Page</a>
      </div>
    </div> -->
    <!-- <div>
        <form @submit.prevent="submitForm">
            <label for="username">Enter Username</label>
            <input type="text" id="username" v-model="username">
  
            <label for="password">Enter Password</label>
            <input type="password" id="password" v-model="password">
        
            <button type="submit">Login</button>
        </form>
   </div>
    <img src="../assets/logo/airplanes-are-flying-around-the-world-illustration-in-minimal-style-png.png" alt="Logo"> -->
  <!-- </template> -->
  
<!-- 
  <script>
  export default {
    data() {
      return {
        username: "",
        password: "",
        isMenuOpen: false
      };
    },
    methods: {
      submitForm() {
        console.log(this.username, this.password);
        // You can add your logic to save the username and password here
      },
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen
      }
    }
  };
  </script> -->



<!--   
<style>
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

label {
  font-weight: bold;
  margin-top: 10px;
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #3e8e41;
}
</styl> -->



<!-- import { ref } from 'vue'
import { VBtn, VCard, VDivider, VLayout, VList, VListItem, VNavigationDrawer, VMain } from 'vuetify' -->

<!-- <template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        rail
      >

        <v-list density="compact" nav>
          <v-list-item to= "/login" prepend-icon="mdi-login-variant" title="Login" value="login"></v-list-item>
          <v-list-item to="/admin" prepend-icon="mdi-shield-account" title="Admin page" value="admin"></v-list-item>
        </v-list>
      </v-navigation-drawer>

    </v-layout>
  </v-card>
  <button>
    Hiiiiiiii
  </button>
  <router-link to="/admin">Admin Page</router-link>
  <div>
    <router-view></router-view>
  </div>
</template>-->

<!-- <script>
  export default {
    //
  }
</script>  -->

<template>
  <div>
    <router-view />
  </div>
</template>
<!-- <template>
  <header>Hi</header>
</template> -->

<!-- <template>
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
</script> -->
<!-- 
<template>
  <div id="app">
    <MainLayout>
      <router-view></router-view>
    </MainLayout>
  </div>
</template>

<script>
import MainLayout from './MainLayout.vue'

export default {
  name: 'App',
  components: {
    MainLayout
  }
}
</script> -->