<template> 
<app-sidebar/>
<app-navbar/>
    <v-main>
        <app-title title="ข้อมูลบัญชีผู้ใช้"/>
        <v-card rounded="xl" class="mx-8 my-4" flat>
            <v-row class="my-4">
                <v-col cols="2">
                    <v-avatar
                    size="128"
                    class="mx-10 pa-4" :image="this.userStore.user.image">
                    </v-avatar>
                </v-col>
                <v-col>
                    <v-card-title
                    class="my-2">
                        ข้อมูลส่วนบุคคล
                    </v-card-title>
                    <v-card
                    class="mx-8"
                    color="#f5f5f5"
                    rounded="xl"
                    flat>
                    <v-card-text class="my-4 mx-2">
                        <v-row no-gutters>
                            <v-col cols="2">ชื่อ-นามสกุล:</v-col>
                            <v-col>{{ this.userStore.user.name }}</v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols="2">วันเกิด:</v-col>
                            <v-col>{{ this.getBirthDay() }}</v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols="2">เบอร์โทรศัพท์:</v-col>
                            <v-col>{{ this.userStore.user.tel_number }}</v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols="2">อีเมล:</v-col>
                            <v-col>{{ this.userStore.user.email }}</v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols="2">รหัสบัตรประชาชน:</v-col>
                            <v-col>{{ this.userStore.user.identity_card_number }}</v-col>
                        </v-row>
                    </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row class="my-4" v-if="this.userStore.user.education.id">
                <v-col cols="2" />
                <v-col>
                    <v-card-title
                    class="my-2">
                        ข้อมูลการศึกษา
                    </v-card-title>
                    <v-card
                    class="mx-8"
                    color="#f5f5f5"
                    rounded="xl"
                    flat>
                        <v-card-text class="my-4 mx-2">
                            <v-row no-gutters>
                                <v-col cols="2">รหัสนิสิต:</v-col>
                                <v-col>{{ this.userStore.user.education.student_id_number }}</v-col>
                            </v-row>
                            <v-row no-gutters>
                                <v-col cols="2">ระดับการศึกษา:</v-col>
                                <v-col>{{this.userStore.user.education.education_level}}</v-col>
                            </v-row>
                            <v-row no-gutters>
                                <v-col cols="2">คณะ:</v-col>
                                <v-col>{{ this.userStore.user.education.faculty }}</v-col>
                            </v-row>
                            <v-row no-gutters>
                                <v-col cols="2">ภาควิชา:</v-col>
                                <v-col>{{ this.userStore.user.education.department }}</v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </v-main>
</template>

<script>
import { useUserStore } from '@/store/users'
import axios from 'axios'
import AppNavbar from '@/components/AppNavbar.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import AppTitle from '@/components/AppTitle.vue'

export default{
    name: 'profile-detail',
    components: {
        AppNavbar,
        AppSidebar,
        AppTitle
    },
    data() {
        return {
            education: {}
        }
    },
    setup() {
        const userStore = useUserStore()
        return {
            userStore
        }
    },
    methods: {
        getBirthDay() {
            const birth_day = this.userStore.user.date_of_birth.split('-')
            let day = birth_day[2]
            let month = birth_day[1]
            let year = birth_day[0]
            if (month == '01') {
                return day + ' มกราคม ค.ศ. ' + year
            }
            else if (month == '02') {
                return day + ' กุมภาพันธ์ ค.ศ. ' + year
            }
            else if (month == '03') {
                return day + ' มีนาคม ค.ศ. ' + year
            }
            else if (month == '04') {
                return day + ' เมษายน ค.ศ. ' + year
            }
            else if (month == '05') {
                return day + ' พฤษภาคม ค.ศ. ' + year
            }
            else if (month == '06') {
                return day + ' มิถุนายน ค.ศ. ' + year
            }
            else if (month == '07') {
                return day + ' กรกฎาคม ค.ศ. ' + year
            }
            else if (month == '08') {
                return day + ' สิงหาคม ค.ศ. ' + year
            }
            else if (month == '09') {
                return day + ' กันยายน ค.ศ. ' + year
            }
            else if (month == '10') {
                return day + ' ตุลาคม ค.ศ. ' + year
            }
            else if (month == '11') {
                return day + ' พฤศจิกายน ค.ศ. ' + year
            }
            else {
                return day + 'ธันวาคม ค.ศ. ' + year
            }
        }
    },
}
</script>
