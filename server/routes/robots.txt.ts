export default defineEventHandler((event) => {
  const base = useRuntimeConfig(event).public.siteUrl.replace(/\/$/, '')
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return ['User-agent: *', 'Allow: /', ...(base ? [`Sitemap: ${base}/sitemap.xml`] : [])].join('\n') + '\n'
})
