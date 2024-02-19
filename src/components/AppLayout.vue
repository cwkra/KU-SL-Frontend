<template>
    <v-app>
      <app-sidebar/>
      <app-navbar/>
    <v-main>
        <breadcrumbs />
        <router-view />
    </v-main>
    </v-app>
</template>
<script>
import AppNavbar from './components/AppNavbar.vue'
import AppSidebar from './components/AppSidebar.vue'
import Breadcrumbs from './components/Breadcrumbs.vue'

export default {
  name: 'app-layout',
  components: {
    AppNavbar,
    AppSidebar,
    Breadcrumbs
  }
}
</script>