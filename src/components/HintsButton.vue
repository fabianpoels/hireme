<template>
  <div id="hintsButton">
    <Button
      rounded
      raised
      size="small"
      icon="pi pi-question-circle"
      severity="primary"
      aria-label="Hints"
      label="Hints"
      @click="showDialog = true"
    />
    <Dialog
      v-model:visible="showDialog"
      modal
      :draggable="false"
      :closable="!loading"
      header="Hints"
      :style="{ width: '30rem' }"
    >
      <div>
        <div v-if="appStore.hints.length < 1">No hints taken yet</div>
        <template v-for="(hint, index) in appStore.hints">
          <div class="hint">
            <Button :label="`${index + 1}`" disabled severity="secondary" rounded />
            <div class="hintContent">{{ hint }}</div>
          </div>
        </template>
      </div>
      <template #footer>
        <Button
          v-if="appStore.hintsLeft"
          icon="pi pi-arrow-right"
          iconPos="right"
          severity="success"
          @click="getHint"
          label="Get a hint"
          :loading="loading"
        />
        <Button v-else severity="secondary" label="No hints left" disabled />
      </template>
    </Dialog>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/app.store'
const appStore = useAppStore()

import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

const showDialog = ref(false)
const loading = ref(false)

async function getHint() {
  loading.value = true
  try {
    await appStore.getHint()
  } catch (e) {
    alert.showError(toast, e)
  } finally {
    loading.value = false
  }
}
</script>
<style scoped>
#hintsButton {
  position: absolute;
  bottom: 10px;
  left: 10px;
}

.hint {
  display: flex;
  align-items: start;
  margin-bottom: 30px;
}

.hintContent {
  margin-left: 10px;
}
</style>
