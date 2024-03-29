<template>
    <app-sidebar/>
    <app-navbar/>
    <v-main>
        <app-title title="ข่าวสารนิสิต"/>
        <breadcrumbs :items="items"/>
        <v-card 
        rounded="xl"
        class="mx-8 mt-2">
        <v-row class="mx-4 my-2">
        <router-link :to="{name: 'admin-announcement-form'}">
        <v-btn 
            flat
            rounded="lg" 
            class="submit"
        >สร้าง
        </v-btn>
        </router-link>
        </v-row>
            <card-header title="ข่าวสารนิสิต"/>
            <v-container
            v-for="(item, i) in announcementItems"
            :key="i"
            :value="item">
                <v-card
                elevation="4"
                rounded="xl">
                <v-row class="justify-space-between">
                    <v-col>
                    <v-card-title>{{ item.header }}</v-card-title>
                    <v-input prepend-icon="mdi-clock-outline" class="mx-4 text-grey">{{ formatDate(item.announced_datetime) }}</v-input>
                    </v-col>
                    <v-col cols="2" align="end">
                        <div class="my-2 mx-4">
                            <v-btn
                            class="primary mx-2"
                            rounded="xl"
                            size="x-small"
                            icon="mdi-pencil"
                            @click="goToEdit(item)">
                            </v-btn>
                            <v-btn
                            class="cancel"
                            rounded="xl"
                            size="x-small"
                            icon="mdi-delete"
                            @click="goToDelete(item)">
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
                    <v-textarea 
                        class="mx-4"
                        bg-color="#D9D9D9"
                        readonly 
                        variant="toned"
                        rounded="lg"
                        placeholder="คำอธิบาย"
                        v-model="item.description" 
                        row-height="30"
                        rows="5"
                        no-resize/>
                </v-card>
            </v-container>
        </v-card>
    </v-main>
</template>

<script>
import AppNavbar from '@/components/AppNavbar.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import AppTitle from '@/components/AppTitle.vue'
import CardHeader from '@/components/CardHeader.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { useUserStore } from '@/store/users'
import axios from 'axios'

export default{
    name: 'admin-announcement',
    components: {
      AppNavbar,
      AppSidebar,
      AppTitle,
      CardHeader,
      Breadcrumbs
    },
    setup() {
        const userStore = useUserStore()
        return {
            userStore
        }
    },
    mounted() {
        this.getAnnouncement()
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
                    title: 'ข่าวสารนิสิต',
                    disabled: true,
                    href: '/admin/announcement',
                },
            ],
            announcementItems: []
        }
    },
    methods: {
        getAnnouncement() {
            axios.get('announcement/announcements/')
            .then(response => {
                this.announcementItems = response.data
            })
            .catch(error => {
                console.log(error)
            })
        },
        formatDate(value) {
            const date = new Date(value).toLocaleString().split('/')
            const month = date[0]
            const year = date[2].split(',')[0]
            const time = date[2].split(', ')[1]
            return date[1] + ' ' + this.getMonth(month) + ' ค.ศ. ' + year + ', เวลา ' + this.getTime(time)
        },
        getMonth(value) {
            if (value == '1') { return 'มกราคม' }
                else if (value == '2') { return 'กุมภาพันธ์'}
                else if (value == '3') { return 'มีนาคม'}
                else if (value == '4') { return 'เมษายน'}
                else if (value == '5') { return 'พฤษภาคม'}
                else if (value == '6') { return 'มิถุนายน'}
                else if (value == '7') { return 'กรกฎาคม'}
                else if (value == '8') { return 'สิงหาคม'}
                else if (value == '9') { return 'กันยายน'}
                else if (value == '10') { return 'ตุลาคม'}
                else if (value == '11') { return 'พฤศจิกายน'}
                else { return 'ธันวาคม'}
        },
        getTime(value) {
            const time = value.split(':')
            let hour = parseInt(time[0])
            const min = time[1]
            const meridiem = time[2].split(' ')[1]
            if (meridiem=='AM') {
                return hour + ':' + min + ' น.'
            } else {
                hour += 12
                return  hour + ':' + min + ' น.'
            }
        },
        goToEdit(value) {
            this.$router.push({
            name: 'admin-announcement-detail',
            params: {
                id: value.id
            }
            })
        },
        goToDelete(value) {
            this.$swal({
                    title: value.header,
                    text: 'ยืนยันการลบประกาศนี้ใช่หรือไม่',
                    showCloseButton: true,
                    confirmButtonText: "ยืนยัน",
                    confirmButtonColor: "#0AAE75",
                    cancelButtonText: "ยกเลิก",
                    showCancelButton: true,
                    cancelButtonColor: "#ED585A",
                    icon: "warning",
                    backdrop: false,
                    }).then(result => {
                        if (result.isConfirmed) {
                            this.deleteItems(value)
                        }
                    })
        },
        deleteItems(value) {
            axios.delete('announcement/announcements/'+value.id)
            .then(response => {
                this.$swal({
                    title: 'ดำเนินการลบประกาศสำเร็จ',
                    showCloseButton: true,
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "#0AAE75",
                    icon: "success",
                    backdrop: false,
                    }).then(result => {
                        if (result.isConfirmed || result.isClosed) {
                            this.$router.push('/admin/announcement')
                            this.$router.go(0)
                        }
                    })
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
}
</script>
  