<template>
  <div id="mainButtons">
    <Button
      rounded
      outlined
      size="small"
      icon="pi pi-info-circle"
      severity="secondary"
      aria-label="Information"
      @click="showDialog = true"
    />
    <Dialog
      v-model:visible="showDialog"
      modal
      :draggable="false"
      header="About"
      :style="{ width: '30rem' }"
    >
      <div>
        JIRA-327: add comprehensive explanation why I went to such great lenghts for creating such a
        disgrace of a webpage
      </div>
      <template #footer> </template>
    </Dialog>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

const showDialog = ref(false)
</script>
<style scoped>
#mainButtons {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
