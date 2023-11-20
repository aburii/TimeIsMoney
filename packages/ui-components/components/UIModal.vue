<script setup lang="ts">
defineProps<{
  id: string
  buttonClass: string
  buttonLabel: string
  disabled?: boolean
}>()
</script>

<template>
  <label :for="id" :class="buttonClass">{{ buttonLabel }}</label>

  <input type="checkbox" :id="id" class="modal-toggle" />
  <div class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <label class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" :for="id">✕</label>
      <slot />
    </div>
    <label class="modal-backdrop" :for="id">Close</label>
  </div>
</template>

<style scoped lang="scss">

</style>