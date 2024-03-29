<template>
    <v-text-field 
        append-inner-icon="mdi-magnify" 
        density="compact"
        variant="outlined"
        label="ค้นหา..."
        rounded="pill"
        hide-details 
    ></v-text-field>
</template>
<script>
export default {
    name: 'search-bar',
}
</script>
<style scoped>
.v-text-field{
      height: 50px;
      width: 350px;
}
</style>