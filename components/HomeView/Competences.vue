<script setup lang="ts">
/* ============================================================================
   OUTILS ET SAVOIR-FAIRE
   Remplace la liste de competences classique par des domaines concrets.
   ========================================================================== */

import competencesData from '~/data/competences.json'

const competences = ref(competencesData)

const softSkills = [
  {
    title: 'Drone FPV',
    text: 'Preparation, gestion du risque, reactivite et controle sous contrainte.',
  },
  {
    title: 'Photo / video',
    text: 'Cadrage, montage, rythme et attention aux details visuels.',
  },
  {
    title: 'Impression 3D',
    text: 'Patience, iteration, diagnostic et correction de petits defauts.',
  },
  {
    title: 'Projets personnels',
    text: 'Autonomie, curiosite et apprentissage par la pratique.',
  },
]
</script>

<template>
  <section id="outils" class="header-display tools-section">
    <div class="section-heading">
      <h2>Outils, savoir-faire & passions</h2>
      <p>
        Les outils que j'utilise et les domaines qui m'aident a progresser techniquement.
      </p>
    </div>

    <div class="block">
      <div class="block-title">
        <h3>Electronique, programmation et conception</h3>
      </div>
      <div class="columns">
        <div v-for="(category, index) in competences" :key="index" class="tool-card">
          <h4 v-html="category.categoryName" />
          <ul>
            <li v-for="(item, subIndex) in category.skills" :key="subIndex">
              <NuxtImg :src="`/assets/skills-icons/${item.icon}`" :alt="`Icon de ${item.name}`" />
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="block">
      <div class="block-title">
        <h3>Passions techniques & savoir-etre</h3>
      </div>
      <div class="soft-grid">
        <article v-for="item in softSkills" :key="item.title">
          <h4>{{ item.title }}</h4>
          <p>{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="sass">
@use "/assets/style/_variables" as *

.tools-section
  width: 100%
  background-color: $color-secondary
  color: $color-primary
  display: flex
  flex-direction: column
  gap: 5rem
  @include padding
  .section-heading
    max-width: 58rem
    h2
      margin-bottom: 1.5rem
      @include section-title-light
    p
      color: rgba(0, 70, 67, 0.74)
  .block
    display: flex
    flex-direction: column
    gap: 2rem
  .block-title
    display: flex
    align-items: center
    h3
      color: $color-primary
      font-size: 1.5rem
      font-weight: 900
  .columns
    display: grid
    grid-template-columns: repeat(4, minmax(0, 1fr))
    gap: 1rem
    .tool-card
      @include surface-light
      border-radius: 0.85rem
      padding: 1.5rem
      transition: transform 0.2s ease, border-color 0.2s ease
      &:hover
        border-color: rgba(249, 188, 96, 0.65)
        transform: translateY(-0.2rem)
    h4
      font-size: 1.25rem
      color: $color-primary
      font-weight: 900
      margin-bottom: 1.75rem
    ul
      list-style-type: none
      display: flex
      flex-direction: column
      gap: 0.5rem
      li
        background: rgba(0, 70, 67, 0.06)
        border-radius: 0.55rem
        display: flex
        align-items: center
        gap: 0.5rem
        font-size: 0.96rem
        margin: 0
        min-height: 2.65rem
        padding: 0.55rem 0.65rem
        img
          height: 1.5rem
          width: 1.5rem
          filter: $filter-highlight
  .soft-grid
    display: grid
    grid-template-columns: repeat(4, minmax(0, 1fr))
    gap: 1rem
    article
      @include surface-light
      border-radius: 0.85rem
      padding: 1.5rem
      h4
        color: $color-primary
        font-size: 1.05rem
        font-weight: 900
        margin-bottom: 0.75rem
      p
        color: rgba(0, 70, 67, 0.74)
        font-size: 0.98rem
        line-height: 1.55
  @media (max-width: $xl)
    .columns, .soft-grid
      grid-template-columns: repeat(2, minmax(0, 1fr))
  @media (max-width: $s)
    .columns, .soft-grid
      grid-template-columns: 1fr
</style>
