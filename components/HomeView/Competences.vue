<script setup lang="ts">
/* ============================================================================
   COMPETENCES
   Separe le referentiel GEII des outils techniques et ouvre les details en modale.
   ========================================================================== */

import competencesData from '~/data/competences.json'
import geiiCompetencesData from '~/data/geii-competences.json'

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

interface GeiiCompetenceItem {
  id: string
  title: string
  originalTitle: string
}

interface GeiiCompetenceGroup {
  id: string
  title: string
  status: 'active' | 'locked'
  summary: string
  items: GeiiCompetenceItem[]
}

const competences = ref<CompetenceCategory[]>(competencesData)
const geiiCompetences = ref<GeiiCompetenceGroup[]>(geiiCompetencesData as GeiiCompetenceGroup[])
const currentCompetence = ref<CompetenceCategory | null>(null)
const currentGeiiItem = ref<GeiiCompetenceItem | null>(null)

const { data: geiiCompetencePages, refresh: refreshGeiiCompetencePages } = await useAsyncData(
  'geii-competence-pages',
  () => queryCollection('geiiCompetences').all(),
)

const currentGeiiPage = computed(() => {
  if (!currentGeiiItem.value) {
    return null
  }

  return geiiCompetencePages.value?.find((page: any) => {
    const contentKey = getContentKey(currentGeiiItem.value?.id ?? '')

    return getContentCode(page) === currentGeiiItem.value?.id || page.path?.endsWith(`/${contentKey}`)
  }) ?? null
})

const isReaderOpen = computed(() => currentCompetence.value !== null || currentGeiiItem.value !== null)

// ===================== ORGANISATION DES CARTES ===================== //

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

function getContentCode(page: any) {
  if (page.code) {
    return page.code
  }

  if (page.meta?.code) {
    return page.meta.code
  }

  if (typeof page.meta === 'string') {
    try {
      return JSON.parse(page.meta).code
    }
    catch {
      return null
    }
  }

  return null
}

function getContentKey(id: string) {
  return id.replaceAll('.', '').toLowerCase()
}

// ===================== MODALES DE DETAIL ===================== //

function openCompetence(category: CompetenceCategory) {
  currentCompetence.value = category
}

function closeCompetence() {
  currentCompetence.value = null
}

async function openGeiiItem(item: GeiiCompetenceItem) {
  if (!geiiCompetencePages.value?.length) {
    await refreshGeiiCompetencePages()
  }

  currentGeiiItem.value = item
}

function closeGeiiItem() {
  currentGeiiItem.value = null
}

