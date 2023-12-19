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

if (!session.isLoggedIn) {
  useOneTap({
    onSuccess: async (response: CredentialResponse) => {
      const { credential } = response;

      const res = await session.loginWithGoogle(credential);

      if (!res) {
        return alert.alert("Authentification went wrong!");
      }
      return alert.alert("Sucessfully Authenticated");
    },
    onError: () => {
      return alert.alert("Authentification went wrong!");
    },
    promptParentId: "googleTap",
  });
}
</script>
<style lang="scss" scoped></style>
