<script setup lang="ts">
/* ============================================================================
   EXPERIENCES
   Affiche les stages en cartes compactes avec le detail en modale.
   ========================================================================== */

import experiencesData from '~/data/experiences.json'

const experiences = ref(experiencesData)
const currentExperience: any = ref(null)

watch(currentExperience, (newValue) => {
  if (newValue) {
    document.body.classList.add('no-scroll')
  }
  else {
    document.body.classList.remove('no-scroll')
  }
})
</script>

<template>
  <section id="experiences" class="header-display experiences-section">
    <div class="title">
      <h2>Expériences en milieu professionnel</h2>
      <p>Plusieurs stages m'ont permis de découvrir des environnements techniques différents, du développement web aux réseaux informatiques.</p>
    </div>

    <div class="list">
      <article v-for="(item, index) in experiences" :key="index" class="item" @click="currentExperience = item">
        <NuxtImg :src="`/assets/company-logos/${item.image}`" :alt="`Logo de l'entreprise ${item.name}`" />
        <p v-html="item.description" />
        <strong>{{ item.year }}</strong>
      </article>
    </div>

    <div v-if="currentExperience" class="reader">
      <div class="background" @click="currentExperience = null" />
      <div class="container">
        <NuxtImg class="close-btn" src="/assets/icons/cross.svg" alt="Icon fermer" @click="currentExperience = null" />
        <h1>{{ currentExperience.name }}</h1>
        <h2>{{ currentExperience.title }}</h2>
        <p v-html="currentExperience.text" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="sass">
@use "/assets/style/_variables" as *

.experiences-section
  width: 100%
  background-color: $color-primary
  color: $color-secondary
  display: flex
  flex-direction: column
  gap: 4rem
  @include padding
  .title
    max-width: 52rem
    h2
      margin-bottom: 1rem
      @include section-title-dark
    p
      color: rgba(171, 209, 198, 0.86)
  .list
    display: grid
    grid-template-columns: repeat(5, minmax(0, 1fr))
    gap: 1rem
    .item
      min-height: 16rem
      border: 1px solid rgba(171, 209, 198, 0.18)
      border-radius: 0.75rem
      background-color: rgba(0, 30, 29, 0.18)
      padding: 1.5rem
      cursor: pointer
      display: flex
      flex-direction: column
      justify-content: space-between
      transition: transform 0.2s ease, border-color 0.2s ease
      &:hover
        border-color: $color-highlight
        transform: translateY(-0.2rem)
      img
        height: 2.75rem
        max-width: 9rem
        object-fit: contain
        object-position: left center
      p
        color: rgba(171, 209, 198, 0.82)
        font-size: 0.92rem
        line-height: 1.45
      strong
        color: $color-highlight
        font-size: 2.2rem
        font-weight: 950
        line-height: 1
  .reader
    .container
      z-index: 15
      display: flex
      flex-direction: column
      position: fixed
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      padding: 3rem
      border-radius: 0.75rem
      width: min(52rem, 92vw)
      max-height: 92vh
      overflow-y: auto
      color: $color-primary
      background-color: $color-secondary
      box-shadow: 0 2rem 6rem rgba(0, 30, 29, 0.35)
      h1
        color: $color-primary
        font-size: 2.35rem
        font-weight: 900
        margin-bottom: 0.5rem
      h2
        font-size: 1.25rem
        font-weight: 800
        margin-bottom: 2rem
      p
        color: rgba(0, 70, 67, 0.78)
        line-height: 1.65
      .close-btn
        position: absolute
        top: 1.5rem
        right: 1.5rem
        width: 1.5rem
        height: 1.5rem
        filter: $filter-primary
        cursor: pointer
        &:hover
          filter: $filter-highlight
    .background
      z-index: 10
      position: fixed
      top: 0
      left: 0
      height: 100%
      width: 100%
      background-color: rgba(0, 30, 29, 0.75)
      backdrop-filter: blur(7.5px)
  @media (max-width: $xl)
    .list
      grid-template-columns: repeat(3, minmax(0, 1fr))
  @media (max-width: $m)
    .list
      grid-template-columns: 1fr
    .reader .container
      padding: 2rem 1.25rem
</style>