watch(isReaderOpen, (newValue) => {
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
        Une vue d'ensemble de mes savoir-faire techniques ainsi que des preuves associees au referentiel GEII.
      </p>
    </div>

    <div class="skills-block tools-block">
      <div class="block-heading">
        <span class="eyebrow">Technique</span>
        <h3>Outils et savoir-faire techniques</h3>
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

          <span class="card-action" aria-hidden="true">
            Voir le détail
            <NuxtImg src="/assets/icons/arrow-up-right.svg" alt="" />
          </span>
        </button>
      </div>
    </div>

    <div class="skills-block geii-block">
      <div class="block-heading">
        <span class="eyebrow">Référentiel</span>
        <h3>Référentiel GEII et Preuves</h3>
      </div>

      <div class="geii-grid">
        <article
          v-for="group in geiiCompetences"
          :key="group.id"
          class="geii-card"
          :class="{ muted: group.status === 'locked' }"
        >
          <header>
            <span v-if="group.status !== 'active'"> A venir </span>
            <h4>{{ group.title }}</h4>
            <p>{{ group.summary }}</p>
          </header>

          <div class="geii-items">
            <button
              v-for="item in group.items"
              :key="item.id"
              type="button"
              class="geii-item"
              :disabled="group.status !== 'active'"
              @click="openGeiiItem(item)"
            >
              <span class="code">{{ item.id }}</span>
              <span>
                <strong>{{ item.title }}</strong>
              </span>
            </button>
          </div>
        </article>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="currentGeiiItem" class="competence-reader geii-reader" role="dialog" aria-modal="true" :aria-label="currentGeiiItem.title">
        <div class="background" @click="closeGeiiItem" />
        <article class="container">
          <button type="button" class="close-btn" aria-label="Fermer le detail" @click="closeGeiiItem">
            <NuxtImg src="/assets/icons/cross.svg" alt="" aria-hidden="true" />
          </button>

          <header>
            <span class="detail-code">{{ currentGeiiItem.id }}</span>
            <div>
              <span class="eyebrow">Référentiel GEII</span>
              <h3>{{ currentGeiiItem.originalTitle }}</h3>
            </div>
          </header>

          <div v-if="currentGeiiPage" class="geii-content">
            <ContentRenderer :value="currentGeiiPage" />
          </div>
          <div v-else class="geii-content empty-content">
            <h1>{{ currentGeiiItem.id }} - {{ currentGeiiItem.originalTitle }}</h1>
            <p>Le contenu Markdown de cette compétence est prêt à être complété.</p>
          </div>
        </article>
      </div>
    </Teleport>

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
  gap: 4.5rem
  @include padding
  .skills-block
    display: flex
    flex-direction: column
    gap: 1.5rem
  .block-heading
    max-width: 56rem
    .eyebrow
      color: $color-primary
      display: block
      font-size: 0.76rem
      font-weight: 950
      letter-spacing: 0.16em
      margin-bottom: 0.45rem
      opacity: 0.68
      text-transform: uppercase
    h3
      color: $color-primary
      font-size: clamp(1.55rem, 2vw, 2.15rem)
      font-weight: 950
      line-height: 1.1
  .geii-grid
    display: grid
    grid-template-columns: repeat(6, minmax(0, 1fr))
    gap: 1.15rem
  .geii-card
    @include surface-light
    background: linear-gradient(145deg, rgba(255, 255, 254, 0.68), rgba(255, 255, 254, 0.18))
    border-radius: 0.5rem
    display: flex
    flex-direction: column
    gap: 0.95rem
    min-height: 100%
    padding: 1rem
    position: relative
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease
    &:nth-child(1), &:nth-child(2), &:nth-child(3)
      grid-column: span 2
    &:nth-child(4), &:nth-child(5)
      grid-column: span 3
    &.muted
      filter: grayscale(0.8)
      opacity: 0.58
      .geii-item
        cursor: default
        pointer-events: none
    &:hover
      border-color: $color-highlight
      box-shadow: 0 1.8rem 3.8rem $shadow-primary-soft
      transform: translateY(-0.2rem)
    &.muted:hover
      border-color: $border-primary
      box-shadow: 0 1.25rem 3rem $shadow-primary-soft
      transform: none
    header
      display: flex
      flex-direction: column
      gap: 0.45rem
      span
        align-self: flex-start
        background-color: $surface-primary-soft
        border: 1px solid $border-primary
        border-radius: 999px
        color: $color-primary
        font-size: 0.62rem
        font-weight: 950
        padding: 0.26rem 0.48rem
        text-transform: uppercase
      h4
        color: $color-primary
        font-size: 1rem
        font-weight: 950
        line-height: 1.1
        text-transform: uppercase
      p
        color: $color-text
        font-size: 0.78rem
        line-height: 1.35
        margin-top: 0.1rem
  .geii-items
    display: grid
    gap: 0.45rem
  .geii-item
    align-items: center
    background-color: rgba(255, 255, 254, 0.38)
    border: 1px solid rgba(0, 70, 67, 0.14)
    border-radius: 0.45rem
    box-shadow: none
    color: $color-primary
    display: grid
    gap: 0.5rem
    grid-template-columns: auto minmax(0, 1fr)
    min-height: 3.1rem
    padding: 0.55rem 0.62rem
    text-align: left
    transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease
    &:disabled
      cursor: default
    &:hover
      background-color: rgba(255, 255, 254, 0.56)
      border-color: rgba(249, 188, 96, 0.55)
      box-shadow: none
      transform: translateY(-0.06rem)
      strong
        color: $color-primary
    &:disabled:hover
      background-color: rgba(255, 255, 254, 0.38)
      border-color: rgba(0, 70, 67, 0.14)
      transform: none
    &:focus-visible
      border-color: $color-highlight
      box-shadow: 0 0 0 0.2rem $highlight-glow
      outline: none
    .code
      color: $color-highlight
      font-size: 0.78rem
      font-weight: 950
      line-height: 1.2
      transition: color 0.2s ease
    span:not(.code)
      display: flex
      flex-direction: column
      gap: 0.25rem
      min-width: 0
    strong
      background: none
      color: $color-primary
      font-size: 0.76rem
      font-weight: 950
      line-height: 1.2
      transition: color 0.2s ease
  .competence-grid
    display: grid
    grid-template-columns: repeat(5, minmax(0, 1fr))
    gap: 1rem
  .competence-card
    @include surface-light
    --card-accent: #{$color-highlight}
    --card-accent-soft: rgba(249, 188, 96, 0.22)
    align-items: stretch
    background: linear-gradient(145deg, rgba(255, 255, 254, 0.58), rgba(255, 255, 254, 0.16))
    border-radius: 0.5rem
    color: $color-primary
    display: grid
    grid-template-rows: auto 1fr auto auto
    isolation: isolate
    min-height: 17rem
    overflow: hidden
    padding: 1.35rem
    position: relative
    text-align: left
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease
    &::before
      background: linear-gradient(90deg, var(--card-accent), var(--card-accent-soft), $surface-transparent)
      content: ''
      height: 0.24rem
      left: 0
      position: absolute
      right: 0
      top: 0
      transform: scaleX(0.35)
      transform-origin: left
      transition: transform 0.25s ease
      z-index: 0
    &::after
      background: radial-gradient(circle at 100% 100%, var(--card-accent-soft), $surface-transparent 58%)
      bottom: 0
      content: ''
      height: 72%
      opacity: 0
      position: absolute
      right: 0
      transition: opacity 0.25s ease
      width: 82%
      z-index: 0
    &:hover
      border-color: var(--card-accent)
      box-shadow: 0 1.8rem 3.8rem $shadow-primary-soft, inset 0 0 0 1px var(--card-accent-soft)
      transform: translateY(-0.35rem)
      &::before
        transform: scaleX(1)
      &::after
        opacity: 1
      .icon-box
        background-color: $color-primary
        border-color: var(--card-accent)
        box-shadow: 0 0.8rem 1.5rem $shadow-primary-soft
        img
          filter: $filter-secondary
      .tag-row span
        background-color: rgba(255, 255, 254, 0.38)
        border-color: rgba(0, 70, 67, 0.24)
      .card-action
        background-color: $color-primary
        color: $color-secondary
        transform: translateY(0)
        img
          filter: $filter-secondary
          transform: translate(0.12rem, -0.12rem)
    &:active
      transform: translateY(-0.1rem)
    &:focus-visible
      border-color: $color-highlight
      box-shadow: 0 0 0 0.2rem $highlight-glow, 0 1.25rem 3rem $shadow-primary-soft
      outline: none
  .card-top
    align-items: center
    display: flex
    justify-content: space-between
    margin-bottom: 2rem
    position: relative
    z-index: 1
  .icon-box
    align-items: center
    border: 1px solid $border-primary
    border-radius: 0.5rem
    display: flex
    height: 3rem
    justify-content: center
    transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease
    width: 3rem
    img
      filter: $filter-primary
      height: 1.45rem
      transition: filter 0.2s ease
      width: 1.45rem
  .card-content
    display: flex
    flex-direction: column
    gap: 0.9rem
    position: relative
    z-index: 1
    strong
      background: none
      color: $color-primary
      font-size: 1.05rem
      font-weight: 950
      line-height: 1.1
      min-height: 3.5rem
      text-transform: uppercase
      text-wrap: balance
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
    position: relative
    z-index: 1
    .tag-row
      display: flex
      flex-wrap: wrap
      gap: 0.45rem
    .tag-row span
      background-color: rgba(255, 255, 254, 0.22)
      border: 1px solid rgba(0, 70, 67, 0.12)
      border-radius: 999px
      color: $color-text
      font-size: 0.68rem
      font-weight: 850
      padding: 0.28rem 0.5rem
      text-transform: uppercase
      transition: background-color 0.2s ease, border-color 0.2s ease
  .card-action
    align-items: center
    align-self: end
    background-color: rgba(0, 70, 67, 0.08)
    border: 1px solid rgba(0, 70, 67, 0.1)
    border-radius: 999px
    color: $color-primary
    display: inline-flex
    font-size: 0.78rem
    font-weight: 950
    gap: 0.45rem
    justify-content: center
    justify-self: start
    letter-spacing: 0.03em
    margin-top: 1.2rem
    padding: 0.55rem 0.8rem
    position: relative
    text-transform: uppercase
    transform: translateY(0.12rem)
    transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease
    z-index: 1
    img
      filter: $filter-primary
      height: 0.78rem
      transition: filter 0.2s ease, transform 0.2s ease
      width: 0.78rem

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
    .detail-icon, .detail-code
      align-items: center
      background-color: $surface-white-soft
      border: 1px solid $border-soft
      border-radius: 0.65rem
      display: flex
      height: 3.5rem
      justify-content: center
      width: 3.5rem
    .detail-icon img
      filter: $filter-secondary
      height: 1.7rem
      width: 1.7rem
    .detail-code
      color: $color-highlight
      flex: 0 0 auto
      font-size: 0.95rem
      font-weight: 950
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
  .geii-content
    display: flex
    flex-direction: column
    gap: 1.1rem
    margin-top: 2rem
    :deep(h1), :deep(h2)
      color: $color-highlight
      font-weight: 900
      margin: 1.5rem 0 0.35rem
    :deep(h1)
      font-size: 1.55rem
    :deep(h2)
      font-size: 1.25rem
    :deep(h3)
      color: $color-white
      margin-top: 1.1rem
    :deep(p)
      color: $color-text-on-dark
      line-height: 1.75
    :deep(strong)
      color: $color-highlight
      font-weight: 900
    :deep(ul), :deep(ol)
      border-left: 0.25rem solid $color-highlight
      display: grid
      gap: 0.5rem
      margin: 0.5rem 0
      padding-left: 1.25rem
    :deep(li)
      color: $color-text-on-dark
      line-height: 1.55
    :deep(img)
      border-radius: 0.5rem
      display: block
      margin: 1.5rem auto
      max-height: 50vh
      max-width: 75%
    :deep(span.center)
      display: block
      font-weight: 400
      margin: -0.5rem 0 1.75rem
      text-align: center
      width: 100%

.geii-reader
  .container
    width: min(72rem, calc(100vw - 2rem))
  header
    align-items: flex-start
    gap: 1.2rem
    padding-right: 4rem
    .detail-code
      height: 3rem
      margin-top: 0.1rem
      width: 3rem
    h3
      font-size: clamp(1.35rem, 1.45vw, 1.85rem)
      font-weight: 900
      line-height: 1.22
      max-width: 58rem
      text-transform: none
      text-wrap: balance
  .geii-content
    margin-top: 1.5rem

@media (max-width: $xl)
  .tools-section
    .competence-grid
      grid-template-columns: repeat(3, minmax(0, 1fr))
    .geii-grid
      grid-template-columns: repeat(2, minmax(0, 1fr))
    .geii-card
      &:nth-child(1), &:nth-child(2), &:nth-child(3), &:nth-child(4), &:nth-child(5)
        grid-column: auto

@media (max-width: $m)
  .tools-section
    .geii-grid, .competence-grid
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
  .geii-reader
    header
      gap: 0.85rem
      .detail-code
        height: 2.75rem
        width: 2.75rem
      h3
        font-size: 1.2rem
</style>
