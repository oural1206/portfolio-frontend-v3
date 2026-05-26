<script setup lang="ts">
/* ============================================================================
   A PROPOS
   Presente le profil, la formation actuelle, le projet et l'equilibre personnel.
   ========================================================================== */

const personalBalance = [
  'drone',
  'vidéos',
  'running',
  'vélo',
]
</script>

<template>
  <section id="about-me" class="header-display">
    <div class="section-heading">
      <h2>Qui suis-je ?</h2>
      <p>
        Étudiant en GEII, mais aussi passionné depuis tout petit...
      </p>
    </div>

    <div class="about-bento">
      <article class="intro-card">
        <h3>Mon parcours...</h3>
        <p>
          Moi c’est Jules, un jeune étudiant passionné par la <strong>programmation</strong> depuis petit, ainsi que par <strong>l’électronique et la conception mécatronique</strong> depuis quelques années.
        </p>
        <p>
          <strong>À l’âge de 10 ans</strong>, j’ai débuté la programmation par blocs avec la robotique Lego EV3, puis j’ai découvert Python et Lua à 12 ans en voulant aller plus loin.
        </p>
        <p>
          Aujourd’hui, je garde cette même logique : <strong>apprendre par projet</strong>, tester, corriger et fabriquer plein de petits prototypes dans ma chambre <i>(<ImageModal src="/assets/images/atelier.jpeg" title="Apercu de mon atelier...">qui ressemble plus à un atelier</ImageModal>)</i>.
        </p>
      </article>

      <aside class="balance-card">
        <span class="eyebrow">Équilibre personnel</span>
        <h3>L'électronique, mais pas que...</h3>
        <p>
          Quand je n’ai pas la tête dans mon atelier, j’aime faire voler des drones FPV que j’assemble ou réaliser des vidéos.
          <br>
          J’aime également aller courir et faire de longues balades à vélo, ou simplement passer du temps avec mes amis.
        </p>
        <ul>
          <li v-for="item in personalBalance" :key="item">
            {{ item }}
          </li>
        </ul>
      </aside>
    </div>

    <div class="project-cards">
      <article class="project-card">
        <span>Aujourd’hui</span>
        <h3>Mes formations actuelles</h3>
        <p>
          Cette année, j’ai intégré le <strong>BUT Génie Électrique et Informatique Industrielle</strong> (GEII), qui était mon premier choix.<br>
          J’ai choisi de m’orienter vers le parcours <a href="https://www.iut.u-bordeaux.fr/geii/but-parcours-aii/" target="_blank"><strong>Automatisme et Informatique Industrielle</strong> (AII)</a>, pour garder un lien fort avec la programmation.
          <br><br>
          En parallèle, je m'investis dans un double diplôme universitaire <a href="https://www.iut.u-bordeaux.fr/formations/tss/" target="_blank"><strong>Technologies au Service de la Santé</strong></a>, qui mêle l’informatique, l’électronique et la mécanique pour concevoir des solutions innovantes.
        </p>
      </article>
      <article class="project-card">
        <span>Demain</span>
        <h3>Mon projet professionnel</h3>
        <p>
          Je compte me spécialiser dans le domaine de l’<strong>automatisation</strong>.
          <br><br>
          J’aimerais garder un équilibre entre la programmation et <strong>l’ingénierie terrain</strong>, en travaillant en bureau d’études mais aussi sur la mise en service et le dépannage.
        </p>
      </article>
    </div>
  </section>
</template>

<style scoped lang="sass">
@use "/assets/style/_variables" as *

#about-me
  width: 100%
  background-color: $color-secondary
  color: $color-primary
  display: flex
  flex-direction: column
  @include padding
  .section-heading
    margin-bottom: 3.5rem
    max-width: 58rem
    h2
      color: $color-primary
      margin-bottom: 1rem
    p
      color: $color-text
      max-width: 48rem
  h2, h3
    font-weight: 900
    margin: 0 0 2rem 0
  .about-bento
    display: grid
    grid-template-columns: minmax(0, 1.45fr) minmax(18rem, 0.55fr)
    gap: 1.25rem
    align-items: stretch
    margin-bottom: 1.25rem
  .intro-card
    @include surface-light
    border-radius: 0.85rem
    padding: 2rem
    h3
      color: $color-primary
      font-size: 1.75rem
      line-height: 1.08
      max-width: 48rem
      margin-bottom: 1.5rem
    p + p
      margin-top: 1rem
    p
      color: $color-text
      line-height: 1.7
  .project-cards
    display: grid
    grid-template-columns: minmax(0, 1.25fr) minmax(18rem, 0.75fr)
    gap: 1.25rem
    .project-card
      background: $surface-primary-soft
      border: 1px solid $border-primary
      border-radius: 0.85rem
      display: flex
      flex-direction: column
      min-height: 18rem
      padding: 2rem
      span
        background-color: $color-highlight
        border-radius: 999px
        color: $color-dark
        display: inline-flex
        font-size: 0.82rem
        font-weight: 950
        margin-bottom: 1.25rem
        padding: 0.35rem 0.7rem
        width: fit-content
      h3
        color: $color-primary
        font-size: 1.35rem
        margin-bottom: 1rem
      p
        color: $color-text
        line-height: 1.65
  .balance-card
    background-color: $color-primary
    border: 1px solid $border-primary
    border-radius: 0.85rem
    color: $color-secondary
    display: flex
    flex-direction: column
    justify-content: space-between
    padding: 1.5rem
    .eyebrow
      color: $color-highlight
      display: block
      font-size: 0.82rem
      font-weight: 950
      letter-spacing: 0.08em
      text-transform: uppercase
    h3
      color: $color-white
      font-size: 1.2rem
      line-height: 1.12
      margin-bottom: 1rem
    p
      color: $color-text-on-dark
      font-size: 0.96rem
      line-height: 1.6
      strong
        color: $color-white
    ul
      display: flex
      flex-wrap: wrap
      gap: 0.55rem
      list-style: none
      margin-top: 1.5rem
      li
        background-color: $surface-white-soft
        border: 1px solid $border-soft
        border-radius: 999px
        color: $color-secondary
        font-size: 0.82rem
        font-weight: 700
        padding: 0.42rem 0.65rem
  @media (max-width: $l)
    .about-bento
      grid-template-columns: 1fr
    .project-cards
      grid-template-columns: 1fr
  @media (max-width: $m)
    h2, h3
      margin: 0 0 1.5rem 0
  @media (max-width: $s)
    p, li
      font-size: 0.95rem
    .intro-card, .project-cards .project-card, .balance-card
      padding: 1.25rem
</style>
