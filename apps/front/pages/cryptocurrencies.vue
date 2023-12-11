<template>
  <div class="p-4 mx-auto w-full md:w-4/5">
    <div class="text-4xl mb-10 font-semibold">
      Today's Cryptocurrency Prices by Market Cap
    </div>
    <div class="flex justify-between mb-8 mt-4">
      <div className="form-control">
        <input
          type="text"
          placeholder="Crypto search"
          className="input input-bordered md:w-auto"
        />
      </div>
      <div class="join tooltip" data-tip="Show rows">
        <button class="join-item btn-xs sm:btn btn btn-active h-12 sm:h-auto">
          25
        </button>
        <button class="join-item btn-xs sm:btn btn h-12 sm:h-auto">50</button>
        <button class="join-item btn-xs sm:btn btn h-12 sm:h-auto">100</button>
      </div>
    </div>
    <div class="overflow-x-auto border rounded-xl border-base-300">
      <UITable id="table" class="table" :table-data="dataTable">
        <template #name="data">
          <div class="flex flex-between gap-2">
             <Star />
          <NuxtLink :to="`/cryptocurrency/${data.data.name}`">
            <span class="font-bold">{{ data.data.name }}</span>
            <span class="ml-2">{{ data.data.symbol }}</span>
          </NuxtLink>
          </div>
        </template>
        <template #id="data">
          {{ data.data.id }}
        </template>
        <template #price="data">
          <span class="font-bold">
            {{ data.data.price }}
          </span>
        </template>
        <template #h="data">
          <span :class="getClass(data.data.h)">
            {{ data.data.h }}
          </span>
        </template>
        <template #d="data">
          <span :class="getClass(data.data.d)">
            {{ data.data.d }}
          </span>
        </template>
        <template #market_cap="data">
          {{ data.data.market_cap }}
        </template>
        <template #volume="data">
          {{ data.data.volume }}
        </template>
        <template #circulating_supply="data">
          {{ data.data.circulating_supply }}
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

const data = [
  {
    id: "1",
    name: "Bitcoin",
    symbol: "BTC",
    price: "€34,121.39",
    h: "-3.33%",
    d: "+5.66%",
    market_cap: "€667,415,211,967",
    volume: "€15,287,475,652",
    circulating_supply: "19,554,218 BTC",
  },
  {
    id: "2",
    name: "Ethereum",
    symbol: "ETH",
    price: "€1,868.37",
    h: "-1.83%",
    d: "+11.34%",
    market_cap: "€224,662,403,391",
    volume: "€8,562,083,222",
    circulating_supply: "19,554,218 ETH",
  },
  {
    id: "3",
    name: "Binance Coin",
    symbol: "BNB",
    price: "€412.77",
    h: "-1.12%",
    d: "+4.67%",
    market_cap: "€64,415,211,967",
    volume: "€2,287,475,652",
    circulating_supply: "155,536,713 BNB",
  },

  {
    id: "4",
    name: "Ripple",
    symbol: "XRP",
    price: "€0.76",
    h: "+0.33%",
    d: "+2.56%",
    market_cap: "€35,415,211,967",
    volume: "€1,987,475,652",
    circulating_supply: "46,542,367,512 XRP",
  },
  {
    id: "5",
    name: "Solana",
    symbol: "SOL",
    price: "€102.39",
    h: "+1.33%",
    d: "+8.66%",
    market_cap: "€33,415,211,967",
    volume: "€3,287,475,652",
    circulating_supply: "286,370,150 SOL",
  },
  {
    id: "6",
    name: "Cardano",
    symbol: "ADA",
    price: "€0.95",
    h: "-2.50%",
    d: "+3.20%",
    market_cap: "€30,662,403,391",
    volume: "€1,562,083,222",
    circulating_supply: "31,948,309 ADA",
  },
];

const dataTable: UIDataTable<{ id: string; name: string }> = {
  heading: [
    {
      key: "name",
      label: "Name",
    },
    { key: "price", label: "Price" },
    { key: "h", label: "24h %" },
    { key: "d", label: "7d %" },
    { key: "market_cap", label: "Market Cap" },
    { key: "volume", label: "Volume(24h)" },
    { key: "circulating_supply", label: "Circulating Supply" },
  ],
  data,
};

const getClass = (value: string) => {
  return value.startsWith("-")
    ? "text-red-500 font-bold"
    : "text-green-500 font-bold";
};
</script>
