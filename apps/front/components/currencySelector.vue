<template>
  <div class="fixed inset-x-0 top-36 flex justify-center items-start z-50">
    <div class="bg-base-200 rounded-xl w-fit p-6 relative">
      <button
        @click="$emit('close')"
        class="absolute top-4 right-6 text-lg font-semibold"
      >
        &times;
      </button>
      <h3 class="font-bold text-3xl mb-3">Choose your currency:</h3>
      <input
        type="text"
        placeholder="Search Currency"
        class="input-sm rounded-lg mb-6 w-full"
      />
      <div class="grid grid-cols-4 gap-4">
        <button class="btn rounded-xl flex bg-base-100 p-2">
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
              d="M14.121 7.629A3 3 0 009.017 9.43c-.023.212-.002.425.028.636l.506 3.541a4.5 4.5 0 01-.43 2.65L9 16.5l1.539-.513a2.25 2.25 0 011.422 0l.655.218a2.25 2.25 0 001.718-.122L15 15.75M8.25 12H12m9 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          GDB
        </button>
        <button class="btn rounded-xl flex bg-base-100 p-2">
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
              d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          DOLLAR
        </button>
        <button class="btn rounded-xl flex bg-base-100 p-2">
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
              d="M9 7.5l3 4.5m0 0l3-4.5M12 12v5.25M15 12H9m6 3H9m12-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          YEN
        </button>
      </div>
    </div>
  </div>
</template>
