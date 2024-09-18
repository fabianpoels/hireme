import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// primevue
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'

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
