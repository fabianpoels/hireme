import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// primevue
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'

// cookies
import { globalCookiesConfig } from 'vue3-cookies'
const isProd = import.meta.env.VITE_ENV === 'production'
const sameSite = isProd ? 'Strict' : 'None'
const domain = import.meta.env.VITE_DOMAIN
globalCookiesConfig({
  expireTimes: -1,
  path: '/hireme',
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

// vue router
import { router } from './router'
app.use(router)

app.mount('#app')
