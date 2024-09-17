<template>
  <Dialog
    v-model:visible="showDialog"
    :closable="false"
    :draggable="false"
    header="Cookie consent"
    :style="{ width: '30rem' }"
    modal
  >
    <div>
      Obivously this trashy webpage uses cookies to barely function. Without cookies, whatever
      functionality I managed to get working just breaks down completely. So yes, you'll need to
      accept them.
    </div>
    <template #footer>
      <Button outlined severity="danger" @click="decline()" :disabled="saving">
        No, I'm close-minded and overly sceptical of your intentions, so I refuse to have my browser
        be infected by your moldy cookies. Get me out of here NOW!
      </Button>
      <Button severity="success" @click="consent()" autofocus :loading="saving">
        Yes, thanks to the EU i'm fully aware what cookies are and what I accept by clicking this
        button.
      </Button>
    </template>
  </Dialog>
</template>
<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/app.store'
const appStore = useAppStore()

import { useToast } from 'primevue/usetoast'
const toast = useToast()

import { alert, randomUrl } from '@/utils'

import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

const showDialog = defineModel()
const saving = ref(false)

async function consent() {
  saving.value = true
  try {
    await appStore.consentToCookies()
    this.showDialog = false
  } catch (e) {
    alert.showError(toast, e)
  } finally {
    saving.value = false
  }
}

function decline() {
  window.location = randomUrl()
}
</script>
<style scoped></style>
