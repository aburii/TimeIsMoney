<template>
  <!-- LAPTOP AND + VERSION -->
  <div class="hidden md:flex h-full">
    <!-- Left sidebar -->
    <div class="w-1/4 border-r relative">
      <CryptoData :cryptoData="cryptoDetails" />
    </div>
    <!-- Main -->
    <div class="w-1/2 flex flex-col">
      <CryptoDataMain :cryptoData="cryptoDetails" />
    </div>
    <!-- Right sidebar -->
    <div class="w-1/4 flex flex-col border-l">
      <CryptoDataMessage />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useFetchAPI } from "../../composables/fetch.ts";
const route = useRoute();
const cryptoDetails = ref([]);

const fetchCryptoData = async () => {
  const cryptoSymbol = route.params.crypto || "BTC";
  const response = await useFetchAPI("GET", `/cryptos/${cryptoSymbol}/details`);
  if (response.ok) {
    cryptoDetails.value = response.data;
  } else {
    console.error("Failed to fetch crypto data", response.error);
    alert("Failed to fetch crypto data");
  }
};

onMounted(async () => {
  fetchCryptoData();
});
</script>
