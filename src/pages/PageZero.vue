<template>
  <h1>Welcome</h1>
  <p>For some reason you stumbled upon this page.</p>
  <TransitionGroup name="fade">
    <p v-for="(text, index) in texts" :key="index">
      {{ text }}
    </p>
  </TransitionGroup>
  <Button
    icon="pi pi-arrow-down"
    severity="secondary"
    @click="doStep"
    class="button"
    v-if="step < allTexts.length"
  />
  <Transition name="fade">
    <Button
      icon="pi pi-arrow-right"
      iconPos="right"
      severity="success"
      @click="nextPage"
      class="button"
      v-if="step === allTexts.length"
      label="I'm already slightly bored but OK tell me more"
      :loading="saving"
    />
  </Transition>
</template>
<script setup>
import { ref, computed } from 'vue'
const emit = defineEmits(['showMainButtons'])

import { useAppStore } from '@/stores/app.store'
const appStore = useAppStore()

import { useToast } from 'primevue/usetoast'
const toast = useToast()

import { alert } from '@/utils'

import Button from 'primevue/button'

const allTexts = [
  'So you\'re probably wondering, "WTF is this"',
  "If you're honestly interested in that, I just added a button on the top right that might interest you.",
  'But in short: I built a sort of browser game to - most likely - annoy you.',
  'Warning from the main developer: the game is as entertaining as it is well crafted.'
]

const texts = computed(() => {
  return allTexts.slice(0, step.value + 1)
})

const step = ref(-1)
const saving = ref(false)

function doStep() {
  step.value++
  if (step.value === 1) emit('showMainButtons', true)
}

async function nextPage() {
  saving.value = true
  try {
    await appStore.answerPage("i'm a moron")
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
  margin-top: 20px;
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
