import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    formationProductions: defineCollection({
      source: 'productions/formation/*.md',
      type: 'page',
    }),
    personalProductions: defineCollection({
      source: 'productions/perso/*.md',
      type: 'page',
    }),
  },
})
