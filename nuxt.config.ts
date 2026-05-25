import { execSync } from 'node:child_process'
import process from 'node:process'

// https://nuxt.com/docs/api/configuration/nuxt-config

// Expose la date de mise a jour pour l'affichage global du site. (pour le footer)
const lastUpdatedAt = process.env.LAST_UPDATED_AT
  ?? execSync('git log -1 --format=%cI').toString().trim()

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  pages: true,
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      lastUpdatedAt,
    },
  },
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
