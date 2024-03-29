<template>
    <app-sidebar/>
    <app-navbar/>
    <v-main>
        <app-title title="บันทึกชั่วโมงกิจกรรมจิตอาสา"/>
        <breadcrumbs :items="items"/>
        <v-card 
        rounded="xl"
        class="mx-8 mt-2">
        <v-row class="mx-4 my-2" justify="end">
            <v-col>
            </v-col>
        </v-row>
            <card-header title="บันทึกชั่วโมงกิจกรรมจิตอาสา"/>
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
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { useUserStore } from '@/store/users'
import axios from 'axios'

export default{
    name: 'admin-volunteer-activity-hours-record',
    components: {
      AppNavbar,
      AppSidebar,
      AppTitle,
      Breadcrumbs
    },
    data() {
        return {
            tableItems: [],
            items: [
                {
                    title: 'หน้าหลัก',
                    disabled: false,
                    href: '/'
                },
                {
                    title: 'บันทึกชั่วโมงกิจกรรมจิตอาสา',
                    disabled: true,
                    href: '/admin/volunteer-activity-hours-record'
                },
            ],
            headers: [
                {
                    title: 'ผู้ทำรายการ', value: 'borrower_name', sortable: true,
                },
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
                    title: ' ', value: 'admin_activity_action'
                }
            ]
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
            axios.get('volunteer-activities-hours-record/volunteer-activities-hours-records/') 
            .then(response => {
                this.tableItems = response.data
                for (let i = 0; i < this.tableItems.length; i++) {
                    if (this.tableItems[i].status=='รอการยืนยัน') {
                        console.log(this.tableItems)
                        this.tableItems.splice(i, 1)
                        i--
                        console.log(this.tableItems)
                    }
                }
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
}
</script>