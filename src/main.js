// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'

// createApp(App).mount('#app')


// import { createApp } from 'vue'
// import App from './App.vue'

// // Vuetify
// // import 'vuetify/styles'
// import { createVuetify } from 'vuetify'
// import router from './router'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'

// const vuetify = createVuetify({
//   components,
//   directives,
// })
// const app = createApp(App)
// app.use(router)
// app.use(vuetify)
// app.mount('#app')

import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router'
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'primevue/resources/primevue.min.css'            // core 
import 'primevue/resources/themes/saga-blue/theme.css'  // theme
import 'primeicons/primeicons.css'                      // icons
// import '/node_modules/primeflex/primeflex.css'  
import PrimeVue from 'primevue/config'
// import 'vue3-easy-data-table/dist/style.css';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';      
import { VDataTable } from 'vuetify/labs/VDataTable'

const vuetify = createVuetify({
  components : {
    ...components,
    VDataTable
  },
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  }
});
const app = createApp(App)
app.component('Datatable', DataTable)
app.component('Column', DataTable)
app.component('ColumnGroup', DataTable)
app.component('Row', DataTable)
app.use(router)
app.use(PrimeVue)
app.use(vuetify)
app.mount('#app')
// createApp(App).use(vuetify).mount('#app')