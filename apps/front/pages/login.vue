<template>
  <div class="container flex flex-col mx-auto rounded-lg my-5">
    <div
      class="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5"
    >
      <div class="flex items-center justify-center w-full lg:p-12">
        <div class="flex items-center xl:p-10">
          <form
            @submit.prevent="login"
            class="flex flex-col w-full h-full pb-6 bg-base-200 p-10 text-center rounded-3xl"
          >
            <h3 class="mb-3 text-4xl font-extrabold text-dark-grey-900">
              Login
            </h3>
            <p class="mb-4 text-grey-700">Enter your email and password</p>
            <div class="w-full mx-auto">
              <GoogleSignInButton
                @success="handleLoginSuccess"
                @error="handleLoginError"
              />
            </div>
            <div class="flex items-center mb-3">
              <hr class="h-0 border-b border-solid border-grey-500 grow" />
              <p class="mx-4 text-grey-600">or</p>
              <hr class="h-0 border-b border-solid border-grey-500 grow" />
            </div>
            <label for="email" class="mb-2 text-sm text-start text-grey-900"
              >Email*</label
            >
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="name@email.com"
              class="flex items-center w-full px-5 py-4 text-sm font-medium outline-none focus:bg-grey-400 mb-5 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
            />
             <label for="password" class="mb-2 text-sm text-start text-grey-900">Password*</label>
              <div class="relative">
                <input
                  v-if="passwordVisible"
                  id="password"
                  v-model="password"
                  type="text"
                  placeholder="Enter a password"
                  class="flex items-center w-full px-5 py-4 mb-5 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                />
                <input
                  v-else
                  id="password"
                  v-model="password"
                  type="password"
                  placeholder="Enter a password"
                  class="flex items-center w-full px-5 py-4 mb-5 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                />
                <button
                  type="button"
                  @click="passwordVisible = !passwordVisible"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                 <img class="w-8 h-8 mb-4" :src="passwordVisible ? 'https://www.svgrepo.com/show/506195/eye-open.svg' : 'https://www.svgrepo.com/show/325174/eye-close.svg'" />
                </button>
              </div>
            <button
              class="btn btn-primary w-full px-6 my-5 text-sm font-bold text-grey-900 md:w-96 rounded-2xl"
            >
              Login
            </button>
            <div>
              <p class="text-sm leading-relaxed text-grey-900">
                Not registered yet?
                <NuxtLink to="/signup" class="justify-self-end"
                  ><a class="font-bold text-grey-700"
                    >Create an Account</a
                  ></NuxtLink
                >
              </p>
              <p class="text-sm leading-relaxed text-grey-900">
                <NuxtLink to="/mentions" class="justify-self-end"
                  ><a class="text-grey-700">Mentions légales et CGU</a>
                </NuxtLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useSessionStore } from "~/stores/session";
import {
  GoogleSignInButton,
  type CredentialResponse,
} from "vue3-google-signin";

definePageMeta({
  middleware: ["guest"],
});

const email = ref("");
const password = ref("");
const passwordVisible = ref(false);
const sessionStore = useSessionStore();
const login = async () => {
  const response = await sessionStore.login({
    email: email.value,
    password: password.value,
    app: "FRONT" as any,
  });

  // if (!response) {
  //   return toast.add({ title: "Authentification went wrong!", color: "red" });
  // }
  // toast.add({ title: "Sucessfully Authenticated" });
  return navigateTo("/cryptocurrencies");
};

const handleLoginSuccess = async (response: CredentialResponse) => {
  const { credential } = response;

  const res = await sessionStore.loginWithGoogle(credential);

  if (!res) {
    return alert("Authentification went wrong!");
  }
  return navigateTo("/cryptocurrencies");
};

// handle an error event
const handleLoginError = () => {
  console.error("Login failed");
};
</script>
