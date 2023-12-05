// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "The Count of Money - PAR4",
    },
  },

  devtools: { enabled: true },
  ssr: false,

  modules: ["@timeismoney/ui-components/nuxt", "@vueuse/nuxt", "@pinia/nuxt", "@nuxtjs/svg-sprite"],

  css: ["@/assets/scss/main.scss"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
