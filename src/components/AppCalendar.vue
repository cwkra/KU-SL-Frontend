<template>
  <v-card rounded="xl" class="my-8 mx-8 text-end ">
      <v-dialog max-width="800" v-if="this.userStore.user.is_staff">
      <template v-slot:activator="{ props: activatorProps }">
      <v-btn 
        flat
        rounded="lg" 
        class="submit my-3 mr-6"
        v-bind="activatorProps"
      >สร้าง
      </v-btn>
      <v-divider :thickness="2"></v-divider>
      </template>

      <template v-slot:default="{ isActive }">
      <v-card id="form" class="py-4 px-8" rounded="xl">
        <v-card-title class="text-center">
          <h2>สร้างกิจกรรม</h2>
        </v-card-title>
        <v-form @submit.prevent="onSubmit">
          <v-row no-gutters justify="space-between">
            <v-col class="mx-4">
              <p>ชื่อกิจกรรม</p>
              <v-text-field 
                clearable
                density="compact"
                rounded="pill" 
                variant="outlined"
                placeholder="ชื่อกิจกรรม"
                v-model="name"
                :rules="[rules.name_required]"/>
              </v-col>

              <v-col class="mx-4">
                <p>สถานที่จัดกิจกรรม</p>
                <v-text-field 
                clearable
                density="compact"
                rounded="pill" 
                variant="outlined"
                placeholder="สถานที่จัดกิจกรรม"
                v-model="location_name"
                :rules="[rules.location_name_required]"/>
            </v-col>
          </v-row>
          <v-row no-gutters justify="space-between">
            <v-col class="mx-4">
            <p>วันที่เริ่มกิจกรรม</p>
            <v-text-field 
              density="compact"
              rounded="pill" 
              variant="outlined"
              type="date"
              placeholder="วันที่เริ่มกิจกรรม"
              :max="end_date"
              :rules="[rules.date_required]"
              v-model="start_date"/>
            </v-col>

            <v-col class="mx-4">
              <p>วันที่สิ้นสุดกิจกรรม</p>
              <v-text-field
                density="compact"
                rounded="pill" 
                variant="outlined"
                type="date"
                placeholder="วันที่สิ้นสุดกิจกรรม"
                :min="start_date"
                :rules="[rules.date_required]"
                v-model="end_date"/>
            </v-col>
          </v-row>
          <v-row no-gutters justify="space-between">
            <v-col class="mx-4">
              <p>เวลาที่เริ่มกิจกรรม</p>
              <v-text-field
                density="compact"
                clearable
                rounded="pill" 
                variant="outlined"
                placeholder="เวลาที่เริ่มกิจกรรม"
                type="time"
                :max="end_time"
                :rules="rules.start_time_rules"
                v-model="start_time"/>
            </v-col>
            <v-col class="mx-4">
              <p>เวลาที่สิ้นสุดกิจกรรม</p>
              <v-text-field 
                density="compact"
                clearable
                rounded="pill" 
                variant="outlined"
                placeholder="เวลาที่สิ้นสุดกิจกรรม"
                type="time"
                :min="start_time"
                :rules="rules.end_time_rules"
                v-model="end_time"/>
              </v-col>
            </v-row>
            <v-row no-gutters justify="space-between">
              <v-col class="mx-4">
                <p>คำอธิบายกิจกรรม</p>
                <v-textarea 
                  clearable 
                  variant="outlined"
                  rounded="lg"
                  placeholder="คำอธิบาย"
                  row-height="30"
                  rows="5"
                  no-resize
                  v-model="description"/>
                </v-col>
            </v-row>
        <v-card-actions class="justify-center">
          <v-btn 
            flat
            rounded="lg" 
            class="submit mx-2"
            type="submit"
          >บันทึก
          </v-btn>
          <v-btn
            flat
            rounded="lg" 
            class="cancel mx-2"
            @click="isActive.value = false; onCancel()"
          >ยกเลิก</v-btn>
        </v-card-actions>
        </v-form>
      </v-card>
    </template>
    </v-dialog>

    <v-calendar
      :masks="{ dayPopover: 'WWWW D MMMM YYYY', weekdays: 'WWWW' }"
      ref="calendar"
      expanded
      header-title
      borderless
      :attributes='datesItems'
      locale="th"
      @did-move="pageChange"
      class="pa-4">
      <template #header-title="{ title }">
        <v-btn
        variant="text">
          <h2>{{ title }}</h2>
        </v-btn>
      </template>
      <template #header-prev-button>
        <v-btn 
        icon="mdi-chevron-left"
        variant="text"
        size="xl"
        @click="movePrev"
        />
      </template>
      <template #header-next-button>
        <v-btn 
        icon="mdi-chevron-right"
        variant="text"
        size="xl"
        @click="moveNext"
        />
      </template>
    </v-calendar>
  </v-card>
  <v-card
  class="mx-8 my-2"
  rounded="xl">
  <v-card-title class="text-center my-4"><h3>กิจกรรม</h3></v-card-title>
  <v-card
    class="ma-4"
    rounded="xl"
    elevation="4"
    v-for="(item, i) in currentEventItems"
    :key="i"
    :value="item">
    <v-row class="justify-space-between" style="color: #fff; background-color: #0AAE75;">
      <v-col align-self="center"><v-card-title>{{ item.name }}</v-card-title></v-col>
        <v-col cols="2" align="end">
          <div class="my-2 mx-4">
            <v-dialog max-width="800" v-if="this.userStore.user.is_staff">
              <template v-slot:activator="{ props: activatorProps }">
                <v-responsive min-width="100" max-width="100" class="py-2" align="center">
                  <v-btn 
                  class="primary mr-4" 
                  rounded="xl" 
                  size="x-small" 
                  icon="mdi-pencil" 
                  v-bind="activatorProps"
                  style="outline: 3px solid #fff;"
                  @click="goToEdit(item)">
                  </v-btn>
                  <v-btn
                    class="cancel"
                    rounded="xl"
                    size="x-small"
                    icon="mdi-delete"
                    style="outline: 3px solid #fff;"
                    @click="goToDelete(item)">
                  </v-btn>
              </v-responsive>
              </template>
              <template v-slot:default="{ isActive }">
                <v-card id="form" class="py-4 px-8" rounded="xl">
                  <v-card-title class="text-center"><h2>แก้ไขกิจกรรม</h2></v-card-title>
                    <v-form @submit.prevent="onEditSubmit">
                      <v-row no-gutters justify="space-between">
                        <v-col class="mx-4">
                          <p>ชื่อกิจกรรม</p>
                          <v-text-field 
                            clearable
                            density="compact"
                            rounded="pill" 
                            variant="outlined"
                            placeholder="ชื่อกิจกรรม"
                            v-model="name"
                            :rules="[rules.name_required]"/>
                        </v-col>

                        <v-col class="mx-4">
                          <p>สถานที่จัดกิจกรรม</p>
                          <v-text-field 
                            clearable
                            density="compact"
                            rounded="pill" 
                            variant="outlined"
                            placeholder="สถานที่จัดกิจกรรม"
                            v-model="location_name"
                            :rules="[rules.location_name_required]"/>
                        </v-col>
                      </v-row>

                      <v-row no-gutters justify="space-between">
                        <v-col class="mx-4">
                          <p>วันที่เริ่มกิจกรรม</p>
                          <v-text-field 
                            density="compact"
                            rounded="pill" 
                            variant="outlined"
                            type="date"
                            placeholder="วันที่เริ่มกิจกรรม"
                            :max="end_date"
                            :rules="[rules.date_required]"
                            v-model="start_date"/>
                        </v-col>

                        <v-col class="mx-4">
                          <p>วันที่สิ้นสุดกิจกรรม</p>
                          <v-text-field
                            density="compact"
                            rounded="pill" 
                            variant="outlined"
                            type="date"
                            placeholder="วันที่สิ้นสุดกิจกรรม"
                            :min="start_date"
                            :rules="[rules.date_required]"
                            v-model="end_date"/>
                        </v-col>
                      </v-row>

                      <v-row no-gutters justify="space-between">
                        <v-col class="mx-4">
                          <p>เวลาที่เริ่มกิจกรรม</p>
                          <v-text-field
                            density="compact"
                            clearable
                            rounded="pill" 
                            variant="outlined"
                            placeholder="เวลาที่เริ่มกิจกรรม"
                            type="time"
                            :max="end_time"
                            :rules="rules.start_time_rules"
                            v-model="start_time"/>
                        </v-col>
                        <v-col class="mx-4">
                          <p>เวลาที่สิ้นสุดกิจกรรม</p>
                          <v-text-field 
                            density="compact"
                            clearable
                            rounded="pill" 
                            variant="outlined"
                            placeholder="เวลาที่สิ้นสุดกิจกรรม"
                            type="time"
                            :min="start_time"
                            :rules="rules.end_time_rules"
                            v-model="end_time"/>
                        </v-col>
                      </v-row>

                      <v-row no-gutters justify="space-between">
                        <v-col class="mx-4">
                          <p>คำอธิบายกิจกรรม</p>
                          <v-textarea 
                            clearable 
                            variant="outlined"
                            rounded="lg"
                            placeholder="คำอธิบาย"
                            row-height="30"
                            rows="5"
                            no-resize
                            v-model="description"/>
                        </v-col>
                      </v-row>

                      <v-card-actions class="justify-center">
                        <v-btn 
                          flat
                          rounded="lg" 
                          class="submit mx-2"
                          type="submit"
                        >บันทึก
                        </v-btn>
                        <v-btn
                          flat
                          rounded="lg" 
                          class="cancel mx-2"
                          @click="isActive.value = false; onCancel()"
                        >ยกเลิก</v-btn>
                    </v-card-actions>
                  </v-form>
                </v-card>
              </template>
            </v-dialog>
          </div>
          </v-col>
        </v-row>
      <v-card-text class="mt-2">
        <p><strong>วันที่จัดกิจกรรม:</strong> {{ setDateFormat(item.start_date, item.end_date) }}</p>
        <p><strong>เวลาที่จัดกิจกรรม:</strong> {{ setTimeFormat(item.start_time) }} - {{ setTimeFormat(item.end_time) }} น.</p>
        <p><strong>สถานที่จัดกิจกรรม:</strong> {{ item.location_name }}</p>
        <p v-if="item.description!=null"><strong>คำอธิบายกิจกรรม</strong></p>
        <v-textarea 
        class="mt-2" 
        v-if="item.description!=null" 
        readonly 
        v-model="item.description" 
        rounded="xl" 
        auto-grow 
        no-resize 
        variant="outlined">
        </v-textarea>
      </v-card-text>
    </v-card>
  </v-card>
