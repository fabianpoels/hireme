import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// primevue
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'

import { globalCookiesConfig } from 'vue3-cookies'
const isProd = import.meta.env.VITE_ENV === 'production'
const sameSite = isProd ? 'Lax' : 'None'
const domain = import.meta.env.VITE_DOMAIN
console.log('!!! SETTING COOKIE CONFIG')
console.log(`${domain}   :   ${isProd}   :   ${sameSite}`)
globalCookiesConfig({
  expireTimes: -1,
  path: '/',
  domain: domain,
  secure: isProd,
  sameSite: sameSite
})

const app = createApp(App)

app.use(createPinia())

app.use(ToastService)
app.directive('tooltip', Tooltip)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: '.substantiallyDark',
      cssLayer: false
    }
  }
})

app.mount('#app')
