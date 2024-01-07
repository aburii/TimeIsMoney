<script setup lang="ts">
import type { UIDataTable } from "@timeismoney/ui-components/types/ui-table";
import { TrashIcon } from "@heroicons/vue/24/outline";

definePageMeta({
  middleware: ["auth"],
});

const getAllCryptos = useGetAllCryptos();
const deleteCryptoCurrency = useDeleteCryptoCurrency();
const dataTable = ref<
  UIDataTable<{ name: string; symbol: string; image_url: string; id: string }>
>({
  heading: [
    { key: "image_url", label: "" },
    { key: "symbol", label: "Symbol" },
    { key: "name", label: "Name" },
    { key: "id", label: "" },
  ],
  data: [],
});
const loading = ref(false);

const fetchAllCryptos = async () => {
  loading.value = true;
  const response = await getAllCryptos();
  loading.value = false;

  if (!response.ok) {
    return alert("Failed to fetch cryptos");
  }

  dataTable.value.data = response.data.data;
};

onMounted(async () => {
  await fetchAllCryptos();
});

const deleteCryptoById = async (id: number) => {
  const response = await deleteCryptoCurrency(id);

  if (!response.ok) {
    return alert("Error happened while deleting user");
  }

  await fetchAllCryptos();
};
</script>

<template>
  <section class="w-full">
    <div class="max-w-5xl mx-auto mt-10">
      <div class="flex justify-between border-b pb-2">
        <h1 class="text-2xl font-semibold">Cryptos</h1>
      </div>
      <ComboBox @update="fetchAllCryptos" />
      <UITable
        id="users-table"
        class="table w-100"
        :table-data="dataTable"
        :loading="loading"
      >
        <template #image_url="crypto">
          <img :src="crypto.data.image_url" alt="Crypto Icon" class="h-6 w-6" />
        </template>
        <template #symbol="crypto">
          {{ crypto.data.symbol }}
        </template>
        <template #name="crypto">
          {{ crypto.data.name }}
        </template>
        <template #id="crypto">
          <button
            role="button"
            id="deleteUser"
            class="btn btn-square btn-error"
            @click="deleteCryptoById(crypto.data.id)"
          >
            <TrashIcon class="w-5 h-5 text-white" />
          </button>
        </template>
      </UITable>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
