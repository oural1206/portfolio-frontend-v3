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
      <p>
        J'ai effectué de nombreux stages dans différentes entreprises de différents secteurs.
        <br><br>
        Ces éxpériences m'ont beaucoup aporté en <strong class="dark-bg">savoir être</strong>, en me permetant de me <strong class="dark-bg">familiariser avec le monde professionnel</strong> et le travail en équipe.
      </p>
    </div>

    <div class="list">
      <article v-for="(item, index) in experiences" :key="index" class="item" @click="currentExperience = item">
        <NuxtImg :src="`/assets/company-logos/${item.image}`" :alt="`Logo de l'entreprise ${item.name}`" />
        <p v-html="item.description" />
        <span class="datelocation">{{ item["date&location"] }}</span>
        <span class="year">{{ item.year }}</span>
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
    h2
      margin-bottom: 1rem
      @include section-title-dark
    p
      color: $color-text-on-dark
  .list
    display: grid
    grid-template-columns: repeat(5, minmax(0, 1fr))
    gap: 1rem
    .item
      min-height: 16rem
      border: 1px solid $border-soft
      border-radius: 0.75rem
      background-color: $surface-dark
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
        color: $color-text-on-dark
        font-size: 0.92rem
        line-height: 1.45
      .datelocation
        font-weight: 600
      .year
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
      box-shadow: 0 2rem 6rem $shadow-dark-strong
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
        color: $color-text
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
      background-color: $overlay-dark
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
