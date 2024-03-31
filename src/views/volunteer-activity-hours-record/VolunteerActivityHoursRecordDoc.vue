<template>
    <header>
        <v-row class="align-center">
            <v-col align="center">
                <v-avatar
                rounded="0"
                size="100"
                image="/src/assets/logo01.png">
                </v-avatar>
            </v-col>
            <v-col cols="8">
                <h4>
                    แบบบันทึกการเข้าร่วมกิจกรรม/โครงการจิตอาสาไม่น้อยกว่า 36 ชั่วโมงต่อปีการศึกษา
                    <br/>
                    สำหรับนิสิตกองทุนฯ กยศ. และ กรอ. มหาวิทยาลัยเกษตรศาสตร์ บางเขน
                    <br/>
                    (เพื่อใช้ประกอบการกู้ยืมฯ ประจำปีการศึกษา {{ this.getYear() }})
                </h4>
            </v-col>
            <v-col align="center">
                <v-avatar
                rounded="0"
                size="100"
                image="/src/assets/logo02.png">
                </v-avatar>
            </v-col>
        </v-row>
        <v-divider class="border-opacity-25 mx-8 mb-2"></v-divider>
    </header>
    <v-main>
        <v-row>
        <v-col cols="10">
        <v-row class="mx-4">
            <v-col><p>ชื่อ-นามสกุล: {{ this.userStore.user.name }}</p></v-col>
            <v-col><p>คณะ: {{ this.userStore.user.education.faculty }}</p></v-col>
            <v-col><p>ภาควิชา: {{ this.userStore.user.education.department }}</p></v-col>
        </v-row>
        <v-divider class="border-opacity-25 my-2 mx-8"></v-divider>
        <v-row class="mx-4">
            <v-col><p>รหัสนิสิต: {{ this.userStore.user.education.student_id_number }}</p></v-col>
            <v-col><p>เบอร์โทร: {{ this.userStore.user.tel_number }}</p></v-col>
            <v-col><p>ระดับ: {{ this.userStore.user.education.education_level }}</p></v-col>
        </v-row>
        <v-divider class="border-opacity-25 my-2 mx-8"></v-divider>
        <v-row class="mx-4">
            <v-col cols="4"><p>ยื่นกู้ภาคเรียน: ภาคต้น {{ this.getYear() }}</p></v-col>
            <v-col><p>วันที่ยื่นความประสงค์กู้ยืม: {{ this.formatDate(this.requestDateItems.create_date) }}</p></v-col>
        </v-row>
        </v-col>
        <v-col>
            <v-avatar
                rounded="0"
                size="80"
                :image="this.userStore.user.image">
            </v-avatar>
        </v-col>
        </v-row>
        <v-divider class="border-opacity-25 my-2 mx-8"></v-divider>
        <v-table density="compact" class="ml-8">
            <thead>
                <tr>
                    <th class="text-center">ลำดับ</th>
                    <th class="text-left">ชื่อกิจกรรม</th>
                    <th class="text-left">สถานที่จัดกิจกรรม</th>
                    <th class="text-left">วันที่จัดกิจกรรม</th>
                    <th class="text-left">ประเภทกิจกรรม</th>
                    <th class="text-center">สถานะ</th>
                    <th class="text-center">ชั่วโมงกิจกรรม</th>
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="(item, i) in passItems"
                :key="i"
                :value="item">
                    <td class="text-center td-index">{{ i+1 }}</td>
                    <td class="td-name">{{ item.name }}</td>
                    <td class="td-location">{{ item.location_name }}</td>
                    <td>{{ this.setDate(item.event_date) }}</td>
                    <td>{{ item.category }}</td>
                    <td class="text-center">{{ item.status }}</td>
                    <td class="text-center">{{ item.hours }}</td>
                </tr>
                <tr>
                    <td></td><td></td><td></td><td></td><td></td>
                    <td class="text-center">รวม: </td>
                    <td class="text-center">{{ totalHours }} ชั่วโมง</td>
                </tr>
            </tbody>
        </v-table>
    </v-main>
    <v-footer>
        <v-row class="justify-space-between">
            <v-col>
                <v-btn 
                    @click="printDocument"
                    flat
                    rounded="lg" 
                    class="primary mx-2 footer-btn"
                    >พิมพ์เอกสาร
                </v-btn>
            </v-col>
            <v-col cols="5" align="center">
                <v-divider class="border-opacity-25 mx-2 mb-4"></v-divider>
                <p>เจ้าหน้าที่หน่วยกองทุนเงินให้กู้ยืมเพื่อการศึกษา</p>
            </v-col>
        </v-row>
    </v-footer>
