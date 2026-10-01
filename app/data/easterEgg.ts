/** Easteregg für alle, die den Quelltext oder die Konsole öffnen. */
export const ASCII_LOGO = `########    ##      ##    ########  ##########  ######  ##      ##
##      ##  ##      ##  ##              ##        ##    ####    ##
##      ##  ##      ##    ######        ##        ##    ##  ##  ##
##      ##  ##      ##          ##      ##        ##    ##    ####
########      ######    ########        ##      ######  ##      ##

  ########  ##          ##########  ##      ##  ##########  ########
##          ##          ##          ##      ##  ##          ##      ##
##          ##          ######      ##      ##  ######      ########
##          ##          ##            ##  ##    ##          ##  ##
  ########  ##########  ##########      ##      ##########  ##    ####`

export const EASTER_EGG_LINES = [
  'Thanks for taking a peek!',
  'Looking for a new opportunity as a Frontend Developer.'
]

/** Kontaktzeilen für Kommentar und Konsole. */
export function easterEggContacts(email: string, linkedin?: string): string[] {
  return [`Say hi: ${email}`, ...(linkedin ? [`LinkedIn: ${linkedin}`] : [])]
}

/** HTML-Kommentar für den <head>. Enthält bewusst keine doppelten Bindestriche im Inhalt. */
export function easterEggComment(email: string, linkedin?: string): string {
  return `<!--\n${ASCII_LOGO}\n\n${[...EASTER_EGG_LINES, ...easterEggContacts(email, linkedin)].join('\n')}\n-->`
}
