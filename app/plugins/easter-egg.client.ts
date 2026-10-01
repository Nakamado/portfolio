import { EASTER_EGG_LINES, easterEggContacts } from '~/data/easterEgg'

export default defineNuxtPlugin(() => {
  const { contactEmail, linkedinUrl } = useRuntimeConfig().public
  const [greeting, ...rest] = EASTER_EGG_LINES
  const lines = [...rest, ...easterEggContacts(contactEmail, linkedinUrl)].join('\n')

  console.log(`%c${greeting}%c\n${lines}`, 'font:700 15px sans-serif;color:#4f8cff', 'font:13px/1.6 sans-serif')
})
