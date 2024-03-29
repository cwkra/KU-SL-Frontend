<template>
    <app-sidebar/>
    <app-navbar/>
    <v-main>
        <app-title title="บันทึกชั่วโมงกิจกรรมจิตอาสา"/>
        <breadcrumbs :items="items"/>
        <v-card 
        rounded="xl"
        class="mx-8 mt-2">
        <v-row class="mx-4 my-2 justify-space-between">
        <router-link :to="{name: 'admin-volunteer-activity-hours-record'}">
        <v-btn 
            flat
            rounded="lg" 
            class="primary"
        >ย้อนกลับ
        </v-btn>
        </router-link>
        <div v-if="status=='รอการตรวจสอบ'">
            <v-btn 
            flat
            rounded="lg" 
            class="submit mx-2"
            @click="approve"
            >ผ่าน
            </v-btn>
            <v-btn 
            flat
            rounded="lg" 
            class="cancel mx-2"
            @click="deny"
            >ไม่ผ่าน
            </v-btn>
        </div>
        </v-row>
        <card-header title="รายละเอียดบันทึกชั่วโมงกิจกรรมจิตอาสา"/>
        <v-card 
            class="mx-16 my-4 pa-4"
            rounded="xl">
                <v-row no-gutters justify="space-between" class="mx-16">
                    <v-col cols="5">
                    <p>ชื่อกิจกรรม</p>
                    <v-text-field 
                    bg-color="#D9D9D9"
                    readonly
                    density="compact"
                    rounded="pill" 
                    variant="outlined"
                    placeholder="ชื่อกิจกรรม"
                    v-model="name"/>
                    </v-col>

                    <v-col cols="5">
                    <p>ประเภทกิจกรรม</p>
                    <v-text-field 
                    density="compact"
                    rounded="pill" 
                    variant="outlined"
                    placeholder="ประเภทกิจกรรม"
                    bg-color="#D9D9D9"
                    readonly
                    v-model="category"/>
                    </v-col>
                </v-row>

                <v-row no-gutters justify="space-between" class="mx-16">
                    <v-col cols="5">
                    <p>ชั่วโมงกิจกรรม</p>
                    <v-text-field 
                    bg-color="#D9D9D9"
                    readonly
                    density="compact"
                    rounded="pill" 
                    variant="outlined"
                    placeholder="ชั่วโมงกิจกรรม"
                    class="center-text"
                    v-model="hours"/>
                    </v-col>

                    <v-col cols="5">
                    <p>สถานที่จัดกิจกรรม</p>
                    <v-text-field 
                    bg-color="#D9D9D9"
                    readonly
                    density="compact"
                    rounded="pill" 
                    variant="outlined"
                    placeholder="สถานที่จัดกิจกรรม"
                    v-model="location_name"/>
                    </v-col>
                </v-row>
                <v-row no-gutters justify="space-between" class="mx-16">
                    <v-col cols="5">
                    <p>วันที่จัดกิจกรรม</p>
                    <v-text-field 
                    bg-color="#D9D9D9"
                    readonly
                    density="compact"
                    rounded="pill" 
                    variant="outlined"
                    placeholder="วันที่จัดกิจกรรม"
                    type="date"
                    v-model="event_date"/>
                    </v-col>

                    <v-col cols="5">
                    <p>ปีการศึกษา</p>
                    <v-text-field 
                    bg-color="#D9D9D9"
                    readonly
                    density="compact"
                    rounded="pill" 
                    variant="outlined"
                    placeholder="ปีการศึกษา"
                    v-model="academic_year"/>
                    </v-col>
                </v-row>
                <v-row no-gutters justify="space-between" class="mx-16">
                    <v-col cols="5">
                    <p>หลักฐานการเข้าร่วมกิจกรรม</p>
                    <v-img
                    rounded="0"
                    :src="verification"></v-img>
                    </v-col>

                    <v-col cols="5">
                    <p>สถานะ</p>
                    <v-text-field 
                    bg-color="#D9D9D9"
                    readonly
                    density="compact"
                    rounded="pill" 
                    variant="outlined"
                    placeholder="สถานะ"
                    v-model="status"/>
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
    name: 'volunteer-activity-hours-record-detail',
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
            borrower_id: null,
            name: null,
            category: null,
            hours: null,
            location_name: null,
            event_date: null,
            academic_year: null,
            verification: null,
            status: null,
            items: [
                {
                    title: 'หน้าหลัก',
                    disabled: false,
                    href: '/'
                },
                {
                    title: 'บันทึกชั่วโมงกิจกรรมจิตอาสา',
                    disabled: false,
                    href: '/admin/volunteer-activity-hours-record'
                },
                {
                    title: 'รายละเอียด',
                    disabled: true
                },
            ]
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        getData() {
            axios.get('volunteer-activities-hours-record/volunteer-activities-hours-records/'+this.$route.params.id)
            .then(response => {
                this.borrower_id = response.data.borrower
                this.name = response.data.name
                this.category = response.data.category
                this.hours = response.data.hours
                this.location_name = response.data.location_name
                this.academic_year = response.data.academic_year
                this.event_date = response.data.event_date
                this.status = response.data.status
                this.verification = response.data.verification
            })
            .catch(error => {
                console.log(error)
            })
        },
        approve() {
            const formData = {
                borrower: this.borrower_id,
                name: this.name,
                category: this.category,
                hours: this.hours,
                location_name: this.location_name,
                academic_year: this.academic_year,
                event_date: this.event_date,
                status: 'ผ่าน'
            }
            axios.put('volunteer-activities-hours-record/volunteer-activities-hours-records/'+this.$route.params.id+'/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    this.sendNotification('ผ่าน')
                    this.$swal({
                    title: 'ตรวจสอบบันทึกชั่วโมงกิจกรรมจิตอาสาสำเร็จ',
                    showCloseButton: true,
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "#0AAE75",
                    icon: "success",
                    backdrop: false,
                    }).then(result => {
                        if (result.isConfirmed || result.isClosed) {
                            this.$router.push('/admin/volunteer-activity-hours-record')
                        }
                    })
                })
                .catch(error => {
                    console.log(error)
                    this.$swal({
                        title: 'ตรวจสอบบันทึกชั่วโมงกิจกรรมจิตอาสาไม่สำเร็จ',
                        showCloseButton: true,
                        text: "กรุณาตรวจสอบข้อมูลอีกครั้ง",
                        confirmButtonText: "ตกลง",
                        confirmButtonColor: "#0AAE75",
                        icon: "error",
                        backdrop: false
                    });
                })
        },
        deny() {
            const formData = {
                borrower: this.borrower_id,
                name: this.name,
                category: this.category,
                hours: this.hours,
                location_name: this.location_name,
                academic_year: this.academic_year,
                event_date: this.event_date,
                status: 'ไม่ผ่าน'
            }
            axios.put('volunteer-activities-hours-record/volunteer-activities-hours-records/'+this.$route.params.id+'/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    this.sendNotification('ไม่ผ่าน')
                    this.$swal({
                    title: 'ตรวจสอบบันทึกชั่วโมงกิจกรรมจิตอาสาสำเร็จ',
                    showCloseButton: true,
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "#0AAE75",
                    icon: "success",
                    backdrop: false,
                    }).then(result => {
                        if (result.isConfirmed || result.isClosed) {
                            this.$router.push('/admin/volunteer-activity-hours-record')
                        }
                    })
                })
                .catch(error => {
                    console.log(error)
                    this.$swal({
                        title: 'ตรวจสอบบันทึกชั่วโมงกิจกรรมจิตอาสาไม่สำเร็จ',
                        showCloseButton: true,
                        text: "กรุณาตรวจสอบข้อมูลอีกครั้ง",
                        confirmButtonText: "ตกลง",
                        confirmButtonColor: "#0AAE75",
                        icon: "error",
                        backdrop: false
                    });
                })
        },
        sendNotification(value) {
            if (value=='ผ่าน') {
                const formData = {
                    sender: this.userStore.user.id,
                    receiver: this.borrower_id,
                    title: 'แจ้งผลการตรวจสอบกิจกรรมจิตอาสา',
                    message: 'กิจกรรม \"' + this.name + '\" ผ่านการตรวจสอบ สามารถนำไปยื่นชั่วโมงกิจกรรมจิตอาสาได้'
                }
                axios.post('notification/notifications/', formData)
                .catch(error => {
                console.log(error)
                })
            } else {
                const formData = {
                    sender: this.userStore.user.id,
                    receiver: this.borrower_id,
                    title: 'แจ้งผลการตรวจสอบกิจกรรมจิตอาสา',
                    message: 'กิจกรรม \"' + this.name + '\" ไม่ผ่านการตรวจสอบ กรุณาส่งกิจกรรมอื่น'
                }
                axios.post('notification/notifications/', formData)
                .catch(error => {
                console.log(error)
                })
            }
        }
    },
}
</script>