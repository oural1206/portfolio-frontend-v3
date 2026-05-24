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

useHead({
  title: 'Portfolio - Jules',
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
