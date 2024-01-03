<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const session = useSessionStore();
const deleteUser = useDeleteUser();
const loading = ref(false);
const user = ref();

const fetchAllUsers = async () => {};

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
      <h1 class="text-2xl font-semibold border-b mb-2">${}</h1>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
