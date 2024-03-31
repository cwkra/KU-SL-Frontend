<template>
    <app-sidebar/>
    <app-navbar/>
    <v-main>
        <app-title title="ตรวจสอบเงื่อนไขคุณสมบัติผู้กู้ยืม"/>
        <breadcrumbs :items="items"/>
        <v-card 
        rounded="xl" class="mx-8 mt-2 mb-4">
        <v-row class="mx-4 my-2">
        <router-link :to="{name: 'qualifications-question-form'}">
        <v-btn flat rounded="lg" class="submit">สร้าง</v-btn>
        </router-link>
        </v-row>
            <card-header title="ตรวจสอบเงื่อนไขคุณสมบัติผู้กู้ยืม"/>
            <v-container>
                <v-card 
                rounded="xl" elevation="4"
                class="pa-2 my-4"
                v-for="(item, i) in questionsList"
                :key="i"
                :value="item">
                <v-row class="justify-space-between">
                    <v-col><v-card-title>{{ item.question }}</v-card-title></v-col>
                    <v-col cols="2" align="end">
                        <div class="my-2 mx-4">
                            <v-btn
                            class="primary mx-2" rounded="xl"
                            size="x-small" icon="mdi-pencil"
                            @click="goToEdit(item)">
                            </v-btn>
                            <v-btn
                            class="cancel" rounded="xl"
                            size="x-small" icon="mdi-delete"
                            @click="goToDelete(item)">
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
                    <v-radio-group
                    v-for="(choice, j) in item.choice"
                    :key="j"
                    :value="choice">
                        <v-radio disabled :label="choice.choice" :value="choice.choice"></v-radio>
                    </v-radio-group>
                </v-card>
            </v-container>
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
    name: 'admin-qualifications-question',
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
            selectChoice: [],
            questionsList: [],
            items: [
                {
                    title: 'หน้าหลัก',
                    disabled: false,
                    href: '/'
                },
                {
                    title: 'ตรวจสอบเงื่อนไขคุณสมบัติผู้กู้ยืม',
                    disabled: true,
                    href: '/admin/qualifications-question'
                },
            ]
        }
    },
    mounted() {
        this.getQuestions()
    },
    methods: {
        getQuestions() {
            axios.get('qualification-question/qualification-questions/')
            .then(response => {
                this.questionsList = response.data
                for (let i = 0; i < response.data.length; i++) {
                    this.questionsList[i].choice = JSON.parse(response.data[i].choice)
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        goToEdit(value) {
            this.$router.push({
            name: 'qualifications-question-edit',
            params: {
                id: value.id
            }
            })
        },
        goToDelete(value) {
            this.$swal({
                    title: value.question,
                    text: 'ยืนยันการลบคำถามนี้ใช่หรือไม่',
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
            axios.delete('qualification-question/qualification-questions/'+value.id)
            .then(response => {
                this.$swal({
                    title: 'ดำเนินการลบคำถามสำเร็จ',
                    showCloseButton: true,
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "#0AAE75",
                    icon: "success",
                    backdrop: false,
                    }).then(result => {
                        if (result.isConfirmed || result.isClosed) {
                            this.$router.push('/admin/qualifications-question')
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