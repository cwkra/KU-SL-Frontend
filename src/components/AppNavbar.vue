<template>
    <v-app-bar color="#292929" v-if="userStore.user.access">
        <v-responsive class="text-center"><h4>ระบบกองทุนเงินให้กู้ยืมเพื่อการศึกษา มหาวิทยาลัยเกษตรศาสตร์</h4></v-responsive>
        <v-menu location="bottom" :close-on-content-click="false">
            <template v-slot:activator="{ props }">
                <v-btn 
                v-bind="props"
                class="mx-4">
                    <v-badge
                        color="error"
                        dot
                        floating
                        icon size="x-small"
                        v-if="isRead"
                    >
                    <v-icon icon="mdi-bell"></v-icon>
                    </v-badge>
                    <v-icon 
                    v-if="!isRead"
                    icon="mdi-bell"></v-icon>
                </v-btn>
            </template>
            <v-list 
            class="ma-2" 
            rounded="lg"
            width="300"
            height="300"
            >
            <v-list-item-title class="ma-2">รายการแจ้งเตือน</v-list-item-title>
            <v-divider 
                :thickness="2">
            </v-divider>
            <v-list-group
            v-if="notificationItems"
            v-for="(item, i) in notificationItems"
            :key="i"
            :value="item"
            @mouseleave="getNotification">
            <template v-slot:activator="{ props }">
                <v-list-item
                    v-bind="props"
                    @click-once="readNotification(item)"
                    >
                    <v-list-item-subtitle class="my-1">{{ formatDate(item.create_date) }}</v-list-item-subtitle>
                    <span v-if="item.is_read" class="dot mr-2">
                    </span><span v-if="!item.is_read" class="dot-red mr-2"></span> {{ item.title }}
                </v-list-item>
            </template>
            <p class="mx-8">{{ item.message }}</p>
            </v-list-group>
            <v-list-item
                v-if="notificationItems.length==0">
                <v-list-item-title class="text-center">ไม่มีการแจ้งเตือน</v-list-item-title>
            </v-list-item>
            </v-list>
            
        </v-menu>
        <v-divider 
            :thickness="2"
            inset
            vertical>
        </v-divider>
        <v-menu transition="slide-y-transition">
            <template v-slot:activator="{ props }">
                <v-btn 
                    append-icon="mdi-chevron-down"
                    v-bind="props"
                    class="mx-4 pl-16"
                    >
                    {{ userStore.user.name }}
                </v-btn>
            </template>
            <v-list class="ma-2" rounded="lg" width="175">
                <v-list-item>
                <router-link :to="{name: 'profile', params:{'id': userStore.user.name}}" class="router-navbar">
                    <v-list-item-title>ดูข้อมูลบัญชีผู้ใช้</v-list-item-title>
                </router-link>
                </v-list-item>
                <v-list-item>
                <router-link to="/login" class="router-logout" @click="logout">
                    <v-list-item-title>ออกจากระบบ</v-list-item-title>
                </router-link>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>

    <v-app-bar class="flex text-center" color="#292929" v-if="!userStore.user.access">
        <v-app-bar-title>ระบบกองทุนเงินให้กู้ยืมเพื่อการศึกษา มหาวิทยาลัยเกษตรศาสตร์</v-app-bar-title>
    </v-app-bar>
</template>

<script>
import axios from 'axios'
import { useUserStore } from '@/store/users'
export default{
    name: 'app-navbar',
    setup() {
        const userStore = useUserStore()
        return {
            userStore
        }
    },
    data() {
        return {
            notificationItems: [],
            isRead: false,

        }
    },
    mounted() {
        if (this.userStore.user.access) {
            this.getNotification()
        }
    },
    methods: {
        logout() {
            console.log('Log out')
            this.userStore.removeToken()
            this.$router.go(0)
        },
        getNotification() {
            axios.get('notification/notifications/?receiver='+this.userStore.user.id)
            .then(response => {
                this.notificationItems = response.data
                this.checkIsRead()
            })
            .catch(error => {
                console.log(error)
            })
        },
        checkIsRead() {
            for (let i = 0; i < this.notificationItems.length; i++) {
                if (this.notificationItems[i].is_read==false) {
                    return this.isRead = true
                }
            }
            return this.isRead = false
        },
        formatDate(value) {
            const date = new Date(value).toLocaleString().split('/')
            const month = date[0]
            console.log('month', month)
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
        readNotification(value) {
            const formData = {
                is_read: true
            }
            axios.put('notification/notifications/'+value.id+'/', formData)
            .then(response => {
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
}

</script>
<style scoped>
    .dot-red {
    height: 10px;
    width: 10px;
    background-color: #ED585A;
    border-radius: 50%;
    display: inline-block;
    }
    .dot {
        height: 10px;
        width: 10px;
        background-color: #9c9c9c;
        border-radius: 50%;
        display: inline-block;
    }
    .v-list-item-subtitle {
        font-size: 12px;
    }
    p {
        font-size: 14px;
    }
</style>