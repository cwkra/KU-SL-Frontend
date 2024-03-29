<template>
  <div>
    <v-breadcrumbs :items="items" bg-color="#0AAE75" rounded="pill" class="px-10 py-2 my-2 mx-8 ">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script>
  export default {
    name: 'breadcrumbs',
    props: {
      items: {
        type: Object,
        required: true
      }
    }
  }
</script>