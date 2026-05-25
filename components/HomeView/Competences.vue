<script setup lang="ts">
/* ============================================================================
   OUTILS ET SAVOIR-FAIRE
   Presente les domaines de competences sous forme de cartes et detaille en modale.
   ========================================================================== */

import competencesData from '~/data/competences.json'

interface CompetenceTool {
  name: string
  icon: string
}

interface CompetenceDetail {
  description: string
  tools: CompetenceTool[]
  notions: string[]
}

interface CompetenceCategory {
  id: string
  categoryName: string
  icon: string
  intro: string
  tags: string[]
  detail: CompetenceDetail
}

const competences = ref<CompetenceCategory[]>(competencesData)
const currentCompetence = ref<CompetenceCategory | null>(null)

// Range les tags par lignes pour garder l'ordre de lecture tout en chargeant le bas.
function getTagRows(tags: string[]) {
  const rowSize = 3
  const firstRowSize = tags.length % rowSize || rowSize
  const rows = [tags.slice(0, firstRowSize)]

  for (let index = firstRowSize; index < tags.length; index += rowSize) {
    rows.push(tags.slice(index, index + rowSize))
  }

  return rows
}

// ===================== MODALE DE DETAIL ===================== //

function openCompetence(category: CompetenceCategory) {
  currentCompetence.value = category
}

function closeCompetence() {
  currentCompetence.value = null
}

