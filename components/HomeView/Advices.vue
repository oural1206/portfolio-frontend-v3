<script setup lang="ts">
/* ============================================================================
   RECOMMANDATIONS
   Garde les avis existants dans un format court et secondaire.
   ========================================================================== */

import advicesData from '~/data/advices.json'

const advices = ref(advicesData)
</script>

<template>
  <section id="recommandations" class="header-display advices-section">
    <div class="section-heading">
      <h2>Avis de stages</h2>
    </div>
    <div class="container">
      <article v-for="(advice, index) in advices" :key="index" class="advice">
        <span class="quote" aria-hidden="true">“</span>
        <span class="picture">
          <NuxtImg class="profile" :src="`/assets/customers-pp/${advice.profilePicture}`" :alt="`Photo de ${advice.name}`" />
          <NuxtImg class="logo" :src="`/assets/company-logos/${advice.companyLogo}`" :alt="`Logo de ${advice.companyName}`" />
        </span>
        <div class="content">
          <h4>{{ advice.name }}</h4>
          <span class="company-name">{{ advice.companyName }}</span>
          <p v-html="advice.comment" />
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped lang="sass">
@use "/assets/style/_variables" as *

.advices-section
  width: 100%
  background-color: $color-secondary
  color: $color-primary
  display: flex
  flex-direction: column
  @include padding
  .section-heading
    margin-bottom: 6rem
    text-align: center
    h2
      @include section-title-light
  .container
    display: grid
    grid-template-columns: repeat(3, minmax(0, 1fr))
    gap: 1.25rem
    .advice
      @include surface-light
      border-radius: 0.9rem
      min-height: 100%
      padding: 5rem 1.5rem 1.5rem
      position: relative
      .quote
        color: rgba(0, 70, 67, 0.14)
        font-family: Georgia, serif
        font-size: 6rem
        line-height: 1
        position: absolute
        right: 1.25rem
        top: 0.5rem
      .picture
        position: relative
        width: 6.5rem
        height: 6.5rem
        left: 0
        position: absolute
        top: 0
        transform: translate(1.5rem, -35%)
        .profile
          width: 100%
          height: 100%
          border: 0.25rem solid $color-primary
          border-radius: 50%
          object-fit: cover
        .logo
          background-color: $color-primary
          padding: 0.25rem
          border-radius: 50%
          position: absolute
          width: 42%
          height: 42%
          bottom: 0
          right: 0
          transform: translate(10%, 10%)
      h4
        font-size: 1.2rem
        font-weight: 950
        margin-bottom: 0.25rem
      .company-name
        color: rgba(0, 70, 67, 0.68)
        display: block
        font-size: 0.92rem
        font-weight: 600
        margin-bottom: 0.85rem
      p
        color: rgba(0, 70, 67, 0.72)
        font-size: 0.95rem
        line-height: 1.58
  @media (max-width: $xl)
    .container
      grid-template-columns: 1fr
  @media (max-width: $s)
    .section-heading
      align-items: flex-start
      flex-direction: column
    .container .advice
      padding-top: 5rem
</style>
