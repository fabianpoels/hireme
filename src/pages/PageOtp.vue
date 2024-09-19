<template>
  <h1>E-mail verification</h1>
  <p>
    If you weren't too silly to provide an e-mail account to which you don't have access, you should
    gotten a message with a verification code.
  </p>
  <p>Should that not be the case, please blame the very cheap SMTP provider I'm using.</p>
  <p>You should know by now that spending money on this atrocity was not an option.</p>
  <div class="centeredInput">
    <InputOtp v-model="otp" integerOnly @input="input" @paste="input" :disabled="saving" />
  </div>
</template>
<script setup>
import { ref } from 'vue'

import { useAppStore } from '@/stores/app.store'
const appStore = useAppStore()

import { useToast } from 'primevue/usetoast'
const toast = useToast()

import { alert } from '@/utils'

import InputOtp from 'primevue/inputotp'

const saving = ref(false)
const otp = ref('')

function input() {
  if (otp.value && otp.value.length === 4) nextPage()
}

async function nextPage() {
  saving.value = true
  try {
    const result = await appStore.answerPage(otp.value)
    if (result === false) {
      alert.showWrongAnswer(toast, 'Copy/paste, very tricky it seems')
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

.otpInput {
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
