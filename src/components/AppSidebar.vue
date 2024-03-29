<template>
    <!-- sidebar admin -->
    <v-navigation-drawer :width="245" color="#292929" v-if="userStore.user.is_staff==true">
        <router-link to="/" class="router-sidebar">
            <v-list-item :height="100" prepend-icon="mdi-home" link>
            หน้าหลัก
            </v-list-item>
        </router-link>
        <router-link to="/admin/announcement" class="router-sidebar" active-class="active-router">
            <v-list-item :height="100" prepend-icon="mdi-bullhorn" link >
                ข่าวสารนิสิต
            </v-list-item>
        </router-link>
        <router-link to="/admin/qualifications-question" class="router-sidebar" active-class="active-router">
            <v-list-item :height="100" prepend-icon="mdi-checkbox-marked" link >
                ตรวจสอบเงื่อนไขคุณสมบัติผู้กู้ยืม
            </v-list-item>
        </router-link>
        <router-link to="/admin/student-loan-request-record" class="router-sidebar" active-class="active-router">
        <v-list-item :height="100" prepend-icon="mdi-book-open-blank-variant" link >
            บันทึกความประสงค์กู้ยืม
        </v-list-item>
        </router-link>
        <router-link to="/admin/volunteer-activity-hours-record" class="router-sidebar" active-class="active-router">
        <v-list-item :height="100" prepend-icon="mdi-medal" link >
            บันทึกชั่วโมง<br/>กิจกรรมจิตอาสา
        </v-list-item>
    </router-link>
    </v-navigation-drawer>

    <!-- sidebar borrower -->
    <v-navigation-drawer :width="245" color="#292929" v-if="userStore.user.is_staff==false">
        <router-link to="/" class="router-sidebar">
            <v-list-item :height="100" prepend-icon="mdi-home" link>
            หน้าหลัก
            </v-list-item>
        </router-link>
        <router-link to="/announcement" class="router-sidebar" active-class="active-router">
            <v-list-item :height="100" prepend-icon="mdi-bullhorn" link >
                ข่าวสารนิสิต
            </v-list-item>
        </router-link>
        <router-link to="/qualifications-question" class="router-sidebar" active-class="active-router">
            <v-list-item :height="100" prepend-icon="mdi-checkbox-marked" link >
                ตรวจสอบเงื่อนไขคุณสมบัติผู้กู้ยืม
            </v-list-item>
        </router-link>
        <router-link to="/student-loan-request-record" class="router-sidebar" active-class="active-router">
        <v-list-item :height="100" prepend-icon="mdi-book-open-blank-variant" link >
            บันทึกความประสงค์กู้ยืม
        </v-list-item>
        </router-link>
        <router-link 
        to="/volunteer-activity-hours-record" 
        class="router-sidebar" 
        v-if="userStore.user.is_staff==false && userStore.user.education.status=='ผู้กู้ยืมรายเก่า'">
        <v-list-item :height="100" prepend-icon="mdi-medal" link >
            บันทึกชั่วโมง<br/>กิจกรรมจิตอาสา
        </v-list-item>
    </router-link>
    </v-navigation-drawer>
</template>

<script>

import { useUserStore } from '@/store/users'
export default{
    name: 'app-sidebar',
    setup() {
        const userStore = useUserStore()
        return {
            userStore
        }
    },
    methods: {
        isActive(routePath) {
            console.log(this.$route.path);
            console.log(this.$route.path === routePath);
            return this.$route.path === routePath;
        }
    }
    
}
</script>

<style>
</style>