<script setup lang="ts">
/* ============================================================================
   CONTACT
   Termine la page avec les liens utiles deja presents dans le portfolio.
   ========================================================================== */

const links = [
  {
    label: 'Email universitaire',
    value: 'jules.jardri@etu.u-bordeaux.fr',
    href: 'mailto:jules.jardri@etu.u-bordeaux.fr',
    icon: 'envelope.svg',
  },
  {
    label: 'Compte Photo / video',
    value: '@julesj.capture',
    href: 'https://www.instagram.com/julesj.capture/',
    icon: 'instagram.svg',
  },
  {
    label: 'Profil LinkedIn',
    value: 'Jules JARDRI',
    href: 'https://www.linkedin.com/in/jules-jardri/',
    icon: 'linkedin.svg',
  },
  {
    label: 'CV en ligne',
    value: 'Voir mon CV',
    href: '/docs/CV_Jules_Jardri.pdf',
    icon: 'paper-clip.svg',
  },
]
</script>

<template>
  <section id="contact" class="header-display contact-section">
    <div class="section-heading">
      <span>Contact</span>
      <h2>Pour échanger ou suivre mes projets</h2>
      <p>
        Je suis toujours ouvert à de nouvelles opportunités et collaborations sur des projets.
      </p>
    </div>

    <div class="links-grid">
      <a v-for="item in links" :key="item.label" :href="item.href" target="_blank" rel="noreferrer" class="contact-card unstyled">
        <NuxtImg :src="`/assets/icons/${item.icon}`" width="28" height="28" :alt="item.label" />
        <span class="label">{{ item.label }}</span>
        <span class="value">{{ item.value }}</span>
      </a>
    </div>
  </section>
</template>

<style scoped lang="sass">
@use "/assets/style/_variables" as *

.contact-section
  background-color: $color-primary
  color: $color-secondary
  width: 100%
  display: grid
  grid-template-columns: 1fr 1.2fr
  gap: 4rem
  align-items: start
  @include padding
  .section-heading
    span
      color: $color-highlight
      font-size: 0.875rem
      font-weight: 900
      text-transform: uppercase
    h2
      margin: 1rem 0 1.5rem
      @include section-title-dark
    p
      color: $color-text-on-dark
  .links-grid
    display: grid
    grid-template-columns: repeat(2, minmax(0, 1fr))
    gap: 1rem
    .contact-card
      @include surface-dark
      min-height: 11rem
      border-radius: 0.75rem
      padding: 1.5rem
      display: flex
      flex-direction: column
      justify-content: space-between
      transition: border-color 0.2s ease, transform 0.2s ease
      &:hover
        border-color: $color-highlight
        transform: translateY(-0.2rem)
      img
        filter: $filter-highlight
      .label
        color: $color-text-on-dark
        font-size: 0.9rem
        font-weight: 800
      .value
        color: $color-white
        font-size: 1.1rem
        font-weight: 900
        overflow-wrap: anywhere
  @media (max-width: $l)
    grid-template-columns: 1fr
  @media (max-width: $s)
    .links-grid
      grid-template-columns: 1fr
</style>
