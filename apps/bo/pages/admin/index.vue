<script setup lang="ts">
const sessionStore = useSessionStore();
</script>

<template>
  <section>
    <h1>Hey {{ sessionStore.user }}</h1>
  </section>
</template>

<style scoped lang="scss"></style>
