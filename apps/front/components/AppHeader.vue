<template>
  <header class="navbar bg-base-100 lg:px-12">
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
          <li><NuxtLink to="/">Crypto</NuxtLink></li>
          <li><NuxtLink to="/">News</NuxtLink></li>
        </ul>
      </div>
      <NuxtLink to="/" class="btn btn-ghost text-xl hidden lg:flex">
        <img src="@/assets/img/logo.png" class="max-w-[40px]" />
        <p>The Count Of Money</p>
      </NuxtLink>
    </div>
    <NuxtLink to="/" class="btn btn-ghost text-xl lg:hidden">
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
            <a @click="toggleCurrencySelector"
              ><svg
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
                  d="M14.25 7.756a4.5 4.5 0 100 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Euro
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
      <NuxtLink to="/login" class="btn">Login</NuxtLink>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isCurrencySelectorVisible: false,
    };
  },
  methods: {
    toggleCurrencySelector() {
      this.isCurrencySelectorVisible = !this.isCurrencySelectorVisible;
    },
  },
};
</script>
