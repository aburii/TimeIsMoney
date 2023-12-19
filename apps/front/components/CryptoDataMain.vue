<template>
  <!-- Content for center -->
  <div class="hidden w-full sm:hidden md:block">
    <nav class="grid grid-cols-3 items-center">
      <button
        :class="[
          'text-xl  font-semibold p-3',
          selectedTab === 'charts' ? 'border-primary border-b-2' : 'border-b-2',
        ]"
        @click="handleButtonClick('charts')"
      >
        Charts
      </button>
      <button
        :class="[
          'text-xl font-semibold p-3',
          selectedTab === 'news' ? 'border-primary border-b-2' : 'border-b-2',
        ]"
        @click="handleButtonClick('news')"
      >
        News
      </button>
      <button
        :class="[
          'text-xl font-semibold p-3',
          selectedTab === 'about' ? 'border-primary border-b-2' : 'border-b-2',
        ]"
        @click="handleButtonClick('about')"
      >
        About
      </button>
    </nav>
  </div>
  <div class="flex-1 overflow-y-auto no-scrollbar">
    <!-- CHART FILTER -->
    <div id="charts"></div>
    <div class="flex mt-4 md:mx-4 mx-2 flex-row justify-between">
      <div role="tablist" class="tabs tabs-boxed">
        <a
          @click="selectedChartType = 'line'"
          role="tab"
          :class="['tab', selectedChartType === 'line' ? 'tab-active' : '']"
          >Line</a
        >
        <a
          @click="selectedChartType = 'candle'"
          role="tab"
          :class="['tab', selectedChartType === 'candle' ? 'tab-active' : '']"
          >Candlestick</a
        >
      </div>

      <div role="tablist" class="tabs tabs-boxed">
        <a
          @click="selectedChartPeriode = 'minute'"
          role="tab"
          :class="[
            'tab',
            selectedChartPeriode === 'minute' ? 'tab-active' : '',
          ]"
          >Minute</a
        >
        <a
          @click="selectedChartPeriode = 'hour'"
          role="tab"
          :class="['tab', selectedChartPeriode === 'hour' ? 'tab-active' : '']"
          >Hour</a
        >
        <a
          @click="selectedChartPeriode = 'day'"
          role="tab"
          :class="['tab', selectedChartPeriode === 'day' ? 'tab-active' : '']"
          >Day</a
        >
      </div>
    </div>

    <!-- CHART SECTION -->
    <div class="w-full" v-if="!chartLoading">
      <chart
        :key="selectedChartType"
        :chartData="Data"
        :openPrice="openPrice"
        :chartType="selectedChartType"
        class="border border-base-300 shadow m-4"
      />
    </div>

    <div class="flex justify-center items-center" v-if="chartLoading">
      <div
        :style="{ height: '400px' }"
        class="skeleton w-full shadow m-4 flex justify-center"
      >
        <span class="loading loading-ring text-primary loading-lg"></span>
      </div>
    </div>

    <div
      v-if="cryptoData.coinName"
      id="news"
      class="mx-4 text-5xl font-semibold p-4 my-4"
    >
      {{ cryptoData.coinName }} News
    </div>
    <div
      v-else
      id="news"
      class="mx-4 w-1/3 h-12 text-5xl font-semibold p-4 my-4 skeleton"
    ></div>

    <div class="w-full rounded-xl">
      <div
        v-for="article in firstTenArticles"
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
        v-if="firstTenArticles.length == 0"
        v-for="n in 3"
        class="mx-4 h-40 w-auto text-5xl font-semibold p-4 my-4 skeleton"
      ></div>
    </div>

    <div
      v-if="cryptoData.coinName"
      id="about"
      class="mx-4 text-5xl font-semibold p-4 my-4"
    >
      About {{ cryptoData.coinName }}
    </div>
    <div
      v-else
      class="mx-4 w-1/3 h-12 text-5xl font-semibold p-4 my-4 skeleton"
    ></div>

    <div v-if="cryptoData.description" class="w-full h-full rounded-xl px-4">
      <div class="collapse collapse-arrow bg-base-200 mb-4">
        <input type="radio" name="my-accordion-2" checked="checked" />
        <div class="collapse-title text-xl font-medium">
          What is {{ cryptoData.coinName }} ?
        </div>
        <div class="collapse-content">
          <p>{{ cryptoData.description }}</p>
        </div>
      </div>
    </div>
    <div
      v-else
      class="mx-4 w-auto h-20 text-5xl font-semibold p-4 my-4 skeleton"
    ></div>
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
    type: Object,
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
    openPrice.value = rawHistoryData.value[0].open;
    console.log(rawHistoryData.value[0].open);
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
