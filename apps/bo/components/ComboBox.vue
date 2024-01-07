<template>
  <section class="relative w-full">
    <input
      type="text"
      v-model="query"
      placeholder="Add a currency"
      class="input input-bordered w-full"
      @click="toggleSelection()"
    />
  </section>
  <div
    class="max-h-[500px] mt-2 shadow rounded overflow-auto border bg-white z-10 absolute"
    v-if="openSelection"
  >
    <div
      v-for="fV in formatValues"
      class="px-4 py-2 hover:bg-gray-100 w-full cursor-pointer"
      @click="add(fV.id)"
    >
      {{ fV.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CoinInformationsShort } from "@timeismoney/coinapi/dist/types";

const emit = defineEmits(["update"]);
const cryptoCurrenciesAPI = ref<CoinInformationsShort[]>([]);

const getAllCurrencies = useGetAllAPICurrencies();
const registerCryptoCurrency = useRegisterCryptoCurrency();

const fetchAllCurrencies = async () => {
  const response = await getAllCurrencies();

  if (!response.ok) {
    return alert("Failed to fetch cryptos currencies");
  }

  cryptoCurrenciesAPI.value = response.data.pages;
};

const add = async (id: string) => {
  const response = await registerCryptoCurrency(id);

  if (!response.ok) {
    return alert("Failed to add crypto currency");
  }

  toggleSelection();
  emit("update");
};

const formatValues = computed(() => {
  return cryptoCurrenciesAPI.value
    .map((coin) => ({
      id: coin.symbol,
      name: coin.fullname,
      selected: false,
    }))
    .filter((coin) => coin.name.includes(query.value));
});

onMounted(async () => {
  await fetchAllCurrencies();
});

const query = ref("");
const openSelection = ref(false);

const selectedValues = ref([]);

const toggleSelection = () => {
  openSelection.value = !openSelection.value;
};
</script>
