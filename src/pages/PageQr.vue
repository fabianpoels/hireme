<template>
  <div class="centeredInput">
    <qrcode-stream :formats="['qr_code']" @detect="onDetect" @error="onError"></qrcode-stream>
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

import { QrcodeStream } from 'vue-qrcode-reader'

const saving = ref(false)

function onDetect(val) {
  if (!!val[0] && !!val[0].rawValue) {
    nextPage(val[0].rawValue)
    return
  }
  onError()
}

function onError() {
  alert.showCustomError(
    toast,
    'Something was wrong with the object or body part you held in front of the camera'
  )
}

async function nextPage(val) {
  saving.value = true
  try {
    const result = await appStore.answerPage(val)
    if (result === false) {
      alert.showWrongAnswer(toast, 'You will definitely need hints this time')
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
