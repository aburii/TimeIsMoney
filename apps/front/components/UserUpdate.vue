<template>
<div class="flex items-center justify-center mb-10">
    <div class="p-6 bg-base-200 rounded-xl shadow-md w-80">
      <h2 class="text-2xl mb-4 font-semibold text-center">Your Profile</h2>
      <div class="mb-4">
        <label class="block mb-2 text-sm font-medium">First Name:</label>
        <input v-model="user.firstname" @change="updateUser('firstname', user.firstname)" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-100" />
      </div>
      <div class="mb-4">
        <label class="block mb-2 text-sm font-medium">Last Name:</label>
        <input v-model="user.lastname" @change="updateUser('lastname', user.lastname)" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-100" />
      </div>
      <div class="mb-4">
        <label class="block mb-2 text-sm font-medium ">Nickname:</label>
        <input v-model="user.nickname" @change="updateUser('nickname', user.nickname)" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-100" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useFetchAPI } from "../composables/fetch.ts";
import { useSessionStore } from "~/stores/session";

const session = useSessionStore();
const user = ref(session.user);
const userId = session.user?.id;

const updateUser = async (field, value) => {
  const response = await useFetchAPI<any>(
    "PATCH",
    `/users/${userId}`,
    { [field]: value }
  );
  if (response.ok) {
    user.value = { ...user.value, [field]: value };
    window.location.reload();
  } else {
    return alert("Update went wrong!");
  }
};
</script>