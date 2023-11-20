<script setup lang="ts">
interface ITableHeading {
  key: string;
  label: string;
}

type ITableData = { [key: string]: string | number | boolean | Date };

interface IAppTable {
  heading: ITableHeading[];
  data: ITableData[];
}
defineProps<{
  tableData: IAppTable;
}>();
</script>

<template>
  <table>
    <thead>
      <tr>
        <th></th>
      </tr>
    </thead>
    <tbody>
    <tr v-for="">
        <td></td>
        <td><slot name="actions"/></td>
      </tr>
    </tbody>
  </table>
  <AppTable table-data="dsjfsd" >
    <template #data="document">
      {{ document.id }}
    </template>
  </AppTable>
</template>

<style scoped lang="scss"></style>