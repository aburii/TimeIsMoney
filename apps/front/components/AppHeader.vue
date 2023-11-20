<template>
  <header class="navbar bg-base-100 px-12">
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
      <NuxtLink to="/" class="btn btn-ghost text-xl">
        <img src="@/assets/img/logo.png" class="max-w-[40px]" />
        <p>The Count Of Money</p>
      </NuxtLink>
    </div>
    <div class="navbar-end">
      <div class="hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/">Crypto</NuxtLink></li>
          <li><NuxtLink to="/">News</NuxtLink></li>
        </ul>
        <div class="divider lg:divider-horizontal"></div>
      </div>

      <NuxtLink to="/login" class="btn">Login</NuxtLink>
    </div>
  </header>
</template>
