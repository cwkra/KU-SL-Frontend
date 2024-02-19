<template>
  <v-card rounded="xl" class="mt-4 ml-8 mr-8 mb-4 text-end">
    <div>
      <v-btn 
        flat
        rounded="lg" 
        class="submit mt-3 mb-3 mr-6"
      >สร้าง
      </v-btn>
    </div>
    <v-divider :thickness="2"></v-divider>
    <v-calendar
      expanded
      borderless
      :attributes='attributes'
      locale="th">
    </v-calendar>
  </v-card>
</template>


<script>
export default {
  name: 'app-calendar',
  data() {
    return {
      attributes: [
        {
          highlight: {
            color: 'green',
            fillMode: 'light',
          }
        }
      ]
    }
  }
}
</script>