/** Inhalte der Pattern-Library-Seite (DE und EN). Farben, Schriften und Quelltexte kommen beim Build direkt aus den Dateien der Website. */

export interface PatternApiRow { name: string; description: string }

export interface PatternComponent {
  id: 'button' | 'text-link' | 'scroll-button' | 'lang-switch' | 'theme-switch' | 'drag-chip' | 'not-found'
  title: string
  description: string
  api: PatternApiRow[]
  a11y: string[]
  usageLabel: string
  usage: string
}

export interface PatternsContent {
  metaTitle: string
  title: string
  intro: string
  tocLabel: string
  nav: { id: string; label: string }[]
  ui: {
    token: string
    value: string
    usage: string
    pair: string
    ratio: string
    level: string
    showCode: string
    codeLabel: string
    preview: string
    openNotFound: string
    api: string
    a11y: string
    levels: { AAA: string; AA: string; UI: string; fail: string }
  }
  colors: {
    title: string
    intro: string
    notes: Record<string, string>
    pairsTitle: string
    pairsIntro: string
    pairs: { fg: string; bg: string; use: string }[]
    codeTitle: string
  }
  typography: {
    title: string
    intro: string
    fonts: { token: string; name: string; role: string; sample: string }[]
    scaleTitle: string
    scale: { label: string; sample: string }[]
    notes: string[]
  }
  layout: {
    title: string
    intro: string
    rules: { title: string; text: string }[]
    tokensTitle: string
    scssTitle: string
    scssIntro: string
  }
  components: { title: string; intro: string; items: PatternComponent[] }
  back: string
}

