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

import VCalendar from 'v-calendar';
import 'v-calendar/style.css';
import './plugins/vee-validate'

// Use plugin with optional defaults


const app = createApp(App)
registerPlugins(app)
app.use(VCalendar, {})
app.mount('#app')
