<script setup lang="ts">
import { useSessionStore } from "~/stores/session";
import type { ComputedRef } from "vue";

definePageMeta({
  layout: "auth",
});

const sessionStore = useSessionStore();
const showPassword = ref(false);
const formValue = reactive({
  email: null,
  password: null,
});
const formError = ref(false);
const loading = ref(false);

const login = async () => {
  formError.value = false;
  loading.value = true;
  const response = await sessionStore.login({
    ...formValue,
    app: "BO" as any,
  });

  loading.value = false;

  if (!response) {
    formError.value = true;
    return;
  }
  return navigateTo("/admin");
};

const passwordInputType: ComputedRef<"password" | "text"> = computed(() => {
  return showPassword.value ? "text" : "password";
});
</script>

<template>
  <section class="page-container bg-base-300">
    <div class="card max-w-3xl mx-auto bg-base-100 shadow mt-32">
      <div class="card-body">
        <div class="card-title text-2xl">
          <h2>Count Of Money - Back Office</h2>
        </div>
        <form class="w-full space-y-3" @submit.prevent="login">
          <label class="form-control w-full">
            <span class="label block">
              <span class="label-text font-bold">Identifiant</span>
            </span>
            <input
              type="text"
              v-model="formValue.email"
              placeholder="email@timeismoney.com"
              class="input input-bordered w-full"
            />
          </label>

          <label class="form-control w-full">
            <span class="label block">
              <span class="label-text font-bold">Password</span>
            </span>
            <input
              :type="passwordInputType"
              v-model="formValue.password"
              class="input input-bordered w-full"
            />
          </label>

          <div class="form-control max-w-xs">
            <label class="space-x-2 cursor-pointer w-fit">
              <input
                type="checkbox"
                v-model="showPassword"
                class="checkbox checkbox-sm align-middle"
              />
              <span class="label-text align-middle">
                Afficher le mot de passe
              </span>
            </label>
          </div>

          <UIButton
            class="!mt-16 w-full text-center btn-neutral"
            label="Se connecter"
            loading-label="Connexion en cours..."
            :loading="loading"
            type="submit"
          />
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
