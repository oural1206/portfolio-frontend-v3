// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  pages: true,
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/content', '@nuxt/image'],
  eslint: {
    config: {
      standalone: false,
    },
  },
  css: [
    '~/assets/style/reset.sass',
    '~/assets/style/default-style.sass',
  ],
  fonts: {
    provider: 'google',
  },
})
