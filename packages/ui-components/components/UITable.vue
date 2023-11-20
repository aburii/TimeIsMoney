<script setup lang="ts" generic="T">
import type { UIDataTable } from "~/types/ui-table";

defineProps<{
  id: string;
  tableData: UIDataTable<T>;
}>();
</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-for="heading in tableData.heading" :key="heading.key">
          {{ heading.label }}
        </th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody v-if="tableData.data.length > 0">
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
        <td>
          <slot name="actions" />
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td colspan="99" class="text-center">Aucune données</td>
      </tr>
    </tbody>
  </table>
</template>
