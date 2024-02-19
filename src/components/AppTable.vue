<template>  
    <v-data-table
    v-model="selected"
    :items="items"
    item-value="name"
    show-select
    no-data-text='ไม่มีข้อมูล'
  ></v-data-table>
</template>

<script>
export default{
    name: 'app-table'
}
</script>
