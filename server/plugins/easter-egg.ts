import { easterEggComment } from '../../app/data/easterEgg'

// Fügt den Kommentar ganz oben in den <head> ein, damit er beim Öffnen des Quelltexts sofort sichtbar ist.
// Der Inhalt ist reines ASCII; die Zeichenkodierung kommt zusätzlich über den HTTP-Header.
export default defineNitroPlugin((nitroApp) => {
  const { contactEmail, linkedinUrl } = useRuntimeConfig().public
  nitroApp.hooks.hook('render:html', (html) => {
    const comment = easterEggComment(contactEmail, linkedinUrl)
    html.head.unshift(comment)
  })
})
