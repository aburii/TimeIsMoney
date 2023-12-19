<template>
  <div v-if="cryptoData.coinName" class="absolute top-0 right-0 p-2 text-xl">
    <Star :crypto="cryptoData.coinName" />
  </div>
  <!-- Content for left sidebar -->
  <div v-if="cryptoData.coinName" class="mb-6 mx-4">
    <div class="flex items-center mt-4">
      <img
        :src="cryptoData.imageUrl"
        alt="Crypto Icon"
        class="h-10 w-10 mr-2"
      />
      <h2 class="text-3xl font-semibold">{{ cryptoData.coinName }}</h2>
      <h2 class="text-lg ml-2">{{ cryptoData.symbol }}</h2>
    </div>
    <div class="text-5xl flex items-center font-bold">
      {{ formatNumberWithSpaces(Number(cryptoData2.currentPrice).toFixed(2)) }}
      €
      <div
        class="text-lg mb-4 ml-4"
        :class="{
          'text-green-500': cryptoData2.hourCandle?.changePercent >= 0,
          'text-red-500': cryptoData2.hourCandle?.changePercent < 0,
        }"
      >
        {{ Number(cryptoData2.hourCandle.changePercent).toFixed(3) + "% (1h)" }}
      </div>
    </div>
  </div>

  <div v-else class="h-32 w-auto mb-6 mx-4 skeleton"></div>

  <div
    v-if="cryptoData2.marketCap"
    class="flex justify-between items-center mb-3 mx-4"
  >
    <span>Market Cap</span>
    <span class="font-semibold"
      >{{ formatLargeNumber(Number(cryptoData2.marketCap)) }} €
    </span>
  </div>

  <div
    v-else
    class="flex w-auto h-10 justify-between items-center mb-3 mx-4 skeleton"
  ></div>

  <div
    v-if="cryptoData2.last24hCandle"
    class="flex justify-between items-center mb-3 mx-4"
  >
    <span>Volume (24h)</span>
    <span class="font-semibold"
      >{{
        formatLargeNumber(Number(cryptoData2.last24hCandle?.volumeCoin)) ||
        "Loading..."
      }}
      €</span
    >
  </div>

  <div
    v-else
    class="flex w-auto h-10 justify-between items-center mb-3 mx-4 skeleton"
  ></div>

  <!-- <div class="flex justify-between items-center mb-3 mx-4">
    <span>Offre Totale</span>
    <span class="font-semibold">19.55M BTC</span>
  </div> -->

  <div
    v-if="cryptoData.maxSupply > 0"
    class="flex justify-between items-center mb-6 mx-4"
  >
    <span>Offre max</span>
    <span class="font-semibold"
      >{{ formatLargeNumber(Math.ceil(cryptoData.maxSupply)) }}
      {{ cryptoData.symbol }}</span
    >
  </div>

  <div class="mb-6 mt-6">
    <div
      v-if="cryptoData.website || cryptoData.github || cryptoData.whitepaper"
      class="flex justify-between items-center mb-3 mx-4"
    >
      <span class="font-semibold">Official Links</span>
    </div>

    <div class="flex items-center mb-3 mx-4">
      <a
        v-if="cryptoData.website"
        :href="cryptoData.website"
        class="btn bg-base-300 rounded-xl p-2 mx-2"
        target="_blank"
        >Website</a
      >
      <a
        v-if="cryptoData.github"
        :href="cryptoData.github"
        class="btn bg-base-300 rounded-xl p-2 mx-2"
        target="_blank"
        >Github</a
      >
      <a
        v-if="cryptoData.whitepaper"
        :href="cryptoData.whitepaper"
        class="btn bg-base-300 rounded-xl p-2 mx-2"
        target="_blank"
        >White paper</a
      >
    </div>
    <div
      v-if="cryptoData.length == 0"
      class="flex w-auto h-10 items-center mb-3 mx-4 skeleton"
    ></div>
  </div>
  <!-- <div class="mb-6">
    <div class="flex justify-between items-center mb-3 mx-4">
      <span class="font-semibold">Socials</span>
    </div>

    <div class="flex items-center mb-3 mx-4">
      <span class="btn bg-base-300 rounded-xl p-2 mx-2">Reddit</span>
      <span class="btn bg-base-300 rounded-xl p-2 mx-2">Instagram</span>
    </div>
  </div> -->
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useFetchAPI } from "../composables/fetch.ts";
import { defineProps } from "vue";
const route = useRoute();
const isToggled = ref(false);
const cryptoData2 = ref([]);
const props = defineProps({
  cryptoData: {
    type: Array,
    required: true,
  },
});

function formatNumberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function formatLargeNumber(number) {
  if (number >= 1e9) {
    return (number / 1e9).toFixed(0) + "B";
  } else if (number >= 1e6) {
    return (number / 1e6).toFixed(0) + "M";
  } else if (number >= 1e3) {
    return (number / 1e3).toFixed(0) + "K";
  }
  return number.toString();
}
const fetchCryptoData = async () => {
  const pricesResponse = await useFetchAPI<any>(
    "GET",
    `/cryptos/${route.params.crypto}/prices`
  );
  if (pricesResponse.ok) {
    cryptoData2.value = pricesResponse.data.EUR;
  } else {
    alert("Failed fetching data");
  }
};

onMounted(async () => {
  fetchCryptoData();
});
</script>
