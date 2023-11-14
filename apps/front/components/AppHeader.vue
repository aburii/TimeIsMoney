<template>
  <div class="navbar bg-base-100">
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
          <li><a>Home</a></li>
          <li><a>Crypto</a></li>
          <li><a>News</a></li>
        </ul>
      </div>
      <a class="btn btn-ghost text-xl">TheCountOfMoney</a>
    </div>
    <div class="navbar-end">
      <div class="hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><a>Home</a></li>
          <li><a>Crypto</a></li>
          <li><a>News</a></li>
        </ul>
        <div class="divider lg:divider-horizontal"></div>
      </div>

      <a class="btn">Login</a>
    </div>
  </div>
</template>
