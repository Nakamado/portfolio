import { patternsContent, type PatternsContent } from './patterns'

export type Lang = 'de' | 'en'

export interface Job {
  period: string
  title: string
  org: string
  points: string[]
  stack?: string[]
}
export interface Edu { period: string; title: string; org: string; note?: string }
export interface Project { title: string; type: string; text: string[]; stack?: string[] }
export interface SkillGroup { title: string; items: string[] }

export interface Content {
  ui: Record<'skip' | 'nav' | 'langLabel' | 'themeLabel' | 'scrollDown' | 'nextSection' | 'backToTop', string>
  nav: { id: string; label: string }[]
  meta: { title: string; description: string }
  hero: {
    title: string
    role: string
    statement: string
    stack: string[]
    status: string
    ctaContact: string
    ctaCv: string
    imageAlt: string
    aside: { aboutLabel: string; aboutText: string; aboutLink: string; workLabel: string; workText: string; workLink: string; connectLabel: string; mail: string }
  }
  about: {
    title: string
    paragraphs: string[]
    strengthsTitle: string
    strengths: { title: string; text: string }[]
    factsTitle: string
    facts: { label: string; value: string }[]
  }
  experience: { title: string; workTitle: string; educationTitle: string; jobs: Job[]; education: Edu[] }
  skills: { title: string; groups: SkillGroup[] }
  work: { title: string; intro: string; projects: Project[] }
  contact: { title: string; text: string; mail: string; linkedin: string; github: string; cvDe: string; cvEn: string }
  footer: { built: string; imprint: string; privacy: string; patterns: string }
  patterns: PatternsContent
  notFound: {
    metaTitle: string
    code: string
    title: string
    textBefore: string
    textAfter: string
    home: string
    patterns: string
  }
  imprint: {
    metaTitle: string
    title: string
    providerTitle: string
    contactTitle: string
    emailLabel: string
    phoneLabel: string
    contentTitle: string
    contentText: string
    liabilityTitle: string
    liabilityText: string
    back: string
  }
  privacy: {
    metaTitle: string
    title: string
    controllerTitle: string
    emailLabel: string
    sections: { title: string; paragraphs: string[] }[]
    updated: string
    back: string
  }
}

const designTools = ['Adobe Creative Cloud', 'HTML', 'CSS', 'JavaScript']

