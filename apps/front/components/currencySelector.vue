<template>
  <div class="fixed inset-x-0 top-36 flex justify-center items-start z-50">
    <div
      class="bg-base-200 border border-primary rounded-xl w-fit p-6 relative"
    >
      <button
        @click="$emit('close')"
        class="absolute top-4 right-6 text-lg font-semibold"
      >
        &times;
      </button>
      <h3 class="font-bold text-3xl mb-3">Choose your currency:</h3>
      <!-- <input
        type="text"
        placeholder="Search Currency"
        class="input-sm rounded-lg mb-6 w-full"
      /> -->
      <div class="grid grid-cols-4 gap-4">
         <button
          v-if="!loading"
      v-for="currency in currencies"
      :key="currency.id"
      class="btn btn-primary rounded-xl flex p-2"
      @click="selectCurrency(currency.id, currency.symbol)"
    >
      <div class="flex items-center justify-center w-6 h-6 rounded-full border border-current">
        {{ getSymbolFromCurrency(currency.symbol) }}
      </div>
      {{ currency.name }}
      <span v-if="patchLoading && patchCurrencyId === currency.id" class="loading loading-spinner loading-md"></span>
    </button>
    <button v-for="i in 4" :key="i" class="btn btn-primary rounded-xl flex p-2 w-100" v-else >
       <span class="loading loading-spinner loading-md"></span>
    </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits } from "vue";
import { useSessionStore } from "~/stores/session";
import getSymbolFromCurrency from 'currency-symbol-map'
import { useFetchAPI } from "../composables/fetch.ts";
const selectedCurrency = ref(localStorage.getItem('fiatSymbol') || 'Euro');
const loading = ref(false);
const patchLoading = ref(false);
const patchCurrencyId = ref(null);
const session = useSessionStore();
const currencies = ref([]);
const crudQuery = {
  pageSize: 10000,
  page: 1,
};
const emits = defineEmits(['selectedCurrency', 'close']);
let userId = session.user.id;;
const selectCurrency = async (currencyId: string, currencySymbol: string,) => {
  patchCurrencyId.value = currencyId;
  patchLoading.value = true;
  const response = await useFetchAPI<any>(
    "PATCH",
    `/users/${userId}`,
    { currencyId }
  );
  if (response.ok) {
    const symbol = getSymbolFromCurrency(currencySymbol);
    localStorage.setItem('fiatSymbol', symbol);
    emits('selectedCurrency', { symbol: symbol});
    patchLoading.value = false;
    patchCurrencyId.value = null;
    emits('close');
    window.location.reload();
  } else {
    // handle error
  }
};
onMounted(async () => {
  loading.value = true;
  const response = await useFetchAPI<any[]>(
    "GET",
    `/cryptos?crudQuery=${JSON.stringify(crudQuery)}`
  );
  if (response.ok) {
    currencies.value = response.data.data.filter(currency => !currency.is_crypto);
  }
  loading.value = false;
});
</script>