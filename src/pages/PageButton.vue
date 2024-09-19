<template>
  <div class="centeredInput">
    <Button
      icon="pi pi-arrow-right"
      iconPos="right"
      severity="success"
      @click="nextPage"
      class="button"
      label=""
      :loading="saving"
      style="display: none"
    />
  </div>
</template>
<script setup>
import { ref } from 'vue'
const emit = defineEmits(['showMainButtons'])

import { useAppStore } from '@/stores/app.store'
const appStore = useAppStore()

import { useToast } from 'primevue/usetoast'
const toast = useToast()

import { alert } from '@/utils'

import Button from 'primevue/button'

const saving = ref(false)

async function nextPage() {
  saving.value = true
  try {
    const result = await appStore.answerPage('clickedthebutton')
    if (result === false) {
      alert.showWrongAnswer(toast, "I didn't expect a wrong answer here'")
    }
  } catch (e) {
    alert.showError(toast, e)
  } finally {
    saving.value = false
  }
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
