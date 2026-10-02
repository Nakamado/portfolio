<script setup lang="ts">
const { t, imprintPath, privacyPath, patternsPath } = useLang()
</script>

<template>
  <footer class="site-footer">
    <p class="site-footer__text">© {{ new Date().getFullYear() }} Dustin Clever</p>
    <div class="site-footer__links">
      <NuxtLink class="site-footer__link text-link" :to="imprintPath">
        <span class="text-link__label">{{ t.footer.imprint }}</span>
      </NuxtLink>
      <NuxtLink class="site-footer__link text-link" :to="privacyPath">
        <span class="text-link__label">{{ t.footer.privacy }}</span>
      </NuxtLink>
      <NuxtLink class="site-footer__link text-link" :to="patternsPath">
        <span class="text-link__label">{{ t.footer.patterns }}</span>
      </NuxtLink>
    </div>
    <p class="site-footer__text">{{ t.footer.built }}</p>
  </footer>
</template>

<style lang="scss" scoped>
// Mobil untereinander: Copyright, dann beide Links nebeneinander, dann "Gebaut mit ...".
// Ab 768 px passt alles in eine Zeile.
.site-footer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: $space-1;
  padding: $space-5 var(--gutter);
  background: var(--bg);
  border-top: $border-line;
  color: var(--muted);
  font-size: $font-sm;

  @include up($bp-footer) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: $space-2 $space-6;
  }

  &__text {
    margin: 0;
  }

  &__links {
    display: flex;
    flex-wrap: wrap;
    gap: 0 $space-6;
  }

  &__link {
    color: var(--text);
  }
}
</style>
