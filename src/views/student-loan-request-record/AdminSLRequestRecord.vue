<template>
    <app-sidebar/>
    <app-navbar/>
    <v-main>
        <app-title title="บันทึกความประสงค์กู้ยืม"/>
        <breadcrumbs :items="items"/>
        <v-card 
        rounded="xl"
        class="mx-8 mt-2">
        <v-row class="mx-4 my-2" justify="end">
            <v-col>
            </v-col>
        </v-row>
        <card-header title="บันทึกความประสงค์กู้ยืม"/>
            <app-table 
            :headers="headers"
            :items="tableItems"
            class="mt-4"
            height="250"/>
        </v-card>
    </v-main>
</template>

<script>
import AppNavbar from '@/components/AppNavbar.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import AppTitle from '@/components/AppTitle.vue'
import CardHeader from '@/components/CardHeader.vue'
import AppTable from '@/components/AppTable.vue'
import SearchBar from '@/components/SearchBar.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { useUserStore } from '@/store/users'
import axios from 'axios'

export default{
    name: 'admin-student-loan-request-record',
    components: {
      AppNavbar,
      AppSidebar,
      AppTitle,
      CardHeader,
      AppTable,
      SearchBar,
      Breadcrumbs
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
                    disabled: true,
                    href: '/admin/student-loan-request-record'
                },
            ],
            headers: [
                {
                    title: 'ผู้ทำรายการ', value: 'borrower_name', sortable: true
                },
                {
                    title: 'ปีการศึกษา', value: 'academic_year', sortable: true
                },
                {
                    title: 'ภาคการศึกษา', value: 'semester', sortable: true
                },
                {
                    title: 'วันที่ทำรายการ', value: 'create_date', sortable: true
                },
                {
                    title: 'สถานะ', value: 'status', sortable: true
                },
                {
                    title: ' ', value: 'admin_request_action'
                }
            ],
            tableItems: [],
        }
    },
    mounted() {
        this.getTableItems()
    },
    setup() {
        const userStore = useUserStore()
        return {
            userStore
        }
    },
    methods: {
        getTableItems() {
            axios.get('student-loan-request-record/student-loan-request-records/') 
            .then(response => {
                this.tableItems = response.data
            })
            .catch(error => {
                console.log(error)
            })
        },
    }
}
</script>