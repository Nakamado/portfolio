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
export interface Project { title: string; type: string; text: string }
export interface SkillGroup { title: string; items: string[] }

export interface Content {
  ui: Record<'skip' | 'nav' | 'langLabel' | 'themeLabel' | 'scrollDown' | 'nextSection' | 'backToTop', string>
  nav: { id: string; label: string }[]
  meta: { title: string; description: string }
  hero: {
    title: string
    role: string
    statement: string
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
      statement: 'Ich komme aus dem Design und baue Oberflächen mit Vue, Nuxt und TypeScript.',
      status: 'Offen für eine neue Stelle als Frontend-Entwickler.',
      ctaContact: 'Kontakt aufnehmen',
      ctaCv: 'Lebenslauf als PDF',
      imageAlt: 'Porträt von Dustin Clever',
      aside: {
        aboutLabel: 'Über mich',
        aboutText: 'Sieben Jahre Frontend im Team bei real.digital / Kaufland e-commerce.',
        aboutLink: 'Mehr erfahren',
        workLabel: 'Meine Arbeit',
        workText: 'Header, Produktseite, Mehrsprachigkeit und A/B-Tests.',
        workLink: 'Projekte ansehen',
        connectLabel: 'Vernetzen',
        mail: 'E-Mail'
      }
    },
    about: {
      title: 'Über mich',
      paragraphs: [
        'Ich habe als Mediengestalter für Digital und Print angefangen: Logos, Flyer, Webseiten, später Elemente für einen E-Commerce-Shop. Aus der Gestaltung heraus bin ich in die Frontend-Entwicklung gewechselt.',
        'Von 2018 bis 2024 habe ich bei real.digital / Kaufland e-commerce in größeren Entwicklungsteams an einer großen E-Commerce-Plattform mitgearbeitet, unter anderem an der B2C-Pattern-Library, am Header, an Produktdetailseite und Bewertungen, an A/B-Tests und Tracking sowie an der Mehrsprachigkeit unseres Micro-Frontends.',
        'Seit Anfang 2025 baue ich in einer Auszeit eigene Content-Projekte auf (Gaming und Trading Cards auf Twitch, TikTok und YouTube). Jetzt suche ich wieder eine Stelle als Frontend-Entwickler.'
      ],
      strengthsTitle: 'Was ich mitbringe',
      strengths: [
        { title: 'Gestalterische Ausbildung', text: 'Mediengestalter Digital & Print, Erfahrung mit Adobe Creative Cloud und UX.' },
        { title: 'Komponentenbasiert arbeiten', text: 'Mitarbeit an einer unternehmensweiten Pattern-Library mit Vuepress und Storybook.' },
        { title: 'Arbeit im Team', text: 'Scrum mit Sprints, Dailys, Reviews, Retrospektiven und Refinements.' }
      ],
      factsTitle: 'Auf einen Blick',
      facts: [
        { label: 'Frontend', value: '2018 bis 2024 bei real.digital / Kaufland e-commerce' },
        { label: 'Technologien', value: 'Vue.js, Nuxt.js, TypeScript, CSS/SCSS' },
        { label: 'Ausbildung', value: 'Mediengestalter Digital & Print' },
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
            'Konzeption, Aufbau und Umsetzung eigener Content-Projekte',
            'Aufbau und Betreuung eigener Social-Media-Kanäle (Twitch, TikTok, YouTube)',
            'Produktion und Veröffentlichung von digitalem Content (Gaming & Trading Cards)',
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
            'Mitarbeit an der internen B2C-Pattern-Library fürs ganze Unternehmen',
            'Federführende Umsetzung der i18n unseres Micro-Frontends für mehrere Sprachen (CZ, SK, PL, AT) mit Lokalise und Nuxt.js',
            'Umsetzung des Website-Headers für real.de',
            'Beteiligung am Rebranding von real.de zu kaufland.de',
            'Umsetzung diverser A/B-Tests mit Optimizely',
            'Trackings für Optimizely und Google Analytics',
            'Bearbeiten von B2C-E-Mails im internen CMS mit Twig',
            'Pflege der Product Detail Page (PDP) und der Product Reviews',
            'Agiles Arbeiten im Scrum (Sprints, Dailys, Reviews, Retrospektiven, Refinements)'
          ],
          stack: ['Vue.js', 'CSS/SCSS', 'TypeScript', 'Nuxt.js', 'Vuepress/Storybook', 'Optimizely']
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
        { title: 'Frontend', items: ['Vue.js', 'Nuxt.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS / SCSS', 'BEM', 'Responsive Webentwicklung'] },
        {
          title: 'Arbeitsweise',
          items: ['Pattern-Libraries (Vuepress, Storybook)', 'A/B-Testing (Optimizely)', 'Tracking (Google Analytics)', 'Internationalisierung (Lokalise)', 'Barrierefreiheit', 'Performance', 'Automatisierte Tests', 'Scrum']
        },
        { title: 'Design', items: ['UX', 'Adobe Creative Cloud', 'Photoshop', 'Print und Digital'] }
      ]
    },
    work: {
      title: 'Projekte',
      intro: 'Die Arbeit bei Kaufland entstand im Team und ist nicht öffentlich einsehbar. Eigene Projekte kommen hier nach und nach dazu.',
      projects: [
        {
          title: 'Kaufland e-commerce: Header, PDP und Bewertungen',
          type: 'Berufliche Arbeit im Team',
          text: 'Umsetzung des Website-Headers für real.de sowie Pflege der Produktdetailseite und der Product Reviews, dazu A/B-Tests und Tracking.'
        },
        {
          title: 'Pattern-Library für alle Teams',
          type: 'Berufliche Arbeit im Team',
          text: 'Komponenten selbst erstellt, bestehende in die B2C-Pattern-Library übertragen, Bugs behoben und Features ergänzt, in enger Zusammenarbeit mit den Design- und UX-Kolleg:innen. Dazu kam die Dokumentation mit Verwendung, Props und Parametern. Beim Wechsel von Vuepress auf Storybook war ich einer der Hauptverantwortlichen.'
        },
        {
          title: 'Mehrsprachigkeit des Micro-Frontends',
          type: 'Berufliche Arbeit im Team',
          text: 'Federführende Umsetzung der i18n für CZ, SK, PL und AT mit Lokalise und Nuxt.js.'
        },
        {
          title: 'Diese Portfolio-Website',
          type: 'Privatprojekt',
          text: 'Nuxt, Vue und TypeScript, getestet mit Vitest bei 100 % Testabdeckung. Lighthouse (Stand Oktober 2026): Performance 100 am Desktop und 99 mobil, dazu jeweils 100 bei Barrierefreiheit, Best Practices und SEO.'
        }
      ]
    },
    contact: {
      title: 'Kontakt',
      text: 'Du suchst Verstärkung im Frontend? Schreib mir kurz, worum es geht.',
      mail: 'E-Mail schreiben',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      cvDe: 'Lebenslauf (Deutsch, PDF)',
      cvEn: 'CV (Englisch, PDF)'
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
            'Die verwendeten Schriften (Space Grotesk und Roboto Slab) werden beim Erstellen der Seite heruntergeladen und von dieser Website selbst ausgeliefert. Dein Browser stellt dafür keine Verbindung zu Google her.'
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
      statement: 'I come from design and build interfaces with Vue, Nuxt and TypeScript.',
      status: 'Open to a new role as a Frontend Developer.',
      ctaContact: 'Get in touch',
      ctaCv: 'Download CV (PDF)',
      imageAlt: 'Portrait of Dustin Clever',
      aside: {
        aboutLabel: 'About me',
        aboutText: 'Seven years of frontend work in a team at real.digital / Kaufland e-commerce.',
        aboutLink: 'Learn more',
        workLabel: 'My work',
        workText: 'Header, product page, internationalization and A/B tests.',
        workLink: 'Browse projects',
        connectLabel: 'Connect',
        mail: 'Email'
      }
    },
    about: {
      title: 'About',
      paragraphs: [
        'I started out as a media designer for digital and print: logos, flyers, websites, later elements for an e-commerce shop. From design I moved into frontend development.',
        'From 2018 to 2024 I worked at real.digital / Kaufland e-commerce, as part of larger development teams on a large e-commerce platform. My work included the company-wide B2C pattern library, the header, the product detail page and reviews, A/B tests and tracking, and internationalization of our micro frontend.',
        'Since early 2025 I have been on a sabbatical, building my own content projects (gaming and trading cards on Twitch, TikTok and YouTube). Now I am looking for a new position as a Frontend Developer.'
      ],
      strengthsTitle: 'What I bring',
      strengths: [
        { title: 'Design training', text: 'Trained media designer (digital and print), experienced with Adobe Creative Cloud and UX.' },
        { title: 'Component-based work', text: 'Contributed to a company-wide pattern library using Vuepress and Storybook.' },
        { title: 'Teamwork', text: 'Scrum with sprints, dailies, reviews, retrospectives and refinements.' }
      ],
      factsTitle: 'At a glance',
      facts: [
        { label: 'Frontend', value: '2018 to 2024 at real.digital / Kaufland e-commerce' },
        { label: 'Technologies', value: 'Vue.js, Nuxt.js, TypeScript, CSS/SCSS' },
        { label: 'Training', value: 'Media designer (digital and print)' },
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
            'Conceptualized and developed personal content creation projects',
            'Built and managed social media channels (Twitch, TikTok, YouTube)',
            'Produced and published digital content on gaming and trading cards',
            'Planned, recorded, edited and optimized short-form videos and livestreams',
            'Analyzed performance metrics to improve content quality and reach'
          ],
          stack: ['OBS Studio', 'Adobe Photoshop', 'Premiere Pro', 'CapCut', 'ElevenLabs']
        },
        {
          period: '01/2018 – 12/2024',
          title: 'Frontend Developer',
          org: 'real.digital / Kaufland e-commerce',
          points: [
            'Contributed to the internal company-wide B2C pattern library',
            'Led implementation of i18n for our micro frontend supporting multiple languages (CZ, SK, PL, AT) using Lokalise and Nuxt.js',
            'Developed the website header for real.de',
            'Contributed to the rebranding from real.de to kaufland.de',
            'Built various A/B tests using Optimizely',
            'Integrated tracking for Optimizely and Google Analytics',
            'Edited B2C emails via internal CMS using Twig',
            'Maintained the Product Detail Page (PDP) and product reviews',
            'Worked in an agile Scrum environment (sprints, dailies, reviews, retrospectives, refinements)'
          ],
          stack: ['Vue.js', 'CSS/SCSS', 'TypeScript', 'Nuxt.js', 'Vuepress/Storybook', 'Optimizely']
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
        { title: 'Frontend', items: ['Vue.js', 'Nuxt.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS / SCSS', 'BEM', 'Responsive web development'] },
        {
          title: 'Ways of working',
          items: ['Pattern libraries (Vuepress, Storybook)', 'A/B testing (Optimizely)', 'Tracking (Google Analytics)', 'Internationalization (Lokalise)', 'Accessibility', 'Performance', 'Automated testing', 'Scrum']
        },
        { title: 'Design', items: ['UI/UX', 'Adobe Creative Cloud', 'Photoshop', 'Print and digital'] }
      ]
    },
    work: {
      title: 'Projects',
      intro: 'My work at Kaufland was done in a team and is not publicly viewable. Personal projects will be added here over time.',
      projects: [
        {
          title: 'Kaufland e-commerce: header, PDP and reviews',
          type: 'Professional work in a team',
          text: 'Built the website header for real.de and maintained the product detail page and product reviews, plus A/B tests and tracking.'
        },
        {
          title: 'Pattern library for all teams',
          type: 'Professional work in a team',
          text: 'Built components and moved existing ones into the B2C pattern library, fixed bugs and added features, working closely with the design and UX colleagues. I also wrote the documentation covering usage, props and parameters. I was one of the main people responsible for the switch from Vuepress to Storybook.'
        },
        {
          title: 'Multilingual micro frontend',
          type: 'Professional work in a team',
          text: 'Led the implementation of i18n for CZ, SK, PL and AT using Lokalise and Nuxt.js.'
        },
        {
          title: 'This portfolio website',
          type: 'Personal project',
          text: 'Nuxt, Vue and TypeScript, tested with Vitest at 100% coverage. Lighthouse (as of October 2026): performance 100 on desktop and 99 on mobile, plus 100 each for accessibility, best practices and SEO.'
        }
      ]
    },
    contact: {
      title: 'Contact',
      text: 'Looking for frontend support? Send me a short note about what you need.',
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
            'The fonts used (Space Grotesk and Roboto Slab) are downloaded when the site is built and served from this website itself. Your browser does not connect to Google for this.'
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
