<template>
  <p>ping</p>
  <div class="centeredInput">
    <InputText v-model="answer" :disabled="saving" />
    <Button
      icon="pi pi-arrow-right"
      iconPos="right"
      severity="success"
      @click="nextPage"
      class="button"
      label=""
      :loading="saving"
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

import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const saving = ref(false)
const answer = ref('')

async function nextPage() {
  saving.value = true
  try {
    const result = await appStore.answerPage(answer.value)
    if (result === false) {
      alert.showWrongAnswer(toast, "First real round and already choking? That's not a good sign")
    }
  } catch (e) {
    alert.showError(toast, e)
  } finally {
    saving.value = false
  }
}
</script>
<style scoped>
p {
  margin-top: 20px;
}

.button {
  margin-left: 5px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
