<script setup lang="ts">
/* ============================================================================
   LIEN IMAGE
   Ouvre une image legere en modale depuis un bout de texte inline.
   ========================================================================== */

interface ImageModalProps {
  src: string
  alt?: string
  title: string
  description?: string
  darkBg?: boolean
  large?: boolean
}

const props = defineProps<ImageModalProps>()

const isOpen = ref(false)
const isExpanded = ref(false)
let bodyWasLocked = false

// ===================== ETAT DE LA MODALE ===================== //

function openModal() {
  bodyWasLocked = document.body.classList.contains('no-scroll')
  document.body.classList.add('no-scroll')
  isExpanded.value = props.large === true
  isOpen.value = true
}

function closeModal() {
  isOpen.value = false
  isExpanded.value = false

  if (!bodyWasLocked) {
    document.body.classList.remove('no-scroll')
  }
}

function toggleExpanded() {
  isExpanded.value = !isExpanded.value
}

// ===================== RACCOURCIS ET NETTOYAGE ===================== //

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isOpen.value) {
    closeModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)

  if (isOpen.value && !bodyWasLocked) {
    document.body.classList.remove('no-scroll')
  }
})
</script>

<template>
  <a class="image-text-link" :class="{ 'dark-bg': props.darkBg }" @click="openModal">
    <slot />
  </a>

  <Teleport to="body">
    <div v-if="isOpen" class="image-reader" role="dialog" aria-modal="true" :aria-label="props.title || props.alt">
      <div class="background" @click="closeModal" />
      <figure class="container" :class="{ expanded: isExpanded }">
        <button type="button" class="close-btn" aria-label="Fermer l'image" @click="closeModal">
          <NuxtImg src="/assets/icons/cross.svg" alt="" aria-hidden="true" />
        </button>
        <NuxtImg class="preview" format="webp" :src="props.src" :alt="props.alt ?? props.title" />
        <figcaption>
          <span class="caption-text">
            <strong>{{ props.title }}</strong>
            <span v-if="props.description">{{ props.description }}</span>
          </span>
          <button
            type="button"
            class="expand-btn"
            :aria-label="isExpanded ? 'Revenir a la vue normale' : 'Agrandir l image'"
            @click="toggleExpanded"
          >
            <NuxtImg :src="isExpanded ? '/assets/icons/reduce.svg' : '/assets/icons/expand.svg'" alt="" aria-hidden="true" />
          </button>
        </figcaption>
      </figure>
    </div>
  </Teleport>
</template>

<style scoped lang="sass">
@use "/assets/style/_variables" as *

// Le style du lien inline est gere avec les liens globaux.

.image-reader
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
    width: min(46rem, calc(100vw - 2rem))
    max-height: calc(100vh - 2rem)
    margin: 0
    overflow-y: auto
    border-radius: 0.75rem
    background-color: $color-secondary
    box-shadow: 0 2rem 6rem $shadow-dark-strong
    &.expanded
      width: min(86rem, calc(100vw - 2rem))
      max-height: calc(100vh - 1.5rem)
      .preview
        max-height: 84vh
  .close-btn
    position: absolute
    top: 1rem
    right: 1rem
    width: 2.5rem
    height: 2.5rem
    display: grid
    place-items: center
    padding: 0
    border-radius: 50%
    background-color: $color-secondary
    box-shadow: 0 0.5rem 1.5rem $shadow-dark
    transition: all 0.2s ease
    img
      width: 1.1rem
      height: 1.1rem
      filter: $filter-primary
    &:hover
      box-shadow: 0 0.5rem 1.5rem $shadow-dark
      background-color: $color-primary
      img
        filter: $filter-secondary
  .preview
    display: block
    width: 100%
    max-height: 72vh
    object-fit: contain
    background-color: $color-primary
  figcaption
    display: grid
    grid-template-columns: minmax(0, 1fr) auto
    align-items: end
    gap: 1rem
    padding: 1rem 1.25rem 1.2rem
    color: $color-primary
    .caption-text
      display: flex
      flex-direction: column
      gap: 0.35rem
    strong
      background: none
      color: $color-primary
      font-size: 1rem
      font-weight: 900
    span
      color: $color-text
      line-height: 1.45
    .expand-btn
      width: 2.5rem
      height: 2.5rem
      display: grid
      place-items: center
      padding: 0
      border-radius: 0.4rem
      background-color: $surface-primary-soft
      box-shadow: none
      img
        width: 1.15rem
        height: 1.15rem
        filter: $filter-primary
      &:hover
        background-color: $color-highlight
        box-shadow: none
      &:active
        transform: scale(0.95)

@media (max-width: $s)
  .image-reader
    .container
      width: calc(100vw - 1rem)
      max-height: calc(100vh - 1rem)
      &.expanded
        width: calc(100vw - 0.75rem)
        max-height: calc(100vh - 0.75rem)
        .preview
          max-height: 82vh
    .close-btn
      top: 0.75rem
      right: 0.75rem
    figcaption
      padding: 0.9rem 1rem 1rem
</style>
