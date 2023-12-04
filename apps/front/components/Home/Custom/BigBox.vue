<template>
  <div :class="`rounded-md bg-gradient-to-b ${color} p-1 h-[300px]`">
    <div
      class="bg-base-100 flex flex-col w-450 h-full flex-col justify-center items-center gap-2 p-4 text-justify"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps(["color"]);
</script>
