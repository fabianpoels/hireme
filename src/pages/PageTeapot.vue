<template>
  <div class="centeredInput">
    <SelectButton v-model="method" :options="options" :disabled="saving" />
    <InputText v-model="answer" :disabled="saving" />
    <Button
      icon="pi pi-arrow-right"
      iconPos="right"
      severity="success"
      @click="nextPage"
      class="button"
      :disabled="answer.length < 1"
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
import SelectButton from 'primevue/selectbutton'
import Button from 'primevue/button'

const saving = ref(false)
const options = ref(['GET', 'POST'])
const method = ref('GET')
const answer = ref('')

async function nextPage() {
  saving.value = true
  try {
    const result = await appStore.answerPage(`${method.value}:${answer.value}`)
    if (result === false) {
      alert.showWrongAnswer(toast, "That's not the response I was hoping for")
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
