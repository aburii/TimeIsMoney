<template>
  <div class="flex h-full">
    <div class="w-1/4 px-8 border-r relative">
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
      <div class="mb-12">
        <div class="flex items-center mt-4">
          <h2 class="text-3xl font-semibold">{{ $route.params.crypto }}</h2>
          <h2 class="text-lg ml-2">btc</h2>
        </div>
        <div class="text-5xl font-bold">€34,118.71</div>
        <div class="text-lg text-green-500 mb-4">0.28% (1h)</div>
      </div>

      <div class="flex justify-between items-center mb-3">
        <span>Market Cap</span>
        <span class="font-semibold">€666.98B</span>
      </div>

      <div class="flex justify-between items-center mb-3">
        <span>Volume (24h)</span>
        <span class="font-semibold">€18.46B</span>
      </div>

      <div class="flex justify-between items-center mb-3">
        <span>Offre Totale</span>
        <span class="font-semibold">19.55M BTC</span>
      </div>

      <div class="flex justify-between items-center mb-6">
        <span>Offre max</span>
        <span class="font-semibold">21M BTC</span>
      </div>

      <div class="mb-6">
        <div class="flex justify-between items-center mb-3">
          <span class="font-semibold">Official Links</span>
        </div>

        <div class="flex items-center mb-3">
          <span class="bg-base-200 rounded-xl p-2 mx-2">Website</span>
          <span class="bg-base-200 rounded-xl p-2 mx-2">Github</span>
          <span class="bg-base-200 rounded-xl p-2 mx-2">White paper</span>
        </div>
      </div>
      <div class="mb-6">
        <div class="flex justify-between items-center mb-3">
          <span class="font-semibold">Socials</span>
        </div>

        <div class="flex items-center mb-3">
          <span class="bg-base-200 rounded-xl p-2 mx-2">Reddit</span>
          <span class="bg-base-200 rounded-xl p-2 mx-2">Instagram</span>
        </div>
      </div>
    </div>

    <div class="w-1/2 flex flex-col center-div">
      <!-- Content for center -->
      <div class="w-full border-b">
        <nav class="grid grid-cols-3 items-center">
          <button
            :class="[
              'text-xl font-semibold p-8',
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
      <div class="flex-1 overflow-y-auto">
        <div id="charts" class="flex justify-between items-center m-4">
          <div class="w-fit bg-base-200 p-4 rounded-xl">
            <span
              @click="selectedChartData = 'price'"
              :class="[
                'p-3 mx-2 rounded-xl',
                selectedChartData === 'price' ? 'bg-base-100' : '',
              ]"
              >Price</span
            >
            <span
              @click="selectedChartData = 'market_cap'"
              :class="[
                'p-3 mx-2 rounded-xl',
                selectedChartData === 'market_cap' ? 'bg-base-100' : '',
              ]"
              >Market Cap</span
            >
          </div>

          <div class="flex justify-between items-center m-4">
            <div class="w-fit bg-base-200 p-4 rounded-xl">
              <span
                @click="selectedChartType = 'line'"
                :class="[
                  'p-3 mx-2 rounded-xl',
                  selectedChartType === 'line' ? 'bg-base-100' : '',
                ]"
                >Line</span
              >
              <span
                @click="selectedChartType = 'candle'"
                :class="[
                  'p-3 mx-2 rounded-xl',
                  selectedChartType === 'candle' ? 'bg-base-100' : '',
                ]"
                >Candlestick</span
              >
            </div>
          </div>

          <div class="flex justify-between items-center m-4">
            <div class="w-fit bg-base-200 p-4 rounded-xl">
              <span
                @click="selectedChartPeriode = '1D'"
                :class="[
                  'p-3 mx-2 rounded-xl',
                  selectedChartPeriode === '1D' ? 'bg-base-100' : '',
                ]"
                >1D</span
              >
              <span
                @click="selectedChartPeriode = '7D'"
                :class="[
                  'p-3 mx-2 rounded-xl',
                  selectedChartPeriode === '7D' ? 'bg-base-100' : '',
                ]"
                >7D</span
              >
              <span
                @click="selectedChartPeriode = '1M'"
                :class="[
                  'p-3 mx-2 rounded-xl',
                  selectedChartPeriode === '1M' ? 'bg-base-100' : '',
                ]"
                >1M</span
              >
            </div>
          </div>
        </div>
        <!-- CHART SECTION -->
        <div class="bg-base-200 w-full h-full rounded-xl"></div>

        <div id="news" class="text-3xl font-semibold p-4 my-4">News</div>

        <div class="bg-base-200 w-full h-full rounded-xl"></div>

        <div id="about" class="text-3xl font-semibold p-4 my-4">About</div>

        <div class="bg-base-200 w-full h-full rounded-xl"></div>
      </div>
    </div>

    <!-- Right sidebar -->
    <div class="w-1/4 flex flex-col border-l px-8">
      <div class="pb-4">
        <div class="text-lg font-semibold mb-2">Project's announcements</div>
        <div class="mb-4">
          <div class="text-sm bg-base-200 rounded-xl p-4">
            Crypto News Article #1
          </div>
        </div>
        <div class="mb-4">
          <div class="text-sm bg-base-200 rounded-xl p-4">
            Crypto News Article #2
          </div>
        </div>
      </div>
      <div class="text-lg font-semibold mb-2 border-t py-2">Message Board</div>
      <!-- Scrollable message area -->
      <div class="flex-1 overflow-y-auto mb-4">
        <!-- Messages will be displayed here -->
        <div v-for="n in 30" :key="n" class="mb-2 border-b">
          {{ "message #" + n }}
        </div>
      </div>

      <!-- Input area, always fixed to the bottom -->
      <div class="mt-auto">
        <div class="flex bg-base-200 p-2 rounded-xl mb-8">
          <input
            type="text"
            class="input flex-1 p-2"
            placeholder="Type your message..."
          />
          <button class="btn px-4">Post</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const route = useRoute();
const isToggled = ref(false);
const selectedTab = ref("charts");
const selectedChartType = ref("line");
const selectedChartData = ref("price");
const selectedChartPeriode = ref("1D");

const handleButtonClick = (tabName) => {
  selectedTab.value = tabName;
  scrollTo(tabName);
};

const scrollTo = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<style>
.center-div {
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.center-div::-webkit-scrollbar {
  display: none;
}
</style>
