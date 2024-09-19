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
    <template v-else>
      <div class="scoresTable">
        <DataTable
          :value="appStore.sortedScores"
          size="large"
          :rowClass="({ sessionId }) => (sessionId === appStore.sessionId ? 'highlight' : null)"
        >
          <Column field="position" header="position"></Column>
          <Column field="score" header="score"></Column>
          <Column field="username" header="username"></Column>
          <Column field="guesses" header="guesses/levels">
            <template #body="slotProps">
              {{ slotProps.data.guesses }} / {{ appStore.allPages.length }}
            </template>
          </Column>
          <Column field="hints" header="hints"></Column>
        </DataTable>
      </div>
    </template>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

import { useAppStore } from '@/stores/app.store'
const appStore = useAppStore()

import ProgressSpinner from 'primevue/progressspinner'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

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
<style>
.fullscreen {
  width: 100%;
  height: 100%;
}

.scoresTable {
  margin-top: 50px;
}

.highlight {
  color: #18181b !important;
  background-color: #fff !important;
}
</style>