</template>


<script>
import { useUserStore } from '@/store/users'
import axios from 'axios'
import { ref } from 'vue';

export default {
  name: 'app-calendar',
  setup() {
        const userStore = useUserStore()
        return {
            userStore
        }
  },
  data() {
    return {
      pages: null,
      currentEventItems: [],
      id: null,
      name: null,
      location_name: null,
      start_date: null,
      end_date: null,
      start_time: null,
      end_time: null,
      description: null,
      dialogForm: false,
      eventItems: [],
      datesItems: [],
      rules: {
          name_required: value => !!value || 'กรุณากรอกชื่อกิจกรรม',
          location_name_required: value => !!value || 'กรุณากรอกสถานที่จัดกิจกรรม',
          date_required: value => !!value || 'กรุณาเลือกวันที่',
          time_rules: [
           value => !!value || 'กรุณาเลือกเวลา' 
          ],
          start_time_rules: [
            value => !!value || 'กรุณาเลือกเวลา',
            value => value <= this.end_time || 'กรุณาเลือกเวลาที่เริ่มกิจกรรมก่อนเวลาที่สิ้นสุดกิจกรรม'
          ],
          end_time_rules: [
            value => !!value || 'กรุณาเลือกเวลา',
            value => (this.start_time <= value) || 'กรุณาเลือกเวลาที่สิ้นสุดกิจกรรมหลังเวลาที่เริ่มกิจกรรม'
          ],
          academic_year_required: value => !!value || 'กรุณาเลือกปีการศึกษา',
          tuition_fees_rules: [
            value => !!value || 'กรุณากรอกค่าธรรมเนียมการศึกษา', 
            value => (value > 0) || 'กรุณากรอกค่าธรรมเนียมการศึกษามากกว่า 0 บาท'
        ]
      }
    }
  },
  mounted() {
    this.getEventItems()
  },
  methods: {
    async onSubmit() {
      const formData = {
        name: this.name,
        location_name: this.location_name,
        start_date: this.start_date,
        end_date: this.end_date,
        start_time: this.start_time,
        end_time: this.end_time,
        description: this.description,
      }
      console.log("form data: ", formData)
      if ( formData.name!=null &&
            formData.location_name!=null &&
            formData.start_date!=null &&
            formData.end_date!=null &&
            formData.start_time!=null &&
            formData.end_time!=null &&
            (formData.start_time <= formData.end_time)) {
              await axios
              .post('event/events/', formData)
                .then(response => {
                  this.$swal({
                    title: 'สร้างกิจกรรมสำเร็จ',
                    showCloseButton: true,
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "#0AAE75",
                    icon: "success",
                    backdrop: false,
                    target: document.getElementById('form'),
                  }).then(result => {
                      if (result.isConfirmed || result.isClosed) {
                        this.$router.go(0)
                      }
                  })
                })
                .catch(error => {
                    console.log(error)
                    this.$swal({
                        title: 'สร้างกิจกรรมไม่สำเร็จ ',
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
    onCancel() {
      this.name = null
      this.location_name = null
      this.start_date = null
      this.end_date = null
      this.start_time = null
      this.end_time = null
      this.description = null
    },
    movePrev() {
      this.getEventItems()
    },
    moveNext() {
      this.getEventItems()
    },
    getEventItems() {
      axios.get('event/events/')
      .then(response => {
        this.eventItems = response.data
        console.log('event items:', this.eventItems)
        console.log('event items month:', parseInt(this.eventItems[0].start_date.split('-')[1]))
        this.setDateItems()
        this.getCurrentEvent()
      })
      .catch(error => {
        console.log(error)
      })
    },
    setDateItems() {
      const items = []
      items.push({highlight: {style: { borderColor: '#6cceac'}, contentStyle: { color: '#000' }, fillMode: 'outline'}, dates: new Date()})
      for (let i = 0; i < this.eventItems.length; i++) {
        items.push({ highlight: { start: { style: { backgroundColor: '#6cceac' }, contentStyle: { color: '#000'}},
            base: { style: { backgroundColor: '#b5e6d5' }, contentStyle: { color: '#000'}},
            end: { style: { backgroundColor: '#6cceac' }, contentStyle: { color: '#000' }}},
            dates: { start: new Date(this.eventItems[i].start_date), end: new Date(this.eventItems[i].end_date)},
            popover: { label: this.eventItems[i].name, visibility: 'click'}})
      }
      this.datesItems = items
    },
    getCurrentEvent() {
      this.pages = this.$refs.calendar.pages
      console.log('this.$refs.calendar:', this.$refs.calendar)
      const event = []
      for (let i = 0; i < this.eventItems.length; i++) {
        
        if ((this.pages[0].month == parseInt(this.eventItems[i].start_date.split('-')[1])) ||
            (this.pages[0].month == parseInt(this.eventItems[i].end_date.split('-')[1]))) {
            event.push(this.eventItems[i])
        }
      }
      this.currentEventItems = event
      console.log(this.currentEventItems)
    },
    pageChange() {
      console.log('page change', this.$refs.calendar.pages)
      this.getCurrentEvent()
    },
    setDateFormat(value1, value2) {
      if (value1 == value2) {
        const date = value1.split('-')
        let day = date[2]
        let month = date[1]
        let year = date[0]
        return day + ' ' + this.getMonth(month) + ' ค.ศ. ' + year
      } else {
        const date1 = value1.split('-')
        const date2 = value2.split('-')
        let day1 = date1[2], day2 = date2[2]
        let month1 = date1[1], month2 = date2[1]
        let year1 = date2[0], year2 = date2[0]
        return day1 + ' ' + this.getMonth(month1) + ' ค.ศ. ' + year1 + ' - ' + 
               day2 + ' ' + this.getMonth(month2) + ' ค.ศ. ' + year2
      }
    },
    getMonth(value) {
      if (value == '01') { return 'มกราคม' }
        else if (value == '02') { return 'กุมภาพันธ์'}
        else if (value == '03') { return 'มีนาคม'}
        else if (value == '04') { return 'เมษายน'}
        else if (value == '05') { return 'พฤษภาคม'}
        else if (value == '06') { return 'มิถุนายน'}
        else if (value == '07') { return 'กรกฎาคม'}
        else if (value == '08') { return 'สิงหาคม'}
        else if (value == '09') { return 'กันยายน'}
        else if (value == '10') { return 'ตุลาคม'}
        else if (value == '11') { return 'พฤศจิกายน'}
        else { return 'ธันวาคม'}
    },
    setTimeFormat(value) {
      const time = value.split(':')
      return time[0] + ':' + time[1]
    },
    goToEdit(value) {
      this.id = value.id
      this.name = value.name
      this.location_name = value.location_name
      this.start_date = value.start_date
      this.end_date = value.end_date
      this.start_time = value.start_time
      this.end_time = value.end_time
      this.description = value.description
    },
    onEditSubmit() {
      const formData = {
        name: this.name,
        location_name: this.location_name,
        start_date: this.start_date,
        end_date: this.end_date,
        start_time: this.start_time,
        end_time: this.end_time,
        description: this.description,
      }
      console.log("form data: ", formData)
      if ( formData.name!=null &&
            formData.location_name!=null &&
            formData.start_date!=null &&
            formData.end_date!=null &&
            formData.start_time!=null &&
            formData.end_time!=null &&
            (formData.start_time <= formData.end_time)) {
            axios.put('event/events/'+this.id+'/', formData)
                .then(response => {
                  this.$swal({
                    title: 'แก้ไขกิจกรรมสำเร็จ',
                    showCloseButton: true,
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "#0AAE75",
                    icon: "success",
                    backdrop: false,
                    target: document.getElementById('form'),
                  }).then(result => {
                      if (result.isConfirmed || result.isClosed) {
                        this.$router.go(0)
                      }
                  })
                })
                .catch(error => {
                    console.log(error)
                    this.$swal({
                        title: 'แก้ไขกิจกรรมไม่สำเร็จ ',
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
    goToDelete(value) {
      this.$swal({
        title: value.name,
        text: 'ยืนยันการลบกิจกรรมนี้ใช่หรือไม่',
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
      axios.delete('event/events/'+value.id)
      .then(response => {
        this.$swal({
          title: 'ดำเนินการลบกิจกรรมสำเร็จ',
          showCloseButton: true,
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#0AAE75",
          icon: "success",
          backdrop: false,
          }).then(result => {
            if (result.isConfirmed || result.isClosed) {
              this.$router.push('/')
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
<style scoped>
  
</style>