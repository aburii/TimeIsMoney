<script setup lang="ts" generic="T">
import type { UIDataTable } from "~/types/ui-table";

defineProps<{
  id: string;
  tableData: UIDataTable<T>;
  loading: bool;
}>();
</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-for="heading in tableData.heading" :key="heading.key">
          <span class="text-xl font-bold"> {{ heading.label }}</span>
        </th>
      </tr>
    </thead>
    <tbody v-if="tableData.data.length > 0 && !loading">
      <tr
        v-for="(data, index) in tableData.data"
        :key="`${id}-row-${index}`"
        class="hover"
      >
        <td
          v-for="heading in tableData.heading"
          :key="`${id}-${index}-${heading.key}`"
        >
          <slot :name="heading.key" :data="data" />
        </td>
        <!-- <td>
          <slot name="actions" />
        </td> -->
      </tr>
    </tbody>
    <tbody v-if="tableData.data.length <= 0 && !loading">
      <tr>
        <td colspan="99" class="text-center">Aucune données</td>
      </tr>
    </tbody>
    <tbody v-if="loading">
      <tr v-for="n in 8" class="skeleton">
        <td colspan="99" class="h-10"></td>
      </tr>
    </tbody>
  </table>
</template>
<style lang="scss" scoped>
tbody {
  tr {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
