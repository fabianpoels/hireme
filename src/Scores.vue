<template>
  <div class="fullscreen">
    <div v-if="loading">
      <ProgressSpinner />
    </div>
    <div v-else-if="hasError">
      This is clearly not supposed to happen, but apparently it did. Very much like getting caught
      cheating on your girlfriend while you told her a couple of hours before that "she's your
      soulmate". Unlike with the previously mentioned girlfriend situation, hard refreshing the page
      hopefully does the trick.
    </div>
    <template v-else> </template>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

import { useAppStore } from '@/stores/app.store'
const appStore = useAppStore()

import ProgressSpinner from 'primevue/progressspinner'

const loading = ref(true)
const hasError = ref(false)

// SETUP APP
onMounted(async () => {
  loading.value = true
  try {
    await appStore.loadAppState()
    if (appStore.showCookieConsent || appStore.page !== 'score') {
      router.push({ name: 'game' })
      return
    }
    await appStore.loadScores()
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
</style>
