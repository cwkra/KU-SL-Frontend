<template>
    <app-sidebar/>
    <app-navbar/>
    <v-main>
        <app-title title="ข่าวสารนิสิต"/>
        <breadcrumbs :items="items"/>
        <v-card 
        rounded="xl"
        class="mx-8 mt-2">
        <v-form @submit.prevent>
        <v-row class="mx-4 my-2" justify="end">
        <v-btn 
            flat
            rounded="lg" 
            class="submit mx-2"
            type="submit"
            @click="onSubmit"
        >บันทึก
        </v-btn>
        <router-link :to="{name: 'admin-announcement'}">
        <v-btn 
            flat
            rounded="lg" 
            class="cancel mx-2"
        >ยกเลิก
        </v-btn>
        </router-link>
        </v-row>
            <card-header title="สร้างข่าวสารนิสิต"/>
            <v-container>
                <v-responsive max-width="360">
                    <p>หัวข้อเรื่อง</p>
                    <v-text-field 
                    density="compact" clearable 
                    rounded="pill" variant="outlined"
                    placeholder="หัวข้อเรื่อง" v-model="header" 
                    :rules="[rules.header_required]"/>
                    </v-responsive>
                    <p>คำอธิบาย</p>
                    <v-textarea 
                    clearable variant="outlined"
                    rounded="lg" placeholder="คำอธิบาย"
                    v-model="description" row-height="30"
                    rows="5" no-resize
                    :rules="[rules.description_required]"/>
            </v-container>
        </v-form>
        </v-card>
    </v-main>
</template>
<script>
import AppNavbar from '@/components/AppNavbar.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import AppTitle from '@/components/AppTitle.vue'
import CardHeader from '@/components/CardHeader.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { useUserStore } from '@/store/users'
import axios from 'axios'

export default{
    name: 'admin-announcement',
    components: {
      AppNavbar,
      AppSidebar,
      AppTitle,
      CardHeader,
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
            show: false,
            header: null,
            description: null,
            error: null,
            rules: {
                header_required: value => !!value || 'กรุณากรอกหัวข้อเรื่อง',
                description_required: value => !!value || 'กรุณากรอกคำอธิบาย'
            },
            items: [
                {
                    title: 'หน้าหลัก',
                    disabled: false,
                    href: '/'
                },
                {
                    title: 'ข่าวสารนิสิต',
                    disabled: false,
                    href: '/admin/announcement'
                },
                {
                    title: 'สร้างข่าวสารนิสิต',
                    disabled: true,
                    href: '/admin/announcement/create'
                },
            ]
        }
    },
    methods: {
        onSubmit() {
            const formData = {
                header: this.header,
                description: this.description
            }
            console.log("form data: ", formData)
            if (formData.header!=null && formData.description!=null) {
                axios.post('announcement/announcements/', formData)
                .then(response => {
                    this.$swal({
                        title: 'สร้างข่าวสารนิสิตสำเร็จ',
                        showCloseButton: true,
                        confirmButtonText: "ตกลง",
                        confirmButtonColor: "#0AAE75",
                        icon: "success",
                        backdrop: false,
                    }).then(result => {
                        if (result.isConfirmed || result.isClosed) {
                            this.$router.push('/admin/announcement')
                        }
                    })
                })
                .catch(error => {
                    console.log(error)
                    this.$swal({
                        title: 'สร้างข่าวสารนิสิตไม่สำเร็จ',
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
    }
}
</script>