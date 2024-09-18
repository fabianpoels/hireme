<template>
  <h1>E-mail</h1>
  <p>An easy round to get you warmed up.</p>
  <p>Provide me with a valid, non-temporary e-mail address.</p>
  <p>
    There are some other - hidden - requirements, and you obviously can only use the same address
    once.
  </p>
  <p>
    And since it's the first round, let me remind you that every attempt at providing an invalid
    e-mail will cost you points.
  </p>
  <p>Don't worry, the rounds will get harder.</p>
  <div class="emailInput">
    <FloatLabel>
      <InputText
        id="email"
        type="email"
        v-model="email"
        size="large"
        :disabled="saving"
        style="min-width: 500px"
      />
      <label for="email">E-mail</label>
    </FloatLabel>
    <Button
      icon="pi pi-arrow-right"
      iconPos="right"
      severity="success"
      @click="nextPage"
      class="button"
      label=""
      :loading="saving"
      :disabled="email.length < 1"
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
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'

const saving = ref(false)
const email = ref('')

async function nextPage() {
  saving.value = true
  try {
    await appStore.answerPage(email.value)
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

.emailInput {
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
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
