<template>
    <v-card class="px-4 py-2" elevation="0" rounded="0" color="#0AAE75">
    <h3>{{ title }}</h3>
    </v-card>
</template>

<script>
  export default {
    name: 'card-header',
    props: {
        title: {
            type: String,
            required: true
        }
    }
}
</script>