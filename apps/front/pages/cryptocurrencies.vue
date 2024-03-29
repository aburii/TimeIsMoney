<template>
  <div class="p-4 mx-auto w-full md:w-4/5">
    <div class="text-4xl mb-10 font-semibold">
      Today's Cryptocurrency Prices by Market Cap
    </div>
    <div class="flex justify-between mb-8 mt-4">
      <div class="join tooltip" data-tip="Show rows">
        <button
          :class="[
            'join-item btn-xs sm:btn btn h-12 sm:h-auto',
            pageSize === 10 ? 'btn-active sm:btn-active' : '',
          ]"
          @click="changePageSize(10)"
        >
          10
        </button>
        <button
          :class="[
            'join-item btn-xs sm:btn btn h-12 sm:h-auto',
            pageSize === 25 ? 'btn-active sm:btn-active' : '',
          ]"
          @click="changePageSize(25)"
        >
          25
        </button>
        <button
          :class="[
            'join-item btn-xs sm:btn btn h-12 sm:h-auto',
            pageSize === 50 ? 'btn-active sm:btn-active' : '',
          ]"
          @click="changePageSize(50)"
        >
          50
        </button>
      </div>
      <select v-model="selectedSortOption" class="select w-auto max-w-xs bg-base-200">
        <option disabled>Sort by</option>
        <option>Price Highest to Lowest</option>
        <option>Price Lowest to Highest</option>
        <option>Market Cap Highest to Lowest</option>
        <option>Market Cap Lowest to Highest</option>
      </select>
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
           <NuxtLink
              :to="`/cryptocurrency/${data.data.symbol}/${data.data.id}/`"
              class="flex items-center gap-2"
            >
          <span class="font-bold">
            {{
              data.data.price && Object.keys(data.data.price)[0]
                ? formatNumberWithSpaces(
                    data.data.price[Object.keys(data.data.price)[0]].currentPrice.toFixed(2)
                    ) + fiatSymbol
                : "N/A"
            }}
          </span>
          </NuxtLink>
        </template>
        <template #last24hCandle="data">
           <NuxtLink
              :to="`/cryptocurrency/${data.data.symbol}/${data.data.id}/`"
              class="flex items-center gap-2"
            >
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
          </NuxtLink>
        </template>
        <template #hourCandle="data">
           <NuxtLink
              :to="`/cryptocurrency/${data.data.symbol}/${data.data.id}/`"
              class="flex items-center gap-2"
            >
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
          </NuxtLink>
        </template>
        <template #market_cap="data">
           <NuxtLink
              :to="`/cryptocurrency/${data.data.symbol}/${data.data.id}/`"
              class="flex items-center gap-2"
            >
          {{
            data.data.price && Object.keys(data.data.price)[0]
              ? formatNumberWithSpaces(
                  data.data.price[Object.keys(data.data.price)[0]].marketCap.toFixed(2)
                ) + fiatSymbol
              : "N/A"
          }}
          </NuxtLink>
        </template>
        <template #volume="data">
           <NuxtLink
              :to="`/cryptocurrency/${data.data.symbol}/${data.data.id}/`"
              class="flex items-center gap-2"
            >
          {{
            data.data.price && Object.keys(data.data.price)[0]
              ? formatNumberWithSpaces(
                  data.data.price[Object.keys(data.data.price)[0]].totalVolume.toFixed(2)
                ) + fiatSymbol
              : "N/A"
          }}
          </NuxtLink>
        </template>
      </UITable>
    </div>
    <PaginationButtons
      :currentPage="currentPage"
      :totalPages="totalPages"
      @changePage="changePage"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch} from "vue";
import type { UIDataTable } from "@timeismoney/ui-components/types/ui-table";
import { useFetchAPI } from "../composables/fetch.ts";
const selectedSortOption = ref('Market Cap Highest to Lowest');
const currentPage = ref(1);
const pageSize = ref(50);
const totalPages = ref(0);
const tableLoading = ref(true);
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
  tableLoading.value = true;
  const crudQuery = {
    pageSize: pageSize.value,
    page: currentPage.value,
  };
  const response = await useFetchAPI<any[]>(
    "GET",
    `/cryptos?crudQuery=${JSON.stringify(crudQuery)}&includeFiats=false`
  );
  if (response.ok) {
    totalPages.value = response.data.pageCount;
    const symbols = response.data.data.map((crypto) => crypto.symbol).join(",");
    const pricesResponse = await useFetchAPI<any>(
      "GET",
      `/cryptos/prices?symbols=${symbols}`
    );
    if (pricesResponse.ok) {
      const pricesData = pricesResponse.data;
      const combinedData = response.data.data
        .filter((crypto) => crypto.is_crypto)
        .map((crypto) => {
          return {
            ...crypto,
            price: pricesData[crypto.symbol],
          };
        });
      switch (selectedSortOption.value) {
        case 'Price Highest to Lowest':
          combinedData.sort((a, b) => 
            a.price && b.price 
              ? b.price[Object.keys(b.price)[0]].currentPrice - a.price[Object.keys(a.price)[0]].currentPrice
              : 0
          );
          break;
        case 'Price Lowest to Highest':
          combinedData.sort((a, b) => 
            a.price && b.price 
              ? a.price[Object.keys(a.price)[0]].currentPrice - b.price[Object.keys(b.price)[0]].currentPrice
              : 0
          );
          break;
        case 'Market Cap Highest to Lowest':
          combinedData.sort((a, b) => 
            a.price && b.price 
              ? b.price[Object.keys(b.price)[0]].marketCap - a.price[Object.keys(a.price)[0]].marketCap
              : 0
          );
          break;
        case 'Market Cap Lowest to Highest':
          combinedData.sort((a, b) => 
            a.price && b.price 
              ? a.price[Object.keys(a.price)[0]].marketCap - b.price[Object.keys(b.price)[0]].marketCap
              : 0
          );
          break;
        default:
          break;
      }
    
      dataTable.value.data = combinedData;
      tableLoading.value = false;
    }
  } else {
    tableLoading.value = false;
  }
};
watch(selectedSortOption, fetchCryptoData);
onMounted(async () => {
  await fetchCryptoData();
});

const changePage = (newPage) => {
  currentPage.value = newPage;
  fetchCryptoData();
};

const changePageSize = (newPageSize) => {
  pageSize.value = newPageSize;
  fetchCryptoData();
};
</script>
