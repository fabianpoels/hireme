<template>
  <div class="centeredInput">
    <img :src="cookieMonster" />
  </div>
  <div class="centeredInput">
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
import { ref, onMounted, onUnmounted } from 'vue'

import { useAppStore } from '@/stores/app.store'
const appStore = useAppStore()

import { useToast } from 'primevue/usetoast'
const toast = useToast()

import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies()

import { alert } from '@/utils'

import cookieMonster from '@/assets/cookiemonster.jpeg'

import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const saving = ref(false)
const answer = ref('')

onMounted(() => {
  console.log('Just a random message')
  cookies.set('theAnswerForTheCookiePage', 'isBlowingInTheWind')
})

onUnmounted(() => {
  cookies.remove('theAnswerForTheCookiePage')
})

async function nextPage() {
  saving.value = true
  try {
    const result = await appStore.answerPage(answer.value)
    if (result === false) {
      alert.showWrongAnswer(toast, "I'm still hungry")
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
