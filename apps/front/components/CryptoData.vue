<template>
  <div class="absolute top-0 right-0 p-2 text-xl">
  <Star/>
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
      <span class="btn bg-base-300 rounded-xl p-2 mx-2">Website</span>
      <span class="btn bg-base-300 rounded-xl p-2 mx-2">Github</span>
      <span class="btn bg-base-300 rounded-xl p-2 mx-2">White paper</span>
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
