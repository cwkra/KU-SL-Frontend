<template>
    <v-app-bar color="#292929">
        <v-app-bar-title>ระบบกองทุนเงินให้กู้ยืมเพื่อการศึกษา มหาวิทยาลัยเกษตรศาสตร์</v-app-bar-title>
        <!-- <v-spacer/> -->
        <v-menu>
            <template v-slot:activator="{ props }">
                <v-btn
                    v-bind="props"
                    icon size="x-small"
                    class="ma-3">
                    <v-icon>mdi-bell-outline</v-icon>
                </v-btn>
            </template>
            <v-list class="ma-2" rounded="lg">
                <v-list-item
                v-for="(item, index) in notificationItems"
                :key="index"
                :value="index"
                >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-divider 
            :thickness="2"
            inset
            vertical>
        </v-divider>
        <v-menu>
            <template v-slot:activator="{ props }">
                <v-btn 
                    append-icon="mdi-chevron-down"
                    v-bind="props"
                    class="ma-3 pl-16"
                    >
                    Lorem ipsum dolor sit.
                </v-btn>
            </template>
            <v-list class="ma-2" rounded="lg" width="175">
                <v-list-item
                v-for="(item, index) in items"
                :key="index"
                :value="index"
                >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script>
export default{
    name: 'app-navbar',
    data: () => ({
      items: [
        { 
            title: 'ดูข้อมูลบัญชีผู้ใช้' 
        },
        { 
            title: 'ออกจากระบบ'
        },
      ],
      notificationItems: [
        { title: 'การแจ้งเตือน'}
      ]
    }),
}

</script>