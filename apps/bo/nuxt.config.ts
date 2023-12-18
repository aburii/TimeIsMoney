// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,

  modules: ["@vueuse/nuxt", "@pinia/nuxt", "@nuxt/ui"],

  css: ["@/assets/scss/main.scss"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  typescript: {
    strict: true,
    shim: false,
  },

  runtimeConfig: {
    public: {
      BACK_URL: "",
    },
  },
});