export const content: Record<Lang, Content> = {
  de: {
    ui: {
      skip: 'Zum Inhalt springen',
      nav: 'Hauptnavigation',
      langLabel: 'Sprache',
      themeLabel: 'Helles Design',
      scrollDown: 'Zum Abschnitt „Über mich“ scrollen',
      nextSection: 'Weiter zu: {section}',
      backToTop: 'Zurück nach oben'
    },
    nav: [
      { id: 'about', label: 'Über mich' },
      { id: 'experience', label: 'Erfahrung' },
      { id: 'skills', label: 'Skills' },
      { id: 'projects', label: 'Projekte' },
      { id: 'contact', label: 'Kontakt' }
    ],
    meta: {
      title: 'Dustin Clever – Frontend-Entwickler',
      description:
        'Frontend-Entwickler mit Designhintergrund: Vue.js, Nuxt.js und TypeScript. Sieben Jahre bei real.digital / Kaufland e-commerce.'
    },
    hero: {
      title: 'Ich bin Dustin Clever, Frontend-Entwickler',
      role: 'Frontend-Entwickler',
      statement: 'Ich verbinde langjährige Frontend-Erfahrung mit meinem Hintergrund in Design und Mediengestaltung.',
      stack: ['Vue', 'Nuxt', 'TypeScript'],
      status: 'Aktuell auf der Suche nach einer neuen Position als Frontend-Entwickler.',
      ctaContact: 'Kontakt aufnehmen',
      ctaCv: 'Lebenslauf als PDF',
      imageAlt: 'Porträt von Dustin Clever',
      aside: {
        aboutLabel: 'Über mich',
        aboutText: 'Frontend-Entwickler mit langjähriger Erfahrung im E-Commerce und einem Hintergrund im Design.',
        aboutLink: 'Mehr erfahren',
        workLabel: 'Meine Arbeit',
        workText: 'Von Pattern-Libraries und Produktdetailseiten bis zu Internationalisierung und A/B-Tests.',
        workLink: 'Projekte ansehen',
        connectLabel: 'Vernetzen',
        mail: 'E-Mail'
      }
    },
    about: {
      title: 'Über mich',
      paragraphs: [
        'Meine berufliche Laufbahn hat im Design begonnen. Als ausgebildeter Mediengestalter Digital & Print und Gestaltungstechnischer Assistent habe ich zunächst Logos, Printmedien und Webseiten gestaltet und umgesetzt. Mit der Zeit verlagerte sich mein Schwerpunkt immer stärker in Richtung Webentwicklung – und schließlich vollständig ins Frontend.',
        'Von 2018 bis 2024 habe ich bei real.digital / Kaufland e-commerce in größeren Entwicklungsteams an einer internationalen E-Commerce-Plattform gearbeitet. Mein Fokus lag dabei auf komponentenbasierter Frontend-Entwicklung mit Vue, Nuxt und TypeScript sowie auf wartbaren und gut testbaren Lösungen.',
        'Mein gestalterischer Hintergrund begleitet mich dabei bis heute: Ich lege Wert auf ein gutes Zusammenspiel von technischer Umsetzung, UX und Design und arbeite gerne eng mit Design- und UX-Kolleg:innen zusammen. Wichtig sind mir außerdem Themen wie Clean Code, Testbarkeit, Barrierefreiheit und Performance.',
        'Seit Anfang 2025 nutze ich eine berufliche Auszeit für eigene Content-Projekte rund um Gaming und Trading Cards auf Twitch, TikTok und YouTube. Jetzt möchte ich wieder in die Frontend-Entwicklung einsteigen und meine Erfahrung in ein neues Team einbringen.'
      ],
      strengthsTitle: 'Was ich mitbringe',
      strengths: [
        { title: 'Designverständnis', text: 'Durch meine Ausbildung in Mediengestaltung und meine Erfahrung mit UX verbinde ich technische Umsetzung mit einem Blick für Gestaltung und Nutzererlebnis.' },
        { title: 'Komponenten & Codequalität', text: 'Mehrjährige Erfahrung mit komponentenbasierter Entwicklung, Pattern-Libraries, TypeScript und automatisierten Tests – mit Fokus auf wartbaren und gut strukturierten Frontend-Code.' },
        { title: 'Produktentwicklung im Team', text: 'Langjährige Erfahrung in agilen Entwicklungsteams an einer großen internationalen E-Commerce-Plattform und in der Zusammenarbeit mit Entwicklung, Design und UX.' }
      ],
      factsTitle: 'Auf einen Blick',
      facts: [
        { label: 'Frontend', value: 'Seit 2018 mit Schwerpunkt auf professioneller Frontend-Entwicklung' },
        { label: 'Technologien', value: 'Vue.js, Nuxt.js, TypeScript, JavaScript, CSS/SCSS' },
        { label: 'Hintergrund', value: 'Mediengestalter Digital & Print & Gestaltungstechnischer Assistent' },
        { label: 'Sprachen', value: 'Deutsch (Muttersprache), Englisch (fließend)' }
      ]
    },
    experience: {
      title: 'Erfahrung',
      workTitle: 'Berufserfahrung',
      educationTitle: 'Ausbildung',
      jobs: [
        {
          period: '01/2025 – heute',
          title: 'Sabbatical & Content Creation',
          org: 'Eigenes Projekt',
          points: [
            'Konzeption und Umsetzung eigener Content-Projekte',
            'Aufbau und Betreuung eigener Social-Media-Kanäle auf Twitch, TikTok und YouTube',
            'Produktion von digitalem Content rund um Gaming und Trading Cards',
            'Planung, Aufnahme, Schnitt und Optimierung von Kurzvideos und Livestreams',
            'Analyse von Reichweiten- und Performance-Kennzahlen zur Optimierung der Inhalte'
          ],
          stack: ['OBS Studio', 'Adobe Photoshop', 'Premiere Pro', 'CapCut', 'ElevenLabs']
        },
        {
          period: '01/2018 – 12/2024',
          title: 'Frontend-Entwickler',
          org: 'real.digital / Kaufland e-commerce',
          points: [
            'Entwicklung und Weiterentwicklung von Frontend-Komponenten mit Vue.js, Nuxt.js und TypeScript',
            'Mitarbeit an der unternehmensweiten B2C-Pattern-Library und der Migration von VuePress zu Storybook',
            'Federführende Umsetzung der Internationalisierung eines Micro-Frontends für CZ, SK, PL und AT mit Lokalise und Nuxt.js',
            'Umsetzung des Website-Headers für real.de',
            'Beteiligung am Rebranding von real.de zu kaufland.de',
            'Konzeption und Umsetzung verschiedener A/B-Tests mit Optimizely',
            'Implementierung von Tracking für Optimizely und Google Analytics',
            'Weiterentwicklung und Pflege der Product Detail Page und Product Reviews',
            'Bearbeitung von B2C-E-Mails im internen CMS mit Twig',
            'Entwicklung und Pflege automatisierter Tests als fester Bestandteil der Frontend-Entwicklung',
            'Agile Zusammenarbeit im Scrum-Team'
          ],
          stack: ['Vue.js', 'Nuxt.js', 'TypeScript', 'JavaScript', 'CSS/SCSS', 'Storybook', 'VuePress', 'Optimizely']
        },
        {
          period: '08/2017 – 12/2017',
          title: 'Mediengestalter',
          org: 'Hitmeister',
          points: ['Erstellung und Umsetzung von Elementen für den E-Commerce-Shop', 'Erstellung von Flyern und Visitenkarten'],
          stack: designTools
        },
        { period: '03/2016 – 07/2017', title: 'Mediengestalter (Duales Studium)', org: 'Hitmeister', points: [], stack: designTools },
        {
          period: '09/2014 – 12/2017',
          title: 'Mediengestalter (Duales Studium)',
          org: 'Charara IT Solutions GmbH',
          points: [
            'Planung, Entwurf und Umsetzung von Logos, Flyern, Visitenkarten und Webseiten',
            'Wartung und Pflege von Bestandswebseiten',
            'Gestaltung einer lokalen eigenen Zeitschrift',
            'Kunden- und Anforderungsmanagement',
            'Projektspezifische Aufwandsschätzung mit zugehöriger Angebotserstellung'
          ],
          stack: designTools
        },
        { period: '08/2013 – 08/2014', title: 'Praktikum als Mediengestalter', org: 'Charara IT Solutions GmbH', points: [], stack: designTools }
      ],
      education: [
        {
          period: '2014 – 2017',
          title: 'Duales Studium: Mediengestalter Digital & Print',
          org: 'Albrecht Dürer Berufskolleg Düsseldorf',
          note: 'Blockunterricht, praktische Erfahrung bei Charara IT Solutions GmbH und Hitmeister'
        },
        {
          period: '2012 – 2013',
          title: 'Bachelorstudium Medientechnik',
          org: 'FH Köln',
          note: 'Bewusst beendet, da die inhaltliche Ausrichtung nicht zu meinen Interessen und beruflichen Zielen passte.'
        },
        {
          period: '2008 – 2011',
          title: 'Ausbildung: Gestaltungstechnischer Assistent',
          org: 'Medien und Kommunikation, b.i.b. International College',
          note: 'Umfangreiche praktische Erfahrung mit gängigen Design-Programmen (Adobe Creative Cloud).'
        }
      ]
    },
    skills: {
      title: 'Skills',
      groups: [
        { title: 'Frontend', items: ['Vue.js', 'Nuxt.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS / SCSS', 'Responsive Webentwicklung'] },
        { title: 'Frontend & Produktentwicklung', items: ['Komponentenbasierte Entwicklung', 'Pattern-Libraries / Design Systems', 'Storybook', 'Internationalisierung', 'Automatisierte Tests', 'Barrierefreiheit', 'Performance', 'A/B-Testing', 'Analytics & Tracking'] },
        { title: 'Design & Zusammenarbeit', items: ['UX', 'Adobe Creative Cloud', 'Photoshop', 'Scrum', 'Zusammenarbeit mit Design & UX', 'Print & Digital'] }
      ]
    },
    work: {
      title: 'Projekte',
      intro: 'Ein Großteil meiner bisherigen Frontend-Arbeit entstand gemeinsam mit anderen Entwickler:innen an der E-Commerce-Plattform von real.digital / Kaufland. Die folgenden Beispiele zeigen einige Bereiche, an denen ich konkret mitgearbeitet habe. Eigene Projekte ergänze ich hier nach und nach.',
      projects: [
        {
          title: 'Kaufland e-commerce: Header, PDP & Product Reviews',
          type: 'Berufliche Arbeit im Team',
          text: [
            'Umsetzung des Website-Headers für real.de sowie Weiterentwicklung und Pflege der Produktdetailseite und Product Reviews. Dazu gehörten außerdem die Umsetzung verschiedener A/B-Tests und das zugehörige Tracking.'
          ],
          stack: ['Vue.js', 'Nuxt.js', 'TypeScript', 'CSS/SCSS', 'Optimizely']
        },
        {
          title: 'B2C Pattern-Library',
          type: 'Berufliche Arbeit im Team',
          text: [
            'Entwicklung neuer Komponenten sowie Übertragung bestehender Komponenten in die unternehmensweite B2C-Pattern-Library. Dazu gehörten die Behebung von Bugs, die Weiterentwicklung bestehender Features und die Dokumentation von Verwendung, Props und Parametern.',
            'Die Arbeit entstand in enger Zusammenarbeit mit Design und UX. Bei der Migration der Pattern-Library von VuePress zu Storybook gehörte ich zu den Hauptverantwortlichen.'
          ],
          stack: ['Vue.js', 'TypeScript', 'VuePress', 'Storybook', 'CSS/SCSS']
        },
        {
          title: 'Internationalisierung eines Micro-Frontends',
          type: 'Berufliche Arbeit im Team',
          text: [
            'Federführende Umsetzung der Internationalisierung eines Micro-Frontends für die Expansion nach Tschechien, in die Slowakei, nach Polen und Österreich. Dazu gehörten die technische Integration und Verwaltung der Übersetzungen mit Lokalise und Nuxt.js.'
          ],
          stack: ['Nuxt.js', 'Vue.js', 'TypeScript', 'Lokalise', 'i18n']
        },
        {
          title: 'Diese Portfolio-Website',
          type: 'Privatprojekt',
          text: [
            'Konzeption und Entwicklung meines persönlichen Portfolios mit Nuxt, Vue und TypeScript. Die Website wurde mit Vitest automatisiert getestet und erreicht eine Testabdeckung von 100 %.',
            'Lighthouse (Stand Oktober 2026): 100 Punkte für Performance am Desktop und 99 auf Mobilgeräten sowie jeweils 100 Punkte für Barrierefreiheit, Best Practices und SEO.'
          ],
          stack: ['Nuxt', 'Vue', 'TypeScript', 'Vitest']
        }
      ]
    },
    contact: {
      title: 'Kontakt',
      text: 'Du suchst Verstärkung im Frontend? Schreib mir gerne kurz, worum es geht.',
      mail: 'E-Mail schreiben',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      cvDe: 'Lebenslauf Deutsch',
      cvEn: 'CV English'
    },
    footer: { built: 'Gebaut mit Nuxt und Vue.', imprint: 'Impressum', privacy: 'Datenschutz', patterns: 'Pattern-Library' },
    patterns: patternsContent.de,
    notFound: {
      metaTitle: 'Seite nicht gefunden – Dustin Clever',
      code: 'Fehler 404',
      title: 'Diese Seite gibt es nicht',
      textBefore: 'Der Link zeigt ins Leere (',
      textAfter: '). Das passiert den Besten.',
      home: 'Zur Startseite',
      patterns: 'Pattern-Library ansehen'
    },
    imprint: {
      metaTitle: 'Impressum – Dustin Clever',
      title: 'Impressum',
      providerTitle: 'Angaben gemäß § 5 DDG',
      contactTitle: 'Kontakt',
      emailLabel: 'E-Mail',
      phoneLabel: 'Telefon',
      contentTitle: 'Verantwortlich für den Inhalt',
      contentText: 'Verantwortlich im Sinne von § 18 Abs. 2 MStV ist die oben genannte Person.',
      liabilityTitle: 'Haftung für Links',
      liabilityText:
        'Diese Seite enthält Links zu externen Websites, zum Beispiel LinkedIn und GitHub. Auf deren Inhalte habe ich keinen Einfluss. Für die Inhalte der verlinkten Seiten ist immer der jeweilige Anbieter verantwortlich.',
      back: 'Zur Startseite'
    },
    privacy: {
      metaTitle: 'Datenschutzerklärung – Dustin Clever',
      title: 'Datenschutzerklärung',
      controllerTitle: 'Verantwortlicher',
      emailLabel: 'E-Mail',
      sections: [
        {
          title: 'Überblick',
          paragraphs: [
            'Diese Website ist ein persönliches Portfolio. Sie setzt keine Cookies, nutzt keine Analyse- oder Tracking-Dienste, bindet keine Inhalte von Dritten ein und enthält kein Kontaktformular.'
          ]
        },
        {
          title: 'Hosting über GitHub Pages',
          paragraphs: [
            'Die Website wird über GitHub Pages ausgeliefert. Anbieter ist GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. Beim Aufruf der Seite verarbeitet GitHub technisch notwendige Daten, insbesondere deine IP-Adresse sowie Datum, Uhrzeit und aufgerufene Datei, und speichert sie in Server-Logs. Das ist nötig, um die Seite auszuliefern und sicher zu betreiben.',
            'Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Mein berechtigtes Interesse ist die zuverlässige Darstellung meines Portfolios. Wie lange GitHub diese Daten speichert, bestimme ich nicht. Dazu gelten die Angaben von GitHub.',
            'Da GitHub Inc. seinen Sitz in den USA hat, kann dabei eine Übermittlung personenbezogener Daten in die USA stattfinden. Nach der General Privacy Statement von GitHub ist GitHub nach eigenen Angaben gegenüber dem U.S. Department of Commerce für das EU-U.S. Data Privacy Framework zertifiziert und verpflichtet sich, dessen Grundsätze einzuhalten. Für die Übermittlung kann sich GitHub damit auf einen Angemessenheitsbeschluss der EU-Kommission stützen (Art. 45 DSGVO). Ergänzend nennt GitHub die Standardvertragsklauseln der EU-Kommission. Ich habe keinen Einfluss darauf, wie GitHub die Daten im Einzelnen verarbeitet. Maßgeblich sind die aktuelle General Privacy Statement und die Hinweise zu GitHub Pages von GitHub.'
          ]
        },
        {
          title: 'Schriftarten',
          paragraphs: [
            'Die verwendeten Schriften (Space Grotesk und Roboto Slab) werden von dieser Website selbst ausgeliefert. Dein Browser stellt dafür keine Verbindung zu Google her.'
          ]
        },
        {
          title: 'Design-Auswahl (hell oder dunkel)',
          paragraphs: [
            'Wenn du über den Schalter im Kopfbereich das helle oder dunkle Design wählst, speichert dein Browser diese Wahl lokal auf deinem Gerät (Eintrag „theme“ im localStorage, kein Cookie). Der Eintrag wird nicht an mich oder Dritte übertragen. Er dient nur dazu, dein gewähltes Design beim nächsten Besuch wieder anzuzeigen. Ohne Auswahl verwendet die Seite die Einstellung deines Geräts. Du kannst den Eintrag jederzeit in den Einstellungen deines Browsers löschen.',
            'Der Eintrag wird nur auf deinen ausdrücklichen Wunsch hin gesetzt und ist für die gewünschte Darstellung erforderlich. Eine Einwilligung ist dafür nach meiner Einschätzung nicht nötig (§ 25 Abs. 2 Nr. 2 TDDDG).'
          ]
        },
        {
          title: 'Kontakt per E-Mail',
          paragraphs: [
            'Wenn du mir eine E-Mail schreibst, verarbeite ich deine Adresse und den Inhalt deiner Nachricht, um dir zu antworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b oder f DSGVO. Ich lösche die Nachrichten, sobald die Anfrage erledigt ist und keine Aufbewahrungspflichten entgegenstehen.'
          ]
        },
        {
          title: 'Externe Links',
          paragraphs: [
            'Die Seite verlinkt auf externe Angebote wie LinkedIn und GitHub. Erst wenn du einen Link anklickst, werden Daten an den jeweiligen Anbieter übertragen. Für deren Datenverarbeitung gilt die jeweilige Datenschutzerklärung.'
          ]
        },
        {
          title: 'Deine Rechte',
          paragraphs: [
            'Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch gegen die Verarbeitung. Wende dich dafür an die oben genannte E-Mail-Adresse.',
            'Du hast außerdem das Recht, dich bei einer Datenschutzaufsichtsbehörde zu beschweren, zum Beispiel bei der Landesbeauftragten für Datenschutz und Informationsfreiheit Nordrhein-Westfalen, Kavalleriestraße 2–4, 40213 Düsseldorf.'
          ]
        }
      ],
      updated: 'Stand: Oktober 2026',
      back: 'Zur Startseite'
    }
  },
  en: {
    ui: {
      skip: 'Skip to content',
      nav: 'Main navigation',
      langLabel: 'Language',
      themeLabel: 'Light theme',
      scrollDown: 'Scroll to the About section',
      nextSection: 'Next section: {section}',
      backToTop: 'Back to top'
    },
    nav: [
      { id: 'about', label: 'About' },
      { id: 'experience', label: 'Experience' },
      { id: 'skills', label: 'Skills' },
      { id: 'projects', label: 'Projects' },
      { id: 'contact', label: 'Contact' }
    ],
    meta: {
      title: 'Dustin Clever – Frontend Developer',
      description:
        'Frontend developer with a design background: Vue.js, Nuxt.js and TypeScript. Seven years at real.digital / Kaufland e-commerce.'
    },
    hero: {
      title: 'I’m Dustin Clever, a Frontend Developer',
      role: 'Frontend Developer',
      statement: 'I combine years of frontend experience with my background in design and media design.',
      stack: ['Vue', 'Nuxt', 'TypeScript'],
      status: 'Currently looking for a new position as a Frontend Developer.',
      ctaContact: 'Get in touch',
      ctaCv: 'Download CV (PDF)',
      imageAlt: 'Portrait of Dustin Clever',
      aside: {
        aboutLabel: 'About me',
        aboutText: 'Frontend developer with years of e-commerce experience and a background in design.',
        aboutLink: 'Learn more',
        workLabel: 'My work',
        workText: 'From pattern libraries and product detail pages to internationalization and A/B tests.',
        workLink: 'Browse projects',
        connectLabel: 'Connect',
        mail: 'Email'
      }
    },
    about: {
      title: 'About',
      paragraphs: [
        'My career began in design. Trained as a media designer for digital and print and as a design technical assistant, I first designed and built logos, print media and websites. Over time my focus shifted more and more towards web development – and eventually entirely to the frontend.',
        'From 2018 to 2024 I worked at real.digital / Kaufland e-commerce, in larger development teams on an international e-commerce platform. My focus was component-based frontend development with Vue, Nuxt and TypeScript, and on maintainable, well-testable solutions.',
        'My design background stays with me to this day: I value a good interplay of technical implementation, UX and design, and I enjoy working closely with design and UX colleagues. Topics like clean code, testability, accessibility and performance matter to me as well.',
        'Since early 2025 I have been using a career break for my own content projects around gaming and trading cards on Twitch, TikTok and YouTube. Now I want to get back into frontend development and bring my experience to a new team.'
      ],
      strengthsTitle: 'What I bring',
      strengths: [
        { title: 'Design sense', text: 'Thanks to my training in media design and my experience with UX, I combine technical implementation with an eye for design and user experience.' },
        { title: 'Components & code quality', text: 'Several years of experience with component-based development, pattern libraries, TypeScript and automated testing – with a focus on maintainable, well-structured frontend code.' },
        { title: 'Product development in a team', text: 'Long experience in agile development teams on a large international e-commerce platform and in working with development, design and UX.' }
      ],
      factsTitle: 'At a glance',
      facts: [
        { label: 'Frontend', value: 'Since 2018, with a focus on professional frontend development' },
        { label: 'Technologies', value: 'Vue.js, Nuxt.js, TypeScript, JavaScript, CSS/SCSS' },
        { label: 'Background', value: 'Media designer (digital and print) & design technical assistant' },
        { label: 'Languages', value: 'German (native), English (fluent)' }
      ]
    },
    experience: {
      title: 'Experience',
      workTitle: 'Work experience',
      educationTitle: 'Education',
      jobs: [
        {
          period: '01/2025 – present',
          title: 'Sabbatical & Content Creation',
          org: 'Personal project',
          points: [
            'Conceptualized and developed personal content projects',
            'Built and managed my own social media channels on Twitch, TikTok and YouTube',
            'Produced digital content around gaming and trading cards',
            'Planned, recorded, edited and optimized short-form videos and livestreams',
            'Analyzed reach and performance metrics to improve content'
          ],
          stack: ['OBS Studio', 'Adobe Photoshop', 'Premiere Pro', 'CapCut', 'ElevenLabs']
        },
        {
          period: '01/2018 – 12/2024',
          title: 'Frontend Developer',
          org: 'real.digital / Kaufland e-commerce',
          points: [
            'Developed and extended frontend components with Vue.js, Nuxt.js and TypeScript',
            'Contributed to the company-wide B2C pattern library and the migration from VuePress to Storybook',
            'Led the internationalization of a micro frontend for CZ, SK, PL and AT using Lokalise and Nuxt.js',
            'Developed the website header for real.de',
            'Contributed to the rebranding from real.de to kaufland.de',
            'Designed and built various A/B tests using Optimizely',
            'Implemented tracking for Optimizely and Google Analytics',
            'Extended and maintained the Product Detail Page and product reviews',
            'Edited B2C emails in the internal CMS using Twig',
            'Developed and maintained automated tests as a fixed part of frontend development',
            'Agile collaboration in a Scrum team'
          ],
          stack: ['Vue.js', 'Nuxt.js', 'TypeScript', 'JavaScript', 'CSS/SCSS', 'Storybook', 'VuePress', 'Optimizely']
        },
        {
          period: '08/2017 – 12/2017',
          title: 'Media Designer',
          org: 'Hitmeister',
          points: ['Created and implemented various elements for the e-commerce shop', 'Designed flyers and business cards'],
          stack: designTools
        },
        { period: '03/2016 – 07/2017', title: 'Media Designer (Dual Study Program)', org: 'Hitmeister', points: [], stack: designTools },
        {
          period: '09/2014 – 12/2017',
          title: 'Media Designer (Dual Study Program)',
          org: 'Charara IT Solutions GmbH',
          points: [
            'Planned, designed and implemented logos, flyers, business cards and websites',
            'Maintained and updated existing websites',
            'Designed a local in-house magazine',
            'Customer communication and requirements management',
            'Project-specific effort estimation and quote creation'
          ],
          stack: designTools
        },
        { period: '08/2013 – 08/2014', title: 'Internship – Media Design', org: 'Charara IT Solutions GmbH', points: [], stack: designTools }
      ],
      education: [
        {
          period: '2014 – 2017',
          title: 'Dual Study Program: Media Design Digital & Print',
          org: 'Albrecht Dürer Vocational College, Düsseldorf',
          note: 'Block teaching, practical training at Charara IT Solutions GmbH and Hitmeister'
        },
        {
          period: '2012 – 2013',
          title: 'Bachelor’s Program: Media Technology',
          org: 'Cologne University of Applied Sciences',
          note: 'Deliberately discontinued due to a misalignment between the course content and my interests and career goals.'
        },
        {
          period: '2008 – 2011',
          title: 'Vocational Training: Design Technical Assistant',
          org: 'Media and Communication, b.i.b. International College',
          note: 'Extensive hands-on experience with professional design tools (Adobe Creative Cloud).'
        }
      ]
    },
    skills: {
      title: 'Skills',
      groups: [
        { title: 'Frontend', items: ['Vue.js', 'Nuxt.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS / SCSS', 'Responsive web development'] },
        { title: 'Frontend & product development', items: ['Component-based development', 'Pattern libraries / design systems', 'Storybook', 'Internationalization', 'Automated testing', 'Accessibility', 'Performance', 'A/B testing', 'Analytics & tracking'] },
        { title: 'Design & collaboration', items: ['UX', 'Adobe Creative Cloud', 'Photoshop', 'Scrum', 'Working with design & UX', 'Print & digital'] }
      ]
    },
    work: {
      title: 'Projects',
      intro: 'Most of my frontend work so far was done together with other developers on the e-commerce platform of real.digital / Kaufland. The following examples show some areas I worked on in concrete terms. I will add personal projects here over time.',
      projects: [
        {
          title: 'Kaufland e-commerce: header, PDP & product reviews',
          type: 'Professional work in a team',
          text: [
            'Implemented the website header for real.de and extended and maintained the product detail page and product reviews. This also included various A/B tests and the related tracking.'
          ],
          stack: ['Vue.js', 'Nuxt.js', 'TypeScript', 'CSS/SCSS', 'Optimizely']
        },
        {
          title: 'B2C pattern library',
          type: 'Professional work in a team',
          text: [
            'Developed new components and moved existing ones into the company-wide B2C pattern library. This included fixing bugs, extending existing features and documenting usage, props and parameters.',
            'The work was done in close collaboration with design and UX. During the migration of the pattern library from VuePress to Storybook I was one of the main people responsible.'
          ],
          stack: ['Vue.js', 'TypeScript', 'VuePress', 'Storybook', 'CSS/SCSS']
        },
        {
          title: 'Internationalization of a micro frontend',
          type: 'Professional work in a team',
          text: [
            'Led the internationalization of a micro frontend for the expansion to the Czech Republic, Slovakia, Poland and Austria. This included the technical integration and management of translations with Lokalise and Nuxt.js.'
          ],
          stack: ['Nuxt.js', 'Vue.js', 'TypeScript', 'Lokalise', 'i18n']
        },
        {
          title: 'This portfolio website',
          type: 'Personal project',
          text: [
            'Design and development of my personal portfolio with Nuxt, Vue and TypeScript. The website is tested automatically with Vitest and reaches 100% test coverage.',
            'Lighthouse (as of October 2026): 100 points for performance on desktop and 99 on mobile, plus 100 points each for accessibility, best practices and SEO.'
          ],
          stack: ['Nuxt', 'Vue', 'TypeScript', 'Vitest']
        }
      ]
    },
    contact: {
      title: 'Contact',
      text: 'Looking for frontend support? Feel free to send me a short note about what you need.',
      mail: 'Send an email',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      cvDe: 'CV (German, PDF)',
      cvEn: 'CV (English, PDF)'
    },
    footer: { built: 'Built with Nuxt and Vue.', imprint: 'Legal notice', privacy: 'Privacy policy', patterns: 'Pattern library' },
    patterns: patternsContent.en,
    notFound: {
      metaTitle: 'Page not found – Dustin Clever',
      code: 'Error 404',
      title: 'This page does not exist',
      textBefore: 'The link points nowhere (',
      textAfter: '). It happens to the best of us.',
      home: 'Back to the home page',
      patterns: 'See the pattern library'
    },
    imprint: {
      metaTitle: 'Legal notice – Dustin Clever',
      title: 'Legal notice',
      providerTitle: 'Information pursuant to § 5 DDG',
      contactTitle: 'Contact',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      contentTitle: 'Responsible for the content',
      contentText: 'The person named above is responsible for the content in accordance with § 18 (2) MStV.',
      liabilityTitle: 'Liability for links',
      liabilityText:
        'This site contains links to external websites, for example LinkedIn and GitHub. I have no influence on their content. The respective provider is always responsible for the content of linked pages.',
      back: 'Back to the home page'
    },
    privacy: {
      metaTitle: 'Privacy policy – Dustin Clever',
      title: 'Privacy policy',
      controllerTitle: 'Controller',
      emailLabel: 'Email',
      sections: [
        {
          title: 'Overview',
          paragraphs: [
            'This website is a personal portfolio. It sets no cookies, uses no analytics or tracking services, embeds no third-party content and has no contact form.'
          ]
        },
        {
          title: 'Hosting on GitHub Pages',
          paragraphs: [
            'The website is served via GitHub Pages. The provider is GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. When you visit the site, GitHub processes technically necessary data, in particular your IP address as well as date, time and the requested file, and stores it in server logs. This is required to deliver and secure the site.',
            'The legal basis is Art. 6(1)(f) GDPR. My legitimate interest is the reliable presentation of my portfolio. I do not determine how long GitHub keeps this data. GitHub’s own information applies.',
            'Because GitHub Inc. is based in the USA, personal data may be transferred to the USA. According to GitHub’s General Privacy Statement, GitHub states that it has certified to the U.S. Department of Commerce that it adheres to the EU-U.S. Data Privacy Framework Principles. For such transfers GitHub can therefore rely on an adequacy decision of the European Commission (Art. 45 GDPR). In addition, GitHub refers to the European Commission’s standard contractual clauses. I have no influence on how GitHub processes the data in detail. The current General Privacy Statement and GitHub’s notes on GitHub Pages are authoritative.'
          ]
        },
        {
          title: 'Fonts',
          paragraphs: [
            'The fonts used (Space Grotesk and Roboto Slab) are served from this website itself. Your browser does not connect to Google for this.'
          ]
        },
        {
          title: 'Design choice (light or dark)',
          paragraphs: [
            'If you pick the light or dark design with the switch in the header, your browser stores that choice locally on your device (entry “theme” in localStorage, not a cookie). The entry is not sent to me or to third parties. It only serves to show your chosen design again on your next visit. Without a choice the site uses your device setting. You can delete the entry at any time in your browser settings.',
            'The entry is only set at your explicit request and is necessary for the display you asked for. In my assessment no consent is required for it (Section 25(2) no. 2 TDDG).'
          ]
        },
        {
          title: 'Contact by email',
          paragraphs: [
            'If you email me, I process your address and the content of your message to reply to you. The legal basis is Art. 6(1)(b) or (f) GDPR. I delete messages once the request is dealt with and no retention duties apply.'
          ]
        },
        {
          title: 'External links',
          paragraphs: [
            'The site links to external services such as LinkedIn and GitHub. Data is only transferred to the respective provider once you click a link. Their own privacy policies apply to that processing.'
          ]
        },
        {
          title: 'Your rights',
          paragraphs: [
            'You have the right of access, rectification, erasure, restriction of processing, data portability and objection to processing. Please contact me at the email address above.',
            'You also have the right to lodge a complaint with a data protection authority, for example the State Commissioner for Data Protection and Freedom of Information of North Rhine-Westphalia, Kavalleriestraße 2–4, 40213 Düsseldorf, Germany.'
          ]
        }
      ],
      updated: 'Last updated: October 2026',
      back: 'Back to the home page'
    }
  }
}
