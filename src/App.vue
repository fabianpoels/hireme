<template>
  <div>
    <div v-if="loading">
      <ProgressSpinner />
    </div>
    <div v-else-if="hasError">
      This is clearly not supposed to happen, but apparently it did. Very much like getting caught
      cheating on your girlfriend while you told her a couple of hours before that "she's your
      soulmate". Unlike with the previously mentioned girlfriend situation, hard refreshing the page
      hopefully does the trick.
    </div>
    <component :is="pages[`page-${appStore.page}`]" v-else />
    <cookie-dialog v-model="showCookieDialog" />
    <Toast />
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/stores/app.store'
const appStore = useAppStore()

import { alert } from '@/utils'

// COMPONENTS
import ProgressSpinner from 'primevue/progressspinner'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
const toast = useToast()
import CookieDialog from '@/components/CookieDialog.vue'

// PAGES
import PageZero from '@/pages/PageZero.vue'
import PageWacopbtui from '@/pages/PageWacopbtui.vue'

const pages = {
  'page-zero': PageZero,
  'page-wacopbtui': PageWacopbtui
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
</script>
<style scoped></style>
