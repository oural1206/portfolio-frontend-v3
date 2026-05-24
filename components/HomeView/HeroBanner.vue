<script setup lang="ts">
/* ============================================================================
   HERO
   Premiere impression du portfolio : profil, formation et axes techniques.
   ========================================================================== */

const profileTags = [
  'Autodidacte',
  'Passionné',
  'Créatif',
]

const quickFacts = [
  { value: '5', label: 'immersions pro.' },
  { value: '+10', label: 'réalisations' },
  { value: '+5 ans', label: 'de passion' },
]

onMounted(() => {
  const header = document.querySelector('header') as HTMLElement
  const heroBanner = document.querySelector('.heroBanner') as HTMLElement

  const offsetHeight = header.offsetHeight
  heroBanner.style.height = `${heroBanner.offsetHeight - offsetHeight}px`
})
</script>

<template>
  <section class="heroBanner">
    <div class="text">
      <h1>
        <span class="intro">Hey, moi c'est<br></span>
        <span class="highlight">Jules</span> Jardri
      </h1>
      <h2>Etudiant en 1re annee de BUT GEII</h2>
      <p class="school">
        <a href="https://www.iut.u-bordeaux.fr/geii/" target="_blank" class="unstyled">
          IUT de Bordeaux — site de Gradignan
        </a>
      </p>
      <p class="intro">
        J'avance entre electronique, programmation, conception 3D et bien d'autres.<br>
        J'aime apprendre de nouvelles compétences pour faire parler mon imagination.
      </p>
      <div class="actions" aria-label="Actions principales">
        <NuxtLink to="/#projets" class="primary-action unstyled">
          Voir mes réalisations
        </NuxtLink>
        <NuxtLink to="/#contact" class="secondary-action unstyled">
          Me contacter
        </NuxtLink>
      </div>
      <ul class="profile-tags">
        <li v-for="tag in profileTags" :key="tag">
          {{ tag }}
        </li>
      </ul>
    </div>
    <div class="image">
      <div class="profile-card">
        <div class="green-overlay" />
        <NuxtImg src="/assets/images/profilePicture.png" alt="Portrait de Jules Jardri" />
      </div>
      <ul class="facts">
        <li v-for="item in quickFacts" :key="item.label">
          <span class="value">{{ item.value }}</span>
          <span class="label">{{ item.label }}</span>
        </li>
      </ul>
    </div>
  </section>
  <NuxtLink to="/#about-me" class="scrollDown">
    <NuxtImg src="/assets/icons/down-arrow.svg" width="18" height="18" alt="Flèche pointant vers le bas" />
  </NuxtLink>
</template>

<style scoped lang="sass">
@use "/assets/style/_variables" as *