const de: PatternsContent = {
  metaTitle: 'Pattern-Library – Dustin Clever',
  title: 'Pattern-Library',
  intro:
    'Hier zeige ich die Bausteine dieser Website: Farben, Schrift, Layout und die wiederverwendbaren Komponenten. Der Quelltext wird beim Erstellen der Seite direkt aus den Dateien der Website gelesen, ist also immer der aktuelle Stand und nicht nachgebaut.',
  tocLabel: 'Auf dieser Seite',
  nav: [
    { id: 'colors', label: 'Farben' },
    { id: 'typography', label: 'Typografie' },
    { id: 'layout', label: 'Layout' },
    { id: 'components', label: 'Komponenten' }
  ],
  ui: {
    token: 'Variable',
    value: 'Wert',
    usage: 'Verwendung',
    pair: 'Kombination',
    ratio: 'Kontrast',
    level: 'Stufe',
    showCode: 'Quelltext anzeigen',
    codeLabel: 'Quelltext',
    preview: 'Vorschau',
    openNotFound: '404-Seite ansehen',
    api: 'Schnittstelle',
    a11y: 'Barrierefreiheit',
    levels: { AAA: 'AAA', AA: 'AA', UI: 'ab 3:1 (Bedienelemente, große Schrift)', fail: 'unter 3:1' }
  },
  colors: {
    title: 'Farben',
    intro:
      'Ein dunkles und ein helles Theme mit genau einem Akzentton. Alle Farben sind CSS-Variablen in main.scss, die Tabelle wird aus dieser Datei gelesen und zeigt die Werte des gerade aktiven Themes (Schalter oben im Header).',
    notes: {
      bg: 'Hintergrund der Seite und der geraden Abschnitte.',
      'bg-alt': 'Hintergrund der abwechselnden Abschnitte (Über mich, Skills, Kontakt).',
      text: 'Fließtext und Überschriften.',
      'on-blue': 'Schrift und Symbole auf blauen Flächen (Button, Scroll-Button).',
      muted: 'Zweitfarbe für Einleitungen, Hinweise und Menüpunkte im Ruhezustand.',
      line: 'Feine Trennlinien und Rahmen (Weiß mit 14 % Deckkraft).',
      blue: 'Akzent: Button, Logo-Symbol und der Schrägstrich vor Abschnittsüberschriften.',
      'blue-dark': 'Hover-Zustand des Buttons.',
      'blue-light': 'Unterstrich und Rahmen im Hover (Text-Link, Drag-Chip) sowie die Punkte im Hero-Raster.',
      focus: 'Fokusrahmen für die Tastaturbedienung.'
    },
    pairsTitle: 'Kontraste',
    pairsIntro:
      'Berechnet aus den Variablen nach WCAG 2.x. Text braucht mindestens 4,5:1 (AA), Bedienelemente und große Schrift 3:1.',
    pairs: [
      { fg: 'text', bg: 'bg', use: 'Fließtext auf dem Seitenhintergrund' },
      { fg: 'muted', bg: 'bg', use: 'Zweittext auf dem Seitenhintergrund' },
      { fg: 'muted', bg: 'bg-alt', use: 'Zweittext auf abwechselnden Abschnitten' },
      { fg: 'on-blue', bg: 'blue', use: 'Beschriftung des Buttons' },
      { fg: 'on-blue', bg: 'blue-dark', use: 'Beschriftung des Buttons im Hover' },
      { fg: 'blue-light', bg: 'bg', use: 'Unterstrich und Rahmen im Hover' },
      { fg: 'focus', bg: 'bg', use: 'Fokusrahmen' },
      { fg: 'blue', bg: 'bg', use: 'Akzent (Logo, Schrägstrich), rein dekorativ' }
    ],
    codeTitle: 'Alle Variablen im Quelltext'
  },
  typography: {
    title: 'Typografie',
    intro:
      'Zwei Schriften, beide selbst ausgeliefert: Beim Aufruf der Seite findet keine Verbindung zu Google statt.',
    fonts: [
      { token: 'font-display', name: 'Roboto Slab', role: 'Logo und Überschriften (h1 bis h3)', sample: 'Frontend-Entwicklung mit Sorgfalt' },
      { token: 'font', name: 'Space Grotesk', role: 'Fließtext, Menü, Buttons und Titel von Einträgen (h4)', sample: 'Komponenten, die man gern benutzt' }
    ],
    scaleTitle: 'Größen',
    scale: [
      { label: 'Abschnittstitel · Roboto Slab 700 · 2 bis 3,5 rem (fließend)', sample: 'Erfahrung' },
      { label: 'Überschrift 3 · Roboto Slab 700 · 1,5 rem', sample: 'Berufliche Erfahrung' },
      { label: 'Überschrift 4 · Space Grotesk 500 · 1,15 rem', sample: 'Frontend Developer' },
      { label: 'Fließtext · Space Grotesk 400 · 1,0625 rem, Zeilenhöhe 1,65', sample: 'Ich komme aus dem Design und baue Oberflächen mit Vue, Nuxt und TypeScript.' }
    ],
    notes: [
      'Die Serifenschrift gibt den Überschriften Charakter, die serifenlose Grotesk hält Text und Oberfläche ruhig.',
      'Textspalten sind auf 65 Zeichen begrenzt, damit Zeilen gut lesbar bleiben.',
      'Die Textschrift lädt vorab und mit font-display: optional. Kommt sie nicht rechtzeitig an, bleibt die Ersatzschrift stehen, statt dass sich der Text später verschiebt (Layout Shift).'
    ]
  },
  layout: {
    title: 'Layout',
    intro: 'Wenige feste Regeln, die überall gelten.',
    rules: [
      {
        title: 'Abschnitte',
        text: 'Jeder Abschnitt ist mindestens 90 % so hoch wie das Fenster unter dem Header. So lugt der nächste Abschnitt unten hervor und zeigt, dass es weitergeht. Abwechselnde Hintergründe (bg und bg-alt) trennen die Abschnitte ohne Linien.'
      },
      {
        title: 'Seitenrand',
        text: 'Ein fließender Rand (gutter) von 1,25 bis 4 rem hält Inhalte auf jeder Breite am gleichen Rand.'
      },
      {
        title: 'Header',
        text: 'Ab 1000 px ist der Header einzeilig und bleibt oben stehen. Darunter besteht er aus zwei Zeilen: oben Logo und Sprachschalter, darunter die Menüpunkte, die bei Bedarf umbrechen.'
      },
      {
        title: 'Hero',
        text: 'Ab 1024 px liegt das Porträt als Hintergrundebene zwischen dem Text links und den Infoblöcken rechts. Darunter steht es unter dem Text.'
      },
      {
        title: 'Formen',
        text: 'Eckig, ohne Rundungen, ohne Glas- oder Leuchteffekte. Die Spielereien (Punktraster im Hero, verschiebbare Tags) sind rein dekorativ.'
      },
      {
        title: 'Bedienbarkeit',
        text: 'Klickflächen sind mindestens 44 px hoch. Der Fokusrahmen ist 3 px stark und überall sichtbar. Bei „reduzierte Bewegung“ werden Übergänge und Animationen abgeschaltet oder verkürzt.'
      }
    ],
    tokensTitle: 'Variablen für Schrift und Layout',
    scssTitle: 'SCSS-Variablen und Mixins',
    scssIntro: 'Breakpoints, Abstände, Schriftgrößen, Mindestgrößen und Übergänge liegen in einer eigenen SCSS-Datei, weil sie in Media Queries stehen oder sich zur Laufzeit nicht ändern. Die Abstände folgen einer Skala in 0,25-rem-Schritten, mit den Mixins up(), down() und between() heißt ein Breakpoint überall gleich. Werte, die nur an einer Stelle vorkommen, stehen als lokale Variable in der jeweiligen Komponente. Die Datei wird beim Build in jede SCSS-Datei geladen.'
  },
  components: {
    title: 'Komponenten',
    intro:
      'Die Komponenten sind bewusst klein. Jede zeigt eine Vorschau zum Ausprobieren (Maus und Tastatur), die Schnittstelle, Hinweise zur Barrierefreiheit und den echten Quelltext.',
    items: [
      {
        id: 'button',
        title: 'Button',
        description:
          'Die Hauptaktion eines Bereichs, zum Beispiel „Kontakt aufnehmen“ im Hero. Technisch ein Link, der wie ein Button aussieht, weil er zu einem Abschnitt springt und keine Aktion auslöst.',
        api: [{ name: '.button', description: 'Eckige Fläche in blue mit weißer Schrift, mindestens 3 rem hoch. Hover: blue-dark.' }],
        a11y: [
          'Ein echter Link: Enter öffnet das Ziel, der Fokusrahmen ist sichtbar.',
          'Der Hover ändert nur die Farbe, nichts ist ausschließlich per Maus erreichbar.',
          'Der Kontrast der Beschriftung steht in der Tabelle unter „Farben“.'
        ],
        usageLabel: 'Verwendung im Hero',
        usage: '<a class="button" href="#contact">Kontakt aufnehmen</a>'
      },
      {
        id: 'text-link',
        title: 'Text-Link',
        description:
          'Für alle weiteren Links. Der Unterstrich liegt am Text und läuft beim Hover von links nach rechts von Weiß zu Blau durch. Das Label sitzt in einem eigenen Element, nur dort liegt der Unterstrich.',
        api: [
          { name: '.text-link', description: 'Block: Link mit mindestens 2,75 rem Höhe, optional mit Symbol (Abstand 0,5 rem).' },
          { name: '.text-link__label', description: 'Element: der Text mit dem animierten Unterstrich.' }
        ],
        a11y: [
          'Der Unterstrich ist auch im Ruhezustand sichtbar, Links erkennt man also nicht nur an der Farbe.',
          'Hover und Tastaturfokus lösen dieselbe Animation aus.',
          'Bei „reduzierte Bewegung“ springt der Unterstrich ohne Übergang.'
        ],
        usageLabel: 'Verwendung im Kontaktbereich',
        usage:
          '<a class="text-link" href="/cv/Lebenslauf-Dustin-Clever.pdf" download>\n  <span class="text-link__label">Lebenslauf (DE)</span>\n</a>'
      },
      {
        id: 'scroll-button',
        title: 'Scroll-Button',
        description:
          'Der runde Pfeil unter den Hero-Aktionen, der zum nächsten Abschnitt führt. Technisch ein Anker-Link; nach dem Klick landet der Fokus auf der Überschrift des Ziels.',
        api: [
          { name: 'href', description: 'Ziel-Anker, zum Beispiel #about.' },
          { name: 'label', description: 'Zugänglicher Name, da der Button nur ein Symbol zeigt.' }
        ],
        a11y: [
          'Ein echter Link mit aria-label, der Pfeil selbst ist für Screenreader ausgeblendet.',
          'Die Klickfläche ist 4 rem groß, der Fokusrahmen ist sichtbar.',
          'Der Hover ändert nur die Farbe; bei „reduzierte Bewegung“ entfällt der Übergang.'
        ],
        usageLabel: 'Verwendung im Hero',
        usage: '<ScrollButton href="#about" label="Nach unten scrollen" />'
      },
      {
        id: 'lang-switch',
        title: 'Sprachschalter',
        description:
          'Wechselt zwischen Deutsch und Englisch, gestaltet wie ein Lichtschalter: der Knopf springt zur aktiven Sprache, die Spur leuchtet bei EN blau. Die Komponente kennt keine Routen, alles kommt über Props. Die Vorschau zeigt beide Zustände; die Links bleiben hier auf der Seite.',
        api: [
          { name: 'lang', description: 'Aktive Sprache: de oder en. Steuert Knopf und Farbe.' },
          { name: 'paths', description: 'Zielpfad je Sprache, zum Beispiel { de: "/", en: "/en" }.' },
          { name: 'label', description: 'Beschriftung der Navigation für Screenreader.' }
        ],
        a11y: [
          'Zwei normale Links mit lang, hreflang und ausgeschriebenem Namen („Deutsch (DE)“), die aktive Sprache trägt aria-current="page".',
          'Der Zustand wird nicht nur durch die Position des Knopfes gezeigt, sondern auch durch die invertierte Schriftfarbe.',
          'Bei „reduzierte Bewegung“ springt der Knopf ohne Übergang.'
        ],
        usageLabel: 'Verwendung im Header',
        usage: '<LangSwitch lang="de" :paths="{ de: \'/\', en: \'/en\' }" label="Sprache" />'
      },
      {
        id: 'theme-switch',
        title: 'Theme-Schalter',
        description:
          'Wechselt zwischen hellem und dunklem Design. Beim ersten Besuch gilt die Systemeinstellung, danach die Wahl, die der Browser sich merkt. Ein kleines Skript im Head setzt das Theme, bevor die Seite gezeichnet wird, damit nichts aufblitzt. Die Vorschau schaltet wirklich um, auch diese Seite.',
        api: [
          { name: 'label', description: 'Beschriftung für Screenreader, zum Beispiel „Helles Design“. Der Zustand steht in aria-pressed.' },
          { name: 'useTheme()', description: 'Gemeinsamer Zustand (theme, isLight, toggle). Die Farben selbst hängen an data-theme auf <html> (main.scss), die Logik steckt in utils/theme.ts.' }
        ],
        a11y: [
          'Ein echter Button mit aria-label und aria-pressed (gedrückt = helles Design), per Tastatur bedienbar.',
          'Beide Symbole stehen im HTML, welches sichtbar ist, entscheidet das CSS. Das Symbol allein trägt keine Bedeutung, der Name kommt aus dem Label.',
          'Gespeichert wird nur die Wahl (dark oder light) im localStorage, ohne Cookie. Ist der Speicher gesperrt, gilt die Wahl bis zum Neuladen. Bei „reduzierte Bewegung“ gibt es keine Übergänge.'
        ],
        usageLabel: 'Verwendung im Header',
        usage: '<ThemeSwitch label="Helles Design" />'
      },
      {
        id: 'drag-chip',
        title: 'Drag-Chip',
        description:
          'Der kleine Tag bei den Technologien in der Erfahrung. Er lässt sich mit Maus oder Finger greifen, verschieben und springt beim Loslassen federnd zurück. Rein dekorativ: Inhalt bleibt ein normales Listenelement. Auf der 404-Seite steuert eine Physik seine Position.',
        api: [
          { name: 'Slot (default)', description: 'Die Beschriftung des Tags, zum Beispiel „Vue“.' },
          { name: 'Props', description: 'Alle optional. offset: Position {x, y}, die der Aufrufer bestimmt (dann kein Zurückfedern). still: nicht greifbar.' },
          { name: 'Events', description: 'grab, drag und release mit dem Pointer-Ereignis, damit der Aufrufer die Position berechnen kann.' }
        ],
        a11y: [
          'Für Screenreader ein gewöhnliches Listenelement, es braucht keinen Fokus und keine Bedienung.',
          'Bei „reduzierte Bewegung“ springt der Tag ohne Federn zurück.',
          'touch-action: none verhindert, dass beim Ziehen am Tag die Seite scrollt.'
        ],
        usageLabel: 'Verwendung in der Erfahrung',
        usage: '<ul class="chips">\n  <DragChip>Vue</DragChip>\n  <DragChip>Nuxt</DragChip>\n</ul>'
      },
      {
        id: 'not-found',
        title: '404-Seite',
        description:
          'Wer eine Adresse aufruft, die es nicht gibt, sieht erst ganz normal Text und darüber ein paar Tags. Dann fallen die Tags auf den Footer, prallen ab und bleiben liegen, und im Punktraster aus dem Hero leuchtet „404“ auf. Die Tags lassen sich greifen und wegwerfen, das Raster weicht dem Mauszeiger aus. Der Text ist der eigentliche Inhalt, alles andere ist Beigabe.',
        api: [
          { name: 'FallingStage', description: 'Prop labels (die Tags), Event fall (die Tags beginnen zu fallen) und ein Slot für den Inhalt. Rendert die Tags als DragChip und rechnet die Physik (utils/physics.ts). Der Boden ist die Unterkante der Bühne.' },
          { name: 'HeroBackdrop', description: 'Dasselbe Punktraster wie im Hero, hier über die ganze Bühne. Props sign (Text aus den Ziffern 0 und 4) und lit: die Schrift leuchtet auf, sobald lit true ist. Passt sie nicht ins Raster (schmale Fenster), bleibt sie weg.' }
        ],
        a11y: [
          'Raster und Tags sind rein dekorativ (aria-hidden). Überschrift, Text und Links sind der echte Inhalt.',
          'Bei „reduzierte Bewegung“ liegen die Tags sofort am Boden, nichts fällt und nichts lässt sich werfen. „404“ steht ohne Übergang im Raster.',
          'Die Seite steht auf noindex und nicht in der Sitemap. Die Sprache folgt der Adresse (/en/… ist Englisch).'
        ],
        usageLabel: 'Verwendung auf der 404-Seite',
        usage: '<FallingStage :labels="labels" @fall="fallen = true">\n  <HeroBackdrop sign="404" :lit="fallen" />\n  <h1>Diese Seite gibt es nicht</h1>\n</FallingStage>'
      }
    ]
  },
  back: 'Zurück zur Startseite'
}

