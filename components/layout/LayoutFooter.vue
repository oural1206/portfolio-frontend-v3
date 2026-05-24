<script setup lang="ts">
/* ============================================================================
   FOOTER
   Rappelle les liens secondaires et le socle technique du site.
   ========================================================================== */
</script>

<template>
  <footer>
    <div class="container">
      <p>OURAL.DEV © 2026 • Portfolio realise avec Nuxt et pense sur Figma</p>
      <div class="social-links">
        <a href="https://www.instagram.com/julesj.capture/" target="_blank">
          <NuxtImg src="/assets/icons/instagram.svg" width="32" height="32" alt="Instagram" />
        </a>
        <a href="https://github.com/Oural1206" target="_blank">
          <NuxtImg src="/assets/icons/github.svg" width="32" height="32" alt="Github" />
        </a>
        <a href="https://discord.com/users/550295322329612307" target="_blank">
          <NuxtImg src="/assets/icons/discord.svg" width="32" height="32" alt="Discord" />
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="sass">
@use "/assets/style/_variables" as *

footer
  background-color: $color-secondary
  color: $color-primary
  padding: 0 10vw
  .container
    padding: 1rem 1.5rem
    border-top: $color-primary 2px solid
    display: flex
    justify-content: space-between
    align-items: center
    p
      font-size: 0.95rem
    .social-links
      display: flex
      align-items: center
      gap: 1.25rem
      a img
        filter: $filter-primary
        transition: transform 0.2s ease-in-out
        &:hover
          transform: scale(0.9)
        &:active
          filter: $filter-highlight
    @media (max-width: $ml)
      flex-direction: column
      gap: 1.25rem
      p
        text-align: center
      .social-links
        justify-content: center
</style>
