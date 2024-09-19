<template>
  <RouterView />
  <Transition name="fade">
    <main-buttons v-if="appStore.showMainButtons" />
  </Transition>
</template>
<script setup>
import { useAppStore } from '@/stores/app.store'
const appStore = useAppStore()
import MainButtons from '@/components/MainButtons.vue'
</script>
