import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { install as Vue3Recaptcha } from 'vue3-recaptcha-v2'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Vue3Recaptcha, {
  sitekey: '6LcUZmsrAAAAAED4P8m9xlzAJ7Z7G-TRlqy16rc4',
})

app.mount('#app')
