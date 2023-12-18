<template>
  <div class="p-4 mx-auto w-full md:w-4/5">
    <div class="text-4xl mb-10 font-semibold">
      Today's Cryptocurrency Prices by Market Cap
    </div>
    <div class="flex justify-between mb-8 mt-4">
      <div class="form-control">
        <input
          type="text"
          placeholder="Crypto search"
          class="input input-bordered md:w-auto"
        />
      </div>
      <div class="join tooltip" data-tip="Show rows">
        <button
          class="join-item btn-xs sm:btn btn btn-active sm:btn-active h-12 sm:h-auto"
        >
          25
        </button>
        <button class="join-item btn-xs sm:btn btn h-12 sm:h-auto">50</button>
        <button class="join-item btn-xs sm:btn btn h-12 sm:h-auto">100</button>
      </div>
    </div>
    <div class="overflow-x-auto border rounded-xl border-base-300">
      <UITable id="table" class="table" :table-data="dataTable">
        <template #name="data">
          <div class="flex items-center gap-4">
            <Star :crypto="data.data.name" />
            <NuxtLink
              :to="`/cryptocurrency/${data.data.symbol}`"
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
              data.data.price && data.data.price.EUR
                ? formatNumberWithSpaces(data.data.price.EUR.currentPrice.toFixed(2)) + "€"
                : "N/A"
            }}
          </span>
        </template>
        <template #last24hCandle="data">
          <span
            :class="
              getClass(
                data.data.price && data.data.price.EUR
                  ? data.data.price.EUR.last24hCandle.changePercent
                  : 0
              )
            "
          >
            {{
              data.data.price && data.data.price.EUR
                ? data.data.price.EUR.last24hCandle.changePercent.toFixed(2) +
                  "%"
                : "N/A"
            }}
          </span>
        </template>
        <template #hourCandle="data">
          <span
            :class="
              getClass(
                data.data.price && data.data.price.EUR
                  ? data.data.price.EUR.hourCandle.changePercent
                  : 0
              )
            "
          >
            {{
              data.data.price && data.data.price.EUR
                ? data.data.price.EUR.hourCandle.changePercent.toFixed(2) + "%"
                : "N/A"
            }}
          </span>
        </template>
        <template #market_cap="data">
          {{
            data.data.price && data.data.price.EUR
              ? formatNumberWithSpaces(data.data.price.EUR.marketCap.toFixed(2)) + "€"
              : "N/A"
          }}
        </template>
        <template #volume="data">
          {{
            data.data.price && data.data.price.EUR
              ? formatNumberWithSpaces(data.data.price.EUR.totalVolume.toFixed(2)) + "€"
              : "N/A"
          }}
        </template>
      </UITable>
    </div>
    <div class="flex justify-center mt-4">
      <div class="join">
        <button class="join-item btn-sm btn btn-active">1</button>
        <button class="join-item btn btn-sm">2</button>
        <button class="join-item btn btn-sm">3</button>
        <button class="join-item btn btn-sm">4</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { UIDataTable } from "@timeismoney/ui-components/types/ui-table";
import { useFetchAPI } from "../composables/fetch.ts";
const currentPage = ref(1);
const pageSize = ref(25);
const totalRecords = ref(0);

const dataTable = ref<UIDataTable<any>>({
  heading: [
    { key: "name", label: "Name" },
    { key: "price", label: "Price" },
    { key: "last24hCandle", label: "24h %" },
    { key: "hourCandle", label: "Last Hour %" },
    { key: "market_cap", label: "Market Cap" },
    { key: "volume", label: "Volume" },
  ],
  data: [],
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

const fetchCryptoData = async () => {
  const response = await useFetchAPI<any[]>(
    "GET",
    "/cryptos/"
  );
  if (response.ok) {
    const symbols = response.data.data.map((crypto) => crypto.symbol).join(",");
    const pricesResponse = await useFetchAPI<any>(
      "GET",
      `/cryptos/prices?symbols=${symbols}`
    );
    if (pricesResponse.ok) {
      const pricesData = pricesResponse.data;
      const combinedData = response.data.data.map((crypto) => {
        return {
          ...crypto,
          price: pricesData[crypto.symbol],
        };
      });
      dataTable.value.data = combinedData;
    }
  } else {
    alert("Failed fetching data");
  }
};

onMounted(async () => {
  fetchCryptoData();
});
</script>
