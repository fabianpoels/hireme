<template>
  <div class="fullscreen">
    <ProgressBar :value="appStore.progress" :showValue="false" class="progressbar" />
    <slot />
  </div>
</template>
<script setup>
import { useAppStore } from '@/stores/app.store'
const appStore = useAppStore()

import ProgressBar from 'primevue/progressbar'
</script>
<style scoped>
.fullscreen {
  width: 100%;
  height: 100%;
}

.progressbar {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
