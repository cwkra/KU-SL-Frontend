<template>
    <app-sidebar/>
    <app-navbar/>
    <v-main>
        <app-title title="บันทึกความประสงค์กู้ยืม"/>
        <breadcrumbs :items="items"/>
        <v-card rounded="xl" class="mx-8 mt-2">
        <v-row class="mx-4 my-2">
        <router-link :to="{name: 'student-loan-request-record'}">
        <v-btn flat rounded="lg" class="primary">ย้อนกลับ</v-btn>
        </router-link>
        </v-row>
        <card-header title="รายละเอียดบันทึกความประสงค์กู้ยืม"/>
        <v-card class="mx-16 my-4 px-4 py-2" rounded="xl">
                <v-row no-gutters justify="space-between" class="mx-16">
                    <v-col cols="5">
                    <p>ชื่อ-นามสกุล</p>
                    <v-text-field 
                    density="compact" bg-color="#D9D9D9"
                    readonly rounded="pill" variant="outlined"
                    placeholder="ชื่อ-นามสกุล" v-model="name"/>
                    </v-col>
                    <v-col cols="5">
                    <p>รหัสประชาชน</p>
                    <v-text-field 
                    density="compact" bg-color="#D9D9D9"
                    readonly rounded="pill" 
                    variant="outlined" placeholder="รหัสประชาชน"
                    v-model="identity_card_number"/>
                    </v-col>
                </v-row>
                <v-row no-gutters justify="space-between" class="mx-16">
                    <v-col cols="5">
                    <p>รหัสนิสิต</p>
                    <v-text-field 
                    density="compact" bg-color="#D9D9D9"
                    readonly rounded="pill" 
                    variant="outlined" placeholder="รหัสนิสิต"
                    v-model="student_id_number"/>
                    </v-col>
                    <v-col cols="5">
                    <p>คณะ</p>
                    <v-text-field 
                    density="compact" bg-color="#D9D9D9"
                    readonly rounded="pill" variant="outlined"
                    placeholder="คณะ" v-model="faculty"/>
                    </v-col>
                </v-row>
                <v-row no-gutters justify="space-between" class="mx-16">
                    <v-col cols="5">
                    <p>ภาควิชา</p>
                    <v-text-field 
                    density="compact" bg-color="#D9D9D9"
                    readonly rounded="pill" 
                    variant="outlined" placeholder="ภาควิชา"
                    v-model="department"/>
                    </v-col>
                </v-row>
            </v-card>
            <v-card class="mx-16 my-4 px-4 py-2" rounded="xl">
                <v-row no-gutters justify="space-between" class="mx-16">
                    <v-col cols="5">
                    <p>ปีการศึกษา</p>
                    <v-text-field
                    density="compact" rounded="pill" 
                    variant="outlined" placeholder="ปีการศึกษา"
                    readonly bg-color="#D9D9D9" v-model="academic_year"/>
                    </v-col>
                    <v-col cols="5">
                    <p>ภาคการศึกษา</p>
                    <v-text-field
                    bg-color="#D9D9D9" density="compact" readonly
                    rounded="pill" variant="outlined"
                    placeholder="ภาคการศึกษา" v-model="semester"/>
                    </v-col>
                </v-row>
                <v-row no-gutters justify="space-between" class="mx-16">
                    <v-col cols="5">
                    <p>ค่าธรรมเนียมการศึกษา</p>
                    <v-text-field 
                    bg-color="#D9D9D9" density="compact"
                    :min="1" readonly rounded="pill" 
                    variant="outlined" placeholder="ค่าธรรมเนียมการศึกษา"
                    type="number" v-model="tuition_fees"/>
                    </v-col>
                    <v-col cols="5">
                    <p>สถานะ</p>
                    <v-text-field bg-color="#D9D9D9"
                    density="compact" readonly
                    rounded="pill" variant="outlined"
                    placeholder="สถานะ" v-model="status"/>
                    </v-col>
                </v-row>
            </v-card>
        </v-card>
    </v-main>
</template>

<script>
import AppNavbar from '@/components/AppNavbar.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import AppTitle from '@/components/AppTitle.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { useUserStore } from '@/store/users'
import axios from 'axios'

export default{
    name: 'student-loan-request-record-detail',
    components: {
      AppNavbar,
      AppSidebar,
      AppTitle,
      Breadcrumbs
    },
    setup() {
        const userStore = useUserStore()
        return {
            userStore
        }
    },
    data() {
        return {
            items: [
                {
                    title: 'หน้าหลัก',
                    disabled: false,
                    href: '/'
                },
                {
                    title: 'บันทึกความประสงค์กู้ยืม',
                    disabled: false,
                    href: '/student-loan-request-record'
                },
                {
                    title: 'รายละเอียด',
                    disabled: true
                },
            ],
            name: null,
            identity_card_number: null,
            student_id_number: null,
            faculty: null,
            department: null,
            academic_year: null,
            semester: null,
            tuition_fees: null,
            status: null
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        getData() {
            axios.get('student-loan-request-record/student-loan-request-records/'+this.$route.params.id)
            .then(response => {
                this.academic_year = response.data.academic_year
                this.semester = response.data.semester
                this.tuition_fees = response.data.tuition_fees
                this.status = response.data.status
                this.getBorrowerData(response.data.borrower)
            })
            .catch(error => {
                console.log(error)
            })
        },
        getBorrowerData(value) {
            axios.get('auth/users/'+value)
            .then(response => {
                this.name = response.data.name
                this.identity_card_number = response.data.identity_card_number
                this.student_id_number = response.data.education.student_id_number
                this.faculty = response.data.education.faculty
                this.department = response.data.education.department
            })
            .catch(error => {
                console.log(error)
            })
        }
    },
}
</script>