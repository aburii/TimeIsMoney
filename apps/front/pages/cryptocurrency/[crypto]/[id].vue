<template>
  <!-- LAPTOP AND + VERSION -->
  <div class="flex flex-col md:flex-row h-full">
    <!-- Left sidebar -->
    <div class="md:w-1/3 w-full relative h-auto md:h-full">
      <CryptoData :cryptoData="cryptoDetails" />
    </div>
    <!-- Main -->
    <div class="md:w-2/3 flex md:border-l flex-col">
      <CryptoDataMain :cryptoData="cryptoDetails" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useFetchAPI } from "../../../composables/fetch.ts";
const route = useRoute();
const cryptoDetails = ref([]);

const fetchCryptoData = async () => {
  const cryptoSymbol = route.params.crypto || "BTC";
  const response = await useFetchAPI("GET", `/cryptos/${cryptoSymbol}/details`);
  if (response.ok) {
    cryptoDetails.value = response.data;
  } else {
    alert("Failed to fetch crypto data");
  }
};

onMounted(async () => {
  fetchCryptoData();
});
</script>
