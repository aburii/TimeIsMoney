<template>
  <div class="layout-container">
    <AppHeader />
    <main class="main-content">
      <slot />
    </main>
  </div>
</template>
<script lang="ts" setup>
import type { CredentialResponse } from "vue3-google-signin";

const session = useSessionStore();
const toast = useToast();

if (!session.isLoggedIn) {
  useOneTap({
    onSuccess: async (response: CredentialResponse) => {
      const { credential } = response;

      const res = await session.loginWithGoogle(credential);

      if (!res) {
        return toast.add({
          title: "Authentification went wrong!",
          color: "red",
        });
      }
      return toast.add({ title: "Sucessfully Authenticated" });
    },
    onError: () => {
      return toast.add({
        title: "Authentification went wrong!",
        color: "red",
      });
    },
    promptParentId: "googleTap",
  });
}
</script>
<style lang="scss" scoped></style>
