<template>
  <div class="centeredInput">The answer is 13</div>
  <div class="centeredInput">
    <InputText v-model="answer" disabled />
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
import { ref, onMounted, onUnmounted } from 'vue'

import { useAppStore } from '@/stores/app.store'
const appStore = useAppStore()

import { useToast } from 'primevue/usetoast'
const toast = useToast()

import { alert } from '@/utils'

import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const saving = ref(false)
const answer = ref(0)

let timerId

onMounted(() => {
  timerId = setInterval(() => {
    if (Number.isNaN(answer.value)) answer.value = 0
    answer.value = answer.value + 1
    if (answer.value > 20) {
      answer.value = 0
    }
  }, 100)
  console.log(`This is an id you might find useful: ${timerId}`)
})

onUnmounted(() => {
  clearInterval(timerId)
})

async function nextPage() {
  saving.value = true
  try {
    const result = await appStore.answerPage(`${answer.value}`)
    if (result === false) {
      alert.showWrongAnswer(toast, 'click faster')
    }
  } catch (e) {
    alert.showError(toast, e)
  } finally {
    saving.value = false
  }
}
</script>
<style scoped>
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
