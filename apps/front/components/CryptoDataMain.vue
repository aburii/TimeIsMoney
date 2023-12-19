<template>
  <!-- Content for center -->
  <div class="w-full border-b">
    <nav class="grid grid-cols-3 items-center">
      <button
        :class="[
          'text-xl  font-semibold p-8',
          selectedTab === 'charts' ? 'border-primary border-b-4' : '',
        ]"
        @click="handleButtonClick('charts')"
      >
        Charts
      </button>
      <button
        :class="[
          'text-xl font-semibold p-8',
          selectedTab === 'news' ? 'border-primary border-b-4' : '',
        ]"
        @click="handleButtonClick('news')"
      >
        News
      </button>
      <button
        :class="[
          'text-xl font-semibold p-8',
          selectedTab === 'about' ? 'border-primary border-b-4' : '',
        ]"
        @click="handleButtonClick('about')"
      >
        About
      </button>
    </nav>
  </div>
  <div class="flex-1 overflow-y-auto no-scrollbar">
    <!-- CHART FILTER -->
    <div
      id="charts"
      class="flex flex-row items-center sm:flex-row justify-between m-2 sm:m-8"
    >
      <div
        class="bg-base-200 p-2 rounded-xl border border-base-300 shadow my-2 sm:my-0"
      >
        <span
          @click="selectedChartType = 'line'"
          :class="[
            'inline-block p-2 sm:p-3 mx-1 sm:mx-4 rounded-xl text-xs sm:text-base',
            selectedChartType === 'line' ? 'bg-base-300 ' : '',
          ]"
          >Line</span
        >
        <span
          @click="selectedChartType = 'candle'"
          :class="[
            'inline-block p-2 sm:p-3 mx-1 sm:mx-2 rounded-xl text-xs sm:text-base',
            selectedChartType === 'candle' ? 'bg-base-300 ' : '',
          ]"
          >Candlestick</span
        >
      </div>

      <div
        class="bg-base-200 p-2 rounded-xl border border-base-300 shadow my-2 sm:my-0"
      >
        <span
          @click="selectedChartPeriode = 'minute'"
          :class="[
            'inline-block p-2 sm:p-3 mx-1 sm:mx-2 rounded-xl text-xs sm:text-base',
            selectedChartPeriode === 'minute' ? 'bg-base-300 ' : '',
          ]"
          >Minute</span
        >
        <span
          @click="selectedChartPeriode = 'hour'"
          :class="[
            'inline-block p-2 sm:p-3 mx-1 sm:mx-2 rounded-xl text-xs sm:text-base',
            selectedChartPeriode === 'hour' ? 'bg-base-300 ' : '',
          ]"
          >Hour</span
        >
        <span
          @click="selectedChartPeriode = 'day'"
          :class="[
            'inline-block p-2 sm:p-3 mx-1 sm:mx-2 rounded-xl text-xs sm:text-base',
            selectedChartPeriode === 'day' ? 'bg-base-300 ' : '',
          ]"
          >Day</span
        >
      </div>
    </div>

    <!-- CHART SECTION -->
    <div class="w-full" v-if="!chartLoading">
      <chart
        :key="selectedChartType"
        :chartData="Data"
        :openPrice="openPrice.value"
        :chartType="selectedChartType"
        class="border border-base-300 shadow m-4"
      />
    </div>

    <div
      class="flex justify-center items-center w-full h-96"
      v-if="chartLoading"
    >
      <div class="border border-base-300 shadow m-4">
        <span class="loading loading-spinner loading-xl"></span>
      </div>
    </div>

    <div id="news" class="mx-4 text-5xl font-semibold p-4 my-4">
      {{ cryptoData.coinName }} News
    </div>

    <div class="w-full rounded-xl">
      <div
        v-for="article in firstTenArticles"
        :key="article.id"
        class="mx-4 mb-8 bg-base-200 rounded-xl p-4 border border-base-300 shadow flex"
      >
        <div class="flex-grow">
          <div class="text-xs mb-2">
            {{ convertTimestampToTimeAgo(article.publishedOn) }} ago
          </div>
          <div class="font-bold text-3xl mb-2 custom-title">
            {{ article.title }}
          </div>
          <div class="overflow-y-auto max-h-50 custom-ellipsis">
            {{ article.body }}
          </div>
          <a :href="article.url" target="_blank" class="text-primary mt-2"
            >Read more</a
          >
        </div>
        <img
          :src="article.imageUrl"
          alt="Article Image"
          class="ml-4 self-start w-32 h-32 object-cover rounded"
        />
      </div>
    </div>

    <div id="about" class="mx-4 text-5xl font-semibold p-4 my-4">
      About {{ cryptoData.coinName }}
    </div>

    <div class="w-full h-full rounded-xl px-4">
      <div
        class="collapse collapse-arrow bg-base-200 border border-primary mb-4"
      >
        <input type="radio" name="my-accordion-2" checked="checked" />
        <div class="collapse-title text-xl font-medium">
          What is {{ cryptoData.coinName }} ?
        </div>
        <div class="collapse-content">
          <p>{{ cryptoData.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useFetchAPI } from "../composables/fetch.ts";
import { defineProps } from "vue";

const route = useRoute();
const selectedTab = ref("charts");
const selectedChartType = ref("line");
const selectedChartPeriode = ref("minute");
const rawHistoryData = ref([]);
const cryptoNews = ref([]);
const Data = ref([]);
const chartLoading = ref(true);
const openPrice = ref(0);
const props = defineProps({
  cryptoData: {
    type: Array,
    required: true,
  },
});

const handleButtonClick = (tabName) => {
  selectedTab.value = tabName;
  scrollTo(tabName);
};

const scrollTo = async (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

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

const firstTenArticles = computed(() => {
  return cryptoNews.value.slice(0, 5);
});

const formatDataForChartType = (historyData, chartType) => {
  return historyData.map((item) => {
    const timestamp = new Date(item.timeIso).getTime();
    return chartType === "line"
      ? [timestamp, item.open]
      : [timestamp, item.open, item.high, item.low, item.close];
  });
};

// const openPrice = computed(() => {
//   if (Data.value.length > 0 && selectedChartType.value === "line") {
//     return Data.value[0][1] * 1.1;
//   }
//   return 0;
// });

// Function to fetch historical data for a cryptocurrency
const fetchHistoricalData = async () => {
  chartLoading.value = true;
  const cryptoSymbol = route.params.crypto || "BTC";
  const aggregate = 1;
  let limit;
  switch (selectedChartPeriode.value) {
    case "minute":
      limit = 60;
      break;
    case "hour":
      limit = 24;
      break;
    case "day":
      limit = 7;
      break;
    default:
      limit = 60;
      break;
  }
  const period = selectedChartPeriode.value;
  const response = await useFetchAPI(
    "GET",
    `/cryptos/${cryptoSymbol}/history/${period}?limit=${limit}&aggregate=${aggregate}`
  );

  if (response.ok) {
    rawHistoryData.value = response.data.history;
    openPrice.value = rawHistoryData.value[0][1] * 0.9999;
    Data.value = formatDataForChartType(
      rawHistoryData.value,
      selectedChartType.value
    );
    chartLoading.value = false;
  } else {
    console.error("Failed to fetch historical data:", response.error);
    alert("Failed to fetch historical data");
  }
};

// Function to get details for a cryptocurrency
const fetchCryptoData = async () => {
  const cryptoSymbol = route.params.crypto || "BTC";
  const response = await useFetchAPI(
    "GET",
    `/cryptos/${cryptoSymbol}/articles`
  );
  if (response.ok) {
    cryptoNews.value = response.data.pages;
  } else {
    console.error("Failed to fetch crypto data", response.error);
    alert("Failed to fetch crypto data");
  }
};

onMounted(async () => {
  await fetchCryptoData();
  await fetchHistoricalData();
});

watch(selectedChartType, (newChartType) => {
  Data.value = formatDataForChartType(rawHistoryData.value, newChartType);
});

watch(selectedChartPeriode, () => {
  fetchHistoricalData();
});
</script>
