<template>
    <app-sidebar/>
    <app-navbar/>
    <v-main>
        <app-title title="บันทึกความประสงค์กู้ยืม"/>
        <breadcrumbs :items="items"/>
        <v-card rounded="xl" class="mx-8 mt-2">
        <v-row class="mx-4 my-2 justify-space-between">
        <router-link :to="{name: 'admin-student-loan-request-record'}">
        <v-btn flat rounded="lg" class="primary">ย้อนกลับ</v-btn>
        </router-link>
        <div v-if="status=='รอการตรวจสอบ'">
            <v-btn flat rounded="lg" class="submit mx-2"
            @click="approveRequest"
            >อนุมัติ</v-btn>
            <v-btn flat rounded="lg" class="cancel mx-2" @click="denyRequest"
            >ไม่อนุมัติ</v-btn>
        </div>
        </v-row>
        <card-header title="รายละเอียดบันทึกความประสงค์กู้ยืม"/>
        <v-card class="mx-16 my-4 px-4 py-2" rounded="xl">
                <v-row no-gutters justify="space-between" class="mx-16">
                    <v-col cols="5">
                    <p>ชื่อ-นามสกุล</p>
                    <v-text-field 
                    density="compact" bg-color="#D9D9D9"
                    readonly rounded="pill" 
                    variant="outlined" placeholder="ชื่อ-นามสกุล" v-model="name"/>
                    </v-col>
                    <v-col cols="5">
                    <p>รหัสประชาชน</p>
                    <v-text-field 
                    density="compact" bg-color="#D9D9D9" readonly rounded="pill" 
                    variant="outlined" placeholder="รหัสประชาชน"
                    v-model="identity_card_number"/>
                    </v-col>
                </v-row>
                <v-row no-gutters justify="space-between" class="mx-16">
                    <v-col cols="5">
                    <p>รหัสนิสิต</p>
                    <v-text-field 
                    density="compact" bg-color="#D9D9D9" readonly rounded="pill" 
                    variant="outlined" placeholder="รหัสนิสิต"
                    v-model="student_id_number"/>
                    </v-col>
                    <v-col cols="5">
                    <p>คณะ</p>
                    <v-text-field 
                    density="compact" bg-color="#D9D9D9" readonly
                    rounded="pill" variant="outlined" placeholder="คณะ" v-model="faculty"/>
                    </v-col>
                </v-row>
                <v-row no-gutters justify="space-between" class="mx-16">
                    <v-col cols="5">
                    <p>ภาควิชา</p>
                    <v-text-field 
                    density="compact" bg-color="#D9D9D9" readonly rounded="pill" 
                    variant="outlined" placeholder="ภาควิชา" v-model="department"/>
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
                    bg-color="#D9D9D9" density="compact" readonly rounded="pill" 
                    variant="outlined" placeholder="ภาคการศึกษา" v-model="semester"/>
                    </v-col>
                </v-row>
                <v-row no-gutters justify="space-between" class="mx-16">
                    <v-col cols="5">
                    <p>ค่าธรรมเนียมการศึกษา</p>
                    <v-text-field 
                    bg-color="#D9D9D9" density="compact" :min="1" readonly rounded="pill" 
                    variant="outlined" placeholder="ค่าธรรมเนียมการศึกษา" type="number"
                    v-model="tuition_fees"/>
                    </v-col>
                    <v-col cols="5">
                    <p>สถานะ</p>
                    <v-text-field bg-color="#D9D9D9" density="compact" readonly
                    rounded="pill" variant="outlined" placeholder="สถานะ" v-model="status"/>
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
                    href: '/admin/student-loan-request-record'
                },
                {
                    title: 'รายละเอียด',
                    disabled: true
                },
            ],
            borrower_id: null,
            borrower_name: null,
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
                this.borrower_id = response.data.id
                this.borrower_name = response.data.name
                this.name = response.data.name
                this.identity_card_number = response.data.identity_card_number
                this.student_id_number = response.data.education.student_id_number
                this.faculty = response.data.education.faculty
                this.department = response.data.education.department
            })
            .catch(error => {
                console.log(error)
            })
        },
        approveRequest() {
            this.status = 'อนุมัติ'
            const formData = {
                borrower: this.borrower_id,
                academic_year: this.academic_year,
                semester: this.semester,
                status: this.status
            }
            axios.put('student-loan-request-record/student-loan-request-records/'+this.$route.params.id+'/', formData)
            .then(response => {
                    this.sendNotification()
                    this.$swal({
                    title: 'ตรวจสอบคำร้องยื่นความประสงค์กู้ยืมสำเร็จ',
                    showCloseButton: true,
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "#0AAE75",
                    icon: "success",
                    backdrop: false,
                    }).then(result => {
                        if (result.isConfirmed || result.isClosed) {
                            this.$router.push('/admin/student-loan-request-record')
                        }
                    })
                })
            .catch(error => {
                console.log(error)
                console.log(error)
                this.$swal({
                    title: 'ตรวจสอบคำร้องยื่นความประสงค์กู้ยืมไม่สำเร็จ',
                    showCloseButton: true,
                    text: "กรุณาตรวจสอบข้อมูลอีกครั้ง",
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "#0AAE75",
                    icon: "error",
                    backdrop: false
                });
            })
        },
        denyRequest() {
            this.status = 'ไม่อนุมัติ'
            const formData = {
                borrower: this.borrower_id,
                academic_year: this.academic_year,
                semester: this.semester,
                status: this.status
            }
            axios.put('student-loan-request-record/student-loan-request-records/'+this.$route.params.id+'/', formData)
            .then(response => {
                    this.sendNotification()
                    this.$swal({
                    title: 'ตรวจสอบคำร้องยื่นความประสงค์กู้ยืมสำเร็จ',
                    showCloseButton: true,
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "#0AAE75",
                    icon: "success",
                    backdrop: false,
                    }).then(result => {
                        if (result.isConfirmed || result.isClosed) {
                            this.$router.push('/admin/student-loan-request-record')
                        }
                    })
                })
            .catch(error => {
                console.log(error)
                console.log(error)
                this.$swal({
                    title: 'ตรวจสอบคำร้องยื่นความประสงค์กู้ยืมไม่สำเร็จ',
                    showCloseButton: true,
                    text: "กรุณาตรวจสอบข้อมูลอีกครั้ง",
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "#0AAE75",
                    icon: "error",
                    backdrop: false
                });
            })
        },
        sendNotification() {
            if (this.status=='อนุมัติ') {
                const formData = {
                    sender: this.userStore.user.id,
                    receiver: this.borrower_id,
                    title: 'แจ้งผลการยื่นคำร้องความประสงค์กู้ยืม',
                    message: 'คำร้องความประสงค์กู้ยืมปีการศึกษา ' + this.academic_year + ' ' + this.semester + ' ได้รับการอนุมัติ'
                }
                axios.post('notification/notifications/', formData)
                .catch(error => {
                console.log(error)
                })
            } else {
                const formData = {
                    sender: this.userStore.user.id,
                    receiver: this.borrower_id,
                    title: 'แจ้งผลการยื่นคำร้องความประสงค์กู้ยืม',
                    message: 'คำร้องความประสงค์กู้ยืมปีการศึกษา ' + this.academic_year + ' ' + this.semester + ' ไม่ได้รับการอนุมัติ'
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