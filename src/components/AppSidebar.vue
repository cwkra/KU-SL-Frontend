<template>
    <v-navigation-drawer :width="250" color="#292929">
        <v-list-item :height="100" prepend-icon="mdi-home" link >หน้าหลัก</v-list-item>
        <v-list-item :height="100" prepend-icon="mdi-bullhorn" link >ข่าวสารนิสิต</v-list-item>
        <v-list-item :height="100" prepend-icon="mdi-checkbox-marked" link >ตรวจสอบเงื่อนไขคุณสมบัติผู้กู้ยืม</v-list-item>
        <v-list-item :height="100" prepend-icon="mdi-book-open-blank-variant" link >บันทึกความประสงค์กู้ยืม</v-list-item>
        <v-list-item :height="100" prepend-icon="mdi-medal" link >บันทึกชั่วโมง<br/>กิจกรรมจิตอาสา</v-list-item>
    </v-navigation-drawer>
</template>

<script>
export default{
    name: 'app-sidebar'
}
</script>

<style>
</style>