<script setup lang="ts">
/* ============================================================================
   HEADER DE NAVIGATION
   Suit la section visible et garde une navigation par ancres simple.
   ========================================================================== */

import type { CSSProperties } from 'vue'
import { isInViewport } from '@/composables/isInViewport'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const hdrSectionDisplay = ref('')
const isAtTop = ref(true)
const scrollIndicatorStyle = ref<CSSProperties>({
  opacity: 0,
  transform: 'translateX(0px)',
  width: '0px',
})

let headerHeight = 0
let sections: HTMLElement[] = []
let navLinks: HTMLElement[] = []
let rafId = 0
let onResize: (() => void) | null = null

const trackedSections = ['about-me', 'projets', 'outils', 'experiences', 'recommandations', 'contact']
const sectionActivationOffset = 0.18
const indicatorProgressLag = 0.82

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function lerp(start: number, end: number, progress: number) {
  return start + ((end - start) * progress)
}

function isHTMLElement(section: HTMLElement | null): section is HTMLElement {
  return Boolean(section)
}

function isVisibleElement(element: HTMLElement) {
  const rect = element.getBoundingClientRect()

  return rect.width > 0 && rect.height > 0
}

function getSectionLink(sectionId: string) {
  return navLinks.find(link => link.getAttribute('href')?.endsWith(`#${sectionId}`)) || null
}

function getVisibleTargetIndex(sectionIndex: number, direction: -1 | 1) {
  let targetIndex = sectionIndex

  while (targetIndex >= 0 && targetIndex < sections.length) {
    const targetLink = getSectionLink(sections[targetIndex].id)

    if (targetLink && isVisibleElement(targetLink)) {
      return targetIndex
    }

    targetIndex += direction
  }

  return sectionIndex
}

function setHeaderMeasurements() {
  const header = document.querySelector('header') as HTMLElement | null
  const links = header?.querySelector('.links') as HTMLElement | null

  if (!header || !links) {
    return
  }

  const marginTop = Number.parseInt(window.getComputedStyle(header).getPropertyValue('margin-top'), 10) || 0
  headerHeight = header.offsetHeight + marginTop
  navLinks = Array.from(links.querySelectorAll('a'))
  sections = trackedSections
    .map(sectionId => document.getElementById(sectionId))
    .filter(isHTMLElement)
}

function updateScrollIndicator(scrollMarker: number, activeSectionIndex: number) {
  const currentSectionIndex = getVisibleTargetIndex(activeSectionIndex, -1)
  const nextSectionIndex = getVisibleTargetIndex(Math.min(currentSectionIndex + 1, sections.length - 1), 1)
  const currentLink = getSectionLink(sections[currentSectionIndex].id)
  const nextLink = getSectionLink(sections[nextSectionIndex].id)

  if (!currentLink) {
    scrollIndicatorStyle.value = {
      opacity: 0,
      transform: 'translateX(0px)',
      width: '0px',
    }
    return
  }

  const currentRect = currentLink.getBoundingClientRect()
  const nextRect = nextLink?.getBoundingClientRect() || currentRect
  const linksRect = currentLink.closest('.links')?.getBoundingClientRect()
  const currentCenter = currentRect.left - (linksRect?.left || 0) + (currentRect.width / 2)
  const nextCenter = nextRect.left - (linksRect?.left || 0) + (nextRect.width / 2)
  const currentWidth = clamp(currentRect.width * 0.58, 18, 44)
  const nextWidth = clamp(nextRect.width * 0.58, 18, 44)
  const sectionDistance = Math.max(sections[nextSectionIndex].offsetTop - sections[currentSectionIndex].offsetTop || 1, 1)
  const progress = currentSectionIndex >= sections.length - 1 || currentSectionIndex === nextSectionIndex || !nextLink
    ? 0
    : clamp(((scrollMarker - sections[currentSectionIndex].offsetTop) / sectionDistance) * indicatorProgressLag, 0, 1)
  const indicatorWidth = lerp(currentWidth, nextWidth, progress)

  scrollIndicatorStyle.value = {
    opacity: clamp((scrollMarker - sections[0].offsetTop) / 160, 0, 1),
    width: `${indicatorWidth}px`,
    transform: `translateX(${lerp(currentCenter, nextCenter, progress) - indicatorWidth / 2}px)`,
  }
}

