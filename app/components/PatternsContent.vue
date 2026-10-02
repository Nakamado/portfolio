<script setup lang="ts">
import mainScss from '~/assets/scss/main.scss?raw'
import variablesScss from '~/assets/scss/_variables.scss?raw'
import buttonScss from '~/assets/scss/components/_button.scss?raw'
import textLinkScss from '~/assets/scss/components/_text-link.scss?raw'
import scrollButtonSource from '~/components/ScrollButton.vue?raw'
import langSwitchSource from '~/components/LangSwitch.vue?raw'
import dragChipSource from '~/components/DragChip.vue?raw'
import type { PatternComponent } from '~/data/patterns'

// Alles, was die Seite zeigt, kommt aus den echten Dateien der Website (Variablen, Quelltext) und aus data/patterns.ts (Erklärungen).
const { lang, t, homePath } = useLang()
const p = computed(() => t.value.patterns)
const onNavigate = focusSection // Fokus auf den Zielabschnitt setzen (siehe utils/focusSection.ts)

const tokens = parseTokens(mainScss)
const colorTokens = tokens.filter((token) => isColorValue(token.value))
const otherTokens = tokens.filter((token) => !isColorValue(token.value))
const rootCode = extractRootBlock(mainScss)
const fontValue = (name: string) => tokens.find((token) => token.name === name)!.value
const pairs = computed(() => contrastRows(tokens, p.value.colors.pairs))
const formatRatio = (ratio: number) =>
  ratio.toLocaleString(lang.value === 'en' ? 'en-US' : 'de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })

const demoPaths = { de: '#components', en: '#components' } // Demo: die Links bleiben auf der Seite
const scaleClasses = ['title', 'h3', 'h4', 'body']
const sources: Record<PatternComponent['id'], { file: string; code: string }> = {
  button: { file: 'components/_button.scss', code: buttonScss },
  'text-link': { file: 'components/_text-link.scss', code: textLinkScss },
  'scroll-button': { file: 'ScrollButton.vue', code: scrollButtonSource },
  'lang-switch': { file: 'LangSwitch.vue', code: langSwitchSource },
  'drag-chip': { file: 'DragChip.vue', code: dragChipSource }
}
</script>

<template>
  <div class="patterns">
    <h1 id="patterns-title" class="patterns__title" tabindex="-1">{{ p.title }}</h1>
    <p class="patterns__intro">{{ p.intro }}</p>

    <nav class="patterns__toc" :aria-label="p.tocLabel">
      <ul class="patterns__toc-list">
        <li v-for="item in p.nav" :key="item.id">
          <a class="text-link" :href="`#${item.id}`" @click="onNavigate">
            <span class="text-link__label">{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </nav>

    <PatternSection id="colors" :title="p.colors.title" :intro="p.colors.intro">
      <ul class="tokens">
        <li v-for="token in colorTokens" :key="token.name" class="token">
          <span class="token__swatch" :style="{ background: `var(--${token.name})` }" aria-hidden="true" />
          <div class="token__body">
            <p class="token__name"><code>--{{ token.name }}</code> <code class="token__value">{{ token.value }}</code></p>
            <p class="token__note">{{ p.colors.notes[token.name] }}</p>
          </div>
        </li>
      </ul>

      <h3 class="patterns__subtitle">{{ p.colors.pairsTitle }}</h3>
      <p class="patterns__note">{{ p.colors.pairsIntro }}</p>
      <ul class="pairs">
        <li v-for="row in pairs" :key="`${row.fg}-${row.bg}`" class="pair">
          <span class="pair__preview" :style="{ color: `var(--${row.fg})`, background: `var(--${row.bg})` }" aria-hidden="true">Aa</span>
          <div class="pair__body">
            <p class="pair__use">{{ row.use }}</p>
            <p class="pair__meta">
              <code>--{{ row.fg }}</code> / <code>--{{ row.bg }}</code> ·
              <strong>{{ formatRatio(row.ratio) }}:1</strong> · {{ p.ui.levels[row.level] }}
            </p>
          </div>
        </li>
      </ul>

      <h3 class="patterns__subtitle">{{ p.colors.codeTitle }}</h3>
      <CodeBlock :code="rootCode" file="assets/scss/main.scss" :summary="p.ui.showCode" />
    </PatternSection>

    <PatternSection id="typography" :title="p.typography.title" :intro="p.typography.intro">
      <ul class="fonts">
        <li v-for="font in p.typography.fonts" :key="font.token" class="font">
          <p class="font__sample" :style="{ fontFamily: `var(--${font.token})` }">{{ font.sample }}</p>
          <p class="font__name">{{ font.name }}</p>
          <p class="font__role">{{ font.role }}</p>
          <p class="font__token"><code>--{{ font.token }}</code> <code>{{ fontValue(font.token) }}</code></p>
        </li>
      </ul>

      <h3 class="patterns__subtitle">{{ p.typography.scaleTitle }}</h3>
      <ul class="scale">
        <li v-for="(row, index) in p.typography.scale" :key="row.label" class="scale__row">
          <p class="scale__label">{{ row.label }}</p>
          <p class="scale__sample" :class="`scale__sample--${scaleClasses[index]}`">{{ row.sample }}</p>
        </li>
      </ul>

      <ul class="notes">
        <li v-for="note in p.typography.notes" :key="note">{{ note }}</li>
      </ul>
    </PatternSection>

    <PatternSection id="layout" :title="p.layout.title" :intro="p.layout.intro">
      <dl class="rules">
        <div v-for="rule in p.layout.rules" :key="rule.title" class="rule">
          <dt class="rule__title">{{ rule.title }}</dt>
          <dd class="rule__text">{{ rule.text }}</dd>
        </div>
      </dl>

      <h3 class="patterns__subtitle">{{ p.layout.tokensTitle }}</h3>
      <ul class="tokens">
        <li v-for="token in otherTokens" :key="token.name" class="token">
          <div class="token__body">
            <p class="token__name"><code>--{{ token.name }}</code></p>
            <p class="token__note"><code class="token__value">{{ token.value }}</code></p>
          </div>
        </li>
      </ul>

      <h3 class="patterns__subtitle">{{ p.layout.scssTitle }}</h3>
      <p class="patterns__note">{{ p.layout.scssIntro }}</p>
      <CodeBlock :code="variablesScss" file="assets/scss/_variables.scss" :summary="p.ui.showCode" />
    </PatternSection>

    <PatternSection id="components" :title="p.components.title" :intro="p.components.intro">
      <PatternItem v-for="item in p.components.items" :key="item.id" :item="item" :file="sources[item.id].file" :code="sources[item.id].code">
        <template v-if="item.id === 'button'">
          <a class="button" href="#components" @click.prevent>{{ t.hero.ctaContact }}</a>
        </template>
        <template v-else-if="item.id === 'text-link'">
          <a class="text-link" href="#components" @click.prevent>
            <span class="text-link__label">{{ t.hero.ctaCv }}</span>
          </a>
        </template>
        <template v-else-if="item.id === 'scroll-button'">
          <ScrollButton href="#components" :label="t.ui.scrollDown" @click.prevent />
        </template>
        <template v-else-if="item.id === 'lang-switch'">
          <LangSwitch lang="de" :paths="demoPaths" :label="t.ui.langLabel" @click.prevent />
          <LangSwitch lang="en" :paths="demoPaths" :label="t.ui.langLabel" @click.prevent />
        </template>
        <ul v-else class="demo-chips">
          <DragChip>Vue</DragChip>
          <DragChip>Nuxt</DragChip>
          <DragChip>TypeScript</DragChip>
        </ul>
      </PatternItem>
    </PatternSection>

    <NuxtLink class="patterns__back text-link" :to="homePath">
      <span class="text-link__label">{{ p.back }}</span>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
$swatch-size: 3.5rem;
$font-sample-font-size: 1.6rem;
$rule-title-font-size: 1.2rem;
.patterns {
  max-width: $measure-page;
  min-height: calc(100svh - var(--header-height));
  margin: 0 auto;
  padding: $page-padding-y var(--gutter);

  &__title {
    margin-bottom: $space-6;
    font-size: $font-title;
  }

  &__intro {
    color: var(--muted);
    font-size: $font-lg;
  }

  &__toc-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0 $space-6;
    margin-bottom: $space-8;
  }

  &__subtitle {
    margin: $space-10 0 $space-3;
  }

  &__note {
    color: var(--muted);
  }

  &__back {
    margin-top: $space-8;
  }
}

code {
  color: var(--text);
  font: $weight-medium $font-mono-size $font-mono;
  overflow-wrap: anywhere;
}

.tokens {
  display: grid;
  gap: $hairline;
  border: $border-line;
  background: var(--line);

  @include up($bp-tablet) {
    grid-template-columns: $columns-2;
  }
}

.token {
  display: flex;
  gap: $space-4;
  padding: $space-4;
  background: var(--bg);

  &__swatch {
    flex: none;
    width: $swatch-size;
    height: $swatch-size;
    border: $border-line;
  }

  &__body {
    min-width: 0;
  }

  &__name,
  &__note {
    margin: 0 0 $space-1;
  }

  &__note {
    color: var(--muted);
    font-size: $font-sm;
  }

  &__value {
    color: var(--muted);
  }
}

.pairs {
  display: grid;
  gap: $space-3;
}

.pair {
  display: flex;
  align-items: center;
  gap: $space-4;

  &__preview {
    display: grid;
    flex: none;
    place-items: center;
    width: $swatch-size;
    height: $swatch-size;
    border: $border-line;
    font-weight: $weight-bold;
  }

  &__use,
  &__meta {
    margin: 0;
  }

  &__use {
    font-weight: $weight-medium;
  }

  &__meta {
    color: var(--muted);
    font-size: $font-sm;
  }
}

.fonts {
  display: grid;
  gap: $space-6;

  @include up($bp-tablet) {
    grid-template-columns: $columns-2;
  }
}

.font {
  padding: $space-6;
  border: $border-line;
  background: var(--bg-alt);

  p {
    margin: 0 0 $space-1;
  }

  &__sample {
    margin-bottom: $space-4 !important;
    font-size: $font-sample-font-size;
    font-weight: $weight-bold;
    line-height: $leading-snug;
  }

  &__name {
    font-weight: $weight-medium;
  }

  &__role,
  &__token {
    color: var(--muted);
    font-size: $font-sm;
  }
}

.scale {
  display: grid;
  gap: $space-5;

  &__row {
    padding-bottom: $space-5;
    border-bottom: $border-line;
  }

  &__label {
    margin: 0 0 $space-2;
    color: var(--muted);
    font-size: $font-sm;
  }

  &__sample {
    max-width: none;
    margin: 0;

    &--title {
      font-family: var(--font-display);
      font-size: $font-title-lg;
      font-weight: $weight-bold;
      line-height: $leading-tight;
    }

    &--h3 {
      font-family: var(--font-display);
      font-size: $font-2xl;
      font-weight: $weight-bold;
      line-height: $leading-tight;
    }

    &--h4 {
      font-size: $font-lg;
      font-weight: $weight-medium;
    }
  }
}

.notes {
  display: grid;
  gap: $space-2;
  margin-top: $space-8;
  padding-left: $list-indent;
  list-style: square;
  color: var(--muted);
}

.rules {
  display: grid;
  gap: $space-6;

  @include up($bp-tablet) {
    grid-template-columns: $columns-2;
  }
}

.rule {
  padding: $space-5;
  border: $border-line;

  &__title {
    margin-bottom: $space-2;
    font-family: var(--font-display);
    font-size: $rule-title-font-size;
    font-weight: $weight-bold;
  }

  &__text {
    margin: 0;
    color: var(--muted);
  }
}

.demo-chips {
  display: flex;
  flex-wrap: wrap;
  gap: $space-2;
}
</style>
