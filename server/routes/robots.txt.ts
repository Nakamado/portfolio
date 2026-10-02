import { buildRobots } from '../../shared/seo'

export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return buildRobots(useRuntimeConfig(event).public.siteUrl)
})
