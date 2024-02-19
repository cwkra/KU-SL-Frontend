<template>
  <div>
    <v-breadcrumbs :items="items" bg-color="success" rounded="pill" class="pl-10 pr-10 pt-2 pb-2 mt-4 ml-8 mr-8 mb-4">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script>
  export default {
    name: 'breadcrumbs',
    data: () => ({
      items: [
        {
          title: 'Dashboard',
          disabled: false,
          href: '#',
        },
        {
          title: 'Link 1',
          disabled: false,
          href: '#',
        },
        {
          title: 'Link 2',
          disabled: true,
          href: '#',
        },
      ],
    }),
  }
</script>