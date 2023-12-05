<template>
  <div class="py-4 md:py-8 lg:py-16 px-8 md:px-10 lg:px-16">
    <div class="text-4xl mb-10 font-semibold">Cryptocurrency News</div>
    <div class="w-full rounded-xl">
      <div
        class="mb-8 bg-base-200 rounded-xl p-4 mb-4 border border-base-300 shadow"
        v-for="n in 5"
        :key="n"
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
