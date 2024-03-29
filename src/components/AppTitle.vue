<template>
    <v-card class="py-2 px-8" elevation="1" rounded="0">
    <h2>{{ title }}</h2>
    <v-chip class="pa-4" variant="flat" color="#0AAE75">
        {{ currentDate() }}
    </v-chip>
    </v-card>
</template>


<script>
  export default {
    name: 'app-title',
    props: {
        title: {
            type: String,
            required: true
        }
    },
    methods: {
    currentDate() {
        const current = new Date();
        const todayDate = `วัน${this.getFormatDay()}ที่ ${current.getDate()} ${this.getFormatMonth()} ค.ศ. ${current.getFullYear()}`;
        return todayDate;
    },
    getFormatDay() {
        const current = new Date();
        const num_day = current.getDay()
        var day = ''
        if (num_day == 0) { day = 'อาทิตย์' }
        else if (num_day == 1) { day = 'จันทร์' }
        else if (num_day == 2) { day = 'อังคาร' }
        else if (num_day == 3) { day = 'พุธ' }
        else if (num_day == 4) { day = 'พฤหัสบดี' }
        else if (num_day == 5) { day = 'ศุกร์' }
        else { day = 'เสาร์'}
        return day;
    },
    getFormatMonth() {
        const current = new Date();
        const num_month = current.getMonth()
        var month = ''
        if (num_month == 0) { month = 'มกราคม' }
        else if (num_month == 1) { month = 'กุมภาพันธ์' }
        else if (num_month == 2) { month = 'มีนาคม' }
        else if (num_month == 3) { month = 'เมษายน' }
        else if (num_month == 4) { month = 'พฤษภาคม' }
        else if (num_month == 5) { month = 'มิถุนายน' }
        else if (num_month == 6) { month = 'กรกฎาคม' }
        else if (num_month == 7) { month = 'สิงหาคม' }
        else if (num_month == 8) { month = 'กันยายน' }
        else if (num_month == 9) { month = 'ตุลาคม' }
        else if (num_month == 10) { month = 'พฤศจิกายน' }
        else { month = 'ธันวาคม'}
        return month;
    }
  }
}
</script>