<template>
    <v-app>
        <router-view />
    </v-app>
</template>

<script>
import { useUserStore } from '@/store/users'
import axios from 'axios'

export default {
    name: 'app',
    setup() {
        const userStore = useUserStore()
        return {
            userStore
        }
    },
    beforeCreate() {
        this.userStore.initStore()
        const token = this.userStore.user.access

        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        } else {
            axios.defaults.headers.common["Authorization"] = "";
        }
    }
}
</script>
