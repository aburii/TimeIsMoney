<script setup lang="ts">
const session = useSessionStore();

const logout = async () => {
  await session.logout();
  return navigateTo("/");
};
</script>

<template>
  <section class="top-0 w-full h-[60px] border-b">
    <div
      class="flex justify-between items-center px-10 mx-auto h-full max-w-7xl"
    >
      <div class="text-2xl font-bold">
        <NuxtLink to="/">Back office</NuxtLink>
      </div>

      <nav class="font-semibold mr-10">
        <ul class="flex gap-10">
          <li>
            <NuxtLink to="/admin/users" class="link-hover">Users</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/" class="link-hover">Cryptos</NuxtLink>
          </li>
          <li v-if="session.user">
            <div class="text-sm text-red-500 link" @click="logout">Log out</div>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
