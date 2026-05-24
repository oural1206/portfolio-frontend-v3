<script setup lang="ts">

</script>

<template>
  <section id="banner" class="header-display">
    <h3><span>&#9888;</span> D'autres réalisations arrivent bientôt <span>&#9888;</span></h3>
  </section>
</template>

<style scoped lang="sass">
@use "/assets/style/_variables" as *

#banner
  width: 100%
  background-color: $color-primary
  color: $color-secondary
  display: flex
  flex-direction: column
  padding: 3rem
  h3
    font-weight: 800
    font-size: 1.5rem
    text-align: center
    span
      margin: 0 0.5rem
</style>
