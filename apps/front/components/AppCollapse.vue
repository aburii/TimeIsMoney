<script setup lang="ts">
defineProps<{
  id: string;
  collapseTitle: string;
  defaultOpen?: boolean;
}>();
</script>

<template>
  <div class="collapse collapse-arrow bg-base-200">
    <input type="radio" :name="id" :checked="defaultOpen" />
    <div class="collapse-title text-xl font-medium">{{ collapseTitle }}</div>
    <div class="collapse-content">
      <p>hello</p>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
