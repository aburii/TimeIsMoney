<template>
  <div class="p-4 mx-auto w-full md:w-4/5">
    <div class="text-4xl mb-10 font-semibold">Cryptocurrency News</div>
    <div class="flex justify-between mb-8 mt-4">
      <div class="form-control">
        <input
          type="text"
          placeholder="News search"
          class="input input-bordered md:w-auto"
        />
      </div>
      <div class="join tooltip" data-tip="Show rows">
        <button
          class="join-item btn-xs sm:btn btn btn-active sm:btn-active h-12 sm:h-auto"
        >
          25
        </button>
        <button class="join-item btn-xs sm:btn btn h-12 sm:h-auto">50</button>
        <button class="join-item btn-xs sm:btn btn h-12 sm:h-auto">100</button>
      </div>
    </div>
    <div class="w-full rounded-xl">
      <div
        v-for="article in cryptoData"
        :key="article.id"
        class="mx-4 mb-8 bg-base-200 rounded-xl p-4 border border-base-300 shadow flex flex-col md:flex-row"
      >
        <img
          :src="article.imageUrl"
          alt="Article Image"
          class="self-start w-full md:w-32 md:h-32 object-cover rounded mb-4 md:mb-0 md:ml-4 mr-2"
        />
        <div class="flex-grow">
          <div class="text-xs md:text-sm mb-2">
            {{ convertTimestampToTimeAgo(article.publishedOn) }} ago
          </div>
          <div class="font-bold text-xl md:text-3xl mb-2 custom-title">
            {{ article.title }}
          </div>
          <div
            class="overflow-y-auto max-h-50 custom-ellipsis text-sm md:text-base"
          >
            {{ article.body }}
          </div>
          <a
            :href="article.url"
            target="_blank"
            class="text-primary mt-2 text-sm md:text-base"
            >Read more</a
          >
        </div>
      </div>
      <div
        v-if="cryptoData.length == 0"
        v-for="n in 3"
        class="mx-4 h-40 w-auto text-5xl font-semibold p-4 my-4 skeleton"
      ></div>
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

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useFetchAPI } from "../composables/fetch.ts";
const cryptoData = ref([]);

function convertTimestampToTimeAgo(timestamp) {
  const timeElapsed = Date.now() - new Date(timestamp * 1000);
  const seconds = Math.floor(timeElapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else {
    return `${days} days ago`;
  }
}

const fetchCryptoData = async () => {
  const response = await useFetchAPI("GET", `/articles`);
  if (response.ok) {
    cryptoData.value = response.data;
  } else {
    console.error("Failed to fetch crypto data", response.error);
    alert("Failed to fetch crypto data");
  }
};

onMounted(() => {
  fetchCryptoData();
});
</script>
