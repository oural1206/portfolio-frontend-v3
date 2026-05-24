<script setup lang="ts">
/* ============================================================================
   PROJETS
   Presente les projets de formation et personnels avec le meme systeme de carte.
   ========================================================================== */

const img = useImage()
const { data: formationProjects } = await useAsyncData(() => queryCollection('formationProductions').all())
const { data: personalProjects } = await useAsyncData(() => queryCollection('personalProductions').all())

const currentProduction: any = ref(null)
const projectSliders = ref<Record<string, HTMLElement | null>>({})

// ===================== COMPETENCES GEII ===================== //

const geiiCompetences = [
  'Concevoir une solution technique a partir d’un besoin.',
  'Verifier par des tests, des mesures et une procedure claire.',
  'Documenter une demarche et presenter un resultat.',
  'Travailler en equipe et organiser les taches.',
]

function setProjectSlider(key: string, element: Element | null) {
  projectSliders.value[key] = element as HTMLElement | null
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
}

watch(currentProduction, (newValue) => {
  if (newValue) {
    document.body.classList.add('no-scroll')
  }
  else {
    document.body.classList.remove('no-scroll')
  }
})
</script>

<template>
  <section id="projets" class="header-display projects-section">
    <div class="section-heading">
      <h2>Projets</h2>
      <p>
        Les projets de formation montrent les competences travaillees en BUT GEII. Les projets personnels montrent ce que je construis par curiosite et par autonomie.
      </p>
    </div>

    <div class="project-block">
      <div class="block-heading">
        <div>
          <h3>Projets de formation</h3>
          <p>Competences GEII mobilisees : concevoir, verifier, documenter et travailler en equipe.</p>
        </div>
        <ul>
          <li v-for="item in geiiCompetences" :key="item">
            {{ item }}
          </li>
        </ul>
      </div>

      <div class="carousel-shell">
        <button type="button" class="carousel-arrow left" aria-label="Voir les projets precedents" @click="scrollProjectSlider('formation', -1)">
          ‹
        </button>
        <div :ref="element => setProjectSlider('formation', element)" class="cards-row">
          <article
            v-for="(production, index) in formationProjects"
            :key="index"
            class="project-card"
            @click="currentProduction = production"
          >
            <div v-if="production.meta.cover" class="thumbnail" :style="`background-image: url('${img(`/assets/productions-img/${production.meta.cover}`)}')`" />
            <div v-else class="thumbnail placeholder">
              GEII
            </div>
            <div class="content">
              <span>{{ production.meta.type }}</span>
              <h4>{{ production.title }}</h4>
              <p v-html="production.description" />
            </div>
          </article>
        </div>
        <button type="button" class="carousel-arrow right" aria-label="Voir les projets suivants" @click="scrollProjectSlider('formation', 1)">
          ›
        </button>
      </div>
    </div>

    <div class="project-block">
      <div class="block-heading">
        <div>
          <h3>Projets personnels</h3>
          <p>Des projets menes en dehors du cadre scolaire, pour apprendre en pratiquant.</p>
        </div>
      </div>

      <div class="carousel-shell">
        <button type="button" class="carousel-arrow left" aria-label="Voir les projets precedents" @click="scrollProjectSlider('personal', -1)">
          ‹
        </button>
        <div :ref="element => setProjectSlider('personal', element)" class="cards-row">
          <article
            v-for="(production, index) in personalProjects"
            :key="index"
            class="project-card"
            @click="currentProduction = production"
          >
            <div v-if="production.meta.cover" class="thumbnail" :style="`background-image: url('${img(`/assets/productions-img/${production.meta.cover}`)}')`" />
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
        <button type="button" class="carousel-arrow right" aria-label="Voir les projets suivants" @click="scrollProjectSlider('personal', 1)">
          ›
        </button>
      </div>
    </div>

    <div v-if="currentProduction" class="reader">
      <div class="background" @click="currentProduction = null" />
      <div class="container">
        <NuxtImg class="close-btn" src="/assets/icons/cross.svg" alt="Icon fermer" @click="currentProduction = null" />
        <span class="type">{{ currentProduction.meta.type }}</span>
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
  background-color: $color-primary
  color: $color-secondary
  display: flex
  flex-direction: column
  gap: 7rem
  @include padding
  .section-heading
    max-width: 55rem
    h2
      margin-bottom: 1.5rem
      @include section-title-dark
    p
      color: rgba(171, 209, 198, 0.86)
  .project-block
    display: flex
    flex-direction: column
    gap: 2.5rem
  .block-heading
    display: grid
    grid-template-columns: 1fr 1.2fr
    gap: 3rem
    align-items: start
    h3
      color: $color-white
      font-size: 1.45rem
      font-weight: 900
      margin-bottom: 1rem
    p
      color: rgba(171, 209, 198, 0.82)
      line-height: 1.6
    ul
      display: grid
      grid-template-columns: repeat(2, minmax(0, 1fr))
      gap: 0.75rem
      list-style: none
      li
        border: 1px solid rgba(171, 209, 198, 0.18)
        border-radius: 0.5rem
        color: rgba(171, 209, 198, 0.9)
        font-size: 0.95rem
        line-height: 1.45
        padding: 1rem
  .carousel-shell
    position: relative
  .cards-row
    display: grid
    grid-auto-columns: minmax(34rem, 42rem)
    grid-auto-flow: column
    gap: 1.5rem
    overflow-x: auto
    padding: 0.25rem 0 1.25rem
    scroll-behavior: smooth
    scroll-snap-type: x mandatory
    scrollbar-width: thin
    scrollbar-color: $color-highlight rgba(171, 209, 198, 0.14)
  .carousel-arrow
    align-items: center
    background-color: $color-highlight
    border-radius: 50%
    color: $color-dark
    display: flex
    font-size: 2rem
    font-weight: 900
    height: 3rem
    justify-content: center
    padding: 0
    position: absolute
    top: 50%
    transform: translateY(-50%)
    width: 3rem
    z-index: 2
    &.left
      left: -1.5rem
    &.right
      right: -1.5rem
  .project-card
    scroll-snap-align: start
    display: grid
    grid-template-columns: minmax(12rem, 0.85fr) 1.15fr
    gap: 1rem
    border: 1px solid rgba(171, 209, 198, 0.18)
    border-radius: 0.75rem
    background-color: rgba(0, 30, 29, 0.18)
    padding: 1rem
    cursor: pointer
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease
    &:hover
      border-color: $color-highlight
      box-shadow: 0 1.5rem 3rem rgba(0, 30, 29, 0.18)
      transform: translateY(-0.2rem)
    .thumbnail
      min-height: 17rem
      background-position: center
      background-size: cover
      border-radius: 0.5rem
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
      justify-content: center
      padding: 1rem
      span
        color: $color-highlight
        font-size: 0.82rem
        font-weight: 900
        text-transform: uppercase
      h4
        color: $color-white
        font-size: 1.45rem
        font-weight: 900
        margin: 0.75rem 0 1rem
      p
        color: rgba(171, 209, 198, 0.84)
        font-size: 0.98rem
        line-height: 1.55
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
      box-shadow: 0 2rem 6rem rgba(0, 30, 29, 0.35)
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
        background: rgba(0, 0, 0, 0)
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
      background-color: rgba(0, 30, 29, 0.75)
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
    .cards-row
      grid-auto-columns: minmax(30rem, 75vw)
  @media (max-width: $l)
    .block-heading
      grid-template-columns: 1fr
      ul
        grid-template-columns: repeat(2, minmax(0, 1fr))
    .reader .container
      padding: 2rem 1.25rem
      width: 95vw
  @media (max-width: $m)
    gap: 5rem
    .block-heading ul
      grid-template-columns: 1fr
    .project-card
      grid-template-columns: 1fr
      .thumbnail
        min-height: 14rem
    .cards-row
      grid-auto-columns: minmax(18rem, 88vw)
    .carousel-arrow
      display: none
</style>
