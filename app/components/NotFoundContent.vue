<script setup lang="ts">
// 404-Seite. Erst steht ganz normal Text da, darüber ein paar Tags (zwischen „404“-Platz und Text). Dann fallen die Tags auf den Footer und im Punktraster
// leuchtet "404" auf. Der Text ist der eigentliche Inhalt, der Rest ist Beigabe (siehe Pattern-Library).
const { t, homePath, patternsPath } = useLang()
const n = computed(() => t.value.notFound)
const fallen = ref(false)
const labels = ['404', 'href=""', 'undefined', '<NotFound />']
</script>

<template>
  <FallingStage class="not-found" :labels="labels" @fall="fallen = true">
    <HeroBackdrop sign="404" sign-at=".not-found__sign" :lit="fallen" />
    <template #before>
      <div class="not-found__sign" aria-hidden="true" />
    </template>
    <div class="not-found__copy">
      <p class="not-found__code">{{ n.code }}</p>
      <h1 id="not-found-title" class="not-found__title" tabindex="-1">{{ n.title }}</h1>
      <p class="not-found__text">{{ n.textBefore }}<code>href=""</code>{{ n.textAfter }}</p>
      <div class="not-found__actions">
        <NuxtLink class="button" :to="homePath">{{ n.home }}</NuxtLink>
        <NuxtLink class="text-link" :to="patternsPath">
          <span class="text-link__label">{{ n.patterns }}</span>
        </NuxtLink>
      </div>
    </div>
  </FallingStage>
</template>

<style lang="scss" scoped>
$floor-space: 4rem; // freier Streifen unten, auf dem die Tags liegen, ohne Text oder Links zu verdecken
$copy-max-width: 36rem;
$sign-space: 14rem; // Platz für die „404“ im Punktraster (7 Zeilen), das Raster setzt die Schrift auf diese Höhe
$bp-sign: 32rem; // darunter hat das Raster weniger als 17 Spalten, die Schrift passt nicht mehr

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1; // füllt den Platz zwischen Header und Footer (siehe main.scss), der Boden ist die Oberkante des Footers
  padding: $page-padding-y var(--gutter) $floor-space;
  text-align: center;

  &__copy {
    width: 100%;
    max-width: $copy-max-width;
  }

  &__sign {
    height: $sign-space;

    @include down($bp-sign) {
      display: none;
    }
  }

  &__code {
    margin: 0 0 $space-2;
    color: var(--muted);
    font-size: $font-sm;
    font-weight: $weight-bold;
    letter-spacing: $tracking-caps;
    text-transform: uppercase;
  }

  &__title {
    margin-bottom: $space-4;
    font-size: $font-title;
    line-height: $leading-tight;
  }

  &__text {
    margin: 0 auto $space-6;
    color: var(--muted);
    font-size: $font-lg;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: $space-2 $space-6;
  }
}

code {
  color: var(--text);
  font: $weight-medium $font-mono-size $font-mono;
}
</style>
