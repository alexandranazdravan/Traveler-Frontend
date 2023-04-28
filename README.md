<h1 align="center">
  <br>
  <img src="src\assets\logo\airplanes-are-flying-around-the-world-illustration-in-minimal-style-png.png" alt="Traveler" width="200"></a>
  <br>
  Traveler
  <br>
</h1>

<h4 align="center"> A web app built using <a href="https://rapidapi.com/Travelpayouts/api/flight-data/details" target="_blank">TravelPayouts API</a>.</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#search-for-flights">Search for flights</a> •
  <a href="#related">Related</a> •
  <a href="#license">License</a>
</p>

<p align="center">
  <img src="src\assets\app_ss\dashboard.png" width="800">
</p>

## Key Features

* Login/Register
  - These are necessary, without them, a user cannot benefit from the other features of the application
* Profile
  - A user can change its password and other data (username, email, fullname), including even their avatar
* Wishlist
   - This way, a user can "keep track" of their favourite flights; they can delete a flight if they are not interested in it anymore
*  Searching for flights
   - A user can make searches based on preferences:
		-  [Cheap Flights](#cheap-flights)
		-  [Direct Flights](#direct-flights)
		-  [Popular City Directions](#popular-city-directions)
		-  [Prices per Month](#prices-per-month)
		-  [Popular Airlines](#popular-airlines)
* Admin
   - This feature is exclusively for app admins. From here, they can view the [IATA Codes](#iata-codes) used by the TravelPayouts API and also manage users(edit, delete, update)


## How To Use

To clone and run this application, you'll need [Vuetify 3](https://vuetifyjs.com/en/) and [Vuejs Router](https://router.vuejs.org/installation.html). <br> From your command line:

```bash
# Clone this repository
$ git clone https://github.com/alexandranazdravan/Traveler-Frontend.git

# Go into the repository
$ cd Traveler-frontend

# Install dependencies
$ yarn add vuetify@^3.1.14
$ yarn add vue-router@4

# Run the app
$ yarn dev
```
## IATA Codes

## Search for flights
<h3 id="cheap-flights">Cheap Flights</h3>
<h3 id="direct-flights">Direct Flights</h3>
<h3 id="popular-city-directions">Popular City Directions</h3>
<h3 id="prices-per-month">Prices per Month</h3>
<h3 id="popular-airlines">Popular Airlines</h3>


## Related
- [Traveler -> Backend](https://github.com/alexandranazdravan/Traveler-Frontend.git) - The backend of the app


## License

MIT

---
