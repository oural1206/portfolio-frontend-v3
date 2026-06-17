<script setup lang="ts">
/* ============================================================================
   PROJETS
   Presente les projets de formation et personnels avec le meme systeme de carte.
   ========================================================================== */

const { data: formationProjects } = await useAsyncData(() => queryCollection('formationProductions').all())
const { data: personalProjects } = await useAsyncData(() => queryCollection('personalProductions').all())

const currentProduction: any = ref(null)
const projectSliders = ref<Record<string, HTMLElement | null>>({})
const projectSliderState = ref<Record<string, { canScrollLeft: boolean, canScrollRight: boolean }>>({
  formation: { canScrollLeft: false, canScrollRight: false },
  personal: { canScrollLeft: false, canScrollRight: false },
})

// ===================== CARROUSELS ===================== //

function setProjectSlider(key: string, element: Element | ComponentPublicInstance | null) {
  if (element instanceof HTMLElement) {
    projectSliders.value[key] = element
  }
  else {
    projectSliders.value[key] = null
  }
}

function updateProjectSliderState(key: string) {
  const slider = projectSliders.value[key]

  if (!slider) {
    return
  }

  projectSliderState.value[key] = {
    canScrollLeft: slider.scrollLeft > 8,
    canScrollRight: slider.scrollLeft + slider.clientWidth < slider.scrollWidth - 8,
  }
}

function scrollProjectSlider(key: string, direction: number) {
  const slider = projectSliders.value[key]

  if (!slider) {
    return
  }

  slider.scrollBy({
    left: direction * slider.clientWidth * 0.85,
    behavior: 'smooth',
  })

  window.setTimeout(() => updateProjectSliderState(key), 450)
}

onMounted(() => {
  nextTick(() => {
    resetAllProjectSliders()
    updateProjectSliderState('formation')
    updateProjectSliderState('personal')
  })

  window.setTimeout(() => {
    resetAllProjectSliders()
    updateAllProjectSliderStates()
  }, 100)

  window.addEventListener('resize', updateAllProjectSliderStates)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateAllProjectSliderStates)
})

function updateAllProjectSliderStates() {
  updateProjectSliderState('formation')
  updateProjectSliderState('personal')
}

function resetAllProjectSliders() {
  Object.values(projectSliders.value).forEach((slider) => {
    if (slider) {
      slider.scrollLeft = 0
    }
  })
}

function getProjectCover(cover: string) {
  return `/_ipx/f_webp,s_480x300/assets/productions-img/${cover}`
}

// ===================== MODALE DE PROJET ===================== //

function closeProduction() {
  currentProduction.value = null
}

watch(currentProduction, (newValue) => {
  if (newValue) {
    document.body.classList.add('no-scroll')
  }
  else {
    document.body.classList.remove('no-scroll')
  }
})

onBeforeUnmount(() => {
  document.body.classList.remove('no-scroll')
})
</script>

