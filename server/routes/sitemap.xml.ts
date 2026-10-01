export default defineEventHandler((event) => {
  const base = useRuntimeConfig(event).public.siteUrl.replace(/\/$/, '')
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  const urls = base ? ['/', '/en', '/impressum', '/en/legal-notice', '/datenschutz', '/en/privacy'].map((path) => `  <url><loc>${base}${path}</loc></url>`) : []
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
})
