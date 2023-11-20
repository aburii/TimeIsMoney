import { defineNuxtModule, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  hooks: {
    'components:dirs': (dirs) => {
      const { resolve } = createResolver(import.meta.url)
      dirs.push({
        path: resolve('./components'),
      })
    }
  }
})