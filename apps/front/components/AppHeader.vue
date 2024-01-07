<template>
  <header class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/cryptocurrencies">Crypto</NuxtLink></li>
          <li><NuxtLink to="/news">News</NuxtLink></li>
        </ul>
      </div>
      <NuxtLink to="/" class="btn btn-ghost text-xl hidden lg:flex">
        <img src="@/assets/img/logo.png" class="max-w-[40px]" />
        <p>The Count Of Money</p>
      </NuxtLink>
    </div>
    <NuxtLink to="/" class="btn btn-ghost text-xl flex lg:hidden">
      <img src="@/assets/img/logo.png" class="max-w-[40px]" />
    </NuxtLink>
    <div class="navbar-end">
      <div class="hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/cryptocurrencies">Cryptos</NuxtLink></li>
          <li><NuxtLink to="/news">News</NuxtLink></li>
          <!-- CURRENCY SELECTOR IN HARD CODE TO BE IMPLEMENTED -->
          <li>
            <a class="text-xs" @click="toggleCurrencySelector"
              > 
                 <div class="flex items-center justify-center w-4 h-4 text-xs rounded-full border border-current">
                    {{ selectedCurrencySymbol }}
                 </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </a>
          </li>
          <!-- END CURRENCY SELECTOR -->
        </ul>
        <div class="divider lg:divider-horizontal"></div>
      </div>
      <div class="mx-2">
        <NuxtLink
          v-if="!session.isLoggedIn"
          to="/login"
          class="btn btn-sm btn-primary"
          >Login</NuxtLink
        >
        {{ session.user?.nickname }}
        <Logout class="ml-2" />
      </div>
    </div>
  </header>
  <currencySelector
    v-if="isCurrencySelectorVisible"
    @close="toggleCurrencySelector"
    @selectedCurrency="updateSelectedCurrency"
  />
</template>

<script setup>
import { ref } from "vue";
import { useSessionStore } from "~/stores/session";
const session = useSessionStore();
const selectedCurrencySymbol = ref(localStorage.getItem('fiatSymbol') || 'Euro');
const isCurrencySelectorVisible = ref(false);

const toggleCurrencySelector = () => {
  isCurrencySelectorVisible.value = !isCurrencySelectorVisible.value;
};
const updateSelectedCurrency = (currency) => {
  selectedCurrencySymbol.value = currency.symbol;
};
</script>
