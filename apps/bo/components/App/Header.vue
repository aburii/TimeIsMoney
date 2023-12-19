<script setup lang="ts"></script>

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
            <NuxtLink to="/users" class="link-hover">Users</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/cryptocurrencies" class="link-hover"
              >Cryptos</NuxtLink
            >
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
