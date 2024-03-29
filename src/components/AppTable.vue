<template>  
    <v-data-table
    item-value="name"
    no-data-text='ไม่มีข้อมูล'
    items-per-page="5"
    density="compact"
  >
  <template v-slot:item.create_date="{ item }">
    <span>{{ formatDate(item.create_date) }}</span>
  </template>

  <template v-slot:item.admin_request_action="{ item }">
    <span>
      <v-btn 
        variant="outlined"
        rounded="pill" 
        class="info mx-2 my-2"
        @click="goToAdminRRDetail(item)"
      >ดูรายละเอียด
      </v-btn>
    </span>
  </template>

  <template v-slot:item.request_action="{ item }">
    <span>
      <v-btn 
        variant="outlined"
        rounded="pill" 
        class="info mx-2 my-2"
        @click="goToRRDetail(item)"
      >ดูรายละเอียด
      </v-btn>
    </span>
  </template>

  <template v-slot:item.admin_activity_action="{ item }">
    <span>
      <v-btn 
        variant="outlined"
        rounded="pill" 
        class="info mx-2 my-2"
        @click="goToAdminVADetail(item)"
      >ดูรายละเอียด
      </v-btn>
    </span>
  </template>

  <template v-slot:item.activity_action="{ item }">
    <span>
      <v-btn 
        variant="outlined"
        rounded="pill" 
        class="info mx-2 my-2"
        @click="goToVADetail(item)"
      >ดูรายละเอียด
      </v-btn>
    </span>
    <span v-if="item.status=='รอการยืนยัน'">
      <v-btn 
        rounded="pill" 
        class="submit mx-2 my-2"
        @click="sendToApprove(item)"
      >ยื่นตรวจสอบ
      </v-btn>
    </span>
  </template>
  </v-data-table>
</template>

<script>
import axios from 'axios'

export default{
    name: 'app-table',
    methods: {
      formatDate(value) {
        const date = new Date(value).toLocaleString().split('/')
        const year = date[2].split(',')
        const month = date[0]
        return date[1] + ' ' + this.getMonth(month) + ' ค.ศ. ' + year[0]
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
      goToAdminVADetail(value) {
        this.$router.push({
          name: 'admin-volunteer-activity-hours-record-detail',
          params: {
            id: value.id
          }
        })
      },
      goToVADetail(value) {
        this.$router.push({
          name: 'volunteer-activity-hours-record-detail',
          params: {
            id: value.id
          }
        })
      },
      goToAdminRRDetail(value) {
        this.$router.push({
          name: 'admin-student-loan-request-record-detail',
          params: {
            id: value.id
          }
        })
      },
      goToRRDetail(value) {
        this.$router.push({
          name: 'student-loan-request-record-detail',
          params: {
            id: value.id
          }
        })
      },
      sendToApprove(value) {
            const formData = {
                borrower: value.borrower,
                name: value.name,
                category: value.category,
                hours: value.hours,
                location_name: value.location_name,
                academic_year: value.academic_year,
                event_date: value.event_date,
                status: 'รอการตรวจสอบ'
            }
            axios.put('volunteer-activities-hours-record/volunteer-activities-hours-records/'+value.id+'/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    this.sendNotification(value)
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
                            this.$router.go(0)
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
        sendNotification(value) {
            const formData = {
                sender: value.borrower,
                receiver: 1,
                title: 'แจ้งเตือนการยื่นตรวจสอบชั่วโมงกิจกรรมจิตอาสา',
                message: value.borrower_name + ' ได้ยื่นตรวจสอบกิจกรรม \"' + value.name + '\" กรุณาตรวจสอบข้อมูล'
            }
            axios.post('notification/notifications/', formData)
                .catch(error => {
                console.log(error)
                })
        }
      }
}
</script>