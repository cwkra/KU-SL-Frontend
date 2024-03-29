import { useUserStore } from '@/store/users'

export default function (to, from, next) {
    const userStore = useUserStore()
    if (!userStore.user.isAuthenticated) {
        return next({ name: 'login' })
    }

    next()
}