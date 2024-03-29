<template>
      <app-sidebar/>
      <app-navbar/>
      <v-main>
        <app-title title="ยินดีต้อนรับเข้าสู่ระบบกองทุนเงินให้กู้ยืมเพื่อการศึกษา"/>
        <app-calendar />
      </v-main>
</template>
  
<script>
  import AppNavbar from '../components/AppNavbar.vue'
  import AppSidebar from '../components/AppSidebar.vue'
  import AppCalendar from '../components/AppCalendar.vue'
  import AppTitle from '../components/AppTitle.vue'
  import { useUserStore } from '@/store/users'
  import axios from 'axios'

  export default {
    name: 'app',
    components: {
      AppNavbar,
      AppSidebar,
      AppCalendar,
      AppTitle,
    },
    data() {
      return {
      }
    },
    setup() {
        const userStore = useUserStore()
        return {
            userStore
        }
    },
    beforeCreate() {
        const token = this.userStore.user.access
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        } else {
            axios.defaults.headers.common["Authorization"] = "";
        }
    },
    mounted() {
    },
    methods: {
    }
  }
</script>