<template>
    <app-sidebar/>
    <app-navbar/>
    <v-main>
        <app-title title="บันทึกชั่วโมงกิจกรรมจิตอาสา"/>
        <breadcrumbs :items="items"/>
        <v-card 
        rounded="xl"
        class="mx-8 mt-2">
        <v-row class="mx-4 my-2">
            <router-link :to="{name: 'volunteer-activity-hours-record-form'}">
            <v-btn 
            flat
            rounded="lg" 
            class="submit"
            >สร้าง
            </v-btn>
            </router-link>
            <v-btn 
            @click="goToPrint"
            flat
            rounded="lg" 
            class="primary mx-2"
            :disabled="(totalHours<36)&&(borrower_loan_request.length==0)"
            >พิมพ์เอกสาร
            </v-btn>
            
            
        </v-row>
            <card-header title="บันทึกชั่วโมงกิจกรรมจิตอาสา"/>
            
            <v-card variant="outlined" rounded="pill" class="ma-2">
                <v-row class="align-center px-16">
                    <v-responsive max-width="100">
                        <p class="ml-4">ปีการศึกษา</p>
                    </v-responsive>
                    <v-responsive max-width="200">
                        <v-select 
                        class="mt-5" 
                        density="compact" 
                        rounded="pill" 
                        variant="outlined" 
                        placeholder="ปีการศึกษา" 
                        :items="selectYearItems"
                        v-model="academic_year"
                        ></v-select>
                    </v-responsive>
                    <v-responsive class="text-end mr-4"><p :style="{color: this.getTextColor()}">รวม: {{ this.totalHours }} /36 ชั่วโมง</p></v-responsive>
                </v-row>
            </v-card>

            <app-table 
            :headers="headers"
            :items="tableItems"
            class="mt-2"
            height="250"/>
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
    name: 'volunteer-activity-hours-record',
    components: {
      AppNavbar,
      AppSidebar,
      AppTitle,
      Breadcrumbs
    },
    data() {
        return {
            academic_year: '2566',
            year_items: [],
            totalHours: 0,
            passItems: [],
            tableItems: [],
            selectYearItems: [],
            items: [
                {
                    title: 'หน้าหลัก',
                    disabled: false,
                    href: '/'
                },
                {
                    title: 'บันทึกชั่วโมงกิจกรรมจิตอาสา',
                    disabled: true,
                    href: '/volunteer-activity-hours-record'
                },
            ],
            headers: [
                {
                    title: 'ชื่อกิจกรรม', value: 'name', sortable: true
                },
                {
                    title: 'ชั่วโมงกิจกรรม', value: 'hours', sortable: true
                },
                {
                    title: 'วันที่ทำรายการ', value: 'create_date', sortable: true
                },
                {
                    title: 'สถานะ', value: 'status', sortable: true
                },
                {
                    title: ' ', value: 'activity_action'
                }
            ],
            borrower_loan_request: [],
        }
    },
    mounted() {
        this.getTableItems()
        this.getPassItems()
        this.getSelectYearItems()
        this.getBorrowerLoanRequest()
    },
    setup() {
        const userStore = useUserStore()
        return {
            userStore
        }
    },
    methods: {
        getBorrowerLoanRequest() {
            axios.get('student-loan-request-record/student-loan-request-records/?borrower='+this.userStore.user.id+'&semester=ภาคต้น&academic_year='+this.academic_year+'&status=อนุมัติ')
            .then(response => {
                this.borrower_loan_request = response.data
            })
            .catch(error => {
                console.log(error)
            })
        },
        getTableItems() {
            axios.get('volunteer-activities-hours-record/volunteer-activities-hours-records/?borrower='+this.userStore.user.id+'&academic_year='+this.academic_year) 
            .then(response => {
                this.tableItems = response.data
            })
            .catch(error => {
                console.log(error)
            })
        },
        getAcademicYear() {
            const current = new Date();
            if (current.getMonth() < 4) {
                const year = current.getFullYear()+542
                return year
            } else {
                const year = current.getFullYear()+543
                return year
            }
        },
        goToPrint() {
            const newWindow = window.open('http://localhost:3000/volunteer-activity-hours-record-doc/'+this.academic_year, '_blank', 'width=793, height=842');
            if (newWindow) {
                newWindow.focus()
            }
        },
        getPassItems() {
            axios.get('volunteer-activities-hours-record/volunteer-activities-hours-records/?borrower='+this.userStore.user.id+'&academic_year='+this.academic_year+'&status=ผ่าน')
            .then(response => {
                this.passItems = response.data
                this.sumTotalHours()
            })
            .catch(error => {
                console.log(error)
            })
        },
        sumTotalHours() {
            for (let i = 0; i < this.passItems.length; i++) {
                this.totalHours += this.passItems[i].hours
            }
        },
        getTextColor() {
            if (this.totalHours < 36) {
                return '#ED585A'
            }
            else {
                return '#0AAE75'
            }
        },
        getSelectYearItems() {
            const year = new Date().getFullYear()+543
            for (let i = 0; i <= year-2566; i++) {
                this.selectYearItems.push({title: 2566+i, value: 2566+i})
            }
        }
    },
    watch: {
        academic_year(value) {
            console.log('Change')
            this.totalHours = 0
            this.getTableItems()
            this.getPassItems()
        }
    }
}
</script>
