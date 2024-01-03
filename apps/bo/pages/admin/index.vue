<script setup lang="ts">
import { TrashIcon, EyeIcon } from "@heroicons/vue/24/outline";
import type { UIDataTable } from "@timeismoney/ui-components/types/ui-table";

definePageMeta({
  middleware: ["auth"],
});

const session = useSessionStore();

const getAllUsers = useGetAllUsers();
const deleteUser = useDeleteUser();
const dataTable = ref<UIDataTable<any>>({
  heading: [
    { key: "email", label: "@mail" },
    { key: "firstname", label: "Firstname" },
    { key: "lastname", label: "Lastname" },
    { key: "nickname", label: "Username" },
    { key: "role", label: "Role" },
    { key: "id", label: "Actions" },
  ],
  data: [],
});
const loading = ref(false);

const fetchAllUsers = async () => {
  loading.value = true;
  const response = await getAllUsers();
  loading.value = false;

  if (!response.ok) {
    return alert("Failed to fetch users");
  }

  dataTable.value.data = response.data;
};

onMounted(async () => {
  await fetchAllUsers();
});

const deleteUserById = async (id: number) => {
  const response = await deleteUser(id);

  if (!response.ok) {
    return alert("Error happened while deleting user");
  }

  await fetchAllUsers();
};
</script>

<template>
  <section class="w-full">
    <div class="max-w-5xl mx-auto mt-10">
      <h1 class="text-2xl font-semibold border-b mb-2">Users</h1>
      <UITable
        id="users-table"
        class="table w-100"
        :table-data="dataTable"
        :loading="loading"
      >
        <template #email="user">
          {{ user.data.email }}
        </template>
        <template #firstname="user">
          {{ user.data.firstname }}
        </template>
        <template #lastname="user">
          {{ user.data.lastname }}
        </template>
        <template #nickname="user">
          {{ user.data.nickname }}
        </template>
        <template #role="user">
          {{ user.data.role }}
        </template>

        <template #id="user">
          <NuxtLink
            role="button"
            class="btn btn-square btn-secondary no-underline mr-2"
            id="detailsUser"
            :to="'/admin/' + user.data.id"
          >
            <EyeIcon class="w-5 h-5 text-white" />
          </NuxtLink>
          <button
            v-if="
              user.data.id !== session.user?.id && user.data.role !== 'ADMIN'
            "
            role="button"
            id="deleteUser"
            class="btn btn-square btn-error"
            @click="deleteUserById(user.data.id)"
          >
            <TrashIcon class="w-5 h-5 text-white" />
          </button>
        </template>
      </UITable>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