</template>

<script>
import { useUserStore } from '@/store/users'
import axios from 'axios'
export default {
    name: 'volunteer-activity-hours-record-doc',
    setup() {
        const userStore = useUserStore()
        return {
            userStore
        }
    },
    data() {
        return {
            totalHours: 0,
            passItems: [],
            requestDateItems: [],
        }
    },
    mounted() {
        const pathSplit = this.$route.path.split('/')
        window.document.title = this.userStore.user.education.student_id_number + '_บันทึกการเข้าร่วมกิจกรรมจิตอาสา_' + pathSplit[2]
        this.getPassItems()
        this.getRequestDate()
    },
    methods: {
        getPassItems() {
            const pathSplit = this.$route.path.split('/')
            axios.get('volunteer-activities-hours-record/volunteer-activities-hours-records/?borrower='+this.userStore.user.id+'&academic_year='+pathSplit[2]+'&status=ผ่าน')
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
        setDate(date) {
            const old_date = date.split('-')
            return this.setFormatDay(old_date[2]) + ' ' + this.setFormatMonth(old_date[1]) + ' ' + this.setFormatYear(old_date[0])
        },
        setFormatDay(day) {
            const dayDigit = day.trim()
            if (dayDigit[0] == '0') {
                return dayDigit[1]
            } else {
                return day
            }
        },
        setFormatMonth(month) {
            var monthName = ''
            if (month == '00' || month == 1) { monthName = 'มกราคม' }
            else if (month == '01' || month == 2) { monthName = 'กุมภาพันธ์' }
            else if (month == '02' || month == 3) { monthName = 'มีนาคม' }
            else if (month == '03' || month == 4) { monthName = 'เมษายน' }
            else if (month == '04' || month == 5) { monthName = 'พฤษภาคม' }
            else if (month == '05' || month == 6) { monthName = 'มิถุนายน' }
            else if (month == '06' || month == 7) { monthName = 'กรกฎาคม' }
            else if (month == '07' || month == 8) { monthName = 'สิงหาคม' }
            else if (month == '08' || month == 9) { monthName = 'กันยายน' }
            else if (month == '09' || month == 10) { monthName = 'ตุลาคม' }
            else if (month == '10' || month == 11) { monthName = 'พฤศจิกายน' }
            else { monthName = 'ธันวาคม'}

            return monthName;
        },
        setFormatYear(year) {
            var numYear = parseInt(year)
            return numYear+543
        },
        getYear() {
            const pathSplit = this.$route.path.split('/')
            return pathSplit[2]
        },
        getRequestDate() {
            (console.log('GET REQUEST DATE'))
            const pathSplit = this.$route.path.split('/')
            axios.get('student-loan-request-record/student-loan-request-records/?borrower='+this.userStore.user.id+'&academic_year='+pathSplit[2]+'&semester=ภาคต้น&status=อนุมัติ') 
            .then(response => {
                this.requestDateItems = response.data[0]
                console.log(response.data[0])
            })
            .catch(error => {
                console.log(error)
            })
        },
        formatDate(value) {
            let date = new Date(value).toLocaleString().split(", ")
            let new_date = date[0].split('/')
            
            console.log(new_date)
            return new_date[1] + ' ' + this.setFormatMonth(new_date[0]) + ' ' + this.setFormatYear(new_date[2])
        },
        printDocument() {
            window.print()
        }
    },
}
</script>
<style scoped>
    * {
        font-family: 'Sarabun', sans-serif;
        background-color: #fff;
    }
    h4 {
        text-align: center;
        font-size: 14px;
    }
    .v-table {
        padding: none !important;
        border-radius: 0px !important;
        box-shadow: none;
        width: 90%;
    }
    th {
        margin: none !important;
        padding: none !important;
    }
    td {
        margin: none !important;
        padding: none !important;
        word-wrap: break-word;
    }
    .td-index {
        max-width: 50px;
    }
    .td-name {
        max-width: 200px;
    }
    .td-location {
        max-width: 100px;
        word-wrap: break-word;
    }
    .td-category {
        max-width: 200px;
        word-wrap: break-word;
    }
    .v-avatar {
        border: 0px !important;
    }
    p {
        font-size: 14px;
    }
    @media print{
        .footer-btn {
            display: none !important;
        }
    }
</style>