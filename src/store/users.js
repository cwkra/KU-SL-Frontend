import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore({
    id: 'user',

    state: () => ({
        user: {
            isAuthenticated: false,
            id: null,
            username: null,
            name: null,
            email: null,
            date_of_birth: null,
            tel_number: null,
            identity_card_number: null,
            image: null,
            education: {
                id: null,
                student_id_number: null,
                faculty: null,
                department: null,
                education_level: null,
                status: null
            },
            is_staff: false,
            access: null,
            refresh: null,
        }
    }),

    actions: {
        initStore() {

            if (localStorage.getItem('user.access')) {
                
                this.user.access = localStorage.getItem('user.access')
                this.user.refresh = localStorage.getItem('user.refresh')
                this.user.id = localStorage.getItem('user.id')
                this.user.username = localStorage.getItem('user.username')
                this.user.name = localStorage.getItem('user.name')
                this.user.email = localStorage.getItem('user.email')
                this.user.date_of_birth = localStorage.getItem('user.date_of_birth')
                this.user.tel_number = localStorage.getItem('user.tel_number')
                this.user.identity_card_number = localStorage.getItem('user.identity_card_number')
                this.user.image = localStorage.getItem('user.image')
                if (localStorage.getItem('user.education.id')!='null') {
                    this.user.education.id = localStorage.getItem('user.education.id')
                    this.user.education.student_id_number = localStorage.getItem('user.education.student_id_number')
                    this.user.education.faculty = localStorage.getItem('user.education.faculty')
                    this.user.education.department = localStorage.getItem('user.education.department')
                    this.user.education.education_level = localStorage.getItem('user.education.education_level')
                    this.user.education.status = localStorage.getItem('user.education.status')
                } else {
                    this.user.education.id = null
                    this.user.education.student_id_number = null
                    this.user.education.faculty = null
                    this.user.education.department = null
                    this.user.education.education_level = null
                    this.user.education.status = null
                }
                if (localStorage.getItem('user.is_staff')=='false') {
                    this.user.is_staff = false
                }
                else {
                    this.user.is_staff = true
                }
                this.user.isAuthenticated = true

                this.refreshToken()
            }
        },

        setToken(data) {
            console.log('setToken', data)

            this.user.access = data.access
            this.user.refresh = data.refresh
            this.user.isAuthenticated = true

            localStorage.setItem('user.access', data.access)
            localStorage.setItem('user.refresh', data.refresh)

            console.log('user.access: ', localStorage.getItem('user.access'))
        },

        removeToken() {
            this.user.refresh = null
            this.user.access = null
            this.user.isAuthenticated = false
            this.user.id = null
            this.user.username = null
            this.user.name = null
            this.user.email = null
            this.user.date_of_birth = null
            this.user.tel_number = null
            this.user.identity_card_number = null
            this.user.image = null
            this.user.education.id = null
            this.user.education.student_id_number = null
            this.user.education.faculty = null
            this.user.education.department = null
            this.user.education.education_level = null
            this.user.education.status = null
            this.user.is_staff = false

            localStorage.setItem('user.access', '')
            localStorage.setItem('user.refresh', '')
            localStorage.setItem('user.id', '')
            localStorage.setItem('user.username', '')
            localStorage.setItem('user.name', '')
            localStorage.setItem('user.email', '')
            localStorage.setItem('user.date_of_birth', '')
            localStorage.setItem('user.tel_number', '')
            localStorage.setItem('user.identity_card_number', '')
            localStorage.setItem('user.image','')
            localStorage.setItem('user.education.id', '')
            localStorage.setItem('user.education.student_id_number', '')
            localStorage.setItem('user.education.faculty', '')
            localStorage.setItem('user.education.department', '')
            localStorage.setItem('user.education.education_level', '')
            localStorage.setItem('user.education.status', '')
            localStorage.setItem('user.is_staff', '')
        },

        setUserInfo(user) {
            console.log('setUserInfo', user)
            axios
            .get('auth/users/' + user.id +'/')
            .then((response) => {
                this.user.id = response.data.id
                this.user.username = response.data.username
                this.user.name = response.data.name
                this.user.email = response.data.email
                this.user.date_of_birth = response.data.date_of_birth
                this.user.tel_number = response.data.tel_number
                this.user.identity_card_number = response.data.identity_card_number
                this.user.image = response.data.image
                this.user.is_staff = response.data.is_staff
                if (response.data.education != null) {
                    
                    this.user.education.id = response.data.education.id
                    this.user.education.student_id_number = response.data.education.student_id_number
                    this.user.education.faculty = response.data.education.faculty
                    this.user.education.department = response.data.education.department
                    this.user.education.education_level = response.data.education.education_level
                    this.user.education.status = response.data.education.status
                }
                else {
                    this.user.education.id = null
                    this.user.education.student_id_number = null
                    this.user.education.faculty = null
                    this.user.education.department = null
                    this.user.education.education_level = null
                    this.user.education.status = null
                }

                localStorage.setItem('user.id', this.user.id)
                localStorage.setItem('user.username', this.user.username)
                localStorage.setItem('user.name', this.user.name)
                localStorage.setItem('user.email', this.user.email)
                localStorage.setItem('user.date_of_birth', this.user.date_of_birth)
                localStorage.setItem('user.tel_number', this.user.tel_number)
                localStorage.setItem('user.identity_card_number', this.user.identity_card_number)
                localStorage.setItem('user.image', this.user.image)
                localStorage.setItem('user.education.id', this.user.education.id)
                localStorage.setItem('user.education.student_id_number', this.user.education.student_id_number)
                localStorage.setItem('user.education.faculty', this.user.education.faculty)
                localStorage.setItem('user.education.department', this.user.education.department)
                localStorage.setItem('user.education.education_level', this.user.education.education_level)
                localStorage.setItem('user.education.status', this.user.education.status)
                localStorage.setItem('user.is_staff', this.user.is_staff)

                localStorage.setItem('user.access', response.data.access)

            })
        },

        refreshToken() {
            axios.post('auth/refresh/', {
                refresh: this.user.refresh
            })
                .then((response) => {
                    this.user.access = response.data.access
                    localStorage.setItem('user.access', response.data.access)

                    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access
                })
                .catch((error)=>{
                    console.log(error)
                })
        },
    }
})