<template>
  <section id="projets" class="header-display projects-section">
    <div class="section-heading center">
      <span class="eyebrow">Projets</span>
      <h2>Des réalisations concrètes</h2>
    </div>

    <div class="project-block formation-block">
      <div class="block-heading">
        <div>
          <h3>Projets de formation</h3>
          <p>
            Les projets de formation montrent les
            <ImageModal dark-bg large src="/assets/images/competences-geii.png" title="Compétences du BUT GEII" description="Compétences du parcours AII mise en avant. Lecture par niveau d’année.">
              competences travaillees en BUT GEII
            </ImageModal>
            et autres.
          </p>
        </div>
      </div>

      <div class="carousel-shell">
        <button
          type="button"
          class="carousel-arrow left"
          :class="{ hidden: !projectSliderState.formation.canScrollLeft }"
          aria-label="Voir les projets de formation precedents"
          @click="scrollProjectSlider('formation', -1)"
        >
          ‹
        </button>
        <div :ref="element => setProjectSlider('formation', element)" class="cards-row" @scroll="updateProjectSliderState('formation')">
          <article
            v-for="(production, index) in formationProjects"
            :key="index"
            class="project-card"
            @click="currentProduction = production"
          >
            <div v-if="production.meta.cover" class="thumbnail" :style="`background-image: url('${getProjectCover(production.meta.cover)}')`" />
            <div v-else class="thumbnail placeholder">
              GEII
            </div>
            <div class="content">
              <span>{{ production.meta.type || 'Projet de formation' }}</span>
              <h4>{{ production.title }}</h4>
              <p v-html="production.description" />
            </div>
          </article>
        </div>
        <button
          type="button"
          class="carousel-arrow right"
          :class="{ hidden: !projectSliderState.formation.canScrollRight }"
          aria-label="Voir les projets de formation suivants"
          @click="scrollProjectSlider('formation', 1)"
        >
          ›
        </button>
      </div>
    </div>

    <span class="project-divider" aria-hidden="true" />

    <div class="project-block personal-block">
      <div class="block-heading">
        <div>
          <h3>Projets personnels</h3>
          <p>Les projets personnels mettent en avant mes compétences acquises de manière <strong class="dark-bg">autodidacte</strong>.</p>
        </div>
      </div>

      <div class="carousel-shell">
        <button
          type="button"
          class="carousel-arrow left"
          :class="{ hidden: !projectSliderState.personal.canScrollLeft }"
          aria-label="Voir les projets personnels precedents"
          @click="scrollProjectSlider('personal', -1)"
        >
          ‹
        </button>
        <div :ref="element => setProjectSlider('personal', element)" class="cards-row" @scroll="updateProjectSliderState('personal')">
          <article
            v-for="(production, index) in personalProjects"
            :key="index"
            class="project-card"
            @click="currentProduction = production"
          >
            <div v-if="production.meta.cover" class="thumbnail" :style="`background-image: url('${getProjectCover(production.meta.cover)}')`" />
            <div v-else class="thumbnail placeholder">
              Projet
            </div>
            <div class="content">
              <span>{{ production.meta.type || 'Projet personnel' }}</span>
              <h4>{{ production.title }}</h4>
              <p v-html="production.description" />
            </div>
          </article>
        </div>
        <button
          type="button"
          class="carousel-arrow right"
          :class="{ hidden: !projectSliderState.personal.canScrollRight }"
          aria-label="Voir les projets personnels suivants"
          @click="scrollProjectSlider('personal', 1)"
        >
          ›
        </button>
      </div>
    </div>

    <div v-if="currentProduction" class="reader">
      <div class="background" @click="closeProduction" />
      <div class="container">
        <NuxtImg class="close-btn" src="/assets/icons/cross.svg" alt="Icon fermer" @click="closeProduction" />
        <span class="type">{{ currentProduction.meta.type || 'Projet de formation' }}</span>
        <h1>{{ currentProduction.title }}</h1>
        <ul v-if="currentProduction?.meta.competences?.length" class="tags">
          <li v-for="(tag, tagIndex) in currentProduction.meta.competences" :key="tagIndex">
            <NuxtImg v-if="tag.icon" :src="`/assets/skills-icons/${tag.icon}`" :alt="`Icon de ${tag.name}`" />
            <span>{{ tag.name }}</span>
          </li>
        </ul>
        <ContentRenderer class="content" :value="currentProduction" />
      </div>
    </div>
  </section>
</template>

<style lang="sass">
@use "/assets/style/_variables" as *
@use "/assets/style/content-style" as *

body.no-scroll
  height: 100%
  overflow-y: hidden

