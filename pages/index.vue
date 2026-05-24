<script setup lang="ts">
/* ============================================================================
   PAGE D'ACCUEIL
   Assemble la one-page du portfolio dans l'ordre de lecture principal.
   ========================================================================== */

import AboutMe from '~/components/HomeView/About-me.vue'
import Advices from '~/components/HomeView/Advices.vue'
import Competences from '~/components/HomeView/Competences.vue'
import Contacts from '~/components/HomeView/Contacts.vue'
import Experiences from '~/components/HomeView/Experiences.vue'
import HeroBanner from '~/components/HomeView/HeroBanner.vue'
import Productions from '~/components/HomeView/Productions.vue'

const SEO_Data = {
  title: 'Portfolio - Jules JARDRI',
  description: 'Bienvenue sur mon portfolio ! Découvrez mon parcours, mes compétences et mes projets en un coup d\'oeil.',
  thumbnail: 'https://jules.jardri.com/assets/images/profilePicture.png',
  url: 'https://jules.jardri.com',
}

useSeoMeta({
  title: SEO_Data.title,
  description: SEO_Data.description,

  ogTitle: SEO_Data.title,
  ogDescription: SEO_Data.description,
  ogImage: SEO_Data.thumbnail,
  ogUrl: SEO_Data.url,
  ogType: 'website',

  twitterCard: 'summary_large_image',
  twitterTitle: SEO_Data.title,
  twitterDescription: SEO_Data.description,
  twitterImage: SEO_Data.thumbnail,
})
</script>

<template>
  <div>
    <HeroBanner />
    <AboutMe />
    <Productions />
    <Competences />
    <Experiences />
    <Advices />
    <Contacts />
  </div>
</template>
