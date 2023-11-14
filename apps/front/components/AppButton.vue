<template>
  <button
      :id="id"
      class="btn"
      :disabled="disabled || loading"
  >
    <template v-if="loading">
      <span class="loading loading-spinner"></span>
      {{ loadingLabel }}
    </template>
    <template v-else>
      {{ label }}
    </template>
  </button>
</template>
<script setup lang="ts">
defineProps<{
  id: string
  label?: string
  loadingLabel?: string
  loading?: boolean
  disabled?: boolean
}>()
</script>
<style scoped lang="scss"></style>