function handleScroll() {
  if (!sections.length || !navLinks.length) {
    return
  }

  isAtTop.value = window.scrollY < headerHeight
  const scrollMarker = window.scrollY + headerHeight + (window.innerHeight * sectionActivationOffset)

  // The indicator is driven by the scroll position, not hover state.
  let activeSectionIndex = -1

  sections.forEach((section, index) => {
    if (isInViewport(section, window.innerHeight * sectionActivationOffset)) {
      activeSectionIndex = index
    }
  })

  hdrSectionDisplay.value = activeSectionIndex >= 0 ? sections[activeSectionIndex].id : ''

  if (activeSectionIndex < 0 || scrollMarker < sections[0].offsetTop) {
    scrollIndicatorStyle.value = {
      opacity: 0,
      transform: 'translateX(0px)',
      width: '0px',
    }
    return
  }

  updateScrollIndicator(scrollMarker, activeSectionIndex)
}

function scheduleScrollUpdate() {
  if (rafId) {
    return
  }

  rafId = window.requestAnimationFrame(() => {
    rafId = 0
    handleScroll()
  })
}

onMounted(() => {
  setHeaderMeasurements()
  handleScroll()

  onResize = () => {
    setHeaderMeasurements()
    scheduleScrollUpdate()
  }

  window.addEventListener('scroll', scheduleScrollUpdate, { passive: true })
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scheduleScrollUpdate)
  if (onResize) {
    window.removeEventListener('resize', onResize)
  }
  if (rafId) {
    window.cancelAnimationFrame(rafId)
  }
})
</script>

<template>
  <header :class="{ scrolled: !isAtTop }">
    <NuxtLink to="/" class="title unstyled" @click="scrollToTop">
      <span class="name">Jules</span>
      <span class="section">/{{ hdrSectionDisplay }}</span>
    </NuxtLink>
    <div class="links">
      <span class="scroll-indicator" :style="scrollIndicatorStyle" aria-hidden="true" />
      <NuxtLink to="/#about-me" class="unstyled">
        #about-me
      </NuxtLink>
      <NuxtLink to="/#projets" class="unstyled">
        #projets
      </NuxtLink>
      <NuxtLink to="/#outils" class="unstyled">
        #compétences
      </NuxtLink>
      <NuxtLink to="/#experiences" class="unstyled">
        #expériences
      </NuxtLink>
      <NuxtLink to="/#recommandations" class="xl-screen unstyled">
        #recommandations
      </NuxtLink>
      <NuxtLink to="/#contact" class="unstyled">
        #contacts
      </NuxtLink>
    </div>
  </header>
</template>

<style lang="sass" scoped>
@use "/assets/style/_variables" as *

header
  position: sticky
  top: 0
  left: 0
  z-index: 10
  background-color: rgba(0, 70, 67, 0.94)
  backdrop-filter: blur(18px)
  color: $color-white
  display: flex
  justify-content: space-between
  align-items: center
  padding: 1.25rem 5rem
  border-bottom: 1px solid rgba(171, 209, 198, 0.12)
  &.scrolled
    box-shadow: 0 0 25px 0 rgba(0, 30, 29, 0.22)
  .title
    font-size: 1.375rem
    .section
      color: $color-highlight
  .links
    display: flex
    align-items: center
    gap: 2rem
    position: relative
    .scroll-indicator
      position: absolute
      left: 0
      bottom: -1.15rem
      height: 0.22rem
      border-radius: 999px
      background: linear-gradient(90deg, rgba(249, 188, 96, 0), rgba(249, 188, 96, 0.6) 30%, $color-highlight)
      box-shadow: 0 0 0.65rem rgba(249, 188, 96, 0.22)
      pointer-events: none
      transition: transform 0.22s ease, width 0.22s ease, opacity 0.22s ease
    a
      font-weight: 700
      display: inline-flex
      align-items: center
      position: relative
      color: $color-grey
      --hit-area-y: 0.7rem
      padding-block: var(--hit-area-y)
      margin-block: calc(var(--hit-area-y) * -1)
      line-height: 1
      &::after
        content: ''
        position: absolute
        width: 100%
        transform: scaleX(0)
        bottom: calc(-0.25rem - var(--hit-area-y))
        left: 0
        height: 2px
        background-color: $color-highlight
        transform-origin: bottom right
        transition: transform 0.25s ease-out
      &:hover::after
        transform: scaleX(1)
        transform-origin: bottom left
      &:active::after
        transform: scaleY(1.5)
        transition: transform 0.075s ease-out
  @media (max-width: $xl)
    .links a.xl-screen
      display: none
  @media (max-width: $l)
    .title
      font-size: 1.125rem
    .links
      gap: 1.5rem
      a
        font-size: 0.875rem
  @media (max-width: $m)
    justify-content: center
    .links
      display: none
</style>
