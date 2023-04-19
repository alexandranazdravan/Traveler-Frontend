import { createApp } from 'vue';
import App from './App.vue';
import router from './router'
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'              
import { VDataTable } from 'vuetify/labs/VDataTable'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

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
app.component('VueDatePicker', VueDatePicker);
app.use(router)
app.use(vuetify)
app.mount('#app')