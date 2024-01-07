<template>
  <div class="p-4 mx-auto w-full md:w-4/5">
    <UserUpdate />
    <div class="text-4xl mb-10 font-semibold">
      Your Favourite Cryptocurrencies
    </div>
    <div class="overflow-x-auto border rounded-xl border-base-300">
      <UITable
        id="table"
        class="table"
        :table-data="dataTable"
        :loading="tableLoading"
      >
        <template #name="data">
          <div class="flex items-center gap-4">
            <Star :id="data.data.id" />
            <NuxtLink
              :to="`/cryptocurrency/${data.data.symbol}/${data.data.id}/`"
              class="flex items-center gap-2"
            >
              <img
                :src="data.data.image_url"
                alt="Crypto Icon"
                class="h-6 w-6"
              />
              <span class="font-bold">{{ data.data.name }}</span>
              <span>{{ data.data.symbol }}</span>
            </NuxtLink>
          </div>
        </template>
        <template #price="data">
          <span class="font-bold">
            {{
              data.data.price && Object.keys(data.data.price)[0]
                ? formatNumberWithSpaces(
                    data.data.price[Object.keys(data.data.price)[0]].currentPrice.toFixed(2)
                    ) + fiatSymbol
                : "N/A"
            }}
          </span>
        </template>
        <template #last24hCandle="data">
          <span
            :class="
              getClass(
                data.data.price && Object.keys(data.data.price)[0]
                  ? data.data.price[Object.keys(data.data.price)[0]].last24hCandle.changePercent
                  : 0
              )
            "
          >
            {{
              data.data.price && Object.keys(data.data.price)[0]
                ? data.data.price[Object.keys(data.data.price)[0]].last24hCandle.changePercent.toFixed(2) +
                  "%"
                : "N/A"
            }}
          </span>
        </template>
        <template #hourCandle="data">
          <span
            :class="
              getClass(
                data.data.price && Object.keys(data.data.price)[0]
                  ? data.data.price[Object.keys(data.data.price)[0]].hourCandle.changePercent
                  : 0
              )
            "
          >
            {{
              data.data.price && Object.keys(data.data.price)[0]
                ? data.data.price[Object.keys(data.data.price)[0]].hourCandle.changePercent.toFixed(2) + "%"
                : "N/A"
            }}
          </span>
        </template>
        <template #market_cap="data">
          {{
            data.data.price && Object.keys(data.data.price)[0]
              ? formatNumberWithSpaces(
                  data.data.price[Object.keys(data.data.price)[0]].marketCap.toFixed(2)
                ) + fiatSymbol
              : "N/A"
          }}
        </template>
        <template #volume="data">
          {{
            data.data.price && Object.keys(data.data.price)[0]
              ? formatNumberWithSpaces(
                  data.data.price[Object.keys(data.data.price)[0]].totalVolume.toFixed(2)
                ) + fiatSymbol
              : "N/A"
          }}
        </template>
      </UITable>
    </div>
    <div class="text-4xl mt-10 mb-10 font-semibold">
      Your Cryptocurrency News
    </div>
     <div class="w-full rounded-xl">
      <div
        v-for="article in cryptoNews"
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
        v-if="cryptoNews.length == 0"
        v-for="n in 3"
        class="mx-4 h-40 w-auto text-5xl font-semibold p-4 my-4 skeleton"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { UIDataTable } from "@timeismoney/ui-components/types/ui-table";
import { useFetchAPI } from "../composables/fetch.ts";
import { useSessionStore } from "~/stores/session";
const session = useSessionStore();
const user = session.user;
const userId = session.user?.id
const currentPage = ref(1);
const pageSize = ref(10);
const totalPages = ref(0);
const tableLoading = ref(true);
const cryptoNews = ref([]);
const fiatSymbol = computed(() => localStorage.getItem('fiatSymbol') || '€');
const dataTable = ref<UIDataTable<any>>({
  heading: [
    { key: "name", label: "Name" },
    { key: "price", label: "Price" },
    { key: "last24hCandle", label: "24h %" },
    { key: "hourCandle", label: "1h %" },
    { key: "market_cap", label: "Market Cap" },
    { key: "volume", label: "Volume" },
  ],
  data: [],
});

definePageMeta({
  middleware: ["auth"],
});

function formatNumberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const getClass = (value) => {
  if (typeof value === "number") {
    return value < 0 ? "text-red-500 font-bold" : "text-green-500 font-bold";
  } else if (typeof value === "string") {
    return value.startsWith("-")
      ? "text-red-500 font-bold"
      : "text-green-500 font-bold";
  }
  return "";
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

const fetchCryptoData = async () => {
  tableLoading.value = true;
  const crudQuery = {
    pageSize: pageSize.value,
    page: currentPage.value,
  };
  const response = await useFetchAPI<any[]>(
    "GET",
    `/users/${userId}/followed`
  );
  if (response.ok) {
    totalPages.value = response.data.pageCount;
    const symbols = response.data.map((crypto) => crypto.symbol).join(",");
    const pricesResponse = await useFetchAPI<any>(
      "GET",
      `/cryptos/prices?symbols=${symbols}`
    );
    if (pricesResponse.ok) {
      const pricesData = pricesResponse.data;
      const combinedData = response.data
        .map((crypto) => {
          return {
            ...crypto,
            price: pricesData[crypto.symbol],
          };
        });
      dataTable.value.data = combinedData;
      tableLoading.value = false;
    }
  } else {
    tableLoading.value = false;
  }
};

const fetchCryptoNews = async () => {
  const response = await useFetchAPI("GET", `/articles`);
  if (response.ok) {
    cryptoNews.value = response.data;
  } else {
    alert("Failed to fetch crypto data");
  }
};

onMounted(async () => {
  await fetchCryptoData();
  await fetchCryptoNews();
});

</script>
