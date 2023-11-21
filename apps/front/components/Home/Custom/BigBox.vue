<template>
  <div :class="`rounded-md bg-gradient-to-b ${color} p-1 h-[300px]`">
    <div
      class="flex flex-col w-450 h-full flex-col justify-center items-center gap-2 bg-[#1D232A] p-4 text-justify"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps(["color"]);
</script>
