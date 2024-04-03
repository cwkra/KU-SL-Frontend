<template>
    <app-sidebar/>
    <app-navbar/>
    <v-main>
        <app-title title="บันทึกชั่วโมงกิจกรรมจิตอาสา"/>
        <breadcrumbs :items="items"/>
        <v-card 
        rounded="xl"
        class="mx-8 mt-2">
        <v-form @submit.prevent>
        <v-row class="mx-4 my-2" justify="end">
        <v-btn 
            flat rounded="lg" class="submit mx-2"
            type="submit" @click="onSubmit"
        >บันทึก
        </v-btn>
        <v-btn 
            flat rounded="lg" class="submit mx-2" type="submit"
            @click="onSecondSubmit"
        >บันทึกและยื่นตรวจสอบ
        </v-btn>
        <router-link :to="{name: 'volunteer-activity-hours-record'}">
        <v-btn flat rounded="lg" class="cancel mx-2" type="cancel"
        >ยกเลิก
        </v-btn>
        </router-link>
        </v-row>
            <card-header title="สร้างบันทึกชั่วโมงกิจกรรมจิตอาสา"/>
            <v-card class="mx-16 my-4 pa-4" rounded="xl">
                <v-row no-gutters justify="space-between" class="mx-16">
                    <v-col cols="5">
                    <p>ชื่อกิจกรรม</p>
                    <v-text-field 
                    clearable density="compact"
                    rounded="pill" variant="outlined"
                    placeholder="ชื่อกิจกรรม"
                    :rules="[rules.name_required]"
                    v-model="name"/>
                    </v-col>
                    <v-col cols="5">
                    <p>ประเภทกิจกรรม</p>
                    <v-select 
                    density="compact"
                    rounded="pill" 
                    variant="outlined"
                    placeholder="ประเภทกิจกรรม"
                    :rules="[rules.category_required]"
                    :items="category_items"
                    v-model="category"/>
                    </v-col>
                </v-row>
                <v-row no-gutters justify="space-between" class="mx-16">
                    <v-col cols="5">
                    <p>ชั่วโมงกิจกรรม</p>
                    <v-text-field 
                    prepend-icon="mdi-minus-circle"
                    append-icon="mdi-plus-circle"
                    density="compact"
                    rounded="pill" variant="outlined"
                    type="number" :min="1"
                    @click:append="increaseHours"
                    @click:prepend="decreaseHours"
                    hide-spin-buttons
                    placeholder="ชั่วโมงกิจกรรม"
                    class="center-text"
                    :rules="rules.hours_rules"
                    v-model="hours"/>
                    </v-col>
                    <v-col cols="5">
                    <p>สถานที่จัดกิจกรรม</p>
                    <v-text-field 
                    clearable
                    density="compact"
                    rounded="pill" 
                    variant="outlined"
                    placeholder="สถานที่จัดกิจกรรม"
                    :rules="[rules.location_name_required]"
                    v-model="location_name"/>
                    </v-col>
                </v-row>
                <v-row no-gutters justify="space-between" class="mx-16">
                    <v-col cols="5">
                    <p>วันที่จัดกิจกรรม</p>
                    <v-text-field 
                    density="compact"
                    rounded="pill" 
                    variant="outlined"
                    placeholder="วันที่จัดกิจกรรม"
                    type="date"
                    :max="getToday()"
                    :rules="[rules.event_date_required]"
                    v-model="event_date"/>
                    </v-col>
                    <v-col cols="5">
                    <p>ปีการศึกษา</p>
                    <v-text-field 
                    readonly
                    bg-color="#d9d9d9"
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
                    <v-file-input
                    density="compact"
                    clearable
                    rounded="pill" 
                    variant="outlined"
                    placeholder="หลักฐานการเข้าร่วมกิจกรรม"
                    :rules="[rules.verification_required]"
                    accept="image/png, image/jpeg"
                    chips
                    ref="file"
                    v-model="verification"/>
                    </v-col>
                </v-row>
            </v-card>
        </v-form>
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
    setup() {
        const userStore = useUserStore()
        return {
            userStore
        }
    },
    data() {
        return {
            name: null,
            category: null,
            hours: 1,
            location_name: null,
            event_date: null,
            academic_year: this.getAcademicYear(),
            verification: null,
            rules: {
                name_required: value => !!value || 'กรุณากรอกชื่อกิจกรรม',
                category_required: value => !!value || 'กรุณาเลือกประเภทกิจกรรม',
                hours_rules: [
                value => !!value || 'กรุณากรอกชั่วโมงกิจกรรม',
                value => (value > 0) || 'กรุณากรอกชั่วโมงกิจกรรมมากกว่า 0'
                ],
                location_name_required: value => !!value || 'กรุณากรอกสถานที่จัดกิจกรรม',
                event_date_required: value => !!value || 'กรุณาเลือกวันที่จัดกิจกรรม',
                verification_required: value => !!value || 'กรุณาเพิ่มไฟล์หลักฐานการเข้าร่วมกิจกรรม'
            },
            items: [
                {
                    title: 'หน้าหลัก',
                    disabled: false,
                    href: '/'
                },
                {
                    title: 'บันทึกชั่วโมงกิจกรรมจิตอาสา',
                    disabled: false,
                    href: '/volunteer-activity-hours-record'
                },
                {
                    title: 'สร้างบันทึกชั่วโมงกิจกรรมจิตอาสา',
                    disabled: true,
                    href: '/volunteer-activity-hours-record/create'
                },
            ],
            category_items: [
                {
                    title: 'เพื่อสังคม/จิตอาสา/คุณธรรมจริยธรรม'
                },
                {
                    title: 'ออนไลน์'
                },
                {
                    title: 'อื่น ๆ'
                }
            ]
        }
    },
    methods: {
        increaseHours() {
            return this.hours++
        },
        decreaseHours() {
            if (this.hours<2) {
                return this.hours
            }
            else {
                return this.hours--
            }
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
        async onSubmit() {
            const formData = {
                borrower: this.userStore.user.id,
                borrower_name: this.userStore.user.name,
                name: this.name,
                category: this.category,
                hours: this.hours,
                location_name: this.location_name,
                event_date: this.event_date,
                academic_year: this.academic_year,
                verification: this.$refs.file.files[0]
            }
            console.log("form data: ", formData)
            if (formData.borrower!=null &&
                formData.name!=null &&
                formData.category!=null &&
                formData.hours!=null &&
                formData.location_name!=null &&
                formData.event_date!=null &&
                formData.academic_year!=null &&
                formData.verification!=null) {
                await axios
                .post('volunteer-activities-hours-record/volunteer-activities-hours-records/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    this.$swal({
                    title: 'บันทึกชั่วโมงกิจกรรมจิตอาสาสำเร็จ',
                    text: 'กรุณาตรวจสอบข้อมูลและยื่นตรวจสอบชั่วโมงกิจกรรมจิตอาสา',
                    showCloseButton: true,
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "#0AAE75",
                    icon: "success",
                    backdrop: false,
                    }).then(result => {
                        if (result.isConfirmed || result.isClosed) {
                            this.$router.push('/volunteer-activity-hours-record')
                        }
                    })
                })
                .catch(error => {
                    console.log(error)
                    this.$swal({
                        title: 'บันทึกชั่วโมงกิจกรรมจิตอาสาไม่สำเร็จ',
                        showCloseButton: true,
                        text: "กรุณาตรวจสอบข้อมูลอีกครั้ง",
                        confirmButtonText: "ตกลง",
                        confirmButtonColor: "#0AAE75",
                        icon: "error",
                        backdrop: false
                    });
                })
            }
        },
        getToday() {
            const current = new Date();
            if (current.getDate() < 10 && (current.getMonth()+1 < 10)) {
                return current.getFullYear()+'-0'+(current.getMonth()+1)+'-0'+current.getDate()
            } else if ( current.getDate < 10 && !(current.getMonth()+1 < 10)) {
                return current.getFullYear()+'-'+(current.getMonth()+1)+'-0'+current.getDate()
            } else if (!current.getDate < 10 && (current.getMonth()+1 < 10)) {
                return current.getFullYear()+'-0'+(current.getMonth()+1)+'-'+current.getDate()
            } else {
                return current.getFullYear()+'-'+(current.getMonth()+1)+'-'+current.getDate()
            }
        },
        async onSecondSubmit() {
            const formData = {
                borrower: this.userStore.user.id,
                borrower_name: this.userStore.user.name,
                name: this.name,
                category: this.category,
                hours: this.hours,
                location_name: this.location_name,
                event_date: this.event_date,
                academic_year: this.academic_year,
                verification: this.$refs.file.files[0],
                status: 'รอการตรวจสอบ'
            }
            console.log("form data: ", formData)
            if (formData.borrower!=null &&
                formData.name!=null &&
                formData.category!=null &&
                formData.hours!=null &&
                formData.location_name!=null &&
                formData.event_date!=null &&
                formData.academic_year!=null &&
                formData.verification!=null) {
                await axios
                .post('volunteer-activities-hours-record/volunteer-activities-hours-records/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    this.sendNotification()
                    this.$swal({
                    title: 'บันทึกและยื่นตรวจสอบชั่วโมงกิจกรรมจิตอาสาสำเร็จ',
                    text: 'กรุณารอการตรวจสอบ',
                    showCloseButton: true,
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "#0AAE75",
                    icon: "success",
                    backdrop: false,
                    }).then(result => {
                        if (result.isConfirmed || result.isClosed) {
                            this.$router.push('/volunteer-activity-hours-record')
                        }
                    })
                })
                .catch(error => {
                    console.log(error)
                    this.$swal({
                        title: 'บันทึกและยื่นตรวจสอบชั่วโมงกิจกรรมจิตอาสาไม่สำเร็จ',
                        showCloseButton: true,
                        text: "กรุณาตรวจสอบข้อมูลอีกครั้ง",
                        confirmButtonText: "ตกลง",
                        confirmButtonColor: "#0AAE75",
                        icon: "error",
                        backdrop: false
                    });
                })
            }
        },
        sendNotification() {
            const formData = {
                sender: this.userStore.user.id,
                receiver: 1,
                title: 'แจ้งเตือนการยื่นตรวจสอบชั่วโมงกิจกรรมจิตอาสา',
                message: this.userStore.user.name + ' ได้ยื่นตรวจสอบกิจกรรม \"' + this.name + '\" กรุณาตรวจสอบข้อมูล'
            }
            axios.post('notification/notifications/', formData)
            .catch(error => {
            console.log(error)
            })
        }
    },
}
</script>
<style scoped>
    .center-text :deep(input) {
        text-align: center
    }
</style>