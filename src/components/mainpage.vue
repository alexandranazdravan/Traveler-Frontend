<template>
<header>
  Hello bitches, we re here
  </header>
  <button @click="makeRequest()">Make Request</button>
  <br>
  <button @click="logout()">Logout</button>
  </template>

<script>
import axios from 'axios';
export default {
  methods: {
    makeRequest() {
    const cookies = 'XDEBUG_SESSION=PHPSTORM; Phpstorm-c311215b=e680c706-d983-4041-8885-e632d9421aa2; PHPSESSID=1k6fq7j22vfkamr7143b3e9i51;';
    axios.get('http://localhost:80/Traveler/', {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Cookies': cookies
    }
  })
  .then(response => {
    // Handle successful response
    const cookieValue = document.cookie.match('(^|;)\\s*' + 'loggedin' + '\\s*=\\s*([^;]+)');
    const cookie = cookieValue ? cookieValue.pop() : '';
//   console.log("IM HERE\n");
//   console.log(showw);
  })
  .catch(error => {
    // Handle error
    console.error(error);
  });
},
logout() {
  axios.get('http://localhost:80/Traveler/logout', {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })
  .then(response => {
    // Handle successful response
    // const cookieValue = document.cookie.match('(^|;)\\s*' + 'loggedin' + '\\s*=\\s*([^;]+)');
    // const cookie = cookieValue ? cookieValue.pop() : '';
//   console.log("IM HERE\n");
document.cookie = 'loggedin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  console.log("LoggedOut");
  this.$router.push("/login")
  })
  .catch(error => {
    // Handle error
    console.error(error);
  });
}
  }
}
</script>