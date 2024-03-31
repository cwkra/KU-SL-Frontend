<template>
    <app-sidebar/>
    <app-navbar/>
    <v-main>
        <app-title title="ตรวจสอบเงื่อนไขคุณสมบัติผู้กู้ยืม"/>
        <breadcrumbs :items="items"/>
        <v-card 
        rounded="xl"
        class="mx-8 mt-2">
        <v-form @submit.prevent>
        <v-row class="mx-4 my-2" justify="end">
        <v-btn 
            flat :disabled="mode=='edit'" rounded="lg" 
            class="submit mx-2" type="submit" @click="onSubmit"
        >บันทึก
        </v-btn>
        <router-link :to="{name: 'admin-qualifications-question'}">
        <v-btn 
            flat rounded="lg" 
            class="cancel mx-2" type="cancel"
        >ยกเลิก
        </v-btn>
        </router-link>
        </v-row>
            <card-header title="สร้างคำถามตรวจสอบเงื่อนไขคุณสมบัติผู้กู้ยืม"/>
            <v-container>
                <v-row justify="space-between" class="mx-8">
                    <v-col cols=5>
                    <v-textarea
                    density="compact" no-resize
                    auto-grow rows="1" clearable
                    placeholder="คำถาม" label="คำถาม"
                    variant="underlined" rounded="xl"
                    v-model="question" :rules="[rules.question_required]">
                    </v-textarea>
                    </v-col>
                </v-row>
                <v-container class="mx-8" v-for="(answer, k) in answers" :key="k">
                    <v-row class="align-top mb-2" no-gutters v-if="mode=='create'">
                        <v-responsive max-width="50" max-height="50">
                            <v-radio-group v-model="selectedItem">
                                <v-radio disabled :value="answer.choice"></v-radio>
                            </v-radio-group>
                        </v-responsive>
                    <v-col cols="5">
                    <v-text-field 
                        density="compact" hide-details="auto"
                        clearable variant="outlined"
                        rounded="pill" placeholder="คำตอบ"
                        v-model="answer.choice" :append-icon="show ? 'mdi-minus-circle' : ''"
                        :rules="[rules.question_choice_rules]" @click:append="remove(k)"
                    ></v-text-field>
                    </v-col>
                    </v-row>

                    <v-row class="align-top" no-gutters v-if="mode=='edit'">
                        <v-col cols="5">
                        <v-responsive max-height="50">
                            <v-radio-group v-model="selectedItem">
                            <v-radio :label="answer.choice" :value="answer.choice">
                            </v-radio>
                        </v-radio-group>
                        </v-responsive>
                        </v-col>

                    </v-row>
                    <span>
                        <v-btn 
                        rounded="pill" class="add-choice-btn mx-2 my-4"
                        variant="outlined" @click="add()" 
                        v-if="mode=='create'" v-show="k == answers.length-1"
                        >เพิ่มคำตอบ +
                        </v-btn>
                    </span>
                </v-container>
            </v-container>
            <v-divider class="mx-8"></v-divider>
            <v-card-actions class="mx-8 my-2">
                <v-btn 
                    flat rounded="lg" 
                    class="submit mx-2" v-if="mode=='create'" @click="switchMode"
                >เลือกคำตอบที่ผ่านเงื่อนไข
                </v-btn>
                <v-btn 
                    variant="outlined" rounded="lg" 
                    class="info mx-2" v-if="mode=='edit'" @click="mode='create'"
                >เสร็จสิ้น
                </v-btn>
            </v-card-actions>
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
    name: 'qualifications-question-form',
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
            question: null,
            selectedItem: [],
            mode: 'create',
            show: false,
            items: [
                {
                    title: 'หน้าหลัก',
                    disabled: false,
                    href: '/'
                },
                {
                    title: 'ตรวจสอบเงื่อนไขคุณสมบัติผู้กู้ยืม',
                    disabled: false,
                    href: '/admin/qualifications-question'
                },
                {
                    title: 'สร้างคำถามตรวจสอบเงื่อนไขคุณสมบัติผู้กู้ยืม',
                    disabled: true,
                    href: '/admin/qualifications-question/create'
                },
            ],
            answers: [
                {
                    choice: 'คำตอบ'
                }
            ],
            rules: {
                question_required: value => !!value || 'กรุณากรอกคำถาม',
                question_choice_rules: value => !!value || 'กรุณากรอกคำตอบ'
            },

        }
    },
    methods: {
        add() {
            this.answers.push({choice: 'คำตอบ'})
            this.show = true
        },
        remove(index) {
            if (this.answers.length <= 2) {
                this.show = false
            }
            this.answers.splice(index, 1);
        },
        isDuplicate() {
            let duplicates = [];
            for (let i = 0; i < this.answers.length; i++) {
                for (let j = i + 1; j < this.answers.length; j++) {
                    if (this.answers[i].choice === this.answers[j].choice) {
                        if (!duplicates.includes(this.answers[i].choice)) {
                            duplicates.push(this.answers[i].choice);
                        }
                    }
                }
            }
            console.log(duplicates)
            if (duplicates.length === 0) {
                return false
            }
            else {
                return true
            }
            
        },
        isAnswerNull() {
            for (let i = 0; i < this.answers.length; i++) {
                if (this.answers[i].choice == null) {
                    return true
                }
            }
            return false
        },
        switchMode() {
            if (this.isDuplicate()==true) {
                this.$swal({
                        title: 'คำตอบซ้ำ',
                        showCloseButton: true,
                        text: "ไม่สามารถสร้างคำตอบซ้ำ กรุณาแก้ไขคำตอบ",
                        confirmButtonText: "ตกลง",
                        confirmButtonColor: "#0AAE75",
                        icon: "error",
                        backdrop: false
                    });
            }
            else if (this.isAnswerNull()==false && this.isDuplicate()==false) {
                this.mode='edit'
            }
        },
        onSubmit() {
            const dup = this.isDuplicate()
            const answer_null = this.isAnswerNull()
            if (dup==true && this.question!=null && answer_null==false) {
                this.$swal({
                        title: 'สร้างคำถามไม่สำเร็จ',
                        showCloseButton: true,
                        text: "ไม่สามารถสร้างคำตอบซ้ำ กรุณาแก้ไขคำตอบ",
                        confirmButtonText: "ตกลง",
                        confirmButtonColor: "#0AAE75",
                        icon: "error",
                        backdrop: false
                    });
            }
            if (this.selectedItem.length == 0 && this.question!=null && answer_null==false) {
                this.$swal({
                        title: 'สร้างคำถามไม่สำเร็จ',
                        showCloseButton: true,
                        text: "กรุณาเลือกคำตอบที่ถูกต้อง",
                        confirmButtonText: "ตกลง",
                        confirmButtonColor: "#0AAE75",
                        icon: "error",
                        backdrop: false
                    });
            }
            if (this.question!=null && (dup==false) && this.selectedItem.length!=0 && (answer_null==false)) {
                const answer_json = JSON.stringify(this.answers);
                const correct_answer_json = JSON.stringify(this.selectedItem)
                const formData = {
                    question: this.question,
                    choice: answer_json,
                    correct_answer: correct_answer_json
                }
                axios.post('qualification-question/qualification-questions/', formData)
                .then(response => {
                    this.$swal({
                        title: 'สร้างคำถามสำเร็จ',
                        showCloseButton: true,
                        confirmButtonText: "ตกลง",
                        confirmButtonColor: "#0AAE75",
                        icon: "success",
                        backdrop: false
                    }).then(result => {
                        if (result.isConfirmed || result.isClosed) {
                            this.$router.push('/admin/qualifications-question/')
                        }
                    })
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    },
}
</script>