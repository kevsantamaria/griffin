import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import { queryClient } from '@/app/config/lib/query-client'
import router from '@/app/router'

import App from './App.vue'

import '@/app/assets/styles/reset.css'
import '@/app/assets/styles/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin, { queryClient })

app.mount('#app')
