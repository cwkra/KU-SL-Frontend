<template>
    <app-sidebar/>
    <app-navbar/>
    <v-main>
        <app-title title="บันทึกความประสงค์กู้ยืม"/>
        <breadcrumbs :items="items"/>
        <v-card 
        rounded="xl"
        class="mx-8 mt-2">
        <v-form @submit.prevent="onSubmit">
        <v-row class="mx-4 my-2" justify="end">
        <v-btn flat rounded="lg" class="submit mx-2" type="submit">บันทึก</v-btn>
        <router-link :to="{name: 'student-loan-request-record'}">
        <v-btn flat rounded="lg" class="cancel mx-2" type="cancel">ยกเลิก</v-btn>
        </router-link>
        </v-row>
        <card-header title="สร้างบันทึกความประสงค์กู้ยืม"/>
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
                    readonly rounded="pill" variant="outlined"
                    placeholder="รหัสประชาชน" v-model="identity_card_number"/>
                    </v-col>
                </v-row>
                <v-row no-gutters justify="space-between" class="mx-16">
                    <v-col cols="5">
                    <p>รหัสนิสิต</p>
                    <v-text-field 
                    density="compact" bg-color="#D9D9D9"
                    readonly rounded="pill" variant="outlined"
                    placeholder="รหัสนิสิต" v-model="student_id_number"/>
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
                    readonly rounded="pill" variant="outlined"
                    placeholder="ภาควิชา" v-model="department"/>
                    </v-col>
                </v-row>
            </v-card>
            <v-card 
            class="mx-16 my-4 px-4 py-2"
            rounded="xl">
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
                    <v-select
                    density="compact" rounded="pill" 
                    variant="outlined" placeholder="ภาคการศึกษา"
                    v-model="semester" :items="semester_items"/>
                    </v-col>
                </v-row>
                <v-row no-gutters justify="space-between" class="mx-16">
                    <v-col cols="5">
                    <p>ค่าธรรมเนียมการศึกษา</p>
                    <v-text-field 
                    density="compact" :min="1"
                    clearable rounded="pill" variant="outlined"
                    placeholder="ค่าธรรมเนียมการศึกษา"
                    type="number" v-model="tuition_fees"
                    :rules="rules.tuition_fees_rules"/>
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
import CardHeader from '@/components/CardHeader.vue'
import AppTable from '@/components/AppTable.vue'
import SearchBar from '@/components/SearchBar.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { useUserStore } from '@/store/users'
import axios from 'axios'
export default{
    name: 'student-loan-request-record',
    components: {
      AppNavbar,
      AppSidebar,
      AppTitle,
      CardHeader,
      AppTable,
      SearchBar,
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
            borrower: this.userStore.user.id,
            borrower_name: this.userStore.user.name,
            name: this.userStore.user.name,
            identity_card_number: this.userStore.user.identity_card_number,
            student_id_number: this.userStore.user.education.student_id_number,
            faculty: this.userStore.user.education.faculty,
            department: this.userStore.user.education.department,
            academic_year: this.getAcademicYear(),
            semester: 'ภาคต้น',
            tuition_fees: null,
            rules: {
                academic_year_required: value => !!value || 'กรุณาเลือกปีการศึกษา',
                tuition_fees_rules: [
                    value => !!value || 'กรุณากรอกค่าธรรมเนียมการศึกษา', 
                    value => (value > 0) || 'กรุณากรอกค่าธรรมเนียมการศึกษามากกว่า 0 บาท',
                    value => (value < 100000) || 'กรุณากรอกค่าธรรมเนียมการศึกษาน้อยกว่า 100,000 บาท'
                ]
            },
            semester_items: [
                {
                    title: 'ภาคต้น'
                },
                {
                    title: 'ภาคปลาย'
                }
            ],
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
                    title: 'สร้างบันทึกความประสงค์กู้ยืม',
                    disabled: true,
                    href: '/student-loan-request-record/create'
                },
            ]
        }
    },
    methods: {
        async onSubmit() {
            const formData = {
                borrower: this.borrower,
                borrower_name: this.borrower_name,
                academic_year: this.academic_year,
                semester: this.semester,
                tuition_fees: this.tuition_fees
            }
            console.log("form data: ", formData.borrower)
            console.log("form data: ", formData)
            if (formData.academic_year!=null && formData.semester!=null && this.tuition_fees!=null && this.tuition_fees > 0) {
                await axios
                .post('student-loan-request-record/student-loan-request-records/', formData)
                .then(response => {
                    this.sendNotification()
                    this.$swal({
                    title: 'ส่งคำร้องยื่นความประสงค์กู้ยืมสำเร็จ',
                    text: 'กรุณารอการอนุมัติ',
                    showCloseButton: true,
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "#0AAE75",
                    icon: "success",
                    backdrop: false,
                    }).then(result => {
                        if (result.isConfirmed || result.isClosed) {
                            this.$router.push('/student-loan-request-record')
                        }
                    })
                })
                .catch(error => {
                    console.log(error)
                    this.$swal({
                        title: 'ส่งคำร้องยื่นความประสงค์กู้ยืมไม่สำเร็จ ',
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
        sendNotification() {
            const formData = {
                sender: this.userStore.user.id,
                receiver: 1,
                title: 'แจ้งเตือนการยื่นคำร้องความประสงค์กู้ยืมปีการศึกษา',
                message: this.userStore.user.name + ' ได้ยื่นคำร้องยื่นความประสงค์กู้ยืมปีการศึกษา ' + this.academic_year + ' ' + this.semester + ' กรุณาตรวจสอบข้อมูล'
            }
            axios.post('notification/notifications/', formData)
            .catch(error => {
            console.log(error)
            })
        }
    }
}
</script>