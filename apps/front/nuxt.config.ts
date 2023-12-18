// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,

  modules: [
    "@timeismoney/ui-components/nuxt",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxt/ui",
    "nuxt-vue3-google-signin",
  ],

  googleSignIn: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },

  css: ["@/assets/scss/main.scss"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      BACK_URL: "",
    },
  },
});
