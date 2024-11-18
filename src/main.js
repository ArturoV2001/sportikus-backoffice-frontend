import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import alvue from '@myshell/alvue';

const app = createApp(App)

app.use(PrimeVue)

app.use(alvue)

app.use(router)

app.mount('#app')
