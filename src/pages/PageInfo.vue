<template>
  <h1>So...</h1>
  <p>
    Here's some information which you might find helpful. Go ahead and skip everything, you will
    only regret it later.
  </p>
  <TransitionGroup name="fade">
    <template v-for="(text, index) in texts" :key="index">
      <p v-if="text.tooltip" :class="text.class" v-tooltip.top="text.tooltip">{{ text.text }}</p>
      <p v-else :class="text.class">{{ text.text }}</p>
    </template>
  </TransitionGroup>
  <Button
    icon="pi pi-arrow-down"
    severity="secondary"
    @click="step++"
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
      label="I didn't read any of that, I just want to get going"
      :loading="saving"
    />
  </Transition>
</template>
<script setup>
import { ref, computed } from 'vue'

import { useAppStore } from '@/stores/app.store'
const appStore = useAppStore()

import { useToast } from 'primevue/usetoast'
const toast = useToast()

import { alert } from '@/utils'

import Button from 'primevue/button'

const allTexts = [
  { text: 'What you will need:', class: '' },
  { text: 'A modern browser like Internet Explorer', class: 'noPadding paddingLeft' },
  {
    text: 'A desktop',
    class: 'noPadding paddingLeft',
    tooltip: 'you read it here first: smartphones are useless'
  },
  {
    text: 'Minor programming experience',
    class: 'noPadding paddingLeft'
  },
  {
    text: 'Some free time',
    class: 'noPadding paddingLeft',
    tooltip: 'face it: you have nothing better to do'
  },
  {
    text: 'The rules:'
  },
  {
    text: 'Every round will require you to give some kind of answer, or click on something',
    class: 'noPadding paddingLeft'
  },
  {
    text: 'Every - wrong - guess will cost you points',
    class: 'noPadding paddingLeft'
  },
  {
    text: 'Every hint you take will cost you points',
    class: 'noPadding paddingLeft'
  },
  {
    text: 'Ah yes, there will be hints',
    class: 'noPadding paddingLeft'
  },
  {
    text: "If you try to cheat, there's a high chance your computer will explode",
    class: 'noPadding paddingLeft'
  },
  {
    text: 'The potential rewards:'
  },
  {
    text: 'A spot on the Wall Of Fame',
    class: 'noPadding paddingLeft'
  },
  {
    text: 'Two new viruses on your machine, and a compromised e-mail account',
    class: 'noPadding paddingLeft'
  },
  {
    text: 'My contact details and resume so you can start considering to hire me',
    class: 'noPadding paddingLeft'
  }
]

const texts = computed(() => {
  return allTexts.slice(0, step.value + 1)
})

const step = ref(-1)
const saving = ref(false)

async function nextPage() {
  saving.value = true
  console.log(
    `You had to click approximately ${allTexts.length + 1} times to get through this page`
  )
  try {
    await appStore.answerPage("i'm still a moron")
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

p.noPadding {
  margin-top: 5px;
}

p.noPadding {
  margin-left: 10px;
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
