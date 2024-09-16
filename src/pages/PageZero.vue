<template>
  <h1>Welcome</h1>
  <p>For some reason you stumbled upon this page.</p>
  <p v-show="step > 0">So you're probably wondering, "WTF is this"</p>
  <Button icon="pi pi-arrow-down" severity="secondary" @click="step++" class="button" />
</template>
<script setup>
import { ref, computed } from 'vue'

import Button from 'primevue/button'

const step = ref(0)

const severity = computed(() => {})
</script>
<style scoped>
p {
  margin-top: 20px;
}

.button {
  margin-top: 20px;
}
</style>
