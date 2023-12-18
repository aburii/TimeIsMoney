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
    clientId:
      "958608490777-5419bcsn8ap881oh5p50p1n9pf3v0ba1.apps.googleusercontent.com",
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
