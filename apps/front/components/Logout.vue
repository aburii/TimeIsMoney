<template>
  <btn
    v-if="sessionStore.isLoggedIn"
    @click="logout"
    class="btn btn-sm btn-primary"
    >Logout</btn
  >
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSessionStore } from "~/stores/session";

const sessionStore = useSessionStore();

const logout = async () => {
  const response = await sessionStore.logout();
  return navigateTo("/login");
};
</script>
