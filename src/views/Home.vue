<template>
    <v-app>
      <app-sidebar/>
      <app-navbar/>
      <v-main>
        <app-title/>
        <app-calendar />
      </v-main>
    </v-app>
</template>
  
<script>
  import AppNavbar from './components/AppNavbar.vue'
  import AppSidebar from './components/AppSidebar.vue'
  import AppCalendar from './components/AppCalendar.vue'
  import AppTitle from './components/AppTitle.vue'
  
  export default {
    name: 'app',
    components: {
      AppNavbar,
      AppSidebar,
      AppCalendar,
      AppTitle,
    }
  }
</script>