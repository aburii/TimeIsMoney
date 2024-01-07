<template>
  <div v-if="session.isLoggedIn" @click="toggleFollow">
     <span v-if="isLoading" class="loading loading-spinner loading-xs"></span>
    <template v-else>
    <svg
      v-if="!isToggled"
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
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="gold"
      class="w-6 h-6"
    >
      <path
        fill-rule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clip-rule="evenodd"
      />
    </svg>
     </template>
  </div>
</template>
<script setup lang="ts">
import { useSessionStore } from "~/stores/session";
import { ref, onMounted, watch } from "vue";
import { defineProps } from 'vue'
import { useFetchAPI } from "../composables/fetch.ts";

const props = defineProps({
  id: Number
})

const isToggled = ref(false);
const isLoading = ref(false);
const session = useSessionStore();
let userId = null;
let isUserInteraction = false;

// Fetch followed cryptos on component mount
onMounted(async () => {
  if (session.user) {
    userId = session.user.id;
    isLoading.value = true;
    const response = await useFetchAPI<any>(
      "GET",
      `/users/${userId}/followed`
    );
    isLoading.value = false;
    if (response.ok) {
      const followedCryptos = response.data;
      isToggled.value = followedCryptos.some(crypto => crypto.id === props.id);
    }
  }
});

// Watch for changes in isToggled and follow/unfollow accordingly
watch(isToggled, async (newVal) => {
  if (isUserInteraction && userId) {
    if (newVal) {
      // Follow the crypto
      await useFetchAPI<any>(
        "POST",
        `/users/${userId}/follow?cryptos=${props.id}`
      );
    } else {
      // Unfollow the crypto
      await useFetchAPI<any>(
        "POST",
        `/users/${userId}/unfollow?cryptos=${props.id}`
      );
    }
    isUserInteraction = false;
  }
}, { flush: 'post' });

const toggleFollow = () => {
  if (userId) {
    isUserInteraction = true;
    isToggled.value = !isToggled.value;
  }
};
</script>
