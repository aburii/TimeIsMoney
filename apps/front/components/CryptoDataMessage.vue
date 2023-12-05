<template>
  <div class="text-xl rounded-xl font-semibold pb-2 mt-4 mx-3 mb-4"><div class="">Project Announcements</div></div>
  <div class="overflow-y-auto pb-4 px-4 h-fit max-h-72 border-b ">
    <div v-for="n in 2" class="mb-4">
      <div class=" skeleton text-sm bg-base-200 rounded-xl p-4  border border-primary ">
        Project Announcement #{{ n }}
      </div>
    </div>
  </div>
  <div class="text-xl rounded-xl font-semibold pb-4 mt-4 mx-3 ">Message Board</div>
  <!-- Scrollable message area -->
  <div class="flex-1 overflow-y-auto mb-4 p-2">
    <!-- Messages will be displayed here -->
    <div v-for="n in 50" :key="n" class="skeleton mb-2 rounded-xl border border-base-300 shadow p-2">
      {{ n }}
    </div>
  </div>

  <!-- Input area, always fixed to the bottom -->
  <div class="mt-auto p-4">
    <div class="flex bg-base-200 p-2 rounded-xl  border-primary">
      <input
        type="text"
        class="input flex-1 p-2"
        placeholder="Type your message..."
      />
      <button class="btn btn-primary px-4 ml-4">Post</button>
    </div>
  </div>
</template>

<script setup></script>
