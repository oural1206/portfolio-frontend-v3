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
    geiiCompetences: defineCollection({
      source: 'competences/geii/*.md',
      type: 'page',
    }),
  },
})
