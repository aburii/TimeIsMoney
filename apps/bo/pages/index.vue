<script setup lang="ts">
import { useSessionStore } from "~/stores/session";

definePageMeta({
  middleware: ["guest"],
});

const sessionStore = useSessionStore();
const toast = useToast();

const login = async () => {
  const response = await sessionStore.login({
    email: "user@timeismoney.com",
    password: "password",
    app: "BO" as any,
  });

  console.log(response);

  if (!response) {
    toast.add({ title: "Une erreur est survenue lors de l'identification" });
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
      <button type="submit" class="btn btn-primary" @click.prevent="login">
        Login
      </button>
    </form>
  </section>
</template>

<style scoped></style>
