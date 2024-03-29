/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Styles
import './styles/main.css'

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import router from './router'
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';
import './plugins/vee-validate'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// Use plugin with optional defaults
axios.defaults.baseURL = 'http://127.0.0.1:8000'

const app = createApp(App)
registerPlugins(app)


const pinia = createPinia()


app.use(pinia).use(VCalendar).use(router).use(VueSweetalert2)
app.mount('#app')
