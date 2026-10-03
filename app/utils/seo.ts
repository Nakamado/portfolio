import type { Lang } from '~/data/profile'

type PathMap = Record<Lang, string>

/** Domain ohne Schrägstrich am Ende; leer, wenn keine Domain konfiguriert ist. */
export const normalizeBase = (siteUrl: string) => siteUrl.replace(/\/$/, '')

export const absoluteUrl = (base: string, path: string) => `${base}${path}`

/** Adresse einer Seite mit Schrägstrich am Ende, so liefert GitHub Pages sie aus (ohne Schrägstrich gäbe es eine Weiterleitung). */
export const pageAddress = (base: string, path: string) => absoluteUrl(base, path.endsWith('/') ? path : `${path}/`)

/** Absolute Adresse einer Seite oder undefined, solange keine Domain bekannt ist. */
export const pageUrl = (base: string, path: string) => (base ? pageAddress(base, path) : undefined)

/** Canonical und hreflang gibt es nur mit bekannter Domain, weil absolute URLs nötig sind. */
export function headLinks(base: string, lang: Lang, paths: PathMap) {
  if (!base) return []
  return [
    { rel: 'canonical', href: pageAddress(base, paths[lang]) },
    { rel: 'alternate', hreflang: 'de', href: pageAddress(base, paths.de) },
    { rel: 'alternate', hreflang: 'en', href: pageAddress(base, paths.en) },
    { rel: 'alternate', hreflang: 'x-default', href: pageAddress(base, paths.de) }
  ]
}

/** Rechtstexte sollen erreichbar, aber nicht in den Suchergebnissen sein. */
export const robotsContent = (isLegal: boolean) => (isLegal ? 'noindex, follow' : 'index, follow')

/** Vorschaubild je Sprache (Deutsch: og-image.jpg, Englisch: og-image-en.jpg), erzeugt mit `npm run og-image`. */
export const socialImagePath = (lang: Lang) => (lang === 'en' ? '/images/og-image-en.jpg' : '/images/og-image.jpg')

/** Person und Website als ein Graph (schema.org). Nur Angaben, die auch sichtbar auf der Seite stehen; URL, Bild und Profile nur, wenn bekannt. */
export function structuredData(options: { base: string; lang: Lang; homePath: string; role: string; email: string; linkedinUrl?: string; githubUrl?: string }) {
  const { base, lang, homePath, role, email, linkedinUrl, githubUrl } = options
  const profiles = [linkedinUrl, githubUrl].filter(Boolean)
  const url = base ? pageAddress(base, homePath) : undefined
  const person = {
    '@type': 'Person',
    ...(url ? { '@id': `${url}#person` } : {}),
    name: 'Dustin Clever',
    jobTitle: role,
    email,
    ...(url ? { url, image: absoluteUrl(base, socialImagePath(lang)) } : {}),
    ...(profiles.length ? { sameAs: profiles } : {})
  }
  const website = url ? [{ '@type': 'WebSite', name: 'Dustin Clever', url, inLanguage: lang, publisher: { '@id': `${url}#person` } }] : []
  return { '@context': 'https://schema.org', '@graph': [person, ...website] }
}

/** Vorschaubild für soziale Netzwerke; ohne Domain gibt es keine absolute Bild-URL. */
export function socialImage(base: string, lang: Lang = 'de') {
  const image = base ? absoluteUrl(base, socialImagePath(lang)) : undefined
  return {
    image,
    width: image ? 1200 : undefined,
    height: image ? 630 : undefined,
    card: image ? ('summary_large_image' as const) : ('summary' as const)
  }
}