const en: PatternsContent = {
  metaTitle: 'Pattern library – Dustin Clever',
  title: 'Pattern library',
  intro:
    'This page shows the building blocks of this website: colors, type, layout and the reusable components. The source code is read straight from the website’s own files when the site is built, so it is always up to date and never a copy.',
  tocLabel: 'On this page',
  nav: [
    { id: 'colors', label: 'Colors' },
    { id: 'typography', label: 'Typography' },
    { id: 'layout', label: 'Layout' },
    { id: 'components', label: 'Components' }
  ],
  ui: {
    token: 'Variable',
    value: 'Value',
    usage: 'Usage',
    pair: 'Pairing',
    ratio: 'Contrast',
    level: 'Level',
    showCode: 'Show source code',
    codeLabel: 'Source code',
    preview: 'Preview',
    openNotFound: 'Open the 404 page',
    api: 'Interface',
    a11y: 'Accessibility',
    levels: { AAA: 'AAA', AA: 'AA', UI: '3:1 and up (controls, large text)', fail: 'below 3:1' }
  },
  colors: {
    title: 'Colors',
    intro:
      'A dark and a light theme with exactly one accent color. All colors are CSS variables in main.scss, and the table is read from that file and shows the values of the theme that is active right now (switch in the header).',
    notes: {
      bg: 'Page background and the even sections.',
      'bg-alt': 'Background of the alternating sections (About, Skills, Contact).',
      text: 'Body text and headings.',
      'on-blue': 'Text and icons on blue surfaces (button, scroll button).',
      muted: 'Secondary color for intros, hints and menu items at rest.',
      line: 'Fine divider lines and borders (white at 14% opacity).',
      blue: 'Accent: button, logo symbol and the slash in front of section headings.',
      'blue-dark': 'Hover state of the button.',
      'blue-light': 'Underline and border on hover (text link, drag chip) and the dots in the hero grid.',
      focus: 'Focus ring for keyboard use.'
    },
    pairsTitle: 'Contrast',
    pairsIntro:
      'Calculated from the variables according to WCAG 2.x. Text needs at least 4.5:1 (AA), controls and large text 3:1.',
    pairs: [
      { fg: 'text', bg: 'bg', use: 'Body text on the page background' },
      { fg: 'muted', bg: 'bg', use: 'Secondary text on the page background' },
      { fg: 'muted', bg: 'bg-alt', use: 'Secondary text on alternating sections' },
      { fg: 'on-blue', bg: 'blue', use: 'Button label' },
      { fg: 'on-blue', bg: 'blue-dark', use: 'Button label on hover' },
      { fg: 'blue-light', bg: 'bg', use: 'Underline and border on hover' },
      { fg: 'focus', bg: 'bg', use: 'Focus ring' },
      { fg: 'blue', bg: 'bg', use: 'Accent (logo, slash), purely decorative' }
    ],
    codeTitle: 'All variables in the source'
  },
  typography: {
    title: 'Typography',
    intro: 'Two typefaces, both served from this site: loading the page makes no connection to Google.',
    fonts: [
      { token: 'font-display', name: 'Roboto Slab', role: 'Logo and headings (h1 to h3)', sample: 'Frontend development with care' },
      { token: 'font', name: 'Space Grotesk', role: 'Body text, menu, buttons and entry titles (h4)', sample: 'Components people enjoy using' }
    ],
    scaleTitle: 'Sizes',
    scale: [
      { label: 'Section title · Roboto Slab 700 · 2 to 3.5 rem (fluid)', sample: 'Experience' },
      { label: 'Heading 3 · Roboto Slab 700 · 1.5 rem', sample: 'Professional experience' },
      { label: 'Heading 4 · Space Grotesk 500 · 1.15 rem', sample: 'Frontend Developer' },
      { label: 'Body text · Space Grotesk 400 · 1.0625 rem, line height 1.65', sample: 'I come from design and build interfaces with Vue, Nuxt and TypeScript.' }
    ],
    notes: [
      'The serif gives the headings character, the sans-serif grotesk keeps text and interface calm.',
      'Text columns are limited to 65 characters so lines stay easy to read.',
      'The body font is preloaded and uses font-display: optional. If it does not arrive in time, the fallback font stays instead of the text shifting later (layout shift).'
    ]
  },
  layout: {
    title: 'Layout',
    intro: 'A few fixed rules that apply everywhere.',
    rules: [
      {
        title: 'Sections',
        text: 'Every section is at least 90% as tall as the window below the header. The next section peeks out at the bottom and shows that there is more. Alternating backgrounds (bg and bg-alt) separate sections without lines.'
      },
      {
        title: 'Page margin',
        text: 'A fluid margin (gutter) from 1.25 to 4 rem keeps content on the same edge at every width.'
      },
      {
        title: 'Header',
        text: 'From 1000 px the header is a single row and stays at the top. Below that it has two rows: logo and language switch on top, the menu items below, wrapping when needed.'
      },
      {
        title: 'Hero',
        text: 'From 1024 px the portrait sits as a background layer between the text on the left and the info blocks on the right. Below that it sits under the text.'
      },
      {
        title: 'Shapes',
        text: 'Angular, with no rounded corners and no glass or glow effects. The playful parts (dot grid in the hero, draggable tags) are purely decorative.'
      },
      {
        title: 'Usability',
        text: 'Click targets are at least 44 px tall. The focus ring is 3 px thick and visible everywhere. With “reduced motion”, transitions and animations are switched off or shortened.'
      }
    ],
    tokensTitle: 'Type and layout variables',
    scssTitle: 'SCSS variables and mixins',
    scssIntro: 'Breakpoints, spacing, font sizes, minimum sizes and transitions live in their own SCSS file, because they are used in media queries or never change at runtime. Spacing follows a scale in steps of 0.25 rem, and with the mixins up(), down() and between() a breakpoint has the same name everywhere. Values that occur in only one place are local variables in their component. The file is loaded into every SCSS file at build time.'
  },
  components: {
    title: 'Components',
    intro:
      'The components are deliberately small. Each one comes with a preview to try out (mouse and keyboard), its interface, notes on accessibility and the real source code.',
    items: [
      {
        id: 'button',
        title: 'Button',
        description:
          'The main action of a section, for example “Get in touch” in the hero. Technically a link that looks like a button, because it jumps to a section and does not trigger an action.',
        api: [{ name: '.button', description: 'Angular surface in blue with white text, at least 3 rem tall. Hover: blue-dark.' }],
        a11y: [
          'A real link: Enter opens the target and the focus ring is visible.',
          'Hover only changes the color, nothing is reachable by mouse alone.',
          'The contrast of the label is listed in the table under “Colors”.'
        ],
        usageLabel: 'Usage in the hero',
        usage: '<a class="button" href="#contact">Get in touch</a>'
      },
      {
        id: 'text-link',
        title: 'Text link',
        description:
          'For all other links. The underline sits on the text and runs from left to right from white to blue on hover. The label lives in its own element, and only that carries the underline.',
        api: [
          { name: '.text-link', description: 'Block: link at least 2.75 rem tall, optionally with an icon (0.5 rem gap).' },
          { name: '.text-link__label', description: 'Element: the text with the animated underline.' }
        ],
        a11y: [
          'The underline is visible at rest, so links are not recognizable by color alone.',
          'Hover and keyboard focus trigger the same animation.',
          'With “reduced motion” the underline changes without a transition.'
        ],
        usageLabel: 'Usage in the contact section',
        usage:
          '<a class="text-link" href="/cv/CV-Dustin-Clever.pdf" download>\n  <span class="text-link__label">Resume (EN)</span>\n</a>'
      },
      {
        id: 'scroll-button',
        title: 'Scroll button',
        description:
          'The round arrow below the hero actions that leads to the next section. Technically an anchor link; after the click, focus lands on the heading of the target.',
        api: [
          { name: 'href', description: 'Target anchor, for example #about.' },
          { name: 'label', description: 'Accessible name, since the button only shows an icon.' }
        ],
        a11y: [
          'A real link with an aria-label; the arrow itself is hidden from screen readers.',
          'The click target is 4 rem across and the focus ring is visible.',
          'Hover only changes the color; with “reduced motion” the transition is removed.'
        ],
        usageLabel: 'Usage in the hero',
        usage: '<ScrollButton href="#about" label="Scroll down" />'
      },
      {
        id: 'lang-switch',
        title: 'Language switch',
        description:
          'Switches between German and English, styled like a light switch: the knob jumps to the active language and the track turns blue for EN. The component knows nothing about routes, everything comes in through props. The preview shows both states; the links stay on this page.',
        api: [
          { name: 'lang', description: 'Active language: de or en. Drives the knob and the color.' },
          { name: 'paths', description: 'Target path per language, for example { de: "/", en: "/en" }.' },
          { name: 'label', description: 'Label of the navigation for screen readers.' }
        ],
        a11y: [
          'Two ordinary links with lang, hreflang and a spelled-out name (“English (EN)”); the active language carries aria-current="page".',
          'The state is not shown by the knob position alone, but also by the inverted text color.',
          'With “reduced motion” the knob moves without a transition.'
        ],
        usageLabel: 'Usage in the header',
        usage: '<LangSwitch lang="en" :paths="{ de: \'/\', en: \'/en\' }" label="Language" />'
      },
      {
        id: 'theme-switch',
        title: 'Theme switch',
        description:
          'Switches between the light and the dark design. On the first visit the system setting applies, after that the choice the browser remembers. A small script in the head sets the theme before the page is painted, so nothing flashes. The preview really switches, this page included.',
        api: [
          { name: 'label', description: 'Label for screen readers, for example “Light theme”. The state is in aria-pressed.' },
          { name: 'useTheme()', description: 'Shared state (theme, isLight, toggle). The colors themselves hang on data-theme on <html> (main.scss), the logic lives in utils/theme.ts.' }
        ],
        a11y: [
          'A real button with aria-label and aria-pressed (pressed = light design), operable by keyboard.',
          'Both icons are in the HTML, the CSS decides which one is visible. The icon alone carries no meaning, the name comes from the label.',
          'Only the choice (dark or light) is stored in localStorage, without a cookie. If storage is blocked, the choice lasts until reload. With “reduced motion” there are no transitions.'
        ],
        usageLabel: 'Usage in the header',
        usage: '<ThemeSwitch label="Light theme" />'
      },
      {
        id: 'drag-chip',
        title: 'Drag chip',
        description:
          'The small tag for the technologies in the experience section. You can grab it with mouse or finger, move it, and it springs back when released. Purely decorative: the content stays a normal list item. On the 404 page a physics simulation controls its position.',
        api: [
          { name: 'Slot (default)', description: 'The label of the tag, for example “Vue”.' },
          { name: 'Props', description: 'All optional. offset: a position {x, y} set by the caller (no springing back then). still: cannot be grabbed.' },
          { name: 'Events', description: 'grab, drag and release with the pointer event, so the caller can work out the position.' }
        ],
        a11y: [
          'For screen readers an ordinary list item, it needs no focus and no interaction.',
          'With “reduced motion” the tag jumps back without springing.',
          'touch-action: none stops the page from scrolling while you drag the tag.'
        ],
        usageLabel: 'Usage in the experience section',
        usage: '<ul class="chips">\n  <DragChip>Vue</DragChip>\n  <DragChip>Nuxt</DragChip>\n</ul>'
      },
      {
        id: 'not-found',
        title: '404 page',
        description:
          'Anyone who opens an address that does not exist first sees ordinary text with a few tags above it. Then the tags fall onto the footer, bounce and stay there, and “404” lights up in the dot grid from the hero. You can grab the tags and throw them, and the grid moves away from the pointer. The text is the actual content, everything else is a bonus.',
        api: [
          { name: 'FallingStage', description: 'Prop labels (the tags), event fall (the tags start to fall) and a slot for the content. Renders the tags as DragChip and runs the physics (utils/physics.ts). The floor is the bottom edge of the stage.' },
          { name: 'HeroBackdrop', description: 'The same dot grid as in the hero, here across the whole stage. Props sign (text made of the digits 0 and 4) and lit: the lettering lights up as soon as lit is true. If it does not fit into the grid (narrow windows) it is left out.' }
        ],
        a11y: [
          'Grid and tags are purely decorative (aria-hidden). Heading, text and links are the real content.',
          'With “reduced motion” the tags lie on the floor right away, nothing falls and nothing can be thrown. “404” shows in the grid without a transition.',
          'The page is set to noindex and is not in the sitemap. Its language follows the address (/en/… is English).'
        ],
        usageLabel: 'Usage on the 404 page',
        usage: '<FallingStage :labels="labels" @fall="fallen = true">\n  <HeroBackdrop sign="404" :lit="fallen" />\n  <h1>This page does not exist</h1>\n</FallingStage>'
      }
    ]
  },
  back: 'Back to the home page'
}

export const patternsContent = { de, en }
