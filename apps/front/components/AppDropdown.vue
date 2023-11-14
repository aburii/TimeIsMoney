<script setup lang="ts">
defineProps<{
  buttonLabel: string
  buttonClass: string
}>()
</script>

<template>
  <div class="dropdown">
    <label tabindex="0" :class="buttonClass">{{ buttonLabel }}</label>
    <div class="dropdown-content mt-1 z-[1] border-t shadow menu p-2 bg-base-100 rounded-lg w-52">
      <slot />
    </div>
  </div>
</template>
