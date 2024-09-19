<template>
  <div class="fullscreen">
    <h1 id="score">Score: {{ appStore.score }}</h1>
    <ProgressBar :value="appStore.progress" :showValue="false" class="progressbar" />
    <div v-if="loading">
      <ProgressSpinner />
    </div>
    <div v-else-if="hasError">
      This is clearly not supposed to happen, but apparently it did. Very much like getting caught
      cheating on your girlfriend while you told her a couple of hours before that "she's your
      soulmate". Unlike with the previously mentioned girlfriend situation, hard refreshing the page
      hopefully does the trick.
    </div>
    <component v-else :is="pages[`page-${appStore.page}`]" />
    <cookie-dialog v-model="showCookieDialog" />
    <Toast position="bottom-center" group="answers" />
    <Toast position="top-right" group="errors" />
    <hints-button />
  </div>
  <div class="tooSmallScreen">
    <h1>Not enough pixels</h1>
    <p>However awesome this website is, the developer was too lazy to support mobile devices.</p>
    <p>
      As you anyway need the tools of a laptop/desktop to be able to complete the 'game', it's not
      worth serving you a mobile version of the page.
    </p>
    <p>If you're sitting on the toilet: wipe and go be productive. And wash your hands.</p>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

import { useAppStore } from '@/stores/app.store'
const appStore = useAppStore()

import { alert } from '@/utils'

// COMPONENTS
import ProgressBar from 'primevue/progressbar'
import ProgressSpinner from 'primevue/progressspinner'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
const toast = useToast()
import CookieDialog from '@/components/CookieDialog.vue'
import HintsButton from '@/components/HintsButton.vue'

import PageZero from '@/pages/PageZero.vue'
import PageInfo from '@/pages/PageInfo.vue'
import PageEmail from '@/pages/PageEmail.vue'
import PageOtp from '@/pages/PageOtp.vue'
import PagePing from '@/pages/PagePing.vue'
import PageConsole from '@/pages/PageConsole.vue'
import PageUsername from '@/pages/PageUsername.vue'
import PageButton from '@/pages/PageButton.vue'
import PageTeapot from '@/pages/PageTeapot.vue'
import PageCookie from '@/pages/PageCookie.vue'
import PageCookie2 from '@/pages/PageCookie2.vue'
import PageQr from '@/pages/PageQr.vue'
import PageComplex from '@/pages/PageComplex.vue'
import PageTimer from '@/pages/TimerPage.vue'

// PAGES
const pages = {
  'page-zero': PageZero,
  'page-info': PageInfo,
  'page-email': PageEmail,
  'page-otp': PageOtp,
  'page-ping': PagePing,
  'page-console': PageConsole,
  'page-username': PageUsername,
  'page-button': PageButton,
  'page-teapot': PageTeapot,
  'page-cookie': PageCookie,
  'page-cookie2': PageCookie2,
  'page-qr': PageQr,
  'page-complex': PageComplex,
  'page-timer': PageTimer
}

const loading = ref(true)
const hasError = ref(false)
const showCookieDialog = ref(false)

// SETUP APP
onMounted(async () => {
  console.log('are you sure you landed on the right website?')
  loading.value = true
  try {
    await appStore.loadAppState()
    if (appStore.showCookieConsent) showCookieDialog.value = true
  } catch (e) {
    alert.showError(toast, e)
    hasError.value = true
  } finally {
    loading.value = false
  }
})

watch(
  () => appStore.page,
  (val) => {
    if (val === 'score') router.push({ name: 'scores' })
  }
)
</script>
<style scoped>
.fullscreen {
  width: 100%;
  height: 100%;
}

.tooSmallScreen {
  display: none;
}

@media only screen and (max-width: 700px) {
  .fullscreen {
    display: none;
  }

  .tooSmallScreen {
    display: block;
  }

  p {
    margin-top: 10px;
  }
}

#score {
  position: absolute;
  top: 10px;
  left: 10px;
}

.progressbar {
  margin-top: 50px;
  margin-bottom: 30px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
