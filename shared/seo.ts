/** Seiten, die in der Sitemap stehen: nur die Startseiten. Impressum und Datenschutz sind bewusst auf noindex gesetzt. */
export const SITEMAP_PATHS = ['/', '/en'] as const

const trimSlash = (url: string) => url.replace(/\/$/, '')

/** robots.txt: alles erlaubt, die Sitemap nur mit bekannter Domain. */
export function buildRobots(siteUrl: string): string {
  const base = trimSlash(siteUrl)
  return ['User-agent: *', 'Allow: /', ...(base ? [`Sitemap: ${base}/sitemap.xml`] : [])].join('\n') + '\n'
}

/** sitemap.xml: ohne bekannte Domain bleibt die Liste leer, weil absolute URLs nötig sind. */
export function buildSitemap(siteUrl: string): string {
  const base = trimSlash(siteUrl)
  const urls = base ? SITEMAP_PATHS.map((path) => `  <url><loc>${base}${path}</loc></url>`) : []
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
}
