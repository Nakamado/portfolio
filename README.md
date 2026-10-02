# Portfolio Dustin Clever

Nuxt 4 · Vue 3 · TypeScript · SCSS (BEM) · Vitest

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run test
npm run typecheck
```

## Aufbau
- `app/data/profile.ts` – alle Inhalte, Deutsch und Englisch an einer Stelle
- `app/data/patterns.ts` – Texte der Pattern-Library (`/pattern-library`, `/en/pattern-library`); Farben, Schriften und Quelltexte liest die Seite beim Build direkt aus `main.scss`, `components/_button.scss`, `components/_text-link.scss` und `DragChip.vue`
- `app/pages/index.vue` (`/`, Deutsch) und `app/pages/en/index.vue` (`/en`, Englisch)
- `app/components/` – ein Block pro Komponente, Klassen nach BEM (`block__element--modifier`)
- `app/assets/scss/main.scss` – Design Tokens, Reset und globale Blöcke (`section`, `button`, `text-link`)
- `public/images/portrait.webp` – freigestelltes Porträt (WebP mit Transparenz). Beim Austauschen `width`/`height` in `HeroSection.vue` an das neue Seitenverhältnis anpassen. `og-image.jpg` ist das Social-Preview-Bild (1200×630).
- `app/router.options.ts` – Scrollen zu Ankern (fixierter Header, reduzierte Bewegung); `app/utils/focusSection.ts` setzt den Fokus in den Zielabschnitt

## SEO und Barrierefreiheit
- Je Sprache eine eigene URL (`/` und `/en`) mit `lang`, Canonical, hreflang und Open Graph (greift, sobald `NUXT_PUBLIC_SITE_URL` gesetzt ist)
- Genau eine `h1`, je Abschnitt genau eine `h2`, darunter `h3`/`h4` ohne übersprungene Ebenen (per Test abgesichert)
- Landmarks (`header`, `nav`, `main`, `footer`), Skip-Link, sichtbarer Fokus, Touch-Ziele ab 44 px
- Bilder mit Alt-Text und Größenangaben, Hero-Bild mit hoher Priorität
- `robots.txt`, `sitemap.xml` und JSON-LD (Person) werden automatisch erzeugt
- Anker-Links (Menü, Hero) setzen den Tastaturfokus in den Zielabschnitt; Fokusrahmen sind nie abgeschnitten
- Jeder Abschnitt füllt mindestens die Fensterhöhe unter dem Header, der Hero passt exakt hinein (Desktop)
- `prefers-reduced-motion` wird beachtet; es werden keine Cookies gesetzt
- Mitlaufender Pfeil-Button (`SectionPager.vue`) ab "Über mich": springt zum nächsten Abschnitt, im letzten dreht er sich nach oben und führt zum Anfang
- Die `h2` jedes Abschnitts ist per Tab erreichbar (`tabindex="0"` in `BaseSection.vue`); Fokusrahmen sichtbar, keine Link-/Button-Semantik
- Link-Hover: Unterstrich läuft von links nach rechts von Weiß zu Blau (`.text-link` in `main.scss`); Sprachschalter als animierter "Lichtschalter"
- Easteregg: ASCII-Logo als Kommentar im `<head>` (`server/plugins/easter-egg.ts`) und in der Browser-Konsole (`app/plugins/easter-egg.client.ts`)
- Schriften lädt `@nuxt/fonts` beim Build herunter und liefert sie selbst aus (keine Verbindung zu Google beim Seitenaufruf)

## Vor der Veröffentlichung
- `.env` aus `.env.example` anlegen: `NUXT_PUBLIC_CONTACT_EMAIL`, `NUXT_PUBLIC_LINKEDIN_URL`, `NUXT_PUBLIC_SITE_URL` (z. B. `https://dein-name.de`)
- Lebenslauf-PDFs liegen in `public/cv/`. Beide enthalten die Telefonnummer, die englische zusätzlich das Geburtsdatum. Für eine öffentliche Seite besser Versionen ohne diese Angaben unter gleichem Dateinamen ablegen.
- Impressum: Seite ist angelegt (`/impressum`, `/en/legal-notice`). Straße und PLZ in `nuxt.config.ts` (`imprintStreet`, `imprintCity`) oder per `.env` eintragen; Platzhalter in eckigen Klammern werden orange markiert. Rechtlich prüfen lassen.
- Datenschutzerklärung ergänzen (für Seiten mit deutschem Bezug in der Regel nötig)
- Eigene Projekte in `app/data/profile.ts` unter `work.projects` ergänzen, sobald vorhanden

## Testabdeckung

Ziel ist eine Abdeckung von 100 % (Anweisungen, Zweige, Funktionen, Zeilen). `npm run test:coverage` bricht ab, wenn der Wert darunter fällt; der Bericht liegt danach in `coverage/index.html`. Neuer Code in `app/` oder `shared/` kommt immer mit Tests. Server-Routen bleiben dünn, ihre Logik liegt in `shared/`.
