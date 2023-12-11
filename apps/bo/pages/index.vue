<script setup lang="ts">
import { useSessionStore } from "~/stores/session";

definePageMeta({
  middleware: ["guest"],
});

const sessionStore = useSessionStore();

const login = async () => {
  const response = await sessionStore.login({
    email: "user@timeismoney.com",
    password: "password",
    app: "BO" as any,
  });

  if (!response) {
    /* todo: faire des toast */
    return;
  }

  return navigateTo("/admin");
};
</script>

<template>
  <section>
    <form>
      <label>Email</label>
      <input type="text" />
      <label>Password</label>
      <input type="password" />
      <button type="submit" @click.prevent="login">Login</button>
    </form>
  </section>
</template>

<style scoped></style>
