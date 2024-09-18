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
    <template v-else>
      <component
        :is="pages[`page-${appStore.page}`]"
        @showMainButtons="(val) => (showMainButtons = val)"
      />
      <Transition name="fade">
        <main-buttons v-if="showMainButtons" />
      </Transition>
    </template>
    <cookie-dialog v-model="showCookieDialog" />
    <Toast position="top-center" group="answers" />
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
import { ref, onMounted } from 'vue'
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
import MainButtons from '@/components/MainButtons.vue'
import HintsButton from '@/components/HintsButton.vue'

// PAGES
import PageZero from '@/pages/PageZero.vue'
import PageInfo from '@/pages/PageInfo.vue'
import PageEmail from '@/pages/PageEmail.vue'
import PageOtp from '@/pages/PageOtp.vue'

const pages = {
  'page-zero': PageZero,
  'page-info': PageInfo,
  'page-email': PageEmail,
  'page-otp': PageOtp
}

const loading = ref(true)
const hasError = ref(false)
const showCookieDialog = ref(false)
const showMainButtons = ref(false)

// SETUP APP
onMounted(async () => {
  console.log('are you sure you landed on the right website?')
  loading.value = true
  try {
    await appStore.loadAppState()
    if (appStore.showCookieConsent) showCookieDialog.value = true
    if (appStore.page !== 'zero') showMainButtons.value = true
  } catch (e) {
    alert.showError(toast, e)
    hasError.value = true
  } finally {
    loading.value = false
  }
})
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
