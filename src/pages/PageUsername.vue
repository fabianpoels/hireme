<template>
  <p>I almost forgot</p>
  <p>If you would eventually make it to the leaderboard</p>
  <p>- yes, there's a leaderboard -</p>
  <p>you need a username to show off your achievement (not that anyone cares)</p>
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
      alert.showWrongAnswer(
        toast,
        "I don't care if it's offensive, but something is not right with that username"
      )
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
