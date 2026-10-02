import type { Lang } from '~/data/profile'

type PathMap = Record<Lang, string>

/** Domain ohne Schrägstrich am Ende; leer, wenn keine Domain konfiguriert ist. */
export const normalizeBase = (siteUrl: string) => siteUrl.replace(/\/$/, '')

export const absoluteUrl = (base: string, path: string) => `${base}${path}`

/** Absolute Adresse einer Seite oder undefined, solange keine Domain bekannt ist. */
export const pageUrl = (base: string, path: string) => (base ? absoluteUrl(base, path) : undefined)

/** Canonical und hreflang gibt es nur mit bekannter Domain, weil absolute URLs nötig sind. */
export function headLinks(base: string, lang: Lang, paths: PathMap) {
  if (!base) return []
  return [
    { rel: 'canonical', href: absoluteUrl(base, paths[lang]) },
    { rel: 'alternate', hreflang: 'de', href: absoluteUrl(base, paths.de) },
    { rel: 'alternate', hreflang: 'en', href: absoluteUrl(base, paths.en) },
    { rel: 'alternate', hreflang: 'x-default', href: absoluteUrl(base, paths.de) }
  ]
}

/** Strukturierte Daten (schema.org/Person); URL, Bild und LinkedIn nur, wenn bekannt. */
export function personSchema(options: { base: string; lang: Lang; paths: PathMap; role: string; email: string; linkedinUrl?: string }) {
  const { base, lang, paths, role, email, linkedinUrl } = options
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Dustin Clever',
    jobTitle: role,
    email,
    ...(base ? { url: absoluteUrl(base, paths[lang]), image: absoluteUrl(base, '/images/og-image.jpg') } : {}),
    ...(linkedinUrl ? { sameAs: [linkedinUrl] } : {})
  }
}

/** Vorschaubild für soziale Netzwerke; ohne Domain gibt es keine absolute Bild-URL. */
export function socialImage(base: string) {
  const image = base ? absoluteUrl(base, '/images/og-image.jpg') : undefined
  return {
    image,
    width: image ? 1200 : undefined,
    height: image ? 630 : undefined,
    card: image ? ('summary_large_image' as const) : ('summary' as const)
  }
}