.heroBanner
  width: 100%
  height: 100vh
  min-height: 42rem
  padding: 0 10rem
  display: flex
  align-items: center
  justify-content: space-between
  gap: 5rem
  overflow: hidden
  position: relative
  background-color: $color-primary
  color: $color-secondary
  &::before
    content: ''
    position: absolute
    inset: 0
    pointer-events: none
    opacity: 0.16
    background-image: linear-gradient(rgba(171, 209, 198, 0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(171, 209, 198, 0.16) 1px, transparent 1px)
    background-size: 4rem 4rem
  .text
    position: relative
    z-index: 1
    width: min(42rem, 55%)
    h1
      color: $color-white
      font-size: 6.5rem
      font-weight: 900
      line-height: 0.95
      .intro
        font-size: 3rem
        display: block
        margin-bottom: 1rem
      .highlight
        color: $color-highlight
    h2
      font-size: 1.45rem
      font-weight: 800
      margin-top: 1.5rem
    .school
      color: $color-highlight
      margin-top: 0.35rem
    p.intro
      max-width: 42rem
      color: rgba(171, 209, 198, 0.88)
      line-height: 1.65
      margin-top: 2rem
    .actions
      display: flex
      flex-wrap: wrap
      gap: 1rem
      margin-top: 2.25rem
      a
        align-items: center
        border-radius: 0.6rem
        display: inline-flex
        font-size: 0.95rem
        font-weight: 900
        justify-content: center
        min-height: 3.15rem
        padding: 0.9rem 1.2rem
        transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease
        &:hover
          transform: translateY(-0.15rem)
    .primary-action
      background-color: $color-highlight
      box-shadow: 0 1rem 2.5rem rgba(249, 188, 96, 0.18)
      color: $color-dark
    .secondary-action
      border: 1px solid rgba(171, 209, 198, 0.26)
      color: $color-white
      &:hover
        border-color: $color-highlight
    .profile-tags
      display: flex
      flex-wrap: wrap
      gap: 0.75rem
      list-style: none
      margin-top: 2.5rem
      li
        border: 1px solid rgba(171, 209, 198, 0.2)
        border-radius: 999px
        color: $color-secondary
        font-size: 0.9rem
        font-weight: 800
        padding: 0.7rem 1rem
  .image
    position: relative
    z-index: 1
    display: flex
    justify-content: center
    align-items: center
    width: min(31rem, 42%)
    .profile-card
      position: relative
      overflow: hidden
      width: min(25rem, 100%)
      border: 1px solid rgba(171, 209, 198, 0.2)
      border-radius: 1.1rem
      background-color: rgba(0, 30, 29, 0.22)
      padding: 1rem
      box-shadow: 0 2rem 5rem rgba(0, 30, 29, 0.28)
      transform: rotate(-2deg)
      .green-overlay
        border-radius: 0.75rem
        position: absolute
        inset: 0
        background-color: rgba(0, 70, 67, 0.25)
        filter: blur(1.5rem)
        z-index: 0
      img
        position: relative
        z-index: 1
        width: 100%
        aspect-ratio: 1 / 1
        object-fit: cover
        border-radius: 0.75rem
    .facts
      bottom: 2rem
      display: grid
      gap: 0.75rem
      left: -2.5rem
      list-style: none
      position: absolute
      z-index: 2
      li
        background-color: rgba(0, 30, 29, 0.42)
        backdrop-filter: blur(18px)
        border: 1px solid rgba(171, 209, 198, 0.22)
        border-radius: 0.75rem
        box-shadow: 0 1rem 2.5rem rgba(0, 30, 29, 0.24), 0 0 2.5rem rgba(249, 188, 96, 0.08)
        padding: 0.85rem 1rem
        width: 10rem
        .value
          color: $color-highlight
          display: block
          font-size: 1.35rem
          font-weight: 950
        .label
          color: $color-secondary
          font-size: 0.82rem
          font-weight: 800
  @media screen and (max-width: $xl)
    padding: 0 5rem
    .text
      h1
        font-size: 4.75rem
      h2
        font-size: 1.25rem
  @media (max-width: $m)
    min-height: auto
    height: auto !important
    padding: 7rem 2rem 5rem
    flex-direction: column
    align-items: flex-start
    gap: 3rem
    .text
      width: 100%
      h1
        font-size: 3.4rem
    .image
      width: 100%
      .facts
        bottom: auto
        left: auto
        margin-top: 1rem
        position: static
        width: 100%
        li
          width: 100%

.scrollDown
  cursor: pointer
  position: absolute
  bottom: 2.5rem
  left: 50%
  transform: translateX(-50%)
  width: 3rem
  height: 3rem
  border-radius: 100%
  border:  2px solid $color-secondary
  display: flex
  align-items: center
  justify-content: center
  transition: border-color 0.3s ease
  &:hover
    border-color: $color-highlight
    img
      filter: $filter-highlight
  img
    filter: $filter-secondary
    transition: filter 0.3s ease
    animation: scrollDown 2s ease infinite
    @keyframes scrollDown
      0%
        transform: translateY(-15px)
        opacity: 0
      45%
        transform: translateY(0px)
        opacity: 1
      65%
        transform: translateY(-5px)
        opacity: 1
      100%
        transform: translateY(15px)
        opacity: 0
</style>
