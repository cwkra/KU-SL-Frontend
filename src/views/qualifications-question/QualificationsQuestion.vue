<template>
    <app-sidebar/>
    <app-navbar/>
    <v-main>
        <app-title title="ตรวจสอบเงื่อนไขคุณสมบัติผู้กู้ยืม"/>
        <breadcrumbs :items="items"/>
        <v-card 
        rounded="xl"
        class="mx-8 mt-2 mb-4">
        <v-row class="mx-4 my-2">
        </v-row>
        
            <card-header title="ตรวจสอบเงื่อนไขคุณสมบัติผู้กู้ยืม"/>
            <v-container>
                <v-card 
                rounded="xl"
                elevation="4"
                class="pa-2 my-4"
                v-for="(item, i) in questionsList"
                :key="i"
                :value="item">
                <v-row class="justify-space-between">
                    <v-col><v-card-title>{{ item.question }}</v-card-title></v-col>
                </v-row>
                    <v-radio-group 
                        v-for="(choice, j) in item.choice"
                        :key="j"
                        :value="choice"
                        v-model="selectedItems[i]">
                        <v-radio :label="choice.choice" :value="choice.choice"></v-radio>
                    </v-radio-group>
            </v-card>
            <v-card-actions class="justify-center">
                <v-btn 
                    flat
                    rounded="lg" 
                    class="submit"
                    @click="onSubmit"
                >ส่งคำตอบ
                </v-btn>
            </v-card-actions>
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
    name: 'qualifications-question',
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
            popup_text: "",
            questionsList: [],
            selectedItems: [],
            items: [
                {
                    title: 'หน้าหลัก',
                    disabled: false,
                    href: '/'
                },
                {
                    title: 'ตรวจสอบเงื่อนไขคุณสมบัติผู้กู้ยืม',
                    disabled: true,
                    href: '/qualifications-question'
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
                    this.selectedItems.push("")
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        onSubmit() {
            const isSelected = this.isSelectedItems()
            const isPass = this.checkCondition()
            if (isSelected==false) {
                this.$swal({
                    title: 'ไม่สามารถส่งคำตอบได้',
                    text: 'กรุณาเลือกคำตอบให้ครบทุกข้อ',
                    showCloseButton: true,
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "#0AAE75",
                    icon: "error",
                    backdrop: false,
                  })
            }else if (isPass==true){
                this.popup_text = this.setPopupText()
                this.$swal({
                    title: 'ผ่านเงื่อนไขคุณสมบัติผู้กู้ยืม' + '\n' + 'สามารถยื่นกู้ยืมได้',
                    html: this.popup_text,
                    showCloseButton: true,
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "#0AAE75",
                    icon: "success",
                    backdrop: false,
                  }).then(result => {
                      if (result.isConfirmed || result.isClosed) {
                      }
                  })
            } else {
                this.popup_text = this.setPopupText()
                this.$swal({
                    title: 'ไม่ผ่านเงื่อนไขคุณสมบัติผู้กู้ยืม' + '\n' + 'ไม่สามารถยื่นกู้ยืมได้',
                    html: this.popup_text,
                    showCloseButton: true,
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "#0AAE75",
                    icon: "error",
                    backdrop: false,
                  }).then(result => {
                      if (result.isConfirmed || result.isClosed) {
                      }
                  })
            }
            
        },
        isSelectedItems() {
            for (let i = 0; i < this.selectedItems.length; i++) {
                if (this.selectedItems[i]=="") {
                    return false
                }
            }
            return true
        },
        checkCondition() {
            for(let i = 0; i < this.questionsList.length; i++) {
                if (this.selectedItems[i]==this.questionsList[i].correct_answer.split('"')[1]) {
                }
                else {
                    return false
                }
            }
            return true
        },
        setPopupText() {
            var text = ""
            console.log('set popup text')
            for(let i = 0; i < this.questionsList.length; i++) {
                if (this.selectedItems[i] == this.questionsList[i].correct_answer.split('"')[1]) {
                text += ('<span class="dot"></span>' + this.questionsList[i].question + ' ? <br>' + '<p style="color: #0AAE75;" class="text-start ml-4">' +
                                'คำตอบที่ผ่านเงื่อนไข: ' + this.questionsList[i].correct_answer.split('"')[1] + '</p><br>')
                }
                else {
                    text += (this.questionsList[i].question + ' ? <br>' + '<p style="color: #0AAE75;" class="text-start ml-4">' +
                                'คำตอบที่ผ่านเงื่อนไข: ' + this.questionsList[i].correct_answer.split('"')[1] + '</p>' + '<p style="color: #ED585A;" class="text-start ml-4">' +
                                'คำตอบที่เลือก: ' + this.selectedItems[i] + '</p><br>')
                }
            }
            return text
        }
    }
}
</script>