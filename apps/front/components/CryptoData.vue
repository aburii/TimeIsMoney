<template>
  <div
    @click="isToggled = !isToggled"
    class="absolute top-0 right-0 p-2 text-xl"
  >
    <svg
      v-if="!isToggled"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="gold"
      class="w-6 h-6"
    >
      <path
        fill-rule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clip-rule="evenodd"
      />
    </svg>
  </div>
  <!-- Content for left sidebar -->
  <div class="mb-12 mx-4">
    <div class="flex items-center mt-4">
      <h2 class="text-3xl font-semibold">{{ $route.params.crypto }}</h2>
      <h2 class="text-lg ml-2">btc</h2>
    </div>
    <div class="text-5xl font-bold">€34,118.71</div>
    <div class="text-lg text-green-500 mb-4">0.28% (1h)</div>
  </div>

  <div class="flex justify-between items-center mb-3 mx-4">
    <span>Market Cap</span>
    <span class="font-semibold">€666.98B</span>
  </div>

  <div class="flex justify-between items-center mb-3 mx-4">
    <span>Volume (24h)</span>
    <span class="font-semibold">€18.46B</span>
  </div>

  <div class="flex justify-between items-center mb-3 mx-4">
    <span>Offre Totale</span>
    <span class="font-semibold">19.55M BTC</span>
  </div>

  <div class="flex justify-between items-center mb-6 mx-4">
    <span>Offre max</span>
    <span class="font-semibold">21M BTC</span>
  </div>

  <div class="mb-6">
    <div class="flex justify-between items-center mb-3 mx-4">
      <span class="font-semibold">Official Links</span>
    </div>

    <div class="flex items-center mb-3 mx-4">
      <span class="btn bg-base-300 text-black rounded-xl p-2 mx-2"
        >Website</span
      >
      <span class="btn bg-base-300 text-black rounded-xl p-2 mx-2">Github</span>
      <span class="btn bg-base-300 text-black rounded-xl p-2 mx-2"
        >White paper</span
      >
    </div>
  </div>
  <div class="mb-6">
    <div class="flex justify-between items-center mb-3 mx-4">
      <span class="font-semibold">Socials</span>
    </div>

    <div class="flex items-center mb-3 mx-4">
      <span class="btn bg-base-300 rounded-xl p-2 mx-2">Reddit</span>
      <span class="btn bg-base-300 rounded-xl p-2 mx-2">Instagram</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const route = useRoute();
const isToggled = ref(false);
</script>
