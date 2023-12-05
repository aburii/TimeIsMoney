<template>
  <!-- LAPTOP AND + VERSION -->
  <div class="hidden md:flex h-full">
    <!-- Left sidebar -->
    <div class="w-1/4 border-r relative">
      <CryptoData />
    </div>
    <!-- Main -->
    <div class="w-1/2 flex flex-col">
      <CryptoDataMain />
    </div>
    <!-- Right sidebar -->
    <div class="w-1/4 flex flex-col border-l">
      <CryptoDataMessage />
    </div>
  </div>

  <!-- MOBILE VERSION -->
  <div class="md:hidden flex flex-col">
    <CryptoDataMain />
  </div>
</template>

<script setup></script>
