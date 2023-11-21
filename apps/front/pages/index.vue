<script setup lang="ts">
import type { UIDataTable } from "@timeismoney/ui-components/types/ui-table";

const data = [
  {
    id: "Super ID",
    name: "Jean",
  },
  {
    id: "ID",
    name: "Pierre",
  },
];
const dataTable: UIDataTable<{ id: string; name: string }> = {
  heading: [
    {
      key: "id",
      label: "Identifiant",
    },
    { key: "name", label: "Nom" },
  ],
  data,
};
</script>

<template>
  <UITable id="table" class="table w-2/3" :table-data="dataTable">
    <template #name="bbb">
      <span class="font-bold">
        {{ bbb.data.name }}
      </span>
    </template>
    <template #id="bbb">
      {{ bbb.data.id }}
    </template>
    <template #actions> </template>
  </UITable>
</template>

<style scoped lang="scss"></style>
