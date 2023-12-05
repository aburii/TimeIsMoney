<script setup lang="ts"></script>

<template>
  <div class="p-4 mx-auto w-full md:w-4/5">
    <div class="text-4xl mb-10 font-semibold">Cryptocurrency News</div>
    <div class="w-full rounded-xl">
      <div
        class="mx-4 mb-8 bg-base-200 rounded-xl p-4 mb-4 border border-base-300 shadow"
        v-for="n in 5"
      >
        <div class="">
          <div class="text-xs mb-2">{{ n * 2 }} minutes ago</div>
          <div class="font-bold text-3xl mb-2">News Article #{{ n }}</div>
          <div class="flex w-2/4">This is a news article</div>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-4">
      <div class="join">
        <button class="join-item btn-sm btn btn-active">1</button>
        <button class="join-item btn btn-sm">2</button>
        <button class="join-item btn btn-sm">3</button>
        <button class="join-item btn btn-sm">4</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
