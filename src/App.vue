<template>
  <v-app>
    <app-sidebar/>
    <app-navbar/>
    <v-main>
      <app-title/>
      <breadcrumbs/>
      <!-- <app-calendar /> -->
      <!-- <app-table/> -->
      <v-btn 
        flat
        rounded="lg" 
        class="submit"
        >บันทึก
      </v-btn>
      <v-btn 
        flat
        rounded="lg"
        class="cancel">
        ยกเลิก
      </v-btn>
      <v-btn 
        flat
        rounded="lg"
        class="primary">
        ย้อนกลับ
      </v-btn>
      <v-btn 
        flat 
        rounded="lg" 
        class="primary">
        พิมพ์เอกสาร
      </v-btn>
      <v-btn 
        flat rounded="xl" 
        variant="outlined"
        class="info">
        ดูรายละเอียด</v-btn>
      <!-- <app-input /> -->
    </v-main>
  </v-app>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue'
import AppSidebar from './components/AppSidebar.vue'
import Breadcrumbs from './components/Breadcrumbs.vue'
import AppCalendar from './components/AppCalendar.vue'
import AppTitle from './components/AppTitle.vue'
import AppInput from './components/AppInput.vue'
import AppTable from './components/AppTable.vue'

export default {
  name: 'app',
  components: {
    AppNavbar,
    AppSidebar,
    Breadcrumbs,
    AppCalendar,
    AppTitle,
    AppInput,
    AppTable
  }
}
</script>