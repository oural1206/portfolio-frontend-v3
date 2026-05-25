<script setup lang="ts">
/* ============================================================================
   FOOTER
   Rappelle les liens secondaires et le socle technique du site.
   ========================================================================== */

// ===================== DATE DE MISE A JOUR ===================== //

const { public: publicConfig } = useRuntimeConfig()

const formattedLastUpdatedAt = computed(() => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(publicConfig.lastUpdatedAt))
})
</script>

<template>
  <footer>
    <div class="container">
      <p>© 2026 Jules JARDRI. Tous droits réservés.</p>
      <p class="footer-updated-at">
        Derniere modification : {{ formattedLastUpdatedAt }}
      </p>
    </div>
  </footer>
</template>

<style scoped lang="sass">
@use "/assets/style/_variables" as *

footer
  background-color: $color-primary
  color: $color-secondary
  padding: 0 10vw
  .container
    padding: 1rem 1.5rem
    border-top: $color-secondary 2px solid
    display: flex
    justify-content: space-between
    align-items: center
    p
      font-size: 0.95rem
    .footer-updated-at
      text-align: right
    @media (max-width: $ml)
      flex-direction: column
      gap: 1.25rem
      p
        text-align: center
</style>