.projects-section
  width: 100%
  overflow-x: clip
  background-color: $color-primary
  color: $color-secondary
  display: flex
  flex-direction: column
  gap: 3rem
  @include padding
  .section-heading
    h2
      @include section-title-dark
    p
      color: $color-text-on-dark
  .project-block
    display: flex
    flex-direction: column
    gap: 2rem
    strong.dark-bg, .highlight.dark-bg, .image-text-link.dark-bg
      background: $color-highlight
      border-radius: 0.18rem
      box-decoration-break: clone
      color: $color-text-on-highlight
      font-weight: 900
      padding: 0.02em 0.18em
      -webkit-box-decoration-break: clone
    .image-text-link.dark-bg
      text-decoration-color: $color-text-on-highlight
      &:hover
        text-decoration-color: $color-primary
    .block-heading
      max-width: 56rem
      width: 100%
      h3
        color: $color-white
        font-size: clamp(1.65rem, 2vw, 2.25rem)
        font-weight: 900
        margin-bottom: 1rem
      p
        color: $color-text-on-dark
        line-height: 1.6
  .project-divider
    background: linear-gradient(90deg, $highlight-strong, $border-soft-subtle, transparent)
    display: block
    height: 1px
    width: 100%
  .carousel-shell
    --carousel-edge: 10rem
    --carousel-padding: 15rem
    --carousel-arrow-size: 2.5rem
    position: relative
    width: 100vw
    margin-left: calc(50% - 50vw)
    margin-right: calc(50% - 50vw)
    &::before, &::after
      bottom: 0
      content: ''
      pointer-events: none
      position: absolute
      top: 0
      width: var(--carousel-edge)
      z-index: 2
    &::before
      background: linear-gradient(90deg, $color-primary, $color-primary-gradient, transparent)
      left: 0
    &::after
      background: linear-gradient(270deg, $color-primary, $color-primary-gradient, transparent)
      right: 0
  .cards-row
    display: grid
    grid-auto-columns: clamp(16rem, 24vw, 19rem)
    grid-auto-flow: column
    gap: clamp(1rem, 1.6vw, 1.5rem)
    overflow-x: auto
    padding: 0.35rem var(--carousel-padding) 0.8rem
    scroll-behavior: smooth
    scroll-padding-inline: var(--carousel-padding)
    scroll-snap-type: x mandatory
    scrollbar-width: none
    &::-webkit-scrollbar
      display: none
  .carousel-arrow
    align-items: center
    background: transparent
    border-radius: 0
    color: $color-dark
    display: flex
    font-size: 1.45rem
    font-weight: 900
    height: 100%
    justify-content: center
    padding: 0
    position: absolute
    top: 0
    width: var(--carousel-edge)
    z-index: 3
    transition: color 0.2s ease, opacity 0.2s ease
    &::before
      background-color: $color-highlight
      border-radius: 50%
      box-shadow: 0 0 0 $highlight-transparent
      content: ''
      height: var(--carousel-arrow-size)
      left: 50%
      position: absolute
      top: 50%
      transform: translate(-50%, -50%)
      transition: transform 0.22s ease, box-shadow 0.22s ease, opacity 0.22s ease
      width: var(--carousel-arrow-size)
      z-index: -1
    &:hover
      box-shadow: none
      &::before
        box-shadow: 0 0 2.75rem $highlight-glow
        transform: translate(-50%, -50%) scale(1.08)
    &:active
      transform: scale(1)
      &::before
        transform: translate(-50%, -50%) scale(0.96)
    &.hidden
      opacity: 0
      pointer-events: none
    &.left
      left: 0
    &.right
      right: 0
  .project-card
    scroll-snap-align: start
    display: flex
    flex-direction: column
    border: 1px solid $border-soft
    border-radius: 0.5rem
    background: $surface-dark
    min-height: 100%
    overflow: hidden
    cursor: pointer
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease
    &:hover
      border-color: $color-highlight
      box-shadow: 0 1.5rem 3rem $shadow-dark
      transform: translateY(-0.2rem)
    .thumbnail
      aspect-ratio: 16 / 10
      background-position: center
      background-size: cover
      &.placeholder
        background-color: $color-secondary
        color: $color-primary
        display: flex
        align-items: center
        justify-content: center
        font-weight: 900
    .content
      display: flex
      flex-direction: column
      flex: 1
      padding: 1.1rem
      span
        color: $color-highlight
        font-size: 0.76rem
        font-weight: 900
        text-transform: uppercase
      h4
        color: $color-white
        font-size: 1.05rem
        font-weight: 900
        line-height: 1.2
        margin: 0.45rem 0 0.65rem
      p
        color: $color-text-on-dark
        font-size: 0.88rem
        line-height: 1.45
  .reader
    .container
      z-index: 15
      display: flex
      align-items: center
      flex-direction: column
      position: fixed
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      padding: 3rem
      border-radius: 0.75rem
      width: 62.5vw
      max-height: 95vh
      color: $color-secondary
      background-color: $color-primary
      overflow-y: auto
      box-shadow: 0 2rem 6rem $shadow-dark-strong
      .type
        color: $color-highlight
        font-size: 0.85rem
        font-weight: 900
        text-transform: uppercase
        margin-bottom: 0.75rem
      > h1
        font-size: 2rem
        color: $color-white
        font-weight: 800
        margin-bottom: 2rem
        text-align: center
      .tags
        max-width: 80%
        flex-wrap: wrap
        justify-content: center
        margin-bottom: 1.5rem
      .close-btn
        position: absolute
        top: 1.5rem
        right: 1.5rem
        width: 1.5rem
        height: 1.5rem
        filter: $filter-secondary
        cursor: pointer
        &:hover
          filter: $filter-highlight
      .content
        width: 100%
        height: 100%
        padding-right: 1rem
        @include content-style
      ::-webkit-scrollbar
        width: 5px
        height: 5px
        background: $surface-transparent
      ::-webkit-scrollbar-thumb
        border-radius: 1rem
        background: $color-highlight
        &:active
          background: $color-wrong
    .background
      z-index: 10
      position: fixed
      top: 0
      left: 0
      height: 100%
      width: 100%
      background-color: $overlay-dark
      backdrop-filter: blur(7.5px)
  .tags
    display: flex
    gap: 0.5rem
    li
      display: flex
      gap: 0.25rem
      align-items: center
      background-color: $color-secondary
      padding: 0.25rem
      border-radius: 0.25rem
      img
        filter: $filter-primary
        width: 1rem
        height: 1rem
      span
        color: $color-primary
        font-size: 0.825rem
        font-weight: 800
  @media (max-width: $xl)
    .carousel-shell
      --carousel-padding: 10rem
    .cards-row
      grid-auto-columns: clamp(15.5rem, 24vw, 18.5rem)
  @media (max-width: $l)
    .carousel-shell
      --carousel-padding: 10rem
    .block-heading
      max-width: none
      ul
        grid-template-columns: repeat(2, minmax(0, 1fr))
    .reader .container
      padding: 2rem 1.25rem
      width: 95vw
  @media (max-width: $m)
    gap: 6rem
    .carousel-shell
      --carousel-edge: 4rem
      --carousel-padding: 3.75rem
      --carousel-arrow-size: 2.35rem
    .cards-row
      grid-auto-columns: minmax(15.5rem, 76vw)
  @media (max-width: $xs)
    .carousel-shell
      --carousel-padding: 2rem
</style>
