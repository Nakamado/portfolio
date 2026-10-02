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
$contact-mail-font-size: clamp(1.4rem, 4.5vw, 3.25rem);
$contact-links-gap: 1.75rem;
.contact {
  &__mail {
    --underline: 0.25rem;

    font-size: $contact-mail-font-size;
    font-weight: $weight-bold;
    letter-spacing: $tracking-tighter;
    overflow-wrap: anywhere;
  }

  &__links {
    display: flex;
    flex-wrap: wrap;
    gap: $space-2 $contact-links-gap;
    margin-top: $space-6;
  }
}
</style>