watch(currentCompetence, (newValue) => {
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
  <section id="competences" class="header-display tools-section">
    <div class="section-heading center">
      <h2>Des <span class="highlight">compétences concrètes</span> et des outils maitrisés</h2>
      <p>
        Retrouvez ici les différents domaines de compétences que je maitrise, ainsi que mes outils travail.
      </p>
    </div>

    <div class="competence-grid">
      <button
        v-for="category in competences"
        :key="category.id"
        type="button"
        class="competence-card"
        @click="openCompetence(category)"
      >
        <span class="card-top">
          <span class="icon-box">
            <NuxtImg :src="`/assets/skills-icons/${category.icon}`" :alt="`Icone ${category.categoryName}`" />
          </span>
          <NuxtImg class="open-indicator" src="/assets/icons/arrow-up-right.svg" alt="" aria-hidden="true" />
        </span>

        <span class="card-content">
          <strong>{{ category.categoryName }}</strong>
          <span>{{ category.intro }}</span>
        </span>

        <span class="tag-list">
          <span v-for="(row, rowIndex) in getTagRows(category.tags)" :key="`${category.id}-${rowIndex}`" class="tag-row">
            <span v-for="tag in row" :key="tag">
              {{ tag }}
            </span>
          </span>
        </span>
      </button>
    </div>

    <Teleport to="body">
      <div v-if="currentCompetence" class="competence-reader" role="dialog" aria-modal="true" :aria-label="currentCompetence.categoryName">
        <div class="background" @click="closeCompetence" />
        <article class="container">
          <button type="button" class="close-btn" aria-label="Fermer le detail" @click="closeCompetence">
            <NuxtImg src="/assets/icons/cross.svg" alt="" aria-hidden="true" />
          </button>

          <header>
            <span class="detail-icon">
              <NuxtImg :src="`/assets/skills-icons/${currentCompetence.icon}`" :alt="`Icone ${currentCompetence.categoryName}`" />
            </span>
            <div>
              <span class="eyebrow">Détail</span>
              <h3>{{ currentCompetence.categoryName }}</h3>
            </div>
          </header>

          <p class="detail-text">
            {{ currentCompetence.detail.description }}
          </p>

          <div class="detail-block">
            <h4>Outils</h4>
            <div class="tool-grid">
              <span v-for="tool in currentCompetence.detail.tools" :key="tool.name">
                <NuxtImg :src="`/assets/skills-icons/${tool.icon}`" :alt="`Icone de ${tool.name}`" />
                <span>{{ tool.name }}</span>
              </span>
            </div>
          </div>

          <div class="detail-block">
            <h4>Notions</h4>
            <ul class="notion-list">
              <li v-for="notion in currentCompetence.detail.notions" :key="notion">
                {{ notion }}
              </li>
            </ul>
          </div>
        </article>
      </div>
    </Teleport>
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
  gap: 4rem
  @include padding
  .competence-grid
    display: grid
    grid-template-columns: repeat(5, minmax(0, 1fr))
    gap: 1rem
  .competence-card
    @include surface-light
    align-items: stretch
    background-color: $surface-white-glass
    border-radius: 0.75rem
    color: $color-primary
    display: grid
    grid-template-rows: auto 1fr auto
    min-height: 17rem
    padding: 1.35rem
    text-align: left
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease
    &:hover
      border-color: $color-highlight
      box-shadow: 0 1.25rem 3rem $shadow-primary-soft
      transform: translateY(-0.2rem)
    &:active
      transform: translateY(-0.1rem)
  .card-top
    align-items: center
    display: flex
    justify-content: space-between
    margin-bottom: 2rem
  .icon-box
    align-items: center
    border: 1px solid $border-primary
    border-radius: 0.65rem
    display: flex
    height: 3rem
    justify-content: center
    width: 3rem
    img
      filter: $filter-primary
      height: 1.45rem
      width: 1.45rem
  .open-indicator
    filter: $filter-primary
    height: 1.1rem
    width: 1.1rem
  .card-content
    display: flex
    flex-direction: column
    gap: 0.9rem
    strong
      background: none
      color: $color-primary
      font-size: 1.05rem
      font-weight: 950
      line-height: 1.1
      min-height: 3.5rem
      text-transform: uppercase
    > span
      color: $color-text
      font-size: 0.92rem
      line-height: 1.5
  .tag-list
    display: flex
    flex-direction: column
    gap: 0.45rem
    justify-content: flex-end
    margin-top: 1.75rem
    min-height: 4.75rem
    .tag-row
      display: flex
      flex-wrap: wrap
      gap: 0.45rem
    .tag-row span
      border: 1px solid $border-primary
      border-radius: 999px
      color: $color-text
      font-size: 0.68rem
      font-weight: 850
      padding: 0.28rem 0.5rem
      text-transform: uppercase

.competence-reader
  .background
    z-index: 20
    position: fixed
    top: 0
    left: 0
    height: 100%
    width: 100%
    background-color: $overlay-dark
    backdrop-filter: blur(7.5px)
  .container
    z-index: 25
    position: fixed
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    width: min(58rem, calc(100vw - 2rem))
    max-height: calc(100vh - 2rem)
    overflow-y: auto
    border-radius: 0.75rem
    background-color: $color-primary
    box-shadow: 0 2rem 6rem $shadow-dark-strong
    color: $color-secondary
    padding: 2.25rem
  .close-btn
    position: absolute
    top: 1.25rem
    right: 1.25rem
    width: 2.35rem
    height: 2.35rem
    display: grid
    place-items: center
    padding: 0
    border-radius: 50%
    background-color: $surface-white-soft
    box-shadow: none
    img
      filter: $filter-secondary
      height: 1rem
      width: 1rem
    &:hover
      box-shadow: none
      img
        filter: $filter-highlight
  header
    align-items: center
    display: flex
    gap: 1rem
    padding-right: 3rem
    .detail-icon
      align-items: center
      background-color: $surface-white-soft
      border: 1px solid $border-soft
      border-radius: 0.65rem
      display: flex
      height: 3.5rem
      justify-content: center
      width: 3.5rem
      img
        filter: $filter-secondary
        height: 1.7rem
        width: 1.7rem
    .eyebrow
      color: $color-highlight
      display: block
      font-size: 0.74rem
      font-weight: 950
      letter-spacing: 0.16em
      margin-bottom: 0.3rem
      text-transform: uppercase
    h3
      color: $color-white
      font-size: clamp(1.45rem, 2vw, 2rem)
      font-weight: 950
      line-height: 1.1
      text-transform: uppercase
  .detail-text
    color: $color-text-on-dark
    font-size: 1.05rem
    line-height: 1.75
    margin: 2rem 0
  .detail-block
    border-top: 1px solid $border-soft
    padding-top: 1.4rem
    & + .detail-block
      margin-top: 1.6rem
    h4
      color: $color-highlight
      font-size: 0.8rem
      font-weight: 950
      letter-spacing: 0.16em
      margin-bottom: 1rem
      text-transform: uppercase
  .tool-grid
    display: grid
    grid-template-columns: repeat(3, minmax(0, 1fr))
    gap: 0.75rem
    > span
      align-items: center
      background: $surface-white-soft
      border: 1px solid $border-soft
      border-radius: 0.55rem
      display: flex
      gap: 0.65rem
      min-height: 3rem
      padding: 0.65rem 0.75rem
      img
        flex: 0 0 auto
        filter: $filter-highlight
        height: 1.45rem
        width: 1.45rem
      span
        color: $color-secondary
        font-size: 0.92rem
        font-weight: 850
        line-height: 1.2
  .notion-list
    display: grid
    gap: 0.55rem
    grid-template-columns: repeat(2, minmax(0, 1fr))
    list-style: none
    li
      color: $color-text-on-dark
      line-height: 1.45
      padding-left: 1.15rem
      position: relative
      &::before
        color: $color-highlight
        content: '-'
        font-weight: 950
        left: 0
        position: absolute
        top: 0

@media (max-width: $xl)
  .tools-section
    .competence-grid
      grid-template-columns: repeat(3, minmax(0, 1fr))

@media (max-width: $m)
  .tools-section
    .competence-grid
      grid-template-columns: 1fr
  .competence-reader
    .container
      padding: 1.5rem
      width: calc(100vw - 1rem)
    .notion-list
      grid-template-columns: 1fr
    .tool-grid
      grid-template-columns: 1fr

@media (max-width: $s)
  .competence-reader
    header
      align-items: flex-start
      flex-direction: column
      padding-right: 2.5rem
</style>
