import { buildSitemap } from '../../shared/seo'

export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return buildSitemap(useRuntimeConfig(event).public.siteUrl)
})
