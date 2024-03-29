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
        <router-link :to="{name: 'volunteer-activity-hours-record'}">
        <v-btn 
            flat
            rounded="lg" 
            class="primary"
        >ย้อนกลับ
        </v-btn>
        </router-link>
        <div v-if="status=='รอการยืนยัน'&&mode=='view'">
            <v-btn 
            flat
            rounded="lg" 
            class="submit mx-2"
            @click="sendToApprove"
            >ยื่นตรวจสอบ
            </v-btn>
            <v-btn 
            flat
            rounded="lg" 
            class="primary mx-2"
            @click="mode='edit'"
            >แก้ไข
            </v-btn>
            <v-btn 
            flat
            rounded="lg" 
            class="cancel mx-2"
            @click="goToDelete"
            >ลบ
            </v-btn>
        </div>
        <div v-if="status=='รอการยืนยัน'&&mode=='edit'">
            <v-btn 
                flat
                rounded="lg" 
                class="submit mx-2"
                type="submit"
                @click="onSubmit"
            >บันทึก
            </v-btn>
            <v-btn 
                flat
                rounded="lg" 
                class="submit mx-2"
                type="submit"
                @click="onSecondSubmit"
            >บันทึกและยื่นตรวจสอบ
            </v-btn>
            <v-btn 
            flat
            rounded="lg" 
            class="cancel mx-2"
            @click="mode='view'"
            >ยกเลิก
            </v-btn>
        </div>
        </v-row>
        <card-header title="รายละเอียดบันทึกชั่วโมงกิจกรรมจิตอาสา"/>
        <v-card 
            v-if="mode=='view'"
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
                    v-model="event_date">
                    </v-text-field>
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
            <v-card 
            v-if="mode=='edit'"
            class="mx-16 my-4 pa-4"
            rounded="xl">
                <v-row no-gutters justify="space-between" class="mx-16">
                    <v-col cols="5">
                    <p>ชื่อกิจกรรม</p>
                    <v-text-field 
                    clearable
                    density="compact"
                    rounded="pill" 
                    variant="outlined"
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
                    rounded="pill" 
                    variant="outlined"
                    type="number"
                    :min="1"
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
                    accept="image/png, image/jpeg"
                    chips
                    ref="file"
                    v-model="new_verification"/>
                    <v-img
                    rounded="0"
                    :src="verification"></v-img>
                    </v-col>

                    <v-col cols="5">
                    <p>สถานะ</p>
                    <v-text-field 
                    readonly
                    bg-color="#D9D9D9"
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
            name: null,
            category: null,
            hours: null,
            location_name: null,
            event_date: null,
            academic_year: null,
            verification: null,
            status: null,
            new_verification: null,
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
                    title: 'รายละเอียด',
                    disabled: true
                },
            ],
            mode: 'view',
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
    mounted() {
        this.getData()
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
        getData() {
            axios.get('volunteer-activities-hours-record/volunteer-activities-hours-records/'+this.$route.params.id)
            .then(response => {
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
        sendToApprove() {
            const formData = {
                borrower: this.userStore.user.id,
                name: this.name,
                category: this.category,
                hours: this.hours,
                location_name: this.location_name,
                academic_year: this.academic_year,
                event_date: this.event_date,
                status: 'รอการตรวจสอบ'
            }
            axios.put('volunteer-activities-hours-record/volunteer-activities-hours-records/'+this.$route.params.id+'/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    this.sendNotification()
                    this.$swal({
                    title: 'ยื่นตรวจสอบชั่วโมงกิจกรรมจิตอาสาสำเร็จ',
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
                        title: 'ยื่นตรวจสอบชั่วโมงกิจกรรมจิตอาสาไม่สำเร็จ',
                        showCloseButton: true,
                        text: "กรุณาตรวจสอบข้อมูลอีกครั้ง",
                        confirmButtonText: "ตกลง",
                        confirmButtonColor: "#0AAE75",
                        icon: "error",
                        backdrop: false
                    });
                })
        },
        async onSubmit() {
            const pathSplit = this.$route.path.split('/')
            if (this.$refs.file.files[0]!=null) {
                const formData = {
                    borrower: this.userStore.user.id,
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
                .put('volunteer-activities-hours-record/volunteer-activities-hours-records/'+pathSplit[2]+'/', formData, {
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
            } else {
                const formData = {
                    borrower: this.userStore.user.id,
                    name: this.name,
                    category: this.category,
                    hours: this.hours,
                    location_name: this.location_name,
                    event_date: this.event_date,
                    academic_year: this.academic_year
                }
                console.log("form data: ", formData)
                if (formData.borrower!=null &&
                    formData.name!=null &&
                    formData.category!=null &&
                    formData.hours!=null &&
                    formData.location_name!=null &&
                    formData.event_date!=null &&
                    formData.academic_year!=null) {
                    await axios
                    .put('volunteer-activities-hours-record/volunteer-activities-hours-records/'+pathSplit[2]+'/', formData, {
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
            }
        },
        async onSecondSubmit() {
            const pathSplit = this.$route.path.split('/')
            if (this.$refs.file.files[0]!=null) {
                const formData = {
                    borrower: this.userStore.user.id,
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
                .put('volunteer-activities-hours-record/volunteer-activities-hours-records/'+pathSplit[2]+'/', formData, {
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
        } else {
                const formData = {
                    borrower: this.userStore.user.id,
                    name: this.name,
                    category: this.category,
                    hours: this.hours,
                    location_name: this.location_name,
                    event_date: this.event_date,
                    academic_year: this.academic_year,
                    status: 'รอการตรวจสอบ'
                }
                console.log("form data: ", formData)
            if (formData.borrower!=null &&
                formData.name!=null &&
                formData.category!=null &&
                formData.hours!=null &&
                formData.location_name!=null &&
                formData.event_date!=null &&
                formData.academic_year!=null) {
                await axios
                    .put('volunteer-activities-hours-record/volunteer-activities-hours-records/'+pathSplit[2]+'/', formData, {
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
        },
        goToDelete() {
            this.$swal({
                title: this.name,
                text: 'ยืนยันการลบกิจกรรมจิตอาสานี้ใช่หรือไม่',
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
                        this.deleteItems()
                    }
                })
        },
        deleteItems() {
            const pathSplit = this.$route.path.split('/')
            axios.delete('volunteer-activities-hours-record/volunteer-activities-hours-records/'+pathSplit[2])
            .then(response => {
                this.$swal({
                    title: 'ดำเนินการลบบันทึกกิจกรรมจิตอาสาสำเร็จ',
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
            })
        }
    },
}
</script>
<style scoped>
    .v-avatar {
        border: 0px !important;
    }
</style>
