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
      <div class="bg-base-200 p-2 rounded-xl border border-base-300 shadow my-2 sm:my-0">
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

      <div class="bg-base-200 p-2 rounded-xl border border-base-300 shadow my-2 sm:my-0">
        <span
          @click="selectedChartPeriode = '1D'"
          :class="[
            'inline-block p-2 sm:p-3 mx-1 sm:mx-2 rounded-xl text-xs sm:text-base',
            selectedChartPeriode === '1D' ? 'bg-base-300 ' : '',
          ]"
          >1D</span
        >
        <span
          @click="selectedChartPeriode = '7D'"
          :class="[
            'inline-block p-2 sm:p-3 mx-1 sm:mx-2 rounded-xl text-xs sm:text-base',
            selectedChartPeriode === '7D' ? 'bg-base-300 ' : '',
          ]"
          >7D</span
        >
        <span
          @click="selectedChartPeriode = '1M'"
          :class="[
            'inline-block p-2 sm:p-3 mx-1 sm:mx-2 rounded-xl text-xs sm:text-base',
            selectedChartPeriode === '1M' ? 'bg-base-300 ' : '',
          ]"
          >1M</span
        >
      </div>
    </div>

    <!-- CHART SECTION -->
    <div class="w-full">
      <chart
        :key="selectedChartType"
        :chartData="Data"
        :openPrice="openPrice"
        :chartType="selectedChartType"
        class="border border-base-300 shadow m-4"
      />
    </div>

    <div id="news" class="mx-4 text-5xl font-semibold p-4 my-4">
      {{ $route.params.crypto }} news
    </div>

    <div class="w-full rounded-xl">
      <div
        class="mx-4 mb-8 bg-base-200 rounded-xl p-4 mb-4 border border-base-300 shadow"
        v-for="n in 10"
      >
        <div class="">
          <div class="text-xs mb-2">{{ n * 2 }} minutes ago</div>
          <div class="font-bold text-3xl mb-2">News Article #{{ n }}</div>
          <div class="flex w-2/4">This is a news article</div>
        </div>
      </div>
    </div>

    <div id="about" class="mx-4 text-5xl font-semibold p-4 my-4">
      About {{ $route.params.crypto }}
    </div>

    <div class="w-full h-full rounded-xl px-4">
      <div
        className="collapse collapse-arrow bg-base-200 border border-primary mb-4"
      >
        <input type="radio" name="my-accordion-2" checked="checked" />
        <div className="collapse-title text-xl font-medium">
          What is {{ $route.params.crypto }} ?
        </div>
        <div className="collapse-content">
          <p>info</p>
        </div>
      </div>
      <div
        className="collapse collapse-arrow bg-base-200 border border-primary mb-4"
      >
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          Who created {{ $route.params.crypto }} ?
        </div>
        <div className="collapse-content">
          <p>info</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const route = useRoute();
const selectedTab = ref("charts");
const selectedChartType = ref("line");
const selectedChartPeriode = ref("1D");

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

const openPrice = 33120;

const lineSampleData = [
  [new Date("2023-01-22T00:00:00").getTime(), 34120],
  [new Date("2023-01-22T01:00:00").getTime(), 34140],
  [new Date("2023-01-22T02:00:00").getTime(), 34190],
  [new Date("2023-01-22T03:00:00").getTime(), 33400],
  [new Date("2023-01-22T04:00:00").getTime(), 34050],
  [new Date("2023-01-22T05:00:00").getTime(), 35120],
  [new Date("2023-01-22T06:00:00").getTime(), 34050],
  [new Date("2023-01-22T07:00:00").getTime(), 34424],
  [new Date("2023-01-22T08:00:00").getTime(), 33130],
  [new Date("2023-01-22T09:00:00").getTime(), 34200],
  [new Date("2023-01-22T10:00:00").getTime(), 31100],
  [new Date("2023-01-22T11:00:00").getTime(), 31050],
  [new Date("2023-01-22T12:00:00").getTime(), 31000],
  [new Date("2023-01-22T13:00:00").getTime(), 32000],
  [new Date("2023-01-22T14:00:00").getTime(), 32130],
  [new Date("2023-01-22T15:00:00").getTime(), 32140],
  [new Date("2023-01-22T16:00:00").getTime(), 32000],
  [new Date("2023-01-22T17:00:00").getTime(), 31400],
  [new Date("2023-01-22T18:00:00").getTime(), 34100],
  [new Date("2023-01-22T19:00:00").getTime(), 34300],
  [new Date("2023-01-22T20:00:00").getTime(), 34700],
  [new Date("2023-01-22T21:00:00").getTime(), 36340],
  [new Date("2023-01-22T22:00:00").getTime(), 37280],
  [new Date("2023-01-22T23:00:00").getTime(), 36780],
];

const candlestickSampleData = [
  [new Date("2023-01-22T00:00:00").getTime(), 34120, 33000, 35000, 34000],
  [new Date("2023-01-22T01:00:00").getTime(), 34000, 33500, 34200, 33600],
  [new Date("2023-01-22T02:00:00").getTime(), 33600, 33000, 33700, 33150],
  [new Date("2023-01-22T03:00:00").getTime(), 33150, 32900, 33300, 33000],
  [new Date("2023-01-22T04:00:00").getTime(), 33000, 32800, 33200, 32950],
  [new Date("2023-01-22T05:00:00").getTime(), 32950, 32700, 33050, 32800],
  [new Date("2023-01-22T06:00:00").getTime(), 32800, 32600, 32900, 32750],
  [new Date("2023-01-22T07:00:00").getTime(), 32750, 32500, 32800, 32600],
  [new Date("2023-01-22T08:00:00").getTime(), 32600, 32400, 32700, 32550],
  [new Date("2023-01-22T09:00:00").getTime(), 32550, 32300, 32600, 32400],
  [new Date("2023-01-22T10:00:00").getTime(), 32400, 32200, 32500, 32350],
  [new Date("2023-01-22T11:00:00").getTime(), 32350, 32100, 32400, 32200],
  [new Date("2023-01-22T12:00:00").getTime(), 32200, 32000, 32300, 32150],
  [new Date("2023-01-22T13:00:00").getTime(), 32150, 31900, 32200, 32000],
  [new Date("2023-01-22T14:00:00").getTime(), 32150, 34100, 34050, 34000],
  [new Date("2023-01-22T14:00:00").getTime(), 32150, 34100, 34050, 34000],
  [new Date("2023-01-22T14:00:00").getTime(), 32150, 34100, 34050, 34000],
  [new Date("2023-01-22T15:00:00").getTime(), 31950, 31700, 32000, 31800],
  [new Date("2023-01-22T16:00:00").getTime(), 31800, 31600, 31900, 31750],
  [new Date("2023-01-22T17:00:00").getTime(), 31750, 31500, 31800, 31600],
  [new Date("2023-01-22T18:00:00").getTime(), 31600, 31400, 31700, 31550],
  [new Date("2023-01-22T19:00:00").getTime(), 31550, 31300, 31600, 31400],
  [new Date("2023-01-22T20:00:00").getTime(), 31400, 31200, 31500, 31350],
  [new Date("2023-01-22T21:00:00").getTime(), 31350, 31100, 31400, 31200],
  [new Date("2023-01-22T22:00:00").getTime(), 31200, 31000, 31300, 31150],
  [new Date("2023-01-22T23:00:00").getTime(), 31150, 30900, 31200, 31000],
];

const Data = computed(() => {
  if (selectedChartType.value === "line") {
    return lineSampleData;
  } else {
    return candlestickSampleData;
  }
});
</script>
