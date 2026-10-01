<script setup lang="ts">
const { t } = useLang()
const { contactEmail, linkedinUrl } = useRuntimeConfig().public
</script>

<template>
  <BaseSection id="contact" :title="t.contact.title" alt>
    <p class="section__intro">{{ t.contact.text }}</p>
    <div>
      <a class="contact__mail text-link" :href="`mailto:${contactEmail}`">
        <span class="text-link__label">{{ contactEmail }}</span>
      </a>
    </div>
    <ul class="contact__links">
      <li v-if="linkedinUrl" class="contact__item">
        <a class="text-link" :href="linkedinUrl" rel="me noopener" target="_blank">
          <span class="text-link__label">{{ t.contact.linkedin }}</span>
        </a>
      </li>
      <li class="contact__item">
        <a class="text-link" href="/cv/Lebenslauf-Dustin-Clever.pdf" download>
          <span class="text-link__label">{{ t.contact.cvDe }}</span>
        </a>
      </li>
      <li class="contact__item">
        <a class="text-link" href="/cv/CV-Dustin-Clever.pdf" download>
          <span class="text-link__label">{{ t.contact.cvEn }}</span>
        </a>
      </li>
    </ul>
  </BaseSection>
</template>

<style lang="scss" scoped>
.contact {
  &__mail {
    --underline: 4px;

    font-size: clamp(1.4rem, 4.5vw, 3.25rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    overflow-wrap: anywhere;
  }

  &__links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.75rem;
    margin-top: 1.5rem;
  }
}
</style>
