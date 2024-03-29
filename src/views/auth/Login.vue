<template>
    <app-navbar />
    <v-container class="my-auto">
        <v-sheet width="750" rounded="lg" elevation="20" class="mx-auto my-8 pa-8">
            <div class="flex text-center ma-4">
                <h1>เข้าสู่ระบบ</h1>
            </div>
            <div class="flex text-center ma-4">
                <v-chip class="px-8" variant="flat" color="#FFDC76">
                    <p>ใช้ชื่อผู้ใช้และรหัสผ่านจากบัญชีเครือข่ายนนทรี</p>
                </v-chip>
            </div>
            <v-form class="my-8" @submit.prevent="onSubmit">
                <v-row no-gutters justify="center" class="my-2">
                    <v-col cols="1" class="my-2 mx-4">
                        <p>ชื่อผู้ใช้</p>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field 
                        density="compact"
                        clearable 
                        rounded="pill" 
                        variant="outlined" 
                        placeholder="ชื่อผู้ใช้" 
                        v-model="username" 
                        :rules="[rules.username_required]" />
                    </v-col>
                </v-row>
                <v-row no-gutters justify="center" class="my-2">
                    <v-col cols="1" class="my-2 mx-4">
                        <p>รหัสผ่าน</p>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field 
                        density="compact"
                        clearable 
                        rounded="pill" 
                        variant="outlined" 
                        placeholder="รหัสผ่าน" 
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" 
                        :type="show ? 'text' : 'password'" 
                        @click:append="show = !show" 
                        v-model="password" 
                        :rules="[rules.password_required]" />
                    </v-col>
                </v-row>
                <v-row justify="center" class="my-2">
                    <div class="ma-4">
                        <a href="https://accounts.ku.ac.th/private/login" target="_blank" class=" text-blue-accent-2 text-decoration-none">
                            ลืมรหัสผ่าน?</a>
                    </div>
                    <v-divider :thickness="2" inset vertical>
                    </v-divider>
                    <div class="ma-4">
                        <a href="https://registrar.ku.ac.th/contact-us" target="_blank" class=" text-blue-accent-2 text-decoration-none">
                            ติดต่อเรา</a>
                    </div>
                </v-row>
                <v-row justify="center" class="my-2">
                    <v-btn 
                    flat 
                    rounded="lg" 
                    size="x-large" 
                    class="submit" 
                    type="submit">
                    เข้าสู่ระบบ
                    </v-btn>
                </v-row>
            </v-form>
        </v-sheet>
    </v-container>
</template>

<script>
import AppNavbar from '@/components/AppNavbar.vue'
import axios from 'axios'
import { useUserStore } from '@/store/users'


export default {
    name: 'login',
    components: {
        AppNavbar
    },
    data() {
        return {
            show: false,
            username: null,
            password: null,
            error: null,
            rules: {
                username_required: value => !!value || 'กรุณากรอกชื่อผู้ใช้',
                password_required: value => !!value || 'กรุณากรอกรหัสผ่าน'
            }
        }
    },
    setup() {
        const userStore = useUserStore()
        return {
            userStore
        }
    },
    methods: {
        async onSubmit() {
            const formData = {
                username: this.username,
                password: this.password
            }
            console.log("form data: ", formData)
            if (formData.username!=null && formData.password!=null) {
            await axios
                .post('auth/login/', formData)
                .then(response => {
                    this.userStore.setToken(response.data)
                    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access;
                })
                .catch(error => {
                    console.log(error)
                    this.$swal({
                        title: 'ไม่สามารถเข้าสู่ระบบได้ ',
                        showCloseButton: true,
                        text: "กรุณาตรวจสอบข้อมูลอีกครั้ง",
                        confirmButtonText: "ตกลง",
                        confirmButtonColor: "#0AAE75",
                        icon: "error",
                        backdrop: false
                    });
                })
            
            await axios
            .get('auth/me/')
            .then(response => {
                this.userStore.setUserInfo(response.data)
                this.$router.push('/')
            })
            .catch(error => {
                console.log(error)
            })
            }
        }
    }
}
</script>
